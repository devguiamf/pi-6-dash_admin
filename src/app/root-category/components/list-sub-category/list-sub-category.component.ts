import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RootCategoryService} from "../../root-category.service";
import {SubCategory} from "../../root-category.intertface";

@Component({
  selector: 'app-list-sub-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './list-sub-category.component.html',
  styleUrl: './list-sub-category.component.scss'
})
export class ListSubCategoryComponent {
  @Input() subCategories: SubCategory[];
  @Output() subCategoryEdit: EventEmitter<SubCategory> = new EventEmitter<SubCategory>()
  @Output() subCategoryDelete: EventEmitter<SubCategory> = new EventEmitter<SubCategory>()
  constructor(private rootCategoryService: RootCategoryService) {
  }

  activeEditMode(subCategory: SubCategory){
    subCategory.editMode = true;
  }
  saveSubCategoryEdit(subCategory: SubCategory){
    this.subCategoryEdit.emit(subCategory);
    subCategory.editMode = false;
  }
  deleteSubCategory(subCategory: SubCategory){
    this.subCategoryDelete.emit(subCategory);
  }
}
