import { useCartStore } from "@/store/cartStore"
import { MenuItem } from "@/type"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from "react-native"

const MenuCard = ({ item }: { item: MenuItem }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const { addItem, getItemQuantity } = useCartStore()
  const itemQuantity = getItemQuantity(item.$id)

  const handleCardPress = () => {
    router.push({
      pathname: "/item",
      params: { id: item.$id }
    })
  }

  const handleAddToCart = (e: any) => {
    e.stopPropagation()
    addItem(item, 1, [])
  }

  return (
    <TouchableOpacity
      className="menu-card"
      style={Platform.OS === "android" ? { elevation: 10, shadowColor: "#878787" } : {}}
      onPress={handleCardPress}
    >
      <View className="size-32 absolute -top-10 rounded-lg overflow-hidden">
        {imageLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="small" color="#6B7280" />
          </View>
        )}

        {imageError && (
          <View className="flex-1 items-center justify-center bg-gray-200">
            <Text className="text-gray-400 text-xs text-center">Image</Text>
            <Text className="text-gray-400 text-xs text-center">Failed</Text>
          </View>
        )}

        <Image
          source={{ uri: item.image_url }}
          className="size-32 absolute inset-0"
          resizeMode="contain"
          onLoadStart={() => setImageLoading(true)}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false)
            setImageError(true)
          }}
          style={{ opacity: imageLoading || imageError ? 0 : 1 }}
        />
      </View>

      <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${item.price}</Text>
      <TouchableOpacity onPress={handleAddToCart}>
        <Text className="paragraph-bold text-primary">
          {itemQuantity > 0 ? `In Cart (${itemQuantity})` : "Add to Cart +"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard
