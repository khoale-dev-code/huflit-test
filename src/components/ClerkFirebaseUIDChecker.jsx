// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useUserProgress } from '../hooks/useUserProgress';
// import { CheckCircle, AlertCircle, Copy } from 'lucide-react';

// /**
//  * Component để kiểm tra xem Clerk User ID có khớp với Firebase UID không
//  * Nếu không khớp → Permission denied error
//  */
// export const ClerkFirebaseUIDChecker = () => {
//   const { user: clerkUser, isLoaded, isSignedIn } = useUser();
//   const [copiedId, setCopiedId] = useState(null);
//   const [testData, setTestData] = useState(null);

//   const handleCopyId = (text, id) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 pt-6 pb-12 px-3 sm:px-4">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             🔑 Clerk ↔ Firebase UID Checker
//           </h1>
//           <p className="text-gray-600">
//             Kiểm tra xem Clerk User ID có khớp với Firebase Authentication UID không
//           </p>
//         </div>

//         {/* Status */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             📊 Status
//           </h2>

//           <div className="space-y-3">
//             {/* Clerk Loaded */}
//             <div className={`p-4 rounded-lg border-l-4 flex items-start gap-3 ${
//               isLoaded ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
//             }`}>
//               {isLoaded ? (
//                 <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//               ) : (
//                 <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
//               )}
//               <div>
//                 <p className="font-semibold text-gray-900">Clerk Loaded</p>
//                 <p className={isLoaded ? 'text-green-700' : 'text-yellow-700'}>
//                   {isLoaded ? '✅ Yes - Ready to check' : '⏳ Loading...'}
//                 </p>
//               </div>
//             </div>

//             {/* Signed In */}
//             <div className={`p-4 rounded-lg border-l-4 flex items-start gap-3 ${
//               isSignedIn ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
//             }`}>
//               {isSignedIn ? (
//                 <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//               ) : (
//                 <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
//               )}
//               <div>
//                 <p className="font-semibold text-gray-900">User Signed In</p>
//                 <p className={isSignedIn ? 'text-green-700' : 'text-red-700'}>
//                   {isSignedIn ? '✅ Yes - User is logged in' : '❌ No - User must login first'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Clerk User ID */}
//         {isSignedIn && clerkUser && (
//           <div className="bg-white rounded-lg shadow-lg border-2 border-green-200 p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               🆔 Clerk User ID
//             </h2>

//             <div className="space-y-4">
//               {/* User ID Display */}
//               <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
//                 <p className="text-sm font-semibold text-gray-700 mb-2">User ID:</p>
//                 <div className="flex items-start gap-3">
//                   <code className="flex-1 text-sm md:text-base font-mono text-green-800 bg-white p-3 rounded border border-green-200 break-all">
//                     {clerkUser.id}
//                   </code>
//                   <button
//                     onClick={() => handleCopyId(clerkUser.id, 'clerk-id')}
//                     className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex-shrink-0 flex items-center gap-2"
//                   >
//                     <Copy className="w-4 h-4" />
//                     {copiedId === 'clerk-id' ? 'Copied!' : 'Copy'}
//                   </button>
//                 </div>
//               </div>

//               {/* User Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm font-semibold text-gray-700">Email:</p>
//                   <p className="text-green-800">{clerkUser.primaryEmailAddress?.emailAddress}</p>
//                 </div>
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm font-semibold text-gray-700">Name:</p>
//                   <p className="text-green-800">{clerkUser.fullName || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Firebase Document Check */}
//         {isSignedIn && clerkUser && (
//           <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               📁 Firestore Document Check
//             </h2>

//             <div className="space-y-4">
//               <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
//                 <p className="font-semibold text-gray-900 mb-2">⚠️ Quan trọng:</p>
//                 <p className="text-gray-700">
//                   Document trong Firestore <strong>PHẢI</strong> có field <code className="bg-white px-2 py-1 rounded">clerkId</code> với giá trị:
//                 </p>
//                 <code className="block mt-2 text-sm font-mono text-purple-800 bg-white p-3 rounded border border-purple-200 break-all">
//                   {clerkUser.id}
//                 </code>
//               </div>

//               <div className="p-4 bg-blue-50 rounded-lg">
//                 <p className="font-semibold text-gray-900 mb-2">✅ Khi lưu dữ liệu:</p>
//                 <pre className="text-xs md:text-sm font-mono text-blue-800 bg-white p-3 rounded border border-blue-200 overflow-auto">
// {`{
//   clerkId: "${clerkUser.id}",  // ← PHẢI bằng clerkUser.id
//   exam: "exam1",
//   part: "part1",
//   score: 85,
//   answers: ["A", "B", "C"],
//   totalQuestions: 3
// }`}
//                 </pre>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Firebase Rules Check */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-orange-200 p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             🔐 Firestore Rules Check
//           </h2>

//           <div className="space-y-4">
//             <div className="p-4 bg-orange-50 rounded-lg">
//               <p className="font-semibold text-gray-900 mb-2">Kiểm tra:</p>
//               <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
//                 <li>Firestore Database → <strong>Rules</strong> tab</li>
//                 <li>Tìm: <code className="bg-white px-1 rounded">allow create: if isAuthenticated()...</code></li>
//                 <li>Kiểm tra: <code className="bg-white px-1 rounded">request.resource.data.clerkId == request.auth.uid</code></li>
//                 <li>
//                   Nếu có → ✅ OK
//                   <br />
//                   Nếu không → ❌ Cần thêm vào
//                 </li>
//               </ol>
//             </div>

//             <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//               <p className="font-semibold text-gray-900 mb-2">⚠️ Phổ biến nhất:</p>
//               <p className="text-gray-700 mb-2">Nếu Rules quá mở:</p>
//               <code className="block text-xs font-mono text-yellow-800 bg-white p-2 rounded mb-2">
// {`match /userProgress/{docId} {
//   allow read, write: if true;  // ❌ Quá mở!
// }`}
//               </code>
//               <p className="text-gray-700">Thay đổi thành:</p>
//               <code className="block text-xs font-mono text-yellow-800 bg-white p-2 rounded">
// {`match /userProgress/{docId} {
//   allow read, write: if isAuthenticated();
// }`}
//               </code>
//             </div>
//           </div>
//         </div>

//         {/* Troubleshooting */}
//         <div className="bg-white rounded-lg shadow-lg border-2 border-red-200 p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             🔧 Nếu vẫn gặp permission-denied
//           </h2>

//           <div className="space-y-3">
//             <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
//               <p className="font-semibold text-gray-900">1. Kiểm tra Clerk User ID</p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Sao chép ID ở trên và so sánh với browser console
//               </p>
//             </div>

//             <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
//               <p className="font-semibold text-gray-900">2. Kiểm tra data lưu</p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Field <code className="bg-white px-1 rounded">clerkId</code> phải = User ID ở trên
//               </p>
//             </div>

//             <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
//               <p className="font-semibold text-gray-900">3. Kiểm tra Rules đã publish</p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Firebase Console → Firestore → Rules → Click Publish
//               </p>
//             </div>

//             <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
//               <p className="font-semibold text-gray-900">4. Clear cache & reload</p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Ctrl+Shift+Delete → Clear all → F5
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Copy Section */}
//         {isSignedIn && clerkUser && (
//           <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg border-2 border-green-300 p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               ⚡ Quick Copy
//             </h2>

//             <div className="space-y-3">
//               <button
//                 onClick={() => handleCopyId(clerkUser.id, 'test-data')}
//                 className="w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
//               >
//                 <Copy className="w-5 h-5" />
//                 {copiedId === 'test-data' ? 'Copied!' : 'Copy User ID'}
//               </button>

//               <div className="p-4 bg-white rounded-lg border-2 border-green-200">
//                 <p className="text-sm font-semibold text-gray-700 mb-2">Paste vào useUserProgress():</p>
//                 <code className="text-xs md:text-sm font-mono text-gray-800 break-all">
//                   clerkId: "{clerkUser.id}"
//                 </code>
//               </div>
//             </div>
//           </div>
//         )}

//         {!isSignedIn && (
//           <div className="bg-yellow-50 rounded-lg shadow-lg border-2 border-yellow-300 p-6 text-center">
//             <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
//             <h3 className="text-xl font-bold text-gray-900 mb-2">⚠️ Cần đăng nhập</h3>
//             <p className="text-gray-700">
//               Vui lòng đăng nhập bằng Clerk để kiểm tra UID matching
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClerkFirebaseUIDChecker;