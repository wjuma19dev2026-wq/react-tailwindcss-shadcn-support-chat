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
import { Link } from 'react-router'

export const SignUp = () => {
  return (
    <div className="container m-auto">
      <div className="grid min-h-screen place-content-center">
        <Card className="grid grid-cols-2 m-0 p-0">
          <div className="p-4">
            <CardHeader className="text-center mb-5">
              <CardTitle>Registro de usuario</CardTitle>
              <CardDescription className="">Crea tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="correo">Usuario</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Nombre de usuario"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="correo">Email</Label>
                <Input
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****"
                />
              </div>
              <div className="grid gap-2">
                <Button className="text-white">Crear cuenta</Button>
              </div>
            </CardContent>
            <CardFooter className="grid gap-4 mt-5">
              <div className="text-center w-full">
                ---- Or continue with ----
              </div>
              <div className="flex justify-center gap-2">
                <Button>
                  <i className="fa-brands fa-apple"></i>
                </Button>
                <Button>
                  <i className="fa-brands fa-google"></i>
                </Button>
                <Button>
                  <i className="fa-brands fa-facebook-f"></i>
                </Button>
              </div>
              <CardDescription className="text-center">
                Ya tienes una cuenta? <Link to="/auth">Inicia sesion</Link>
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
