## v0.1.22 — Faster hosted image generation

- Route NVIDIA's retired hosted Qwen text-image endpoint directly to FLUX.2 Klein, avoiding a slow, guaranteed 404 request before the existing fallback.
- Preserve compatibility with custom OpenAI-style image endpoints by retaining their 404 fallback behavior.

## v0.1.20 — Image collections & error reporting

- Group uploaded photos into a compact, navigable collection with a full-screen viewer.
- Reduce image analysis payloads and process multi-file uploads sequentially to avoid oversized chat requests; limit a chat request to its ten most recent visual attachments.
- Move notifications to the upper-right and automatically report user-visible and uncaught client errors to ENOSX support.
- Add a rate-limited server-side email relay; configure a verified Resend sender and `RESEND_API_KEY` / `ERROR_REPORT_FROM` in Vercel to enable delivery.

## v0.1.19 — Chat stability, GOD MODE separation & faster generation
- Kept streamed chat scrolling inside its own pane and prevented long replies from shifting the surrounding desktop window.
- Moved GOD MODE command conversations into a separate, clearly labeled chat and restored the prior regular chat when GOD MODE closes.
- Updated GOD MODE history and terminal iconography with a distinct crown marker and highlight.
- Reduced retained chat history sent to the model from 28 to 20 messages to cut repeated prompt-processing work in long conversations.
- Lowered the default diffusion step count on slower image/edit paths from 30 to 20, while keeping explicit step overrides available.
- Added an immediate in-chat image-generation indicator and mark it complete when the result or error arrives.

## v0.1.17 — Adaptive Composer

- Narrowed the message composer for a more focused chat layout while retaining responsive mobile sizing.
- Replaced the static composer hint with “Intelligent real-time monitoring...” and automatically tailors it when image/video attachments are present, including mixed media.
- Passed visual attachment context consistently through desktop, phone, and TV chat layouts.

## v0.1.16 — Personalized replies & notifications
- Added signed-in name, email, language, personality, and theme preferences to the assistant's private per-request context, with guidance to use personal details only when relevant.
- Completed assistant replies now generate a reply-specific system notification using the response text.
- Improved the synthesized EX notification chime so it resumes suspended browser audio contexts before playing.

## v0.1.15 — Readability & Settings refinements

- Increased chat response and user-message typography for easier reading.
- Updated ENOSX AI guidance to use helpful emoji/icons, Markdown tables, and compact text diagrams when they improve clarity.
- Set the default wallpaper to None (existing saved selections remain unchanged).
- Removed Download and WA from the chat header and moved browser notification permission controls from the sidebar into Settings.

# Changelog

## 0.1.9 — 2026-10-07

### Added

- **Conversation sharing:** use the native share sheet where supported, with clipboard fallback.
- **Conversation export:** download the active conversation as structured Markdown.
- **Conversation copy:** copy a complete transcript directly from the chat header.
- **WhatsApp handoff:** open a pre-filled support handoff for the active conversation.

### Improved

- Markdown exports now include a title, metadata, message headings, and timestamps instead of plain-text formatting.
- Desktop release metadata is aligned at version `0.1.7`.

### Validation

- `pnpm --filter @workspace/enosx-app typecheck`
- `pnpm --filter @workspace/enosx-app build`
