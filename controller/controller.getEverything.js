const getservice = require('../services/services.getEverything.js')()
module.exports = () => {
    //get role controller
    const getrole = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.query
            const response = await getservice.getroleservice(payload, logger)
            if (response) {
                res.status(200).send({
                    status: '200',
                    result: response
                })
            }
            else {
                res.status(200).send({
                    status: '400',
                    result: error
                })
            }
        } catch (error) {
            res.status(200).send({
                status: '400',
                result: "error while getting role"
            })
        }
    }
    const gettenant = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.query
            const response = await getservice.gettenantdb(payload, logger)
            if (response) {
                res.status(200).send({
                    status: '200',
                    result: response
                })
            }
            else {
                res.status(200).send({
                    status: '400',
                    result: " error while getting service"
                })
            }
        } catch (error) {
            res.status(200).send({
                status: '400',
                result: error
            })
        }
    }
    return {
        getrole,
        gettenant
    }
}