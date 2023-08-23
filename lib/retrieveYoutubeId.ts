import { YOUTUBE_REGEX } from '@/constants/regex';

export function retrieveYoutubeId(url: string) {
  const match = YOUTUBE_REGEX.exec(url);
  if (match !== null) {
    return match[1];
  }
  return '';
}
