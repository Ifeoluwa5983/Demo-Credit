import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/config/express';
import enums from '../../../src/shared/lib/enums';
const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/auth';
const password = 'validPassword123!';
const wrongPassword = 'wrongPassword';

describe('Auth Integration Test', () => {
  describe('Signup User', () => {
    it('Should successfully sign up a user', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send({
            firstName: "Ife",
            lastName: "Test",
            email: "ifeoluwa@test.com",
            password: password,
            phoneNumber: "70123456780",
            country: "Nigeria",
            countryCode: "234",
            transactionPin: "1234"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('User created successfully');
          process.env.USER_ID_ONE = res.body.data.user_id;
          done();
        });
    });

      it('Should throw error if the email address is already in use', (done) => {
          chai
              .request(app)
              .post(`${baseUrl}/signup`)
              .send({
                  firstName: "Ife",
                  lastName: "Test",
                  email: "ifeoluwa@test.com",
                  password: "validPassword123!",
                  phoneNumber: "70123456720",
                  country: "Nigeria",
                  countryCode: "234",
                  transactionPin: "1234"
              })
              .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(400);
                  expect(res.body.message).to.equal(
                      enums.ALREADY_IN_USE('Email')
                  );
                  done();
              });
      });

    it('Should throw error if the phone number is already in use', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send({
            firstName: "Ife",
            lastName: "Test",
            email: "ifeoluwa@hello.com",
            password: "validPassword123!",
            phoneNumber: "70123456780",
            country: "Nigeria",
            countryCode: "234",
            transactionPin: "1234"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            enums.ALREADY_IN_USE('Phone number')
          );
          done();
        });
    });

    it('Should throw validation error for missing fields', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send({
          email: 'testuser2@example.com',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          done();
        });
    });

  });

  describe('Login', () => {
    it('Should successfully login user one with email and password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ifeoluwa@test.com',
          password,
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(enums.HTTP_OK);
          expect(res.body.message).to.equal('Login successful');
          process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN = res.body.data.token;
          done();
        });
    });

    it('Should throw an error if an invalid email is provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'invalid@gmail.com',
          password,
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(enums.HTTP_NOT_FOUND);
          done();
        });
    });

    it('Should throw an error if an invalid password is provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ifeoluwa@test.com',
          password: wrongPassword,
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(enums.HTTP_UNAUTHORIZED);
          done();
        });
    });

    it('Should throw an error if email is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          password: wrongPassword,
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(enums.HTTP_UNPROCESSABLE_ENTITY);
          done();
        });
    });
    it('Should throw an error if password is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ifeoluwa@test.com',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(enums.HTTP_UNPROCESSABLE_ENTITY);
          done();
        });
    });
  });
});
