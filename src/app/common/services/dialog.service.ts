import { Injectable } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(title: string, description?: string) {
    return this.dialog.open(DialogComponent, {
      maxWidth: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        title,
        description,
      }
    });
  }
}
