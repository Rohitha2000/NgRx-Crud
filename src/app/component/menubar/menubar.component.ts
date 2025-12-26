import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Roleaccess } from '../../store/model/user.model';
import { Store } from '@ngrx/store';
import { getMenuByRole } from '../../store/User/user.selectors';
import { fetchMenu } from '../../store/User/user.action';

@Component({
  selector: 'app-menubar',
  imports: [ MatListModule,MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule,CommonModule, RouterModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {

  isMenuVisible= true;
  menulist!:Roleaccess[];
  constructor(private router:Router, private store:Store){}

  ngOnInit(){
    if(localStorage.getItem('userdata')!= null){
      let jsonstring= localStorage.getItem('userdata') as string;
      const _obj= JSON.parse(jsonstring);
      this.store.dispatch(fetchMenu({userrole:_obj.role}))
    }
    this.store.select(getMenuByRole).subscribe(item=>{
      this.menulist= item;
    })
  }
  ngDoCheck(){
     const currentRoute= this.router.url;
     if(currentRoute === '/login' || currentRoute === '/register'){
      this.isMenuVisible= false;
     }else{
      this.isMenuVisible= true;
     }
  }

}
