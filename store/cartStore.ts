import { CartCustomization, CartItemType, MenuItem } from "@/type"
import { create } from "zustand"

interface CartStore {
  items: CartItemType[]
  addItem: (
    item: MenuItem | Omit<CartItemType, "quantity">,
    quantity?: number,
    customizations?: CartCustomization[]
  ) => void
  removeItem: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (id: string) => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (
    item: MenuItem | Omit<CartItemType, "quantity">,
    quantity: number = 1,
    customizations: CartCustomization[] = []
  ) => {
    const { items } = get()

    // Determine the item ID and basic properties
    const itemId = "$id" in item ? item.$id : item.id
    const itemName = item.name
    const itemPrice = item.price
    const itemImageUrl = item.image_url

    // Check if item already exists with same customizations
    const existingItem = items.find(
      cartItem =>
        cartItem.id === itemId &&
        JSON.stringify(cartItem.customizations?.sort((a, b) => a.id.localeCompare(b.id))) ===
          JSON.stringify(customizations.sort((a, b) => a.id.localeCompare(b.id)))
    )

    if (existingItem) {
      // If item exists with same customizations, increase quantity
      set({
        items: items.map(cartItem =>
          cartItem.id === existingItem.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        )
      })
    } else {
      // If item doesn't exist, add new item
      const newCartItem: CartItemType = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        image_url: itemImageUrl,
        quantity,
        customizations
      }
      set({ items: [...items, newCartItem] })
    }
  },

  removeItem: (id: string) => {
    const { items } = get()
    set({ items: items.filter(item => item.id !== id) })
  },

  increaseQty: (id: string) => {
    const { items } = get()
    set({
      items: items.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    })
  },

  decreaseQty: (id: string) => {
    const { items } = get()
    set({
      items: items
        .map(item => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 }
            } else {
              return null // Mark for removal when quantity is 1
            }
          }
          return item
        })
        .filter(item => item !== null) // Remove null items
    })
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotalItems: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getItemQuantity: (id: string) => {
    const { items } = get()
    const item = items.find(cartItem => cartItem.id === id)
    return item ? item.quantity : 0
  }
}))
