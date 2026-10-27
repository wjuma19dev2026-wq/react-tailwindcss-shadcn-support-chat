import { getClient } from '@/fake/fake.data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { NoClientDetails } from './NoClientDetails'
import { ClientDetailsSkeleton } from './ClientDetailsSkeleton'
import { ClientDetail } from './ClientDetail'

export const ClientDetails = () => {
  const { clientId } = useParams()
  // console.log(`🚀 clientId: ${clientId}`)

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getClient(clientId ?? ''),
    staleTime: 60_000 * 5,
    enabled: !!clientId, // NOTE: La consulta solo se ejecutará cuando userId exista
  })

  if (!clientId) {
    return <NoClientDetails />
  }

  if (isLoading && !client) {
    return <ClientDetailsSkeleton />
  }

  if (client) {
    return <ClientDetail client={client} />
  }

  return (
    <>
      <p>Client not found!...</p>
    </>
  )
}
