/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const JsonValidator = require("jsonschema").Validator;
const validatator = new JsonValidator();

const signupService = require("../services/services.signup")();
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
                    tenantid: { type: "string" },
                    company_id: { type: "string" },
                    master_username: { type: "string" },
                    master_password: { type: "string" }
                },
                required: ["user_id", "email", "password"]
            };

            validatator.addSchema(signupUserSchema, "/signupUserSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/signupUserSchema"
            ).valid;

            if (validatorResponse) {

                const response = await signupService.signup(payload, logger, db);
                if (response == "UR") {
                    res.status(200).send({
                        status: "400",
                        message: `User is not an Alumni of this company`
                    });
                } else if (response == "FE") {
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
                        dbname: "steppingcloud",
                        dbhost: "18.190.14.5",
                        dbport: "1000",
                        company_name: "Titan",
                        company_id: "titanTestT1",
                        client_id: "ksjbv",
                        idp_url: "sfv",
                        token_url: "country",
                        private_key: "private_key",
                        grant_type: "grant_type",
                        company_admin_contact_email: "company_admin_contact_email"
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