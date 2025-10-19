# Deep Linking Setup for Email Verification

## Overview
The mobile app now supports deep linking for email verification. When users click the verification link in their email, it will automatically open the app and verify their email.

## Deep Link Configuration

**App Scheme:** `glamfric://`

**Bundle Identifiers:**
- iOS: `com.sambulo.senda.glamfric`
- Android: `com.sambulo.senda.glamfric`

## Email Verification Link Format

### For Mobile App (Preferred)
```
glamfric://verify/{verification-token}
```

**Example:**
```
glamfric://verify/abc123-def456-ghi789
```

### Universal Links (iOS) / App Links (Android)
If you want to support universal/app links (opens in app if installed, otherwise opens in browser):

```
https://yourdomain.com/verify/{verification-token}
```

The app is configured to handle both formats.

## Backend Implementation

### Update Email Template

In your `sendVerificationEmail` function, use this URL format:

```typescript
// Current format (web only):
const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`

// NEW format for mobile app:
const verificationUrl = `glamfric://verify/${token}`

// OR for universal link (works on both web and mobile):
const verificationUrl = `https://yourdomain.com/verify/${token}`
```

### Recommended: Support Both Web and Mobile

Send different links based on user agent or provide both links in the email:

```typescript
const webVerificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`
const mobileVerificationUrl = `glamfric://verify/${token}`

// In email template:
// "Click here to verify on web: {webVerificationUrl}"
// "Or open in mobile app: {mobileVerificationUrl}"
```

## How It Works

1. **User signs up** → Backend creates verification token and sends email
2. **User clicks link in email** → Opens `glamfric://verify/{token}`
3. **OS opens the app** → Navigates to `/verify/{token}` route
4. **App auto-verifies** → Calls `verifyEmail(token)` mutation
5. **Success** → Redirects user to login screen
6. **Error** → Shows error and option to resend

## Testing Deep Links

### iOS Simulator
```bash
xcrun simctl openurl booted "glamfric://verify/test-token-123"
```

### Android Emulator/Device
```bash
adb shell am start -W -a android.intent.action.VIEW -d "glamfric://verify/test-token-123"
```

### Physical Device (Development)
1. Send yourself a test email with the deep link
2. Open email on your phone
3. Click the link
4. Choose "Open in Glamfric"

## Universal Links Setup (Optional - For Production)

For production apps, you should set up Universal Links (iOS) and App Links (Android) so links work even if the app isn't installed.

### iOS - Universal Links
1. Add associated domains to app.json:
```json
"ios": {
  "associatedDomains": ["applinks:yourdomain.com"]
}
```

2. Host apple-app-site-association file at:
```
https://yourdomain.com/.well-known/apple-app-site-association
```

### Android - App Links
1. Add intent filter in app.json:
```json
"android": {
  "intentFilters": [
    {
      "action": "VIEW",
      "data": {
        "scheme": "https",
        "host": "yourdomain.com",
        "pathPrefix": "/verify"
      },
      "category": ["BROWSABLE", "DEFAULT"]
    }
  ]
}
```

2. Host assetlinks.json file at:
```
https://yourdomain.com/.well-known/assetlinks.json
```

## Questions?

Contact the mobile development team if you need help implementing the email verification links.
