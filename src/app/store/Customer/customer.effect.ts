import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.action";
import { CustomerService } from "../../service/customer.service";
import { loadCustomer, loadCustomerSuccess, loadCustomerFail, addCustomer, addCustomerSuccess, getCustomer, getCustomerSuccess, updateCustomer, updateCustomerSuccess, deleteCustomer, deleteCustomerSuccess } from "./customer.action";
import { Customer } from "../model/customer.model";
import { Update } from "@ngrx/entity";

@Injectable()
export class CustomerEffects{
    action$ = inject(Actions);
    service = inject(CustomerService);

    _loadCustomer = createEffect(()=>
        this.action$.pipe(
            ofType(loadCustomer),
            exhaustMap((action)=>{
                return this.service.getCustomers().pipe(
                    map((data)=>{
                        return loadCustomerSuccess({list: data})
                    }),
                    catchError((_error)=> of(loadCustomerFail({errorMessage: _error.message})))
                )
            })
        )
    )

    _addCustomer = createEffect(()=>
        this.action$.pipe(
            ofType(addCustomer),
            switchMap((action)=>{
                return this.service.create(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(addCustomerSuccess({inputdata:action.inputdata}),
                        showalert({message: 'Created successfully', resultType:'pass'}))
                    }),
                    catchError((_error)=> of(showalert({message: 'Failed to create associate', resultType: 'fail'})))
                )
            })
        )
    )

    _getCustomer = createEffect(() =>
        this.action$.pipe(
            ofType(getCustomer),
            exhaustMap((action) => {
                return this.service.getCustomerByCode(action.id).pipe(
                    map((data) => {
                        return getCustomerSuccess({ obj: data })
                    }),
                    catchError(_error => of(showalert({ message: 'Failed to fetch data : ' + _error.message, resultType: 'fail' })))
                )
            })
        )
    )

    _updateCustomer = createEffect(()=>
        this.action$.pipe(
            ofType(updateCustomer),
            switchMap((action)=>{
                return this.service.update(action.inputdata).pipe(
                    switchMap((data)=>{
                        const updatedRecord:Update<Customer>={
                            id: action.inputdata.id,
                            changes: action.inputdata
                        }
                        return of(updateCustomerSuccess({inputdata:updatedRecord}),
                        showalert({message: 'Updated successfully', resultType:'pass'}))
                    }),
                    catchError((_error)=> of(showalert({message: 'Failed to update associate', resultType: 'fail'})))
                )
            })
        )
    )
    _deleteCustomer = createEffect(()=>
        this.action$.pipe(
            ofType(deleteCustomer),
            switchMap((action)=>{
                return this.service.delete(action.id).pipe(
                    switchMap((data)=>{
                        return of(deleteCustomerSuccess({id:action.id}),
                        showalert({message: 'Deleted successfully', resultType:'pass'}))
                    }),
                    catchError((_error)=> of(showalert({message: 'Failed to delete associate', resultType: 'fail'})))
                )
            })
        )
    )

}