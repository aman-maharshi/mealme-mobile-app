import { images, offers } from "@/constants"
import cn from "clsx"
import { Fragment } from "react"
import { FlatList, Image, Pressable, SafeAreaView, Text, View } from "react-native"

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-20">
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
        contentContainerClassName="px-5 pb-28"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
