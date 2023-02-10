import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  valores = this.form.value;
  listaForms = [];
  formularios: any;

  constructor(
    private formBuilder: FormBuilder,
    private cs: CategoriesService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      clasificacion: ['', Validators.required],
      imagen: [
        'https://material.angular.io/assets/img/examples/shiba2.jpg',
        Validators.required,
      ],
    });
  }

  save(event: Event) {
    if (this.form.valid) {
      this.createAnimal();
    } else {
      this.form.markAllAsTouched();
    }
  }

  createAnimal() {
    this.valores = this.form.value;
    this.getArrForm();
    this.cs.create(this.valores);

    this.listaForms.push(this.valores);
    this.setArrForm(this.listaForms);

    console.log(this.listaForms);

    this.router.navigate(['./admin/categories']);
    this.setArrForm(this.listaForms);
  }

  getArrForm() {
    let data = JSON.parse(localStorage.getItem('listaForms'));
    if(data != null) {
      this.listaForms = data;
    }
  }

  setArrForm(data) {
    localStorage.setItem('listaForms', JSON.stringify(data));
  }

  getFormLocalStorage(id) {
    console.log(this.cs.get(id));
    // console.log(JSON.parse(localStorage.getItem(`Form${this.id}`)));
  }

  get nameField() {
    return this.form.get('nombre');
  }

  get idField() {
    return this.form.get('id');
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get isDescripcionFieldValid() {
    return this.descripcionField.touched && this.descripcionField.valid;
  }

  get isDescripcionFieldInvalid() {
    return this.descripcionField.touched && this.descripcionField.invalid;
  }

  get imageField() {
    return this.form.get('imagen');
  }
}
