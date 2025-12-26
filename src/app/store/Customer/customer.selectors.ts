import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerModel } from "../model/customer.model";
import { customerAdapter } from "./customer.state";

const customerSelector = customerAdapter.getSelectors();
const getCustomerState = createFeatureSelector<CustomerModel>('customer');
export const getCustomerList = createSelector(getCustomerState, customerSelector.selectAll);
const selectedEntities = createSelector(getCustomerState, customerSelector.selectEntities);

export const getCustomerObj = (id:number) => createSelector(selectedEntities, (state)=> state[id]);

export const getErrorMessage = createSelector(getCustomerState, (state)=> state.errorMessage);