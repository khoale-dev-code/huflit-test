export const EXAM7_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 7",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Emma và Tom về kỳ nghỉ. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Tom: Hey Emma! I heard you just got back from your trip to South Korea. How was it?\nEmma: It was fantastic, Tom! I stayed there for three weeks exploring Seoul and Busan. I really wanted to try all the street food, especially the famous Korean fried chicken and tteokbokki. But honestly, most of it was too spicy for me, so I ended up eating at restaurants with milder options instead.\nTom: Oh, that's too bad. What about your visit to Thailand last summer? I remember you mentioned planning to go there.\nEmma: Yes! I absolutely loved Bangkok and Chiang Mai. The only regret I have is that I went during the rainy season. Many people told me that the best time to visit Thailand is during the cool season from November to February when the weather is perfect for outdoor activities.\nTom: Makes sense. How did you find getting around in Bangkok? I've heard the traffic can be crazy.\nEmma: Well, I'd say it was moderately easy to navigate. The BTS and MRT systems are quite efficient once you understand the routes. However, I wouldn't describe it as 'very easy' – you definitely need to plan your journeys carefully and allow extra time.",
      questions: [
        {
          id: 1,
          options: [
            "She found most food too spicy for her taste.",
            "She bought many Korean snacks to take home.",
            "She didn't like any Korean food at all.",
            "She ate street food every single day."
          ],
          correct: 0,
          explanation: "Emma nói: 'Most of it was too spicy for me, so I ended up eating at restaurants with milder options instead.' (Hầu hết món ăn quá cay đối với tôi, nên tôi ăn ở nhà hàng với lựa chọn nhẹ hơn)."
        },
        {
          id: 2,
          options: [
            "She stayed for two weeks.",
            "She stayed for several months.",
            "She stayed for three weeks.",
            "She stayed for one month."
          ],
          correct: 2,
          explanation: "Emma nói: 'I stayed there for three weeks exploring Seoul and Busan.' (Tôi ở đó ba tuần khám phá Seoul và Busan)."
        },
        {
          id: 3,
          options: [
            "She ate at restaurants with milder food options.",
            "She didn't eat anything because of allergies.",
            "She only ate international fast food chains.",
            "She cooked all her meals at the hotel."
          ],
          correct: 0,
          explanation: "Emma nói: 'I ended up eating at restaurants with milder options instead.' (Tôi ăn ở nhà hàng với lựa chọn nhẹ hơn thay thế)."
        },
        {
          id: 4,
          options: [
            "People recommended visiting during summer.",
            "People suggested the rainy season is best.",
            "People advised visiting during the cool season.",
            "Nobody gave her any travel advice."
          ],
          correct: 2,
          explanation: "Emma nói: 'Many people told me that the best time to visit Thailand is during the cool season from November to February.' (Nhiều người nói thời điểm tốt nhất để đi Thái Lan là mùa mát từ tháng 11 đến tháng 2)."
        },
        {
          id: 5,
          options: [
            "She found it very difficult to get around.",
            "She found it moderately easy to navigate.",
            "She found it impossible without a tour guide.",
            "She thought it was extremely easy to navigate."
          ],
          correct: 1,
          explanation: "Emma nói: 'I'd say it was moderately easy to navigate. The BTS and MRT systems are quite efficient.' (Tôi sẽ nói nó khá dễ di chuyển. Hệ thống BTS và MRT khá hiệu quả)."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người tại một cuộc họp. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At the office meeting room.\nManager: Good morning, everyone. Let's start our team meeting. First, what would you like to drink?\nAnna: I'll have a green tea, please.\nBen: Same for me, a green tea.\nLisa: I'd also like a green tea, thank you.\nManager: Alright, that's three green teas.\nAnna: Lisa, I noticed you skipped breakfast this morning. Are you feeling okay?\nLisa: I'm fine, thanks. I actually had a big dinner last night, and I've been trying to practice intermittent fasting lately, so I'm skipping breakfast on purpose.\nBen: Speaking of changes, did you hear that Doctor Chen left his position at the hospital? What's he up to now?\nAnna: He still runs his private clinic, but now he's also teaching medical students at the university downtown. He's mentoring the next generation of doctors.\nLisa: That's wonderful! By the way, my mother and your aunt Maria are planning to visit us for dinner this weekend. Yes, your mother's sister will be joining us too.\nBen: For Michael's graduation, what should we give him?\nAnna: Cash would be practical.\nLisa: Maybe a nice watch?\nBen: How about a new laptop?\nAnna: Those are all good ideas. Let's discuss it more tonight.",
      questions: [
        {
          id: 6,
          question: "How many people ordered green tea?",
          options: [
            "Two",
            "Four",
            "Three",
            "One"
          ],
          correct: 2,
          explanation: "Manager nói: 'That's three green teas.' (Đó là ba trà xanh.) Anna, Ben, và Lisa đều gọi green tea."
        },
        {
          id: 7,
          question: "Why didn't Lisa eat breakfast?",
          options: [
            "She's practicing intermittent fasting.",
            "She doesn't like breakfast food.",
            "She was running late for work.",
            "The cafeteria was closed."
          ],
          correct: 0,
          explanation: "Lisa nói: 'I've been trying to practice intermittent fasting lately, so I'm skipping breakfast on purpose.' (Tôi đang thực hành nhịn ăn gián đoạn gần đây, nên tôi cố tình bỏ bữa sáng)."
        },
        {
          id: 8,
          question: "What does Doctor Chen do now?",
          options: [
            "He only works at his private clinic.",
            "He teaches medical students at the university.",
            "He retired from medicine completely.",
            "He works full-time at the hospital."
          ],
          correct: 1,
          explanation: "Anna nói: 'He still runs his private clinic, but now he's also teaching medical students at the university downtown.' (Ông vẫn điều hành phòng khám riêng, nhưng giờ còn dạy sinh viên y khoa ở trường đại học)."
        },
        {
          id: 9,
          question: "Who is coming to dinner this weekend?",
          options: [
            "Ben's mother and his aunt.",
            "Lisa's sister and her mother-in-law.",
            "Lisa's mother and Ben's aunt Maria.",
            "Ben's grandmother and his cousin."
          ],
          correct: 2,
          explanation: "Lisa nói: 'My mother and your aunt Maria are planning to visit us for dinner this weekend.' (Mẹ tôi và dì Maria của anh dự định đến ăn tối cuối tuần này)."
        },
        {
          id: 10,
          question: "What will they give Michael for his graduation?",
          options: [
            "Cash",
            "They haven't decided yet.",
            "A watch",
            "A laptop"
          ],
          correct: 1,
          explanation: "Anna nói: 'Those are all good ideas. Let's discuss it more tonight.' (Đó đều là ý tưởng hay. Hãy thảo luận thêm tối nay.) Họ đã đề xuất tiền, đồng hồ và laptop nhưng chưa quyết định."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Counselor: Good afternoon, students. Welcome to this career counseling session. The quality of this program is satisfactory for most participants, though we're always striving to improve. I've just received your career assessment results – the majority of you scored between 75-80, which indicates a solid understanding of your strengths and interests. Please remember that if you fail to submit your career plan by the deadline your counselor has given you, you'll receive an incomplete grade for this course. No extensions will be granted unless you provide proper documentation. Jessica was an outstanding student here last semester; she achieved top marks but unfortunately learned a difficult lesson about time management when she missed one critical deadline. On a different note, the new cafe on campus has an excellent menu with healthy options, delicious coffee, and plenty of choices for students with dietary restrictions – definitely worth checking out during your break.",
      questions: [
        { 
          id: 11, 
          question: "The program is described as __________.", 
          options: [
            "(A) perfect",
            "(B) disappointing", 
            "(C) satisfactory",
            "(D) outstanding"
          ], 
          correct: 2,
          explanation: "Counselor: 'The quality of this program is satisfactory for most participants.' (Chất lượng chương trình này thỏa đáng cho hầu hết người tham gia)."
        },
        { 
          id: 12, 
          question: "The counselor has just __________.", 
          options: [
            "(A) started a new job",
            "(B) finished teaching a class",
            "(C) received the career assessment results",
            "(D) scheduled individual meetings"
          ], 
          correct: 2,
          explanation: "Counselor: 'I've just received your career assessment results.' (Tôi vừa nhận kết quả đánh giá nghề nghiệp của các bạn)."
        },
        { 
          id: 13, 
          question: "If students miss the deadline, they __________.", 
          options: [
            "(A) can request a one-week extension",
            "(B) will receive partial credit",
            "(C) will receive an incomplete grade",
            "(D) must retake the entire course"
          ], 
          correct: 2,
          explanation: "Counselor: 'If you fail to submit your career plan by the deadline, you'll receive an incomplete grade.' (Nếu bạn không nộp kế hoạch nghề nghiệp đúng hạn, bạn sẽ nhận điểm chưa hoàn thành)."
        },
        { 
          id: 14, 
          question: "Jessica was __________.", 
          options: [
            "(A) a new transfer student",
            "(B) an outstanding student last semester",
            "(C) expelled from the program",
            "(D) a career counselor assistant"
          ], 
          correct: 1,
          explanation: "Counselor: 'Jessica was an outstanding student here last semester; she achieved top marks.' (Jessica là sinh viên xuất sắc ở đây kỳ trước; cô ấy đạt điểm cao nhất)."
        },
        { 
          id: 15, 
          question: "The new cafe on campus __________.", 
          options: [
            "(A) only serves coffee",
            "(B) is too expensive for students",
            "(C) has limited menu options",
            "(D) has excellent menu with healthy options"
          ], 
          correct: 3,
          explanation: "Counselor: 'The new cafe on campus has an excellent menu with healthy options, delicious coffee, and plenty of choices.' (Quán cà phê mới trong kампus có thực đơn xuất sắc với lựa chọn lành mạnh, cà phê ngon và nhiều sự lựa chọn)."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Client 1: Hello, I'd like to return these headphones, please. They were a gift from my colleague for my work anniversary.\nSales Associate: Certainly, when were they purchased?\nClient 1: About three weeks ago, I believe.\nSales Associate: Is there something wrong with the product?\nClient 1: No, they work fine. They're just not the style I prefer. Unfortunately, I don't have the receipt – my colleague probably threw it away after wrapping them. However, all the original packaging and tags are intact.\nSales Associate: I understand, but our store policy requires a receipt for cash refunds. Without it, I'm unable to process a full monetary return.\nClient 1: But look, everything is here! The box, the warranty card, even the price tag!\nSales Associate: I apologize for the inconvenience. To help resolve this situation, I can offer you a store credit for the full amount instead. Alternatively, you could check with your colleague to see if they have the credit card statement showing the purchase.",
      questions: [
        { 
          id: 16, 
          question: "The headphones were __________.", 
          options: [
            "(A) a wedding gift",
            "(B) purchased by the customer himself",
            "(C) a work anniversary gift",
            "(D) bought during a sale"
          ], 
          correct: 2,
          explanation: "Client 1: 'They were a gift from my colleague for my work anniversary.' (Chúng là quà từ đồng nghiệp cho kỷ niệm công tác của tôi)."
        },
        { 
          id: 17, 
          question: "The headphones were purchased __________.", 
          options: [
            "(A) yesterday",
            "(B) one month ago",
            "(C) about three weeks ago",
            "(D) six months ago"
          ], 
          correct: 2,
          explanation: "Client 1: 'About three weeks ago, I believe.' (Khoảng ba tuần trước, tôi nghĩ vậy)."
        },
        { 
          id: 18, 
          question: "When requesting a refund, the customer __________.", 
          options: [
            "(A) brought the receipt but lost the box",
            "(B) had both receipt and packaging",
            "(C) didn't have the receipt",
            "(D) refused to show any proof of purchase"
          ], 
          correct: 2,
          explanation: "Client 1: 'Unfortunately, I don't have the receipt – my colleague probably threw it away.' (Thật không may, tôi không có biên lai – đồng nghiệp tôi có thể đã vứt nó đi)."
        },
        { 
          id: 19, 
          question: "The sales associate couldn't give a cash refund because __________.", 
          options: [
            "(A) the headphones were damaged",
            "(B) the customer was rude",
            "(C) it's against her personal preference",
            "(D) store policy requires a receipt"
          ], 
          correct: 3,
          explanation: "Sales Associate: 'Our store policy requires a receipt for cash refunds. Without it, I'm unable to process a full monetary return.' (Chính sách cửa hàng yêu cầu biên lai cho hoàn tiền mặt)."
        },
        { 
          id: 20, 
          question: "The sales associate tries to __________.", 
          options: [
            "(A) refuse any solution",
            "(B) offer an alternative solution",
            "(C) argue with the customer",
            "(D) call security"
          ], 
          correct: 1,
          explanation: "Sales Associate: 'To help resolve this situation, I can offer you a store credit for the full amount instead.' (Để giúp giải quyết tình huống này, tôi có thể cấp tín dụng cửa hàng với số tiền đầy đủ thay thế)."
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
          question: "The new software system has proven to be _______ efficient than the previous version.",
          options: ["significance more", "significant most", "significantly more", "more significantly"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'significantly more' vì đây là cấu trúc so sánh hơn với trạng từ 'significantly' bổ nghĩa cho 'more efficient'. Kiến thức ngữ pháp: Trạng từ + so sánh hơn (adverb + comparative form)."
        },
        {
          id: 22,
          question: "_______ participated in the training workshop gained valuable skills for their professional development.",
          options: ["Whoever", "Those who", "Anyone", "That"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Those who' vì đây là đại từ quan hệ số nhiều thay thế cho danh từ người trong mệnh đề chủ ngữ. Kiến thức ngữ pháp: Đại từ quan hệ 'Those who' + động từ số nhiều."
        },
        {
          id: 23,
          question: "The marketing team has been working on the campaign _______ the project was approved last month.",
          options: ["although", "since", "unless", "whereas"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'since' vì nó chỉ mốc thời gian bắt đầu hành động với thì hiện tại hoàn thành tiếp diễn. Kiến thức ngữ pháp: 'Since' + mốc thời gian + present perfect continuous."
        },
        {
          id: 24,
          question: "All participants must complete the registration form and submit _______ identification documents.",
          options: ["validate", "valid", "validity", "validly"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'valid' vì đây là tính từ bổ nghĩa cho danh từ 'identification documents'. Kiến thức ngữ pháp: Tính từ đứng trước danh từ để mô tả (valid documents = giấy tờ hợp lệ)."
        },
        {
          id: 25,
          question: "The company's new policy emphasizes that _______ communication improves workplace productivity.",
          options: ["effect", "effective", "effectively", "effectiveness"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'effective' vì đây là tính từ bổ nghĩa cho danh từ 'communication'. Kiến thức ngữ pháp: Tính từ 'effective' (hiệu quả) đứng trước danh từ."
        },
        {
          id: 26,
          question: "Employees are encouraged to _______ their ideas during the monthly brainstorming sessions.",
          options: ["sharing", "shares", "share", "shared"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'share' vì đây là động từ nguyên thể sau 'to' trong cấu trúc 'be encouraged to + V'. Kiến thức ngữ pháp: 'to + V nguyên thể' sau động từ khuyến khích."
        },
        {
          id: 27,
          question: "_______ receiving customer feedback, the product development team made several improvements.",
          options: ["After", "Despite", "Although", "Unless"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'After' vì nó chỉ thứ tự thời gian và đi với V-ing. Kiến thức ngữ pháp: 'After + V-ing' để diễn tả hành động xảy ra sau."
        },
        {
          id: 28,
          question: "The research team is looking for candidates who can analyze data _______ and draw meaningful conclusions.",
          options: ["accuracy", "accurate", "accurately", "accurateness"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'accurately' vì đây là trạng từ bổ nghĩa cho động từ 'analyze'. Kiến thức ngữ pháp: Trạng từ 'accurately' (một cách chính xác) bổ nghĩa động từ."
        },
        {
          id: 29,
          question: "Due to the unexpected power outage, the conference has been _______ to next Tuesday.",
          options: ["rescheduled", "rescheduling", "reschedule", "reschedules"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'rescheduled' vì đây là dạng quá khứ phân từ trong thì hiện tại hoàn thành thụ động (has been + V3). Kiến thức ngữ pháp: Cấu trúc bị động 'has been rescheduled'."
        },
        {
          id: 30,
          question: "The supervisor emphasized that attention to detail and creativity are essential qualities for maintaining high _______.",
          options: ["standards", "schedules", "expenses", "locations"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'standards' vì nó chỉ 'tiêu chuẩn cao', phù hợp với ngữ cảnh chất lượng công việc. Kiến thức từ vựng: 'High standards' (tiêu chuẩn cao) là cụm từ cố định trong quản lý chất lượng."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Research and Development Staff
From: Dr. Michael Chen, R&D Director  
Subject: Innovation Lab Project Launch


Dear Colleagues,

I am pleased to announce that our company will be launching a groundbreaking Innovation Lab initiative, set to begin operations in the second quarter of this year. This ambitious project aims to foster creativity and accelerate the development of cutting-edge solutions for our clients. To ensure seamless implementation, we will conduct a series of planning meetings starting next month. Each department member will receive specific assignments to (31) effective collaboration across all divisions.

Our main goal is to enhance our competitive advantage and establish ourselves as industry leaders in technological innovation. The engineering team will concentrate on prototype development, while the design specialists will create user-friendly interfaces to (32) our product quality and user experience.

Furthermore, we will work in close partnership with our quality assurance team to gather comprehensive testing data. This information will enable us to make critical refinements before the public launch. Please remember that all proposals must be delivered to the project coordinator by Friday, April 19, allowing sufficient time for thorough evaluation and (33).

The official unveiling ceremony will be held at our central facility on May 15. We anticipate attendance from prominent industry experts and media representatives, so all team members should be ready to demonstrate our innovations with utmost professionalism. A comprehensive preparation workshop will occur three days prior to the ceremony to (34) everyone feels confident in their presentations.

For newly hired staff members, we will arrange a detailed orientation program covering our innovation protocols and interdepartmental communication guidelines. Participation is strongly recommended, as this training will provide crucial insights into how to (35) with colleagues from various departments productively.

We sincerely value each person's enthusiasm and collaborative spirit during this exciting period. Your innovation and commitment will undoubtedly contribute to making this initiative a tremendous success. Should you have any inquiries or suggestions, please feel free to (36) me at any time.

Thank you for your ongoing dedication to excellence. I am optimistic that, working together, we will accomplish remarkable achievements.

Warm regards,

Dr. Michael Chen
R&D Director
TechVision Industries`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "Each department member will receive specific assignments to (31) effective collaboration across all divisions.",
          options: ["complicate", "facilitate", "eliminate", "postpone"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'facilitate' vì nó nghĩa là 'tạo điều kiện thuận lợi', phù hợp với 'assignments to facilitate effective collaboration' (nhiệm vụ để tạo điều kiện cho sự hợp tác hiệu quả)."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "...while the design specialists will create user-friendly interfaces to (32) our product quality and user experience.",
          options: ["reduce", "enhance", "diminish", "ignore"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'enhance' vì nó nghĩa là 'nâng cao', phù hợp với 'create interfaces to enhance product quality' (tạo giao diện để nâng cao chất lượng sản phẩm)."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...allowing sufficient time for thorough evaluation and (33).",
          options: ["approval", "rejection", "cancellation", "confusion"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'approval' vì nó nghĩa là 'phê duyệt', phù hợp với 'evaluation and approval' (đánh giá và phê duyệt)."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "A comprehensive preparation workshop will occur three days prior to the ceremony to (34) everyone feels confident in their presentations.",
          options: ["prevent", "doubt", "ensure", "confuse"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'ensure' vì nó nghĩa là 'đảm bảo', phù hợp với 'to ensure everyone feels confident' (để đảm bảo mọi người tự tin)."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "...provide crucial insights into how to (35) with colleagues from various departments productively.",
          options: ["argue", "collaborate", "compete", "disagree"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'collaborate' vì nó nghĩa là 'cộng tác', phù hợp với 'how to collaborate with colleagues productively' (cách cộng tác với đồng nghiệp một cách hiệu quả)."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Should you have any inquiries or suggestions, please feel free to (36) me at any time.",
          options: ["contact", "avoid", "interrupt", "disregard"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'contact' vì nó nghĩa là 'liên hệ', phù hợp với 'feel free to contact me' (hãy thoải mái liên hệ với tôi)."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - The Innovation Lab will most likely begin operations ___.",
          options: ["next month", "in three months", "in the second quarter", "next year"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'in the second quarter' vì email đề cập 'set to begin operations in the second quarter of this year' (dự kiến bắt đầu hoạt động trong quý hai năm nay)."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is the primary purpose of this message?",
          options: ["To announce the Innovation Lab project launch", "To cancel an existing research program", "To introduce a new company policy", "To request budget approval"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì toàn bộ email tập trung vào 'launching a groundbreaking Innovation Lab initiative' (ra mắt sáng kiến phòng thí nghiệm đổi mới đột phá)."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - Who sent this message?",
          options: ["The HR manager", "The R&D Director", "A project coordinator", "The CEO"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email từ 'Dr. Michael Chen, R&D Director' (Tiến sĩ Michael Chen, Giám đốc R&D)."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - When will the preparation workshop take place?",
          options: ["April 19", "May 12", "May 15", "Next month"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'A comprehensive preparation workshop will occur three days prior to the ceremony' và ceremony là 'May 15', vậy 3 ngày trước là May 12."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**Professional Translation Services International**

Transform Your Global Communication with Expert Translation Solutions

Quality translation services are essential for businesses expanding into international markets. Professional Translation Services International delivers accurate, culturally appropriate translations within five business days!

**Our Comprehensive Services:**
1. **Certified Document Translation** – We employ experienced translators specializing in legal, medical, technical, and business documents. Visit ptstranslate.com to review our translators' credentials and select the specialist best suited for your project.

2. **Website Localization** – We provide complete website translation and cultural adaptation services to help your business connect with global audiences effectively.

3. **Professional Editing and Proofreading** – Our expert editors ensure your translated content maintains the highest standards of accuracy and readability.

4. **Interpretation Services** – For businesses requiring real-time language support, we offer professional interpretation for meetings, conferences, and business negotiations in over 50 languages.

Contact us via email (services@ptstranslate.com) with your project details and contact information. Our client relations specialist will respond within 48 hours to discuss your requirements and provide a comprehensive quote.

---

**Email Message**

**To:** services@ptstranslate.com
**From:** r.martinez@globaltechsolutions.com
**Date:** September 18
**Subject:** Translation Service Inquiry

I discovered your advertisement in the Business Weekly magazine and am interested in using your translation services for my technology consulting firm. Specifically, I need certified translation of our company's technical documentation and user manuals from English into Mandarin Chinese and Japanese. These documents will be used for our expansion into Asian markets.

I'm wondering about your turnaround time and whether your team has experience with technical terminology in the software industry. Additionally, I would appreciate information about your quality assurance process for technical translations.

Please contact me via email during business hours, as I frequently travel for work. I would like to begin this project as soon as possible, ideally within the next two weeks.

Thank you for your assistance,
Robert Martinez
Global Tech Solutions
r.martinez@globaltechsolutions.com
1600 Innovation Drive, San Jose, CA 95110`,
      
      questions: [
        {
          id: 41,
          question: "According to the advertisement, why should clients visit the company website?",
          options: ["To schedule an interpretation session", "To pay for translation services online", "To review translators' credentials", "To download free translation software"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì quảng cáo nêu 'Visit ptstranslate.com to review our translators' credentials' (Truy cập để xem thông tin chuyên môn của đội ngũ dịch giả)."
        },
        {
          id: 42,
          question: "What is indicated about Professional Translation Services International?",
          options: ["It advertises in Business Weekly magazine.", "It only translates legal documents.", "It completes all projects in 24 hours.", "It has offices in over 50 countries."],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì email đề cập 'I discovered your advertisement in the Business Weekly magazine' (Tôi phát hiện quảng cáo của bạn trên tạp chí Business Weekly)."
        },
        {
          id: 43,
          question: "Who most likely is Mr. Martinez?",
          options: ["A freelance translator", "A magazine editor", "A business owner in the technology sector", "An interpretation specialist"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì email từ 'r.martinez@globaltechsolutions.com' và nội dung 'my technology consulting firm' (công ty tư vấn công nghệ của tôi)."
        },
        {
          id: 44,
          question: "Which service does Mr. Martinez NOT mention needing?",
          options: ["Certified document translation", "Website localization", "Technical translation into Asian languages", "Quality assurance for translations"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email chỉ yêu cầu 'certified translation of technical documentation and user manuals' (dịch thuật có chứng nhận tài liệu kỹ thuật), không đề cập website localization."
        },
        {
          id: 45,
          question: "What will Mr. Martinez most likely receive within 48 hours?",
          options: ["Completed translated documents", "A response from a client relations specialist", "A list of available translators", "An invitation to visit the office"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'Our client relations specialist will respond within 48 hours' (Chuyên viên quan hệ khách hàng sẽ phản hồi trong 48 giờ)."
        },
        {
          id: 46,
          question: "According to the advertisement, how long does the company typically take to complete translations?",
          options: ["Within 48 hours", "Within five business days", "Within two weeks", "Within one month"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'delivers accurate, culturally appropriate translations within five business days' (cung cấp bản dịch chính xác trong năm ngày làm việc)."
        },
        {
          id: 47,
          question: "What type of documents does Mr. Martinez need translated?",
          options: ["Legal contracts and agreements", "Medical research papers", "Technical documentation and user manuals", "Marketing brochures"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì email nêu 'certified translation of our company's technical documentation and user manuals' (dịch có chứng nhận tài liệu kỹ thuật và hướng dẫn sử dụng)."
        },
        {
          id: 48,
          question: "Into which languages does Mr. Martinez want his documents translated?",
          options: ["Spanish and Portuguese", "French and German", "Mandarin Chinese and Japanese", "Korean and Vietnamese"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì email nêu 'from English into Mandarin Chinese and Japanese' (từ tiếng Anh sang tiếng Trung Quốc phổ thông và tiếng Nhật)."
        },
        {
          id: 49,
          question: "How does Mr. Martinez prefer to be contacted?",
          options: ["By phone during business hours", "Via email", "Through video conference", "By postal mail"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'Please contact me via email during business hours' (Vui lòng liên hệ tôi qua email trong giờ làm việc)."
        },
        {
          id: 50,
          question: "What is Mr. Martinez's timeline for starting the project?",
          options: ["Within the next month", "As soon as possible, within two weeks", "After reviewing multiple quotes", "No specific timeline mentioned"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'I would like to begin this project as soon as possible, ideally within the next two weeks' (Tôi muốn bắt đầu dự án càng sớm càng tốt, lý tưởng trong hai tuần tới)."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Doctor Chen (09:45): Morning Anna! My train from Boston is running late – expected arrival at Penn Station 10:20 instead of 10:00. Apologies!
Anna (09:47): No worries at all! I'll check the updated schedule and meet you at the main entrance.
Doctor Chen (09:50): Perfect, we should still make it to our client presentation on time. Track maintenance caused the delay.
Anna (10:05): Understood. The conference room parking might be limited today, but I'll find a spot.
Doctor Chen (14:30): Just arrived! Looking forward to seeing you shortly!`,
      questions: [
        {
          id: 51,
          question: "What can be inferred about Doctor Chen?",
          options: ["He is traveling for business purposes.", "He works permanently in Boston.", "He missed his train completely.", "He is meeting a new client for the first time."],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì đề cập 'our client presentation' (bài thuyết trình khách hàng của chúng ta) và chuyến tàu từ Boston đến Penn Station."
        },
        {
          id: 52,
          question: "At 10:05, what does Anna mean when she writes, 'Understood'?",
          options: ["She has confirmed the train's new arrival time.", "She knows why the delay occurred.", "She will definitely find parking easily.", "She agrees to cancel the presentation."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Understood' đáp lại lời giải thích về nguyên nhân chậm trễ (track maintenance)."
        },
        {
          id: 53,
          question: "Why was Doctor Chen's train delayed?",
          options: ["Bad weather conditions", "Track maintenance work", "Mechanical problems with the train", "Overcrowding at the station"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Doctor Chen nói 'Track maintenance caused the delay' (Bảo trì đường ray gây ra sự chậm trễ)."
        },
        {
          id: 54,
          question: "What is Doctor Chen's updated arrival time?",
          options: ["09:45", "10:00", "10:20", "14:30"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Doctor Chen nói 'expected arrival at Penn Station 10:20 instead of 10:00' (dự kiến đến Penn Station 10:20 thay vì 10:00)."
        },
        {
          id: 55,
          question: "What does Anna offer to do for Doctor Chen?",
          options: ["Book a hotel room", "Meet him at Penn Station", "Reschedule the presentation", "Drive him to Boston"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Anna nói 'meet you at the main entrance' (gặp bạn ở lối vào chính của Penn Station)."
        },
        {
          id: 56,
          question: "What is the relationship between Doctor Chen and Anna?",
          options: [
            "They are family members.", 
            "They are colleagues working together.", 
            "They are client and consultant.", 
            "They have never met before."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'our client presentation' (bài thuyết trình khách hàng của chúng ta) ngụ ý họ cùng làm việc."
        },
        {
          id: 57,
          question: "At 09:50, why does Doctor Chen mention 'we should still make it to our client presentation on time'?",
          options: ["To cancel the meeting", "To reassure Anna about the schedule", "To request a delay in the presentation", "To complain about the train service"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì mục đích là trấn an Anna rằng dù chậm 20 phút vẫn kịp giờ thuyết trình."
        },
        {
          id: 58,
          question: "What does Anna mean when she writes 'I'll check the updated schedule'?",
          options: ["She will reschedule the client meeting.", "She will verify the train's new arrival time.", "She will check her personal calendar.", "She will contact the train company."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'check the updated schedule' sau khi biết giờ tàu mới là 10:20."
        },
        {
          id: 59,
          question: "What concern does Anna mention about the meeting location?",
          options: ["The room might be too small.", "Parking spaces might be limited.", "The building is difficult to find.", "The presentation equipment is broken."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì Anna nói 'The conference room parking might be limited today' (Chỗ đậu xe phòng hội nghị có thể hạn chế hôm nay)."
        },
        {
          id: 60,
          question: "What does Doctor Chen's final message at 14:30 indicate?",
          options: ["He is still on the train.", "He has arrived at the station.", "He is canceling the meeting.", "He is lost and needs directions."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Just arrived!' (Vừa đến nơi!) cho thấy đã đến Penn Station."
        }
      ]
    }
  }
};