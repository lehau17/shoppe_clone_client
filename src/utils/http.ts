import axios, { AxiosError, AxiosInstance } from "axios"
import HttpStatusCode from "../contraints/HttpStatusCode"
import { toast } from "react-toastify"

class Axios {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.instance.interceptors.response.use(
      function (response) {
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
