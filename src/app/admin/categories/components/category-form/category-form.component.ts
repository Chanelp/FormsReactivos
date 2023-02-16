import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<string>;

  @Input() category: Category;

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  percentageProgressBar = 0;
  showProgressBar = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
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
      if (this.category) {
       this.update.emit(this.form.value);
      }
      else {
        this.create.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
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
