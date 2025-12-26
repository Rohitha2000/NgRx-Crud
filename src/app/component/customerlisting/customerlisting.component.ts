import { Component, ViewChild } from '@angular/core';
import { Customer } from '../../store/model/customer.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { deleteCustomer, getCustomer, loadCustomer, opendialog } from '../../store/Customer/customer.action';
import { getCustomerList, getErrorMessage } from '../../store/Customer/customer.selectors';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { AddCustomerComponent } from '../addcustomer/addcustomer.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-customerlisting',
  imports:  [MatCardModule, MatButtonModule, MatPaginatorModule,MatSortModule, CommonModule, MatTableModule, MatListModule, MatDialogModule ],
  templateUrl: './customerlisting.component.html',
  styleUrl: './customerlisting.component.css'
})
export class CustomerlistingComponent {
  customerList!:Customer[];
  dataSource:any;
  errorMessage='';
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]= ["code", "name", "email", "phone", "address", "type", "group", "status", "action"]
  constructor(private dialog:MatDialog, private store:Store){}
  ngOnInit(){
    this.store.dispatch(loadCustomer());
    this.store.select(getErrorMessage).subscribe(res=> this.errorMessage= res)
    this.store.select(getCustomerList).subscribe(data=>{
      console.log(data)
      this.customerList= data;
      this.dataSource= new MatTableDataSource<Customer>(this.customerList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
    });

  }
  addCustomer(){
    this.openDialog(0, 'Create Customer')

  }
  openDialog(code:number, title:string){
    this.dialog.open(AddCustomerComponent, {
      width: '50%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data:{
        code:code,
        title:title
      }
    
    })
  }

  edit(id:number){
   this.store.dispatch(getCustomer({id:id}));
   this.openDialog(id, 'Update Customer')
  }
  delete(id:number){
    if(confirm("do you want to remove?")){
      this.store.dispatch(deleteCustomer({id: id}))
    }
  }

}
