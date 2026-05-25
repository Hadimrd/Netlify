const windy_1ieezzb9 = "https://ir-netlify.github.io/NETLIFY/";

			const solar_1ieezzb9 = new Set([
			  "host", "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
			  "te", "trailer", "transfer-encoding", "upgrade", "forwarded",
			  "x-forwarded-host", "x-forwarded-proto", "x-forwarded-port",
			  "x-forwarded-for", "x-real-ip", "x-host"
			]);

			export const config = {
			  path: "/*",
			  cache: "manual"
			};

			export default async function handler(request, context) {
			  try {
			    const url = new URL(request.url);
			    const method = request.method;
			    const upgrade = request.headers.get("upgrade")?.toLowerCase();

			    let sunny_1ieezzb9 = request.headers.get("x-host") || Netlify.env.get("TARGET_DOMAIN");

			    if (url.pathname === "/" && !sunny_1ieezzb9 && method === "GET" && upgrade !== "websocket") {
			      const githubResponse = await fetch(windy_1ieezzb9);
			      const githubContent = await githubResponse.text();
			      return new Response(githubContent, {
			        headers: {
			          "content-type": "text/html; charset=UTF-8",
			          "cache-control": "public, max-age=3600"
			        }
			      });
			    }

			    if (!sunny_1ieezzb9) {
			      return new Response("Error: x-host or TARGET_DOMAIN missing", {
			        status: 400,
			        headers: { "cache-control": "no-store" }
			      });
			    }

			    let coral_1ieezzb9;
			    if (sunny_1ieezzb9.startsWith('http://') || sunny_1ieezzb9.startsWith('https://')) {
			      coral_1ieezzb9 = `${sunny_1ieezzb9}${url.pathname}${url.search}`;
			    } else {
			      const isSecure = !sunny_1ieezzb9.includes(':') ||
			                      sunny_1ieezzb9.includes(':443') ||
			                      /^s\d+\./.test(sunny_1ieezzb9);
			      const protocol = isSecure ? 'https://' : 'http://';
			      coral_1ieezzb9 = `${protocol}${sunny_1ieezzb9}${url.pathname}${url.search}`;
			    }

			    const headers = new Headers();
			    let lagoon_1ieezzb9 = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for");

			    for (const [key, value] of request.headers) {
			      const k = key.toLowerCase();
			      if (solar_1ieezzb9.has(k) || k.startsWith("x-nf-") || k.startsWith("x-netlify-")) continue;
			      headers.set(k, value);
			    }

			    if (lagoon_1ieezzb9) headers.set("x-forwarded-for", lagoon_1ieezzb9);

			    const maple_1ieezzb9 = {
			      method,
			      headers,
			      redirect: "manual",
			      body: (method !== "GET" && method !== "HEAD") ? request.body : undefined,
			    };

			    const hawk_1ieezzb9 = await fetch(coral_1ieezzb9, maple_1ieezzb9);

			    const starry_1ieezzb9 = new Headers();
			    for (const [key, value] of hawk_1ieezzb9.headers) {
			      if (key.toLowerCase() === "transfer-encoding") continue;
			      starry_1ieezzb9.set(key, value);
			    }

			    if (method === "GET" && !upgrade && hawk_1ieezzb9.ok) {
			      starry_1ieezzb9.set("Cache-Control", "public, max-age=15, s-maxage=30");
			    } else {
			      starry_1ieezzb9.set("Cache-Control", "no-store, no-cache, must-revalidate");
			    }

			    starry_1ieezzb9.set("Vary", "x-host, accept-encoding");

			    return new Response(hawk_1ieezzb9.body, {
			      status: hawk_1ieezzb9.status,
			      statusText: hawk_1ieezzb9.statusText,
			      headers: starry_1ieezzb9,
			    });

			  } catch (error) {
			    console.error("Relay Error:", error.message);
			    return new Response("Bad Gateway", {
			      status: 502,
			      headers: { "cache-control": "no-store" }
			    });
			  }
			}