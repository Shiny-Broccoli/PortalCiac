const userRegisterSchema = require("../models/userRegister")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {TOKEN_SECRET} = require("../config")


const {createAccessToken} = require("../libs/jwt")

const register = async (req,res) => {
    const {email, password, username } = req.body;

    try {
        const userFound = await userRegisterSchema.findOne({username});
        if (userFound) return res.status(400).json(['Nombre en uso'])
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new userRegisterSchema({
            username,
            email,
            password: passwordHash
        })
        
        
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id });
        res.cookie('token', token);

        res.json({
            id: userSaved._id,
            username : userSaved.username,
            email: userSaved.email,
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const login =  async (req,res) => {
    const {email, password } = req.body;

    try {
        const userFound = await userRegisterSchema.findOne({email});

        if(!userFound) return res.status(400).json({
            message: "User not found"
        });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({
            message: "Incorrect password"
        });

        
        const token = await createAccessToken({id: userFound._id });
        res.cookie('token', token);

        res.json({
            id: userFound._id,
            username : userFound.username,
            email: userFound.email,
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const logout = async (req, res) =>{
    res.cookie('token', "",{
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

const profile = async(req, res) =>{
    const userFound = await userRegisterSchema.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id:userFound._id,
        username : userFound.username,
        email: userFound.email
    })
}


const verifyToken = async (req,res) =>{
    try {
        const{token} = req.cookies

        if(!token) return res.status(401).json({message: "No estas autorizado"});
        jwt.verify(token, TOKEN_SECRET, async (error, user) =>{
            if(error) return res.status(401).json({message: "No autorizado"});
            const userFound = await userRegisterSchema.findById(user.id);
            if(!userFound) return res.status(401).json({message:"No autorizado"});

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}


module.exports = {register, login, logout, profile, verifyToken};