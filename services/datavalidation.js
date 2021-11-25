const Joi = require('joi');

const dataValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    gender: Joi.string().required(),
    profilepic: Joi.string().required().optional(null),
    location: Joi.string().optional(null).default(null)
});

module.exports.commentValidation = Joi.object({
    blog: Joi.string().optional(null),
    comment: Joi.string().optional(),
    like: Joi.number().optional(null),
    picture: Joi.string().optional(null),
    dislike: Joi.number().optional(null)
});


module.exports = dataValidation;
    

