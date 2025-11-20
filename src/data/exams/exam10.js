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
            "For three weeks.",
            "For approximately two weeks.",
            "For one week.",
            "For one month."
          ],
          correct: 1,
          explanation: "Emma nói: 'About two weeks, I think.' (Khoảng hai tuần, tôi nghĩ vậy). Đáp án đúng là (B) 'For approximately two weeks'. Ngữ pháp: Present Progressive tense (will be gone). Collocation: 'planning a trip'. Kỹ năng nghe: Xác định khoảng thời gian từ lời thoại."
        },
        {
          id: 2,
          options: [
            "She has been saving for five years.",
            "She has been saving for three years.",
            "She just started saving.",
            "She has been saving for one year."
          ],
          correct: 1,
          explanation: "Emma nói: 'I've been saving money for three years to make this dream come true.' (Tôi đã tiết kiệm tiền trong ba năm để thực hiện ước mơ này). Đáp án đúng là (B). Ngữ pháp: Present Perfect Continuous (have been saving) chỉ hành động bắt đầu trong quá khứ kéo dài đến hiện tại. Collocation: 'save money', 'make a dream come true'. Kỹ năng nghe: Xác định thời gian cụ thể."
        },
        {
          id: 3,
          options: [
            "Vietnam, Malaysia, and Singapore.",
            "Thailand, Cambodia, and Myanmar.",
            "Vietnam, Thailand, and Cambodia.",
            "Vietnam, Thailand, and Laos."
          ],
          correct: 2,
          explanation: "Emma nói: 'I'm most interested in visiting Vietnam, Thailand, and Cambodia.' (Tôi hứng thú nhất với việc thăm Vietnam, Thailand, và Cambodia). Đáp án đúng là (C). Ngữ pháp: Present Progressive (am interested). Collocation: 'interested in visiting'. Kỹ năng nghe: Xác định các địa điểm cụ thể."
        },
        {
          id: 4,
          options: [
            "Tour groups provide free transportation.",
            "Tour groups have flexible schedules.",
            "Tour groups are too rigid and don't allow her to enjoy local culture in depth.",
            "Tour groups are too expensive."
          ],
          correct: 2,
          explanation: "Emma nói: 'Tour groups are too rigid for me – they have fixed schedules and I can't really enjoy the local culture in depth.' (Tour groups quá cứng nhắc với tôi – chúng có những lịch trình cố định và tôi không thể thực sự tận hưởng văn hóa địa phương sâu sắc). Đáp án đúng là (C). Ngữ pháp: Adjective (rigid), Relative Clauses (they have fixed schedules). Collocation: 'local culture', 'enjoy in depth'. Kỹ năng nghe: Hiểu lý do sở thích."
        },
        {
          id: 5,
          options: [
            "Accommodation costs are not important.",
            "Hostels in Southeast Asia are very affordable and offer free breakfast.",
            "Hostels don't meet international standards.",
            "Hotels are always the best choice."
          ],
          correct: 1,
          explanation: "Emma nói: 'I've read that hostels in Southeast Asia are very affordable and provide a great way to meet other travelers. Plus, many hostels offer free breakfast.' (Tôi đã đọc rằng hostels ở Đông Nam Á rất giá cả phải chăng và cung cấp cách tuyệt vời để gặp gỡ các du khách khác. Ngoài ra, nhiều hostels cung cấp bữa sáng miễn phí). Đáp án đúng là (B). Ngữ pháp: Present Perfect (have read), Present Simple (offer). Collocation: 'meet other travelers', 'free breakfast'. Kỹ năng nghe: Xác định thông tin lợi ích."
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
            "By 25%.",
            "By 15%.",
            "By 10%.",
            "By 20%."
          ],
          correct: 1,
          explanation: "Manager nói: 'Our team exceeded the target by 15%.' (Đội của chúng ta vượt quá mục tiêu 15%). Đáp án đúng là (B). Ngữ pháp: Past Simple (exceeded). Collocation: 'exceed target'. Kỹ năng nghe: Xác định con số phần trăm."
        },
        {
          id: 7,
          question: "What was the result of the digital marketing campaign?",
          options: [
            "A 50% decrease in engagement.",
            "A 40% increase in online engagement.",
            "No significant change.",
            "A 20% increase in engagement."
          ],
          correct: 1,
          explanation: "Ben nói: 'We saw a 40% increase in online engagement.' (Chúng tôi thấy tăng 40% trong lượng tương tác trực tuyến). Đáp án đúng là (B). Ngữ pháp: Past Simple (saw), Noun (increase). Collocation: 'digital campaign', 'online engagement'. Kỹ năng nghe: Xác định kết quả chiến dịch."
        },
        {
          id: 8,
          question: "Which region underperformed?",
          options: [
            "The Northeast region.",
            "The Southwest region.",
            "The Northwest region.",
            "The Southeast region."
          ],
          correct: 2,
          explanation: "Anna nói: 'However, the Northwest region underperformed compared to last quarter.' (Tuy nhiên, khu vực Tây Bắc có kết quả kém hơn so với quý trước). Đáp án đúng là (C). Ngữ pháp: Past Simple (underperformed), Adjective (underperformed). Collocation: 'underperform', 'region'. Kỹ năng nghe: Xác định vùng địa lý."
        },
        {
          id: 9,
          question: "What does Ben suggest as the reason for the Northwest region's underperformance?",
          options: [
            "Low product quality.",
            "High customer complaints.",
            "Staffing issues - the team lost experienced salespeople.",
            "Poor marketing support."
          ],
          correct: 2,
          explanation: "Ben nói: 'I think the problem might be staffing. The Northwest team lost two experienced salespeople recently.' (Tôi nghĩ vấn đề có thể là nhân sự. Đội Tây Bắc đã mất hai nhân viên bán hàng giàu kinh nghiệm gần đây). Đáp án đúng là (C). Ngữ pháp: Past Simple (lost), Adjective (experienced). Collocation: 'staffing issues', 'experienced salespeople'. Kỹ năng nghe: Xác định nguyên nhân vấn đề."
        },
        {
          id: 10,
          question: "When will Anna have the recruitment plan ready?",
          options: [
            "By the end of the month.",
            "By next week.",
            "By next Friday.",
            "By tomorrow."
          ],
          correct: 2,
          explanation: "Anna nói: 'I can have the recruitment plan prepared by next Friday.' (Tôi có thể chuẩn bị kế hoạch tuyển dụng vào thứ Sáu tuần tới). Đáp án đúng là (C). Ngữ pháp: Future Simple (can have prepared), Passive Voice (be prepared). Collocation: 'recruitment plan'. Kỹ năng nghe: Xác định thời hạn."
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
            "Next Sunday.",
            "Next Saturday.",
            "The following weekend.",
            "Next Friday."
          ],
          correct: 1,
          explanation: "System nói: 'We are pleased to announce our annual company picnic scheduled for next Saturday at Central Park.' (Chúng tôi rất vui thông báo buổi dã ngoại hàng năm được lên lịch vào thứ Bảy tới tại Central Park). Đáp án đúng là (B). Ngữ pháp: Present Passive (be scheduled), Adjective (annual). Collocation: 'company picnic', 'central park'. Kỹ năng nghe: Xác định ngày tháng."
        },
        {
          id: 12,
          question: "What is the cost of attending the picnic?",
          options: [
            "$50 per employee.",
            "No cost.",
            "$25 per family.",
            "$10 per person."
          ],
          correct: 1,
          explanation: "System nói: 'There is no cost to attend.' (Không có chi phí tham gia). Đáp án đúng là (B). Ngữ pháp: Existential (There is), Negative (no). Collocation: 'cost to attend'. Kỹ năng nghe: Xác định chi phí."
        },
        {
          id: 13,
          question: "What activities are mentioned?",
          options: [
            "Hiking, cycling, and kayaking.",
            "Volleyball, badminton, and a barbecue.",
            "Soccer, basketball, and swimming.",
            "Tennis, golf, and swimming."
          ],
          correct: 1,
          explanation: "System nói: 'We have arranged various activities including volleyball, badminton, and a barbecue.' (Chúng tôi đã sắp xếp các hoạt động khác nhau bao gồm bóng chuyền, cầu lông, và nướng thịt). Đáp án đúng là (B). Ngữ pháp: Present Perfect (have arranged), Including (liên từ). Collocation: 'various activities'. Kỹ năng nghe: Xác định hoạt động."
        },
        {
          id: 14,
          question: "When is the registration deadline?",
          options: [
            "Thursday.",
            "Wednesday.",
            "Friday.",
            "Tuesday."
          ],
          correct: 1,
          explanation: "System nói: 'Please register by Wednesday to help us plan for food quantities.' (Vui lòng đăng ký vào Thứ Tư để giúp chúng tôi lên kế hoạch về số lượng thực phẩm). Đáp án đúng là (B). Ngữ pháp: Imperative (register), Preposition (by). Collocation: 'registration deadline'. Kỹ năng nghe: Xác định thời hạn đăng ký."
        },
        {
          id: 15,
          question: "What will happen if it rains?",
          options: [
            "The event will be shortened.",
            "The event will be rescheduled to the following weekend.",
            "The event will move indoors.",
            "The event will be cancelled."
          ],
          correct: 1,
          explanation: "System nói: 'In case of rain, we will reschedule the event to the following weekend.' (Trong trường hợp mưa, chúng tôi sẽ lên lịch lại sự kiện vào cuối tuần sau). Đáp án đúng là (B). Ngữ pháp: Conditional (in case of), Future Simple (will reschedule), Noun (rain). Collocation: 'in case of rain', 'reschedule event'. Kỹ năng nghe: Xác định kế hoạch dự phòng."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Student 1: Hi Doctor Chen, I wanted to discuss my recent exam grade. I'm not happy with the result.\nDoctor Chen: Of course, let's sit down. What specifically are you concerned about?\nStudent 1: I studied hard, but I think I didn't understand some of the questions. Also, the material covered in the last chapter was confusing.\nDoctor Chen: I see. Which topics were most difficult for you?\nStudent 1: The section on statistical analysis was really challenging. I struggled with the formulas and how to apply them.\nDoctor Chen: That's understandable. Many students find that section challenging. I recommend reviewing the textbook chapter again and watching the online tutorial videos I posted.\nStudent 1: Will that be enough? I'm worried about the final exam.\nDoctor Chen: It should help significantly. Additionally, I can arrange tutoring sessions with a teaching assistant. We have slots available on Mondays and Thursdays after class.\nStudent 1: That would be great! Can I sign up today?\nDoctor Chen: Absolutely. I'll give you the contact information. Work hard, and I'm confident you'll improve. Don't hesitate to reach out if you have questions.",
      questions: [
        {
          id: 16,
          question: "What is the student's main concern?",
          options: [
            "The classroom is too noisy.",
            "The exam was too long.",
            "The student is not happy with the exam grade.",
            "The teacher is unfair in grading."
          ],
          correct: 2,
          explanation: "Student 1 nói: 'Hi Doctor Chen, I wanted to discuss my recent exam grade. I'm not happy with the result.' (Xin chào tiến sĩ Chen, tôi muốn thảo luận về điểm thi gần đây. Tôi không hài lòng với kết quả). Đáp án đúng là (C). Ngữ pháp: Present Perfect (have got), Negative (not happy). Collocation: 'exam grade', 'not happy'. Kỹ năng nghe: Xác định mối quan tâm chính."
        },
        {
          id: 17,
          question: "Which topic did the student find most difficult?",
          options: [
            "Chemistry formulas.",
            "Statistical analysis.",
            "Historical events.",
            "General mathematics."
          ],
          correct: 1,
          explanation: "Student 1 nói: 'The section on statistical analysis was really challenging. I struggled with the formulas and how to apply them.' (Phần về phân tích thống kê thực sự đầy thách thức. Tôi gặp khó khăn với các công thức và cách áp dụng chúng). Đáp án đúng là (B). Ngữ pháp: Past Simple (was), Adjective (challenging). Collocation: 'statistical analysis', 'struggle with formulas'. Kỹ năng nghe: Xác định chủ đề khó."
        },
        {
          id: 18,
          question: "What does Doctor Chen recommend first?",
          options: [
            "Skipping the final exam.",
            "Reviewing the textbook chapter and watching online tutorial videos.",
            "Changing to a different class.",
            "Taking the exam again immediately."
          ],
          correct: 1,
          explanation: "Doctor Chen nói: 'I recommend reviewing the textbook chapter again and watching the online tutorial videos I posted.' (Tôi khuyến nghị xem lại chương sách giáo khoa và xem các video hướng dẫn trực tuyến tôi đã đăng). Đáp án đúng là (B). Ngữ pháp: Present Continuous (recommend + V-ing), Present Perfect (I posted). Collocation: 'review textbook', 'tutorial videos'. Kỹ năng nghe: Xác định gợi ý đầu tiên."
        },
        {
          id: 19,
          question: "When are tutoring sessions available?",
          options: [
            "Wednesday and Saturday evenings.",
            "Monday and Thursday after class.",
            "Tuesday and Friday afternoons.",
            "Monday and Wednesday mornings."
          ],
          correct: 1,
          explanation: "Doctor Chen nói: 'We have slots available on Mondays and Thursdays after class.' (Chúng tôi có các slot trống vào thứ Hai và thứ Năm sau giờ học). Đáp án đúng là (B). Ngữ pháp: Present Simple (have), Preposition (on, after). Collocation: 'tutoring sessions', 'after class'. Kỹ năng nghe: Xác định thời gian khả dụng."
        },
        {
          id: 20,
          question: "What does Doctor Chen offer to do?",
          options: [
            "Excuse the student from the final exam.",
            "Provide contact information for tutoring sessions.",
            "Allow the student to retake the exam.",
            "Give the student a higher grade immediately."
          ],
          correct: 1,
          explanation: "Doctor Chen nói: 'I'll give you the contact information.' (Tôi sẽ cung cấp cho bạn thông tin liên lạc) liên quan đến buổi dạy kèm. Đáp án đúng là (B). Ngữ pháp: Future Simple (will give). Collocation: 'contact information', 'tutoring sessions'. Kỹ năng nghe: Xác định lời đề nghị."
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
          options: ["slightly", "barely", "remarkably", "somewhat"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'remarkably' (một cách đáng chú ý) vì nó diễn tả mức độ cao của tính năng thân thiện. Ngữ pháp: Adverb (remarkably) bổ nghĩa adjective (user-friendly); Present Perfect (has proven). Collocation: 'user-friendly'. Từ vựng: 'barely' (hầu như không), 'slightly' (nhẹ nhàng), 'somewhat' (phần nào) không thể hiện sự tích cực như 'remarkably'."
        },
        {
          id: 22,
          question: "Among the candidates interviewed yesterday, Lisa demonstrated the most __________ leadership qualities.",
          options: ["mediocre", "doubtful", "concerning", "promising"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'promising' (hứa hẹn) vì nó chỉ phẩm chất tích cực. Ngữ pháp: Adjective (promising) bổ nghĩa noun (qualities); Superlative (most). Collocation: 'leadership qualities'. Từ vựng: 'doubtful' (nghi ngờ), 'mediocre' (trung bình), 'concerning' (đáng lo ngại) không phù hợp."
        },
        {
          id: 23,
          question: "The company has been investing in renewable energy __________ it joined the sustainability initiative.",
          options: ["despite", "unless", "while", "since"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'since' (vì, từ khi) chỉ thời điểm bắt đầu. Ngữ pháp: Present Perfect Continuous (has been investing); Time Conjunction (since + Past Simple); Preposition (since). Collocation: 'invest in renewable energy', 'sustainability initiative'. Từ vựng: 'while' (trong khi), 'unless' (trừ khi), 'despite' (mặc dù) không phù hợp."
        },
        {
          id: 24,
          question: "The company's commitment to ethical practices has earned it numerous __________ from international organizations.",
          options: ["complaints", "controversies", "criticisms", "recognitions"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'recognitions' (sự công nhận) vì đi cùng với 'commitment to ethical practices' (cam kết thực hành đạo đức). Ngữ pháp: Present Perfect (has earned); Noun (recognitions). Collocation: 'earn recognition'. Từ vựng: 'criticisms' (chỉ trích), 'controversies' (tranh cãi), 'complaints' (phàn nàn) mang tính tiêu cực."
        },
        {
          id: 25,
          question: "Health and safety protocols are __________ enforced across all department to ensure employee well-being.",
          options: ["informally", "loosely", "carelessly", "strictly"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'strictly' (nghiêm ngặt) vì các quy định an toàn cần được tuân thủ chặt chẽ. Ngữ pháp: Present Simple Passive (are enforced); Adverb (strictly). Collocation: 'enforce protocols', 'employee well-being'. Từ vựng: 'carelessly' (bất cẩn), 'loosely' (lỏng lẻo), 'informally' (không chính thức) không phù hợp."
        },
        {
          id: 26,
          question: "The new office space will __________ state-of-the-art technology and modern furniture.",
          options: ["featuring", "features", "featured", "feature"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'feature' vì đây là động từ nguyên thể sau 'will' (tương lai đơn). Ngữ pháp: Future Simple (will + V); Verb (feature). Collocation: 'feature technology', 'office space'. Từ vựng: 'features' (ngôi thứ ba), 'featured' (quá khứ), 'featuring' (V-ing) không phù hợp."
        },
        {
          id: 27,
          question: "The project must be completed __________ the end of Q3 to meet our strategic objectives.",
          options: ["through", "until", "within", "by"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'by' (vào lúc) chỉ hạn chót thời gian. Ngữ pháp: Passive Voice (must be completed); Preposition (by + thời điểm). Collocation: 'meet objectives', 'strategic objectives'. Từ vựng: 'until' (cho đến), 'through' (xuyên suốt), 'within' (trong vòng) không thể hiện hạn chót."
        },
        {
          id: 28,
          question: "Team members must communicate __________ and transparently to avoid misunderstandings.",
          options: ["occasionally", "poorly", "reluctantly", "effectively"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'effectively' (có hiệu quả) vì nó kết hợp với 'transparently' (một cách minh bạch). Ngữ pháp: Adverb (effectively, transparently) bổ nghĩa verb (communicate). Collocation: 'communicate transparently', 'avoid misunderstandings'. Từ vựng: 'poorly' (kém), 'reluctantly' (miễn cưỡng), 'occasionally' (thỉnh thoảng) không phù hợp."
        },
        {
          id: 29,
          question: "Due to budget constraints, several non-essential positions have been __________.",
          options: ["eliminate", "eliminating", "eliminates", "eliminated"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'eliminated' (quá khứ phân từ) trong thì Present Perfect Passive (have been + V3). Ngữ pháp: Present Perfect Passive (have been eliminated); Verb form. Collocation: 'positions eliminated'. Từ vựng: 'eliminating' (V-ing), 'eliminates' (hiện tại), 'eliminate' (nguyên thể) không phù hợp."
        },
        {
          id: 30,
          question: "The HR department is responsible for maintaining a positive and inclusive workplace __________.",
          options: ["development", "agreement", "environment", "environment"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'environment' (môi trường) vì diễn tả bối cảnh làm việc. Ngữ pháp: Noun (environment); Be responsible for + N + Adjective. Collocation: 'workplace environment', 'positive and inclusive'. Từ vựng: 'development' (phát triển), 'agreement' (thỏa thuận) không phù hợp."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D). Câu 31-36: Điền từ thích hợp. Câu 37-40: Đọc hiểu.",
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
          options: ["postpone", "initiate", "abandon", "limit"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'initiate' (bắt đầu) vì công ty quyết định triển khai hoạt động sớm hơn. Ngữ pháp: Verb (initiate) sau 'decided to' (decided + to + V); Modal auxiliary. Collocation: 'initiate activities'. Từ vựng: 'postpone' (hoãn lại), 'abandon' (bỏ qua), 'limit' (giới hạn) mang ý nghĩa ngược lại."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "each department must (32) the revised schedule...",
          options: ["reject", "follow", "delay", "ignore"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'follow' (tuân theo). Ngữ pháp: Verb (follow) sau modal 'must' (must + V); Subject-Verb Agreement (each department). Collocation: 'follow schedule'. Từ vựng: 'reject' (từ chối), 'delay' (trì hoãn), 'ignore' (bỏ qua) không phù hợp."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...deadlines are essential (33) we are working under a compressed timeline.",
          options: ["although", "because", "whether", "unless"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'because' (vì). Ngữ pháp: Conjunction (because) giải thích lý do; Present Continuous (are working). Collocation: 'essential because'. Từ vựng: 'although' (mặc dù), 'whether' (liệu), 'unless' (trừ khi) không phù hợp."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "internal workshops, (34) will help streamline communication...",
          options: ["where", "that", "what", "who"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'that' (mà) — Relative Pronoun cho sự vật (workshops). Ngữ pháp: Relative Clause (that + will help); Future Simple (will help). Collocation: 'workshops that help'. Từ vựng: 'where' (nơi), 'what' (cái gì), 'who' (ai) không phù hợp."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "track their expenses (35) following the standard reporting guidelines.",
          options: ["rarely", "properly", "closely", "approximately"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'properly' (đúng cách). Ngữ pháp: Adverb (properly) bổ nghĩa verb (track); Gerund (following). Collocation: 'track expenses properly'. Từ vựng: 'rarely' (hiếm khi), 'closely' (chặt chẽ), 'approximately' (xấp xỉ) không phù hợp."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Please do not (36) to contact me...",
          options: ["attempt", "hesitate", "refuse", "forget"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'hesitate' (do dự) — cụm cố định 'do not hesitate to + V'. Ngữ pháp: Imperative (do not + V); Infinitive (to contact). Collocation: 'do not hesitate to contact'. Từ vựng: 'attempt' (cố gắng), 'refuse' (từ chối), 'forget' (quên) không phù hợp."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - Why did the company adjust the campaign timeline?",
          options: [
            "Because a new product was postponed.",
            "Because customer behavior changed.",
            "Because team members requested more time.",
            "Because budget approval was delayed."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu rõ 'Due to recent changes in customer behavior' (Do những thay đổi gần đây trong hành vi khách hàng). Ngữ pháp: Passive Voice (changes in customer behavior). Kỹ năng đọc hiểu: Xác định lý do."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is the purpose of the internal workshops?",
          options: [
            "To recruit temporary staff.",
            "To improve communication and collaboration.",
            "To evaluate individual performance.",
            "To train new employees."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'workshops... will help streamline communication and improve cross-team collaboration' (sẽ giúp hợp lý hóa giao tiếp và cải thiện hợp tác). Ngữ pháp: Infinitive (to improve), Noun (collaboration). Kỹ năng đọc hiểu: Xác định mục đích."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - What must the design team deliver by October 25?",
          options: [
            "Workshop schedules",
            "Visual assets",
            "Email templates",
            "Marketing budget reports"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'design team should deliver the visual assets no later than October 25' (đội thiết kế phải giao các tài sản hình ảnh không muộn hơn ngày 25 tháng 10). Ngữ pháp: Modal (should deliver); Noun (visual assets). Kỹ năng đọc hiểu: Xác định đặc vụ."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - What should employees do before submitting expense reports?",
          options: [
            "Submit them directly to the CEO",
            "Follow the standard reporting guidelines",
            "Convert files into PDF format",
            "Request approval from the finance director"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email yêu cầu 'track their expenses properly following the standard reporting guidelines' (theo dõi chi phí của họ đúng cách theo quy tắc báo cáo tiêu chuẩn). Ngữ pháp: Gerund (following); Noun (guidelines). Kỹ năng đọc hiểu: Xác định hướng dẫn."
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
            "Over 15,000",
            "Over 8,000",
            "Over 10,000",
            "Over 5,000"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì quảng cáo nêu 'Our institute has trained over 10,000 professionals since our establishment in 2008' (Viện của chúng tôi đã đào tạo hơn 10.000 chuyên gia). Ngữ pháp: Present Perfect (have trained). Collocation: 'trained professionals'. Kỹ năng đọc hiểu: Trích dẫn con số."
        },
        {
          id: 42,
          question: "What is the success rate for first-time test takers in certification programs?",
          options: [
            "90%",
            "85%",
            "80%",
            "95%"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì quảng cáo nêu 'Our success rate is 95% for first-time test takers' (Tỷ lệ thành công của chúng tôi là 95%). Ngữ pháp: Present Simple (is). Collocation: 'success rate', 'first-time test takers'. Kỹ năng đọc hiểu: Xác định con số phần trăm."
        },
        {
          id: 43,
          question: "Which language programs are NOT mentioned in the advertisement?",
          options: [
            "All of the above are mentioned",
            "Spanish and German",
            "French and Italian",
            "English and Mandarin"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì quảng cáo chỉ đề cập English, Mandarin, Spanish, German; French và Italian không được đề cập. Ngữ pháp: Adjective (specialized). Collocation: 'business courses'. Kỹ năng đọc hiểu: Xác định thông tin bị thiếu."
        },
        {
          id: 44,
          question: "What is Mark's current English proficiency level?",
          options: [
            "Fluent",
            "Intermediate",
            "Advanced",
            "Beginner"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Mark nói 'My current English proficiency is intermediate – I can hold basic conversations' (Trình độ tiếng Anh hiện tại của tôi là trung cấp). Ngữ pháp: Adjective (intermediate). Collocation: 'English proficiency', 'basic conversations'. Kỹ năng đọc hiểu: Xác định mức độ."
        },
        {
          id: 45,
          question: "How many hours per week can Mark dedicate to language training?",
          options: [
            "15 hours",
            "8 hours",
            "10 hours",
            "5 hours"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Mark nói 'I can dedicate approximately 10 hours per week' (Tôi có thể dành khoảng 10 giờ mỗi tuần). Ngữ pháp: Modal (can + V). Collocation: 'dedicate hours', 'language training'. Kỹ năng đọc hiểu: Xác định thời gian."
        },
        {
          id: 46,
          question: "What TOEIC score is Mark aiming to achieve?",
          options: [
            "800 or higher",
            "750 or higher",
            "700 or higher",
            "850 or higher"
          ],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì Mark nói 'achieve a score of 850 or higher' (đạt điểm 850 trở lên). Ngữ pháp: Infinitive (to achieve). Collocation: 'TOEIC score', 'achieve score'. Kỹ năng đọc hiểu: Xác định mục tiêu."
        },
        {
          id: 47,
          question: "What is Mark's primary motivation for seeking language training?",
          options: [
            "To relocate to another country",
            "His job requires communication with international colleagues and clients",
            "To impress his colleagues",
            "Personal interest in languages"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Mark nói 'I frequently communicate with international colleagues and clients' (Tôi thường xuyên giao tiếp với các đồng nghiệp quốc tế). Ngữ pháp: Present Simple (communicate). Collocation: 'international colleagues', 'professional communication'. Kỹ năng đọc hiểu: Suy luận động cơ."
        },
        {
          id: 48,
          question: "Which sectors does Mark's company specialize in?",
          options: [
            "Healthcare and education",
            "Technology and finance",
            "Tourism and hospitality",
            "Retail and manufacturing"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Mark nói 'my company specializes in these areas' referring to 'technology and finance sectors' (công ty tôi chuyên về lĩnh vực công nghệ và tài chính). Ngữ pháp: Present Simple (specializes). Collocation: 'specializes in'. Kỹ năng đọc hiểu: Xác định ngành công nghiệp."
        },
        {
          id: 49,
          question: "What promotion-related incentive is mentioned in the advertisement?",
          options: [
            "Free weekend immersion program",
            "20% discount on first course",
            "Free certification exam fee",
            "10% discount for first-time students"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'Enroll today and receive a 20% discount on your first course' (Đăng ký ngay hôm nay và nhận 20% giảm giá). Ngữ pháp: Imperative (Enroll); Verb (receive). Collocation: 'discount on course'. Kỹ năng đọc hiểu: Xác định ưu đãi."
        },
        {
          id: 50,
          question: "What is Mark's position at his company?",
          options: [
            "Executive Director",
            "Middle Manager",
            "Senior Manager",
            "Junior Manager"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Mark ký tên 'Middle Manager, Technology Division' (Trưởng phòng Công nghệ, Bộ phận Công nghệ). Ngữ pháp: Noun (position). Collocation: 'Middle Manager'. Kỹ năng đọc hiểu: Xác định vị trí công việc."
        }
      ]
    },
    part8: {
      title: "PART 8: Professional Message Thread",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn công việc, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Manager (09:30): Good morning, team. I've just received feedback from the client regarding the prototype. Overall positive, but they requested some modifications to the user interface. Can everyone review the attached document by noon today?

Designer (09:45): Thanks for sharing. I can see the requested changes. Most are feasible, but the color scheme change might affect our brand consistency. Should I consult with the branding team before proceeding?

Manager (10:00): Good thinking. Yes, please coordinate with them. We need to ensure all changes align with our brand guidelines.

Developer 1 (10:15): I've reviewed the feedback. The backend modifications are straightforward. I estimate 2-3 days to implement all the changes.

Project Coordinator (10:30): That timeline works well. The client expects delivery by next Friday. This gives us a comfortable buffer. I'll update the project timeline and notify all stakeholders.

Developer 2 (11:00): Quick question - do we need to re-test everything after the modifications, or just the changed features?

Manager (11:15): Thorough testing is required. After any significant changes, we need full regression testing to ensure nothing else breaks. This should be factored into the timeline.

Developer 1 (11:30): Understood. Adding 2 days for testing. So total will be 4-5 days from start to completion.

Project Coordinator (11:45): Got it. I'll revise the schedule and create a detailed project plan. Everyone will have their copies by end of business today. Please confirm receipt.

Designer (12:00): I'll have the branding team's input by tomorrow morning. Planning to start redesign work by afternoon.

Manager (12:15): Excellent. Let's reconvene tomorrow at 10 a.m. to review progress and address any issues. This project is on track!`,
      questions: [
        {
          id: 51,
          question: "What feedback did the client provide about the prototype?",
          options: [
            "They asked for a complete redesign.",
            "Overall positive, but requested modifications to the user interface.",
            "They loved it without any changes needed.",
            "They rejected the entire prototype."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Manager nói 'Overall positive, but they requested some modifications' (Tích cực nói chung, nhưng họ yêu cầu sửa đổi). Ngữ pháp: Passive Voice (requested modifications). Collocation: 'client feedback'. Kỹ năng đọc hiểu: Xác định nội dung phản hồi."
        },
        {
          id: 52,
          question: "What concern does the Designer raise about the modifications?",
          options: [
            "The technical team cannot do it.",
            "The color scheme change might affect brand consistency.",
            "It will take too long to implement.",
            "The changes are too expensive."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Designer nói 'the color scheme change might affect our brand consistency' (thay đổi bảng màu có thể ảnh hưởng). Ngữ pháp: Modal (might affect). Collocation: 'brand consistency'. Kỹ năng đọc hiểu: Xác định mối lo ngại."
        },
        {
          id: 53,
          question: "How long does Developer 1 estimate for implementing the changes?",
          options: [
            "3-4 days",
            "2-3 days",
            "4-5 days",
            "1-2 days"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Developer 1 nói 'I estimate 2-3 days to implement' (Tôi ước tính 2-3 ngày). Ngữ pháp: Verb (estimate); Infinitive (to implement). Collocation: 'estimate time'. Kỹ năng đọc hiểu: Xác định thời gian ước tính."
        },
        {
          id: 54,
          question: "What is the client's expected delivery date?",
          options: [
            "Two weeks from now",
            "Next week",
            "Next Friday",
            "This Friday"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Project Coordinator nói 'The client expects delivery by next Friday' (Khách hàng dự kiến giao vào thứ Sáu tuần tới). Ngữ pháp: Present Simple (expects). Collocation: 'expected delivery'. Kỹ năng đọc hiểu: Xác định thời hạn."
        },
        {
          id: 55,
          question: "What type of testing is required after modifications?",
          options: [
            "No testing is needed.",
            "Full regression testing.",
            "Only testing of changed features.",
            "Unit testing only."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Manager nói 'we need full regression testing' (chúng ta cần kiểm tra hồi quy đầy đủ). Ngữ pháp: Modal (need); Noun (regression testing). Collocation: 'regression testing'. Kỹ năng đọc hiểu: Xác định loại kiểm tra."
        },
        {
          id: 56,
          question: "What is the revised total timeline including testing?",
          options: [
            "5-6 days",
            "3-4 days",
            "4-5 days",
            "2-3 days"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Developer 1 nói 'So total will be 4-5 days' (Vậy tổng cộng sẽ là 4-5 ngày). Ngữ pháp: Future Simple (will be). Collocation: 'total timeline'. Kỹ năng đọc hiểu: Xác định thời gian tổng cộng."
        },
        {
          id: 57,
          question: "When does the Designer plan to start the redesign work?",
          options: [
            "Next week",
            "Tomorrow morning",
            "Tomorrow afternoon",
            "Immediately"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Designer nói 'Planning to start redesign work by afternoon' (Kế hoạch bắt đầu vào buổi chiều). Ngữ pháp: Present Continuous (Planning); Preposition (by). Collocation: 'redesign work'. Kỹ năng đọc hiểu: Xác định thời gian bắt đầu."
        },
        {
          id: 58,
          question: "What is the Project Coordinator responsible for?",
          options: [
            "Testing the software.",
            "Updating the project timeline and notifying stakeholders.",
            "Writing the code.",
            "Designing the user interface."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Project Coordinator nói 'I'll update the project timeline and notify all stakeholders' (Tôi sẽ cập nhật lịch trình và thông báo). Ngữ pháp: Future Simple (will update, will notify). Collocation: 'update timeline', 'notify stakeholders'. Kỹ năng đọc hiểu: Xác định trách nhiệm."
        },
        {
          id: 59,
          question: "When is the team scheduled to reconvene?",
          options: [
            "Next week",
            "Tomorrow at 9 a.m.",
            "Tomorrow at 10 a.m.",
            "Today at 2 p.m."
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Manager nói 'Let's reconvene tomorrow at 10 a.m.' (Hãy gặp lại vào ngày mai lúc 10 giờ). Ngữ pháp: Imperative (let's); Preposition (at). Collocation: 'reconvene', 'review progress'. Kỹ năng đọc hiểu: Xác định thời gian họp."
        },
        {
          id: 60,
          question: "What is the Manager's overall assessment of the project?",
          options: [
            "The project will be late.",
            "The project is on track.",
            "The project is behind schedule.",
            "The project is not feasible."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Manager nói 'This project is on track!' (Dự án này đang đúng hướng!). Ngữ pháp: Present Simple (is). Collocation: 'on track'. Kỹ năng đọc hiểu: Xác định đánh giá tổng thể."
        }
      ]
    }
  }
};