import { Component } from '@angular/core';
import {ListProductsComponent} from "../components/list-products/list-products.component";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    ListProductsComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

}
