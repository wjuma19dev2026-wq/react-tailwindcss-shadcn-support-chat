import { Button } from '@/components/ui/button'

import { X } from 'lucide-react'
import { Outlet } from 'react-router'
import {
  ClientInfoSkeleton,
  NoClienteInfo,
  NoContactSelected,
  ContactInfo,
  LeftSidebar,
} from '../components'

export const ChatLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="font-semibold">NexTalk</span>
          </div>
        </div>
        {/*Sidebar Left*/}
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <div></div> {/* Empty div to maintain spacing */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Save conversation
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          {/*<Outlet />*/}
          <NoContactSelected />
        </div>

        {/* Right Panel - Contact Details */}
        {/*<ContactInfo />*/}
        {/*<NoClienteInfo />*/}
        <ClientInfoSkeleton />
      </div>
    </div>
  )
}
