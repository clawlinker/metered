# AGENTS.md — Metered

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui for ALL UI components (buttons, cards, badges, tabs, inputs, dialogs)
- Lucide React for icons
- No raw HTML form elements — always use shadcn components

## Design Rules
1. **Dark theme:** bg-gray-950 body, bg-gray-900/bg-white/5 cards, orange-500/amber-500 accents
2. **shadcn/ui first:** Use `npx shadcn@latest add <component>` before building custom. Check if shadcn has it.
3. **Mobile-first:** Design for phone, then expand to desktop grid
4. **Scan-fast cards:** Name, price, protocol badge, upvote count visible at a glance — no clicking needed for key info
5. **Spacing:** Use Tailwind spacing scale consistently. Don't mix px values.
6. **Typography:** Inter font. text-4xl+ for hero, text-lg for card titles, text-sm for descriptions, text-xs for badges.

## Component Library
After installing shadcn, use these components:
- `Button` — all clickable actions
- `Card`, `CardHeader`, `CardContent`, `CardFooter` — service listings
- `Badge` — protocol type (x402/MPP/ACP), categories, verification status
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — leaderboard views
- `Input`, `Textarea`, `Select` — submit form
- `Dialog` — confirmations, wallet connect
- `Separator` — visual breaks
- `Skeleton` — loading states

## File Structure
```
app/
  page.tsx              — Home (hero + leaderboard + grid)
  service/[slug]/page.tsx — Service detail
  submit/page.tsx       — Submit form
  layout.tsx            — Root layout with Navbar
components/
  ui/                   — shadcn/ui components (auto-generated)
  ServiceCard.tsx       — Individual service card
  ServiceGrid.tsx       — Grid of service cards
  LeaderboardTabs.tsx   — Tab navigation
  UpvoteButton.tsx      — Upvote with agent/human split
  Navbar.tsx            — Top navigation
  CategoryFilter.tsx    — Category chip filters
  ProtocolBadge.tsx     — Protocol type badge
  CategoryBadge.tsx     — Category type badge
lib/
  types.ts              — TypeScript interfaces
  seed-data.ts          — Seed services data
  utils.ts              — cn() helper for tailwind merge
```

## Seed Data
Real services. Check descriptions and URLs are accurate. Don't invent fake services.

## What NOT to do
- No raw `<button>` or `<input>` — use shadcn
- No inline styles — Tailwind only
- No placeholder text like "Lorem ipsum"
- No Supabase/DB yet — seed data from lib/seed-data.ts for now
- No wallet connect implementation yet — just the UI placeholder
