import {Joi, Segments} from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';



//для GET
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().max(120).allow(''),
  })
};

const objectIdValidator = (value, helpers) => {
  const isValidId = isValidObjectId(value);
  return !isValidId ? helpers.message('Invalid id format')
  : value;
};

//для get,  delete
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

//для post
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(120).required(),
    content: Joi.string().max(1200).allow(''),
    tag: Joi.string().valid(...TAGS).required(),
  }),
};

//для PATCH
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(120),
    content: Joi.string().max(1200).allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
