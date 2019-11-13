package com.adooretail;
import android.os.Bundle;
import android.view.View;
import org.devio.rn.splashscreen.SplashScreen;
import com.cboy.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hideNavigationBar();
        SplashScreen.show(this);
    }

  @Override
    public void onWindowFocusChanged(boolean hasFocus) {
      super.onWindowFocusChanged(hasFocus);
      if (hasFocus) {
          hideNavigationBar();
      }
  }

  private void hideNavigationBar() {
      getWindow().getDecorView().setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
          | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
  }


  @Override
  protected String getMainComponentName() {
    return "adooretail";
  }
}
