# IH12A-inoueharuki

井上陽輝の Cloudflare Pages / Workers サンプルです。

## 構成

- `pages`: Cloudflare Pages に公開する静的フロントエンド
- `worker`: `course`, `hello`, `fortune`, `events` を提供する Worker API

## Worker の起動とデプロイ

```powershell
Set-Location .\worker
npm install
npm run dev
npm run deploy
```

本番 Worker URL は `https://nhih12a20306-inoue-haruki-backend.gakkouyou0225.workers.dev` です。Pages の公開 URL を変更する場合は、`worker/wrangler.toml` の `ALLOWED_ORIGIN` も同じ URL に更新します。

## API 確認

- `GET /api/course` -> 200 / コース一覧
- `GET /api/hello?name=山田` -> 200 / 挨拶
- `GET /api/hello?name=` -> 400
- `GET /api/fortune` -> 200 / 運勢
- `GET /api/events` -> 200 / イベント一覧
- 未定義パス -> 404
