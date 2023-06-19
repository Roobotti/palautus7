import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog details />', () => {
  let container
  let mockHandler = jest.fn()
  const blog = {
    title: 'Ankan sadut',
    author: 'Roosa Sorsa',
    url: 'localhost:3000',
    likes: '87 000',
    user: {
      username: 'mikki',
      name: 'Hessu Hopo',
    },
  }
  beforeEach(() => {
    container = render(<Blog blog={blog} handleLike={mockHandler} />).container
  })

  test('clicking the view button shows the url, like and user', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.details')

    screen.debug(div)

    expect(div).toHaveTextContent('localhost:3000')
    expect(div).toHaveTextContent('87 000')
  })
  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByText('View'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
