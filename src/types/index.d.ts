export interface VotingMessage {
  pollOptionsId: string;
  votes: number;
}

export type VotingSubscriber = (message: VotingMessage) => void;

export interface VotingPubSubState {
  channels: Record<string, VotingSubscriber[]>;
}