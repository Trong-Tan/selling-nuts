import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { updateMe} from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { settingSchema } from '@/utils/schema'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { z } from 'zod'
import { useNavigate} from 'react-router-dom'

export type SettingInputs = z.infer<typeof settingSchema>

export default function Cart() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const {register,
        handleSubmit,
        formState: { errors }
      } = useForm<SettingInputs>({
        mode: 'onBlur',
        resolver: zodResolver(settingSchema)
      })

    const onSubmit = async (data: SettingInputs) => {
        try {
          setIsLoading(true)
          await updateMe(data)
          navigate('/login')
          toast.success('Update successfully!')
          console.log("Thanh cong");
          
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message)
          }
        } finally {
          setIsLoading(false)
        }
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
        >
          Setting
        </Button>
      </DialogTrigger>
      <DialogContent className="p-1 h-auto w-auto">
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid max-w-2xl mx-auto mt-8">
                        <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                            <div
                                className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                <div className="w-full">
                                    <label htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        first name</label>
                                    <Input className="px-3 py-4" {...register('firstName')} placeholder="Firstname" type="text"  />
                                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        last name</label>
                                    <Input className="px-3 py-4" {...register('lastName')} placeholder="Lastname" type="text" />
                                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                                </div>
                            </div>
                            <div className="mb-2 sm:mb-6">
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                    email</label>
                                <Input className="px-3 py-4" {...register('email')} placeholder="Email" type="email" />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="mb-2 sm:mb-6">
                                <label htmlFor="address"
                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Address</label>
                                <Input className="px-3 py-4" {...register('address')} placeholder="Address" type="text" />
                                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button type="submit"
                                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
