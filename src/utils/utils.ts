import axios, { AxiosError } from "axios"
import HttpStatusCode from "../contraints/HttpStatusCode"

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError<T>(error) && Number(error.response?.status) === HttpStatusCode.UnprocessableEntity
}
