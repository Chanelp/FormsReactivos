import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCtnComponent } from './category-ctn.component';

describe('CategoryCtnComponent', () => {
  let component: CategoryCtnComponent;
  let fixture: ComponentFixture<CategoryCtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
