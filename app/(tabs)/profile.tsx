import CustomButton from "@/components/CustomButton"
import { useAuthStore } from "@/store/authStore"
import React from "react"
import { Text, View } from "react-native"

const Profile = () => {
  const { signOut } = useAuthStore()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-8">Profile</Text>
      <CustomButton title="Sign Out" onPress={handleSignOut} />
    </View>
  )
}

export default Profile
