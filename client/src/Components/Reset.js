import React from 'react'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidate } from '../helper/validate'

const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validate: resetPasswordValidate,
    validateOnBlur: false ,
    validateOnChange: false,
    onSubmit : async values => {
      console.log(values);
    }
  })


  return (
    <div className={`container mx-auto ${styles.mycontainer}`}>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>

            <div className='title flex flex-col items-center'>
              <h4 className='text-5xl font-bold'>Reset Password</h4>
              <span className='py-4 text-xl w-2/3 text-center text-grey-500'>Enter new Password</span>
            </div>

            <form className='pt-20' onSubmit={formik.handleSubmit}>

                <div className='textbox'>
                  <input {...formik.getFieldProps('password')} className={styles.mytextbox} type='password' placeholder='Password' />
                  <input {...formik.getFieldProps('confirm_password')} className={`${styles.mytextbox} mt-2`} type='password' placeholder='Confirm Password' />
                  <button className={styles.btn} type='submit'>Sign In</button>
                </div>

            

            </form>
          </div>
      </div>
    </div>
  )
}

export default Reset