import { MenuItem } from "@/type"
import { useState } from "react"
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from "react-native"

const MenuCard = ({ item: { $id, image_url, name, price } }: { item: MenuItem }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const addItem = () => {}

  return (
    <TouchableOpacity
      className="menu-card"
      style={Platform.OS === "android" ? { elevation: 10, shadowColor: "#878787" } : {}}
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
          source={{ uri: image_url }}
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
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity onPress={addItem}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard
