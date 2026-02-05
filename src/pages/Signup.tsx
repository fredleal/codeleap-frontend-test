import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useUser } from '../hooks/useUser'

export function Signup() {
  const [name, setName] = useState('')
  const { login } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      login(name.trim())
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[500px] p-6 border border-[#ccc] rounded-2xl">
        <h1 className="text-[22px] font-bold mb-6">Welcome to CodeLeap network!</h1>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Please enter your username"
            placeholder="John doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={!name.trim()}>
              ENTER
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
