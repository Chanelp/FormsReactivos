import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  form: UntypedFormGroup;
  image$: Observable<any>;
  images = [];
  categories: Category[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product).subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: [this.images[0], Validators.required],
      categoryId: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: [100, Validators.required],
    });

    this.form.get('stock').valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe((url) => {
            console.log(url);
            this.images.push(url);
            this.form.get('images').setValue(this.images);
          });
        })
      )
      .subscribe();
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
