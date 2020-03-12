/**
 * Created by en20 on 2020/3/11.
 */
module.exports = {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "clean": "cd ./android && gradlew clean",
    "open-release-folder": "start android\\app\\build\\outputs\\apk\\release",
    "open-debug-folder": "start android\\app\\build\\outputs\\apk\\debug",
    "release": "cd android && ./gradlew assembleRelease && npm run open-release-folder",
    "release-test": "react-native run-android --variant=release",
    "pod-install": "cd ios && pod install --verbose --no-repo-update",
    "test": "jest",
    "git-reset-master": "git reset master --hard",
    "git-push-master": "git push origin master",
    "git-push": "git push origin --all",
    "eslint-fix": "eslint . --fix",
}
