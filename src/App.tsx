import { Assets as NavigationAssets } from "@react-navigation/elements";
import { defaultConfig } from "@tamagui/config/v4"; // for quick config install this
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { createTamagui, TamaguiProvider } from "tamagui";
import { APIProvider } from "./api/common/provider";
import { Navigation } from "./navigation";

const config = createTamagui(defaultConfig);

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <APIProvider>
      <TamaguiProvider config={config}>
        <Navigation
          linking={{
            enabled: "auto",
            prefixes: [
              // Change the scheme to match your app's scheme defined in app.json
              "helloworld://",
            ],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </TamaguiProvider>
    </APIProvider>
  );
}
