import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvFormats from "ajv-formats";
const ajv = new Ajv({ allErrors: true, coerceTypes: true, allowUnionTypes: true });

ajvErrors(ajv);
ajvFormats(ajv);

const Validation = (schema) => {

    return (req, res, next) => {

        const test = ajv.compile(schema);
        const result = test(req);
        console.log("Ergebnis: ", result);
    
        if(!result) return res.status(400).json(test.errors);
    
        next();

    }
}

// const Validation = (schema) => {


//     const ajv = new Ajv({ allErrors: true, coerceTypes: true, allowUnionTypes: true });
    
//     ajvErrors(ajv);
    
//     const schemaUserValidation = {
//         type: "object",
//         additionalProperties: true,
            
//             properties: {
//                 name: {
//                     type: "string"
//                 },
//                 email: {
//                     type: "string",
//                 },
//                 password: {
//                     type: "string"
//                 }
        
//             }
//     };
    
    
    
//     const test = ajv.compile(schemaUserValidation);
//     return test(schema)
// }



export default Validation; //nicht die middleware exportieren, sondern nur die Funktion an sich exportieren
