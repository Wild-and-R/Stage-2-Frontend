import { Button } from "./../components/ui/button"
import { Label } from "./../components/ui/label"
import { Input } from "./../components/ui/input"
import { useState } from "react"
import { useAuth } from "./../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { Login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === "admin" && password === "admin") {
      Login("token-abc")
      navigate("/products")
    } else {
      setErrorMsg("Invalid username or password")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}
