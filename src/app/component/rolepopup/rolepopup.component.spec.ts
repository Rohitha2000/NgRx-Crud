import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolepopupComponent } from './rolepopup.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('RolepopupComponent', () => {
  let component: RolepopupComponent;
  let fixture: ComponentFixture<RolepopupComponent>;
  const initialState= {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolepopupComponent],
        providers:[
                provideMockStore({ initialState }) ,
                  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: {} }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

