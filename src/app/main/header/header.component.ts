import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogComponent } from '../open-dialog/open-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public dialog: MatDialog,
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(OpenDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  onMouseEnter() {
    const dialogRef = this.dialog.open(OpenDialogComponent);
    dialogRef.afterClosed().subscribe(() => {});
  }
}
