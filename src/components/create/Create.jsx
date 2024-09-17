import React from 'react'
import { useState } from 'react'
import classes from './Create.module.css'
import {Await, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import (AiOutlineCloseCircle) from 'react-icons/ai'


 const Create = () => {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [img, setImg] = useState("")
  const [Country,setCountry] = useState("")
  const [type, setType] = useState("")
  const [price,setPrice] = useState(null)
  const [review,setReview] = useState(null)
  const [TypeError, setTypeError] = useState(false)
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)

  const handlecreateRoom = (e) => {
    setImg(e.target.files[0])
  }



  
  const handlecreateRoom = async (e) => {
    e.preventDefault()
    const acceptableTypes = ['apartment','panthouse','bungalow','villa']

    if(!acceptableTypes.includes(type)){
      setTypeError(true)
      setTimeout(() => {
        setTypeError(false)

      },10 * 1000)
      return
    }
      try{
        const fromDate = new FormData()
        let filename = null
        if(img){
          filename = Date.now() +img.name
          fromDate.append("filename",filename)
          fromDate.append("image",img)

          await fetch('https://backend-3-4o1g.onrender.com/auth/register',{
            method:"POST",
            body: fromDate
          })
        }
        const res = await fetch(`https://backend-3-4o1g.onrender.com/auth/register`,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearar' ${token}
          },
          method:"POST",
          body: JSON.stringify{{
            title,
            desc,
            Country,
            type,
            photo: filename,
            price,
            review
          }}
        })

        const newRoom = await res.json()
        navigate(`/typeDetail/${newRoom._id}`)
    }
    catch (errow) {
      console.error(errow)
    }
 }
 return (
  <div className={classes.container}>
    <div className={classes.wrappeer}>
      <h2 className={classes.title}>Create room</h2>
      <form onSubmit={handlecreateRoom} encType="multipart/form-data">
      <div className={classes.inputwrapper}>
        <label>Title: </label>
        <input type="text" onChange={() => {}} className={classes.input} placeholder="Title..."/>
      </div>
      <div className={classes.inputwrapper}>
        <label>Description: </label>
        <input type="text" onChange={() => {}} className={classes.input} placeholder="Description.."/>
      </div>
      <div className={classes.inputwrapper}>
      <label>Country: </label>
      <input type="text" onChange={() => {}} className={classes.input} placeholder="Country"/>

      </div>
      <div className={classes.inputwrapper}>
        <label>Type: </label>
        <input type="text" onChange={() => {}} className={classes.input} placeholder="Type..."/>
      </div>
      <div className={classes.inputwrapperImg}>
        <label className={classes.fileInputLabel} htmlFor="img">
          Image: <span>upload here</span>
        </label>
        <input type="file" filename="img" id="img" onChange={changeImg} style={{display:"none"}}/>
        {img && <p className={classes.imageName}>{img.name} <AiOutlineCloseCircle className={classes.icon} onClick={() => handleCloseImg()}></p>}
      </div>
      <div className={classes.inputwrapper}>
        <label>price: </label>
        <input type="number" step={0.01} onChange={() => {}} className={classes.input} placeholder="price..."/>
      </div>
      <div className={classes.inputwrapper}>
      <label>Review: </label>
      <input type="number" min={1} max={5} step={0.1} onChange={() => {}} className={classes.input} placeholder="Review..."/>
    </div>
    <div className={classes.buttonWrapper}>
      <button className={classes.sumbitBtn}>Create room</button>
    </div>

      </form>
      {TypeError && 
        <div className={classes.errorMessage}>
        </div>}
    </div>
  </div>
 )
 

  


 
