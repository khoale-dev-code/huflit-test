// examData.js - Mở Rộng EXAM3_DATA Với Part 1: 1 Hội Thoại Chung Cho 5 Câu (Chủ Đề Giáo Dục & Sức Khỏe)
export const EXAM3_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 3 (Chủ Đề Giáo Dục & Sức Khỏe)",
  description: "Bộ đề thi mở rộng với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Nhấn mạnh ngữ cảnh học thuật và y tế để nâng cao kỹ năng thực tiễn. Part 1: 1 hội thoại dài giữa giáo sư và sinh viên để luyện nghe chi tiết.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi (theo yêu cầu)
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Professor A (Giáo sư) và Student B (Sinh viên - vận động viên đang nghiên cứu). Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại học thuật HUFLIT).",
  type: "listening",
  script: "Professor A: Come in, take a seat. So, how's your essay coming along?\nStudent B: It's mostly done, but I'm really struggling with the conclusion. I can't seem to wrap up the main ideas properly.\nProfessor A: Hmm, okay. Try to focus on key points from the lecture to summarize your arguments. That should help. Now, before we switch topics, you mentioned you were at the clinic earlier this week. What did the doctor say? Any allergies?\nStudent B: No, none that I know of. The doctor mostly asked about my routine. I told her I exercise daily. She said that was good and that it really supports recovery.\nProfessor A: That's great to hear! Staying healthy helps with everything. Also, I saw you in the library yesterday. Were you having any luck finding research articles?\nStudent B: I did, but I still need a few more, specifically on mental health and its impact on academic performance.\nProfessor A: Ah, yes. For that, you should definitely check the psychology section on the third floor. They have some new journals there. One last thing about your schedule—you have that big qualifying exam coming up, right? Are you ready?\nStudent B: I'm feeling incredibly nervous, Professor, but I've studied hard.\nProfessor A: I know you have. Just make sure you review stress management techniques this weekend. Being calm is just as important as being prepared.\nStudent B: Noted. Thanks for the advice. And actually, since starting the new study schedule—which is like a strict diet plan—I'm feeling better already! More focused.\nProfessor A: Wonderful! Just continue for full benefits, and you'll be set for the exam.",
  questions: [
    {
      id: 1,
      question: "What is the student struggling with?",
      options: [
        "(A) The introduction.",
        "(B) The conclusion.",
        "(C) The references.",
        "(D) The title."
      ],
      correct: 1,
      explanation: "Student B: '...I'm really struggling with the conclusion.' (Sinh viên: '...Tôi đang gặp khó khăn với phần kết luận.') - Luyện nghe chi tiết về vấn đề học thuật trong hội thoại. Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'am struggling' (đang gặp khó khăn) để diễn tả tình trạng đang xảy ra; 'with + noun' (với + danh từ) chỉ đối tượng khó khăn; 'really' (thực sự) làm trạng từ nhấn mạnh mức độ."
    },
    {
      id: 2,
      question: "What does the student do daily?",
      options: [
        "(A) Eat fast food.",
        "(B) Exercise.",
        "(C) Smoke.",
        "(D) Drink alcohol."
      ],
      correct: 1,
      explanation: "Student B: 'I told her I exercise daily.' (Sinh viên: 'Tôi nói với cô ấy tôi tập thể dục hàng ngày.') - Luyện nghe thói quen sức khỏe hàng ngày. Kiến thức ngữ pháp: Thì hiện tại đơn 'exercise' (tập thể dục) để diễn tả thói quen lặp lại; 'daily' (hàng ngày) là trạng từ tần suất đặt cuối câu; thì quá khứ đơn 'told' (nói) trong mệnh đề tường thuật gián tiếp."
    },
    {
      id: 3,
      question: "What topic is the researcher seeking?",
      options: [
        "(A) Physical fitness.",
        "(B) Mental health.",
        "(C) Nutrition.",
        "(D) Travel."
      ],
      correct: 1,
      explanation: "Student B: '...specifically on mental health and its impact on academic performance.' (Sinh viên: '...cụ thể về sức khỏe tinh thần và tác động đến hiệu suất học tập.') - Luyện nghe chủ đề nghiên cứu học thuật. Kiến thức ngữ pháp: Giới từ 'on + noun' (về + danh từ) chỉ chủ đề; 'and its impact' (và tác động của nó) với đại từ sở hữu 'its' (của nó) nối hai danh từ song song; 'specifically' (cụ thể) làm trạng từ giới hạn phạm vi."
    },
    {
      id: 4,
      question: "What advice does the professor give?",
      options: [
        "(A) Skip studying.",
        "(B) Review stress management techniques.",
        "(C) Rest more.",
        "(D) Eat less."
      ],
      correct: 1,
      explanation: "Professor A: 'Just make sure you review stress management techniques this weekend.' (Giáo sư: 'Hãy đảm bảo ôn lại kỹ thuật quản lý căng thẳng cuối tuần này.') - Luyện nghe lời khuyên học thuật và sức khỏe. Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'make sure + you + V' (hãy đảm bảo + bạn + động từ) để đưa lời khuyên; thì tương lai ngụ ý với 'this weekend' (cuối tuần này); danh từ ghép 'stress management techniques' (kỹ thuật quản lý căng thẳng)."
    },
    {
      id: 5,
      question: "How does the student feel after starting the new study schedule?",
      options: [
        "(A) Worse.",
        "(B) The same.",
        "(C) Better.",
        "(D) Tired."
      ],
      correct: 2,
      explanation: "Student B: '...I'm feeling better already! More focused.' (Sinh viên: '...Tôi cảm thấy tốt hơn rồi! Tập trung hơn.') - Luyện nghe cảm xúc và tiến bộ cá nhân. Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'am feeling' (đang cảm thấy) để diễn tả trạng thái hiện tại; 'better' (tốt hơn) là so sánh hơn của 'good'; 'already' (đã rồi) nhấn mạnh kết quả nhanh chóng; 'more focused' (tập trung hơn) là so sánh hơn với 'more + adj'."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa nhiều người. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Professor: Class, today's topic is wellness programs.\nStudent 1: How many sessions per week?\nProfessor: Two, focusing on yoga and nutrition.\nStudent 2: Any cost?\nProfessor: Free for enrolled students.\nStudent 1: Great, sign me up.\nStudent 2: Me too, but I prefer evening slots.",
  questions: [
    { 
      id: 6, 
      question: "How many sessions per week?", 
      options: ["(A) One", "(B) Two", "(C) Three", "(D) Four"], 
      correct: 1,
      explanation: "Professor: 'Two, focusing on yoga and nutrition.' (Giáo sư: 'Hai buổi, tập trung vào yoga và dinh dưỡng.') - Luyện nghe số lượng và chủ đề chương trình. Kiến thức ngữ pháp: Số đếm 'two' (hai) làm chủ ngữ số ít nhưng diễn tả số lượng; thì hiện tại đơn 'focusing' (tập trung) là phân từ hiện tại bổ nghĩa cho 'two' (hai buổi tập trung vào...); 'on + noun' (vào + danh từ) chỉ trọng tâm."
    },
    { 
      id: 7, 
      question: "What is the cost for students?", 
      options: ["(A) $50", "(B) Free", "(C) $20", "(D) Variable"], 
      correct: 1,
      explanation: "Professor: 'Free for enrolled students.' (Giáo sư: 'Miễn phí cho sinh viên đăng ký.') - Luyện nghe chi phí và điều kiện. Kiến thức ngữ pháp: Tính từ 'free' (miễn phí) làm vị ngữ; giới từ 'for + noun' (cho + danh từ) chỉ đối tượng hưởng lợi; thì hiện tại đơn 'enrolled' (đăng ký) là phân từ quá khứ bổ nghĩa cho 'students' (sinh viên đã đăng ký)."
    },
    { 
      id: 8, 
      question: "What topics are covered?", 
      options: ["(A) Math and science", "(B) Yoga and nutrition", "(C) History and art", "(D) Sports only"], 
      correct: 1,
      explanation: "Professor: 'Two, focusing on yoga and nutrition.' (Giáo sư: 'Hai buổi, tập trung vào yoga và dinh dưỡng.') - Luyện nghe nội dung chương trình. Kiến thức ngữ pháp: Danh từ ghép 'yoga and nutrition' (yoga và dinh dưỡng) nối bằng 'and' (và) để liệt kê; 'focusing on' (tập trung vào) là cụm động từ chỉ trọng tâm; thì hiện tại phân từ 'focusing' bổ nghĩa cho chủ đề."
    },
    { 
      id: 9, 
      question: "What does Student 2 prefer?", 
      options: ["(A) Morning slots", "(B) Evening slots", "(C) Weekends", "(D) Online only"], 
      correct: 1,
      explanation: "Student 2: 'Me too, but I prefer evening slots.' (Sinh viên 2: 'Tôi cũng vậy, nhưng tôi thích buổi tối.') - Luyện nghe sở thích cá nhân. Kiến thức ngữ pháp: Động từ 'prefer' (thích) + danh từ (evening slots = khung giờ tối); 'me too' (tôi cũng vậy) là cụm biểu đạt sự đồng tình; 'but' (nhưng) nối mệnh đề tương phản để diễn tả sở thích khác biệt."
    },
    { 
      id: 10, 
      question: "Who is leading the discussion?", 
      options: ["(A) Student 1", "(B) Professor", "(C) Student 2", "(D) Nurse"], 
      correct: 1,
      explanation: "Professor: 'Class, today's topic is wellness programs.' (Giáo sư: 'Lớp, chủ đề hôm nay là chương trình sức khỏe.') - Luyện nghe vai trò người dẫn dắt. Kiến thức ngữ pháp: Thì hiện tại đơn 'is' (là) để diễn tả thực tế chung; 'today's topic' (chủ đề hôm nay) với sở hữu cách 'today's' chỉ thời gian cụ thể; lời mở đầu 'Class' (lớp) ngụ ý vai trò giảng viên."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Professor: Good morning, students. This health seminar is essential for your curriculum. We've incorporated mindfulness practices since the fall term to combat academic stress. If you miss the submission deadline for your wellness journal, it will impact your grade – aim for weekly entries. Last cohort, Jamie was a standout student in group exercises; her consistency paid off. Moreover, the campus gym provides balanced options: cardio machines, weight training, and yoga mats – all available free of charge.",
  questions: [
    { 
      id: 11, 
      question: "The seminar is described as __________.", 
      options: ["(A) optional", "(B) essential", "(C) advanced", "(D) brief"], 
      correct: 1,
      explanation: "Professor: 'This health seminar is essential for your curriculum.' (Giáo sư: 'Seminar sức khỏe này thiết yếu cho chương trình học của bạn.') - Luyện nghe tính chất chương trình. Kiến thức ngữ pháp: Tính từ 'essential' (thiết yếu) làm vị ngữ sau 'is'; 'for + noun' (cho + danh từ) chỉ mục đích; thì hiện tại đơn 'is' diễn tả đặc điểm cố định của seminar."
    },
    { 
      id: 12, 
      question: "Mindfulness was added __________.", 
      options: ["(A) last year", "(B) since the fall term", "(C) next semester", "(D) temporarily"], 
      correct: 1,
      explanation: "Professor: 'We've incorporated mindfulness practices since the fall term.' (Giáo sư: 'Chúng tôi đã tích hợp thực hành chánh niệm từ học kỳ thu.') - Luyện nghe thời gian triển khai. Kiến thức ngữ pháp: Thì hiện tại hoàn thành 'have incorporated' (đã tích hợp) + 'since + mốc thời gian' (từ + học kỳ thu) để diễn tả hành động bắt đầu quá khứ và tiếp tục; 'practices' (thực hành) là danh từ số nhiều."
    },
    { 
      id: 13, 
      question: "What happens if the journal deadline is missed?", 
      options: ["(A) No effect", "(B) Grade impact", "(C) Extra credit", "(D) Warning only"], 
      correct: 1,
      explanation: "Professor: 'If you miss the submission deadline... it will impact your grade.' (Giáo sư: 'Nếu bạn bỏ lỡ hạn nộp... sẽ ảnh hưởng đến điểm số.') - Luyện nghe hậu quả học thuật. Kiến thức ngữ pháp: Câu điều kiện loại 1 'If + hiện tại đơn, will + V' (nếu + hiện tại, sẽ + động từ) để diễn tả hậu quả có thể; 'impact' (ảnh hưởng) là động từ với tân ngữ 'your grade' (điểm số của bạn)."
    },
    { 
      id: 14, 
      question: "Jamie excelled in __________.", 
      options: ["(A) lectures", "(B) group exercises", "(C) exams", "(D) reading"], 
      correct: 1,
      explanation: "Professor: 'Jamie was a standout student in group exercises.' (Giáo sư: 'Jamie là học sinh nổi bật trong bài tập nhóm.') - Luyện nghe thành tích cá nhân. Kiến thức ngữ pháp: Thì quá khứ đơn 'was' (là) để diễn tả sự thật quá khứ; 'standout' (nổi bật) là tính từ bổ nghĩa cho 'student'; giới từ 'in + noun' (trong + danh từ) chỉ lĩnh vực thành tích."
    },
    { 
      id: 15, 
      question: "The gym offers __________ options.", 
      options: ["(A) paid only", "(B) balanced and free", "(C) limited", "(D) outdoor only"], 
      correct: 1,
      explanation: "Professor: 'The campus gym provides balanced options... all available free of charge.' (Giáo sư: 'Phòng gym trường cung cấp các lựa chọn cân bằng... tất cả miễn phí.') - Luyện nghe tiện ích trường học. Kiến thức ngữ pháp: Thì hiện tại đơn 'provides' (cung cấp) và 'available' (có sẵn) để diễn tả dịch vụ cố định; 'free of charge' (miễn phí) là cụm từ cố định; 'balanced options' (lựa chọn cân bằng) với 'balanced' (cân bằng) là tính từ."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Counselor: Let's discuss your study habits.\nStudent: I procrastinate often.\nCounselor: Start with time-blocking techniques.\nParent: How about apps for reminders?\nCounselor: Yes, like Focus Booster.\nStudent: I'll try it.\nParent: And regular breaks for mental health.\nCounselor: Exactly, to prevent burnout.",
  questions: [
    { 
      id: 16, 
      question: "What is the student's issue?", 
      options: ["(A) Overstudying", "(B) Procrastination", "(C) Poor grades", "(D) Lack of sleep"], 
      correct: 1,
      explanation: "Student: 'I procrastinate often.' (Sinh viên: 'Tôi thường trì hoãn.') - Luyện nghe vấn đề học tập phổ biến. Kiến thức ngữ pháp: Thì hiện tại đơn 'procrastinate' (trì hoãn) để diễn tả thói quen; 'often' (thường) là trạng từ tần suất đặt giữa động từ; động từ 'procrastinate' là từ vựng học thuật chỉ hành vi tiêu cực."
    },
    { 
      id: 17, 
      question: "What technique is suggested first?", 
      options: ["(A) Apps", "(B) Time-blocking", "(C) Group study", "(D) Rewards"], 
      correct: 1,
      explanation: "Counselor: 'Start with time-blocking techniques.' (Cố vấn: 'Bắt đầu với kỹ thuật chặn thời gian.') - Luyện nghe kỹ thuật quản lý thời gian. Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'Start with + noun' (bắt đầu với + danh từ) để đưa lời khuyên; 'time-blocking techniques' (kỹ thuật chặn thời gian) là danh từ ghép chỉ phương pháp cụ thể."
    },
    { 
      id: 18, 
      question: "What app is recommended?", 
      options: ["(A) Todoist", "(B) Focus Booster", "(C) Calendar", "(D) Notes"], 
      correct: 1,
      explanation: "Counselor: 'Yes, like Focus Booster.' (Cố vấn: 'Có, như Focus Booster.') - Luyện nghe khuyến nghị công cụ hỗ trợ. Kiến thức ngữ pháp: Cụm 'like + noun' (như + danh từ) để đưa ví dụ; thì hiện tại đơn ngụ ý trong câu trả lời đồng tình; 'Focus Booster' là tên riêng (proper noun)."
    },
    { 
      id: 19, 
      question: "What does the parent emphasize?", 
      options: ["(A) Strict schedules", "(B) Regular breaks", "(C) Extra classes", "(D) Less reading"], 
      correct: 1,
      explanation: "Parent: 'And regular breaks for mental health.' (Cha mẹ: 'Và nghỉ ngơi định kỳ cho sức khỏe tinh thần.') - Luyện nghe lời khuyên cân bằng học tập. Kiến thức ngữ pháp: Liên từ 'and' (và) nối ý bổ sung; 'regular breaks' (nghỉ ngơi định kỳ) với 'regular' (định kỳ) là tính từ; giới từ 'for + noun' (cho + danh từ) chỉ mục đích."
    },
    { 
      id: 20, 
      question: "The goal is to prevent __________.", 
      options: ["(A) Success", "(B) Burnout", "(C) Relaxation", "(D) Motivation"], 
      correct: 1,
      explanation: "Counselor: '...to prevent burnout.' (Cố vấn: '...để ngăn ngừa kiệt sức.') - Luyện nghe mục tiêu sức khỏe tinh thần. Kiến thức ngữ pháp: Động từ 'prevent' (ngăn ngừa) + tân ngữ 'burnout' (kiệt sức); cấu trúc 'to + V' (để + động từ) chỉ mục đích; 'burnout' là danh từ không đếm được chỉ tình trạng mệt mỏi."
    }
  ]
},
    // Reading Parts - Giữ nguyên, nhưng thêm giải thích tiếng Việt cho đáp án (theo yêu cầu)
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
      explanation: "Đáp án đúng: (D) Complicated. Giải thích: 'Complicated' là tính từ phù hợp với 'devices are' (các thiết bị bị phức tạp hóa không cần thiết). Kiến thức ngữ pháp: Đây là cấu trúc bị động hiện tại đơn 'be + past participle' (được + quá khứ phân từ) để diễn tả trạng thái của danh từ 'devices'; 'unnecessarily' (không cần thiết) là trạng từ bổ nghĩa cho tính từ, nhấn mạnh sự thừa thãi."
    },
    { 
      id: 22, 
      question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.", 
      options: ["(A) who", "(B) whose", "(C) they", "(D) those"], 
      correct: 3,
      explanation: "Đáp án đúng: (D) Those. Giải thích: 'Those' chỉ những người được công nhận (those recognized), phù hợp với danh từ số nhiều. Kiến thức ngữ pháp: Cấu trúc đảo ngữ 'Among + those + past participle' (giữa những người được công nhận) sử dụng đại từ chỉ định 'those' (số nhiều) làm chủ ngữ của mệnh đề quan hệ rút gọn; 'recognized' là quá khứ phân từ làm tính từ bổ nghĩa cho 'those'."
    },
    { 
      id: 23, 
      question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.", 
      options: ["(A) despite", "(B) except", "(C) since", "(D) during"], 
      correct: 2,
      explanation: "Đáp án đúng: (C) Since. Giải thích: 'Since' chỉ thời điểm bắt đầu và tiếp tục đến nay (kể từ khi gia nhập bộ phận bán hàng hai năm trước). Kiến thức ngữ pháp: Liên từ thời gian 'since + clause/mốc thời gian' (kể từ + mệnh đề/mốc) kết hợp với thì hiện tại hoàn thành 'has received' để diễn tả hành động từ quá khứ kéo dài đến hiện tại; 'two years ago' là mốc thời gian cụ thể bổ trợ."
    },
    { 
      id: 24, 
      question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no __________ dyes.", 
      options: ["(A) immediate", "(B) synthetic", "(C) reasonable", "(D) assumed"], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Synthetic. Giải thích: 'Synthetic' nghĩa là tổng hợp nhân tạo, phù hợp với ngữ cảnh 'no synthetic dyes' (không chứa thuốc nhuộm tổng hợp). Kiến thức ngữ pháp: Tính từ 'synthetic' (tổng hợp) bổ nghĩa cho danh từ 'dyes' (thuốc nhuộm) trong cấu trúc song song 'contains no + adj + noun'; 'no' (không) là từ phủ định chỉ sự vắng mặt."
    },
    { 
      id: 25, 
      question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.", 
      options: ["(A) regular", "(B) regularity", "(C) regulate", "(D) regularly"], 
      correct: 3,
      explanation: "Đáp án đúng: (D) Regularly. Giải thích: 'Regularly' là trạng từ bổ nghĩa cho 'learning' (học thường xuyên nâng cao sự sáng tạo và tập trung). Kiến thức ngữ pháp: Trạng từ tần suất 'regularly' (thường xuyên) đặt đầu mệnh đề để bổ nghĩa động từ 'learning' (học tập); cấu trúc 'that + clause' (rằng + mệnh đề) trong câu tường thuật gián tiếp từ 'states' (nêu)."
    },
    { 
      id: 26, 
      question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.", 
      options: ["(A) include", "(B) includes", "(C) included", "(D) including"], 
      correct: 0,
      explanation: "Đáp án đúng: (A) Include. Giải thích: 'Include' là động từ nguyên thể sau 'will' (sẽ bao gồm tổng quan về chính sách công ty). Kiến thức ngữ pháp: Cấu trúc tương lai đơn 'will + base form' (sẽ + động từ nguyên thể) để diễn tả hành động sắp xảy ra; 'and' (và) nối hai mệnh đề song song với thì tương lai."
    },
    { 
      id: 27, 
      question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.", 
      options: ["(A) before", "(B) during", "(C) between", "(D) unless"], 
      correct: 0,
      explanation: "Đáp án đúng: (A) Before. Giải thích: 'Before' chỉ thời gian trước khi giao hàng (phải kiểm tra kỹ trước khi giao cho khách hàng). Kiến thức ngữ pháp: Liên từ thời gian 'before + gerund' (trước khi + danh động từ) chỉ thứ tự hành động; cấu trúc 'must be + past participle' (phải được + quá khứ phân từ) là động từ khuyết thiếu thụ động."
    },
    { 
      id: 28, 
      question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.", 
      options: ["(A) independence", "(B) independently", "(C) independent", "(D) dependently"], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Independently. Giải thích: 'Independently' là trạng từ bổ nghĩa cho 'work' (làm việc độc lập và đáp ứng deadline chặt chẽ). Kiến thức ngữ pháp: Trạng từ cách thức 'independently' (một cách độc lập) bổ nghĩa động từ 'work'; mệnh đề quan hệ 'who + clause' (người có thể làm việc... ) mô tả 'graphic designer'."
    },
    { 
      id: 29, 
      question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.", 
      options: ["(A) postponed", "(B) postponing", "(C) postpone", "(D) postpones"], 
      correct: 0,
      explanation: "Đáp án đúng: (A) Postponed. Giải thích: 'Postponed' là phân từ quá khứ sau 'has been' (sự kiện ngoài trời bị hoãn đến cuối tuần sau do mưa lớn). Kiến thức ngữ pháp: Thì hiện tại hoàn thành thụ động 'has been + past participle' (đã bị + quá khứ phân từ) để diễn tả hành động hoàn thành với kết quả hiện tại; 'until + time' (đến + thời gian) chỉ thời điểm mới."
    },
    { 
      id: 30, 
      question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.", 
      options: ["(A) environment", "(B) equipment", "(C) advertisement", "(D) appointment"], 
      correct: 0,
      explanation: "Đáp án đúng: (A) Environment. Giải thích: 'Environment' nghĩa là môi trường (môi trường tích cực), phù hợp với ngữ cảnh làm việc nhóm và đúng giờ. Kiến thức ngữ pháp: Mệnh đề danh từ 'that + clause' (rằng + mệnh đề) sau động từ tường thuật 'reminded' (nhắc nhở); 'key factors' (yếu tố then chốt) với 'key' (then chốt) là tính từ bổ nghĩa."
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
      explanation: "Đáp án đúng: (A) Ensure. Giải thích: 'Ensure' nghĩa là đảm bảo (đảm bảo sự phối hợp mượt mà giữa các bộ phận). Kiến thức ngữ pháp: Động từ 'ensure + noun' (đảm bảo + danh từ) trong cấu trúc 'to + V + noun' chỉ mục đích; thì tương lai 'will be assigned' (sẽ được giao) ngụ ý hành động hỗ trợ; 'smooth coordination' (phối hợp mượt mà) là danh từ ghép."
    },
    { 
      id: 32, 
      question: "(32)", 
      options: ["(A) attend", "(B) improve", "(C) reinforce", "(D) prevent"], 
      correct: 2,
      explanation: "Đáp án đúng: (C) Reinforce. Giải thích: 'Reinforce' nghĩa là củng cố (tạo tài liệu hình ảnh để củng cố hình ảnh thương hiệu của chúng ta). Kiến thức ngữ pháp: Cấu trúc 'create + noun + to + V' (tạo + danh từ + để + động từ) chỉ mục đích; 'reinforce' (củng cố) + tân ngữ 'brand image' (hình ảnh thương hiệu); thì tương lai ngụ ý với 'will create'."
    },
    { 
      id: 33, 
      question: "(33)", 
      options: ["(A) reject", "(B) implement", "(C) transfer", "(D) decline"], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Implement. Giải thích: 'Implement' nghĩa là thực hiện (đánh giá và thực hiện chúng đủ thời gian). Kiến thức ngữ pháp: Động từ song song 'review and + V' (xem xét và + động từ) với thì tương lai ngụ ý; 'implement + object' (thực hiện + đối tượng) chỉ hành động áp dụng gợi ý; 'them' (chúng) là đại từ thay thế 'suggestions'."
    },
    { 
      id: 34, 
      question: "(34)", 
      options: ["(A) warn", "(B) announce", "(C) require", "(D) ensure"], 
      correct: 3,
      explanation: "Đáp án đúng: (D) Ensure. Giải thích: 'Ensure' nghĩa là đảm bảo (đảm bảo tất cả người tham gia thoải mái với vai trò của họ). Kiến thức ngữ pháp: Cấu trúc 'to + V + that-clause' (để + động từ + mệnh đề that) với 'ensure' chỉ mục đích; 'that all participants are comfortable' là mệnh đề danh từ làm tân ngữ; thì tương lai 'will be held' (sẽ được tổ chức)."
    },
    { 
      id: 35, 
      question: "(35)", 
      options: ["(A) compete", "(B) cooperate", "(C) complain", "(D) compare"], 
      correct: 1,
      explanation: "(B) 'Cooperate' hợp tác hiệu quả (cách hợp tác hiệu quả với các bộ phận khác). Kiến thức ngữ pháp: Cấu trúc 'how to + V' (cách + động từ nguyên thể) trong mệnh đề danh từ sau 'information on' (thông tin về); 'cooperate with + noun' (hợp tác với + danh từ) là cụm động từ cố định; thì tương lai ngụ ý với 'will provide'."
    },
    { 
      id: 36, 
      question: "(36)", 
      options: ["(A) reach", "(B) push", "(C) delay", "(D) ignore"], 
      correct: 0,
      explanation: "Đáp án đúng: (A) Reach. Giải thích: 'Reach' nghĩa là liên lạc (đừng ngần ngại liên lạc trực tiếp với tôi). Kiến thức ngữ pháp: Cụm động từ 'reach + object' (liên lạc + đối tượng) trong cấu trúc 'don't hesitate + to + V' (đừng ngần ngại + động từ) để diễn tả lời mời lịch sự; thì hiện tại đơn ngụ ý sự sẵn sàng chung."
    },
    { 
      id: 37, 
      question: "The EcoSmart Home Series will most likely be released (37).", 
      options: ["(A) next week", "(B) early next quarter", "(C) by the end of the year", "(D) after the press conference"], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Early next quarter. Giải thích: 'Scheduled for early next quarter' (Lịch trình cho đầu quý sau). Kiến thức ngữ pháp: Thì tương lai thụ động 'scheduled for + time' (được lên lịch cho + thời gian) chỉ kế hoạch; 'early next quarter' là cụm từ kinh doanh với 'early' (sớm) là trạng từ bổ nghĩa."
    },
    { 
      id: 38, 
      question: "What is the main purpose of this message?", 
      options: ["(A) To introduce a new marketing policy", "(B) To inform staff of product launch preparations", "(C) To announce the cancellation of a campaign", "(D) To request client feedback after the event"], 
      correct: 1,
      explanation: "Đáp án đúng: (B) To inform staff of product launch preparations. Giải thích: 'We are preparing for the official launch...' (Chúng tôi đang chuẩn bị cho việc ra mắt chính thức...). Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'are preparing' (đang chuẩn bị) để diễn tả hành động đang diễn ra; tiêu đề 'Upcoming Product Launch Preparation' (Chuẩn bị ra mắt sản phẩm sắp tới) là danh từ ghép chỉ mục đích."
    },
    { 
      id: 39, 
      question: "Who is the sender of this message?", 
      options: ["(A) A sales representative", "(B) A design manager", "(C) The marketing director", "(D) The chief financial officer"], 
      correct: 2,
      explanation: "Đáp án đúng: (C) The marketing director. Giải thích: 'From: Clara Lee, Marketing Director' (Từ: Clara Lee, Giám đốc Marketing). Kiến thức ngữ pháp: Cấu trúc email tiêu chuẩn với 'From' (từ) + tên + chức vụ; 'Marketing Director' (Giám đốc Marketing) là danh từ ghép chỉ vị trí."
    },
    { 
      id: 40, 
      question: "When will the rehearsal for the press conference take place?", 
      options: ["(A) March 22", "(B) April 3", "(C) April 5", "(D) The following week"], 
      correct: 1,
      explanation: "Đáp án đúng: (B) April 3. Giải thích: 'A rehearsal session will be held two days before the event' (Buổi diễn tập sẽ diễn ra hai ngày trước sự kiện - sự kiện là April 5, vậy rehearsal April 3). Kiến thức ngữ pháp: Cấu trúc thời gian 'two days before + noun' (hai ngày trước + danh từ) với thì tương lai 'will be held' (sẽ được tổ chức); suy luận toán học đơn giản từ ngày cụ thể."
    }
  ]
},
part7: {
  title: "PART 7: Reading",
  description: "10 câu hỏi - Đọc brochure, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**FREE MEDITATION PROGRAM FOR ALL STUDENTS**

---

**Program Overview**
Our campus wellness center is excited to offer a completely FREE meditation program designed specifically for students. This program aims to help you reduce stress, improve concentration, and enhance overall well-being during your college experience.

**Schedule: Every Tuesday and Thursday**
**Time: 4:00 PM - 5:00 PM**
**Location: Student Center, Room 215**

---

**Program Benefits**
1. **Reduced Stress** – Learn effective techniques to manage academic pressure
2. **Improved Concentration** – Enhance focus for better study sessions
3. **Better Sleep Quality** – Develop healthy sleep habits
4. **Emotional Balance** – Build resilience and mental clarity
5. **No Cost Ever** – Completely FREE for all students

---

**Who Can Join?**
All levels welcome, from complete beginners to experienced practitioners. No experience needed! Everyone is welcome to join our welcoming community of students seeking peace and mindfulness.

---

**STUDENT REVIEW**

Name: Sarah Martinez
Year: Junior
Major: Psychology

"I had never tried meditation before, but I decided to give this program a chance. It was one of the best decisions I made during my college years!

The instructor, Dr. Chen, is incredibly patient and knowledgeable. He explains each technique clearly and always makes time to answer questions. The sessions are structured perfectly – not too long, not too short – just the right length to feel refreshed without disrupting your study schedule.

My only criticism is that the room is too small for larger groups, and the space gets quite crowded during peak times. However, this doesn't take away from the quality of the instruction.

I have noticed significant improvements in my ability to focus on assignments and exams. My anxiety levels have decreased noticeably. I highly recommend this program to any student, especially those with busy schedules who need mental clarity and stress relief."

Rating: ⭐⭐⭐⭐⭐ (5/5 stars)

---

**How to Register**
Visit the Student Wellness Center or email: meditation@student.edu
Spots are limited, so register early!`,
  
  questions: [
    { 
      id: 41, 
      question: "What is the cost of the meditation program?", 
      options: [
        "(A) $10 per session", 
        "(B) Free for all students", 
        "(C) $50 monthly membership", 
        "(D) Donation-based"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) Free for all students. Giải thích: 'Completely FREE for all students' và 'No cost ever' (Hoàn toàn MIỄN PHÍ cho tất cả sinh viên và không bao giờ mất phí) - Luyện đọc thông tin chi phí trực tiếp. Kiến thức ngữ pháp: Tính từ 'free' (miễn phí) lặp lại nhấn mạnh; 'for all students' (cho tất cả sinh viên) là cụm giới từ chỉ đối tượng; thì hiện tại đơn 'is excited to offer' (hào hứng cung cấp) diễn tả chương trình sẵn có."
    },
    { 
      id: 42, 
      question: "According to the brochure, what benefit does the program provide?", 
      options: [
        "(A) Weight loss", 
        "(B) Reduced stress and improved concentration", 
        "(C) Better grades guaranteed", 
        "(D) More social connections"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) Reduced stress and improved concentration. Giải thích: Program Benefits liệt kê 'Improved Concentration' và 'Reduced Stress' (Cải thiện sự tập trung và giảm căng thẳng) - Luyện đọc danh sách lợi ích. Kiến thức ngữ pháp: Danh từ ghép 'Reduced Stress' và 'Improved Concentration' (giảm căng thẳng và cải thiện tập trung) với thì quá khứ phân từ làm tính từ; 'aims to + V' (nhằm + động từ) chỉ mục đích chương trình."
    },
    { 
      id: 43, 
      question: "Who most likely wrote the review?", 
      options: [
        "(A) A meditation instructor", 
        "(B) A college student", 
        "(C) A parent", 
        "(D) A university administrator"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) A college student. Giải thích: 'Sarah Martinez, Junior, Psychology Major' (Sarah Martinez, sinh viên năm 3, ngành Tâm lý học) - Luyện nhận diện người viết từ thông tin cá nhân. Kiến thức ngữ pháp: Cấu trúc 'Name: + name, Year: + level, Major: + field' (Tên: + tên, Năm: + cấp độ, Chuyên ngành: + lĩnh vực) là định dạng tiêu chuẩn cho đánh giá; 'Junior' (năm ba) là danh từ chỉ cấp độ học."
    },
    { 
      id: 44, 
      question: "What aspect of the program did the reviewer praise most?", 
      options: [
        "(A) The room size", 
        "(B) The instructor's patience and knowledge", 
        "(C) The flexible schedule", 
        "(D) The cost of the program"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) The instructor's patience and knowledge. Giải thích: 'The instructor, Dr. Chen, is incredibly patient and knowledgeable' (Giảng viên, Tiến sĩ Chen, cực kỳ kiên nhẫn và am hiểu) - Luyện đọc đánh giá tích cực. Kiến thức ngữ pháp: Thì hiện tại đơn 'is' (là) để diễn tả đặc điểm cố định; 'incredibly' (cực kỳ) là trạng từ cường độ bổ nghĩa cho 'patient and knowledgeable' (kiên nhẫn và am hiểu)."
    },
    { 
      id: 45, 
      question: "What criticism does the reviewer mention?", 
      options: [
        "(A) Poor teaching quality", 
        "(B) The room is too small for larger groups", 
        "(C) Sessions are too long", 
        "(D) No visible benefits"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) The room is too small for larger groups. Giải thích: 'My only criticism is that the room is too small for larger groups' và 'the space gets quite crowded during peak times' (Lời chỉ trích duy nhất của tôi là phòng quá nhỏ cho nhóm lớn hơn và không gian khá đông đúc) - Luyện nhận diện phản hồi tiêu cực. Kiến thức ngữ pháp: Cấu trúc 'is that + clause' (là + mệnh đề) sau 'criticism' (chỉ trích); so sánh hơn 'too small' (quá nhỏ) với 'for larger groups' (cho nhóm lớn hơn)."
    },
    { 
      id: 46, 
      question: "How often are the meditation sessions held?", 
      options: [
        "(A) Daily", 
        "(B) Twice per week", 
        "(C) Once a month", 
        "(D) Only during exam periods"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) Twice per week. Giải thích: 'Schedule: Every Tuesday and Thursday' (Lịch trình: Mỗi thứ Ba và thứ Năm) - Luyện đọc thông tin lịch trình cụ thể. Kiến thức ngữ pháp: Trạng từ tần suất 'every + day' (mỗi + ngày) lặp lại cho hai ngày; 'and' (và) nối hai danh từ thời gian song song; thì hiện tại đơn ngụ ý lịch trình cố định."
    },
    { 
      id: 47, 
      question: "Is meditation experience required to join the program?", 
      options: [
        "(A) Yes, advanced level required", 
        "(B) No, all levels welcome", 
        "(C) Basic experience only", 
        "(D) Professional certification needed"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) No, all levels welcome. Giải thích: 'No experience needed' và 'All levels welcome, from complete beginners to experienced practitioners' (Không cần kinh nghiệm và chào đón mọi trình độ) - Luyện đọc yêu cầu tham gia. Kiến thức ngữ pháp: Câu phủ định 'No experience needed' (không cần kinh nghiệm) với thì hiện tại đơn; 'from... to...' (từ... đến...) chỉ phạm vi trình độ; 'welcome' (chào đón) là tính từ bổ nghĩa."
    },
    { 
      id: 48, 
      question: "According to the brochure, who can participate in the program?", 
      options: [
        "(A) Only psychology majors", 
        "(B) All students are welcome", 
        "(C) Children and families", 
        "(D) Faculty and staff only"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) All students are welcome. Giải thích: 'Free Meditation Program for All Students' và 'Everyone is welcome' (Chương trình thiền miễn phí cho tất cả sinh viên và mọi người đều được chào đón) - Luyện đọc đối tượng tham gia. Kiến thức ngữ pháp: Đại từ 'all students' (tất cả sinh viên) làm chủ ngữ với thì hiện tại đơn 'are welcome' (được chào đón); 'for all students' (cho tất cả sinh viên) chỉ đối tượng."
    },
    { 
      id: 49, 
      question: "Who does the reviewer specifically recommend the program for?", 
      options: [
        "(A) Students with lots of free time", 
        "(B) Students with busy schedules", 
        "(C) Students on vacation", 
        "(D) Students interested in sports"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) Students with busy schedules. Giải thích: 'I highly recommend this program to any student, especially those with busy schedules who need mental clarity and stress relief' (Tôi thực sự khuyến nghị chương trình này cho bất kỳ sinh viên nào, đặc biệt những người có lịch trình bận rộn cần sự rõ ràng tinh thần và giảm căng thẳng) - Luyện đọc khuyến nghị cụ thể. Kiến thức ngữ pháp: Cấu trúc 'recommend + object + to + object' (khuyến nghị + đối tượng + cho + đối tượng); 'especially' (đặc biệt) là trạng từ giới hạn nhóm ưu tiên."
    },
    { 
      id: 50, 
      question: "What is the main purpose of the brochure?", 
      options: [
        "(A) To advertise gym memberships", 
        "(B) To promote the free meditation program", 
        "(C) To sell diet plans", 
        "(D) To recruit meditation instructors"
      ], 
      correct: 1, 
      explanation: "Đáp án đúng: (B) To promote the free meditation program. Giải thích: Tiêu đề chính 'Free Meditation Program for All Students' và nội dung toàn brochure giới thiệu chi tiết về chương trình thiền (Chương trình thiền miễn phí cho tất cả sinh viên) - Luyện xác định mục đích chính của văn bản quảng cáo. Kiến thức ngữ pháp: Động từ 'aims to + V' (nhằm + động từ) chỉ mục đích; thì hiện tại đơn 'offer' (cung cấp) và 'designed' (được thiết kế) diễn tả chương trình sẵn có."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Lisa Chen (14:30): Hi Marco! Are you available this weekend? I need help moving to my new apartment.
Marco Santos (14:35): This Saturday? I'm free until 3 PM. Is that enough time?
Lisa Chen (14:36): The move starts at 10 AM. We should be done by then, but maybe 1 or 2 o'clock would be better.
Marco Santos (14:40): I can adjust my schedule. Let me check with my family first. I'll text you back soon.
Lisa Chen (14:42): Thanks so much! I really appreciate your help. My brother is coming too.
Marco Santos (14:50): Great! I just confirmed with my family. I can stay the whole day!
Lisa Chen (14:51): Excellent! Can you bring your truck? We have quite a few boxes and furniture.
Marco Santos (14:55): Of course! My truck can carry a lot. What time should I arrive at your current place?
Lisa Chen (14:57): Come by around 9:30 AM. I'll have everything packed and ready by then.
Marco Santos (14:58): Perfect! See you Saturday morning. This will be fun!`,
  
  questions: [
    { 
      id: 51, 
      question: "What is Lisa's main reason for contacting Marco?", 
      options: [
        "(A) To invite him to a family party", 
        "(B) To ask for help with moving", 
        "(C) To borrow his truck", 
        "(D) To introduce her brother"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) To ask for help with moving. Giải thích: 'I need help moving to my new apartment' (Tôi cần giúp đỡ chuyển đến căn hộ mới của tôi) - Luyện xác định mục đích chính. Kiến thức ngữ pháp: Câu hỏi 'Are you available...?' (Bạn có sẵn sàng...?) theo sau là mệnh đề 'I need help + V-ing' (tôi cần giúp đỡ + danh động từ) chỉ lý do liên hệ."
    },
    { 
      id: 52, 
      question: "Why does Marco need to check with his family?", 
      options: [
        "(A) To get permission to use the truck", 
        "(B) To ask if they want to help with the move", 
        "(C) To confirm he can stay the whole day", 
        "(D) To see if they need the truck that day"
      ], 
      correct: 2,
      explanation: "Đáp án đúng: (C) To confirm he can stay the whole day. Giải thích: Marco nói 'I can adjust my schedule' và sau đó 'I just confirmed with my family. I can stay the whole day!' - cho thấy ông đã xác nhận khả năng ở lại cả ngày - Luyện suy luận mục đích xác nhận. Kiến thức ngữ pháp: Thì quá khứ đơn 'confirmed' (xác nhận) với 'with + noun' (với + danh từ) chỉ đối tượng; 'the whole day' (cả ngày) là cụm thời gian chỉ phạm vi."
    },
    { 
      id: 53, 
      question: "What was Marco's initial concern?", 
      options: [
        "(A) He didn't have a truck", 
        "(B) He might not have enough time", 
        "(C) He didn't want to help Lisa", 
        "(D) He needed to talk to his brother"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) He might not have enough time. Giải thích: 'I'm free until 3 PM. Is that enough time?' - Marco lo lắng rằng thời gian từ sáng đến 3 PM có đủ không - Luyện nhận diện mối lo ngại ban đầu. Kiến thức ngữ pháp: Câu hỏi 'Is that + adj + noun?' (Điều đó có + tính từ + danh từ?) để xác nhận; 'until + time' (đến + thời gian) chỉ giới hạn thời gian; thì hiện tại đơn 'is free' (rảnh rỗi)."
    },
    { 
      id: 54, 
      question: "At 14:36, what does Lisa suggest?", 
      options: [
        "(A) Starting the move earlier in the morning", 
        "(B) Moving to a later time to give Marco more time", 
        "(C) Asking her brother to bring his truck too", 
        "(D) Postponing the move to another day"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Moving to a later time to give Marco more time. Giải thích: 'maybe 1 or 2 o'clock would be better' (có thể 1 hoặc 2 giờ sẽ tốt hơn) - Lisa đề xuất kết thúc muộn hơn để Marco có đủ thời gian - Luyện xác định đề xuất của Lisa. Kiến thức ngữ pháp: Cấu trúc 'would be better' (sẽ tốt hơn) là dạng lịch sự của 'be + adj' để đề xuất; 'maybe' (có lẽ) là trạng từ khả năng; 'or' (hoặc) nối hai lựa chọn thời gian."
    },
    { 
      id: 55, 
      question: "What does Marco offer to bring?", 
      options: [
        "(A) His family to help", 
        "(B) Boxes and packing supplies", 
        "(C) His truck to transport items", 
        "(D) Food and drinks"
      ], 
      correct: 2,
      explanation: "Đáp án đúng: (C) His truck to transport items. Giải thích: 'Can you bring your truck? We have quite a few boxes and furniture' / 'Of course! My truck can carry a lot' - Luyện xác định những gì Marco đề nghị mang theo. Kiến thức ngữ pháp: Câu hỏi 'Can you + V + noun?' (Bạn có thể + động từ + danh từ?) để yêu cầu; thì hiện tại đơn 'can carry' (có thể chở) diễn tả khả năng; 'quite a few' (khá nhiều) là cụm chỉ số lượng không xác định."
    },
    { 
      id: 56, 
      question: "What can be inferred about Lisa and Marco?", 
      options: [
        "(A) They have worked together for many years.", 
        "(B) They are family members.", 
        "(C) They are close friends or good acquaintances.", 
        "(D) They just met recently."
      ], 
      correct: 2,
      explanation: "Đáp án đúng: (C) They are close friends or good acquaintances. Giải thích: Lisa nói 'I really appreciate your help' (Tôi thực sự cảm ơn giúp đỡ của bạn), Marco nói 'This will be fun!' - cho thấy mối quan hệ thân thiết - Luyện suy luận mối quan hệ. Kiến thức ngữ pháp: Cụm 'really appreciate + noun' (thực sự đánh giá cao + danh từ) thể hiện lòng biết ơn; 'this will be fun' (điều này sẽ vui) là thì tương lai đơn với 'will be' chỉ dự đoán tích cực."
    },
    { 
      id: 57, 
      question: "What does Lisa mention about additional help?", 
      options: [
        "(A) She hired professional movers", 
        "(B) Her brother is also coming to help", 
        "(C) Marco's family will assist", 
        "(D) She will do most of the work alone"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) Her brother is also coming to help. Giải thích: 'My brother is coming too' (Anh tôi cũng sẽ đến) - Luyện xác định những người khác giúp đỡ. Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'is coming' (đang đến) để diễn tả kế hoạch sắp xảy ra; 'too' (cũng) là trạng từ bổ sung; 'my brother' (anh trai tôi) với đại từ sở hữu 'my'."
    },
    { 
      id: 58, 
      question: "Why does Marco think the move will be fun?", 
      options: [
        "(A) He enjoys driving his truck", 
        "(B) He likes spending time with Lisa and her family", 
        "(C) He finds moving day entertaining", 
        "(D) He is excited about Lisa's new apartment"
      ], 
      correct: 1,
      explanation: "Đáp án đúng: (B) He likes spending time with Lisa and her family. Giải thích: Marco nói 'This will be fun!' sau khi biết rằng cả ngày sẽ giúp Lisa, em gái của cô, và anh trai của cô - điều này gợi ý ông thích spend time với họ - Luyện suy luận tâm trạng. Kiến thức ngữ pháp: Thì tương lai 'will be' (sẽ là) với 'fun' (vui vẻ) chỉ dự đoán cảm xúc; 'this' (điều này) là đại từ chỉ hành động di chuyển chung."
    },
    { 
      id: 59, 
      question: "What time will Marco arrive at Lisa's current apartment?", 
      options: [
        "(A) 9:30 AM", 
        "(B) 10:00 AM", 
        "(C) 1:00 PM", 
        "(D) 2:00 PM"
      ], 
      correct: 0,
      explanation: "Đáp án đúng: (A) 9:30 AM. Giải thích: 'Come by around 9:30 AM. I'll have everything packed and ready by then' (Đến quanh 9:30 sáng. Tôi sẽ có tất cả đóng gói và sẵn sàng khi đó) - Luyện đọc thông tin thời gian cụ thể. Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'Come by + time' (đến vào + thời gian); thì tương lai hoàn thành 'will have + past participle' (sẽ đã + quá khứ phân từ) chỉ hành động hoàn thành trước thời điểm khác."
    },
    { 
      id: 60, 
      question: "What does Lisa's preparation suggest about her?", 
      options: [
        "(A) She is disorganized and forgetful", 
        "(B) She doesn't appreciate Marco's help", 
        "(C) She is organized and considerate", 
        "(D) She is worried about the move"
      ], 
      correct: 2,
      explanation: "Đáp án đúng: (C) She is organized and considerate. Giải thích: 'I'll have everything packed and ready by then' (Tôi sẽ có tất cả đóng gói sẵn sàng khi đó) - cho thấy Lisa chuẩn bị chu đáo và tôn trọng thời gian của Marco - Luyện suy luận tính cách qua hành động. Kiến thức ngữ pháp: Thì tương lai hoàn thành 'will have + past participle' (sẽ đã + quá khứ phân từ) chỉ sự chuẩn bị trước thời điểm; 'packed and ready' (đóng gói và sẵn sàng) là tính từ song song nối bằng 'and'."
    }
  ]
}
  }
};