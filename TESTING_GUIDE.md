# Testing Guide: Login/Signup Form Improvements

## Quick Start

Before testing, make sure to:

1. **Clear Metro bundler cache:**
   ```bash
   npx expo start --clear
   ```

2. **Run on your preferred platform:**
   ```bash
   # iOS
   npx expo run:ios

   # Android
   npx expo run:android
   ```

## Testing Scenarios

### Login Form Tests

#### 1. Email Validation
- [ ] **Empty email:** Leave email blank and tap password field
  - Expected: "Email is required" error appears below email field

- [ ] **Invalid email format:** Enter "test" or "test@" or "test@com"
  - Expected: "Please enter a valid email address" error appears

- [ ] **Valid email:** Enter "test@example.com"
  - Expected: No error, email is lowercase

#### 2. Password Field
- [ ] **Empty password:** Leave password blank and tap submit
  - Expected: "Password is required" error appears

- [ ] **Show/Hide toggle:** Click the eye icon
  - Expected: Password visibility toggles, icon changes between eye and eye-off

- [ ] **Password visible:** Type "Test123!" with eye icon toggled
  - Expected: Characters visible while typing

#### 3. Form Submission
- [ ] **Invalid form submission:** Try to submit with errors
  - Expected: Form doesn't submit, errors remain visible

- [ ] **Valid form submission:** Enter valid credentials
  - Expected: Loading spinner appears, button disabled, keyboard dismisses

- [ ] **API error:** Submit with invalid credentials
  - Expected: Error message appears inline on email field, no Alert shown

#### 4. Keyboard Behavior
- [ ] **Focus management:** Tap email field, press Return/Next
  - Expected: Focus moves to password field automatically

- [ ] **Submit on Enter:** In password field, press Return/Done
  - Expected: Form submits if valid

- [ ] **Keyboard scrolling:** Open keyboard on smaller devices
  - Expected: Form scrolls to keep active field visible

#### 5. Accessibility
- [ ] **VoiceOver (iOS) / TalkBack (Android):** Enable screen reader
  - Expected: All fields, buttons, and errors are announced correctly

- [ ] **Error announcements:** Trigger validation error
  - Expected: Screen reader announces error immediately

---

### Signup Form Tests

#### 1. Name Validation
- [ ] **Empty name:** Leave name blank and move to next field
  - Expected: "Name is required" error appears

- [ ] **Short name:** Enter "A"
  - Expected: "Name must be at least 2 characters" error

- [ ] **Long name:** Enter 51+ characters
  - Expected: "Name must be less than 50 characters" error

- [ ] **Invalid characters:** Enter "John123" or "Test@User"
  - Expected: "Name can only contain letters, spaces, hyphens and apostrophes" error

- [ ] **Valid names:** Try "John Doe", "Mary-Jane", "O'Brien"
  - Expected: All accepted without errors

#### 2. Email Validation
- [ ] Same tests as login form email validation

#### 3. Password Validation & Strength Indicator

- [ ] **Empty password:**
  - Expected: "Password is required" error

- [ ] **Too short:** Enter "Test1!"
  - Expected: "Password must be at least 8 characters" error

- [ ] **Missing lowercase:** Enter "TEST1234!"
  - Expected: "Password must contain at least one lowercase letter" error

- [ ] **Missing uppercase:** Enter "test1234!"
  - Expected: "Password must contain at least one uppercase letter" error

- [ ] **Missing number:** Enter "TestTest!"
  - Expected: "Password must contain at least one number" error

- [ ] **Missing special char:** Enter "Test1234"
  - Expected: "Password must contain at least one special character" error

#### 4. Password Strength Indicator

Test the visual indicator as you type:

- [ ] **Weak password:** Type "Test123!"
  - Expected: 1-2 bars filled, red/orange color, "Weak" or "Fair" label

- [ ] **Medium password:** Type "Test1234!"
  - Expected: 2-3 bars filled, yellow color, "Fair" or "Good" label

- [ ] **Strong password:** Type "Test1234!@#"
  - Expected: 4 bars filled, green color, "Strong" label

- [ ] **Strength updates in real-time:**
  - Expected: Bars and label update as you type each character

#### 5. Password Confirmation

- [ ] **Empty confirm password:**
  - Expected: "Please confirm your password" error

- [ ] **Mismatched passwords:** Enter different passwords
  - Expected: "Passwords do not match" error on confirm field

- [ ] **Matching passwords:** Enter same password in both fields
  - Expected: No errors on either field

- [ ] **Update password after confirming:** Change password field after confirming
  - Expected: Mismatch error appears on confirm field

#### 6. Form Flow & Focus Management

- [ ] **Tab through fields:** Name → Email → Password → Confirm Password
  - Expected: Smooth focus transition with "Next" return key

- [ ] **Submit from last field:** Press Return in confirm password
  - Expected: Form submits if valid

- [ ] **Focus on first error:** Submit invalid form
  - Expected: Form stays on screen showing errors

#### 7. Form Submission

- [ ] **Valid signup:** Fill all fields correctly
  - Expected: Loading spinner, button disabled, keyboard dismisses, navigates to tabs

- [ ] **API error (duplicate email):** Sign up with existing email
  - Expected: Error appears inline on email field

- [ ] **Network error:** Turn off internet and submit
  - Expected: Error message displayed inline

---

## Edge Cases to Test

### General Edge Cases

1. **Rapid input:** Type very quickly in all fields
   - Expected: No performance issues, validation keeps up

2. **Copy/Paste:** Copy and paste into fields
   - Expected: Validation runs, errors clear if valid

3. **Auto-fill:** Use password manager auto-fill
   - Expected: Form accepts auto-filled values, validates correctly

4. **Screen rotation:** Rotate device (if applicable)
   - Expected: Form layout adjusts, no loss of data

5. **App backgrounding:** Fill form, background app, return
   - Expected: Form data persists, no crashes

6. **Slow network:** Simulate slow 3G connection
   - Expected: Loading state shows, no multiple submissions

7. **Keyboard dismissal:** Tap outside form while typing
   - Expected: Keyboard dismisses, data preserved

### Password Field Edge Cases

1. **Special characters:** Test various special chars: !@#$%^&*()_+-=[]{}|;:,.<>?
   - Expected: All accepted in password fields

2. **Unicode/Emoji:** Try entering emoji or non-Latin characters
   - Expected: Handled gracefully (may be rejected by validation)

3. **Very long password:** Enter 50+ character password
   - Expected: Accepted if meets other criteria

4. **Spaces in password:** Enter "Test 1234 !"
   - Expected: Should work (spaces are valid in passwords)

### Form State Edge Cases

1. **Multiple error states:** Trigger errors on all fields simultaneously
   - Expected: All errors display correctly, no overlap

2. **Clear errors:** Fix fields one by one
   - Expected: Errors clear individually as fields become valid

3. **Re-validation:** Enter invalid, then valid, then invalid again
   - Expected: Validation updates correctly each time

---

## Performance Testing

### Metrics to Check

1. **Form render count:**
   - With React DevTools Profiler
   - Expected: Minimal re-renders, only when necessary

2. **Validation speed:**
   - Time from blur to error display
   - Expected: <100ms for validation

3. **Password strength calculation:**
   - Type quickly and observe indicator
   - Expected: No lag, smooth updates

4. **Keyboard animation:**
   - Open/close keyboard
   - Expected: Smooth 60fps animation

5. **Form submission:**
   - Time from tap to loading state
   - Expected: <50ms response time

---

## Accessibility Testing

### iOS VoiceOver

1. Enable VoiceOver: Settings → Accessibility → VoiceOver
2. Navigate through form with swipe gestures
3. Check:
   - [ ] All labels are announced
   - [ ] Field types are identified (text field, password field)
   - [ ] Errors are announced when they appear
   - [ ] Button states (enabled/disabled/loading) are announced
   - [ ] Password toggle is identified as a button

### Android TalkBack

1. Enable TalkBack: Settings → Accessibility → TalkBack
2. Navigate through form
3. Check same items as VoiceOver

### Keyboard Navigation (if applicable on device)

- [ ] Can tab through all fields
- [ ] Can activate buttons with keyboard
- [ ] Enter key submits form

---

## Visual Testing

### Light Mode (Default)
- [ ] Text is readable
- [ ] Errors are clearly visible (red)
- [ ] Password strength colors are distinct
- [ ] Focus states are visible

### Edge-to-Edge Testing
- [ ] Form doesn't extend under notch/status bar
- [ ] Content visible above keyboard
- [ ] No content cut off on small screens

### Different Screen Sizes

Test on:
- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro (notch)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] Android small device (5" screen)
- [ ] Android tablet (if applicable)

---

## Regression Testing

After making changes, ensure:

1. [ ] Login still works with existing credentials
2. [ ] Signup still creates new accounts
3. [ ] Navigation to tabs works after auth
4. [ ] Zustand auth store updates correctly
5. [ ] MMKV persistence works
6. [ ] Apollo client integrates properly
7. [ ] Error handling from GraphQL mutations works

---

## Known Limitations

1. **Expo Go:**
   - react-native-keyboard-controller may have limited functionality
   - Test in development build for full experience

2. **Web:**
   - Keyboard controller designed for mobile
   - May need separate web-specific handling

3. **Old Android versions:**
   - Keyboard animations may vary
   - Test on Android 10+ for best experience

---

## Debugging Tips

### If form validation isn't working:

1. Check Zod schema is imported correctly
2. Verify zodResolver is set up in useForm
3. Check console for validation errors
4. Ensure mode is set to 'onBlur' or 'onChange'

### If keyboard behavior is broken:

1. Verify KeyboardProvider is in _layout.tsx
2. Check babel.config.js has keyboard-controller plugin
3. Restart Metro bundler with --clear flag
4. Rebuild native app (not just reload)

### If password strength doesn't update:

1. Check watch('password') is working
2. Verify useEffect dependency array includes password
3. Check getPasswordStrength function is imported

### If focus management fails:

1. Verify refs are created with useRef
2. Check ref is passed to component correctly
3. Ensure returnKeyType is set appropriately
4. Check onSubmitEditing handlers

---

## Success Criteria

The implementation is successful if:

- ✅ All validation rules work correctly
- ✅ No alerts are shown (all errors inline)
- ✅ Password toggle works on both fields
- ✅ Password strength indicator updates in real-time
- ✅ Keyboard handling is smooth
- ✅ Focus management works seamlessly
- ✅ Form submission integrates with existing auth store
- ✅ TypeScript has no errors
- ✅ Accessibility features work correctly
- ✅ Performance is smooth (no lag or stuttering)

---

## Reporting Issues

If you find bugs, please include:

1. Device/emulator details
2. OS version
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots/recordings if applicable
6. Console logs (if relevant)

Happy testing!
