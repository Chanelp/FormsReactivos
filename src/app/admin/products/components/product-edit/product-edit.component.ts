import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  form: UntypedFormGroup;
  id: number;
  categories: Category[] = [];
  states = [
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'New York', abbrev: 'NY' },
    { name: 'Pennsylvania', abbrev: 'PA' },
  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productsService.getProduct(this.id).subscribe((product) => {
        this.form.patchValue({
          ...product,
          state: this.states[0] //Valor por defecto
        });
      });
    });
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService
        .updateProduct(this.id, product)
        .subscribe((newProduct) => {
          console.log(newProduct);
          this.router.navigate(['./admin/products']);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      state: ['', Validators.required],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  private getCategories() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
