import { UseFormRegister } from "react-hook-form"

type Props = {
  name: string
  type: React.HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  register: UseFormRegister<any>
  errors?: string
}
export default function Input({ type, className, placeholder, register, errors, name }: Props) {
  return (
    <>
      <input type={type} className={className} placeholder={placeholder} {...register(name)} />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors}</div>
    </>
  )
}
