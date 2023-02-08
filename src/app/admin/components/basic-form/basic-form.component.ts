import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(''),
    phone: new FormControl(''),
    color: new FormControl('#000000'),
    date: new FormControl(''),
    id: new FormControl(''),
    search: new FormControl(''),
    image: new FormControl(''),
    category: new FormControl('tipo-1'),
    multiply: new FormControl(''),
    agree: new FormControl(false),
    gender: new FormControl(false),
    preferencias: new FormControl('')
  });

  valores = this.form.value;
  formValue = JSON.parse(localStorage.getItem('Form'))

  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }

  // Save in LocalStorage
  save(event: Event) {
    if(this.form.invalid) {
      this.form.controls.name.markAllAsTouched();

      return;
    }

    this.valores = this.form.value;
    localStorage.setItem(`Form${this.valores.id}`, JSON.stringify(this.valores));
    console.log(this.formValue);
  }

  get nameField(){
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


