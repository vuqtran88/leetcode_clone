import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import Joi from "joi";

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

dotenvExpand.expand(dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
}));

const options = {
  NODE_ENV: Joi.string()
    .default("development")
    .allow("development", "test", "production"),
  PORT: Joi.string().required(),
};

const schema = Joi.object(options).unknown(true);

const { error, value: config } = schema.validate(process.env);

if (error) {
  console.error("Missing property in config.", error.message);
  process.exit(1);
}

export default config;
