export const EXAM2_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 2 (Chủ Đề Du Lịch & Công Việc)",
  description: "Bộ đề thi mở rộng với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Tập trung vào ngữ cảnh thực tế để nâng cao kỹ năng nghe-đọc. Part 1: 1 hội thoại chung cho 5 câu hỏi.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Anna và Ben về chuyến đi Paris, công việc, Tokyo, ngân sách, và hội nghị. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại thực tế HUFLIT).",
  type: "listening",
  script: "Anna: Hey Ben, you're back! How was the trip to Paris?\nBen: The flight itself was smooth, but the delay meant we arrived late. At least the views from the plane were stunning, so it wasn't all bad.\nAnna: That's travel for you! Speaking of deadlines, have you finished that quarterly report yet?\nBen: Almost. I'm through the main sections, but I still need more time for the charts and formatting. You know how those always take longer than expected.\nAnna: I understand. Just make sure to submit it by noon tomorrow, please. On a completely different note, I heard you're planning a trip to Tokyo. What's the hotel like there?\nBen: I've heard it's quite comfortable, but the travel advisor stressed that I must book early as it's peak season. I definitely don't want to miss out!\nAnna: Good advice. Before I forget, how's the budget for the new marketing project holding up? You mentioned it was running a little low.\nBen: The project itself is still on track, thankfully, but you're right, the budget is tight. We'll definitely need to review that next week to see if we can reallocate anything.\nAnna: Okay, put that meeting on the calendar. And last thing: I saw you at the Global Tech Conference last month. Did you enjoy it?\nBen: I did! It was great. I networked with experts in the AI field and got some really valuable contacts. It was certainly a great networking opportunity.\nAnna: Sounds productive! Well, catch you later.",
  questions: [
    {
      id: 1,
      question: "Why did the group arrive late in Paris?",
      options: [
        "(A) The flight had mechanical issues.",
        "(B) The flight was delayed.",
        "(C) They missed their train connection.",
        "(D) The airport was closed temporarily."
      ],
      correct: 1,
      explanation: "(B) Ben: '...but the delay meant we arrived late.' (Ben: '...nhưng sự chậm trễ khiến chúng tôi đến muộn.') - Luyện nghe chi tiết về nguyên nhân chậm trễ trong du lịch. Kiến thức ngữ pháp: Cấu trúc 'but + clause' (nhưng + mệnh đề) để diễn tả sự tương phản; thì quá khứ đơn 'meant' (có nghĩa là) chỉ kết quả của sự chậm trễ."
    },
    {
      id: 2,
      question: "What does the second colleague need?",
      options: [
        "(A) New software for charts.",
        "(B) More time for the charts.",
        "(C) Help from the team.",
        "(D) A different format."
      ],
      correct: 1,
      explanation: "(B) Ben: '...I still need more time for the charts and formatting.' (Ben: '...tôi vẫn cần thêm thời gian cho biểu đồ và định dạng.') - Luyện nghe về nhu cầu thời gian công việc. Kiến thức ngữ pháp: Cấu trúc 'need + noun' (cần + danh từ) để diễn tả nhu cầu; 'still' (vẫn) + thì hiện tại đơn để nhấn mạnh tình trạng kéo dài."
    },
    {
      id: 3,
      question: "Why should the student book early?",
      options: [
        "(A) The prices are increasing.",
        "(B) It's peak season.",
        "(C) The hotel is fully booked.",
        "(D) The advisor requires it."
      ],
      correct: 1,
      explanation: "(B) Ben: '...must book early as it's peak season.' (Ben: '...phải đặt sớm vì là mùa cao điểm.') - Luyện nghe lý do đặt chỗ du lịch. Kiến thức ngữ pháp: Cấu trúc 'must + V' (phải + động từ) để diễn tả sự bắt buộc; 'as' (vì) + mệnh đề chỉ lý do, với thì hiện tại đơn 'it's' (nó là)."
    },
    {
      id: 4,
      question: "What is the status of the project?",
      options: [
        "(A) Behind schedule.",
        "(B) Still on track.",
        "(C) Over budget only.",
        "(D) Completely finished."
      ],
      correct: 1,
      explanation: "(B) Ben: 'The project itself is still on track...' (Ben: 'Dự án vẫn đang đúng tiến độ...') - Luyện nghe trạng thái dự án. Kiến thức ngữ pháp: Cụm từ cố định 'on track' (đúng tiến độ) với thì hiện tại tiếp diễn 'is still' để nhấn mạnh tình trạng đang diễn ra; 'thankfully' (may mắn thay) làm trạng từ bổ nghĩa."
    },
    {
      id: 5,
      question: "What did the second friend do at the conference?",
      options: [
        "(A) Presented a paper.",
        "(B) Networked with experts.",
        "(C) Attended workshops.",
        "(D) Traveled alone."
      ],
      correct: 1,
      explanation: "(B) Ben: 'I networked with experts in the AI field...' (Ben: 'Tôi đã kết nối với các chuyên gia trong lĩnh vực AI...') - Luyện nghe hoạt động tại hội nghị. Kiến thức ngữ pháp: Thì quá khứ đơn 'networked' (kết nối) để diễn tả hành động hoàn thành; giới từ 'with' + danh từ (with experts) chỉ đối tượng tương tác."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa nhiều người. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Travel Agent: Welcome! Planning a trip to Europe?\nClient 1: Yes, for four of us. Two adults, two kids.\nClient 2: We'd like three nights in Rome and two in Paris.\nTravel Agent: Excellent. Flights from New York?\nClient 1: Direct to Rome, then train to Paris.\nClient 2: Budget around $5,000 total.\nTravel Agent: That covers economy flights and mid-range hotels. Any special requests?\nClient 1: Vegetarian meals for the kids.\nClient 2: And early check-in if possible.",
  questions: [
    { 
      id: 6, 
      question: "How many people are traveling?", 
      options: ["(A) Two", "(B) Three", "(C) Four", "(D) Five"], 
      correct: 2,
      explanation: "(C) Client 1: 'Yes, for four of us. Two adults, two kids.' (Client 1: 'Có, cho bốn người chúng tôi. Hai người lớn, hai trẻ em.') - Luyện nghe số lượng người trong du lịch nhóm. Kiến thức ngữ pháp: Cấu trúc 'for + số lượng + of us' (cho + số + chúng tôi) để chỉ nhóm người; số đếm 'two adults, two kids' (hai người lớn, hai trẻ em)."
    },
    { 
      id: 7, 
      question: "What is the total budget?", 
      options: ["(A) $3,000", "(B) $4,000", "(C) $5,000", "(D) $6,000"], 
      correct: 2,
      explanation: "(C) Client 2: 'Budget around $5,000 total.' (Client 2: 'Ngân sách khoảng $5,000 tổng cộng.') - Luyện nghe chi tiết ngân sách du lịch. Kiến thức ngữ pháp: Cụm từ 'around + số tiền' (khoảng + số) để diễn tả ước lượng; 'total' (tổng cộng) làm tính từ bổ nghĩa cho 'budget'."
    },
    { 
      id: 8, 
      question: "Where will they stay first?", 
      options: ["(A) Paris", "(B) New York", "(C) Rome", "(D) London"], 
      correct: 2,
      explanation: "(C) Client 1: 'Direct to Rome, then train to Paris.' (Client 1: 'Bay thẳng đến Rome, sau đó tàu đến Paris.') - Luyện nghe thứ tự địa điểm. Kiến thức ngữ pháp: Cấu trúc 'then + V' (sau đó + động từ) để chỉ thứ tự hành động; thì tương lai 'train to Paris' ngụ ý kế hoạch."
    },
    { 
      id: 9, 
      question: "What special request do the kids have?", 
      options: ["(A) Extra luggage", "(B) Vegetarian meals", "(C) Late checkout", "(D) Window seats"], 
      correct: 1,
      explanation: "(B) Client 1: 'Vegetarian meals for the kids.' (Client 1: 'Bữa ăn chay cho trẻ em.') - Luyện nghe yêu cầu đặc biệt. Kiến thức từ vựng: 'Vegetarian meals' (bữa ăn chay) là cụm từ chuyên ngành du lịch; giới từ 'for the kids' chỉ đối tượng yêu cầu."
    },
    { 
      id: 10, 
      question: "How will they travel between cities?", 
      options: ["(A) By car", "(B) By plane", "(C) By train", "(D) By bus"], 
      correct: 2,
      explanation: "(C) Client 1: '...then train to Paris.' (Client 1: '...sau đó tàu đến Paris.') - Luyện nghe phương tiện di chuyển. Kiến thức ngữ pháp: Cụm giới từ 'by + phương tiện' (bằng + tàu = by train) để diễn tả cách thức di chuyển; thì tương lai ngụ ý."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Manager: Hello, colleagues. This quarterly review is straightforward. We've met our sales targets since last quarter, thanks to the new marketing push. If you miss the deadline for reports next Friday, expect a formal warning – no extensions. Remember, teamwork like Sarah's project last month sets the standard; she coordinated flawlessly. Finally, the office cafeteria now offers sustainable options: organic salads, vegan stir-fries, and gluten-free desserts – all highly recommended for lunch breaks.",
  questions: [
    { 
      id: 11, 
      question: "The review is described as __________.", 
      options: ["(A) complex", "(B) straightforward", "(C) lengthy", "(D) optional"], 
      correct: 1,
      explanation: "(B) Manager: 'This quarterly review is straightforward.' (Manager: 'Báo cáo quý này đơn giản.') - Luyện nghe mô tả dạng bài nói. Kiến thức từ vựng: 'Straightforward' (đơn giản, trực tiếp) là tính từ miêu tả phong cách; thì hiện tại đơn 'is' để diễn tả đặc điểm chung."
    },
    { 
      id: 12, 
      question: "Sales targets have been met __________.", 
      options: ["(A) barely", "(B) since last quarter", "(C) next month", "(D) annually"], 
      correct: 1,
      explanation: "(B) Manager: 'We've met our sales targets since last quarter...' (Manager: 'Chúng ta đã đạt mục tiêu bán hàng từ quý trước...') - Luyện nghe thời gian thành tích. Kiến thức ngữ pháp: Thì hiện tại hoàn thành 'have met' + 'since + mốc thời gian' (từ + quá khứ) để diễn tả hành động từ quá khứ đến nay."
    },
    { 
      id: 13, 
      question: "What happens if a report deadline is missed?", 
      options: ["(A) Automatic extension", "(B) Formal warning", "(C) Bonus points", "(D) No penalty"], 
      correct: 1,
      explanation: "(B) Manager: 'If you miss the deadline... expect a formal warning...' (Manager: 'Nếu bạn bỏ lỡ deadline... sẽ nhận cảnh cáo chính thức...') - Luyện nghe hậu quả vi phạm. Kiến thức ngữ pháp: Câu điều kiện loại 1 'If + hiện tại, will + V' (nếu + hiện tại, sẽ + động từ) để diễn tả hậu quả có thể xảy ra."
    },
    { 
      id: 14, 
      question: "Sarah's project is praised for __________.", 
      options: ["(A) innovation", "(B) coordination", "(C) budget savings", "(D) speed"], 
      correct: 1,
      explanation: "(B) Manager: '...teamwork like Sarah's project... she coordinated flawlessly.' (Manager: '...làm việc nhóm như dự án của Sarah... cô ấy phối hợp hoàn hảo.') - Luyện nghe khen ngợi kỹ năng. Kiến thức ngữ pháp: Thì quá khứ đơn 'coordinated' (phối hợp) trong mệnh đề quan hệ; 'flawlessly' (một cách hoàn hảo) là trạng từ bổ nghĩa động từ."
    },
    { 
      id: 15, 
      question: "The cafeteria now offers __________ options.", 
      options: ["(A) expensive", "(B) sustainable", "(C) limited", "(D) all of the above"], 
      correct: 1,
      explanation: "(B) Manager: '...the office cafeteria now offers sustainable options...' (Manager: '...căng tin văn phòng giờ có lựa chọn bền vững...') - Luyện nghe thay đổi tiện ích. Kiến thức từ vựng: 'Sustainable options' (lựa chọn bền vững) là cụm từ hiện đại chỉ thân thiện môi trường; thì hiện tại đơn 'offers' để diễn tả thực tế mới."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "HR Rep: Welcome to the interview. Tell us about your experience.\nCandidate: I have five years in sales, mostly remote. Last role was with a tech firm in Berlin.\nInterviewer 1: Why relocate to Hanoi?\nCandidate: For career growth and family ties.\nInterviewer 2: Salary expectations?\nCandidate: Around 1,200 USD monthly, plus benefits.\nHR Rep: We offer relocation support but need two references.\nCandidate: Happy to provide.\nInterviewer 1: Start date?\nCandidate: Available next month.",
  questions: [
    { 
      id: 16, 
      question: "The candidate's experience is in __________.", 
      options: ["(A) marketing", "(B) sales", "(C) HR", "(D) tech support"], 
      correct: 1,
      explanation: "(B) Candidate: 'I have five years in sales...' (Ứng viên: 'Tôi có 5 năm kinh nghiệm bán hàng...') - Luyện nghe lĩnh vực kinh nghiệm. Kiến thức ngữ pháp: Thì hiện tại hoàn thành 'have + V3' (có + quá khứ phân từ) để diễn tả kinh nghiệm đến nay; 'in sales' là giới từ chỉ lĩnh vực."
    },
    { 
      id: 17, 
      question: "Why is the candidate relocating?", 
      options: ["(A) Better weather", "(B) Career and family", "(C) Lower costs", "(D) Education"], 
      correct: 1,
      explanation: "(B) Candidate: 'For career growth and family ties.' (Ứng viên: 'Để phát triển sự nghiệp và ràng buộc gia đình.') - Luyện nghe lý do di chuyển. Kiến thức ngữ pháp: Cấu trúc 'for + noun' (để + danh từ) lặp lại để liệt kê lý do; 'and' nối hai danh từ song song (career growth and family ties)."
    },
    { 
      id: 18, 
      question: "What salary does the candidate expect?", 
      options: ["(A) 800 USD", "(B) 1,200 USD", "(C) 1,500 USD", "(D) 2,000 USD"], 
      correct: 1,
      explanation: "(B) Candidate: 'Around 1,200 USD monthly...' (Ứng viên: 'Khoảng 1,200 USD hàng tháng...') - Luyện nghe kỳ vọng lương. Kiến thức ngữ pháp: 'Around + số' (khoảng + số) để ước lượng; 'monthly' (hàng tháng) là trạng từ tần suất bổ nghĩa cho 'USD'."
    },
    { 
      id: 19, 
      question: "What does the company offer for relocation?", 
      options: ["(A) Full funding", "(B) Support package", "(C) Nothing", "(D) Housing"], 
      correct: 1,
      explanation: "(B) HR Rep: 'We offer relocation support...' (HR: 'Chúng tôi hỗ trợ di chuyển...') - Luyện nghe lợi ích công ty. Kiến thức ngữ pháp: Thì hiện tại đơn 'offer' (cung cấp) để diễn tả chính sách chung; 'relocation support' là danh từ ghép chỉ gói hỗ trợ."
    },
    { 
      id: 20, 
      question: "When can the candidate start?", 
      options: ["(A) Immediately", "(B) Next week", "(C) Next month", "(D) In three months"], 
      correct: 2,
      explanation: "(C) Candidate: 'Available next month.' (Ứng viên: 'Có sẵn tháng sau.') - Luyện nghe thời gian bắt đầu. Kiến thức ngữ pháp: Tính từ 'available' (có sẵn) + 'next month' (tháng sau) để diễn tả khả năng; thì tương lai ngụ ý với 'next'."
    }
  ]
},
   part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    { 
      id: 21, 
      question: "Customer reviews indicate that many modern mobile devices are often unnecessarily _______.", 
      options: ["(A) Complication", "(B) Complicates", "(C) Complicate", "(D) Complicated"], 
      correct: 3,
      explanation: "(D) 'Complicated' phù hợp với ngữ cảnh mô tả trạng thái (complicated = phức tạp) - Luyện ngữ pháp tính từ sau 'are'. Kiến thức ngữ pháp: Đây là cấu trúc 'be + past participle' (thì hiện tại đơn thụ động) để diễn tả trạng thái; 'complicated' là tính từ (past participle của 'complicate'), không phải danh từ (A), động từ ngôi thứ ba số ít (B), hoặc động từ nguyên thể số nhiều (C)."
    },
    { 
      id: 22, 
      question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.", 
      options: ["(A) who", "(B) whose", "(C) they", "(D) those"], 
      correct: 3,
      explanation: "(D) 'Those' làm chủ ngữ của mệnh đề quan hệ (those recognized = những người được công nhận) - Luyện mệnh đề quan hệ. Kiến thức ngữ pháp: Cấu trúc đảo ngữ 'Among + those + past participle' (giữa những người được công nhận) với đại từ chỉ định 'those' (số nhiều, thay thế danh từ không xác định); 'who' (đại từ quan hệ chủ ngữ), 'whose' (sở hữu), 'they' (đại từ nhân xưng) không phù hợp với vị trí."
    },
    { 
      id: 23, 
      question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.", 
      options: ["(A) despite", "(B) except", "(C) since", "(D) during"], 
      correct: 2,
      explanation: "(C) 'Since' chỉ thời điểm bắt đầu và tiếp tục đến hiện tại (since = từ khi) - Luyện liên từ thời gian. Kiến thức ngữ pháp: 'Since + mốc thời gian cụ thể' (since he joined) kết hợp với thì hiện tại hoàn thành 'has received' để diễn tả hành động bắt đầu từ quá khứ và kéo dài đến nay; 'despite' (mặc dù), 'except' (ngoại trừ), 'during' (trong suốt) không diễn tả sự tiếp diễn."
    },
    { 
      id: 24, 
      question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no __________ dyes.", 
      options: ["(A) immediate", "(B) synthetic", "(C) reasonable", "(D) assumed"], 
      correct: 1,
      explanation: "(B) 'Synthetic' đối lập 'natural' (synthetic = nhân tạo) - Luyện từ vựng đối lập. Kiến thức từ vựng: 'Synthetic' là tính từ chuyên ngành chỉ chất liệu nhân tạo (trái ngược 'natural'); các lựa chọn khác như 'immediate' (ngay lập tức), 'reasonable' (hợp lý), 'assumed' (giả định) không liên quan đến ngữ cảnh chất liệu vải."
    },
    { 
      id: 25, 
      question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.", 
      options: ["(A) regular", "(B) regularity", "(C) regulate", "(D) regularly"], 
      correct: 3,
      explanation: "(D) 'Regularly' là trạng từ bổ nghĩa cho động từ 'learning' (regularly = thường xuyên) - Luyện trạng từ. Kiến thức ngữ pháp: Trạng từ tần suất 'regularly' bổ nghĩa động từ 'learning' (hành động); không dùng tính từ (A), danh từ (B), hoặc động từ (C) ở vị trí này."
    },
    { 
      id: 26, 
      question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.", 
      options: ["(A) include", "(B) includes", "(C) included", "(D) including"], 
      correct: 0,
      explanation: "(A) 'Include' dạng nguyên thể sau 'will' (include = bao gồm) - Luyện động từ sau modal 'will'. Kiến thức ngữ pháp: Cấu trúc tương lai 'will + base verb' (will + động từ nguyên thể); không dùng ngôi thứ ba số ít (B), quá khứ phân từ (C), hoặc giới từ + V-ing (D)."
    },
    { 
      id: 27, 
      question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.", 
      options: ["(A) before", "(B) during", "(C) between", "(D) unless"], 
      correct: 0,
      explanation: "(A) 'Before' chỉ thời gian trước khi (before = trước khi) - Luyện liên từ thời gian. Kiến thức ngữ pháp: 'Before + V-ing' (trước khi + danh động từ) chỉ thứ tự hành động; 'during' (trong khi), 'between' (giữa), 'unless' (trừ khi) không diễn tả thứ tự trước-sau."
    },
    { 
      id: 28, 
      question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.", 
      options: ["(A) independence", "(B) independently", "(C) independent", "(D) dependently"], 
      correct: 1,
      explanation: "(B) 'Independently' trạng từ bổ nghĩa động từ 'work' (independently = độc lập) - Luyện trạng từ. Kiến thức ngữ pháp: Trạng từ 'independently' (cách thức) bổ nghĩa động từ 'work'; danh từ (A), tính từ (C), hoặc trạng từ ngược (D) không phù hợp."
    },
    { 
      id: 29, 
      question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.", 
      options: ["(A) postponed", "(B) postponing", "(C) postpone", "(D) postpones"], 
      correct: 0,
      explanation: "(A) 'Postponed' dạng phân từ quá khứ sau 'has been' (postponed = hoãn) - Luyện thì hiện tại hoàn thành thụ động. Kiến thức ngữ pháp: Thì hiện tại hoàn thành thụ động 'has been + past participle' để diễn tả hành động hoàn thành gần đây với kết quả kéo dài; không dùng V-ing (B), nguyên thể (C), hoặc ngôi thứ ba (D)."
    },
    { 
      id: 30, 
      question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.", 
      options: ["(A) environment", "(B) equipment", "(C) advertisement", "(D) appointment"], 
      correct: 0,
      explanation: "(A) 'Environment' phù hợp ngữ cảnh (environment = môi trường làm việc) - Luyện từ vựng ngữ cảnh công việc. Kiến thức từ vựng: 'Positive environment' (môi trường tích cực) là cụm từ phổ biến chỉ không khí làm việc; 'equipment' (thiết bị), 'advertisement' (quảng cáo), 'appointment' (cuộc hẹn) không liên quan."
    }
  ]
},
part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: All Marketing Department Staff
From: Clara Lee, Marketing Director
Subject: Upcoming Product Launch Preparation
Dear Team,
As you all know, we are preparing for the official launch of our new product line, the EcoSmart Home Series, scheduled for early next quarter. In order to ensure a successful debut, we will begin a series of meetings next week to finalize the promotional strategy. Each team member will be assigned specific responsibilities to (31) smooth coordination between departments.
Our primary objective is to increase brand awareness and attract potential customers through both online and offline marketing channels. The social media team will focus on digital advertising, while the design team will create visual materials to (32) our brand image.
Additionally, we will collaborate closely with our sales representatives to collect feedback from clients. This will help us make any necessary adjustments before the official release. Please note that all suggestions should be submitted to my office no later than Friday, March 22, so that we have enough time to review and (33) them.
The official press conference will take place at our headquarters on April 5. We expect several major media outlets to attend, so everyone must be prepared to present our product in the most professional manner possible. A rehearsal session will be held two days before the event to (34) that all participants are comfortable with their roles.
For those who are new to the team, we will organize a short orientation program to explain our marketing policies and internal communication procedures. Attendance is highly encouraged, as this session will provide essential information on how to (35) with other departments effectively.
We truly appreciate everyone's dedication and teamwork during this busy time. Your hard work and creativity will certainly make this product launch a success. If you have any questions or concerns, please don't hesitate to (36) me directly.
Thank you once again for your continued commitment to excellence. I am confident that, together, we will achieve outstanding results.
Best regards,
Clara Lee
Marketing Director`,
  questions: [
    { 
      id: 31, 
      question: "(31)", 
      options: ["(A) ensure", "(B) suggest", "(C) describe", "(D) remind"], 
      correct: 0,
      explanation: "(A) 'Ensure' phù hợp ngữ cảnh đảm bảo (ensure = đảm bảo) - Luyện từ vựng quản lý. Kiến thức ngữ pháp: Động từ 'ensure + noun' (đảm bảo + danh từ) trong cấu trúc mục đích; thì tương lai 'will be assigned' ngụ ý hành động hỗ trợ phối hợp suôn sẻ; 'suggest' (gợi ý), 'describe' (mô tả), 'remind' (nhắc nhở) không diễn tả đảm bảo."
    },
    { 
      id: 32, 
      question: "(32)", 
      options: ["(A) attend", "(B) improve", "(C) reinforce", "(D) prevent"], 
      correct: 2,
      explanation: "(C) 'Reinforce' nghĩa củng cố hình ảnh (reinforce = củng cố) - Luyện từ vựng marketing. Kiến thức ngữ pháp: Động từ 'create... to + V' (tạo... để + động từ) chỉ mục đích; 'reinforce' là động từ phù hợp với tân ngữ 'brand image' (hình ảnh thương hiệu); 'attend' (tham dự), 'improve' (cải thiện), 'prevent' (ngăn chặn) không liên quan đến củng cố."
    },
    { 
      id: 33, 
      question: "(33)", 
      options: ["(A) reject", "(B) implement", "(C) transfer", "(D) decline"], 
      correct: 1,
      explanation: "(B) 'Implement' nghĩa thực hiện (implement = thực hiện) - Luyện từ vựng hành động. Kiến thức ngữ pháp: Động từ 'review and + V' (xem xét và + động từ) song song; 'implement' + tân ngữ 'them' (suggestions) để diễn tả áp dụng ý kiến; 'reject' (từ chối), 'transfer' (chuyển giao), 'decline' (từ chối lịch sự) mang nghĩa tiêu cực."
    },
    { 
      id: 34, 
      question: "(34)", 
      options: ["(A) warn", "(B) announce", "(C) require", "(D) ensure"], 
      correct: 3,
      explanation: "(D) 'Ensure' đảm bảo thoải mái (ensure = đảm bảo) - Luyện từ vựng lập kế hoạch. Kiến thức ngữ pháp: Cấu trúc 'to + V + that-clause' (để + động từ + mệnh đề that) với 'ensure' chỉ mục đích; 'that all participants are comfortable' là mệnh đề danh từ; 'warn' (cảnh báo), 'announce' (thông báo), 'require' (yêu cầu) không nhấn mạnh đảm bảo."
    },
    { 
      id: 35, 
      question: "(35)", 
      options: ["(A) compete", "(B) cooperate", "(C) complain", "(D) compare"], 
      correct: 1,
      explanation: "(B) 'Cooperate' hợp tác hiệu quả (cooperate = hợp tác) - Luyện từ vựng làm việc nhóm. Kiến thức ngữ pháp: Động từ 'how to + V' (cách + động từ nguyên thể) trong mệnh đề danh từ; 'cooperate with' (hợp tác với) là cụm động từ cố định; 'compete' (cạnh tranh), 'complain' (phàn nàn), 'compare' (so sánh) không phù hợp với 'effectively' (hiệu quả)."
    },
    { 
      id: 36, 
      question: "(36)", 
      options: ["(A) reach", "(B) push", "(C) delay", "(D) ignore"], 
      correct: 0,
      explanation: "(A) 'Reach' liên lạc trực tiếp (reach = liên lạc) - Luyện từ vựng giao tiếp. Kiến thức ngữ pháp: Cụm động từ 'reach + object' (liên lạc + đối tượng) trong câu yêu cầu lịch sự; 'don't hesitate to + V' (đừng ngần ngại + động từ); 'push' (thúc đẩy), 'delay' (trì hoãn), 'ignore' (bỏ qua) mang nghĩa không phù hợp."
    },
    { 
      id: 37, 
      question: "The EcoSmart Home Series will most likely be released (37).", 
      options: ["(A) next week", "(B) early next quarter", "(C) by the end of the year", "(D) after the press conference"], 
      correct: 1,
      explanation: "(B) 'Scheduled for early next quarter' (Lịch trình đầu quý sau) - Luyện nghe chi tiết thời gian. Kiến thức đọc hiểu: Xác định thời gian từ thì tương lai 'scheduled for' (lên lịch cho); 'early next quarter' là cụm từ kinh doanh chỉ đầu quý tài chính; các lựa chọn khác không khớp với 'next quarter'."
    },
    { 
      id: 38, 
      question: "What is the main purpose of this message?", 
      options: ["(A) To introduce a new marketing policy", "(B) To inform staff of product launch preparations", "(C) To announce the cancellation of a campaign", "(D) To request client feedback after the event"], 
      correct: 1,
      explanation: "(B) 'We are preparing for the official launch...' (Chúng ta đang chuẩn bị cho ra mắt chính thức...) - Luyện nghe mục đích email. Kiến thức đọc hiểu: Mục đích chính từ tiêu đề 'Upcoming Product Launch Preparation' (Chuẩn bị ra mắt sản phẩm sắp tới) và nội dung lặp lại 'preparing', 'finalize', 'meetings'; loại trừ các mục đích tiêu cực hoặc không liên quan."
    },
    { 
      id: 39, 
      question: "Who is the sender of this message?", 
      options: ["(A) A sales representative", "(B) A design manager", "(C) The marketing director", "(D) The chief financial officer"], 
      correct: 2,
      explanation: "(C) 'From: Clara Lee, Marketing Director' (Từ: Clara Lee, Giám đốc Marketing) - Luyện đọc chi tiết người gửi. Kiến thức đọc hiểu: Xác định vai trò từ phần 'From' và chữ ký 'Marketing Director'; cấu trúc email tiêu chuẩn với 'From' chỉ người gửi."
    },
    { 
      id: 40, 
      question: "When will the rehearsal for the press conference take place?", 
      options: ["(A) March 22", "(B) April 3", "(C) April 5", "(D) The following week"], 
      correct: 1,
      explanation: "(B) 'A rehearsal session will be held two days before the event (April 5).' (Buổi diễn tập sẽ được tổ chức hai ngày trước sự kiện (5/4). → 3/4) - Luyện tính toán thời gian. Kiến thức đọc hiểu: Suy luận từ 'two days before' (hai ngày trước) + ngày sự kiện 'April 5' = April 3; thì tương lai 'will be held' chỉ kế hoạch."
    }
  ]
},
part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**Business Audio Pro**

Enhance Your Company's Image with Professional Voice Services

**About Us**
Business Audio Pro specializes in professional voice recordings for businesses of all sizes. We help you create a lasting first impression with high-quality, customized audio solutions.

**Our Services**

1. **Professional Voice Talent** – Choose from our diverse roster of male and female voice actors with various tones, accents, and dialects. Visit our website to hear voice samples and select the perfect voice for your brand.

2. **On-Hold Messages** – Keep your customers engaged while they wait with professionally recorded on-hold messages featuring pleasant background music.

3. **Customized Script Writing** – Our experienced writers craft personalized scripts that effectively represent your business and communicate your message.

4. **Multilingual Voice Production** – Recently expanded! We now offer voice recording services in a wide range of languages to serve your diverse customer base.

**Why Choose Us?**
• Quick turnaround: Response within 24 hours
• Easy online system: Add phone numbers and submit payments through our website
• Professional quality guaranteed
• Competitive pricing

Visit www.businessaudiopro.com today or email us at inquiry@businessaudiopro.com to get started!

---

**To:** inquiry@businessaudiopro.com
**From:** j.annesly@anneslydata.com
**Date:** June 25
**Subject:** Request for Voice Recording Services

Dear Business Audio Pro,

I found your advertisement in the newspaper and am interested in using your services for my data-processing and transcription business, Annesly Data.

I am specifically looking for professional voice talent to create on-hold messages and customized scripts for my clients. Since I work with both English- and Spanish-speaking clients, I would like the recordings to be available in both languages.

I do not need music samples at this time, as I already have background music selected. However, I would appreciate it if you could provide me with some voice actor samples in both English and Spanish so I can choose the most suitable voices for my business.

Please call me during business hours to discuss the project details, timeline, and pricing. I am available between 10:00 A.M. and 5:00 P.M. at the phone number listed below.

I look forward to working with you.

Best regards,

Ms. Jody Annesly
Owner, Annesly Data
Mobile: 512-555-6879
Business Hours: 10:00 A.M. - 5:00 P.M.`,
  
  questions: [
    { 
      id: 41, 
      question: "According to the advertisement, why should customers visit the Business Audio Pro Web site?", 
      options: [
        "(A) To hear voice samples", 
        "(B) To add a new phone number", 
        "(C) To submit a credit card payment", 
        "(D) To request recording equipment"
      ], 
      correct: 0,
      explanation: "(A) 'Visit our website to hear voice samples and select the perfect voice for your brand.' (Ghé thăm website để nghe mẫu giọng nói và chọn giọng hoàn hảo cho thương hiệu của bạn.) - Luyện đọc chi tiết quảng cáo. Kiến thức đọc hiểu: Xác định mục đích từ phần dịch vụ 'Professional Voice Talent'; thì mệnh lệnh 'Visit... to + V' (ghé thăm... để + động từ) chỉ hành động khuyến khích."
    },
    { 
      id: 42, 
      question: "What is suggested about Business Audio Pro?", 
      options: [
        "(A) It fills orders once a week.", 
        "(B) It advertises in the newspaper.", 
        "(C) It specializes in data-processing services.", 
        "(D) It has recently expanded its business."
      ], 
      correct: 3,
      explanation: "(D) 'Multilingual Voice Production – Recently expanded!' (Sản xuất giọng nói đa ngôn ngữ – Vừa mới mở rộng!) - Luyện suy luận từ ngữ 'recently expanded'. Kiến thức đọc hiểu: Suy luận từ cụm từ 'Recently expanded!' (vừa mở rộng) trong phần dịch vụ; thì hiện tại hoàn thành ngụ ý sự thay đổi gần đây."
    },
    { 
      id: 43, 
      question: "Who most likely is Ms. Annesly?", 
      options: [
        "(A) An actor", 
        "(B) A script writer", 
        "(C) A sales associate", 
        "(D) A business owner"
      ], 
      correct: 3,
      explanation: "(D) Email signature: 'Owner, Annesly Data' (Chủ sở hữu, Annesly Data.) - Luyện đọc chi tiết chữ ký email. Kiến thức đọc hiểu: Xác định vai trò từ chữ ký 'Owner' (chủ sở hữu); cấu trúc email với 'Best regards' + tên + chức vụ là tiêu chuẩn chuyên nghiệp."
    },
    { 
      id: 44, 
      question: "What service does Ms. Annesly NOT request from Business Audio Pro?", 
      options: [
        "(A) Professional voice talent", 
        "(B) On-hold messages", 
        "(C) Customized script writing", 
        "(D) Background music production"
      ], 
      correct: 3,
      explanation: "(D) 'I do not need music samples at this time, as I already have background music selected.' (Tôi không cần mẫu nhạc vào lúc này vì tôi đã chọn nhạc nền rồi.) - Luyện đọc phủ định để loại trừ dịch vụ không yêu cầu. Kiến thức ngữ pháp: Câu phủ định 'do not need' (không cần) với lý do 'as' (vì) + mệnh đề; 'at this time' (lúc này) chỉ thời điểm cụ thể."
    },
    { 
      id: 45, 
      question: "What will Ms. Annesly most likely receive within 24 hours?", 
      options: [
        "(A) A completed voice recording", 
        "(B) Voice actor samples", 
        "(C) A written contract", 
        "(D) A phone call from a representative"
      ], 
      correct: 3,
      explanation: "(D) Advertisement states 'Response within 24 hours' và Ms. Annesly yêu cầu 'Please call me during business hours.' (Phản hồi trong 24 giờ và vui lòng gọi cho tôi trong giờ làm việc.) - Luyện kết hợp thông tin từ hai văn bản. Kiến thức đọc hiểu: Kết nối 'Response within 24 hours' (phản hồi trong 24 giờ) từ quảng cáo với yêu cầu 'call me' (gọi tôi) từ email; thì tương lai ngụ ý 'will receive'."
    },
    { 
      id: 46, 
      question: "According to the advertisement, Business Audio Pro will respond to customer inquiries within", 
      options: [
        "(A) 12 hours", 
        "(B) 24 hours", 
        "(C) 48 hours", 
        "(D) three business days"
      ], 
      correct: 1,
      explanation: "(B) 'Quick turnaround: Response within 24 hours' (Xử lý nhanh: Phản hồi trong 24 giờ.) - Luyện đọc chi tiết thời gian trong quảng cáo. Kiến thức ngữ pháp: Cụm từ 'within + khoảng thời gian' (trong vòng + thời gian) chỉ giới hạn thời gian; 'response' (phản hồi) là danh từ chỉ hành động."
    },
    { 
      id: 47, 
      question: "What can be inferred about Business Audio Pro's services?", 
      options: [
        "(A) They are limited to English-speaking clients.", 
        "(B) They are available only on weekends.", 
        "(C) They can accommodate different languages.", 
        "(D) They require customers to visit the office in person."
      ], 
      correct: 2,
      explanation: "(C) 'Multilingual Voice Production – Recently expanded! We now offer voice recording services in a wide range of languages.' (Sản xuất giọng nói đa ngôn ngữ – Vừa mở rộng! Chúng tôi cung cấp dịch vụ ghi âm bằng nhiều ngôn ngữ.) - Luyện suy luận từ 'multilingual' và 'wide range of languages'. Kiến thức đọc hiểu: Suy luận từ 'wide range of languages' (nhiều ngôn ngữ) và 'multilingual' (đa ngôn ngữ); thì hiện tại đơn 'offer' chỉ dịch vụ sẵn có."
    },
    { 
      id: 48, 
      question: "What does Ms. Annesly specifically request in her message?", 
      options: [
        "(A) A sample of background music", 
        "(B) Voice recordings in two languages", 
        "(C) A newspaper advertisement", 
        "(D) A refund for a previous order"
      ], 
      correct: 1,
      explanation: "(B) 'I would like the recordings to be available in both languages' (English and Spanish). (Tôi muốn các bản ghi âm có sẵn bằng cả hai ngôn ngữ - Anh và Tây Ban Nha.) - Luyện đọc yêu cầu cụ thể trong email. Kiến thức ngữ pháp: Cấu trúc 'would like + noun + to be + adj' (muốn + danh từ + là + tính từ); 'both languages' (cả hai ngôn ngữ) chỉ số lượng."
    },
    { 
      id: 49, 
      question: "What information does Ms. Annesly provide to make communication easier?", 
      options: [
        "(A) Her office address", 
        "(B) Her preferred contact hours", 
        "(C) Her company's website link", 
        "(D) Her client testimonials"
      ], 
      correct: 1,
      explanation: "(B) 'I am available between 10:00 A.M. and 5:00 P.M.' và 'Business Hours: 10:00 A.M. - 5:00 P.M.' (Tôi có mặt từ 10 giờ sáng đến 5 giờ chiều.) - Luyện đọc thông tin liên lạc trong email. Kiến thức ngữ pháp: Cụm 'between + thời gian + and + thời gian' (giữa + thời gian + và + thời gian) chỉ khoảng giờ; thì hiện tại đơn 'am available' diễn tả khả năng chung."
    },
    { 
      id: 50, 
      question: "What is the likely next step for Business Audio Pro?", 
      options: [
        "(A) Sending Ms. Annesly a written contract", 
        "(B) Visiting Ms. Annesly's office for recording", 
        "(C) Calling Ms. Annesly to discuss project details and pricing", 
        "(D) Posting a new advertisement in the newspaper"
      ], 
      correct: 2,
      explanation: "(C) Ms. Annesly requests: 'Please call me during business hours to discuss the project details, timeline, and pricing.' (Vui lòng gọi cho tôi trong giờ làm việc để thảo luận chi tiết dự án, thời gian và giá cả.) - Luyện suy luận hành động tiếp theo từ yêu cầu rõ ràng trong email. Kiến thức đọc hiểu: Suy luận từ 'please call... to discuss' (vui lòng gọi... để thảo luận) và 'response within 24 hours' từ quảng cáo; thì tương lai ngụ ý 'likely next step'."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Emma Wilson (09:15): Hi John, I've arrived at the conference venue early.
John Martinez (09:18): Still about 20 minutes away. Traffic on Main Street is terrible!
Emma Wilson (09:20): No problem. I'll check in and save you a seat at our table.
John Martinez (09:22): Thanks! Did you bring the presentation slides on USB drive?
Emma Wilson (09:24): Yes, I have them and a backup copy on my laptop, just in case.
John Martinez (09:26): Great! The venue is near the shopping mall, right?
Emma Wilson (09:27): That's correct. Use the east entrance - parking is easier there.
John Martinez (09:30): Perfect. See you in about 15 minutes. Can't wait!`,
  
  questions: [
    { 
      id: 51, 
      question: "Where is Emma currently located?", 
      options: [
        "(A) At a shopping mall", 
        "(B) At a conference venue", 
        "(C) On Main Street", 
        "(D) In a parking lot"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) At a conference venue. Giải thích: Emma nói 'I've arrived at the conference venue early' (Tôi đã đến sân khấu hội nghị sớm) - Luyện đọc thông tin trực tiếp. Kiến thức ngữ pháp: Thì hiện tại hoàn thành 'I've arrived' (tôi đã đến) để diễn tả hành động vừa hoàn thành; 'at the conference venue' là cụm giới từ chỉ vị trí."
    },
    { 
      id: 52, 
      question: "What does Emma offer to do for John?", 
      options: [
        "(A) Pick him up at the mall", 
        "(B) Drive to get him from traffic", 
        "(C) Save him a seat at their table", 
        "(D) Prepare the presentation slides"
      ], 
      correct: 2,
      explanation: "Đáp án đúng: (C) Save him a seat at their table. Giải thích: 'I'll check in and save you a seat at our table' (Tôi sẽ đăng ký và giữ chỗ cho bạn tại bàn của chúng ta) - Luyện xác định lời đề nghị cụ thể. Kiến thức ngữ pháp: Thì tương lai 'I'll + V' (tôi sẽ + động từ) để diễn tả lời hứa; 'at our table' (tại bàn của chúng ta) với đại từ sở hữu 'our' chỉ nhóm."
    },
    { 
      id: 53, 
      question: "Why is John delayed?", 
      options: [
        "(A) He is checking in at registration", 
        "(B) There is heavy traffic on Main Street", 
        "(C) He forgot to bring the slides", 
        "(D) He is shopping at the mall"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) There is heavy traffic on Main Street. Giải thích: 'Traffic on Main Street is terrible!' (Giao thông trên Đường Main rất tệ!) - Luyện tìm kiếm nguyên nhân sự chậm trễ. Kiến thức ngữ pháp: Thì hiện tại đơn 'is' (là) để diễn tả tình trạng hiện tại; 'heavy traffic' (giao thông đông đúc) là danh từ ghép chỉ nguyên nhân."
    },
    { 
      id: 54, 
      question: "What precaution does Emma take regarding the presentation?", 
      options: [
        "(A) She prints multiple copies", 
        "(B) She brings a USB drive and a laptop backup", 
        "(C) She sends it to John's email", 
        "(D) She stores it in the cloud"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) She brings a USB drive and a laptop backup. Giải thích: 'Yes, I have them and a backup copy on my laptop, just in case' (Có, tôi có chúng và một bản sao dự phòng trên laptop, phòng trường hợp) - Luyện hiểu các biện pháp phòng ngừa. Kiến thức ngữ pháp: Cụm 'just in case' (phòng trường hợp) chỉ lý do dự phòng; thì hiện tại đơn 'have' (có) liệt kê các bản sao."
    },
    { 
      id: 55, 
      question: "What does John ask to confirm about the venue location?", 
      options: [
        "(A) Whether it's near a shopping mall", 
        "(B) Whether the east entrance is easier", 
        "(C) Whether Emma is already there", 
        "(D) Whether parking is available"
      ], 
      correct: 0,
      explanation: "Đáp án đúng: (A) Whether it's near a shopping mall. Giải thích: 'The venue is near the shopping mall, right?' (Sân khấu ở gần trung tâm mua sắm phải không?) - Luyện xác định câu hỏi xác nhận. Kiến thức ngữ pháp: Câu hỏi đuôi 'right?' (phải không?) để xác nhận thông tin; thì hiện tại đơn 'is' trong mệnh đề chính."
    },
    { 
      id: 56, 
      question: "What can be inferred about Emma and John's relationship?", 
      options: [
        "(A) They are attending the conference for the first time together.", 
        "(B) They are colleagues who have worked together before.", 
        "(C) They are competitors at the conference.", 
        "(D) They just met at the registration desk."
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) They are colleagues who have worked together before. Giải thích: Họ nói 'our table' (bàn của chúng ta), ngụ ý cùng nhóm; 'the presentation' (bài thuyết trình) chung. - Luyện suy luận mối quan hệ. Kiến thức đọc hiểu: Suy luận từ đại từ sở hữu 'our' (của chúng ta) và ngữ cảnh 'presentation slides' (slide bài thuyết trình chung), chỉ mối quan hệ đồng nghiệp."
    },
    { 
      id: 57, 
      question: "Why does Emma recommend using the east entrance?", 
      options: [
        "(A) It's faster to the registration desk", 
        "(B) Parking is easier there", 
        "(C) It's near the shopping mall", 
        "(D) It's where the conference is held"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Parking is easier there. Giải thích: 'Use the east entrance - parking is easier there' (Dùng cửa phía đông - đỗ xe dễ dàng hơn ở đó) - Luyện nhận diện lý do đề xuất. Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'Use + noun' (sử dụng + danh từ) với lý do sau dấu gạch ngang; thì hiện tại đơn 'is easier' so sánh mức độ."
    },
    { 
      id: 58, 
      question: "At 09:26, what is John's concern?", 
      options: [
        "(A) He is worried about missing the registration", 
        "(B) He needs confirmation about the venue's location", 
        "(C) He is concerned about parking availability", 
        "(D) He wants to know if Emma saved his seat"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) He needs confirmation about the venue's location. Giải thích: 'The venue is near the shopping mall, right?' - John đang xác nhận vị trí venue - Luyện hiểu mục đích tin nhắn. Kiến thức ngữ pháp: Câu hỏi yes/no với 'is... right?' (là... phải không?) để xác nhận; 'near the shopping mall' là cụm giới từ chỉ vị trí tương đối."
    },
    { 
      id: 59, 
      question: "What is implied about the presentation slides?", 
      options: [
        "(A) They are too large to fit on a USB drive", 
        "(B) Emma forgot to prepare them completely", 
        "(C) They are important enough to have backup copies", 
        "(D) They can only be accessed on a laptop"
      ], 
      correct: 2,
      explanation: "Đáp án đúng: (C) They are important enough to have backup copies. Giải thích: Emma chuẩn bị cả USB drive và laptop backup, với lý do 'just in case' (phòng trường hợp) - cho thấy slides rất quan trọng - Luyện suy luận mức độ quan trọng. Kiến thức đọc hiểu: Suy luận từ 'backup copy' (bản sao dự phòng) và 'just in case' (phòng hờ), ngụ ý tầm quan trọng của tài liệu."
    },
    { 
      id: 60, 
      question: "What does John's final message convey?", 
      options: [
        "(A) He is worried about being too late", 
        "(B) He is excited about attending the conference", 
        "(C) He is concerned about finding the parking", 
        "(D) He is unsure about meeting Emma"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) He is excited about attending the conference. Giải thích: 'Perfect. See you in about 15 minutes. Can't wait!' (Hoàn hảo. Gặp bạn trong khoảng 15 phút. Không thể chờ được!) - Luyện nhận diện cảm xúc tích cực. Kiến thức ngữ pháp: Cụm 'Can't wait!' (Không thể chờ được!) là biểu đạt cảm xúc phấn khích; thì tương lai 'See you in about 15 minutes' (gặp bạn trong khoảng 15 phút) chỉ sự mong đợi."
    }
  ]
}
  }
};