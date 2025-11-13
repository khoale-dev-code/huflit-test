export const EXAM7_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 7 (Chủ Đề Kinh Doanh & Giao Tiếp)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết về kỹ năng giao tiếp trong đàm phán kinh doanh.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Sarah và Mark về đàm phán hợp đồng kinh doanh. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại thực tế HUFLIT).",
  type: "listening",
  script: "Sarah: Mark, how did your negotiation meeting go with the new client? I heard it was tense at first.\nMark: It started rocky, Sarah, but we turned it around. They wanted a 20% discount right off the bat, but I countered with volume-based pricing—10% off for orders over 1,000 units.\nSarah: Smart move. Active listening helped, right? You mirrored their concerns about delivery timelines.\nMark: Absolutely. By the end, we agreed on a six-month trial contract with quarterly reviews to build trust.\nSarah: That's effective communication in action. Did you use any non-verbal cues to seal the deal?",
  questions: [
    {
      id: 1,
      question: "What did the client initially demand?",
      options: [
        "(A) A longer delivery timeline.",
        "(B) A 20% discount.",
        "(C) Higher order volumes.",
        "(D) Quarterly reviews."
      ],
      correct: 1,
      explanation: "Mark: 'They wanted a 20% discount right off the bat.' (Mark: 'Họ muốn giảm 20% ngay từ đầu.') - Luyện nghe yêu cầu ban đầu trong đàm phán."
    },
    {
      id: 2,
      question: "How did Mark respond to the discount request?",
      options: [
        "(A) Agreed immediately.",
        "(B) Offered volume-based pricing at 10% off.",
        "(C) Refused outright.",
        "(D) Suggested a one-year contract."
      ],
      correct: 1,
      explanation: "Mark: 'I countered with volume-based pricing—10% off for orders over 1,000 units.' (Mark: 'Tôi phản biện bằng giá dựa trên khối lượng—giảm 10% cho đơn hàng trên 1.000 đơn vị.') - Luyện nghe chiến lược phản biện kinh doanh."
    },
    {
      id: 3,
      question: "What technique did Mark use to address concerns?",
      options: [
        "(A) Active listening and mirroring.",
        "(B) Direct confrontation.",
        "(C) Email follow-up.",
        "(D) Third-party mediation."
      ],
      correct: 0,
      explanation: "Sarah: 'Active listening helped, right? You mirrored their concerns.' (Sarah: 'Lắng nghe tích cực giúp ích, phải không? Bạn lặp lại mối quan tâm của họ.') - Luyện nghe kỹ năng giao tiếp phi ngôn từ."
    },
    {
      id: 4,
      question: "What was the agreed contract duration?",
      options: [
        "(A) Three months.",
        "(B) Six months with quarterly reviews.",
        "(C) One year.",
        "(D) Indefinite."
      ],
      correct: 1,
      explanation: "Mark: 'We agreed on a six-month trial contract with quarterly reviews.' (Mark: 'Chúng tôi đồng ý hợp đồng thử nghiệm sáu tháng với đánh giá hàng quý.') - Luyện nghe điều khoản hợp đồng."
    },
    {
      id: 5,
      question: "What did Sarah suggest helped seal the deal?",
      options: [
        "(A) Financial incentives only.",
        "(B) Non-verbal cues.",
        "(C) Legal documents.",
        "(D) Company presentations."
      ],
      correct: 1,
      explanation: "Sarah: 'Did you use any non-verbal cues to seal the deal?' (Sarah: 'Bạn có sử dụng tín hiệu phi ngôn từ nào để chốt thỏa thuận không?') - Luyện nghe yếu tố giao tiếp không lời trong kinh doanh."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người: Lisa, Mike và John. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At a business networking lunch.\nLisa: Mike, John—glad you could join. Let's discuss client communication strategies. How do you handle difficult feedback?\nMike: I always thank them first, then ask clarifying questions. It turns complaints into opportunities.\nJohn: Spot on. Email follow-ups are key for documentation, but a phone call adds personal touch.\nLisa: Agreed. In presentations, I use storytelling to engage—last pitch, it closed a $50K deal.\nMike: Impressive. John, your tip on body language in meetings?\nJohn: Maintain eye contact and open posture to build rapport quickly.",
  questions: [
    {
      id: 6,
      question: "What is the main topic of the conversation?",
      options: ["(A) Product development", "(B) Client communication strategies", "(C) Office layouts", "(D) Travel policies"],
      correct: 1,
      explanation: "Lisa: 'Let's discuss client communication strategies.' (Lisa: 'Hãy thảo luận về chiến lược giao tiếp khách hàng.') - Luyện nghe chủ đề networking kinh doanh."
    },
    {
      id: 7,
      question: "How does Mike handle difficult feedback?",
      options: ["(A) Ignore it completely.", "(B) Thank them and ask clarifying questions.", "(C) Respond via email only.", "(D) Escalate to management."],
      correct: 1,
      explanation: "Mike: 'I always thank them first, then ask clarifying questions.' (Mike: 'Tôi luôn cảm ơn trước, rồi hỏi làm rõ.') - Luyện nghe xử lý phản hồi tiêu cực."
    },
    {
      id: 8,
      question: "What does John emphasize for follow-ups?",
      options: ["(A) Text messages.", "(B) Email for documentation and phone for personal touch.", "(C) In-person visits only.", "(D) Social media posts."],
      correct: 1,
      explanation: "John: 'Email follow-ups... but a phone call adds personal touch.' (John: 'Theo dõi email... nhưng cuộc gọi thêm yếu tố cá nhân.') - Luyện nghe kênh giao tiếp hỗn hợp."
    },
    {
      id: 9,
      question: "What technique does Lisa use in presentations?",
      options: ["(A) Bullet-point slides.", "(B) Storytelling to engage.", "(C) Long lectures.", "(D) Video demos only."],
      correct: 1,
      explanation: "Lisa: 'In presentations, I use storytelling to engage.' (Lisa: 'Trong thuyết trình, tôi dùng kể chuyện để thu hút.') - Luyện nghe kỹ thuật thuyết trình hiệu quả."
    },
    {
      id: 10,
      question: "What does John recommend for body language?",
      options: ["(A) Crossed arms.", "(B) Eye contact and open posture.", "(C) Avoiding gestures.", "(D) Standing rigidly."],
      correct: 1,
      explanation: "John: 'Maintain eye contact and open posture to build rapport.' (John: 'Duy trì giao tiếp bằng mắt và tư thế mở để xây dựng mối quan hệ.') - Luyện nghe ngôn ngữ cơ thể trong họp."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của Manager về giao tiếp nội bộ trong doanh nghiệp. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Manager: Good afternoon, team. Today, we're focusing on internal communication best practices. Clear messaging reduces misunderstandings by 30%, per our last survey. Use tools like Slack for quick updates and emails for formal records. Encourage feedback loops—weekly check-ins foster transparency. Remember, active listening isn't just nodding; it's paraphrasing to confirm understanding. Strong internal comms drive productivity and morale.",
  questions: [
    {
      id: 11,
      question: "The talk is about __________.",
      options: ["(A) External marketing", "(B) Internal communication best practices", "(C) Financial reporting", "(D) Supply chain management"],
      correct: 1,
      explanation: "Manager: 'We're focusing on internal communication best practices.' (Quản lý: 'Chúng ta tập trung vào thực hành giao tiếp nội bộ tốt nhất.') - Luyện nghe chủ đề đào tạo doanh nghiệp."
    },
    {
      id: 12,
      question: "What does clear messaging reduce?",
      options: ["(A) Productivity.", "(B) Misunderstandings by 30%.", "(C) Feedback sessions.", "(D) Tool usage."],
      correct: 1,
      explanation: "Manager: 'Clear messaging reduces misunderstandings by 30%.' (Quản lý: 'Thông điệp rõ ràng giảm hiểu lầm 30%.') - Luyện nghe lợi ích giao tiếp rõ ràng."
    },
    {
      id: 13,
      question: "What tool is recommended for quick updates?",
      options: ["(A) Emails only.", "(B) Slack.", "(C) In-person meetings.", "(D) Reports."],
      correct: 1,
      explanation: "Manager: 'Use tools like Slack for quick updates.' (Quản lý: 'Sử dụng công cụ như Slack cho cập nhật nhanh.') - Luyện nghe công cụ giao tiếp nội bộ."
    },
    {
      id: 14,
      question: "What do weekly check-ins foster?",
      options: ["(A) Isolation.", "(B) Transparency.", "(C) Competition.", "(D) Silence."],
      correct: 1,
      explanation: "Manager: 'Weekly check-ins foster transparency.' (Quản lý: 'Kiểm tra hàng tuần nuôi dưỡng tính minh bạch.') - Luyện nghe lợi ích phản hồi định kỳ."
    },
    {
      id: 15,
      question: "What is active listening described as?",
      options: ["(A) Just nodding.", "(B) Paraphrasing to confirm understanding.", "(C) Interrupting.", "(D) Multitasking."],
      correct: 1,
      explanation: "Manager: 'Active listening isn't just nodding; it's paraphrasing to confirm understanding.' (Quản lý: 'Lắng nghe tích cực không chỉ gật đầu; mà là diễn đạt lại để xác nhận hiểu biết.') - Luyện nghe định nghĩa kỹ năng lắng nghe."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng giữa Client và Sales Associate về xây dựng mối quan hệ kinh doanh. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Client: Sales Associate, I'm impressed with your proposal, but I need assurance on partnership longevity.\nSales Associate: Understood, Client. We've maintained 95% retention with similar partners over five years through regular strategy sessions.\nClient: That's reassuring. How do you handle conflicts in joint ventures?\nSales Associate: Open dialogue and mediation clauses in contracts. Last quarter, we resolved a supply issue via a mediated call, saving the deal.\nClient: Proactive approach. Let's schedule a follow-up to align expectations.",
  questions: [
    {
      id: 16,
      question: "What concerns the client?",
      options: ["(A) Pricing details.", "(B) Partnership longevity.", "(C) Product quality.", "(D) Delivery speed."],
      correct: 1,
      explanation: "Client: 'I need assurance on partnership longevity.' (Khách hàng: 'Tôi cần đảm bảo về độ bền quan hệ đối tác.') - Luyện nghe mối quan tâm hợp tác kinh doanh."
    },
    {
      id: 17,
      question: "What retention rate does the Sales Associate mention?",
      options: ["(A) 85%.", "(B) 90%.", "(C) 95%.", "(D) 100%."],
      correct: 2,
      explanation: "Sales Associate: 'We've maintained 95% retention.' (Nhân viên bán hàng: 'Chúng tôi duy trì 95% giữ chân.') - Luyện nghe chỉ số giữ chân khách hàng."
    },
    {
      id: 18,
      question: "How are conflicts handled according to the Sales Associate?",
      options: ["(A) Through lawsuits.", "(B) Open dialogue and mediation clauses.", "(C) Ignoring them.", "(D) Third-party sales."],
      correct: 1,
      explanation: "Sales Associate: 'Open dialogue and mediation clauses in contracts.' (Nhân viên bán hàng: 'Đối thoại mở và điều khoản hòa giải trong hợp đồng.') - Luyện nghe giải quyết xung đột."
    },
    {
      id: 19,
      question: "What resolved a supply issue last quarter?",
      options: ["(A) A new contract.", "(B) A mediated call.", "(C) Price reduction.", "(D) Supplier change."],
      correct: 1,
      explanation: "Sales Associate: 'We resolved a supply issue via a mediated call.' (Nhân viên bán hàng: 'Chúng tôi giải quyết vấn đề cung ứng qua cuộc gọi hòa giải.') - Luyện nghe ví dụ giải quyết thực tế."
    },
    {
      id: 20,
      question: "What does the client suggest next?",
      options: ["(A) End the discussion.", "(B) Schedule a follow-up.", "(C) Sign immediately.", "(D) Review pricing."],
      correct: 1,
      explanation: "Client: 'Let's schedule a follow-up to align expectations.' (Khách hàng: 'Hãy lên lịch theo dõi để đồng bộ kỳ vọng.') - Luyện nghe bước tiếp theo xây dựng quan hệ."
    }
  ]
},
    // Reading Parts - Thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng, chủ đề kinh doanh & giao tiếp
part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question: "Effective business communication requires clarity to avoid _______ and ensure mutual understanding.",
      options: ["(A) Misunderstand", "(B) Misunderstands", "(C) Misunderstanding", "(D) Misunderstood"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Misunderstanding' vì danh từ chỉ 'hiểu lầm'. Kiến thức ngữ pháp: Danh từ sau 'avoid'; 'misunderstand' động từ, 'misunderstands' ngôi thứ ba, 'misunderstood' quá khứ."
    },
    {
      id: 22,
      question: "During negotiations, it is essential to _______ active listening to build rapport with counterparts.",
      options: ["(A) Practice", "(B) Practices", "(C) Practiced", "(D) Practicing"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Practice' vì nguyên thể sau 'to' (mục đích). Kiến thức ngữ pháp: 'To + V nguyên thể'; 'practices' ngôi thứ ba, 'practiced' quá khứ, 'practicing' V-ing."
    },
    {
      id: 23,
      question: "The sales team _______ quarterly targets by leveraging strong client relationships and follow-up strategies.",
      options: ["(A) Achieve", "(B) Achieves", "(C) Achieved", "(D) Achieving"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Achieves' vì động từ ngôi thứ ba số ít (team). Kiến thức ngữ pháp: Chủ ngữ số ít + V-s/es; 'achieve' nguyên thể, 'achieved' quá khứ, 'achieving' V-ing."
    },
    {
      id: 24,
      question: "Non-verbal cues, such as eye contact and gestures, play a crucial role in _______ cross-cultural business interactions.",
      options: ["(A) Facilitate", "(B) Facilitates", "(C) Facilitated", "(D) Facilitating"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Facilitating' vì V-ing chỉ hành động (gerund). Kiến thức ngữ pháp: V-ing sau 'in'; 'facilitate' nguyên thể, 'facilitates' ngôi thứ ba, 'facilitated' quá khứ."
    },
    {
      id: 25,
      question: "The manager emphasized the importance of _______ feedback to improve team performance and morale.",
      options: ["(A) Give", "(B) Gives", "(C) Giving", "(D) Gave"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Giving' vì V-ing chỉ hành động liên tục. Kiến thức ngữ pháp: 'The importance of + V-ing'; 'give' nguyên thể, 'gives' ngôi thứ ba, 'gave' quá khứ."
    },
    {
      id: 26,
      question: "In a global market, cultural sensitivity is key to _______ successful international partnerships.",
      options: ["(A) Form", "(B) Forms", "(C) Forming", "(D) Formed"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Forming' vì V-ing chỉ quá trình. Kiến thức ngữ pháp: 'To + V-ing' mục đích; 'form' nguyên thể, 'forms' ngôi thứ ba, 'formed' quá khứ."
    },
    {
      id: 27,
      question: "The presentation was well-received due to its structured format and engaging _______ techniques.",
      options: ["(A) Communicate", "(B) Communicates", "(C) Communication", "(D) Communicating"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Communication' vì danh từ chỉ 'giao tiếp'. Kiến thức từ vựng: 'Engaging communication techniques'; 'communicate' động từ, 'communicates' ngôi thứ ba, 'communicating' V-ing."
    },
    {
      id: 28,
      question: "Regular team meetings help align goals and _______ potential conflicts before they escalate.",
      options: ["(A) Resolve", "(B) Resolves", "(C) Resolved", "(D) Resolving"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Resolving' vì V-ing chỉ mục đích. Kiến thức ngữ pháp: 'And + V-ing' song song; 'resolve' nguyên thể, 'resolves' ngôi thứ ba, 'resolved' quá khứ."
    },
    {
      id: 29,
      question: "Business etiquette varies across cultures, so professionals must adapt their _______ accordingly.",
      options: ["(A) Approach", "(B) Approaches", "(C) Approached", "(D) Approaching"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Approaches' vì danh từ số nhiều chỉ 'cách tiếp cận'. Kiến thức từ vựng: 'Their approaches'; 'approach' số ít, 'approached' quá khứ, 'approaching' V-ing."
    },
    {
      id: 30,
      question: "To foster long-term client loyalty, companies should prioritize personalized service and timely _______ .",
      options: ["(A) Respond", "(B) Responds", "(C) Response", "(D) Responding"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Response' vì danh từ chỉ 'phản hồi'. Kiến thức ngữ pháp: 'Timely response'; 'respond' động từ, 'responds' ngôi thứ ba, 'responding' V-ing."
    }
  ]
},
part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email về hội thảo giao tiếp kinh doanh. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: All Sales and Marketing Staff
From: HR Rep, Human Resources
Subject: Mandatory Workshop: Enhancing Business Communication Skills - Register Today
Dear Team,
In line with our commitment to professional growth, we are hosting a one-day workshop on Enhancing Business Communication Skills on November 20. This session will cover essential topics such as negotiation tactics, email etiquette, and cross-cultural communication to (31) team effectiveness in client interactions.
Led by renowned consultant Dr. Smith, the workshop includes interactive role-plays and case studies to (32) practical application. Participants will receive a digital handbook and certification upon completion, which can be added to your professional profiles.
Spaces are limited to 25 attendees, so please register via the portal by November 15 to (33) your participation. The event will be held virtually via Zoom, with recordings available for absentees. Attendance is mandatory for all sales roles to align with our performance objectives.
This initiative aims to (34) our company's reputation for excellence in client relations. We encourage you to come prepared with real-world scenarios for discussion.
For any inquiries, reply to this email or contact extension 567.
Best regards,
HR Rep
Human Resources`,
  questions: [
    {
      id: 31,
      question: "(31)",
      options: ["(A) Hinder", "(B) Boost", "(C) Ignore", "(D) Delay"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Boost' vì nghĩa 'tăng cường' (boost team effectiveness). Kiến thức từ vựng: Động từ phù hợp ngữ cảnh phát triển kỹ năng; 'hinder' cản trở, 'ignore' bỏ qua, 'delay' trì hoãn không liên quan."
    },
    {
      id: 32,
      question: "(32)",
      options: ["(A) Prevent", "(B) Promote", "(C) Avoid", "(D) Limit"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Promote' vì nghĩa 'thúc đẩy' (promote practical application). Kiến thức ngữ pháp: Động từ chỉ hành động hỗ trợ; 'prevent' ngăn chặn, 'avoid' tránh, 'limit' giới hạn không phù hợp."
    },
    {
      id: 33,
      question: "(33)",
      options: ["(A) Cancel", "(B) Secure", "(C) Postpone", "(D) Forget"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Secure' vì nghĩa 'đảm bảo' (secure your participation). Kiến thức từ vựng: Động từ phù hợp đăng ký sự kiện; 'cancel' hủy, 'postpone' hoãn, 'forget' quên không khớp."
    },
    {
      id: 34,
      question: "(34)",
      options: ["(A) Damage", "(B) Elevate", "(C) Maintain", "(D) Reduce"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Elevate' vì nghĩa 'nâng cao' (elevate our company's reputation). Kiến thức từ vựng: Động từ chỉ cải thiện hình ảnh; 'damage' làm hỏng, 'maintain' duy trì, 'reduce' giảm không phù hợp."
    },
    {
      id: 35,
      question: "(35)",
      options: ["(A) Mandatory", "(B) Optional", "(C) Voluntary", "(D) Informal"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Mandatory' vì nghĩa 'bắt buộc' (mandatory for all sales roles). Kiến thức từ vựng: Tính từ chỉ yêu cầu tham gia; 'optional' tùy chọn, 'voluntary' tự nguyện, 'informal' không chính thức không khớp."
    },
    {
      id: 36,
      question: "The workshop is scheduled for (37).",
      options: ["(A) November 15", "(B) November 20", "(C) November 25", "(D) December 1"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'on November 20'. Kiến thức đọc hiểu: Ngày sự kiện từ phần giới thiệu."
    },
    {
      id: 37,
      question: "How many attendees is the workshop limited to?",
      options: ["(A) 15", "(B) 20", "(C) 25", "(D) 30"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'limited to 25 attendees'. Kiến thức đọc hiểu: Sức chứa từ email."
    },
    {
      id: 38,
      question: "What is the main purpose of this email?",
      options: ["(A) To announce results", "(B) To require registration for a workshop", "(C) To cancel training", "(D) To share handbooks"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Mandatory Workshop... Register Today'. Kiến thức đọc hiểu: Mục đích từ tiêu đề và lời kêu gọi."
    },
    {
      id: 39,
      question: "Who is leading the workshop?",
      options: ["(A) HR Rep", "(B) Dr. Smith", "(C) The sales manager", "(D) A team member"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Led by renowned consultant Dr. Smith'. Kiến thức đọc hiểu: Người dẫn dắt từ phần chương trình."
    },
    {
      id: 40,
      question: "What platform will the event use?",
      options: ["(A) In-person only", "(B) Zoom virtually", "(C) Email sessions", "(D) Slack channels"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'held virtually via Zoom'. Kiến thức đọc hiểu: Nền tảng từ phần logistics."
    }
  ]
},
part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo về khóa học giao tiếp kinh doanh và email yêu cầu, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**CommPro Institute Advertisement**
Master Business Communication: Online Certification Program for Professionals
CommPro Institute's 8-week course equips you with skills in persuasive writing, public speaking, and virtual meetings. Gain a credential valued by employers worldwide.
**Program Features:**
1. **Live Sessions** – Bi-weekly webinars with feedback from certified coaches. Sign up at commpro.org for a free trial module.
2. **Peer Networking** – Connect with global professionals via discussion forums.
3. **Case Studies** – Analyze real business scenarios to refine strategies.
4. **Flexible Scheduling** – Self-paced with 24/7 access to materials.
Contact support@commpro.org for enrollment details. We reply within 24 hours to assist your career advancement.
---
**Email Message**
**To:** support@commpro.org
**From:** tom.wilson@executivesolutions.com
**Date:** October 28
**Subject:** Interest in Business Communication Certification
Dear CommPro Team,
Your ad in the business journal caught my eye, and as a mid-level manager at Executive Solutions, I'm keen to join the online certification program. With a focus on virtual meetings, it aligns with our remote team's needs. Can you outline the bi-weekly webinar schedule and any group discounts for corporate enrollments?
I'd like to start soon—please send the free trial module link. Available for a call Monday through Friday, 10:00 A.M. to 2:00 P.M. EST.
Sincerely,
Tom Wilson
Mid-Level Manager
Executive Solutions
890 Corporate Way, New York, NY 10001
Phone: 212-555-3456`,
 
  questions: [
    {
      id: 41,
      question: "According to the advertisement, what can enrollees access immediately?",
      options: [
        "(A) Full certification",
        "(B) A free trial module",
        "(C) Peer forums",
        "(D) Case studies"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Sign up... for a free trial module'. Kiến thức đọc hiểu: Truy cập thử từ quảng cáo."
    },
    {
      id: 42,
      question: "How did Mr. Wilson discover the program?",
      options: [
        "(A) Colleague recommendation",
        "(B) Business journal ad",
        "(C) Social media",
        "(D) Company email"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Your ad in the business journal'. Kiến thức suy luận: Nguồn từ email."
    },
    {
      id: 43,
      question: "What is Mr. Wilson's position?",
      options: [
        "(A) Senior executive",
        "(B) Mid-level manager",
        "(C) HR specialist",
        "(D) Consultant"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'mid-level manager'. Kiến thức đọc hiểu: Chức vụ từ email."
    },
    {
      id: 44,
      question: "Which feature interests Mr. Wilson most?",
      options: [
        "(A) Peer networking",
        "(B) Focus on virtual meetings",
        "(C) Case studies",
        "(D) Flexible scheduling"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'focus on virtual meetings'. Kiến thức đọc hiểu: Quan tâm cụ thể từ email."
    },
    {
      id: 45,
      question: "What will Mr. Wilson most likely receive within 24 hours?",
      options: [
        "(A) Certification",
        "(B) A reply from support",
        "(C) Webinar access",
        "(D) Group discount code"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'We reply within 24 hours'. Kiến thức suy luận: Phản hồi từ quảng cáo."
    },
    {
      id: 46,
      question: "How long is the certification program?",
      options: [
        "(A) 4 weeks",
        "(B) 6 weeks",
        "(C) 8 weeks",
        "(D) 10 weeks"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì '8-week course'. Kiến thức đọc hiểu: Thời lượng từ quảng cáo."
    },
    {
      id: 47,
      question: "What does Mr. Wilson request besides the schedule?",
      options: [
        "(A) Full payment details",
        "(B) Free trial module link",
        "(C) Employer endorsement",
        "(D) Forum access"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'send the free trial module link'. Kiến thức đọc hiểu: Yêu cầu từ email."
    },
    {
      id: 48,
      question: "What aligns the program with Mr. Wilson's team?",
      options: [
        "(A) Remote team needs",
        "(B) In-person sessions",
        "(C) Case studies only",
        "(D) Pricing flexibility"
      ],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'aligns with our remote team's needs'. Kiến thức đọc hiểu: Phù hợp từ email."
    },
    {
      id: 49,
      question: "When is Mr. Wilson available for calls?",
      options: [
        "(A) Weekends",
        "(B) 10:00 A.M. to 2:00 P.M. EST, weekdays",
        "(C) Evenings",
        "(D) After 3:00 P.M."
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Monday through Friday, 10:00 A.M. to 2:00 P.M. EST'. Kiến thức đọc hiểu: Khung giờ từ email."
    },
    {
      id: 50,
      question: "What is the credential's value according to the ad?",
      options: [
        "(A) Local only",
        "(B) Valued by employers worldwide",
        "(C) For entry-level only",
        "(D) No recognition"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'credential valued by employers worldwide'. Kiến thức đọc hiểu: Giá trị từ quảng cáo."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn về chuẩn bị họp kinh doanh, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Emma (10:45): Team, client pitch at 2 PM today. Agenda: intro, demo, Q&A. Slides updated?\nBen (10:47): Yes, added key metrics—projected 15% ROI. Practiced opener.\nEmma (10:50): Great. Lisa, your handling objections section?\nLisa (10:52): Polished. Emphasize benefits over features. Expect pushback on pricing.\nBen (11:00): Noted. Backup data ready if needed. Virtual or in-person?\nEmma (11:05): Virtual—Zoom link shared. Test mics now.\nLisa (11:15): All set. Let's deliver confidently!`,
  questions: [
    {
      id: 51,
      question: "What is the purpose of the messages?",
      options: ["(A) Social planning", "(B) Preparing for a client pitch", "(C) Vacation scheduling", "(D) Feedback session"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'client pitch at 2 PM'. Kiến thức đọc hiểu: Mục đích từ tin nhắn đầu."
    },
    {
      id: 52,
      question: "What did Ben add to the slides?",
      options: ["(A) Full agenda", "(B) Key metrics like 15% ROI", "(C) Objection handling", "(D) Zoom instructions"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'added key metrics—projected 15% ROI'. Kiến thức suy luận: Cập nhật từ Ben."
    },
    {
      id: 53,
      question: "Who is handling the objections section?",
      options: ["(A) Emma", "(B) Ben", "(C) Lisa", "(D) The client"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Lisa, your handling objections section?'. Kiến thức đọc hiểu: Phân công từ Emma."
    },
    {
      id: 54,
      question: "When is the pitch scheduled?",
      options: ["(A) 10 AM", "(B) 2 PM today", "(C) Tomorrow", "(D) Next week"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'at 2 PM today'. Kiến thức đọc hiểu: Thời gian từ Emma."
    },
    {
      id: 55,
      question: "What does Lisa emphasize in her section?",
      options: ["(A) Features only", "(B) Benefits over features", "(C) Pricing details", "(D) Metrics"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Emphasize benefits over features'. Kiến thức đọc hiểu: Tập trung từ Lisa."
    },
    {
      id: 56,
      question: "What does Ben have ready as backup?",
      options: ["(A) New slides", "(B) Data if needed", "(C) Mic tests", "(D) Agenda changes"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Backup data ready if needed'. Kiến thức suy luận: Chuẩn bị từ Ben."
    },
    {
      id: 57,
      question: "What format is the pitch?",
      options: ["(A) In-person", "(B) Virtual via Zoom", "(C) Email only", "(D) Phone call"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Virtual—Zoom link shared'. Kiến thức đọc hiểu: Định dạng từ Emma."
    },
    {
      id: 58,
      question: "What does Lisa anticipate?",
      options: ["(A) Easy agreement", "(B) Pushback on pricing", "(C) No questions", "(D) Early end"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Expect pushback on pricing'. Kiến thức suy luận: Dự đoán từ Lisa."
    },
    {
      id: 59,
      question: "What does Emma instruct the team to do?",
      options: ["(A) Update agenda", "(B) Test mics now", "(C) Practice full pitch", "(D) Share data"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Test mics now'. Kiến thức đọc hiểu: Hướng dẫn từ Emma."
    },
    {
      id: 60,
      question: "What does Lisa express in her final message?",
      options: ["(A) Doubt", "(B) Confidence in delivery", "(C) Delay request", "(D) Change suggestion"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Let's deliver confidently!'. Kiến thức suy luận: Khích lệ từ Lisa."
    }
  ]
}
  }
};