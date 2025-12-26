import { createReducer, on } from "@ngrx/store";
import { userAdapter, userState } from "./user.state";
import { duplicateUserSuccess, fetchMenuSuccess, getRolesSuccess, getuserbycodesuccess, getUsersSuccess } from "./user.action";

const _userReducer= createReducer(userState,
    on(duplicateUserSuccess, (state, action)=>{
      return {...state, isDuplicate:action.isduplicate}
    }),
     on(fetchMenuSuccess, (state, action)=>{
      return {...state, menulist:action.menulist}
    }),
     on(getUsersSuccess, (state, action)=>{
      return userAdapter.setAll(action.userlist, state)
    }),
     on(getRolesSuccess, (state, action)=>{
      return {...state, roles:action.rolelist}
    }),
    on(getuserbycodesuccess, (state,action)=>{
        return {...state,userInfo:action.userinfo}
    })
);

export function UserReducer(state:any, action:any){
    return _userReducer(state,action);

}