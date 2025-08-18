import CustomButton from "@/components/CustomButton"
import CustomHeader from "@/components/CustomHeader"
import { images } from "@/constants"
import { useAuthStore } from "@/store/authStore"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React from "react"
import { Image, SafeAreaView, Text, View } from "react-native"

const ProfileField = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View className="profile-field">
    <View className="profile-field__icon">
      <Ionicons name={icon as any} size={24} color="#FF6B35" />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-quicksand-medium text-gray-500 mb-1">{label}</Text>
      <Text className="text-base font-quicksand-bold text-dark-100">{value}</Text>
    </View>
  </View>
)

const Profile = () => {
  const { signOut } = useAuthStore()

  const handleSignOut = () => {
    signOut()
    router.replace("/(auth)/sign-in")
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] pt-20 px-5">
      <CustomHeader title="Profile" />

      {/* Profile Avatar Section */}
      <View className="items-center mb-8">
        <View className="profile-avatar">
          <Image source={images.avatar} className="h-full w-full rounded-full" resizeMode="cover" />
        </View>
      </View>

      {/* Profile Information Card */}
      <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5 mb-6">
        <ProfileField icon="person" label="Full Name" value="Aman Maharshi" />

        <ProfileField icon="mail" label="Email" value="aman@google.com" />

        <ProfileField icon="call" label="Phone number" value="+91 9460937696" />

        <ProfileField
          icon="location"
          label="Address 1 - (Home)"
          value="123 MG Road, Indiranagar, Bangalore, KA 560038"
        />

        <ProfileField
          icon="business"
          label="Address 2 - (Work)"
          value="456 Koramangala 8th Block, Bangalore, KA 560034"
        />
      </View>

      <View className="gap-4">
        <CustomButton title="Sign Out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  )
}

export default Profile
