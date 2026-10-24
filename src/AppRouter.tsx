import { lazy, Suspense } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { AuthLayout, SignIn, SignUp } from './auth'
import { Spinner } from './shared'

import { sleep } from './lib/Sleep'

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
              <ChatLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <ChatPage />
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
