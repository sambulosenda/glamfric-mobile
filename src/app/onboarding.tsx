import React, { useRef, useState, useEffect } from 'react';
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
  Animated,
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

  // Animated values for background fade transitions
  const fadeAnims = useRef(
    slides.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  // Fade animation when slide changes
  useEffect(() => {
    slides.forEach((_, index) => {
      Animated.timing(fadeAnims[index], {
        toValue: index === currentIndex ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [currentIndex]);

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

      {/* Background Images Layer - Fading */}
      <View className="absolute inset-0">
        {slides.map((slide, index) => (
          <Animated.View
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: fadeAnims[index],
            }}
          >
            <ImageBackground
              source={slide.imageSource}
              style={{ flex: 1 }}
              resizeMode="cover"
            >
              {/* Semi-transparent overlay for better text readability */}
              <View className="absolute inset-0 bg-black/30" />
            </ImageBackground>
          </Animated.View>
        ))}
      </View>

      {/* Scrolling Text Content Layer */}
      <View className="flex-1 justify-end pb-12 px-6">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          className="flex-grow-0"
        >
          {slides.map((slide) => (
            <View
              key={slide.id}
              style={{ width: SCREEN_WIDTH }}
              className="px-6"
            >
              {/* Text Content */}
              <View className="mb-12">
                <Text className="text-white text-5xl font-bold text-center mb-4 leading-tight">
                  {slide.title}
                </Text>
                <Text className="text-white/95 text-base text-center leading-6 px-8">
                  {slide.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots - Fixed */}
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

        {/* Buttons Side by Side - Fixed */}
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
    </View>
  );
}
