const chai = require('chai')
const chaiHTTP = require('chai-http')

const app = require('../app')
const User = require('../models/User')

chai.should()
chai.use(chaiHTTP)

describe('users', function () {

    User.collection.drop();

    beforeEach(function (done) {
        User.create({ email: 'rubi@gmail.com', password: '1234' }).then(() => {
            done()
        }).catch((e) => {
            console.log(e)
            done()
        })

    })

    afterEach(function (done) {
        User.collection.drop();
        done()
    })


    it('Seharusnya sukses register dengan method POST', function (done) {
        chai.request(app)
            .post('/register')
            .send({ email: 'ramdan@gmail.com', password: '1234', repassword: '1234' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('email');
                res.body.data.email.should.equal('ramdan@gmail.com')
                res.body.data.should.have.property('token');
                done()
            })
    })

    it('Seharusnya sukses Login dengan metode POST', function (done) {
        chai.request(app)
            .post('/login')
            .send({ email: 'rubi@gmail.com', password: '1234' })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('email');
                res.body.data.email.should.equal('rubi@gmail.com')
                res.body.data.should.have.property('token');
                done()
            })
    })

    it('Seharusnya mendapatkan daftar Users dengan metode GET', function (done) {
        chai.request(app)
            .post('/login')
            .send({ email: 'rubi@gmail.com', password: '1234' })
            .end(function (err, response) {
                const token = response.body.data.token
                chai.request(app)
                    .get('/users')
                    .set({ "Authorization": `Bearer ${token}` })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        res.body.should.have.property('page');
                        res.body.should.have.property('pages');
                        res.body.data.should.be.a('array');
                        res.body.data[0].should.have.property('_id');
                        res.body.data[0].should.have.property('email');
                        res.body.data[0].email.should.equal('rubi@gmail.com');
                        res.body.data[0].should.have.property('password');
                        res.body.data[0].should.have.property('todos');
                        res.body.page.should.equal(1);
                        res.body.pages.should.equal(1);
                        done()
                    })
            })
    })

})

