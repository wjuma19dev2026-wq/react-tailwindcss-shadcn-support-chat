type NoContactSelectedProps = {
  title?: string
  description?: string
}

export const NoContactSelected = ({
  title = 'No hay contacto seleccionado',
  description = 'Selecciona un contacto para comenzar a chatear.',
}: NoContactSelectedProps) => {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md  p-8 text-center ">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl">
          💬
        </div>

        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  )
}
