import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../../../config/config';
import { NextFunction } from 'express';
import {Request, Response, Router} from 'express';
import * as EmailValidator from 'email-validator';

// generate has for password
const salt_number = 10;
const c = config;
// const bcrypt = require('bcrypt');÷
const router : Router = Router();
async function generateHash(plainText : string): Promise<string> {
        let salt = await bcrypt.genSalt(salt_number);
        return await bcrypt.hash(plainText, salt);
}

async function comparePassword(plaintext: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
}

function generateJWT(user : User) : string {
    return jwt.sign(user.toJSON(), c.jwt.secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if(!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.' });
    }

    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2) {
        return res.status(401).send({message: "No authorization headers."});
    }
    const token = token_bearer[1];
    jwt.verify(token, c.jwt.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({message: "No authorization headers."});           
        }
        return next();
    });
}

router.get("/verification",
    requireAuth,
    async(req: Request, res: Response) => {
        return res.status(200).send({ auth: true, message: 'Authenticated.' });
})

router.post('/login', async(req: Request, res: Response) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400).send({message: " email and password can not be null"});
    }
    const user = await User.findByPk(email);

    if(!user) {
        res.status(404).send({message: "User does not exists"});
    }

    const authValid = await comparePassword(password, user.password_hash);

    if(!authValid) {
        res.status(400).send({message: " credentials doesn't match"});
    }

    const jwt = generateJWT(user);

    res.status(200).send({auth:true, token:jwt, user: user.short()});

});

router.post('/', async(req: Request, res: Response) => {
    console.log("create user req")
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400).send({message: " email and password can not be null"});
    }

    if(!EmailValidator.validate(email)) {
        res.status(400).send({message: " enter a valid email "});
    }

    let user = new User();
    
    let findUser = await User.findByPk(email);
    if(findUser){
        console.log("saku "+findUser.email);
        res.status(400).send({message:"User "+email+" already exists"})
    }
    user.email = email;

    let password_hash = await generateHash(password);
    user.password_hash = password_hash;
    let saved;
    try
    {   
        saved = await user.save();
    } catch (err){
        console.log(err.message);
        res.status(400).send({message: err.message});

    }
    const jwt_token = generateJWT(user)
    res.status(200).send({auth: true, token: jwt_token, user: saved.short()});
})

export const AuthRouter: Router = router;
