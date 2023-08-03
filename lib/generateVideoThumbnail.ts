import { VIMEO_REGEX, YOUTUBE_REGEX } from "@/constants/regex";
import { retrieveYoutubeId } from "./retrieveYoutubeId";
import { retrieveVimeoId } from "./retrieveVimeoId";

export function generateVideoThumbnail(videoUrl: string) {
  if (YOUTUBE_REGEX.exec(videoUrl) !== null) {
    return `https://img.youtube.com/vi/${retrieveYoutubeId(videoUrl)}/0.jpg`;
  }
  if (VIMEO_REGEX.exec(videoUrl) !== null) {
    return `https://vumbnail.com/${retrieveVimeoId(videoUrl)}.jpg`;
  }
  return videoUrl;
}
