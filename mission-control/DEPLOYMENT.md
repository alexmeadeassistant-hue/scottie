# Mission Control Deployment Notes

## Convex

- **Dev deployment:** `dev:rosy-tortoise-994`
  - URL: `https://rosy-tortoise-994.convex.cloud`
- **Prod deployment:** `prod:reliable-ibex-912`
  - URL: `https://reliable-ibex-912.convex.cloud`

### Env Vars

| Name | Dev Value | Prod Value | Notes |
| --- | --- | --- | --- |
| `CONVEX_DEPLOYMENT` | `dev:rosy-tortoise-994` | `prod:reliable-ibex-912` | Used by Convex CLI | 
| `NEXT_PUBLIC_CONVEX_URL` | `https://rosy-tortoise-994.convex.cloud` | `https://reliable-ibex-912.convex.cloud` | Frontend client URL |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | `https://rosy-tortoise-994.convex.site` | `https://reliable-ibex-912.convex.site` | For HTTP actions |

### Commands

```bash
# Local dev (Next + Convex)
npx convex dev
npm run dev

# Deploy Convex functions to prod
npm run convex:deploy
```

## Next.js / Vercel

1. Import repo `alexmeadeassistant-hue/scottie` into Vercel.
2. Add env vars per environment (Dev vs Production) using values above.
3. Deploy; Vercel will use `npm run build`.

## TODO

- Create `/api/openclaw/event` handler + shared secret.
- Register hook in `~/.openclaw/config.jsonc` once endpoint is live.
- Add Convex mutations/queries for tasks, content, etc.
