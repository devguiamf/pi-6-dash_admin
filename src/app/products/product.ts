
interface ItensProductData {
  id: string,
  name: string,
  description: string,
  price: number,
  isShown: boolean,
  category: {
  id: string,
    name: string,
    rootCategory: {
    "id": string,
      "name": string
    }
  },
  "image": string
}
export interface ProductsData {
  total: number,
  pages: number,
  currentPage: number,
  items: ItensProductData[]
}

export interface ProductCreateData {
  name: string
  description?: string
  price: number
  image?: any
  subCategoryId: string
  isShown?: boolean
}


