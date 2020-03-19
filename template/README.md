<h1><%= projectName %></h1>

<%= projectDescription %>

根据官方的 `react-native init AwesomeProject` 生成项目,集成`mobx`,`react-native-router-flux`路由,`react-native-root-toast`弹窗.

# 1. 目录结构
```text
├─api
├─assets  // 静态资源(图片,音频等)
│  └─img
│      └─icon
├─components  // 自定义组件
│  ├─Divider
│  └─XButton
├─mobx  // 状态的存储和管理
├─router  // 路由文件
├─style  // 
│  └─util
├─utils  // 
└─views  // 所有前台页面
    ├─tab  // 底部 tab 栏对应的页面
    │  ├─home
    │  └─Mine
    ├─TTTTTTTest  // 其他页面
    │  ├─index.js  // 页面代码
    │  └─style.js  // 页面样式
```

# 2. Install

# 3. 路由 & 状态
## 3.1. 路由 [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
文档: https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md

## 3.2. 状态管理 
[mobx-react](https://github.com/mobxjs/mobx-react)
- [React-Native + Mobx一步步构建项目](https://segmentfault.com/a/1190000014165693)
- [mobx 官方文档](https://mobx.js.org/refguide/observer-component.html)


# 4. 初始化项目
1. 初始化项目: react-native init cy[projectname]

# 5. 关于打包
<https://reactnative.cn/docs/signed-apk-android/>

## 5.1. 生成一个签名密钥
你可以用keytool命令生成一个私有密钥。在 Windows 上keytool命令放在 JDK 的 bin 目录中（比如C:\Program Files\Java\jdkx.x.x_x\bin），你可能需要在命令行中先进入那个目录才能执行此命令。

    keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

这条命令会要求你输入密钥库（keystore）和对应密钥的密码(本项目以 `123456` 为例)，然后设置一些发行相关的信息。最后它会生成一个叫做my-release-key.keystore的密钥库文件。


## 5.2. 设置 gradle 变量
把my-release-key.keystore文件放到你工程中的android/app文件夹下。
编辑项目目录/android/gradle.properties（项目配置，只对所在项目有效）。如果没有gradle.properties文件你就自己创建一个，添加如下的代码（注意把其中的123456替换为相应密码）
```text
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=123456
MYAPP_RELEASE_KEY_PASSWORD=123456
```

## 5.3. 把签名配置加入到项目的 gradle 配置中
编辑你项目目录下的android/app/build.gradle，添加如下的签名配置：
```text
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        // 1. release 签名配置
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            // 2. 修改 release 签名配置
            signingConfig signingConfigs.release
        }
    }
}
...
```

***
执行`yarn run release`会开始打包 release,并在完成后自动打开所在文件夹

rn 打包的测试 apk: android\app\build\outputs\apk\debug

rn 打包的正式 apk: android\app\build\outputs\apk\release

npm script 执行 `yarn run open-release-folder` 可以打开对应文件夹


## 5.4. 重命名 release 的包名
修改 `app/build.gradle`,找到 `variant.outputs.each` 在遍历的{}最底部增加
```text
    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            ...

            // 重命名包名,中文会导致无法安装
            def date = new Date()
            def formattedDate = date.format('yyyyMMdd-HHmmss')
            // applicationId 和版本定义在上面 defaultConfig
            output.outputFileName = "${applicationId}_v${versionName}_${formattedDate}.apk"
        }
    }
```
打出的包名为 `com.rn61test_v1.0.0_20191109-221253.apk`

# 6. 插件集成
## 6.1. 弹窗提示
[react-native-root-toast](https://github.com/magicismight/react-native-root-toast). 

已经在入口 `index.js` 全局挂载,在项目里直接调用 `$warn` 即可
## 6.2. 图片选择,拍照
按照文档配置,添加权限

https://github.com/syanbo/react-native-syan-image-picker

可能需要修改 `minSdkVersion` 16 => 17

IOS 权限 项目目录->Info.plist->增加
```text
	<key>NSCameraUsageDescription</key>
	<string>需要访问相机</string>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>我们需要通过您的地理位置信息获取您周边的相关数据</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>请求保存图片到相册</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>请允许访问相册以选取照片</string>
```
## 6.3. 安卓和 IOS 都能用的 ActionSheet
无需重新打包 
https://github.com/gaoxiaosong/react-native-general-actionsheet

<img src="https://github.com/gaoxiaosong/react-native-general-actionsheet/raw/master/resource/iOS-2-P.png" height="400px">

## 6.4. 安装后导致 react-native-root-toast 无效.

因为你装了两次 react-native-root-siblings,一个4.0,一个3.x

解决办法: 固定版本 "react-native-root-toast": "3.1.2"


## 6.5. 启动页
```text

```
# 7. 常见问题
## 7.1. Android 9 无法联网
因为谷歌要求默认使用加密连接.
在res下新建一个xml目录 创建名为 `network_security_config.xml` 文件 ，该文件内容如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```
然后在 AndroidManifest.xml application 标签内应用上面的xml配置：
`
android:networkSecurityConfig="@xml/network_security_config"
`

## 7.2. 在 Android 上支持 GIF 和 WebP 格式图片
默认情况下 Android 是不支持 GIF 和 WebP 格式的。你需要在android/app/build.gradle文件中根据需要手动添加以下模块：
```
dependencies {
  // 如果你需要支持Android4.0(API level 14)之前的版本
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // 如果你需要支持GIF动图
  implementation 'com.facebook.fresco:animated-gif:2.0.0'

  // 如果你需要支持WebP格式，包括WebP动图
  implementation 'com.facebook.fresco:animated-webp:2.1.0'
  implementation 'com.facebook.fresco:webpsupport:2.0.0'

  // 如果只需要支持WebP格式而不需要动图
  implementation 'com.facebook.fresco:webpsupport:2.0.0'
}
```

## 7.3. 在 FlatList/ScrollView 中 margin 不生效,重叠了怎么办?
给 FlatList/ScrollView 组件添加
```
    contentContainerStyle={{paddingBottom:xxx}}
```

## 7.4. mobx 中的数据不能响应
检查是否有给组件添加 `@observer` ,用于渲染 mobx 数据的下级组件同样需要添加 `@observer` 


## 7.5. ios 报错 No bundle URL present
检查是否有给组件添加 `@observer` ,用于渲染 mobx 数据的下级组件同样需要添加 `@observer` 

1. 删除: main.jsbundle
2. 新建一个文件，选择 Other -> Empty,保存为 main.jsbundle
3. 运行命令: react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

等待执行完成，重新打包 run-ios


# 8. License
MIT
