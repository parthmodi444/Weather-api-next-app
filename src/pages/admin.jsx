import { useState } from "react";
export default function admin() {
   
    const [cityInput, setCityInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [user, setUser] = useState("");
  
    const addCity = async () => {
      if(cityInput===""){
        alert("Please add the city")
        return 
      }
      const url = `http://localhost:8000/citi`;
      
      console.log("url", url);


      try{
        const response = await fetch(url, {
   
          method: "POST",
          body: JSON.stringify({ city: cityInput }),
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*',
            Authorization: `Basic ${btoa(`${user}:${apiKey}`)}`,



          },
        })


        if (response.status === 401) { 

         alert("Invalid credentials");
        
         } else if (response.status === 500) {
        
        alert("Please Authenticate");
        
         } else if(response.status===409) {
        
        alert("Duplicate City"); 
        
        }
        else{
          alert("added city")
        }
        
         } catch (e) {
        
        console.error(e);
        
       alert("An error occurred");
        
         }
        
       };
        


        
  
       const isPasswordValid = () => {
        // Regular expression for password validation
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    
        return regex.test(apiKey);
      };
    
    
    function btnCLick(){
      
      if (isPasswordValid()) {
        console.log("Clicked");
        addCity();
      } else {
        alert("Password is invalid");
      }
    
    }
    const handleCityInputChange = (event) => {
        
        console.log(event.target.value);
      
      setCityInput(event.target.value);
    };
  
    const handleApiKeyChange = (event) => {
    console.log(event.target.value)
      setApiKey(event.target.value);
    };
    const handleUserchange=(event) => {
      console.log(event.target.value);
      setUser(event.target.value)
    }

    
    return (
    <div className="admin" style={{marginTop:"20px"}}>
    
        
      {/* <label >City:</label>
      <input onChange={handleCityInputChange}  style={{border:"2px solid black"}} type="text"  required /><br/><br/>

      <label>Username</label>
      <input onChange={handleUserchange}  style={{border:"2px solid black"}} type="text"  required /><br/><br/>
      <label >Password</label>
      <input onChange={handleApiKeyChange} style={{border:"2px solid black"}} type="password" required /><br/><br/>
      <button  onClick={btnCLick} style={{backgroundColor:"blue",padding:"10px 10px"}} >Add City</button> */}
        <label style={{fontSize:"20px", fontWeight:"bold"}}>City:</label>
        <br></br>
  <input onChange={handleCityInputChange} style={{border:"2px solid black", padding:"10px", borderRadius:"5px", margin:"10px 0"}} type="text"  required /><br/><br/>

<label style={{fontSize:"20px", fontWeight:"bold"}}>Username:</label>
<br></br>
<input onChange={handleUserchange} style={{border:"2px solid black", padding:"10px", borderRadius:"5px", margin:"10px 0"}} type="text" required /><br/><br/>

<label style={{fontSize:"20px", fontWeight:"bold"}}>Password:</label>
<br></br>
<input onChange={handleApiKeyChange} style={{border:"2px solid black", padding:"10px", borderRadius:"5px", margin:"10px 0"}} type="password" required /><br/><br/>

<button onClick={btnCLick} style={{backgroundColor:"#007bff", color:"#fff", padding:"10px 20px", borderRadius:"5px", fontSize:"20px", fontWeight:"bold"}}>Add City</button>
   
      </div>
    )
  }