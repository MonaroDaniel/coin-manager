import { Ban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-[100vh] flex flex-col text-2xl mt-20 gap-3 items-center">
      <h1 className="font-bold text-6xl">ERROR-404</h1>
      <div className="flex items-center gap-2">
        <h1 className="text-4xl">Page Not Found</h1>
        <Ban size={32} />
      </div>
      <span
        onClick={() => navigate('/', { replace: true })}
        className="underline font-semibold cursor-pointer text-4xl"
      >
        Back to coins
      </span>
    </div>
  )
}
