
import Joi from 'joi'

export const UserSchema= Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8),
    name:Joi.string().required()
})
export const UserSchema2= Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8)
})
export const UserSchema3= Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    end_date:Joi.string().required(),
    user_id:Joi.string()
})
export const UserSchema4= Joi.object({
    project_id:Joi.string().required()
})

