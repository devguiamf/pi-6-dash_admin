import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, Subject} from "rxjs";
import {
  Category,
  CategoryResponseData,
  SubCategory, SubCategoryResponseData
} from "./root-category.intertface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {api} from "../api";
import {SnackBarNotificationService} from "../@shared/services/snack-bar-notification.service";
import {Search} from "../@shared/util/search";
import {LocalStorageService, StorageKeys} from "../@shared/services/local-storage";

@Injectable({
  providedIn: 'root'
})
export class RootCategoryService {
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  subCategories$: BehaviorSubject<SubCategory[]> = new BehaviorSubject<SubCategory[]>([]);

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarNotificationService,
    private localStorageService: LocalStorageService
  ) {

  }

  get headersHttp(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getCategoriesHttp(pageOptions?: CategoryPageOptions): Observable<Category[]> {
    return of([
      {
        id: '1',
        name: 'Category 1'
      },
      {
        id: '2',
        name: 'Category 2'
      },
      {
        id: '3',
        name: 'Category 3'
      },
      {
        id: '4',
        name: 'Category 4'
      },
      {
        id: '5',
        name: 'Category 5'
      },
      {
        id: '6',
        name: 'Category 6'
      },
      {
        id: '7',
        name: 'Category 7'
      },
      {
        id: '8',
        name: 'Category 8'
      },
      {
        id: '9',
        name: 'Category 9'
      },
      {
        id: '10',
        name: 'Category 10'
      }
    ])
    // const queryPageOptions = pageOptions
    //   ? Search.toQuerySearchOptions(pageOptions)
    //   : Search.InitialSearchOptions()
    //
    // return this.http.get<CategoryResponseData>(`${api}/admin/categories${queryPageOptions}`, {
    //   headers: this.headersHttp
    // })
    //   .pipe(
    //     map((category) => category.items),
    //     catchError(err => {
    //       this.snackBarService.openSuccessSnackBar('Ops, algo deu errado: ' + err.error.message)
    //       return of([])
    //     })
    //   )
  }

  getSubCategoriesHttp(idCategory: string): Observable<SubCategory[]> {

    return of([
      {
        id: '1',
        name: 'Sub Category 1',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '2',
        name: 'Sub Category 2',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '3',
        name: 'Sub Category 3',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '4',
        name: 'Sub Category 4',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '5',
        name: 'Sub Category 5',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '6',
        name: 'Sub Category 6',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '7',
        name: 'Sub Category 7',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '8',
        name: 'Sub Category 8',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '9',
        name: 'Sub Category 9',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      },
      {
        id: '10',
        name: 'Sub Category 10',
        rootCategory: {
          id: '1',
          name: 'Category 1'
        },
        editMode: false
      }
    ])

    // return this.http.get<SubCategoryResponseData>(
    //   `${api}/admin/categories/${idCategory}/sub-category`,
    //   { headers: this.headersHttp }
    // ).pipe(
    //   map((subCategory) => subCategory.items),
    //   catchError(err => {
    //     this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
    //     return of([])
    //   })
    // )
  }

  updateCategoryHttp(category: Category): Observable<any>{
    return this.http.patch<any>(`${api}/admin/categories/${category.id}`,
      {name: category.name},
      {headers: this.headersHttp}
    ).pipe(
        catchError(err => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
          return of([])
        })
      )
  }

  updateSubCategoryHttp(subCategory: SubCategory): Observable<any>{
    return this.http.patch<any>(`${api}/categories/${subCategory.rootCategory.id}/sub-category/${subCategory.id}`,
      {name: subCategory.name},
      { headers: this.headersHttp }
    ).pipe(
      catchError(err => {
        this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
        return of([])
      })
    )
  }

  deleteSubCategoryHttp(subcategoryId: string, categoryId: string): Observable<any>{
    return this.http.delete(
      `${api}/admin/categories/${subcategoryId}/sub-category/${categoryId}`,
      { headers: this.headersHttp })
      .pipe(
        catchError(err => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
          return of([])
        })
      )
  }

  deleteCategoryHttp(idCategory: string): Observable<any>{
    return this.http.delete(
      `${api}/admin/categories/${idCategory}`,
      { headers: this.headersHttp }
    ).pipe(
      catchError(err => {
        this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
        return of([])
      })
    )
  }

  createCategoryHttp(name: string): Observable<Category>{
    return this.http.post<Category>(
      `${api}/admin/categories`,
      {name},
      { headers: this.headersHttp }
    ).pipe(
      catchError(err => {
        this.snackBarService.openErrorSnackBar('Ops, algo de deu errado: ' + err.error.message)
        return of(null)
      })
    )
  }

  createSubCategoryHttp(subCategory: SubCategory): Observable<SubCategory>{
    return this.http.post<SubCategory>(
      `${api}/admin/categories/${subCategory.rootCategory.id}/sub-category`,
      {name: subCategory.name},
      { headers: this.headersHttp }
    ).pipe(
      catchError(err => {
        this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
        return of(null)
      })
    )
  }

  updateCategoryList$(list: Category[]){
    this.localStorageService.set(StorageKeys.categoryList, list);
    this.categories$.next(list);
  }

  updateSubCategoryList$(list: SubCategory[]){
    this.subCategories$.next(list);
  }

  addCategoryToList$(category: Category){
    const currentList = this.categories$.value;
    this.updateCategoryList$([category, ...currentList]);
    this.localStorageService.set(StorageKeys.categoryList, [category, ...currentList]);
  }

  addSubCategoryToList$(subCategory: SubCategory){
    const currentList = this.subCategories$.value;
    this.updateSubCategoryList$([subCategory, ...currentList]);
  }

  removeCategoryFromList$(id: string){
    const currentList = this.categories$.value;
    const listFiltered = currentList.filter((category) => category.id !== id);
    this.updateCategoryList$(listFiltered);
    this.localStorageService.set(StorageKeys.categoryList, listFiltered);
  }

  removeSubCategoryFromList$(id: string){
    const currentList = this.subCategories$.value;
    this.updateSubCategoryList$(currentList.filter((subCategory) => subCategory.id !== id));
  }

  updateCategoryInList$(category: Category){
    const currentList = this.categories$.value;
    const listFiltered = currentList.map((cat) => {
      if(cat.id === category.id){
        return category;
      }
      return cat;
    });
    this.updateCategoryList$(listFiltered);
    this.localStorageService.set(StorageKeys.categoryList, listFiltered);
  }

  updateSubCategoryInList$(subCategory: SubCategory){
    const currentList = this.subCategories$.value;
    const listFiltered = currentList.map((subCat) => {
      if(subCat.id === subCategory.id){
        return subCategory;
      }
      return subCat;
    });
    this.updateSubCategoryList$(listFiltered);
  }

}

export interface CategoryPageOptions {
  page: number;
  limit: number;
  name: string;
}
