/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const JsonValidator = require("jsonschema").Validator;
const validatator = new JsonValidator();

const MemberService = require('../services/services.members')()

module.exports = () => {
    const addMember = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            /**
             * Post body validation
             */

            //Creating a schema to test the post body against
            const addMemberSchema = {
                id: "/addMemberSchema",
                type: "object",
                properties: {
                    user_id: { type: "string" },
                    email: { type: "string", format: "email" },
                    first_name: {type: "string"},
                    last_name: {type: "string"},
                    password: { type: "string" },
                    user_type: { type: "string" },
                    subscribed_service: { type: "string" },
                    company_id: { type: "string" },
                    master_username: { type: "string" },
                    master_password: { type: "string" }
                },
                required: ["user_id", "email", "first_name", "last_name", "password", "subscribed_service", "company_id", "master_username", "master_password"]
            };

            validatator.addSchema(addMemberSchema, "/addMemberSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/addMemberSchema"
            ).valid;

            if(validatorResponse) {
                const response = await MemberService.addMember(payload, logger, db);
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
                        user_id: '123546',
                        email: 'hasham@example.com',
                        password: 'password',
                        "first_name": 'Hasham',
                        "filast_name": 'Reyaz',
                        user_type: 'user',
                        subscribed_service: 'hentaiWithSenpai',
                        company_id: '789452',
                        master_username: 'user_name',
                        master_password: 'password'
                    }
                });
            }
            
        } catch (error) {
            res.status(200).send({
                status: '400',
                result: error
            })
        }
    }

    return {
        addMember
    }
}