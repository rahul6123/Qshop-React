import React from 'react'

export default function Home() {
  return (
    <section id="homeContainer">
      <video src="/assets/homepage3.mp4" autoPlay loop muted />
      <article>
        <h1 data-aos="fade-left">
          Welcome to <br />
          <span>Q</span>shop
        </h1>
        <button><a href="#productsContainer">Go Shopping</a></button>
      </article>
    </section>
  )
}