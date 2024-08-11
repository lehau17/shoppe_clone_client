import { AuthResponse } from "../types/auth.type"
import http from "../utils/http"

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>("/login", body)
}

export const logout = () => {
  return http.post("/logout")
}
export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>("/register", body)
