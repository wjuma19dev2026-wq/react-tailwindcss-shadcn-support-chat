import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthLayout, SignIn, SignUp } from './auth'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}
