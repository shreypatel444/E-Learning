const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const express = require('express');
const jwt = require("jsonwebtoken");

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    password: {
        type: String, Number,
    },
    tokens:[{
        token:{
            type: String
        }
    }]
});

signupSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// signupSchema.methods.generateToken = async function() {
//     try {
//         const stoken = await jwt.sign({_id:this._id},"ssssshhhhhrrrrreeeeeyyyyyppppp");
//         this.tokens = this.tokens.concat({token:stoken});
//         await this.save();
//         return stoken;
//     } catch (error) {
//         console.log("Error!");
//     }
// }
//Token generate.
// const Token = await Datastore.generateToken();
// ======>go to index.js and paste this between fetch and save function in signup.


const Signupregister = new mongoose.model("Signupregister", signupSchema);

module.exports = Signupregister;




//Authentication part.
// const createToken = async () => {
//     const Sign = await jwt.sign({_id : "65c90593c1c73feec12e6825"}, "ssssshhhhhrrrrreeeeeyyyyyppppp");
//     console.log(Sign);

//     const verify = await jwt.verify(Sign,"ssssshhhhhrrrrreeeeeyyyyyppppp");
//     console.log(verify);
// }
// createToken();