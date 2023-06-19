// const passValidation = require('./passwordValidation')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const moment = require('moment')

/** 
 * @param {string} value: bodyData validation function.
 */

const isValid = (value) => {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length > 0) return true;
};

const isValids = (value) => {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "number") return true;
};

const isValidRequestBody = function (object) {
    return Object.keys(object).length > 0;
};

// All input data validation

/**
 * @param {string} value: bodyData
 */

const isValidRequest = (value) => {
    // if body empty
    if (!isValidRequestBody(value)) {
        return "data is required";
    }
}



/**
 * @param {string} value: nameValue
 */

const isValidFName = (value) => {

    if (!isValid(value)) {
        return `Data is required`;
    }

    let regex = /^[a-zA-Z0-9() ]*$/

    if (!regex.test(value)) {
        return `${value} should be in valid format`;
    }
}


/**
 * @param {string} value: nameValue
 */

const isValidName = (value) => {

    if (!isValid(value)) {
        return `Data is required`;
    }

    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/

    if (!regex.test(value)) {
        return `${value} should be in valid format`;
    }
}


/**
 * @param {string} value: phoneNumber
 */



const isValidPhone = (value) => {
    if (!isValid(value)) {
        return "Phone number is required";
    }

    const regexForMobile = /^((0091)|(\+91)|0?)[6789]{1}\d{9}$/;
    if (!regexForMobile.test(value)) {
        return "mobile should be of 10 digits.";
    }

}


/**
 * @param {string} value: emailValue
 */


const isValidRole = (value) => {
    let arr = ['Sadmin', 'CAdmin', 'Coach', 'Scout']
    let inc = arr.includes(value)
    if(!inc){
        return 'role should be valid.'
    }
}




/**
 * @param {string} value: emailValue
 */


const isValidEmail = (value) => {
    if (!isValid(value)) {
        return "email is required and should be a string";
    }
    const regexForEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regexForEmail.test(value)) {
        return `${value} should be in valid format`;
    }
}





/**
 * @param {string} value: passwordValue
 */

const isValidpass = (value) => {
    if (!isValid(value)) {
        return "password is required.";
    }
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
        return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
        return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
        return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
        return "Password must contain at least one Digit.";
    }

    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
        return "Password must contain at least one Special Symbol.";
    }

    const isValidLength = /^.{8,15}$/;
    if (!isValidLength.test(value)) {
        return "Password must be 8-15 Characters Long.";
    }
}









module.exports = {isValidRequest, isValidFName, isValidName, isValidPhone, isValidRole, isValidEmail, isValidpass }