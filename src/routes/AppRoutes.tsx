import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../screens/Login'
import Cadastro from '../screens/Cadastro'
import EsqueciSenha from '../screens/EsqueciSenha'
import RedefinirSenha from '../screens/RedefinirSenha'
import Home from '../screens/Home'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="/redefinir-senha" element={<RedefinirSenha />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
