/** Pull the video id out of the YouTube URL shapes used in content/talks.ts. */
export function youtubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      // /live/<id>, /embed/<id>, /shorts/<id>
      const m = u.pathname.match(/^\/(?:live|embed|shorts)\/([^/?]+)/);
      if (m) return m[1];
    }
  } catch {
    return null;
  }
  return null;
}

/** hqdefault exists for every video; maxres often does not. */
export function youtubeThumb(url?: string): string | null {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
