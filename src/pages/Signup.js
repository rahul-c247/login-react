import Input from "../components/Input"
import Row from "../components/common/Row"
import Column from "../components/common/Column"
import Button from "../components/Button"
import notification from "../notifications"
import StepTwo from "../components/signup/StepTwo"
import '../styles/auth.css'
import { useState } from "react"

function Signup(){
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    dob:'',
    gender:'',
    email:'',
    password:'',
    check:''
  })

  const [fnameErr,setFnameErr] = useState('')
  const [lnameErr,setLnameErr] = useState('')
  const [dobErr,setDobErr] = useState('')
  const [genderErr,setGenderErr] = useState('')
  const [emailErr,setEmailErr] = useState('')
  const [passwordErr,setPasswordErr] = useState('')

  const [stepTwo, setStepTwo] = useState(false)

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
    
    /* Object.values(signupData).forEach((key) =>{
      if(!signupData[key]){
        return setError(notification.required)
      }else{
        return setError('')
      }
    }) */

    {!signupData.firstName ? setFnameErr(notification.required) : setFnameErr('')}
    {!signupData.lastName ? setLnameErr(notification.required) : setLnameErr('')}
    {!signupData.dob ? setDobErr(notification.required) : setDobErr('')}
    {!signupData.gender ? setGenderErr(notification.required) : setGenderErr('')}

    if(!signupData.email){
      setEmailErr(notification.required)
    }else if(!signupData.email.includes('@')){
      setEmailErr(notification.invalidEmail)
    }else{
      setEmailErr('')
    }

    const capitalLetter = /^(?=.*[a-z])(?=.*[A-Z])/.test(signupData.password)
    const oneNumber = /^(?=.*[0-9])/.test(signupData.password)
    const oneSpecialChar = /^(?=.*[!@#\$%\^&\*])/.test(signupData.password)
    const passLength = /^(?=.{8,})/.test(signupData.password)

    if(!signupData.password){
      setPasswordErr(notification.required)
    }else if(!passLength){
      setPasswordErr(notification.passLengthErr)
    }else if(!capitalLetter){
      setPasswordErr(notification.capitalLetterErr)
    }else if(!oneNumber){
      setPasswordErr(notification.passNumberErr)
    }else if(!oneSpecialChar){
      setPasswordErr(notification.specialCharErr)
    }else{
      setPasswordErr('')
    }

    const passValidator = passLength && capitalLetter && oneNumber && oneSpecialChar
    const saveSignupData = (signupData.firstName && signupData.lastName && signupData.dob && signupData.email && signupData.password && passValidator)
    
    if(saveSignupData){
      localStorage.setItem('signupData', JSON.stringify(signupData))
      setTimeout(()=>{
        setStepTwo(true)
        /* setSignupData({
          firstName: '',
          lastName: '',
          dob:'',
          gender:'',
          email:'',
          password:'',
          check:''
        }) */
      },200)
    }

    /* setStepTwo(true) */
  }

  return(
    <div className="login-wrapper signup-wrapper">
      <div className="signup-steps">
        <h2>Set Up Your Account</h2>
        <ul>
          <li className="active">
            <span className="line"></span>
            <p>Step</p>
            <span>01</span>
          </li>
          <li className={`${stepTwo ? 'active' : ''}`}>
            <span className="line"></span>
            <p>Step</p>
            <span>02</span>
          </li>
          <li>
            <span className="line"></span>
            <p>Step</p>
            <span>03</span>
          </li>
        </ul>
      </div>
      {!stepTwo ?
      <div className={`step-one ${stepTwo === true ? 'animate__animated animate__slideOutLeft' : null}`}>
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
                error={fnameErr}/>
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
                error={lnameErr}/>
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
                error={dobErr}/>
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
                  /* error={genderErr} */>
                    <label htmlFor="male">Male</label>
                  </Input>
                <Input 
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInput}
                  id='female'
                  >
                    <label htmlFor="female">Female</label>
                  </Input>
                  <p className="error">{genderErr}</p>
                </div>
            </Column>

            <Column col='6'>
              <Input 
                label="Email"
                type="text"
                placeholder="Enter your email"
                className="input-box"
                name="email"
                value={signupData.email}
                onChange={handleInput}
                error={emailErr}/>
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
                error={passwordErr}/>
            </Column>

            <Column col='12'>
              <Input 
                type="checkbox"
                className=""
                name="check"
                value="checked"
                onChange={handleInput}>
                  <span>I would like to receive News and promotions emails.</span>
                </Input>

                <Button type="submit" className="btn">Next Step</Button>
            </Column>
          </Row>
        </form>
      </div>
      </div>
      :null}

      {stepTwo === true ? 
        <StepTwo visible={stepTwo} backStep={()=> setStepTwo(false)}></StepTwo>
      :null}
    </div>
  )
}

export default Signup