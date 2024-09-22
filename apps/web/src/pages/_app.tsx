import { QueryProvider } from '@/configs/query-client'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <QueryProvider>
      <Toaster richColors position="top-right" closeButton duration={5000} />
      <div className="h-screen bg-slate-100 font-primary">
        <Outlet />
      </div>
    </QueryProvider>
  )
}
