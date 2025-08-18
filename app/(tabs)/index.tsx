import CartButton from "@/components/CartButton"
import { images, offers } from "@/constants"
import cn from "clsx"
import { router } from "expo-router"
import { Fragment } from "react"
import { FlatList, Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native"

export default function Index() {
  // Map offer titles to category names for navigation
  const getCategoryFromOffer = (title: string) => {
    switch (title) {
      case "BURGER BASH":
        return "Burgers"
      case "PIZZA PARTY":
        return "Pizzas"
      case "BURRITO DELIGHT":
        return "Burritos"
      case "SUMMER COMBO":
        return "Burgers" // Summer combo is burger-related
      default:
        return undefined
    }
  }

  const handleOfferPress = (title: string) => {
    const category = getCategoryFromOffer(title)
    if (category) {
      // Navigate to search tab with the selected category
      router.push({
        pathname: "/(tabs)/search",
        params: { category }
      })
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] pt-20 px-5">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0

          return (
            <View>
              <Pressable
                className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff22" }}
                onPress={() => handleOfferPress(item.title)}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image source={item.image} className="size-full" resizeMode="contain" />
                    </View>
                    <View className={cn("offer-card__info", isEven ? "pl-5" : "pr-10")}>
                      <Text className="h1-bold text-white leading-tight">{item.title}</Text>
                      <Image source={images.arrowRight} className="size-10" resizeMode="contain" tintColor="white" />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  )
}
