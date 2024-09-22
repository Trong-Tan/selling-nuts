import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'
import { getMe } from '@/apis/auth'
import Navbar from "../../components/Navbar/Navbar";
import { getToken } from '@/utils/token'

export default function Component() {
  const accessToken = getToken()

  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!accessToken
  })

  if (!accessToken) return <Navigate to="/login" />

  return (
    <div className="w-full">
      <Navbar location={""} />
      <Outlet context={{ me: meQuery?.data }} />
    </div>
  )
}
