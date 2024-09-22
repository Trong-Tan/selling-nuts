import { request } from '@/utils/request'

interface SignUp {
  firstName: string
  lastName: string
  email: string
  password: string
}
export interface User {
  lastName: string
  firstName: string
  id: string
  avatar: string
  school: string
}
interface UpdateMe {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
}

interface SignInData {
  email: string
  password: string
}

export const signIn = async (data: SignInData) => {
  const res = await request.post('/sign-in', data)
  return res.data
}

export const signUp = async ({ firstName, lastName, email, password}: SignUp) => {
  const res = await request.post('/sign-up', {
    firstName,
    lastName,
    email,
    password,
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
export const updateMe = async ({ firstName, lastName, email, address }: UpdateMe) => {
  return request.put('/users/me', {
    firstName,
    lastName,
    email,
    address
  })
}
