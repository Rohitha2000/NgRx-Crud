import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Roles, UserInfo } from '../../store/model/user.model';
import { getRoles, getuserbycode, updateuserrole } from '../../store/User/user.action';
import { getRolesList, getUserByCode } from '../../store/User/user.selectors';

@Component({
  selector: 'app-rolepopup',
  imports: [ReactiveFormsModule, MatCardModule, MatSelectModule, RouterModule, CommonModule, MatButtonModule, MatInputModule],
  templateUrl: './rolepopup.component.html',
  styleUrl: './rolepopup.component.css'
})
export class RolepopupComponent {
  roleForm!:FormGroup;
   rolelist: Roles[]=[];
   userInfo!: UserInfo;

  constructor(private fb:FormBuilder, private store:Store, private ref:MatDialogRef<RolepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ){
    this.roleForm= this.fb.group({
      id: [''],
      username: [{value: '', disabled:true}],
      role:['', Validators.required]
    })
  }

  ngOnInit(){
    this.store.dispatch(getRoles());
    this.store.select(getRolesList).subscribe(item =>{
      this.rolelist= item;
    })
    if(this.data != null){
      this.store.dispatch(getuserbycode({username: this.data.code}))
      this.store.select(getUserByCode).subscribe(item=>{
          this.userInfo= item;
          this.roleForm.setValue({
            username: this.userInfo.username,
            role: this.userInfo.role,
            id: this.userInfo.id
          })
      })
    }

  }
  saveUserRole(){
    if(this.roleForm.valid){
      this.store.dispatch(updateuserrole({userrole: this.roleForm.value.role, userid: this.roleForm.value.id}))
      this.closePopup();
    }
  }

  closePopup(){
   this.ref.close();

  }

}
