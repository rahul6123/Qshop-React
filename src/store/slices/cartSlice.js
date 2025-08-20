import { createSlice } from '@reduxjs/toolkit'

// Load initial cart from localStorage
const initial = (() => {
  try {
    const raw = localStorage.getItem('cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
})()

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: initial },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.items.find((p) => p.id === product.id)
      if (existing) existing.quantity += 1
      else state.items.push({ ...product, quantity: 1 })
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      const index = state.items.findIndex((p) => p.id === id)
      if (index !== -1) {
        if (state.items[index].quantity > 1) state.items[index].quantity -= 1
        else state.items.splice(index, 1)
      }
    },
    setCart: (state, action) => {
      state.items = action.payload || []
    }
  },
})

export const { addToCart, removeFromCart, setCart } = cartSlice.actions
export default cartSlice.reducer