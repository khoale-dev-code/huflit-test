      export const EXAM1_DATA = {
        title: "HUFLIT Listening & Reading Practice - Exam 1 (Dựa trên Đề Thi Thử)",
        description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết.",
        parts: {
          // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
      part1: {
  title: "PART 1: Short Conversations",
  description: "Nghe đoạn hội thoại giữa Mark và Sarah về chuyến đi. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
  type: "listening",
  script: "Mark: Welcome back, Sarah! How was your recent trip to Taiwan?\n\nSarah: It was amazing, Mark. I spent about one month exploring the whole island from north to south. The scenery was absolutely breathtaking. I went to the night markets in Taipei hoping to buy a lot of clothes and souvenirs for my family and friends back home, but I didn't buy anything because I found the prices too high compared to what I expected. Everything seemed overpriced, especially in the touristy areas. I just window-shopped the whole time, taking photos and enjoying the atmosphere instead.\n\nMark: Ah, that's rough. I know that feeling when you're excited to shop but the prices just don't match your budget. What about your trip to Japan? I remember you were there for a week last year, right?\n\nSarah: Oh yes! I loved Tokyo! The city is so vibrant and full of energy. I wish I could've gone in a different season, though. I heard from a lot of people that you really need to visit in the spring to see the cherry blossoms at their peak. They say it's absolutely magical when the sakura trees are in full bloom. Maybe I'll plan another trip next spring.\n\nMark: Good point. The cherry blossom season is definitely iconic. How did you manage getting around in such a huge city? Was Tokyo easy to navigate? I've heard mixed reviews about the transportation system there.\n\nSarah: Hmm, I found it was a little bit easy to get around, you know. The subway system is vast and quite complex at first glance, but once you memorize a few key lines and understand the color coding system, it works well enough. But I certainly wouldn't call it 'very easy' or super convenient—it still required a bit of effort and some patience, especially during rush hour when the trains are packed!",
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
      explanation: "Sarah nói: 'I didn't buy anything because I found the prices too high.' Từ khóa: 'didn't buy anything' → không mua gì. Lý do: 'prices too high' → giá quá cao. Các lựa chọn khác sai vì không đề cập đến giá đẹp/xấu, không liên quan thời gian hoặc số lượng mua."
    },
    {
      id: 2,
      options: [
        "She spent one month there.",
        "She spent seven months there.",
        "She spent one week there.",
        "She spent several times there."
      ],
      correct: 0,
      explanation: "Sarah nói: 'I spent about one month exploring the whole island.' Từ khóa: 'one month'. Không có chi tiết nào về 7 tháng hoặc 1 tuần. 'Exploring the whole island' cho thấy thời gian dài nên phù hợp với một tháng."
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
      explanation: "Sarah nói: 'I didn't buy anything… I just window-shopped the whole time.' 'Window-shopped' nghĩa là chỉ xem chứ không mua. Vì vậy chắc chắn không có bất kỳ món đồ nào được mua, loại toàn bộ các lựa chọn còn lại."
    },
    {
      id: 4,
      options: [
        "People told her to visit in the summer.",
        "People didn't tell her to visit in the spring.",
        "People told her to visit in the spring.",
        "People told her to visit in the autumn."
      ],
      correct: 2,
      explanation: "Sarah nói: 'I heard from a lot of people that you really need to visit in the spring to see the cherry blossoms at their peak.' Từ khóa: 'visit in the spring' → mùa xuân. Không nhắc đến mùa hè hay mùa thu. 'Cherry blossoms at their peak' (hoa anh đào ở độ nở tối đa) là lý do người ta khuyên nên đi vào mùa xuân."
    },
    {
      id: 5,
      options: [
        "She found that Tokyo was very easy to get around.",
        "She found that Tokyo was not easy to get around.",
        "She found that Tokyo was a little bit easy to get around.",
        "She found that Tokyo was too busy to get around."
      ],
      correct: 2,
      explanation: "Sarah nói: 'I found it was a little bit easy to get around… but I certainly wouldn't call it very easy—it still required a bit of effort!' Từ khóa: 'a little bit easy' → hơi dễ. Đây là một mức độ cân bằng giữa dễ và khó. Cô ấy không nói nó 'very easy' (rất dễ) cũng không nói 'not easy' (không dễ). Cô ấy giải thích thêm rằng mạng lưới tàu điện ngầm rộng lớn (vast), nhưng khi bạn ghi nhớ vài tuyến chính thì nó hoạt động tốt. Không có câu nào nói Tokyo quá bận để di chuyển."
    }
  ]
},

part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người ở quán cà phê. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At the cafe in downtown.\n\nWaiter: Good afternoon, everyone! Welcome to our cafe. Are you ready to order drinks, or would you like a few more minutes to look at the menu?\n\nMike: Yes, we're ready. I'll have an orange juice, please. Make it freshly squeezed if possible.\n\nSarah: Me too, please. Orange juice sounds perfect for this weather.\n\nJohn: And one for me as well. I love fresh orange juice.\n\nWaiter: Excellent choice! That's three orange juices coming right up. They're freshly made. Should I bring them out first while you decide on food?\n\nMike: Yes, please. By the way Sarah, why aren't you ordering any food? The sandwiches here look really good.\n\nSarah: Thanks, but I'm not hungry right now. I had a late lunch around 2 PM and I'm trying to eat lighter these days. I'm working on being more mindful about my eating habits. Maybe I'll have something small later if I get hungry.\n\nJohn: That makes sense. By the way, I heard Uncle Robertson quit his restaurant job recently. Do you know what's he doing now? I hope he found something good.\n\nMike: Oh yes! He owns his own business still, but now he works with young players coaching soccer in Orlando. He's really passionate about it. He says it's much more fulfilling than working in the restaurant industry. He gets to inspire kids and help them develop their skills.\n\nSarah: That's exciting! He always loved sports. Speaking of family news, Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow at our place. Yes, my sister and your aunt will join us for a nice family gathering.\n\nMike: Oh, that reminds me! For Emily's birthday next week, what gift should we get? We need to decide soon.\n\nJohn: I think money is practical. She's at that age where she can use it for whatever she wants.\n\nSarah: Or clothes might be nice. She mentioned needing some new outfits for school.\n\nMike: What about a hat? She likes fashion accessories. A stylish hat might be fun and unique.\n\nJohn: All good ideas, but we can't decide yet. Let's think more about it and maybe ask her subtly what she'd prefer. We want to make sure she really likes it.",
  questions: [
    {
      id: 6,
      question: "How many people want orange juice?",
      options: ["Two", "Three", "Four", "Five"],
      correct: 1,
      explanation: "Phục vụ xác nhận: 'That's three orange juices.' Trước đó, cả ba người — Mike, Sarah và John — đều gọi orange juice. Mike nói 'I'll have an orange juice', Sarah nói 'Me too, please' (tôi cũng vậy), và John nói 'And one for me as well' (tôi cũng muốn một cái). Vậy tổng cộng có **3 người** muốn orange juice. Các đáp án khác không chính xác."
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
      explanation: "Sarah giải thích rõ ràng: 'I'm not hungry right now; I had a late lunch and I'm trying to eat lighter these days.' Lý do chính là **'I'm not hungry right now'** (tôi không đói bây giờ). Cô ấy có thêm lý do phụ là cô vừa ăn trưa muộn và đang cố gắng ăn nhẹ hơn, nhưng không đói là lý do cơ bản. Không có thông tin cho thấy cô ấy bị bệnh hoặc chê phẩm chất đồ ăn."
    },
    {
      id: 8,
      question: "What does Robertson do now?",
      options: [
        "He owns a restaurant.",
        "He works in Orlando.",
        "He coaches soccer with young players.",
        "He works in a restaurant."
      ],
      correct: 2,
      explanation: "Mike nói: 'He owns his own business still, but now he **works with young players coaching soccer in Orlando**.' Công việc hiện tại của Robertson là **huấn luyện (coaching) bóng đá với các cầu thủ trẻ**. Mặc dù nó diễn ra ở Orlando, nhưng Orlando chỉ là nơi địa lý, không phải mô tả chính xác công việc. Các đáp án về 'restaurant' không còn đúng nữa vì anh ấy đã bỏ công việc ở nhà hàng."
    },
    {
      id: 9,
      question: "Who's coming to lunch tomorrow?",
      options: [
        "The man's mother-in-law and his sister.",
        "The man's mother and his sister-in-law.",
        "The man's mother-in-law and her sister.",
        "The man's sister-in-law and his sister."
      ],
      correct: 1,
      explanation: "Sarah nói: 'Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow.' Người nói là Sarah, người nói chuyện với Mike (người đàn ông). Như vậy: **Mom (mẹ của Mike)** và **Aunt Lisa (chị/em dâu của Mike)** sẽ đến. Cách diễn đạt chính xác là: 'the man's mother and his sister-in-law' (mẹ của anh ấy và chị/em dâu của anh ấy). Không có thông tin về chị gái ruột hoặc mẹ vợ của Mike."
    },
    {
      id: 10,
      question: "What are they going to give Emily for her birthday?",
      options: ["Money", "Clothes", "A hat", "They can't decide yet."],
      correct: 3,
      explanation: "Ba người đề xuất ba ý tưởng khác nhau: John gợi ý 'Money is practical', Sarah đề xuất 'Or clothes', Mike nói 'A hat might be fun'. Tuy nhiên, kết thúc cuộc hội thoại, John nói: 'We can't decide yet; let's think more' (chúng ta vẫn chưa quyết định được; hãy suy nghĩ thêm). Điều này cho thấy họ **chưa thống nhất một quyết định cuối cùng**. Các đáp án A, B, C chỉ là những gợi ý được đề xuất, nhưng không phải là quyết định chắc chắn."
    }
  ]
},

part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Professor: Good afternoon, everyone. Welcome to this English class for intermediate and advanced learners. I'm Professor Williams, and I'll be your instructor this semester.\n\nNow, let me be clear about the level of this class. It's acceptable for intermediate learners, though we aim higher and expect significant progress by the end of term. I have just received the results of your diagnostic test that you took last week – and I must say, most of you got around 6.5 out of 10, which is actually a good start. It shows you have a solid foundation to build upon.\n\nHowever, I need to emphasize something very important about deadlines. Remember this carefully: if you miss a deadline your tutor has set for homework assignments or projects, you will be given a zero on that assignment. No excuses will be accepted without proper documentation such as a doctor's note or official letter. This is university policy and I must enforce it strictly.\n\nLet me share a story to illustrate this. Angela was an intelligent kid in class last term. She was bright, participated actively, and excelled in most areas. But she learned the hard way about deadlines when she missed submitting her final essay on time without documentation. Despite her excellent work throughout the semester, that zero significantly impacted her final grade. So please, take deadlines seriously.\n\nOn another note, I know some of you will want to grab food after class. The restaurant in the main street near campus has a good menu with reasonable prices, nice food that's quite tasty, and lots of options for vegetarians if any of you follow that diet – all correct choices if you're dining out after class. They also have good coffee if you need to study afterwards.\n\nNow, let's begin today's lesson on advanced grammar structures.",
  questions: [
    {
      id: 11,
      question: "The class is __________.",
      options: ["(A) good enough", "(B) acceptable", "(C) awful", "(D) success"],
      correct: 1,
      explanation: "Giáo sư nói: 'It's acceptable for intermediate learners, though we aim higher.' Từ khóa chính là **'acceptable'** (chấp nhận được, tạm ổn). Đây là mô tả mức độ hiện tại của lớp học. Giáo sư không nói lớp 'awful' (tệ) hay 'success' (thành công) - những từ quá cực đoan. 'Good enough' không chính xác vì giáo sư muốn hướng tới mục tiêu cao hơn ('though we aim higher')."
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
      explanation: "Giáo sư nói: 'I have just received the results of your diagnostic test.' Hành động vừa hoàn thành là **'received the results'** (nhận được kết quả bài kiểm tra). Lưu ý cấu trúc 'have just + past participle' dùng để nói về hành động vừa xảy ra. Đáp án (C) 'got 6.5' chỉ là thông tin kết quả điểm số, không phải hành động giáo sư vừa làm. Đáp án (A) không liên quan. Đáp án (D) 'get' sai ngữ pháp vì không phù hợp với cấu trúc 'have just'."
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
      explanation: "Giáo sư phát biểu rõ ràng: 'If you miss a deadline your tutor has set for homework, you **will be given a zero**; no excuses without documentation.' Đây là một quy định cứng nhắc - bỏ deadline = điểm 0 (không ngoại lệ trừ khi có giấy tờ chứng minh). Các đáp án khác hoàn toàn không có cơ sở trong bài nói: không ai nói về trừ 50% điểm, không phạt tiền, cũng không được full điểm. Đáp án (A) phản ánh chính xác quy định học thuật."
    },
    {
      id: 14,
      question: "Angela was __________.",
      options: ["(A) an intelligent kid in class", "(B) a bit bored at her school", "(C) an AI", "(D) already"],
      correct: 0,
      explanation: "Giáo sư nói: 'Angela was **an intelligent kid in class last term; she excelled but learned the hard way about deadlines.**' Lưu ý động từ 'was' (quá khứ) cho thấy đây là mô tả tình huống trong quá khứ. Angela là một học sinh **thông minh và xuất sắc** (excelled = nổi bật, thể hiện tốt). Tuy nhiên, cô ấy cũng 'learned the hard way' - nghĩa là phải chịu hậu quả vì không đúng deadline. Các đáp án khác hoàn toàn không chính xác: (B) không nói cô bị chán nản, (C) không liên quan AI, (D) 'already' là từ vô nghĩa trong ngữ cảnh này."
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
      explanation: "Giáo sư mô tả nhà hàng chi tiết: 'the restaurant in the main street **has a good menu, nice food, and lots of options for vegetarians**.' Cả ba yếu tố được liệt kê rõ ràng được nối bằng 'and': (A) good menu ✓, (B) nice food ✓, (C) lots of options for vegetarians ✓. Vì tất cả ba mô tả đều đúng, câu trả lời chính xác là **(D) all correct** (tất cả đều đúng). Đây là dạng câu hỏi kiểm tra khả năng chú ý để lấy toàn bộ thông tin từ bài nói."
    }
  ]
},

part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Customer: Hi there, I'd like to return this tie, please. It was a birthday present from my girlfriend last month, but it's just not really my style.\n\nSales Associate: Of course, I can help you with that. Sure, when exactly was it bought? Do you remember the date?\n\nCustomer: It was purchased a few weeks ago. I'm not exactly sure of the date, but it was sometime in early November.\n\nSales Associate: I see. Is there any problem with the tie itself? Any defects or quality issues?\n\nCustomer: No, no problems at all. The tie is in perfect condition. It's just not my style, you know? I prefer more conservative patterns. I didn't bring the receipt with me today – she must have tossed it after wrapping the gift. But look, the store tag is still on it, right here. That should prove it came from this store.\n\nSales Associate: I understand your situation. I see the tag, but unfortunately, without the receipt, I can't process a full refund to your original payment method. Our store policy requires proof of purchase that shows it was shopped in this store with transaction details. The tag alone isn't sufficient because tags can sometimes be from other locations or moved between items.\n\nCustomer: Come on, the tag clearly proves it came from here! Look at your store name right on it. Why would I make this up?\n\nSales Associate: I completely believe you, sir, and I want to help. Let me explain our options. To calm the man down and find a solution, I can give you store credit for the full amount instead of cash. That way you can choose something else you like. Or alternatively, if you check your girlfriend's credit card statement for the transaction details, I can look it up in our system and process a proper refund.\n\nCustomer: Hmm, store credit might work. I did see some nice shirts here. How long is the store credit valid for?\n\nSales Associate: Store credit is valid for one full year from today, so you'll have plenty of time to find something you like. Would that work for you?\n\nCustomer: Yes, I think that's fair. Let's do the store credit then. Thank you for being understanding.",
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
      explanation: "Khách hàng nói rõ ràng: 'It was a **birthday present from my girlfriend**.' Từ khóa chính: 'birthday present' (quà sinh nhật). Bài nói hoàn toàn không đề cập đến Giáng sinh (Christmas) hay quà từ bạn trai (boyfriend). Đáp án (C) sai vì giáo sư là nữ ('my girlfriend'). Vì vậy chỉ có đáp án **(A)** là chính xác duy nhất."
    },
    {
      id: 17,
      question: "The tie was purchased ___________.",
      options: ["(A) last week", "(B) a few weeks ago", "(C) two weeks ago", "(D) two years ago"],
      correct: 1,
      explanation: "Khách hàng trả lời câu hỏi của nhân viên: 'A **few weeks ago**.' Từ khóa: 'a few weeks' (vài tuần). Lưu ý rằng 'a few' có nghĩa là khoảng 3-5 tuần, không chỉ định số lượng cụ thể. Đáp án (A) 'last week' quá gần, (C) 'two weeks ago' quá cụ thể khi khách chỉ nói 'a few', (D) 'two years ago' hoàn toàn không phù hợp. Đáp án **(B)** là chính xác nhất vì nó khớp trực tiếp với lời nói của khách hàng."
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
      explanation: "Khách nói: 'I didn't bring the receipt – **she must have tossed it**.' Phần quan trọng: 'tossed it' (vứt nó đi) cho thấy biên lai đã bị **vứt bỏ hoàn toàn**, không phải để quên ở nhà. Anh ta nói 'I didn't bring' nghĩa là anh ta không có nó. Đáp án (A) sai hoàn toàn - anh ta không có biên lai. Đáp án (B) sai - biên lai bị vứt đi rồi, không phải ở nhà. Đáp án (D) sai ngữ pháp. Đáp án **(C)** 'didn't have receipt' là chính xác nhất (dù ngữ pháp cần thêm 'a': 'didn't have a receipt')."
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
      explanation: "Nhân viên giải thích: 'I can't process a full refund. **Our policy requires proof that it was shopped in this store.**' Lý do chính là **thiếu bằng chứng** - không có biên lai để chứng minh rằng áo cravat được mua tại cửa hàng này. Đáp án (A) sai - không phải vấn đề tin tưởng, mà là chính sách cửa hàng. Đáp án (C) sai - cô ấy hoàn toàn có quyền, nhưng không thể vì chính sách. Đáp án (D) sai ngữ pháp và không chính xác. Đáp án **(B)** chính xác - 'couldn't prove' (không thể chứng minh) khớp với lý do 'proof required'."
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
      explanation: "Nhân viên nói: 'To **calm the man down**, I can give store credit instead.' Từ khóa rõ ràng: 'calm the man down' (làm dịu bớt sự bực tức của khách). Cô ấy nhận thấy khách hàng bắt đầu phản ứng ('Come on, the tag proves it!') nên cô ấy chủ động đề xuất giải pháp thay thế (store credit hoặc kiểm tra giao dịch trên thẻ tín dụng) để hạ nhiệt tình huống. Đáp án (A), (C) sai vì cô ấy không muốn làm khách giận hay bực tức. Đáp án (D) chỉ là kết quả phụ, không phải mục đích chính. Đáp án **(B)** là chính xác."
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
        question: "Customer reviews indicate that many modern mobile devices are often unnecessarily _______.",
        options: ["Complication", "Complicates", "Complicate", "Complicated"],
        correct: 3,
        explanation:
          "Đáp án đúng là **(D) 'Complicated'**. Cấu trúc câu: 'devices **are** _______' yêu cầu một **tính từ (adjective)** để bổ ngữ cho chủ ngữ 'devices' sau động từ liên kết 'are'. Phân tích các lựa chọn sai: (A) 'Complication' là danh từ (noun) – sai loại từ, (B) 'Complicates' là động từ ngôi thứ ba hiện tại – sai cấu trúc, (C) 'Complicate' là động từ nguyên thể – không dùng sau 'are'. Chỉ 'Complicated' (tính từ, có nghĩa 'phức tạp, rườm rà') là phù hợp ngữ pháp và hợp nghĩa trong bối cảnh phê bình thiết bị công nghệ."
      },
      {
        id: 22,
        question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.",
        options: ["who", "whose", "they", "those"],
        correct: 3,
        explanation:
          "Đáp án đúng là **(D) 'those'**. Cấu trúc cổ điển với **đảo ngữ (inversion)**: 'Among those recognized... were [chủ ngữ]' sử dụng đại từ 'those' (những người) để chỉ nhóm người được công nhận. Lưu ý thứ tự từ đảo ngữ: vị từ 'were' đứng trước chủ ngữ. Phân tích các lựa chọn sai: (A) 'who' là đại từ quan hệ – không dùng ở vị trí này, (B) 'whose' là đại từ sở hữu – không phù hợp, (C) 'they' là đại từ nhân xưng – không thể đứng sau 'Among' trong cấu trúc trang trọng này. Chỉ 'those' là chính xác, đây là cách dùng phổ biến trong tiếng Anh chính thức."
      },
      {
        id: 23,
        question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.",
        options: ["despite", "except", "since", "during"],
        correct: 2,
        explanation:
          "Đáp án đúng là **(C) 'since'**. Câu sử dụng **thì hiện tại hoàn thành** ('has received'), và 'since + mốc thời gian cụ thể' là cấu trúc bắt buộc để diễn tả hành động bắt đầu từ quá khứ và kéo dài đến hiện tại. Phân tích các lựa chọn sai: (A) 'despite' = mặc dù (chỉ sự đối lập), (B) 'except' = ngoại trừ, (D) 'during' = trong suốt (chỉ khoảng thời gian nhưng không tạo mối liên hệ thời gian với thì hiện tại hoàn thành). Chỉ 'since' tạo được quan hệ thời gian đúng: từ 'two years ago' cho đến bây giờ."
      },
      {
        id: 24,
        question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no __________ dyes.",
        options: ["immediate", "synthetic", "reasonable", "assumed"],
        correct: 1,
        explanation:
          "Đáp án đúng là **(B) 'synthetic'**. 'Synthetic dyes' (thuốc nhuộm nhân tạo) là cụm từ chuyên ngành trong lĩnh vực dệt may và sản xuất thời trang. Nó trái ngược hoàn toàn với 'natural materials' – tạo thành một đối lập logic trong câu. Phân tích các lựa chọn sai: (A) 'immediate' = ngay lập tức – không liên quan đến loại chất liệu, (C) 'reasonable' = hợp lý – sai ngữ cảnh, (D) 'assumed' = giả định – cũng sai ngữ cảnh. Chỉ 'synthetic' là từ chính xác về mặt ngữ nghĩa và chuyên ngành."
      },
      {
        id: 25,
        question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.",
        options: ["regular", "regularity", "regulate", "regularly"],
        correct: 0,
        explanation:
          "Đáp án đúng là **(A) 'regular'**. Cấu trúc: '_______ learning' – chỗ trống cần một **tính từ** để mô tả 'learning' (việc học). 'Regular learning' = việc học thường xuyên, diễn ra đều đặn. Phân tích các lựa chọn sai: (B) 'regularity' là danh từ – không thể đứng trước danh từ khác, (C) 'regulate' là động từ – sai dạng từ, (D) 'regularly' là trạng từ – dùng để bổ nghĩa cho động từ, không đứng trước danh từ. Chỉ 'regular' (tính từ) là chính xác."
      },
      {
        id: 26,
        question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.",
        options: ["include", "includes", "included", "including"],
        correct: 0,
        explanation:
          "Đáp án đúng là **(A) 'include'**. Câu sử dụng **thì tương lai đơn**: 'will + **V nguyên thể**'. Cấu trúc này diễn tả hành động sẽ xảy ra. Phân tích các lựa chọn sai: (B) 'includes' là động từ chia ngôi thứ ba hiện tại – sai thì, (C) 'included' là V2/V3 (quá khứ phân từ) – không dùng sau 'will' trong thì tương lai đơn, (D) 'including' là V-ing/giới từ – không thể đứng sau modal verb 'will'. Chỉ 'include' là nguyên thể đúng."
      },
      {
        id: 27,
        question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.",
        options: ["before", "during", "between", "unless"],
        correct: 0,
        explanation:
          "Đáp án đúng là **(A) 'before'**. Mệnh đề 'before + V-ing' chỉ hành động xảy ra trước một hành động khác. Ý nghĩa: tất cả sản phẩm phải được kiểm tra trước khi được vận chuyển. Phân tích các lựa chọn sai: (B) 'during' = trong khi – chỉ thời điểm xảy ra đồng thời trong một sự kiện, logic sai, (C) 'between' dùng cho mối quan hệ giữa 2 sự vật/sự kiện – không phù hợp, (D) 'unless' = trừ khi – biểu hiện điều kiện phủ định – logic sai hoàn toàn. Chỉ 'before' tạo được quy trình logic: kiểm tra → rồi vận chuyển."
      },
      {
        id: 28,
        question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.",
        options: ["independence", "independently", "independent", "dependently"],
        correct: 1,
        explanation:
          "Đáp án đúng là **(B) 'independently'**. Sau động từ 'work' cần một **trạng từ (adverb)** để mô tả cách thức hoặc điều kiện của hành động: làm việc độc lập. Phân tích các lựa chọn sai: (A) 'independence' là danh từ – không dùng làm bổ nghĩa cho động từ, (C) 'independent' là tính từ – không thể mô tả hành động, (D) 'dependently' mang nghĩa trái ngược (phụ thuộc vào người khác) – sai nghĩa logic. Chỉ 'independently' (trạng từ) là chính xác, diễn tả khả năng làm việc tự lập."
      },
      {
        id: 29,
        question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.",
        options: ["postponed", "postponing", "postpone", "postpones"],
        correct: 0,
        explanation:
          "Đáp án đúng là **(A) 'postponed'**. Câu sử dụng **thì hiện tại hoàn thành bị động**: 'has been + **V3 (quá khứ phân từ)**'. Cấu trúc này: 'The event has been postponed' = sự kiện đã bị hoãn lại. Phân tích các lựa chọn sai: (B) 'postponing' là V-ing – không dùng sau 'has been' trong bị động, (C) 'postpone' là V nguyên thể – không dùng trong cấu trúc bị động, (D) 'postpones' là V chia ngôi thứ ba – sai thì và không phù hợp bị động. Chỉ 'postponed' là quá khứ phân từ đúng."
      },
      {
        id: 30,
        question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.",
        options: ["environment", "equipment", "advertisement", "appointment"],
        correct: 0,
        explanation:
          "Đáp án đúng là **(A) 'environment'**. 'Positive environment' (môi trường tích cực) là một **collocation** phổ biến trong văn hoá công ty và quản lý nhân sự. Nó chỉ bầu không khí làm việc tích cực trong tổ chức. Phân tích các lựa chọn sai: (B) 'equipment' = thiết bị – sai chủ đề, không liên quan đến nhân sự, (C) 'advertisement' = quảng cáo – hoàn toàn sai ngữ cảnh, (D) 'appointment' = cuộc hẹn gặp mặt – sai nghĩa hoàn toàn. Chỉ 'environment' là chính xác và hợp logic: một môi trường tích cực được duy trì bằng kỷ luật và teamwork."
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
          "Đáp án đúng là **(A) 'ensure'**. Cấu trúc 'ensure + noun' mang nghĩa **'đảm bảo rằng'** một sự việc xảy ra. Câu này muốn nói: mỗi thành viên được giao nhiệm vụ để **đảm bảo phối hợp suôn sẻ** giữa các phòng ban. Phân tích các lựa chọn sai: (B) 'suggest' = đề xuất – không phù hợp, (C) 'describe' = miêu tả – sai nghĩa, (D) 'remind' = nhắc nhở – sai ngữ cảnh. Chỉ 'ensure' là động từ chính xác."
      },
      {
        id: 32,
        type: "fill",
        question: "(32) - Điền từ thích hợp",
        context: "…the design team will create visual materials to (32) our brand image.",
        options: ["attend", "improve", "reinforce", "prevent"],
        correct: 2,
        explanation:
          "Đáp án đúng là **(C) 'reinforce'**. 'Reinforce brand image' (củng cố/tăng cường hình ảnh thương hiệu) là một **collocation phổ biến trong ngành marketing**. Nó diễn tả việc làm cho hình ảnh thương hiệu trở nên mạnh mẽ và ấn tượng hơn thông qua các tài liệu hình ảnh chuyên nghiệp. Phân tích các lựa chọn sai: (A) 'attend' = dự, có mặt – sai nghĩa hoàn toàn, (B) 'improve' = cải thiện – có thể thích hợp nhưng không tự nhiên bằng 'reinforce', (D) 'prevent' = ngăn chặn – sai logic. 'Reinforce' là chính xác nhất về mặt chuyên ngành."
      },
      {
        id: 33,
        type: "fill",
        question: "(33) - Điền từ thích hợp",
        context: "…so that we have enough time to review and (33) them.",
        options: ["reject", "implement", "transfer", "decline"],
        correct: 1,
        explanation:
          "Đáp án đúng là **(B) 'implement'**. Cặp động từ 'review and implement' (xem xét và triển khai/thực hiện) là cấu trúc logic trong quản lý dự án. Khi xem xét các đề xuất, bước tiếp theo tự nhiên là triển khai chúng. Phân tích các lựa chọn sai: (A) 'reject' = từ chối – sai logic vì email khuyến khích đề xuất, (C) 'transfer' = chuyển giao – sai ngữ cảnh, (D) 'decline' = từ chối – sai logic. Chỉ 'implement' tạo thành một dãy hành động logic."
      },
      {
        id: 34,
        type: "fill",
        question: "(34) - Điền từ thích hợp",
        context: "A rehearsal session will be held… to (34) that all participants are comfortable…",
        options: ["warn", "announce", "require", "ensure"],
        correct: 3,
        explanation:
          "Đáp án đúng là **(D) 'ensure'**. Cấu trúc chuẩn **'ensure + that + clause'** dùng để nói 'đảm bảo rằng một điều gì đó sẽ xảy ra'. Câu này nói: tổ chức buổi tập duyệt để **đảm bảo rằng** tất cả người tham gia cảm thấy thoải mái. Phân tích các lựa chọn sai: (A) 'warn' = cảnh báo – sai nghĩa, (B) 'announce' = thông báo – không phù hợp, (C) 'require' = yêu cầu – khác với mục đích đảm bảo. Chỉ 'ensure' là chính xác."
      },
      {
        id: 35,
        type: "fill",
        question: "(35) - Điền từ thích hợp",
        context: "…information on how to (35) with other departments effectively.",
        options: ["compete", "cooperate", "complain", "compare"],
        correct: 1,
        explanation:
          "Đáp án đúng là **(B) 'cooperate'**. 'Cooperate with other departments' (hợp tác với các phòng ban khác) là ngữ cảnh tự nhiên trong môi trường công ty. Email nói về việc phối hợp hiệu quả giữa các phòng ban. Phân tích các lựa chọn sai: (A) 'compete' = cạnh tranh – sai logic (các phòng ban phải hợp tác, không cạnh tranh), (C) 'complain' = phàn nàn – sai ngữ cảnh hoàn toàn, (D) 'compare' = so sánh – sai nghĩa. Chỉ 'cooperate' là phù hợp."
      },
      {
        id: 36,
        type: "fill",
        question: "(36) - Điền từ thích hợp",
        context: "…please don't hesitate to (36) me directly.",
        options: ["reach", "push", "delay", "ignore"],
        correct: 0,
        explanation:
          "Đáp án đúng là **(A) 'reach'**. Cụm từ cố định **'reach me directly'** hoặc **'reach out to'** trong tiếng Anh hiện đại có nghĩa 'liên hệ với ai đó trực tiếp'. Câu này là phần kết thúc email mời mọi người liên hệ nếu có câu hỏi. Phân tích các lựa chọn sai: (B) 'push' = đẩy – sai nghĩa, (C) 'delay' = trì hoãn – sai ngữ cảnh, (D) 'ignore' = bỏ qua – sai logic hoàn toàn. Chỉ 'reach' là chính xác."
      },
      {
        id: 37,
        type: "comprehension",
        question: "(37) - The EcoSmart Home Series will most likely be released ___.",
        options: ["next week", "early next quarter", "by the end of the year", "after the press conference"],
        correct: 1,
        explanation:
          "Đáp án đúng là **(B) 'early next quarter'**. Email nêu rõ ràng trong câu mở đầu: '...the EcoSmart Home Series, **scheduled for early next quarter**.' Từ khóa 'scheduled for' (được lên lịch vào) chỉ định thời gian chính xác là đầu quý tới. Các lựa chọn khác sai: (A) 'next week' – quá gần, (C) 'by the end of the year' – quá muộn, (D) 'after the press conference' – sai vì press conference là phần của chiến dịch tiếp thị, không phải sau ra mắt."
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
          "Đáp án đúng là **(B) 'To inform staff of product launch preparations'** (Thông báo cho nhân viên về các chuẩn bị ra mắt sản phẩm). Nội dung chính của email xoay quanh: **chuẩn bị chiến lược**, **phân công nhiệm vụ**, **tổ chức các cuộc họp**, **tập duyệt**, **hướng dẫn cho nhân viên mới**. Tất cả đều liên quan đến chuẩn bị ra mắt sản phẩm. Phân tích các lựa chọn sai: (A) – email không giới thiệu chính sách mới, (C) – không hề hủy bỏ gì, (D) – feedback là phần nhỏ, không phải mục đích chính."
      },
      {
        id: 39,
        type: "comprehension",
        question: "(39) - Who is the sender of this message?",
        options: ["A sales representative", "A design manager", "The marketing director", "The chief financial officer"],
        correct: 2,
        explanation:
          "Đáp án đúng là **(C) 'The marketing director'** (Giám đốc Marketing). Email ký tên **'Clara Lee, Marketing Director'** ở phía dưới. Đây là thông tin rõ ràng về danh tính và vị trí của người gửi. Các lựa chọn khác sai: (A), (B), (D) – không phù hợp với chỉ định vị trí trong chữ ký email."
      },
      {
        id: 40,
        type: "comprehension",
        question: "(40) - When will the rehearsal for the press conference take place?",
        options: ["March 22", "April 3", "April 5", "The following week"],
        correct: 1,
        explanation:
          "Đáp án đúng là **(B) 'April 3'**. Email nêu: 'The official press conference will take place at our headquarters on **April 5**... A rehearsal session will be held **two days before the event**.' Toán học: April 5 - 2 ngày = **April 3**. Phân tích các lựa chọn sai: (A) 'March 22' – là deadline nộp đề xuất, không liên quan rehearsal, (C) 'April 5' – là ngày press conference chính thức, không phải rehearsal, (D) 'The following week' – quá mơ hồ và sai."
      }
    ]
  },

      part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `http://www.businessaudiopro.com

**Business Audio Pro**

Enhance Your Company's Image with a Professionally Recorded Telephone Greeting

A professional, personalized voicemail message creates an excellent first impression. Business Audio Pro meets your specifications to record a customized telephone greeting within three business days!

**Services We Offer:**

1. **Professional Voice Talent for Voicemail Messages** – We have numerous male and female voice actors with a wide range of tones, accents, and dialects. Visit businessaudiopro.com to hear examples of what each actor sounds like and choose the one that best suits your needs.

2. **On-Hold Messages** – We also create professional on-hold messages with pleasant music to enhance your customers' experience.

3. **Customized Script Writing** – Our experienced script writers can help you craft a personalized message that represents you and your business.

4. **Multilingual Voice Production** – For those with a multilingual customer base, we offer services in a wide range of languages.

Send us an e-mail (inquiry@businessaudiopro.com) with your contact information and your specific needs. A representative will call you within 24 hours to discuss your project and provide a price estimate.

To: inquiry@businessaudiopro.com
From: j.annesly@anneslydata.com
Date: June 25
Subject: Request

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
          "Đáp án đúng là **(A) 'To hear voice samples'** (Để nghe mẫu giọng nói). Quảng cáo ghi rõ: 'Visit **businessaudiopro.com to hear examples** of what each actor sounds like and choose the one that best suits your needs.' Từ khóa: 'hear examples' (nghe mẫu) giúp khách hàng lựa chọn giọng nói phù hợp. Phân tích các lựa chọn sai: (B) không đề cập thêm số điện thoại, (C) không nói về thanh toán trực tuyến, (D) không yêu cầu thiết bị."
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
          "Đáp án đúng là **(B) 'It advertises in the newspaper.'** (Nó quảng cáo trên báo). Email từ Ms. Annesly nói rõ: 'I found **your notice in the newspaper**' (Tôi tìm thấy thông báo của bạn trên báo). Điều này chỉ ra rằng Business Audio Pro đã đăng quảng cáo trên báo. Phân tích các lựa chọn sai: (A) không có thông tin về tần suất xử lý đơn hàng, (C) Business Audio Pro không phải chuyên về data-processing – đó là doanh nghiệp của Ms. Annesly, (D) không có bằng chứng về sự mở rộng gần đây."
      },
      {
        id: 43,
        question: "Who most likely is Ms. Annesly?",
        options: ["An actor", "A script writer", "A sales associate", "A business owner"],
        correct: 3,
        explanation:
          "Đáp án đúng là **(D) 'A business owner'** (Chủ doanh nghiệp). Email cho thấy nhiều chi tiết: địa chỉ email công ty 'j.annesly@**anneslydata.com**', chữ ký 'Jody Annesly, **Annesly Data**', và cô nói 'my **data-processing and transcription business**'. Đây là những dấu hiệu rõ ràng chỉ ra cô là chủ sở hữu doanh nghiệp. Phân tích các lựa chọn sai: (A) cô không phải diễn viên – cô đang tìm kiếm dịch vụ này, (B) không phải nhà biên kịch – cô muốn hãng viết kịch bản cho cô, (C) không phải nhân viên bán hàng – cô là khách hàng tìm kiếm dịch vụ."
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
          "Đáp án đúng là **(B) 'On-hold messages'** (Tin nhắn trong lúc chờ). Email của Ms. Annesly nêu rõ những gì cô muốn: '...professionally recorded **voicemail greeting**...I would like the message to be recorded in **both languages**.' Cô yêu cầu: (A) voice talent (để ghi lời chào), (C) script writing (để viết nội dung), (D) multilingual production (tiếng Anh và Tây Ban Nha). Nhưng cô **không đề cập đến on-hold messages** (những bản nhạc phát trong lúc khách hàng chờ). Đây là dịch vụ mà Business Audio Pro cung cấp, nhưng Ms. Annesly không yêu cầu."
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
          "Đáp án đúng là **(B) 'A phone call from a representative'** (Một cuộc gọi từ nhân viên đại diện). Quảng cáo rõ ràng nêu: 'Send us an e-mail...A **representative will call you within 24 hours** to discuss your project and provide a price estimate.' Điều này xảy ra ngay sau khi nhận email (Ms. Annesly vừa gửi email). Phân tích các lựa chọn sai: (A) không phải ngay lập tức, (C) viết kịch bản mất thời gian hơn, (D) bản ghi hoàn thành mất **3 ngày làm việc** chứ không phải 24 giờ."
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
          "Đáp án đúng là **(B) 'Within three business days'** (Trong vòng ba ngày làm việc). Quảng cáo nêu rõ trong câu mở đầu: 'Business Audio Pro meets your specifications to record a customized telephone greeting **within three business days!**' Lưu ý: 'three **business days**' = ba ngày làm việc (không tính thứ bảy, chủ nhật). Phân tích các lựa chọn sai: (A) 24 giờ là thời gian để gọi điện thoại để bàn bạc, không phải hoàn thành ghi âm, (C) và (D) đều quá lâu."
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
          "Đáp án đúng là **(B) 'A data-processing and transcription business'** (Doanh nghiệp xử lý dữ liệu và sao chép âm thanh). Email nêu rõ: 'I found your notice in the newspaper and wish to use your services for my **data-processing and transcription business**.' Từ khóa: 'data-processing' (xử lý dữ liệu) và 'transcription' (sao chép, chuyển tệp nghe thành văn bản). Phân tích các lựa chọn sai: (A) không phải công ty điện thoại, (C) không phải công ty diễn viên – cô là khách hàng của một, (D) không phải trường dạy ngôn ngữ – mặc dù cô làm việc với khách hàng nói hai thứ tiếng."
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
          "Đáp án đúng là **(B) 'A bilingual voicemail greeting'** (Lời chào thoại tự động hai ngôn ngữ). Email của cô nêu: 'I am looking specifically for a professionally recorded **voicemail greeting**...Since I work with English- and Spanish-speaking clients, I would like **the message to be recorded in both languages.**' Từ khóa: 'both languages' (cả hai ngôn ngữ) = bilingual (hai ngôn ngữ). Phân tích các lựa chọn sai: (A) không yêu cầu on-hold messages, (C) không yêu cầu nghe nhiều mẫu – cô chỉ muốn một lựa chọn, (D) không yêu cầu quảng cáo trên báo – cô tìm thấy trên báo rồi."
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
          "Đáp án đúng là **(A) 'Between 10:00 A.M. and 5:00 P.M.'** (Giữa 10 giờ sáng và 5 giờ chiều). Email nêu rõ: 'Please reach out to me at my mobile phone **between the hours of 10:00 A.M. and 5:00 P.M.**' Đây là khung giờ làm việc tiêu chuẩn mà cô chỉ định để được liên hệ. Phân tích các lựa chọn sai: (B) khung giờ khác nhau, (C) 'after business hours' là ngoài giờ làm việc – trái ngược với yêu cầu, (D) 'weekends only' là chỉ cuối tuần – cô không nói vậy."
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
          "Đáp án đúng là **(B) 'English and Spanish'** (Tiếng Anh và Tây Ban Nha). Email rõ ràng nêu: 'Since I work with **English- and Spanish-speaking clients**, I would like the message to be recorded in **both languages.**' Cô có hai nhóm khách hàng nên cần thông điệp được ghi âm bằng cả hai ngôn ngữ. Phân tích các lựa chọn sai: (A) 'French' không được đề cập, (C) 'Portuguese' không được đề cập, (D) 'Multiple European languages' quá rộng – cô chỉ yêu cầu hai ngôn ngữ cụ thể."
      }
    ]
  },

  part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `SAM BACH (11:59): My first flight was delayed, so I missed my connection in Beijing.
  SAM BACH(12:00):So now, I'm going to be on a flight arriving in Kansai at 18:00.

AKIRA OTANI (12:05): OK. Same airline?

SAM BACH (12:06): It's still Fly Right Airlines. It will be later in the day but still in time for our client meeting.

AKIRA OTANI (12:06): I'll confirm the arrival time. Do you have any checked bags?

SAM BACH (12:10): I do. Would you mind meeting me at the door after I go through customs?

AKIRA OTANI (12:15): Sure thing. Parking spots can be hard to find, but now I'll have extra time to drive around and look.

SAM BACH (12:16): Yes, sorry about that. See you then!`,

   questions: [
    {
      id: 51,
      question: "What is suggested about Mr. Bach?",
      options: [
        "(A) He has been to Kansai more than once.",
        "(B) He currently works in Beijing.",
        "(C) He is on a business trip.",
        "(D) He works for Fly Right Airlines."
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'He is on a business trip.'** (Anh ấy đang công tác kinh doanh). Bằng chứng từ tin nhắn: Mr. Bach nói '**our client meeting**' (cuộc họp với khách hàng của chúng ta) khi chỉ giờ đến. Ngoài ra, Mr. Otani sẵn sàng đi đón anh ấy tại sân bay và họ cùng tham dự một cuộc họp, điều này biểu thị họ đang công tác kinh doanh. Phân tích các lựa chọn sai: (A) không có thông tin về số lần tới Kansai, (B) anh ấy chỉ **qua** Beijing vì chuyến bay kết nối, không phải làm việc ở đó, (D) không có bằng chứng anh ấy làm việc cho hãng bay."
    },
    {
      id: 52,
      question: "At 12:15, what does Mr. Otani mean when he writes, 'Sure thing'?",
      options: [
        "(A) He has confirmed the arrival time of a flight.",
        "(B) He is certain he will be able to find a parking place.",
        "(C) He agrees to wait at the door near the customs area.",
        "(D) He knows Mr. Bach must pass through customs."
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'He agrees to wait at the door near the customs area.'** (Anh ấy đồng ý chờ tại cửa hải quan). 'Sure thing' là phản ứng tích cực để đồng ý. Mr. Otani nói điều này để đáp lại yêu cầu của Mr. Bach lúc 12:10: '**Would you mind meeting me at the door after I go through customs?**' (Bạn có phiền gặp tôi tại cửa sau khi qua hải quan không?). Mặc dù Mr. Otani cũng nói '**Parking spots can be hard to find**', điều đó chỉ là thông tin phụ, không phải ý chính của 'Sure thing'. Phân tích các lựa chọn sai: (A) anh ấy chưa xác nhận giờ đến lúc này, (B) anh ấy nói parking khó tìm – không phải chắc chắn tìm được, (D) không phải ý của 'Sure thing'."
    },
    { 
      id: 53,
      question: "Why was Mr. Bach's flight delayed?",
      options: [
        "(A) There was bad weather in Kansai.",
        "(B) He missed his connection in Beijing.",
        "(C) The airline changed the departure time.",
        "(D) He forgot to check in early."
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'He missed his connection in Beijing.'** (Anh ấy bỏ lỡ chuyến kết nối ở Beijing). Theo tin nhắn đầu của Mr. Bach: '**My first flight was delayed, so I missed my connection in Beijing. So now, I'm going to be on a flight arriving in Kansai at 18:00.**' Chuyến bay đầu tiên bị trễ khiến anh ấy bỏ lỡ chuyến kết nối, do đó phải đón chuyến bay khác muộn hơn. Phân tích các lựa chọn sai: (A) không đề cập thời tiết, (C) không đề cập thay đổi giờ khởi hành, (D) không có bằng chứng anh ấy không check-in kịp."
    },
    {
      id: 54,
      question: "What time is Mr. Bach's new flight expected to arrive?",
      options: [
        "(A) 11:59",
        "(B) 12:06",
        "(C) 18:00",
        "(D) 20:15"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) '18:00'** (6 giờ chiều). Mr. Bach nói rõ ràng: '**So now, I'm going to be on a flight arriving in Kansai at 18:00.**' Phân tích các lựa chọn sai: (A) 11:59 là lúc tin nhắn đầu gửi, (B) 12:06 là thời gian tin nhắn thứ ba, (D) không được đề cập."
    },
    {
      id: 55,
      question: "What does Mr. Otani offer to do for Mr. Bach?",
      options: [
        "(A) Drive him to the hotel",
        "(B) Pick him up at the airport",
        "(C) Change his flight booking",
        "(D) Help carry his luggage"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'Pick him up at the airport'** (Đón anh ấy tại sân bay). Mr. Otani nói: '**I'll confirm the arrival time. Do you have any checked bags?**' sau đó trả lời 'Sure thing' khi Mr. Bach hỏi '**Would you mind meeting me at the door after I go through customs?**' Điều này chỉ ra Mr. Otani sẽ gặp anh ấy tại cửa hải quan ở sân bay. Phân tích các lựa chọn sai: (A) không đề cập khách sạn, (C) không đề cập thay đổi booking, (D) không đề cập hành lý."
    },
    {
      id: 56,
      question: "What can be inferred about the two men?",
      options: [
        "(A) They are colleagues attending the same meeting.",
        "(B) They are family members traveling together.",
        "(C) They both work for Fly Right Airlines.",
        "(D) They have never met before."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'They are colleagues attending the same meeting.'** (Họ là đồng nghiệp tham dự cùng một cuộc họp). Bằng chứng: Mr. Bach nói '**our client meeting**' – từ 'our' (của chúng ta) chỉ rằng Mr. Otani cũng tham gia cuộc họp này. Ngoài ra, Mr. Otani sẵn sàng đi đón Mr. Bach tại sân bay, điều này thường xảy ra giữa các đồng nghiệp công tác. Phân tích các lựa chọn sai: (B) không có bằng chứng họ là gia đình, (C) không có bằng chứng họ làm việc cho hãng bay, (D) họ rõ ràng quen nhau vì họ có liên lạc."
    },
    {
      id: 57,
      question: "At 12:06, why does Mr. Bach mention 'still in time for our client meeting'?",
      options: [
        "(A) To apologize for missing the meeting",
        "(B) To confirm he will not be late",
        "(C) To ask about the meeting location",
        "(D) To cancel his attendance"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'To confirm he will not be late'** (Để xác nhận anh ấy sẽ không bị muộn). Mặc dù chuyến bay mới sẽ đến lúc 18:00 (muộn hơn giờ dự kiến ban đầu 12:00), Mr. Bach khẳng định rằng anh ấy vẫn **'still in time for our client meeting'** (vẫn kịp giờ họp). Điều này biểu thị sự tự tin rằng dù chuyến bay trễ, anh ấy vẫn sẽ kịp giờ. Phân tích các lựa chọn sai: (A) anh ấy không xin lỗi – anh ấy xác nhận sẽ kịp, (C) không hỏi về địa điểm, (D) không hủy – anh ấy xác nhận sẽ tham dự."
    },
    {
      id: 58,
      question: "What does Mr. Otani mean when he writes, 'I'll confirm the arrival time'?",
      options: [
        "(A) He plans to check the airline's schedule.",
        "(B) He will change the meeting time.",
        "(C) He needs to contact the travel agent.",
        "(D) He will book another ticket for Mr. Bach."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'He plans to check the airline's schedule.'** (Anh ấy lên kế hoạch kiểm tra lịch trình của hãng bay). 'Confirm the arrival time' (xác nhận giờ đến) có nghĩa là kiểm tra/xác minh thông tin giờ đến từ hãng bay hoặc hệ thống để chắc chắn chuyến bay sẽ đến đúng lúc 18:00 (hay có thay đổi thêm không). Đây là cách hợp lý để xác bảo thông tin trước khi đi đón. Phân tích các lựa chọn sai: (B) không có bằng chứng thay đổi giờ họp, (C) không đề cập travel agent, (D) không đề cập booking vé khác."
    },
    {
      id: 59,
      question: "What is implied about Mr. Otani's travel to the airport?",
      options: [
        "(A) He expects heavy traffic or limited parking.",
        "(B) He plans to take public transportation.",
        "(C) He works at the airport.",
        "(D) He has never been to Kansai Airport before."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'He expects heavy traffic or limited parking.'** (Anh ấy dự kiến lưu lượng giao thông nặng hoặc chỗ đậu xe hạn chế). Mr. Otani nói: '**Parking spots can be hard to find, but now I'll have extra time to drive around and look.**' Từ khóa: 'parking spots can be hard to find' (chỗ đậu xe có thể khó tìm) ngụ ý rằng sân bay bận rộn và lưu lượng giao thông nặng. Phân tích các lựa chọn sai: (B) không có thông tin sử dụng phương tiện công cộng, (C) không có bằng chứng anh ấy làm việc tại sân bay, (D) không có bằng chứng đây là lần đầu."
    },
    {
      id: 60,
      question: "What does Mr. Bach express in his final message?",
      options: [
        "(A) Thanks for the help",
        "(B) Regret about missing the meeting",
        "(C) Frustration with the airline",
        "(D) Request for flight confirmation"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'Thanks for the help'** (Cảm ơn sự giúp đỡ). Tin nhắn cuối của Mr. Bach: '**Yes, sorry about that. See you then!**' Mặc dù anh ấy không nói từ 'thanks' rõ ràng, nhưng toàn bộ thông điệp biểu thị: 'Yes' (được) = đồng ý, 'sorry about that' (xin lỗi vì chuyện đó) = xin lỗi vì sự chậm trễ/phiền toái cho Mr. Otani, 'See you then!' (gặp bạn!' = vui mừng sắp gặp. Ngầm trong đó là sự biết ơn vì Mr. Otani sẵn sàng đi đón dù phải chờ lâu hơn. Phân tích các lựa chọn sai: (B) không hối tiếc – anh ấy xác nhận vẫn kịp họp, (C) không phàn nàn về hãng bay, (D) không yêu cầu xác nhận chuyến bay."
    }
  ]
},
  }
  };