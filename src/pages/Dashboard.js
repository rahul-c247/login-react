import { useNavigate } from "react-router-dom"
import Container from "../components/common/Container"
import Row from "../components/common/Row"
import Column from "../components/common/Column"
import Button from "../components/Button"
import ShowData from "./signup/ShowData"

function Dashboard(){
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/')
  }
  return(
    <>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <Button className="btn" onClick={handleLogout}>Logout</Button>
      </div> 
      <Container>
      <ShowData></ShowData>
      </Container>
    </>
  )
}

export default Dashboard