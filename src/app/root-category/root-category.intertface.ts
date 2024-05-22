import {ResponseData} from "../@shared/interface/response-interface.data";

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  editMode?: boolean;
  rootCategory: {
    id: string,
    name: string
  }
}

export interface CategoryResponseData extends ResponseData<Category> {
  total: number;
  pages: number;
  currentPage: number;
  items: Category[];
}

export interface SubCategoryResponseData extends ResponseData<SubCategory> {
  total: number;
  pages: number;
  currentPage: number;
  items: SubCategory[];
}


