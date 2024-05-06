import { request } from '@/utils/request'
import { ReactNode } from 'react'

export interface Post {
  [x: string]: ReactNode
  id: string
}

interface CreatePost {
  content : String
  // media : String[]
  // publishType : String
}

export const fetchPostsByUserId = async (userId: string) => {
  const res = await request.get(`/users/${userId}/posts`)
  return res.data
}

export const createPost = async (data: CreatePost) => {
  await request.post('/posts', data)
}

export const fetchAllPosts = async () => {
  const res = await request.get('/posts');
    return res.data;
}