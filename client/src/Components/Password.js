import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
import { verifyPassword } from '../helper/helper'
import { useAuth } from '../helper/AuthContext'

const Password = () => {

  const navigate = useNavigate();
  const { username } = useAuth();

  const formik = useFormik({
    initialValues: {
      password: 'admin@123'
    },
    validate: passwordValidate,
    validateOnBlur: false ,
    validateOnChange: false,
    onSubmit : async values => {
      let loginPromise = verifyPassword({ username, password: values.password})

      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Logged in successfully...</b>,
        error: <b>Password doesn't match...</b>
      })
      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/userhome')
      })
    }
  })


  return (
    <div className={`container mx-auto`}>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>

            <div className='title flex flex-col items-center'>
              <h4 className='text-5xl font-bold'>Hello again!</h4>
              <span className='py-4 text-xl w-2/3 text-center text-grey-500'>Explore more by connecting with us..</span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <img src={avatar} alt='avatar' className={styles.profile_img} />
                </div>

                <div className='textbox'>
                  <input {...formik.getFieldProps('password')} className={styles.mytextbox} type='password' placeholder='Password' />
                  <button className={styles.btn} type='submit'>Sign In</button>
                </div>

                <div className='text-center py-4'>
                  <span>Forgot Password? <Link className='text-blue-500' to='/recovery'>Recover Now!</Link></span>

                </div>

            </form>
          </div>
      </div>
    </div>
  )
}

export default Password