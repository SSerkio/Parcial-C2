import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().iso().required(),
  location: Joi.string().required(),
  organizer: Joi.string().required()
});

export const updateEventSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  date: Joi.date().iso(),
  location: Joi.string(),
  organizer: Joi.string()
}).min(1);
