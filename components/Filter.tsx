import { Category } from "@/type"
import cn from "clsx"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { FlatList, Platform, Text, TouchableOpacity } from "react-native"

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams.category || "All")
  const flatListRef = useRef<FlatList>(null)

  // Sync local state with URL params
  useEffect(() => {
    if (searchParams.category) {
      setActive(searchParams.category)
    } else {
      setActive("All")
    }
  }, [searchParams.category])

  // Scroll to active item when it changes
  useEffect(() => {
    if (flatListRef.current && active) {
      const activeIndex = filterData.findIndex(item => item.name === active)
      if (activeIndex !== -1) {
        // Add a small delay to ensure the component has rendered
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: activeIndex,
            animated: true,
            viewPosition: 0.5 // Center the item in the visible area
          })
        }, 100)
      }
    }
  }, [active])

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
      ref={flatListRef}
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
