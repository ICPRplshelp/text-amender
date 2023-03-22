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
    return "$$\\begin{aligned}\n" + t4 + "\n\\end{aligned}$$\n";

  }

  fixUnicodeEquations(text: string): string {
    // @ts-ignore
    let t1 = text.replaceAll('⋅', '*')
        .replaceAll(' ', '')
        .replaceAll('¦', ' choose ')
        .replaceAll('log_', 'log')
        .replaceAll('〖', '(').replaceAll('〗', ')')
        .replaceAll('█', '')
        .replaceAll('@', '')
        .replace(/\)\d+/g, function(match) {
          return ")*" + match.slice(1);
        })
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
    const strIndent = "   ";
    toSave.sort();
    let cStr: string = strIndent + "\n";
    cStr += (strIndent + "addi $sp, $sp, -4\n"
    + strIndent + "sw $ra, 0($sp)\n");

    for(let i of toSave){
      cStr += (strIndent + `addi $sp, $sp, -4\n` + strIndent + `sw $s${i}, 0($sp)\n`);
    }
    cStr += (strIndent + "\n\n");
    toSave.reverse();
    for(let i of toSave){
      cStr += (strIndent + `lw $s${i}, 0($sp)\n` + strIndent + `addi $sp, $sp, 4\n`); 
    }

    cStr += (strIndent + "lw $ra, 0($sp)\n" + strIndent + "addi $sp, $sp, 4\n");

    return cStr;
  }

  /**
   * A function that replaces all occurrences of the pattern 
   * ::: (TEXT A) (TEXT B) ::: 
   * with <div class="(TEXT A)">(TEXT B)</div> 
   */
  markdownDivsToHTMLDivs(text: string): string {
    
    const pattern = /::: (.*?)[\n ]+(.*?)[\n ]+:::/g;
    return text.replaceAll(pattern, '<div class="$1">\n$2\n</div>');
  }

  fakeListToList(text: string): string {
    const pattern = /-/g;
    return text.replaceAll(pattern, '\n\n - ');
  }

  pdfNewlineRemover(text: string): string {
    text = text.replaceAll(".\n", "DOTNEWNt34#$@%#");
    text = text.replaceAll("\n", " ");
    text = text.replaceAll("DOTNEWNt34#$@%#", ".\n");
    return text;
  }

  softWrapper(str: string): string {
    const codeBlockRegex = /```[\s\S]*?```/g;
    const codeBlocks = str.match(codeBlockRegex) || [];
    str = str.replace(codeBlockRegex, '<CODEBLOCK>');
  
    const singleNewlineRegex = /(?<!\n)\n(?!\n)/g;
    str = str.replace(singleNewlineRegex, '');
  
    codeBlocks.forEach((codeBlock) => {
      str = str.replace('<CODEBLOCK>', codeBlock);
    });
  
    return str;
  }

  plusMinus(text: string): string {
    let t1 = text.replaceAll("±", "+").replaceAll("∓", "-");
    let t2 = text.replaceAll("±", "-").replaceAll("∓", "+");

    return `(${t2}) + i*(${t1})`  ; // t1 + "\n\n" + t2;
  }


}
