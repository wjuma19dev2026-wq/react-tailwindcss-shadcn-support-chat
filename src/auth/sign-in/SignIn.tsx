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

export const SignIn = () => {
  return (
    <div className="container">
      <div className="grid min-h-screen place-content-center">
        <div className="columns-2xs">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Bienvenido de nuevo</CardTitle>
              <CardDescription className="">Iniciar sesion</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
                  <a
                    href="#"
                    className="text-right"
                  >
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
                <Button>Acceder</Button>
              </div>
            </CardContent>
            <CardFooter className="grid gap-4">
              <div className="text-center w-full">
                ---- Or continue with ----
              </div>
              <div className="flex justify-center gap-2">
                <Button>Apple</Button>
                <Button>Google</Button>
                <Button>Facebook</Button>
              </div>
              <CardDescription className="text-center">
                No tienes una cuenta? <a href="#">Registrate</a>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
