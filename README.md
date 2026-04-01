# Abel Insurance Group Android App

Native Android app for Abel Insurance Group, built with Kotlin and Jetpack Compose.

## What is in this build

- Website-aligned home screen with the real Abel wordmark, favicon, and site palette
- Abel-specific photography integrated into the app experience
- Texture-backed hero styling inspired by the live Abel website
- Coverage sections for personal, business, and industry insurance
- Quick actions for quote request, phone, email, and client portal access
- In-app service center webview for:
  - Client portal
  - Contact form
  - Personal quote form
  - Commercial quote form
  - Life quote flow
- Buckhannon office contact information, directions, and social links

## Build details

- Application ID: `com.abelinsgroup.mobile`
- Min SDK: 26
- Target SDK: 34
- Version: `3.1.2`

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

- `app/build/outputs/apk/release/abel-insurance-group-3.1.2.apk`

## Notes

- The release APK in this repo was signed with the local Android debug keystore available on the build machine so it can be installed directly.
- Abel Insurance Group site links and contact flows are used as in-app destinations for the service center webview.
- Version 3.1.2 adds breakpoint-aware responsiveness for narrow phones, landscape layouts, and wider screens.

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
