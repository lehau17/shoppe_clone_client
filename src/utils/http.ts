import axios, { AxiosError, AxiosInstance } from "axios"
import HttpStatusCode from "../contraints/HttpStatusCode"
import { toast } from "react-toastify"
import { getAccessToken, clearLS, saveAccessToken, saveProfile } from "./auth"
import { AuthResponse } from "../types/auth.type"

class Axios {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })

    this.instance.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.authorization = this.accessToken
      }
      return config
    })

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === "/login" || url === "/register") {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          saveAccessToken(data.data.access_token)
          saveProfile(data.data.user)
        } else if (url === "/logout") {
          this.accessToken == ""
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Axios().instance
export default http
