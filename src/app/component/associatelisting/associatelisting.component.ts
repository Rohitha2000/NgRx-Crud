import { Component, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associate } from '../../store/model/associate.model';
import { getAssociateList, getAssociateObj } from '../../store/Associate/associate.selectors';
import { deleteAssociate, getAssociate, loadAssociate, opendialog } from '../../store/Associate/associate.action';
import {MatListModule} from "@angular/material/list"
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from "@angular/material/sort"


@Component({
  selector: 'app-associatelisting',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule,MatSortModule, CommonModule, MatTableModule, MatListModule, MatDialogModule ],
  templateUrl: './associatelisting.component.html',
  styleUrl: './associatelisting.component.css'
})
export class AssociatelistingComponent {
  associateList!:Associate[];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]= ["code", "name", "email", "phone", "address", "type", "group", "status", "action"]
  constructor(private dialog:MatDialog, private store:Store){}
  ngOnInit(){
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe(data=>{
      console.log(data)
      this.associateList= data;
      this.dataSource= new MatTableDataSource<Associate>(this.associateList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
    });

  }
  addAssociate(){
    this.openDialog(0, 'Create Associate')

  }
  openDialog(code:number, title:string){
    this.store.dispatch(opendialog());
    this.dialog.open(AddassociateComponent, {
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
    this.store.dispatch(getAssociate({id:id}));
    this.openDialog(id, 'Update Associate')
  }
  delete(id:number){
    if(confirm("do you want to remove?")){
      this.store.dispatch(deleteAssociate({id: id}))
    }
  }

}
