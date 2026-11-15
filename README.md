# Sleeper Build PWA

This folder contains your existing Sleeper Build Tracker packaged as an installable Android Progressive Web App. The workout program, logger, rest timer, protein tracker, form cues, history and CSV export are preserved.

## Publish free with GitHub Pages
1. Create a GitHub repository (for example `sleeper-build`).
2. Upload **all files and folders inside this folder** to the repository root. Do not upload only `index.html`.
3. In the repository, open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to publish, then open the published HTTPS address in Chrome on your Android phone.
6. Open the app once while online and allow a few seconds for offline assets to cache. Reload it once, then use Chrome's menu → **Install app** (or **Add to Home screen**).

## Offline behaviour
The service worker caches the app shell and the original CDN libraries (React, ReactDOM, Babel, Tailwind and Lucide). The first visit and initial cache setup require internet. After the first successful online visit/cache, reopen the installed app once while online to ensure the service worker controls it. It should then load offline.

Workout logs, max lifts, current week and daily protein are stored in this browser's local storage on this website. They are not synced to another device. Avoid clearing Chrome's site data unless you have exported your workout history.

## Updating
Upload replacement files to the same repository. The service worker will install the updated cache on the next visit. If an update seems stuck, close and reopen the app while online.
