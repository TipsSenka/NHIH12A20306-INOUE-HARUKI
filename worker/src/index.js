const courses = [
  {
    id: "cloudflare-basics",
    title: "Cloudflare 基礎",
    level: "入門",
    duration: "30分",
  },
  {
    id: "workers-api",
    title: "Workers API を作る",
    level: "実践",
    duration: "45分",
  },
  {
    id: "pages-deploy",
    title: "Pages に公開する",
    level: "実践",
    duration: "25分",
  },
];

const events = [
  { date: "2026-09-18", title: "Cloudflare ハンズオン", place: "オンライン" },
  { date: "2026-09-25", title: "成果物レビュー会", place: "教室 A" },
];

const fortunes = ["大吉", "中吉", "小吉", "吉"];

function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowedOrigin = env.ALLOWED_ORIGIN || "http://localhost:5500";
  const allowOrigin = origin === allowedOrigin ? origin : allowedOrigin;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(request, env, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(request, env),
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request, env),
      });
    if (request.method !== "GET")
      return json(request, env, { error: "Method Not Allowed" }, 405);

    if (url.pathname === "/" || url.pathname === "/api") {
      return json(request, env, {
        name: "ih12a-api",
        status: "ok",
        endpoints: ["/api/course", "/api/hello", "/api/fortune", "/api/events"],
      });
    }
    if (url.pathname === "/api/course") return json(request, env, { courses });
    if (url.pathname === "/api/events") return json(request, env, { events });
    if (url.pathname === "/api/fortune") {
      return json(request, env, {
        fortune: fortunes[Math.floor(Math.random() * fortunes.length)],
      });
    }
    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name")?.trim();
      if (!name) return json(request, env, { error: "name is required" }, 400);
      return json(request, env, { message: `${name}さん、こんにちは！`, name });
    }
    return json(request, env, { error: "Not Found" }, 404);
  },
};
