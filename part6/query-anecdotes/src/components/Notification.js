const Notification = ({text}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!text) return null

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification
