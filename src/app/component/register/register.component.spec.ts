import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
 const initialState = { };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
       providers: [
        provideMockStore({ initialState }) ,// 2. Add this provider,
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
