import { Section, LoginDetails, RegisterDetails } from "../types/types";

const APIRoutes = {
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout",
  SECTION: "section",
  SECTIONS: "sections"
}

enum MethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default class Api {
  baseURL: string | undefined;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_ENDPOINT;
  }

  request = (methodType: MethodType, body?: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    };

    let request: any = {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: headers
    }

    if(body != null) {
      request.body = JSON.stringify(body);
    }

    return request;
  }

  resolveOrRejectResponse = async (response: any) => {
    const responseData = await response.json();

    return new Promise((resolve, reject) => {
      if(response.ok) {
        resolve(responseData);
      }
      else {
        reject(responseData);
      }
    })
  }

  post = async (suffix: string, body?: any) => {
    const postURL = `${this.baseURL}/${suffix}`;
    const response = await fetch(postURL, this.request(MethodType.POST, body));
    return this.resolveOrRejectResponse(response);
  }

  get = async (suffix: string, id: number) => {
    const getURL = `${this.baseURL}/${suffix}/${id}`;
    const response = await fetch(getURL, this.request(MethodType.GET));
    return this.resolveOrRejectResponse(response);
  }

  getAll = async (suffix: string) => {
    const getAllURL = `${this.baseURL}/${suffix}`;
    const response = await fetch(getAllURL, this.request(MethodType.GET));
    return this.resolveOrRejectResponse(response);
  }

  put = async (suffix: string, body: any, id: number) => {
    const putURL = `${this.baseURL}/${suffix}/${id}/`;
    const response = await fetch(putURL, this.request(MethodType.PUT, body));
    return this.resolveOrRejectResponse(response);
  }

  delete = async (suffix: string, id: number) => {
    const deleteURL = `${this.baseURL}/${suffix}/${id}/`;
    const response = await fetch(deleteURL, this.request(MethodType.DELETE));
    return this.resolveOrRejectResponse(response);
  }

  getSectionList = () => {
    return this.getAll(APIRoutes.SECTIONS);
  };

  addSection = (section: Section) => {
    return this.post(APIRoutes.SECTIONS, section);
  }

  updateSection = (section: Section, id: number) => {
    const putObject = {
      title: section.title,
      content: section.content,
    }

    return this.put(APIRoutes.SECTION, putObject, id);
  }

  deleteSection = (id: number) => {
    return this.delete(APIRoutes.SECTION, id);
  }

  RegisterUser = (registerDetails: RegisterDetails): Promise<any> => {
    return this.post(APIRoutes.REGISTER, registerDetails);
  };

  LogoutUser = () => {
    return this.post(APIRoutes.LOGOUT);
  };

  LoginUser = (loginDetails: LoginDetails) => {
    return this.post(APIRoutes.LOGIN, loginDetails);
  };

  isUserLoggedIn = async () => {
    const getURL = `${this.baseURL}/${APIRoutes.LOGIN}`;
    const response = await fetch(getURL, this.request(MethodType.GET));
    return this.resolveOrRejectResponse(response);
  }
}