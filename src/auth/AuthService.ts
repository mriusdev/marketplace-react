// import { registerUser, loginUser } from "../api/auth";

const useRegisterAuth = (access_token: any) => {
  localStorage.clear();

  localStorage.setItem('at', JSON.stringify(access_token))
}

const useLogoutAuth = () => {
  localStorage.clear()
}

const useGetAccessToken = () => {
  if (localStorage.getItem('at')) {
    return JSON.parse(localStorage.getItem('at') || '{}')
  }
  return null
}

const AuthService = {
  useRegisterAuth,
  useLogoutAuth,
  useGetAccessToken
}

export default AuthService
