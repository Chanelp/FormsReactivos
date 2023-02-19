// Dejando las responsabilidades de forma independiente
// SMART COMPONENT

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-ctn',
  templateUrl: './category-ctn.component.html',
  styleUrls: ['./category-ctn.component.scss'],
})
export class CategoryCtnComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  category: Category;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Detectar id por medio de la ruta
    this.route.params.subscribe((params: Params) => {
      // Traer la info de la categoría al form
      if (params['id']) {
        this.getCategory(params['id']);
      }
    });
  }

  createCategory(data) {
    this.categoriesService.createCategory(data).subscribe((rta) => {
      this.router.navigate(['/admin/categories']);
    });
  }

  updateCategory(data) {
    this.categoriesService
      .updateCategory(this.category.id, data)
      .subscribe((rta) => {
        this.router.navigate(['/admin/categories']);
      });
  }

  //Traer info de la categoría para ponerla en el form y actualizarla
  private getCategory(id) {
    this.categoriesService.getCategory(id).subscribe((data) => {
      this.category = data;
    });
  }
}
