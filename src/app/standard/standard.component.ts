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
  copied: boolean = false;

  updateDisplayText(): void {
    this.displayText = this.c1s.fixUpAligns(this.editableText);
    
  }

  displayCopyMessage(): void {
    this._snackBar.open("Response copied!", "Ok");
  }




}
