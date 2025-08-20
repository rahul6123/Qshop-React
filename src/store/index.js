import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

// Persist to localStorage on changes
store.subscribe(() => {
  const state = store.getState()
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart.items))
  } catch {}
})

export default store