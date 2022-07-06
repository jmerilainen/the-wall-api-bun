export function json<T>(data: T, status = 200): Response {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  return new Response(
    JSON.stringify(data),
    {
      status,
      headers
    },
  );
}
