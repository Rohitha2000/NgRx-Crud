import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { showalert } from '../../store/Common/App.action';
import { Users } from '../../store/model/user.model';
import { beginRegister, duplicateUser } from '../../store/User/user.action';
import { RouterModule } from '@angular/router';
import { isDuplicateUser } from '../../store/User/user.selectors';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatButtonModule, RouterModule, MatRadioModule, FormsModule, CommonModule, MatInputModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup
  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
      gender: ['male', Validators.required],
    })
  }

  proceedregister() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
        const _userobj: Users = {
          username: this.registerForm.value.username as string,
          password: this.registerForm.value.password as string,
          name: this.registerForm.value.name as string,
          email: this.registerForm.value.email as string,
          phone: this.registerForm.value.phone as string,
          gender: this.registerForm.value.gender as string,
          role: 'user',
          status: true
        };
        this.store.dispatch(beginRegister({ userdata: _userobj }))
      } else {
        this.store.dispatch(showalert({ message: 'Password Mismatched', resultType: 'fail' }))
      }
    }
  }

  duplicateUser() {
    const username = this.registerForm.value.username;
    if (username != '') {
      this.store.dispatch(duplicateUser({ username: username }));
      this.store.select(isDuplicateUser).subscribe(item => {
        if (item) {
          this.registerForm.controls['username'].reset();
        }

      })
    }
  }


}
