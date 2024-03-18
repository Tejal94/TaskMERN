import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from '../helper/validate'
import { useState } from 'react'
import convertToBase from '../helper/convert'

import styles from '../styles/Username.module.css'


const Profile = () => {

  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      address: ''
    },
    validate: profileValidation,
    validateOnBlur: false ,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      console.log(values);
    }
  })


  // formik doesn't support file upload so we need to create our own handler function

  const onUpload = async e => {
    const base64 = await convertToBase(e.target.files[0]);
    setFile(base64)
  }

  return (
    <div className={`container mx-auto ${styles.mycontainer}`}>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
          <div className={`${styles.glass} ${styles.regGlass}`} style={{height: "45rem"}}>

            <div className='title flex flex-col items-center'>
              <h4 className='text-5xl font-bold'>Profile</h4>
              <span className='py-2 text-xl w-2/3 text-center text-grey-500'>You can update profile here.</span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-2'>
                  <label htmlFor='profile'>
                    <img src={file || avatar} alt='avatar' className={styles.profile_img} />
                  </label>

                  <input type='file' onChange={onUpload} id='profile' name='profile'/>
                </div>

                <div className='textbox flex flex-col items-center gap-6'>

                <div className='name flex w-[100%] gap-6'>
                    <input type='text' {...formik.getFieldProps('firstname')} placeholder='First Name' className={`${styles.mytextbox} mt-0`} />
                    <input type='text' {...formik.getFieldProps('lastname')} placeholder='Last Name' className={`${styles.mytextbox} mt-0`} />
                  </div>

                  <div className='name flex w-[100%] gap-6'>
                    <input type='text' {...formik.getFieldProps('mobile')} placeholder='Contact' className={`${styles.mytextbox} mt-0`} />
                    <input type='email' {...formik.getFieldProps('email')} placeholder='Email' className={`${styles.mytextbox} mt-0`} />
                  </div>

                  <div className='name flex w-[100%] gap-6'>
                    <input type='text' {...formik.getFieldProps('address')} placeholder='Address' className={`${styles.mytextbox} mt-0`} />
                  </div>
                  
                  <button className={styles.btn} type='submit'>Update</button>
                </div>

                <div className='text-center py-4'>
                  <span>Come back Later? <Link className='text-blue-500' to='/login'>Log out!</Link></span>

                </div>

            </form>
          </div>
      </div>
    </div>
  )
}

export default Profile