package com.<%= projectName %>;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // 启动页 here

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // 启动页 here

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "<%= projectName %>";
  }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // 启动页 here
        super.onCreate(savedInstanceState);
    }
}
