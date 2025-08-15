import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { Link } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const SignUp = () => {
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput placeholder="Enter your full name" value={""} onChangeText={() => {}} label="Full name" />
      <CustomInput
        placeholder="Enter your email"
        value={""}
        onChangeText={() => {}}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={""}
        onChangeText={() => {}}
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton title="Sign Up" isLoading={false} onPress={() => {}} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Already have an account?</Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  )
}

export default SignUp
