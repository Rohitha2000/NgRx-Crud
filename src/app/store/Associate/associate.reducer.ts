import { createReducer, on } from "@ngrx/store";
import { associateState } from "./associate.state";
import { addAssocateSuccess, deleteAssocateSuccess, getAssociateSuccess, loadAssocateSuccess, loadAssociateFail, opendialog, updateAssocateSuccess } from "./associate.action";

const _associateReducer = createReducer(associateState,
    on(loadAssocateSuccess, (state, action)=>{
        return {
            ...state,
            list:[...action.list],
            errorMessage:''
        }
    }),
     on(loadAssociateFail, (state, action)=>{
        return {
            ...state,
            list:[],
            errorMessage:action.errorMessage
        }
    }),
      on(addAssocateSuccess, (state, action)=>{
        const _maxid= Math.max(...state.list.map(o=> o.id));
        const _newdata= {...action.inputdata};
        _newdata.id = _maxid+1;
        return {
            ...state,
            list:[...state.list, action.inputdata],
            errorMessage:''
        }
    }),
      on(getAssociateSuccess, (state, action)=>{
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
       on(updateAssocateSuccess, (state, action)=>{
        const _newdata= state.list.map(o=>{
            return o.id=== action.inputdata.id? action.inputdata: o
        })
        return {
            ...state,
            list:_newdata,
            errorMessage:''
        }
    }),
     on(deleteAssocateSuccess, (state, action)=>{
        const _newdata= state.list.filter(o=> o.id !== action.id);
        return {
            ...state,
            list:_newdata,
            errorMessage:''
        }
    }),
)
export function AssociateReducer(state:any, action:any){
    return _associateReducer(state, action)
}