export const EXAM2_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 2 (Chủ Đề: Du Lịch & Công Việc)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT, tập trung vào chủ đề Du Lịch & Công Việc. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài giữa đồng nghiệp về chuyến công tác để luyện nghe chi tiết.",
  parts: {
    // Listening Parts - Part 1: 1 hội thoại chung cho 5 câu hỏi, chủ đề công tác
   part1: {
  title: "PART 1: Short Conversations",
  description: "Nghe đoạn hội thoại giữa Mark và Sarah về kế hoạch công tác. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
  type: "listening",
  script: "Mark: Hey Sarah, excited for our business trip to Singapore next week?\nSarah: Absolutely, Mark. It's my first time leading a client meeting abroad. I've booked the flight for early morning departure to avoid traffic, but I worry about the long layover in Hong Kong.\nMark: Don't stress. The layover is only two hours—plenty of time for a quick coffee. What about accommodations? Did you confirm the hotel near the conference center?\nSarah: Yes, it's a five-star place with great reviews, but it's pricey. I negotiated a corporate rate, though. Oh, and I packed light: just carry-on to save time at check-in.\nMark: Smart move. Last time I overpacked and missed my gate because of baggage claim delays. Let's review the agenda—focus on the Q&A session, as that's where deals close.",
  questions: [
    {
      id: 1,
      question: "What is Sarah's experience with leading client meetings abroad?",
      options: [
        "(A) She has led many client meetings abroad.",
        "(B) It's her first time leading a client meeting abroad.",
        "(C) She has never led a meeting.",
        "(D) She led a meeting in Hong Kong."
      ],
      correct: 1,
      explanation: "Sarah nói rõ ràng: 'It's **my first time leading a client meeting abroad.**' (Đây là lần đầu tiên tôi dẫn dắt cuộc họp khách hàng ở nước ngoài.) Từ khóa chính: 'first time' chỉ đây là kinh nghiệm mới. Cấu trúc 'It is my first time + V-ing' diễn tả một hoạt động lần đầu tiên được thực hiện, thường có tính chất mới mẻ hoặc gây lo lắng. Phân tích các đáp án sai: (A) 'many times' hoàn toàn trái ngược với 'first time', (C) 'never led' cũng sai vì cô ấy sắp dẫn dắt lần đầu chứ không phải chưa bao giờ, (D) 'in Hong Kong' chỉ là nơi dừng chân chuyến bay, không phải nơi họp khách."
    },
    {
      id: 2,
      question: "How long is the layover in Hong Kong?",
      options: [
        "(A) The layover is five hours long.",
        "(B) The layover is two hours long.",
        "(C) There is no layover.",
        "(D) The layover is in Singapore."
      ],
      correct: 1,
      explanation: "Mark trả lời trực tiếp: 'The layover is **only two hours**—plenty of time for a quick coffee.' (Dừng chân chỉ hai giờ—đủ thời gian cho một tách cà phê nhanh.) Từ khóa chính: 'only two hours' chỉ rõ thời lượng. Từ 'only' (chỉ, không quá) nhấn mạnh thời gian ngắn hơn dự kiến. Lưu ý: Trước đó Sarah nói 'I worry about the **long layover**' nhưng Mark đã xoa dịu lo lắng của cô. Phân tích các đáp án sai: (A) 'five hours' là giá trị sai hoàn toàn, (C) 'no layover' mâu thuẫn với thông tin, (D) layover ở Hong Kong, không phải Singapore."
    },
    {
      id: 3,
      question: "What is mentioned about Sarah's hotel booking?",
      options: [
        "(A) The hotel is budget-friendly.",
        "(B) The hotel has poor reviews.",
        "(C) The hotel is near the conference center.",
        "(D) There is no hotel booking."
      ],
      correct: 2,
      explanation: "Sarah nói: 'Yes, it's a five-star place with great reviews, but it's pricey. I negotiated a corporate rate, though. ... Did you confirm the **hotel near the conference center?**' (Vâng, nó là một nơi năm sao với đánh giá tuyệt vời, nhưng đắt. Tôi đã thương lượng tỷ lệ công ty. ... Bạn đã xác nhận khách sạn gần trung tâm hội nghị?) Từ khóa chính: 'near the conference center' - vị trí khách sạn. Giới từ 'near' chỉ vị trí địa lý rất quan trọng cho du lịch công tác (tiết kiệm thời gian đi lại). Phân tích các đáp án sai: (A) 'budget-friendly' hoàn toàn trái ngược với 'five-star' và 'pricey' trong bài, (B) 'poor reviews' mâu thuẫn với 'great reviews', (D) đã xác nhận nên không phải 'no booking'."
    },
    {
      id: 4,
      question: "How did Sarah pack for the trip?",
      options: [
        "(A) She packed heavy luggage.",
        "(B) She packed light with carry-on.",
        "(C) She forgot to pack.",
        "(D) She overpacked last time."
      ],
      correct: 1,
      explanation: "Sarah nói: 'Oh, and **I packed light: just carry-on** to save time at check-in.' (Ôi, và tôi đóng gói nhẹ: chỉ hành lý xách tay để tiết kiệm thời gian check-in.) Từ khóa chính: 'packed light' (đóng gói nhẹ) và 'just carry-on' (chỉ hành lý xách tay). Cấu trúc 'to + V nguyên thể' (to save time) chỉ mục đích của hành động. Từ 'just' nhấn mạnh sự đơn giản, giảm thiểu. Phân tích các đáp án sai: (A) 'heavy luggage' trái ngược hoàn toàn với 'packed light', (C) 'forgot to pack' là logic sai, (D) 'overpacked last time' - đây là kinh nghiệm của **Mark**, không phải Sarah. Mark nói 'Last time **I** overpacked' để giải thích tại sao ông ấy đồng ý với chiến lược của Sarah."
    },
    {
      id: 5,
      question: "What should they focus on during the meeting?",
      options: [
        "(A) Focus on the opening remarks.",
        "(B) Focus on the Q&A session.",
        "(C) Avoid the agenda review.",
        "(D) Skip the client meeting."
      ],
      correct: 1,
      explanation: "Mark nói: 'Let's review the agenda—**focus on the Q&A session, as that's where deals close.**' (Hãy xem lại chương trình—tập trung vào phần Q&A, vì đó là nơi chốt hợp đồng.) Từ khóa chính: 'Q&A session' (phần hỏi đáp) và 'as that's where deals close' (vì đó là nơi chốt hợp đồng). Cấu trúc 'as + clause' chỉ lý do hoặc nguyên nhân (tương đương 'because'). Thì hiện tại đơn 'that's where deals close' mô tả sự thật chung trong kinh doanh - vòng Q&A thường là nơi quyết định cuối cùng. Phân tích các đáp án sai: (A) 'opening remarks' không được nhấn mạnh, (C) 'avoid the agenda review' mâu thuẫn với 'Let's review', (D) 'skip the client meeting' là logic điên rồ và hoàn toàn trái ngược mục đích chuyến đi."
    }
  ]
},
   part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người tại sân bay về lịch trình công tác. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At the airport lounge.\nTravel Agent: Good morning, Mr. Ben and Ms. Anna. Your connecting flight to Paris departs in 45 minutes. Any last-minute changes to the itinerary?\nBen: No changes, thanks. But Anna, did you email the Paris office about our delayed arrival due to the storm?\nAnna: Yes, I did. They understand and rescheduled the factory tour for the afternoon. Mike, our colleague, will join us there—he's flying in from London separately.\nTravel Agent: Excellent. Here's your boarding passes. Remember, the lounge offers free Wi-Fi for work emails.\nBen: Appreciate it. Anna, after Paris, we're heading to Berlin for the trade fair. I hope the train connection isn't as chaotic as last year.\nAnna: It shouldn't be. I booked first-class seats for comfort during the three-hour ride. Let's grab coffee before boarding.",
  questions: [
    {
      id: 6,
      question: "How soon does the flight to Paris depart?",
      options: [
        "In 15 minutes",
        "In 45 minutes",
        "In one hour",
        "In two hours"
      ],
      correct: 1,
      explanation: "✅ Đáp án: **B - In 45 minutes**\n\n📍 **Từ khóa cần nghe:** Travel Agent nói rõ: 'Your connecting flight to Paris **departs in 45 minutes**.'\n\n💡 **Mẹo làm bài:** Tập trung nghe con số thời gian ngay sau động từ 'departs in'. Đây là thông tin được nói trực tiếp ở đầu đoạn hội thoại.\n\n⚠️ **Lưu ý ngữ pháp:** 'Departs in + khoảng thời gian' dùng thì hiện tại đơn để diễn tả lịch trình tương lai đã được lên kế hoạch cố định (scheduled future), thường gặp với phương tiện giao thông công cộng."
    },
    {
      id: 7,
      question: "Why was the arrival in Paris delayed?",
      options: [
        "Due to traffic",
        "Due to a storm",
        "Due to booking errors",
        "Due to colleague's flight"
      ],
      correct: 1,
      explanation: "✅ Đáp án: **B - Due to a storm**\n\n📍 **Từ khóa cần nghe:** Ben hỏi Anna: 'Did you email the Paris office about our **delayed arrival due to the storm**?'\n\n💡 **Mẹo làm bài:** Chú ý cụm từ 'due to' (do, bởi vì) - đây là tín hiệu ngữ pháp chỉ nguyên nhân. Nghe từ ngay sau 'due to' là đáp án.\n\n🎯 **Cấu trúc quan trọng:** 'due to + danh từ/cụm danh từ' = 'because of' (chỉ nguyên nhân). Ví dụ: delayed due to bad weather, cancelled due to technical issues.\n\n⚠️ **Cẩn thận:** Các đáp án nhiễu như 'traffic', 'booking errors' không được nhắc đến trong đoạn hội thoại."
    },
    {
      id: 8,
      question: "What will be rescheduled in Paris?",
      options: [
        "The coffee break",
        "The factory tour",
        "The email session",
        "The boarding pass"
      ],
      correct: 1,
      explanation: "✅ Đáp án: **B - The factory tour**\n\n📍 **Từ khóa cần nghe:** Anna trả lời: 'They understand and **rescheduled the factory tour** for the afternoon.'\n\n💡 **Mẹo làm bài:** Động từ 'reschedule' (dời lịch) là từ khóa quan trọng. Nghe xem cái gì được 'reschedule' - đó chính là đáp án.\n\n🎯 **Phân tích ngữ pháp:** 'Rescheduled' (thì quá khứ đơn) cho thấy việc thay đổi lịch trình đã được thực hiện xong. Cụm 'for the afternoon' bổ sung thông tin thời gian mới.\n\n⚠️ **Tránh nhầm lẫn:** 'Coffee break', 'email session', 'boarding pass' đều được nhắc đến nhưng KHÔNG được reschedule. Chỉ có 'factory tour' mới bị thay đổi lịch."
    },
    {
      id: 9,
      question: "Where is Mike flying from?",
      options: [
        "From Singapore",
        "From Hong Kong",
        "From London",
        "From Berlin"
      ],
      correct: 2,
      explanation: "✅ Đáp án: **C - From London**\n\n📍 **Từ khóa cần nghe:** Anna nói: 'Mike, our colleague, will join us there—**he's flying in from London** separately.'\n\n💡 **Mẹo làm bài:** Tập trung vào cụm 'from + địa điểm' sau động từ chỉ di chuyển. 'Flying from' chỉ nơi xuất phát.\n\n🎯 **Cấu trúc thì:** 'He's flying in' = 'He is flying in' (hiện tại tiếp diễn) diễn tả kế hoạch tương lai gần đã sắp xếp. Trong ngữ cảnh công tác, thì này thể hiện hành trình đang được thực hiện.\n\n📝 **Lưu ý:** Từ 'separately' (riêng biệt) cho biết Mike bay một mình, không cùng chuyến với Ben và Anna.\n\n⚠️ **Cẩn thận:** Berlin được nhắc đến nhưng là điểm ĐẾN tiếp theo của nhóm, không phải nơi Mike bay từ đó."
    },
    {
      id: 10,
      question: "What did Anna book for the trip to Berlin?",
      options: [
        "Economy seats",
        "First-class seats",
        "No seats",
        "Hotel rooms only"
      ],
      correct: 1,
      explanation: "✅ Đáp án: **B - First-class seats**\n\n📍 **Từ khóa cần nghe:** Anna nói: 'I **booked first-class seats** for comfort during the three-hour ride.'\n\n💡 **Mẹo làm bài:** Nghe động từ 'book' (đặt) kết hợp với loại ghế (first-class/economy). Đây là thông tin cụ thể về việc chuẩn bị chuyến đi.\n\n🎯 **Phân tích ngữ pháp:** \n- 'Booked' (quá khứ đơn) → hành động đặt chỗ đã hoàn tất\n- 'For comfort' → cụm giới từ chỉ mục đích (để thoải mái)\n- 'During the three-hour ride' → cụm chỉ thời gian, nhấn mạnh lý do chọn first-class cho chuyến đi dài\n\n📝 **Ngữ cảnh:** Trong công tác, việc chọn first-class thay vì economy cho thấy ưu tiên sự thoải mái và khả năng làm việc trên đường.\n\n⚠️ **Tránh nhầm lẫn:** 'Hotel rooms' được nhắc đến nhưng không phải là thứ Anna đã book trong câu này."
    }
  ]
},
   part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của quản lý về chính sách du lịch công tác. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Manager: Hello, team. Today, we're discussing our company's travel policy updates. All business trips must be approved in advance to control expenses—nothing over budget without HR sign-off. Last quarter, we saved 15% on flights by opting for economy class unless the journey exceeds eight hours. For accommodations, prioritize hotels with reliable Wi-Fi and proximity to client sites; luxury suites are reserved for executive-level visits only. Remember, expense reports are due within 72 hours of return, or reimbursements will be delayed. Emma, our top traveler, always submits on time and maximizes mileage points for future trips. If you're heading to Tokyo next, book through our preferred agency for seamless visa support.",
  questions: [
    { 
      id: 11, 
      question: "All business trips must be __________.", 
      options: ["(A) spontaneous", "(B) approved in advance", "(C) expensive", "(D) delayed"], 
      correct: 1,
      explanation: "✅ Đáp án: **(B) approved in advance**\n\n📍 **Từ khóa cần nghe:** Manager nói rõ: 'All business trips **must be approved in advance** to control expenses.'\n\n💡 **Mẹo làm bài:** Chú ý cấu trúc 'must be + V3' - đây là dạng bị động diễn tả quy định bắt buộc. Nghe từ ngay sau 'must be' là đáp án.\n\n🎯 **Phân tích ngữ pháp:**\n- 'Must be + past participle' → thể bị động chỉ nghĩa vụ (obligation)\n- 'In advance' = trước, trước khi xảy ra → nhấn mạnh tính kế hoạch\n- Mục đích: 'to control expenses' (để kiểm soát chi phí)\n\n📝 **Ngữ cảnh công ty:** Đây là quy trình hành chính tiêu chuẩn - mọi chuyến công tác đều cần được phê duyệt trước, không được tự ý đi.\n\n⚠️ **Tránh nhầm lẫn:** \n- (A) spontaneous (tự phát) → NGƯỢC LẠI với 'in advance'\n- (C) expensive (đắt) → không liên quan đến yêu cầu\n- (D) delayed (trì hoãn) → không được nhắc đến"
    },
    { 
      id: 12, 
      question: "We saved 15% on flights by __________.", 
      options: ["(A) choosing luxury options", "(B) opting for economy class", "(C) flying first class", "(D) avoiding travel"], 
      correct: 1,
      explanation: "✅ Đáp án: **(B) opting for economy class**\n\n📍 **Từ khóa cần nghe:** 'We saved 15% on flights **by opting for economy class** unless the journey exceeds eight hours.'\n\n💡 **Mẹo làm bài:** Cụm 'by + V-ing' luôn chỉ PHƯƠNG PHÁP/CÁCH THỨC. Nghe động từ V-ing ngay sau 'by' là đáp án.\n\n🎯 **Phân tích ngữ pháp:**\n- 'By + V-ing' → chỉ phương tiện, cách thức (HOW)\n- 'Opt for' = choose, select (lựa chọn)\n- 'Unless + clause' → điều kiện ngoại lệ (= except if)\n\n📊 **Con số quan trọng:** 15% savings - cho thấy hiệu quả của chính sách\n\n📝 **Quy định thực tế:** Hạng phổ thông cho chuyến bay dưới 8 giờ, hạng cao hơn cho chuyến dài (nhân văn + tiết kiệm).\n\n⚠️ **Cẩn thận với đáp án nhiễu:**\n- (A) luxury options → NGƯỢC LẠI với tiết kiệm\n- (C) first class → NGƯỢC LẠI với economy\n- (D) avoiding travel → không bay thì không tiết kiệm 15% ON FLIGHTS được"
    },
    { 
      id: 13, 
      question: "For accommodations, prioritize hotels with __________.", 
      options: ["(A) no Wi-Fi", "(B) reliable Wi-Fi and proximity", "(C) high prices", "(D) distance from sites"], 
      correct: 1,
      explanation: "✅ Đáp án: **(B) reliable Wi-Fi and proximity**\n\n📍 **Từ khóa cần nghe:** 'Prioritize hotels with **reliable Wi-Fi and proximity to client sites**.'\n\n💡 **Mẹo làm bài:** Động từ 'prioritize' (ưu tiên) + 'with' → sau đó là TIÊU CHÍ quan trọng nhất. Đây là câu hỏi về yêu cầu chất lượng.\n\n🎯 **Phân tích ngữ pháp:**\n- 'Prioritize + danh từ' → động từ mệnh lệnh (imperative)\n- 'With + danh từ' → chỉ đặc điểm, tính chất\n- 'Proximity to' = nearness to (gần với)\n- Dùng thì hiện tại đơn cho quy định chung\n\n📝 **Hai tiêu chí vàng trong công tác:**\n1. Reliable Wi-Fi → làm việc hiệu quả\n2. Proximity to client sites → tiết kiệm thời gian di chuyển\n\n💼 **Bổ sung:** Luxury suites CHỈ dành cho executive-level (cấp cao) - phân biệt cấp bậc.\n\n⚠️ **Tất cả đáp án khác đều TRÁI NGƯỢC:**\n- (A) no Wi-Fi → không thể làm việc\n- (C) high prices → không được khuyến khích\n- (D) distance from sites → lãng phí thời gian"
    },
    { 
      id: 14, 
      question: "Emma always __________.", 
      options: ["(A) submits expense reports on time", "(B) exceeds budget", "(C) avoids travel", "(D) forgets visas"], 
      correct: 0,
      explanation: "✅ Đáp án: **(A) submits expense reports on time**\n\n📍 **Từ khóa cần nghe:** 'Emma, our top traveler, **always submits on time** and maximizes mileage points.'\n\n💡 **Mẹo làm bài:** Trạng từ tần suất 'always' (luôn luôn) → chỉ THÓI QUEN TÍCH CỰC. Đây là khen ngợi, không phải chỉ trích.\n\n🎯 **Phân tích ngữ pháp:**\n- 'Always' + thì hiện tại đơn → diễn tả thói quen lặp đi lặp lại\n- Vị trí: Always đứng TRƯỚC động từ thường\n- 'Submit on time' = nộp đúng hạn (phrasal verb)\n- 'And' nối hai hành động song song: submits + maximizes\n\n🏆 **Emma là tấm gương:**\n- Top traveler (nhân viên đi công tác nhiều nhất)\n- Luôn nộp báo cáo đúng hạn (theo quy định 72 giờ)\n- Tận dụng điểm dặm (mileage points) cho chuyến sau\n\n📝 **Liên hệ quy định:** Câu trước Manager nói 'expense reports are due within 72 hours' - Emma làm gương về điều này.\n\n⚠️ **Các đáp án sai đều mang tính TIÊU CỰC:**\n- (B) exceeds budget → vi phạm quy định\n- (C) avoids travel → mâu thuẫn với 'top traveler'\n- (D) forgets visas → vô trách nhiệm"
    },
    { 
      id: 15, 
      question: "If heading to Tokyo, book through __________.", 
      options: ["(A) any agency", "(B) our preferred agency", "(C) no agency", "(D) HR only"], 
      correct: 1,
      explanation: "✅ Đáp án: **(B) our preferred agency**\n\n📍 **Từ khóa cần nghe:** 'Book through **our preferred agency** for seamless visa support.'\n\n💡 **Mẹo làm bài:** Động từ 'book through' (đặt qua) → sau đó là KÊNH/ĐẠI LÝ cụ thể. Chú ý tính từ sở hữu 'our' - nhấn mạnh đây là đại lý của công ty.\n\n🎯 **Phân tích ngữ pháp:**\n- 'Book through + danh từ' → cấu trúc mệnh lệnh (imperative)\n- 'For + danh từ' → chỉ MỤC ĐÍCH, lợi ích\n- 'Seamless' (adj) = smooth, without problems (suôn sẻ, liền mạch)\n- 'Preferred' (adj) = được ưu tiên, được chọn trước\n\n🌏 **Tại sao Tokyo đặc biệt?**\n- Cần visa support (hỗ trợ visa) → thủ tục phức tạp\n- Preferred agency có kinh nghiệm và quan hệ tốt\n- Đảm bảo quy trình seamless (không vấn đề)\n\n📝 **Quy trình công ty:** Có đại lý đối tác cố định → tiết kiệm thời gian, chi phí, tránh rủi ro.\n\n⚠️ **Tại sao các đáp án khác SAI:**\n- (A) any agency → không đảm bảo chất lượng, mất kiểm soát\n- (C) no agency → không thể tự xin visa phức tạp\n- (D) HR only → HR không làm visa, chỉ phê duyệt chi phí"
    }
  ]
},

part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn) giữa khách và nhân viên khách sạn về đặt phòng công tác. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Client 1: Hello, I'd like to check in for my reservation under John. It's for a three-night business stay.\nHR Rep: Welcome, Mr. John. I see your booking for the executive suite—arriving today and departing Friday. Any issues with the room?\nClient 1: Actually, yes. The conference is across town, so I need a shuttle service. Also, can you confirm late checkout on Friday due to my 2 p.m. flight?\nHR Rep: Understood. Our shuttle runs every hour to the convention center; I'll add you to the schedule. For late checkout, it's available until 1 p.m. for a small fee, as we're at high occupancy this week.\nClient 1: That's fine. Last trip here, the Wi-Fi was spotty—has it been upgraded?\nHR Rep: Yes, we installed fiber optic last month. To assist further, would you like a wake-up call for your early meetings? We aim to make your work trip stress-free.",
  questions: [
    { 
      id: 16, 
      question: "The reservation is for __________.", 
      options: ["(A) a three-night business stay", "(B) a weekend vacation", "(C) one night only", "(D) a family room"], 
      correct: 0,
      explanation: "✅ Đáp án: **(A) a three-night business stay**\n\n📍 **Từ khóa cần nghe:** Client nói: 'It's for **a three-night business stay**.'\n\n💡 **Mẹo làm bài:** Câu hỏi về THÔNG TIN ĐẶT PHÒNG - nghe ngay câu đầu tiên khi khách giới thiệu. Hai yếu tố: thời gian (three-night) + mục đích (business).\n\n🎯 **Phân tích ngữ pháp:**\n- 'For + danh từ/cụm danh từ' → chỉ mục đích\n- 'Three-night' → tính từ ghép (compound adjective) mô tả thời lượng\n- Cấu trúc: số đếm + danh từ thời gian + danh từ (three-night stay)\n\n📝 **Xác nhận thêm:** HR Rep nhắc lại 'arriving today and departing Friday' → 3 đêm (Wed-Thu-Fri hoặc tương tự).\n\n💼 **Phân biệt loại đặt phòng:**\n- Business stay → executive suite, Wi-Fi tốt, shuttle service\n- Vacation → pool, spa, sightseeing\n\n⚠️ **Loại trừ đáp án sai:**\n- (B) weekend vacation → đây là BUSINESS, không phải vacation\n- (C) one night only → sai số đêm (3 chứ không phải 1)\n- (D) a family room → không có thông tin về gia đình"
    },
    { 
      id: 17, 
      question: "The client needs a shuttle because __________.", 
      options: ["(A) the conference is across town", "(B) the flight is delayed", "(C) the room is far", "(D) the fee is high"], 
      correct: 0,
      explanation: "✅ Đáp án: **(A) the conference is across town**\n\n📍 **Từ khóa cần nghe:** Client nói: '**The conference is across town, so** I need a shuttle service.'\n\n💡 **Mẹo làm bài:** Câu hỏi WHY (tại sao) → tìm NGUYÊN NHÂN. Liên từ 'so' (vì vậy) nối nguyên nhân → kết quả. Phần TRƯỚC 'so' là nguyên nhân = đáp án.\n\n🎯 **Phân tích ngữ pháp quan trọng:**\n- Câu gốc: 'The conference is across town, **SO** I need a shuttle.'\n- Cấu trúc: [Nguyên nhân], SO [Kết quả]\n- 'Across town' = ở phía bên kia thành phố (xa)\n- Thì hiện tại đơn 'is' → vị trí cố định\n\n📝 **Giải thích logic:**\n- Hội nghị ở xa (across town)\n- → Vì vậy (so) cần shuttle\n- Câu hỏi: WHY cần shuttle? → VÌ hội nghị ở xa\n\n🔄 **Viết lại với BECAUSE:** 'The client needs a shuttle **BECAUSE** the conference is across town.'\n\n⚠️ **Phân tích đáp án nhiễu:**\n- (B) the flight is delayed → KHÔNG được nhắc đến. Client nói flight lúc 2 p.m. (scheduled), không delay\n- (C) the room is far → SAI. Room không liên quan đến việc cần shuttle đến CONFERENCE\n- (D) the fee is high → VÔ LÝ. Phí cao không phải lý do cần shuttle, mà là rào cản"
    },
    { 
      id: 18, 
      question: "Late checkout is available until __________.", 
      options: ["(A) noon", "(B) 1 p.m.", "(C) 2 p.m.", "(D) 3 p.m."], 
      correct: 1,
      explanation: "✅ Đáp án: **(B) 1 p.m.**\n\n📍 **Từ khóa cần nghe:** HR Rep nói: 'Late checkout is available **until 1 p.m.** for a small fee.'\n\n💡 **Mẹo làm bài:** Câu hỏi về THỜI GIAN CỤ THỂ → nghe giờ (clock time) sau 'until'. Đây là câu hỏi chi tiết, dễ nhầm nếu không tập trung.\n\n🎯 **Phân tích ngữ pháp:**\n- 'Be available until + thời gian' → giới hạn thời gian dịch vụ\n- 'Until' = cho đến (giờ cuối cùng có thể sử dụng)\n- 'For a small fee' → có tính phí nhỏ\n\n📝 **Ngữ cảnh bổ sung:**\n- Client yêu cầu late checkout vì flight lúc 2 p.m.\n- Late checkout đến 1 p.m. → đủ thời gian\n- Lý do có phí: 'high occupancy this week' (khách sạn đầy)\n\n⏰ **Tính toán thời gian:**\n- Flight: 2 p.m.\n- Checkout: 1 p.m.\n- Có 1 giờ để di chuyển đến sân bay → hợp lý\n\n⚠️ **Cẩn thận với số liệu nhiễu:**\n- (A) noon = 12 p.m. → gần đúng nhưng SAI\n- (C) 2 p.m. → đây là giờ bay, KHÔNG phải giờ checkout\n- (D) 3 p.m. → không được nhắc đến\n\n🎧 **Lưu ý khi nghe:** Phát âm 'one p.m.' /wʌn piː em/ - đừng nhầm với 'two p.m.'"
    },
    { 
      id: 19, 
      question: "What was the issue on the client's last trip? __________", 
      options: ["(A) Spotty Wi-Fi", "(B) No shuttle", "(C) Early checkout", "(D) No upgrade"], 
      correct: 0,
      explanation: "✅ Đáp án: **(A) Spotty Wi-Fi**\n\n📍 **Từ khóa cần nghe:** Client nói: 'Last trip here, **the Wi-Fi was spotty**—has it been upgraded?'\n\n💡 **Mẹo làm bài:** Cụm 'Last trip' (chuyến trước) → chuyển sang THÌ QUÁ KHỨ. Đây là câu hỏi về VẤN ĐỀ CŨ (past problem).\n\n🎯 **Phân tích ngữ pháp:**\n- 'Last trip' → thời điểm quá khứ cụ thể\n- 'Was' → thì quá khứ đơn (mô tả tình trạng)\n- 'Spotty' (adj) = unreliable, inconsistent (không ổn định, lúc có lúc không)\n- 'Has it been upgraded?' → present perfect passive (hỏi về thay đổi gần đây)\n\n📱 **Vấn đề nghiêm trọng trong công tác:**\n- Wi-Fi không ổn → không thể làm việc, họp online\n- Client hỏi 'has it been upgraded?' → thể hiện sự quan tâm/lo lắng\n\n✅ **Giải pháp đã thực hiện:** HR Rep trả lời: 'We installed fiber optic last month' → đã nâng cấp.\n\n📝 **Từ vựng quan trọng:**\n- Spotty = patchy, unreliable (UK/US slang)\n- Fiber optic = cáp quang (công nghệ tốt nhất)\n\n⚠️ **Loại trừ đáp án sai:**\n- (B) No shuttle → không được nhắc đến trong 'last trip', chỉ trong THIS trip\n- (C) Early checkout → không có vấn đề này\n- (D) No upgrade → không phải vấn đề, 'upgrade' ở đây là GIẢI PHÁP cho Wi-Fi"
    },
    { 
      id: 20, 
      question: "The HR Rep offers a __________ for early meetings.", 
      options: ["(A) shuttle schedule", "(B) wake-up call", "(C) fee waiver", "(D) room upgrade"], 
      correct: 1,
      explanation: "✅ Đáp án: **(B) wake-up call**\n\n📍 **Từ khóa cần nghe:** HR Rep hỏi: 'Would you like **a wake-up call** for your early meetings?'\n\n💡 **Mẹo làm bài:** Câu hỏi về DỊCH VỤ ĐỀ NGHỊ → nghe động từ 'offer', 'would you like'. Đây là câu cuối cùng, dễ bỏ sót.\n\n🎯 **Phân tích ngữ pháp:**\n- 'Would you like + danh từ?' → câu hỏi lịch sự đề nghị dịch vụ (polite offer)\n- 'For + danh từ' → chỉ mục đích\n- 'Early meetings' → cuộc họp sớm (cần dậy sớm)\n\n⏰ **Wake-up call là gì?**\n- Dịch vụ: Khách sạn gọi điện thoại vào phòng để đánh thức khách\n- Mục đích: Đảm bảo không ngủ quên cuộc họp quan trọng\n- Phổ biến trong business travel\n\n📝 **Liên hệ ngữ cảnh:**\n- Client đi công tác → có early meetings\n- HR Rep muốn 'make your work trip stress-free' → chủ động đề nghị hỗ trợ\n- Thể hiện dịch vụ chu đáo của khách sạn\n\n💼 **Các dịch vụ đã cung cấp trước đó:**\n- Shuttle service → giải quyết\n- Late checkout → giải quyết  \n- Wi-Fi upgrade → đã làm\n- Wake-up call → đang đề nghị\n\n⚠️ **Phân tích đáp án sai:**\n- (A) shuttle schedule → đã xử lý TRƯỚC ĐÓ, không phải offer mới này\n- (C) fee waiver → không được nhắc đến (late checkout VẪN có phí)\n- (D) room upgrade → client ĐÃ có executive suite rồi"
    }
  ]
},
    // Reading Parts - Thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng, chủ đề Du Lịch & Công Việc
   part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question: "The annual sales conference will be held in Barcelona, where the team can network with international __________.",
      options: ["colleague", "colleagues", "colleagued", "colleague's"],
      correct: 1,
      explanation: "Đáp án đúng: (B) 'colleagues'. Trong câu này, chúng ta cần một **danh từ số nhiều** vì 'international colleagues' chỉ nhiều đồng nghiệp quốc tế mà đội ngũ sẽ kết nối. Sau giới từ 'with', ta cần danh từ làm tân ngữ.\n\n**Lưu ý:**\n- (A) 'colleague' là số ít - không phù hợp vì không thể chỉ một người\n- (C) 'colleagued' **không tồn tại** trong tiếng Anh\n- (D) 'colleague's' là **dạng sở hữu cách** - không phù hợp ngữ pháp ở vị trí này"
    },
    {
      id: 22,
      question: "Due to the merger, employees are required to attend mandatory training sessions __________ the new corporate policies.",
      options: ["about", "at", "on", "with"],
      correct: 2,
      explanation: "Đáp án đúng: (C) 'on'. Khi nói về các buổi đào tạo, hội thảo hoặc khóa học VỀ một chủ đề cụ thể, chúng ta dùng giới từ **'on'**: **'training sessions ON something'** (các buổi đào tạo về điều gì đó). Đây là cách dùng cố định trong tiếng Anh.\n\n**So sánh:**\n- 'about' có thể dùng nhưng mang tính chung chung hơn và **không chính thức bằng 'on'** trong ngữ cảnh công việc\n- 'at' chỉ địa điểm\n- 'with' chỉ công cụ hoặc đồng hành"
    },
    {
      id: 23,
      question: "The travel itinerary includes a guided tour of the factory, __________ has been operational since 1995.",
      options: ["that", "which", "who", "where"],
      correct: 1,
      explanation: "Đáp án đúng: (B) 'which'. Đây là **mệnh đề quan hệ không xác định** (non-defining relative clause) bổ sung thông tin cho 'the factory'. Khi có **dấu phẩy (,)** trước đại từ quan hệ và danh từ đứng trước là **VẬT**, ta dùng **'which'**.\n\n**Lưu ý:**\n- 'that' **KHÔNG bao giờ** dùng sau dấu phẩy\n- 'who' chỉ dùng cho người\n- 'where' dùng cho địa điểm nhưng không phù hợp cấu trúc câu này vì sau nó cần một mệnh đề hoàn chỉnh có chủ ngữ riêng"
    },
    {
      id: 24,
      question: "Business travelers often prefer airlines that offer flexible __________ options to accommodate last-minute changes.",
      options: ["schedule", "scheduling", "scheduled", "schedules"],
      correct: 3,
      explanation: "Đáp án đúng: (D) 'schedules'. Trong câu này, ta cần một **DANH TỪ SỐ NHIỀU** để bổ nghĩa cho 'options' (các lựa chọn). **'Flexible schedule options'** = các lựa chọn lịch trình linh hoạt. Vì nói về nhiều lựa chọn nên danh từ phải ở dạng số nhiều.\n\n**So sánh:**\n- (A) 'schedule' là số ít\n- (B) 'scheduling' là danh động từ - không tự nhiên trong ngữ cảnh này\n- (C) 'scheduled' là tính từ - có thể dùng nhưng ý nghĩa khác (scheduled = đã lên lịch sẵn)"
    },
    {
      id: 25,
      question: "By negotiating bulk discounts with hotels, the company __________ significant savings on employee accommodations.",
      options: ["achieve", "achieves", "achieved", "achieving"],
      correct: 1,
      explanation: "Đáp án đúng: (B) 'achieves'. Câu này diễn tả một **sự thật chung chung** hoặc thói quen: 'Bằng cách đàm phán giảm giá hàng loạt với khách sạn, công ty ĐẠT ĐƯỢC khoản tiết kiệm đáng kể'. Đây là **thì hiện tại đơn** vì nói về một hành động lặp đi lặp lại hoặc một chân lý. Chủ ngữ 'the company' là **số ít** nên động từ phải thêm **'s/es'**.\n\n**Lưu ý:** Cụm **'By negotiating...'** là cụm giới từ chỉ **PHƯƠNG THỨC/CÁCH THỨC**, không phải mệnh đề thời gian quá khứ. Nếu dùng 'achieved' (quá khứ), câu sẽ thiếu ngữ cảnh thời gian cụ thể trong quá khứ."
    },
    {
      id: 26,
      question: "The consultant recommended that the team __________ the client's feedback before finalizing the proposal.",
      options: ["incorporate", "incorporates", "incorporated", "incorporating"],
      correct: 0,
      explanation: "Đáp án đúng: (A) 'incorporate'. Đây là cấu trúc **SUBJUNCTIVE (giả định thức)** trong tiếng Anh: **'recommend/suggest/insist/require + that + S + ĐỘNG TỪ NGUYÊN MẪU (không chia)'**. Cấu trúc này dùng để đưa ra lời khuyên, yêu cầu hoặc đề nghị một cách trang trọng. Động từ sau 'that' luôn ở **dạng nguyên mẫu, không chia** theo chủ ngữ hay thì.\n\n**Ví dụ tương tự:** 'The doctor recommended that he **take** medicine' (không phải 'takes')."
    },
    {
      id: 27,
      question: "Remote work policies have __________ the need for frequent business travel in many industries.",
      options: ["reduce", "reduced", "reducing", "reduces"],
      correct: 1,
      explanation: "Đáp án đúng: (B) 'reduced'. Câu này dùng **thì HIỆN TẠI HOÀN THÀNH:** **'have/has + V3/past participle'**. Thì này diễn tả một hành động bắt đầu trong quá khứ và có **ảnh hưởng/kết quả kéo dài đến hiện tại**. 'Các chính sách làm việc từ xa ĐÃ GIẢM (và vẫn đang giảm) nhu cầu đi công tác thường xuyên'. Chủ ngữ 'policies' là **số nhiều** nên dùng **'have'** (không phải 'has').\n\n**Lưu ý:**\n- 'reduce' là động từ nguyên mẫu\n- 'reducing' là V-ing\n- 'reduces' là thì hiện tại đơn\n→ Đều không phù hợp với cấu trúc **'have + V3'**"
    },
    {
      id: 28,
      question: "During the trade fair, exhibitors must __________ their booths by 9 a.m. to ensure smooth operations.",
      options: ["set up", "set", "sets up", "setting"],
      correct: 0,
      explanation: "Đáp án đúng: (A) 'set up'. Đây là **PHRASAL VERB (cụm động từ):** **'set up'** = lắp đặt, thiết lập, sắp xếp. Sau động từ khiếm khuyết 'must', ta luôn dùng **ĐỘNG TỪ NGUYÊN MẪU** (infinitive without 'to'). **'Set up'** là một cụm động từ **không thể tách rời** - phải giữ nguyên cả cụm.\n\n**Lưu ý:**\n- (B) 'set' nghĩa khác (đặt, để)\n- (C) 'sets up' là thì hiện tại đơn - **không dùng sau 'must'**\n- (D) 'setting' là V-ing - không dùng sau động từ khiếm khuyết"
    },
    {
      id: 29,
      question: "The executive's presentation on global markets was so engaging that it __________ the audience's attention throughout.",
      options: ["hold", "holds", "held", "holding"],
      correct: 2,
      explanation: "Đáp án đúng: (C) 'held'. Đây là cấu trúc **'SO... THAT'** (quá... đến nỗi) với **thì QUÁ KHỨ ĐƠN**. Vì động từ 'was' ở mệnh đề chính đã chia quá khứ, động từ trong mệnh đề kết quả 'that...' cũng phải chia quá khứ để đảm bảo **SỰ HÒA HỢP VỀ THÌ** (sequence of tenses). 'Bài thuyết trình quá hấp dẫn đến nỗi nó ĐÃ GIỮ CHÂN sự chú ý của khán giả suốt buổi'.\n\n**Lưu ý:**\n- (A) 'hold' là nguyên mẫu\n- (B) 'holds' là hiện tại đơn\n- (D) 'holding' là V-ing\n→ Đều không phù hợp với ngữ cảnh quá khứ"
    },
    {
      id: 30,
      question: "To comply with visa requirements, applicants should submit their documents __________ least two weeks in advance.",
      options: ["at", "in", "on", "with"],
      correct: 0,
      explanation: "Đáp án đúng: (A) 'at'. Đây là **CỤM CỐ ĐỊNH 'AT LEAST'** = ít nhất, tối thiểu. **'At least'** là một cụm thành ngữ **không thể thay đổi**, dùng để chỉ số lượng/thời gian tối thiểu. Câu có nghĩa: 'Để tuân thủ yêu cầu visa, người nộp đơn nên nộp hồ sơ **ÍT NHẤT** hai tuần trước'.\n\n**Lưu ý:** 'in advance' (trước, sớm) cũng là một cụm cố định khác trong câu. **Không thể dùng** 'in/on/with least' vì không có các cụm này trong tiếng Anh."
    }
  ]
},
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email về sắp xếp công tác. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Sales Team Members
From: Lisa Chen, Sales Director  
Subject: Business Trip to Tokyo - Preparation Guidelines


Dear Sales Team,

I am writing to outline the preparations for our upcoming business trip to Tokyo, scheduled from May 10 to May 14. This trip is crucial for strengthening client relationships and exploring new partnership opportunities in the Asian market. To maximize productivity, please adhere to the following guidelines.

First, all flight bookings must be made through our corporate travel portal by April 25 to (31) the best available rates and seating arrangements. Economy class is standard, but upgrades may be approved for flights longer than six hours.

Upon arrival, we will convene for a team briefing at the hotel conference room at 8:00 a.m. on May 11. The agenda includes client meetings with key accounts, followed by a networking dinner. Each member is expected to prepare a brief presentation on their assigned clients to (32) effective discussions.

For accommodations, we have reserved rooms at the Tokyo Business Hotel, which offers complimentary breakfast and high-speed internet. If you have special dietary needs, notify me by May 5 so we can (33) accordingly.

Expense reimbursements will be processed only for pre-approved items. Keep all receipts and submit your report within 48 hours of return. This ensures prompt (34) and compliance with company policy.

We look forward to a successful trip that will drive our quarterly goals. If you have any questions, feel free to schedule a one-on-one with me before departure.

Best regards,

Lisa Chen
Sales Director
Global Trade Inc.`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "All flight bookings must be made... by April 25 to (31) the best available rates...",
          options: ["secure", "delay", "cancel", "ignore"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'secure' vì nghĩa 'đảm bảo', phù hợp 'to secure the best rates' (để đảm bảo giá tốt nhất). Kiến thức ngữ pháp: Động từ 'secure' + tân ngữ (rates) trong cấu trúc mục đích 'to + V'; 'delay' (trì hoãn), 'cancel' (hủy), 'ignore' (bỏ qua) không liên quan đến đặt chỗ."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "...prepare a brief presentation... to (32) effective discussions.",
          options: ["hinder", "facilitate", "postpone", "avoid"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'facilitate' vì nghĩa 'thúc đẩy', phù hợp 'to facilitate effective discussions' (để thúc đẩy thảo luận hiệu quả). Kiến thức từ vựng: Động từ 'facilitate' chỉ hỗ trợ quá trình; 'hinder' (cản trở), 'postpone' (hoãn), 'avoid' (tránh) mang nghĩa tiêu cực."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "If you have special dietary needs, notify me... so we can (33) accordingly.",
          options: ["adjust", "reject", "duplicate", "complicate"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'adjust' vì nghĩa 'điều chỉnh', phù hợp 'adjust accordingly' (điều chỉnh phù hợp). Kiến thức ngữ pháp: Động từ 'adjust' + trạng từ 'accordingly' trong 'so + clause' chỉ kết quả; 'reject' (từ chối), 'duplicate' (nhân đôi), 'complicate' (phức tạp hóa) không phù hợp."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "This ensures prompt (34) and compliance with company policy.",
          options: ["payment", "reimbursement", "booking", "meeting"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'reimbursement' vì nghĩa 'hoàn tiền', phù hợp ngữ cảnh chi phí. Kiến thức từ vựng: Danh từ 'reimbursement' sau 'prompt' (nhanh chóng); 'payment' (thanh toán), 'booking' (đặt chỗ), 'meeting' (cuộc họp) không khớp với 'expense reports'."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp (thêm cho cân bằng)",
          context: "The trip is crucial for strengthening client relationships and exploring new __________ opportunities.",
          options: ["personal", "partnership", "leisure", "local"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'partnership' vì nghĩa 'hợp tác', phù hợp 'new partnership opportunities' (cơ hội hợp tác mới). Kiến thức từ vựng: Danh từ 'partnership' chỉ quan hệ kinh doanh; 'personal' (cá nhân), 'leisure' (giải trí), 'local' (địa phương) không liên quan đến mục tiêu công tác."
        },
        {
          id: 36,
          type: "comprehension",
          question: "(36) - The business trip to Tokyo is scheduled from ___.",
          options: ["April 10 to 14", "May 10 to May 14", "June 10 to 14", "May 1 to 5"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nêu 'from May 10 to May 14' (từ 10 đến 14 tháng 5). Kiến thức đọc hiểu: Xác định ngày tháng từ phần mở đầu để nắm lịch trình chính."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - What is the deadline for flight bookings?",
          options: ["April 15", "April 25", "May 5", "May 10"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'by April 25' (trước 25 tháng 4). Kiến thức đọc hiểu: Trích dẫn hạn chót từ hướng dẫn đặt vé để đảm bảo chuẩn bị kịp thời."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What time does the team briefing start?",
          options: ["7:00 a.m.", "8:00 a.m.", "9:00 a.m.", "Noon"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'at 8:00 a.m. on May 11' (8 giờ sáng ngày 11/5). Kiến thức đọc hiểu: Xác định thời gian sự kiện từ agenda để lập kế hoạch."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - What must team members prepare?",
          options: ["A full report", "A brief presentation on clients", "Dietary lists only", "Expense receipts"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'prepare a brief presentation on their assigned clients' (chuẩn bị bài thuyết trình ngắn về khách hàng). Kiến thức đọc hiểu: Tập trung vào trách nhiệm cá nhân từ phần agenda."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - Within how many hours after return must expense reports be submitted?",
          options: ["24 hours", "48 hours", "72 hours", "One week"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'within 48 hours of return' (trong 48 giờ sau khi về). Kiến thức đọc hiểu: Kiểm tra quy định hoàn tiền để tuân thủ chính sách."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo đại lý du lịch và email yêu cầu, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**Global Exec Travel Advertisement**

  Seamless Business Travel Solutions for Professionals

  At Global Exec Travel, we specialize in crafting customized itineraries for corporate clients worldwide. Whether you're attending a conference in Europe or closing deals in Asia, our expert agents ensure hassle-free journeys.

  **Key Services:**
  1. **Visa & Documentation Assistance** – Fast-track processing for business visas in over 50 countries. Submit your details online, and we'll handle the rest.

  2. **Priority Flight Bookings** – Access to premium economy seats and lounge access for long-haul flights.

  3. **Hotel & Ground Transport** – Partnerships with luxury chains for discounted rates and chauffeured transfers.

  4. **24/7 Concierge Support** – Emergency assistance and real-time itinerary adjustments.

  Contact us at info@globalexectravel.com or call 1-800-EXEC-TRIP for a free consultation. Response within 2 business hours!

  ---

  **Email Message**

  **To:** info@globalexectravel.com
  **From:** tom.wilson@techinnovate.com
  **Date:** April 18
  **Subject:** Inquiry for Tokyo Business Trip

  Dear Global Exec Travel Team,

  I came across your ad in Business Weekly and am interested in your services for an upcoming work trip to Tokyo from May 10-14. As a project manager at TechInnovate, I'll be meeting with suppliers and attending the Asia Tech Expo. Could you assist with a full package: business visa (I'm a U.S. citizen), flights from New York with layover preferences, and a central hotel near the expo venue? Budget is flexible but prefer value-for-money options. Also, include airport transfers.

  Please provide options and quotes by April 22. Available for a call Tuesday afternoon.

  Regards,
  Tom Wilson
  Project Manager, TechInnovate
  212-555-0198 (office)
  45 Innovation Blvd, New York, NY 10001`,
      questions: [
        {
          id: 41,
          question: "According to the advertisement, what is the response time for inquiries?",
          options: ["Within 1 hour", "Within 2 business hours", "Within 24 hours", "Within 1 week"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Response within 2 business hours' (Phản hồi trong 2 giờ làm việc). Kiến thức đọc hiểu: Trích dẫn thời gian từ phần liên hệ để đánh giá tốc độ dịch vụ."
        },
        {
          id: 42,
          question: "How did Mr. Wilson learn about Global Exec Travel?",
          options: ["From a colleague", "From an online search", "From a newspaper ad", "From Business Weekly magazine"],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì 'I came across your ad in Business Weekly' (Tôi thấy quảng cáo của bạn trên Business Weekly). Kiến thức suy luận: Kết nối nguồn quảng cáo từ email để xác định kênh tiếp thị."
        },
        {
          id: 43,
          question: "What is Mr. Wilson's profession?",
          options: ["Sales director", "Travel agent", "Project manager", "Hotel manager"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'As a project manager at TechInnovate' (Là quản lý dự án tại TechInnovate). Kiến thức đọc hiểu: Xác định vai trò từ phần giới thiệu trong email."
        },
        {
          id: 44,
          question: "Which service does Mr. Wilson NOT mention in his request?",
          options: ["Visa assistance", "Flight bookings", "Hotel reservations", "Emergency concierge support"],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì email yêu cầu visa, flights, hotel, transfers nhưng không đề cập emergency support. Kiến thức đọc hiểu: So sánh yêu cầu với danh sách dịch vụ quảng cáo."
        },
        {
          id: 45,
          question: "What nationality is Mr. Wilson?",
          options: ["Canadian", "U.S.", "Japanese", "British"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'business visa (I'm a U.S. citizen)' (visa kinh doanh, tôi là công dân Mỹ). Kiến thức đọc hiểu: Chi tiết quốc tịch từ yêu cầu visa để hiểu nhu cầu hỗ trợ."
        },
        {
          id: 46,
          question: "When does Mr. Wilson want options and quotes by?",
          options: ["April 20", "April 22", "April 25", "May 5"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'by April 22' (trước 22/4). Kiến thức đọc hiểu: Hạn chót từ email để đánh giá tính cấp bách."
        },
        {
          id: 47,
          question: "What event is Mr. Wilson attending in Tokyo?",
          options: ["A sales conference", "Asia Tech Expo", "A training seminar", "A networking dinner"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'attending the Asia Tech Expo' (tham dự Asia Tech Expo). Kiến thức đọc hiểu: Sự kiện chính từ phần mô tả chuyến đi."
        },
        {
          id: 48,
          question: "What type of hotel location does Mr. Wilson prefer?",
          options: ["Near the airport", "In a quiet suburb", "Central near the expo venue", "Luxury downtown only"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì 'a central hotel near the expo venue' (khách sạn trung tâm gần địa điểm expo). Kiến thức đọc hiểu: Ưu tiên vị trí từ yêu cầu package."
        },
        {
          id: 49,
          question: "When is Mr. Wilson available for a call?",
          options: ["Monday morning", "Tuesday afternoon", "Wednesday evening", "Anytime"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Available for a call Tuesday afternoon' (Có sẵn cho cuộc gọi chiều thứ Ba). Kiến thức đọc hiểu: Khung giờ từ email để sắp xếp tư vấn."
        },
        {
          id: 50,
          question: "From where is Mr. Wilson flying?",
          options: ["Los Angeles", "New York", "London", "Paris"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'flights from New York' (chuyến bay từ New York). Kiến thức đọc hiểu: Điểm xuất phát từ địa chỉ và yêu cầu flights."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn về chậm trễ công tác, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Dr. Smith (14:22): Stuck in traffic en route to the airport—might miss the 15:00 flight to Frankfurt. Updating you now.
  Interviewer 1 (14:25): Understood, Dr. Smith. I'll notify the client about potential delay in your arrival for tomorrow's workshop.
  Dr. Smith (14:28): Thanks. The merger meeting is critical; aim to reschedule if needed. Flight is non-refundable, though.
  Interviewer 2 (14:35): No worries—I've checked alternatives: next flight at 17:30, arrives midnight. Hotel confirmed for late check-in.
  Dr. Smith (16:45): Made it to gate just in time! Boarding now. See you at the venue tomorrow AM.`,
      questions: [
        {
          id: 51,
          question: "What is causing Dr. Smith's delay?",
          options: ["Flight cancellation", "Traffic", "Meeting overrun", "Visa issues"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Stuck in traffic en route to the airport' (Kẹt xe trên đường đến sân bay). Kiến thức đọc hiểu: Lý do trực tiếp từ tin nhắn đầu tiên."
        },
        {
          id: 52,
          question: "What does Interviewer 1 plan to do?",
          options: ["Reschedule the flight", "Notify the client", "Book a hotel", "Cancel the workshop"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll notify the client about potential delay' (Tôi sẽ thông báo khách hàng về chậm trễ tiềm năng). Kiến thức suy luận: Hành động hỗ trợ từ phản hồi ngay lập tức."
        },
        {
          id: 53,
          question: "Why is the merger meeting important?",
          options: ["It's optional", "It's critical", "It's canceled", "It's rescheduled already"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'The merger meeting is critical' (Cuộc họp sáp nhập rất quan trọng). Kiến thức đọc hiểu: Mức độ ưu tiên từ ngữ cảnh công việc."
        },
        {
          id: 54,
          question: "What is the departure time of the original flight?",
          options: ["14:00", "15:00", "17:30", "Midnight"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'might miss the 15:00 flight' (có thể lỡ chuyến 15:00). Kiến thức đọc hiểu: Thời gian ban đầu từ lo ngại chậm trễ."
        },
        {
          id: 55,
          question: "What alternative flight does Interviewer 2 suggest?",
          options: ["At 15:00", "At 17:30", "Next morning", "No alternative"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'next flight at 17:30' (chuyến tiếp theo lúc 17:30). Kiến thức đọc hiểu: Lựa chọn thay thế từ kiểm tra lịch bay."
        },
        {
          id: 56,
          question: "What has been confirmed for late arrival?",
          options: ["Flight upgrade", "Hotel check-in", "Client meeting", "Car rental"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Hotel confirmed for late check-in' (Khách sạn xác nhận check-in muộn). Kiến thức đọc hiểu: Hỗ trợ logistics từ phản hồi."
        },
        {
          id: 57,
          question: "What is the arrival time of the alternative flight?",
          options: ["Evening", "Midnight", "Morning", "Afternoon"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'arrives midnight' (đến nửa đêm). Kiến thức đọc hiểu: Thời gian đến từ gợi ý chuyến bay thay thế."
        },
        {
          id: 58,
          question: "What does Dr. Smith update in the last message?",
          options: ["Missed the flight", "Boarding now", "Rescheduled meeting", "Canceled trip"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Made it to gate just in time! Boarding now' (Đến cổng kịp giờ! Đang lên máy bay). Kiến thức suy luận: Kết quả tích cực từ cập nhật cuối."
        },
        {
          id: 59,
          question: "What can be inferred about the workshop?",
          options: ["It's canceled", "It's tomorrow AM at the venue", "It's in New York", "It's optional"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'See you at the venue tomorrow AM' (Gặp tại địa điểm sáng mai). Kiến thức suy luận: Thời gian và địa điểm từ kế hoạch tiếp theo."
        },
        {
          id: 60,
          question: "What is noted about the original flight?",
          options: ["Refundable", "Non-refundable", "Upgradable", "Delayed already"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Flight is non-refundable' (Chuyến bay không hoàn tiền). Kiến thức đọc hiểu: Đặc điểm vé từ lo ngại thay đổi."
        }
      ]
    }
  }
};