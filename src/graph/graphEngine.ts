import type { DynamicGraph, TaskNode } from '../types';

export class GraphEngine {
  public generateGraphFromIntent(intent: string): DynamicGraph {
    const lower = intent.toLowerCase();

    if (lower.includes('flat') || lower.includes('rent') || lower.includes('apartment') || lower.includes('roommate')) {
      return this.buildFlatHuntVerificationGraph(intent);
    } else if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('computer')) {
      return this.buildLaptopBuyingGraph(intent);
    } else if (lower.includes('leak') || lower.includes('sink') || lower.includes('repair') || lower.includes('plumb')) {
      return this.buildMaintenanceGraph(intent);
    } else if (lower.includes('trip') || lower.includes('goa') || lower.includes('vacation')) {
      return this.buildGoaTripGraph(intent);
    } else {
      return this.buildCustomDynamicGraph(intent);
    }
  }

  private buildFlatHuntVerificationGraph(intent: string): DynamicGraph {
    const nodes: TaskNode[] = [
      {
        id: 'node_intent',
        title: 'Understand Goal',
        agentRole: 'Orchestrator Agent',
        description: 'Parse budget limits, location radius, and roommate rules from intent & Second Brain.',
        dependencies: [],
        status: 'pending'
      },
      {
        id: 'node_search',
        title: 'Candidate Discovery',
        agentRole: 'Research Agent',
        description: 'Scrape campus property candidates matching criteria.',
        dependencies: ['node_intent'],
        status: 'pending'
      },
      {
        id: 'node_contact_owner',
        title: 'Verify Owner',
        agentRole: 'Communication Agent',
        description: 'Contact property owner to confirm availability, rent (₹18.5K), deposit, and parking.',
        dependencies: ['node_search'],
        status: 'pending'
      },
      {
        id: 'node_request_photos',
        title: 'Request Photos',
        agentRole: 'Communication Agent',
        description: 'Request real-time room & parking slot photos from owner.',
        dependencies: ['node_contact_owner'],
        status: 'pending'
      },
      {
        id: 'node_vision_analysis',
        title: 'Analyze Photos',
        agentRole: 'Vision Agent',
        description: 'Run vision AI to verify room furniture, natural light, and parking slot space.',
        dependencies: ['node_request_photos'],
        status: 'pending'
      },
      {
        id: 'node_pref_match',
        title: 'Compare Preferences',
        agentRole: 'Preference Agent',
        description: 'Compare evidence against user budget, distance, and roommate requirements.',
        dependencies: ['node_vision_analysis'],
        status: 'pending'
      },
      {
        id: 'node_identify_uncertainty',
        title: 'Identify Uncertainty',
        agentRole: 'Evaluator Agent',
        description: 'Flag missing information (e.g., missing bathroom photo). Trigger loop refinement.',
        dependencies: ['node_pref_match'],
        status: 'pending'
      },
      {
        id: 'node_final_recommend',
        title: 'Recommend & Schedule',
        agentRole: 'Action Agent',
        description: 'Present verified 92% match recommendation and schedule visit.',
        dependencies: ['node_identify_uncertainty'],
        status: 'pending'
      }
    ];

    const edges = [
      { from: 'node_intent', to: 'node_search' },
      { from: 'node_search', to: 'node_contact_owner' },
      { from: 'node_contact_owner', to: 'node_request_photos' },
      { from: 'node_request_photos', to: 'node_vision_analysis' },
      { from: 'node_vision_analysis', to: 'node_pref_match' },
      { from: 'node_pref_match', to: 'node_identify_uncertainty' },
      { from: 'node_identify_uncertainty', to: 'node_final_recommend' }
    ];

    return {
      goalId: 'goal_flat_verification_' + Date.now(),
      intentRaw: intent,
      category: 'flat_hunt',
      title: 'Flat Verification & Takeover Engine',
      nodes,
      edges
    };
  }

  private buildLaptopBuyingGraph(intent: string): DynamicGraph {
    const nodes: TaskNode[] = [
      {
        id: 'lap_1',
        title: 'Requirements Audit',
        agentRole: 'Orchestrator Agent',
        description: 'Extract budget (₹80K), battery requirement, & CS coding workloads.',
        dependencies: [],
        status: 'pending'
      },
      {
        id: 'lap_2',
        title: 'Scout Retailers',
        agentRole: 'Research Agent',
        description: 'Query Apple Store, Amazon & Croma for MacBook Air M2 deals.',
        dependencies: ['lap_1'],
        status: 'pending'
      },
      {
        id: 'lap_3',
        title: 'Verify Seller & Warranty',
        agentRole: 'Communication Agent',
        description: 'Contact authorized seller to verify AppleCare coverage & student discount.',
        dependencies: ['lap_2'],
        status: 'pending'
      },
      {
        id: 'lap_4',
        title: 'Recommend Purchase',
        agentRole: 'Action Agent',
        description: 'Present verified laptop recommendation with price drop alert.',
        dependencies: ['lap_3'],
        status: 'pending'
      }
    ];

    return {
      goalId: 'goal_laptop_' + Date.now(),
      intentRaw: intent,
      category: 'laptop_buy',
      title: 'Laptop Buying Accelerator',
      nodes,
      edges: [
        { from: 'lap_1', to: 'lap_2' },
        { from: 'lap_2', to: 'lap_3' },
        { from: 'lap_3', to: 'lap_4' }
      ]
    };
  }

  private buildMaintenanceGraph(intent: string): DynamicGraph {
    const nodes: TaskNode[] = [
      {
        id: 'maint_1',
        title: 'Photo Leak Diagnosis',
        agentRole: 'Vision Agent',
        description: 'Analyze sink leak photo to diagnose pipe joint corrosion.',
        dependencies: [],
        status: 'pending'
      },
      {
        id: 'maint_2',
        title: 'Contact Plumber',
        agentRole: 'Communication Agent',
        description: 'Contact licensed local plumber with diagnostic photo for quote.',
        dependencies: ['maint_1'],
        status: 'pending'
      },
      {
        id: 'maint_3',
        title: 'Quote & Approval',
        agentRole: 'Evaluator Agent',
        description: 'Evaluate ₹450 repair quote against Second Brain budget.',
        dependencies: ['maint_2'],
        status: 'pending'
      },
      {
        id: 'maint_4',
        title: 'Schedule Repair',
        agentRole: 'Action Agent',
        description: 'Schedule plumber visit for 2:00 PM today.',
        dependencies: ['maint_3'],
        status: 'pending'
      }
    ];

    return {
      goalId: 'goal_maint_' + Date.now(),
      intentRaw: intent,
      category: 'sink_leak',
      title: 'Leak Repair Autonomous OS',
      nodes,
      edges: [
        { from: 'maint_1', to: 'maint_2' },
        { from: 'maint_2', to: 'maint_3' },
        { from: 'maint_3', to: 'maint_4' }
      ]
    };
  }

  private buildGoaTripGraph(intent: string): DynamicGraph {
    const nodes: TaskNode[] = [
      {
        id: 'trip_1',
        title: 'Group Budget Audit',
        agentRole: 'Orchestrator Agent',
        description: 'Parse 4 friends, ₹15K budget per head, and 4-day dates.',
        dependencies: [],
        status: 'pending'
      },
      {
        id: 'trip_2',
        title: 'Scout Villa & Transport',
        agentRole: 'Research Agent',
        description: 'Find Anjuna Pool Villa & Tejas Express Train.',
        dependencies: ['trip_1'],
        status: 'pending'
      },
      {
        id: 'trip_3',
        title: 'Group Vote Sync',
        agentRole: 'Collaboration Agent',
        description: 'Send vote link to group members.',
        dependencies: ['trip_2'],
        status: 'pending'
      },
      {
        id: 'trip_4',
        title: 'Generate Trip App',
        agentRole: 'Action Agent',
        description: 'Assemble interactive trip planner software.',
        dependencies: ['trip_3'],
        status: 'pending'
      }
    ];

    return {
      goalId: 'goal_trip_' + Date.now(),
      intentRaw: intent,
      category: 'goa_trip',
      title: 'Goa Expedition Planner',
      nodes,
      edges: [
        { from: 'trip_1', to: 'trip_2' },
        { from: 'trip_2', to: 'trip_3' },
        { from: 'trip_3', to: 'trip_4' }
      ]
    };
  }

  private buildCustomDynamicGraph(intent: string): DynamicGraph {
    const nodes: TaskNode[] = [
      {
        id: 'c1',
        title: 'Goal & Context Audit',
        agentRole: 'Orchestrator Agent',
        description: `Analyze intent: "${intent.slice(0, 40)}"`,
        dependencies: [],
        status: 'pending'
      },
      {
        id: 'c2',
        title: 'Automated Inquiry',
        agentRole: 'Communication Agent',
        description: 'Initiate external communication & verification.',
        dependencies: ['c1'],
        status: 'pending'
      },
      {
        id: 'c3',
        title: 'Evidence Evaluation',
        agentRole: 'Evaluator Agent',
        description: 'Audit evidence against Second Brain rules.',
        dependencies: ['c2'],
        status: 'pending'
      },
      {
        id: 'c4',
        title: 'Compile Dynamic Tool',
        agentRole: 'Action Agent',
        description: 'Generate purpose-built software tool.',
        dependencies: ['c3'],
        status: 'pending'
      }
    ];

    return {
      goalId: 'goal_custom_' + Date.now(),
      intentRaw: intent,
      category: 'custom',
      title: 'Custom Workflow Engine',
      nodes,
      edges: [
        { from: 'c1', to: 'c2' },
        { from: 'c2', to: 'c3' },
        { from: 'c3', to: 'c4' }
      ]
    };
  }
}

export const graphEngineInstance = new GraphEngine();
