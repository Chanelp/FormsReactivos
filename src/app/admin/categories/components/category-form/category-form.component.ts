import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CategoriesService } from './../../../../core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<string>;
  percentageProgressBar = 0;
  showProgressBar = false;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    //Detectar id por medio de la ruta
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['id'];

      // Traer la info de la categoría al form
      if (this.categoryId) {
        this.getCategory();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          //MyValidators.validateCategory(this.categoriesService),
        ],
      ],
      image: ['', Validators.required],
    });
  }

  saveAndUpdate() {
    if (this.form.valid) {
      if (this.categoryId) {
        this.updateCategory();
      }
      else {
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data).subscribe((rta) => {
      this.router.navigate(['/admin/categories']);
    });
  }

  private updateCategory() {
    const data = this.form.value;
    this.categoriesService
      .updateCategory(this.categoryId, data)
      .subscribe((rta) => {
        this.router.navigate(['/admin/categories']);
      });
  }

  //Traer info de la categoría para ponerla en el form y actualizarla
  private getCategory() {
    this.categoriesService.getCategory(this.categoryId).subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  uploadFile(event) {
    this.showProgressBar = true;
    const image = event.target.files[0];
    const name = `categories/${image.name}`;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task
      .percentageChanges()
      .pipe(map(Math.ceil))
      .pipe(
        finalize(() => {
          this.image$ = ref.getDownloadURL();
          this.image$.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
          this.showProgressBar = false;
        })
      )
      .subscribe((per) => {
        this.percentageProgressBar = per;
      });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }
}
