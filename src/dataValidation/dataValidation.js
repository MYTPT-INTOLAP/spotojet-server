const mongoose = require('mongoose')
const { isValidRequest, isValidFName, isValidName, isValidEmail, isValidpass, isValidPhone,
    isValidRole } = require('./inputDataValidation')


const isValideAdmin = (data) => {
    // using destructuring of body data.
    const { fname, lname, phone, role, email, password } = data;

    const Message = isValidRequest(data)
    if (Message) return Message;

    if (fname) {
        const fnameMessage = isValidFName(fname)
        if (fnameMessage) return fnameMessage;
    }

    if (lname) {
        const lnameMessage = isValidFName(lname)
        if (lnameMessage) return lnameMessage;
    }


    if (role) {
        const cNameMessage = isValidRole(role)
        if (cNameMessage) return cNameMessage;
    }

    if (phone) {
        const cNameMessage = isValidPhone(phone)
        if (cNameMessage) return cNameMessage;
    }

    const emailMessage = isValidEmail(email)
    if (emailMessage) return emailMessage;

    const passMessage = isValidpass(password)
    if (passMessage) return passMessage;

}


const isValideUpdateAdmin = (data) => {

    // using destructuring of body data.
    const { fname, lname, phone, role, email, password } = data;

    if (data) {
        const Message = isValidRequest(data)
        if (Message) return Message;
    }

    if (fname) {
        // oldata.fname = fname
        const fnameMessage = isValidFName(fname)
        if (fnameMessage) return fnameMessage;
    }

    if (lname) {
        // oldata.lname = lname
        const lnameMessage = isValidFName(lname)
        if (lnameMessage) return lnameMessage;
    }

    if (phone) {
        // oldata.companyName = companyName
        const cNameMessage = isValidPhone(phone)
        if (cNameMessage) return cNameMessage;
    }

    if (role) {
        const cNameMessage = isValidRole(role)
        if (cNameMessage) return cNameMessage;
    }

    if (email) {
        // oldata.email = email
        const emailMessage = isValidEmail(email)
        if (emailMessage) return emailMessage;
    }

    if (password) {
        const passMessage = isValidpass(password)
        if (passMessage) return passMessage;
    }
}



const isValideAdminLogin = (data) => {

    // using destructuring of body data.
    const { email, password } = data;

    const Message = isValidRequest(data)
    if (Message) return Message;

    const emailMessage = isValidEmail(email)
    if (emailMessage) return emailMessage;

    const passMessage = isValidpass(password)
    if (passMessage) return passMessage;
}



const isValidePlayer = (data) => {
    let { fname, lname, DOB, address, phone, BloodGroup } = data;

    const Message = isValidRequest(data)
    if (Message) return Message;

    const fnameMessage = isValidFName(fname)
    if (fnameMessage) return fnameMessage;

    const lnameMessage = isValidFName(lname)
    if (lnameMessage) return lnameMessage;


    const addMessage = isValidName(address)
    if (addMessage) return addMessage

    const cNameMessage = isValidPhone(phone)
    if (cNameMessage) return cNameMessage;

    const bgMessage = isValidFName(BloodGroup)
    if (bgMessage) return bgMessage;

}




const isValideUpdatePlayer = (data) => {
    let { fname, lname, DOB, address, phone, BloodGroup } = data;

    if (fname) {
        const fnameMessage = isValidFName(fname)
        if (fnameMessage) return fnameMessage;
    }

    if (lname) {
        const lnameMessage = isValidFName(lname)
        if (lnameMessage) return lnameMessage;
    }

    if (address) {
        const addMessage = isValidName(address)
        if (addMessage) return addMessage
    }

    if (phone) {
        const cNameMessage = isValidPhone(phone)
        if (cNameMessage) return cNameMessage;
    }

    if (BloodGroup) {
        const bgMessage = isValidFName(BloodGroup)
        if (bgMessage) return bgMessage;
    }

}




module.exports = { isValideAdmin, isValideUpdateAdmin, isValideAdminLogin, isValidePlayer, isValideUpdatePlayer }