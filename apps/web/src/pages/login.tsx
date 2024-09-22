import { signIn } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/utils/schema'
import { setToken } from '@/utils/token'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'
import Signup from '../components/Signup'
import { useState } from 'react'

export type LoginInputs = z.infer<typeof loginSchema>

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginInputs) => {
    try {
      if (data.email == 'admin@gmail.com' || data.password == 'Admin123') {
        navigate('/admin')
        toast.success('Login successfully!')
      } else {
        setIsLoading(true)
        const res = await signIn(data)
        setToken(res.accessToken)
        navigate('/')
        toast.success('Login successfully!')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="m-auto flex items-center justify-center space-y-3 lg:p-32">
      <div className="container flex flex-col items-center space-y-10 md:flex-row md:justify-between">
        <div className=" flex w-1/2 flex-col space-y-3">
          <h1 className="text-6xl font-bold text-primary">ENUTS</h1>
          <p className=" text-2xl font-medium">
            Enuts giúp bạn tìm kiếm nhanh chóng các hạt giống từ mọi nơi trên trái đất.
          </p>
        </div>
        <div className="w-2/5">
          <div className=" mb-12 rounded-xl shadow-[4px_25px_42px_17px_rgba(0,0,0,0.27)]">
            <form className="space-y-3 p-4" onSubmit={handleSubmit(onSubmit)}>
              <Input className="px-3 py-4" {...register('email')} placeholder="Email" type="email" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              <Input className="px-3 py-4" {...register('password')} placeholder="Password" type="password" />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              <Button className="w-full py-7 text-2xl font-bold text-white" size="lg" type="submit" >
                Đăng nhập
              </Button>
            </form>
            <div className="flex flex-col items-center justify-center space-y-4 px-4 pb-4">
              <p className="cursor-pointer text-center text-sm text-primary">Quên mật khẩu</p>
              <div className="h-[1px] w-full rounded-full bg-[#E6E8EA]"></div>
              <Signup />
            </div>
          </div>
          <p className="text-center font-primary">
            <span className="font-bold">Tài khoản</span> này dành cho người biết chọn hạt giống tốt.
          </p>
        </div>
      </div>
    </div>
  )
}
