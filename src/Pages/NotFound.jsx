import React from 'react' 
import { useNavigate } from 'react-router-dom'

function NotFound() { 
    
    const navigate = useNavigate() 

    React.useEffect(() => {
   navigate('/')
    }, [])
   
    return (
  <div className="bg-black w-full h-screen">
<h1 className="text-back">Not Found</h1>
  </div>
    )
  
}

export default NotFound