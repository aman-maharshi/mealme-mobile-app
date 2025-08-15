import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { Link, router } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const SignIn = () => {
  return (
    <View className="bg-white gap-10 p-5 mt-5">
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={""}
        onChangeText={() => {}}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        keyboardType="default"
        value={""}
        onChangeText={() => {}}
      />
      <CustomButton title="Sign In" onPress={() => router.push("/")} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Don't have an account?</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignIn
