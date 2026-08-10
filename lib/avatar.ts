export function createInitialAvatar(
  name: string,
  options?: { bg?: string; accent?: string },
) {
  const bg = options?.bg ?? "#1B2A41";
  const accent = options?.accent ?? "#2A9D8F";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="640" viewBox="0 0 480 640">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#0D1522"/>
    </linearGradient>
  </defs>
  <rect width="480" height="640" fill="url(#g)"/>
  <circle cx="240" cy="250" r="110" fill="${accent}" fill-opacity="0.22"/>
  <circle cx="240" cy="250" r="78" fill="${accent}" fill-opacity="0.18"/>
  <text x="240" y="275" text-anchor="middle" fill="#F4F6F8" font-size="84" font-family="Georgia, 'Times New Roman', serif" font-weight="600">${initials}</text>
  <rect x="0" y="500" width="480" height="140" fill="${accent}" fill-opacity="0.12"/>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
