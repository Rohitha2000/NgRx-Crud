import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { getCustomerObj } from '../../store/Customer/customer.selectors';
import { addCustomer, loadCustomer, updateCustomer } from '../../store/Customer/customer.action';
import { Customer } from '../../store/model/customer.model';

@Component({
  selector: 'app-addcustomer',
  imports: [ReactiveFormsModule,MatCardModule, MatButtonModule,MatInputModule, MatButtonModule
              ,MatSelectModule, MatRadioModule, MatCheckboxModule, CommonModule],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddCustomerComponent {
 customerForm!:FormGroup;
  isedit= false;
  dialogdata: any;
  title = 'Create Customer';
  editcode!:number;
  editdata!:Customer;
  constructor(private fb: FormBuilder, private ref:MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private store:Store
  ){
     this.customerForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      type: ['CUSTOMER'],
      group: ['level1'],
      status: [true]

    })
  }
  

  ngOnInit() {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.editcode = this.dialogdata.code;
    if (this.editcode > 0) {
      this.store.select(getCustomerObj(this.editcode)).subscribe(res => {
        this.editdata = res as Customer;
        this.customerForm.setValue({
          id: this.editdata.id, name: this.editdata.name, email: this.editdata.email, phone: this.editdata.phone,
          address: this.editdata.address, group: this.editdata.group, type: this.editdata.type, status: this.editdata.status
        })
      })
    }
   



  }

  closeDialog(){
    this.ref.close();
  }

  saveCustomer(){
    if(this.customerForm.valid){
      const _obj:Customer={
          id: this.customerForm.value.id as number,
        name: this.customerForm.value.name as string,
        email: this.customerForm.value.email as string,
        phone: this.customerForm.value.phone as string,
        group: this.customerForm.value.group as string,
        address: this.customerForm.value.address as string,
        type: this.customerForm.value.type as string,
        status: this.customerForm.value.status as boolean
      }
      if(_obj.id===0){
      this.store.dispatch(addCustomer({inputdata: _obj}));
      setTimeout(() => {
        this.store.dispatch(loadCustomer());
      }, );
      
      } else{
        this.store.dispatch(updateCustomer({inputdata: _obj}));
      }
      this.closeDialog();
    }
  }
}
