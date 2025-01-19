import Joi from 'joi';


export const RegisterSchema = Joi.object({
    email: Joi.string()
        .required(),
    password: Joi.string()
        .required()
})
