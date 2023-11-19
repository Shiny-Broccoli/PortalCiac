const z = require('zod')

const registerSchema = z.object({
    username:z.string({
        required_error: "Username is required"
    }),
    email: z.
        string({
            required_error: "Email is required",
        })
        .email({
            message: "email inválido"
        })
})

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    })
    .email({
        message:"Invalid email",
    }),
    password: z.
        string({
            required_error: "Password is required",
        })
})

module.exports = {loginSchema, registerSchema}