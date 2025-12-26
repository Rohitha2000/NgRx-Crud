import { createEntityAdapter } from "@ngrx/entity";
import { Customer, CustomerModel } from "../model/customer.model";


export const customerAdapter = createEntityAdapter<Customer>({
    selectId: (customer: Customer)=> customer.id,
    sortComparer: sortByName
});
export const customerState:CustomerModel= customerAdapter.getInitialState({
    errorMessage:'',
    isloading:false
});

export function sortByName(a:Customer, b:Customer){
    return a.email.localeCompare(b.email)
}
