export const EXAM8_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 8 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Emma và Tom về kế hoạch du lịch. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Emma: Hey Tom, have you decided on our summer vacation spot yet?\nTom: Not quite, Emma. I was thinking about Bali, but the flight tickets are way too expensive right now. We might have to save up a bit more.\nEmma: That's disappointing. Last year in Paris, everything was so romantic, but the crowds were overwhelming. I prefer somewhere quieter this time.\nTom: Totally agree. How about a cozy cabin in the mountains? It'd be peaceful, and we could hike every day.\nEmma: Sounds perfect, but is it accessible by public transport? I don't want to rent a car again like in Paris—it was stressful driving on the wrong side.",
      questions: [
        {
          id: 1,
          options: [
            "The flight tickets are way too expensive.",
            "She prefers crowded places.",
            "They have enough money saved.",
            "The tickets are too cheap."
          ],
          correct: 0,
          explanation: "Tom nói: 'I was thinking about Bali, but the flight tickets are way too expensive right now.' (Tôi nghĩ về Bali, nhưng vé máy bay quá đắt lúc này.)"
        },
        {
          id: 2,
          options: [
            "She enjoyed the romance but not the crowds.",
            "She wants to go back to Paris.",
            "Driving was easy in Paris.",
            "The mountains were too quiet last year."
          ],
          correct: 0,
          explanation: "Emma nói: 'Last year in Paris, everything was so romantic, but the crowds were overwhelming.' (Năm ngoái ở Paris, mọi thứ rất lãng mạn, nhưng đám đông quá áp đảo.)"
        },
        {
          id: 3,
          options: [
            "Public transport is not an option.",
            "She doesn't want to rent a car again.",
            "They plan to rent a car.",
            "Hiking requires a private vehicle."
          ],
          correct: 1,
          explanation: "Emma nói: 'I don't want to rent a car again like in Paris—it was stressful driving on the wrong side.' (Tôi không muốn thuê xe lần nữa như ở Paris—lái xe bên đường sai quá căng thẳng.)"
        },
        {
          id: 4,
          options: [
            "Somewhere with more crowds.",
            "A cabin in the mountains for peace.",
            "Bali in winter for better weather.",
            "Paris again for romance."
          ],
          correct: 1,
          explanation: "Tom nói: 'How about a cozy cabin in the mountains? It'd be peaceful, and we could hike every day.' (Thế còn cabin ấm cúng ở núi? Sẽ yên bình, và chúng ta có thể đi bộ đường dài mỗi ngày.)"
        },
        {
          id: 5,
          options: [
            "They need to save more money.",
            "Public transport is unavailable.",
            "Bali is the final choice.",
            "Driving is preferable now."
          ],
          correct: 0,
          explanation: "Tom nói: 'We might have to save up a bit more.' (Chúng ta có lẽ phải tiết kiệm thêm một chút.)"
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người ở văn phòng. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: In the office break room.\nLisa: Morning, everyone! Coffee's fresh—help yourselves.\nBen: Thanks, Lisa. I need it after that late meeting yesterday.\nAnna: Me three. John, you're looking sharp today. New suit?\nJohn: Yeah, Anna. Tailored for the big presentation next week. But I'm nervous—it's my first time leading one.\nLisa: You'll crush it, John. Remember that team-building retreat last month? You organized the whole schedule flawlessly.\nBen: True. Speaking of which, has anyone heard from the HR rep about the new wellness program? I signed up for yoga classes.\nAnna: I did too—it's starting Monday. Great for stress relief before deadlines.\nJohn: Good idea. For the presentation, any tips on handling tough questions from the board?",
      questions: [
        {
          id: 6,
          question: "How many people are having coffee?",
          options: [
            "One",
            "Three",
            "Four",
            "Two"
          ],
          correct: 1,
          explanation: "Lisa mời 'everyone' (mọi người), và Ben, Anna, John đều ngụ ý tham gia (Ben cần coffee, Anna 'me three' ám chỉ cần coffee như Ben và Lisa)."
        },
        {
          id: 7,
          question: "Why is John wearing a new suit?",
          options: [
            "To impress HR.",
            "For the big presentation next week.",
            "After the team-building retreat.",
            "For a casual Friday."
          ],
          correct: 1,
          explanation: "John nói: 'Tailored for the big presentation next week.' (May đo cho bài thuyết trình lớn tuần tới.)"
        },
        {
          id: 8,
          question: "What did John do well at the retreat?",
          options: [
            "Handled board questions.",
            "Organized the schedule.",
            "Led yoga classes.",
            "Signed up for wellness."
          ],
          correct: 1,
          explanation: "Lisa nói: 'You organized the whole schedule flawlessly.' (Bạn tổ chức toàn bộ lịch trình hoàn hảo.)"
        },
        {
          id: 9,
          question: "What program did Ben and Anna sign up for?",
          options: [
            "Coffee breaks.",
            "New wellness program with yoga.",
            "Team-building retreat.",
            "Presentation training."
          ],
          correct: 1,
          explanation: "Ben và Anna nói: 'I signed up for yoga classes... it's starting Monday.' (Tôi đăng ký lớp yoga... bắt đầu thứ Hai.)"
        },
        {
          id: 10,
          question: "What is John nervous about?",
          options: [
            "Tough coffee conversations.",
            "Leading his first big presentation.",
            "The wellness program.",
            "The team retreat."
          ],
          correct: 1,
          explanation: "John nói: 'I'm nervous—it's my first time leading one.' (Tôi lo lắng—lần đầu dẫn dắt.)"
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Dr. Chen: Hello, class. Today we're discussing environmental policies in urban planning. This topic is crucial for sustainable cities, though implementation can be challenging. I've reviewed your midterm essays—average score is 7.2, solid progress. Extensions for assignments require prior approval; otherwise, penalties apply, as seen with last semester's group. On a lighter note, the campus cafe offers eco-friendly options: organic teas, vegan snacks, and zero-waste packaging—ideal for post-lecture breaks.",
      questions: [
        {
          id: 11,
          question: "The topic is __________ for sustainable cities.",
          options: ["(A) boring", "(B) irrelevant", "(C) crucial", "(D) optional"],
          correct: 2,
          explanation: "Dr. Chen: 'This topic is crucial for sustainable cities.' (Chủ đề này rất quan trọng cho thành phố bền vững.) - Luyện nghe đánh giá tầm quan trọng."
        },
        {
          id: 12,
          question: "I have reviewed __________. ",
          options: ["(A) late policies", "(B) the campus menu", "(C) your midterm essays", "(D) your excuses"],
          correct: 2,
          explanation: "Dr. Chen: 'I've reviewed your midterm essays—average score is 7.2.' (Tôi đã xem bài luận giữa kỳ—điểm trung bình 7.2.) - Luyện nghe hành động đánh giá gần đây."
        },
        {
          id: 13,
          question: "Extensions require __________.",
          options: ["(A) extra fees", "(B) prior approval", "(C) group vote", "(D) no approval"],
          correct: 1,
          explanation: "Dr. Chen: 'Extensions for assignments require prior approval.' (Gia hạn bài tập cần phê duyệt trước.) - Luyện nghe quy định học tập."
        },
        {
          id: 14,
          question: "Last semester's group __________ penalties.",
          options: ["(A) avoided", "(B) applied for", "(C) saw", "(D) ignored"],
          correct: 2,
          explanation: "Dr. Chen: 'Penalties apply, as seen with last semester's group.' (Như nhóm kỳ trước đã thấy.) - Luyện nghe ví dụ hậu quả."
        },
        {
          id: 15,
          question: "The campus cafe offers __________.",
          options: ["(A) meat dishes", "(B) solar-powered chargers", "(C) eco-friendly options", "(D) all of the above"],
          correct: 2,
          explanation: "Dr. Chen: 'The campus cafe offers eco-friendly options: organic teas, vegan snacks, and zero-waste packaging.' (Quán cà phê trường cung cấp lựa chọn thân thiện môi trường.) - Luyện nghe mô tả tiện ích."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Client 1: Excuse me, I'm interested in the laptop upgrade service. This is for my work computer.\nSales Associate: Of course. When did you purchase it originally?\nClient 1: About six months ago from your online store.\nSales Associate: Understood. Any issues with performance?\nClient 1: It's slowing down during video calls—no receipt handy, but I have the order confirmation email.\nSales Associate: That should suffice for verification. However, upgrades beyond warranty might incur a fee. We can check your serial number.\nClient 1: Fair enough. Can we schedule it for tomorrow?\nSales Associate: Absolutely, to avoid further delays.",
      questions: [
        {
          id: 16,
          question: "The laptop is for __________.",
          options: ["(A) school", "(B) personal use", "(C) work", "(D) gaming"],
          correct: 2,
          explanation: "Client 1: 'This is for my work computer.' (Đây là cho máy tính làm việc của tôi.) - Luyện nghe mục đích sử dụng."
        },
        {
          id: 17,
          question: "The purchase was __________.",
          options: ["(A) tomorrow", "(B) six months ago", "(C) last year", "(D) recently"],
          correct: 1,
          explanation: "Client 1: 'About six months ago.' (Khoảng sáu tháng trước.) - Luyện nghe thời gian mua."
        },
        {
          id: 18,
          question: "The client has __________.",
          options: ["(A) the serial number", "(B) no proof", "(C) the order email", "(D) the receipt"],
          correct: 2,
          explanation: "Client 1: 'No receipt handy, but I have the order confirmation email.' (Không có biên lai, nhưng có email xác nhận đơn hàng.) - Luyện nghe phương tiện xác thực."
        },
        {
          id: 19,
          question: "Upgrades beyond warranty __________.",
          options: ["(A) require new purchase", "(B) might incur a fee", "(C) are unavailable", "(D) are free"],
          correct: 1,
          explanation: "Sales Associate: 'Upgrades beyond warranty might incur a fee.' (Nâng cấp ngoài bảo hành có thể mất phí.) - Luyện nghe điều khoản dịch vụ."
        },
        {
          id: 20,
          question: "The associate suggests __________.",
          options: ["(A) ignoring the issue", "(B) checking the serial number", "(C) buying a new laptop", "(D) delaying the service"],
          correct: 1,
          explanation: "Sales Associate: 'We can check your serial number.' (Chúng tôi có thể kiểm tra số serial.) - Luyện nghe giải pháp hỗ trợ."
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
          question: "The conference agenda includes sessions on digital marketing, which has become increasingly __________ in recent years.",
          options: ["imports", "import", "importance", "important"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'important' vì đây là tính từ bổ nghĩa cho danh từ 'marketing'. Kiến thức ngữ pháp: Tính từ 'important' (quan trọng) đứng trước danh từ; không dùng danh từ (A), động từ (C), hoặc danh từ số nhiều (D)."
        },
        {
          id: 22,
          question: "The research team __________ data from various sources before drawing conclusions.",
          options: ["analyzing", "analyzes", "had analyzed", "analyze"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'had analyzed' vì thì quá khứ hoàn thành trước thời điểm quá khứ. Kiến thức ngữ pháp: 'By the time + past, past perfect'; không dùng hiện tại (A,B), V-ing (D)."
        },
        {
          id: 23,
          question: "Despite the challenges, the project was completed __________ schedule.",
          options: ["at", "on", "by", "in"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'on' vì cụm từ cố định 'on schedule' (đúng hạn). Kiến thức ngữ pháp: Giới từ 'on' với 'schedule'; 'in' (trong), 'at' (tại), 'by' (bằng) không phù hợp."
        },
        {
          id: 24,
          question: "Employees are encouraged to participate in volunteer activities to foster a sense of __________. ",
          options: ["community", "communicate", "commune", "communal"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'community' vì đây là danh từ chỉ 'cộng đồng'. Kiến thức từ vựng: Danh từ 'community' (cộng đồng) sau 'sense of'; tính từ (B), danh từ khác (C), động từ (D) không khớp."
        },
        {
          id: 25,
          question: "The CEO announced that the company __________ expanding its operations internationally next year.",
          options: ["is", "been", "be", "are"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'is' vì chủ ngữ 'company' số ít, thì hiện tại tiếp diễn 'is expanding'. Kiến thức ngữ pháp: Động từ 'to be' số ít 'is' + V-ing cho tương lai gần; 'are' (số nhiều), 'be' (nguyên thể), 'been' (quá khứ phân từ) sai."
        },
        {
          id: 26,
          question: "Please ensure that all documents are __________ prior to the meeting.",
          options: ["prepares", "preparing", "prepared", "prepare"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'prepared' vì dạng quá khứ phân từ trong cấu trúc bị động 'are prepared'. Kiến thức ngữ pháp: Bị động hiện tại 'are + V3' (prepared = chuẩn bị); không dùng nguyên thể (A), V-ing (B), ngôi thứ ba (D)."
        },
        {
          id: 27,
          question: "The workshop will cover advanced techniques __________ improving productivity.",
          options: ["by", "for", "with", "on"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'for' vì cụm 'techniques for improving' (kỹ thuật để cải thiện). Kiến thức ngữ pháp: Giới từ 'for' chỉ mục đích; 'on' (về), 'with' (với), 'by' (bằng) không phù hợp."
        },
        {
          id: 28,
          question: "She works __________ as a freelance consultant, allowing flexibility in her schedule.",
          options: ["independence", "independently", "independent", "depend"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'independently' vì trạng từ bổ nghĩa động từ 'works'. Kiến thức ngữ pháp: Trạng từ 'independently' (một cách độc lập); tính từ (A), danh từ (C), động từ sai (D) không đúng."
        },
        {
          id: 29,
          question: "Due to budget cuts, the event has been __________ to a virtual format.",
          options: ["changes", "changing", "changed", "change"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'changed' vì thì hiện tại hoàn thành thụ động 'has been changed'. Kiến thức ngữ pháp: Bị động 'has been + V3'; không dùng nguyên thể (A), V-ing (B), ngôi thứ ba (D)."
        },
        {
          id: 30,
          question: "Innovation and adaptability are essential __________ navigating market changes.",
          options: ["to", "in", "for", "at"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'to' vì cụm 'essential to' (thiết yếu cho). Kiến thức ngữ pháp: 'Essential to + V-ing' chỉ mục đích; 'for' (cho), 'in' (trong), 'at' (tại) không khớp."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Sales Team Members
  From: Mark Thompson, Sales Manager
  Subject: Quarterly Goals and Training Update
  Dear Team,
  I hope this email finds you well. As we approach the end of the quarter, it's time to review our progress toward the sales targets set at the beginning of the period. Our goal is to exceed last quarter's performance by 15%, which requires focused efforts from everyone. To support this, we have scheduled mandatory training sessions starting next Monday to (31) key selling techniques.
  The training will include role-playing exercises and case studies from recent successful deals. This is designed to (32) your confidence when dealing with challenging clients. Additionally, we will introduce a new customer relationship management (CRM) tool that streamlines data entry and reporting.
  Please submit your individual sales forecasts by end of day Thursday, April 10, so we can align them with the team objectives and (33) any gaps early. Remember, collaboration is key—feel free to (36) best practices during our weekly check-ins.
  The quarterly review meeting is set for April 20 at 2 p.m. in the conference room. We anticipate participation from senior leadership, so prepare to showcase your achievements. A preparation guide will be sent out tomorrow to (34) you get ready effectively.
  For new hires, a buddy system has been implemented to pair you with experienced colleagues. This will help you (35) faster and contribute sooner to our goals.
  Thank you for your unwavering commitment. Your efforts are vital to our success, and I look forward to celebrating our wins together.
  Best,
  Mark Thompson
  Sales Manager
  Global Solutions Inc.`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "...mandatory training sessions starting next Monday to (31) key selling techniques.",
          options: ["delay", "reinforce", "ignore", "review"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'reinforce' vì nó nghĩa là 'củng cố', phù hợp với 'to reinforce key selling techniques' (để củng cố kỹ thuật bán hàng chính). Kiến thức ngữ pháp: Động từ 'reinforce' + tân ngữ trong mục đích; 'review' (xem lại), 'ignore' (bỏ qua), 'delay' (trì hoãn) không phù hợp."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "This is designed to (32) your confidence when dealing with challenging clients.",
          options: ["lose", "build", "test", "reduce"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'build' vì nó nghĩa là 'xây dựng', phù hợp với 'to build your confidence' (xây dựng sự tự tin). Kiến thức từ vựng: Động từ tích cực 'build' trong ngữ cảnh đào tạo; 'reduce' (giảm), 'test' (kiểm tra), 'lose' (mất) mang nghĩa tiêu cực."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "...so we can align them with the team objectives and (33) any gaps early.",
          options: ["hide", "identify", "create", "fill"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'identify' vì nó nghĩa là 'xác định', phù hợp với 'identify any gaps' (xác định khoảng trống). Kiến thức ngữ pháp: Động từ 'identify' + tân ngữ trong cấu trúc phát hiện vấn đề; 'create' (tạo), 'hide' (che giấu), 'fill' (điền) không khớp."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "A preparation guide will be sent out tomorrow to (34) you get ready effectively.",
          options: ["prevent", "help", "force", "stop"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'help' vì nó nghĩa là 'giúp', phù hợp với 'to help you get ready' (giúp bạn chuẩn bị). Kiến thức ngữ pháp: Động từ 'help' + tân ngữ + V nguyên thể; 'stop' (dừng), 'force' (buộc), 'prevent' (ngăn) không phù hợp."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "This will help you (35) faster and contribute sooner to our goals.",
          options: ["hesitate", "integrate", "leave", "struggle"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'integrate' vì nó nghĩa là 'hòa nhập', phù hợp với 'integrate faster' (hòa nhập nhanh hơn). Kiến thức từ vựng: Động từ 'integrate' chỉ quá trình thích nghi nhóm; 'struggle' (vật lộn), 'leave' (rời), 'hesitate' (do dự) tiêu cực."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Remember, collaboration is key—feel free to (36) best practices during our weekly check-ins.",
          options: ["avoid", "limit", "postpone", "promote"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'promote' vì ngữ cảnh nhấn mạnh 'collaboration is key' và 'share best practices' ngụ ý 'promote' (thúc đẩy) chia sẻ. Kiến thức suy luận: Động từ tích cực phù hợp với tinh thần đội nhóm; các lựa chọn khác tiêu cực."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - The sales target is to exceed last quarter by ___.",
          options: ["10%", "15%", "5%", "20%"],
          correct: 1,
          explanation: "Đáp án đúng là (B) '15%' vì email nêu 'exceed last quarter's performance by 15%'. Kiến thức đọc hiểu: Trích dẫn trực tiếp mục tiêu từ phần review."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is the primary focus of the training sessions?",
          options: ["Vacation scheduling", "Role-playing and case studies", "Hiring new staff", "Budget planning"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'The training will include role-playing exercises and case studies'. Kiến thức đọc hiểu: Xác định nội dung chính từ phần training."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - When must sales forecasts be submitted?",
          options: ["Next Monday", "April 20", "April 10", "End of quarter"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'by end of day Thursday, April 10'. Kiến thức đọc hiểu: Thời hạn cụ thể từ phần submit."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - What system is implemented for new hires?",
          options: ["Remote training", "A buddy system", "Salary review", "Independent assignments"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'a buddy system has been implemented to pair you with experienced colleagues'. Kiến thức đọc hiểu: Hệ thống hỗ trợ từ phần new hires."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**EcoTravel Adventures Advertisement**
    Discover Hidden Gems with Guided Eco-Tours
    Experience nature responsibly with our expert-led tours to pristine destinations. Book now and receive a 10% discount on your first adventure! Tours depart weekly.
    **What We Provide:**
    1. **Certified Guides** – Our team of knowledgeable naturalists ensures safe and educational outings. Check ecotraveladventures.com for guide profiles and tour itineraries.
    2. **Sustainable Transport** – Electric vans and bikes minimize environmental impact.
    3. **Custom Itineraries** – Tailor your trip with add-ons like birdwatching or photography workshops.
    4. **Group Discounts** – Save more when traveling with friends or family.
    Contact us at info@ecotraveladventures.com with your preferences. We'll respond within 48 hours with options and pricing.
    ---
    **Email Message**
    **To:** info@ecotraveladventures.com
    **From:** emma.wilson@email.com
    **Date:** July 15
    **Subject:** Inquiry for Family Tour
    I saw your ad on social media and am interested in a guided eco-tour for my family of four (two adults, two kids aged 8 and 10). We'd like a three-day trip focused on wildlife viewing, preferably in a coastal area. Can you customize it to include kid-friendly activities? We're flexible on dates but available after August 1. Please call me at 555-123-4567 after 6:00 P.M. weekdays.
    Regards,
    Emma Wilson
    123 Ocean Drive, Miami, FL 33101`,
      questions: [
        {
          id: 41,
          question: "Why should customers visit the EcoTravel Adventures website?",
          options: ["To pay discounts", "To view guide profiles", "To join social media", "To book transport"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Check ecotraveladventures.com for guide profiles and tour itineraries'. Kiến thức đọc hiểu: Mục đích từ phần Certified Guides."
        },
        {
          id: 42,
          question: "How was the advertisement discovered by Ms. Wilson?",
          options: ["Via email.", "On social media.", "At a travel agency.", "In a magazine."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I saw your ad on social media'. Kiến thức suy luận: Kênh quảng cáo từ email."
        },
        {
          id: 43,
          question: "Who is Ms. Wilson planning the tour for?",
          options: ["Birdwatchers only", "Her family of four", "A business group", "Solo travelers"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'for my family of four (two adults, two kids)'. Kiến thức đọc hiểu: Số lượng và thành viên từ email."
        },
        {
          id: 44,
          question: "What does Ms. Wilson NOT mention in her email?",
          options: ["Sustainable transport", "Group discounts", "Custom itineraries", "Kid-friendly activities"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email không đề cập group discounts, dù quảng cáo có; tập trung vào customize và activities. Kiến thức đọc hiểu: So sánh yêu cầu email với dịch vụ."
        },
        {
          id: 45,
          question: "What will Ms. Wilson likely receive within 48 hours?",
          options: ["A phone call", "Options and pricing", "A tour discount code", "Guide profiles only"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'We'll respond within 48 hours with options and pricing'. Kiến thức suy luận: Quy trình từ quảng cáo."
        },
        {
          id: 46,
          question: "What discount is offered in the advertisement?",
          options: ["Weekly specials", "10% on first adventure", "5% off", "Free transport"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'receive a 10% discount on your first adventure'. Kiến thức đọc hiểu: Ưu đãi trực tiếp."
        },
        {
          id: 47,
          question: "What is the focus of Ms. Wilson's requested tour?",
          options: ["Photography workshops", "Coastal wildlife viewing", "Electric bike tours", "Birdwatching add-ons"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'focused on wildlife viewing, preferably in a coastal area'. Kiến thức đọc hiểu: Yêu cầu chính từ email."
        },
        {
          id: 48,
          question: "When is Ms. Wilson available for the tour?",
          options: ["Weekdays only", "After August 1", "Before August 1", "Weekends preferred"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'available after August 1'. Kiến thức đọc hiểu: Thời gian linh hoạt từ email."
        },
        {
          id: 49,
          question: "What time does Ms. Wilson prefer to be called?",
          options: ["Mornings only", "After 6:00 P.M. weekdays", "Before 6:00 P.M.", "Weekends anytime"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'call me... after 6:00 P.M. weekdays'. Kiến thức đọc hiểu: Khung giờ từ email."
        },
        {
          id: 50,
          question: "How many days is the requested trip?",
          options: ["Two days", "Three days", "A full week", "One day"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'a three-day trip'. Kiến thức đọc hiểu: Độ dài tour từ email."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Sarah (14:22): Stuck in traffic—meeting starts at 3, right? Running 20 mins late.
    Mike (14:23): Yes, 3 p.m. sharp. No worries, I'll update the team.
    Sarah (14:25): Thanks! Client's presentation is key—don't want to miss the Q&A.
    Mike (14:30): Got it. Weather's the culprit; roads are jammed.
    Sarah (15:10): Almost there. Save me a seat?`,
      questions: [
        {
          id: 51,
          question: "What is implied about Sarah?",
          options: ["She works in traffic control.", "She is attending a client meeting.", "She is leading the meeting.", "She canceled the Q&A."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Client's presentation... don't want to miss the Q&A' ngụ ý tham gia họp khách hàng. Kiến thức suy luận: Ngữ cảnh business meeting."
        },
        {
          id: 52,
          question: "What does Mike mean by 'No worries'?",
          options: ["He doubts her excuse.", "He will handle the update.", "He plans to reschedule.", "He is annoyed by the delay."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll update the team' sau 'No worries'. Kiến thức suy luận: Cụm từ trấn an kết nối với hành động hỗ trợ."
        },
        {
          id: 53,
          question: "Why is Sarah delayed?",
          options: [
            "She overslept.",
            "Bad weather and traffic.",
            "Client rescheduled.",
            "Car breakdown."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Stuck in traffic... Weather's the culprit; roads are jammed'. Kiến thức đọc hiểu: Lý do trực tiếp từ tin nhắn."
        },
        {
          id: 54,
          question: "What time does the meeting start?",
          options: [
            "14:22",
            "3 p.m.",
            "15:10",
            "2 p.m."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'meeting starts at 3, right? Yes, 3 p.m.'. Kiến thức đọc hiểu: Thời gian xác nhận."
        },
        {
          id: 55,
          question: "What does Sarah ask Mike to do last?",
          options: [
            "Check the weather",
            "Save her a seat",
            "Start without her",
            "Update the client"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Save me a seat?'. Kiến thức đọc hiểu: Yêu cầu cuối cùng."
        },
        {
          id: 56,
          question: "What can be inferred about Mike and Sarah?",
          options: [
            "They are competitors.",
            "They are colleagues.",
            "They are family.",
            "They are strangers."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì ngữ cảnh họp team và hỗ trợ lẫn nhau. Kiến thức suy luận: Mối quan hệ đồng nghiệp từ 'update the team'."
        },
        {
          id: 57,
          question: "Why does Sarah mention the Q&A?",
          options: [
            "To blame the client.",
            "It's important to her.",
            "To end early.",
            "To skip it."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'don't want to miss the Q&A'. Kiến thức suy luận: Nhấn mạnh phần quan trọng."
        },
        {
          id: 58,
          question: "What does Mike attribute the delay to?",
          options: [
            "Client demands.",
            "Heavy traffic from weather.",
            "Meeting location.",
            "Sarah's poor planning."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Weather's the culprit; roads are jammed'. Kiến thức suy luận: Giải thích nguyên nhân."
        },
        {
          id: 59,
          question: "What is suggested about the roads?",
          options: [
            "They are empty.",
            "They are jammed.",
            "They are closed.",
            "They are clear."
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'roads are jammed'. Kiến thức suy luận: Tình trạng giao thông."
        },
        {
          id: 60,
          question: "What does Sarah express in her first message?",
          options: [
            "Complaint about Mike",
            "Apology for lateness",
            "Excitement for the meeting",
            "Request to cancel"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Running 20 mins late' ngụ ý xin lỗi gián tiếp. Kiến thức suy luận: Giọng điệu thông báo và xác nhận."
        }
      ]
    }
  }
};