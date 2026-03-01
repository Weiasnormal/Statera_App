# Statera

**Understanding Student Behavior Through Data**

Statera is an Android mobile application designed to help students understand the relationship between their digital device usage patterns and academic performance. By tracking app usage and analyzing behavioral patterns using machine learning, Statera provides insights that empower students to make informed decisions about their digital habits.

## What is Statera?

Statera is a research-driven behavioral analysis tool that:

- **Monitors device usage**: Tracks screen time, app usage, device pickups (screen activations), and unlock frequency
- **Analyzes behavioral patterns**: Uses ML to identify specific behavioral profiles based on usage data
- **Correlates with academic performance**: Links usage patterns with GWA (General Weighted Average)
- **Provides actionable insights**: Displays dominant profile, category breakdown, and personalized analysis

## How It Works

### 1. Data Collection
Statera collects device usage statistics over a customizable tracking period (default: 7 days):
- **App-level metrics**: Time spent in each application (tracked in milliseconds)
- **Device interaction**: Number of pickups (screen activations via `EVENT_SCREEN_INTERACTIVE`) and unlocks (lock screen bypasses via `EVENT_KEYGUARD_HIDDEN`)
- **Total screen time**: Aggregate usage across all apps
- **Academic data**: Your GWA for correlation analysis
- **Collection metadata**: Platform, timestamp, and tracking duration

### 2. Backend Processing
The app sends collected data to a machine learning backend API that:
- Categorizes apps into usage categories (Social, Entertainment, Productivity, etc.)
- Analyzes behavioral patterns across the tracking period
- Calculates probability scores for each of the 6 behavioral profiles
- Returns the dominant profile with category usage breakdown

### 3. Profile Classification
Based on the ML analysis, you're classified into one of six behavioral profiles:
- **Academic at Risk**: High digital usage patterns associated with academic challenges
- **Average Balanced User**: Healthy balance between digital usage and academics
- **Digital Multitasker**: Frequent switching between apps and tasks
- **Digital Self-Regulated**: Strong self-control in digital consumption
- **High-Functioning Academic**: Excellent academics with managed digital usage
- **Minimal Digital Engager**: Limited device usage patterns

### 4. Insights & Visualization
The app provides:
- **Dominant profile**: Your primary behavioral classification with confidence score
- **Category breakdown**: Top 5 app categories by usage percentage
- **Visual analytics**: Character representations and color-coded wave themes for each profile
- **Historical data**: Analysis timestamp and tracking period information

## Key Features

- **Privacy-Focused**: All data processing respects Android's usage stats permissions
- **Customizable Tracking**: Choose your tracking duration (in days) with flexible start dates
- **Intelligent API Integration**: 
  - 90-second timeout to accommodate backend cold starts
  - Automatic retry logic for failed requests
  - Error handling with detailed feedback
- **Real-Time Status**: Track collection progress with start date, collected days, and remaining days
- **Category Analytics**: View top 5 app categories with usage percentages
- **Profile Visualization**: Character-based representations with color-coded wave themes
- **Debug Mode**: Development tools for testing and troubleshooting
- **Persistent State**: Analysis results stored in context for cross-screen access
- **Expo Router**: File-based navigation with typed routes

## Technical Stack

- **Framework**: React Native 0.81.5 with Expo SDK 54
- **Language**: TypeScript 5.9.2
- **Navigation**: Expo Router 6.0 (file-based routing with typed routes)
- **UI Components**: 
  - Custom components with Poppins typography (@expo-google-fonts/poppins)
  - React Native SVG for vector graphics
  - Reanimated 4.1 for animations
- **State Management**: React Context API (AnalysisContext)
- **Android APIs**: 
  - expo-android-usagestats (usage statistics collection)
  - @quibr/react-native-screen-time-api (screen time tracking)
- **Permissions**: PACKAGE_USAGE_STATS
- **Backend**: REST API integration with ML analysis endpoint
- **Build System**: Gradle with Android SDK
- **Dev Tools**: ESLint, patch-package for package modifications

## Installation & Setup

### Prerequisites
- Node.js (LTS version recommended)
- Android SDK and Android Studio (for Android development)
- Expo CLI

### Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure API (Optional)**
   
   Create a `.env.local` file in the root directory:
   ```bash
   EXPO_PUBLIC_API_URL=https://your-api-url.com
   ```
   
   If not set, defaults to `https://statera-api.onrender.com`

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on Android**

   ```bash
   npm run android
   ```
   
   Or press `a` in the Expo terminal to launch on Android emulator/device

## Building APK

### Release APK (Production)
Build a production-ready APK for distribution:

```bash
npm run android:release:apk
```

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

### Debug APK
For local testing and development:

```bash
npm run android:debug:apk
```

**Output**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Notes
- Release builds require proper signing configuration in `android/app/build.gradle`
- Ensure you have the correct keystore configured for production releases
- APKs can be installed directly on Android devices via ADB or file transfer

## User Workflow

1. **Get Started** → Introduction to Statera
2. **Usage Permission** → Enable PACKAGE_USAGE_STATS in system settings
3. **GWA Input** → Enter academic performance (General Weighted Average)
4. **Tracking Duration** → Set data collection period (default: 7 days)
5. **Data Collection** → App collects usage statistics in the background
6. **Analysis** → Submit data to backend for ML processing
7. **Results** → View dominant profile, category breakdown, and insights
8. **Overview** → Access detailed statistics and app settings

## Project Structure

```
app/                    # Expo Router pages (file-based routing)
├── (tabs)/            # Tab navigation screens
│   ├── get_started.tsx          # Welcome/onboarding screen
│   ├── gwa_input.tsx            # GWA (academic grade) input
│   ├── data_connected.tsx       # Permission and data connection
│   ├── usage_request.tsx        # Usage stats permission request
│   ├── instruction_page.tsx     # App instructions
│   ├── loading_page.tsx         # Data loading state
│   ├── modal/
│   │   └── how_it_works.tsx     # Modal explaining app functionality
│   └── navigation-pages/
│       ├── analysis.tsx         # ML analysis results display
│       ├── overview.tsx         # Usage overview and statistics
│       ├── settings.tsx         # App settings and preferences
│       ├── tracking_duration.tsx # Configure tracking period
│       ├── about_statera.tsx    # About the app
│       └── meet-the-team.tsx    # Team information
├── (debug)/                     # Development/debug screens
│   └── debug_stats_page.tsx     # Debug statistics viewer
├── _layout.tsx                  # Root layout configuration
├── _loading_screen.tsx          # App loading screen
├── index.tsx                    # Entry point
└── nav.tsx                      # Navigation configuration
services/              # Business logic and API integration
├── api-client.ts      # API client with timeout/retry logic
├── api-config.ts      # API configuration and endpoints
├── api-types.ts       # TypeScript types for API requests/responses
├── api-usage-example.ts # Usage examples for API client
├── data-collection.ts # Android usage statistics collection
├── usage-stats.ts     # Usage stats API wrapper and utilities
├── behavioral-profile.ts # Profile configurations and mappings
├── gwa-storage.ts     # GWA persistent storage
├── last-active-tab.ts # Tab navigation persistence
└── tracking-duration.ts # Tracking period management
context/               # React Context for global state
└── AnalysisContext.tsx # ML analysis results and collected data
components/
├── ui/                # Reusable UI components
│   ├── primary-button.tsx
│   ├── secondary-button.tsx
│   ├── confirm-modal.tsx
│   ├── screen-header.tsx
│   ├── collapsible.tsx
│   └── icon-symbol.tsx
└── ...                # Other shared components
assets/
└── images/
    ├── state_characters/  # Profile character illustrations
    └── waves/             # Background wave graphics
```

## Required Permissions

- **PACKAGE_USAGE_STATS**: Required to access app usage data on Android
  - Users must manually enable this in system settings
  - The app guides users through this process via the usage_request screen
  - Permission is checked via `hasUsageStatsPermission()` from expo-android-usagestats

## API Configuration

The app communicates with a backend ML service for behavioral analysis:

### Endpoint
- **Production**: `https://statera-api.onrender.com`
- **Endpoint**: `POST /getMl/`
- **Configuration**: Set `EXPO_PUBLIC_API_URL` environment variable to override default

### Request Format
```typescript
{
  gwa: number;                    // Academic grade (0-5 scale)
  trackingDurationDays: number;   // Days of data collected
  totalScreenTime: number;        // Total seconds across all apps
  totalAppsTracked: number;       // Number of apps used
  pickups: number;                // Screen activation count
  deviceUnlocks: number;          // Lock screen bypass count
  apps: [
    {
      packageName: string;
      totalTimeInForeground: number;  // Seconds in app
    }
  ];
  collectionTimestamp: string;    // ISO 8601 DateTime
  platform: string;               // "android"
}
```

### Response Format
```typescript
{
  score: number;                  // Dominant profile confidence (0-1)
  label: string;                  // Profile name (e.g., "AcademicAtRisk")
  categoryScores: {               // Top 5 app categories
    [category: string]: number;   // Usage percentage
  };
  dateAnalyzed: string;           // ISO 8601 DateTime
}
```

### API Features
- **Timeout**: 90 seconds (accommodates cold starts on free-tier hosting)
- **Retry Logic**: Automatically retries once on timeout
- **Error Handling**: Structured error responses with descriptions

## Development Notes

- **Platform**: Android only (requires system-level usage stats APIs)
- **Minimum SDK**: Check [android/build.gradle](android/build.gradle) for target SDK version
- **Package Name**: `com.wincelpogi.statera`
- **File-based routing**: Uses Expo Router for navigation with typed routes enabled
- **Type safety**: Full TypeScript implementation with strict mode
- **New Architecture**: Enabled via `newArchEnabled: true` in app.json
- **React Compiler**: Experimental React Compiler enabled for optimizations
- **Patches**: Uses patch-package for modifying node_modules (see `patches/` directory)

### Debug Features
Access [app/(debug)/debug_stats_page.tsx](app/(debug)/debug_stats_page.tsx) for development tools:
- View raw collected data
- Test API connections
- Inspect usage statistics
- Debug permission states

## Behavioral Profiles

The ML backend classifies users into one of six profiles based on usage patterns and academic performance:

| Profile | Key | Description |
|---------|-----|-------------|
| **Academic at Risk** | `academic_at_risk` | High digital usage patterns associated with academic challenges |
| **Average Balanced User** | `balanced` | Healthy balance between digital consumption and academic performance |
| **Digital Multitasker** | `digital_multitasker` | Frequent app switching and task juggling behaviors |
| **Digital Self-Regulated** | `digital_self_regulated` | Strong self-control and intentional device usage |
| **High-Functioning Academic** | `high_functioning_academic` | Excellent academic performance with managed digital habits |
| **Minimal Digital Engager** | `minimal_digital_engager` | Limited device usage and screen time |

Each profile has:
- Unique character illustration (in `assets/images/state_characters/`)
- Color-coded wave theme (top and bottom colors)
- Title display format (two-line layout)
- Associated usage patterns and recommendations

## Data Flow

```
User Input (GWA) 
    ↓
Android System (Usage Stats)
    ↓
Data Collection Service
    ↓
API Client (with retry logic)
    ↓
Backend ML Service
    ↓
Analysis Context (global state)
    ↓
UI Components (analysis & overview screens)
```

## Resources

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [Android UsageStatsManager](https://developer.android.com/reference/android/app/usage/UsageStatsManager)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Key Dependencies
- [expo-android-usagestats](https://www.npmjs.com/package/expo-android-usagestats) - Android usage statistics
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [React Native SVG](https://github.com/software-mansion/react-native-svg) - SVG support
- [@expo-google-fonts/poppins](https://github.com/expo/google-fonts) - Typography

## Contributing

This is a research project for understanding student digital behavior patterns. For questions or contributions, please contact the development team.

## License

This project is part of academic research at [Institution Name]. All rights reserved.

---

**Built with ❤️ for students seeking better digital wellness**
