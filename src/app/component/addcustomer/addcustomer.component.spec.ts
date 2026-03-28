import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerComponent } from './addcustomer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

describe('AddcustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;
  const initialState={};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerComponent],
            providers: [
              provideMockStore({initialState}),
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: {} }
]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
