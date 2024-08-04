import { RegisterOptions } from "react-hook-form"
import { RegisterInput } from "../pages/Register/Register"
type Rules = { [key in "email" | "password" | "confirm_password"]: RegisterOptions<RegisterInput> }
export const rules: Rules = {
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
    }
  }
}
