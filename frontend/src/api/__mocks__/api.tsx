import { LoginDetails } from "../../types/types";

export const LoginUser = async (loginDetails: LoginDetails) => {
    window.localStorage.setItem('isLoggedIn', 'true');
    const loginPromise = jest.fn(() => Promise.resolve({loginDetails: loginDetails}))
    return loginPromise;
}