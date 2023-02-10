import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Animals } from 'src/app/core/models/animals.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  formularios = JSON.parse(localStorage.getItem('listaForms'));

  constructor(private cs: CategoriesService) { }

  ngOnInit(): void {
    console.log(this.formularios);
    //this.getAllInfo();
  }

  // getAllInfo(){
  //   this.formularios = this.cs.getAllInfo();
  //   console.log(this.formularios);
  // }

}
