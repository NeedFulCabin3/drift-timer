# Drift Timer

An absolute-time countdown utility designed to eliminate background tab throttling and timer inaccuracy in standard web browsers.

## Overview
Most web timers rely on straightforward `setInterval` counters that tick once every second. The moment a user switches tabs or minimizes their browser window, Chromium and WebKit throttles JavaScript timers to preserve system resources. This causes standard interval counts to drift significantly out of sync with real-world time.

`drift-timer` bypasses interval throttling entirely. Instead of counting ticks down one by one, it records an absolute Unix timestamp target in memory upon initialization and calculates the delta on every frame check.

## How It Works
1. **Target Calculation:** When triggered, the application converts hours, minutes, and seconds inputs into total milliseconds and adds them to `Date.now()`, establishing an absolute target epoch (`endTime`).
2. **Delta Checking:** A fast 200ms `setInterval` triggers a calculation loop that subtracts `Date.now()` from `endTime`.
3. **Display Rendering:** The resulting millisecond difference is formatted back to standard `HH:MM:SS` padded strings using `Math.ceil()`.
4. **State Persistence:** Pausing captures the exact remaining time delta (`timeLeft`). Resuming re-calculates a fresh `endTime` anchored to the moment of resumption.

## Key Features
* **Throttling Resistant:** Maintains accuracy across browser tab switches, background suspensions, and CPU speed shifts.
* **Pause and Resume Mechanics:** Dynamic state tracking keeps remaining delta intact without resetting inputs.
* **Auto-Correction on Blur:** Input fields auto-sanitize negative values or empty states down to zero when focus leaves the box.
* **Visual Alerting:** Triggers CSS keyframe pulse animations and structural color changes when the countdown reaches zero.

## Tech Stack
* **Language:** Standard ECMAScript (ES6+)
* **Styling:** Custom CSS Variables & Keyframe Animations
* **Markup:** HTML5

## Browser-Based Quick Start
You can work on and test this codebase entirely in your browser using GitHub Codespaces.

1. Press `.` on your keyboard while viewing this repository to launch the Web Editor, or click **Code** > **Codespaces** > **Create codespace on main**.
2. Open `index.html`.
3. Install the "Live Server" extension in the Codespace side panel.
4. Click **Go Live** on the bottom status bar to preview the application live in your browser.

## Repository Structure

```text
drift-timer/
├── .github/
│   └── workflows/
│       └── code-health.yml   # Runs static analysis on JavaScript and HTML/CSS structure
├── .gitignore                # OS-specific, IDE, and temporary cache exclusions
├── index.html                # Main application markup layout
├── script.js                 # Target timestamp math and state machine logic
├── style.css                 # Custom variables, layout system, and alert states
└── README.md                 # Project technical documentation
```

## Roadmap

[ ] Persistent state recovery via localStorage on page refresh.

[ ] Audio chime trigger using Web Audio API on countdown completion.

[ ] Keyboard shortcut binding (Spacebar for start/pause, 'R' for reset).

```"Time is an illusion. Timers double down on it."```
