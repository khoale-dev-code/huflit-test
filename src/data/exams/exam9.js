export const EXAM9_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 9 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Lisa và Ben về lớp học nấu ăn. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Lisa: Ben, are you still taking that Italian cooking class? How's it going?\nBen: It's fantastic, Lisa. Last session we made pasta from scratch—it took hours, but the taste was incredible. I wish we had more time to practice at home.\nLisa: Sounds fun. I tried baking bread once, but it turned out like a rock. Maybe I need a class like yours.\nBen: You should join! Next week is desserts—tiramisu and gelato. But the instructor said it's intense; beginners might struggle with the timing.\nLisa: Hmm, tempting, but I'm swamped with work. Is there an online version for busy people like me?",
      questions: [
        {
          id: 1,
          options: [
            "They practiced at home daily.",
            "The pasta was disappointing.",
            "They made pasta from scratch.",
            "It took minutes to make."
          ],
          correct: 2,
          explanation: "Ben nói: 'Last session we made pasta from scratch—it took hours, but the taste was incredible.' (Tuần trước chúng tôi làm pasta từ đầu—mất hàng giờ, nhưng vị ngon tuyệt.) - Ngữ pháp lưu ý: Cấu trúc 'made ... from scratch' là cụm từ cố định nghĩa là 'làm từ nguyên liệu cơ bản, không dùng đồ sẵn'. 'It took hours' sử dụng thì quá khứ đơn (took) để mô tả thời gian kéo dài của hành động đã hoàn thành, kết hợp với 'but' để đối lập với kết quả tích cực ('taste was incredible')."
        },
        {
          id: 2,
          options: [
            "She practices cooking often.",
            "Her bread turned out like a rock.",
            "She wants to join the class.",
            "Baking bread was easy for her."
          ],
          correct: 1,
          explanation: "Lisa nói: 'I tried baking bread once, but it turned out like a rock.' (Tôi thử nướng bánh mì một lần, nhưng nó cứng như đá.) - Ngữ pháp lưu ý: 'Tried baking' sử dụng 'try + V-ing' để chỉ việc thử nghiệm một hoạt động. 'Turned out like' là cụm từ mô tả kết quả bất ngờ, với 'like' làm giới từ so sánh. 'But' nối hai mệnh đề đối lập: nỗ lực (tried) và kết quả thất bại (turned out like a rock)."
        },
        {
          id: 3,
          options: [
            "Next week is savory dishes.",
            "The class is only for experts.",
            "Next week is desserts like tiramisu.",
            "Desserts are easy for beginners."
          ],
          correct: 2,
          explanation: "Ben nói: 'Next week is desserts—tiramisu and gelato.' (Tuần sau là món tráng miệng—tiramisu và gelato.) - Ngữ pháp lưu ý: 'Next week is desserts' sử dụng thì hiện tại đơn (is) để nói về lịch trình tương lai đã lên kế hoạch. Dấu gạch ngang (—) dùng để liệt kê ví dụ cụ thể (tiramisu and gelato), tương đương với 'such as' hoặc 'like', giúp làm rõ nội dung."
        },
        {
          id: 4,
          options: [
            "Work is not an issue for her.",
            "Beginners might struggle with timing.",
            "It's only online now.",
            "The class is relaxed."
          ],
          correct: 1,
          explanation: "Ben nói: 'The instructor said it's intense; beginners might struggle with the timing.' (Giảng viên nói nó căng thẳng; người mới có thể gặp khó với thời gian.) - Ngữ pháp lưu ý: 'Might struggle' là modal verb 'might' + động từ nguyên thể để diễn tả khả năng thấp hoặc dự đoán tiêu cực. Dấu chấm phẩy (;) nối hai mệnh đề liên quan: mô tả chung (intense) và chi tiết (beginners might struggle). 'With the timing' dùng giới từ 'with' để chỉ khó khăn cụ thể."
        },
        {
          id: 5,
          options: [
            "Online versions are unavailable.",
            "She is swamped with work.",
            "She prefers in-person classes.",
            "She has free time soon."
          ],
          correct: 1,
          explanation: "Lisa nói: 'I'm swamped with work.' (Tôi bận rộn với công việc.) - Ngữ pháp lưu ý: 'I'm swamped with' là cụm từ idiomatic nghĩa 'bận rộn quá tải', với 'with' làm giới từ chỉ nguyên nhân. Thì hiện tại tiếp diễn (I'm = I am) nhấn mạnh tình trạng hiện tại kéo dài. Câu hỏi ở cuối ('Is there an online version...') sử dụng thì hiện tại đơn để hỏi về tình hình chung."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người về lập kế hoạch sự kiện từ thiện. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At a community center.\nAnna: Hi team, let's brainstorm the charity fundraiser. Theme: eco-awareness.\nMark: Great, Anna. I suggest a recycling workshop—people bring items to upcycle.\nSarah: Love it. For food, vegan potluck to tie in sustainability. Who's volunteering to cook?\nMark: I'll handle desserts—plant-based treats. But venue: the park or indoor hall?\nAnna: Park for eco-vibe, but check weather. Last year's rain was a disaster.\nSarah: True. Budget: we have $500—prioritize flyers and prizes.\nMark: Agreed. Let's assign tasks now to meet the deadline.",
      questions: [
        {
          id: 6,
          question: "What is the theme of the fundraiser?",
          options: [
            "Art and crafts",
            "Eco-awareness",
            "Health and fitness",
            "Music festival"
          ],
          correct: 1,
          explanation: "Anna nói: 'Theme: eco-awareness.' (Chủ đề: nhận thức về môi trường.) - Ngữ pháp lưu ý: Cấu trúc 'Theme: eco-awareness' là dạng rút gọn, sử dụng dấu hai chấm (:) để giới thiệu trực tiếp nội dung, tương tự như tiêu đề phụ. 'Let's brainstorm' sử dụng 'let's + V nguyên thể' để đề xuất hành động nhóm."
        },
        {
          id: 7,
          question: "What does Mark suggest for activities?",
          options: [
            "A book sale",
            "A recycling workshop",
            "A yoga session",
            "A cooking demo"
          ],
          correct: 1,
          explanation: "Mark nói: 'I suggest a recycling workshop—people bring items to upcycle.' (Tôi gợi ý hội thảo tái chế—mọi người mang đồ để tái sử dụng.) - Ngữ pháp lưu ý: 'I suggest + noun phrase' để đưa ra gợi ý. Dấu gạch ngang (—) dùng để giải thích thêm (people bring items...), với 'to upcycle' là động từ nguyên thể chỉ mục đích."
        },
        {
          id: 8,
          question: "What will the food be?",
          options: [
            "No food",
            "Vegan potluck",
            "Fast food",
            "Barbecue"
          ],
          correct: 1,
          explanation: "Sarah nói: 'For food, vegan potluck to tie in sustainability.' (Đồ ăn: potluck chay để liên kết với bền vững.) - Ngữ pháp lưu ý: 'To tie in' là động từ nguyên thể chỉ mục đích, nối với cụm danh từ 'vegan potluck'. 'For food' dùng giới từ 'for' để giới thiệu chủ đề cụ thể trong hội thoại."
        },
        {
          id: 9,
          question: "What will Mark handle?",
          options: [
            "Weather check",
            "Plant-based desserts",
            "Venue booking",
            "Flyers"
          ],
          correct: 1,
          explanation: "Mark nói: 'I'll handle desserts—plant-based treats.' (Tôi lo tráng miệng—món chay.) - Ngữ pháp lưu ý: 'I'll handle' sử dụng thì tương lai đơn (will + V nguyên thể) để cam kết hành động. Dấu gạch ngang (—) giới thiệu ví dụ cụ thể (plant-based treats), với 'plant-based' là tính từ ghép mô tả đặc tính."
        },
        {
          id: 10,
          question: "What was a problem last year?",
          options: [
            "No volunteers",
            "Rain disaster",
            "Budget overrun",
            "Low attendance"
          ],
          correct: 1,
          explanation: "Anna nói: 'Last year's rain was a disaster.' (Mưa năm ngoái là thảm họa.) - Ngữ pháp lưu ý: 'Last year's rain' sử dụng sở hữu cách ('s) để chỉ thuộc về năm ngoái. Thì quá khứ đơn (was) mô tả sự kiện đã xảy ra, với 'but' nối ý cảnh báo (check weather) và ví dụ quá khứ."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor A: Good morning, students. Our lecture today covers renewable energy sources, vital for combating climate change despite high initial costs. Your quiz results are in—class average 8.1, excellent work. Extensions for assignments require prior approval; otherwise, penalties apply, as seen with last semester's group. On a lighter note, the library's new green corner features solar-powered chargers and recycled furniture—perfect for sustainable study sessions.",
      questions: [
        {
          id: 11,
          question: "Renewable energy is __________ for climate change.",
          options: ["(A) expensive", "(B) harmful", "(C) vital", "(D) optional"],
          correct: 2,
          explanation: "Professor A: 'Vital for combating climate change.' (Quan trọng để chống biến đổi khí hậu.) - Luyện nghe tầm quan trọng chủ đề. Ngữ pháp lưu ý: 'Vital for + V-ing' sử dụng giới từ 'for' theo sau tính từ 'vital' để chỉ mục đích, với 'despite high initial costs' là cụm giới từ chỉ sự nhượng bộ, tương đương 'although'."
        },
        {
          id: 12,
          question: "Your __________ are in.",
          options: ["(A) penalties", "(B) books", "(C) quiz results", "(D) excuses"],
          correct: 2,
          explanation: "Professor A: 'Your quiz results are in—class average 8.1.' (Kết quả bài kiểm tra của các bạn đã có—trung bình lớp 8.1.) - Luyện nghe thông báo kết quả. Ngữ pháp lưu ý: 'Are in' là cụm động từ nghĩa 'đã có sẵn', với dấu gạch ngang (—) giới thiệu chi tiết bổ sung (class average). 'Excellent work' là câu tỉnh lược chủ ngữ để khen ngợi."
        },
        {
          id: 13,
          question: "Extensions require __________.",
          options: ["(A) group vote", "(B) prior approval", "(C) extra fees", "(D) no approval"],
          correct: 1,
          explanation: "Professor A: 'Extensions for assignments require prior approval.' (Gia hạn bài tập cần phê duyệt trước.) - Luyện nghe quy định học tập. Ngữ pháp lưu ý: 'Require + noun' để chỉ yêu cầu cần thiết. 'Prior approval' là tính từ 'prior' (trước) + danh từ, với 'for assignments' dùng giới từ 'for' chỉ đối tượng."
        },
        {
          id: 14,
          question: "Last semester's group __________ penalties.",
          options: ["(A) ignored", "(B) applied for", "(C) saw", "(D) avoided"],
          correct: 2,
          explanation: "Professor A: 'Penalties apply, as seen with last semester's group.' (Như nhóm kỳ trước đã thấy.) - Luyện nghe ví dụ hậu quả. Ngữ pháp lưu ý: 'As seen with' là cụm từ giới thiệu ví dụ, với 'as' nghĩa 'như'. 'Penalties apply' thì hiện tại đơn chỉ quy tắc chung; dấu chấm phẩy (;) nối với 'otherwise' chỉ điều kiện đối lập."
        },
        {
          id: 15,
          question: "The library's green corner features __________.",
          options: ["(A) plastic furniture", "(B) solar-powered chargers", "(C) noisy areas", "(D) all of the above"],
          correct: 1,
          explanation: "Professor A: 'Solar-powered chargers and recycled furniture.' (Sạc năng lượng mặt trời và đồ nội thất tái chế.) - Luyện nghe tiện ích bền vững. Ngữ pháp lưu ý: 'Features + noun' nghĩa 'có đặc điểm'. 'Solar-powered' và 'recycled' là tính từ ghép (past participle + noun) mô tả đặc tính. 'On a lighter note' là cụm từ chuyển tiếp sang chủ đề nhẹ nhàng hơn."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Student B: Hi, I'd like to enroll in the advanced yoga course. It's for stress management.\nCounselor: Welcome. When did you complete the beginner level?\nStudent B: Three months ago online.\nCounselor: Good. Any health concerns?\nStudent B: Minor back pain from desk work—no doctor's note, but I have my progress log.\nCounselor: The log works for us. Advanced sessions are vigorous; fees apply if beyond the trial period. We can verify your certification.\nStudent B: Understood. Can I start next session?\nCounselor: Yes, to build momentum quickly.",
      questions: [
        {
          id: 16,
          question: "The course is for __________.",
          options: ["(A) competition", "(B) fun", "(C) stress management", "(D) weight loss"],
          correct: 2,
          explanation: "Student B: 'It's for stress management.' (Nó để quản lý căng thẳng.) - Luyện nghe mục đích đăng ký. Ngữ pháp lưu ý: 'It's for + noun' dùng giới từ 'for' để chỉ mục đích. 'I'd like to enroll' sử dụng 'would like + to V' để diễn tả mong muốn lịch sự."
        },
        {
          id: 17,
          question: "The beginner level was completed __________.",
          options: ["(A) in person", "(B) three months ago", "(C) last year", "(D) tomorrow"],
          correct: 1,
          explanation: "Student B: 'Three months ago online.' (Ba tháng trước trực tuyến.) - Luyện nghe thời gian hoàn thành. Ngữ pháp lưu ý: 'Three months ago' là cụm thời gian quá khứ, kết hợp với thì quá khứ đơn ngầm hiểu (completed). 'Online' là trạng từ chỉ cách thức."
        },
        {
          id: 18,
          question: "The student has __________.",
          options: ["(A) fees paid", "(B) no proof", "(C) a progress log", "(D) a doctor's note"],
          correct: 2,
          explanation: "Student B: 'No doctor's note, but I have my progress log.' (Không có giấy bác sĩ, nhưng có nhật ký tiến độ.) - Luyện nghe tài liệu hỗ trợ. Ngữ pháp lưu ý: 'But' nối hai mệnh đề đối lập: phủ định (no doctor's note) và khẳng định (I have). 'From desk work' dùng giới từ 'from' chỉ nguyên nhân (minor back pain)."
        },
        {
          id: 19,
          question: "Advanced sessions are __________.",
          options: ["(A) online only", "(B) vigorous", "(C) free always", "(D) relaxed"],
          correct: 1,
          explanation: "Counselor: 'Advanced sessions are vigorous.' (Buổi nâng cao rất mạnh mẽ.) - Luyện nghe mức độ khóa học. Ngữ pháp lưu ý: 'Are vigorous' thì hiện tại đơn mô tả đặc tính chung. Dấu chấm phẩy (;) nối các ý liên quan: mô tả (vigorous) và điều kiện (fees apply if...). 'If beyond' là mệnh đề điều kiện loại 1."
        },
        {
          id: 20,
          question: "The counselor suggests __________.",
          options: ["(A) refunding fees", "(B) verifying certification", "(C) skipping trial", "(D) delaying start"],
          correct: 1,
          explanation: "Counselor: 'We can verify your certification.' (Chúng tôi có thể xác minh chứng chỉ của bạn.) - Luyện nghe quy trình kiểm tra. Ngữ pháp lưu ý: 'Can verify' là modal verb 'can' + V nguyên thể chỉ khả năng. 'To build momentum' là động từ nguyên thể chỉ mục đích của việc 'start next session'."
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
          question: "The seminar on leadership skills emphasized the importance of __________ decision-making in high-pressure situations.",
          options: ["quickness", "quicker", "quickly", "quick"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'quickly' vì trạng từ (adverb) bổ nghĩa cho danh từ 'decision-making' để mô tả cách thức (manner). Kiến thức ngữ pháp chi tiết: Trong cấu trúc 'the importance of + adjective/noun', nhưng ở đây 'quickly decision-making' là trạng từ sửa đổi danh từ ghép 'decision-making', tạo thành cụm danh từ mô tả tốc độ. Các lựa chọn khác: (A) 'quickness' là danh từ (noun), không phù hợp vì không phải là trạng từ; (B) 'quicker' là tính từ so sánh (comparative adjective), dùng để so sánh hai thứ, không phải bổ nghĩa danh từ; (D) 'quick' là tính từ (adjective), chỉ dùng để bổ nghĩa danh từ trực tiếp, không phải trạng từ. Lưu ý: Trạng từ thường kết thúc bằng '-ly' để chỉ cách thức, và ở đây nhấn mạnh 'quickly' để diễn tả hành động nhanh chóng trong tình huống áp lực cao."
        },
        {
          id: 22,
          question: "By the time the report was due, the analyst __________ all the financial data twice for accuracy.",
          options: ["verifying", "verifies", "had verified", "verify"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'had verified' vì sử dụng thì quá khứ hoàn thành (past perfect: had + V3) để chỉ hành động hoàn thành trước một thời điểm khác trong quá khứ ('by the time the report was due'). Kiến thức ngữ pháp chi tiết: Cấu trúc 'By the time + simple past, past perfect' nhấn mạnh thứ tự hành động: hành động 'verified' xảy ra trước 'was due'. Các lựa chọn khác: (A) 'verifying' là V-ing (gerund/present participle), dùng trong thì tiếp diễn, không phù hợp; (B) 'verifies' là thì hiện tại đơn ngôi thứ ba (present simple), dùng cho thói quen hiện tại, không khớp thời gian quá khứ; (D) 'verify' là động từ nguyên thể (infinitive), không dùng độc lập ở đây. Lưu ý: 'Twice for accuracy' là cụm trạng từ chỉ tần suất và mục đích, với 'for' giới từ chỉ lý do."
        },
        {
          id: 23,
          question: "The policy change affected all departments __________ the marketing team the most.",
          options: ["among", "except", "including", "besides"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'including' vì giới từ này chỉ việc bao gồm tất cả các bộ phận, với 'the marketing team the most' nhấn mạnh mức độ cao nhất. Kiến thức ngữ pháp chi tiết: 'Including' dùng để liệt kê ví dụ hoặc nhấn mạnh một phần trong toàn bộ, ở đây chỉ marketing bị ảnh hưởng nhiều nhất nhưng vẫn nằm trong 'all departments'. Các lựa chọn khác: (A) 'among' nghĩa 'giữa/giữa các', dùng để so sánh trong nhóm, không phù hợp; (B) 'except' nghĩa 'trừ ra', loại trừ marketing, trái nghĩa; (D) 'besides' nghĩa 'ngoài ra/thêm vào', dùng để thêm yếu tố bên ngoài, không khớp. Lưu ý: Cấu trúc 'affected all ... including ... the most' sử dụng 'the most' là hình thức so sánh nhất để nhấn mạnh mức độ."
        },
        {
          id: 24,
          question: "Renewable resources play a crucial role in __________ long-term environmental sustainability.",
          options: ["achieves", "achieved", "achieving", "achieve"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'achieving' vì V-ing (gerund) sau giới từ 'in' để tạo thành cụm danh động từ chỉ vai trò/mục đích. Kiến thức ngữ pháp chi tiết: Cấu trúc 'play a role in + V-ing' là mẫu cố định, nơi 'in' giới từ yêu cầu theo sau là danh động từ (gerund) để diễn tả hành động. Các lựa chọn khác: (A) 'achieves' là thì hiện tại đơn ngôi thứ ba, dùng cho chủ ngữ số ít, không phù hợp sau 'in'; (B) 'achieved' là quá khứ phân từ (past participle), dùng trong thì hoàn thành hoặc bị động; (D) 'achieve' là nguyên thể (infinitive), không dùng sau 'in' mà thường sau 'to'. Lưu ý: 'Long-term environmental sustainability' là danh từ ghép với tính từ 'long-term' bổ nghĩa."
        },
        {
          id: 25,
          question: "The board __________ that the merger would benefit shareholders in the coming years.",
          options: ["agreeing", "agrees", "agreed", "agree"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'agreed' vì thì quá khứ đơn (simple past) chỉ hành động hoàn thành trong quá khứ, theo sau là mệnh đề 'that' báo cáo ý kiến. Kiến thức ngữ pháp chi tiết: Trong cấu trúc 'subject + verb + that-clause', động từ 'agreed' ở thì quá khứ để báo cáo sự đồng ý đã xảy ra. Mệnh đề 'that the merger would benefit' sử dụng thì quá khứ tương lai (would + V) để backshift thì trong reported speech. Các lựa chọn khác: (A) 'agreeing' là V-ing, dùng trong tiếp diễn; (B) 'agrees' là hiện tại đơn, không khớp thời gian; (D) 'agree' là nguyên thể, không dùng với chủ ngữ số nhiều 'board'. Lưu ý: 'In the coming years' là cụm giới từ chỉ thời gian tương lai."
        },
        {
          id: 26,
          question: "All participants must register __________ to receive the workshop materials.",
          options: ["advanced", "in advance", "advancing", "advance"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'in advance' vì đây là cụm giới từ cố định nghĩa 'trước/trước thời hạn'. Kiến thức ngữ pháp chi tiết: 'In advance' là idiom, với 'in' giới từ + 'advance' danh từ, dùng làm trạng từ chỉ thời gian. Các lựa chọn khác: (A) 'advanced' là tính từ nghĩa 'nâng cao', không phù hợp; (C) 'advancing' là V-ing, dùng trong tiếp diễn; (D) 'advance' là danh từ đơn lẻ, thiếu giới từ 'in'. Lưu ý: 'Must register' là modal verb 'must' + V nguyên thể chỉ nghĩa vụ, và 'to receive' là infinitive of purpose chỉ mục đích."
        },
        {
          id: 27,
          question: "The experiment was conducted __________ strict safety protocols to minimize risks.",
          options: ["under", "for", "by", "with"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'under' vì giới từ này nghĩa 'dưới/theo' quy trình hoặc điều kiện. Kiến thức ngữ pháp chi tiết: 'Conducted under + noun' chỉ cách thức hoặc điều kiện thực hiện thí nghiệm. Các lựa chọn khác: (B) 'for' chỉ mục đích hoặc lợi ích; (C) 'by' chỉ phương tiện hoặc tác giả; (D) 'with' chỉ công cụ hoặc kèm theo. Lưu ý: 'Was conducted' là thì quá khứ bị động (passive voice: was + V3), nhấn mạnh hành động hơn chủ ngữ; 'to minimize' là infinitive of purpose chỉ mục đích."
        },
        {
          id: 28,
          question: "He spoke so __________ that the audience could barely follow his technical jargon.",
          options: ["rapidity", "rapid", "rapidly", "rapidly"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'rapidly' vì trạng từ bổ nghĩa động từ 'spoke' để chỉ cách thức (manner). Kiến thức ngữ pháp chi tiết: Cấu trúc 'so + adverb + that' chỉ mức độ dẫn đến kết quả, với 'rapidly' là trạng từ từ tính từ 'rapid' + '-ly'. Các lựa chọn khác: (A) 'rapidity' là danh từ, không bổ nghĩa động từ; (B) 'rapid' là tính từ, dùng cho danh từ; (D) trùng (C), nhưng chỉ một. Lưu ý: 'Could barely follow' là modal 'could' + adverb 'barely' chỉ khả năng hạn chế, với 'that' giới thiệu mệnh đề kết quả."
        },
        {
          id: 29,
          question: "The proposal __________ by the committee after careful review last Friday.",
          options: ["approves", "approving", "was approved", "approve"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'was approved' vì thì quá khứ bị động (passive: was + V3) nhấn mạnh đối tượng 'proposal' bị hành động. Kiến thức ngữ pháp chi tiết: Cấu trúc bị động dùng khi chủ ngữ thực hiện không quan trọng hoặc không biết, với 'by the committee' chỉ tác nhân. 'After careful review' là cụm giới từ chỉ thời gian sau. Các lựa chọn khác: (A) 'approves' là hiện tại đơn; (B) 'approving' là V-ing; (D) 'approve' là nguyên thể. Lưu ý: 'Last Friday' là mốc thời gian quá khứ xác định."
        },
        {
          id: 30,
          question: "Global trade agreements are designed to __________ economic disparities between nations.",
          options: ["reduce", "reduces", "reduced", "reducing"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'reduce' vì động từ nguyên thể (infinitive) sau 'to' chỉ mục đích. Kiến thức ngữ pháp chi tiết: Cấu trúc 'be designed to + V nguyên thể' nghĩa 'được thiết kế để', với 'to' giới thiệu mục đích. Các lựa chọn khác: (B) 'reduces' là hiện tại đơn ngôi thứ ba; (C) 'reduced' là quá khứ phân từ; (D) 'reducing' là V-ing. Lưu ý: 'Are designed' là hiện tại bị động (passive), nhấn mạnh hành động thiết kế; 'between nations' dùng giới từ 'between' cho hai bên."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Faculty and Staff
From: Doctor Chen, Dean of Faculty Development
Subject: Professional Development Workshop Series
Dear Colleagues,
We are pleased to announce the continuation of our Professional Development Workshop Series this academic year. These sessions are designed to support faculty in enhancing instructional practices and integrating new technologies into the classroom. The updated schedule includes eight workshops, each focusing on a specific area of teaching innovation. The opening session, scheduled for October 12, will (31) an overview of evidence-based teaching methods and recent research findings.
Each workshop will include guided discussions, demonstration activities, and collaborative tasks to (32) deeper engagement among participants. Faculty members who complete at least 75% of the workshops will receive an official certificate of participation. This certificate may be used as part of the annual performance review to (33) professional growth and continued learning.
Workshops will be held in Room A201 unless otherwise noted. To ensure adequate seating and materials, please register using the online form provided below no later than October 5. Early registration helps us (34) resources efficiently and arrange appropriate support for hybrid attendance.
We also encourage departments to review the workshop topics and (35) conversation about how best practices can be implemented within individual programs. Feedback collected from last year’s participants enabled us to (36) the workshop structure and introduce more interactive components this year.
If you have any questions or require accommodations, please contact the Faculty Development Office. We look forward to seeing many of you at the upcoming sessions.
Sincerely,
Doctor Chen
Dean of Faculty Development
University of Excellence`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "...opening session... will (31) an overview...",
          options: ["limit", "provide", "remove", "reject"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'provide' vì 'provide an overview' là cụm từ cố định nghĩa 'cung cấp cái nhìn tổng quan'. Kiến thức ngữ pháp chi tiết: 'Will provide' là thì tương lai đơn (will + V nguyên thể) chỉ kế hoạch tương lai. Các lựa chọn khác không phù hợp ngữ cảnh: (A) 'limit' nghĩa 'hạn chế'; (C) 'remove' nghĩa 'loại bỏ'; (D) 'reject' nghĩa 'từ chối'. Lưu ý: 'Of evidence-based teaching methods' dùng giới từ 'of' chỉ nội dung của overview."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "...tasks to (32) deeper engagement among participants.",
          options: ["prohibit", "discourage", "facilitate", "ensure"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'facilitate' nghĩa 'thúc đẩy/ tạo điều kiện', phù hợp ngữ cảnh tích cực. Kiến thức ngữ pháp chi tiết: 'To facilitate' là infinitive of purpose chỉ mục đích của 'tasks'. Các lựa chọn khác: (A) 'prohibit' nghĩa 'cấm'; (B) 'discourage' nghĩa 'làm nản lòng'; (D) 'ensure' nghĩa 'đảm bảo', gần nhưng 'facilitate' tự nhiên hơn cho 'engagement'. Lưu ý: 'Among participants' dùng giới từ 'among' cho nhóm nhiều người."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...certificate may be used... to (33) professional growth...",
          options: ["demonstrate", "replace", "reduce", "prevent"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'demonstrate' nghĩa 'minh chứng/chứng minh'. Kiến thức ngữ pháp chi tiết: 'To demonstrate' là infinitive of purpose chỉ mục đích của 'used'. Các lựa chọn khác: (B) 'replace' nghĩa 'thay thế'; (C) 'reduce' nghĩa 'giảm'; (D) 'prevent' nghĩa 'ngăn chặn'. Lưu ý: 'As part of the annual performance review' là cụm giới từ chỉ ngữ cảnh sử dụng."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "Early registration helps us (34) resources efficiently...",
          options: ["allocate", "deny", "overuse", "ignore"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'allocate' nghĩa 'phân bổ'. Kiến thức ngữ pháp chi tiết: 'Helps us allocate' với 'help + object + V nguyên thể' (không 'to') chỉ sự hỗ trợ. Các lựa chọn khác: (B) 'deny' nghĩa 'từ chối'; (C) 'overuse' nghĩa 'lạm dụng'; (D) 'ignore' nghĩa 'bỏ qua'. Lưu ý: 'Efficiently' là trạng từ bổ nghĩa 'allocate'."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "...departments to review the workshop topics and (35) conversation...",
          options: ["delay", "promote", "limit", "avoid"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'promote' nghĩa 'thúc đẩy'. Kiến thức ngữ pháp chi tiết: 'Encourage ... to review ... and promote' với 'encourage + object + to V' chỉ khích lệ, và 'and' nối hai động từ song song. Các lựa chọn khác: (A) 'delay' nghĩa 'trì hoãn'; (C) 'limit' nghĩa 'hạn chế'; (D) 'avoid' nghĩa 'tránh'. Lưu ý: 'About how best practices...' là giới từ 'about' + mệnh đề 'how' chỉ nội dung cuộc trò chuyện."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Feedback... enabled us to (36) the workshop structure...",
          options: ["refine", "pause", "ignore", "cancel"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'refine' nghĩa 'tinh chỉnh/cải thiện'. Kiến thức ngữ pháp chi tiết: 'Enabled us to refine' với 'enable + object + to V' chỉ cho phép/khả năng. Các lựa chọn khác: (B) 'pause' nghĩa 'tạm dừng'; (C) 'ignore' nghĩa 'bỏ qua'; (D) 'cancel' nghĩa 'hủy'. Lưu ý: 'And introduce' nối song song với 'refine' bằng 'and'."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - What is the main purpose of the workshop series?",
          options: [
            "To replace outdated university policies",
            "To improve teaching practices and integrate new technologies",
            "To evaluate faculty performance",
            "To train new administrative staff"
          ],
          correct: 1,
          explanation: "Email nêu rõ: hỗ trợ cải thiện phương pháp giảng dạy và tích hợp công nghệ. - Ngữ pháp lưu ý trong văn bản: 'Are designed to support' sử dụng bị động + infinitive of purpose để chỉ mục đích chính, giúp câu trang trọng hơn trong email chuyên nghiệp."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is required to receive the certificate?",
          options: [
            "Teach a demonstration class",
            "Complete at least 75% of the workshops",
            "Submit a final report",
            "Attend every session"
          ],
          correct: 1,
          explanation: "Email ghi: 'complete at least 75% of the workshops'. - Ngữ pháp lưu ý: 'Who complete' là mệnh đề quan hệ (relative clause) với 'who' chỉ người (faculty members), và 'at least' nghĩa 'ít nhất' để chỉ yêu cầu tối thiểu."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - Why is early registration important?",
          options: [
            "It provides discounts for attendees",
            "It helps the team allocate resources efficiently",
            "It confirms attendance for grading purposes",
            "It guarantees a certificate"
          ],
          correct: 1,
          explanation: "Email: Early registration helps 'allocate resources efficiently'. - Ngữ pháp lưu ý: 'Helps us allocate' sử dụng 'help + object + V nguyên thể' (không 'to') để chỉ lợi ích, và 'to ensure' là infinitive of purpose ở phần trước."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - Which of the following was improved this year based on feedback?",
          options: [
            "The number of required assignments",
            "Interactive components and structure",
            "Room assignments",
            "Workshop duration"
          ],
          correct: 1,
          explanation: "Email: feedback enabled them to refine structure and add more interactive components. - Ngữ pháp lưu ý: 'Enabled us to refine' với 'enable + to V' chỉ kết quả từ feedback, và 'collected from' là past participle làm tính từ bổ nghĩa 'feedback'."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**GreenLife Fitness Advertisement**
    Transform Your Wellness with Personalized Training Plans
    Achieve your fitness goals sustainably with our certified trainers. New clients get a free initial consultation! Programs start weekly.
    **Our Services:**
    1. **Custom Workout Designs** – Tailored plans based on your goals and health history. Visit greenlifefitness.com for sample routines and trainer bios.
    2. **Nutrition Guidance** – Balanced meal plans integrated with exercise.
    3. **Virtual Sessions** – Flexible online coaching for busy lifestyles.
    4. **Group Challenges** – Join community events for motivation and fun.
    Email us at contact@greenlifefitness.com with your details. Expect a reply within 24 hours to customize your plan.
    ---
    **Email Message**
    **To:** contact@greenlifefitness.com
    **From:** john.doe@email.com
    **Date:** September 5
    **Subject:** Interest in Personalized Training
    I came across your ad in a health magazine and would like to start a training program for weight management and better sleep. I'm a 35-year-old office worker with no prior experience. Could you include nutrition tips? Available for virtual sessions evenings after 7:00 P.M. Please email back with options.
    Best,
    John Doe
    456 Health St., Austin, TX 78701
    555-987-6543`,
      questions: [
        {
          id: 41,
          question: "Why visit the GreenLife Fitness website?",
          options: ["To join challenges", "To see sample routines", "To pay fees", "To book nutrition"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Visit... for sample routines and trainer bios'. Kiến thức đọc hiểu: Mục đích từ phần Custom Workout. Ngữ pháp lưu ý: 'Visit ... for + noun' dùng giới từ 'for' chỉ mục đích, với 'based on' là cụm giới từ chỉ cơ sở (goals and health history)."
        },
        {
          id: 42,
          question: "How did Mr. Doe find the advertisement?",
          options: ["From a friend", "Via email", "In a health magazine", "Online"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'your ad in a health magazine'. Kiến thức suy luận: Nguồn từ email. Ngữ pháp lưu ý: 'Came across' là phrasal verb nghĩa 'tình cờ gặp', với 'in a health magazine' dùng giới từ 'in' chỉ vị trí."
        },
        {
          id: 43,
          question: "What are Mr. Doe's goals?",
          options: ["Team sports", "Weight management and sleep", "Marathon training", "Muscle building"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'weight management and better sleep'. Kiến thức đọc hiểu: Mục tiêu từ email. Ngữ pháp lưu ý: 'For weight management and better sleep' dùng giới từ 'for' chỉ mục đích, với 'and' nối hai danh từ song song."
        },
        {
          id: 44,
          question: "What does Mr. Doe NOT request?",
          options: ["Initial consultation", "Group challenges", "Virtual sessions", "Nutrition tips"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email không đề cập group challenges; tập trung cá nhân hóa. Kiến thức đọc hiểu: So sánh yêu cầu. Ngữ pháp lưu ý: 'Could you include' là modal 'could' + V nguyên thể chỉ yêu cầu lịch sự, với 'nutrition tips' là danh từ phức hợp."
        },
        {
          id: 45,
          question: "What will Mr. Doe likely get within 24 hours?",
          options: ["Group event invite", "A reply with plan", "A free consultation", "Payment details"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Expect a reply within 24 hours to customize your plan'. Kiến thức suy luận: Quy trình từ ad. Ngữ pháp lưu ý: 'Expect a reply ... to customize' với 'to' infinitive chỉ mục đích, 'within 24 hours' dùng giới từ 'within' chỉ khoảng thời gian."
        },
        {
          id: 46,
          question: "What is offered to new clients?",
          options: ["Extra sessions", "Free initial consultation", "Lifetime membership", "Discounted gear"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'New clients get a free initial consultation'. Kiến thức đọc hiểu: Ưu đãi trực tiếp. Ngữ pháp lưu ý: 'Get a free ...' thì hiện tại đơn chỉ ưu đãi chung, với 'initial' tính từ bổ nghĩa 'consultation'."
        },
        {
          id: 47,
          question: "What is Mr. Doe's availability?",
          options: ["Anytime", "Weekends", "Evenings after 7:00 P.M.", "Mornings"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'virtual sessions evenings after 7:00 P.M.'. Kiến thức đọc hiểu: Lịch từ email. Ngữ pháp lưu ý: 'Available for + noun' dùng giới từ 'for' chỉ sẵn sàng, với 'after 7:00 P.M.' giới từ 'after' chỉ thời gian."
        },
        {
          id: 48,
          question: "Mr. Doe has __________ experience.",
          options: ["Professional", "No prior", "Extensive", "Years of"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'no prior experience'. Kiến thức đọc hiểu: Nền tảng từ email. Ngữ pháp lưu ý: 'With no prior experience' dùng giới từ 'with' chỉ tình trạng, 'prior' tính từ nghĩa 'trước đó'."
        },
        {
          id: 49,
          question: "What does Mr. Doe prefer for sessions?",
          options: ["Recorded", "Group", "Virtual", "In-person"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'Available for virtual sessions'. Kiến thức đọc hiểu: Định dạng từ email. Ngữ pháp lưu ý: 'Available for virtual sessions' với 'for' giới từ chỉ loại, 'virtual' tính từ bổ nghĩa 'sessions'."
        },
        {
          id: 50,
          question: "What service integrates with exercise?",
          options: ["Sample routines", "Nutrition guidance", "Community events", "Trainer bios"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Nutrition Guidance – Balanced meal plans integrated with exercise'. Kiến thức đọc hiểu: Dịch vụ từ ad. Ngữ pháp lưu ý: 'Integrated with' là past participle + giới từ 'with' chỉ sự kết hợp, làm tính từ bổ nghĩa 'meal plans'."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Emma (09:15): Dentist appt at 10—can you cover my shift start?
    Tom (09:16): Sure, Emma. I'll handle until noon. Emergency?
    Emma (09:18): Routine checkup, but better safe. Thanks—coffee run later?
    Tom (09:20): Deal. Traffic light today?
    Emma (10:45): All good, no cavities! Back by 11:30.`,
      questions: [
        {
          id: 51,
          question: "What is Emma doing at 10?",
          options: ["Traffic check", "Dentist appointment", "Shift work", "Coffee run"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Dentist appt at 10'. Kiến thức đọc hiểu: Lịch hẹn từ tin đầu. Ngữ pháp lưu ý: 'Can you cover' là modal 'can' + V nguyên thể chỉ yêu cầu, với dấu gạch ngang (—) nối câu hỏi."
        },
        {
          id: 52,
          question: "What does Tom offer?",
          options: ["Buy coffee", "Cover shift until noon", "Join the checkup", "Cancel the appt"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll handle until noon'. Kiến thức suy luận: Hỗ trợ từ phản hồi. Ngữ pháp lưu ý: 'I'll handle' thì tương lai đơn (will + V) chỉ cam kết, 'until noon' giới từ 'until' chỉ thời gian kết thúc."
        },
        {
          id: 53,
          question: "What is the appointment for?",
          options: ["Promotion", "Routine checkup", "Vacation planning", "Emergency"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Routine checkup'. Kiến thức đọc hiểu: Loại hẹn từ tin Emma. Ngữ pháp lưu ý: 'But better safe' là mệnh đề tỉnh lược (but it's better to be safe), với 'but' đối lập."
        },
        {
          id: 54,
          question: "When will Emma return?",
          options: ["09:15", "10:45", "11:30", "Noon"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'Back by 11:30'. Kiến thức đọc hiểu: Thời gian trở lại. Ngữ pháp lưu ý: 'Back by 11:30' dùng giới từ 'by' chỉ thời hạn tối đa, với dấu chấm than (!) nhấn mạnh tích cực."
        },
        {
          id: 55,
          question: "What does Emma offer later?",
          options: ["Traffic update", "Coffee run", "Dentist referral", "Shift extension"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'coffee run later?'. Kiến thức đọc hiểu: Đề nghị từ tin. Ngữ pháp lưu ý: 'Coffee run later?' là câu hỏi tỉnh lược, với dấu gạch ngang (—) nối lời cảm ơn và đề nghị."
        },
        {
          id: 56,
          question: "What can be inferred about Tom and Emma?",
          options: ["Dentist colleagues", "Work partners", "Boss-employee", "Strangers"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì ngữ cảnh shift cover và casual deal. Kiến thức suy luận: Mối quan hệ đồng nghiệp. Ngữ pháp lưu ý: Trong tin nhắn ngắn gọn, sử dụng từ viết tắt như 'appt' (appointment), và câu hỏi trực tiếp như 'Emergency?' để suy luận ngữ cảnh."
        },
        {
          id: 57,
          question: "Why does Emma go to the dentist?",
          options: ["Vacation prep", "Better safe", "Promotion req", "Pain"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'better safe'. Kiến thức suy luận: Lý do phòng ngừa. Ngữ pháp lưu ý: 'Better safe' tỉnh lược từ 'it's better to be safe', với 'but' nối ý chính và lý do."
        },
        {
          id: 58,
          question: "What does Tom ask about?",
          options: ["Coffee type", "Traffic", "Shift end", "Cavities"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Traffic light today?'. Kiến thức đọc hiểu: Câu hỏi từ tin. Ngữ pháp lưu ý: 'Traffic light today?' là câu hỏi tỉnh lược, với 'light' tính từ nghĩa 'ít tắc nghẽn'."
        },
        {
          id: 59,
          question: "What is the result of the appointment?",
          options: ["Emergency", "All good", "Rescheduled", "Cavities found"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'no cavities!'. Kiến thức đọc hiểu: Kết quả từ tin cuối. Ngữ pháp lưu ý: 'All good, no cavities!' dùng dấu phẩy (,) nối hai cụm tích cực, với 'no' phủ định danh từ."
        },
        {
          id: 60,
          question: "What does 'Deal' mean in Tom's reply?",
          options: ["Agreement to coffee", "Delay", "Question", "Refusal"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'Deal' đáp lại coffee offer. Kiến thức suy luận: Đồng ý thân mật. Ngữ pháp lưu ý: 'Deal.' là từ đơn lẻ nghĩa 'đồng ý', thường dùng trong giao tiếp thân mật như tin nhắn."
        }
      ]
    }
  }
};