import { signIn } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/utils/schema'
import { setToken } from '@/utils/token'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'
import Signup from '../components/Signup'
import Navbar from '@/components/Navbar/Navbar'

export type LoginInputs = z.infer<typeof loginSchema>

export default function Login() {
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
      const res = await signIn(data)
      setToken(res.accessToken)
      navigate('/')
      toast.success('Login successfully!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } 
  }

  return (
    <div className="m-auto flex items-center justify-center space-y-3 lg:p-32">
      <Navbar location="login" />
      <div className="container flex flex-col items-center space-y-10 md:flex-row md:justify-between">
        <div className=" flex w-1/2 flex-col space-y-3">
          <h1 className="text-4xl text-6xl font-bold text-primary">facebook</h1>
          <p className=" text-2xl font-medium">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
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
            <span className="font-bold">Tạo Trang</span> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
          </p>
        </div>
      </div>
    </div>
  )
}
