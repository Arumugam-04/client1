import React from "react"
import classes from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2 className={classes.title}>FAQ</h2>
          <span>Where we are based</span>
          <span>How we operate</span>
          <span>Refund policy</span>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Contacts</h2>
          <span>Phone No:+ 91 7871238877</span>
          <span>Email:wildlens@gmail.com</span>
          <span>Address:10/228 Anna nagar,chennai</span>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Privacy policy</h2>
          <p>
          A clear and comprehensive Privacy Policy agreement that tells users exactly what information the company collects and what it does with that information inspires confidence in a business.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
