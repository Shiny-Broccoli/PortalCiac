const z = require('zod')

const crearShiftSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido'
    }),
    ROL: z.string({
        required_error: 'Debe haber ROL'
    }),
    RUT: z.string({
        required_error: "Debe estar el rut"
    })
})

module.exports = {crearTutorSchema}