import React from "react"
import { useState } from 'react'
import classes from "./create.module.css"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { AiOutlineCloseCircle } from "react-icons/ai"


const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")
  const [country, setCountry] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState(null)
  const [stars, setStars] = useState(null)
  const [typeError, setTypeError] = useState(false)
  const navigate = useNavigate()

  const ChangeImg = (e) => {
    setImg(e.target.files[0])
  }

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const acceptableTypes = ['apartment', 'penthouse', 'bungalow', 'villa']

    if(!acceptableTypes.includes(type)){
      setTypeError(true)
      setTimeout(() => {
        setTypeError(false)
      }, 1000 * 10)
      return
    }

    try {
      const formData = new FormData();

      let filename = null;
      if (img) {
        filename = Date.now() + img.name;
        // for first img
        formData.append("filename", filename);
        formData.append("image", img);

        await fetch(`https://backend-3-4o1g.onrender.com/auth/login`, {
          method: "POST",
          body: formData,
        });

      // upload product and navigate to product
      const res = await fetch("https://backend-3-4o1g.onrender.com/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          country,
          type,
          photo: filename,
          price,
          stars,
        }),
      });
      const room = await res.json();
      navigate(`/typeDetail/${room?._id}`);
    }

    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseImg = () => {
    setImg(prev => null)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create room</h2>
        <form onSubmit={handleCreateRoom} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label >Title: </label>
            <input type="text" onChange={(e) =>setTitle(e.target.value)} className={classes.input} placeholder="Title..."/>
          </div>
          <div className={classes.inputWrapper}>
            <label >Description: </label>
            <input type="text" onChange={(e) =>setDesc(e.target.value)} className={classes.input} placeholder="Description..."/>
            </div>
          </div>
          <div className={classes.inputWrapper}>
            <label >Country: </label>
            <input type="text" onChange={(e) =>setCountry(e.target.value)} className={classes.input} placeholder="Country..."/>
    
          </div>
          <div className={classes.inputWrapper}>
            <label >Type: </label>
            <input
              name="type"
              onChange={(e) => setType(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="type..."
            />
          </div>
          <div className={classes.inputWrapperImgFirst}>
            <label className={classes.labelFileInput} htmlFor="Img" >
             image: <span>Upload here</span>
            </label>
              type="file"
            <input type="file" filename="img" id="img" onChange={changeImg} style={{display:"none"}}/>
            {img && <p className={classes.imageName}>{img.name} <AiOutlineCloseCircle onClick={() => handleCloseImg()} className={classes.closeIcon}/></p>}
          </div>
          <div className={classes.inputWrapper}>
            <label >Price: </label>
            <input type="number" step={0.01} onChange={(e) => setPrice(e.target.value)} className={classes.input} placeholder="price..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review:</label>
            <input type="number" min={1} max={5} step={0.1} onChange={(e) => setReview(e.target.value)} className={classes.input} placeholder="Review..."/ >

          </div>
          <div className={classes.inputWrapper}>
            <label >Stars: </label>
            <input
              min={1}
              max={5}
              step={1}
              name="stars"
              onChange={(e) => setStars(e.target.value)}
              className={classes.input}
              type="number"
              placeholder="stars..."
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button className={classes.submitBtn} type="submit">
              Create Product
            </button>
          </div>
        </form>
        {typeError &&
        <div className={classes.successMessage}>
          Wrong Type! Acceptable types are - apartment, villa, penthouse and bungalow
        </div>}
      </div>
    </div>
  );
};

export default Create;