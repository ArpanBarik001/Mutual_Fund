import validator from "validator";
import { isEmpty } from "./is-empty.js";

export const validateLoginInput=function(data){
    let errors={};

    data.email=!isEmpty(data.email)? data.email:"";
    data.password=!isEmpty(data.password)? data.password:"";
    


    if(!validator.isEmail(data.email)){
        errors.email='Email is Invalid..';
    }

    if(validator.isEmpty(data.email)){
        errors.email='Email field is required..';
    }

    if(validator.isEmpty(data.password)){
        errors.password='password is required..';
    }



    return{
        errors,
        isValid:isEmpty(errors)
    }
};