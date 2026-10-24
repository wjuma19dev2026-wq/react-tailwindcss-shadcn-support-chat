// import { AuthLayout } from './auth/layout/AuthLayout'

import './App.css'
import { ChatLayout, ChatPage } from './chat'

export const App = () => {
  return (
    <>
      {/*<AuthLayout />*/}
      <ChatLayout>
        <ChatPage />
      </ChatLayout>
    </>
  )
}
