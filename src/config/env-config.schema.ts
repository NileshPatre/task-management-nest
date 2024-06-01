import * as Joi from "@hapi/joi";

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default("development").required(),
  PG_DB_HOST: Joi.string().required(),
  PG_DB_PORT: Joi.string().required(),
  PG_DB_USERNAME: Joi.string().required(),
  PG_DB_PASSWORD: Joi.string().allow("").required(),
  PG_DB_DATABASE: Joi.string().required()
});
