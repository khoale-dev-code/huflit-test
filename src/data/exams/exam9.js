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
          explanation: "Ben nói: 'Last session we made pasta from scratch—it took hours, but the taste was incredible.' (Tuần trước chúng tôi làm pasta từ đầu—mất hàng giờ, nhưng vị ngon tuyệt.)"
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
          explanation: "Lisa nói: 'I tried baking bread once, but it turned out like a rock.' (Tôi thử nướng bánh mì một lần, nhưng nó cứng như đá.)"
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
          explanation: "Ben nói: 'Next week is desserts—tiramisu and gelato.' (Tuần sau là món tráng miệng—tiramisu và gelato.)"
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
          explanation: "Ben nói: 'The instructor said it's intense; beginners might struggle with the timing.' (Giảng viên nói nó căng thẳng; người mới có thể gặp khó với thời gian.)"
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
          explanation: "Lisa nói: 'I'm swamped with work.' (Tôi bận rộn với công việc.)"
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
          explanation: "Anna nói: 'Theme: eco-awareness.' (Chủ đề: nhận thức về môi trường.)"
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
          explanation: "Mark nói: 'I suggest a recycling workshop—people bring items to upcycle.' (Tôi gợi ý hội thảo tái chế—mọi người mang đồ để tái sử dụng.)"
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
          explanation: "Sarah nói: 'For food, vegan potluck to tie in sustainability.' (Đồ ăn: potluck chay để liên kết với bền vững.)"
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
          explanation: "Mark nói: 'I'll handle desserts—plant-based treats.' (Tôi lo tráng miệng—món chay.)"
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
          explanation: "Anna nói: 'Last year's rain was a disaster.' (Mưa năm ngoái là thảm họa.)"
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
          explanation: "Professor A: 'Vital for combating climate change.' (Quan trọng để chống biến đổi khí hậu.) - Luyện nghe tầm quan trọng chủ đề."
        },
        {
          id: 12,
          question: "Your __________ are in.",
          options: ["(A) penalties", "(B) books", "(C) quiz results", "(D) excuses"],
          correct: 2,
          explanation: "Professor A: 'Your quiz results are in—class average 8.1.' (Kết quả bài kiểm tra của các bạn đã có—trung bình lớp 8.1.) - Luyện nghe thông báo kết quả."
        },
        {
          id: 13,
          question: "Extensions require __________.",
          options: ["(A) group vote", "(B) prior approval", "(C) extra fees", "(D) no approval"],
          correct: 1,
          explanation: "Professor A: 'Extensions for assignments require prior approval.' (Gia hạn bài tập cần phê duyệt trước.) - Luyện nghe quy định học tập."
        },
        {
          id: 14,
          question: "Last semester's group __________ penalties.",
          options: ["(A) ignored", "(B) applied for", "(C) saw", "(D) avoided"],
          correct: 2,
          explanation: "Professor A: 'Penalties apply, as seen with last semester's group.' (Như nhóm kỳ trước đã thấy.) - Luyện nghe ví dụ hậu quả."
        },
        {
          id: 15,
          question: "The library's green corner features __________.",
          options: ["(A) plastic furniture", "(B) solar-powered chargers", "(C) noisy areas", "(D) all of the above"],
          correct: 1,
          explanation: "Professor A: 'Solar-powered chargers and recycled furniture.' (Sạc năng lượng mặt trời và đồ nội thất tái chế.) - Luyện nghe tiện ích bền vững."
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
          explanation: "Student B: 'It's for stress management.' (Nó để quản lý căng thẳng.) - Luyện nghe mục đích đăng ký."
        },
        {
          id: 17,
          question: "The beginner level was completed __________.",
          options: ["(A) in person", "(B) three months ago", "(C) last year", "(D) tomorrow"],
          correct: 1,
          explanation: "Student B: 'Three months ago online.' (Ba tháng trước trực tuyến.) - Luyện nghe thời gian hoàn thành."
        },
        {
          id: 18,
          question: "The student has __________.",
          options: ["(A) fees paid", "(B) no proof", "(C) a progress log", "(D) a doctor's note"],
          correct: 2,
          explanation: "Student B: 'No doctor's note, but I have my progress log.' (Không có giấy bác sĩ, nhưng có nhật ký tiến độ.) - Luyện nghe tài liệu hỗ trợ."
        },
        {
          id: 19,
          question: "Advanced sessions are __________.",
          options: ["(A) online only", "(B) vigorous", "(C) free always", "(D) relaxed"],
          correct: 1,
          explanation: "Counselor: 'Advanced sessions are vigorous.' (Buổi nâng cao rất mạnh mẽ.) - Luyện nghe mức độ khóa học."
        },
        {
          id: 20,
          question: "The counselor suggests __________.",
          options: ["(A) refunding fees", "(B) verifying certification", "(C) skipping trial", "(D) delaying start"],
          correct: 1,
          explanation: "Counselor: 'We can verify your certification.' (Chúng tôi có thể xác minh chứng chỉ của bạn.) - Luyện nghe quy trình kiểm tra."
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
          explanation: "Đáp án đúng là (C) 'quickly' vì trạng từ bổ nghĩa động từ 'decision-making'. Kiến thức ngữ pháp: Trạng từ 'quickly' (nhanh chóng) mô tả cách thức; tính từ (A,B), danh từ (D) không phù hợp."
        },
        {
          id: 22,
          question: "By the time the report was due, the analyst __________ all the financial data twice for accuracy.",
          options: ["verifying", "verifies", "had verified", "verify"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'had verified' vì thì quá khứ hoàn thành trước thời điểm quá khứ. Kiến thức ngữ pháp: 'By the time + past, past perfect'; không dùng hiện tại (A,B), V-ing (D)."
        },
        {
          id: 23,
          question: "The policy change affected all departments __________ the marketing team the most.",
          options: ["among", "except", "including", "besides"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'including' vì chỉ bao gồm tất cả, với marketing bị ảnh hưởng nhất. Kiến thức ngữ pháp: 'Including' (bao gồm); 'besides' (ngoài), 'except' (trừ), 'among' (giữa) không khớp."
        },
        {
          id: 24,
          question: "Renewable resources play a crucial role in __________ long-term environmental sustainability.",
          options: ["achieves", "achieved", "achieving", "achieve"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'achieving' vì V-ing sau giới từ 'in'. Kiến thức ngữ pháp: 'In + V-ing' chỉ mục đích; không dùng nguyên thể (A), quá khứ (B), ngôi thứ ba (D)."
        },
        {
          id: 25,
          question: "The board __________ that the merger would benefit shareholders in the coming years.",
          options: ["agreeing", "agrees", "agreed", "agree"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'agreed' vì thì quá khứ đơn cho hành động hoàn thành. Kiến thức ngữ pháp: Thì quá khứ 'agreed' sau 'that'; không dùng hiện tại (A,B), V-ing (D)."
        },
        {
          id: 26,
          question: "All participants must register __________ to receive the workshop materials.",
          options: ["advanced", "in advance", "advancing", "advance"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'in advance' vì cụm từ cố định 'in advance' (trước). Kiến thức ngữ pháp: Giới từ + danh từ 'advance'; không dùng danh từ đơn (A), V-ing (C), tính từ (D)."
        },
        {
          id: 27,
          question: "The experiment was conducted __________ strict safety protocols to minimize risks.",
          options: ["under", "for", "by", "with"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'under' vì 'under protocols' (dưới quy trình). Kiến thức ngữ pháp: 'Under' chỉ điều kiện; 'with' (với), 'by' (bởi), 'for' (cho) không phù hợp."
        },
        {
          id: 28,
          question: "He spoke so __________ that the audience could barely follow his technical jargon.",
          options: ["rapidity", "rapid", "rapidly", "rapidly"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'rapidly' vì trạng từ bổ nghĩa động từ 'spoke'. Kiến thức ngữ pháp: Trạng từ 'rapidly' (nhanh chóng); tính từ (A), danh từ (C) sai."
        },
        {
          id: 29,
          question: "The proposal __________ by the committee after careful review last Friday.",
          options: ["approves", "approving", "was approved", "approve"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'was approved' vì thì quá khứ đơn bị động. Kiến thức ngữ pháp: Bị động 'was + V3'; không dùng nguyên thể (A), V-ing (B), hiện tại (D)."
        },
        {
          id: 30,
          question: "Global trade agreements are designed to __________ economic disparities between nations.",
          options: ["reduce", "reduces", "reduced", "reducing"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'reduce' vì động từ nguyên thể sau 'to'. Kiến thức ngữ pháp: 'To + V nguyên thể' chỉ mục đích; không dùng V-ing (B), quá khứ (C), ngôi thứ ba (D)."
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
          explanation: "Đáp án đúng là (B) 'provide' vì 'provide an overview' là cụm chuẩn. Các lựa chọn khác không phù hợp với ngữ cảnh."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "...tasks to (32) deeper engagement among participants.",
          options: ["prohibit", "discourage", "facilitate", "ensure"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'facilitate' — thúc đẩy sự tham gia sâu hơn. 'Ensure' không tự nhiên bằng, 'discourage' và 'prohibit' trái nghĩa."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...certificate may be used... to (33) professional growth...",
          options: ["demonstrate", "replace", "reduce", "prevent"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'demonstrate' vì certificate giúp minh chứng phát triển chuyên môn."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "Early registration helps us (34) resources efficiently...",
          options: ["allocate", "deny", "overuse", "ignore"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'allocate' — phân bổ tài nguyên."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "...departments to review the workshop topics and (35) conversation...",
          options: ["delay", "promote", "limit", "avoid"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'promote' vì thúc đẩy thảo luận là ý tích cực phù hợp email."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Feedback... enabled us to (36) the workshop structure...",
          options: ["refine", "pause", "ignore", "cancel"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'refine' nghĩa là tinh chỉnh, cải thiện cấu trúc workshop."
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
          explanation: "Email nêu rõ: hỗ trợ cải thiện phương pháp giảng dạy và tích hợp công nghệ."
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
          explanation: "Email ghi: 'complete at least 75% of the workshops'."
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
          explanation: "Email: Early registration helps 'allocate resources efficiently'."
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
          explanation: "Email: feedback enabled them to refine structure and add more interactive components."
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
          explanation: "Đáp án đúng là (B) vì 'Visit... for sample routines and trainer bios'. Kiến thức đọc hiểu: Mục đích từ phần Custom Workout."
        },
        {
          id: 42,
          question: "How did Mr. Doe find the advertisement?",
          options: ["From a friend", "Via email", "In a health magazine", "Online"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'your ad in a health magazine'. Kiến thức suy luận: Nguồn từ email."
        },
        {
          id: 43,
          question: "What are Mr. Doe's goals?",
          options: ["Team sports", "Weight management and sleep", "Marathon training", "Muscle building"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'weight management and better sleep'. Kiến thức đọc hiểu: Mục tiêu từ email."
        },
        {
          id: 44,
          question: "What does Mr. Doe NOT request?",
          options: ["Initial consultation", "Group challenges", "Virtual sessions", "Nutrition tips"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email không đề cập group challenges; tập trung cá nhân hóa. Kiến thức đọc hiểu: So sánh yêu cầu."
        },
        {
          id: 45,
          question: "What will Mr. Doe likely get within 24 hours?",
          options: ["Group event invite", "A reply with plan", "A free consultation", "Payment details"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Expect a reply within 24 hours to customize your plan'. Kiến thức suy luận: Quy trình từ ad."
        },
        {
          id: 46,
          question: "What is offered to new clients?",
          options: ["Extra sessions", "Free initial consultation", "Lifetime membership", "Discounted gear"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'New clients get a free initial consultation'. Kiến thức đọc hiểu: Ưu đãi trực tiếp."
        },
        {
          id: 47,
          question: "What is Mr. Doe's availability?",
          options: ["Anytime", "Weekends", "Evenings after 7:00 P.M.", "Mornings"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'virtual sessions evenings after 7:00 P.M.'. Kiến thức đọc hiểu: Lịch từ email."
        },
        {
          id: 48,
          question: "Mr. Doe has __________ experience.",
          options: ["Professional", "No prior", "Extensive", "Years of"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'no prior experience'. Kiến thức đọc hiểu: Nền tảng từ email."
        },
        {
          id: 49,
          question: "What does Mr. Doe prefer for sessions?",
          options: ["Recorded", "Group", "Virtual", "In-person"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'Available for virtual sessions'. Kiến thức đọc hiểu: Định dạng từ email."
        },
        {
          id: 50,
          question: "What service integrates with exercise?",
          options: ["Sample routines", "Nutrition guidance", "Community events", "Trainer bios"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Nutrition Guidance – Balanced meal plans integrated with exercise'. Kiến thức đọc hiểu: Dịch vụ từ ad."
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
          explanation: "Đáp án đúng là (B) vì 'Dentist appt at 10'. Kiến thức đọc hiểu: Lịch hẹn từ tin đầu."
        },
        {
          id: 52,
          question: "What does Tom offer?",
          options: ["Buy coffee", "Cover shift until noon", "Join the checkup", "Cancel the appt"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll handle until noon'. Kiến thức suy luận: Hỗ trợ từ phản hồi."
        },
        {
          id: 53,
          question: "What is the appointment for?",
          options: ["Promotion", "Routine checkup", "Vacation planning", "Emergency"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Routine checkup'. Kiến thức đọc hiểu: Loại hẹn từ tin Emma."
        },
        {
          id: 54,
          question: "When will Emma return?",
          options: ["09:15", "10:45", "11:30", "Noon"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'Back by 11:30'. Kiến thức đọc hiểu: Thời gian trở lại."
        },
        {
          id: 55,
          question: "What does Emma offer later?",
          options: ["Traffic update", "Coffee run", "Dentist referral", "Shift extension"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'coffee run later?'. Kiến thức đọc hiểu: Đề nghị từ tin."
        },
        {
          id: 56,
          question: "What can be inferred about Tom and Emma?",
          options: ["Dentist colleagues", "Work partners", "Boss-employee", "Strangers"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì ngữ cảnh shift cover và casual deal. Kiến thức suy luận: Mối quan hệ đồng nghiệp."
        },
        {
          id: 57,
          question: "Why does Emma go to the dentist?",
          options: ["Vacation prep", "Better safe", "Promotion req", "Pain"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'better safe'. Kiến thức suy luận: Lý do phòng ngừa."
        },
        {
          id: 58,
          question: "What does Tom ask about?",
          options: ["Coffee type", "Traffic", "Shift end", "Cavities"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Traffic light today?'. Kiến thức đọc hiểu: Câu hỏi từ tin."
        },
        {
          id: 59,
          question: "What is the result of the appointment?",
          options: ["Emergency", "All good", "Rescheduled", "Cavities found"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'no cavities!'. Kiến thức đọc hiểu: Kết quả từ tin cuối."
        },
        {
          id: 60,
          question: "What does 'Deal' mean in Tom's reply?",
          options: ["Agreement to coffee", "Delay", "Question", "Refusal"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'Deal' đáp lại coffee offer. Kiến thức suy luận: Đồng ý thân mật."
        }
      ]
    }
  }
};