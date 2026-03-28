import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    const initialState={};
    await TestBed.configureTestingModule({
      imports: [AppComponent],
            providers:[
               provideMockStore({ initialState }) ,
               provideRouter([])
            ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'NgrxCrud' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.title= 'NgrxCrud';
    expect(app.title).toEqual('NgrxCrud');
  });
});
