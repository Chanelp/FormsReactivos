import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  //Crear un Form Control -inputs
  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('');
  dateField = new FormControl('');
  numberField = new FormControl('');
  searchField = new FormControl('');
  imageField = new FormControl('');
  // Selects
  categoryField = new FormControl('tipo-1');
  multiplytagField = new FormControl('');
  // Radio y checkbox
  agreeField = new FormControl(false);
  genderField = new FormControl();
  // Preferencias
  preferencias = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    // Obtener un observable del valor
    this.nameField.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  getNameValue(){
    console.log(this.nameField.value);
  }

  get isnameFieldValid(){
    return this.nameField.touched && this.nameField.valid;
  }

  get isnameFieldInvalid(){
    return this.nameField.touched && this.nameField.invalid;
  }

}
