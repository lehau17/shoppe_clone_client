import { User } from "../types/user.type"

export const getAccessToken = () => {
  return localStorage.getItem("access_token") || ""
}

export const saveAccessToken = (access_token: string) => {
  return localStorage.setItem("access_token", access_token)
}

export const clearLS = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("profile")
}

export const getProfile = () => {
  const profile = localStorage.getItem("profile")
  if (profile) {
    return JSON.parse(profile)
  }
  return null
}

export const saveProfile = (profile: User) => {
  return localStorage.setItem("profile", JSON.stringify(profile))
}
