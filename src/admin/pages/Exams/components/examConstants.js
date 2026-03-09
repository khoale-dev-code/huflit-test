// src/admin/pages/Exams/components/examConstants.js

export const PART_ORDER       = ['part1','part2','part3','part4','part5','part6','part7','part8'];
export const LISTENING_PARTS  = ['part1','part2','part3','part4'];
export const READING_PARTS    = ['part5','part6','part7','part8'];

export const CATEGORY_CHIP = {
  IELTS: 'bg-blue-50 text-blue-600 border border-blue-200',
  TOEIC: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
};

export const LEVEL_CHIP = {
  'Cơ bản (A1-A2)':    'bg-purple-50 text-purple-600 border border-purple-200',
  'Trung cấp (B1-B2)': 'bg-amber-50  text-amber-600  border border-amber-200',
  'Nâng cao (C1-C2)':  'bg-red-50    text-red-600    border border-red-200',
};

export const levelShort = (l = '') => {
  if (l.includes('Cơ'))    return 'CƠ BẢN';
  if (l.includes('Trung')) return 'TRUNG CẤP';
  if (l.includes('Nâng'))  return 'NÂNG CAO';
  return l || 'N/A';
};

export const DEFAULT_PARTS = {
  part1: { id:'part1', title:'PART 1: Short Conversations',    description:'', type:'listening', audioUrl:'', audioStoragePath:'', audioName:'', script:'', questions:[] },
  part2: { id:'part2', title:'PART 2: Conversation',           description:'', type:'listening', audioUrl:'', audioStoragePath:'', audioName:'', script:'', questions:[] },
  part3: { id:'part3', title:'PART 3: Monologue',              description:'', type:'listening', audioUrl:'', audioStoragePath:'', audioName:'', script:'', questions:[] },
  part4: { id:'part4', title:'PART 4: Extended Conversation',  description:'', type:'listening', audioUrl:'', audioStoragePath:'', audioName:'', script:'', questions:[] },
  part5: { id:'part5', title:'PART 5: Fill in the Blank',      description:'', type:'reading',   text:'', questions:[] },
  part6: { id:'part6', title:'PART 6: Cloze Text',             description:'', type:'reading',   text:'', questions:[] },
  part7: { id:'part7', title:'PART 7: Multiple Texts',         description:'', type:'reading',   text:'', questions:[] },
  part8: { id:'part8', title:'PART 8: Text Message Chain',     description:'', type:'reading',   text:'', questions:[] },
};