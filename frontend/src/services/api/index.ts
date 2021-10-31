import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export const MEDIA_TYPE_JSON: string = "application/json";

export const axiosCall = createAxiosInstance();

export function configureAxiosBaseUrl(baseUrl: string) {
    axiosCall.interceptors.request.use(
        (config) = addAuthorizationHeader(config),
        (error) => {
            return Promise.reject(error)
        }
    )
}

function createAxiosInstance(): AxiosInstance {
    const axiosInstance = axios.create({
        timeout: 60000
    })

    axiosInstance.interceptors.request.use(
        (config) = addAuthorizationHeader(config),
        (error) => {
            return Promise.reject(error)
        }
    )

    return axiosInstance;
}


function addAuthorizationHeader(
    config: AxiosRequestConfig
): AxiosRequestConfig {
    const accessToken: string = getToken();
    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: 'Bearer ' + accessToken
        }
    }
}

function getToken(): string {
    let item = localStorage.getItem('user');
    if (item === null) {
        item = "";
    }
    return JSON.parse(item);

}
