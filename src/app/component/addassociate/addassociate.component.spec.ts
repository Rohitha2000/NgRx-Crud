import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassociateComponent } from './addassociate.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

describe('AddassociateComponent', () => {
  let component: AddassociateComponent;
  let fixture: ComponentFixture<AddassociateComponent>;
const initialState= {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddassociateComponent],
      providers: [
        provideMockStore({initialState}),
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: {} }
]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddassociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
