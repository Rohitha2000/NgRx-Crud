import { createAction, props } from "@ngrx/store";
import { Customer } from "../model/customer.model";
import { Update } from "@ngrx/entity";

export const LOAD_CUSTOMER = '[customer page] load customer';
export const LOAD_CUSTOMER_SUCCESS = '[customer page] load customer success';
export const LOAD_CUSTOMER_FAIL = '[customer page] load customer fail';

export const ADD_CUSTOMER = '[customer page] add customer';
export const ADD_CUSTOMER_SUCCESS = '[customer page] add customer success';
export const ADD_CUSTOMER_FAIL = '[customer page] add customer fail';

export const GET_CUSTOMER = '[customer page] get customer';
export const GET_CUSTOMER_SUCCESS = '[customer page] get customer success';
export const OPEN_DIALOG= '[customer page] open dialog'

export const UPDATE_CUSTOMER = '[customer page] update customer';
export const UPDATE_CUSTOMER_SUCCESS = '[customer page] update customer success';

export const DELETE_CUSTOMER = '[customer page] delete customer';
export const DELETE_CUSTOMER_SUCCESS = '[customer page] delete customer success';

export const loadCustomer = createAction(LOAD_CUSTOMER)
export const loadCustomerSuccess= createAction(LOAD_CUSTOMER_SUCCESS, props<{list:Customer[]}>())
export const loadCustomerFail = createAction(LOAD_CUSTOMER_FAIL, props<{errorMessage:string}>())

export const addCustomer = createAction(ADD_CUSTOMER, props<{inputdata:Customer}>())
export const addCustomerSuccess= createAction(ADD_CUSTOMER_SUCCESS, props<{inputdata:Customer}>())
export const addCustomerFail = createAction(ADD_CUSTOMER_FAIL, props<{errorMessage:string}>())

export const getCustomer = createAction(GET_CUSTOMER, props<{id:number}>())
export const getCustomerSuccess= createAction(GET_CUSTOMER_SUCCESS, props<{obj:Customer}>())

export const opendialog= createAction(OPEN_DIALOG)


export const updateCustomer = createAction(UPDATE_CUSTOMER, props<{inputdata:Customer}>())
export const updateCustomerSuccess= createAction(UPDATE_CUSTOMER_SUCCESS, props<{inputdata:Update<Customer>}>())

export const deleteCustomer = createAction(DELETE_CUSTOMER, props<{id:number}>())
export const deleteCustomerSuccess= createAction(DELETE_CUSTOMER_SUCCESS, props<{id:number}>())
