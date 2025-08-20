import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../store/slices/cartSlice'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const items = useSelector((s) => s.cart.items)
  const dispatch = useDispatch()

  const totalQty = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, i) => s + Number(i.price) * i.quantity, 0), [items])

  const scrollToCart = () => {
    setOpen(false)
    const el = document.querySelector('#cartContainer')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav>
        <aside className="logo">qshop</aside>
        <button
          type="button"
          className="menuToggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
        <ul className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
          <li><a href="#homeContainer">home</a></li>
          <li><a href="#">signup</a></li>
          <li><a href="#">login</a></li>
          <li>
            <button type="button" className="cartButton" onClick={() => setOpen(true)}>
              cart
              {totalQty > 0 && <span className="cartBadge">{totalQty}</span>}
            </button>
          </li>
        </ul>
      </nav>

      {open && (
        <>
          <div className="miniCartOverlay" onClick={() => setOpen(false)} />
          <aside className="miniCartDrawer open" role="dialog" aria-label="Mini cart">
            <header className="miniCartHeader">
              <h3>My Cart ({totalQty})</h3>
              <button className="closeBtn" onClick={() => setOpen(false)} aria-label="Close">×</button>
            </header>

            <div className="miniCartItems">
              {items.length === 0 && <p className="empty">Your cart is empty</p>}
              {items.map((item) => (
                <div key={item.id} className="miniCartItem">
                  <img src={item.image} alt={item.title} />
                  <div className="info">
                    <h4 title={item.title}>{item.title}</h4>
                    <div className="controls">
                      <div className="qtyControls">
                        <button aria-label="Decrease quantity" onClick={() => dispatch(removeFromCart(item.id))}>-</button>
                        <span>{item.quantity}</span>
                        <button aria-label="Increase quantity" onClick={() => dispatch(addToCart(item))}>+</button>
                      </div>
                      <strong className="price">Rs. {(Number(item.price) * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="miniCartFooter">
              <div className="row">
                <span>Subtotal</span>
                <strong>Rs. {subtotal.toFixed(2)}</strong>
              </div>
              <div className="actions">
                <button className="secondary" onClick={scrollToCart}>View Cart</button>
                <button className="primary" onClick={() => alert('Checkout coming soon!')}>Checkout</button>
              </div>
            </footer>
          </aside>
        </>
      )}
    </>
  )
}