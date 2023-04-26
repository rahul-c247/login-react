import { useNavigate } from "react-router-dom"
import Container from "../components/common/Container"
import Row from "../components/common/Row"
import Column from "../components/common/Column"
import Button from "../components/Button"
import ShowData from "./signup/ShowData"
import { useEffect,useState } from "react"

function Dashboard(){
  const [emailData,setEmailData] = useState([])
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/')
  }
  useEffect(() => {
    const emailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    setEmailData(emailLogin);
  }, []);
  return(
    <>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="profile-right">
          {emailData ?
          <div className="profile-data">
            <img src={emailData && emailData.picture} alt="profile"/>
            <div className="profile-detail">
              <h2>{emailData && emailData.given_name}{emailData && emailData.family_name}</h2>
              <p>{emailData && emailData.email}</p>
            </div>
          </div>
          :null}
          <Button className="btn" onClick={handleLogout}>Logout</Button>
        </div>
      </div> 
      <Container>
      <ShowData></ShowData>
      </Container>
    </>
  )
}

export default Dashboard