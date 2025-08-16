import { images } from "@/constants"
import { useCartStore } from "@/store/cartStore"
import { router } from "expo-router"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

const CartButton = () => {
  const totalItems = useCartStore(state => state.getTotalItems())

  return (
    <TouchableOpacity onPress={() => router.push("/cart")} className="cart-btn">
      <Image source={images.bag} className="size-5" resizeMode="contain" />

      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}
export default CartButton
