import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  //Crear un Form Control -inputs
  nameField = new FormControl('Aprendiendo Reactive Forms');
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

}
