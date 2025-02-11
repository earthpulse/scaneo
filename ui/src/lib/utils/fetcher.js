export async function fetcher(url, method, body) {
  const config = {
    method: method || "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    credentials: "same-origin",
  };
  if (method && method !== "GET") config.body = JSON.stringify(body);
  const res = await fetch(url, config);
  const data = await res.json();
  if (res.status !== 200) return { error: data.detail };
  return { data };
}
