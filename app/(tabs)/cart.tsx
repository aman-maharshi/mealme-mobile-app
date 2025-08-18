import CartItem from "@/components/CartItem"
import CustomButton from "@/components/CustomButton"
import CustomHeader from "@/components/CustomHeader"
import { images } from "@/constants"
import { useCartStore } from "@/store/cartStore"
import { PaymentInfoStripeProps } from "@/type"
import cn from "clsx"
import { router } from "expo-router"
import React from "react"
import { FlatList, Image, SafeAreaView, Text, View } from "react-native"

const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle }: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>{label}</Text>
    <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>{value}</Text>
  </View>
)

const EmptyCart = () => {
  const handleStartShopping = () => {
    router.push("/(tabs)/search")
  }

  return (
    <View className="flex-1 items-center justify-center py-16">
      <View className="h-40 w-40 mb-6">
        <Image source={images.emptyState} className="h-full w-full" resizeMode="contain" />
      </View>

      <Text className="text-center text-2xl mb-3 font-quicksand-bold text-dark-100">Your cart is empty</Text>

      <Text className="text-center text-base font-quicksand-medium text-gray-500 mb-8 px-8">
        Looks like you haven't added any delicious food to your cart yet. Start exploring our menu!
      </Text>

      <CustomButton title="Start Ordering" onPress={handleStartShopping} />
    </View>
  )
}

const Cart = () => {
  const { items } = useCartStore()
  const totalItems = useCartStore(state => state.getTotalItems())
  const totalPrice = useCartStore(state => state.getTotalPrice())

  const handleStartShopping = () => {
    router.push("/(tabs)/search")
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] pt-20 px-5">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerClassName="pb-28 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => <EmptyCart />}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-neutral-200 p-5 rounded-2xl">
                <Text className="h3-bold text-dark-100 mb-5">Payment Summary</Text>

                <PaymentInfoStripe label={`Total Items (${totalItems})`} value={`$${totalPrice.toFixed(2)}`} />
                <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfoStripe label={`Discount`} value={`- $0.50`} valueStyle="!text-success" />
                <View className="border-t border-neutral-200 my-2" />
                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100 !text-right"
                />
              </View>

              <CustomButton title="Order Now" />
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}

export default Cart
