const Login = require('../model/loginSchema');
const Masterdata = require('../model/masterSchema');

module.exports = () => {
   /**
    * 
    * @param {*} payload 
    * @param {*} logger 
    * @param {*} db 
    */
   const signupEmployee = (payload, logger, db) => new Promise(async (resolve, reject) => {
      try {
         const {
            name,
            user_id,
            email,
            password,
            company,
         } = payload;

         //Check to see if the employee with same user_id is present in masterdata
         let matchedEmployee = Masterdata.findOne({
            user_id
         });
         if (matchedEmployee) {
            //If the employee id matches, then add him to the login collection(sign him up)
            matchedEmployee = new Login({
               name,
               user_id,
               email,
               password,
               company,
            })
            //Check if email used is already taken
            if (await Login.findOne({
                  email
               })) {
               resolve('foundEmail')
            } else {
               await matchedEmployee.save();
               resolve(matchedEmployee);
               logger.info(`'Successfully matched and added signin data with masterdata collection and adding to login collection `)
            }
         }
      } catch (error) {
         reject(error);
         logger.error('Error while matching signin data with masterdata collection and adding to login collection')
      }
   })

   return {
      signupEmployee,
   }
}