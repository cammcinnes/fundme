function Insert() {
    return (
        <form>
           <label>Email:
               <input type="email" name="insertEmail" placeholder="Enter Email" maxLength="50" required/>
               </label>
           <label>Username:
               <input type="text" name="insertUsername" placeholder="Enter Username" maxLength="50" required/>
               </label>
           <label> Password:
               <input type="password" name="insertPassword" placeholder="Enter Password" maxLength="50" required/>
            </label>
        </form>
    )
}

export default Insert;