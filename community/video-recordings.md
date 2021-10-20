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
    1. Create target directory:

        > **NOTE:** The scene collection refer to assets placed in the `/Users/Shared/obs-studio` directory. The path might not be used on different operating systems. In that case, use different path and, after importing the scene collection into OBS Studio, manually update the paths to assets embedded in the scenes.

        ```bash
        mkdir -p /Users/Shared/obs-studio
        ```

    1. Unzip the ZIP archive into the target directory, created in previous step.

        You can use the following command:

        ```bash
        unzip {archive_path} -d /Users/Shared/obs-studio
        ```

    1. In OBS Studio, from the menu bar, select **Scene Collection** and click **Import**. Import the following scene collections:

        - `capact-default` from `/Users/Shared/obs-studio/capact/capactdefault.json`
        - `capact-blue` from `/Users/Shared/obs-studio/capact/capactblue.json`

    1. Switch to the `capact-default` Scene collection. Select again **Scene Collection** and then **`capact-default`**. All assets should be properly loaded.

    1. Set proper sources for Webcam and Display Capture.

    1. Verify the audio input configuration on the **Audio Mixer** panel:
    
        - Make sure it points to a proper device that will record your voice.
        - If you don't see any item on the list, on the **Sources** panel click **+** and select **Audio Input Capture**.
        - You may need to lower the volume of audio input, to avoid sound distortions.

    1. Edit title, descriptions and presenter info for some of the scenes.

1. **(Optional)** Set up hotkeys to switch between different scenes (next / previous scene):

    The Capact scene collection automatically installs the [`OBS-next-scene-hotkey`](https://github.com/SimonGZ/OBS-next-scene-hotkey) script. This allows you to switch the scenes back and forth using the same keyboard shortcuts.
    
    In OBS Studio, from the upper menu, select **OBS**, then **Preferences**. Navigate to the **Hotkeys** tab and set **Next Scene** and **Previous Scene** shortcuts. For example, on Macs you can use `Control + Command + ,` and `Control + Command + .`.

### DaVinci Resolve

To learn how to use DaVinci Resolve for video editing, see the [How to use DaVinci Resolve 17 - Tutorial for Beginners](https://www.youtube.com/watch?v=UguJiz9AYM8) video tutorial.


