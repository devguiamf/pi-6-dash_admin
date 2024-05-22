import {Component, OnDestroy} from '@angular/core';
import {ListRootCategoryComponent} from "../components/list-root-category/list-root-category.component";
import {HttpClientModule} from "@angular/common/http";
import {RootCategoryService} from "../root-category.service";
import {ListSubCategoryComponent} from "../components/list-sub-category/list-sub-category.component";
import {FormsModule} from "@angular/forms";
import {CreateCategoryComponent} from "../components/create-category/create-category.component";
import {MatDialog} from "@angular/material/dialog";
import {Category, SubCategory} from "../root-category.intertface";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root-category.page',
  standalone: true,
  imports: [
    ListRootCategoryComponent,
    HttpClientModule,
    ListSubCategoryComponent,
    FormsModule
  ],
  providers:[
    RootCategoryService
  ],
  templateUrl: './root-category.page.component.html',
  styleUrl: './root-category.page.component.scss'
})
export class RootCategoryPageComponent implements OnDestroy{
  categories: Category[];
  categorySelected?: Category;
  subCategories?: SubCategory[];
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private rootCategoryService: RootCategoryService,
    private dialogCtl: MatDialog
  ) {
    this.observeCategories();
    this.observeSubCategories();
    this.getCategoriesService();
  }

  observeCategories() {
    this.rootCategoryService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (value) => {
        if(value.length > 0) {
          this.categories = value
        }
      }
    })
  }
  observeSubCategories() {
    this.rootCategoryService.subCategories$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (value) => {
        if(value.length > 0){
          this.subCategories = value
        }
      }
    })
  }
  getCategoriesService() {
    this.rootCategoryService.getCategoriesHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value.length > 0){
            this.rootCategoryService.updateCategoryList$(value)
          }
        }
      })
  }
  receiveCategorySelected(categoryId: string) {
    this.categorySelected = this.categories.find((category) => category.id === categoryId);
    this.getSucategoriesService(categoryId);
  }
  receiveSubCategoryEdit(subCategory: SubCategory) {
    this.editSubcategoryService(subCategory)
  }

  receiveSubCategoryDelete(subCategory: SubCategory) {
    this.removeSubCategoryService(subCategory)
  }
  getSucategoriesService(categoryId: string) {
    this.rootCategoryService.getSubCategoriesHttp(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value.length > 0){
            this.rootCategoryService.updateSubCategoryList$(value)
          }
        }
      })
  }
  openModalCreateCategory(){
    const dialogRef  = this.dialogCtl.open(CreateCategoryComponent)
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if(value){
          this.createCategoryService(value)
        }
      }
    })
  }
  createCategoryService(name: string){
    this.rootCategoryService.createCategoryHttp(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.addCategoryToList$(value)
          }
        }
      })
  }
  editCategoryName(category: Category) {
    this.rootCategoryService.updateCategoryHttp(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.updateCategoryInList$(category)
          }
        }
      })
  }
  editSubcategoryService(subCategory: SubCategory){
    this.rootCategoryService.updateSubCategoryHttp(subCategory)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.updateSubCategoryInList$(subCategory)
          }
        }
      })
  }

  removeCategoryService(id: string){
    this.rootCategoryService.deleteCategoryHttp(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.removeCategoryFromList$(id)
          }
        }
      })
  }

  removeSubCategoryService(subcategory: SubCategory){
    this.rootCategoryService.deleteSubCategoryHttp(subcategory.id, subcategory.rootCategory.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.removeSubCategoryFromList$(subcategory.id)
          }
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
