const Role = require('../model/role')
module.exports = () => {
    const addRole = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { role, permission } = payload
            const response = new Role({ role, permission })
            await response.save()
            resolve('success')
        } catch (error) {
            reject(error)
        }
    })
    return {
        addRole
    }
}