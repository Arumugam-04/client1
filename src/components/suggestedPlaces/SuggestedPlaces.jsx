import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classes from '/suggestedPlace.module.css  '

const SuggestedPlaces = () => {

  const [estates, setEstates] = useState([])
  const { token } = useSelector((state) => state.auth)


  useEffect(() => {
    const fetchTypeRooms = async () => {
      try {
        const res = await fetch(`https://backend-3-4o1g.onrender.com/auth/login`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()
        setEstates(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTypeRooms()
  }, [])


  return (
    <section id='suggested' className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Most visited places</h5>
          <h2 className={classes.title}>
            Favourite destinations of our clients
          </h2>
        </div>
        <div className={classes.places}>
          {estates.map((suggestedPlace) => (
            <Link to={`/typeDetail/${suggestedPlace._id}`} className={classes.place} key={suggestedPlace._id}>
              <div className={classes.imgWrapper}>
                <img src={img} alt="" />
              </div>
              <div className={classes.titleAndReview}>
                <span>{suggestedPlace.title}</span>
                <span className={classes.review}><AiFillStar className={classes.icon} />{suggestedPlace.review} (2)</span>
              </div>
              <div className={classes.countryAndPrice}>
                <span>Country: <span>{suggestedPlace.country}</span></span>
                <span className={classes.price}>{suggestedPlace.price}$ / <span>per person</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuggestedPlaces
