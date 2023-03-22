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

  hintText: string = "Microsoft Equation LaTeX Multiline Linear Format";
  bigHintText: string = "Converts MS Word stacked equations into LaTeX-compatible code. Open a new equation box, set equation mode to LaTeX, select the series of stacked equations you want to copy, hit copy, and paste it in the text box. Then, click on process me. If you're using the Align option, equations should be stacked with SHIFT+ENTER. To minimize errors, I strongly recommend starting each new line with an operator. MS Word's copy-paste results are not consistent so expect errors.";

  copied: boolean = false;
  private _currentMode: string = "align";
  public get currentMode(): string {
    return this._currentMode;
  }
  public set currentMode(value: string) {
    this._currentMode = value;
    switch(value.toLowerCase().replaceAll(' ', '')){
      case 'align':
        this.hintText = "Microsoft Equation LaTeX Multiline Linear Format";
        this.bigHintText = "Converts MS Word stacked equations into LaTeX-compatible code. Open a new equation box, set equation mode to LaTeX, select the series of stacked equations you want to copy, hit copy, and paste it in the text box. Then, click on process me. If you're using the Align option, equations should be stacked with SHIFT+ENTER. To minimize errors, I strongly recommend starting each new line with an operator. MS Word's copy-paste results are not consistent so expect errors.";
        break;
      case 'unicodecopy':
        this.hintText = "UnicodeMath code";
        this.bigHintText = "Type an equation in MS Word (keep the mode on UnicodeMath), and copy it to here. This converts it into a form that Google's search can read. Not all operators are supported, so only use elementary arithmetic, complex numbers, and the choose operator";
        break;
      case 'asmprologue':
        this.hintText = "Numbers only, maybe not containing duplicates";
        this.bigHintText = "The assembly prologue generator that is likely not your version of assembly";
        break;
      case 'fakelisttolist':
        this.hintText = "Text";
        this.bigHintText = "Did someone try to write a list by using dashes, but forgot to add newlines before? Does some text look like this: \"-Point 1 -Point 2- Point 3-Point 4?\" This solves it.";
        break;
      case 'plusminus':
        this.hintText = "Equation"
        this.bigHintText = "Splits up equations with the plus minus sign into a complex number. - is the real component, and + is the imaginary component (it's like this for readability from left to right)."
        break;
      case 'pdfnewlineremover':
        this.hintText = "Text copied from a PDF";
        this.bigHintText = "Removes all newlines that aren't preceeded with a period";
        break;
      case 'softwrapper':
        this.hintText = "Text copied from a markdown document";
        this.bigHintText = "Removes all lone newline characters. Do not modify text in markdown source code blocks."
        break;
        default:
        this.hintText = 'Markdown';
        this.bigHintText = 'Takes Markdown text, and converts and Pandoc Markdown DIVs into HTML DIVs.';

    }
  }
  hint: string = "";
  eqOptions: string[] = ["align", "unicodeCopy", "asmPrologue", "pandocDiv",
"Fake List to List", "pdfNewlineRemover", "plusminus", "soft wrapper"];


  /**
   * 
   * @param curMode the current mode, case sensitive as it is
   * directly fetched from eqOptions
   */
  private _scrollModeChange(curMode: string, offset: number): string {
    // console.log("Cur mode is ", curMode);
    const eqInd = this.eqOptions.indexOf(curMode);
    // console.log("eqInd is", eqInd);
    const nextInd = Math.round(eqInd + offset + this.eqOptions.length) % this.eqOptions.length;
    // console.log(nextInd);
    return this.eqOptions[nextInd];
  }


  upperCaseFirst(text: string): string {
    if (text.length === 0){
      return text;
    } else {
      return text[0].toUpperCase() + text.slice(1);
    }
  }

  onKeydown(keydownevent: { keyCode: number }): void {
      // console.log("Oh wow you pressed ", keydownevent.keyCode);
      if(keydownevent.keyCode === 33){
        const tempSMC = this._scrollModeChange(this.currentMode, -1);

        this.currentMode = tempSMC;
      } else if (keydownevent.keyCode === 34){
        const tempSMC = this._scrollModeChange(this.currentMode, 1);
        this.currentMode = tempSMC;
      }
      // console.log(this.currentMode);
      
  }

  updateDisplayText(): void {
    // console.log(this.currentMode.toLowerCase().replace(' ', ''));

    switch(this.currentMode.toLowerCase().replaceAll(' ', '')){
    case "align":
      this.displayText = this.c1s.fixUpAligns(this.editableText);
      break;
    case "unicodecopy":
      this.displayText = this.c1s.fixUnicodeEquations(this.editableText);
      break;
    case "asmprologue":
      this.displayText = this.c1s.saveMeFull(this.editableText);
      break;
    case "pandocdiv":
      this.displayText = this.c1s.markdownDivsToHTMLDivs(this.editableText);
      break;
    case "fakelisttolist":
      this.displayText = this.c1s.fakeListToList(this.editableText);
      break;
    case "pdfnewlineremover":
      this.displayText = this.c1s.pdfNewlineRemover(this.editableText);
      break;
    case "plusminus":
      this.displayText = this.c1s.plusMinus(this.editableText);
      break;
    case "softwrapper":
      this.displayText = this.c1s.softWrapper(this.editableText);
      break;
    }
    // console.log(this.displayText);
    
  }

  displayCopyMessage(): void {
    this._snackBar.open("Response copied!", "Ok", {duration: 5000});
  }




}
