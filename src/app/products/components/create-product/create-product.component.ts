import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  formCreateProduct: FormGroup;

  categories = [
    {id: 1, name: 'Eletrodomésticos'},
    {id: 2, name: 'Informática'},
    {id: 3, name: 'Móveis'},
    {id: 4, name: 'Decoração'},
    {id: 5, name: 'Esportes'},
    {id: 6, name: 'Roupas'},
    {id: 7, name: 'Calçados'},
  ]

  constructor() {
    this.buildForm();
  }

  buildForm() {
    this.formCreateProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
      subCategory: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  selectCategory(event: any) {
    console.log(event);
  }

  createProduct() {
    console.log(this.formCreateProduct.value);
  }

  processFilesSelected(event: any) {
    const files: any[] = []
    for (let i = 0; i < event.target.files.length; i++) {
      const file: File = event.target.files[i];
      this.isImageFile(file) ? files.push(file) : this.alertErrorFileIsNotImage();
    }
    this.formCreateProduct.get('image')?.setValue(files);
  }

  isImageFile(file: File): boolean {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  }

  alertErrorFileIsNotImage() {
    alert('As imagens para o produto devem ser do tipo PNG ou JPG');
  }
}
