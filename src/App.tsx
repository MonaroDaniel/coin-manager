import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'

export function App() {
  return (
    <div className="text-txt-01 h-full">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}
