//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const should = chai.should();

const mongoose = require('mongoose')

//Require models
const User = require('../model/loginSchema')
const Profile = require('../model/profile')
const Role = require('../model/role')
const Masterdata = require('../model/tenantMasterSchema')
const Masters = require('../model/alphaMasterSchema')

chai.use(chaiHttp)


//Dummy Data
const dummyValidUser = {
    "user_id": "1759733",
    "email": "babuJelela@gmail.com",
    "password": "masaomikida",  
    "subscribed_service": "chatbox",
    "company_id": "testTenantT1",
    "master_username": "pinescaryk3obqvsq",
    "master_password": "CSls5OwZFReo"
}


describe('User Signup', () => {
    describe('Signup a new user', () => {
        it('Should Signup a new user and return a status of 200', (done) => {
            chai.request(app)
                .post('/api/v1/user/signup')
                .send(dummyValidUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log(res.body)
                    done()
                })
        })
    })
})
