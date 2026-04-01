# Abel Insurance Group Android App

Native Android app for Abel Insurance Group, built with Kotlin and Jetpack Compose.

## What is in this build

- Bottom navigation with dedicated Home, Coverage, Service, and Contact screens
- Native in-app quote/contact form instead of relying on website quote/contact pages
- Website-aligned home screen with the real Abel wordmark, favicon, and site palette
- Abel-specific photography integrated into the app experience
- Texture-backed hero styling inspired by the live Abel website
- Coverage sections for personal, business, and industry insurance
- Quick actions for quote request, phone, email, and client portal access
- In-app service center webview for:
  - Client portal only
- Buckhannon office contact information, directions, and social links
- Hardened release build with dedicated release signing, minification, and resource shrinking

## Build details

- Application ID: `com.abelinsgroup.mobile`
- Min SDK: 26
- Target SDK: 34
- Version: `3.2.0`

## Build locally

On Windows PowerShell:

```powershell
$env:JAVA_HOME='c:\Users\adary\Downloads\APK\tooling\jdk-17.0.18+8'
$env:ANDROID_HOME='c:\Users\adary\Downloads\APK\tooling\android-sdk'
$env:ANDROID_SDK_ROOT='c:\Users\adary\Downloads\APK\tooling\android-sdk'
.\gradlew.bat assembleRelease
```

## Release artifact

The signed installable APK produced for this release is:

- `app/build/outputs/apk/release/abel-insurance-group-3.2.0.apk`

## Notes

- The release APK is signed with a dedicated local release keystore configured through ignored `local.properties` values.
- Abel Insurance Group site links and contact flows are used as in-app destinations for the service center webview.
- Version 3.2.0 adds bottom navigation, native intake flows, and hardened release signing.

## Project structure

```text
app/src/main/java/com/agentic/android/
├── MainActivity.kt
└── ui/theme/

app/src/main/res/
├── drawable/
├── drawable-nodpi/
├── mipmap-anydpi-v26/
└── values/
```
