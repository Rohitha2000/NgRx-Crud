import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Users } from '../../store/model/user.model';
import { getUsers } from '../../store/User/user.action';
import { getUsersList } from '../../store/User/user.selectors';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RolepopupComponent } from '../rolepopup/rolepopup.component';

@Component({
  selector: 'app-userlist',
  imports:  [MatCardModule, MatButtonModule, MatPaginatorModule,MatSortModule, CommonModule, MatTableModule, MatListModule, MatDialogModule ],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  userList!:Users[];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  constructor(private store:Store, private dialog:MatDialog){}

  ngOnInit(){
    this.store.dispatch(getUsers());
    this.store.select(getUsersList).subscribe(item=>{
      this.userList= item;
      this.dataSource= new MatTableDataSource<Users>(this.userList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
    })
  }

  changeRole(username:string){
    this.openDialog(username )
  }

  openDialog(username:string){
      this.dialog.open(RolepopupComponent, {
        width: '30%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data:{
          code:username,
        }
      
      })
    }

}
