import { useNavigate } from "react-router-dom"

function Dashboard(){
  const navigate = useNavigate()
  return(
    <>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <button className="btn" onClick={()=> navigate('/')}>Logout</button>
      </div> 
    </>
  )
}

export default Dashboard