import {Component, Inject, Output} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  category?: string
  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
  ) {
  }

  createCategory(){
    this.dialogRef.close({
      name: this.category
    })
  }
}
