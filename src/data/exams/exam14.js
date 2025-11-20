export const EXAM14_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 14 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài về dự án khởi nghiệp công nghệ.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Tom và Mark về dự án startup công nghệ. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Tom: Mark, how's the mobile app development coming along? We're supposed to launch next quarter.\nMark: It's progressing well, but we've encountered some unexpected challenges. Last week we discovered a critical security flaw in the backend system—it took us three days to resolve it.\nTom: That sounds serious. I hope the team isn't overworked. Have you considered delegating tasks?\nMark: Actually, we've been outsourcing some features to freelancers, but that's been slower than expected. The main issue is finding qualified developers who understand our vision.\nTom: I understand. What about the budget? Is it still within the approved limit?\nMark: We're 15% over budget due to the delays, but I believe we can recover by optimizing our workflow and cutting unnecessary expenses.\nTom: We need to discuss this with the board soon. Can you prepare a detailed report showing the timeline adjustments?\nMark: Absolutely. I'll have it ready by Friday.",
      questions: [
        {
          id: 1,
          options: [
            "The app will launch next month.",
            "The app is scheduled to launch next quarter.",
            "The app has already been launched.",
            "The launch date has been moved to next year."
          ],
          correct: 1,
          explanation: "Tom nói: 'We're supposed to launch next quarter.' (Chúng ta có lẽ sẽ khởi chạy quý tới). Đáp án đúng là (B). Ngữ pháp: 'Be supposed to' chỉ kế hoạch dự kiến. Thì hiện tại tiếp diễn (are supposed) nhấn mạnh tình trạng hiện tại. Collocation: 'launch app', 'next quarter'. Kỹ năng nghe: Xác định thời gian lên kế hoạch."
        },
        {
          id: 2,
          options: [
            "There have been no challenges so far.",
            "The challenges are only marketing-related.",
            "A critical security flaw was discovered in the backend.",
            "The team resolved the issues within one hour."
          ],
          correct: 2,
          explanation: "Mark nói: 'Last week we discovered a critical security flaw in the backend system—it took us three days to resolve it.' (Tuần trước chúng tôi phát hiện lỗ hổng bảo mật nghiêm trọng trong hệ thống backend—mất 3 ngày để khắc phục). Đáp án đúng là (C). Ngữ pháp: Thì quá khứ đơn (discovered, took) cho hành động hoàn thành. 'It took + thời gian' cấu trúc chỉ khoảng thời gian. Collocation: 'security flaw', 'backend system'. Kỹ năng nghe: Xác định vấn đề kỹ thuật."
        },
        {
          id: 3,
          options: [
            "They haven't outsourced any work.",
            "Outsourcing has been faster than expected.",
            "They've been outsourcing features to freelancers, but progress is slower.",
            "All development is done in-house."
          ],
          correct: 2,
          explanation: "Mark nói: 'We've been outsourcing some features to freelancers, but that's been slower than expected.' (Chúng tôi đã thuê ngoài một số tính năng cho các freelancer, nhưng nó chậm hơn dự kiến). Đáp án đúng là (C). Ngữ pháp: Present Perfect Continuous (have been outsourcing) chỉ hành động bắt đầu trong quá khứ kéo dài đến hiện tại. 'But' nối ý đối lập. Collocation: 'outsource features', 'freelancers'. Kỹ năng nghe: Xác định chiến lược và kết quả."
        },
        {
          id: 4,
          options: [
            "Finding developers with specific skills is easy.",
            "The main issue is finding qualified developers who understand the vision.",
            "Budget is the only concern.",
            "Marketing is not a problem."
          ],
          correct: 1,
          explanation: "Mark nói: 'The main issue is finding qualified developers who understand our vision.' (Vấn đề chính là tìm các nhà phát triển có trình độ hiểu rõ tầm nhìn của chúng ta). Đáp án đúng là (B). Ngữ pháp: Relative clause (who understand our vision) mô tả danh từ 'developers'. 'The main issue is' cấu trúc nhấn mạnh vấn đề chính. Collocation: 'qualified developers', 'understand vision'. Kỹ năng nghe: Xác định trở ngại chính."
        },
        {
          id: 5,
          options: [
            "The budget is under control.",
            "The project is 15% over budget due to delays.",
            "They don't need to adjust the budget.",
            "The budget has been approved for overrun."
          ],
          correct: 1,
          explanation: "Mark nói: 'We're 15% over budget due to the delays, but I believe we can recover by optimizing our workflow.' (Chúng tôi vượt quá 15% ngân sách do sự chậm trễ, nhưng tôi tin chúng tôi có thể bù lại). Đáp án đúng là (B). Ngữ pháp: Present Continuous (are over budget) chỉ tình trạng hiện tại. 'Due to' giới từ chỉ nguyên nhân. Collocation: 'over budget', 'optimize workflow'. Kỹ năng nghe: Xác định tình hình tài chính."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người về cải thiện dịch vụ khách hàng. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At a service improvement meeting.\nDirector: Good morning, everyone. We need to address the recent drop in customer satisfaction scores. According to our survey, response time is a key issue.\nSarah: I completely agree. Last month, average response time was 48 hours. Our competitors respond within 24 hours.\nJohn: We should invest in more staff or implement automation tools. However, automation alone won't solve the problem.\nDirector: Both approaches have merit. Sarah, what about training current staff to work more efficiently?\nSarah: Excellent idea. We can combine training with process improvement. I suggest implementing a new ticketing system.\nJohn: That would help, but we also need to hire at least 10 additional support specialists.\nDirector: Agreed. Let's allocate budget for both training and recruitment. We need results by quarter-end.",
      questions: [
        {
          id: 6,
          question: "What is the main problem discussed?",
          options: [
            "Product quality issues",
            "Drop in customer satisfaction scores",
            "Equipment breakdown",
            "Supply chain problems"
          ],
          correct: 1,
          explanation: "Director nói: 'We need to address the recent drop in customer satisfaction scores.' (Chúng ta cần giải quyết sự sụt giảm gần đây trong điểm hài lòng của khách hàng). Đáp án đúng là (B). Ngữ pháp: Present Continuous (need to address) chỉ sự cần thiết hiện tại. Collocation: 'customer satisfaction scores', 'drop'. Kỹ năng nghe: Xác định vấn đề chính."
        },
        {
          id: 7,
          question: "What was the average response time last month?",
          options: [
            "24 hours",
            "48 hours",
            "72 hours",
            "12 hours"
          ],
          correct: 1,
          explanation: "Sarah nói: 'Last month, average response time was 48 hours.' (Tháng trước, thời gian phản ứng trung bình là 48 giờ). Đáp án đúng là (B). Ngữ pháp: Thì quá khứ đơn (was) cho thống kê trong quá khứ. Collocation: 'response time', 'average'. Kỹ năng nghe: Xác định con số."
        },
        {
          id: 8,
          question: "How long do competitors typically respond?",
          options: [
            "48 hours",
            "72 hours",
            "24 hours",
            "36 hours"
          ],
          correct: 2,
          explanation: "Sarah nói: 'Our competitors respond within 24 hours.' (Các đối thủ cạnh tranh của chúng tôi phản ứng trong vòng 24 giờ). Đáp án đúng là (C). Ngữ pháp: Present Simple (respond) chỉ thói quen chung. 'Within' giới từ chỉ khoảng thời gian. Collocation: 'respond within hours', 'competitors'. Kỹ năng nghe: So sánh hiệu suất."
        },
        {
          id: 9,
          question: "What solutions are proposed?",
          options: [
            "Only hire more staff",
            "Only implement automation",
            "Training, process improvement, new ticketing system, and hiring",
            "Replace all equipment"
          ],
          correct: 2,
          explanation: "Cuộc hội thoại đề xuất nhiều giải pháp: training, process improvement, ticketing system, hiring. Đáp án đúng là (C). Ngữ pháp: Multiple proposals với 'suggest', 'should', 'would help'. Collocation: 'implement system', 'hire specialists'. Kỹ năng nghe: Xác định tất cả các giải pháp."
        },
        {
          id: 10,
          question: "What is the deadline for results?",
          options: [
            "End of month",
            "End of quarter",
            "End of year",
            "Next week"
          ],
          correct: 1,
          explanation: "Director nói: 'We need results by quarter-end.' (Chúng ta cần kết quả trước hết quý). Đáp án đúng là (B). Ngữ pháp: 'By' giới từ chỉ thời hạn. Future need (need results) chỉ yêu cầu. Collocation: 'results by deadline', 'quarter-end'. Kỹ năng nghe: Xác định thời gian cụ thể."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) về xu hướng khoa học. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Dr. Elizabeth: Welcome to today's seminar on artificial intelligence and machine learning. These technologies are revolutionizing industries at an unprecedented pace. Companies are adopting AI solutions to enhance productivity, reduce costs, and improve decision-making. However, challenges remain—data privacy concerns, skill shortages, and ethical dilemmas require careful consideration. Despite these obstacles, investment in AI continues to grow. Educational institutions are adapting their curricula to prepare students for an AI-driven future. The potential for innovation is limitless, but responsible implementation is essential for long-term success.",
      questions: [
        {
          id: 11,
          question: "According to Dr. Elizabeth, AI and machine learning are __________.",
          options: ["(A) declining in popularity", "(B) revolutionizing industries", "(C) creating only problems", "(D) becoming less important"],
          correct: 1,
          explanation: "Dr. Elizabeth: 'These technologies are revolutionizing industries at an unprecedented pace.' (Các công nghệ này đang thay đổi ngành công nghiệp với tốc độ chưa từng có). Đáp án đúng là (B). Ngữ pháp: Present Continuous (are revolutionizing) nhấn mạn hành động đang xảy ra. Collocation: 'revolutionizing industries', 'unprecedented pace'. Kỹ năng nghe: Xác định tác động chính."
        },
        {
          id: 12,
          question: "Companies adopt AI to __________.",
          options: ["(A) reduce employment", "(B) increase complexity", "(C) enhance productivity and reduce costs", "(D) ignore data privacy"],
          correct: 2,
          explanation: "Dr. Elizabeth: 'Companies are adopting AI solutions to enhance productivity, reduce costs, and improve decision-making.' (Các công ty đang áp dụng các giải pháp AI để tăng năng suất, giảm chi phí). Đáp án đúng là (C). Ngữ pháp: Present Continuous (are adopting) + Infinitive of purpose (to enhance). Collocation: 'adopt AI', 'reduce costs'. Kỹ năng nghe: Xác định lợi ích."
        },
        {
          id: 13,
          question: "What challenges are mentioned?",
          options: ["(A) Low investment interest", "(B) Data privacy, skill shortages, ethical dilemmas", "(C) Lack of technology", "(D) Decreased innovation"],
          correct: 1,
          explanation: "Dr. Elizabeth: 'Challenges remain—data privacy concerns, skill shortages, and ethical dilemmas require careful consideration.' (Các thách thức vẫn tồn tại—mối quan tâm về bảo mật dữ liệu). Đáp án đúng là (B). Ngữ pháp: Dấu gạch ngang (—) giới thiệu chi tiết. 'Require' + object chỉ yêu cầu. Collocation: 'data privacy', 'skill shortages'. Kỹ năng nghe: Xác định vấn đề."
        },
        {
          id: 14,
          question: "Despite obstacles, what continues to happen?",
          options: ["(A) Investment in AI continues to grow", "(B) AI adoption is decreasing", "(C) Companies are avoiding AI", "(D) Research has stopped"],
          correct: 0,
          explanation: "Dr. Elizabeth: 'Despite these obstacles, investment in AI continues to grow.' (Mặc dù những trở ngại này, đầu tư vào AI tiếp tục tăng). Đáp án đúng là (A). Ngữ pháp: 'Despite' giới từ chỉ sự nhượng bộ. 'Continue to grow' cấu trúc chỉ sự tiếp tục. Collocation: 'investment continues to grow'. Kỹ năng nghe: Xác định xu hướng tích cực."
        },
        {
          id: 15,
          question: "What are educational institutions doing?",
          options: ["(A) Ignoring AI", "(B) Eliminating technology programs", "(C) Adapting curricula for AI-driven future", "(D) Reducing student numbers"],
          correct: 2,
          explanation: "Dr. Elizabeth: 'Educational institutions are adapting their curricula to prepare students for an AI-driven future.' (Các tổ chức giáo dục đang điều chỉnh chương trình để chuẩn bị cho sinh viên). Đáp án đúng là (C). Ngữ pháp: Present Continuous (are adapting) + Infinitive of purpose (to prepare). Collocation: 'adapt curricula', 'AI-driven future'. Kỹ năng nghe: Xác định ứng phó chiến lược."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn) giữa nhân viên HR và ứng viên. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "HR Manager: Good afternoon. Thanks for coming in. I see you have 8 years of marketing experience. Can you tell us about your most successful campaign?\nCandidate: Of course. Three years ago, I led a digital marketing campaign that increased brand awareness by 45%. The campaign combined social media, email marketing, and influencer partnerships.\nHR Manager: That's impressive. How did you measure success?\nCandidate: We tracked key metrics—engagement rates, conversion rates, and ROI. The project exceeded expectations and generated significant revenue.\nHR Manager: Excellent. Do you have experience managing remote teams?\nCandidate: Yes, for the past two years I've been managing a distributed team across three countries. It required implementing effective communication systems and regular feedback mechanisms.\nHR Manager: That's valuable. When could you start if offered the position?\nCandidate: I can provide two weeks' notice, so I could start in mid-April.",
      questions: [
        {
          id: 16,
          question: "How much marketing experience does the candidate have?",
          options: [
            "(A) 3 years",
            "(B) 5 years",
            "(C) 8 years",
            "(D) 10 years"
          ],
          correct: 2,
          explanation: "HR Manager: 'I see you have 8 years of marketing experience.' (Tôi thấy bạn có 8 năm kinh nghiệm marketing). Đáp án đúng là (C). Ngữ pháp: Present Simple (have) chỉ trạng thái hiện tại. Collocation: 'marketing experience', 'years'. Kỹ năng nghe: Xác định thông tin cơ bản."
        },
        {
          id: 17,
          question: "By what percentage did the brand awareness increase?",
          options: [
            "(A) 30%",
            "(B) 45%",
            "(C) 55%",
            "(D) 65%"
          ],
          correct: 1,
          explanation: "Candidate: 'Increased brand awareness by 45%.' (Tăng nhận thức về thương hiệu 45%). Đáp án đúng là (B). Ngữ pháp: Past Simple (increased) + percentage. Collocation: 'brand awareness', 'increased by'. Kỹ năng nghe: Xác định con số chính xác."
        },
        {
          id: 18,
          question: "What metrics were tracked to measure success?",
          options: [
            "(A) Only sales numbers",
            "(B) Engagement, conversion rates, and ROI",
            "(C) Only website traffic",
            "(D) Customer complaints"
          ],
          correct: 1,
          explanation: "Candidate: 'We tracked key metrics—engagement rates, conversion rates, and ROI.' (Chúng tôi theo dõi các chỉ số chính—tỷ lệ tương tác, tỷ lệ chuyển đổi, ROI). Đáp án đúng là (B). Ngữ pháp: Past Simple (tracked) + plural objects. Dấu gạch ngang (—) liệt kê. Collocation: 'key metrics', 'ROI'. Kỹ năng nghe: Xác định các yếu tố đo lường."
        },
        {
          id: 19,
          question: "How long has the candidate managed remote teams?",
          options: [
            "(A) For 1 year",
            "(B) For 2 years",
            "(C) For 3 years",
            "(D) For 5 years"
          ],
          correct: 1,
          explanation: "Candidate: 'For the past two years I've been managing a distributed team.' (Trong 2 năm qua, tôi đã quản lý một đội phân tán). Đáp án đúng là (B). Ngữ pháp: Present Perfect Continuous (have been managing) + 'for 2 years'. Collocation: 'managing remote teams'. Kỹ năng nghe: Xác định khoảng thời gian."
        },
        {
          id: 20,
          question: "When can the candidate start working?",
          options: [
            "(A) Immediately",
            "(B) Next week",
            "(C) Mid-April",
            "(D) In two months"
          ],
          correct: 2,
          explanation: "Candidate: 'I can provide two weeks' notice, so I could start in mid-April.' (Tôi có thể thông báo hai tuần, vì vậy tôi có thể bắt đầu vào giữa tháng 4). Đáp án đúng là (C). Ngữ pháp: Modal 'could' + start + time. Collocation: 'provide notice', 'start in'. Kỹ năng nghe: Xác định thời gian bắt đầu."
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
          question: "The innovative technology __________ by our research team has garnered international recognition for its efficiency.",
          options: ["develop", "developed", "developing", "develops"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'developed' vì Past Participle bổ nghĩa danh từ 'technology'. Ngữ pháp: Relative clause rút gọn sử dụng past participle (developed by our research team = which was developed). Collocation: 'innovative technology', 'international recognition'. Từ vựng: 'develop' là nguyên thể; 'developing' là V-ing; 'develops' là hiện tại đơn."
        },
        {
          id: 22,
          question: "Despite facing numerous obstacles, the project team __________ to deliver the final product within the deadline.",
          options: ["managed", "managing", "manages", "management"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'managed' vì thì quá khứ đơn sau cấu trúc 'Despite' chỉ hành động hoàn thành. Ngữ pháp: 'Managed to + V' cấu trúc chỉ thành công trong hoàn cảnh khó khăn. Collocation: 'managed to deliver', 'within deadline'. Từ vựng: 'managing' là V-ing; 'manages' là hiện tại đơn; 'management' là danh từ."
        },
        {
          id: 23,
          question: "The company's commitment to sustainability has made it __________ among environmentally conscious consumers.",
          options: ["popular", "popularity", "popularly", "popularize"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'popular' vì tính từ bổ nghĩa danh từ (it = the company). Ngữ pháp: Cấu trúc 'make + object + adjective' yêu cầu tính từ sau 'it'. Collocation: 'popular among consumers', 'environmentally conscious'. Từ vựng: 'popularity' là danh từ; 'popularly' là trạng từ; 'popularize' là động từ."
        },
        {
          id: 24,
          question: "The training program __________ employees to develop critical skills necessary for career advancement.",
          options: ["enable", "enables", "enabling", "enabled"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'enabled' vì thì quá khứ đơn mô tả hành động chương trình đã thực hiện. Ngữ pháp: 'The program enabled' với 'enable + object + to V' chỉ cho phép. Collocation: 'training program', 'career advancement'. Từ vựng: 'enable' là nguyên thể; 'enables' là hiện tại đơn; 'enabling' là V-ing."
        },
        {
          id: 25,
          question: "Rather __________ abandoning the project, the team proposed alternative solutions to overcome the financial constraints.",
          options: ["than", "then", "when", "while"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'than' vì 'Rather than' là cụm giới từ chỉ lựa chọn thay thế. Ngữ pháp: Cấu trúc 'rather than + V-ing' so sánh hai hành động. Collocation: 'rather than abandoning'. Từ vựng: 'then' là trạng từ chỉ thời gian; 'when' là liên từ; 'while' là liên từ."
        },
        {
          id: 26,
          question: "The organization has __________ its operations in five new markets despite economic uncertainty.",
          options: ["expands", "expand", "expanded", "expanding"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'expanded' vì Present Perfect (has + V3) chỉ hành động hoàn thành liên quan hiện tại. Ngữ pháp: 'Has expanded' chỉ kết quả hiện tại của hành động trong quá khứ. Collocation: 'expand operations', 'new markets'. Từ vựng: 'expands' là hiện tại đơn; 'expand' là nguyên thể; 'expanding' là V-ing."
        },
        {
          id: 27,
          question: "The consultant recommends implementing new strategies __________ to reduce operational costs significantly.",
          options: ["designing", "designed", "design", "designs"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'designed' vì Past Participle bổ nghĩa danh từ 'strategies'. Ngữ pháp: Relative clause rút gọn 'strategies designed to reduce' = 'strategies which are designed to reduce'. Collocation: 'designed to reduce costs'. Từ vựng: 'designing' là V-ing; 'design' là nguyên thể; 'designs' là hiện tại đơn."
        },
        {
          id: 28,
          question: "The data analysis __________ conducted last month provides valuable insights for strategic decision-making.",
          options: ["which is", "which was", "what is", "that has"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'which was' vì Relative Pronoun 'which' + Past Simple Passive (was conducted). Ngữ pháp: 'The analysis which was conducted' mô tả hành động thụ động trong quá khứ. Collocation: 'data analysis', 'strategic decision-making'. Từ vựng: 'which is' là hiện tại; 'what is' không phù hợp; 'that has' là hiện tại hoàn thành."
        },
        {
          id: 29,
          question: "After __________ all relevant factors, the board approved the merger without hesitation.",
          options: ["consider", "considered", "considering", "considers"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'considering' vì After + V-ing (gerund) yêu cầu danh động từ. Ngữ pháp: 'After considering' cấu trúc giới từ + gerund. Collocation: 'consider factors', 'board approved'. Từ vựng: 'consider' là nguyên thể; 'considered' là quá khứ phân từ; 'considers' là hiện tại đơn."
        },
        {
          id: 30,
          question: "The policy __________ that all employees must undergo annual compliance training without exception.",
          options: ["states", "stating", "stated", "state"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'states' vì thì hiện tại đơn chỉ quy tắc chung hiện hành. Ngữ pháp: 'The policy states that' cấu trúc bắt đầu mệnh đề báo cáo (reported clause). Collocation: 'policy states', 'compliance training'. Từ vựng: 'stating' là V-ing; 'stated' là quá khứ; 'state' là nguyên thể."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D). Câu 31-36: Điền từ thích hợp. Câu 37-40: Đọc hiểu.",
      type: "reading",
      text: `To: All Department Heads
From: Mr. Wilson, Chief Operations Officer
Subject: Implementation of New Quality Management System
Dear Colleagues,

We are excited to announce the launch of our new Quality Management System, scheduled for January 15th. This system has been designed (31) streamline our operations and ensure consistent quality across all departments. The implementation will require commitment from every team member, and we are confident this transition will strengthen our competitive position.

Training sessions will be held next week to ensure all staff members understand the new procedures. To (32) maximum participation, these sessions will be conducted both in-person and online. We encourage employees to (33) at least one training session to familiarize themselves with the system's features.

The new system will track performance metrics, automate routine tasks, and provide real-time reporting capabilities. These features will help us (34) data-driven decisions more efficiently. Additionally, we have secured funding to support implementation costs, so there will be no (35) to departmental budgets.

We understand that change can be challenging, (36) the long-term benefits outweigh any initial adjustments. Your cooperation and positive attitude are essential to this initiative's success. If you have questions or require additional support, please contact the Quality Management team.

Best regards,
Mr. Wilson
Chief Operations Officer
Excellence Corporation`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "...designed (31) streamline our operations...",
          options: ["to", "for", "in", "by"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'to' vì 'designed to + V' cấu trúc Infinitive of purpose. Ngữ pháp: 'Designed to streamline' chỉ mục đích thiết kế. Collocation: 'designed to streamline', 'operations'. Từ vựng: 'for' là giới từ khác; 'in' là giới từ vị trí; 'by' là giới từ chỉ phương tiện."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "To (32) maximum participation...",
          options: ["ensure", "guarantee", "achieve", "maintain"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'ensure' vì 'To ensure + object' cấu trúc chỉ mục đích. Ngữ pháp: Infinitive of purpose (To ensure maximum participation). Collocation: 'ensure participation', 'maximum participation'. Từ vựng: 'guarantee' gần nghĩa nhưng 'ensure' tự nhiên hơn trong bối cảnh chính thức."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "We encourage employees to (33) at least one training session...",
          options: ["attend", "participate", "join", "engage"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'attend' vì 'attend a session' là cụm từ cố định. Ngữ pháp: 'Encourage + object + to + V' (encourage employees to attend). Collocation: 'attend training session'. Từ vựng: 'participate' và 'join' cũng phù hợp nhưng 'attend' chính thức hơn."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "...help us (34) data-driven decisions more efficiently.",
          options: ["take", "make", "develop", "create"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'make' vì 'make decisions' là cụm từ cố định. Ngữ pháp: 'Help us make' với 'help + object + V nguyên thể'. Collocation: 'make decisions', 'data-driven decisions'. Từ vựng: 'take decisions' ít dùng hơn; 'develop', 'create' không phù hợp."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "...will be no (35) to departmental budgets.",
          options: ["impact", "damage", "pressure", "threat"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'impact' vì 'no impact to budgets' chỉ không ảnh hưởng tiêu cực. Ngữ pháp: 'Will be no + noun' cấu trúc phủ định. Collocation: 'no impact on budgets'. Từ vựng: 'damage', 'pressure', 'threat' quá tiêu cực; 'impact' trung tính hơn."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "...challenging, (36) the long-term benefits outweigh...",
          options: ["but", "so", "because", "although"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'but' vì nối hai mệnh đề đối lập: challenging (tiêu cực) và benefits outweigh (tích cực). Ngữ pháp: Coordinating conjunction 'but' chỉ sự đối lập. Collocation: 'challenging, but benefits'. Từ vựng: 'so' chỉ kết quả; 'because' chỉ nguyên nhân; 'although' là subordinating."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - When is the new Quality Management System scheduled to launch?",
          options: [
            "December 15th",
            "January 15th",
            "February 15th",
            "Next week"
          ],
          correct: 1,
          explanation: "Email nêu: 'scheduled for January 15th'. Ngữ pháp: 'Scheduled for + date' chỉ thời gian lên lịch. Collocation: 'scheduled to launch', 'January 15th'. Kỹ năng đọc hiểu: Xác định ngày khởi động."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - Why is the new system being implemented?",
          options: [
            "To reduce staff numbers",
            "To streamline operations and ensure quality consistency",
            "To replace old equipment",
            "To reduce salaries"
          ],
          correct: 1,
          explanation: "Email nêu: 'designed to streamline our operations and ensure consistent quality'. Ngữ pháp: 'Designed to + V' chỉ mục đích. Collocation: 'streamline operations', 'ensure quality'. Kỹ năng đọc hiểu: Xác định lý do triển khai."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - What formats will the training sessions be offered in?",
          options: [
            "Only in-person",
            "Only online",
            "Both in-person and online",
            "By appointment only"
          ],
          correct: 2,
          explanation: "Email nêu: 'sessions will be conducted both in-person and online'. Ngữ pháp: 'Both ... and' cho hai lựa chọn. Collocation: 'in-person and online sessions'. Kỹ năng đọc hiểu: Xác định hình thức huấn luyện."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - What will NOT be affected by the implementation?",
          options: [
            "Departmental operations",
            "Training requirements",
            "Departmental budgets",
            "Staff procedures"
          ],
          correct: 2,
          explanation: "Email nêu: 'no impact to departmental budgets'. Ngữ pháp: 'No impact to' chỉ sự không bị ảnh hưởng. Collocation: 'no impact on budgets', 'secured funding'. Kỹ năng đọc hiểu: Xác định thứ không bị tác động."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**TechLearn Online Academy Advertisement**
Transform Your Career with Professional Certifications
Master in-demand skills with our industry-recognized courses. Whether you're starting fresh or advancing your career, TechLearn has a program for you.
**Programs Available:**
1. **Data Science Certificate** – Learn Python, SQL, machine learning algorithms. Duration: 12 weeks. Certificate recognized by Fortune 500 companies.
2. **Cybersecurity Specialist** – Master network security, ethical hacking, compliance. Duration: 16 weeks. Includes hands-on lab experience.
3. **Cloud Architecture** – AWS, Azure, Google Cloud expertise. Duration: 10 weeks. Job placement assistance provided.
4. **Business Analytics** – Power BI, Tableau, data visualization. Duration: 8 weeks. Flexible scheduling available.
Special Offer: Enroll now and receive 30% discount on your first course. Scholarships available for eligible candidates. Contact: learn@techlearn.com | Phone: 1-800-TECHLEARN
---
**Email Message**
**To:** learn@techlearn.com
**From:** sarah.mitchell@email.com
**Date:** March 10, 2025
**Subject:** Inquiry About Cybersecurity Certificate Program
Dear TechLearn Team,

I am writing to inquire about your Cybersecurity Specialist Certificate program. I currently work as an IT technician with 6 years of experience but want to advance into a security analyst role. I have a bachelor's degree in computer science but no formal cybersecurity credentials.

Could you provide information about the program curriculum, specifically the ethical hacking component? Additionally, I would like to know about job placement success rates and alumni outcomes. What are the prerequisites, and would my IT background meet the requirements?

I am particularly interested in the hands-on lab experience mentioned in your advertisement. My current job allows flexibility, so I can pursue studies part-time. What is the minimum time commitment required per week?

Could you also confirm whether the certificate is recognized by security certification bodies like CompTIA or ISC2? This is important for my career progression goals.

I look forward to hearing from you.

Best regards,
Sarah Mitchell
sarah.mitchell@email.com
(555) 234-5678`,
      questions: [
        {
          id: 41,
          question: "Which program has the shortest duration?",
          options: [
            "Data Science Certificate",
            "Cybersecurity Specialist",
            "Cloud Architecture",
            "Business Analytics"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì 'Business Analytics – Duration: 8 weeks' là ngắn nhất. Ngữ pháp: 'Duration' chỉ thời gian khóa học. Collocation: 'program duration', 'weeks'. Kỹ năng đọc hiểu: So sánh thông tin."
        },
        {
          id: 42,
          question: "What special benefit is mentioned in the advertisement?",
          options: [
            "Free lifetime access",
            "30% discount on first course",
            "Guaranteed employment",
            "Monthly installments"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'receive 30% discount on your first course'. Ngữ pháp: Present Simple (receive) chỉ ưu đãi hiện hành. Collocation: 'discount on course', 'special offer'. Kỹ năng đọc hiểu: Xác định ưu đãi."
        },
        {
          id: 43,
          question: "What is Sarah's current professional position?",
          options: [
            "Security analyst",
            "Software developer",
            "IT technician",
            "Network engineer"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'I currently work as an IT technician'. Ngữ pháp: Present Simple (work) chỉ công việc hiện tại. Collocation: 'work as technician'. Kỹ năng đọc hiểu: Xác định vị trí công việc."
        },
        {
          id: 44,
          question: "How many years of IT experience does Sarah have?",
          options: [
            "3 years",
            "5 years",
            "6 years",
            "8 years"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì '6 years of experience'. Ngữ pháp: Số lượng + 'years of' + danh từ. Collocation: 'years of experience', 'IT technician'. Kỹ năng đọc hiểu: Xác định con số."
        },
        {
          id: 45,
          question: "What is Sarah's educational background?",
          options: [
            "Diploma in information technology",
            "Associate's degree in computer science",
            "Bachelor's degree in computer science",
            "Master's degree in cybersecurity"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'I have a bachelor's degree in computer science'. Ngữ pháp: Present Perfect (have) + 'degree'. Collocation: 'bachelor's degree', 'computer science'. Kỹ năng đọc hiểu: Xác định trình độ học vấn."
        },
        {
          id: 46,
          question: "Which certificate program includes hands-on lab experience?",
          options: [
            "Data Science",
            "Cybersecurity Specialist",
            "Business Analytics",
            "All programs"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Cybersecurity Specialist – Includes hands-on lab experience'. Ngữ pháp: Present Simple (includes). Collocation: 'hands-on lab experience', 'cybersecurity'. Kỹ năng đọc hiểu: Xác định tính năng đặc biệt."
        },
        {
          id: 47,
          question: "What is Sarah's primary career goal?",
          options: [
            "Become an IT manager",
            "Advance into security analyst role",
            "Work as a software developer",
            "Start own cybersecurity company"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'want to advance into a security analyst role'. Ngữ pháp: 'Want to + V' chỉ mong muốn. Collocation: 'advance into role', 'security analyst'. Kỹ năng đọc hiểu: Xác định mục tiêu."
        },
        {
          id: 48,
          question: "What study arrangement does Sarah prefer?",
          options: [
            "Full-time only",
            "Weekends only",
            "Part-time",
            "Online only"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'I can pursue studies part-time'. Ngữ pháp: 'Can pursue' chỉ khả năng. Collocation: 'pursue studies part-time'. Kỹ năng đọc hiểu: Xác định sắp xếp thời gian."
        },
        {
          id: 49,
          question: "Which Cloud Architecture platforms are covered?",
          options: [
            "Azure and Google Cloud only",
            "AWS and Azure only",
            "AWS, Azure, Google Cloud",
            "Other proprietary platforms"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'Cloud Architecture – AWS, Azure, Google Cloud expertise'. Ngữ pháp: Liệt kê ba nền tảng. Collocation: 'cloud platforms', 'expertise'. Kỹ năng đọc hiểu: Xác định nội dung khóa học."
        },
        {
          id: 50,
          question: "What professional organizations does Sarah want certificate recognition from?",
          options: [
            "Cisco and Microsoft only",
            "CompTIA and ISC2",
            "All security organizations",
            "Academic institutions only"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'recognized by security certification bodies like CompTIA or ISC2'. Ngữ pháp: 'Like' giới thiệu ví dụ. Collocation: 'security certification bodies', 'recognized by'. Kỹ năng đọc hiểu: Xác định yêu cầu cụ thể."
        }
      ]
    },
    part8: {
      title: "PART 8: Professional Message Thread",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn/email chuyên nghiệp, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Project Manager (09:00): Team, the client just approved the final design mockups. We can now proceed to the development phase. Let's schedule a kickoff meeting for tomorrow at 2 PM.

Developer Lead (09:15): Excellent news! I've reviewed the mockups and they look solid. However, we need clarification on the database architecture. Can we add that to tomorrow's agenda?

Designer (09:30): Confirmed. The mockups represent 6 weeks of refinement. I'm confident the development team will find them straightforward to implement.

QA Manager (09:45): Great progress. Before development begins, I'd like to propose a testing strategy and timeline. Should we start UAT after feature completion or run parallel testing?

Project Manager (10:00): Good points, everyone. Let's address database architecture, testing strategy, and resource allocation at tomorrow's meeting. I'll send the full agenda by EOD today.

Developer Lead (10:30): Perfect. We should also discuss API specifications and third-party integrations. I'll prepare technical documentation by tomorrow morning.

Designer (11:00): One more thing—do we have approval for the color scheme changes the client requested? This might affect implementation timeline.

Project Manager (11:15): Good catch. I'll confirm with the client this afternoon. That detail could impact design assets and development dependencies. Everyone okay with the 2 PM meeting?

QA Manager (11:45): 2 PM works. I'll prepare testing framework recommendations.

Developer Lead (12:00): Ready when you are. The team is eager to start coding.`,
      questions: [
        {
          id: 51,
          question: "What was approved by the client?",
          options: [
            "Budget increase",
            "Final design mockups",
            "Development team expansion",
            "Extended timeline"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'client just approved the final design mockups'. Ngữ pháp: Past Simple (approved) + object. Collocation: 'client approved mockups'. Kỹ năng đọc hiểu: Xác định quyết định chính."
        },
        {
          id: 52,
          question: "When is the kickoff meeting scheduled?",
          options: [
            "Today at 2 PM",
            "Tomorrow at 10 AM",
            "Tomorrow at 2 PM",
            "Next week"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'kickoff meeting for tomorrow at 2 PM'. Ngữ pháp: Future plan (schedule) + time. Collocation: 'kickoff meeting', 'tomorrow at 2 PM'. Kỹ năng đọc hiểu: Xác định thời gian."
        },
        {
          id: 53,
          question: "What does the Developer Lead request to clarify?",
          options: [
            "Color scheme",
            "Database architecture",
            "Testing timeline",
            "Budget allocation"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'we need clarification on the database architecture'. Ngữ pháp: 'Need clarification on' + topic. Collocation: 'database architecture', 'clarification'. Kỹ năng đọc hiểu: Xác định yêu cầu kỹ thuật."
        },
        {
          id: 54,
          question: "How long did the design refinement take?",
          options: [
            "3 weeks",
            "4 weeks",
            "6 weeks",
            "8 weeks"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'mockups represent 6 weeks of refinement'. Ngữ pháp: 'Represent' + time duration. Collocation: 'weeks of refinement', 'design mockups'. Kỹ năng đọc hiểu: Xác định khoảng thời gian."
        },
        {
          id: 55,
          question: "What is the QA Manager's main concern?",
          options: [
            "Designer availability",
            "Client feedback",
            "Testing strategy and timeline",
            "Budget overrun"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'propose a testing strategy and timeline'. Ngữ pháp: 'Propose' + object. Collocation: 'testing strategy', 'UAT (User Acceptance Testing)'. Kỹ năng đọc hiểu: Xác định mối quan tâm chính."
        },
        {
          id: 56,
          question: "What is the Designer concerned about regarding the timeline?",
          options: [
            "Budget constraints",
            "Client's color scheme changes",
            "Developer availability",
            "Testing complexity"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'color scheme changes the client requested... might affect implementation timeline'. Ngữ pháp: Conditional (might affect). Collocation: 'color scheme changes', 'implementation timeline'. Kỹ năng đọc hiểu: Xác định mối quan tâm phụ."
        },
        {
          id: 57,
          question: "What will the Project Manager do this afternoon?",
          options: [
            "Prepare the agenda",
            "Confirm with the client about color scheme approval",
            "Review technical documentation",
            "Approve the budget"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll confirm with the client this afternoon'. Ngữ pháp: Future Simple (will confirm) + time. Collocation: 'confirm with client', 'this afternoon'. Kỹ năng đọc hiểu: Xác định hành động tiếp theo."
        },
        {
          id: 58,
          question: "When will the Project Manager send the full agenda?",
          options: [
            "At 2 PM tomorrow",
            "By end of day today (EOD)",
            "Tomorrow morning",
            "Next week"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll send the full agenda by EOD today'. Ngữ pháp: 'By' chỉ thời hạn. Collocation: 'send agenda', 'by EOD (end of day)'. Kỹ năng đọc hiểu: Xác định thời gian gửi."
        },
        {
          id: 59,
          question: "What will the Developer Lead prepare before the meeting?",
          options: [
            "Budget proposals",
            "Technical documentation",
            "Testing framework",
            "Design assets"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll prepare technical documentation by tomorrow morning'. Ngữ pháp: Future Simple (will prepare) + object. Collocation: 'technical documentation', 'API specifications'. Kỹ năng đọc hiểu: Xác định chuẩn bị."
        },
        {
          id: 60,
          question: "What is the overall sentiment of the team?",
          options: [
            "Frustrated and behind schedule",
            "Anxious about the timeline",
            "Positive and eager to proceed",
            "Concerned about the design quality"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì tone của toàn bộ chuỗi tin nhắn tích cực: 'Excellent', 'solid', 'eager to start coding'. Ngữ pháp: Positive language throughout. Collocation: 'eager to start', 'ready when you are'. Kỹ năng đọc hiểu: Suy luận cảm xúc chung."
        }
      ]
    }
  }
};