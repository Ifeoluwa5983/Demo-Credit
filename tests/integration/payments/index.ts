import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/config/express';
import enums from '../../../src/shared/lib/enums';
const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/payments';

describe('Payment Integration Test', () => {
    describe('Fund Wallet', () => {
        it('Should successfully fund the wallet', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/fund-wallet`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 500,
                    currency: 'NGA'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_OK);
                    expect(res.body.message).to.equal(enums.SUCCESSFUL_WALLET_FUNDING);
                    done();
                });
        });

        it('Should throw error if user does not have the wallet', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/fund-wallet`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 500,
                    currency: 'CAD'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_BAD_REQUEST);
                    expect(res.body.message).to.equal(enums.NOT_FOUND('Wallet'));
                    done();
                });
        });

        it('Should throw validation error for missing fields', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/fund-wallet`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 50
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_UNPROCESSABLE_ENTITY);
                    done();
                });
        });
    });

    describe('Withdraw Funds', () => {
        it('Should successfully withdraw funds', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/withdraw-fund`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 200,
                    currency: 'NGA',
                    accountNumber: '1234567890',
                    accountName: 'John Doe',
                    bankCode: '123',
                    bankName: 'Test Bank',
                    recipientEmail: 'john@example.com',
                    pin: '1234'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_OK);
                    expect(res.body.message).to.equal(enums.SUCCESSFUL_WITHDRAWAL);
                    done();
                });
        });

        it('Should throw error for incorrect pin', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/withdraw-fund`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 200,
                    currency: 'NGA',
                    accountNumber: '1234567890',
                    accountName: 'John Doe',
                    bankCode: '123',
                    bankName: 'Test Bank',
                    recipientEmail: 'john@example.com',
                    pin: '1235'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_BAD_REQUEST);
                    expect(res.body.message).to.equal(enums.INVALID_PIN);
                    done();
                });
        });

        it('Should throw error for insufficient balance', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/withdraw-fund`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 600,
                    currency: 'NGA',
                    accountNumber: '1234567890',
                    accountName: 'John Doe',
                    bankCode: '123',
                    bankName: 'Test Bank',
                    recipientEmail: 'john@example.com',
                    pin: '1234'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_BAD_REQUEST);
                    expect(res.body.message).to.equal(enums.INSUFFICIENT_BALANCE);
                    done();
                });
        });

        it('Should throw validation error for missing required fields', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/withdraw-fund`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 200,
                    currency: 'NGA',
                    pin: '1234'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_UNPROCESSABLE_ENTITY);
                    done();
                });
        });
    });

    describe('Wallet-to-Wallet Transfer', () => {
        it('Should successfully transfer funds to another wallet', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/wallet-to-wallet/transfer`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 300,
                    currency: 'NGA',
                    sendToUserId: 2
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_OK);
                    expect(res.body.message).to.equal(enums.SUCCESSFUL_FUNDS_TRANSFER);
                    done();
                });
        });

        it('Should throw validation error for negative amount', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/wallet-to-wallet/transfer`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: -50,
                    currency: 'NGN',
                    sendToUserId: 2
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_UNPROCESSABLE_ENTITY);
                    done();
                });
        });

        it('Should throw error if sending to an invalid user ID', (done) => {
            chai
                .request(app)
                .post(`${baseUrl}/wallet-to-wallet/transfer`)
                .set('Authorization', `Bearer ${process.env.DEMO_CREDIT_USER_ONE_AUTH_TOKEN}`)
                .send({
                    amount: 300,
                    currency: 'NGN',
                    sendToUserId: -1
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(enums.HTTP_UNPROCESSABLE_ENTITY);
                    done();
                });
        });
    });
});
