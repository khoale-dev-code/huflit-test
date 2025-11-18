    export const EXAM1_DATA = {
      title: "HUFLIT Listening & Reading Practice - Exam 1 (Dựa trên Đề Thi Thử)",
      description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết.",
      parts: {
        // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
     part1: {
  title: "PART 1: Short Conversations",
  description:
    "Nghe đoạn hội thoại giữa Mark và Sarah về chuyến đi. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
  type: "listening",
  script:
    "Mark: Welcome back, Sarah! How was your recent trip to Taiwan?\nSarah: It was amazing, Mark. I spent about one month exploring the whole island. I went to the night markets in Taipei hoping to buy a lot of clothes and souvenirs, but I didn't buy anything because I found the prices too high. I just window-shopped the whole time.\nMark: Ah, that's rough. I know that feeling. What about your trip to Japan? I remember you were there for a week last year.\nSarah: I loved Tokyo! I wish I could've gone in a different season, though. I heard from a lot of people that you really need to visit in the spring to see the cherry blossoms at their peak.\nMark: Good point. How did you manage getting around in such a huge city? Was Tokyo easy to navigate?\nSarah: Hmm, I found it was a little bit easy to get around. The subway system is vast, but once you memorize a few key lines, it works well. But I certainly wouldn't call it 'very easy'—it still required a bit of effort!",
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
      explanation:
        "Sarah nói: 'I didn’t buy anything because I found the prices too high.' Từ khóa: 'didn’t buy anything' → không mua gì. Lý do: 'prices too high' → giá quá cao. Các lựa chọn khác sai vì không đề cập đến giá đẹp/xấu, không liên quan thời gian hoặc số lượng mua."
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
      explanation:
        "Sarah nói: 'I spent about one month exploring the whole island.' Từ khóa: 'one month'. Không có chi tiết nào về 7 tháng hoặc 1 tuần. 'Exploring the whole island' cho thấy thời gian dài nên phù hợp với một tháng."
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
      explanation:
        "Sarah nói: 'I didn’t buy anything… I just window-shopped the whole time.' 'Window-shopped' nghĩa là chỉ xem chứ không mua. Vì vậy chắc chắn không có bất kỳ món đồ nào được mua, loại toàn bộ các lựa chọn còn lại."
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
      explanation:
        "Sarah nói: 'You really need to visit in the spring to see the cherry blossoms at their peak.' Từ khóa: 'visit in the spring'. Không nhắc đến mùa hè hay mùa thu. 'Cherry blossoms at their peak' là lý do người ta khuyên nên đi vào mùa xuân."
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
      explanation:
        "Sarah nói: 'I found it was a little bit easy to get around… but I wouldn’t call it very easy.' Từ khóa: 'a little bit easy' → hơi dễ. Không phải 'very easy', cũng không phải 'not easy'. Không có câu nào nói Tokyo quá bận để di chuyển."
    }
  ]
},
  part2 : {
  title: "PART 2: Longer Conversation",
  description:
    "5 câu hỏi - Một đoạn hội thoại dài giữa ba người ở quán cà phê. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script:
    "Narrator: At the cafe.\nWaiter: Good afternoon! Are you ready to order drinks?\nMike: Yes, I'll have an orange juice.\nSarah: Me too, please.\nJohn: And one for me as well.\nWaiter: That's three orange juices.\nMike: Sarah, why aren't you ordering food?\nSarah: I'm not hungry right now; I had a late lunch and I'm trying to eat lighter these days.\nJohn: By the way, I heard Uncle Robertson quit his restaurant job. What's he doing now?\nMike: He owns his own business still, but now he works with young players coaching soccer in Orlando.\nSarah: That's exciting! Speaking of family, Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow. Yes, my sister and your aunt will join us.\nMike: For Emily's birthday, what gift?\nJohn: Money is practical.\nSarah: Or clothes.\nMike: A hat might be fun.\nJohn: We can't decide yet; let's think more.",
  questions: [
    {
      id: 6,
      question: "How many people want orange juice?",
      options: ["Two", "Three", "Four", "Five"],
      correct: 1,
      explanation:
        "Phục vụ nói: 'That's three orange juices.' Đây là câu xác nhận tổng số đồ uống đã được gọi. Trước đó, cả Mike, Sarah và John đều nói họ muốn orange juice ('I'll have an orange juice', 'Me too', 'And one for me as well'). Như vậy có tổng cộng 3 người — loại bỏ các phương án khác."
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
      explanation:
        "Sarah nói rõ hai lý do: 'I'm not hungry right now; I had a late lunch and I'm trying to eat lighter these days.' Từ khóa: 'not hungry right now' → không đói. Mặc dù cô nói 'eat lighter', nhưng đó là bổ sung, không phải lý do chính. Không có thông tin nào nói cô bị bệnh hoặc chê đồ ăn → loại các đáp án khác."
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
      explanation:
        "Mike nói: 'He owns his own business still, but now he works with young players coaching soccer in Orlando.' Từ khóa quan trọng: 'works with young players' → đây là mô tả chính về công việc hiện tại. Dù ông ấy làm việc ở Orlando, địa điểm không phải là trọng tâm câu hỏi. Các đáp án về 'restaurant' bị loại vì ông đã nghỉ làm tại đó."
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
      explanation:
        "Sarah nói: 'Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow.' → Hai người sẽ đến là: **Mom (mẹ của Mike)** và **Aunt Lisa (chị/em dâu của Mike)**. Vì vậy: 'the man's mother and his sister-in-law' là mô tả chính xác. Không có thông tin nào về chị ruột hoặc mẹ vợ."
    },
    {
      id: 10,
      question: "What are they going to give their granddaughter for her birthday?",
      options: ["Money", "Clothes", "A hat", "They can't decide."],
      correct: 3,
      explanation:
        "Cả ba người đưa ra ba ý tưởng khác nhau: John gợi ý 'money', Sarah đề xuất 'clothes', Mike nói 'A hat might be fun'. Tuy nhiên, John kết luận: 'We can't decide yet; let's think more.' → nghĩa là họ vẫn chưa thống nhất món quà. Vì vậy đáp án đúng là: họ *chưa quyết định*. Các đáp án khác chỉ là lựa chọn được đề xuất chứ không phải quyết định cuối cùng."
    }
  ]
},
   part3 : {
  title: "PART 3: Monologue",
  description:
    "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script:
    "Professor: Good afternoon, everyone. Welcome to this English class. It's acceptable for intermediate learners, though we aim higher. I have just received the results of your diagnostic test – most of you got around 6.5, which is a good start. Remember, if you miss a deadline your tutor has set for homework, you will be given a zero; no excuses without documentation. Angela was an intelligent kid in class last term; she excelled but learned the hard way about deadlines. On another note, the restaurant in the main street has a good menu, nice food, and lots of options for vegetarians – all correct choices if you're dining out after class.",
  questions: [
    {
      id: 11,
      question: "The class is __________.",
      options: ["(A) good enough", "(B) acceptable", "(C) awful", "(D) success"],
      correct: 1,
      explanation:
        "Giáo sư nói: 'It's acceptable for intermediate learners, though we aim higher.' Từ khóa quan trọng là 'acceptable' → mô tả mức độ hiện tại của lớp học: phù hợp, chấp nhận được. Không có từ nào trong bài cho thấy lớp học 'awful' (tệ), 'good enough' (đủ tốt), hay 'success' (thành công). Vì vậy đáp án đúng là 'acceptable'."
    },
    {
      id: 12,
      question: "I have just _________.",
      options: [
        "(A) done a master's",
        "(B) got the result of my English test",
        "(C) got 6.5",
        "(D) get"
      ],
      correct: 1,
      explanation:
        "Giáo sư nói: 'I have just received the results of your diagnostic test.' → từ khóa: 'have just received the results'. Đáp án (C) 'got 6.5' chỉ là nói về điểm của học viên, không phải điều giáo sư vừa làm. Các đáp án khác sai về nghĩa hoặc sai ngữ pháp."
    },
    {
      id: 13,
      question: "If miss a deadline your tutor has set, you __________.",
      options: [
        "(A) will be given a zero",
        "(B) will get 50% of your marks",
        "(C) will be fined",
        "(D) will get all marks"
      ],
      correct: 0,
      explanation:
        "Giáo sư nói: 'If you miss a deadline… you will be given a zero; no excuses without documentation.' → Quy định rõ ràng: bỏ deadline = điểm 0. Không có thông tin về trừ 50%, phạt tiền, hay được full điểm. Đoạn này kiểm tra khả năng nghe quy định học thuật."
    },
    {
      id: 14,
      question: "Angela was __________.",
      options: ["(A) an intelligent kid in class", "(B) a bit bored at her school", "(C) an AI", "(D) already"],
      correct: 0,
      explanation:
        "'Angela was an intelligent kid in class last term; she excelled…' → Từ khóa: 'intelligent', 'excelled'. Không có chi tiết nào nói về AI, sự chán nản, hay những từ vô nghĩa như 'already'. Đáp án (A) phản ánh chính xác mô tả."
    },
    {
      id: 15,
      question: "The restaurant in the main street __________.",
      options: [
        "(A) has a good menu",
        "(B) has nice food",
        "(C) has a lots of option for vegetarians",
        "(D) all correct"
      ],
      correct: 3,
      explanation:
        "Giáo sư mô tả nhà hàng: 'has a good menu, nice food, and lots of options for vegetarians.' Cả ba ý (A), (B), (C) đều được nhắc trực tiếp. Vì tất cả đều đúng → đáp án (D)."
    }
  ]
},

part4 : {
  title: "PART 4: Extended Conversation",
  description:
    "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script:
    "Customer: Hi, I'd like to return this tie, please. It was a birthday present from my girlfriend.\nSales Associate: Sure, when was it bought?\nCustomer: A few weeks ago.\nSales Associate: Any problem with it?\nCustomer: No, just not my style. I didn't bring the receipt – she must have tossed it. But the store tag is still on.\nSales Associate: I see, but without the receipt, I can't process a full refund. Our policy requires proof that it was shopped in this store.\nCustomer: Come on, the tag proves it!\nSales Associate: To calm the man down, I can give store credit instead. Or check your credit card for the transaction details.",
  questions: [
    {
      id: 16,
      question: "The tie __________.",
      options: [
        "(A) was a birthday present",
        "(B) was a Christmas present",
        "(C) was a gift of a boyfriend",
        "(D) all correct"
      ],
      correct: 0,
      explanation:
        "Khách hàng nói rõ: 'It was a birthday present from my girlfriend.' → Từ khóa: 'birthday present'. Không hề đề cập Giáng sinh hoặc quà của bạn trai. Vì vậy chỉ có đáp án (A) đúng."
    },
    {
      id: 17,
      question: "The tie was purchased ___________.",
      options: ["(A) last week", "(B) a few weeks ago", "(C) two weeks ago", "(D) two years ago"],
      correct: 1,
      explanation:
        "Khách hàng trả lời: 'A few weeks ago.' → nghĩa: vài tuần trước. Không có thông tin cụ thể là 1 tuần, 2 tuần hay 2 năm. Đáp án (B) chính xác nhất."
    },
    {
      id: 18,
      question: "When asking for refunding, the man __________.",
      options: [
        "(A) had a receipt",
        "(B) left his receipt at home",
        "(C) didn't have receipt",
        "(D) don't receipt"
      ],
      correct: 2,
      explanation:
        "Khách nói: 'I didn't bring the receipt – she must have tossed it.' → nghĩa là **biên lai đã bị vứt đi**, nên anh ta hoàn toàn không có. Không phải để quên ở nhà. (D) sai ngữ pháp."
    },
    {
      id: 19,
      question: "She (the shop assistant) didn't agree to pay back money because __________.",
      options: [
        "(A) she didn't believe in the man",
        "(B) the man couldn't prove that the tie was shopped in her store",
        "(C) she has no right to do so",
        "(D) she hadn't believed"
      ],
      correct: 1,
      explanation:
        "Nhân viên nói: 'Our policy requires proof that it was shopped in this store.' → Không có biên lai = không có bằng chứng. Không phải vì cô ấy không tin khách, không phải vì thiếu quyền hạn. Đáp án (B) thể hiện chính xác lý do."
    },
    {
      id: 20,
      question: "The shop assistant tries to __________.",
      options: [
        "(A) make the man angry",
        "(B) calm the man down",
        "(C) bother the man",
        "(D) make the man happy"
      ],
      correct: 1,
      explanation:
        "Nhân viên nói: 'To calm the man down, I can give store credit instead.' → Từ khóa: 'calm the man down'. Mục đích là giảm bớt sự bực tức của khách trong quá trình hỗ trợ. Do đó đáp án (B) là đúng nhất."
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
      explanation:
        "Đáp án đúng là (D) 'Complicated'. Cấu trúc câu: 'devices are _______' cần một **tính từ** để bổ nghĩa cho chủ ngữ sau động từ 'are'. Các đáp án còn lại sai loại từ: (A) danh từ, (B) động từ chia ngôi thứ ba, (C) động từ nguyên thể. Vì vậy chỉ có 'complicated' (bị phức tạp, rườm rà) là đúng ngữ pháp và hợp nghĩa trong mô tả thiết bị công nghệ."
    },
    {
      id: 22,
      question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.",
      options: ["who", "whose", "they", "those"],
      correct: 3,
      explanation:
        "Đáp án đúng là (D) 'those'. Cấu trúc quen thuộc: 'Among those + V3' dùng để chỉ một nhóm người được nhắc đến. Đây là đại từ số nhiều dùng để thay cho nhiều người được công nhận tại sự kiện. Các phương án khác sai vì: 'who' và 'whose' là đại từ quan hệ (không phù hợp cấu trúc đảo ngữ), 'they' không dùng sau 'among' theo cấu trúc trang trọng này."
    },
    {
      id: 23,
      question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.",
      options: ["despite", "except", "since", "during"],
      correct: 2,
      explanation:
        "Đáp án đúng là (C) 'since'. Vì câu dùng thì hiện tại hoàn thành ('has received'), nên 'since + mốc thời gian' là cấu trúc bắt buộc để diễn tả hành động bắt đầu từ quá khứ và kéo dài đến hiện tại. Các từ còn lại sai nghĩa: 'despite' (mặc dù), 'except' (ngoại trừ), 'during' (trong suốt) đều không tạo quan hệ thời gian phù hợp."
    },
    {
      id: 24,
      question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no __________ dyes.",
      options: ["immediate", "synthetic", "reasonable", "assumed"],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) 'synthetic'. 'Synthetic dyes' = thuốc nhuộm nhân tạo, trái ngược hoàn toàn với 'natural materials'. Đây là cặp từ vựng thường đi chung trong chủ đề thời trang – sản xuất. Các lựa chọn khác không liên quan: 'immediate' = ngay lập tức, 'reasonable' = hợp lý, 'assumed' = giả định."
    },
    {
      id: 25,
      question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.",
      options: ["regular", "regularity", "regulate", "regularly"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'regular'. Cấu trúc danh từ 'learning' đứng sau cần một **tính từ** để mô tả: 'regular learning' = việc học diễn ra thường xuyên. (B) 'regularity' là danh từ, (C) 'regulate' là động từ, (D) 'regularly' là trạng từ – đều không thể đứng trước danh từ 'learning' để làm tính từ bổ nghĩa."
    },
    {
      id: 26,
      question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.",
      options: ["include", "includes", "included", "including"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'include'. Cấu trúc thì tương lai đơn: 'will + V nguyên thể'. (B) 'includes' sai vì chia ngôi thứ ba, (C) 'included' sai vì là V2/V3, (D) 'including' sai vì là giới từ/V-ing không dùng sau 'will'."
    },
    {
      id: 27,
      question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.",
      options: ["before", "during", "between", "unless"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'before'. Mệnh đề 'before + V-ing' diễn tả hành động xảy ra trước hành động chính – kiểm tra trước khi vận chuyển. 'During' = trong khi (chỉ thời điểm bên trong một sự kiện), 'between' dùng cho 2 sự vật, 'unless' = trừ khi → đều không phù hợp logic quy trình kiểm tra chất lượng."
    },
    {
      id: 28,
      question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.",
      options: ["independence", "independently", "independent", "dependently"],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) 'independently'. Sau động từ 'work' cần một **trạng từ** để mô tả cách thức làm việc: làm việc độc lập. (A) 'independence' là danh từ, (C) 'independent' là tính từ, (D) 'dependently' mang nghĩa trái ngược – đều không phù hợp."
    },
    {
      id: 29,
      question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.",
      options: ["postponed", "postponing", "postpone", "postpones"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'postponed'. Công thức bị động ở thì hiện tại hoàn thành: 'has been + V3'. 'Postponed' là dạng quá khứ phân từ của động từ 'postpone'. Các đáp án còn lại sai dạng: (B) V-ing, (C) V nguyên thể, (D) V chia ngôi thứ ba."
    },
    {
      id: 30,
      question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.",
      options: ["environment", "equipment", "advertisement", "appointment"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'environment'. Cụm 'positive environment' (môi trường tích cực) là collocation phổ biến trong văn hoá doanh nghiệp. Các từ còn lại sai chủ đề: 'equipment' = thiết bị, 'advertisement' = quảng cáo, 'appointment' = cuộc hẹn."
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
  questions: [
    {
      id: 31,
      type: "fill",
      question: "(31) - Điền từ thích hợp",
      context: "Each team member will be assigned responsibilities to (31) smooth coordination between departments.",
      options: ["ensure", "suggest", "describe", "remind"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'ensure' vì cấu trúc 'ensure + noun' mang nghĩa đảm bảo sự phối hợp diễn ra suôn sẻ. Các phương án khác không liên quan về nghĩa."
    },
    {
      id: 32,
      type: "fill",
      question: "(32) - Điền từ thích hợp",
      context: "…the design team will create visual materials to (32) our brand image.",
      options: ["attend", "improve", "reinforce", "prevent"],
      correct: 2,
      explanation:
        "Đáp án (C) 'reinforce' = củng cố hình ảnh thương hiệu. Đây là collocation tự nhiên trong marketing: reinforce brand image."
    },
    {
      id: 33,
      type: "fill",
      question: "(33) - Điền từ thích hợp",
      context: "…so that we have enough time to review and (33) them.",
      options: ["reject", "implement", "transfer", "decline"],
      correct: 1,
      explanation:
        "Đáp án (B) 'implement' vì suggestions → review and implement (xem xét và triển khai). Các từ khác sai nghĩa hoàn toàn."
    },
    {
      id: 34,
      type: "fill",
      question: "(34) - Điền từ thích hợp",
      context: "A rehearsal session will be held… to (34) that all participants are comfortable…",
      options: ["warn", "announce", "require", "ensure"],
      correct: 3,
      explanation:
        "Đáp án (D) 'ensure' vì 'ensure that + clause' là cấu trúc chuẩn để nói 'đảm bảo rằng…'."
    },
    {
      id: 35,
      type: "fill",
      question: "(35) - Điền từ thích hợp",
      context: "…information on how to (35) with other departments effectively.",
      options: ["compete", "cooperate", "complain", "compare"],
      correct: 1,
      explanation:
        "Đáp án (B) 'cooperate' = hợp tác. Đây là từ duy nhất phù hợp ngữ cảnh làm việc giữa các phòng ban."
    },
    {
      id: 36,
      type: "fill",
      question: "(36) - Điền từ thích hợp",
      context: "…please don't hesitate to (36) me directly.",
      options: ["reach", "push", "delay", "ignore"],
      correct: 0,
      explanation:
        "Đáp án (A) 'reach' = liên hệ. Cụm cố định: 'reach me directly'."
    },
    {
      id: 37,
      type: "comprehension",
      question: "(37) - The EcoSmart Home Series will most likely be released ___.",
      options: ["next week", "early next quarter", "by the end of the year", "after the press conference"],
      correct: 1,
      explanation: "Email ghi rõ: 'scheduled for early next quarter'."
    },
    {
      id: 38,
      type: "comprehension",
      question: "(38) - What is the main purpose of this message?",
      options: [
        "To introduce a new marketing policy",
        "To inform staff of product launch preparations",
        "To announce the cancellation of a campaign",
        "To request client feedback after the event"
      ],
      correct: 1,
      explanation:
        "Nội dung chính xoay quanh việc chuẩn bị ra mắt sản phẩm: cuộc họp, phân công, tài liệu, rehearsal."
    },
    {
      id: 39,
      type: "comprehension",
      question: "(39) - Who is the sender of this message?",
      options: ["A sales representative", "A design manager", "The marketing director", "The chief financial officer"],
      correct: 2,
      explanation: "Email ký tên Clara Lee – Marketing Director."
    },
    {
      id: 40,
      type: "comprehension",
      question: "(40) - When will the rehearsal for the press conference take place?",
      options: ["March 22", "April 3", "April 5", "The following week"],
      correct: 1,
      explanation:
        "Press conference: April 5 → rehearsal 2 ngày trước → April 3."
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
  
  questions: [
    {
      id: 41,
      question: "According to the advertisement, why should customers visit the Business Audio Pro Web site?",
      options: [
        "To hear voice samples",
        "To add a new phone number",
        "To submit a credit card payment",
        "To request recording equipment"
      ],
      correct: 0,
      explanation:
        "Quảng cáo ghi rõ truy cập website để nghe mẫu giọng đọc."
    },
    {
      id: 42,
      question: "What is suggested about Business Audio Pro?",
      options: [
        "It fills orders once a week.",
        "It advertises in the newspaper.",
        "It specializes in data-processing services.",
        "It has recently expanded its business."
      ],
      correct: 1,
      explanation:
        "Email nói 'I found your notice in the newspaper', ngụ ý hãng quảng cáo trên báo."
    },
    {
      id: 43,
      question: "Who most likely is Ms. Annesly?",
      options: ["An actor", "A script writer", "A sales associate", "A business owner"],
      correct: 3,
      explanation:
        "Email từ domain anneslydata.com và chữ ký → chủ doanh nghiệp."
    },
    {
      id: 44,
      question: "What service does Ms. Annesly NOT request from Business Audio Pro?",
      options: [
        "Professional voice talent",
        "On-hold messages",
        "Customized script writing",
        "Multilingual voice production"
      ],
      correct: 1,
      explanation:
        "Email không yêu cầu on-hold messages."
    },
    {
      id: 45,
      question: "What will Ms. Annesly most likely receive within 24 hours?",
      options: [
        "A voice sample recording",
        "A phone call from a representative",
        "A written script",
        "A completed voicemail greeting"
      ],
      correct: 1,
      explanation:
        "Quảng cáo ghi: 'A representative will call you within 24 hours'."
    },
    {
      id: 46,
      question: "According to the advertisement, how long does Business Audio Pro take to complete a recording?",
      options: [
        "Within 24 hours",
        "Within three business days",
        "Within one week",
        "Within one month"
      ],
      correct: 1,
      explanation:
        "Thời gian hoàn thành: 'within three business days'."
    },
    {
      id: 47,
      question: "What type of business does Ms. Annesly operate?",
      options: [
        "A telephone company",
        "A data-processing and transcription business",
        "A voice acting agency",
        "A language school"
      ],
      correct: 1,
      explanation:
        "Email nói rõ đây là doanh nghiệp 'data-processing and transcription'."
    },
    {
      id: 48,
      question: "What does Ms. Annesly specifically request in her message?",
      options: [
        "On-hold messages with pleasant music",
        "A bilingual voicemail greeting",
        "Multiple voice actor samples",
        "A newspaper advertisement"
      ],
      correct: 1,
      explanation:
        "Cô muốn voicemail greeting được ghi âm bằng 2 ngôn ngữ."
    },
    {
      id: 49,
      question: "When does Ms. Annesly prefer to be contacted?",
      options: [
        "Between 10:00 A.M. and 5:00 P.M.",
        "Between 9:00 A.M. and 3:00 P.M.",
        "After business hours",
        "On weekends only"
      ],
      correct: 0,
      explanation:
        "Cô ghi rõ khung giờ liên hệ 10:00 A.M. đến 5:00 P.M."
    },
    {
      id: 50,
      question: "What languages does Ms. Annesly want her voicemail message recorded in?",
      options: [
        "English and French",
        "English and Spanish",
        "Spanish and Portuguese",
        "Multiple European languages"
      ],
      correct: 1,
      explanation:
        "Email nêu cô phục vụ khách nói tiếng Anh và Tây Ban Nha."
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
      options: [
        "He has been to Kansai more than once.",
        "He currently works in Beijing.",
        "He is on a business trip.",
        "He works for Fly Right Airlines."
      ],
      correct: 2,
      explanation:
        "Đáp án đúng là (C) vì đề cập 'our client meeting' và chuyến bay quốc tế, ngụ ý đây là chuyến công tác."
    },
    {
      id: 52,
      question: "At 12:15, what does Mr. Otani mean when he writes, 'Sure thing'?",
      options: [
        "He has confirmed the arrival time of a flight.",
        "He is certain he will be able to find a parking place.",
        "He agrees to wait at the door near the customs area.",
        "He knows Mr. Bach must pass through customs."
      ],
      correct: 2,
      explanation:
        "Đáp án đúng là (C) vì 'Sure thing' là xác nhận đồng ý chờ đón tại cửa hải quan."
    },
    {
      id: 53,
      question: "Why was Mr. Bach's flight delayed?",
      options: [
        "There was bad weather in Kansai.",
        "He missed his connection in Beijing.",
        "The airline changed the departure time.",
        "He forgot to check in early."
      ],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) vì tin nhắn ghi rõ 'Bad weather caused the delay'."
    },
    {
      id: 54,
      question: "What time is Mr. Bach's new flight expected to arrive?",
      options: ["11:59", "12:06", "18:00", "20:15"],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) vì chuyến bay được thông báo sẽ đến lúc 12:06."
    },
    {
      id: 55,
      question: "What does Mr. Otani offer to do for Mr. Bach?",
      options: [
        "Drive him to the hotel",
        "Pick him up at the airport",
        "Change his flight booking",
        "Help carry his luggage"
      ],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) vì ông nói 'pick you up at customs door'."
    },
    {
      id: 56,
      question: "What can be inferred about the two men?",
      options: [
        "They are colleagues attending the same meeting.",
        "They are family members traveling together.",
        "They both work for Fly Right Airlines.",
        "They have never met before."
      ],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) vì họ đều tham gia 'our client meeting', ngụ ý đồng nghiệp."
    },
    {
      id: 57,
      question: "At 12:06, why does Mr. Bach mention 'still in time for our client meeting'?",
      options: [
        "To apologize for missing the meeting",
        "To confirm he will not be late",
        "To ask about the meeting location",
        "To cancel his attendance"
      ],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) vì ông khẳng định vẫn kịp cuộc họp dù máy bay trễ."
    },
    {
      id: 58,
      question: "What does Mr. Otani mean when he writes, 'I'll confirm the arrival time'?",
      options: [
        "He plans to check the airline's schedule.",
        "He will change the meeting time.",
        "He needs to contact the travel agent.",
        "He will book another ticket for Mr. Bach."
      ],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) vì xác nhận giờ đến nghĩa là kiểm tra lịch trình từ hãng bay."
    },
    {
      id: 59,
      question: "What is implied about Mr. Otani's travel to the airport?",
      options: [
        "He expects heavy traffic or limited parking.",
        "He plans to take public transportation.",
        "He works at the airport.",
        "He has never been to Kansai Airport before."
      ],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) vì ông nói 'Parking might be tight', ngụ ý khó đậu xe."
    },
    {
      id: 60,
      question: "What does Mr. Bach express in his final message?",
      options: [
        "Thanks for the help",
        "Regret about missing the meeting",
        "Frustration with the airline",
        "Request for flight confirmation"
      ],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) vì 'Landed safely. See you soon!' thể hiện sự cảm kích và vui mừng."
    }
  ]
},
}
    };