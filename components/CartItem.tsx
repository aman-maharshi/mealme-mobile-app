import { images } from "@/constants"
import { useCartStore } from "@/store/cartStore"

import { CartItemType } from "@/type"
import { router } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore()

  const handleImagePress = () => {
    router.push({
      pathname: "/item",
      params: { id: item.id }
    })
  }

  return (
    <View className="cart-item">
      <View className="flex flex-row items-center gap-x-3">
        <TouchableOpacity onPress={handleImagePress} className="cart-item__image">
          {item.image ? (
            <Image source={item.image} className="size-4/5 rounded-lg" resizeMode="cover" />
          ) : (
            <Image source={{ uri: item.image_url }} className="size-4/5 rounded-lg" resizeMode="cover" />
          )}
        </TouchableOpacity>

        <View>
          <Text className="base-bold text-dark-100">{item.name}</Text>
          <Text className="paragraph-bold text-primary mt-1">${item.price}</Text>

          <View className="flex flex-row items-center gap-x-4 mt-2">
            <TouchableOpacity onPress={() => decreaseQty(item.id)} className="cart-item__actions">
              <Image source={images.minus} className="size-1/2" resizeMode="contain" tintColor={"#FF9C01"} />
            </TouchableOpacity>

            <Text className="base-bold text-dark-100">{item.quantity}</Text>

            <TouchableOpacity onPress={() => increaseQty(item.id)} className="cart-item__actions">
              <Image source={images.plus} className="size-1/2" resizeMode="contain" tintColor={"#FF9C01"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeItem(item.id)} className="flex-center">
        <Image source={images.trash} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default CartItem
