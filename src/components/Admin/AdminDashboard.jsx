// // src/AdminDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { Button } from '../../components/common/Button';
// import { Card } from '../../components/common/Card'; // Giả sử Card component có props children và className
// import { Badge } from '../../components/common/Badge'; // Giả sử Badge cho tags như level/difficulty
// import { StatBox } from '../../components/common/StatBox'; // Giả sử StatBox cho stats nếu cần, ví dụ số lượng items
// import { Loader2, Plus, Edit, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';

// // Hooks CRUD (từ hướng dẫn trước, giả sử đã có)
// import { useVocabularyCRUD } from '../../hooks/useFirestoreCRUD';
// import { useGrammarCRUD } from '../../hooks/useFirestoreCRUD'; // Tương tự cho grammar
// import { getCollection } from '../../config/firebase'; // Import utility từ firebase.js
// import migrateExamData from '../../../scripts/migrateData'; // Import migration function
// import { useClerkAuthentication } from '../../hooks/useClerkAuth';
// // Simple Toast Component (tự implement vì không có shadcn toast)
// const SimpleToast = ({ message, type = 'info', onClose }) => {
//   if (!message) return null;
//   return (
//     <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
//       type === 'success' ? 'bg-green-500 text-white' :
//       type === 'error' ? 'bg-red-500 text-white' :
//       'bg-blue-500 text-white'
//     }`}>
//       {message}
//       <button onClick={onClose} className="ml-4 text-white">×</button>
//     </div>
//   );
// };

// export default function AdminDashboard() {
//   const { user } = useUser();
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('info');
//   const isAdmin = user?.publicMetadata?.role === 'admin' || import.meta.env.VITE_USE_MOCK_AUTH === 'true';

//   // States chung
//   const [activeTab, setActiveTab] = useState('vocabulary');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Vocabulary states
//   const { addWord, updateWord, deleteWord, getAllWords } = useVocabularyCRUD();
//   const [words, setWords] = useState([]);
//   const [editingWord, setEditingWord] = useState(null);
//   const [showAddWordModal, setShowAddWordModal] = useState(false);
//   const [showEditWordModal, setShowEditWordModal] = useState(false);
//   const [newWordForm, setNewWordForm] = useState({
//     word: '', definition: '', example: '', pronunciation: '', vietnamese: '', level: 'beginner'
//   });

//   // Grammar states
//   const { addTopic, updateTopic, deleteTopic, getAllTopics } = useGrammarCRUD();
//   const [topics, setTopics] = useState([]);
//   const [editingTopic, setEditingTopic] = useState(null);
//   const [showAddTopicModal, setShowAddTopicModal] = useState(false);
//   const [showEditTopicModal, setShowEditTopicModal] = useState(false);
//   const [newTopicForm, setNewTopicForm] = useState({
//     title: '', description: '', level: 'beginner', difficulty: 'Easy'
//   });
//   const [expandedTopics, setExpandedTopics] = useState(new Set());

//   // Exam states
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     if (!isAdmin) return;
//     loadVocabulary();
//     loadGrammar();
//     loadExams();
//   }, [isAdmin]);

//   // Load functions
//   const loadVocabulary = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getAllWords();
//       setWords(data.filter(w => w.word.toLowerCase().includes(searchTerm.toLowerCase())));
//     } catch (error) {
//       showToast('Failed to load vocabulary', 'error');
//     }
//     setIsLoading(false);
//   };

//   const loadGrammar = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getAllTopics();
//       setTopics(data.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())));
//     } catch (error) {
//       showToast('Failed to load grammar topics', 'error');
//     }
//     setIsLoading(false);
//   };

//   const loadExams = async () => {
//     try {
//       const fetched = await getCollection('examData');
//       setExams(fetched);
//     } catch (error) {
//       showToast('Failed to load exams', 'error');
//     }
//   };

//   const showToast = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setTimeout(() => setToastMessage(''), 3000);
//   };

//   // Handlers cho Vocabulary
//   const handleAddWord = async () => {
//     if (!newWordForm.word || !newWordForm.definition) {
//       showToast('Word and definition are required', 'error');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await addWord(newWordForm);
//       showToast('Word added successfully', 'success');
//       setNewWordForm({ word: '', definition: '', example: '', pronunciation: '', vietnamese: '', level: 'beginner' });
//       setShowAddWordModal(false);
//       loadVocabulary();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   const handleEditWord = (word) => {
//     setEditingWord(word);
//     setShowEditWordModal(true);
//   };

//   const handleUpdateWord = async () => {
//     if (!editingWord.word || !editingWord.definition) {
//       showToast('Word and definition are required', 'error');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await updateWord(editingWord.id, editingWord);
//       showToast('Word updated successfully', 'success');
//       setEditingWord(null);
//       setShowEditWordModal(false);
//       loadVocabulary();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   const handleDeleteWord = async (id) => {
//     if (!confirm('Are you sure you want to delete this word?')) return;
//     setIsLoading(true);
//     try {
//       await deleteWord(id);
//       showToast('Word deleted successfully', 'success');
//       loadVocabulary();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   // Handlers cho Grammar
//   const handleAddTopic = async () => {
//     if (!newTopicForm.title) {
//       showToast('Title is required', 'error');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await addTopic(newTopicForm);
//       showToast('Topic added successfully', 'success');
//       setNewTopicForm({ title: '', description: '', level: 'beginner', difficulty: 'Easy' });
//       setShowAddTopicModal(false);
//       loadGrammar();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   const handleEditTopic = (topic) => {
//     setEditingTopic(topic);
//     setShowEditTopicModal(true);
//   };

//   const handleUpdateTopic = async () => {
//     if (!editingTopic.title) {
//       showToast('Title is required', 'error');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await updateTopic(editingTopic.id, editingTopic);
//       showToast('Topic updated successfully', 'success');
//       setEditingTopic(null);
//       setShowEditTopicModal(false);
//       loadGrammar();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   const handleDeleteTopic = async (id) => {
//     if (!confirm('Are you sure you want to delete this topic?')) return;
//     setIsLoading(true);
//     try {
//       await deleteTopic(id);
//       showToast('Topic deleted successfully', 'success');
//       loadGrammar();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   const toggleTopicExpand = (topicId) => {
//     const newExpanded = new Set(expandedTopics);
//     if (newExpanded.has(topicId)) {
//       newExpanded.delete(topicId);
//     } else {
//       newExpanded.add(topicId);
//     }
//     setExpandedTopics(newExpanded);
//   };

//   // Handlers cho Exam Migration
//   const handleMigrateExam = async () => {
//     if (!confirm('Are you sure you want to migrate exam data?')) return;
//     setIsLoading(true);
//     try {
//       const result = await migrateExamData(
//         (progress) => showToast(progress, 'info'),
//         (error) => showToast(error, 'error'),
//         (complete) => showToast(complete, 'success')
//       );
//       if (result.success) {
//         loadExams();
//       }
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   const handleDeleteExam = async (id) => {
//     if (!confirm('Are you sure you want to delete this exam?')) return;
//     setIsLoading(true);
//     try {
//       // Giả sử bạn có deleteExam function từ hook
//       // await deleteExam(id);
//       showToast('Exam deleted successfully', 'success');
//       loadExams();
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//     setIsLoading(false);
//   };

//   if (!isAdmin) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
//         <div className="text-center p-8">
//           <h1 className="text-2xl font-bold text-gray-700 mb-4">Access Denied</h1>
//           <p className="text-gray-500">You do not have admin privileges. Please contact the administrator.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50 p-4 sm:p-8">
//       <SimpleToast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Manage vocabulary, grammar, and exam content.</p>
//         </header>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center gap-4">
//           <Search className="w-4 h-4 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search across all sections..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 max-w-md"
//           />
//           <Button onClick={() => { loadVocabulary(); loadGrammar(); loadExams(); }} variant="outline">
//             Refresh
//           </Button>
//         </div>

//         {/* Simple Tabs using Buttons */}
//         <div className="mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8">
//               {['vocabulary', 'grammar', 'exam'].map((tab) => (
//                 <Button
//                   key={tab}
//                   variant={activeTab === tab ? 'primary' : 'ghost'}
//                   onClick={() => setActiveTab(tab)}
//                   className="mr-0"
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </Button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Vocabulary Tab */}
//         {activeTab === 'vocabulary' && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Vocabulary Management</h2>
//               <Button onClick={() => setShowAddWordModal(true)}>
//                 <Plus className="w-4 h-4 mr-2" /> Add Word
//               </Button>
//             </div>

//             {/* Add Word Modal */}
//             {showAddWordModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
//                   <h3 className="text-lg font-semibold mb-4">Add New Word</h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Word"
//                       value={newWordForm.word}
//                       onChange={(e) => setNewWordForm({...newWordForm, word: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Definition"
//                       value={newWordForm.definition}
//                       onChange={(e) => setNewWordForm({...newWordForm, definition: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Example"
//                       value={newWordForm.example}
//                       onChange={(e) => setNewWordForm({...newWordForm, example: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Pronunciation"
//                       value={newWordForm.pronunciation}
//                       onChange={(e) => setNewWordForm({...newWordForm, pronunciation: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Vietnamese"
//                       value={newWordForm.vietnamese}
//                       onChange={(e) => setNewWordForm({...newWordForm, vietnamese: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <select
//                       value={newWordForm.level}
//                       onChange={(e) => setNewWordForm({...newWordForm, level: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     >
//                       <option value="beginner">Beginner</option>
//                       <option value="intermediate">Intermediate</option>
//                       <option value="advanced">Advanced</option>
//                     </select>
//                     <div className="flex gap-2">
//                       <Button onClick={handleAddWord} disabled={isLoading}>
//                         {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
//                         Add
//                       </Button>
//                       <Button variant="outline" onClick={() => setShowAddWordModal(false)}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Word Modal */}
//             {showEditWordModal && editingWord && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
//                   <h3 className="text-lg font-semibold mb-4">Edit Word</h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Word"
//                       value={editingWord.word || ''}
//                       onChange={(e) => setEditingWord({...editingWord, word: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Definition"
//                       value={editingWord.definition || ''}
//                       onChange={(e) => setEditingWord({...editingWord, definition: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     {/* Các input khác tương tự */}
//                     <div className="flex gap-2">
//                       <Button onClick={handleUpdateWord} disabled={isLoading}>
//                         Update
//                       </Button>
//                       <Button variant="outline" onClick={() => { setShowEditWordModal(false); setEditingWord(null); }}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isLoading ? (
//               <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
//             ) : (
//               <Card className="overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Definition</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {words.map((word) => (
//                       <tr key={word.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">{word.word}</td>
//                         <td className="px-6 py-4 max-w-xs">{word.definition}</td>
//                         <td className="px-6 py-4 max-w-xs">{word.example}</td>
//                         <td className="px-6 py-4">
//                           <Badge variant={word.level}>{word.level}</Badge>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <Button variant="outline" size="sm" onClick={() => handleEditWord(word)} className="mr-2">
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <Button variant="destructive" size="sm" onClick={() => handleDeleteWord(word.id)}>
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </Card>
//             )}
//           </div>
//         )}

//         {/* Grammar Tab */}
//         {activeTab === 'grammar' && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Grammar Management</h2>
//               <Button onClick={() => setShowAddTopicModal(true)}>
//                 <Plus className="w-4 h-4 mr-2" /> Add Topic
//               </Button>
//             </div>

//             {/* Add Topic Modal */}
//             {showAddTopicModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
//                   <h3 className="text-lg font-semibold mb-4">Add New Topic</h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Title"
//                       value={newTopicForm.title}
//                       onChange={(e) => setNewTopicForm({...newTopicForm, title: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                     <textarea
//                       placeholder="Description"
//                       value={newTopicForm.description}
//                       onChange={(e) => setNewTopicForm({...newTopicForm, description: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20"
//                     />
//                     <select
//                       value={newTopicForm.level}
//                       onChange={(e) => setNewTopicForm({...newTopicForm, level: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     >
//                       <option value="beginner">Beginner</option>
//                       <option value="intermediate">Intermediate</option>
//                       <option value="advanced">Advanced</option>
//                     </select>
//                     <select
//                       value={newTopicForm.difficulty}
//                       onChange={(e) => setNewTopicForm({...newTopicForm, difficulty: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     >
//                       <option value="Easy">Easy</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Hard">Hard</option>
//                     </select>
//                     <div className="flex gap-2">
//                       <Button onClick={handleAddTopic} disabled={isLoading}>
//                         {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
//                         Add
//                       </Button>
//                       <Button variant="outline" onClick={() => setShowAddTopicModal(false)}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Topic Modal */}
//             {showEditTopicModal && editingTopic && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
//                   <h3 className="text-lg font-semibold mb-4">Edit Topic</h3>
//                   <div className="space-y-4">
//                     {/* Inputs tương tự Add, với value từ editingTopic */}
//                     <div className="flex gap-2">
//                       <Button onClick={handleUpdateTopic} disabled={isLoading}>
//                         Update
//                       </Button>
//                       <Button variant="outline" onClick={() => { setShowEditTopicModal(false); setEditingTopic(null); }}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isLoading ? (
//               <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
//             ) : (
//               <div className="space-y-4">
//                 {topics.map((topic) => (
//                   <Card key={topic.id} className="p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-lg font-medium">{topic.title}</h3>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm" onClick={() => handleEditTopic(topic)}>
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button variant="destructive" size="sm" onClick={() => handleDeleteTopic(topic.id)}>
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => toggleTopicExpand(topic.id)}>
//                           {expandedTopics.has(topic.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                         </Button>
//                       </div>
//                     </div>
//                     <p className="text-gray-600 mb-2">{topic.description}</p>
//                     <div className="flex gap-2">
//                       <Badge variant={topic.level}>{topic.level}</Badge>
//                       <Badge variant={topic.difficulty}>{topic.difficulty}</Badge>
//                     </div>
//                     {expandedTopics.has(topic.id) && (
//                       <div className="mt-4 ml-4 p-2 border-l-2 border-gray-200">
//                         <p className="text-sm text-gray-500">Expanded content (lessons/exercises) would go here.</p>
//                       </div>
//                     )}
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Exam Tab */}
//         {activeTab === 'exam' && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Exam Management</h2>
//               <Button onClick={handleMigrateExam} disabled={isLoading}>
//                 {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
//                 Migrate Exam Data
//               </Button>
//             </div>

//             {isLoading ? (
//               <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
//             ) : (
//               <Card className="overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {exams.map((exam) => (
//                       <tr key={exam.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">{exam.id}</td>
//                         <td className="px-6 py-4">{exam.title}</td>
//                         <td className="px-6 py-4 max-w-xs">{exam.description}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <Button variant="outline" size="sm" className="mr-2">
//                             <Edit className="w-4 h-4 mr-1" /> Edit
//                           </Button>
//                           <Button variant="destructive" size="sm" onClick={() => handleDeleteExam(exam.id)}>
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </Card>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }