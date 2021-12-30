import axios from "axios";

const APIRoutes = {
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
    SECTION: "/section",
    SECTIONS: "/sections"
}

export default class Api {
  apiURL: string | undefined;
  constructor() {
    this.apiURL = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    let headers = {
      'Content-Type': 'application/json'
    };

    let client = axios.create({
      withCredentials: true,
      baseURL: this.apiURL,
      timeout: 31000,
      headers: headers
    });

    return client;
  };

  getSectionList = (params?: any) => {
    return this.init().get(APIRoutes.SECTIONS, { params: params });
  };

  LoginUser = (data: any) => {
    return this.init().post(APIRoutes.LOGIN, data);
  };

  RegisterUser = (data: any): Promise<any> => {
    return this.init().post(APIRoutes.REGISTER, data);
  };

  LogoutUser = () => {
    return this.init().post(APIRoutes.LOGOUT);
  };
}