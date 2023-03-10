import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategory(id) {
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories/`);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories/`, data);
  }

  updateCategory(id: number, data: Partial<Category>) {
    return this.http.put<Category>(
      `${environment.url_api}/categories/${id}`,
      data
    );
  }

  checkCategory(name: string) {
    return this.http.post(`${environment.url_api}/categories/availability`, {
      name,
    });
  }
}
