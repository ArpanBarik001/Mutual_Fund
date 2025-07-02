import express from "express";
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { validateRegisterInput } from "../validation/register.js";
import { validateLoginInput } from "../validation/login.js";
import { secretOrkey } from "../config.js";
import passport from "passport";



const router=express.Router();

router.post('/register',async(req, res)=>{
    try{

        const{errors, isValid}=validateRegisterInput(req.body);

        if(!isValid){
            return res.status(400).json(errors);
        }

        const userExist=await User.findOne({email: req.body.email});
        if(userExist){
            // console.log('email already exist..');
            errors.email='Email already exist..'
            return res.status(409).json(errors);
        }

        // if(!req.body.email || !req.body.name || !req.body.password){
        //     return res.status(400).send('Fill all required field');
        // }
            const avatar=gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'retro'
            });
            const newUser={
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
                // password2:req.body.password2
            };
            newUser.password=await bcrypt.hash(newUser.password, 10);
            const newRegister=await User.create(newUser);
            // console.log(newRegister);
            return res.status(200).json({
                name: newRegister.name,
                email:newRegister.email,
                avatar:newRegister.avatar,
            });
            
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }

});


router.post('/login', async(req, res)=>{
    try{

        const{errors, isValid}=validateLoginInput(req.body);
        // const errors={};

        // const error={};

        if(!isValid){
            // console.log(errors);
            return res.status(400).json(errors);
        }

        const find=await User.findOne({email:req.body.email});
        if(!find){
            errors.email='User not found..';
            return res.status(500).json(errors);
        }
        const isMatch=await bcrypt.compare(req.body.password, find.password);
        if(isMatch){
            const payload={id:find.id, name:find.name, avatar:find.avatar};

            jwt.sign(payload, secretOrkey, {expiresIn: 3600}, (err, token)=>{
                res.json({
                    success: true,
                    token: 'bearer' +" "+token,
                    avatar:find.avatar
                });

            });


            
        }else{
            errors.password='Password not match';
            return res.status(500).send(errors);
        }



    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});


router.post(
  "/save-fund",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { fund } = req.body; // fund = { schemeCode, schemeName }
      const exists = req.user.savedFunds.find((f) => f.schemeCode === fund.schemeCode);

      if (exists) return res.status(400).json({ message: "Fund already saved" });

      req.user.savedFunds.push(fund);
      await req.user.save();

      res.json({ message: "Fund saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/saved-funds",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      res.json({ savedFunds: req.user.savedFunds });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/delete-fund/:schemeCode", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { schemeCode } = req.params;
  try {
    const originalLength = req.user.savedFunds.length;
    req.user.savedFunds = req.user.savedFunds.filter(f => f.schemeCode !== schemeCode);

    if (req.user.savedFunds.length === originalLength) {
      return res.status(404).json({ message: "Fund not found" });
    }

    await req.user.save();
    res.json({ message: "Fund deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;