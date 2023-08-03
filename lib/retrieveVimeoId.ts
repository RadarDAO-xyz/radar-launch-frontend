import { VIMEO_REGEX } from "@/constants/regex";

export function retrieveVimeoId(videoUrl: string) {
  const match = VIMEO_REGEX.exec(videoUrl);
  if (match !== null) {
    return match[0];
  }
  return "";
}
