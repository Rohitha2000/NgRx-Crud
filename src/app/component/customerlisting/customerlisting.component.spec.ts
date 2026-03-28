import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlistingComponent } from './customerlisting.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CustomerlistingComponent', () => {
  let component: CustomerlistingComponent;
  let fixture: ComponentFixture<CustomerlistingComponent>;
  const initialState={};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerlistingComponent],
       providers:[
               provideMockStore({ initialState }) ,
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
