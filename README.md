# wunder

## Clone the repo

```bash
git clone https://github.com/omer-to/wunder.git
cd wunder
```

## Install dependencies

```bash
npm install
```

## Install Pods

```bash
cd ios && npx pod install && cd ..
```

## Run on iOS

[You need to have your iOS environment set up](https://reactnative.dev/docs/environment-setup)

### Simulator

Run the project on simulator of your choice (e.g. iPhone 12 here)
```bash
npx react-native run-ios --simulator="iPhone 12"
```

### Device

Connect your iPhone via USB,
Navigate to ios folder relative to the project root.
Double tap on `wunder.xcworkspace` to open the project on Xcode.
From top menu bar click on `Navigate > Reveal in Project Navigator`.
From the navigator, choose the top most folder. Go to `Signing and Capabilities` and add your development team

Issue the following code from the command line:

```bash
npx react-native --device "your_iPhone_name"
```

## Run on Android
[You need to have your Android environment set up](https://reactnative.dev/docs/environment-setup)

```bash
npx react-native run-android
```
