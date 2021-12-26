
const schemaUserValidation = {

            type: "object",
            additionalProperties: true,
            properties: {

                body: {
                    type: "object",
                    properties: {

                        name: {
                            type: "string"
                            },
                        email: {
                            type: "string",
                            },
                        password: {
                            type: "string"
                            }
                    }

                },
                params: {
                        type: "object",
                },
                query: {
                        type:"object",
                }
            
                }
            };

export default schemaUserValidation;