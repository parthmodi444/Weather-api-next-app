import { useState } from "react";
export default function admin() {
   
    const [cityInput, setCityInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [user, setUser] = useState("");
  
    const addCity = async () => {
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
        
        console.log(event.target.value)
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
     <h1>Login Form</h1>
        
      <label >City:</label>
      <input onChange={handleCityInputChange}  style={{border:"2px solid black"}} type="text"  required /><br/><br/>

      <label>Username</label>
      <input onChange={handleUserchange}  style={{border:"2px solid black"}} type="text"  required /><br/><br/>
      <label >Password</label>
      <input onChange={handleApiKeyChange} style={{border:"2px solid black"}} type="password" required /><br/><br/>
      <button  onClick={btnCLick} style={{backgroundColor:"blue",padding:"10px 10px"}} >Add City</button>
   
      </div>
    )
  }