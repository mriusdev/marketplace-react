import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import { AllRoutes } from './router'

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

export default App
