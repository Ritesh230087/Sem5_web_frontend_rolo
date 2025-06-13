import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Homepage from "../pages/Homepage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
