import authService from '@/Backend/Appwrite/auth'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {
    const [params] = useSearchParams()
    const [status, setStatus] = useState("verifying")
    const secret = params.get('secret')
    const id = params.get('userId')
    console.log(secret)
    console.log(id)
    useEffect(()=>{
        try {
            const verify = authService.updateVerification(id,secret)
            console.log(verify)
            if(verify){
                console.log("verified Successfully")
                setStatus("Verified Successfully")
            }
            else{
                setStatus("Verfication Failed")
            }
        } catch (error) {
            console.log(error)
        }
    },[id,secret])
  return (
    <div className='text-center text-5xl font-black text-yellow-500'>
      {status}
    </div>
  )
}

export default Verify
