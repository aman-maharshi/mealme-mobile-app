import CustomButton from "@/components/CustomButton"
import { useAuthStore } from "@/store/authStore"
import React from "react"
import { SafeAreaView, Text } from "react-native"

const Profile = () => {
  const { signOut } = useAuthStore()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-20 px-5">
      <Text className="text-2xl font-bold mb-8">Profile</Text>
      <CustomButton title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  )
}

export default Profile
