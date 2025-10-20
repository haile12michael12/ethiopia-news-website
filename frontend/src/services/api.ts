import axios from 'axios';
import { Article, Category, Region, Comment, Submission } from '../types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { email: string; username: string; password: string; full_name?: string }) =>
    api.post('/auth/register', data),
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),
};

export const articlesAPI = {
  getAll: (params?: { skip?: number; limit?: number; category_id?: number; region_id?: number; search?: string }) =>
    api.get<Article[]>('/articles', { params }),
  getOne: (id: number) =>
    api.get<Article>(`/articles/${id}`),
  getTrending: (params?: { region_id?: number; limit?: number }) =>
    api.get<Article[]>('/articles/trending', { params }),
  getBreaking: () =>
    api.get<Article[]>('/articles', { params: { is_breaking: true, limit: 5 } }),
  create: (data: Partial<Article>) =>
    api.post<Article>('/articles', data),
  update: (id: number, data: Partial<Article>) =>
    api.put<Article>(`/articles/${id}`, data),
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ url: string }>('/articles/upload-image', formData);
  },
};

export const categoriesAPI = {
  getAll: () => api.get<Category[]>('/categories'),
  create: (data: Partial<Category>) => api.post<Category>('/categories', data),
};

export const regionsAPI = {
  getAll: () => api.get<Region[]>('/regions'),
  create: (data: Partial<Region>) => api.post<Region>('/regions', data),
};

export const commentsAPI = {
  getByArticle: (articleId: number) =>
    api.get<Comment[]>(`/comments/article/${articleId}`),
  create: (data: { article_id: number; content: string }) =>
    api.post<Comment>('/comments', data),
  approve: (id: number) =>
    api.put(`/comments/${id}/approve`),
};

export const submissionsAPI = {
  create: (data: Partial<Submission>) =>
    api.post<Submission>('/submissions', data),
  getAll: (params?: { status?: string; skip?: number; limit?: number }) =>
    api.get<Submission[]>('/submissions', { params }),
  updateStatus: (id: number, status: string) =>
    api.put(`/submissions/${id}/status`, null, { params: { status } }),
};

export default api;
