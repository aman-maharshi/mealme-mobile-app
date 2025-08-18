import CartItem from "@/components/CartItem"
import CustomButton from "@/components/CustomButton"
import CustomHeader from "@/components/CustomHeader"
import { useCartStore } from "@/store/cartStore"
import { PaymentInfoStripeProps } from "@/type"
import cn from "clsx"
import React from "react"
import { FlatList, SafeAreaView, Text, View } from "react-native"

const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle }: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>{label}</Text>
    <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>{value}</Text>
  </View>
)

const Cart = () => {
  const { items } = useCartStore()
  const totalItems = useCartStore(state => state.getTotalItems())
  const totalPrice = useCartStore(state => state.getTotalPrice())

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] pt-20 px-5">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerClassName="pb-28 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => <Text>Cart Empty</Text>}
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
