const roleschema = require('../model/role')
const masterschema = require('../model/alphaMasterSchema')
module.exports = () => {
    const getroleservice = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { role } = payload
            const response = await roleschema.findOne({ role })
            console.log(response)
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
    const gettenantdb = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { company_name } = payload
            const response = await masterschema.findOne({ company_name }).populate('service_name')
            resolve(response)

        } catch (error) {
            reject(error)

        }
    })
    return {
        getroleservice,
        gettenantdb
    }
}