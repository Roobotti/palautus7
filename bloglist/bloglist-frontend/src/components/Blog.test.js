import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Ankan sadut',
    author: 'Roosa Sorsa',
    url: 'localhost:3000',
    likes: '87 000',
  }
  render(<Blog blog={blog} />)

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.title')

  screen.debug(div)

  expect(div).toHaveTextContent('Ankan sadut')
})
