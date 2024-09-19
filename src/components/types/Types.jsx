import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './types.module.css'



const Types = () => {
  const [types, setTypes] = useState([])
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchTypes = async() => {
      try {
        const res = await fetch(`https://backend-3-4o1g.onrender.com/auth/login`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const types = await res.json()
        setTypes(types)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTypes()
  }, [])
  console.log(object.entries(types ))

  return (
    <section id="services" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Residing place</h5>
          <h2 className={classes.title}>What type of place you want</h2>
        </div>
      <div> 
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh' }}>
          <div>

    
      <img 
        src="https://media.istockphoto.com/id/2148331826/photo/senior-woman-making-credit-card-payment.jpg?s=1024x1024&w=is&k=20&c=CWkztsEZ465HnQ775td1UNN_n8AmpDSnzWtq16pu6QQ=" 
        alt="Senior woman making credit card payment" 
        width={300}
        
        style={{ marginRight: '10px' }} // Optional: adds some space between the images
      />
      <img 
        src="https://media.istockphoto.com/id/2148331826/photo/senior-woman-making-credit-card-payment.jpg?s=1024x1024&w=is&k=20&c=CWkztsEZ465HnQ775td1UNN_n8AmpDSnzWtq16pu6QQ=" 
        alt="Senior woman making credit card payment" 
        width={300}
        
      />
    </div>
    </div>
        
      
          {Object.entries(types).map(([key, value]) => (
            <Link to={`/types/${key}`} key={key + value} className={classes.type}>
              <div>
      <img 
        src="https://media.istockphoto.com/id/2148331826/photo/senior-woman-making-credit-card-payment.jpg?s=1024x1024&w=is&k=20&c=CWkztsEZ465HnQ775td1UNN_n8AmpDSnzWtq16pu6QQ=" 
        alt="Senior woman making credit card payment" 
        height={50} 
        width={50} 
      />
    </div>
              <span>{value} {key}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Types
