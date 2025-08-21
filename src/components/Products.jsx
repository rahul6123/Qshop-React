import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'

export default function Products() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(null) // track expanded product (inline details)
  const dispatch = useDispatch()
  const items = useSelector((s) => s.cart.items)

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

  const isInCart = (id) => items.some((i) => i.id === id)
  const scrollToCart = (id) => {
    const cartItem = document.querySelector(`#cart-item-${id}`)
    const cartSection = document.querySelector('#cartContainer')
    ;(cartItem || cartSection)?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // brief highlight effect
    if (cartItem) {
      cartItem.classList.add('highlight')
      setTimeout(() => cartItem.classList.remove('highlight'), 1200)
    }
  }

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
            {isInCart(product.id) && (
              <button onClick={() => {
                // open mini cart and focus this item
                window.dispatchEvent(new CustomEvent('cart', { detail: { type: 'open-mini-cart', payload: { id: product.id } } }))
              }}>
                view item
              </button>
            )}

            {expandedId === product.id && (
              <div className="productDetails">
                <p>{product.description}</p>
                <small>
                  <span>Category: {product.category}</span>{' '}
                  {product.rating && (
                    <span>• Rating: {product.rating.rate} ({product.rating.count})</span>
                  )}
                </small>
              </div>
            )}
          </article>
        ))}
      </article>
    </section>
  )
}