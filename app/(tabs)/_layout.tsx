import { Redirect, Slot } from "expo-router"
import React from "react"

const RootLayout = () => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />
  }

  return <Slot />
}

export default RootLayout
