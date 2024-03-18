import { toast } from "react-hot-toast";
import { Authenticate } from "./helper";

// validate login page username
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        const { status } = await Authenticate(values.username);

        if(status !== 200){
            errors.exist = toast.error("User does not exist...")
        }
    }

    

    return errors ;
}

// validate password
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors ;
}

// validate reset password
export async function resetPasswordValidate(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password doesn't match!")
    }
    return errors ;
}

// validate register form

export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values) ;

    return errors ;
}

// validate profile page
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors ;
}




// ---------------------------------------------------------------------------------------

// username validation
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required!")
    }else if(values.username.includes(' ')){
        error.username = toast.error("Invalid Username!")
    }

    return error ;
}

// password validation 

function passwordVerify(error={}, values){

    const specialChars = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/

    if(!values.password){
        error.password = toast.error("Password required!")
    }else if(values.password.includes(" ")){
        error.password = toast.error("Invalid password")
    }else if(values.password.length < 5){
        error.password = toast.error("Password must be more than 5 characters")
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Password must include 1 special character")
    }

    return error ;
}

// email validation
function emailVerify(error = {}, values){
    
    const emailReg =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ 

    if(!values.email){
        error.email = toast.error("Email required!")
    }else if(values.email.includes(" ")){
        error.email = toast.error("Invalid Email")
    }else if(!emailReg.test(values.email)){
        error.email = toast.error("Invalid Email")
    }

    return error ;
}