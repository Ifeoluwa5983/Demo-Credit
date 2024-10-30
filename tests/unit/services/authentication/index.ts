import { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../../../src/modules/authentication/services';
import axios from 'axios';
import { db } from '../../../../src/config/database';

describe('AuthService', () => {
    let authService: AuthService;
    let axiosStub: sinon.SinonStub;

    beforeEach(() => {
        authService = new AuthService();
        axiosStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('signupUser', () => {
        it('should insert a user and return user data', async () => {
            const mockUserData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password',
                phoneNumber: '1234567890',
                country: 'USA',
                countryCode: 'US',
                transactionPin: '1234'
            };

            const dbInsertStub = sinon.stub(db('users'), 'insert').resolves([1]);
            const dbSelectStub = sinon.stub(db('users').select('*').where('email', mockUserData.email), 'first').resolves(mockUserData);

            const result = await authService.signupUser(mockUserData);

            expect(result).to.eql(mockUserData);
            sinon.assert.calledOnce(dbInsertStub);
            sinon.assert.calledOnce(dbSelectStub);
        });
    });

    describe('checkKarma', () => {
        it('should return karma data if the user is blacklisted', async () => {
            const karmaResponse = { status: 'success', message: 'User found in karma database' };
            axiosStub.resolves({ data: karmaResponse });

            const result = await authService.checkKarma('john@example.com');
            expect(result).to.eql(karmaResponse);
        });
    });
});
