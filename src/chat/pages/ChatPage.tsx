import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getClientMessages } from '@/fake/fake.data'

export const ChatPage = () => {
  const [input, setInput] = useState('')

  const { clientId } = useParams()

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', clientId],
    queryFn: () => getClientMessages(clientId ?? ''),
  })

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted-foreground/20 border-t-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Cargando conversación...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {messages.length === 0 && (
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/20 px-8 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-xl">
              💬
            </div>
            <div>
              <p className="text-base font-medium">No hay mensajes</p>
              <p className="text-sm text-muted-foreground">
                Inicia la conversación con el cliente.
              </p>
            </div>
          </div>
        </div>
      )}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === 'agent' ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Link to="/chat" className="cursor-pointer">
                        <span className="text-sm font-medium ">NexTalk</span>
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {message.createdAt.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">
                      {message.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
