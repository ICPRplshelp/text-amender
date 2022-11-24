import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Conv1Service {

  constructor() { }


  /**
   * If text was all multiline equations copied from
   * Microsoft Word, return it as an align command.
   * @param text the input text.
   */
  fixUpAligns(text: string): string {
    let t2 = text.replaceAll('\n', '\\bigm').split("\\bigm");
    let t3 = t2.map(s => `& ${this.fixUpBadNotation(s)} \\\\`);
    let t4 = t3.join('\n');
    return "\\begin{align*}\n" + t4 + "\n\\end{align*}\n";

  }

  fixUnicodeEquations(text: string): string {
    // @ts-ignore
    let t1 = text.replaceAll('⋅', '*')
        .replaceAll(' ', '')
        .replaceAll('¦', ' choose ')
        .replaceAll('log_', 'log')
        .replaceAll('〖', '').replaceAll('〗', '')
        ;
    return t1;
  }

  fixUpBadNotation(text: string): string {
    const tli: string[][] = [
      ['\\{', '\\lbrace'],
      ['\\}', '\\rbrace'],
      ['\\emsp', '\\quad']
    ]

    for (let tl of tli) {
      // @ts-ignore
      text = text.replaceAll(tl[0], tl[1]);
    }
    return text;
  }


  saveMeFull(inputString: string): string {
    console.log('SAVE ME');
    let toSave = this.extractNumbers(inputString);
    return this.saveMe(toSave);
  }

  /**
   * return a set of all digits 0-9 that appear in
   * inputString.
   * @param inputString the input string
   */
  extractNumbers(inputString: string): number[] {

    //
    // This is a regular expression that matches
    // any digit 0-9.
    //
    const re = /\d/g;
    let m;
    let result: number[] = [];
    while ((m = re.exec(inputString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        result.push(Number(match));
      });
    }
    return result;


  }


  saveMe(toSave: number[]): string {
    const strIndent = "    ";
    toSave.sort();
    let cStr: string = strIndent + "# PROLOGUE ---------- #\n";
    cStr += (strIndent + "addi $sp, $sp, -4\n"
    + strIndent + "sw $ra, 0($sp)  # perserve the return address\n");

    for(let i of toSave){
      cStr += (strIndent + `addi $sp, $sp, -4\n` + strIndent + `sw $s${i}, 0($sp)  # perserve $sp${i}\n`);
    }
    cStr += (strIndent + "\n# EPILOGUE ---------- #\n");
    toSave.reverse();
    for(let i of toSave){
      cStr += (strIndent + `sw $s${i}, 0($sp)  # load back $sp${i}\n` + strIndent + `addi $sp, $sp, 4\n`); 
    }

    cStr += (strIndent + "sw $ra, 0($sp)  # load back the return address\n" + strIndent + "addi $sp, $sp, 4\n");

    return cStr;
  }


}
