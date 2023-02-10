import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Animals } from '../models/animals.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  get(id){
    return JSON.parse(localStorage.getItem(`Form${id}`));
  }

  create(data: Animals){
    return localStorage.setItem(`Form${data.id}`,JSON.stringify(data));
  }

  update(data: Animals){
    return localStorage.setItem(`Form${data.id}`,JSON.stringify(data));
  }

  setAll(){

  }

}
