import { Category } from "@/type"
import cn from "clsx"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Platform, Text, TouchableOpacity } from "react-native"

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams.category || "All")

  // Sync local state with URL params
  useEffect(() => {
    if (searchParams.category) {
      setActive(searchParams.category)
    } else {
      setActive("All")
    }
  }, [searchParams.category])

  const handlePress = (name: string) => {
    setActive(name)
    if (name === "All") {
      router.setParams({ category: undefined })
      setActive("All")
    } else {
      router.setParams({ category: name })
    }
  }

  const filterData = categories ? [{ name: "All" }, ...categories.map(cat => ({ name: cat.name }))] : [{ name: "All" }]

  return (
    <FlatList
      data={filterData}
      keyExtractor={item => item.name}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.name}
          className={cn("filter", active === item.name ? "bg-amber-500" : "bg-white")}
          style={Platform.OS === "android" ? { elevation: 5, shadowColor: "#878787" } : {}}
          onPress={() => handlePress(item.name)}
        >
          <Text className={cn("body-medium", active === item.name ? "text-white" : "text-gray-200")}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}
export default Filter
