import { createReducer, on } from "@ngrx/store";
import { customerAdapter, customerState } from "./customer.state";
import { addCustomerSuccess, deleteCustomerSuccess, getCustomerSuccess, loadCustomerSuccess, loadCustomerFail, opendialog, updateCustomerSuccess } from "./customer.action";

const _customerReducer = createReducer(customerState,
    on(loadCustomerSuccess, (state, action)=>{
       return customerAdapter.setAll(action.list, {
        ...state,
        errorMessage: ''
       });
    }),
      on(loadCustomerFail, (state, action)=>{
       return {...state, errorMessage:action.errorMessage}
    }),
      on(addCustomerSuccess, (state, action)=>{
        const _maxid= Math.max(...state.ids.map(item=> item as number));
        const _newdata= {...action.inputdata};
        _newdata.id = _maxid+1;
        return customerAdapter.addOne(action.inputdata, state)
    }),
      on(getCustomerSuccess, (state, action)=>{
        return {
            ...state,
            associateObj: action.obj,
            errorMessage:''
        }
    }),
       on(opendialog, (state, action)=>{
        return {
            ...state,
            associateObj: {
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "CUSTOMER",
                address: "",
                group: "level1",
                status: true
            }
        }
    }),
       on(updateCustomerSuccess, (state, action)=>{
        return customerAdapter.updateOne(action.inputdata, state);
    }),
     on(deleteCustomerSuccess, (state, action)=>{
        return customerAdapter.removeOne(action.id, state);
    }),
)
export function CustomerReducer(state:any, action:any){
    return _customerReducer(state, action)
}