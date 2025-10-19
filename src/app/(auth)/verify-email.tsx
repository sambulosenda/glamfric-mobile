import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react-native';
import { useAuthStore } from '@/store';

/**
 * Verify Email Screen
 *
 * Shows after signup with:
 * - Email verification instructions
 * - Resend verification email button
 * - Status messages
 */
export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  const resendVerification = useAuthStore((state) => state.resendVerification);

  const handleResend = async () => {
    if (!email) {
      setResendError('Email address not found');
      return;
    }

    try {
      setResendLoading(true);
      setResendError('');
      setResendSuccess(false);

      await resendVerification(email);

      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (error) {
      setResendError(error instanceof Error ? error.message : 'Failed to resend email');
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="items-center mb-8">
        <View className="bg-green-100 rounded-full p-4 mb-4">
          <Mail size={48} color="#16a34a" />
        </View>
        <Text className="text-3xl font-bold text-gray-900 text-center">
          Check your email
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          We've sent a verification link to
        </Text>
        <Text className="text-gray-900 font-semibold mt-1 text-center">
          {email || 'your email address'}
        </Text>
      </View>

      <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <View className="flex-row items-start">
          <CheckCircle size={20} color="#2563eb" className="mt-0.5 mr-2" />
          <View className="flex-1">
            <Text className="text-blue-900 font-medium mb-1">
              Verification email sent
            </Text>
            <Text className="text-blue-700 text-sm">
              Click the link in the email to verify your account. You can close this page once you've verified.
            </Text>
          </View>
        </View>
      </View>

      {/* Success Message */}
      {resendSuccess && (
        <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <View className="flex-row items-start">
            <CheckCircle size={20} color="#16a34a" className="mt-0.5 mr-2" />
            <Text className="text-green-800 text-sm flex-1">
              Verification email sent successfully! Check your inbox.
            </Text>
          </View>
        </View>
      )}

      {/* Error Message */}
      {resendError && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <View className="flex-row items-start">
            <AlertCircle size={20} color="#dc2626" className="mt-0.5 mr-2" />
            <Text className="text-red-800 text-sm flex-1">
              {resendError}
            </Text>
          </View>
        </View>
      )}

      {/* Resend Button */}
      <TouchableOpacity
        onPress={handleResend}
        disabled={resendLoading || resendSuccess}
        className={`border-2 border-gray-300 rounded-lg py-3 mb-4 ${
          resendLoading || resendSuccess ? 'opacity-50' : ''
        }`}
      >
        {resendLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="#6B7280" />
            <Text className="text-gray-700 font-semibold ml-2">
              Sending...
            </Text>
          </View>
        ) : (
          <Text className="text-gray-700 font-semibold text-center">
            Didn't receive the email? Resend
          </Text>
        )}
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity
        onPress={handleBackToLogin}
        className="bg-red-500 rounded-lg py-3"
      >
        <Text className="text-white font-semibold text-center">
          Back to Login
        </Text>
      </TouchableOpacity>

      {/* Help Text */}
      <View className="mt-6">
        <Text className="text-gray-500 text-sm text-center">
          Make sure to check your spam folder if you don't see the email.
        </Text>
      </View>
    </View>
  );
}
