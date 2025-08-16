import CartButton from "@/components/CartButton"
import Filter from "@/components/Filter"
import MenuCard from "@/components/MenuCard"
import Searchbar from "@/components/SearchBar"
import dummyData from "@/constants/data"
import { Category, MenuItem } from "@/type"
import cn from "clsx"
import { useLocalSearchParams } from "expo-router"
import React, { useMemo } from "react"
import { FlatList, SafeAreaView, Text, View } from "react-native"

const Search = () => {
  const searchParams = useLocalSearchParams()
  const selectedCategory = searchParams.category as string

  const allData: MenuItem[] = dummyData.menu
  const categories: Category[] = dummyData.categories
  const loading = false

  // Filter data based on selected category
  const filteredData = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") {
      return allData
    }
    return allData.filter(item => item.category_name === selectedCategory)
  }, [selectedCategory, allData])

  return (
    <SafeAreaView className="flex-1 bg-white pt-20 px-5">
      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0

          return (
            <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? "mt-10" : "mt-0")}>
              <MenuCard item={item as MenuItem} />
            </View>
          )
        }}
        keyExtractor={item => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 pb-32"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">Search</Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                </View>
              </View>

              <CartButton />
            </View>

            <Searchbar />

            <Filter categories={categories!} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />
    </SafeAreaView>
  )
}

export default Search
