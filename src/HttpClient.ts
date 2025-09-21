import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import {HttpError} from "./errors/HttpError";

export class HttpClient {
    private client: AxiosInstance;
    private readonly apiKey?: string;

    constructor(baseURL: string, apiKey?: string) {
        this.client = axios.create({ baseURL });
        this.apiKey = apiKey;

        this.client.interceptors.request.use((config) => {
            if (this.apiKey) {
                config.headers = config.headers || {};
                config.headers["X-API-KEY"] = this.apiKey;
            }
            return config;
        });
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = await this.client.get<T>(url, config);
            return res.data;
        } catch (err) {
            throw this.handleError(err as AxiosError);
        }
    }

    async post<T = any, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = await this.client.post<T>(url, data, config);
            return res.data;
        } catch (err) {
            throw this.handleError(err as AxiosError);
        }
    }

    async put<T = any, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = await this.client.put<T>(url, data, config);
            return res.data;
        } catch (err) {
            throw this.handleError(err as AxiosError);
        }
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = await this.client.delete<T>(url, config);
            return res.data;
        } catch (err) {
            throw this.handleError(err as AxiosError);
        }
    }

    private handleError(error: AxiosError): HttpError {
        return new HttpError(
            error.response?.status || 500,
            (error.response?.data as any)?.error || error.message || "Unexpected error",
            "HTTP_CLIENT_ERROR",
            error.response?.data as string
        );
    }

}