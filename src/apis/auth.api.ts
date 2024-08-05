import { AuthResponse } from "../types/auth.type"
import http from "../utils/http"

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post("/login", body)
}
export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>("/register", body)
