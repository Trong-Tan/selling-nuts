import { request } from "@/utils/request"

export interface SubCategory {
    id:string,
    name:string,
    categoryId:string
}

export const fetchSubCategories = async (): Promise<SubCategory[]> => {
    const res =  await request.get(`/subcategories`);
    return res.data.data
}

export const getSubCategoriesById = async (categoryId:string ) => {
    const res = await request.get(`/subcategory/${categoryId}`)
    return res.data.data
} 