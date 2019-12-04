const JsonValidator = require("jsonschema").Validator;
const validatator = new JsonValidator();

const roleService = require('../services/services.role')();

module.exports = () => {
    const addRole = async (req, res, next, { logger, db }) => {

        try {
            const payload = req.body

            /**
            * Post body validation
            */

            //Creating a schema to test the post body against
            const addRoleSchema = {
                id: "/addRoleSchema",
                type: "object",
                properties: {
                    role: { type: "string" },
                    permission: [{ type: "string" }],
                    company_id: { type: "string" },
                    master_username: { type: "string" },
                    master_password: { type: "string" }
                },
                required: ["role", "permission", "company_id", "master_username", "master_password"]
            };

            validatator.addSchema(addRoleSchema, "/addRoleSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/addRoleSchema"
            ).valid;
            if (validatorResponse) {
                const response = await roleService.addRole(payload, logger)

                if (response == 'success') {
                    res.status(200).send({
                        status: '200 OK',
                        result: response
                    })
                } else if (response == 'FR') {
                    res.status(200).send({
                        status: 400,
                        result: 'Role already created'
                    })
                }
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Not a valid JSON, checkout help for json schema ",
                    help: {
                        role: "Chef",
                        permission: "can_cook",
                        company_id: "12345678",
                        master_username: "username",
                        master_password: "password"
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

    const deleteRole = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.body;

            const deleteRoleSchema = {
                id: "/deleteRoleSchema",
                type: "object",
                properties: {
                    role: { type: "string" },
                    company_id: { type: "string" },
                    master_username: { type: "string" },
                    master_password: { type: "string" }
                },
                required: ["role", "company_id", "master_username", "master_password"]
            };

            validatator.addSchema(deleteRoleSchema, "/deleteRoleSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/deleteRoleSchema"
            ).valid;

            if (validatorResponse) {
                const response = await roleService.deleteRole(payload, logger);

                if (response == 'success') {
                    res.status(200).send({
                        status: '200 OK',
                        result: 'Successfully Deleted'
                    })
                } else if (response == 'NF') {
                    res.status(200).send({
                        status: 400,
                        result: 'Role not present'
                    })
                }
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Not a valid JSON, checkout help for json schema ",
                    help: {
                        role: "Chef",
                        company_id: "12345678",
                        master_username: "username",
                        master_password: "password"
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
        addRole,
        deleteRole
    }
}