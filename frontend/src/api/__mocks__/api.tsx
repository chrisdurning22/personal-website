import { LoginDetails } from "../../types/types";

// dummy existing user
const user = {
    'email': 'test@test.com',
    'password': 'test'
}

export const LoginUser = async (loginDetails: LoginDetails) => {
    if (JSON.stringify(loginDetails) === JSON.stringify(user)) {
        window.localStorage.setItem('isLoggedIn', 'true');
        return Promise.resolve({'jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjU0MDkxODE4LCJpYXQiOjE2NTQwMzE4MTh9.iM-PcmdkB9Bb0QMAVnfmIp2qqbAZ2t-ajlRfbuXCoQc'});
    }
    else {
        window.localStorage.setItem('isLoggedIn', 'false');
        return Promise.reject({detail: 'Authentication Unsuccessful'});
    }
}