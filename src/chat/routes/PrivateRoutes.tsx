import { Navigate } from 'react-router'
import type { JSX } from 'react/jsx-runtime'

interface Props {
  children: JSX.Element
  isAuth: boolean
}

export const PrivateRoutes = ({ children, isAuth }: Props) => {
  if (!isAuth) {
    return <Navigate to="/auth" />
  }

  return children
}
