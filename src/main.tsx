// main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils";
import { BuilderSettingsProvider } from "./CometChat/context/BuilderSettingsContext";

// 1. Set data-theme attribute early
if (!document.body.hasAttribute('data-theme')) {
  document.body.setAttribute('data-theme', 'default');
}

// 2. CometChat constants
export const COMETCHAT_CONSTANTS = {
  APP_ID: "273899c1289f9dfc",
  REGION: "in",
  AUTH_KEY: "4bf50b9dc5030a51f5314bd5c1a4618786131ca9",
};

// 3. Build UIKit settings
const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

// 4. Init CometChatUIKit
CometChatUIKit.init(uiKitSettings)?.then(() => {
  setupLocalization();

  const UID = "cometchat-uid-3";

  CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

    if (!user) {
      CometChatUIKit.login(UID)
        .then((loggedUser: CometChat.User) => {
          console.log("Login Successful:", loggedUser);
          root.render(
            <BuilderSettingsProvider>
              <App />
            </BuilderSettingsProvider>
          );
        })
        .catch((error) => console.error("Login Failed:", error));
    } else {
      console.log("User already logged in:", user);
      root.render(
        <BuilderSettingsProvider>
          <App />
        </BuilderSettingsProvider>
      );
    }
  });
});
