import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: !visible ? "" : "none"}
  const showWhenVisible = { display: visible ? "" : "none"}

  const toggleVisible = () => { setVisible(prev => !prev) }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </>
  )
}

export default Togglable