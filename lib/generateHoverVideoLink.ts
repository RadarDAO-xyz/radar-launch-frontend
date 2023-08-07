// TODO: Implement this function
export function generateHoverVideoLink(videoUrl: string) {
  if (videoUrl.startsWith("https://vimeo.com")) {
    return "/project-1.mp4";
  }
  return videoUrl;
}
