import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { useAuthStore } from '@/store';
import { FormButton } from '@/components/forms';

/**
 * Email Verification Handler Screen
 *
 * This screen is opened when user clicks the verification link in their email.
 * It automatically verifies the email using the token from the URL.
 *
 * Deep link format: glamfric://verify/{token}
 * Web format: https://yourdomain.com/verify/{token}
 */
export default function VerifyTokenScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token?: string }>();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  const verifyEmail = useAuthStore((state) => state.verifyEmail);

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        await verifyEmail(token);
        setStatus('success');
        setMessage('Your email has been verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(
          error instanceof Error
            ? error.message
            : 'Verification failed. The link may have expired.'
        );
      }
    };

    handleVerification();
  }, [token, verifyEmail]);

  const handleContinue = () => {
    if (status === 'success') {
      // Redirect to login after successful verification
      router.replace('/(auth)/login');
    } else {
      // Go back to verify-email screen to resend
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      {status === 'verifying' && (
        <>
          <ActivityIndicator size="large" color="#EF4444" className="mb-6" />
          <Text className="text-xl font-semibold text-gray-900 mb-2">
            Verifying your email...
          </Text>
          <Text className="text-gray-600 text-center">
            Please wait while we verify your account.
          </Text>
        </>
      )}

      {status === 'success' && (
        <>
          <View className="bg-green-100 rounded-full p-6 mb-6">
            <CheckCircle size={64} color="#16a34a" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Email Verified!
          </Text>
          <Text className="text-gray-600 text-center mb-8">
            {message}
          </Text>
          <FormButton
            title="Continue to Login"
            onPress={handleContinue}
          />
        </>
      )}

      {status === 'error' && (
        <>
          <View className="bg-red-100 rounded-full p-6 mb-6">
            <XCircle size={64} color="#dc2626" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Verification Failed
          </Text>
          <Text className="text-gray-600 text-center mb-8">
            {message}
          </Text>
          <FormButton
            title="Try Again"
            onPress={handleContinue}
          />
        </>
      )}
    </View>
  );
}
