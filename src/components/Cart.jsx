import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../store/slices/cartSlice'

export default function Cart() {
  const items = useSelector((s) => s.cart.items)
  const dispatch = useDispatch()

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

  return (
    <section id="cartContainer">
      <article id="cart">
        {items.map((item) => (
          <article key={item.id} id={`cart-item-${item.id}`} className="cartCard">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <div className="qtyControls">
              <button aria-label="Decrease quantity" onClick={() => dispatch(removeFromCart(item.id))}>-</button>
              <span>{item.quantity}</span>
              <button aria-label="Increase quantity" onClick={() => dispatch(addToCart(item))}>+</button>
            </div>
            <p>Rs. {(Number(item.price) * item.quantity).toFixed(2)}</p>
          </article>
        ))}
      </article>

      <footer className="cartTotal">
        <h2>Total: Rs. {total.toFixed(2)}</h2>
      </footer>
    </section>
  )
}