    /* eslint-disable no-plusplus */
    /* eslint-disable no-await-in-loop */
    const JsonValidator = require("jsonschema").Validator;
    const validatator = new JsonValidator();

    const deleteUserService = require("../services/services.deleteUser")()

    module.exports = () => {
        /**
     *
     * @param {String} req
     * @param {String} res
     * @param {} next
     * @param {} param3
     */
        const deleteUser = async (req, res, next, {logger, db}) => {
            try{
                const payload = req.body;
             /**
             * Post body validation
             */

            //Creating a schema to test the post body against
            const deleteUserSchema = {
                id: "/deleteUserSchema",
                type: "object",
                properties: {
                    
                    email: { type: "string", format: "email" },
                    company_id: { type: "string" },
                    master_username: { type: "string" },
                    master_password: { type: "string"},
                    token: {type: "string"},
                    role: {type: "string"}
                },
                required: ["email", "company_id", "master_username", "master_password", "token", "role"  ]
            };

            validatator.addSchema(deleteUserSchema, "/deleteUserSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/deleteUserSchema"
            ).valid;

            if (validatorResponse) {
               const response= await deleteUserService.deleteUser(payload,logger,db)
               
               if(response == "DU") {
                   res.status(200).send({
                       "status": "200 OK",
                       "message": `User with email ${payload.email} has been deleted`
                   }) 
               } else if(response == "NF") {
                    res.status(200).send({
                        "status": "400",
                        "message": `User with email ${payload.email} not found`
                    })    
               }

            } else {
                res.status(200).send({
                    status: '400',
                    result: "Not a valid JSON, checkout help for json schema ",
                    help: {
                        email: "example@example.com",
                        password: "password"
                    }
                })
            }
            } catch(error) {

            }
        }
        return {
            deleteUser,
        }
    }