import { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../src/modules/authentication/services';
import axios from 'axios';

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
                firstName: "Ife",
                lastName: "Test",
                email: "ifeoluwa@credit.com",
                password: "validPassword123!",
                phoneNumber: "7012345680",
                country: "Nigeria",
                countryCode: "234",
                transactionPin: "1234"
            };
            //
            // const dbInsertStub = sinon.stub(db('users'), 'insert').resolves([1]);
            // const dbSelectStub = sinon.stub(db('users').select('*').where('email', mockUserData.email), 'first').resolves(mockUserData);

            const result = await authService.signupUser(mockUserData);

            expect(result.id).to.eql(1);
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
