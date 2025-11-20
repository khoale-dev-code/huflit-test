export const EXAM3_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 3 (Chủ Đề: Giáo Dục & Sức Khỏe)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết, tập trung vào giao tiếp giáo dục và tư vấn sức khỏe.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Professor và Student về chương trình học sức khỏe. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Professor: Hello, Emma. How are you finding the Health Education course so far?\nEmma: It's fascinating, Professor. I enrolled because I want to learn about preventive medicine, but the workload is intense. We have three assignments due next week, including a research paper on nutrition.\nProfessor: That's standard for upper-level classes. Have you chosen your topic yet? Last semester, Lisa did hers on balanced diets and got an A.\nEmma: I'm leaning towards mental health benefits of exercise. Do you recommend any specific resources?\nProfessor: Absolutely. Start with the university library's online journals—they're free for students. Also, attend the guest lecture on stress management next Thursday; it's highly relevant.",
      questions: [
        {
          id: 1,
          options: [
            "She enrolled to study surgery.",
            "She enrolled to learn about preventive medicine.",
            "She enrolled for easy workload.",
            "She enrolled by mistake."
          ],
          correct: 1,
          explanation: "Emma nói: 'I enrolled because I want to learn about preventive medicine.' (Tôi đăng ký vì muốn học về y học phòng ngừa.) Kiến thức ngữ pháp: Cấu trúc 'because + clause' chỉ lý do (reason clause), sử dụng thì hiện tại đơn 'want' để diễn tả mong muốn hiện tại; 'enrolled' ở thì quá khứ đơn cho hành động đăng ký hoàn tất."
        },
        {
          id: 2,
          options: [
            "One assignment due next week.",
            "Three assignments due next week.",
            "No assignments due.",
            "Assignments due next month."
          ],
          correct: 1,
          explanation: "Emma nói: 'We have three assignments due next week.' (Chúng tôi có ba bài tập đến hạn tuần tới.) Kiến thức ngữ pháp: Cấu trúc 'have + số + danh từ số nhiều' chỉ số lượng sở hữu; 'due + thời gian' là cụm từ chỉ hạn chót, với thì hiện tại đơn 'have' mô tả tình huống hiện tại."
        },
        {
          id: 3,
          options: [
            "Lisa's topic was on surgery.",
            "Lisa's topic was on balanced diets.",
            "Lisa got a C.",
            "Lisa did not submit."
          ],
          correct: 1,
          explanation: "Professor nói: 'Lisa did hers on balanced diets and got an A.' (Lisa làm về chế độ ăn cân bằng và được A.) Kiến thức ngữ pháp: Đại từ 'hers' thay thế 'her paper' để tránh lặp; 'on + danh từ' chỉ chủ đề, với thì quá khứ đơn 'did' và 'got' song song cho chuỗi sự kiện quá khứ."
        },
        {
          id: 4,
          options: [
            "Mental health benefits of travel.",
            "Mental health benefits of exercise.",
            "Mental health benefits of diet.",
            "No topic chosen."
          ],
          correct: 1,
          explanation: "Emma nói: 'I'm leaning towards mental health benefits of exercise.' (Tôi đang nghiêng về lợi ích sức khỏe tâm thần của tập thể dục.) Kiến thức ngữ pháp: Cụm 'leaning towards + danh từ' chỉ xu hướng lựa chọn (tendency); thì hiện tại tiếp diễn 'I'm leaning' nhấn mạnh quá trình quyết định đang diễn ra."
        },
        {
          id: 5,
          options: [
            "Buy books from a store.",
            "Use university library's online journals.",
            "Skip the guest lecture.",
            "Attend a lecture next month."
          ],
          correct: 1,
          explanation: "Professor nói: 'Start with the university library's online journals—they're free for students.' (Bắt đầu với tạp chí trực tuyến của thư viện đại học—chúng miễn phí cho sinh viên.) Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'start with + danh từ' để gợi ý; sở hữu 'library's' với dấu nháy đơn chỉ sở hữu, và mệnh đề quan hệ rút gọn 'they're free' bổ nghĩa."
        }
      ]
    },
   part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người tại phòng khám về giáo dục sức khỏe. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At the clinic waiting room.\nDoctor Chen: Good morning, John and Mike. You're here for the wellness workshop signup?\nJohn: Yes, Doctor. Mike's been having sleep issues, so we're interested in the session on healthy habits.\nMike: Exactly. I work late shifts and struggle with insomnia. Does the workshop cover relaxation techniques?\nDoctor Chen: It does—mindfulness and yoga basics. Sarah, our nutritionist, leads it; she emphasizes balanced meals to improve sleep quality.\nJohn: Sounds perfect. When is the next one? We both need to fit it into our schedules.\nMike: Also, any prerequisites? Like a doctor's note?\nDoctor Chen: None required. It's open to all staff and students. Sign up online by Friday to secure spots.",
  questions: [
    {
      id: 6,
      question: "Why are the men at the clinic?",
      options: [
        "For a routine checkup",
        "For wellness workshop signup",
        "For medication refill",
        "For surgery consultation"
      ],
      correct: 1,
      explanation: "Doctor Chen nói: 'You're here for the wellness workshop signup?' (Các anh đến để đăng ký hội thảo sức khỏe?) Kiến thức ngữ pháp: Câu hỏi yes/no với 'be + here for + danh từ' chỉ mục đích; thì hiện tại đơn 'are' cho tình huống hiện tại, nhấn mạnh ngữ cảnh giáo dục sức khỏe."
    },
    {
      id: 7,
      question: "What problem does Mike have?",
      options: [
        "Overeating",
        "Sleep issues",
        "High energy",
        "Early shifts"
      ],
      correct: 1,
      explanation: "John nói: 'Mike's been having sleep issues.' (Mike đang gặp vấn đề giấc ngủ.) Kiến thức ngữ pháp: Thì hiện tại hoàn thành tiếp diễn 'has been having' chỉ vấn đề kéo dài từ quá khứ đến hiện tại; sở hữu 'Mike's' rút gọn 'Mike has' để mượt mà."
    },
    {
      id: 8,
      question: "What does the workshop cover?",
      options: [
        "Only nutrition",
        "Relaxation techniques",
        "Surgery basics",
        "No techniques"
      ],
      correct: 1,
      explanation: "Doctor Chen nói: 'It does—mindfulness and yoga basics.' (Nó có—chánh niệm và cơ bản yoga.) Kiến thức ngữ pháp: Câu trả lời ngắn 'It does' xác nhận câu hỏi trước; liệt kê song song 'mindfulness and yoga basics' với 'and' nối hai danh từ chỉ kỹ thuật thư giãn."
    },
    {
      id: 9,
      question: "Who leads the workshop?",
      options: [
        "Doctor Chen",
        "John",
        "Sarah, the nutritionist",
        "Mike"
      ],
      correct: 2,
      explanation: "Doctor Chen nói: 'Sarah, our nutritionist, leads it.' (Sarah, chuyên gia dinh dưỡng của chúng tôi, dẫn dắt nó.) Kiến thức ngữ pháp: Appositive phrase 'our nutritionist' bổ nghĩa 'Sarah' (ngắt bằng dấu phẩy); thì hiện tại đơn 'leads' chỉ vai trò thường xuyên."
    },
    {
      id: 10,
      question: "What is required to sign up?",
      options: [
        "A doctor's note",
        "Online signup by Friday",
        "Payment",
        "Prerequisites"
      ],
      correct: 1,
      explanation: "Doctor Chen nói: 'Sign up online by Friday to secure spots.' (Đăng ký trực tuyến trước thứ Sáu để giữ chỗ.) Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'sign up + trạng từ' chỉ hành động cần làm; 'to + V nguyên thể' chỉ mục đích (to secure), với 'by + thời gian' chỉ hạn chót."
    }
  ]
},
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của giảng viên về giáo dục sức khỏe. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Counselor: Welcome to today's seminar on student wellness. Education isn't just academics—it's about holistic health too. Studies show that regular exercise reduces stress by 30%, yet only 40% of students meet the recommended activity levels. If you're feeling overwhelmed, our counseling center offers free sessions; book via the app to avoid wait times. Remember, poor sleep affects cognitive function, so aim for seven to nine hours nightly. Anna, a former student, transformed her grades by prioritizing self-care routines. For more, join our peer support group starting next week.",
      questions: [
        { 
          id: 11, 
          question: "Education includes __________.", 
          options: ["(A) only academics", "(B) holistic health", "(C) no health", "(D) sports only"], 
          correct: 1,
          explanation: "Counselor: 'Education isn't just academics—it's about holistic health too.' (Giáo dục không chỉ học thuật—nó về sức khỏe toàn diện nữa.) - Kiến thức ngữ pháp: Cấu trúc 'not just A—it's about B too' với dấu gạch ngang chỉ giải thích; thì hiện tại đơn 'isn't' và 'is' đối lập để nhấn mạnh phạm vi rộng."
        },
        { 
          id: 12, 
          question: "Regular exercise reduces stress by __________.", 
          options: ["(A) 10%", "(B) 30%", "(C) 50%", "(D) 70%"], 
          correct: 1,
          explanation: "Counselor: 'Studies show that regular exercise reduces stress by 30%.' (Nghiên cứu cho thấy tập thể dục đều đặn giảm stress 30%.) - Kiến thức ngữ pháp: Mệnh đề quan hệ 'that + clause' sau 'show'; cụm 'reduce by + phần trăm' chỉ mức độ thay đổi, với thì hiện tại đơn 'reduces' cho sự thật chung."
        },
        { 
          id: 13, 
          question: "Only __________ of students meet activity levels.", 
          options: ["(A) 10%", "(B) 40%", "(C) 60%", "(D) 90%"], 
          correct: 1,
          explanation: "Counselor: 'Only 40% of students meet the recommended activity levels.' (Chỉ 40% sinh viên đạt mức hoạt động khuyến nghị.) - Kiến thức ngữ pháp: 'Only + số % + of + danh từ' chỉ tỷ lệ hạn chế; thì hiện tại đơn 'meet' mô tả tình trạng hiện tại dựa trên dữ liệu."
        },
        { 
          id: 14, 
          question: "Anna transformed her grades by __________.", 
          options: ["(A) ignoring self-care", "(B) prioritizing self-care", "(C) skipping classes", "(D) no routines"], 
          correct: 1,
          explanation: "Counselor: 'Anna... transformed her grades by prioritizing self-care routines.' (Anna cải thiện điểm số bằng cách ưu tiên thói quen tự chăm sóc.) - Kiến thức ngữ pháp: 'By + V-ing' chỉ phương tiện (means); thì quá khứ đơn 'transformed' cho thay đổi hoàn tất, với 'prioritizing' song song."
        },
        { 
          id: 15, 
          question: "Aim for __________ hours of sleep nightly.", 
          options: ["(A) five to six", "(B) seven to nine", "(C) ten to twelve", "(D) no aim"], 
          correct: 1,
          explanation: "Counselor: 'Aim for seven to nine hours nightly.' (Nhắm đến bảy đến chín giờ mỗi đêm.) - Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'aim for + khoảng số + danh từ' chỉ lời khuyên; 'to + số' chỉ phạm vi, với trạng từ 'nightly' chỉ tần suất thường xuyên."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn) giữa bệnh nhân và bác sĩ về giáo dục dinh dưỡng. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Student: Hi, Smith. I'm here for advice on my diet—I've been feeling fatigued lately.\nSmith: I see, Ben. Fatigue often stems from nutritional gaps. Have you been eating balanced meals?\nStudent: Not really. I skip breakfast and rely on fast food for lunch. My schedule is packed with classes.\nSmith: That's common among students. Let's create a plan: incorporate fruits and veggies daily. Also, hydrate—aim for eight glasses of water. If symptoms persist, we'll test for deficiencies.\nStudent: Will this help with focus in lectures?\nSmith: Definitely. Proper nutrition enhances concentration. Follow up in two weeks; I'll review your progress.",
      questions: [
        { 
          id: 16, 
          question: "The student feels __________.", 
          options: ["(A) energetic", "(B) fatigued", "(C) hungry", "(D) relaxed"], 
          correct: 1,
          explanation: "Student: 'I've been feeling fatigued lately.' (Tôi đang cảm thấy mệt mỏi gần đây.) - Kiến thức ngữ pháp: Thì hiện tại hoàn thành tiếp diễn 'have been feeling' chỉ trạng thái kéo dài; trạng từ 'lately' chỉ khoảng thời gian gần đây liên quan đến sức khỏe."
        },
        { 
          id: 17, 
          question: "Fatigue often stems from __________.", 
          options: ["(A) too much sleep", "(B) nutritional gaps", "(C) no classes", "(D) excess water"], 
          correct: 1,
          explanation: "Smith: 'Fatigue often stems from nutritional gaps.' (Mệt mỏi thường xuất phát từ khoảng trống dinh dưỡng.) - Kiến thức ngữ pháp: Động từ 'stem from + danh từ' chỉ nguồn gốc (originate from); trạng từ 'often' chỉ tần suất, với thì hiện tại đơn 'stems' cho sự thật chung."
        },
        { 
          id: 18, 
          question: "The student skips __________.", 
          options: ["(A) dinner", "(B) breakfast", "(C) snacks", "(D) all meals"], 
          correct: 1,
          explanation: "Student: 'I skip breakfast and rely on fast food for lunch.' (Tôi bỏ bữa sáng và dựa vào đồ ăn nhanh cho bữa trưa.) - Kiến thức ngữ pháp: Động từ 'skip + danh từ' chỉ bỏ qua; 'and' nối hai hành động song song, với thì hiện tại đơn 'skip' và 'rely' mô tả thói quen."
        },
        { 
          id: 19, 
          question: "Incorporate __________ daily.", 
          options: ["(A) fast food", "(B) fruits and veggies", "(C) no food", "(D) only water"], 
          correct: 1,
          explanation: "Smith: 'Incorporate fruits and veggies daily.' (Kết hợp trái cây và rau củ hàng ngày.) - Kiến thức ngữ pháp: Động từ 'incorporate + danh từ' chỉ thêm vào; trạng từ 'daily' chỉ tần suất, trong cấu trúc gợi ý ngầm với thì hiện tại đơn cho lời khuyên chung."
        },
        { 
          id: 20, 
          question: "Follow up in __________ weeks.", 
          options: ["(A) one", "(B) two", "(C) three", "(D) no follow-up"], 
          correct: 1,
          explanation: "Smith: 'Follow up in two weeks.' (Theo dõi sau hai tuần.) - Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'follow up + in + thời gian' chỉ lịch hẹn tương lai; thì hiện tại đơn 'follow' cho hành động dự định, nhấn mạnh theo dõi tiến độ sức khỏe."
        }
      ]
    },
    // Reading Parts - Giữ nguyên cấu trúc, thêm chi tiết ngữ pháp
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
      type: "reading",
      questions: [
        {
          id: 21,
          question: "Regular physical activity is essential for maintaining good cardiovascular __________. ",
          options: ["healthy", "health", "healthier", "healthily"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'health' vì đây là danh từ chỉ 'sức khỏe tim mạch', phù hợp sau 'cardiovascular'. Kiến thức ngữ pháp: Danh từ 'health' làm tân ngữ của 'maintaining'; phân biệt tính từ (A), so sánh hơn (C), trạng từ (D) không phù hợp vị trí này."
        },
       {
        id: 22,
        question: "The university offers a variety of elective courses __________ students can choose based on their interests.",
        options: ["that", "where", "who", "what"],
        correct: 0,
        explanation:
          "Chọn **that** vì cần một đại từ quan hệ chỉ *vật* (courses) làm tân ngữ cho động từ 'choose'.\n\n" +
          "- 'that' → đúng: courses that students can choose\n" +
          "- 'where' → sai: chỉ nơi chốn\n" +
          "- 'who' → sai: chỉ người\n" +
          "- 'what' → sai: không dùng nối mệnh đề như đại từ quan hệ"
      },
        {
          id: 23,
          question: "Since the pandemic, online learning platforms __________ become increasingly popular among educators.",
          options: ["have", "has", "had", "having"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'have' vì chủ ngữ số nhiều 'platforms' yêu cầu động từ số nhiều trong thì hiện tại hoàn thành. Kiến thức ngữ pháp: 'Since + mốc thời gian' + hiện tại hoàn thành 'have + V3' chỉ hành động từ quá khứ đến nay; 'has' (số ít), 'had' (quá khứ), 'having' (V-ing) không khớp."
        },
        {
          id: 24,
          question: "To promote mental well-being, the school counselor recommends practicing mindfulness __________.",
          options: ["technique", "techniques", "technical", "technically"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'techniques' vì danh từ số nhiều chỉ 'các kỹ thuật' đa dạng. Kiến thức ngữ pháp: Danh từ số nhiều sau 'practicing' (gerund); 'technique' (số ít), 'technical' (tính từ), 'technically' (trạng từ) không phù hợp làm tân ngữ."
        },
        {
          id: 25,
          question: "The research findings suggest that adequate sleep __________ cognitive performance in adolescents.",
          options: ["improve", "improves", "improved", "improving"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'improves' vì chủ ngữ số ít 'sleep' yêu cầu động từ ngôi thứ ba số ít thì hiện tại đơn. Kiến thức ngữ pháp: Cấu trúc 'suggest that + S + V (số ít)' cho sự thật; 'improve' (nguyên thể), 'improved' (quá khứ), 'improving' (V-ing) không phù hợp."
        },
        {
          id: 26,
          question: "Before enrolling in advanced biology, students must complete the prerequisite __________ course.",
          options: ["foundational", "foundation", "founded", "founding"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'foundational' vì tính từ chỉ 'cơ bản' mô tả 'course'. Kiến thức ngữ pháp: Tính từ 'foundational' đứng trước danh từ; 'foundation' (danh từ), 'founded' (quá khứ), 'founding' (V-ing) không làm modifier."
        },
        {
          id: 27,
          question: "The health fair will feature workshops on nutrition, __________ participants can learn practical meal-planning skills.",
          options: ["after", "before", "where", "unless"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'where' vì chỉ nơi chốn/ ngữ cảnh học hỏi (tại hội chợ). Kiến thức ngữ pháp: Đại từ quan hệ 'where' giới thiệu mệnh đề quan hệ cho 'workshops'; 'after/before' (thời gian), 'unless' (điều kiện) không phù hợp."
        },
        {
          id: 28,
          question: "Educators should encourage students to adopt healthy habits __________ an early age.",
          options: ["in", "on", "at", "from"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'from' vì cụm 'from an early age' chỉ thời điểm bắt đầu. Kiến thức ngữ pháp: Giới từ 'from + thời điểm' chỉ nguồn gốc thời gian; 'in/on/at' dùng cho khoảng/giờ/điểm cụ thể, không phù hợp với 'age' trừu tượng."
        },
        {
          id: 29,
          question: "The yoga class has been postponed __________ next Tuesday due to instructor illness.",
          options: ["until", "during", "by", "for"],
          correct: 0,
          explanation: "**Đáp án đúng:** (A) 'until'\n\nCâu này sử dụng **THÌ HIỆN TẠI HOÀN THÀNH BỊ ĐỘNG** với giới từ **'until'** để chỉ **THỜI ĐIỂM HOÃN LẠI**.\n\n**Cấu trúc:** **'postpone + UNTIL + thời gian'** = hoãn lại ĐẾN KHI (thời điểm trong tương lai)\n\n**Ý nghĩa:**\n- **'Postponed until next Tuesday'** = bị hoãn lại **đến** thứ Ba tuần sau\n- Nghĩa: Lớp học sẽ KHÔNG diễn ra trước thứ Ba, và có thể diễn ra VÀO hoặc SAU thứ Ba\n- → Lớp học bị GÁC LẠI cho đến khi đạt mốc thời gian 'next Tuesday'\n\n**So sánh các đáp án:**\n\n**(A) 'until' → ĐÚNG!**\n- Nghĩa: **ĐẾN KHI** (up to the time when)\n- Dùng để chỉ một hành động kéo dài/trì hoãn CHO ĐẾN một thời điểm\n- \"Postponed **until** Tuesday\" = hoãn **đến** thứ Ba (có thể diễn ra vào hoặc sau thứ Ba)\n\n**(B) 'during' → SAI**\n- Nghĩa: **TRONG SUỐT** (throughout a period)\n- Dùng để chỉ một hành động diễn ra TRONG khoảng thời gian\n- \"During Tuesday\" = suốt ngày thứ Ba → KHÔNG hợp lý với 'postponed'\n\n**(C) 'by' → SAI** (đã thay thế 'to' để rõ ràng hơn)\n- Nghĩa: **TRƯỚC/CHẬM NHẤT** (not later than)\n- Dùng để chỉ DEADLINE (hạn chót)\n- \"Postponed **by** Tuesday\" → Không tự nhiên, 'by' thường dùng với 'complete/finish', không dùng với 'postpone'\n- Ví dụ đúng: \"The report must be submitted **by** Friday.\" ✓\n\n**(D) 'for' → SAI**\n- Nghĩa: **TRONG KHOẢNG** (duration)\n- Dùng để chỉ KHOẢNG THỜI GIAN (for 3 days, for a week)\n- \"Postponed **for** next Tuesday\" → SAI ngữ pháp (phải là 'for + khoảng thời gian', không phải 'for + thời điểm cụ thể')\n- Ví dụ đúng: \"Postponed **for** two weeks.\""
        },
        {
          id: 30,
          question: "Balanced nutrition plays a crucial role in supporting overall student __________ and academic success.",
          options: ["develop", "development", "developed", "developing"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'development' vì danh từ chỉ 'sự phát triển'. Kiến thức ngữ pháp: Danh từ 'development' sau 'student' (sở hữu ngầm); 'develop' (động từ), 'developed' (quá khứ), 'developing' (V-ing) không làm tân ngữ của 'supporting'."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email về hội thảo giáo dục sức khỏe. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Faculty and Students
From: Dr. Anna Lee, Wellness Coordinator  
Subject: Upcoming Health Education Seminar Series


Dear Campus Community,

We are excited to announce the launch of our new Health Education Seminar Series, beginning on March 15. This initiative aims to empower participants with knowledge on preventive care and mental resilience, addressing common challenges faced by students and staff alike.

The first seminar, "Nutrition for Optimal Learning," will be held in Lecture Hall A at 2:00 p.m. Led by nutrition expert Sarah Kim, it will explore how dietary choices (31) academic performance. Attendance is free, but pre-registration is required to (32) limited seating.

Subsequent sessions include "Stress Management Techniques" on March 22 and "Physical Fitness in Academic Life" on March 29. Each seminar lasts 90 minutes (34) includes interactive Q&A. Materials will be provided to help attendees (33) what they've learned into daily routines.

For those unable to attend in person, recordings will be available on the wellness portal within 48 hours. We encourage departments to promote these events (35) consider group attendance for team-building.

If you have suggestions for future topics, please reply to this email. Together, we can foster a healthier, more supportive learning environment.

Best regards,

Dr. Anna Lee
Wellness Coordinator
University Health Services`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "...explore how dietary choices (31) academic performance.",
          options: ["affect", "ignore", "delay", "avoid"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'affect' vì nghĩa 'ảnh hưởng', phù hợp 'how dietary choices affect' (cách lựa chọn ăn uống ảnh hưởng). Kiến thức ngữ pháp: Động từ 'affect' + tân ngữ (performance) trong mệnh đề quan hệ 'how + clause'; thì hiện tại đơn cho sự thật chung."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "...pre-registration is required to (32) limited seating.",
          options: ["fill", "secure", "waste", "expand"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'secure' vì nghĩa 'đảm bảo', phù hợp 'to secure limited seating' (để giữ chỗ hạn chế). Kiến thức ngữ pháp: 'To + V nguyên thể' chỉ mục đích sau 'required'; 'secure' + tân ngữ chỉ bảo đảm."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...help attendees (33) what they've learned into daily routines.",
          options: ["apply", "forget", "repeat", "store"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'apply' vì nghĩa 'áp dụng', phù hợp 'apply what they've learned' (áp dụng những gì đã học). Kiến thức ngữ pháp: 'Apply + tân ngữ' trong cấu trúc 'help + to V' (có thể bỏ 'to'); mệnh đề quan hệ 'what they've learned' làm tân ngữ."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "Each seminar lasts 90 minutes (34) includes interactive Q&A.",
          options: ["but", "and", "or", "so"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'and' vì nối hai hành động song song (lasts and includes). Kiến thức ngữ pháp: Liên từ 'and' nối hai mệnh đề độc lập; 'but' (tương phản), 'or' (lựa chọn), 'so' (kết quả) không phù hợp ngữ cảnh mô tả."
        },
        {
        id: 35,
        question:
          "We encourage departments to promote these events ___ consider group attendance for team-building.",
        options: ["and", "but", "or", "so"],
        correct: 0,
        explanation:
          "Đáp án đúng: (A) and.\nHai hành động 'promote these events' và 'consider group attendance' song song, nên cần liên từ nối hai động từ cùng chức năng."
      },
        {
          id: 36,
          type: "comprehension",
          question: "(36) - The first seminar is on ___.",
          options: ["Stress management", "Nutrition for Optimal Learning", "Physical fitness", "Mental resilience"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'The first seminar, \"Nutrition for Optimal Learning\"' (Hội thảo đầu tiên về Dinh dưỡng cho Học tập Tối ưu). Kiến thức đọc hiểu: Xác định chủ đề từ phần mở đầu."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - What is required for attendance?",
          options: ["Payment", "Pre-registration", "Department approval", "Doctor's note"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'pre-registration is required' (cần đăng ký trước). Kiến thức đọc hiểu: Yêu cầu từ phần đăng ký."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - How long does each seminar last?",
          options: ["60 minutes", "90 minutes", "120 minutes", "Not specified"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Each seminar lasts 90 minutes' (Mỗi hội thảo kéo dài 90 phút). Kiến thức đọc hiểu: Thời lượng từ mô tả sự kiện."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - When will recordings be available?",
          options: ["Immediately", "Within 48 hours", "Next week", "Not available"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'within 48 hours' (trong 48 giờ). Kiến thức đọc hiểu: Thời gian từ phần hỗ trợ trực tuyến."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - Who leads the first seminar?",
          options: ["Dr. Anna Lee", "Sarah Kim", "Wellness Coordinator", "Faculty member"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Led by nutrition expert Sarah Kim' (Do chuyên gia dinh dưỡng Sarah Kim dẫn dắt). Kiến thức đọc hiểu: Người dẫn từ phần mô tả."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo khóa học sức khỏe và email đăng ký, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**Mindful Learning Academy Advertisement**

  Empower Your Mind: Online Courses in Health and Education

  Discover transformative online courses designed for busy professionals and students. Our certified programs blend education psychology with wellness strategies.

  **Featured Courses:**
  1. **Stress Reduction for Students** – Learn evidence-based techniques to balance academics and mental health. 8 weeks, $199.

  2. **Nutrition Essentials for Learners** – Understand how diet fuels cognitive function. Includes meal plans and quizzes.

  3. **Holistic Wellness Certification** – Comprehensive training in physical and emotional health. CE credits available for educators.

  Enroll today at mindfullearning.com. Flexible pacing, 24/7 access, and a 30-day money-back guarantee. Join thousands who've improved their well-being!

  ---

  **Email Message**

  **To:** enroll@mindfullearning.com
  **From:** lisa.parker@eduuniversity.edu
  **Date:** February 10
  **Subject:** Course Enrollment Inquiry

  Hello Mindful Learning Team,

  I saw your ad on the Education Today blog and am a high school teacher interested in your offerings. I'd like to enroll in "Stress Reduction for Students" to better support my classes. As an educator, do you offer discounts or CE credits? My budget is around $150, and I need to start soon for the spring semester. Also, is the course fully asynchronous?

  Please send details and enrollment steps. Available for a quick call Thursday morning.

  Thank you,
  Lisa Parker
  History Teacher, EduUniversity
  555-0123 (school)
  123 Scholar Lane, Boston, MA 02115`,
      questions: [
        {
          id: 41,
          question: "According to the advertisement, what is the cost of the Stress Reduction course?",
          options: ["$99", "$149", "$199", "$299"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì '8 weeks, $199' (8 tuần, 199 đô). Kiến thức đọc hiểu: Giá từ phần mô tả khóa học."
        },
        {
          id: 42,
          question: "How did Ms. Parker learn about the academy?",
          options: ["From a friend", "From TV", "From Education Today blog", "From email"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'I saw your ad on the Education Today blog' (Tôi thấy quảng cáo trên blog Education Today). Kiến thức suy luận: Nguồn từ email."
        },
        {
          id: 43,
          question: "What is Ms. Parker's profession?",
          options: ["College professor", "High school teacher", "Nutritionist", "Student"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'a high school teacher' (giáo viên trung học). Kiến thức đọc hiểu: Vai trò từ phần giới thiệu."
        },
        {
          id: 44,
          question: "Which course does Ms. Parker want to enroll in?",
          options: ["Nutrition Essentials", "Holistic Wellness", "Stress Reduction for Students", "All courses"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì '\"Stress Reduction for Students\"' (Giảm stress cho sinh viên). Kiến thức đọc hiểu: Khóa học cụ thể từ yêu cầu."
        },
        {
          id: 45,
          question: "What does Ms. Parker ask about CE credits?",
          options: ["For students", "For educators", "Not mentioned", "For nutritionists"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'do you offer... CE credits? As an educator' (có cung cấp tín chỉ CE không? Là giáo viên). Kiến thức đọc hiểu: Yêu cầu từ ngữ cảnh nghề nghiệp."
        },
        {
          id: 46,
          question: "What is Ms. Parker's budget?",
          options: ["$100", "$150", "$200", "Unlimited"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'My budget is around $150' (Ngân sách khoảng 150 đô). Kiến thức đọc hiểu: Giới hạn tài chính từ email."
        },
        {
          id: 47,
          question: "When does Ms. Parker need to start?",
          options: ["Summer", "Fall semester", "Spring semester", "Next year"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'start soon for the spring semester' (bắt đầu sớm cho học kỳ xuân). Kiến thức đọc hiểu: Thời gian từ lý do cấp bách."
        },
        {
          id: 48,
          question: "Is the course asynchronous according to the inquiry?",
          options: ["She asks if it's fully asynchronous", "It's synchronous", "Not mentioned", "It's hybrid"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'is the course fully asynchronous?' (khóa học có hoàn toàn không đồng bộ?). Kiến thức đọc hiểu: Câu hỏi từ email."
        },
        {
          id: 49,
          question: "When is Ms. Parker available for a call?",
          options: ["Wednesday afternoon", "Thursday morning", "Friday evening", "Anytime"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Available for a quick call Thursday morning' (Có sẵn thứ Năm sáng). Kiến thức đọc hiểu: Lịch từ email."
        },
        {
          id: 50,
          question: "What guarantee does the advertisement offer?",
          options: ["Lifetime access", "30-day money-back", "Free enrollment", "No guarantee"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì '30-day money-back guarantee' (bảo đảm hoàn tiền 30 ngày). Kiến thức đọc hiểu: Lợi ích từ quảng cáo."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn về tư vấn sức khỏe học đường, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Parent (09:15): Hi Counselor, my daughter Anna is struggling with anxiety before exams. Any advice?
  Counselor (09:20): Hello! Common issue. Suggest deep breathing exercises daily. Resources on school portal.
  Parent (09:25): Thanks. She's also skipping meals. Nutrition link?
  Counselor (09:30): Yes, check "Healthy Eating Guide" PDF. Hydrate too—stress dehydrates.
  Parent (14:45): Tried breathing; helped a bit. Workshop signup?
  Counselor (14:50): Great progress! Next teen wellness workshop: March 5, 4pm. Link: bit.ly/schoolwellness.`,
      questions: [
        {
          id: 51,
          question: "What is Anna struggling with?",
          options: ["Good grades", "Anxiety before exams", "Too much sleep", "Overeating"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'struggling with anxiety before exams' (đang gặp khó khăn với lo lắng trước kỳ thi). Kiến thức suy luận: Vấn đề chính từ tin nhắn đầu."
        },
        {
          id: 52,
          question: "What does the counselor suggest first?",
          options: ["Skip school", "Deep breathing exercises", "Eat junk food", "No resources"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Suggest deep breathing exercises daily' (Gợi ý bài tập thở sâu hàng ngày). Kiến thức đọc hiểu: Lời khuyên ban đầu."
        },
        {
          id: 53,
          question: "Where are resources located?",
          options: ["Email", "School portal", "Bookstore", "Not specified"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Resources on school portal' (Tài nguyên trên cổng trường). Kiến thức đọc hiểu: Vị trí từ phản hồi."
        },
        {
          id: 54,
          question: "What else is Anna doing?",
          options: ["Eating well", "Skipping meals", "Exercising daily", "Sleeping enough"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'She's also skipping meals' (Cô ấy cũng bỏ bữa). Kiến thức đọc hiểu: Vấn đề thứ hai từ phụ huynh."
        },
        {
          id: 55,
          question: "What PDF is recommended?",
          options: ["Exercise Guide", "Healthy Eating Guide", "Anxiety Workbook", "Sleep Tips"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì '\"Healthy Eating Guide\" PDF' (Hướng dẫn Ăn uống Lành mạnh). Kiến thức đọc hiểu: Tài liệu cụ thể."
        },
        {
          id: 56,
          question: "What helped a bit?",
          options: ["Meals", "Breathing exercises", "Workshop", "Hydration"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Tried breathing; helped a bit' (Thử thở; giúp một chút). Kiến thức suy luận: Tiến bộ từ cập nhật."
        },
        {
          id: 57,
          question: "When is the next workshop?",
          options: ["March 5, 4pm", "March 15, 2pm", "April 1, noon", "Not dated"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'Next teen wellness workshop: March 5, 4pm' (Hội thảo sức khỏe thiếu niên tiếp theo: 5/3, 4h chiều). Kiến thức đọc hiểu: Lịch từ gợi ý."
        },
        {
          id: 58,
          question: "What does stress do according to the counselor?",
          options: ["Increases energy", "Dehydrates", "Improves focus", "Reduces anxiety"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'stress dehydrates' (stress gây mất nước). Kiến thức đọc hiểu: Lời khuyên bổ sung."
        },
        {
          id: 59,
          question: "What is provided for the workshop?",
          options: ["No link", "Signup link", "Fee info", "Location only"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Link: bit.ly/schoolwellness' (Liên kết đăng ký). Kiến thức suy luận: Hỗ trợ tham gia."
        },
        {
          id: 60,
          question: "What is the counselor's response to progress?",
          options: ["Ignore it", "Great progress!", "Too late", "Cancel"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Great progress!' (Tiến bộ tuyệt vời!). Kiến thức đọc hiểu: Phản ứng tích cực."
        }
      ]
    }
  }
};