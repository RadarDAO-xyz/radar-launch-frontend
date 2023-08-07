import { VIMEO_REGEX, YOUTUBE_REGEX } from "@/constants/regex";
import { retrieveYoutubeId } from "./retrieveYoutubeId";
import { retrieveVimeoId } from "./retrieveVimeoId";

export function generateVideoEmbed(videoUrl: string) {
  if (YOUTUBE_REGEX.exec(videoUrl) !== null) {
    return `https://youtube.com/embed/${retrieveYoutubeId(videoUrl)}`;
  }
  if (VIMEO_REGEX.exec(videoUrl) !== null) {
    const vimeoId = retrieveVimeoId(videoUrl);
    return `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&sidedock=0&controls=0&autoplay=1`;
  }
  return videoUrl;
}
