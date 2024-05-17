import { request } from '@/utils/request'

interface SignUp {
  firstName: string
  lastName: string
  email: string
  password: string
  dob: string
  gender: string
}
export interface User {
  lastName: string
  firstName: string
  id: string
  fullName: string
  avatar: string
  school: string
  address: string
  workAt: string
}
interface UpdateMe {
  fullName?: string
  age?: number
  avatar?: string
  phone?: number
}

interface SignInData {
  email: string
  password: string
}

export const signIn = async (data: SignInData) => {
  const res = await request.post('/sign-in', data)
  return res.data
}

export const signUp = async ({ lastName, firstName, email, password, dob ,gender }: SignUp) => {
  const res = await request.post('/sign-up', {
    lastName,
    firstName,
    email,
    password,
    dob,
    gender
  })
  return res.data
}

export const forgotPassword = async ({ email }: { email: string }) => {
  const res = await request.post('/forgot-password', {
    email
  })
  return res.data
}

export const getMe = async () => {
  const res = await request.get('/users/me')
  return res.data
}

export const getAll = async () => {
  const res = await request.get('')
}

export const resetPassword = async (token: string, password: string) => {
  const res = await request.post(
    '/reset-password',
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const getUser = async (id: string) => {
  const res = await request.get(`/users/${id}`)
  return res.data
}
export const updateMe = async ({ fullName, age, avatar, phone }: UpdateMe) => {
  return request.put('/users/me', {
    fullName,
    age,
    avatar,
    phone
  })
}
