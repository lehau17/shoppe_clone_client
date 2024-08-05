import { Link } from "react-router-dom"
import Input from "../../components/Input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../utils/rules"
import { useMutation } from "@tanstack/react-query"
import { loginAccount } from "../../apis/auth.api"
import { isAxiosUnprocessableEntity } from "../../utils/utils"
import { ApiResponse } from "../../types/utils.type"

export type LoginInput = {
  email: string
  password: string
}

export default function Login() {
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
      onSuccess: (data) => {
        console.log(data)
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
              {/* <input
                name='email'
                type='email'
                className='mt-6 outline-none block w-full py-2 rounded-sm pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                placeholder='Email'
              />
              <input
                name='password'
                type='password'
                className='mt-6 block outline-none w-full py-2 pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                placeholder='Password'
                autoComplete='on'
              /> */}
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
                <button
                  type='submit'
                  className='flex mt-8 w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </button>
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
