import { createAction, props } from "@ngrx/store";
import { Menus, Roleaccess, Roles, UserCredentials, UserInfo, Users } from "../model/user.model";

export const BEGIN_REGISTER= '[auth] begin register';
export const BEGIN_LOGIN= '[auth] begin login';
export const DUPLICATE_USER= "[user] duplicate user";
export const DUPLICATE_USER_SUCCESS='[user] duplicate user success'
export const FETCH_MENU= "[user] fetch menu";
export const FETCH_MENU_SUCCESS='[user] fetch menu success'
export const GET_USERS = "[user] get user";
export const GET_USERS_SUCCESS='[user] get user success'
export const GET_ROLES = "[role] get roles";
export const GET_ROLES_SUCCESS='[role] get roles success'
export const GET_USERBYCODE='[user] get userbycode'
export const GET_USERBYCODE_SUCC='[user] get userbycode succ'
export const UPDATE_ROLE='[user] update role'

export const beginRegister= createAction(BEGIN_REGISTER, props<{userdata:Users}>())
export const beginLogin= createAction(BEGIN_LOGIN, props<{usercred:UserCredentials}>())
export const duplicateUser = createAction(DUPLICATE_USER, props<{username:string}>())
export const duplicateUserSuccess= createAction(DUPLICATE_USER_SUCCESS, props<{isduplicate:boolean}>())
export const fetchMenu = createAction(FETCH_MENU, props<{userrole:string}>())
export const fetchMenuSuccess= createAction(FETCH_MENU_SUCCESS, props<{menulist:Roleaccess[]}>())
export const getUsers = createAction(GET_USERS)
export const getUsersSuccess= createAction(GET_USERS_SUCCESS, props<{userlist:Users[]}>())
export const getRoles = createAction(GET_ROLES)
export const getRolesSuccess= createAction(GET_ROLES_SUCCESS, props<{rolelist:Roles[]}>())
export const getuserbycode=createAction(GET_USERBYCODE,props<{username:string}>())
export const getuserbycodesuccess=createAction(GET_USERBYCODE_SUCC,props<{userinfo:UserInfo}>())
export const updateuserrole=createAction(UPDATE_ROLE,props<{userrole:string,userid:number}>())