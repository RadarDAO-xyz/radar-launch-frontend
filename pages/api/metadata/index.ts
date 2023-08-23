import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  if (req.method !== 'GET') {
    return res.status(404).json({});
  }
  return res.status(200).json({
    name: 'RADAR Launch',
    description:
      "Launch is the place where founders, builders, creators, and makers can bring ideas to market no matter their shape or size. It's the place to source the earliest adopters by growing a waitlist. Find collaborators by requesting specific skills and services. Crowdfund milestones, all onchain. And, of course, the reward is reciprocal. Early adopters will be able to build onchain reputation by showing support to the most innovative projects aligned with the futures they believe in.  \n  \nBy unlocking early consumer ownership that's financial (with skin in the game), emotional (with a vision you believe in), and social (with visible, onchain attribution), we believe we can supercharge adoption and — in doing so — further accelerate the better futures. We believe the future is multiplayer. Come join us...",
    image: 'https://radarlaunch.app/project-image.png',
    external_link: 'https://radarlaunch.app'
  });
}
