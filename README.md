# Statera

**Understanding Student Behavior Through Data**

Statera is an Android mobile application designed to help students understand the relationship between their digital device usage patterns and academic performance. By tracking app usage and analyzing behavioral patterns using machine learning, Statera provides insights that empower students to make informed decisions about their digital habits.

## What is Statera?

Statera is a research-driven behavioral analysis tool that:

- **Monitors device usage**: Tracks screen time, app usage, device pickups, and unlock frequency
- **Analyzes behavioral patterns**: Uses ML to identify specific behavioral profiles
- **Correlates with academic performance**: Links usage patterns with GWA (General Weighted Average)
- **Provides actionable insights**: Offers personalized recommendations based on your digital behavior

## How It Works

### 1. Data Collection
Statera collects device usage statistics over a customizable tracking period:
- **App-level metrics**: Time spent in each application
- **Device interaction**: Number of pickups (screen activations) and unlocks
- **Total screen time**: Aggregate usage across all apps
- **Academic data**: Your GWA for correlation analysis

### 2. Behavioral Analysis
The app sends your data to a machine learning backend that analyzes:
- **Checking Frequency**: How often you check your device
- **Focus Stability**: Your ability to maintain focus on tasks
- **Session Immersion**: Depth of engagement with apps
- **Impulse Unlocking**: Tendency for impulsive device checking

### 3. Profile Classification
Based on the analysis, you're classified into one of six behavioral profiles:
- **Academic At-Risk**: High digital usage affecting academic performance
- **Balanced Learner**: Healthy balance between digital usage and academics
- **Digital Multitasker**: Frequent switching between apps and tasks
- **Digital Self-Regulated**: Strong self-control in digital consumption
- **High Functioning Academic**: Excellent academics despite digital usage
- **Minimal Digital Engager**: Limited device usage

### 4. Insights & Recommendations
The app provides:
- Visual representation of your behavior scores
- Interpretation of usage patterns
- Personalized recommendations for improvement
- Academic performance correlation

## Key Features

- **Privacy-Focused**: All data processing respects Android's usage stats permissions
- **Customizable Tracking**: Choose your tracking duration (days)
- **Real-Time Analysis**: Get instant feedback on your digital behavior
- **Cross-App Understanding**: See how different apps affect your patterns
- **Academic Integration**: Connect usage with GWA for meaningful insights
- **Visual Analytics**: Clear charts and behavioral character representations

## Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **UI**: Custom components with Poppins typography
- **Permissions**: Android PACKAGE_USAGE_STATS
- **Data Collection**: expo-android-usagestats
- **Analysis**: REST API integration with ML backend

## Installation & Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

3. Run on Android

   ```bash
   npm run android
   ```

## Building APK

### Release APK (Standalone)
Build a production-ready APK for distribution:

```bash
npm run android:release:apk
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

### Debug APK
For local testing and development:

```bash
npm run android:debug:apk
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

## Project Structure

```
app/                    # Expo Router pages
├── (tabs)/            # Tab navigation screens
│   ├── get_started.tsx
│   ├── gwa_input.tsx
│   ├── data_connected.tsx
│   └── navigation-pages/
│       ├── analysis.tsx
│       └── overview.tsx
services/              # Business logic and API
├── data-collection.ts # Usage stats collection
├── usage-stats.ts     # Android usage API wrapper
├── behavioral-profile.ts # Profile configurations
└── api-client.ts      # Backend communication
context/               # Global state management
└── AnalysisContext.tsx
components/ui/         # Reusable UI components
```

## Required Permissions

- **PACKAGE_USAGE_STATS**: Required to access app usage data on Android
  - Users must manually enable this in system settings
  - The app guides users through this process

## Development Notes

- **Platform**: Android only (requires system-level usage stats APIs)
- **Minimum SDK**: Check `android/build.gradle` for target SDK version
- **File-based routing**: Uses Expo Router for navigation
- **Type safety**: Full TypeScript implementation

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Android UsageStatsManager](https://developer.android.com/reference/android/app/usage/UsageStatsManager)
