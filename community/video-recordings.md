---
sidebar_position: 8
---

# Video recording guidelines

Every time Capact gets a brand-new user-facing feature, we record a video showcasing it. The videos will be publicly available on our [YouTube channel](https://www.youtube.com/channel/UCajXtDttqVuZ_Bl7M3_qA8w).
This document describes the guidelines and configuration needed for video recording.

## Guidelines

- Record the video with [OBS Studio](https://obsproject.com) using our [recommended configuration](#obs-studio).
- If needed, edit the video with [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve/studio) or similar tool.
- In a separate text file, write title, description and tags for the recording. The metadata will be used for video publish on social media.
- When publishing the video:
    - Select the intro as a video thumbnail,
    - Add [YouTube Video Chapters](https://support.google.com/youtube/answer/9884579?hl=en).

## Tools configuration

This section describes how to configure recommended tooling for preparing Capact-related videos.

### OBS Studio

Follow the steps to prepare OBS Studio for recording Capact videos.

1. Configure OBS Studio following the [Best OBS Recording Settings](https://www.youtube.com/watch?v=RtDQDbPTd9E) video tutorial.

    - Set Base (Canvas) resolution and Output (Scaled) resolution to 1920x1080.

1. Import Capact scene collections.

    1. Download [Fira Sans](https://fonts.google.com/download?family=Fira%20Sans) and [Barlow](https://fonts.google.com/download?family=Barlow) fonts from Google Fonts website.
    1. Unzip and apply them in your system. For example, on macOS, open Font Book and drag all the files to User or Computer fonts.
    1. Download the [ZIP file with scene collections and assets](./assets/obs-studio-capact.zip).
    1. Run the following commands:

        ```bash
        mkdir -p /Users/Shared/obs-studio/capact
        unzip ~/Downloads/obs-studio-capact.zip -d /Users/Shared/obs-studio
        ```

    1. In OBS Studio, from the menu bar, select **Scene Collection** and click **Import**. Import the following scene collections:

        - `capact-default` from `/Users/Shared/obs-studio/capact/capactdefault.json`
        - `capact-blue` from `/Users/Shared/obs-studio/capact/capactblue.json`

    1. Switch to the `capact-default` Scene collection. Select again **Scene Collection** and then **`capact-default`**. All assets should be properly loaded.

    1. Set proper sources for Webcam and Display Capture. Edit title, descriptions and presenter info.

1. **(Optional)** Set up hotkeys to switch between different scenes (next / previous scene):

    1. Download script to set hotkeys to switch between scenes:

        ```bash
        mkdir -p /Users/Shared/obs-studio/capact/scripts/
        curl https://raw.githubusercontent.com/SimonGZ/OBS-next-scene-hotkey/v1.3/next-scene.lua -o /Users/Shared/obs-studio/capact/scripts/next-scene.lua
        ```
    
    1. In OBS Studio, from the upper menu, select **Tools** and **Scripts**. Load the downloaded script with **+** button and click **Close**.
    1. Now you can set up the hotkeys. In OBS Studio, from the upper menu, select **OBS**, then **Preferences**. Navigate to the **Hotkeys** tab and set **Next Scene** and **Previous Scene** shortcuts. For example, you can set Control + Command + `,` and Control + Command + `.`


### DaVinci Resolve

To learn how to use DaVinci Resolve for video editing, see the [How to use DaVinci Resolve 17 - Tutorial for Beginners](https://www.youtube.com/watch?v=UguJiz9AYM8) video tutorial.


