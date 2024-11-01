import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { AuthController} from '../../../../src/modules/authentication/controller';
import AuthService from '../../../../src/modules/authentication/services';

describe('AuthController', () => {
    let authController: AuthController;
    let authServiceMock: sinon.SinonStubbedInstance<AuthService>;
    let req: Partial<Request>;
    // let res: Partial<Response>;

    let res: sinon.SinonStubbedInstance<Response>;

    beforeEach(() => {
        authServiceMock = sinon.createStubInstance(AuthService);
        authController = new AuthController();
        (authController as any).authService = authServiceMock;

        req = { body: {} };
        res = {
            json: sinon.stub().returnsThis(),
            status: sinon.stub().returnsThis(),
        } as unknown as sinon.SinonStubbedInstance<Response>;
    });

    describe('signupUser', () => {
        it('should return success when user signs up and wallet is created', async () => {
            const mockUserData = { id: 1, email: 'john@example.com' };
            req.body = { ...mockUserData };

            authServiceMock.signupUser.resolves(mockUserData);
            authServiceMock.checkKarma.resolves({ status: 'success', message: 'Identity not found in karma ecosystem' });
            authServiceMock.createWallet.resolves();

            await authController.signupUser(req as Request, res as Response);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(sinon.match({ status: 'success' }))).to.be.true;
        });
    });

    describe('login', () => {
        it('should return success with user data and token on login', async () => {
            req.body = { email: 'john@example.com', password: 'password' };
            const mockUser = { id: 1, email: 'john@example.com', token: 'mockToken', expires: '1h' };

            authServiceMock.login.resolves({ data: mockUser });

            await authController.login(req as Request, res as Response);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(sinon.match({ status: 'success' }))).to.be.true;
        });
    });
});
