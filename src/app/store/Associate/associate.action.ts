import { createAction, props } from "@ngrx/store";
import { Associate } from "../model/associate.model";

export const LOAD_ASSOCIATE = '[associate page] load associate';
export const LOAD_ASSOCIATE_SUCCESS = '[associate page] load associate success';
export const LOAD_ASSOCIATE_FAIL = '[associate page] load associate fail';

export const ADD_ASSOCIATE = '[associate page] add associate';
export const ADD_ASSOCIATE_SUCCESS = '[associate page] add associate success';
export const ADD_ASSOCIATE_FAIL = '[associate page] add associate fail';

export const GET_ASSOCIATE = '[associate page] get associate';
export const GET_ASSOCIATE_SUCCESS = '[associate page] get associate success';
export const OPEN_DIALOG= '[associate page] open dialog'

export const UPDATE_ASSOCIATE = '[associate page] update associate';
export const UPDATE_ASSOCIATE_SUCCESS = '[associate page] update associate success';

export const DELETE_ASSOCIATE = '[associate page] delete associate';
export const DELETE_ASSOCIATE_SUCCESS = '[associate page] delete associate success';

export const loadAssociate = createAction(LOAD_ASSOCIATE)
export const loadAssocateSuccess= createAction(LOAD_ASSOCIATE_SUCCESS, props<{list:Associate[]}>())
export const loadAssociateFail = createAction(LOAD_ASSOCIATE_FAIL, props<{errorMessage:string}>())

export const addAssociate = createAction(ADD_ASSOCIATE, props<{inputdata:Associate}>())
export const addAssocateSuccess= createAction(ADD_ASSOCIATE_SUCCESS, props<{inputdata:Associate}>())
export const addAssociateFail = createAction(ADD_ASSOCIATE_FAIL, props<{errorMessage:string}>())

export const getAssociate = createAction(GET_ASSOCIATE, props<{id:number}>())
export const getAssociateSuccess= createAction(GET_ASSOCIATE_SUCCESS, props<{obj:Associate}>())

export const opendialog= createAction(OPEN_DIALOG)


export const updateAssociate = createAction(UPDATE_ASSOCIATE, props<{inputdata:Associate}>())
export const updateAssocateSuccess= createAction(UPDATE_ASSOCIATE_SUCCESS, props<{inputdata:Associate}>())

export const deleteAssociate = createAction(DELETE_ASSOCIATE, props<{id:number}>())
export const deleteAssocateSuccess= createAction(DELETE_ASSOCIATE_SUCCESS, props<{id:number}>())
