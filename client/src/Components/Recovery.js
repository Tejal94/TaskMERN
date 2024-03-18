import React from 'react'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'


const Recovery = () => {

  
  return (
    <div className={`container mx-auto ${styles.mycontainer}`}>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Recover Password</h4>
            <span className='py-4 text-xl w-2/3 text-center text-grey-500'>Enter OTP to recover password.</span>
          </div>

          <form className='pt-20'>

            <div className='textbox flex flex-col items-center gap-6'>

              <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-500'>
                  Enter 6 digit OTP sent to your Email address.
                </span>
                <input className={styles.mytextbox} type='password' placeholder='Enter OTP' />
              </div>
              <button className={styles.btn} type='submit'>Sign In</button>
            </div>

            <div className='text-center py-4'>
              <span>Can't get OTP? <button className='text-blue-500'>Resend</button></span>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Recovery