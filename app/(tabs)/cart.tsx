import { images } from "@/constants"
import { useCartStore } from "@/store/cartStore"
import React from "react"
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"

const Cart = () => {
  const { items, increaseQty, decreaseQty, removeItem, getTotalPrice, clearCart } = useCartStore()

  const renderCartItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center bg-white rounded-lg py-4 mb-3 shadow-sm">
      <Image source={{ uri: item.image_url }} className="w-16 h-16 rounded-lg mr-4" resizeMode="cover" />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-1">{item.name}</Text>
        <Text className="text-gray-600">${item.price}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => decreaseQty(item.id)}
          className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center mr-2"
        >
          <Text className="text-lg font-bold text-gray-600">-</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold mx-3">{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => increaseQty(item.id)}
          className="w-8 h-8 bg-primary rounded-full items-center justify-center ml-2"
        >
          <Text className="text-lg font-bold text-white">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-white pt-20 px-5">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-quicksand-bold">Cart</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={clearCart} className="bg-red-500 px-3 py-1 rounded">
            <Text className="text-white text-sm">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Image source={images.bag} className="w-20 h-20 mb-4 opacity-50" resizeMode="contain" />
          <Text className="text-xl text-gray-500 mb-2">Your cart is empty</Text>
          <Text className="text-gray-400 text-center">Add some delicious items to get started!</Text>
        </View>
      ) : (
        <View className="flex-1">
          <View>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
          <View className="bg-white border-t border-gray-200 pt-4 pb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Total:</Text>
              <Text className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</Text>
            </View>
            <TouchableOpacity className="bg-primary py-4 rounded-lg items-center">
              <Text className="text-white text-lg font-semibold">Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Cart
