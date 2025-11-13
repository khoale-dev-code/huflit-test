export const EXAM5_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 5 (Chủ Đề Công Nghệ & Kinh Doanh)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết về ứng dụng công nghệ trong kinh doanh.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Emma và Ben về việc áp dụng AI trong quản lý kinh doanh. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại thực tế HUFLIT).",
  type: "listening",
  script: "Emma: Hi Ben, how's the new AI tool working out for your sales team? I heard it's revolutionizing forecasting.\nBen: It's been a game-changer, Emma. We implemented it three months ago, and our accuracy jumped from 70% to 95%. But training the staff took longer than expected—about two weeks of workshops.\nEmma: Impressive. At my firm, we're piloting blockchain for supply chain transparency. It cuts down on fraud risks significantly.\nBen: Sounds solid. Did you face any integration issues with legacy systems?\nEmma: A few, but the vendor provided solid support. Overall, ROI is projected at 25% within the first year. Tech investments like these are key to staying competitive.",
  questions: [
    {
      id: 1,
      question: "How long ago did Ben's team implement the AI tool?",
      options: [
        "(A) One month ago.",
        "(B) Two months ago.",
        "(C) Three months ago.",
        "(D) Six months ago."
      ],
      correct: 2,
      explanation: "Ben: 'We implemented it three months ago.' (Ben: 'Chúng tôi triển khai nó ba tháng trước.') - Luyện nghe thời gian áp dụng công nghệ trong kinh doanh."
    },
    {
      id: 2,
      question: "What improvement did the AI tool bring to Ben's team?",
      options: [
        "(A) Reduced staff training time.",
        "(B) Increased forecasting accuracy from 70% to 95%.",
        "(C) Lowered supply chain costs.",
        "(D) Enhanced customer service only."
      ],
      correct: 1,
      explanation: "Ben: 'Our accuracy jumped from 70% to 95%.' (Ben: 'Độ chính xác của chúng tôi tăng từ 70% lên 95%.') - Luyện nghe lợi ích cụ thể của AI trong dự báo bán hàng."
    },
    {
      id: 3,
      question: "How long did training the staff take for Ben?",
      options: [
        "(A) One week.",
        "(B) Two weeks.",
        "(C) One month.",
        "(D) Three weeks."
      ],
      correct: 1,
      explanation: "Ben: 'Training the staff took longer than expected—about two weeks of workshops.' (Ben: 'Việc đào tạo nhân viên mất lâu hơn dự kiến—khoảng hai tuần hội thảo.') - Luyện nghe thách thức triển khai công nghệ."
    },
    {
      id: 4,
      question: "What technology is Emma's firm piloting?",
      options: [
        "(A) AI for sales forecasting.",
        "(B) Blockchain for supply chain transparency.",
        "(C) Cloud computing for data storage.",
        "(D) VR for employee training."
      ],
      correct: 1,
      explanation: "Emma: 'We're piloting blockchain for supply chain transparency.' (Emma: 'Chúng tôi đang thử nghiệm blockchain cho tính minh bạch chuỗi cung ứng.') - Luyện nghe công nghệ mới trong quản lý kinh doanh."
    },
    {
      id: 5,
      question: "What is the projected ROI for Emma's project?",
      options: [
        "(A) 15% within the first year.",
        "(B) 20% within six months.",
        "(C) 25% within the first year.",
        "(D) 30% over two years."
      ],
      correct: 2,
      explanation: "Emma: 'Overall, ROI is projected at 25% within the first year.' (Emma: 'Tổng thể, ROI dự kiến 25% trong năm đầu.') - Luyện nghe chỉ số kinh doanh từ đầu tư công nghệ."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người: Lisa, Mike và John. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At a business networking event.\nLisa: Great to meet you both. Mike, tell us about your startup—how's the fintech app performing?\nMike: Thriving, Lisa. User base grew 40% last quarter thanks to our machine learning algorithms for fraud detection.\nJohn: Fascinating. We're in e-commerce; integrating AR for virtual try-ons boosted conversions by 25%. But scaling servers was costly.\nLisa: Understood. At our agency, we specialize in digital marketing AI—personalized ads that increase ROI by 30%. Partnerships are key.\nMike: Agreed. John, any advice on venture capital pitches?\nJohn: Focus on metrics like CAC and LTV. Investors love data-driven stories.",
  questions: [
    {
      id: 6,
      question: "What is Mike's startup focused on?",
      options: ["(A) E-commerce platforms", "(B) Fintech app with fraud detection", "(C) Digital marketing tools", "(D) AR development"],
      correct: 1,
      explanation: "Mike: 'Our fintech app... machine learning algorithms for fraud detection.' (Mike: 'Ứng dụng fintech của chúng tôi... thuật toán học máy phát hiện gian lận.') - Luyện nghe lĩnh vực kinh doanh công nghệ."
    },
    {
      id: 7,
      question: "By what percentage did Mike's user base grow?",
      options: ["(A) 20%", "(B) 30%", "(C) 40%", "(D) 50%"],
      correct: 2,
      explanation: "Mike: 'User base grew 40% last quarter.' (Mike: 'Cơ sở người dùng tăng 40% quý trước.') - Luyện nghe chỉ số tăng trưởng kinh doanh."
    },
    {
      id: 8,
      question: "What technology boosted John's conversions?",
      options: ["(A) Machine learning", "(B) Blockchain", "(C) Augmented Reality (AR)", "(D) Cloud computing"],
      correct: 2,
      explanation: "John: 'Integrating AR for virtual try-ons boosted conversions by 25%.' (John: 'Tích hợp AR cho thử đồ ảo tăng chuyển đổi 25%.') - Luyện nghe ứng dụng công nghệ trong thương mại điện tử."
    },
    {
      id: 9,
      question: "What does Lisa's agency specialize in?",
      options: ["(A) Fintech development", "(B) Digital marketing AI", "(C) Server scaling", "(D) Venture funding"],
      correct: 1,
      explanation: "Lisa: 'We specialize in digital marketing AI—personalized ads that increase ROI by 30%.' (Lisa: 'Chúng tôi chuyên về AI marketing kỹ thuật số—quảng cáo cá nhân hóa tăng ROI 30%.') - Luyện nghe chuyên môn công ty."
    },
    {
      id: 10,
      question: "What metrics does John recommend for pitches?",
      options: ["(A) Revenue and profit only", "(B) CAC and LTV", "(C) User engagement scores", "(D) Market share percentages"],
      correct: 1,
      explanation: "John: 'Focus on metrics like CAC and LTV.' (John: 'Tập trung vào chỉ số như CAC và LTV.') - Luyện nghe lời khuyên gọi vốn kinh doanh."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của Professor về xu hướng công nghệ trong kinh doanh. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Professor: Welcome to today's lecture on tech trends in business. Cloud computing has transformed operations, enabling scalability without heavy upfront costs. Last semester, a case study on Amazon Web Services showed 50% cost savings for SMEs. Cybersecurity remains critical—ransomware attacks rose 20% last year. Ethical AI is emerging; companies must address bias in algorithms. Finally, remote work tools like Zoom have boosted productivity by 15%, per recent surveys.",
  questions: [
    {
      id: 11,
      question: "The lecture focuses on __________.",
      options: ["(A) Traditional marketing strategies", "(B) Tech trends in business", "(C) Supply chain logistics", "(D) Financial accounting"],
      correct: 1,
      explanation: "Professor: 'Today's lecture on tech trends in business.' (Giáo sư: 'Bài giảng hôm nay về xu hướng công nghệ trong kinh doanh.') - Luyện nghe chủ đề bài giảng."
    },
    {
      id: 12,
      question: "What has cloud computing enabled?",
      options: ["(A) Increased upfront costs", "(B) Scalability without heavy investments", "(C) Reduced data security", "(D) Offline operations only"],
      correct: 1,
      explanation: "Professor: 'Cloud computing has transformed operations, enabling scalability without heavy upfront costs.' (Giáo sư: 'Điện toán đám mây biến đổi hoạt động, cho phép mở rộng mà không tốn kém ban đầu.') - Luyện nghe lợi ích công nghệ đám mây."
    },
    {
      id: 13,
      question: "What percentage of cost savings was shown in the AWS case study?",
      options: ["(A) 30%", "(B) 40%", "(C) 50%", "(D) 60%"],
      correct: 2,
      explanation: "Professor: 'A case study on Amazon Web Services showed 50% cost savings for SMEs.' (Giáo sư: 'Nghiên cứu trường hợp AWS cho thấy tiết kiệm 50% chi phí cho doanh nghiệp nhỏ.') - Luyện nghe ví dụ tiết kiệm chi phí."
    },
    {
      id: 14,
      question: "By what percentage did ransomware attacks rise?",
      options: ["(A) 10%", "(B) 15%", "(C) 20%", "(D) 25%"],
      correct: 2,
      explanation: "Professor: 'Cybersecurity remains critical—ransomware attacks rose 20% last year.' (Giáo sư: 'An ninh mạng vẫn quan trọng—tấn công ransomware tăng 20% năm ngoái.') - Luyện nghe rủi ro an ninh mạng."
    },
    {
      id: 15,
      question: "What has boosted productivity according to surveys?",
      options: ["(A) In-office mandates", "(B) Remote work tools like Zoom", "(C) Manual processes", "(D) Paper-based systems"],
      correct: 1,
      explanation: "Professor: 'Remote work tools like Zoom have boosted productivity by 15%.' (Giáo sư: 'Công cụ làm việc từ xa như Zoom tăng năng suất 15%.') - Luyện nghe tác động công nghệ làm việc từ xa."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng giữa Customer và Sales Associate về phần mềm quản lý kinh doanh. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Customer: Hi, I'm interested in your CRM software for my small business. Does it integrate with QuickBooks?\nSales Associate: Yes, seamless integration via API. It automates invoicing and tracks leads in real-time.\nCustomer: Excellent. What's the pricing for up to 10 users?\nSales Associate: Starts at $29 per user monthly, with a free trial. We've seen 35% efficiency gains for similar clients.\nCustomer: Noted. Any data migration support?\nSales Associate: Included for the first three months. It minimizes downtime during setup.",
  questions: [
    {
      id: 16,
      question: "What software is the customer inquiring about?",
      options: ["(A) Accounting software", "(B) CRM software", "(C) HR management tool", "(D) E-commerce platform"],
      correct: 1,
      explanation: "Customer: 'Your CRM software for my small business.' (Khách hàng: 'Phần mềm CRM cho doanh nghiệp nhỏ của tôi.') - Luyện nghe loại phần mềm kinh doanh."
    },
    {
      id: 17,
      question: "What does the CRM integrate with?",
      options: ["(A) Microsoft Word", "(B) QuickBooks", "(C) Adobe Photoshop", "(D) Google Maps"],
      correct: 1,
      explanation: "Sales Associate: 'Seamless integration via API' with QuickBooks. (Nhân viên: 'Tích hợp liền mạch qua API' với QuickBooks.) - Luyện nghe tính năng tích hợp."
    },
    {
      id: 18,
      question: "What is the starting price per user?",
      options: ["(A) $19 monthly", "(B) $29 monthly", "(C) $39 monthly", "(D) $49 monthly"],
      correct: 1,
      explanation: "Sales Associate: 'Starts at $29 per user monthly.' (Nhân viên: 'Bắt đầu từ $29 mỗi người dùng hàng tháng.') - Luyện nghe mô hình giá cả."
    },
    {
      id: 19,
      question: "What efficiency gain have similar clients seen?",
      options: ["(A) 20%", "(B) 25%", "(C) 30%", "(D) 35%"],
      correct: 3,
      explanation: "Sales Associate: 'We've seen 35% efficiency gains for similar clients.' (Nhân viên: 'Chúng tôi thấy tăng hiệu quả 35% cho khách hàng tương tự.') - Luyện nghe lợi ích định lượng."
    },
    {
      id: 20,
      question: "What support is included for data migration?",
      options: ["(A) None", "(B) For the first month", "(C) For the first three months", "(D) Lifetime support"],
      correct: 2,
      explanation: "Sales Associate: 'Included for the first three months.' (Nhân viên: 'Bao gồm trong ba tháng đầu.') - Luyện nghe dịch vụ hỗ trợ triển khai."
    }
  ]
},
    // Reading Parts - Thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng, chủ đề công nghệ & kinh doanh
part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question: "The startup's innovative app has disrupted the market by offering seamless integration with existing business _______.",
      options: ["(A) Infrastructure", "(B) Infrastructures", "(C) Infrastructural", "(D) Infrastructed"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Infrastructure' vì đây là danh từ không đếm được chỉ 'cơ sở hạ tầng' kinh doanh. Kiến thức ngữ pháp: Danh từ không đếm sau 'existing'; (B) số nhiều không phù hợp, (C) tính từ, (D) không tồn tại."
    },
    {
      id: 22,
      question: "Many companies are adopting cloud-based solutions to enhance scalability and reduce operational _______ .",
      options: ["(A) Cost", "(B) Costs", "(C) Costly", "(D) Costed"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Costs' vì danh từ số nhiều chỉ 'chi phí hoạt động'. Kiến thức từ vựng: 'Operational costs' trong ngữ cảnh kinh doanh; 'cost' số ít, 'costly' tính từ, 'costed' quá khứ."
    },
    {
      id: 23,
      question: "Since launching the e-commerce platform, sales have increased _______ 50 percent year-over-year.",
      options: ["(A) At", "(B) By", "(C) In", "(D) On"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'By' vì chỉ mức độ tăng (by 50 percent). Kiến thức ngữ pháp: Giới từ 'by' với phần trăm thay đổi; 'at/in/on' không phù hợp."
    },
    {
      id: 24,
      question: "The CEO emphasized the importance of cybersecurity in protecting sensitive customer _______.",
      options: ["(A) Data", "(B) Datas", "(C) Datums", "(D) Dataful"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Data' vì danh từ không đếm được chỉ 'dữ liệu'. Kiến thức ngữ pháp: 'Customer data' không chia số nhiều; 'datas/datums' hiếm dùng, 'dataful' không tồn tại."
    },
    {
      id: 25,
      question: "Investors are keen on startups that demonstrate strong potential for rapid _______ .",
      options: ["(A) Grow", "(B) Grows", "(C) Growth", "(D) Growing"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Growth' vì danh từ chỉ 'tăng trưởng'. Kiến thức từ vựng: 'Rapid growth' trong ngữ cảnh đầu tư; 'grow' động từ, 'grows' ngôi thứ ba, 'growing' V-ing."
    },
    {
      id: 26,
      question: "The merger will allow the company to expand its market share and leverage synergies in technology _______.",
      options: ["(A) Develop", "(B) Development", "(C) Developed", "(D) Developing"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Development' vì danh từ chỉ 'phát triển công nghệ'. Kiến thức ngữ pháp: 'Technology development' sau 'in'; 'develop' động từ, 'developed' quá khứ, 'developing' V-ing."
    },
    {
      id: 27,
      question: "Blockchain technology is revolutionizing transactions by providing secure and transparent _______ .",
      options: ["(A) Record", "(B) Records", "(C) Recording", "(D) Recorded"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Records' vì danh từ số nhiều chỉ 'hồ sơ giao dịch'. Kiến thức từ vựng: 'Transparent records' trong blockchain; 'record' số ít, 'recording' V-ing, 'recorded' quá khứ."
    },
    {
      id: 28,
      question: "To stay competitive, businesses must continuously innovate and adapt to emerging market _______ .",
      options: ["(A) Trend", "(B) Trends", "(C) Trending", "(D) Trended"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Trends' vì danh từ số nhiều chỉ 'xu hướng thị trường'. Kiến thức ngữ pháp: Số nhiều sau 'emerging'; 'trend' số ít, 'trending' V-ing, 'trended' quá khứ."
    },
    {
      id: 29,
      question: "The annual report highlights a 15 percent increase in revenue, driven by digital transformation _______ .",
      options: ["(A) Initiate", "(B) Initiatives", "(C) Initiating", "(D) Initiated"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Initiatives' vì danh từ số nhiều chỉ 'sáng kiến chuyển đổi số'. Kiến thức từ vựng: 'Digital transformation initiatives'; 'initiate' động từ, 'initiating' V-ing, 'initiated' quá khứ."
    },
    {
      id: 30,
      question: "Effective project management software helps teams collaborate efficiently and meet deadlines _______ .",
      options: ["(A) Consistent", "(B) Consistently", "(C) Consistency", "(D) Consistenting"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Consistently' vì trạng từ bổ nghĩa 'meet' (động từ). Kiến thức ngữ pháp: Trạng từ 'consistently' chỉ cách thức; 'consistent' tính từ, 'consistency' danh từ, 'consistening' không tồn tại."
    }
  ]
},
part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email về hội thảo công nghệ kinh doanh. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: All Department Heads
From: Dr. Chen, Innovation Director
Subject: Invitation to TechBiz Summit 2025 - Register Now
Dear Colleagues,
We are excited to announce our sponsorship of the upcoming TechBiz Summit, a premier event focused on the intersection of technology and business innovation. Scheduled for March 15-17 in San Francisco, the summit will feature keynote speeches from industry leaders on topics like AI-driven analytics and sustainable tech practices.
To maximize our participation, we have secured 20 complimentary tickets for our team. Attendance is encouraged for those in R&D, marketing, and strategy roles to gain insights that can inform our quarterly objectives. The agenda includes interactive workshops on cybersecurity threats and blockchain applications in supply chains.
Please register by February 28 through the attached form to ensure your spot. Travel reimbursements will cover economy flights and standard hotel stays, with a per diem of $75 for meals. For remote attendees, virtual access is available at no cost, including live streams and on-demand recordings.
This investment in professional development aligns with our commitment to fostering a culture of continuous learning and adaptability in a fast-paced digital economy.
Should you have any queries, contact my assistant at ext. 789.
Warm regards,
Dr. Chen
Innovation Director`,
  questions: [
    {
      id: 31,
      question: "(31)",
      options: ["(A) Announce", "(B) Announcement", "(C) Announced", "(D) Announcing"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Announcing' vì V-ing sau 'excited to' (hào hứng thông báo). Kiến thức ngữ pháp: 'Excited to + V-ing'; 'announce' nguyên thể, 'announcement' danh từ, 'announced' quá khứ."
    },
    {
      id: 32,
      question: "(32)",
      options: ["(A) Feature", "(B) Featuring", "(C) Featured", "(D) Features"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Featuring' vì V-ing mô tả 'agenda' (lịch trình bao gồm). Kiến thức ngữ pháp: Phân từ hiện tại 'featuring' bổ nghĩa danh từ; 'feature' nguyên thể, 'featured' quá khứ, 'features' ngôi thứ ba."
    },
    {
      id: 33,
      question: "(33)",
      options: ["(A) Inform", "(B) Informed", "(C) Informing", "(D) Information"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Informing' vì V-ing chỉ mục đích (để cung cấp thông tin). Kiến thức ngữ pháp: 'To + V-ing' mục đích; 'inform' nguyên thể, 'informed' quá khứ, 'information' danh từ."
    },
    {
      id: 34,
      question: "(34)",
      options: ["(A) Reimbursements", "(B) Reimbursement", "(C) Reimburse", "(D) Reimbursed"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Reimbursements' vì danh từ số nhiều chỉ 'hoàn tiền'. Kiến thức từ vựng: 'Travel reimbursements' trong chính sách; 'reimbursement' số ít, 'reimburse' động từ, 'reimbursed' quá khứ."
    },
    {
      id: 35,
      question: "(35)",
      options: ["(A) Align", "(B) Aligns", "(C) Aligned", "(D) Alignment"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Align' vì nguyên thể sau 'will' (sẽ phù hợp). Kiến thức ngữ pháp: 'Will + V nguyên thể'; 'aligns' ngôi thứ ba, 'aligned' quá khứ, 'alignment' danh từ."
    },
    {
      id: 36,
      question: "The summit is scheduled for (37).",
      options: ["(A) February 28", "(B) March 15-17", "(C) April 1", "(D) May 20"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Scheduled for March 15-17'. Kiến thức đọc hiểu: Ngày sự kiện từ phần giới thiệu."
    },
    {
      id: 37,
      question: "How many complimentary tickets were secured?",
      options: ["(A) 10", "(B) 15", "(C) 20", "(D) 25"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'secured 20 complimentary tickets'. Kiến thức đọc hiểu: Số lượng vé từ email."
    },
    {
      id: 38,
      question: "What is the main purpose of this email?",
      options: ["(A) To report summit outcomes", "(B) To invite registration for the summit", "(C) To cancel travel plans", "(D) To announce budget cuts"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Invitation to TechBiz Summit... Register Now'. Kiến thức đọc hiểu: Mục đích từ tiêu đề và lời kêu gọi đăng ký."
    },
    {
      id: 39,
      question: "Who is the sender?",
      options: ["(A) A marketing head", "(B) The Innovation Director", "(C) An assistant", "(D) A travel coordinator"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Dr. Chen, Innovation Director'. Kiến thức đọc hiểu: Người gửi từ 'From' và chữ ký."
    },
    {
      id: 40,
      question: "What is the per diem amount for meals?",
      options: ["(A) $50", "(B) $65", "(C) $75", "(D) $85"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'per diem of $75 for meals'. Kiến thức đọc hiểu: Khoản phụ cấp từ phần logistics."
    }
  ]
},
part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo về dịch vụ tư vấn công nghệ và email yêu cầu, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**InnoTech Solutions Advertisement**
Empower Your Business with Cutting-Edge Digital Transformation Services
InnoTech Solutions delivers tailored IT consulting to drive growth and efficiency. From cloud migration to AI implementation, our experts ensure seamless adoption and measurable ROI.
**Core Offerings:**
1. **Cloud Migration Services** – Assess, plan, and execute transitions to AWS, Azure, or Google Cloud. Free consultation available at innotech.com.
2. **AI & Machine Learning Integration** – Develop custom models for predictive analytics and automation.
3. **Cybersecurity Audits** – Identify vulnerabilities and implement robust defenses.
4. **Digital Strategy Consulting** – Roadmap development for tech-enabled business models.
Email us at consult@innotech.com for a no-obligation quote. Response within 24 business hours.
---
**Email Message**
**To:** consult@innotech.com
**From:** mark.thompson@globaltrade.co
**Date:** January 15
**Subject:** Request for Cloud Migration Consultation
Hello InnoTech Team,
I discovered your services via a LinkedIn ad and believe they align perfectly with our needs at Global Trade Corp. As we scale internationally, we're seeking assistance with migrating our legacy systems to the cloud to improve data accessibility and reduce latency. Specifically, we'd like to explore Azure integration for our 200-user enterprise.
Additionally, a brief audit on cybersecurity would be valuable. Please provide an overview of your process, estimated timeline, and pricing structure. Our IT director prefers a call between 2:00 P.M. and 5:00 P.M. CST next week.
Best,
Mark Thompson
Operations Manager
Global Trade Corp.
456 Enterprise Blvd, Chicago, IL 60601
Phone: 312-555-0198`,
 
  questions: [
    {
      id: 41,
      question: "According to the advertisement, what can clients access on the InnoTech Web site?",
      options: [
        "(A) A free consultation",
        "(B) Downloadable AI models",
        "(C) Pricing calculators",
        "(D) Employee training videos"
      ],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'Free consultation available at innotech.com'. Kiến thức đọc hiểu: Dịch vụ miễn phí từ quảng cáo."
    },
    {
      id: 42,
      question: "How did Mr. Thompson learn about InnoTech?",
      options: [
        "(A) Through a trade show",
        "(B) Via a LinkedIn ad",
        "(C) From a referral",
        "(D) In a magazine"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'via a LinkedIn ad'. Kiến thức suy luận: Nguồn tiếp cận từ email."
    },
    {
      id: 43,
      question: "What role does Mr. Thompson hold?",
      options: [
        "(A) IT Director",
        "(B) Operations Manager",
        "(C) CEO",
        "(D) Consultant"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Mark Thompson, Operations Manager'. Kiến thức đọc hiểu: Chức vụ từ chữ ký."
    },
    {
      id: 44,
      question: "Which service does Mr. Thompson NOT request?",
      options: [
        "(A) Cloud migration",
        "(B) AI integration",
        "(C) Cybersecurity audit",
        "(D) Digital strategy consulting"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì email chỉ đề cập cloud và cybersecurity, không AI. Kiến thức đọc hiểu: So sánh yêu cầu với offerings."
    },
    {
      id: 45,
      question: "What will Mr. Thompson most likely receive within 24 hours?",
      options: [
        "(A) A full migration plan",
        "(B) A response from InnoTech",
        "(C) An Azure license",
        "(D) Audit results"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Response within 24 business hours'. Kiến thức suy luận: Thời gian phản hồi từ quảng cáo."
    },
    {
      id: 46,
      question: "What cloud platform does Mr. Thompson want to explore?",
      options: [
        "(A) AWS",
        "(B) Azure",
        "(C) Google Cloud",
        "(D) All options"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'explore Azure integration'. Kiến thức đọc hiểu: Nền tảng cụ thể từ email."
    },
    {
      id: 47,
      question: "What is the size of Mr. Thompson's enterprise?",
      options: [
        "(A) 100 users",
        "(B) 150 users",
        "(C) 200 users",
        "(D) 250 users"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì '200-user enterprise'. Kiến thức đọc hiểu: Quy mô từ email."
    },
    {
      id: 48,
      question: "What is the primary need for Mr. Thompson's company?",
      options: [
        "(A) Reducing staff size",
        "(B) Improving data accessibility and reducing latency",
        "(C) Marketing campaigns",
        "(D) Hardware upgrades"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'improve data accessibility and reduce latency'. Kiến thức đọc hiểu: Nhu cầu chính từ email."
    },
    {
      id: 49,
      question: "When does the IT director prefer a call?",
      options: [
        "(A) Morning hours",
        "(B) Between 2:00 P.M. and 5:00 P.M. CST",
        "(C) Evenings",
        "(D) Weekends"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'between 2:00 P.M. and 5:00 P.M. CST next week'. Kiến thức đọc hiểu: Khung giờ từ email."
    },
    {
      id: 50,
      question: "What company does Mr. Thompson represent?",
      options: [
        "(A) InnoTech Solutions",
        "(B) Global Trade Corp",
        "(C) LinkedIn Inc.",
        "(D) Azure Technologies"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Global Trade Corp'. Kiến thức đọc hiểu: Tên công ty từ email."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn về họp trực tuyến kinh doanh, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Sarah (14:20): Team, quarterly review Zoom starts in 10 min. Link: zoom.us/j/123456. Agenda attached.\nMark (14:22): Got it. Prepping slides on Q4 revenue projections—up 18% from last year.\nSarah (14:25): Thanks Mark. John, your update on the app launch?\nJohn (14:28): Ready. Beta testing complete; rollout next week. Expect 30% user growth.\nMark (14:35): Quick note: Tech support if audio issues—dial-in option available.\nSarah (14:38): Appreciate it. Let's aim to wrap by 3 PM sharp.\nJohn (14:45): In the meeting. All set!`,
  questions: [
    {
      id: 51,
      question: "What is the purpose of the meeting?",
      options: ["(A) Social gathering", "(B) Quarterly review", "(C) Team building", "(D) Holiday planning"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'quarterly review Zoom'. Kiến thức đọc hiểu: Mục đích từ tin nhắn đầu."
    },
    {
      id: 52,
      question: "What does Mark mean by 'up 18% from last year'?",
      options: ["(A) Revenue decline", "(B) Revenue increase in projections", "(C) User drop", "(D) Cost reduction"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Q4 revenue projections—up 18%'. Kiến thức suy luận: Tăng doanh thu từ dự báo."
    },
    {
      id: 53,
      question: "Who is providing the app launch update?",
      options: ["(A) Sarah", "(B) Mark", "(C) John", "(D) The team lead"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'John, your update on the app launch?'. Kiến thức đọc hiểu: Phân công từ Sarah."
    },
    {
      id: 54,
      question: "When is the app rollout expected?",
      options: ["(A) This week", "(B) Next week", "(C) Next month", "(D) Q1 next year"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'rollout next week'. Kiến thức đọc hiểu: Thời gian từ John."
    },
    {
      id: 55,
      question: "What is Mark preparing?",
      options: ["(A) Agenda", "(B) Slides on revenue projections", "(C) Beta tests", "(D) Zoom link"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Prepping slides on Q4 revenue projections'. Kiến thức đọc hiểu: Chuẩn bị của Mark."
    },
    {
      id: 56,
      question: "What can be inferred about the app launch?",
      options: ["(A) Testing failed", "(B) Beta testing complete", "(C) Delayed indefinitely", "(D) Canceled"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Beta testing complete'. Kiến thức suy luận: Trạng thái sẵn sàng từ John."
    },
    {
      id: 57,
      question: "Why does Mark mention tech support?",
      options: ["(A) To cancel the meeting", "(B) For audio issues with dial-in", "(C) To share the agenda", "(D) To reschedule"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Tech support if audio issues—dial-in option'. Kiến thức suy luận: Hỗ trợ kỹ thuật dự phòng."
    },
    {
      id: 58,
      question: "What user growth does John expect?",
      options: ["(A) 20%", "(B) 25%", "(C) 30%", "(D) 35%"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Expect 30% user growth'. Kiến thức đọc hiểu: Dự báo từ John."
    },
    {
      id: 59,
      question: "What time does Sarah want to end the meeting?",
      options: ["(A) 2:30 PM", "(B) 3:00 PM", "(C) 3:30 PM", "(D) 4:00 PM"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'wrap by 3 PM sharp'. Kiến thức đọc hiểu: Thời gian kết thúc từ Sarah."
    },
    {
      id: 60,
      question: "What does John confirm in his last message?",
      options: ["(A) He's late", "(B) Everything is set for the meeting", "(C) Slides are ready", "(D) Link is broken"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'In the meeting. All set!'. Kiến thức suy luận: Xác nhận sẵn sàng từ John."
    }
  ]
}
  }
};