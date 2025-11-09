// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useUserProgress } from '../hooks/useUserProgress';
// import { useClerkFirebaseSync } from '../hooks/useClerkFirebaseSync';
// import { AlertCircle, CheckCircle, Loader, Home, RefreshCw } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export const FirebaseDebug = () => {
//   const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
//   const { progress, loading, error, saveProgress, isAuthenticated } = useUserProgress();
//   const [testLoading, setTestLoading] = useState(false);
//   const [testMessage, setTestMessage] = useState(null);

//   const navigate = useNavigate();

//   // Setup Clerk-Firebase sync
//   useClerkFirebaseSync();

//   // Debug logging
//   useEffect(() => {
//     console.log('🔍 Firebase Debug Info:', {
//       clerkLoaded,
//       isAuthenticated,
//       progressLength: progress?.length || 0,
//       loading,
//       error,
//       clerkUserId: clerkUser?.id?.slice(0, 8),
//     });
//   }, [clerkLoaded, isAuthenticated, progress, loading, error, clerkUser]);

//   const handleTestWrite = async () => {
//     try {
//       setTestLoading(true);
//       setTestMessage(null);

//       const testData = {
//         exam: 'test-exam-' + Date.now(),
//         part: 'part1',
//         score: 85,
//         answers: ['A', 'B', 'C'],
//         totalQuestions: 3,
//         isDraft: true,
//       };

//       console.log('🧪 Testing write with:', testData);
//       const success = await saveProgress(testData);

//       if (success) {
//         setTestMessage({ 
//           type: 'success', 
//           text: '✅ Write test passed! Data saved to Firestore.' 
//         });
//       } else {
//         setTestMessage({ 
//           type: 'error', 
//           text: '❌ Write test failed. Check console for details.' 
//         });
//       }
//     } catch (err) {
//       console.error('❌ Test write error:', err);
//       setTestMessage({ 
//         type: 'error', 
//         text: `❌ Error: ${err.message}` 
//       });
//     } finally {
//       setTestLoading(false);
//     }
//   };

//   const StatusItem = ({ label, value, isGood }) => (
//     <div 
//       className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border-l-4" 
//       style={{ borderColor: isGood ? '#10b981' : '#ef4444' }}
//     >
//       <span className="font-semibold text-gray-700">{label}</span>
//       <div className="flex items-center gap-2">
//         {isGood ? (
//           <CheckCircle className="w-5 h-5 text-green-600" />
//         ) : (
//           <AlertCircle className="w-5 h-5 text-red-600" />
//         )}
//         <span className={isGood ? 'text-green-700' : 'text-red-700'}>
//           {value}
//         </span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 pt-6 pb-12 px-3 sm:px-4">
//       {/* Header with Navigation */}
//       <div className="max-w-4xl mx-auto mb-6 flex gap-3">
//         <button
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-blue-200 hover:border-blue-400"
//         >
//           <Home className="w-5 h-5 text-blue-600" />
//           <span className="font-semibold text-blue-700">← Về trang chủ</span>
//         </button>
//         <button
//           onClick={() => navigate('/uid-checker')}
//           className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-purple-400"
//         >
//           <span className="font-semibold">🔑 UID Checker</span>
//         </button>
//       </div>

//       {/* Main Debug Container */}
//       <div className="max-w-4xl mx-auto space-y-6">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
//           🔧 Firebase Connection Debug
//         </h2>

//         {/* Status Section */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-6">
//           {/* Loading State */}
//           {!clerkLoaded && (
//             <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
//               <p className="text-yellow-800 font-semibold">⏳ Đang tải Clerk...</p>
//             </div>
//           )}

//           <div className="space-y-3">
//             <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               🔍 Trạng thái kết nối
//             </h4>

//             <StatusItem 
//               label="Clerk Loaded" 
//               value={clerkLoaded ? 'Yes' : 'Loading...'} 
//               isGood={clerkLoaded}
//             />

//             <StatusItem 
//               label="User Authenticated" 
//               value={isAuthenticated ? (clerkUser?.id?.slice(0, 8) + '...') : 'No'} 
//               isGood={isAuthenticated}
//             />

//             <StatusItem 
//               label="Firestore Connection" 
//               value={isAuthenticated ? 'Connected' : 'Not connected'} 
//               isGood={isAuthenticated}
//             />

//             <StatusItem 
//               label="Progress Loaded" 
//               value={loading ? 'Loading...' : (Array.isArray(progress) && progress.length > 0 ? `${progress.length} item(s)` : 'No data yet')} 
//               isGood={Array.isArray(progress) && progress.length > 0}
//             />
//           </div>

//           {/* Error Section */}
//           {error && (
//             <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
//               <p className="font-semibold text-red-800">⚠️ Error:</p>
//               <p className="text-red-700 text-sm mt-1">{error}</p>
//             </div>
//           )}
//         </div>

//         {/* Test Write Section */}
//         {isAuthenticated && clerkLoaded && (
//           <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
//             <h3 className="font-semibold text-blue-900 mb-3">🧪 Test Firestore Write</h3>
            
//             <button
//               onClick={handleTestWrite}
//               disabled={testLoading}
//               className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
//             >
//               {testLoading ? (
//                 <>
//                   <Loader className="w-5 h-5 animate-spin" />
//                   Testing...
//                 </>
//               ) : (
//                 '▶️ Run Write Test'
//               )}
//             </button>

//             {testMessage && (
//               <div className={`mt-3 p-3 rounded font-semibold ${
//                 testMessage.type === 'success' 
//                   ? 'bg-green-100 text-green-800' 
//                   : 'bg-red-100 text-red-800'
//               }`}>
//                 {testMessage.text}
//               </div>
//             )}
//           </div>
//         )}

//         {/* User Info Section */}
//         {clerkLoaded && isAuthenticated && clerkUser && (
//           <div className="bg-white rounded-lg shadow-lg border-2 border-green-200 p-6">
//             <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
//               👤 User Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
//                 <p className="text-sm text-gray-600 font-semibold">Clerk ID</p>
//                 <code className="text-sm font-mono text-green-800 break-all">
//                   {clerkUser?.id || 'N/A'}
//                 </code>
//               </div>
//               <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
//                 <p className="text-sm text-gray-600 font-semibold">Email</p>
//                 <p className="text-sm text-green-800">
//                   {clerkUser?.primaryEmailAddress?.emailAddress || 'N/A'}
//                 </p>
//               </div>
//               <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
//                 <p className="text-sm text-gray-600 font-semibold">Name</p>
//                 <p className="text-sm text-green-800">
//                   {clerkUser?.fullName || clerkUser?.firstName || 'Anonymous'}
//                 </p>
//               </div>
//               <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
//                 <p className="text-sm text-gray-600 font-semibold">Role</p>
//                 <p className="text-sm text-green-800">
//                   {clerkUser?.publicMetadata?.role || 'user'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Progress Data Section */}
//         {clerkLoaded && isAuthenticated && !loading && Array.isArray(progress) && progress.length > 0 && (
//           <div className="bg-white rounded-lg shadow-lg border-2 border-yellow-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-2xl font-bold text-yellow-900 flex items-center gap-2">
//                 📊 Recent Progress ({progress.length} items)
//               </h3>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="flex items-center gap-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Refresh
//               </button>
//             </div>
//             <div className="space-y-2 max-h-96 overflow-y-auto">
//               {progress.slice(0, 10).map((item, idx) => (
//                 <div key={item.id || idx} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <p className="font-semibold text-yellow-900">
//                         #{idx + 1} - {item.exam} / {item.part}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         <strong>Score:</strong> {item.score}% ({item.answers?.length || 0}/{item.totalQuestions} questions)
//                       </p>
//                       <p className="text-xs text-gray-500 mt-2">
//                         {item.completedAt 
//                           ? new Date(item.completedAt).toLocaleString('vi-VN') 
//                           : 'Draft'}
//                       </p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
//                       item.isDraft 
//                         ? 'bg-gray-200 text-gray-800' 
//                         : 'bg-green-200 text-green-800'
//                     }`}>
//                       {item.isDraft ? 'Draft' : 'Submitted'}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Loading Progress */}
//         {clerkLoaded && isAuthenticated && loading && (
//           <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-6 flex items-center justify-center">
//             <Loader className="w-8 h-8 animate-spin text-blue-600 mr-3" />
//             <p className="text-blue-700 font-semibold">Đang tải dữ liệu progress...</p>
//           </div>
//         )}

//         {/* Troubleshooting & Tips */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-6">
//           <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
//             📋 Hướng dẫn & Mẹo
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="p-4 bg-purple-50 rounded-lg">
//               <h4 className="font-semibold text-purple-900 mb-2">✓ Khi mọi thứ hoạt động:</h4>
//               <ul className="text-sm text-gray-700 space-y-1">
//                 <li>✅ Clerk Loaded = Yes</li>
//                 <li>✅ User Authenticated = Yes + ID</li>
//                 <li>✅ Firestore Connection = Connected</li>
//                 <li>✅ Progress Loaded = X item(s)</li>
//               </ul>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg">
//               <h4 className="font-semibold text-red-900 mb-2">❌ Nếu có lỗi:</h4>
//               <ul className="text-sm text-gray-700 space-y-1">
//                 <li>1. Kiểm tra console (F12)</li>
//                 <li>2. Chạy Write Test</li>
//                 <li>3. Kiểm tra Firestore Rules</li>
//                 <li>4. Đảm bảo user đã đăng nhập</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Developer Info */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-gray-300 p-6">
//           <h3 className="text-lg font-bold text-gray-900 mb-3">🔧 Thông tin Debug</h3>
//           <div className="space-y-2 text-xs md:text-sm text-gray-700 font-mono">
//             <p><strong>Clerk Loaded:</strong> {clerkLoaded ? '✅ Yes' : '❌ No'}</p>
//             <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
//             <p><strong>Progress Loading:</strong> {loading ? '⏳ Yes' : '✅ No'}</p>
//             <p><strong>Progress Items:</strong> {Array.isArray(progress) ? progress.length : 0} document(s)</p>
//             {error && <p className="text-red-600"><strong>Error:</strong> {error}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FirebaseDebug;