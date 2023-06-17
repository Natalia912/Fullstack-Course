import { NotificationContextProvider } from "./notificationContext"
import { UserContextProvider } from "./userContext"
const compose = (providers) => (
  // eslint-disable-next-line react/display-name
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  )))

const Provider = compose([NotificationContextProvider, UserContextProvider])

export default Provider