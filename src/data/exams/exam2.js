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
          options: [
            "She has led many client meetings abroad.",
            "It's her first time leading a client meeting abroad.",
            "She has never led a meeting.",
            "She led a meeting in Hong Kong."
          ],
          correct: 1,
          explanation: "Sarah nói: 'It's my first time leading a client meeting abroad.' (Đây là lần đầu tôi dẫn dắt cuộc họp khách hàng ở nước ngoài.) Kiến thức ngữ pháp: Cấu trúc 'It is my first time + V-ing' diễn tả kinh nghiệm lần đầu (present perfect implied), nhấn mạnh sự mới mẻ trong ngữ cảnh công việc."
        },
        {
          id: 2,
          options: [
            "The layover is five hours long.",
            "The layover is two hours long.",
            "There is no layover.",
            "The layover is in Singapore."
          ],
          correct: 1,
          explanation: "Mark nói: 'The layover is only two hours—plenty of time for a quick coffee.' (Dừng chân chỉ hai giờ—đủ thời gian cho một tách cà phê nhanh.) Kiến thức ngữ pháp: Cấu trúc 'is only + số + danh từ' để nhấn mạnh thời lượng ngắn, sử dụng thì hiện tại đơn để mô tả lịch trình cố định."
        },
        {
          id: 3,
          options: [
            "The hotel is budget-friendly.",
            "The hotel has poor reviews.",
            "The hotel is near the conference center.",
            "There is no hotel booking."
          ],
          correct: 2,
          explanation: "Sarah nói: 'I confirmed the hotel near the conference center.' (Tôi đã xác nhận khách sạn gần trung tâm hội nghị.) Kiến thức ngữ pháp: Động từ 'confirm' ở thì quá khứ đơn để diễn tả hành động hoàn tất gần đây, kết hợp với giới từ 'near' chỉ vị trí địa lý trong ngữ cảnh du lịch công tác."
        },
        {
          id: 4,
          options: [
            "She packed heavy luggage.",
            "She packed light with carry-on.",
            "She forgot to pack.",
            "She overpacked last time."
          ],
          correct: 1,
          explanation: "Sarah nói: 'I packed light: just carry-on to save time at check-in.' (Tôi đóng gói nhẹ: chỉ hành lý xách tay để tiết kiệm thời gian check-in.) Kiến thức ngữ pháp: Cấu trúc 'to + V nguyên thể' chỉ mục đích (to save time), với 'just' nhấn mạnh sự đơn giản; thì quá khứ đơn 'packed' cho hành động chuẩn bị."
        },
        {
          id: 5,
          options: [
            "Focus on the opening remarks.",
            "Focus on the Q&A session.",
            "Avoid the agenda review.",
            "Skip the client meeting."
          ],
          correct: 1,
          explanation: "Mark nói: 'Let's review the agenda—focus on the Q&A session, as that's where deals close.' (Hãy xem lại chương trình—tập trung vào phần Q&A, vì đó là nơi chốt hợp đồng.) Kiến thức ngữ pháp: Cấu trúc 'as + clause' chỉ lý do (because), với thì hiện tại đơn 'that's where deals close' mô tả sự thật chung trong kinh doanh."
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
          explanation: "Travel Agent nói: 'Your connecting flight to Paris departs in 45 minutes.' (Chuyến bay nối chuyến đến Paris khởi hành trong 45 phút.) Kiến thức ngữ pháp: Cấu trúc 'departs in + khoảng thời gian' sử dụng thì hiện tại đơn để chỉ lịch trình tương lai cố định, nhấn mạnh sự cấp bách trong du lịch công tác."
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
          explanation: "Ben nói: 'Did you email the Paris office about our delayed arrival due to the storm?' (Bạn đã email văn phòng Paris về việc đến muộn do bão chưa?) Kiến thức ngữ pháp: Cụm từ 'due to + danh từ' chỉ nguyên nhân (because of), với thì quá khứ đơn 'delayed' mô tả sự việc đã xảy ra ảnh hưởng đến lịch trình."
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
          explanation: "Anna nói: 'They understand and rescheduled the factory tour for the afternoon.' (Họ hiểu và dời lịch tham quan nhà máy sang chiều.) Kiến thức ngữ pháp: Động từ 'reschedule' ở thì quá khứ đơn để diễn tả hành động điều chỉnh hoàn tất, với 'for the afternoon' chỉ thời gian cụ thể trong ngữ cảnh công việc."
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
          explanation: "Anna nói: 'Mike, our colleague, will join us there—he's flying in from London separately.' (Mike, đồng nghiệp chúng ta, sẽ tham gia—anh ấy bay từ London riêng.) Kiến thức ngữ pháp: Cấu trúc 'be + V-ing' (flying in) chỉ hành động đang diễn ra hoặc dự định, với 'from + nơi' chỉ nguồn gốc di chuyển trong du lịch nhóm."
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
          explanation: "Anna nói: 'I booked first-class seats for comfort during the three-hour ride.' (Tôi đặt ghế hạng nhất để thoải mái trong chuyến đi ba giờ.) Kiến thức ngữ pháp: Động từ 'book' ở thì quá khứ đơn cho hành động đặt chỗ hoàn tất, với 'for + danh từ' chỉ mục đích (for comfort), nhấn mạnh lợi ích trong công tác dài."
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
          explanation: "Manager: 'All business trips must be approved in advance to control expenses.' (Tất cả chuyến công tác phải được phê duyệt trước để kiểm soát chi phí.) - Kiến thức ngữ pháp: Cấu trúc 'must be + V3' (passive voice) chỉ nghĩa vụ bắt buộc, với 'in advance' (trước) nhấn mạnh quy trình hành chính trong chính sách công ty."
        },
        { 
          id: 12, 
          question: "We saved 15% on flights by __________.", 
          options: ["(A) choosing luxury options", "(B) opting for economy class", "(C) flying first class", "(D) avoiding travel"], 
          correct: 1,
          explanation: "Manager: 'We saved 15% on flights by opting for economy class unless the journey exceeds eight hours.' (Chúng tôi tiết kiệm 15% vé máy bay bằng cách chọn hạng phổ thông trừ khi hành trình vượt tám giờ.) - Kiến thức ngữ pháp: Cụm 'by + V-ing' chỉ phương tiện (by opting), với 'unless + clause' diễn tả ngoại lệ điều kiện trong quy định tiết kiệm."
        },
        { 
          id: 13, 
          question: "For accommodations, prioritize hotels with __________.", 
          options: ["(A) no Wi-Fi", "(B) reliable Wi-Fi and proximity", "(C) high prices", "(D) distance from sites"], 
          correct: 1,
          explanation: "Manager: 'Prioritize hotels with reliable Wi-Fi and proximity to client sites.' (Ưu tiên khách sạn có Wi-Fi đáng tin cậy và gần địa điểm khách hàng.) - Kiến thức ngữ pháp: Động từ 'prioritize' + 'with + danh từ' chỉ tiêu chí lựa chọn, sử dụng thì hiện tại đơn mệnh lệnh để hướng dẫn hành vi chung."
        },
        { 
          id: 14, 
          question: "Emma always __________.", 
          options: ["(A) submits expense reports on time", "(B) exceeds budget", "(C) avoids travel", "(D) forgets visas"], 
          correct: 0,
          explanation: "Manager: 'Emma, our top traveler, always submits on time and maximizes mileage points.' (Emma, du lịch viên hàng đầu, luôn nộp đúng hạn và tối ưu hóa điểm dặm.) - Kiến thức ngữ pháp: Trạng từ 'always' + thì hiện tại đơn chỉ thói quen, với 'and' nối hai hành động song song trong mô tả hành vi mẫu mực."
        },
        { 
          id: 15, 
          question: "If heading to Tokyo, book through __________.", 
          options: ["(A) any agency", "(B) our preferred agency", "(C) no agency", "(D) HR only"], 
          correct: 1,
          explanation: "Manager: 'Book through our preferred agency for seamless visa support.' (Đặt qua đại lý ưu tiên của chúng tôi để hỗ trợ visa suôn sẻ.) - Kiến thức ngữ pháp: Cấu trúc mệnh lệnh 'book through + danh từ' với 'for + danh từ' chỉ lợi ích, nhấn mạnh sự liền mạch (seamless) trong quy trình du lịch quốc tế."
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
          explanation: "Client 1: 'It's for a three-night business stay.' (Đó là lưu trú ba đêm cho công việc.) - Kiến thức ngữ pháp: Cấu trúc 'for + danh từ' chỉ mục đích (business stay), với 'three-night' là tính từ ghép mô tả thời lượng trong đặt phòng du lịch."
        },
        { 
          id: 17, 
          question: "The client needs a shuttle because __________.", 
          options: ["(A) the conference is across town", "(B) the flight is delayed", "(C) the room is far", "(D) the fee is high"], 
          correct: 0,
          explanation: "Client 1: 'The conference is across town, so I need a shuttle service.' (Hội nghị ở phía bên kia thành phố, nên tôi cần dịch vụ đưa đón.) - Kiến thức ngữ pháp: Liên từ 'so' + clause chỉ kết quả logic (because), với thì hiện tại đơn 'is' mô tả vị trí cố định ảnh hưởng đến nhu cầu di chuyển."
        },
        { 
          id: 18, 
          question: "Late checkout is available until __________.", 
          options: ["(A) noon", "(B) 1 p.m.", "(C) 2 p.m.", "(D) 3 p.m."], 
          correct: 1,
          explanation: "HR Rep: 'Late checkout is available until 1 p.m. for a small fee.' (Check-out muộn có sẵn đến 1 giờ chiều với phí nhỏ.) - Kiến thức ngữ pháp: Cấu trúc 'be available until + thời gian' chỉ giới hạn thời gian, sử dụng thì hiện tại đơn cho dịch vụ tiêu chuẩn của khách sạn."
        },
        { 
          id: 19, 
          question: "What was the issue on the client's last trip? __________", 
          options: ["(A) Spotty Wi-Fi", "(B) No shuttle", "(C) Early checkout", "(D) No upgrade"], 
          correct: 0,
          explanation: "Client 1: 'Last trip here, the Wi-Fi was spotty—has it been upgraded?' (Chuyến trước, Wi-Fi không ổn định—đã nâng cấp chưa?) - Kiến thức ngữ pháp: Thì quá khứ đơn 'was' cho trải nghiệm trước, với 'has it been + V3' (present perfect passive) hỏi về thay đổi gần đây trong công nghệ hỗ trợ công việc."
        },
        { 
          id: 20, 
          question: "The HR Rep offers a __________ for early meetings.", 
          options: ["(A) shuttle schedule", "(B) wake-up call", "(C) fee waiver", "(D) room upgrade"], 
          correct: 1,
          explanation: "HR Rep: 'Would you like a wake-up call for your early meetings?' (Bạn có muốn gọi đánh thức cho các cuộc họp sớm không?) - Kiến thức ngữ pháp: Cấu trúc câu hỏi lịch sự 'would you like + danh từ' để đề nghị dịch vụ, với 'for + danh từ' chỉ mục đích hỗ trợ lịch trình công tác."
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
          explanation: "Đáp án đúng là (B) 'colleagues' vì đây là danh từ số nhiều chỉ 'đồng nghiệp quốc tế', phù hợp với 'network with' (kết nối với). Kiến thức ngữ pháp: Danh từ số nhiều 'colleagues' sau giới từ 'with' trong mệnh đề quan hệ; dạng sở hữu (D) hoặc quá khứ (C) không phù hợp ngữ cảnh sự kiện nhóm."
        },
        {
          id: 22,
          question: "Due to the merger, employees are required to attend mandatory training sessions __________ the new corporate policies.",
          options: ["about", "at", "on", "with"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'on' vì cụm 'on + danh từ' (on the new corporate policies) chỉ chủ đề đào tạo. Kiến thức ngữ pháp: Giới từ 'on' dùng cho chủ đề trừu tượng (policies); 'about' (về), 'at' (tại), 'with' (với) không chuẩn trong cấu trúc yêu cầu bắt buộc."
        },
        {
          id: 23,
          question: "The travel itinerary includes a guided tour of the factory, __________ has been operational since 1995.",
          options: ["that", "which", "who", "where"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'which' vì đây là đại từ quan hệ chỉ vật (factory), không hạn định. Kiến thức ngữ pháp: 'Which' + clause không hạn định (có dấu phẩy) để bổ sung thông tin; 'that' (hạn định), 'who' (người), 'where' (nơi) không phù hợp với danh từ vật."
        },
        {
          id: 24,
          question: "Business travelers often prefer airlines that offer flexible __________ options to accommodate last-minute changes.",
          options: ["schedule", "scheduling", "scheduled", "schedules"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'schedules' vì danh từ số nhiều chỉ 'lịch trình linh hoạt'. Kiến thức ngữ pháp: Danh từ 'schedules' sau 'flexible' (tính từ); dạng V-ing (B) hoặc quá khứ (C) không làm tân ngữ của 'offer'."
        },
        {
          id: 25,
          question: "By negotiating bulk discounts with hotels, the company __________ significant savings on employee accommodations.",
          options: ["achieve", "achieves", "achieved", "achieving"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'achieved' vì thì quá khứ đơn chỉ hành động hoàn tất trong quá khứ. Kiến thức ngữ pháp: Chủ ngữ số ít 'the company' yêu cầu thì quá khứ đơn thụ động implied; 'by + V-ing' chỉ phương tiện dẫn đến kết quả tiết kiệm."
        },
        {
          id: 26,
          question: "The consultant recommended that the team __________ the client's feedback before finalizing the proposal.",
          options: ["incorporate", "incorporates", "incorporated", "incorporating"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'incorporate' vì động từ nguyên thể sau 'recommend that + S + V (bare infinitive)' trong subjunctive mood. Kiến thức ngữ pháp: Cấu trúc gợi ý 'recommend that + nguyên thể' để diễn tả lời khuyên trang trọng; không chia thì ở dạng khác."
        },
        {
          id: 27,
          question: "Remote work policies have __________ the need for frequent business travel in many industries.",
          options: ["reduce", "reduced", "reducing", "reduces"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'reduced' vì quá khứ phân từ trong thì hiện tại hoàn thành (have + V3). Kiến thức ngữ pháp: Cấu trúc hiện tại hoàn thành 'have + V3' chỉ thay đổi kéo dài đến hiện tại; chủ ngữ số nhiều 'policies' phù hợp với dạng trung lập."
        },
        {
          id: 28,
          question: "During the trade fair, exhibitors must __________ their booths by 9 a.m. to ensure smooth operations.",
          options: ["set up", "set", "sets up", "setting"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'set up' vì cụm động từ 'set up' (lắp đặt) phù hợp ngữ cảnh sự kiện. Kiến thức ngữ pháp: Phrasal verb 'set up' ở thì hiện tại đơn mệnh lệnh; 'during + danh từ' chỉ thời gian, với 'must + V nguyên thể' chỉ nghĩa vụ."
        },
        {
          id: 29,
          question: "The executive's presentation on global markets was so engaging that it __________ the audience's attention throughout.",
          options: ["hold", "holds", "held", "holding"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'held' vì thì quá khứ đơn chỉ hành động trong quá khứ. Kiến thức ngữ pháp: Cấu trúc 'so + adj + that + clause' với thì quá khứ đơn 'held' song song với 'was'; 'that' giới thiệu mệnh đề kết quả."
        },
        {
          id: 30,
          question: "To comply with visa requirements, applicants should submit their documents __________ least two weeks in advance.",
          options: ["at", "in", "on", "with"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'at' vì cụm 'at least + thời gian' chỉ mức tối thiểu. Kiến thức ngữ pháp: Giới từ 'at' dùng cho khoảng thời gian tối thiểu (at least two weeks); 'in advance' chỉ trước, phù hợp quy trình hành chính du lịch."
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