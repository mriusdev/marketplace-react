import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import { AllRoutes } from './router'
import { RootLayout } from './components/root-layout/RootLayout'

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

export default App
