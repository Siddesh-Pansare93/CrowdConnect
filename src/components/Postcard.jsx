import React from 'react'
import { Link } from 'react-router-dom'


function Postcard({ event }) {

    
    
    

  return (
    // <Link to={`event/${$id}`}>
    <Link to={`event/id`}>
        <div className="card" style={{ width: '18rem' }}>
            <img src= "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-flat%2F33%2Fman_5-512.png&tbnid=SVxSTar6KwWb7M&vet=10CAoQxiAoAWoXChMI0PLN0JDmiAMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F2758880%2Fman_avatar_businessman_profile_user_icon&docid=wR0dxt-ZiuOIoM&w=512&h=512&itg=1&q=avatar%20image%20&ved=0CAoQxiAoAWoXChMI0PLN0JDmiAMVAAAAAB0AAAAAEAc"  className="card-img-top" alt="..."/>
            <div className='card-body'>
                <div className="card-title">{"title"}</div>
                <div className="card-text">{"description"}</div>
                <div className="card-text">{"date and Time "}</div>
                <div className="card-text">{"oraganiser"}</div>
                
                
            </div>
        </div>
    </Link>
  )
}

export default Postcard