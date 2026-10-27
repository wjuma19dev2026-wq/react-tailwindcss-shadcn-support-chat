type NoClienteInfoProps = {
  title?: string
  description?: string
}

export const NoClientDetails = ({
  title = 'Sin información del cliente',
  description = 'Selecciona un cliente para ver sus datos y detalles.',
}: NoClienteInfoProps) => {
  return (
    <div className="flex h-full min-h-[220px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-1 text-center">
      <div className="max-w-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl">
          👤
        </div>

        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  )
}
