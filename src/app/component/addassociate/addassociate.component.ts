import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Associate } from '../../store/model/associate.model';
import { addAssociate, loadAssociate, updateAssociate } from '../../store/Associate/associate.action';
import { getAssociateList, getAssociateObj } from '../../store/Associate/associate.selectors';

@Component({
  selector: 'app-addassociate',
  imports: [ReactiveFormsModule,MatCardModule, MatButtonModule,MatInputModule, MatButtonModule
              ,MatSelectModule, MatRadioModule, MatCheckboxModule, CommonModule],
  templateUrl: './addassociate.component.html',
  styleUrl: './addassociate.component.css'
})
export class AddassociateComponent {
  associateForm!:FormGroup;
  isedit= false;
  dialogdata: any;
  title = 'Create Associate';
  constructor(private fb: FormBuilder, private ref:MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private store:Store
  ){}
  

  ngOnInit(){
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.associateForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email:['', Validators.required],
    phone:['', Validators.required],
    address:['', Validators.required],
    type: ['CUSTOMER'],
    group: ['level1'],
    status: [true]
    
  })

  this.store.select(getAssociateObj).subscribe(res=>{
      this.associateForm.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone,
        address: res.address, group: res.group, type: res.type, status: res.status
      })
  })

  }

  closeDialog(){
    this.ref.close();
  }

  saveAssociate(){
    if(this.associateForm.valid){
      const _obj:Associate={
          id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        group: this.associateForm.value.group as string,
        address: this.associateForm.value.address as string,
        type: this.associateForm.value.type as string,
        status: this.associateForm.value.status as boolean
      }
      if(_obj.id===0){
      this.store.dispatch(addAssociate({inputdata: _obj}));
      setTimeout(() => {
        this.store.dispatch(loadAssociate());
      }, );
      
      } else{
        this.store.dispatch(updateAssociate({inputdata: _obj}));
      }
      this.closeDialog();
    }
  }

}
