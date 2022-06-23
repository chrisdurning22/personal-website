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

const baseURL = process.env.REACT_APP_API_ENDPOINT;

const request = (methodType: MethodType, body?: any) => {
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

const resolveOrRejectResponse = async (response: any) => {
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

// CRUD Start

const post = async (suffix: string, body?: any): Promise<any> => {
  const postURL = `${baseURL}/${suffix}`;
  const response = await fetch(postURL, request(MethodType.POST, body));
  return resolveOrRejectResponse(response);
}

// const get = async (suffix: string, id: number) => {
//   const getURL = `${baseURL}/${suffix}/${id}`;
//   const response = await fetch(getURL, request(MethodType.GET));
//   return resolveOrRejectResponse(response);
// }

const getAll = async (suffix: string) => {
  const getAllURL = `${baseURL}/${suffix}`;
  const response = await fetch(getAllURL, request(MethodType.GET));
  return resolveOrRejectResponse(response);
}

const put = async (suffix: string, body: any, id: number) => {
  const putURL = `${baseURL}/${suffix}/${id}/`;
  const response = await fetch(putURL, request(MethodType.PUT, body));
  return resolveOrRejectResponse(response);
}

const del = async (suffix: string, id: number) => {
  const deleteURL = `${baseURL}/${suffix}/${id}/`;
  const response = await fetch(deleteURL, request(MethodType.DELETE));
  return resolveOrRejectResponse(response);
}

// CRUD End

export const GetSectionList = () => {
  return getAll(APIRoutes.SECTIONS);
};

export const AddSection = (section: Section) => {
  return post(APIRoutes.SECTIONS, section);
}

export const UpdateSection = (section: Section, id: number) => {
  const putObject = {
    title: section.title,
    content: section.content,
  }

  return put(APIRoutes.SECTION, putObject, id);
}

export const DeleteSection = (id: number) => {
  return del(APIRoutes.SECTION, id);
}

export const RegisterUser = (registerDetails: RegisterDetails): Promise<any> => {
  return post(APIRoutes.REGISTER, registerDetails);
};

export const LogoutUser = () => {
  return post(APIRoutes.LOGOUT);
};

export const LoginUser = (loginDetails: LoginDetails): Promise<any> => {
  return post(APIRoutes.LOGIN, loginDetails);
};

export const IsUserLoggedIn = async () => {
  const getURL = `${baseURL}/${APIRoutes.LOGIN}`;
  const response = await fetch(getURL, request(MethodType.GET));
  return resolveOrRejectResponse(response);
}