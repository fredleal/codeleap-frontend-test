import { useState, useEffect } from 'react'

const STORAGE_KEY = 'codeleap_username'

export function useUser() {
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY)
  })

  useEffect(() => {
    if (username) {
      localStorage.setItem(STORAGE_KEY, username)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [username])

  const login = (name: string) => setUsername(name)
  const logout = () => setUsername(null)

  return { username, login, logout, isLoggedIn: !!username }
}
