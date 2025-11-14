export const EXAM10_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 10 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài về kế hoạch du lịch.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Tom và Emma về kế hoạch du lịch. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Tom: Hey Emma, I heard you're planning a trip next month. Where are you thinking of going?\nEmma: Yes! I'm considering Southeast Asia. I've been saving money for three years to make this dream come true. I'm most interested in visiting Vietnam, Thailand, and Cambodia.\nTom: That sounds amazing! How long will you be gone?\nEmma: About two weeks, I think. But I'm a little worried about the budget. Flights are quite expensive this season, and I'm trying to find the best deals online.\nTom: Have you thought about traveling with a tour group? That might be cheaper than going solo.\nEmma: Actually, I prefer traveling alone. I want complete freedom to explore at my own pace. Tour groups are too rigid for me – they have fixed schedules and I can't really enjoy the local culture in depth.\nTom: I understand. What about accommodation? Hotels can be pricey.\nEmma: True, but I've read that hostels in Southeast Asia are very affordable and provide a great way to meet other travelers. Plus, many hostels offer free breakfast, which saves money.",
      questions: [
        {
          id: 1,
          options: [
            "For about one week.",
            "For approximately two weeks.",
            "For three weeks.",
            "For one month."
          ],
          correct: 1,
          explanation: "Emma nói: 'About two weeks, I think.' (Khoảng hai tuần, tôi nghĩ vậy.)"
        },
        {
          id: 2,
          options: [
            "She has been saving for one year.",
            "She has been saving for three years.",
            "She has been saving for five years.",
            "She just started saving."
          ],
          correct: 1,
          explanation: "Emma nói: 'I've been saving money for three years to make this dream come true.' (Tôi đã tiết kiệm tiền trong ba năm để thực hiện ước mơ này.)"
        },
        {
          id: 3,
          options: [
            "Vietnam, Thailand, and Laos.",
            "Thailand, Cambodia, and Myanmar.",
            "Vietnam, Thailand, and Cambodia.",
            "Vietnam, Malaysia, and Singapore."
          ],
          correct: 2,
          explanation: "Emma nói: 'I'm most interested in visiting Vietnam, Thailand, and Cambodia.' (Tôi hứng thú nhất với việc thăm Vietnam, Thailand, và Cambodia.)"
        },
        {
          id: 4,
          options: [
            "Tour groups are too expensive.",
            "Tour groups have flexible schedules.",
            "Tour groups are too rigid and don't allow her to enjoy local culture in depth.",
            "Tour groups provide free transportation."
          ],
          correct: 2,
          explanation: "Emma nói: 'Tour groups are too rigid for me – they have fixed schedules and I can't really enjoy the local culture in depth.' (Tour groups quá cứng nhắc với tôi – chúng có những lịch trình cố định và tôi không thể thực sự tận hưởng văn hóa địa phương sâu sắc.)"
        },
        {
          id: 5,
          options: [
            "Hotels are always the best choice.",
            "Hostels in Southeast Asia are very affordable and offer free breakfast.",
            "Hostels don't meet international standards.",
            "Accommodation costs are not important."
          ],
          correct: 1,
          explanation: "Emma nói: 'I've read that hostels in Southeast Asia are very affordable and provide a great way to meet other travelers. Plus, many hostels offer free breakfast.' (Tôi đã đọc rằng hostels ở Đông Nam Á rất giá cả phải chăng và cung cấp cách tuyệt vời để gặp gỡ các du khách khác. Ngoài ra, nhiều hostels cung cấp bữa sáng miễn phí.)"
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người tại phòng họp công ty. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At a business meeting.\nManager: Good morning, everyone. Today we're reviewing the quarterly sales report. Our team exceeded the target by 15%. Ben, can you share the details from the marketing department?\nBen: Absolutely. The digital campaign we launched last month was very successful. We saw a 40% increase in online engagement.\nManager: Excellent! Anna, what about the sales numbers?\nAnna: We had strong sales across all regions. However, the Northwest region underperformed compared to last quarter. We need to investigate why.\nBen: I think the problem might be staffing. The Northwest team lost two experienced salespeople recently.\nManager: That's a valid point. We should prioritize hiring and training new staff there. Anna, when can you have a report ready?\nAnna: I can have the recruitment plan prepared by next Friday. I'll also schedule meetings with the Northwest team to understand their challenges better.\nBen: Great idea. We should also increase marketing support in that region.\nManager: Agreed. Let's reconvene next week to review the action plan. Thank you both for your dedication.",
      questions: [
        {
          id: 6,
          question: "By how much did the team exceed the sales target?",
          options: [
            "By 20%.",
            "By 15%.",
            "By 25%.",
            "By 10%."
          ],
          correct: 1,
          explanation: "Manager nói: 'Our team exceeded the target by 15%.' (Đội của chúng ta vượt quá mục tiêu 15%.)"
        },
        {
          id: 7,
          question: "What was the result of the digital marketing campaign?",
          options: [
            "A 20% increase in engagement.",
            "A 40% increase in online engagement.",
            "A 50% decrease in engagement.",
            "No significant change."
          ],
          correct: 1,
          explanation: "Ben nói: 'We saw a 40% increase in online engagement.' (Chúng tôi thấy tăng 40% trong lượng tương tác trực tuyến.)"
        },
        {
          id: 8,
          question: "Which region underperformed?",
          options: [
            "The Southeast region.",
            "The Southwest region.",
            "The Northwest region.",
            "The Northeast region."
          ],
          correct: 2,
          explanation: "Anna nói: 'However, the Northwest region underperformed compared to last quarter.' (Tuy nhiên, khu vực Tây Bắc có kết quả kém hơn so với quý trước.)"
        },
        {
          id: 9,
          question: "What does Ben suggest as the reason for the Northwest region's underperformance?",
          options: [
            "Poor marketing support.",
            "High customer complaints.",
            "Staffing issues - the team lost experienced salespeople.",
            "Low product quality."
          ],
          correct: 2,
          explanation: "Ben nói: 'I think the problem might be staffing. The Northwest team lost two experienced salespeople recently.' (Tôi nghĩ vấn đề có thể là nhân sự. Đội Tây Bắc đã mất hai nhân viên bán hàng giàu kinh nghiệm gần đây.)"
        },
        {
          id: 10,
          question: "When will Anna have the recruitment plan ready?",
          options: [
            "By tomorrow.",
            "By next week.",
            "By next Friday.",
            "By the end of the month."
          ],
          correct: 2,
          explanation: "Anna nói: 'I can have the recruitment plan prepared by next Friday.' (Tôi có thể chuẩn bị kế hoạch tuyển dụng vào thứ Sáu tuần tới.)"
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: A company announcement.\nSystem: Attention, all employees. We are pleased to announce our annual company picnic scheduled for next Saturday at Central Park. The event will run from 10 a.m. to 5 p.m. We have arranged various activities including volleyball, badminton, and a barbecue. Bring your family and friends! There is no cost to attend. Please register by Wednesday to help us plan for food quantities. In case of rain, we will reschedule the event to the following weekend. Parking is available at the north entrance, and we strongly recommend carpooling to reduce traffic congestion. A detailed agenda and parking information will be sent via email tomorrow. We look forward to a wonderful day of team building and fun. For more information, contact the HR department.",
      questions: [
        {
          id: 11,
          question: "When is the company picnic scheduled?",
          options: [
            "Next Friday.",
            "Next Saturday.",
            "Next Sunday.",
            "The following weekend."
          ],
          correct: 1,
          explanation: "System nói: 'We are pleased to announce our annual company picnic scheduled for next Saturday at Central Park.' (Chúng tôi rất vui thông báo buổi dã ngoại hàng năm được lên lịch vào thứ Bảy tới tại Central Park.)"
        },
        {
          id: 12,
          question: "What is the cost of attending the picnic?",
          options: [
            "$10 per person.",
            "$25 per family.",
            "No cost.",
            "$50 per employee."
          ],
          correct: 2,
          explanation: "System nói: 'There is no cost to attend.' (Không có chi phí tham gia.)"
        },
        {
          id: 13,
          question: "What activities are mentioned?",
          options: [
            "Soccer, basketball, and swimming.",
            "Tennis, golf, and swimming.",
            "Volleyball, badminton, and a barbecue.",
            "Hiking, cycling, and kayaking."
          ],
          correct: 2,
          explanation: "System nói: 'We have arranged various activities including volleyball, badminton, and a barbecue.' (Chúng tôi đã sắp xếp các hoạt động khác nhau bao gồm bóng chuyền, cầu lông, và nướng thịt.)"
        },
        {
          id: 14,
          question: "When is the registration deadline?",
          options: [
            "Tuesday.",
            "Wednesday.",
            "Thursday.",
            "Friday."
          ],
          correct: 1,
          explanation: "System nói: 'Please register by Wednesday to help us plan for food quantities.' (Vui lòng đăng ký vào Thứ Tư để giúp chúng tôi lên kế hoạch về số lượng thực phẩm.)"
        },
        {
          id: 15,
          question: "What will happen if it rains?",
          options: [
            "The event will be cancelled.",
            "The event will move indoors.",
            "The event will be rescheduled to the following weekend.",
            "The event will be shortened."
          ],
          correct: 2,
          explanation: "System nói: 'In case of rain, we will reschedule the event to the following weekend.' (Trong trường hợp mưa, chúng tôi sẽ lên lịch lại sự kiện vào cuối tuần sau.)"
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Student 1: Hi Dr. Chen, I wanted to discuss my recent exam grade. I'm not happy with the result.\nDr. Chen: Of course, let's sit down. What specifically are you concerned about?\nStudent 1: I studied hard, but I think I didn't understand some of the questions. Also, the material covered in the last chapter was confusing.\nDr. Chen: I see. Which topics were most difficult for you?\nStudent 1: The section on statistical analysis was really challenging. I struggled with the formulas and how to apply them.\nDr. Chen: That's understandable. Many students find that section challenging. I recommend reviewing the textbook chapter again and watching the online tutorial videos I posted.\nStudent 1: Will that be enough? I'm worried about the final exam.\nDr. Chen: It should help significantly. Additionally, I can arrange tutoring sessions with a teaching assistant. We have slots available on Mondays and Thursdays after class.\nStudent 1: That would be great! Can I sign up today?\nDr. Chen: Absolutely. I'll give you the contact information. Work hard, and I'm confident you'll improve. Don't hesitate to reach out if you have questions.",
      questions: [
        {
          id: 16,
          question: "What is the student's main concern?",
          options: [
            "The teacher is unfair in grading.",
            "The exam was too long.",
            "The student is not happy with the exam grade.",
            "The classroom is too noisy."
          ],
          correct: 2,
          explanation: "Student 1 nói: 'I wanted to discuss my recent exam grade. I'm not happy with the result.' (Tôi muốn thảo luận về điểm thi gần đây. Tôi không hài lòng với kết quả.)"
        },
        {
          id: 17,
          question: "Which topic did the student find most difficult?",
          options: [
            "General mathematics.",
            "Statistical analysis.",
            "Chemistry formulas.",
            "Historical events."
          ],
          correct: 1,
          explanation: "Student 1 nói: 'The section on statistical analysis was really challenging. I struggled with the formulas and how to apply them.' (Phần về phân tích thống kê thực sự đầy thách thức. Tôi gặp khó khăn với các công thức và cách áp dụng chúng.)"
        },
        {
          id: 18,
          question: "What does Dr. Chen recommend first?",
          options: [
            "Taking the exam again immediately.",
            "Changing to a different class.",
            "Reviewing the textbook chapter and watching online tutorial videos.",
            "Skipping the final exam."
          ],
          correct: 2,
          explanation: "Dr. Chen nói: 'I recommend reviewing the textbook chapter again and watching the online tutorial videos I posted.' (Tôi khuyến nghị xem lại chương sách giáo khoa và xem các video hướng dẫn trực tuyến tôi đã đăng.)"
        },
        {
          id: 19,
          question: "When are tutoring sessions available?",
          options: [
            "Monday and Wednesday mornings.",
            "Tuesday and Friday afternoons.",
            "Monday and Thursday after class.",
            "Wednesday and Saturday evenings."
          ],
          correct: 2,
          explanation: "Dr. Chen nói: 'We have slots available on Mondays and Thursdays after class.' (Chúng tôi có các slot trống vào thứ Hai và thứ Năm sau giờ học.)"
        },
        {
          id: 20,
          question: "What does Dr. Chen offer to do?",
          options: [
            "Give the student a higher grade immediately.",
            "Allow the student to retake the exam.",
            "Provide contact information for tutoring sessions.",
            "Excuse the student from the final exam."
          ],
          correct: 2,
          explanation: "Dr. Chen nói: 'I'll give you the contact information.' (Tôi sẽ cung cấp cho bạn thông tin liên lạc.) liên quan đến việc đăng ký buổi dạy kèm."
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
          question: "The new software system has proven to be __________ user-friendly, reducing training time significantly.",
          options: ["remarkably", "barely", "slightly", "somewhat"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'remarkably' (một cách đáng chú ý) vì nó diễn tả mức độ cao của tính năng thân thiện. Kiến thức ngữ pháp: Trạng từ bổ nghĩa tính từ; 'barely' (hầu như không), 'slightly' (nhẹ nhàng), 'somewhat' (phần nào) không thể hiện sự tích cực như 'remarkably'."
        },
        {
          id: 22,
          question: "Among the candidates interviewed yesterday, Lisa demonstrated the most __________ leadership qualities.",
          options: ["promising", "doubtful", "mediocre", "concerning"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'promising' (hứa hẹn) vì nó chỉ phẩm chất tích cực. Kiến thức từ vựng: Tính từ mô tả phẩm chất lãnh đạo; 'doubtful' (nghi ngờ), 'mediocre' (trung bình), 'concerning' (đáng lo ngại) không phù hợp."
        },
        {
          id: 23,
          question: "The company has been investing in renewable energy __________ it joined the sustainability initiative.",
          options: ["while", "unless", "since", "despite"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'since' (vì, từ khi) chỉ thời điểm bắt đầu. Kiến thức ngữ pháp: Liên từ thời gian 'since + thời điểm cụ thể' kết hợp thì hiện tại hoàn thành; 'while' (trong khi), 'unless' (trừ khi), 'despite' (mặc dù) không phù hợp."
        },
        {
          id: 24,
          question: "The company's commitment to ethical practices has earned it numerous __________ from international organizations.",
          options: ["criticisms", "controversies", "recognitions", "complaints"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'recognitions' (sự công nhận) vì đi cùng với 'commitment to ethical practices' (cam kết thực hành đạo đức). Kiến thức từ vựng: Danh từ chỉ thành tích tích cực; 'criticisms' (chỉ trích), 'controversies' (tranh cãi), 'complaints' (phàn nàn) mang tính tiêu cực."
        },
        {
          id: 25,
          question: "Health and safety protocols are __________ enforced across all department to ensure employee well-being.",
          options: ["carelessly", "loosely", "strictly", "informally"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'strictly' (nghiêm ngặt) vì các quy định an toàn cần được tuân thủ chặt chẽ. Kiến thức ngữ pháp: Trạng từ bổ nghĩa động từ 'enforced'; 'carelessly' (bất cẩn), 'loosely' (lỏng lẻo), 'informally' (không chính thức) không phù hợp."
        },
        {
          id: 26,
          question: "The new office space will __________ state-of-the-art technology and modern furniture.",
          options: ["feature", "features", "featured", "featuring"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'feature' vì đây là động từ nguyên thể sau 'will' (tương lai đơn). Kiến thức ngữ pháp: Cấu trúc 'will + V nguyên thể'; 'features' (ngôi thứ ba), 'featured' (quá khứ), 'featuring' (V-ing) không phù hợp."
        },
        {
          id: 27,
          question: "The project must be completed __________ the end of Q3 to meet our strategic objectives.",
          options: ["until", "by", "through", "within"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'by' (vào lúc) chỉ hạn chót thời gian. Kiến thức ngữ pháp: Giới từ chỉ thời gian 'by + thời điểm cụ thể'; 'until' (cho đến), 'through' (xuyên suốt), 'within' (trong vòng) không thể hiện hạn chót chính xác."
        },
        {
          id: 28,
          question: "Team members must communicate __________ and transparently to avoid misunderstandings.",
          options: ["poorly", "effectively", "reluctantly", "occasionally"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'effectively' (có hiệu quả) vì nó kết hợp với 'transparently' (một cách minh bạch). Kiến thức từ vựng: Trạng từ bổ nghĩa động từ 'communicate'; 'poorly' (kém), 'reluctantly' (miễn cưỡng), 'occasionally' (thỉnh thoảng) không phù hợp."
        },
        {
          id: 29,
          question: "Due to budget constraints, several non-essential positions have been __________.",
          options: ["eliminated", "eliminating", "eliminates", "eliminate"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'eliminated' (quá khứ phân từ) trong thì hiện tại hoàn thành thụ động 'have been + V3'. Kiến thức ngữ pháp: Cấu trúc bị động 'have been eliminated'; 'eliminating' (V-ing), 'eliminates' (hiện tại), 'eliminate' (nguyên thể) không phù hợp."
        },
        {
          id: 30,
          question: "The HR department is responsible for maintaining a positive and inclusive workplace __________.",
          options: ["environment", "development", "agreement", "agreement"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'environment' (môi trường) vì diễn tả bối cảnh làm việc. Kiến thức từ vựng: Danh từ chỉ môi trường làm việc; 'development' (phát triển), 'agreement' (thỏa thuận) không phù hợp với ngữ cảnh."
        }
      ]
    },
  part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: All Marketing Staff
From: Sarah Johnson, Marketing Manager
Subject: Update on Q4 Campaign Timeline and Task Coordination

Dear Team,

I want to provide an important update regarding our fourth-quarter marketing campaign. Due to recent changes in customer behavior, our leadership team has decided to (31) our promotional activities earlier than initially planned. This adjustment allows us to better position our brand for the peak shopping period.

To ensure that everything proceeds smoothly, each department must (32) the revised schedule attached to this email. The social media team is expected to finalize the content calendar by October 20, while the design team should deliver the visual assets no later than October 25. These deadlines are essential (33) we are working under a compressed timeline.

Additionally, we will be conducting a series of short internal workshops, (34) will help streamline communication and improve cross-team collaboration. More details will be shared in the upcoming meeting.

All team members must also remember to track their expenses (35) following the standard reporting guidelines. Any deviation from the procedures may result in delays in reimbursement.

I appreciate your flexibility and dedication during this busy period. The adjustments we are making now will significantly enhance campaign performance. Please do not (36) to contact me if you have any concerns or suggestions.

Best regards,
Sarah Johnson
Marketing Manager
Global Marketing Solutions`,
  questions: [
    {
      id: 31,
      type: "fill",
      question: "(31) - Điền từ thích hợp",
      context: "...decided to (31) our promotional activities earlier...",
      options: ["initiate", "postpone", "limit", "abandon"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'initiate' (bắt đầu) vì công ty quyết định triển khai hoạt động sớm hơn. Các lựa chọn khác mang nghĩa ngược lại."
    },
    {
      id: 32,
      type: "fill",
      question: "(32) - Điền từ thích hợp",
      context: "each department must (32) the revised schedule...",
      options: ["ignore", "follow", "reject", "delay"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'follow' (tuân theo). Ngữ cảnh yêu cầu các bộ phận tuân thủ lịch trình cập nhật."
    },
    {
      id: 33,
      type: "fill",
      question: "(33) - Điền từ thích hợp",
      context: "...deadlines are essential (33) we are working under a compressed timeline.",
      options: ["because", "unless", "although", "whether"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'because' giải thích lý do vì sao deadline quan trọng."
    },
    {
      id: 34,
      type: "fill",
      question: "(34) - Điền từ thích hợp",
      context: "internal workshops, (34) will help streamline communication...",
      options: ["that", "who", "where", "what"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'that' — đại từ quan hệ cho sự vật (workshops)."
    },
    {
      id: 35,
      type: "fill",
      question: "(35) - Điền từ thích hợp",
      context: "track their expenses (35) following the standard reporting guidelines.",
      options: ["properly", "rarely", "approximately", "closely"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'properly' (đúng cách) phù hợp với bối cảnh quản lý chi phí."
    },
    {
      id: 36,
      type: "fill",
      question: "(36) - Điền từ thích hợp",
      context: "Please do not (36) to contact me...",
      options: ["forget", "hesitate", "attempt", "refuse"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'hesitate' — cụm cố định 'do not hesitate to...'"
    },

    // ------ COMPREHENSION ------
    {
      id: 37,
      type: "comprehension",
      question: "(37) - Why did the company adjust the campaign timeline?",
      options: [
        "Because budget approval was delayed.",
        "Because customer behavior changed.",
        "Because team members requested more time.",
        "Because a new product was postponed."
      ],
      correct: 1,
      explanation: "Email ghi rằng do 'recent changes in customer behavior'."
    },
    {
      id: 38,
      type: "comprehension",
      question: "(38) - What is the purpose of the internal workshops?",
      options: [
        "To train new employees.",
        "To evaluate individual performance.",
        "To improve communication and collaboration.",
        "To recruit temporary staff."
      ],
      correct: 2,
      explanation: "Email nêu rõ workshops được tổ chức để cải thiện giao tiếp và hợp tác."
    },
    {
      id: 39,
      type: "comprehension",
      question: "(39) - What must the design team deliver by October 25?",
      options: [
        "Marketing budget reports",
        "Visual assets",
        "Workshop schedules",
        "Email templates"
      ],
      correct: 1,
      explanation: "Email: 'design team should deliver the visual assets no later than October 25'."
    },
    {
      id: 40,
      type: "comprehension",
      question: "(40) - What should employees do before submitting expense reports?",
      options: [
        "Request approval from the finance director",
        "Convert files into PDF format",
        "Follow the standard reporting guidelines",
        "Submit them directly to the CEO"
      ],
      correct: 2,
      explanation: "Email yêu cầu tất cả chi phí được báo cáo theo đúng quy trình tiêu chuẩn."
    }
  ]
},

    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**Premium Language Training Institute Advertisement**

Unlock Your Language Potential with Expert Instructors

Our comprehensive language training programs are designed to help professionals achieve fluency in multiple languages. We offer customized courses tailored to your specific needs and proficiency levels.

**Programs We Offer:**
1. **Business Language Courses** – Specialized training for corporate professionals. We provide intensive courses in English, Mandarin, Spanish, and German, focusing on business terminology, negotiation skills, and cross-cultural communication.

2. **Executive Coaching** – One-on-one sessions with certified language coaches who have extensive experience working with senior management. Flexible scheduling ensures minimal disruption to your busy schedule.

3. **Language Certification Preparation** – We prepare students for internationally recognized certifications including TOEFL, IELTS, TOEIC, and Cambridge exams. Our success rate is 95% for first-time test takers.

4. **Cultural Immersion Programs** – Combine language learning with cultural experience. We offer immersion weekends and international study trips to enhance your learning journey.

Enroll today and receive a 20% discount on your first course. Our institute has trained over 10,000 professionals since our establishment in 2008. Contact us at info@languagetrain.com or call 1-800-LANGUAGE for a free consultation and assessment.

---

**Email Message**

**To:** info@languagetrain.com
**From:** mark.chen@businesscorp.com
**Date:** September 18
**Subject:** Inquiry About Business Language Training Program

Dear Language Training Institute,

I am writing to inquire about your Business Language Courses, specifically the English and Mandarin programs. As a middle manager at a multinational corporation, I frequently communicate with international colleagues and clients. I believe your training would significantly improve my professional communication skills.

I am particularly interested in learning about the curriculum structure and duration of the courses. Additionally, I would like to know if your institute offers customized programs tailored to the specific terminology used in the technology and finance sectors, as my company specializes in these areas.

My current English proficiency is intermediate – I can hold basic conversations but struggle with technical vocabulary and presentation skills. For Mandarin, I am a complete beginner. My schedule is quite demanding, but I can dedicate approximately 10 hours per week to language training. Would your Executive Coaching program accommodate these time constraints?

Furthermore, I am interested in preparing for the TOEIC certification, as it is required for my upcoming promotion. Could you provide information about your certification preparation program and the expected timeline to achieve a score of 850 or higher?

I would appreciate receiving your course brochure and pricing information. I am also eager to know if you currently offer any promotional discounts or package deals for employees from large corporations. Please feel free to contact me at your earliest convenience at the phone number or email address provided below.

Thank you for your time and consideration.

Best regards,
Mark Chen
Middle Manager, Technology Division
Business Corporation Inc.
mark.chen@businesscorp.com
(888) 555-0123`,
      questions: [
        {
          id: 41,
          question: "How many professionals has the institute trained since its establishment?",
          options: [
            "Over 5,000",
            "Over 8,000",
            "Over 10,000",
            "Over 15,000"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì quảng cáo nêu 'Our institute has trained over 10,000 professionals since our establishment in 2008' (Viện của chúng tôi đã đào tạo hơn 10.000 chuyên gia kể từ khi thành lập năm 2008)."
        },
        {
          id: 42,
          question: "What is the success rate for first-time test takers in certification programs?",
          options: [
            "80%",
            "85%",
            "90%",
            "95%"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì quảng cáo nêu 'Our success rate is 95% for first-time test takers' (Tỷ lệ thành công của chúng tôi là 95% cho những người làm bài lần đầu)."
        },
        {
          id: 43,
          question: "Which language programs are NOT mentioned in the advertisement?",
          options: [
            "English and Mandarin",
            "Spanish and German",
            "French and Italian",
            "All of the above are mentioned"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì quảng cáo chỉ đề cập đến English, Mandarin, Spanish, và German; French và Italian không được đề cập."
        },
        {
          id: 44,
          question: "What is Mark's current English proficiency level?",
          options: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Fluent"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Mark nói 'My current English proficiency is intermediate – I can hold basic conversations but struggle with technical vocabulary' (Trình độ tiếng Anh hiện tại của tôi là trung cấp – tôi có thể nói chuyện cơ bản nhưng gặp khó khăn với từ vựng kỹ thuật)."
        },
        {
          id: 45,
          question: "How many hours per week can Mark dedicate to language training?",
          options: [
            "5 hours",
            "8 hours",
            "10 hours",
            "15 hours"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Mark nói 'I can dedicate approximately 10 hours per week to language training' (Tôi có thể dành khoảng 10 giờ mỗi tuần cho đào tạo ngôn ngữ)."
        },
        {
          id: 46,
          question: "What TOEIC score is Mark aiming to achieve?",
          options: [
            "700 or higher",
            "750 or higher",
            "800 or higher",
            "850 or higher"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì Mark nói 'achieve a score of 850 or higher' (đạt điểm 850 trở lên)."
        },
        {
          id: 47,
          question: "What is Mark's primary motivation for seeking language training?",
          options: [
            "Personal interest in languages",
            "To impress his colleagues",
            "His job requires communication with international colleagues and clients",
            "To relocate to another country"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Mark nói 'I frequently communicate with international colleagues and clients. I believe your training would significantly improve my professional communication skills' (Tôi thường xuyên giao tiếp với các đồng nghiệp và khách hàng quốc tế)."
        },
        {
          id: 48,
          question: "Which sectors does Mark's company specialize in?",
          options: [
            "Retail and manufacturing",
            "Tourism and hospitality",
            "Technology and finance",
            "Healthcare and education"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Mark nói 'my company specializes in these areas' (công ty của tôi chuyên về các lĩnh vực này) referring to technology and finance sectors."
        },
        {
          id: 49,
          question: "What promotion-related incentive is mentioned in the advertisement?",
          options: [
            "10% discount for first-time students",
            "20% discount on first course",
            "Free certification exam fee",
            "Free weekend immersion program"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'Enroll today and receive a 20% discount on your first course' (Đăng ký ngay hôm nay và nhận 20% giảm giá khóa học đầu tiên)."
        },
        {
          id: 50,
          question: "What is Mark's position at his company?",
          options: [
            "Senior Manager",
            "Middle Manager",
            "Junior Manager",
            "Executive Director"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Mark ký tên 'Middle Manager, Technology Division' (Trưởng phòng Kỹ thuật, Bộ phận Công nghệ)."
        }
      ]
    },
    part8: {
      title: "PART 8: Professional Message Thread",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn công việc, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Manager (09:30): Good morning, team. I've just received feedback from the client regarding the prototype. Overall positive, but they requested some modifications to the user interface. Can everyone review the attached document by noon today?\n\nDesigner (09:45): Thanks for sharing. I can see the requested changes. Most are feasible, but the color scheme change might affect our brand consistency. Should I consult with the branding team before proceeding?\n\nManager (10:00): Good thinking. Yes, please coordinate with them. We need to ensure all changes align with our brand guidelines.\n\nDeveloper 1 (10:15): I've reviewed the feedback. The backend modifications are straightforward. I estimate 2-3 days to implement all the changes.\n\nProject Coordinator (10:30): That timeline works well. The client expects delivery by next Friday. This gives us a comfortable buffer. I'll update the project timeline and notify all stakeholders.\n\nDeveloper 2 (11:00): Quick question - do we need to re-test everything after the modifications, or just the changed features?\n\nManager (11:15): Thorough testing is required. After any significant changes, we need full regression testing to ensure nothing else breaks. This should be factored into the timeline.\n\nDeveloper 1 (11:30): Understood. Adding 2 days for testing. So total will be 4-5 days from start to completion.\n\nProject Coordinator (11:45): Got it. I'll revise the schedule and create a detailed project plan. Everyone will have their copies by end of business today. Please confirm receipt.\n\nDesigner (12:00): I'll have the branding team's input by tomorrow morning. Planning to start redesign work by afternoon.\n\nManager (12:15): Excellent. Let's reconvene tomorrow at 10 a.m. to review progress and address any issues. This project is on track!`,
      questions: [
        {
          id: 51,
          question: "What feedback did the client provide about the prototype?",
          options: [
            "They rejected the entire prototype.",
            "Overall positive, but requested modifications to the user interface.",
            "They loved it without any changes needed.",
            "They asked for a complete redesign."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Manager nói 'Overall positive, but they requested some modifications to the user interface' (Tích cực nói chung, nhưng họ yêu cầu một số sửa đổi giao diện người dùng)."
        },
        {
          id: 52,
          question: "What concern does the Designer raise about the modifications?",
          options: [
            "The changes are too expensive.",
            "The color scheme change might affect brand consistency.",
            "It will take too long to implement.",
            "The technical team cannot do it."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Designer nói 'The color scheme change might affect our brand consistency' (Thay đổi bảng màu có thể ảnh hưởng đến tính nhất quán của thương hiệu chúng tôi)."
        },
        {
          id: 53,
          question: "How long does Developer 1 estimate for implementing the changes?",
          options: [
            "1-2 days",
            "2-3 days",
            "3-4 days",
            "4-5 days"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Developer 1 nói 'I estimate 2-3 days to implement all the changes' (Tôi ước tính 2-3 ngày để triển khai tất cả các thay đổi)."
        },
        {
          id: 54,
          question: "What is the client's expected delivery date?",
          options: [
            "This Friday",
            "Next week",
            "Next Friday",
            "Two weeks from now"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Project Coordinator nói 'The client expects delivery by next Friday' (Khách hàng dự kiến giao hàng vào thứ Sáu tuần tới)."
        },
        {
          id: 55,
          question: "What type of testing is required after modifications?",
          options: [
            "Only testing of changed features.",
            "Unit testing only.",
            "Full regression testing.",
            "No testing is needed."
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Manager nói 'Thorough testing is required. After any significant changes, we need full regression testing' (Cần kiểm tra kỹ lưỡng. Sau bất kỳ thay đổi đáng kể nào, chúng ta cần kiểm tra hồi quy đầy đủ)."
        },
        {
          id: 56,
          question: "What is the revised total timeline including testing?",
          options: [
            "2-3 days",
            "3-4 days",
            "4-5 days",
            "5-6 days"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Developer 1 nói 'Adding 2 days for testing. So total will be 4-5 days' (Thêm 2 ngày để kiểm tra. Vậy tổng cộng sẽ là 4-5 ngày)."
        },
        {
          id: 57,
          question: "When does the Designer plan to start the redesign work?",
          options: [
            "Immediately",
            "Tomorrow morning",
            "Tomorrow afternoon",
            "Next week"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Designer nói 'Planning to start redesign work by afternoon' (Kế hoạch bắt đầu công việc thiết kế lại vào buổi chiều)."
        },
        {
          id: 58,
          question: "What is the Project Coordinator responsible for?",
          options: [
            "Designing the user interface.",
            "Writing the code.",
            "Updating the project timeline and notifying stakeholders.",
            "Testing the software."
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Project Coordinator nói 'I'll update the project timeline and notify all stakeholders' và 'I'll revise the schedule and create a detailed project plan' (Cập nhật lịch trình dự án và thông báo cho tất cả các bên liên quan; Sửa đổi lịch trình và tạo kế hoạch dự án chi tiết)."
        },
        {
          id: 59,
          question: "When is the team scheduled to reconvene?",
          options: [
            "Today at 2 p.m.",
            "Tomorrow at 9 a.m.",
            "Tomorrow at 10 a.m.",
            "Next week"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Manager nói 'Let's reconvene tomorrow at 10 a.m.' (Hãy gặp lại vào ngày mai lúc 10 giờ sáng)."
        },
        {
          id: 60,
          question: "What is the Manager's overall assessment of the project?",
          options: [
            "The project is behind schedule.",
            "The project is on track.",
            "The project will be late.",
            "The project is not feasible."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Manager nói 'This project is on track!' (Dự án này đang đúng hướng!)."
        }
      ]
    }
  }
};