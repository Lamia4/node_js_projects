const Ajv = require("ajv");
const ajvErrors = require("ajv-errors");
const ajvFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true, coerceTypes: true, allowUnionTypes: true });

ajvErrors(ajv);
ajvFormats(ajv);

const validate = schema => (req, res, next) => {
    const test = ajv.compile(schema);
    const result = test(req);

    if (!result) return res.status(400).json(test.errors.map(error => error.message));
    next();
};

module.exports = validate;
