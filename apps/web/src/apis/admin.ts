import { request } from '@/utils/request'

export const fetchUserNumber = async () => {
    const response = await request.get(`admin/user-count`); 
    return response.data; 
}
