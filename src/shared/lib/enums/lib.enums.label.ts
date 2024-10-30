import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;

export const CHECK_ROLE_MIDDLEWARE = 'rolesAndPermissionMiddleware::checkRole';
export const GET_ROLES_CONTROLLER = 'RoleController::getAllRoles';
export const CREATE_ROLES_WITH_PERMISSION_CONTROLLER =
  'RoleController::createRoleWithPermission';
export const DELETE_ROLE_CONTROLLER =
  'rolesAndPermissionController::deleteRole';

export const GET_USER_MIDDLEWARE = 'UserMiddleware::getUser';
export const CHECK_EXPIRY_MIDDLEWARE = 'UserMiddleware:checkExpiry';
export const CHECK_STATUS_MIDDLEWARE = 'AuthMiddleware:checkStatus';
export const OTP_VERIFICATION_CONTROLLER = 'UserController:otpVerification';
export const HASH_DATA_MIDDLEWARE = 'AuthMiddleware::hashData';
export const VALIDATE_PASSWORD_MIDDLEWARE = 'AuthMiddleware::validatePassword';
export const VALIDATE_PASSWORD_OR_PIN_MIDDLEWARE =
  'AuthMiddleware::validatePasswordOrPin';
export const RESET_PASSWORD_CONTROLLER = 'AuthController::resetPassword';
export const CHECK_ENTITY_MIDDLEWARE = 'driversMiddleware::checkEntity';
export const GET_AUTH_TOKEN_MIDDLEWARE = 'AuthMiddleware::getAuthToken';
export const VALIDATE_USER_AUTH_TOKEN_MIDDLEWARE =
  'AuthMiddleware::validateUserAuthToken';
export const UPDATE_AUTH_TOKEN_CONTROLLER =
  'AuthTokenController::updateAuthToken';
export const GENERATE_VERIFICATION_TOKEN_SERVICE =
  'TokenService::generateVerificationToken';
