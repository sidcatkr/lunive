---
title: "Building Legato"
date: "2026-03-03"
description: "How we built Legato — a Discord music bot that moves control out of chat commands and into a purpose-built web UI for queue management, search, lyrics, and volume."
subtitle: "Moving music control out of the chat and into a real interface."
tags: ["legato", "discord", "music", "product"]
featured: true
heroMedia:
  type: image
  src: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80
  alt: Headphones resting on a wooden desk
---

Most Discord bots ask you to live inside a text box. Want to play a song? Type a command. Want to skip it? Type another. Want to see what's coming up in the queue? Hope you remember, because there is no good way to look.

Legato is Lunive's first shipped product, and it started with a simple frustration: managing music through chat commands is a workaround, not an experience. The bot exists, but the real product is the web interface that comes with it — a dedicated dashboard where you can actually see and control everything that is happening.

This is the story of what we built, why the web UI is the point, and what we learned putting it together.

![Headphones resting on a wooden desk beside soft ambient light](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80 "Listening together should feel effortless.")

## The Problem with Chat-Based Control

Slash commands are a reasonable starting point. They are fast to type, discoverable, and they work without any setup on the user's side. For a one-off action — joining a channel, playing a specific track — they are fine.

The problem appears the moment you want to do anything more than the simplest thing. You cannot see your full queue at a glance. Reordering tracks means remembering position numbers and running move commands. Searching for something mid-session means pausing whatever you were doing, typing a query into chat, reading results back as text, and then issuing another command to actually play it. The feedback loop is slow and the mental overhead accumulates.

Legato's thesis is that music control deserves its own interface. Not a text box. A surface that is built around the task — where queue, search, playback, lyrics, and volume are all visible and reachable at once, without any commands at all.

## What the Web UI Provides

When you run `/play` in Discord, Legato joins your voice channel and sends back a URL — a unique dashboard for that listening session. Open it on any browser and you are looking at everything you need in one place.

Search is there: type a song name or paste a URL and results appear immediately. The queue is visible in full, and you can reorder it by dragging tracks up and down. Playback controls — play, pause, skip, go back, shuffle, repeat — are always on screen. Real-time lyrics scroll alongside whatever is playing. Volume is a slider, not a command.

Every action on the web dashboard is reflected in Discord instantly through a WebSocket connection. The bot and the interface are always in sync. If someone skips a track from the dashboard, the voice channel responds immediately — no lag, no polling, no refresh required.

## How It Was Built

Legato is a pnpm monorepo with two main pieces: a Discord bot built on Discord.js and a Next.js web application for the dashboard. A dedicated WebSocket server sits between them, passing state back and forth in real time. TypeScript is used throughout — not as ceremony, but because the complexity of keeping bot and dashboard in sync made type safety genuinely useful rather than optional.[^1]

Audio streaming runs through yt-dlp and FFmpeg on the server side. Lyrics are fetched and matched via the Genius API or web crawling, handled in `LyricsService.ts`. In production, Nginx proxies both the Next.js app and the WebSocket endpoint, with PM2 managing the processes.

The project was built as a study in AI-assisted programming, and we want to be honest about that. The AI agent handled a lot of the scaffolding and boilerplate. The architectural decisions, the debugging, the judgment calls about what the product should actually do — those remained ours. Building with an AI agent shifts the work, but it does not remove it.[^2]

## Coding with AI

Coding with AI can genuinely improve your productivity. The feedback loop gets shorter, the boilerplate disappears faster, and features that would have taken days can take hours. But there is a real risk in letting AI do everything — the project drifts away from you, and so does your understanding of it. You end up with code you cannot explain, architecture you cannot defend, and bugs you cannot debug. The productivity gain turns into technical debt you do not even recognise as debt.

Legato is partly built with AI. I am a university student, and backend systems and server-side infrastructure are not where I am strongest. But I did not hand the project over and walk away. I studied the concepts first, wrote code myself, and then improved it with AI. When the AI produced something I did not understand, I did not just accept it — I sat with it, asked questions, and made sure I could explain what it was doing and why before moving on. That process was slower than just letting it run. It was also the point.

AI tooling is moving fast. Agents can now browse websites and take actions on your behalf. Editors like Cursor and Claude Code can build entire features from a description. The capability ceiling is rising quickly, and it will keep rising. But the most important thing that has not changed is this: if you are building something, you need to understand it. AI works best as a partner — something that extends what you can do, not something that does it instead of you. The moment you stop understanding your own project, you have stopped building it. You have just been watching someone else build it for you.

## Conclusion

Legato is a small product that solves a real frustration. Chat commands are fine for bots that do simple things. For something like music — where you want to browse, reorder, watch lyrics, and adjust volume without interrupting a conversation — they fall short.

The web UI is not a bonus feature bolted onto a bot. It is the reason the bot exists. The slash commands are how you get started; the dashboard is where you actually live. That distinction shaped every decision we made while building it.

[^1]: The monorepo uses separate TypeScript configs for the bot (`tsconfig.bot.json`) and the Next.js app (`tsconfig.json`), letting each target the right runtime while sharing types from `src/shared/`.

[^2]: This is documented plainly in the repository itself. We think that kind of transparency matters more as AI-assisted development becomes the norm rather than the exception.
