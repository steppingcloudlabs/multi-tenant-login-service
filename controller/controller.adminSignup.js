    /* eslint-disable no-plusplus */
    /* eslint-disable no-await-in-loop */
    const JsonValidator = require("jsonschema").Validator;
    const validatator = new JsonValidator();

const adminSignupService = require("../services/services.adminSignup")();
const tenant = require("../util/index")
module.exports = () => {
    /**
     *
     * @param {String} req
     * @param {String} res
     * @param {} next
     * @param {} param3
     */

    const signup = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            /**
             * Post body validation
             */

            //Creating a schema to test the post body against
            const signupUserSchema = {
                id: "/signupUserSchema",
                type: "object",
                properties: {
                    user_id: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                    subscribed_service: {type: "string"},
                    company_id: { type: "string" },
                    master_username: { type: "string" },
                    master_password: { type: "string" }
                },
                required: ["user_id", "email", "password", "subscribed_service", "company_id", "master_username", "master_password" ]
            };

            validatator.addSchema(signupUserSchema, "/signupUserSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/signupUserSchema"
            ).valid;

            if (validatorResponse) {

                const response = await adminSignupService.signup(payload, logger, db);
                if (response == "FE") {
                    res.status(200).send({
                        status: "400",
                        message: `${payload.email} already exists.`
                    });
                } else if (response == "FID") {
                    res.status(200).send({
                        status: "400",
                        message: ` user: ${payload.user_id} already exists.`
                    });
                } else {
                    res.status(200).send({
                        status: "200 OK",
                        message: `User created with email id ${payload.email} `
                    });
                    logger.info(
                        `User with email id ${payload.email} signed up and added to login collection `
                    );
                }
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Not a valid JSON, checkout help for json schema ",
                    help: {
                    user_id: '123456789',
                    email: 'example@example.com',
                    password: 'password',
                    subscribed_service: 'service_1, service_2',
                    company_id: '987654321',
                    master_username: 'user_name',
                    master_password: 'password'
                    }
                });
            }
        } catch (error) {
            next(error);
            logger.error(`Error while creating user `);
        }
    };

    return {
        signup
    };
};