import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '../hooks/useUser'
import { getPosts, createPost, updatePost, deletePost } from '../services/api'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/Input'
import { PostCard } from '../components/PostCard'
import { EditModal } from '../components/EditModal'
import { DeleteModal } from '../components/DeleteModal'
import type { Post } from '../types/post'

export function Main() {
  const { username, isLoggedIn } = useUser()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [deletingPost, setDeletingPost] = useState<Post | null>(null)

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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title: string; content: string } }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setEditingPost(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setDeletingPost(null)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !username) return
    createMutation.mutate({ username, title: title.trim(), content: content.trim() })
  }

  const handleEdit = (newTitle: string, newContent: string) => {
    if (!editingPost) return
    updateMutation.mutate({ id: editingPost.id, data: { title: newTitle, content: newContent } })
  }

  const handleDelete = () => {
    if (!deletingPost) return
    deleteMutation.mutate(deletingPost.id)
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
              onEdit={() => setEditingPost(post)}
              onDelete={() => setDeletingPost(post)}
            />
          ))}
        </div>
      </div>

      <EditModal
        post={editingPost}
        onClose={() => setEditingPost(null)}
        onSave={handleEdit}
        isLoading={updateMutation.isPending}
      />

      <DeleteModal
        isOpen={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
