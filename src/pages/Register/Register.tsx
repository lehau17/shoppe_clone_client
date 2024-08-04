import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { rules } from "../../utils/rules"

export type RegisterInput = {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-6 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <input
                type='email'
                className='mt-5 outline-none block w-full py-4 rounded-sm pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                placeholder='Email'
                {...register("email", rules.email)}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              <input
                type='password'
                className='mt-5 block outline-none w-full py-4 pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                placeholder='Password'
                autoComplete='on'
                {...register("password", rules.password)}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              <input
                type='password'
                className='mt-5 block outline-none w-full py-4 pl-4 border border-gray-300 focus:border-gray-600 focus:shadow-sm'
                placeholder='Confirm Password'
                autoComplete='on'
                {...register("confirm_password", rules.confirm_password)}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='flex mt-8 w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
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
