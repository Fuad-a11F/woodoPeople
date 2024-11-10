import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import ForumPost from './ForumPost'

describe('Компонент ForumPost', () => {
  it('должен корректно отображать данные поста', () => {
    const mockPost = {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: 'avatar_url.jpg',
      },
      title: 'Test Title',
      content: 'This is the content of the post.',
      comments: [
        {
          id: 1,
          author: { name: 'Jane Smith', avatar: '/avatar2.jpg' },
          content: 'Ну вот так фигурки берешь, вжух-вжух, разложил и красота',
          date: '1 час назад',
        },
        {
          id: 2,
          author: { name: 'Bob Johnson', avatar: '/avatar3.jpg' },
          content: 'Попробуй выложить из них слово «Вечность»',
          date: '2 часа назад',
        },
      ],
      lastPostDate: '2024-10-01',
      lastMessageAuthor: { name: 'John Doe', avatar: '' },
    }

    const { getByText, getByAltText } = render(<ForumPost {...mockPost} />)

    expect(getByAltText(mockPost.author.name)).toHaveAttribute(
      'src',
      mockPost.author.avatar
    )
    expect(getByText(mockPost.title)).toBeInTheDocument()
    expect(getByText(mockPost.author.name)).toBeInTheDocument()
    expect(getByText(mockPost.content)).toBeInTheDocument()
  })
})
