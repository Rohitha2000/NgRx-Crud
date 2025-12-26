import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import { emptyaction, showalert } from "./App.action";
import { exhaustMap, map } from "rxjs";


@Injectable()
export class AppEffects{
    private action$ = inject(Actions);
    private _snackbar = inject(MatSnackBar);

    _showalert= createEffect(()=>
        this.action$.pipe(
            ofType(showalert), 
            exhaustMap((action)=>{
                return this.showSnackbarAlert(action.message,action.resultType).afterDismissed().pipe(
                    map(()=>{
                    return emptyaction();
                }))
            })
        )
    )

    showSnackbarAlert(message:string, resultType:string= 'fail'){
        let _class= resultType=== 'pass'? 'green-snackbar' : 'red-snackbar';
        return this._snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass:[_class]

        })
    }
    
}