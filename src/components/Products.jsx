import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'

export default function Products() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        if (mounted) setProducts(data)
      } catch (e) {
        setError('Something went wrong 🤪')
      }
    }
    fetchProducts()
    return () => { mounted = false }
  }, [])

  return (
    <section id="productsContainer">
      <h1>All Products</h1>
      <article id="productsWrapper">
        {error && <h2>{error}</h2>}
        {!error && products.map((product) => (
          <article key={product.id} className="productCard" data-aos="fade-up" data-aos-duration="3000">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Rs.{product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>add to cart</button>
          </article>
        ))}
      </article>
    </section>
  )
}