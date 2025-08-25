import CustomButton from "@/components/CustomButton"
import CustomHeader from "@/components/CustomHeader"
import { sides, toppings } from "@/constants"
import dummyData from "@/constants/data"
import { useCartStore } from "@/store/cartStore"
import { CartCustomization, MenuItem } from "@/type"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import React, { useMemo, useState } from "react"
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"

const ItemDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { addItem, getItemQuantity } = useCartStore()

  const [selectedToppings, setSelectedToppings] = useState<CartCustomization[]>([])
  const [selectedSides, setSelectedSides] = useState<CartCustomization[]>([])
  const [quantity, setQuantity] = useState(1)

  // Find the menu item by ID
  const item = useMemo(() => {
    return dummyData.menu.find(menuItem => menuItem.$id === id) as MenuItem
  }, [id])

  if (!item) {
    return (
      <SafeAreaView className="flex-1 bg-[#fafafa] pt-20 px-5">
        <CustomHeader title="Item Not Found" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">Item not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  const handleToppingToggle = (topping: any) => {
    const existingIndex = selectedToppings.findIndex(t => t.id === topping.name)
    if (existingIndex >= 0) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.name))
    } else {
      setSelectedToppings([
        ...selectedToppings,
        {
          id: topping.name,
          name: topping.name,
          price: topping.price,
          type: "topping"
        }
      ])
    }
  }

  const handleSideToggle = (side: any) => {
    const existingIndex = selectedSides.findIndex(s => s.id === side.name)
    if (existingIndex >= 0) {
      setSelectedSides(selectedSides.filter(s => s.id !== side.name))
    } else {
      setSelectedSides([
        ...selectedSides,
        {
          id: side.name,
          name: side.name,
          price: side.price,
          type: "side"
        }
      ])
    }
  }

  const calculateTotalPrice = () => {
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0)
    const sidesPrice = selectedSides.reduce((sum, s) => sum + s.price, 0)
    return (item.price + toppingsPrice + sidesPrice) * quantity
  }

  const handleAddToCart = () => {
    addItem(item, quantity, [...selectedToppings, ...selectedSides])
    router.push("/cart")
  }

  const itemQuantity = getItemQuantity(item.$id)

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] pt-20 px-5">
      <CustomHeader title={item.name} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image and Basic Info */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm shadow-black/5">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <Text className="h1-bold text-dark-100 mb-2">{item.name}</Text>
              <Text className="paragraph-medium text-gray-500 mb-3">{item.category_name}</Text>

              {/* Rating */}
              <View className="flex-row items-center mb-3">
                <View className="flex-row mr-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Ionicons key={star} name="star" size={16} color={star <= item.rating ? "#FFD700" : "#E5E7EB"} />
                  ))}
                </View>
                <Text className="paragraph-medium text-gray-500">{item.rating}/5</Text>
              </View>

              {/* Price */}
              <Text className="h1-bold text-primary">${item.price.toFixed(2)}</Text>
            </View>

            {/* Product Image */}
            <View className="w-32 h-32 rounded-2xl overflow-hidden">
              {item.image ? (
                <Image source={item.image} className="w-full h-full" resizeMode="cover" />
              ) : (
                <Image source={{ uri: item.image_url }} className="w-full h-full" resizeMode="cover" />
              )}
            </View>
          </View>

          {/* Nutritional Info */}
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="small-bold text-gray-500">Calories</Text>
              <Text className="paragraph-bold text-dark-100">{item.calories} Cal</Text>
            </View>
            <View className="items-center">
              <Text className="small-bold text-gray-500">Protein</Text>
              <Text className="paragraph-bold text-dark-100">{item.protein}g</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="paragraph-medium text-gray-600 leading-6">{item.description}</Text>
        </View>

        {/* Service Info Bar */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm shadow-black/5">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="pricetag" size={20} color="#FF6B35" />
              <Text className="paragraph-medium text-gray-600 ml-2">Free Delivery</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="#FF6B35" />
              <Text className="paragraph-medium text-gray-600 ml-2">20-30 mins</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={20} color="#FF6B35" />
              <Text className="paragraph-medium text-gray-600 ml-2">4.5</Text>
            </View>
          </View>
        </View>

        {/* Toppings Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm shadow-black/5">
          <Text className="h3-bold text-dark-100 mb-4">Toppings</Text>
          <FlatList
            data={toppings}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: topping }) => {
              const isSelected = selectedToppings.some(t => t.id === topping.name)
              return (
                <TouchableOpacity
                  className={`mr-4 items-center ${isSelected ? "opacity-100" : "opacity-100"}`}
                  onPress={() => handleToppingToggle(topping)}
                >
                  <View
                    className={`w-20 h-20 rounded-2xl overflow-hidden mb-2 ${isSelected ? "border-2 border-primary" : ""}`}
                  >
                    <Image source={topping.image} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <Text className="paragraph-medium text-dark-100 text-center mb-1">{topping.name}</Text>
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center ${isSelected ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <Ionicons name={isSelected ? "checkmark" : "add"} size={16} color="white" />
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.name}
          />
        </View>

        {/* Side Options Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm shadow-black/5">
          <Text className="h3-bold text-dark-100 mb-4">Side Options</Text>
          <FlatList
            data={sides}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: side }) => {
              const isSelected = selectedSides.some(s => s.id === side.name)
              return (
                <TouchableOpacity
                  className={`mr-4 items-center ${isSelected ? "opacity-100" : "opacity-100"}`}
                  onPress={() => handleSideToggle(side)}
                >
                  <View
                    className={`w-20 h-20 rounded-2xl overflow-hidden mb-2 ${isSelected ? "border-2 border-primary" : ""}`}
                  >
                    <Image source={side.image} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <Text className="paragraph-medium text-dark-100 text-center mb-1">{side.name}</Text>
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center ${isSelected ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <Ionicons name={isSelected ? "checkmark" : "add"} size={16} color="white" />
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.name}
          />
        </View>

        {/* Bottom Bar - Quantity and Add to Cart */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm shadow-black/5">
          <View className="flex-col gap-6 items-center justify-between">
            {/* Quantity Selector */}
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center"
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Ionicons name="remove" size={20} color="#FE8C00" />
              </TouchableOpacity>

              <Text className="h3-bold text-dark-100 mx-6">{quantity}</Text>

              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#FE8C00" />
              </TouchableOpacity>
            </View>

            {/* Add to Cart Button */}
            <CustomButton title={`Add to Cart ($${calculateTotalPrice().toFixed(2)})`} onPress={handleAddToCart} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemDetail
