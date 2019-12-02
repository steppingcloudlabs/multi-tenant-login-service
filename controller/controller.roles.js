 
const roleService = require('../services/services.role')();

module.exports = () => {
    const addRole = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.body
            const response = await roleService.addRole(payload, logger)
            if (response == 'success') {
                res.status(200).send({
                    status: '200 OK',
                    result: "Success Assigned the roles"
                })
            } else {
                res.status(200).send({
                    status: 400,
                    result: response
                })
            }
        } catch (error) {
            res.status(200).send({
                status: '200',
                result: error
            })
        }
    }
    return {
        addRole
    }
}