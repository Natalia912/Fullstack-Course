import { NotificationContextProvider } from "./notificationContext"

const compose = (providers) => (
  // eslint-disable-next-line react/display-name
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  )))

const Provider = compose([NotificationContextProvider])

export default Provider