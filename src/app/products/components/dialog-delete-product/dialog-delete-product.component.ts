import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-product',
  standalone: true,
  imports: [
    MatDialogClose
  ],
  templateUrl: './dialog-delete-product.component.html',
  styleUrl: './dialog-delete-product.component.scss'
})
export class DialogDeleteProductComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit(): void {
    console.log(this.data, 'Data');
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  deleteProduct() {
    this.dialogRef.close(true);
  }


}
