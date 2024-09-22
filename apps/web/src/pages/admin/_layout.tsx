import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'
import { getMe } from '@/apis/auth'
import { getToken } from '@/utils/token'
import Sidebar from './components/Sidebar'

export default function Component() {
  const accessToken = getToken()

  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!accessToken
  })

  if (!accessToken) return <Navigate to="/login" />

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <Outlet context={{ me: meQuery?.data }} />
    </div>
  )
}
