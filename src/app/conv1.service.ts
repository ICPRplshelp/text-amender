import { Injectable } from '@angular/core';

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
    let t3 = t2.map(s => `& ${s} \\\\`);
    let t4 = t3.join('\n');
    let t5 = "\\begin{align*}\n" + t4 + "\n\\end{align*}\n"
    return t5;

  }


}
