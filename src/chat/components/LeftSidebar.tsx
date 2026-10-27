import { ScrollArea } from '@/components/ui/scroll-area'
import { getClients } from '@/fake/fake.data'
import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router'

export const LeftSidebar = () => {
  const { clientId } = useParams()
  // console.log(`🚀 clientId: ${clientId}`)

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
    staleTime: 60_000 * 60,
  })

  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>

          {isLoading && <div> Cargando ... </div>}

          {clients.map(client => (
            <NavLink
              key={client.id}
              to={client.id}
              className={({ isActive }) =>
                `w-full border rounded-3xl border-gray-300/50 grid grid-cols-[1fr_2fr] p-2 mb-3 cursor-pointer ${isActive ? 'bg-gray-200/75 transition-all ease-in' : ''}`
              }
            >
              <div
                className={`h-6 w-6 rounded-full ${client.id === clientId ? 'bg-blue-500' : 'bg-gray-400'} flex-shrink-0 flex items-center justify-center text-white text-xs`}
              >
                {client.name.charAt(0)}
                {client.name.split(' ')[1].charAt(0)}
              </div>
              <span
                className={`flex justify-start ${client.id === clientId ? 'text-blue-500' : ''}`}
              >
                {client.name}
              </span>
            </NavLink>
          ))}
        </div>
        {/*    <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>*/}
      </div>
    </ScrollArea>
  )
}
