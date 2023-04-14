import { useState } from "react";
export default function admin() {
   
    const [cityInput, setCityInput] = useState("");
    const [apiKey, setApiKey] = useState("");
  
    const addCity = async () => {
      const url = `http://localhost:8000/citi?apiKey=${apiKey}`;
      
      console.log("url", url);

      if (!cityInput || !apiKey) {
        console.log("Invalid input"); 
        return;
      }
      try{
        const response = await fetch(url, {
   
          method: "POST",
          body: JSON.stringify({ city: cityInput }),
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*'
          },
        }).then((response => {
          if(response.status===500){
            alert("Please Authenticate")
          }
          else{
            alert("City ADDED")
          }
        })).catch((err) => alert("Please Authenticate"));
      }catch(e){
        
      }
  
      
    };
    
    function btnCLick(){
      console.log("Clicked")
      addCity();
    
    }
    const handleCityInputChange = (event) => {
        
        console.log(event.target.value)
      setCityInput(event.target.value);
    };
  
    const handleApiKeyChange = (event) => {
    console.log(event.target.value)
      setApiKey(event.target.value);
    };
    
    return (
    <div className="admin" style={{marginTop:"20px"}}>
     <h1>Login Form</h1>
        
      <label >City:</label>
      <input onChange={handleCityInputChange}  style={{border:"2px solid black"}} type="text"  required /><br/><br/>
      <label >API KEY:</label>
      <input onChange={handleApiKeyChange} style={{border:"2px solid black"}} type="password" required /><br/><br/>
      <button  onClick={btnCLick} style={{backgroundColor:"blue",padding:"10px 10px"}} >Add City</button>
   
      </div>
    )
  }