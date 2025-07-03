import { set, get, update, remove, ref as dbRef } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { Member } from './types';

// Member Services
export const memberService = {
  // Get all members
  async getMembers() {
    console.log("Getting members from Firebase...");
    const membersRef = dbRef(realtimeDb, 'board');
    const snapshot = await get(membersRef);
    
    console.log("Snapshot exists:", snapshot.exists());
    
    if (!snapshot.exists()) {
      console.log("No board data found in Firebase");
      return [];
    }

    const membersData = snapshot.val();
    console.log("Raw members data:", membersData);
    
    const members: Member[] = Object.entries(membersData).map(([id, data]: [string, any]) => ({
      id,
      ...data,
    }));

    console.log("Processed members:", members);

    // Sort by order
    members.sort((a, b) => (a.order || 0) - (b.order || 0));

    return members;
  },

  // Get single member
  async getMember(id: string) {
    const memberRef = dbRef(realtimeDb, `board/${id}`);
    const snapshot = await get(memberRef);
    
    if (snapshot.exists()) {
      return { id, ...snapshot.val() } as Member;
    }
    return null;
  },

  // Add new member
  async addMember(member: Omit<Member, 'id'>) {
    const memberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await set(dbRef(realtimeDb, `board/${memberId}`), {
      ...member,
      id: memberId,
    });
    return memberId;
  },

  // Update member
  async updateMember(id: string, updates: Partial<Member>) {
    const memberRef = dbRef(realtimeDb, `board/${id}`);
    await update(memberRef, updates);
  },

  // Delete member
  async deleteMember(id: string) {
    const memberRef = dbRef(realtimeDb, `board/${id}`);
    await remove(memberRef);
  },
}; 