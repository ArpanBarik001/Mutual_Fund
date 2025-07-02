import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
  schemeCode: {
    type: String,
    required: true
  },
  schemeName: {
    type: String,
    required: true
  }
}, { _id: false });
const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    avatar:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    },
    savedFunds: [fundSchema]
});

export const User=mongoose.model('users', userSchema);