# Getting Started in iOS

## Prerequisites

### On your Mac
- Install latest XCode (Appstore)
- Having up to date node installed (v22 is ok, check with `node -v`)
  - For first installation run `brew install node`
  - For upgrade run `brew upgrade node`

### On your iPhone
- Enable Dev mode: Settings -> Privacy & Security (scroll to bottom)
  - See the Expo Docs for more detailed information: https://docs.expo.dev/guides/ios-developer-mode/

#### Recommendation: Network Debugging
It is recommended to enable network debugging, alternatively you can connect your device with your Mac via cable.

- Setup Network Debugging: https://stackoverflow.com/questions/44382841/how-do-you-perform-wireless-debugging-in-xcode-9-with-ios-11-apple-tv-4k-etc#answer-44383502
  - Open XCode -> Window -> Devices & Simulators (CMD + Shift + 2)
  - Connect your device via cable
  - Click on your device in XCode -> Check "Connect via Network"
  - After XCode is done pairing, you can disconnect your device and use Network Debugging

### In this repo
- Having a `.env.local` file which is structure like the `.env.test` file, but has real values in it (ask a dev for those values).

## Starting the app

*NOTE*: When launching an App at first on a device, keep XCode open, it will ask you for permission to debug on your device.
*NOTE*: It is recommended to keep your iPhone unlocked for this step.

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo run:ios --device
   ```

*NOTE*: This will likely fail at first, since you need to configure the following:

- Manage Signing
  1. The task should have created an `ios` folder in this repository. Open it in Xcode.
  2. Click on `canbase-app` and navigate to "Certificates, Signing & Profiles"
  3. Check "Enable automatic signing" and select your personal account or Team account to sign your app
- Trust the App on your iPhone (run `npx expo run:ios` again after having completed the steps above)
  - Go to Settings -> General -> VPN & Device Management -> Choose Dev Account & App -> Trust

If the build still fails, you can also run it in XCode, this can be more reliable, since it can handle missing permissions better then expo.
