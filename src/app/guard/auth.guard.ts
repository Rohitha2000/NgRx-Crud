import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInfo } from '../store/model/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router= inject(Router);
  const userInfo:UserInfo= service.getUserdataFromStorage();
  let menuname='';

  if(route.url.length>0){
    menuname=route.url[0].path;
  }

  if (userInfo.username != '' && userInfo.username != null) {
    if (menuname != '') {
      service.HaveMenuAccess(userInfo.role, menuname).subscribe(item => {
        const _menudata = item;
        if (_menudata.length > 0) {
          return true;
        } else {
          alert('Unauthorized access.');
          router.navigate(['']);
          return false;
        }
      })
    } else {
      return true;
    }
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
