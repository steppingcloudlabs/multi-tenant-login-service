//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const should = chai.should();

const mongo = require('mongoose')

//Require models
const User = require('../model/loginSchema')
const Profile = require('../model/profile')
const Role = require('../model/role')
const Masterdata = require('../model/tenantMasterSchema')
const Masters = require('../model/alphaMasterSchema')

const config = require("../config/index")

chai.use(chaiHttp)

//Dummy Data

let token = '';
let role = "";

const dummySignupData = {
    "user_id": "1383629",
    "email": "akankshabali@gmail.com",
    "password": "masaomikida",
    "subscribed_service": "chatbox",
    "company_id": "testTenantT1",
    "master_username": "pinescaryk3obqvsq",
    "master_password": "CSls5OwZFReo"
}

const dummyDeleteData = {
    "email": "akankshabali@gmail.com",
    "company_id": "testTenantT1",
    "master_username": "pinescaryk3obqvsq",
    "master_password": "CSls5OwZFReo"
}

const dummySigninData = {
    "email": "akankshabali@gmail.com",
    "password": "masaomikida",
    "company_id": "testTenantT1",
    "master_username": "pinescaryk3obqvsq",
    "master_password": "CSls5OwZFReo"
}

describe('User', () => {
    describe('Signup a new user', () => {
        it('Should Signup a new user and return a status of 200', (done) => {
            chai.request(app)
                .post('/api/v1/user/signup')
                .send(dummySignupData)
                .end((err, res) => {
                    console.log(res.body.message)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.be.eql('400')
                    done()
                })
        })
    })

    describe('Signin a user', () => {
        it('Should signin a user and return status of 200', (done) => {
            chai.request(app)
                .post('/api/v1/signin')
                .send(dummySigninData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.be.eql('200 ok')
                    token = res.body.token;
                    role = res.body.result.role
                    done()
                })
        })
    })

    describe('Delete a user', () => {
        it('Should delete a user and return a status of 200', (done) => {
            chai.request(app)
                .delete('/api/v1/delete/user')
                .send({
                    "email": "akankshabali@gmail.com",
                    "company_id": "testTenantT1",
                    "master_username": "pinescaryk3obqvsq",
                    "master_password": "CSls5OwZFReo",
                    "token": token,
                    "role": role
                })
                .end((err, res) => {
                    console.log(res.body.message)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.be.eql('200 OK')
                    done()
                })
        })
    })

})
