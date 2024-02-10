import { redis } from '../lib/redis';

export async function fetchPollVotes(pollId: string) {
  const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES');

  const votes = result.reduce((obj, line, index) => {
    if (index % 2 === 0) {
      const score = result[index + 1];
      obj[line] = Number(score);
    }

    return obj;
  }, {} as Record<string, number>);

  return votes;
}
