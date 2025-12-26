import { createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../model/user.model";
import { userAdapter } from "./user.state";


const getUserState= createFeatureSelector<UserModel>('user');
const userSelector = userAdapter.getSelectors();
export const isDuplicateUser= createSelector(getUserState, (state)=> state.isDuplicate);
export const getMenuByRole= createSelector(getUserState, (state)=> state.menulist);
export const getUsersList= createSelector(getUserState, userSelector.selectAll);
export const getRolesList = createSelector(getUserState, (state)=> state.roles);
export const getUserByCode= createSelector(getUserState, (state)=> state.userInfo);