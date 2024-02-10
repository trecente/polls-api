import { VotingPubSubState, VotingSubscriber, VotingMessage } from '../types';

class RealtimePollPublisher {
  private state: VotingPubSubState;

  constructor() {
    this.state = {
      channels: {},
    };
  }

  subscribe(pollId: string, subscriber: VotingSubscriber) {
    if (!this.state.channels[pollId]) {
      this.state.channels[pollId] = [];
    }

    this.state.channels[pollId].push(subscriber);
  }

  publish(pollId: string, message: VotingMessage) {
    if (!this.state.channels[pollId]) {
      return;
    }

    this.state.channels[pollId].forEach((subscriber) => {
      subscriber(message);
    });
  }
}

export const realtimePollPublisher = new RealtimePollPublisher();
