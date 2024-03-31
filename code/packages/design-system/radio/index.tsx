import React, { useState } from 'react'
import { View } from '@showtime-xyz/universal.view'
import { Text } from '@showtime-xyz/universal.text'
import { Pressable } from '@showtime-xyz/universal.pressable'

export const RadioButton = ({ label, isSelected, onPress }) => {
  return (
    <Pressable onPress={onPress} tw="flex-row items-center">
      <View
        tw={`w-4 h-4 rounded-full mr-1 ${
          isSelected ? 'bg-blue-500' : 'bg-gray-200'
        }`}
      />
      <Text tw=" text-gray-900 dark:text-white">{label}</Text>
    </Pressable>
  )
}

export const RadioGroup = ({
  initialValue,
  options,
  onSelect,
  horizontal = true,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialValue)

  const handleSelect = (option) => {
    setSelectedOption(option)
    onSelect(option)
  }

  return (
    <View tw={`${horizontal ? 'flex-row space-x-8' : 'flex-col space-y-2'}`}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          isSelected={selectedOption === option.value}
          onPress={() => handleSelect(option.value)}
        />
      ))}
    </View>
  )
}
