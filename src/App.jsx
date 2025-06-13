import './index.css'
import AppRouter from './routers/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
