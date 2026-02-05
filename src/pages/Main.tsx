import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '../hooks/useUser'
import { getPosts, createPost } from '../services/api'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/Input'
import { PostCard } from '../components/PostCard'

export function Main() {
  const { username, isLoggedIn } = useUser()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signup')
    }
  }, [isLoggedIn, navigate])

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    enabled: isLoggedIn,
  })

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
      setContent('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !username) return
    createMutation.mutate({ username, title: title.trim(), content: content.trim() })
  }

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      <div className="max-w-[800px] mx-auto bg-white min-h-screen">
        <header className="bg-[#7695EC] h-20 flex items-center px-9">
          <h1 className="text-[22px] font-bold text-white">CodeLeap Network</h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="border border-[#999] rounded-2xl p-6">
            <h2 className="text-[22px] font-bold mb-6">What's on your mind?</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                placeholder="Hello world"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <Textarea
                label="Content"
                placeholder="Content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={!title.trim() || !content.trim() || createMutation.isPending}
                >
                  {createMutation.isPending ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </form>
          </div>

          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          
          {data?.results.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={post.username === username}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
