    export const EXAM1_DATA = {
      title: "HUFLIT Listening & Reading Practice - Exam 1 (Dựa trên Đề Thi Thử)",
      description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết.",
      parts: {
        // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
      part1 : {
    title: "PART 1: Short Conversations",
    description: "Nghe đoạn hội thoại giữa Mark và Sarah về chuyến đi. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
    type: "listening",
    script: "Mark: Welcome back, Sarah! How was your recent trip to Taiwan?\nSarah: It was amazing, Mark. I spent about one month exploring the whole island. I went to the night markets in Taipei hoping to buy a lot of clothes and souvenirs, but I didn't buy anything because I found the prices too high. I just window-shopped the whole time.\nMark: Ah, that's rough. I know that feeling. What about your trip to Japan? I remember you were there for a week last year.\nSarah: I loved Tokyo! I wish I could've gone in a different season, though. I heard from a lot of people that you really need to visit in the spring to see the cherry blossoms at their peak.\nMark: Good point. How did you manage getting around in such a huge city? Was Tokyo easy to navigate?\nSarah: Hmm, I found it was a little bit easy to get around. The subway system is vast, but once you memorize a few key lines, it works well. But I certainly wouldn't call it 'very easy'—it still required a bit of effort!",
    questions: [
      {
        id: 1,
        options: [
          "She didn't buy anything because it wasn't beautiful.",
          "She didn't buy anything because she found prices too high.",
          "She bought a lot of things because they're really cheap.",
          "She bought nothing because she did not have time."
        ],
        correct: 1,
        explanation: "Sarah nói: 'I didn't buy anything because I found the prices too high.' (Tôi không mua gì vì thấy giá quá cao)."
      },
      {
        id: 2,
        options: [
          "He spent one month there.",
          "He spent seven months there.",
          "He spent one week there.",
          "He spent several times there."
        ],
        correct: 0,
        explanation: "Sarah nói: 'I spent about one month exploring the whole island.' (Tôi dành khoảng một tháng khám phá toàn đảo)."
      },
      {
        id: 3,
        options: [
          "She didn't buy anything in Taipei.",
          "She bought many things in Taipei.",
          "She bought a few things in Taipei.",
          "She bought a souvenir in Taipei."
        ],
        correct: 0,
        explanation: "Sarah nói: 'I didn't buy anything because I found the prices too high. I just window-shopped the whole time.' (Tôi không mua gì vì giá quá cao. Tôi chỉ ngắm nghía suốt thời gian)."
      },
      {
        id: 4,
        options: [
          "People told him to visit in the summer.",
          "People didn't tell him to visit in the spring.",
          "People told him to visit in the spring.",
          "People told him to visit in the autumn."
        ],
        correct: 2,
        explanation: "Sarah nói: 'I heard from a lot of people that you really need to visit in the spring to see the cherry blossoms at their peak.' (Tôi nghe nhiều người nói rằng bạn cần đến vào mùa xuân để ngắm hoa anh đào ở đỉnh cao)."
      },
      {
        id: 5,
        options: [
          "He found that Tokyo was very easy to get around.",
          "He found that Tokyo was not easy to get around.",
          "He found that Tokyo was a little bit easy to get around.",
          "He found that Tokyo was too busy to get around."
        ],
        correct: 2,
        explanation: "Sarah nói: 'I found it was a little bit easy to get around. The subway system is vast, but once you memorize a few key lines, it works well.' (Tôi thấy nó hơi dễ di chuyển. Hệ thống tàu điện ngầm rộng, nhưng sau khi nhớ được một vài tuyến chính thì khá tốt)."
      }
    ]
  },
  part2: {
    title: "PART 2: Longer Conversation",
    description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người ở quán cà phê. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
    type: "listening",
    script: "Narrator: At the cafe.\nWaiter: Good afternoon! Are you ready to order drinks?\nMike: Yes, I'll have an orange juice.\nSarah: Me too, please.\nJohn: And one for me as well.\nWaiter: That's three orange juices.\nMike: Sarah, why aren't you ordering food?\nSarah: I'm not hungry right now; I had a late lunch and I'm trying to eat lighter these days.\nJohn: By the way, I heard Uncle Robertson quit his restaurant job. What's he doing now?\nMike: He owns his own business still, but now he works with young players coaching soccer in Orlando.\nSarah: That's exciting! Speaking of family, Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow. Yes, my sister and your aunt will join us.\nMike: For Emily's birthday, what gift?\nJohn: Money is practical.\nSarah: Or clothes.\nMike: A hat might be fun.\nJohn: We can't decide yet; let's think more.",
    questions: [
      {
        id: 6,
        question: "How many people want orange juice?",
        options: [
          "Two",
          "Three",
          "Four",
          "Five"
        ],
        correct: 1,
        explanation: "Waiter nói: 'That's three orange juices.' (Đó là ba nước cam.) Mike, Sarah, và John đều gọi orange juice."
      },
      {
        id: 7,
        question: "Why doesn't the woman want anything to eat?",
        options: [
          "Because she's not hungry.",
          "Because she doesn't feel well.",
          "Because she's on a diet.",
          "Because the food is not good enough."
        ],
        correct: 0,
        explanation: "Sarah nói: 'I'm not hungry right now; I had a late lunch and I'm trying to eat lighter these days.' (Tôi không đói lúc này; tôi ăn trưa muộn và đang cố ăn nhẹ hơn những ngày này.)"
      },
      {
        id: 8,
        question: "What does Robertson do now?",
        options: [
          "He owns a restaurant.",
          "He works in Orlando.",
          "He works with young players.",
          "He works in a restaurant."
        ],
        correct: 2,
        explanation: "Mike nói: 'He owns his own business still, but now he works with young players coaching soccer in Orlando.' (Ông ấy vẫn sở hữu doanh nghiệp riêng, nhưng giờ làm việc với các cầu thủ trẻ huấn luyện bóng đá ở Orlando.)"
      },
      {
        id: 9,
        question: "Who's coming to lunch?",
        options: [
          "The man's mother-in-law and his sister.",
          "The man's mother and his sister-in-law.",
          "The man's mother-in-law and her sister.",
          "The man's sister-in-law and his sister."
        ],
        correct: 1,
        explanation: "Sarah nói: 'Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow.' (Mẹ và dì Lisa – em dâu của anh – sẽ đến ăn trưa ngày mai.)"
      },
      {
        id: 10,
        question: "What are they going to give their granddaughter for her birthday?",
        options: [
          "Money",
          "Clothes",
          "A hat",
          "They can't decide."
        ],
        correct: 3,
        explanation: "John nói: 'We can't decide yet; let's think more.' (Chúng ta chưa quyết định được; hãy nghĩ thêm.) Họ đã thảo luận tiền, quần áo, và mũ nhưng chưa đưa ra quyết định cuối cùng."
      }
    ]
  },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Good afternoon, everyone. Welcome to this English class. It's acceptable for intermediate learners, though we aim higher. I have just received the results of your diagnostic test – most of you got around 6.5, which is a good start. Remember, if you miss a deadline your tutor has set for homework, you will be given a zero; no excuses without documentation. Angela was an intelligent kid in class last term; she excelled but learned the hard way about deadlines. On another note, the restaurant in the main street has a good menu, nice food, and lots of options for vegetarians – all correct choices if you're dining out after class.",
      questions: [
        { 
          id: 11, 
          question: "The class is __________.", 
          options: ["(A) good enough", "(B) acceptable", "(C) awful", "(D) success"], 
          correct: 1,
          explanation: "Professor: 'It's acceptable for intermediate learners, though we aim higher.' (Giáo sư: 'Nó chấp nhận được cho học viên trung cấp, dù chúng ta nhắm cao hơn.') - Luyện nghe đánh giá mức độ phù hợp của lớp học."
        },
        { 
          id: 12, 
          question: "I have just _________.", 
          options: ["(A) done a master's", "(B) got the result of my English test", "(C) got 6.5", "(D) get"], 
          correct: 1,
          explanation: "Professor: 'I have just received the results of your diagnostic test – most of you got around 6.5.' (Giáo sư: 'Tôi vừa nhận kết quả bài kiểm tra chẩn đoán của các bạn – hầu hết các bạn đạt khoảng 6.5.') - Luyện nghe hành động nhận kết quả gần đây."
        },
        { 
          id: 13, 
          question: "If miss a deadline your tutor has set, you __________.", 
          options: ["(A) will be given a zero", "(B) will get 50% of your marks", "(C) will be fined", "(D) will get all marks"], 
          correct: 0,
          explanation: "Professor: 'If you miss a deadline your tutor has set for homework, you will be given a zero; no excuses without documentation.' (Giáo sư: 'Nếu bạn bỏ lỡ hạn chót mà gia sư đặt cho bài tập, bạn sẽ bị cho điểm 0; không có lý do nào được chấp nhận mà không có tài liệu.') - Luyện nghe quy định học tập nghiêm ngặt."
        },
        { 
          id: 14, 
          question: "Angela was __________.", 
          options: ["(A) an intelligent kid in class", "(B) a bit bored at her school", "(C) an AI", "(D) already"], 
          correct: 0,
          explanation: "Professor: 'Angela was an intelligent kid in class last term; she excelled but learned the hard way about deadlines.' (Giáo sư: 'Angela là một đứa trẻ thông minh trong lớp kỳ trước; cô ấy xuất sắc nhưng học được bài học khó khăn về hạn chót.') - Luyện nghe đặc điểm cá nhân và bài học kinh nghiệm."
        },
        { 
          id: 15, 
          question: "The restaurant in the main street __________.", 
          options: ["(A) has a good menu", "(B) has nice food", "(C) has a lots of option for vegetarians", "(D) all correct"], 
          correct: 3,
          explanation: "Professor: 'The restaurant in the main street has a good menu, nice food, and lots of options for vegetarians – all correct choices.' (Giáo sư: 'Nhà hàng trên phố chính có thực đơn tốt, đồ ăn ngon, và nhiều lựa chọn cho người ăn chay – tất cả đều là lựa chọn đúng.') - Luyện nghe đánh giá toàn diện về địa điểm ăn uống."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Customer: Hi, I'd like to return this tie, please. It was a birthday present from my girlfriend.\nSales Associate: Sure, when was it bought?\nCustomer: A few weeks ago.\nSales Associate: Any problem with it?\nCustomer: No, just not my style. I didn't bring the receipt – she must have tossed it. But the store tag is still on.\nSales Associate: I see, but without the receipt, I can't process a full refund. Our policy requires proof that it was shopped in this store.\nCustomer: Come on, the tag proves it!\nSales Associate: To calm the man down, I can give store credit instead. Or check your credit card for the transaction details.",
      questions: [
        { 
          id: 16, 
          question: "The tie __________.", 
          options: ["(A) was a birthday present", "(B) was a Christmas present", "(C) was a gift of a boyfriend", "(D) all correct"], 
          correct: 0,
          explanation: "Customer: 'It was a birthday present from my girlfriend.' (Khách hàng: 'Nó là quà sinh nhật từ bạn gái tôi.') - Luyện nghe nguồn gốc quà tặng trong tình huống mua sắm."
        },
        { 
          id: 17, 
          question: "The tie was purchased ___________.", 
          options: ["(A) last week", "(B) a few weeks ago", "(C) two weeks ago", "(D) two years ago"], 
          correct: 1,
          explanation: "Customer: 'A few weeks ago.' (Khách hàng: 'Vài tuần trước.') - Luyện nghe khoảng thời gian mua hàng gần đây."
        },
        { 
          id: 18, 
          question: "When asking for refunding, the man __________.", 
          options: ["(A) had a receipt", "(B) left his receipt at home", "(C) didn't have receipt", "(D) don't receipt"], 
          correct: 2,
          explanation: "Customer: 'I didn't bring the receipt – she must have tossed it.' (Khách hàng: 'Tôi không mang biên lai – cô ấy chắc đã vứt nó đi.') - Luyện nghe vấn đề thiếu giấy tờ trong quy trình hoàn tiền."
        },
        { 
          id: 19, 
          question: "She (the shop assistant) didn't agree to pay back money because __________.", 
          options: ["(A) she didn't believe in the man", "(B) the man couldn't prove that the tie was shopped in her store", "(C) she has no right to do so", "(D) she hadn't believed"], 
          correct: 1,
          explanation: "Sales Associate: 'Without the receipt, I can't process a full refund. Our policy requires proof that it was shopped in this store.' (Nhân viên: 'Không có biên lai, tôi không thể xử lý hoàn tiền đầy đủ. Chính sách của chúng tôi yêu cầu bằng chứng rằng nó được mua ở cửa hàng này.') - Luyện nghe lý do chính sách cửa hàng."
        },
        { 
          id: 20, 
          question: "The shop assistant tries to __________.", 
          options: ["(A) make the man angry", "(B) calm the man down", "(C) bother the man", "(D) make the man happy"], 
          correct: 1,
          explanation: "Sales Associate: 'To calm the man down, I can give store credit instead.' (Nhân viên: 'Để trấn an người đàn ông, tôi có thể cho tín dụng cửa hàng thay thế.') - Luyện nghe chiến lược giải quyết khiếu nại của nhân viên bán hàng."
        }
      ]
    },
        // Reading Parts - Giữ nguyên, nhưng thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
      type: "reading",
      questions: [
      {
        id: 21,
        question: "Customer reviews indicate that many modern mobile devices are often unnecessarily _______.",
        options: ["Complication", "Complicates", "Complicate", "Complicated"],
        correct: 3,
        explanation: "Đáp án đúng là (D) 'Complicated' vì đây là dạng tính từ (past participle) dùng để miêu tả trạng thái của danh từ 'devices' (thiết bị di động). Kiến thức ngữ pháp: Phân biệt giữa danh từ (A), động từ ngôi thứ ba số ít (B), động từ nguyên thể số nhiều (C), và tính từ (D) trong cấu trúc bị động hoặc mô tả trạng thái."
      },
      {
        id: 22,
        question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.",
        options: ["who", "whose", "they", "those"],
        correct: 3,
        explanation: "Đáp án đúng là (D) 'those' vì đây là đại từ thay thế cho danh từ số nhiều 'analyst and associate' trong mệnh đề quan hệ đảo ngữ. Kiến thức ngữ pháp: Sử dụng đại từ chỉ định 'those' (số nhiều) trong cấu trúc đảo ngữ 'Among those recognized...' để tránh lặp từ và tạo sự trang trọng."
      },
      {
        id: 23,
        question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.",
        options: ["despite", "except", "since", "during"],
        correct: 2,
        explanation: "Đáp án đúng là (C) 'since' vì nó chỉ thời điểm bắt đầu một hành động kéo dài đến hiện tại (present perfect tense). Kiến thức ngữ pháp: Liên từ thời gian 'since' + mốc thời gian cụ thể (e.g., 'since he joined') kết hợp với thì hiện tại hoàn thành để diễn tả hành động từ quá khứ đến nay."
      },
      {
        id: 24,
        question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no __________ dyes.",
        options: ["immediate", "synthetic", "reasonable", "assumed"],
        correct: 1,
        explanation: "Đáp án đúng là (B) 'synthetic' vì đây là tính từ chuyên ngành chỉ 'nhân tạo' (trái ngược với 'natural materials'), phù hợp ngữ cảnh. Kiến thức từ vựng: Phân biệt tính từ mô tả chất liệu (synthetic = tổng hợp, immediate = ngay lập tức, reasonable = hợp lý, assumed = giả định) trong văn bản quảng cáo sản phẩm."
      },
      {
        id: 25,
        question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.",
        options: ["regular", "regularity", "regulate", "regularly"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'regular' vì đây là tính từ làm modifier cho danh từ 'learning'. Kiến thức ngữ pháp: Tính từ 'regular' (thường xuyên) đứng trước danh từ để mô tả; không dùng danh từ (B), động từ (C), hoặc trạng từ (D) ở vị trí này."
      },
      {
        id: 26,
        question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.",
        options: ["include", "includes", "included", "including"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'include' vì đây là động từ nguyên thể sau 'will' (tương lai đơn). Kiến thức ngữ pháp: Cấu trúc 'will + V nguyên thể' để diễn tả hành động tương lai; không dùng ngôi thứ ba số ít (B), quá khứ phân từ (C), hoặc giới từ + V-ing (D)."
      },
      {
        id: 27,
        question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.",
        options: ["before", "during", "between", "unless"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'before' vì nó chỉ thứ tự thời gian (trước khi). Kiến thức ngữ pháp: Liên từ thời gian 'before + V-ing' để diễn tả hành động xảy ra trước hành động chính; 'during' (trong khi), 'between' (giữa), 'unless' (trừ khi) không phù hợp ngữ cảnh."
      },
      {
        id: 28,
        question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.",
        options: ["independence", "independently", "independent", "dependently"],
        correct: 1,
        explanation: "Đáp án đúng là (B) 'independently' vì đây là trạng từ bổ nghĩa cho động từ 'work' (làm việc độc lập). Kiến thức ngữ pháp: Trạng từ 'independently' (một cách độc lập) bổ nghĩa động từ; danh từ (A), tính từ (C), hoặc trạng từ ngược (D) không phù hợp."
      },
      {
        id: 29,
        question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.",
        options: ["postponed", "postponing", "postpone", "postpones"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'postponed' vì đây là dạng quá khứ phân từ trong thì hiện tại hoàn thành thụ động (has been + V3). Kiến thức ngữ pháp: Cấu trúc bị động 'has been postponed' để diễn tả sự kiện bị hoãn; không dùng V-ing (B), nguyên thể (C), hoặc ngôi thứ ba (D)."
      },
      {
        id: 30,
        question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.",
        options: ["environment", "equipment", "advertisement", "appointment"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'environment' vì nó chỉ 'môi trường làm việc tích cực', phù hợp ngữ cảnh. Kiến thức từ vựng: Danh từ chỉ môi trường (environment = môi trường), thay vì thiết bị (B), quảng cáo (C), hoặc cuộc hẹn (D) trong văn bản quản lý nhân sự."
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
  Marketing Director
  InnovateTech Solutions`,
      questions : [
      {
        id: 31,
        type: "fill",
        question: "(31) - Điền từ thích hợp",
        context: "Each team member will be assigned specific responsibilities to (31) smooth coordination between departments.",
        options: ["ensure", "suggest", "describe", "remind"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'ensure' vì nó nghĩa là 'đảm bảo', phù hợp với ngữ cảnh 'assigned responsibilities to ensure smooth coordination' (giao trách nhiệm để đảm bảo phối hợp suôn sẻ). Kiến thức ngữ pháp: Động từ 'ensure' + danh từ (smooth coordination) trong cấu trúc mục đích; 'suggest' (gợi ý), 'describe' (mô tả), 'remind' (nhắc nhở) không phù hợp."
      },
      {
        id: 32,
        type: "fill",
        question: "(32) - Điền từ thích hợp",
        context: "...the design team will create visual materials to (32) our brand image.",
        options: ["attend", "improve", "reinforce", "prevent"],
        correct: 2,
        explanation: "Đáp án đúng là (C) 'reinforce' vì nó nghĩa là 'củng cố', phù hợp với 'create visual materials to reinforce our brand image' (tạo tài liệu hình ảnh để củng cố hình ảnh thương hiệu). Kiến thức từ vựng: Động từ chỉ hành động hỗ trợ thương hiệu; 'attend' (tham dự), 'improve' (cải thiện), 'prevent' (ngăn chặn) không liên quan."
      },
      {
        id: 33,
        type: "fill",
        question: "(33) - Điền từ thích hợp",
        context: "...so that we have enough time to review and (33) them.",
        options: ["reject", "implement", "transfer", "decline"],
        correct: 1,
        explanation: "Đáp án đúng là (B) 'implement' vì nó nghĩa là 'triển khai', phù hợp với 'review and implement them' (xem xét và triển khai chúng). Kiến thức ngữ pháp: Động từ 'implement' + tân ngữ (them = suggestions) trong cấu trúc hành động sau đánh giá; 'reject' (từ chối), 'transfer' (chuyển giao), 'decline' (giảm sút) không phù hợp."
      },
      {
        id: 34,
        type: "fill",
        question: "(34) - Điền từ thích hợp",
        context: "A rehearsal session will be held two days before the event to (34) that all participants are comfortable with their roles.",
        options: ["warn", "announce", "require", "ensure"],
        correct: 3,
        explanation: "Đáp án đúng là (D) 'ensure' vì nó nghĩa là 'đảm bảo', phù hợp với 'to ensure that all participants are comfortable' (để đảm bảo tất cả người tham gia thoải mái). Kiến thức ngữ pháp: Cấu trúc 'to + V + that + clause' với 'ensure' để diễn tả mục đích; 'warn' (cảnh báo), 'announce' (thông báo), 'require' (yêu cầu) không khớp."
      },
      {
        id: 35,
        type: "fill",
        question: "(35) - Điền từ thích hợp",
        context: "...provide essential information on how to (35) with other departments effectively.",
        options: ["compete", "cooperate", "complain", "compare"],
        correct: 1,
        explanation: "Đáp án đúng là (B) 'cooperate' vì nó nghĩa là 'hợp tác', phù hợp với 'how to cooperate with other departments' (cách hợp tác với các bộ phận khác). Kiến thức từ vựng: Động từ chỉ hành động nhóm; 'compete' (cạnh tranh), 'complain' (phàn nàn), 'compare' (so sánh) mang nghĩa tiêu cực hoặc không liên quan."
      },
      {
        id: 36,
        type: "fill",
        question: "(36) - Điền từ thích hợp",
        context: "If you have any questions or concerns, please don't hesitate to (36) me directly.",
        options: ["reach", "push", "delay", "ignore"],
        correct: 0,
        explanation: "Đáp án đúng là (A) 'reach' vì nó nghĩa là 'liên lạc', phù hợp với 'don't hesitate to reach me directly' (đừng ngần ngại liên lạc trực tiếp với tôi). Kiến thức ngữ pháp: Động từ 'reach' + tân ngữ (me) trong cụm từ lịch sự yêu cầu liên hệ; 'push' (đẩy), 'delay' (trì hoãn), 'ignore' (bỏ qua) không phù hợp."
      },
      {
        id: 37,
        type: "comprehension",
        question: "(37) - The EcoSmart Home Series will most likely be released ___.",
        options: ["next week", "early next quarter", "by the end of the year", "after the press conference"],
        correct: 1,
        explanation: "Đáp án đúng là (B) 'early next quarter' vì email đề cập 'scheduled for early next quarter' (lên lịch cho đầu quý tới). Kiến thức đọc hiểu: Xác định thời gian từ ngữ cảnh chính (scheduled for early next quarter); các lựa chọn khác không khớp với thông tin."
      },
      {
        id: 38,
        type: "comprehension",
        question: "(38) - What is the main purpose of this message?",
        options: ["To introduce a new marketing policy", "To inform staff of product launch preparations", "To announce the cancellation of a campaign", "To request client feedback after the event"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì toàn bộ email tập trung vào 'preparing for the official launch' và 'finalize the promotional strategy' (chuẩn bị ra mắt sản phẩm và hoàn tất chiến lược quảng bá). Kiến thức đọc hiểu: Xác định mục đích chính từ tiêu đề và nội dung (Upcoming Product Launch Preparation)."
      },
      {
        id: 39,
        type: "comprehension",
        question: "(39) - Who is the sender of this message?",
        options: ["A sales representative", "A design manager", "The marketing director", "The chief financial officer"],
        correct: 2,
        explanation: "Đáp án đúng là (C) vì email từ 'Clara Lee, Marketing Director' (Clara Lee, Giám đốc Marketing). Kiến thức đọc hiểu: Xác định người gửi từ phần 'From' và chữ ký (Marketing Director)."
      },
      {
        id: 40,
        type: "comprehension",
        question: "(40) - When will the rehearsal for the press conference take place?",
        options: ["March 22", "April 3", "April 5", "The following week"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì 'A rehearsal session will be held two days before the event' và sự kiện là 'April 5', vậy 2 ngày trước là April 3. Kiến thức đọc hiểu: Tính toán thời gian từ ngữ cảnh (two days before April 5 = April 3)."
      }
    ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**Business Audio Pro Advertisement**

    Enhance Your Company's Image with a Professionally Recorded Telephone Greeting

    A professional, personalized voicemail message creates an excellent first impression. Business Audio Pro meets your specifications to record a customized telephone greeting within three business days!

    **Services We Offer:**
    1. **Professional Voice Talent for Voicemail Messages** – We have numerous male and female voice actors with a wide range of tones, accents, and dialects. Visit businessaudiopro.com to hear examples of what each actor sounds like and choose the one that best suits your needs.

    2. **On-Hold Messages** – We also create professional on-hold messages with pleasant music to enhance your customers' experience.

    3. **Customized Script Writing** – Our experienced script writers can help you craft a personalized message that represents you and your business.

    4. **Multilingual Voice Production** – For those with a multilingual customer base, we offer services in a wide range of languages.

    Send us an e-mail (inquiry@businessaudiopro.com) with your contact information and your specific needs. A representative will call you within 24 hours to discuss your project and provide a price estimate.

    ---

    **Email Message**

    **To:** inquiry@businessaudiopro.com
    **From:** j.annesly@anneslydata.com
    **Date:** June 25
    **Subject:** Request

    I found your notice in the newspaper and wish to use your services for my data-processing and transcription business. I am looking specifically for a professionally recorded voicemail greeting intended for my clients, and I wonder if you would be available to write and record this for me, and how soon. Since I work with English- and Spanish-speaking clients, I would like the message to be recorded in both languages. Please reach out to me at my mobile phone between the hours of 10:00 A.M. and 5:00 P.M. I hope to hear from you soon.

    Thank you,
    Jody Annesly
    Annesly Data
    512-555-6879 (mobile)
    342 Maymill Road, Fort Worth, TX 70609`,
      
      questions : [
      {
        id: 41,
        question: "According to the advertisement, why should customers visit the Business Audio Pro Web site?",
        options: ["To hear voice samples", "To add a new phone number", "To submit a credit card payment", "To request recording equipment"],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì quảng cáo nêu 'Visit businessaudiopro.com to hear examples of what each actor sounds like' (Truy cập để nghe ví dụ giọng của từng diễn viên). Kiến thức đọc hiểu: Xác định mục đích từ phần dịch vụ (Professional Voice Talent)."
      },
      {
        id: 42,
        question: "What is suggested about Business Audio Pro?",
        options: ["It fills orders once a week.", "It advertises in the newspaper.", "It specializes in data-processing services.", "It has recently expanded its business."],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì email đề cập 'I found your notice in the newspaper' (Tôi tìm thấy thông báo của bạn trên báo), ngụ ý quảng cáo trên báo. Kiến thức suy luận: Kết nối thông tin giữa email và quảng cáo để suy ra kênh quảng cáo."
      },
      {
        id: 43,
        question: "Who most likely is Ms. Annesly?",
        options: ["An actor", "A script writer", "A sales associate", "A business owner"],
        correct: 3,
        explanation: "Đáp án đúng là (D) vì email từ 'j.annesly@anneslydata.com' và chữ ký 'Jody Annesly, Annesly Data' (chủ doanh nghiệp dữ liệu). Kiến thức đọc hiểu: Xác định vai trò từ địa chỉ email và chữ ký (anneslydata.com)."
      },
      {
        id: 44,
        question: "What service does Ms. Annesly NOT request from Business Audio Pro?",
        options: ["Professional voice talent", "On-hold messages", "Customized script writing", "Multilingual voice production"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì email chỉ yêu cầu 'professionally recorded voicemail greeting... write and record this... in both languages' (ghi âm voicemail, viết kịch bản, đa ngôn ngữ), không đề cập on-hold messages. Kiến thức đọc hiểu: So sánh yêu cầu trong email với danh sách dịch vụ quảng cáo."
      },
      {
        id: 45,
        question: "What will Ms. Annesly most likely receive within 24 hours?",
        options: ["A voice sample recording", "A phone call from a representative", "A written script", "A completed voicemail greeting"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'A representative will call you within 24 hours' (Đại diện sẽ gọi trong 24 giờ). Kiến thức suy luận: Kết nối quy trình từ quảng cáo (gửi email → gọi điện thảo luận)."
      },
      {
        id: 46,
        question: "According to the advertisement, how long does Business Audio Pro take to complete a recording?",
        options: ["Within 24 hours", "Within three business days", "Within one week", "Within one month"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'record a customized telephone greeting within three business days' (ghi âm trong ba ngày làm việc). Kiến thức đọc hiểu: Trích dẫn trực tiếp thời gian từ phần dịch vụ chính."
      },
      {
        id: 47,
        question: "What type of business does Ms. Annesly operate?",
        options: ["A telephone company", "A data-processing and transcription business", "A voice acting agency", "A language school"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì email nêu 'my data-processing and transcription business' (doanh nghiệp xử lý dữ liệu và phiên âm). Kiến thức đọc hiểu: Xác định loại hình kinh doanh từ phần mô tả trong email."
      },
      {
        id: 48,
        question: "What does Ms. Annesly specifically request in her message?",
        options: ["On-hold messages with pleasant music", "A bilingual voicemail greeting", "Multiple voice actor samples", "A newspaper advertisement"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì 'recorded in both languages' (English and Spanish) cho voicemail greeting. Kiến thức đọc hiểu: Tập trung vào yêu cầu cụ thể 'in both languages' (song ngữ)."
      },
      {
        id: 49,
        question: "When does Ms. Annesly prefer to be contacted?",
        options: ["Between 10:00 A.M. and 5:00 P.M.", "Between 9:00 A.M. and 3:00 P.M.", "After business hours", "On weekends only"],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì email nêu 'between the hours of 10:00 A.M. and 5:00 P.M.' (giữa 10 giờ sáng và 5 giờ chiều). Kiến thức đọc hiểu: Trích dẫn trực tiếp khung giờ từ email."
      },
      {
        id: 50,
        question: "What languages does Ms. Annesly want her voicemail message recorded in?",
        options: ["English and French", "English and Spanish", "Spanish and Portuguese", "Multiple European languages"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì 'English- and Spanish-speaking clients' (khách hàng nói tiếng Anh và Tây Ban Nha). Kiến thức đọc hiểu: Xác định ngôn ngữ từ ngữ cảnh khách hàng trong email."
      }
    ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Mr. Bach (11:59): Flight delayed in Beijing – arriving Kansai at 12:06 instead of 12:00. Sorry!
    Mr. Otani (12:00): No problem. I'll confirm the arrival time and pick you up at customs door.
    Mr. Bach (12:03): Thanks, still in time for our client meeting. Bad weather caused the delay.
    Mr. Otani (12:15): Sure thing. Parking might be tight, but I'll wait.
    Mr. Bach (20:15): Landed safely. See you soon!`,
      questions: [
        {
        id: 51,
        question: "What is suggested about Mr. Bach?",
        options: ["He has been to Kansai more than once.", "He currently works in Beijing.", "He is on a business trip.", "He works for Fly Right Airlines."],
        correct: 2,
        explanation: "Đáp án đúng là (C) vì đề cập 'our client meeting' (cuộc họp khách hàng của chúng ta) và chuyến bay từ Beijing đến Kansai. Kiến thức suy luận: Ngụ ý từ ngữ cảnh 'client meeting' và chuyến bay quốc tế (business trip)."
      },
      {
        id: 52,
        question: "At 12:15, what does Mr. Otani mean when he writes, 'Sure thing'?",
        options: ["He has confirmed the arrival time of a flight.", "He is certain he will be able to find a parking place.", "He agrees to wait at the door near the customs area.", "He knows Mr. Bach must pass through customs."],
        correct: 2,
        explanation: "Đáp án đúng là (C) vì 'Sure thing' đáp lại lời cảm ơn và xác nhận 'I'll wait' (tôi sẽ chờ), liên quan đến việc đón tại cửa hải quan. Kiến thức suy luận: Cụm từ thân mật 'Sure thing' = đồng ý, kết nối với 'pick you up at customs door'."
      },
      {
        id: 53,
        question: "Why was Mr. Bach's flight delayed?",
        options: ["There was bad weather in Kansai.", "He missed his connection in Beijing.", "The airline changed the departure time.", "He forgot to check in early."],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì 'Bad weather caused the delay' (thời tiết xấu gây chậm trễ). Kiến thức đọc hiểu: Trích dẫn trực tiếp lý do từ tin nhắn của Mr. Bach."
      },
      {
        id: 54,
        question: "What time is Mr. Bach's new flight expected to arrive?",
        options: ["11:59", "12:06", "18:00", "20:15"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì 'arriving Kansai at 12:06 instead of 12:00' (đến Kansai lúc 12:06 thay vì 12:00). Kiến thức đọc hiểu: Trích dẫn trực tiếp thời gian mới từ tin nhắn đầu tiên."
      },
      {
        id: 55,
        question: "What does Mr. Otani offer to do for Mr. Bach?",
        options: ["Drive him to the hotel", "Pick him up at the airport", "Change his flight booking", "Help carry his luggage"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì 'pick you up at customs door' (đón bạn tại cửa hải quan sân bay). Kiến thức đọc hiểu: Xác định hành động hỗ trợ từ cụm từ 'pick you up' (đón tại sân bay)."
      },
      {
        id: 56,
        question: "What can be inferred about the two men?",
        options: ["They are colleagues attending the same meeting.", "They are family members traveling together.", "They both work for Fly Right Airlines.", "They have never met before."],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì 'our client meeting' (cuộc họp khách hàng của chúng ta) ngụ ý họ cùng tham gia. Kiến thức suy luận: Từ đại từ sở hữu 'our' để suy ra mối quan hệ đồng nghiệp."
      },
      {
        id: 57,
        question: "At 12:06, why does Mr. Bach mention 'still in time for our client meeting'?",
        options: ["To apologize for missing the meeting", "To confirm he will not be late", "To ask about the meeting location", "To cancel his attendance"],
        correct: 1,
        explanation: "Đáp án đúng là (B) vì 'still in time' (vẫn kịp giờ) để trấn an về chậm trễ. Kiến thức suy luận: Mục đích của câu là xác nhận không muộn cho cuộc họp."
      },
      {
        id: 58,
        question: "What does Mr. Otani mean when he writes, 'I'll confirm the arrival time'?",
        options: ["He plans to check the airline's schedule.", "He will change the meeting time.", "He needs to contact the travel agent.", "He will book another ticket for Mr. Bach."],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì 'confirm the arrival time' (xác nhận giờ đến) sau khi biết chuyến bay chậm. Kiến thức suy luận: 'Confirm' ngụ ý kiểm tra lịch trình hãng bay để cập nhật."
      },
      {
        id: 59,
        question: "What is implied about Mr. Otani's travel to the airport?",
        options: ["He expects heavy traffic or limited parking.", "He plans to take public transportation.", "He works at the airport.", "He has never been to Kansai Airport before."],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì 'Parking might be tight' (chỗ đậu xe có thể chật hẹp). Kiến thức suy luận: Ngụ ý khó khăn về giao thông/đỗ xe từ 'tight' (chật)."
      },
      {
        id: 60,
        question: "What does Mr. Bach express in his final message?",
        options: ["Thanks for the help", "Regret about missing the meeting", "Frustration with the airline", "Request for flight confirmation"],
        correct: 0,
        explanation: "Đáp án đúng là (A) vì 'Landed safely. See you soon!' (Đã hạ cánh an toàn. Gặp bạn sớm!) ngụ ý cảm ơn sự hỗ trợ đón. Kiến thức suy luận: Tin nhắn cuối thể hiện sự biết ơn gián tiếp qua sự tích cực."
      }
      ]
    }
      }
    };