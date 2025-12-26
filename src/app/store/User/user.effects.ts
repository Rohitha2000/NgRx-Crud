import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../service/user.service";
import { beginLogin, beginRegister, duplicateUser, duplicateUserSuccess, fetchMenu, fetchMenuSuccess, getRoles, getRolesSuccess, getuserbycode, getuserbycodesuccess, getUsers, getUsersSuccess, updateuserrole } from "./user.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.action";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects{
   action$ = inject(Actions);
    service = inject(UserService);
    router= inject(Router);
    
    _userRegister= createEffect(()=>
    this.action$.pipe(
        ofType(beginRegister),
        exhaustMap((action)=>{
            return this.service.userRegisteration(action.userdata).pipe(
                map(()=>{
                    this.router.navigate(['login']);
                    return showalert({message: 'Registered Successfullly', resultType: 'pass'})
                }),
                catchError((error)=> of(showalert({message: 'Registration Failed due to : '+error.message, resultType:'fail'})))
            )
        })
    ))

    _userLogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action) => {
                return this.service.userLogin(action.usercred).pipe(
                    switchMap((data) => {
                        if (data.length > 0) {
                            const _userdata = data[0];
                            if (_userdata.status === true) {
                                this.router.navigate(['']);
                                this.service.setUserToLocalStorage(data[0]);
                                return of(fetchMenu({userrole:_userdata.role}) ,showalert({ message: 'Login Successful', resultType: 'pass' }))
                            } else {
                                return of(showalert({ message: 'Inactive User', resultType: 'fail' }))
                            }
                        } else {
                            return of(showalert({ message: 'Login Failed: Invalid Credentails', resultType: 'fail' }))
                        }
                    }),
                    catchError((error) => of(showalert({ message: 'Login Failed due to : ' + error.message, resultType: 'fail' })))
                )
            })
    ))

     _duplicateUser= createEffect(()=>
    this.action$.pipe(
        ofType(duplicateUser),
        switchMap((action)=>{
            return this.service.duplicateUsername(action.username).pipe(
                switchMap((data)=>{
                    if (data.length > 0) {
                        return of(duplicateUserSuccess({isduplicate:true}),
                            showalert({message: 'Username already exists', resultType:'fail'}))  
                    } else {
                        return of(duplicateUserSuccess({isduplicate:false}))
                    }
                }),
                catchError((error)=> of(showalert({message: 'Registration Failed due to : '+error.message, resultType:'fail'})))
            )
        })
    ))

     _loadMenuByRole= createEffect(()=>
    this.action$.pipe(
        ofType(fetchMenu),
        exhaustMap((action)=>{
            return this.service.getMenuByRole(action.userrole).pipe(
                map((data)=>{
                    return fetchMenuSuccess({menulist:data});
                }),
                catchError((error)=> of(showalert({message: 'Failed to fetch menu list', resultType:'fail'})))
            )
        })
    ))

    _getAllUsers= createEffect(()=>
    this.action$.pipe(
        ofType(getUsers),
        exhaustMap((action)=>{
            return this.service.GetAllUsers().pipe(
                map((data)=>{
                    return getUsersSuccess({userlist:data});
                }),
                catchError((error)=> of(showalert({message: 'Failed to user information', resultType:'fail'})))
            )
        })
    ))

    _getAllRoles= createEffect(()=>
    this.action$.pipe(
        ofType(getRoles),
        exhaustMap((action)=>{
            return this.service.GetAllRoles().pipe(
                map((data)=>{
                    return getRolesSuccess({rolelist:data});
                }),
                catchError((error)=> of(showalert({message: 'Failed to role list', resultType:'fail'})))
            )
        })
    ))

     _getUserbyCode= createEffect(()=>
    this.action$.pipe(
        ofType(getuserbycode),
        switchMap((action)=>{
            return this.service.duplicateUsername(action.username).pipe(
                switchMap((data)=>{
                    if (data.length > 0) {
                        return of(getuserbycodesuccess({userinfo: data[0]}))  
                    } else {
                        return of(duplicateUserSuccess({isduplicate:false}))
                    }
                }),
                catchError((error)=> of(showalert({message: 'get userbycode failed due to : '+error.message, resultType:'fail'})))
            )
        })
    ))

    _assignrole= createEffect(()=>
    this.action$.pipe(
        ofType(updateuserrole),
        switchMap((action)=>{
            return this.service.updateUser(action.userid, action.userrole).pipe(
                switchMap(()=>{
                    return of(getUsers(), 
                    showalert({ message: 'Role Updated Sucessfully', resultType: 'pass' }))
                }),
                catchError((error)=> of(showalert({message: 'update role failed due to : '+error.message, resultType:'fail'})))
            )
        })
    ))
}