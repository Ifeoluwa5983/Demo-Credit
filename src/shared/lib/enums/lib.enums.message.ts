import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const CREATED_SUCCESSFULLY = (type: string) =>
  `${type} created successfully`;
export const ALREADY_IN_USE = (type: string) => `${type} already in use`;
export const NOT_FOUND = (type: string) => `${type} not found`;
export const LOGIN_SUCCESSFUL = 'Login successful';
export const SUCCESSFUL_WITHDRAWAL = 'Funds has been withdrawn successfully from your wallet';
export const SUCCESSFUL_WALLET_FUNDING = 'Funds top-up successful';
export const SUCCESSFUL_FUNDS_TRANSFER = 'Funds transfer successful';
export const USER_NOT_EXIST = 'User does not exist';
export const INVALID_LOGIN_DETAILS = 'Invalid email or password';
export const INVALID_PIN = 'Invalid PIN';
export const NO_TOKEN = 'Please provide a token';
export const INVALID = (type: string) => `${type} is invalid`;
export const SESSION_EXPIRED = 'Session expired';
export const INSUFFICIENT_BALANCE = 'User deactivated/blacklisted';
