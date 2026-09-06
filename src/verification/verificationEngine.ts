import type { OwnerMessage, VisionAnalysis } from '../types';

export const INITIAL_OWNER_CHAT: OwnerMessage[] = [
  {
    id: 'msg_1',
    sender: 'agent',
    senderName: 'IntentOS Communication Agent',
    text: 'Hi Mr. Sharma, I am IntentOS Second Brain representing Alex & roommate. Could you confirm: 1. Is Skyline Heights 2BHK available? 2. Is rent ₹18,500? 3. Is dedicated car/bike parking included? 4. Security deposit?',
    timestamp: '10:04 AM'
  },
  {
    id: 'msg_2',
    sender: 'owner',
    senderName: 'Mr. Sharma (Property Owner)',
    text: 'Hello! Yes, flat is available. Rent is fixed at ₹18,500/mo. Dedicated parking slot #4B is included. Security deposit is ₹35,000. It is fully furnished.',
    timestamp: '10:05 AM'
  },
  {
    id: 'msg_3',
    sender: 'agent',
    senderName: 'IntentOS Communication Agent',
    text: 'Thank you. Could you send current photos of the living room, master bedroom, kitchen, and dedicated parking space for verification?',
    timestamp: '10:05 AM'
  },
  {
    id: 'msg_4',
    sender: 'owner',
    senderName: 'Mr. Sharma (Property Owner)',
    text: 'Sure! Here are current photos of the interior rooms.',
    timestamp: '10:06 AM',
    attachedPhotos: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', label: 'Living Room' },
      { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80', label: 'Master Bedroom' },
      { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', label: 'Modular Kitchen' }
    ]
  }
];

export const INITIAL_VISION_ANALYSIS: VisionAnalysis[] = [
  {
    id: 'vis_1',
    roomType: 'Living Room',
    status: 'Verified',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    findings: ['Sofa set & TV unit present', 'Natural sunlight verified', 'Clean hardwood flooring'],
    confidence: 96
  },
  {
    id: 'vis_2',
    roomType: 'Master Bedroom',
    status: 'Verified',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
    findings: ['Queen bed + Mattress included', 'Wooden wardrobe visible', 'Air conditioner installed'],
    confidence: 94
  },
  {
    id: 'vis_3',
    roomType: 'Modular Kitchen',
    status: 'Verified',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    findings: ['Gas stove & Chimney fitted', 'Water purifier present', 'Hygiene acceptable'],
    confidence: 91
  },
  {
    id: 'vis_4',
    roomType: 'Dedicated Parking Space',
    status: 'Uncertain',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
    findings: ['⚠ Listing & owner text claim parking available', 'Parking slot photo MISSING from initial photo set'],
    confidence: 50
  }
];

export const FOLLOWUP_OWNER_CHAT: OwnerMessage[] = [
  {
    id: 'msg_5',
    sender: 'agent',
    senderName: 'IntentOS Communication Agent',
    text: 'Hi Mr. Sharma, our Vision Agent detected that parking slot evidence was missing from the initial photo set. Since parking is mandatory for Alex, could you send a photo of basement parking slot #4B?',
    timestamp: '10:07 AM'
  },
  {
    id: 'msg_6',
    sender: 'owner',
    senderName: 'Mr. Sharma (Property Owner)',
    text: 'Apologies! Here is the photo of basement parking slot #4B taken just now. It is reserved exclusively for this flat.',
    timestamp: '10:08 AM',
    attachedPhotos: [
      { url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80', label: 'Basement Parking Slot #4B' }
    ]
  }
];
