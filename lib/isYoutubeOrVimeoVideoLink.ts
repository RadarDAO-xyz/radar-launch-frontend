import { VIMEO_REGEX, YOUTUBE_REGEX } from '@/constants/regex';

export function isYoutubeOrVimeoVideoLink(videoUrl: string) {
  return (
    YOUTUBE_REGEX.exec(videoUrl) !== null || VIMEO_REGEX.exec(videoUrl) !== null
  );
}
