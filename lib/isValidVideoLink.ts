import { VIMEO_REGEX, YOUTUBE_REGEX } from "@/constants/regex";

export function isValidVideoLink(videoUrl: string) {
  return (
    YOUTUBE_REGEX.exec(videoUrl) !== null || VIMEO_REGEX.exec(videoUrl) !== null
  );
}
