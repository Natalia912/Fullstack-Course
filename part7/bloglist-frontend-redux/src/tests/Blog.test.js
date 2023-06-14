import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import Blog from "../components/Blog"

describe("Blog tests", () => {

  const blog = {
    title: "Blog Title",
    author: "Blog Author",
    url: "blog url",
    likes: 10,
    user: "userID"
  }

  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {

    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText("Blog Title Blog Author")
    const div = container.querySelector(".moreInfo")
    expect(element).toBeDefined()
    expect(div).toHaveStyle("display: none")
  })

  test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = container.querySelector(".toggleView")
    await user.click(button)

    const div = container.querySelector(".moreInfo")
    expect(div).not.toHaveStyle("display: none")
    expect(div).toHaveTextContent("url: blog url")
  })

  test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} addLikes={mockHandler} />)

    const user = userEvent.setup()
    const likeButton = container.querySelector(".likeButton")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
