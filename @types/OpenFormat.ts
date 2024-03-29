import { RewardType } from "@openformat/react";

type Action = {
  id: string;
  user: OFUser;
  amount: number;
  description: string;
  metadata?: {
    name: string;
  };
  address: string;
  xp?: number;
  action_id?: string;
};

type ActionConfig = {
  id: string;
  amount: number;
  description: string;
  address: string;
};

type MissionConfig = {
  id: string;
  description: string;
  tokens: MissionConfigToken[];
  requirements: MissionConfigRequirements[];
};

type MissionConfigToken = {
  address: string;
  amount: number;
  uri?: string;
};

type MissionConfigRequirements = {
  actionId: string;
  count: number;
};

type Mission = {
  id: string;
  description: string;
  requirements: MissionRequirement[];
  amount?: number;
  tokens?: Token[];
  badge?: string;
  badge_URI?: string;
  user?: OFUser;
  metadata?: {
    name: string;
  };
  mission_id?: string;
};

type OFUser = {
  eth_address?: string;
  discord_user_id?: number;
  nickname?: string;
  id: string;
  name: string;
  address: string;
  xp: number;
  rewarded: Token[];
  completedActions: string[];
  completedMissions: string[];
};

type MissionRequirement = {
  actionId: string;
  count: number;
};

type Token = {
  id: string;
  amount: string | number;
  address: string;
  type: RewardType;
  activityType: string;
  tokenURI?: string;
};

interface GetUserProfileResponse {
  actions: Action[];
  missions: Mission[];
  user: {
    tokenBalances: FungibleTokenBalance[];
  };
}

type FungibleTokenBalance = {
  balance: string;
  token: {
    id: string;
  };
};

interface ProfileData {
  name: string;
  address: string;
  image: string;
  xp_balance: string;
  reward_token_balance: string;
  completed_missions: Mission[];
  completed_actions: Action[];
}

export type {Action, ActionConfig, MissionConfig, MissionConfigToken, MissionConfigRequirements, Mission, OFUser, MissionRequirement, Token, GetUserProfileResponse, FungibleTokenBalance, ProfileData}
