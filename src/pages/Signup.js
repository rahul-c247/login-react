import Input from "../components/Input"
import Row from "../components/common/Row"
import Column from "../components/common/Column"
import Button from "../components/Button"
import '../styles/auth.css'
import { useState } from "react"

function Signup(){
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    dob:'',
    gender:'male',
    email:'',
    password:'',
    check:''
  })

  const handleInput =(e)=>{
    const {name , value} = e.target
    setSignupData({
      ...signupData,
      [name]:value
    })
  }

  
  const signupSubmit =(e)=>{
    e.preventDefault()
    console.log(signupData);
    localStorage.setItem('signupData', JSON.stringify(signupData))
  }

  return(
    <div className="login-wrapper signup-wrapper">
      <div className="signup-steps">
        <h2>Set Up Your Account</h2>
        <ul>
          <li className="active">
            <p>Step</p>
            <span>01</span>
          </li>
          <li>
            <p>Step</p>
            <span>02</span>
          </li>
          <li>
            <p>Step</p>
            <span>03</span>
          </li>
        </ul>
      </div>
      <div className="login-box">
      <form onSubmit={signupSubmit}>
        <Row>
          <Column col='6'>
            <Input 
              label="First Name"
              type="text"
              placeholder="Enter first name"
              className="input-box"
              name="firstName"
              value={signupData.firstName}
              onChange={handleInput}
              /* error={emailErr} *//>
          </Column>

          <Column col='6'>
            <Input 
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              className="input-box"
              name="lastName"
              value={signupData.lastName}
              onChange={handleInput}
              /* error={emailErr} *//>
          </Column>

          <Column col='6'>
            <Input 
              label="Date of Birth"
              type="date"
              placeholder=""
              className="input-box"
              name="dob"
              value={signupData.dob}
              onChange={handleInput}
              /* error={emailErr} *//>
          </Column>

          <Column col='6'>
            <div className="sigup-gender">
              <label>Gender</label>
              <Input 
                type="radio"
                name="gender"
                value='male'
                onChange={handleInput}
                id='male'
                checked={true}
                /* error={emailErr} */>
                  <label htmlFor="male">Male</label>
                </Input>
              <Input 
                type="radio"
                name="gender"
                value="female"
                onChange={handleInput}
                id='female'
                /* error={emailErr} */>
                  <label htmlFor="female">Female</label>
                </Input>
              </div>
          </Column>

          <Column col='6'>
            <Input 
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="input-box"
              name="email"
              value={signupData.email}
              onChange={handleInput}
              /* error={emailErr} *//>
          </Column>

          <Column col='6'>
            <Input 
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="input-box"
              name="password"
              value={signupData.password}
              onChange={handleInput}
              /* error={emailErr} *//>
          </Column>

          <Column col='12'>
            <Input 
              type="checkbox"
              className=""
              name="check"
              value="checked"
              onChange={handleInput}
              /* error={emailErr} */>
                <span>I would like to receive News and promotions emails.</span>
              </Input>

              <Button type="submit" className="btn">Next Step</Button>
          </Column>
        </Row>
      </form>
      </div>
    </div>
  )
}

export default Signup