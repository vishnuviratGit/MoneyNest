import React from 'react'

const Notransactions = () => {
  return (
    <div 
       style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
            marginBottom: "2rem"
       }}
    >
      <img src="" alt="image" style={{width: "400px", margin: "4rem"}} /> 
      <p style={{textAlign: "center", fontSize: "1.2rem"}}>
           You have no Transactions Currently   
      </p> 
    </div>
  );
}

export default Notransactions
