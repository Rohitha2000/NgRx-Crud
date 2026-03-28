import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistComponent } from './userlist.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;
  const initialState={};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserlistComponent],
        providers:[
                      provideMockStore({ initialState }) ,
              ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
