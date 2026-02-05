import { useState, useEffect } from 'react'
import type { Post } from '../types/post'

interface PostCardProps {
  post: Post
  isOwner: boolean
  onEdit?: () => void
  onDelete?: () => void
}

const LIKES_KEY = 'codeleap_likes'

export function PostCard({ post, isOwner, onEdit, onDelete }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem(LIKES_KEY)
    const likes = stored ? JSON.parse(stored) : {}
    
    if (likes[post.id]) {
      setLiked(likes[post.id].liked)
      setLikeCount(likes[post.id].count)
    } else {
      const initialCount = Math.floor(Math.random() * 15)
      setLikeCount(initialCount)
    }
  }, [post.id])

  const handleLike = () => {
    const stored = localStorage.getItem(LIKES_KEY)
    const likes = stored ? JSON.parse(stored) : {}
    
    const newLiked = !liked
    const newCount = newLiked ? likeCount + 1 : likeCount - 1
    
    likes[post.id] = { liked: newLiked, count: newCount }
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
    
    setLiked(newLiked)
    setLikeCount(newCount)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hours ago`
    
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} days ago`
  }

  return (
    <div className="border border-[#999] rounded-2xl overflow-hidden">
      <div className="bg-[#7695EC] p-4 sm:p-6 flex justify-between items-center">
        <h3 className="text-lg sm:text-[22px] font-bold text-white truncate">{post.title}</h3>
        
        {isOwner && (
          <div className="flex gap-4 shrink-0 ml-4">
            <button onClick={onDelete} className="cursor-pointer hover:opacity-80">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H5H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={onEdit} className="cursor-pointer hover:opacity-80">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between text-[#777] text-base sm:text-lg mb-4 gap-1">
          <span className="font-bold">@{post.username}</span>
          <span>{formatDate(post.created_datetime)}</span>
        </div>
        <p className="text-base sm:text-lg whitespace-pre-wrap mb-4">{post.content}</p>
        
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-[#777] hover:text-[#7695EC] transition-colors cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={liked ? '#FF5151' : 'none'}
            stroke={liked ? '#FF5151' : 'currentColor'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className={liked ? 'text-[#FF5151]' : ''}>{likeCount}</span>
        </button>
      </div>
    </div>
  )
}
