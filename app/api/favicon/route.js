// app/api/favicon/route.ts
export async function GET(request) {
  console.log('here')
  const { searchParams } = new URL(request.url);
  const letter = searchParams.get('letter') || 'V';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <rect width="64" height="64" fill="#ca8a04"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">${letter}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}