import { NotificationContextProvider } from "./notificationContext"
import { BlogContextProvider } from "./blogContext"

const compose = (providers) => (
  // eslint-disable-next-line react/display-name
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  )))

const Provider = compose([NotificationContextProvider, BlogContextProvider])

export default Provider