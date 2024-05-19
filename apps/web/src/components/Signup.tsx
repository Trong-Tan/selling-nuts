import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { signUp } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUpSchema } from '@/utils/schema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from '@/components/ui/dialog'
import { useState } from 'react'
import { z } from 'zod'


export type SignUpInputs = z.infer<typeof signUpSchema>

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema)
  })

  const [isLoading, setIsLoading] = useState(false)


  const onSubmit = async (data: SignUpInputs) => {
    try {
      setIsLoading(true)
      await signUp(data)
      toast.success('Sign-up successfully!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } 
    }finally {
      setIsLoading(false)
    }
  }
 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-48 rounded-sm bg-[#42B72A] py-6 text-center text-lg font-bold text-white"
        >
          Tạo tài khoản mới
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[#1c1e21]">Đăng Ký</DialogTitle>
          <DialogDescription>Nhanh chóng và dễ dàng.</DialogDescription>
        </DialogHeader>
        <hr className="my-4" />
        <div className="grid grid-flow-row gap-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <Input
                className="mb-3 rounded-[5px] bg-[#F5F6F7] px-1 py-2"
                {...register('firstName')}
                placeholder="Họ"
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}

              <Input
                className="mb-3 rounded-[5px] bg-[#F5F6F7] px-1 py-2"
                {...register('lastName')}
                placeholder="Tên"
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
            <Input
              className="mb-3 rounded-[5px] bg-[#F5F6F7] px-1 py-2"
              {...register('email')}
              placeholder="Số di động hoặc email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            <Input
              className="mb-3 rounded-[5px] bg-[#F5F6F7] px-1 py-2"
              {...register('password')}
              placeholder="Mật khẩu mới"
              type="password"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            <p className="text-sm text-[#828697]">
              Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook.{' '}
              <span className="text-primary">Tìm hiểu thêm.</span>
            </p>
            <p className="pb-7 text-sm text-[#828697]">
              Bằng cách nhấp vào Đăng ký, bạn đồng ý với <span className="text-primary">Điều khoản</span>,{' '}
              <span className="text-primary">Chính sách quyền riêng tư</span> và{' '}
              <span className="text-primary">Chính sách cookie</span> của chúng tôi. Bạn có thể nhận được thông báo của
              chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
            </p>
            <div className="flex items-center justify-center">
              <Button type="submit" className="bg-[#00A400] px-20 py-5 text-xl text-white">
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
