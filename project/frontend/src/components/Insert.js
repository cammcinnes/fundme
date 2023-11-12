function Insert(props) {
    return (
        <form>
           <label>{props.label}
               <input type={props.type}
                      name={props.name}
                      placeholder={props.placeholder}
                      maxLength={props.length}
                      required/>
               </label>
        </form>
    )
}

export default Insert;