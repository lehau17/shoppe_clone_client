import { User } from "./user.type"
import { ApiResponse } from "./utils.type"

export type AuthResponse = ApiResponse<{
  access_token: string
  expires: string
  user: User
}>
