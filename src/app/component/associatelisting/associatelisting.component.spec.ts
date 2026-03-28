import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatelistingComponent } from './associatelisting.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AssociatelistingComponent', () => {
  let component: AssociatelistingComponent;
  let fixture: ComponentFixture<AssociatelistingComponent>;
  const initialState={};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatelistingComponent],
      providers:[
         provideMockStore({ initialState }) ,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
