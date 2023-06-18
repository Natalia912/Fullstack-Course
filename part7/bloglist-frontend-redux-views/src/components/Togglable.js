import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: !visible ? "" : "none" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisible = () => { setVisible(prev => !prev) }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible} className="toggle-open bg-black text-white p-2 hover:text-black hover:bg-white border-2 border-black">{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible} className="bg-black text-white p-2 hover:text-black hover:bg-white border-2 border-black">cancel</button>
      </div>
    </>
  )
}

export default Togglable