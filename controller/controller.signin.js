    /* eslint-disable no-plusplus */
    /* eslint-disable no-await-in-loop */
    const JsonValidator = require("jsonschema").Validator;
    const validatator = new JsonValidator();

    const signinService = require("../services/services.signin")()
    const tenant = require("../util/index")

    module.exports = () => {
        /**
     *
     * @param {String} req
     * @param {String} res
     * @param {} next
     * @param {} param3
     */
        const signin = async (req, res, next, {logger, db}) => {
            try{
                const payload = req.body;
             /**
             * Post body validation
             */

            //Creating a schema to test the post body against
            const signinUserSchema = {
                id: "/signinUserSchema",
                type: "object",
                properties: {
                    
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                },
                required: ["email", "password"]
            };

            validatator.addSchema(signinUserSchema, "/signinUserSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/signinUserSchema"
            ).valid;

            if (validatorResponse) {
               const response= await signinService.signin(payload,logger,db)
                console.log(response)
                    if(response == 'success') {
                    res.status(200).send({
                        status: '200 ok',
                        result: "Logged In"
                    })
                } else {
                    res.status(200).send({
                        status: '400',
                        result: 'Shit dont work'
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
            signin,
        }
    }