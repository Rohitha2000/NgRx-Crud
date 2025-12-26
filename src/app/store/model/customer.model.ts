import { EntityState } from "@ngrx/entity"

export interface Customer{
    id:number,
    name:string,
    email:string,
    phone:string,
    type:string,
    address:string,
    group:string,
    status: boolean
}

export interface CustomerModel extends EntityState<Customer>{
     errorMessage:string,
     isloading:boolean
}