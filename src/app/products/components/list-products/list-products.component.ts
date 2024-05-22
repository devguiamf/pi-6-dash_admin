import { Component } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {UserData} from "../../../clients/clients-interface";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteProductComponent} from "../dialog-delete-product/dialog-delete-product.component";

import {CreateProductComponent} from "../create-product/create-product.component";
import {ProductsData} from "../../product";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    MatFormField,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatInput,
    MatHeaderRow,
    MatRow,
    MatLabel,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRowDef,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  displayedColumns: string[] = ['cod', 'image', 'name', 'category', 'price', 'actions']
  dataSource: MatTableDataSource<ProductsData>;

  ELEMENT_DATA: ProductsData = {
    pages: 1,
    total: 1,
    currentPage: 1,
    items: [
      {
        id: '1',
        name: 'Cadeira',
        description: 'Cadeira de escritório',
        price: 100,
        isShown: true,
        category: {
          id: '1',
          name: 'Móveis',
          rootCategory: {
            id: '1',
            name: 'Casa'
          }
        },
        image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg'
      },
      {
        id: '2',
        name: 'Mesa',
        description: 'Mesa de escritório',
        price: 200,
        isShown: true,
        category: {
          id: '1',
          name: 'Móveis',
          rootCategory: {
            id: '1',
            name: 'Casa'
          }
        },
        image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg'
      },
      {
        id: '3',
        name: 'Mouse',
        description: 'Mouse de computador',
        price: 50,
        isShown: true,
        category: {
          id: '2',
          name: 'Informática',
          rootCategory: {
            id: '1',
            name: 'Casa'
          }
        },
        image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg'
      },
      {
        id: '4',
        name: 'Teclado',
        description: 'Teclado de computador',
        price: 100,
        isShown: true,
        category: {
          id: '2',
          name: 'Informática',
          rootCategory: {
            id: '1',
            name: 'Casa'
          }
        },
        image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg'
      }
    ]
  }

  constructor(private dialog: MatDialog) {
    // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDeleteProduct(product: UserData) {
    const dialogRef = this.dialog.open(DialogDeleteProductComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        name: product.name,
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogCreateProduct() {
    this.dialog.open(CreateProductComponent, {
      width: 'auto',
      height: 'auto',
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogEditProduct(product: ProductsData) {
    console.log('Open dialog edit product');
  };
}
