const express = require('express')
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
require("dotenv").config();
const rutaTutores = require("./routes/tutor") //llama a las rutas tutor
const rutaUserRegister = require("./routes/register") // llama a la ruta register
const cors = require("cors")

const app = express();

const port = process.env.port || 9000

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))

//middlware
app.use(express.json());
app.use(cookieParser());

app.use('/api', rutaTutores)
app.use('/api', rutaUserRegister)




//Saludos a los papus

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Conneted to MONGODB")).catch((error) => console.error(error));

app.listen(9000, () => console.log(`server on port ${port}`))



