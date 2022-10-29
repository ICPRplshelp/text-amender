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
    let t2 = text.split("\\bigm");
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


}
