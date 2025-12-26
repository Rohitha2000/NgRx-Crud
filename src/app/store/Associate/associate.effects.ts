import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "../../service/associate.service";
import { addAssocateSuccess, addAssociate, addAssociateFail, deleteAssocateSuccess, deleteAssociate, getAssociate, getAssociateSuccess, loadAssocateSuccess, loadAssociate, loadAssociateFail, updateAssocateSuccess, updateAssociate } from "./associate.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.action";

@Injectable()
export class AssociateEffects{
    action$ = inject(Actions);
    service = inject(AssociateService);

    _loadAssociate = createEffect(()=>
        this.action$.pipe(
            ofType(loadAssociate),
            exhaustMap((action)=>{
                return this.service.getAssociates().pipe(
                    map((data)=>{
                        return loadAssocateSuccess({list: data})
                    }),
                    catchError((_error)=> of(loadAssociateFail({errorMessage: _error.message})))
                )
            })
        )
    )

    _addAssociate = createEffect(()=>
        this.action$.pipe(
            ofType(addAssociate),
            switchMap((action)=>{
                return this.service.create(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(addAssocateSuccess({inputdata:action.inputdata}),
                        showalert({message: 'Created successfully', resultType:'pass'}))
                    }),
                    catchError((_error)=> of(showalert({message: 'Failed to create associate', resultType: 'fail'})))
                )
            })
        )
    )

    _getAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(getAssociate),
            exhaustMap((action) => {
                return this.service.getAssociateByCode(action.id).pipe(
                    map((data) => {
                        return getAssociateSuccess({ obj: data })
                    }),
                    catchError(_error => of(showalert({ message: 'Failed to fetch data : ' + _error.message, resultType: 'fail' })))
                )
            })
        )
    )

    _updateAssociate = createEffect(()=>
        this.action$.pipe(
            ofType(updateAssociate),
            switchMap((action)=>{
                return this.service.update(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(updateAssocateSuccess({inputdata:action.inputdata}),
                        showalert({message: 'Updated successfully', resultType:'pass'}))
                    }),
                    catchError((_error)=> of(showalert({message: 'Failed to update associate', resultType: 'fail'})))
                )
            })
        )
    )
    _deleteAssociate = createEffect(()=>
        this.action$.pipe(
            ofType(deleteAssociate),
            switchMap((action)=>{
                return this.service.delete(action.id).pipe(
                    switchMap((data)=>{
                        return of(deleteAssocateSuccess({id:action.id}),
                        showalert({message: 'Deleted successfully', resultType:'pass'}))
                    }),
                    catchError((_error)=> of(showalert({message: 'Failed to delete associate', resultType: 'fail'})))
                )
            })
        )
    )

}