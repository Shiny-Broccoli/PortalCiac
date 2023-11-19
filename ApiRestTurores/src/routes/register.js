const express = require("express")
const {login, register, logout, profile, verifyToken} = require("../controllers/registro.controller")
const {authRequired} = require("../middlewares/validateToken")
const {validateSchema} = require("../middlewares/validator.middleware")
const {registerSchema, loginSchema} = require("../schemas/auth.schema")



const router = express.Router();

router.post('/register',register);

router.post('/login',validateSchema(loginSchema),login);

router.post("/logout",logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

module.exports = router;