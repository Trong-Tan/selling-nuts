import { request } from "@/utils/request"

export const getGroups = async () => {
    const res = await request.get(`/groups`)
    return res.data
}
