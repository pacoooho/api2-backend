import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    console.log("signup");
    // guardando un usuario
    console.log(req.body)
   try{
        const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    user.password = await user.encryptPassword(user.password)
 
    const saveUser = await user.save();
    // token 
    const token: string = jwt.sign({ _id: saveUser._id }, process.env.TOKEN_SECRETO || 'text', {
        expiresIn:  60*60*24
    });
console.log(token)
    res.json({ message: "signup",token: token })
   }
   catch(er){
       console.log(er.name);
       console.log(er);
       res.status(400).json({ message: "Email inválido" })
       //res.json({message:er.name});
   }
};

export const signin = async (req: Request, res: Response) => {
    console.log("signin");

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "Email or password is  wrong" })
    }
    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if (!correctPassword) { return res.status(400).json({ message: "Password or email is  wrong" }) }

    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'text', {
        expiresIn: 60*60*24
    })
    console.log(token);
    res.json({ message: "signin",token: token})

};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId,{password:0});
    if ( !user) return res.status(400).json({message:'No user found'}) ;
 
    res.json({ message: "profile",user })
  
};
export const profile2 = async (req: Request, res: Response) => {
    // const user = await User.findById(req.userId,{password:0});
    //   if ( !user) return res.status(400).json({message:'No user found'}) ;
   const number = Math.floor(Math.random() * (100 - 30)) + 30;
      res.json({ message: "profile2",number})
    
  };
  export const profile3 = async (req: Request, res: Response) => {
   console.log("profile3");
   
      res.json({ message: "profile3"})
    
  };
export const testing = async (req: Request, res: Response)=> {
    const user = await User.findById(req.userId,{password:0});
    if ( !user) return res.status(400).json({message:'No user found'}) ;
 
    res.json({ message: "profile",user })
  
    // res.json('private');
}
