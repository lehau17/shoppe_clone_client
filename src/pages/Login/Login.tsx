import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../utils/rules"
import { useMutation } from "@tanstack/react-query"
import { loginAccount } from "../../apis/auth.api"
import { isAxiosUnprocessableEntity } from "../../utils/utils"
import { ApiResponse } from "../../types/utils.type"
import { useContext } from "react"
import { AppContext } from "../../contexts/app.context"
import Button from "../../components/Button/Button"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../../types/auth.type"

export type LoginInput = {
  email: string
  password: string
}

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginInput>({ resolver: yupResolver(loginSchema) })

  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginInput) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data: AxiosResponse<AuthResponse>) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate("/")
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ApiResponse<LoginInput>>(error)) {
          const formData = error.response?.data.data as LoginInput
          const keys = Object.keys(formData) as (keyof LoginInput)[]
          keys.forEach((key) => {
            setError(key as keyof LoginInput, {
              message: formData[key],
              type: "Server"
            })
          })
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-6 lg:py-32 '>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>

              <Input
                name='email'
                register={register}
                type='email'
                className='mt-2 outline-none block w-full py-2 rounded-sm pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                errors={errors.email?.message}
                placeholder='Email'
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2 outline-none block w-full py-2 rounded-sm pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                errors={errors.password?.message}
                placeholder='password'
              />
              <div className='mt-3'>
                <Button
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                  type='submit'
                  className='flex mt-8 w-full items-center justify-center bg-red-500 py-2 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
