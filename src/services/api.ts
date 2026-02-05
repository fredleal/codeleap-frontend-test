import type { Post, CreatePostData, UpdatePostData, PostsResponse } from '../types/post'

const API_URL = 'https://dev.codeleap.co.uk/careers/'

export async function getPosts(): Promise<PostsResponse> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function createPost(data: CreatePostData): Promise<Post> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return res.json()
}

export async function updatePost(id: number, data: UpdatePostData): Promise<Post> {
  const res = await fetch(`${API_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update post')
  return res.json()
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_URL}${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete post')
}
