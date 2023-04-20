import { useState } from "react"
import Button from "../Button"
import Column from "../common/Column"
import Row from "../common/Row"
import Pricing from "../Pricing"

function StepTwo(props){
  const [plans,setPlans] = useState()
  const [isPlanSelected,setIsPlanSelected] = useState(false)
  const selectPlan=(id)=>{
    setPlans(id)
    setIsPlanSelected(true)
  }
  return(
    <div className={`step-two ${props.visible ? 'animate__animated animate__slideInRight' : null}`}>
      <div className="pricing-wrapper">
        <Row>
          <Column col="4">
            <Pricing price="$49" type="Monthly" onSelect={()=>selectPlan(0)} className={plans == 0 ? 'active' : ''} btnText={plans == 0 ? 'selected' : 'select'}/>
          </Column>
          <Column col="4">
            <Pricing price="$199" type="Yearly" save="save 20%" onSelect={()=>selectPlan(1)} className={plans == 1 ? 'active' : ''} btnText={plans == 1 ? 'selected' : 'select'}/>
          </Column>
          <Column col="4">
            <Pricing price="$149" type="6 Months" save="save 10%" onSelect={()=>selectPlan(2)} className={plans == 2 ? 'active' : ''} btnText={plans == 2 ? 'selected' : 'select'}/>
          </Column>
        </Row>
      </div>
      {isPlanSelected ?
      <div className="pricing-amount">
        <div className="pricing-summary">
          <h3>Summary</h3>
          <ul>
            {plans == 0 ?
              <li>Monthly subscription 15-Days free trial</li>
            : plans == 1 ?
              <li>Yearly subscription 45-Days free trial</li>
            : <li>6 Months subscription 30-Days free trial</li>}
            <li>Your first payment will be due on the [Insert Date].</li>
          </ul>
        </div>
        <div className="pricing-total">
          <h3>Payment Details</h3>
          <p>Yearly <span>{plans == 0 ? '$49' : plans == 1 ? '$199' : '$149'}</span></p>
          {/* <p>Discount <span>-$9</span></p> */}
          <h4>Total Pay <span>{plans == 0 ? '$49' : plans == 1 ? '$199' : '$149'}</span></h4>
        </div>
      </div>
      :null}
      <div className="pricing-btns">
        <Button type="button" onClick={props.backStep} className="btn black-btn">Back</Button>
        {isPlanSelected ? <Button type="button" className="btn">Next step</Button>:null}
      </div>
    </div>
  )
}

export default StepTwo