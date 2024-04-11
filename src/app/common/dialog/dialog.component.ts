import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type DataDialog = {
  title: string;
  description?: string;
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  title = '';
  description = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataDialog, private dialogRef: MatDialogRef<DialogComponent>) {
    this.title = data.title;
    this.description = data.description || '';
  }

  salvar() {
    this.dialogRef.close(true);
  }
}
