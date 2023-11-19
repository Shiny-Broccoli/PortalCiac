const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ROL: {
        type: String,
        required:true
    },
    RUT:{
        type:String,
        required: true
    },
    codigoTUI:{
        type: Number,
        required: true
    },
    Turno:{
        type: [String],
        required: true
    },
    Estado:{
        type: Number, //0, ausente; 1, En turno; 2, En reemplazo
        require : true,
        default: 0
    },
    
},{
    timestamps :true
});

module.exports = mongoose.model('registro', registerSchema)