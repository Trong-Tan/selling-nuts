import { request } from "@/utils/request"

export const getUser = async (id:string) => {
    const res = await request.get(`users/${id}`)
    return res.data
}

export const getUsers = async (q:string) => {
    const res = await request.get(`users?q=${q}`)
    return res.data
}