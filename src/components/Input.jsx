function Input(props) {
  return(
    <>
      <div className="form-input">
        <label>{props.label}</label>
        <input
          type={props.type}
          placeholder={props.placeholder} 
          className={props.className}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          id={props.id}
          checked={props.checked}/>
          {props.children}
        <p>{props.error}</p>
      </div>
    </>
  )
}

export default Input