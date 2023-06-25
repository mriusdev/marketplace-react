// import { registerUser, loginUser } from "../api/auth";
import { isObjectEmpty } from '../helper/helpers';

const ACCESS_TOKEN = 'at'

// TODO: move this elsewhere during refining
interface IJwtPayload {
  sub?: number;
  email?: string;
  iat?: number;
  exp?: number;
}

const addAuthDetailsToLocalStorage = (access_token: any): void => {
  localStorage.clear();
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(access_token));
}
const removeAuthDetailsFromLocalStorage = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
}
const getAuthDetailsFromLocalStorage = () => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    return JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}')
  }
  return null
}

function isLoggedIn(): boolean
{
  try {
    if (isObjectEmpty(getJwtPayload())) {
      return false;
    }
    console.log('auth details', getJwtPayload());

    return true;
  } catch (error) {
    return false;
  }
}

function getJwtPayload(): IJwtPayload
{
  const accessToken = getAuthDetailsFromLocalStorage();
  if (!accessToken) {
    return {}
  }
  const payloadHeader = accessToken.split('.')[1];
  try {
    return JSON.parse(atob(payloadHeader));
  } catch (error) {
    return {};
  }
}

function logout(): void
{
  if (isLoggedIn()) {
    return;
  }
  removeAuthDetailsFromLocalStorage();
}

const AuthService = {
  addAuthDetailsToLocalStorage,
  removeAuthDetailsFromLocalStorage,
  getAuthDetailsFromLocalStorage,
  isLoggedIn,
  logout,
  getJwtPayload,
}

export default AuthService
