export const EXAM6_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 6 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Ben và Anna về các dự án công việc. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Ben: Anna, how's the product redesign project coming along?\nAnna: It's progressing well, Ben. We've completed about sixty percent of the design work. The team has been working overtime to meet the deadline.\nBen: That's impressive! When do you expect to finish?\nAnna: We should be done by the end of next month if everything stays on track. However, we might need additional resources to ensure quality.\nBen: What kind of resources are you looking for?\nAnna: Mainly, we need more graphic designers and a project coordinator. The current team is stretched thin with multiple tasks.\nBen: I'll speak to the manager about allocating budget for new hires. By the way, how's your team morale?\nAnna: Overall, it's good. People are tired from the workload, but everyone is committed to delivering excellence. We just need some recognition for the hard work.",
      questions: [
        {
          id: 1,
          question: "How much of the design work has the team completed?",
          options: [
            "Half of the work",
            "Eighty percent",
            "Sixty percent",
            "Forty percent"
          ],
          correct: 2,
          explanation: "Anna nói: 'We've completed about sixty percent of the design work.' (Chúng tôi đã hoàn thành khoảng sáu mươi phần trăm công việc thiết kế.)"
        },
        {
          id: 2,
          question: "What is Anna's expected completion date?",
          options: [
            "By next quarter",
            "End of next month",
            "In two weeks",
            "Next week"
          ],
          correct: 1,
          explanation: "Anna nói: 'We should be done by the end of next month if everything stays on track.' (Chúng tôi nên hoàn thành vào cuối tháng tới nếu mọi thứ tiến hành đúng kế hoạch.)"
        },
        {
          id: 3,
          question: "What does Anna say about her team's current situation?",
          options: [
            "They completed their work early",
            "They are well-staffed and relaxed",
            "They are stretched thin with multiple tasks",
            "They have too many employees"
          ],
          correct: 2,
          explanation: "Anna nói: 'The current team is stretched thin with multiple tasks.' (Đội hiện tại được kéo căng với nhiều tác vụ.)"
        },
        {
          id: 4,
          question: "What additional resources does Anna request?",
          options: [
            "A longer project timeline",
            "Graphic designers and a project coordinator",
            "New office equipment",
            "More budget for marketing"
          ],
          correct: 1,
          explanation: "Anna nói: 'Mainly, we need more graphic designers and a project coordinator.' (Chủ yếu, chúng tôi cần thêm nhà thiết kế đồ họa và một điều phối viên dự án.)"
        },
        {
          id: 5,
          question: "How does Anna describe the team's morale?",
          options: [
            "Perfect with no issues",
            "Good overall, though tired from workload",
            "Very low and concerning",
            "Completely demoralized"
          ],
          correct: 1,
          explanation: "Anna nói: 'Overall, it's good. People are tired from the workload, but everyone is committed.' (Nói chung, nó tốt. Mọi người mệt mỏi từ khối lượng công việc, nhưng mọi người đều cam kết.)"
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người tại văn phòng. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At a corporate office.\nManager: Good morning, everyone. Let's discuss the quarterly sales report. Tom, can you share the numbers?\nTom: Of course. Our Q3 revenue increased by fifteen percent compared to last year. However, we saw a decline in the eastern region due to increased competition.\nEmma: What specific strategies are we implementing to address this decline?\nTom: We're planning to launch a targeted marketing campaign in that region next month. Additionally, we're training sales staff on new product features.\nManager: Good. Emma, how are the customer satisfaction surveys looking?\nEmma: The results are quite positive. Eighty-five percent of customers rated us as excellent or very good. However, some mentioned issues with delivery times.\nTom: We should coordinate with logistics to improve delivery efficiency.\nManager: Agreed. Let's make that a priority for the next quarter.",
      questions: [
        {
          id: 6,
          question: "By how much did Q3 revenue increase?",
          options: [
            "Five percent",
            "Fifteen percent",
            "Ten percent",
            "Twenty-five percent"
          ],
          correct: 1,
          explanation: "Tom nói: 'Our Q3 revenue increased by fifteen percent compared to last year.' (Doanh thu Q3 của chúng tôi tăng mười lăm phần trăm so với năm ngoái.)"
        },
        {
          id: 7,
          question: "Which region experienced a sales decline?",
          options: [
            "The central region",
            "The eastern region",
            "The northern region",
            "The western region"
          ],
          correct: 1,
          explanation: "Tom nói: 'However, we saw a decline in the eastern region due to increased competition.' (Tuy nhiên, chúng tôi thấy sự suy giảm ở khu vực phía đông do cạnh tranh gia tăng.)"
        },
        {
          id: 8,
          question: "What percentage of customers gave excellent or very good ratings?",
          options: [
            "Fifty percent",
            "Eighty-five percent",
            "Ninety percent",
            "Seventy percent"
          ],
          correct: 1,
          explanation: "Emma nói: 'Eighty-five percent of customers rated us as excellent or very good.' (Tám mươi lăm phần trăm khách hàng xếp chúng tôi là xuất sắc hoặc rất tốt.)"
        },
        {
          id: 9,
          question: "What issue did some customers mention?",
          options: [
            "Rude customer service",
            "Delivery time problems",
            "High prices",
            "Poor product quality"
          ],
          correct: 1,
          explanation: "Emma nói: 'However, some mentioned issues with delivery times.' (Tuy nhiên, một số đề cập đến vấn đề về thời gian giao hàng.)"
        },
        {
          id: 10,
          question: "What strategy is Tom proposing to address the regional decline?",
          options: [
            "Hiring new managers",
            "Launching a targeted marketing campaign",
            "Reducing product prices",
            "Closing the eastern region office"
          ],
          correct: 1,
          explanation: "Tom nói: 'We're planning to launch a targeted marketing campaign in that region next month.' (Chúng tôi đang lên kế hoạch để khởi động một chiến dịch tiếp thị có mục tiêu ở khu vực đó vào tháng tới.)"
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Good afternoon, class. Today I want to discuss the importance of sustainable business practices. In today's world, companies must balance profit with environmental responsibility. Many organizations are now adopting green initiatives to reduce their carbon footprint. This includes using renewable energy sources and implementing waste reduction programs. However, some companies view these efforts as additional expenses rather than long-term investments. The reality is that sustainable practices often lead to cost savings over time. For example, companies that invest in solar panels initially spend more, but they recover those costs within five to seven years through reduced energy bills. Additionally, consumers increasingly prefer to support businesses that demonstrate environmental commitment. Therefore, integrating sustainability into your business strategy is not just ethical—it's also financially smart.",
      questions: [
        {
          id: 11,
          question: "According to the professor, what must companies balance?",
          options: [
            "Growth and stability",
            "Profit and environmental responsibility",
            "Marketing and sales",
            "Employee wages and benefits"
          ],
          correct: 1,
          explanation: "Professor nói: 'companies must balance profit with environmental responsibility.' (các công ty phải cân bằng lợi nhuận với trách nhiệm môi trường.)"
        },
        {
          id: 12,
          question: "What view do some companies hold about green initiatives?",
          options: [
            "They increase product sales",
            "They are additional expenses",
            "They reduce employee morale",
            "They are essential for survival"
          ],
          correct: 1,
          explanation: "Professor nói: 'some companies view these efforts as additional expenses rather than long-term investments.' (một số công ty xem những nỗ lực này như là chi phí bổ sung thay vì đầu tư dài hạn.)"
        },
        {
          id: 13,
          question: "In how many years do companies typically recover solar panel investments?",
          options: [
            "One to two years",
            "Five to seven years",
            "Ten to twelve years",
            "Two to three years"
          ],
          correct: 1,
          explanation: "Professor nói: 'they recover those costs within five to seven years through reduced energy bills.' (họ lấy lại những chi phí đó trong năm đến bảy năm thông qua hóa đơn tiền điện giảm.)"
        },
        {
          id: 14,
          question: "What does the professor say about consumer preferences?",
          options: [
            "Consumers don't care about business practices",
            "Consumers increasingly prefer environmentally committed businesses",
            "Consumers prefer the cheapest products",
            "Consumers ignore environmental issues"
          ],
          correct: 1,
          explanation: "Professor nói: 'consumers increasingly prefer to support businesses that demonstrate environmental commitment.' (người tiêu dùng ngày càng thích hỗ trợ các doanh nghiệp thể hiện cam kết môi trường.)"
        },
        {
          id: 15,
          question: "What does the professor say about the financial impact of sustainability?",
          options: [
            "It only benefits large corporations",
            "It can lead to cost savings over time",
            "It has no financial benefit",
            "It always increases costs"
          ],
          correct: 1,
          explanation: "Professor nói: 'sustainable practices often lead to cost savings over time.' (các hoạt động bền vững thường dẫn đến tiết kiệm chi phí theo thời gian.)"
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "HR Rep: Good morning, John. Thank you for coming in. I wanted to discuss your performance review and career development.\nCandidate: Thank you for the opportunity. I'm eager to hear your feedback.\nHR Rep: Overall, your performance has been excellent. Your project management skills are strong, and you've consistently met deadlines. However, we've noticed that you could improve your communication with other departments.\nCandidate: That's valuable feedback. I realize I should collaborate more openly with colleagues from other teams.\nHR Rep: Exactly. We're offering you a leadership training program to help develop those skills. Additionally, we'd like to promote you to Senior Project Manager effective next month.\nCandidate: That's wonderful news! I'm grateful for this opportunity.\nHR Rep: You've earned it. The promotion comes with a fifteen percent salary increase and expanded responsibilities. We expect you to mentor junior team members as well.\nCandidate: I'm ready for this challenge. Thank you again.",
      questions: [
        {
          id: 16,
          question: "What is John's greatest strength according to the review?",
          options: [
            "Customer service abilities",
            "Project management skills and meeting deadlines",
            "Sales performance",
            "Communication with other departments"
          ],
          correct: 1,
          explanation: "HR Rep nói: 'Your project management skills are strong, and you've consistently met deadlines.' (Kỹ năng quản lý dự án của bạn mạnh, và bạn luôn đáp ứng hạn chót.)"
        },
        {
          id: 17,
          question: "What area does the HR Rep suggest John needs to improve?",
          options: [
            "Leadership abilities",
            "Communication with other departments",
            "Technical skills",
            "Time management"
          ],
          correct: 1,
          explanation: "HR Rep nói: 'you could improve your communication with other departments.' (bạn có thể cải thiện giao tiếp với các bộ phận khác.)"
        },
        {
          id: 18,
          question: "What training program is being offered to John?",
          options: [
            "Customer service training",
            "Leadership training program",
            "Sales training",
            "Technical skills training"
          ],
          correct: 1,
          explanation: "HR Rep nói: 'We're offering you a leadership training program to help develop those skills.' (Chúng tôi đang cung cấp cho bạn chương trình đào tạo lãnh đạo để giúp phát triển các kỹ năng đó.)"
        },
        {
          id: 19,
          question: "What is John's new position?",
          options: [
            "Team Lead",
            "Senior Project Manager",
            "HR Manager",
            "Department Manager"
          ],
          correct: 1,
          explanation: "HR Rep nói: 'we'd like to promote you to Senior Project Manager effective next month.' (chúng tôi muốn thăng chức bạn lên Senior Project Manager có hiệu lực từ tháng tới.)"
        },
        {
          id: 20,
          question: "What percentage is John's salary increase?",
          options: [
            "Five percent",
            "Fifteen percent",
            "Ten percent",
            "Twenty percent"
          ],
          correct: 1,
          explanation: "HR Rep nói: 'The promotion comes with a fifteen percent salary increase.' (Sự thăng chức đi kèm với mức tăng lương mười lăm phần trăm.)"
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
          question: "The new software system has been _______ to streamline our workflow and increase productivity.",
          options: [
            "Implements",
            "Implementation",
            "Implemented",
            "Implementing"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'Implemented' vì đây là quá khứ phân từ trong cấu trúc bị động 'has been + V3' (đã được triển khai). Kiến thức ngữ pháp: Thì hiện tại hoàn thành thụ động 'has been implemented'."
        },
        {
          id: 22,
          question: "_______ participated in the training workshop gained valuable skills for their professional development.",
          options: [
            "That",
            "Those who",
            "Whoever",
            "Anyone"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Those who' vì đây là đại từ quan hệ số nhiều thay thế cho danh từ người trong mệnh đề chủ ngữ. Kiến thức ngữ pháp: Đại từ quan hệ 'Those who' + động từ số nhiều."
        },
        {
          id: 23,
          question: "The marketing team has been working on the campaign _______ the project was approved last month.",
          options: [
            "whereas",
            "since",
            "although",
            "unless"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'since' vì nó chỉ mốc thời gian bắt đầu hành động với thì hiện tại hoàn thành tiếp diễn. Kiến thức ngữ pháp: 'Since' + mốc thời gian + present perfect continuous."
        },
        {
          id: 24,
          question: "All participants must complete the registration form and submit _______ identification documents.",
          options: [
            "validly",
            "valid",
            "validate",
            "validity"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'valid' vì đây là tính từ bổ nghĩa cho danh từ 'identification documents'. Kiến thức ngữ pháp: Tính từ đứng trước danh từ để mô tả (valid documents = giấy tờ hợp lệ)."
        },
        {
          id: 25,
          question: "The company's new policy emphasizes that _______ communication improves workplace productivity.",
          options: [
            "effectiveness",
            "effective",
            "effect",
            "effectively"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'effective' vì đây là tính từ bổ nghĩa cho danh từ 'communication'. Kiến thức ngữ pháp: Tính từ 'effective' (hiệu quả) đứng trước danh từ."
        },
        {
          id: 26,
          question: "Employees are encouraged to _______ their ideas during the monthly brainstorming sessions.",
          options: [
            "shared",
            "shares",
            "share",
            "sharing"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'share' vì đây là động từ nguyên thể sau 'to' trong cấu trúc 'be encouraged to + V'. Kiến thức ngữ pháp: 'to + V nguyên thể' sau động từ khuyến khích."
        },
        {
          id: 27,
          question: "_______ receiving customer feedback, the product development team made several improvements.",
          options: [
            "Unless",
            "After",
            "Despite",
            "Although"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'After' vì nó chỉ thứ tự thời gian và đi với V-ing. Kiến thức ngữ pháp: 'After + V-ing' để diễn tả hành động xảy ra sau."
        },
        {
          id: 28,
          question: "The research team is looking for candidates who can analyze data _______ and draw meaningful conclusions.",
          options: [
            "accurateness",
            "accurate",
            "accurately",
            "accuracy"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'accurately' vì đây là trạng từ bổ nghĩa cho động từ 'analyze'. Kiến thức ngữ pháp: Trạng từ 'accurately' (một cách chính xác) bổ nghĩa động từ."
        },
        {
          id: 29,
          question: "Due to the unexpected power outage, the conference has been _______ to next Tuesday.",
          options: [
            "reschedules",
            "rescheduling",
            "rescheduled",
            "reschedule"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'rescheduled' vì đây là dạng quá khứ phân từ trong thì hiện tại hoàn thành thụ động (has been + V3). Kiến thức ngữ pháp: Cấu trúc bị động 'has been rescheduled'."
        },
        {
          id: 30,
          question: "The supervisor emphasized that attention to detail and creativity are essential qualities for maintaining high _______.",
          options: [
          "standards",
          "expenses",
          "schedules",
          "locations"
          ],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'standards' vì nó chỉ 'tiêu chuẩn cao', phù hợp với ngữ cảnh chất lượng công việc. Kiến thức từ vựng: 'High standards' (tiêu chuẩn cao) là cụm từ cố định trong quản lý chất lượng."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Department Heads
From: Sarah Chen, Chief Operating Officer
Subject: Strategic Initiative for Q4 Implementation

Dear Colleagues,

I am writing to inform you about an important strategic initiative that will be (31) _______ throughout the fourth quarter. This comprehensive program aims to enhance our operational capabilities and (32) _______ our competitiveness in the market.

Our primary objective is to modernize our internal systems and streamline processes across all departments. To achieve this, we will be implementing new technology solutions that have been carefully selected to (33) _______ our current infrastructure. Each department head is responsible for (34) _______ the transition smoothly within their teams.

We understand that organizational change can be challenging, so we are committed to (35) _______ complete support and resources throughout this process. Training sessions will be conducted for all staff members to ensure they are comfortable with the new systems. We strongly encourage everyone to attend these sessions, as they will provide essential information on how to (36) _______ effectively with the new technology.

Additionally, we have established a dedicated support team to address any technical issues or concerns that may arise during the implementation phase. Please don't (37) _______ to reach out to this team if you encounter any difficulties.

As we move forward, your feedback is invaluable. We welcome suggestions on how we can further improve our processes and systems. All feedback should be submitted to the Operations Team by December 15, and we will carefully consider all suggestions for future improvements.

I am confident that this initiative will bring significant benefits to our organization and strengthen our position in the market. Thank you for your cooperation and support during this exciting time of transformation.

Best regards,

Sarah Chen
Chief Operating Officer`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "This comprehensive program aims to enhance our operational capabilities and this initiative that will be (31) _______ throughout the fourth quarter.",
          options: [
            "Postponed",
            "Implemented",
            "Initiated",
            "Discussed"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Implemented' vì ngữ cảnh 'program aims to enhance... will be implemented' (chương trình sẽ được triển khai). Kiến thức ngữ pháp: Động từ bị động 'will be implemented'."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "This comprehensive program aims to enhance our operational capabilities and (32) _______ our competitiveness in the market.",
          options: [
            "Limiting",
            "Strengthen",
            "Weakening",
            "Reduce"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Strengthen' vì đây là động từ nguyên thể sau 'and' trong cấu trúc song song (strengthen our competitiveness - tăng cường khả năng cạnh tranh). Kiến thức ngữ pháp: Cấu trúc song song động từ."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...new technology solutions that have been carefully selected to (33) _______ our current infrastructure.",
          options: [
            "Ignore",
            "Complement",
            "Replace",
            "Eliminate"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Complement' vì ngữ cảnh 'solutions to complement infrastructure' (giải pháp để bổ sung cơ sở hạ tầng). Kiến thức từ vựng: Động từ 'complement' = làm cho hoàn thiện."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "Each department head is responsible for (34) _______ the transition smoothly within their teams.",
          options: [
            "Manager",
            "Managing",
            "Managed",
            "Manage"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Managing' vì 'responsible for + V-ing' (chịu trách nhiệm về việc quản lý). Kiến thức ngữ pháp: Cấu trúc 'responsible for + N/V-ing'."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "...so we are committed to (35) _______ complete support and resources throughout this process.",
          options: [
            "Providing",
            "Provided",
            "Provide",
            "Provider"
          ],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'Providing' vì 'committed to + V-ing' (cam kết cung cấp). Kiến thức ngữ pháp: Cấu trúc 'be committed to + V-ing'."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "...on how to (36) _______ effectively with the new technology.",
          options: [
            "Works",
            "Work",
            "Working",
            "Worked"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Work' vì 'how to + V nguyên thể' (cách làm việc). Kiến thức ngữ pháp: Cấu trúc 'how to + V nguyên thể'."
        },
        {
          id: 37,
          type: "fill",
          question: "(37) - Điền từ thích hợp",
          context: "Please don't (37) _______ to reach out to this team if you encounter any difficulties.",
          options: [
            "Hesitate",
            "Hesitating",
            "Hesitates",
            "Hesitated"
          ],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'Hesitate' vì 'don't hesitate to + V nguyên thể' (đừng ngần ngại). Kiến thức ngữ pháp: Cấu trúc quen thuộc 'don't hesitate to'."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is the main goal of this strategic initiative?",
          options: [
            "To move to a new office location",
            "To modernize systems and streamline processes",
            "To reduce the staff size",
            "To reduce the company's budget"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'aims to modernize our internal systems and streamline processes' (nhằm hiện đại hóa hệ thống và hợp lý hóa quy trình). Kiến thức đọc hiểu: Xác định mục đích chính từ câu mở đầu."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - When is the deadline for submitting feedback?",
          options: [
            "November 30",
            "December 15",
            "December 1",
            "December 31"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'All feedback should be submitted to the Operations Team by December 15' (Tất cả phản hồi phải được gửi vào ngày 15 tháng 12). Kiến thức đọc hiểu: Xác định ngày hạn chót từ email."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - Who should be responsible for managing the transition in each department?",
          options: [
            "The support team",
            "Each department head",
            "The IT department",
            "The HR team"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'Each department head is responsible for managing the transition smoothly' (Mỗi trưởng bộ phận chịu trách nhiệm quản lý quá trình chuyển đổi). Kiến thức đọc hiểu: Xác định người chịu trách nhiệm từ email."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Job Posting + Application)",
      description: "10 câu hỏi - Đọc tin tuyển dụng và đơn ứng tuyển, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**JOB POSTING**

**POSITION AVAILABLE: Senior Data Analyst**

Company: TechVision Solutions

Location: New York, NY

Employment Type: Full-time

Salary: $85,000 - $105,000 per year

**About the Role:**

TechVision Solutions is seeking a highly skilled Senior Data Analyst to join our analytics team. You will be responsible for analyzing complex datasets, identifying trends, and providing actionable insights to support strategic decision-making across the organization. This role requires strong technical expertise, excellent communication skills, and the ability to work collaboratively with cross-functional teams.

**Key Responsibilities:**

1. **Develop and maintain dashboards** – Create interactive visualizations for stakeholders
2. **Conduct statistical analysis** – Analyze business data to drive decisions
3. **Collaborate with teams** – Work with IT and business teams on data requirements
4. **Present findings** – Deliver insights and recommendations to senior management
5. **Mentor junior analysts** – Guide team members on data analysis techniques

**Required Qualifications:**

Bachelor's degree in Mathematics, Statistics, Computer Science, or related field

5+ years of experience in data analysis

Proficiency in SQL, Python, and Tableau or similar visualization tools

Strong analytical and problem-solving skills

Excellent written and verbal communication skills

**Preferred Qualifications:**

Master's degree in a related field

Experience with machine learning

Knowledge of cloud-based data platforms

**To Apply:** Submit your resume, cover letter, and portfolio to careers@techvision.com

---

**To:** careers@techvision.com

**From:** m.smith@email.com

**Date:** November 8

**Subject:** Application for Senior Data Analyst Position

Dear Hiring Manager,

I am writing to express my strong interest in the Senior Data Analyst position at TechVision Solutions. With seven years of experience in data analysis and a passion for translating complex data into meaningful insights, I believe I am well-suited for this role.

In my current position at DataCorp Analytics, I have successfully led multiple projects involving large-scale data analysis, creating comprehensive dashboards using Tableau, and conducting statistical analyses that directly impacted business strategy. I am proficient in SQL, Python, and R, which exceeds the required technical skills. Additionally, I hold a Master's degree in Statistics, and I have recently completed advanced training in machine learning through a recognized online platform.

My key strengths include strong analytical capabilities, excellent communication with both technical and non-technical stakeholders, and a proven track record of mentoring junior team members. I am confident that my experience, skills, and commitment to excellence make me an ideal candidate for your team.

I have attached my resume, detailed portfolio of past projects, and a cover letter for your review. I am available for an interview at your earliest convenience and look forward to discussing how I can contribute to TechVision Solutions.

Thank you for considering my application.

Best regards,
Michael Smith
m.smith@email.com
(555) 123-4567`,
      questions: [
        {
          id: 41,
          question: "What is the minimum years of experience required for the Senior Data Analyst position?",
          options: [
            "Three years",
            "Seven years",
            "Two years",
            "Five years"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì job posting nêu '5+ years of experience in data analysis' (5+ năm kinh nghiệm phân tích dữ liệu). Kiến thức đọc hiểu: Trích dẫn yêu cầu trực tiếp từ job posting."
        },
        {
          id: 42,
          question: "Which of the following is listed as a preferred qualification?",
          options: [
            "Bachelor's degree in Mathematics",
            "Experience with machine learning",
            "Proficiency in Python",
            "Five years of data analysis experience"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Preferred Qualifications' liệt kê 'Experience with machine learning' (Kinh nghiệm với machine learning). Kiến thức đọc hiểu: Phân biệt giữa required và preferred qualifications."
        },
        {
          id: 43,
          question: "How many years of experience does Michael Smith have in data analysis?",
          options: [
            "Ten years",
            "Three years",
            "Seven years",
            "Five years"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì application nêu 'With seven years of experience in data analysis' (Với bảy năm kinh nghiệm phân tích dữ liệu). Kiến thức đọc hiểu: Xác định thông tin từ email ứng tuyển."
        },
        {
          id: 44,
          question: "What is Michael Smith's highest level of education?",
          options: [
            "Ph.D. in Data Science",
            "Master's degree in Statistics",
            "Bachelor's degree in Computer Science",
            "Bachelor's degree in Mathematics"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì application nêu 'I hold a Master's degree in Statistics' (Tôi có bằng Thạc sĩ về Thống kê). Kiến thức đọc hiểu: Trích dẫn trực tiếp từ email ứng tuyển."
        },
        {
          id: 45,
          question: "Which programming languages or tools is Michael Smith NOT proficient in?",
          options: [
            "R",
            "SQL",
            "Python",
            "Java"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì application nêu 'I am proficient in SQL, Python, and R' (Tôi thành thạo SQL, Python, và R), nhưng không đề cập Java. Kiến thức suy luận: Xác định kỹ năng không được đề cập."
        },
        {
          id: 46,
          question: "What is the salary range for this position?",
          options: [
            "$80,000 - $100,000",
            "$95,000 - $115,000",
            "$85,000 - $105,000",
            "$75,000 - $95,000"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì job posting nêu 'Salary: $85,000 - $105,000 per year' (Mức lương: $85,000 - $105,000 mỗi năm). Kiến thức đọc hiểu: Trích dẫn trực tiếp từ job posting."
        },
        {
          id: 47,
          question: "According to his application, what is one of Michael Smith's key strengths?",
          options: [
            "Sales experience",
            "Mentoring junior team members",
            "Marketing expertise",
            "Project management"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì application nêu 'My key strengths include... a proven track record of mentoring junior team members' (Mentoring các thành viên đội trẻ). Kiến thức đọc hiểu: Xác định thông tin từ application."
        },
        {
          id: 48,
          question: "What does the job posting indicate Michael Smith should do to apply?",
          options: [
            "Contact the HR manager on LinkedIn",
            "Submit resume, cover letter, and portfolio to careers@techvision.com",
            "Visit the office in person",
            "Call the company directly"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì job posting nêu 'Submit your resume, cover letter, and portfolio to careers@techvision.com' (Gửi CV, thư xin việc, và portfolio). Kiến thức đọc hiểu: Xác định hướng dẫn ứng tuyển."
        },
        {
          id: 49,
          question: "Where does Michael Smith currently work?",
          options: [
            "Data Solutions Inc.",
            "Statistics Institute",
            "DataCorp Analytics",
            "TechVision Solutions"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì application nêu 'In my current position at DataCorp Analytics' (Ở vị trí hiện tại tại DataCorp Analytics). Kiến thức đọc hiểu: Xác định nơi làm việc hiện tại từ email."
        },
        {
          id: 50,
          question: "What additional training has Michael Smith completed recently?",
          options: [
            "Statistical analysis course",
            "Advanced training in machine learning",
            "Tableau certification",
            "Advanced SQL training"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì application nêu 'I have recently completed advanced training in machine learning through a recognized online platform' (Đã hoàn thành đào tạo nâng cao về machine learning). Kiến thức đọc hiểu: Xác định thông tin training gần đây."
        }
      ]
    },
    part8: {
      title: "PART 8: Social Media Exchange",
      description: "10 câu hỏi - Đọc chuỗi trao đổi trên mạng xã hội, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `LinkedIn Message Thread - November 10

Emma (11:30): Hi Tom! I saw your recent post about the new product launch. Congratulations! I'm impressed by the innovation and market strategy you've outlined. Would you be available for coffee this week to discuss potential collaboration opportunities?

Tom (14:15): Hi Emma! Thanks so much for reaching out. I'm thrilled you're interested. Yes, I'd love to chat about this. How about Wednesday at 3 PM at Central Café? Let me know if that works for you.

Emma (16:45): Wednesday at 3 PM sounds perfect! I'll bring some preliminary ideas for our partnership proposal. Looking forward to it. See you then!

Tom (17:00): Great! I'll prepare some market analysis data. This is going to be exciting. See you Wednesday!

Emma (10:00): Hi Tom, just sending a quick reminder about our meeting today. I'm running about 15 minutes late due to traffic, but I'm on my way!

Tom (10:02): No problem at all! I'll grab us a table and order some coffee. See you soon!

Tom (15:30): Hi Emma! Thanks again for the great meeting today. Your ideas were innovative and align well with our vision. I'd like to schedule a follow-up meeting with our executive team next week. Would Friday work for you?

Emma (16:00): Absolutely! Friday works great for me. I'll prepare a detailed presentation for the executive team. Thanks for the opportunity!

Tom (16:15): Perfect! I'll send you the meeting details by end of day. Excited about what's ahead!`,
      questions: [
        {
          id: 51,
          question: "What prompted Emma to reach out to Tom?",
          options: [
            "An industry conference",
            "Tom's recent post about a product launch",
            "A mutual friend's recommendation",
            "A job opportunity"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Emma nói 'I saw your recent post about the new product launch' (Tôi thấy bài đăng gần đây của bạn về ra mắt sản phẩm). Kiến thức đọc hiểu: Xác định lý do liên hệ."
        },
        {
          id: 52,
          question: "What time was their first meeting scheduled?",
          options: [
            "10:00 AM",
            "3:30 PM",
            "3:00 PM",
            "2:15 PM"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Tom nêu 'How about Wednesday at 3 PM at Central Café?' (Thứ Tư lúc 3 giờ chiều tại Central Café?). Kiến thức đọc hiểu: Xác định thời gian cuộc gặp."
        },
        {
          id: 53,
          question: "Where did Emma and Tom plan to meet?",
          options: [
            "An online video call",
            "Emma's office",
            "Central Café",
            "Tom's office"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Tom nói 'How about Wednesday at 3 PM at Central Café?' (tại Central Café). Kiến thức đọc hiểu: Xác định địa điểm gặp mặt."
        },
        {
          id: 54,
          question: "Why was Emma late to the meeting?",
          options: [
            "She was preparing her presentation",
            "She was running late due to traffic",
            "She had another appointment",
            "She forgot about the meeting"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Emma nói 'I'm running about 15 minutes late due to traffic' (Tôi muộn khoảng 15 phút vì giao thông). Kiến thức đọc hiểu: Xác định lý do muộn."
        },
        {
          id: 55,
          question: "What did Emma plan to bring to the first meeting?",
          options: [
            "Product samples",
            "Preliminary ideas for partnership proposal",
            "A detailed presentation",
            "Market analysis data"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Emma nói 'I'll bring some preliminary ideas for our partnership proposal' (Tôi sẽ mang một số ý tưởng ban đầu cho đề xuất kỳ hạn). Kiến thức đọc hiểu: Xác định những gì Emma mang theo."
        },
        {
          id: 56,
          question: "How did Tom respond when Emma informed him she'd be late?",
          options: [
            "He asked her to meet the next day",
            "He said it was no problem and would wait",
            "He expressed frustration",
            "He said he had to reschedule"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Tom nói 'No problem at all! I'll grab us a table' (Không vấn đề gì cả! Tôi sẽ lấy cho chúng ta một bàn). Kiến thức đọc hiểu: Xác định phản ứng của Tom."
        },
        {
          id: 57,
          question: "What was Tom's feedback about Emma's ideas from the first meeting?",
          options: [
            "He was not interested in them",
            "They were innovative and aligned with his vision",
            "They needed significant changes",
            "They were not realistic"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Tom nói 'Your ideas were innovative and align well with our vision' (Các ý tưởng của bạn sáng tạo và phù hợp với tầm nhìn của chúng tôi). Kiến thức đọc hiểu: Xác định phản hồi của Tom."
        },
        {
          id: 58,
          question: "When is the follow-up meeting with the executive team scheduled?",
          options: [
            "Thursday",
            "Friday",
            "Wednesday",
            "Monday"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Tom nói 'I'd like to schedule a follow-up meeting with our executive team next week. Would Friday work for you?' (Liệu thứ Sáu có thích hợp không?). Kiến thức đọc hiểu: Xác định ngày gặp mặt tiếp theo."
        },
        {
          id: 59,
          question: "What will Emma prepare for the follow-up meeting?",
          options: [
            "Market research",
            "A detailed presentation",
            "Preliminary ideas",
            "Product samples"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Emma nói 'I'll prepare a detailed presentation for the executive team' (Tôi sẽ chuẩn bị một bài thuyết trình chi tiết cho đội lãnh đạo). Kiến thức đọc hiểu: Xác định sự chuẩn bị của Emma."
        },
        {
          id: 60,
          question: "What can be inferred about the relationship between Emma and Tom?",
          options: [
            "They are family members discussing business",
            "They are professionals exploring a potential business partnership",
            "They are old colleagues reconnecting",
            "They are long-time competitors"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì toàn bộ trao đổi liên quan đến 'collaboration opportunities' và 'partnership proposal' (cơ hội hợp tác và đề xuất kỳ hạn), cho thấy quan hệ chuyên nghiệp. Kiến thức suy luận: Xác định bản chất mối quan hệ từ nội dung cuộc trò chuyện."
        }
      ]
    }
  }
};