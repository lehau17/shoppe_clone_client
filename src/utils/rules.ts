import { RegisterOptions, UseFormGetValues } from "react-hook-form"
import { RegisterInput } from "../pages/Register/Register"
import * as yup from "yup"
type Rules = { [key in "email" | "password" | "confirm_password"]: RegisterOptions<RegisterInput> }
export const getRules = (getValues: UseFormGetValues<RegisterInput>): Rules => {
  return {
    email: {
      required: {
        value: true,
        message: "Email là bắt buộc"
      },
      minLength: {
        value: 5,
        message: "Email tối thiểu 5 ký tự"
      },
      maxLength: {
        value: 160,
        message: "Email tối đa 160 ký tự"
      },
      pattern: {
        value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Email không hợp lệ"
      }
    },
    password: {
      required: {
        value: true,
        message: "Password là bắt buộc"
      },
      minLength: {
        value: 6,
        message: "Password tối thiểu 6 ký tự"
      },
      maxLength: {
        value: 160,
        message: "Password tối đa 160 ký tự"
      }
    },
    confirm_password: {
      required: {
        value: true,
        message: "Chưa xác nhận mật khẩu"
      },
      minLength: {
        value: 6,
        message: "Password tối thiểu 6 ký tự"
      },
      maxLength: {
        value: 160,
        message: "Password tối đa 160 ký tự"
      },
      validate: (value) => value === getValues("password") || "Xác nhận mật khẩu không chính xác"
    }
  }
}

export const registerSchema = yup.object({
  email: yup.string().required("email không được rỗng").min(6, "email tối thiểu 6 ký tự").email("Email không hợp lệ."),
  password: yup
    .string()
    .required("password không được rỗng")
    .min(6, "Password tối thiểu 6 ký tự")
    .max(160, "Password tối đa 160 ký tự"),
  confirm_password: yup
    .string()
    .required("Confirm password không được rỗng")
    .min(6, "Confirm Password tối thiểu 6 ký tự")
    .max(160, "Confirm Password tối đa 160 ký tự")
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp")
})

export const loginSchema = yup.object({
  email: yup.string().required("email không được rỗng").min(6, "email tối thiểu 6 ký tự").email("Email không hợp lệ."),
  password: yup
    .string()
    .required("password không được rỗng")
    .min(6, "Password tối thiểu 6 ký tự")
    .max(160, "Password tối đa 160 ký tự")
})
