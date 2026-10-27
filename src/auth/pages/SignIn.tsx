import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router'

import { loginUser } from '@/fake/fake.data'
import { Loader2 } from 'lucide-react'

export const SignIn = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  /**
   * El mutate no se llama de forma automatica como el useQuery
   * tenemos que mandarlo a llamar con la function mutation, es una tarea
   * asincrona, por lo que podemos llamarla con el async await
   */
  const {
    isPending,
    mutate: loginMutation,
    isError,
    erro,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      console.log('Impresion de la data: 🚀', data)
      // Almacenar el token del usuario en el localStorage
      localStorage.setItem('token', data.token)
      // Invalidar query del usuario
      queryClient.invalidateQueries({ queryKey: ['user'] })
      // Navegar a la pagina de chat con el replace true
      navigate('/chat', { replace: true })
    },
  })

  const onHandleGoogle = () => loginMutation()

  return (
    <div className="container m-auto">
      <div className="grid min-h-screen place-content-center">
        <Card className="grid grid-cols-2 m-0 p-0">
          <div className="p-4">
            <CardHeader className="text-center mb-5">
              <CardTitle>Bienvenido de nuevo</CardTitle>
              <CardDescription className="">Iniciar sesion </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="correo">Email</Label>
                <Input
                  className="p-3"
                  type="email"
                  name="correo"
                  id="correo"
                  placeholder="Ingresa tu correo"
                />
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-[1fr_2fr]">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-right">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  className="p-3"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****"
                />
              </div>
              <div className="grid gap-2">
                <Button className="cursor-pointer text-white rounded-sm border-0 p-3 flex align-middle">
                  Acceder
                </Button>
              </div>
            </CardContent>
            <CardFooter className="grid gap-4 mt-5">
              <div className="text-center w-full">
                ---- Or continue with ----
              </div>
              <div className="flex justify-center gap-2 ">
                <Button className="cursor-pointer text-white p-3 flex justify-center rounded-sm border-0">
                  <i className="fa-brands fa-apple"></i>
                </Button>
                <Button
                  onClick={onHandleGoogle}
                  disabled={isPending}
                  className="cursor-pointer text-white p-3 flex justify-center rounded-sm border-0"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <i className="fa-brands fa-google"></i>
                  )}
                </Button>
                <Button className="cursor-pointer text-white p-3 flex justify-center rounded-sm border-0">
                  <i className="fa-brands fa-facebook-f"></i>
                </Button>
              </div>
              <CardDescription className="text-center">
                No tienes una cuenta?{' '}
                <Link to={'sign-up'} relative="path" viewTransition>
                  Registrate
                </Link>
              </CardDescription>
            </CardFooter>
          </div>
          <div className="m-0 p-0 h-full">
            <img className="h-full" src="/placeholder.svg" />
          </div>
        </Card>
      </div>
    </div>
  )
}
