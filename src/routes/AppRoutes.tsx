import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../screens/Login'
import Cadastro from '../screens/Cadastro'
import EsqueciSenha from '../screens/EsqueciSenha'
import RedefinirSenha from '../screens/RedefinirSenha'
import CadastroBebe from '../screens/CadastroBebe'
import Home from '../screens/Home'
import Album from '../screens/Album'
import Familia from '../screens/Familia'
import Configuracoes from '../screens/Configuracoes'
import { ProtectedRoute } from './ProtectedRoute'
import { RequireBaby } from './RequireBaby'
import { AppLayout } from './AppLayout'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="/redefinir-senha" element={<RedefinirSenha />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cadastro-bebe" element={<CadastroBebe />} />

        <Route element={<RequireBaby />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/album" element={<Album />} />
            <Route path="/familia" element={<Familia />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
