import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render } from "@testing-library/react"
import NewBlogForm from "../components/NewBlogForm"

describe("Form tests", () => {
  test(" the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const mock = jest.fn()
    const { container } = render(<NewBlogForm notificationPopup={mock} />)

    const user = userEvent.setup()

    const titleInput = container.querySelector("#title-input")
    const authorInput = container.querySelector("#author-input")
    const urlInput = container.querySelector("#url-input")
    const button = container.querySelector("#submit-btn")

    await user.type(titleInput, "new title test")
    await user.type(authorInput, "new author")
    await user.type(urlInput, "new url")

    await user.click(button)

    expect(mock.mock.calls).toHaveLength(1)
  })
})