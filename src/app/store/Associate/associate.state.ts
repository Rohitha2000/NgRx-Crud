import { createEntityAdapter } from "@ngrx/entity";
import { Associate, AssociateModel } from "../model/associate.model";

export const associateState:AssociateModel= {
    list:[],
    errorMessage:'',
    associateObj:{
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

