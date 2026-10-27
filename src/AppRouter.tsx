import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AuthLayout, SignIn, SignUp } from './auth'
import { Spinner } from './shared'

import { sleep } from './lib/Sleep'
import { NoContactSelected } from './chat/components'
import { PrivateRoutes } from './chat'
import { checkAuth } from './fake/fake.data'

// Lazy Load
const ChatLayout = lazy(async () => {
  await sleep(2000)
  const modulo = await import('./chat')
  return {
    default: modulo.ChatLayout,
  }
})
const ChatPage = lazy(() =>
  import('./chat').then(page => ({ default: page.ChatPage })),
)

export const AppRouter = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = localStorage.getItem('token') ?? ''
      console.log(token)

      // ! SI el token no existe lanzar una exception
      if (!token) {
        throw new Error('No token found!.')
      }

      // ? Devuelve el usuario logged
      return checkAuth(token)
    },
    retry: 0,
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/*Auth Routes*/}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>

        {/*Chat Routes*/}
        <Route
          path="/chat"
          element={
            <Suspense fallback={<Spinner />}>
              <PrivateRoutes isAuth={!!user}>
                <ChatLayout />
              </PrivateRoutes>
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <NoContactSelected />
              </Suspense>
            }
          />
          <Route
            path="/chat/:clientId"
            element={
              <Suspense fallback={<Spinner />}>
                <ChatPage />
              </Suspense>
            }
          />
        </Route>

        {/*Redirect*/}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}
