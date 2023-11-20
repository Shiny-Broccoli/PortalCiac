const mongoose = require("mongoose")

const shiftSchema = mongoose.Schema({
    day: {
        type: String,       //ej: LUNES, MARTES...
        required: true
    },
    block: {
        type: String,       //ej: 1-2-> 12, 3-4-> 34 ... 9-10->910.
        required: true
    },
    tutorsId:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // id de tipo tutor maomenos tiktok.
          }],
        default: []
    }
});

module.exports = mongoose.model('Shift', shiftSchema)