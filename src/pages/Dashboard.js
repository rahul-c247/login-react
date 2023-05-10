import Container from "../components/common/Container"
import Row from "../components/common/Row"
import Column from "../components/common/Column"
import Button from "../components/Button"
import ShowData from "../pages/signup/ShowData"
import Header from "../components/Header"

function Dashboard(){
  return(
    <>
        <Header/>
        <Container>
          <ShowData></ShowData>
        </Container>
    </>
  )
}

export default Dashboard