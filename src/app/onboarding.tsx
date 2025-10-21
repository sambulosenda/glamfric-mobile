import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUIStore } from '@/store';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  imageSource: any;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Discover Beauty Services',
    description: 'Find the best salons, spas, and beauty professionals near you',
    imageSource: require('../../assets/bg.png'),
  },
  {
    id: 2,
    title: 'Book with Ease',
    description: 'Schedule appointments instantly and manage your bookings effortlessly',
    imageSource: require('../../assets/bg-2.png'),
  },
  {
    id: 3,
    title: 'Get Glamorous',
    description: 'Experience top-rated beauty services and look your absolute best',
    imageSource: require('../../assets/bg-3.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const setOnboardingCompleted = useUIStore((state) => state.setOnboardingCompleted);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (currentIndex + 1),
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    setOnboardingCompleted(true);
    router.replace('/(tabs)');
  };

  const handleGetStarted = () => {
    setOnboardingCompleted(true);
    router.replace('/(tabs)');
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
      <View className="flex-1">
        {/* Slides */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {slides.map((slide) => (
            <View
              key={slide.id}
              style={{ width: SCREEN_WIDTH }}
              className="flex-1"
            >
              {/* Background Image */}
              <ImageBackground
                source={slide.imageSource}
                style={{ flex: 1 }}
                resizeMode="cover"
                className="justify-between px-6 pt-8 pb-6"
              >
                {/* Text Content on Top */}
                <View className="flex-1 justify-center items-center px-4">
                  <Text className="text-white text-4xl font-bold text-center mb-6 drop-shadow-lg">
                    {slide.title}
                  </Text>
                  <Text className="text-white text-lg text-center leading-7 drop-shadow-lg">
                    {slide.description}
                  </Text>
                </View>

                {/* Pagination Dots */}
                <View className="flex-row justify-center items-center mb-8">
                  {slides.map((_, index) => (
                    <View
                      key={index}
                      className={`h-2 rounded-full mx-1 ${
                        index === currentIndex
                          ? 'bg-white w-8'
                          : 'bg-white/40 w-2'
                      }`}
                    />
                  ))}
                </View>

                {/* Buttons at Bottom */}
                <View className="gap-4">
                  <TouchableOpacity
                    onPress={handleNext}
                    className="bg-white rounded-2xl py-4 px-8 items-center justify-center"
                    activeOpacity={0.8}
                  >
                    <Text className="text-brand-700 text-lg font-bold">
                      {isLastSlide ? 'Get Started' : 'Next'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSkip}
                    className="bg-transparent border-2 border-white rounded-2xl py-4 px-8 items-center justify-center"
                    activeOpacity={0.8}
                  >
                    <Text className="text-white text-lg font-semibold">
                      Skip
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
