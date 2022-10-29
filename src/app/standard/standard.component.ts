import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Conv1Service } from '../conv1.service';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit {

  constructor(private c1s: Conv1Service, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  editableText: string = "";
  displayText: string = "";

  hintText: string = "Stacked-raw MS Word-LaTeX code";
  bigHintText: string = "Converts MS Word stacked equations into LaTeX-compatible code. Open a new equation box, set equation mode to LaTeX, select the series of stacked equations you want to copy, hit copy, and paste it in the text box. Then, click on process me.";

  copied: boolean = false;
  private _currentMode: string = "align";
  public get currentMode(): string {
    return this._currentMode;
  }
  public set currentMode(value: string) {
    this._currentMode = value;
    switch(value.toLowerCase().replace(' ', '')){
      case 'align':
        this.hintText = "Stacked-raw MS Word-LaTeX code";
        this.bigHintText = "Converts MS Word stacked equations into LaTeX-compatible code. Open a new equation box, set equation mode to LaTeX, select the series of stacked equations you want to copy, hit copy, and paste it in the text box. Then, click on process me.";
        break;
      case 'unicodecopy':
        this.hintText = "UnicodeMath code.";
        this.bigHintText = "Type an equation in MS Word (keep the mode on UnicodeMath), and copy it to here. This converts it into a form that Google's search can read. Not all operators are supported, so only use elementary arithmetic, complex numbers, and the choose operator";
        break;
      default:
        this.hintText = 'TBA';

    }
  }
  hint: string = "";
  eqOptions: string[] = ["align", "unicodeCopy"];

  upperCaseFirst(text: string): string {
    if (text.length === 0){
      return text;
    } else {
      return text[0].toUpperCase() + text.slice(1);
    }
  }

  updateDisplayText(): void {

    switch(this.currentMode.toLowerCase().replace(' ', '')){
    case "align":
      this.displayText = this.c1s.fixUpAligns(this.editableText);
      break;
    case "unicodecopy":
      this.displayText = this.c1s.fixUnicodeEquations(this.editableText);
    }
  }

  displayCopyMessage(): void {
    this._snackBar.open("Response copied!", "Ok", {duration: 5000});
  }




}
