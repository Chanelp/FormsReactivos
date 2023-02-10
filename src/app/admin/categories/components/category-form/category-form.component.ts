import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  valores = this.form.value;
  listaForms = [];
  animalId: number;

  constructor(
    private formBuilder: FormBuilder,
    private cs: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.animalId = params.id;
      if (this.animalId) {
        this.getAnimal();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      clasificacion: ['', Validators.required],
      imagen: ['', Validators.required],
    });
  }

  // METODOS PARA GUARDAR-TRAER DATOS DEL LOCALSTORAGE
  save(event: Event) {
    if (this.form.valid)
      if (this.animalId) {
        this.updateAnimal();
      } else {
        this.createAnimal();
      }
    else {
      this.form.markAllAsTouched();
    }
  }

  getArrForm() {
    let data = JSON.parse(localStorage.getItem('listaForms'));
    if (data != null) {
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

  updateAnimal() {
    this.valores = this.form.value;
    //this.getAnimal();
    let data = this.getAnimal();
    this.listaForms.splice(data.id - 1, 1, this.valores);
    this.cs.update(this.valores);

    this.router.navigate(['./admin/categories']);
    this.setArrForm(this.listaForms);
  }

  getAnimal() {
    let dataUpdate = this.cs.get(this.animalId);
    this.form.patchValue(dataUpdate);
    return dataUpdate;
  }

  validateName() {
    return (control: AbstractControl) => {
      const value = control.value;
      const response = this.cs.checkAnimal(value.nombre);
      if (response) {
        window.alert(
          'Este animal ya está registrado, por favor, ingresa otro.'
        );
        return { nodisponible: true };
      }
    };
  }

  // CARGA DE LA IMAGEN
  uploadImg(event) {
    const image = event.target.files[0];
    const name = `${uuidv4()}.png`;
    const ref = this.storage.ref(name);
    const animal = this.storage.upload(name, image);

    animal.percentageChanges();
    animal
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImage = ref.getDownloadURL();
          urlImage.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }

  // GETTERS
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
