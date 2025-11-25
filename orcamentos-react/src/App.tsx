import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Calculator from './pages/Calculator'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/app" element={<Calculator />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
