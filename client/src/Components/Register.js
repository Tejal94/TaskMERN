import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../helper/validate'
import convertToBase from '../helper/convert'
import { registerUser } from '../helper/helper'

const Register = () => {

  const [file, setFile] = useState()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: 'example@gmail.com',
      username: 'example123',
      password: 'example@123'
    },
    validate: registerValidation,
    validateOnBlur: false ,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      let regPromise = registerUser(values)
      toast.promise(regPromise, {
        loading: "Registering...",
        success: <b>Registered successfully...</b>,
        error: <b>Image too big...</b>
      })
      regPromise.then(() => navigate('/'))
    }
  })

  // formik doesn't support file upload so we need to create our own handler function

  const onUpload = async e => {
    const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
    const file = e.target.files[0];
    // const base64 = await convertToBase(e.target.files[0]);
    // setFile(base64)
    if (file.size > MAX_IMAGE_SIZE) {
      // Displaying toast if the file is too large
      toast.error(<b>Profile uploaded too big, couldn't register.</b>);
    } else {
      const base64 = await convertToBase(file);
      setFile(base64);
    }
  }

  return (
    <div className={`container mx-auto ${styles.mycontainer}`}>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
          <div className={`${styles.glass} ${styles.regGlass}`}>

            <div className='title flex flex-col items-center'>
              <h4 className='text-5xl font-bold'>Register</h4>
              <span className='py-2 text-xl w-2/3 text-center text-grey-500'>Happy to join you..</span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-2'>
                  <label htmlFor='profile'>
                    <img src={file || avatar} alt='avatar' className={styles.profile_img} />
                  </label>

                  <input type='file' onChange={onUpload} id='profile' name='profile'/>
                </div>

                <div className='textbox'>
                  <input {...formik.getFieldProps('email')} className={`${styles.mytextbox} mt-2`} type='email' placeholder='Email' />
                  <input {...formik.getFieldProps('username')} className={`${styles.mytextbox} mt-2`} type='text' placeholder='Username' />
                  <input {...formik.getFieldProps('password')} className={`${styles.mytextbox} mt-2`} type='password' placeholder='Password' />
                  <button className={styles.btn} type='submit'>Register</button>
                </div>

                <div className='text-center py-4'>
                  <span>Already a member? <Link className='text-blue-500' to='/'>Login Now!</Link></span>

                </div>

            </form>
          </div>
      </div>
    </div>
  )
}

export default Register