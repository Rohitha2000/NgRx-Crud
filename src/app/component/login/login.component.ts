import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UserCredentials } from '../../store/model/user.model';
import { beginLogin } from '../../store/User/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, RouterModule, CommonModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!:FormGroup;
  constructor(private fb:FormBuilder, private store:Store){
    this.loginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(){
    localStorage.clear()
  }

  proceedLogin(){
    if(this.loginForm.valid){
      const _obj:UserCredentials={
         username: this.loginForm.value.username as string,
         password: this.loginForm.value.password as string
      };
      this.store.dispatch(beginLogin({usercred: _obj}));

    }
  }

  resetLogin(){
    this.loginForm.reset();
  }

}
