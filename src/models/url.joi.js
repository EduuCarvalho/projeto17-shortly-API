import joi from "joi";


export const shortenSchema = joi.object({
    url: joi.string().required(),
  });
