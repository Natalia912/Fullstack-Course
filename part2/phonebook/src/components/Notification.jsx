const Notification = ({status, message}) =>  {
  return ( 
    <div className={`notification ${status}`} style={{display: status ? 'block' : 'none'}}>
      <p>{message}</p>
    </div>
   );
}

export default Notification;