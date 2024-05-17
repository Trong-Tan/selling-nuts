import { useState } from 'react'
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
import { ShieldQuestion } from 'lucide-react'
import dayjs from 'dayjs'

interface SignUpInputs {
  firstName: string
  lastName: string
  email: string
  password: string
  // dob: Date
  gender: string
}

export default function Signup() {
  const dateObj = new Date()
  const [day, setDay] = useState(`${dateObj.getDate()}`)
  const [month, setMonth] = useState(`${dateObj.getMonth() + 1}`)
  const [year, setYear] = useState(`${dateObj.getFullYear()}`)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: any) => {
    try {
      data.dob = dayjs(`${year}-${month}-${day}`).toISOString()
      await signUp(data)
      toast.success('Sign-up successfully!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  const handleDayChange = (value: string) => {
    setDay(value)
  }

  const handleMonthChange = (value: string) => {
    setMonth(value)
  }

  const handleYearChange = (value: string) => {
    setYear(value)
  }
  console.log(dateObj.getMonth(), 'sss')

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
            <div className="flex items-center">
              <p className="text-sm text-[#828697]">Ngày sinh</p>
              <ShieldQuestion className="h-3 w-3 " />
            </div>
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
