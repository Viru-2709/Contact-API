const ADMIN = require('../model/Admin')

const bcrypt = require('bcrypt');


// Admin Signup
exports.Adminsignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = await ADMIN.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Admin Created",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Adminlogin = async function (req, res, next) {
    try {
        const checkuser = await ADMIN.findOne({ email: req.body.email })
        if (!checkuser) {
            throw new Error("Please Enter Valid Email")
        }
        const checkpass = await bcrypt.compare(req.body.password, checkuser.password)

        if (!checkpass) {
            throw new Error("Please Enter Valid Password")
        }

        res.status(200).json({
            status: "Success",
            message: "Admin Login",
            data: checkuser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fali",
            message: error.message
        })
    }
}