const adminModel = require("../../models/Admin_Model/adminModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const xlsx = require('xlsx');
const multer = require('multer');
const csvtojson = require('csvtojson');
const { getFileType } = require('../../filesImports/eocToJson')
require('dotenv').config();
const { BASE_URL, SERVER_URI, privateKey } = require('../../Config/keys')
const { isValideAdmin, isValideUpdateAdmin, isValideAdminLogin } = require('../../dataValidation/dataValidation')





// METHOD : CREATE

const createUser = async (req, res) => {
    try {
        // console.log("ok")
        // using destructuring of body data.
        let data = req.body
        const { fname, lname, phone, role, email, password } = req.body;

        //Input data validation
        let msgUserData = isValideAdmin(data)
        if (msgUserData) {
            return res.status(400).send({ status: true, message: msgUserData });
        }

        const isEmailUnique = await adminModel.findOne({ email });
        if (isEmailUnique) {
            return res.status(400).send({ status: true, message: `email: ${email} already exist` });
        }

        //Create user data after format fname, lname, companyName
        const hashedPassword = await bcrypt.hash(password.trim(), 10)
        const userData = {
            fname: fname ? fname.trim() : '',
            lname: lname ? lname.trim() : '',
            phone: phone ? phone : '',
            role: role,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        };
        // console.log(userData)

        const newUser = await adminModel.create(userData);

        return res.status(201).send({ status: true, message: "new User registered successfully", data: newUser });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



// EXCEL AND CSV Files to json convert and create data.


const createDataByCOE = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileType = getFileType(req.file.originalname);

    if (fileType === 'csv') {
        csvtojson()
            .fromFile(filePath)
            .then( async (jsonObj) => {
                await adminModel.insertMany(jsonObj)
                return res.status(201).send({ status: true, message: 'User data import successfully' });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send({status: false, message: 'Internal server error' });
            });
    } else if (fileType === 'excel') {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            // await adminModel.insertMany(jsonData)
            return res.status(201).send({ status: true, message: 'User data import successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ status: false, message: 'Internal server error' });
        }
    } else {
        return res.status(400).send({ status: false, message: 'Invalid file type' });
    }
}




//user



const loginUser = async (req, res) => {
    try {
        // using destructuring of body data.
        const { email, password } = req.body;

        //Input data validation
        let msgUserData = isValideAdminLogin(req.body)
        if (msgUserData) {
            return res.status(400).send({ status: false, message: msgUserData })
        }

        const isEmailUnique = await adminModel.findOne({ email });
        if (!isEmailUnique) {
            return res.status(400).send({ status: false, message: `email: ${email} not exist` });
        }


        // Create user data after format fname, lname, companyName
        const comparePassword = await bcrypt.compare(password, isEmailUnique.password);
        if (!comparePassword) {
            return res.status(400).send({ status: false, massage: 'Invalid Credentils...!!' })
        }

        let obj = {}
        obj.fname = isEmailUnique.fname
        obj.lname = isEmailUnique.lname
        obj.phone = isEmailUnique.phone
        obj.email = email
        obj.role = isEmailUnique.role
        let Data = {}
        Data.role = isEmailUnique.role

        if (isEmailUnique.role === 'Admin') {
            obj.adminId = isEmailUnique._id
            Data.adminId = isEmailUnique._id
        } else {
            obj.userId = isEmailUnique._id
            Data.userId = isEmailUnique._id
        }
        // console.log(obj)

        // Create json wab token
        let token = jwt.sign(obj, privateKey, { expiresIn: '8h' });
        Data.token = token

        return res.status(200).send({ status: true, message: 'your are login', data: Data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



// METHOD : GET

const getUser = async (req, res) => {
    try {
        let data = await adminModel.find({});
        // console.log(data)
        // let datas = data.filter(e => e.role !== 'Admin')
        return res.status(200).send({ status: true, message: "user data get successfully", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





// METHOD : UPDATE

const updateUser = async (req, res) => {
    try {
        // using destructuring of body data.
        let data = req.body
        let adminId = req.admin
        let { fname, lname, phone, email, password, currentPassword,
            newPassword, confirmPassword } = data;

        const oldata = await adminModel.findOne({ _id: adminId })
        if (!oldata) {
            return res.status(400).send({ status: false, message: "Data Not Found" })
        }

        //Input data validation
        if (email) {
            const isEmailUnique = await adminModel.find({ email });
            if (isEmailUnique.length > 1) {
                return res.status(400).send({ status: false, message: `email: ${email} already exist` });
            }
        }
        if (currentPassword) {
            const comparePassword = await bcrypt.compare(currentPassword, oldata.password);
            if (!comparePassword) {
                return res.status(403).send({ status: false, message: 'Invalid Credentils...!!' })
            }
            data.password = currentPassword
        }
        if (newPassword && confirmPassword) {
            if (confirmPassword !== newPassword) {
                return res.status(400).send({ status: false, message: `password: ${newPassword} not exist` });
            }
        }


        let msgUserData = isValideUpdateAdmin(data)
        if (msgUserData) {
            return res.status(400).send({ status: false, message: msgUserData })
        }

        if (password) {
            hashedPassword = await bcrypt.hash(password.trim(), 10)
            data.password = hashedPassword
        }
        if (!password) {
            data.password = oldata.password
        }

        var hashedPassword
        //Create 
        if (data.password) {
            hashedPassword = await bcrypt.hash(data.password.trim(), 10)
            data.password = hashedPassword
        }

        if (newPassword) {
            hashedPassword = await bcrypt.hash(newPassword.trim(), 10)
            data.password = hashedPassword
        }

        let resData = await adminModel.findOneAndUpdate({ _id: adminId }, data, { new: true });
        return res.status(200).send({ status: true, message: "user update successfully", data: resData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// METHOD : DELETE

const deleteUser = async (req, res) => {
    try {
        // using destructuring of body data.
        let adminId = req.admin

        //Input data validation
        const isUnique = await adminModel.findOne({ _id: adminId });
        if (!isUnique) {
            return res.status(404).send({ status: true, message: "User profile not found" });
        }

        if (isUnique.role === "Sadmin") {
            return res.status(404).send({ status: true, message: "You can't delete this profile." });
        }

        let resData = await adminModel.findOneAndDelete({ _id: adminId })
        return res.status(200).send({ status: true, message: "User profile is Deleted", data: resData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





module.exports = { createUser, createDataByCOE, loginUser, getUser, updateUser, deleteUser }