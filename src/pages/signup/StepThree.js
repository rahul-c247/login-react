import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import Input from "../../components/Input"
import Column from "../../components/common/Column"
import Row from "../../components/common/Row"
import Notifications from "../../utilities/Notifications"
import Modal from "../../components/Modal"
import ShowData from "./ShowData"

function StepThree(props){
  const [cardDetails,setCardDetails] = useState({
    cardHolder:'',
    cardNumber:'',
    cvv:'',
    day:'01',
    month:'Jan',
    year:'2024',
    check:''
  })
  const navigate = useNavigate();
  const [cholderErr,setCholderErr] = useState('')
  const [cnumberErr,setCnumberErr] = useState('')
  const [cvvErr,setCvvErr] = useState('')
  const [cdayErr,setCdayErr] = useState('')
  const [cmonthErr,setCmonthErr] = useState('')
  const [cyearErr,setCyearErr] = useState('')

  const [dataModal,setDataModal] = useState(false)

  const [finalData, setFinalData] = useState(false)

  const handleInput =(e)=>{
    const {name , value} = e.target
    setCardDetails({
      ...cardDetails,
      [name]:value
    })
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(cardDetails);
    {!cardDetails.cardHolder ? setCholderErr(Notifications.required) : setCholderErr('')}
    {!cardDetails.cardNumber ? setCnumberErr(Notifications.required) : setCnumberErr('')}
    {!cardDetails.cvv ? setCvvErr(Notifications.required) : setCvvErr('')}
    {!cardDetails.day ? setCdayErr(Notifications.required) : setCdayErr('')}
    {!cardDetails.month ? setCmonthErr(Notifications.required) : setCmonthErr('')}
    {!cardDetails.year ? setCyearErr(Notifications.required) : setCmonthErr('')}

    const saveCardData = (cardDetails.cardHolder && cardDetails.cardNumber && cardDetails.cvv && cardDetails.day && cardDetails.month && cardDetails.year)

    if(saveCardData){
      localStorage.setItem('cardData',JSON.stringify(cardDetails))
      setTimeout(()=>{
        setDataModal(true)
      })
      setFinalData(true)
      /* navigate('/dashboard') */
    }
  }
  
  return(
    <>
    <div className={`step-three ${props.visible ? 'animate__animated animate__fadeInUp' : ''}`}>
        <div className="login-box">
          <h2>Secure Payment</h2>
          <form onSubmit={handleSubmit}>
            <Row>
              <Column col="12">
                <Input 
                  label="Card holder name"
                  type="text"
                  placeholder="Enter name"
                  className={`input-box`}
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleInput}
                  error={cholderErr}/>
              </Column>
              <Column col="8">
                <Input 
                  label="Card number"
                  type="text"
                  placeholder="Enter card number"
                  className={`input-box`}
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleInput}
                  error={cnumberErr}/>
              </Column>
              <Column col="4">
                <Input 
                  label="CVV / CVC"
                  type="text"
                  placeholder="Enter cvv/cvc"
                  className={`input-box`}
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInput}
                  error={cvvErr}/>
              </Column>
              <Column col="4">
                <Input 
                  label="Day"
                  type="text"
                  className={`input-box`}
                  name="day"
                  value={cardDetails.day}
                  onChange={handleInput}
                  error={cdayErr}/>
              </Column>
              <Column col="4">
                <div className="form-input">
                  <label>Month</label>
                  <select className="input-box" name="month" value={cardDetails.month} onChange={handleInput}>
                    <option value="jan">Jan</option>
                    <option value="feb">Feb</option>
                    <option value="mar">Mar</option>
                    <option value="apr">Apr</option>
                    <option value="may">May</option>
                    <option value="jun">Jun</option>
                    <option value="jul">Jul</option>
                    <option value="aug">Aug</option>
                    <option value="sep">Sep</option>
                    <option value="oct">Oct</option>
                    <option value="nov">Nov</option>
                    <option value="dec">Dec</option>
                  </select>
                  <p className="error">{cmonthErr}</p>
                </div>
              </Column>
              <Column col="4">
                <div className="form-input">
                  <label>Year</label>
                  <select className="input-box" onChange={handleInput} name="year" value={cardDetails.year}>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                  </select>
                  <p className="error">{cyearErr}</p>
                </div>
              </Column>

              <Column col="12">
                <Input 
                  type="checkbox"
                  className=""
                  name="check"
                  value="checked"
                  onChange={handleInput}>
                    <span>By Subscribing to classes you agree to Terms of use and you confirm that you have read our Privacy Policy</span>
                  </Input>
              </Column>
            </Row>
            <div className="pricing-btns">
              <Button onClick={props.backStep} className="btn   black-btn">Back</Button>
              <Button type="submit" className="btn">Proceed to payment</Button>
            </div>
          </form>
        </div>
    </div>

    <Modal open={dataModal} close={()=>setDataModal(false)}>
      <ShowData/>
    </Modal>
    </>
  )
}

export default StepThree