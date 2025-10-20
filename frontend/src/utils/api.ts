import { NewsApiResponse } from "./Types";
import { BaseURL } from "./constants";
import { ApiResponse, getRequest } from "./requests";

const apiKey = import.meta.env.VITE_API_KEY || 'YOUR_API_KEY_HERE'

export const getTopHeadlines = async (category?: string, pageNo?: number): Promise<ApiResponse<NewsApiResponse>> => {
    const url = `${BaseURL}/top-headlines?country=us&apiKey=${apiKey}${category ? `&category=${category}` : ''}${pageNo ? `&page=${pageNo}` : ''}`
    return await getRequest<NewsApiResponse>(url)

}

export const getByQuery = async (query: string, pageNo?: number): Promise<ApiResponse<NewsApiResponse>> => {
    const url = `${BaseURL}/everything?apiKey=${apiKey}${query ? `&q=${query}` : ''}${pageNo ? `&page=${pageNo}` : ''}&pageSize=20`
    return await getRequest<NewsApiResponse>(url)
}