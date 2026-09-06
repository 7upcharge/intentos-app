import type { UserContext } from '../types';

export const INITIAL_USER_CONTEXT: UserContext = {
  id: 'user_alex_01',
  name: 'Alex Vance',
  budgetRange: '₹15,000 – ₹20,000',
  preferredLocation: 'Within 2 km of Campus / Tech Park',
  parkingRequired: true,
  roommatesCount: 1,
  furnishedPreference: 'Semi/Fully Furnished',
  pastDecisions: [
    'Rejected 2BHK in South Sector due to 45-min transit bottleneck',
    'Shortlisted properties with dedicated motorcycle parking slot',
    'Preferred roommate split: equal 50/50 rent share'
  ],
  customTraits: {
    diet: 'Vegetarian friendly kitchen preferred',
    schedule: 'Night owl study/work schedule',
    college: 'IIIT Delhi / College Campus'
  }
};

export class SecondBrainMemory {
  private context: UserContext;

  constructor(initialCtx: UserContext = INITIAL_USER_CONTEXT) {
    this.context = { ...initialCtx };
  }

  public getContext(): UserContext {
    return { ...this.context };
  }

  public updateContext(updates: Partial<UserContext>): UserContext {
    this.context = { ...this.context, ...updates };
    return this.getContext();
  }

  public generateAgentContextPrompt(_intent: string): {
    userHeader: string;
    constraints: string[];
    pastLearnings: string[];
  } {
    return {
      userHeader: `[USER MEMORY ACTIVE] ${this.context.name} | Budget: ${this.context.budgetRange} | Location: ${this.context.preferredLocation}`,
      constraints: [
        `Budget Limit: ${this.context.budgetRange}`,
        `Parking: ${this.context.parkingRequired ? 'MANDATORY (Dedicated slot)' : 'Optional'}`,
        `Roommate Count: ${this.context.roommatesCount}`,
        `Furnished: ${this.context.furnishedPreference}`
      ],
      pastLearnings: this.context.pastDecisions
    };
  }
}

export const secondBrainInstance = new SecondBrainMemory();
