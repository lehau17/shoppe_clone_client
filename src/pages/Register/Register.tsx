import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../utils/rules"
import Input from "../../components/Input"
import { useMutation } from "@tanstack/react-query"
import { registerAccount } from "../../apis/auth.api"
import _ from "lodash"
import { isAxiosUnprocessableEntity } from "../../utils/utils"
import { ApiResponse } from "../../types/utils.type"

export type RegisterInput = {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterInput>({ resolver: yupResolver(registerSchema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterInput, "confirm_password">) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    _.omit(data, ["confirm_password"])
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ApiResponse<Omit<RegisterInput, "confirm_password">>>(error)) {
          const formData = error.response?.data.data
          if (formData) {
            const keys = Object.keys(formData) as (keyof Omit<RegisterInput, "confirm_password">)[]
            keys.forEach((key) => {
              setError(key as keyof Omit<RegisterInput, "confirm_password">, {
                message: formData[key],
                type: "Server"
              })
            })
          }
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
              <div className='text-2xl mb-4'>Đăng ký</div>

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

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2 outline-none block w-full py-2 rounded-sm pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                errors={errors.confirm_password?.message}
                placeholder='Confirm Password'
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='flex mt-2 w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
