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
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
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
    <View className="flex-1">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        bounces={false}
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
                className="justify-end pb-12 px-6"
              >
                {/* Semi-transparent overlay for better text readability */}
                <View className="absolute inset-0 bg-black/30" />

                {/* Content Container */}
                <View className="z-10">
                  {/* Text Content */}
                  <View className="mb-12">
                    <Text className="text-white text-5xl font-bold text-center mb-4 leading-tight">
                      {slide.title}
                    </Text>
                    <Text className="text-white/95 text-base text-center leading-6 px-8">
                      {slide.description}
                    </Text>
                  </View>

                  {/* Pagination Dots */}
                  <View className="flex-row justify-center items-center mb-8">
                    {slides.map((_, index) => (
                      <View
                        key={index}
                        className={`h-2.5 rounded-full mx-1.5 transition-all ${
                          index === currentIndex
                            ? 'bg-white w-10'
                            : 'bg-white/50 w-2.5'
                        }`}
                      />
                    ))}
                  </View>

                  {/* Buttons Side by Side */}
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={handleSkip}
                      className="flex-1 bg-white/20 backdrop-blur border-2 border-white/50 rounded-full py-4 items-center justify-center"
                      activeOpacity={0.7}
                    >
                      <Text className="text-white text-base font-semibold">
                        Skip
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleNext}
                      className="flex-1 bg-white rounded-full py-4 items-center justify-center shadow-lg"
                      activeOpacity={0.8}
                    >
                      <Text className="text-brand-700 text-base font-bold">
                        {isLastSlide ? 'Get Started' : 'Next'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
    </View>
  );
}
