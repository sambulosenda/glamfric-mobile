# Guest Browsing Implementation Plan

## Overview
Implement unauthenticated browsing in the mobile app, allowing users to explore businesses and services without logging in (similar to Fresha and the web app).

## Goals
- Allow guest users to browse businesses, view details, and search
- Require authentication only for bookings, favorites, and profile management
- Provide seamless login prompts when guests try to access protected features
- Maintain security for authenticated-only features

---

## Architecture Changes

### Current State
- App forces login on first launch
- All tabs require authentication
- Root index redirects to login if not authenticated

### Target State
- App allows guest browsing on launch
- Discover tab is public (no auth required)
- Bookings, Favorites, Profile tabs prompt login
- Protected actions (book, favorite, etc.) trigger auth modal

---

## Feature Breakdown

### **FEATURE 1: Core Navigation & Routing**
**Priority:** HIGH | **Dependencies:** None | **Estimated:** 2-3 days

#### Tasks:

**TASK 1.1: Update Root Navigation Logic**
- **File:** `src/app/index.tsx`
- **Developer Assignment:** Senior Dev / Team Lead
- **Acceptance Criteria:**
  - Remove forced redirect to login for unauthenticated users
  - Default route is `/(tabs)` instead of `/(auth)/login`
  - Show loading state during auth check
  - Maintain auth state hydration from storage
- **Implementation Details:**
  ```tsx
  // Change from:
  router.replace('/(auth)/login') // if not authenticated

  // To:
  router.replace('/(tabs)') // Allow guest access
  ```
- **Testing:**
  - [ ] Fresh install shows Discover tab, not login
  - [ ] Authenticated users still go to tabs
  - [ ] Auth state persists after app restart

---

**TASK 1.2: Update Tab Layout Navigation Guards**
- **File:** `src/app/(tabs)/_layout.tsx`
- **Developer Assignment:** Mid-level Dev
- **Acceptance Criteria:**
  - Remove blanket auth requirement from tabs layout
  - Allow rendering of all tabs (guest state handled per screen)
  - Add visual indicators for auth-required tabs
- **Implementation Details:**
  - Keep tab navigation visible to guests
  - Add badge/icon to tabs that require auth
- **Testing:**
  - [ ] All tabs visible to guests
  - [ ] Tab icons show correctly for both states

---

### **FEATURE 2: Auth Guards & Components**
**Priority:** HIGH | **Dependencies:** Feature 1 | **Estimated:** 3-4 days

#### Tasks:

**TASK 2.1: Create Auth Guard HOC/Component**
- **File:** `src/components/auth/AuthGuard.tsx` (new)
- **Developer Assignment:** Senior Dev
- **Acceptance Criteria:**
  - Reusable component that wraps protected screens
  - Shows custom UI when user is not authenticated
  - Accepts custom messages and actions
  - Supports different guard modes (modal, inline, redirect)
- **Props Interface:**
  ```tsx
  interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    mode?: 'modal' | 'inline' | 'redirect';
    message?: string;
    onAuthRequired?: () => void;
  }
  ```
- **Testing:**
  - [ ] Blocks guest users from protected content
  - [ ] Shows appropriate fallback UI
  - [ ] Allows authenticated users through
  - [ ] Triggers callbacks correctly

---

**TASK 2.2: Create Login Prompt Modal**
- **File:** `src/components/auth/LoginPromptModal.tsx` (new)
- **Developer Assignment:** Mid-level Dev
- **Acceptance Criteria:**
  - Beautiful modal with login/signup CTAs
  - Shows context-specific message (e.g., "Sign in to book appointments")
  - Has "Sign In" and "Create Account" buttons
  - Has "Continue as Guest" option (dismisses modal)
  - Uses bottom sheet on mobile for better UX
- **Design Specs:**
  - Icon/illustration at top
  - Title and description
  - Primary CTA: "Sign In"
  - Secondary CTA: "Create Account"
  - Tertiary action: "Maybe Later" / "Continue as Guest"
- **Testing:**
  - [ ] Modal displays correctly on all screen sizes
  - [ ] Navigation to login/signup works
  - [ ] Dismiss functionality works
  - [ ] Context message displays correctly

---

**TASK 2.3: Create useAuthGuard Hook**
- **File:** `src/hooks/useAuthGuard.ts` (new)
- **Developer Assignment:** Mid-level Dev
- **Acceptance Criteria:**
  - Hook that checks auth state and shows login prompt
  - Returns wrapped action that requires auth
  - Handles modal state management
- **Hook Interface:**
  ```tsx
  interface UseAuthGuardReturn {
    requireAuth: (action: () => void, message?: string) => void;
    isAuthenticated: boolean;
    showLoginPrompt: boolean;
    hideLoginPrompt: () => void;
  }
  ```
- **Usage Example:**
  ```tsx
  const { requireAuth } = useAuthGuard();

  const handleBookNow = () => {
    requireAuth(() => {
      // Navigate to booking flow
    }, "Sign in to book an appointment");
  };
  ```
- **Testing:**
  - [ ] Hook detects auth state correctly
  - [ ] Shows modal for unauthenticated actions
  - [ ] Executes action for authenticated users
  - [ ] Modal state management works

---

### **FEATURE 3: Screen Updates**
**Priority:** HIGH | **Dependencies:** Feature 2 | **Estimated:** 4-5 days

#### Tasks:

**TASK 3.1: Update Bookings Screen**
- **File:** `src/app/(tabs)/bookings.tsx`
- **Developer Assignment:** Junior/Mid-level Dev
- **Acceptance Criteria:**
  - Shows login prompt for guest users
  - Displays bookings list for authenticated users
  - Uses AuthGuard component
  - Has clear CTA to sign in
- **Guest State UI:**
  - Icon/illustration (calendar or booking related)
  - Heading: "Your Bookings"
  - Message: "Sign in to view and manage your appointments"
  - "Sign In" button
  - "Create Account" link
- **Testing:**
  - [ ] Guest users see prompt, not bookings
  - [ ] Authenticated users see bookings list
  - [ ] Sign in button navigates correctly
  - [ ] State updates after login

---

**TASK 3.2: Update Favorites Screen**
- **File:** `src/app/(tabs)/favorites.tsx`
- **Developer Assignment:** Junior/Mid-level Dev
- **Acceptance Criteria:**
  - Shows login prompt for guest users
  - Displays favorites list for authenticated users
  - Uses AuthGuard component
- **Guest State UI:**
  - Icon/illustration (heart or bookmark)
  - Heading: "Your Favorites"
  - Message: "Sign in to save and view your favorite businesses"
  - "Sign In" button
  - "Create Account" link
- **Testing:**
  - [ ] Guest users see prompt
  - [ ] Authenticated users see favorites
  - [ ] Navigation works
  - [ ] State updates after login

---

**TASK 3.3: Update Profile Screen**
- **File:** `src/app/(tabs)/profile.tsx`
- **Developer Assignment:** Junior/Mid-level Dev
- **Acceptance Criteria:**
  - Shows guest profile options for unauthenticated users
  - Shows full profile for authenticated users
- **Guest State UI:**
  - Profile placeholder icon
  - "Guest" label
  - "Sign In" button (primary)
  - "Create Account" button (secondary)
  - App settings (language, notifications, etc.)
  - Help & Support links
  - About / Terms / Privacy links
- **Authenticated State:**
  - User info
  - Settings
  - Logout button
- **Testing:**
  - [ ] Guest users see sign in options
  - [ ] Guest users can access app settings
  - [ ] Authenticated users see full profile
  - [ ] Logout works correctly

---

**TASK 3.4: Keep Discover Screen Public**
- **File:** `src/app/(tabs)/index.tsx`
- **Developer Assignment:** Senior Dev (Business logic)
- **Acceptance Criteria:**
  - Accessible to all users (no auth guard)
  - Shows all public businesses
  - Search functionality works for guests
  - "Add to Favorites" action triggers auth guard
- **Implementation:**
  - No AuthGuard wrapper
  - All browse/view actions work
  - Protected actions (favorite) use `useAuthGuard` hook
- **Testing:**
  - [ ] Guest users can browse businesses
  - [ ] Search works without login
  - [ ] Favorite action prompts login
  - [ ] All data loads correctly

---

### **FEATURE 4: Business Detail & Booking Flow**
**Priority:** MEDIUM | **Dependencies:** Features 1-3 | **Estimated:** 5-6 days

#### Tasks:

**TASK 4.1: Create Business Detail Screen**
- **File:** `src/app/business/[id].tsx` (new)
- **Developer Assignment:** Senior Dev
- **Acceptance Criteria:**
  - Public screen (no auth required to view)
  - Shows business info, services, reviews
  - "Book Now" button triggers auth guard
  - "Add to Favorites" triggers auth guard
  - Share functionality works for guests
- **Screen Sections:**
  - Business header (image, name, rating)
  - Services list with prices
  - Reviews section
  - About section
  - Location/hours
  - CTAs (Book, Favorite, Share)
- **Testing:**
  - [ ] Guest users can view all public info
  - [ ] Book action prompts login
  - [ ] Favorite action prompts login
  - [ ] Share works for guests
  - [ ] All data loads correctly

---

**TASK 4.2: Update Booking Flow Entry Point**
- **Files:** `src/app/booking/[businessId].tsx` (new)
- **Developer Assignment:** Mid-level Dev
- **Acceptance Criteria:**
  - Auth guard at entry point
  - Redirects to login if not authenticated
  - Preserves booking intent (businessId, serviceId)
  - Returns to booking flow after login
- **Implementation:**
  - Wrap entire booking flow with AuthGuard
  - Store booking intent in navigation params
  - After login, redirect back with params
- **Testing:**
  - [ ] Guest users redirected to login
  - [ ] Booking context preserved
  - [ ] Returns to booking after login
  - [ ] Authenticated users proceed directly

---

### **FEATURE 5: Search & Discovery Enhancements**
**Priority:** MEDIUM | **Dependencies:** Feature 3.4 | **Estimated:** 3-4 days

#### Tasks:

**TASK 5.1: Implement Search Functionality**
- **File:** `src/app/(tabs)/index.tsx` (update)
- **Developer Assignment:** Mid-level Dev
- **Acceptance Criteria:**
  - Search bar at top of Discover screen
  - Search by business name, services, category
  - Filter by location
  - Works for guest users
  - Results update in real-time (debounced)
- **GraphQL:**
  - Use `searchBusinesses` query from web app
  - Add pagination support
  - Add filters (category, location, rating)
- **Testing:**
  - [ ] Search works for guests
  - [ ] Results are accurate
  - [ ] Filters work correctly
  - [ ] Pagination works
  - [ ] Loading states display

---

**TASK 5.2: Add Category Filters**
- **File:** `src/components/discover/CategoryFilter.tsx` (new)
- **Developer Assignment:** Junior Dev
- **Acceptance Criteria:**
  - Horizontal scrollable category pills
  - Matches categories from web app
  - Updates search results on selection
  - Works for guest users
- **Categories:**
  - All, Hair Salon, Barber Shop, Nail Salon, Spa, Massage, Makeup, Skincare, Wellness, Other
- **Testing:**
  - [ ] All categories display
  - [ ] Selection works
  - [ ] Results filter correctly
  - [ ] UI is responsive

---

**TASK 5.3: Create Business Card Component**
- **File:** `src/components/discover/BusinessCard.tsx` (new)
- **Developer Assignment:** Junior/Mid-level Dev
- **Acceptance Criteria:**
  - Displays business info (image, name, rating, distance, price range)
  - Tappable to view details
  - Favorite button (triggers auth guard for guests)
  - Matches web app design
- **Props:**
  ```tsx
  interface BusinessCardProps {
    business: Business;
    onPress: () => void;
    onFavorite: () => void;
  }
  ```
- **Testing:**
  - [ ] Displays all info correctly
  - [ ] Navigation works
  - [ ] Favorite action handled
  - [ ] Images load properly

---

### **FEATURE 6: GraphQL & Data Integration**
**Priority:** HIGH | **Dependencies:** Features 4-5 | **Estimated:** 3-4 days

#### Tasks:

**TASK 6.1: Add Public Business Queries**
- **File:** `src/graphql/queries/business.ts` (new)
- **Developer Assignment:** Senior Dev
- **Acceptance Criteria:**
  - searchBusinesses query
  - getBusinessById query
  - getBusinessServices query
  - getBusinessReviews query
  - All work without authentication
- **Queries Needed:**
  ```graphql
  # From web app
  query SearchBusinesses($input: SearchBusinessesInput!)
  query GetBusiness($id: ID!)
  query GetBusinessServices($businessId: ID!)
  query GetBusinessReviews($businessId: ID!)
  ```
- **Testing:**
  - [ ] Queries work without auth token
  - [ ] Data returns correctly
  - [ ] Error handling works
  - [ ] Loading states managed

---

**TASK 6.2: Update Apollo Client for Guest Users**
- **File:** `src/graphql/client.ts`
- **Developer Assignment:** Senior Dev
- **Acceptance Criteria:**
  - Client works with or without auth token
  - Token added to headers when available
  - No token required for public queries
  - Error handling for expired tokens
- **Implementation:**
  - Make auth token optional in headers
  - Add token from authStore if available
  - Handle 401 errors gracefully
- **Testing:**
  - [ ] Public queries work without token
  - [ ] Auth queries work with token
  - [ ] Token refresh works
  - [ ] Error handling works

---

### **FEATURE 7: UI/UX Polish**
**Priority:** LOW | **Dependencies:** All features | **Estimated:** 2-3 days

#### Tasks:

**TASK 7.1: Add Onboarding for First Launch**
- **File:** `src/components/onboarding/GuestOnboarding.tsx` (new)
- **Developer Assignment:** Junior Dev
- **Acceptance Criteria:**
  - Show once on first app launch
  - Explain guest browsing capability
  - Skip option available
  - Store onboarding completion in storage
- **Slides:**
  1. Welcome + Browse without account
  2. Search & discover businesses
  3. Sign in to book & save favorites
- **Testing:**
  - [ ] Shows on first launch only
  - [ ] Skip works
  - [ ] Doesn't show again
  - [ ] Navigation after onboarding

---

**TASK 7.2: Add Navigation Header Improvements**
- **File:** `src/components/layouts/TabHeader.tsx` (new)
- **Developer Assignment:** Junior/Mid-level Dev
- **Acceptance Criteria:**
  - Shows "Sign In" button for guests in header
  - Shows user avatar for authenticated users
  - Location selector for search
  - Notification icon (auth required)
- **Testing:**
  - [ ] Header adapts to auth state
  - [ ] Sign in button works
  - [ ] Avatar displays for authenticated users

---

**TASK 7.3: Add Empty States & Skeletons**
- **Files:** `src/components/ui/EmptyState.tsx`, `src/components/ui/SkeletonLoader.tsx` (new)
- **Developer Assignment:** Junior Dev
- **Acceptance Criteria:**
  - Reusable empty state component
  - Skeleton loaders for lists
  - Used across all screens
  - Follows design system
- **Testing:**
  - [ ] Empty states show correctly
  - [ ] Skeletons match actual content
  - [ ] Transitions smooth

---

### **FEATURE 8: Analytics & Testing**
**Priority:** LOW | **Dependencies:** All features | **Estimated:** 2 days

#### Tasks:

**TASK 8.1: Add Analytics Events**
- **File:** `src/utils/analytics.ts` (new)
- **Developer Assignment:** Mid-level Dev
- **Acceptance Criteria:**
  - Track guest browsing behavior
  - Track login prompts shown
  - Track conversion from guest to user
  - Track protected action attempts
- **Events:**
  - `guest_browse_start`
  - `guest_view_business`
  - `login_prompt_shown`
  - `guest_converted` (signed up/in)
  - `protected_action_blocked`
- **Testing:**
  - [ ] Events fire correctly
  - [ ] Data captured accurately

---

**TASK 8.2: Integration Testing**
- **Files:** Test files across codebase
- **Developer Assignment:** QA + Dev Team
- **Acceptance Criteria:**
  - E2E tests for guest flow
  - E2E tests for auth flow
  - Unit tests for auth guard
  - Unit tests for hooks
- **Test Scenarios:**
  - [ ] Guest can browse without login
  - [ ] Guest prompted on protected actions
  - [ ] Guest can sign in and continue
  - [ ] Authenticated user has full access
  - [ ] Logout returns to guest state
  - [ ] Deep links work for guests

---

## Technical Dependencies

### New Dependencies (Install Required)
```json
{
  "@gorhom/bottom-sheet": "^4.6.0",  // For login modals
  "react-native-reanimated": "~3.6.2", // Required by bottom-sheet
  "react-native-gesture-handler": "~2.14.0" // Required by bottom-sheet
}
```

### GraphQL Schema Requirements
- Ensure backend allows public access to:
  - `searchBusinesses`
  - `getBusiness`
  - `getBusinessServices`
  - `getBusinessReviews`

---

## Testing Strategy

### Unit Tests
- Auth guard component
- Auth hooks
- Navigation logic
- Store selectors

### Integration Tests
- Guest browsing flow
- Login prompt triggers
- Auth flow completion
- Protected action blocking

### E2E Tests
- Fresh install → Browse → Login → Book
- Guest → View business → Favorite (blocked) → Login → Favorite again
- Guest → Search → View → Sign up

---

## Rollout Plan

### Phase 1 (Week 1)
- Features 1, 2, 6
- Core navigation and auth guards

### Phase 2 (Week 2)
- Features 3, 4
- Screen updates and business detail

### Phase 3 (Week 3)
- Features 5, 7
- Search, discovery, and UI polish

### Phase 4 (Week 4)
- Feature 8
- Testing, bug fixes, QA

---

## Definition of Done

### For Each Task
- [ ] Code implemented and follows style guide
- [ ] Unit tests written and passing
- [ ] Code reviewed by senior dev
- [ ] Tested on iOS and Android
- [ ] No TypeScript errors
- [ ] Documentation updated

### For Each Feature
- [ ] All tasks completed
- [ ] Integration tests passing
- [ ] Acceptance criteria met
- [ ] QA sign-off
- [ ] Design review passed

### For Overall Project
- [ ] All features completed
- [ ] E2E tests passing
- [ ] Performance tested (app load time, navigation)
- [ ] Analytics implemented
- [ ] App store screenshots updated
- [ ] Release notes written
- [ ] Stakeholder demo completed

---

## Risk Mitigation

### Potential Risks
1. **Backend API changes required**
   - Mitigation: Coordinate with backend team early
   - Fallback: Mock data for development

2. **Performance issues with public queries**
   - Mitigation: Implement pagination, caching
   - Monitoring: Add performance tracking

3. **Security concerns with public data**
   - Mitigation: Review with security team
   - Ensure PII not exposed in public queries

4. **Complex auth state management**
   - Mitigation: Thorough testing of edge cases
   - Document all auth flows

---

## Success Metrics

### Business Metrics
- % of users who browse before signing up
- Conversion rate: guest → signed up user
- Time to first booking (including guest browsing time)
- Feature adoption: search, business views

### Technical Metrics
- App load time < 2s
- Search results load < 1s
- No crashes related to auth state
- 90%+ test coverage for auth logic

---

## Team Assignment Summary

| Developer Level | Estimated Tasks | Features |
|----------------|-----------------|----------|
| Senior Dev (Team Lead) | 5 tasks | F1, F2, F4, F6 |
| Mid-level Dev | 7 tasks | F1, F2, F4, F5, F6, F8 |
| Junior Dev | 6 tasks | F3, F5, F7 |
| QA/Test | 2 tasks | F8 |

**Total Estimated Time:** 4 weeks (with 2-3 developers)

---

## Questions for Product/Design Team

1. What should happen when a guest user tries to book?
   - Show login modal immediately?
   - Allow them to select service/time first, then prompt?

2. Should we limit any business information for guests?
   - Pricing visible?
   - Staff profiles visible?
   - Full business address visible?

3. What analytics events are most important?

4. Should there be a "guest mode" indicator in the UI?

5. Do we want social login (Google, Apple) for easier conversion?

---

## Notes
- This plan aligns the mobile app with the web app's guest browsing capability
- Implementation should maintain existing auth functionality for logged-in users
- All protected features remain secure and require authentication
- Focus on seamless UX when transitioning from guest to authenticated state
