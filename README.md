# TOM Client

A Telegram Mini-App for **The Open Market (TOM)** — the first fully-decentralised, TON-native prediction market.  
Open it right now: **[t.me/opn_mkt/trade](https://t.me/opn_mkt/trade)**  
_(Yes, that link is live. Tap it, I’ll wait.)_

---

# TOM

TOM lets you trade **YES / NO** shares on on-chain events.  
Odds are priced by a constant-product AMM, settlements are handled by a scheduler service, and every tick of data is indexed in real time.  
Under the hood it’s all TON, but from the user’s side it feels like texting a friend who happens to pay you when you’re right.

---

## Quick Start

```bash
git clone https://github.com/<org>/tom-client.git
cd tom-client
pnpm install        # or yarn, ot npm — I won't judge u
pnpm dev            # Vite spins up on :5173
```

Set your environment (testnet is default)

edit `src/config` to flip between mainnet and testnet

---

## Stack

| Layer       | Choice                   | Reason                                                                   |
| ----------- | ------------------------ | ------------------------------------------------------------------------ |
| **UI**      | React 19 + TypeScript    | Because I like catching bugs before users do.                            |
| **State**   | Zustand                  | Tiny, fast, and I can mutate stores without invoking the React gods.     |
| **Styling** | Tailwind + Framer Motion | Dark theme, glass-morphism, micro-animations—eye candy that ships fast.  |
| **Chain**   | @ton/core & @ton/ton     | Low-level enough to feel the metal, high-level enough to keep my sanity. |
| **Wallet**  | TonConnect               | One QR code and users are in.                                            |
| **Data**    | React Query              | Cache-first, stale-while-revalidate—works like a fridge light.           |

---

## Project Layout (Condensed Tour)

```
src/
 ├─ api/          // Thin wrappers over backend & RPC endpoints
 ├─ assets/       // the Icons, the logos, the meme
 ├─ components/   // Reusable bits—buttons, charts, modals
 ├─ config/       // Networks, contract addrs, TonCenter keys
 ├─ contracts/    // TypeScript facades for Factory & Binary contracts
 │   ├─ factory.ts
 │   └─ market.ts
 ├─ helpers/      // Tiny pure fns that save 4-line copy-pastes
 ├─ hooks/        // “useMarket”, “useWallet”, etc. You know the drill.
 ├─ layouts/      // Shells for /trade, /portfolio, /settings
 ├─ pages/        // One component per route
 ├─ stores/       // Zustand slices: markets, positions, user, telegram…
 ├─ types/        // If it compiles, I ship it.
 └─ utils/        // The junk drawer—formatters, debouncers, date-fns glue
```

---

## Key Features

- **Markets Grid** – Live odds, liquidity, volume, and a tiny sparkline so you can pretend you’re a quant.
- **One-Tap Trade** – Pick YES/NO, punch in TON amount, sign with TonConnect, done.
- **Portfolio** – Realised P/L, unrealised P/L, and a confetti burst on resolution (optional).
- **Telegram Native** – Back button, haptic feedback, theme follows the user’s chat settings.
- **Multi-Env** – Flip `config.network=testnet` to `mainnet` and redeploy—no code changes.

---

## Deployment

The canonical build is the **Telegram Mini-App** itself.  
CI builds a static bundle and pushes to Cloudflare Pages; the bot serves it via Web App.

But if you want to self-host:

```bash
pnpm build
# dist/ is now a static PWA — host anywhere.
```

---

## Contributing

Issues and PRs welcome.  
Before you open a PR, run:

```bash
pnpm lint:fix && pnpm test:unit
```

I review PRs over coffee on Sunday mornings — expect brutal but fair feedback.

---

## License

MIT. Do whatever you want; just don’t blame me if you lose your shirt predicting the weather on Mars.

---

Cheers,
— Happy building, and may your YES bags always resolve in the green. - P.S. JohnTad