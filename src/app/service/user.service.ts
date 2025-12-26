import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Roleaccess, Roles, UserCredentials, UserInfo, Users } from "../store/model/user.model";
import { Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseurl= 'http://localhost:3000/user';

 // private http = inject(HttpClient);
 constructor(private http:HttpClient){}


  userRegisteration(userdata: Users){
    return this.http.post(this.baseurl, userdata);
  }

  userLogin(userdata: UserCredentials){
    return this.http.get<UserInfo[]>(this.baseurl+'?username='+userdata.username+'&password='+userdata.password);
  }

  duplicateUsername(username:string){
    return this.http.get<UserInfo[]>(this.baseurl+'?username='+username);
  }

  getMenuByRole(userrole:string): Observable<Roleaccess[]>{
    return this.http.get<Roleaccess[]>('http://localhost:3000/roleaccess?role='+ userrole);
  }

  HaveMenuAccess(userrole: string, menuname: string): Observable<Roleaccess[]> {
    return this.http.get<Roleaccess[]>('http://localhost:3000/roleaccess?role=' + userrole + '&menu=' + menuname);
  }

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseurl);
  }

  GetAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>('http://localhost:3000/role');
  }

  updateUser(userid:number, role:string){
    return this.http.get<Users>(this.baseurl+'/'+userid).pipe(
        switchMap((data)=>{
            data.role= role;
            return this.http.put(this.baseurl+'/'+userid, data);
        })
    )
  }

  setUserToLocalStorage(userdata:UserInfo){
    localStorage.setItem('userdata', JSON.stringify(userdata));
  }
  getUserdataFromStorage(){
    let _obj:UserInfo={
        id:0,
        username:'',
        email:'',
        name:'',
        role:'',
        status:false
    }
    if(localStorage.getItem('userdata') != null){
        let jsonstring= localStorage.getItem('userdata') as string;
         _obj = JSON.parse(jsonstring);
        return _obj;
    }else{
        return _obj;
    }
  }


}