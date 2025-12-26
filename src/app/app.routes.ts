import { Routes } from '@angular/router';
import { AssociatelistingComponent } from './component/associatelisting/associatelisting.component';
import { CustomerlistingComponent } from './component/customerlisting/customerlisting.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { authGuard } from './guard/auth.guard';
import { MenubarComponent } from './component/menubar/menubar.component';
import { UserlistComponent } from './component/userlist/userlist.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate:[authGuard]},
    {path: 'associate', component: AssociatelistingComponent, canActivate:[authGuard]},
    {path:'customer', component: CustomerlistingComponent, canActivate:[authGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user', component:UserlistComponent}

];
