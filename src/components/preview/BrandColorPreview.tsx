import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';

/**
 * Brand Color Preview Component
 * 
 * Shows how buttons and UI elements look with the new brand colors:
 * #2C01E2, #3F13FE, #6440FE, #9880FE, #CBBFFF
 */
export const BrandColorPreview: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-base-900 mb-6">
        New Brand Colors Preview
      </Text>

      {/* Brand Color Palette */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-base-800 mb-4">
          Brand Color Palette
        </Text>
        <View className="flex-row flex-wrap gap-3">
          <View className="items-center">
            <View 
              className="w-16 h-16 rounded-lg border border-base-200"
              style={{ backgroundColor: '#2C01E2' }}
            />
            <Text className="text-xs text-base-600 mt-1">#2C01E2</Text>
            <Text className="text-xs text-base-500">brand-600</Text>
          </View>
          <View className="items-center">
            <View 
              className="w-16 h-16 rounded-lg border border-base-200"
              style={{ backgroundColor: '#3F13FE' }}
            />
            <Text className="text-xs text-base-600 mt-1">#3F13FE</Text>
            <Text className="text-xs text-base-500">brand-500</Text>
          </View>
          <View className="items-center">
            <View 
              className="w-16 h-16 rounded-lg border border-base-200"
              style={{ backgroundColor: '#6440FE' }}
            />
            <Text className="text-xs text-base-600 mt-1">#6440FE</Text>
            <Text className="text-xs text-base-500">brand-400</Text>
          </View>
          <View className="items-center">
            <View 
              className="w-16 h-16 rounded-lg border border-base-200"
              style={{ backgroundColor: '#9880FE' }}
            />
            <Text className="text-xs text-base-600 mt-1">#9880FE</Text>
            <Text className="text-xs text-base-500">brand-300</Text>
          </View>
          <View className="items-center">
            <View 
              className="w-16 h-16 rounded-lg border border-base-200"
              style={{ backgroundColor: '#CBBFFF' }}
            />
            <Text className="text-xs text-base-600 mt-1">#CBBFFF</Text>
            <Text className="text-xs text-base-500">brand-200</Text>
          </View>
        </View>
      </View>

      {/* Button Examples */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-base-800 mb-4">
          Button Variations
        </Text>
        
        {/* Large Buttons */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-base-700 mb-3">Large Buttons</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="bg-brand-500 px-8 py-4 rounded-xl">
              <Text className="text-white font-semibold text-lg">Primary</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-brand-600 px-8 py-4 rounded-xl">
              <Text className="text-white font-semibold text-lg">Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border-2 border-brand-500 px-8 py-4 rounded-xl bg-white">
              <Text className="text-brand-500 font-semibold text-lg">Outline</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-brand-200 px-8 py-4 rounded-xl">
              <Text className="text-brand-600 font-semibold text-lg">Light</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Medium Buttons */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-base-700 mb-3">Medium Buttons</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="bg-brand-500 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold">Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-brand-600 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold">Reserve</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-brand-500 px-6 py-3 rounded-lg bg-white">
              <Text className="text-brand-500 font-semibold">Learn More</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-brand-100 px-6 py-3 rounded-lg">
              <Text className="text-brand-600 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Small Buttons */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-base-700 mb-3">Small Buttons</Text>
          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity className="bg-brand-500 px-4 py-2 rounded-md">
              <Text className="text-white font-medium text-sm">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-brand-400 px-4 py-2 rounded-md">
              <Text className="text-white font-medium text-sm">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-brand-400 px-4 py-2 rounded-md bg-white">
              <Text className="text-brand-500 font-medium text-sm">View</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-brand-200 px-4 py-2 rounded-md">
              <Text className="text-brand-700 font-medium text-sm">Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Button States */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-base-800 mb-4">
          Button States
        </Text>
        <View className="space-y-3">
          {/* Normal State */}
          <TouchableOpacity className="bg-brand-500 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold text-center">Normal State</Text>
          </TouchableOpacity>
          
          {/* Hover State */}
          <TouchableOpacity className="bg-brand-600 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold text-center">Hover State</Text>
          </TouchableOpacity>
          
          {/* Pressed State */}
          <TouchableOpacity className="bg-brand-700 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold text-center">Pressed State</Text>
          </TouchableOpacity>
          
          {/* Disabled State */}
          <TouchableOpacity className="bg-base-300 px-6 py-3 rounded-lg" disabled>
            <Text className="text-base-500 font-semibold text-center">Disabled State</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards with Brand Colors */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-base-800 mb-4">
          Card Examples
        </Text>
        
        {/* Primary Card */}
        <View className="bg-brand-500 rounded-xl p-6 mb-4">
          <Text className="text-white text-xl font-bold mb-2">
            Premium Service
          </Text>
          <Text className="text-white/90 mb-4">
            Get the best beauty treatments with our premium package.
          </Text>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-lg self-start">
            <Text className="text-brand-500 font-semibold">Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Light Card */}
        <View className="bg-brand-50 border border-brand-200 rounded-xl p-6">
          <Text className="text-brand-700 text-xl font-bold mb-2">
            Special Offer
          </Text>
          <Text className="text-brand-600 mb-4">
            Limited time discount on all beauty services.
          </Text>
          <TouchableOpacity className="bg-brand-500 px-4 py-2 rounded-lg self-start">
            <Text className="text-white font-semibold">Claim Offer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Usage Examples */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-base-800 mb-4">
          Usage Examples
        </Text>
        <View className="bg-base-50 rounded-lg p-4">
          <Text className="text-base-700 font-mono text-sm mb-2">
            Primary Button:
          </Text>
          <Text className="text-base-600 font-mono text-xs mb-4">
            className="bg-brand-500 text-white px-6 py-3 rounded-lg"
          </Text>
          
          <Text className="text-base-700 font-mono text-sm mb-2">
            Outline Button:
          </Text>
          <Text className="text-base-600 font-mono text-xs mb-4">
            className="border border-brand-500 text-brand-500 px-6 py-3 rounded-lg"
          </Text>
          
          <Text className="text-base-700 font-mono text-sm mb-2">
            Brand Card:
          </Text>
          <Text className="text-base-600 font-mono text-xs">
            className="bg-brand-500 text-white rounded-xl p-6"
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BrandColorPreview;