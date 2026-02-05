import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { Input, Textarea } from './Input'
import { Button } from './Button'
import type { Post } from '../types/post'

interface EditModalProps {
  post: Post | null
  onClose: () => void
  onSave: (title: string, content: string) => void
  isLoading?: boolean
}

export function EditModal({ post, onClose, onSave, isLoading }: EditModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title.trim(), content.trim())
    }
  }

  return (
    <Modal isOpen={!!post} onClose={onClose} title="Edit item">
      <div className="space-y-4">
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

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
