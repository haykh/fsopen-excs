const Notification = ({ message, type }) => (
  <div className={`notification ${type}`}>
    {message}
  </div>
)

export default Notification