import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { configuration } from "../utils";
import { Service } from "./types";

async function getService(serviceName: string) {
  try {
    // Gateway version is used to match the registry version hence use of config version
    const response: AxiosResponse<Service> = await axios.get(
      `${configuration.registry.url}/find/${serviceName}/${configuration.version}`
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        throw {
          status: 404,
          errors: (axiosError.response.data as any).detail,
        };
      }
      throw {
        status: axiosError.status,
        errors: axiosError.message,
      };
    }
    throw {
      status: 500,
      errors: error.message,
    };
  }
}

async function callNishauriService(requestOptions: AxiosRequestConfig) {
  requestOptions.url = `https://ushauriapi.kenyahmis.org/nishauri/${requestOptions.url}`;
  try {
    const response: AxiosResponse<any> = await axios(requestOptions);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        throw {
          status: axiosError.response?.status,
          errors: { detail: "Not found" },
        };
      } else if (axiosError.response?.status === 401) {
        throw {
          status: axiosError.response?.status,
          errors: { detail: "Unauthorized" },
        };
      }
      throw {
        status: axiosError.response?.status,
        errors: { detail: axiosError.message },
      };
    }
    throw {
      status: 500,
      errors: { detail: error.message },
    };
  }
}

export default {
  getService,
  callNishauriService,
};
