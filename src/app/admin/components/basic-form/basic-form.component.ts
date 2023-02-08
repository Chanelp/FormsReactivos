import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  valores = this.form.value;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    //Escuchar los cambios un campo forma reactiva
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });

    //Escuchar los cambios de todos los campos forma reactiva
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });

    //Subscribirse a un solo field usando formGroup
    this.form.get('name').valueChanges.subscribe(v => {
      console.log(v);
    });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  // Save in LocalStorage
  save(event: Event) {
    if (this.form.valid) {
      this.valores = this.form.value;
      localStorage.setItem(
        `Form${this.valores.id}`,
        JSON.stringify(this.valores)
      );

      this.getFormLocalStorage(this.valores.id);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getFormLocalStorage(id) {
    console.log(JSON.parse(localStorage.getItem(`Form${id}`)));
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      email: [''],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      id: [1],
      search: [''],
      image: [''],
      category: ['tipo-1'],
      multiply: [''],
      agree: [false],
      gender: [false],
      preferencias: [''],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get idField() {
    return this.form.get('id');
  }

  get searchField() {
    return this.form.get('search');
  }

  get imageField() {
    return this.form.get('image');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('multiply');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get preferenciasField() {
    return this.form.get('preferencias');
  }
}
