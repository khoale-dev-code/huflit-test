export const EXAM8_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 8 (Chủ Đề Du Lịch)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết về lập kế hoạch chuyến du lịch.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Emma và Ben về chuyến du lịch đến châu Âu. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại thực tế HUFLIT).",
  type: "listening",
  script: "Emma: Ben, excited for our Europe trip next month? I've been planning the itinerary for weeks.\nBen: Totally, Emma. We'll fly into Paris first—three days there, then train to Rome for the Colosseum. Budget-wise, we're at $2,500 each, including flights and hotels.\nEmma: Perfect. In Rome, let's book that food tour; I read it's authentic street eats. And for Amsterdam, the canal cruise sounds romantic.\nBen: Agreed. One hiccup: the Eurostar from London to Paris might be fully booked—should we opt for a flight instead?\nEmma: Maybe. Flexibility is key in travel; we'll adjust if needed. Can't wait for the Eiffel Tower at night!",
  questions: [
    {
      id: 1,
      question: "Where does the trip start?",
      options: [
        "(A) Rome.",
        "(B) Amsterdam.",
        "(C) Paris.",
        "(D) London."
      ],
      correct: 2,
      explanation: "Ben: 'We'll fly into Paris first.' (Ben: 'Chúng tôi sẽ bay đến Paris trước.') - Luyện nghe điểm khởi đầu hành trình du lịch."
    },
    {
      id: 2,
      question: "How long will they stay in Paris?",
      options: [
        "(A) Two days.",
        "(B) Three days.",
        "(C) Four days.",
        "(D) One week."
      ],
      correct: 1,
      explanation: "Ben: 'Three days there.' (Ben: 'Ba ngày ở đó.') - Luyện nghe thời gian lưu trú địa điểm."
    },
    {
      id: 3,
      question: "What is the estimated budget per person?",
      options: [
        "(A) $1,500.",
        "(B) $2,000.",
        "(C) $2,500.",
        "(D) $3,000."
      ],
      correct: 2,
      explanation: "Ben: 'Budget-wise, we're at $2,500 each.' (Ben: 'Về ngân sách, chúng tôi ở mức $2,500 mỗi người.') - Luyện nghe lập kế hoạch tài chính du lịch."
    },
    {
      id: 4,
      question: "What activity is planned in Rome?",
      options: [
        "(A) Canal cruise.",
        "(B) Eiffel Tower visit.",
        "(C) Food tour.",
        "(D) Train ride."
      ],
      correct: 2,
      explanation: "Emma: 'In Rome, let's book that food tour.' (Emma: 'Ở Rome, hãy đặt tour ẩm thực đó.') - Luyện nghe hoạt động trải nghiệm địa phương."
    },
    {
      id: 5,
      question: "What potential issue is mentioned for transportation?",
      options: [
        "(A) Hotel fully booked.",
        "(B) Eurostar might be fully booked.",
        "(C) Food tour unavailable.",
        "(D) Flights too expensive."
      ],
      correct: 1,
      explanation: "Ben: 'The Eurostar from London to Paris might be fully booked.' (Ben: 'Eurostar từ London đến Paris có thể hết chỗ.') - Luyện nghe thách thức logistics du lịch."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người: Sarah, Mike và Travel Agent. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At a travel agency.\nSarah: Travel Agent, Mike and I want a budget adventure in Southeast Asia—two weeks, eco-friendly options.\nTravel Agent: Wonderful. Start in Bangkok for temples, then fly to Bali for beaches. Total around $1,800 per person, including eco-lodges.\nMike: Sounds good. Any sustainable tours? Like wildlife conservation in Borneo.\nSarah: Yes, and visa requirements—easy for US citizens?\nTravel Agent: Visas on arrival in most spots. I recommend travel insurance for $100—covers delays and health.",
  questions: [
    {
      id: 6,
      question: "What type of trip are Sarah and Mike planning?",
      options: ["(A) Luxury cruise.", "(B) Budget adventure in Southeast Asia.", "(C) City sightseeing in Europe.", "(D) Ski resort getaway."],
      correct: 1,
      explanation: "Sarah: 'Budget adventure in Southeast Asia.' (Sarah: 'Chuyến phiêu lưu tiết kiệm ở Đông Nam Á.') - Luyện nghe loại hình du lịch."
    },
    {
      id: 7,
      question: "Where does the itinerary start?",
      options: ["(A) Bali.", "(B) Borneo.", "(C) Bangkok.", "(D) Rome."],
      correct: 2,
      explanation: "Travel Agent: 'Start in Bangkok for temples.' (Đại lý du lịch: 'Bắt đầu ở Bangkok cho các ngôi đền.') - Luyện nghe lộ trình du lịch."
    },
    {
      id: 8,
      question: "What is the total estimated cost per person?",
      options: ["(A) $1,000.", "(B) $1,500.", "(C) $1,800.", "(D) $2,200."],
      correct: 2,
      explanation: "Travel Agent: 'Total around $1,800 per person.' (Đại lý du lịch: 'Tổng khoảng $1,800 mỗi người.') - Luyện nghe ngân sách chuyến đi."
    },
    {
      id: 9,
      question: "What sustainable option does Mike suggest?",
      options: ["(A) Luxury hotels.", "(B) Wildlife conservation in Borneo.", "(C) Shopping tours.", "(D) Nightlife in Bangkok."],
      correct: 1,
      explanation: "Mike: 'Sustainable tours? Like wildlife conservation in Borneo.' (Mike: 'Tour bền vững? Như bảo tồn động vật hoang dã ở Borneo.') - Luyện nghe lựa chọn thân thiện môi trường."
    },
    {
      id: 10,
      question: "What does the Travel Agent recommend for safety?",
      options: ["(A) Extra luggage.", "(B) Travel insurance for $100.", "(C) First-class seats.", "(D) Private guides only."],
      correct: 1,
      explanation: "Travel Agent: 'Recommend travel insurance for $100—covers delays and health.' (Đại lý du lịch: 'Khuyến nghị bảo hiểm du lịch $100—bao gồm chậm trễ và sức khỏe.') - Luyện nghe lời khuyên an toàn du lịch."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của Travel Agent về mẹo du lịch bền vững. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Travel Agent: Hello, travelers. Today, tips for sustainable tourism. Choose eco-certified hotels to support conservation—reduces carbon footprint by 20%. Use public transport over taxis; in cities like Tokyo, it's efficient and cuts emissions. Pack light to save fuel on flights. Support local artisans—buy souvenirs that empower communities. Finally, leave no trace: pack out what you pack in. Responsible travel preserves destinations for future generations.",
  questions: [
    {
      id: 11,
      question: "The monologue is about __________.",
      options: ["(A) Luxury travel planning", "(B) Tips for sustainable tourism", "(C) Budget backpacking", "(D) Adventure sports"],
      correct: 1,
      explanation: "Travel Agent: 'Tips for sustainable tourism.' (Đại lý du lịch: 'Mẹo du lịch bền vững.') - Luyện nghe chủ đề du lịch có trách nhiệm."
    },
    {
      id: 12,
      question: "What do eco-certified hotels support?",
      options: ["(A) High-end spas.", "(B) Conservation.", "(C) Fast food chains.", "(D) Souvenir shops."],
      correct: 1,
      explanation: "Travel Agent: 'Eco-certified hotels... support conservation.' (Đại lý du lịch: 'Khách sạn chứng nhận sinh thái... hỗ trợ bảo tồn.') - Luyện nghe lợi ích lưu trú xanh."
    },
    {
      id: 13,
      question: "By what percentage do eco-hotels reduce carbon footprint?",
      options: ["(A) 10%.", "(B) 15%.", "(C) 20%.", "(D) 25%."],
      correct: 2,
      explanation: "Travel Agent: 'Reduces carbon footprint by 20%.' (Đại lý du lịch: 'Giảm dấu chân carbon 20%.') - Luyện nghe tác động môi trường định lượng."
    },
    {
      id: 14,
      question: "What is recommended over taxis?",
      options: ["(A) Renting cars.", "(B) Public transport.", "(C) Walking everywhere.", "(D) Private jets."],
      correct: 1,
      explanation: "Travel Agent: 'Use public transport over taxis.' (Đại lý du lịch: 'Sử dụng giao thông công cộng thay vì taxi.') - Luyện nghe lựa chọn di chuyển bền vững."
    },
    {
      id: 15,
      question: "What does 'leave no trace' mean?",
      options: ["(A) Take photos only.", "(B) Pack out what you pack in.", "(C) Buy everything local.", "(D) Stay in one place."],
      correct: 1,
      explanation: "Travel Agent: 'Leave no trace: pack out what you pack in.' (Đại lý du lịch: 'Không để lại dấu vết: mang ra những gì mang vào.') - Luyện nghe nguyên tắc bảo vệ môi trường."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng giữa Customer và Travel Agent về đặt tour safari. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Customer: Travel Agent, looking to book a safari in Kenya—family of four, mid-July. Wildlife focus?\nTravel Agent: Ideal season for migrations. Four-day lodge safari: game drives, Maasai village visit. $1,200 per adult, half for kids.\nCustomer: Includes meals and transport from Nairobi?\nTravel Agent: Yes, all-inclusive. Spot lions, elephants—guides are experts. Add hot air balloon for $450 extra.\nCustomer: Tempting. Any health precautions?\nTravel Agent: Vaccinations recommended; malaria prophylaxis. Pack sunscreen and binoculars.",
  questions: [
    {
      id: 16,
      question: "What is the focus of the safari?",
      options: ["(A) Beach relaxation.", "(B) Wildlife viewing.", "(C) Cultural festivals.", "(D) Shopping excursions."],
      correct: 1,
      explanation: "Customer: 'Safari in Kenya—family of four... Wildlife focus?' (Khách hàng: 'Safari ở Kenya—gia đình bốn người... Tập trung động vật hoang dã?') - Luyện nghe chủ đề tour."
    },
    {
      id: 17,
      question: "When is the ideal season mentioned?",
      options: ["(A) Winter.", "(B) Mid-July for migrations.", "(C) Spring.", "(D) Fall."],
      correct: 1,
      explanation: "Travel Agent: 'Ideal season for migrations.' (Đại lý du lịch: 'Mùa lý tưởng cho di cư.') - Luyện nghe thời điểm du lịch tốt nhất."
    },
    {
      id: 18,
      question: "What is the cost per adult?",
      options: ["(A) $800.", "(B) $1,000.", "(C) $1,200.", "(D) $1,500."],
      correct: 2,
      explanation: "Travel Agent: '$1,200 per adult.' (Đại lý du lịch: '$1,200 mỗi người lớn.') - Luyện nghe giá tour gia đình."
    },
    {
      id: 19,
      question: "What optional add-on is suggested?",
      options: ["(A) Spa day.", "(B) Hot air balloon for $450.", "(C) Private chef.", "(D) Souvenir package."],
      correct: 1,
      explanation: "Travel Agent: 'Add hot air balloon for $450 extra.' (Đại lý du lịch: 'Thêm khinh khí cầu $450.') - Luyện nghe hoạt động nâng cao."
    },
    {
      id: 20,
      question: "What health precaution is recommended?",
      options: ["(A) No vaccinations needed.", "(B) Malaria prophylaxis.", "(C) Altitude sickness pills.", "(D) Jet lag remedies only."],
      correct: 1,
      explanation: "Travel Agent: 'Malaria prophylaxis.' (Đại lý du lịch: 'Phòng sốt rét.') - Luyện nghe lưu ý sức khỏe du lịch."
    }
  ]
},
    // Reading Parts - Thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng, chủ đề du lịch
part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question: "Travelers are advised to check visa requirements well in advance to avoid last-minute _______ .",
      options: ["(A) Complicate", "(B) Complicates", "(C) Complication", "(D) Complicated"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Complication' vì danh từ chỉ 'biến chứng'. Kiến thức ngữ pháp: Danh từ sau 'avoid'; 'complicate' động từ, 'complicates' ngôi thứ ba, 'complicated' tính từ."
    },
    {
      id: 22,
      question: "The tour guide's knowledge of local customs helped the group _______ cultural misunderstandings.",
      options: ["(A) Prevent", "(B) Prevents", "(C) Prevented", "(D) Preventing"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Prevent' vì nguyên thể sau 'helped' (helped to prevent). Kiến thức ngữ pháp: 'Help + V nguyên thể'; 'prevents' ngôi thứ ba, 'prevented' quá khứ, 'preventing' V-ing."
    },
    {
      id: 23,
      question: "Budget airlines have made international travel more _______ for young adventurers.",
      options: ["(A) Access", "(B) Accessible", "(C) Accessibility", "(D) Accessed"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Accessible' vì tính từ chỉ 'tiếp cận được'. Kiến thức từ vựng: 'More accessible'; 'access' danh từ, 'accessibility' danh từ trừu tượng, 'accessed' quá khứ."
    },
    {
      id: 24,
      question: "The itinerary includes a day trip to the ancient ruins, providing a glimpse into historical _______ .",
      options: ["(A) Significant", "(B) Significance", "(C) Signify", "(D) Signifying"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Significance' vì danh từ chỉ 'ý nghĩa lịch sử'. Kiến thức ngữ pháp: 'Historical significance'; 'significant' tính từ, 'signify' động từ, 'signifying' V-ing."
    },
    {
      id: 25,
      question: "Pack light to comply with airline baggage restrictions and reduce your carbon _______ .",
      options: ["(A) Footprint", "(B) Footprints", "(C) Footprinted", "(D) Footprinting"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Footprint' vì danh từ không đếm được chỉ 'dấu chân carbon'. Kiến thức từ vựng: 'Carbon footprint'; 'footprints' số nhiều, các lựa chọn khác không phù hợp."
    },
    {
      id: 26,
      question: "Exploring off-the-beaten-path destinations can lead to more authentic and memorable _______ .",
      options: ["(A) Experience", "(B) Experiences", "(C) Experienced", "(D) Experiencing"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Experiences' vì danh từ số nhiều chỉ 'trải nghiệm'. Kiến thức ngữ pháp: Số nhiều sau 'memorable'; 'experience' số ít, 'experienced' quá khứ, 'experiencing' V-ing."
    },
    {
      id: 27,
      question: "The hotel's location near the beach made it an ideal choice for a relaxing _______ .",
      options: ["(A) Vacation", "(B) Vacations", "(C) Vacational", "(D) Vacationing"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Vacation' vì danh từ số ít chỉ 'kỳ nghỉ'. Kiến thức từ vựng: 'Relaxing vacation'; 'vacations' số nhiều, 'vacational' không chuẩn, 'vacationing' V-ing."
    },
    {
      id: 28,
      question: "Cultural immersion programs encourage participants to learn the language and customs of the host _______ .",
      options: ["(A) Country", "(B) Countries", "(C) Countryside", "(D) Countrywide"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Country' vì danh từ chỉ 'quốc gia chủ nhà'. Kiến thức ngữ pháp: Số ít phù hợp ngữ cảnh; 'countries' số nhiều, 'countryside' nông thôn, 'countrywide' toàn quốc."
    },
    {
      id: 29,
      question: "Adventure seekers often prioritize safety gear and guided tours to minimize _______ during hikes.",
      options: ["(A) Risk", "(B) Risks", "(C) Risky", "(D) Risked"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Risks' vì danh từ số nhiều chỉ 'rủi ro'. Kiến thức từ vựng: 'Minimize risks'; 'risk' số ít, 'risky' tính từ, 'risked' quá khứ."
    },
    {
      id: 30,
      question: "The travel app's real-time updates helped us navigate unfamiliar streets _______ .",
      options: ["(A) Efficient", "(B) Efficiently", "(C) Efficiency", "(D) Efficiently"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Efficiently' vì trạng từ bổ nghĩa 'navigate' (động từ). Kiến thức ngữ pháp: Trạng từ chỉ cách thức; 'efficient' tính từ, 'efficiency' danh từ."
    }
  ]
},
part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email về chương trình du lịch nhóm. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: Adventure Club Members
From: Lisa, Club Coordinator
Subject: Group Trip to Iceland: Northern Lights Expedition - Spots Filling Fast!
Dear Fellow Explorers,
We're thrilled to announce our next group adventure: a 7-day Northern Lights Expedition to Iceland, departing February 14. This immersive journey includes glacier hikes, geothermal spa visits, and guided aurora hunts, all while promoting eco-conscious travel practices.
Our itinerary features stays in sustainable lodges and transportation via low-emission buses to minimize environmental impact. The package price is $2,200 per person, covering flights from New York, accommodations, and most meals. A deposit of $500 secures your spot—full payment due by January 15.
With only 15 spots available, register promptly through the link below to join this unforgettable experience. We'll host a pre-trip webinar on December 10 to discuss packing essentials and safety protocols.
This trip not only promises breathtaking views but also fosters camaraderie among our members. Don't miss the chance to witness nature's light show!
Questions? Reply here or call 555-0198.
Safe travels,
Lisa
Club Coordinator`,
  questions: [
    {
      id: 31,
      question: "(31)",
      options: ["(A) Announce", "(B) Announcement", "(C) Announced", "(D) Announcing"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Announcing' vì V-ing sau 'thrilled to' (hào hứng thông báo). Kiến thức ngữ pháp: 'Thrilled to + V-ing'; 'announce' nguyên thể, 'announcement' danh từ, 'announced' quá khứ."
    },
    {
      id: 32,
      question: "(32)",
      options: ["(A) Include", "(B) Includes", "(C) Included", "(D) Including"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Including' vì V-ing liệt kê (including glacier hikes...). Kiến thức ngữ pháp: Phân từ hiện tại bổ nghĩa; 'include' nguyên thể, 'includes' ngôi thứ ba, 'included' quá khứ."
    },
    {
      id: 33,
      question: "(33)",
      options: ["(A) Minimize", "(B) Maximizes", "(C) Maximized", "(D) Minimizing"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Minimizing' vì V-ing chỉ mục đích (minimizing impact). Kiến thức ngữ pháp: 'To + V-ing' mục đích; 'minimize' nguyên thể, 'maximizes' ngôi thứ ba, 'maximized' quá khứ."
    },
    {
      id: 34,
      question: "(34)",
      options: ["(A) Secure", "(B) Secures", "(C) Secured", "(D) Securing"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Secure' vì nguyên thể sau 'deposit' (secures your spot). Kiến thức ngữ pháp: 'Deposit + V nguyên thể'; 'secures' ngôi thứ ba, 'secured' quá khứ, 'securing' V-ing."
    },
    {
      id: 35,
      question: "(35)",
      options: ["(A) Foster", "(B) Fosters", "(C) Fostered", "(D) Fostering"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Fostering' vì V-ing chỉ lợi ích (fostering camaraderie). Kiến thức ngữ pháp: 'Not only... but also + V-ing'; 'foster' nguyên thể, 'fosters' ngôi thứ ba, 'fostered' quá khứ."
    },
    {
      id: 36,
      question: "The trip departs on (37).",
      options: ["(A) January 15", "(B) February 14", "(C) December 10", "(D) March 1"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'departing February 14'. Kiến thức đọc hiểu: Ngày khởi hành từ phần giới thiệu."
    },
    {
      id: 37,
      question: "How many spots are available?",
      options: ["(A) 10", "(B) 15", "(C) 20", "(D) 25"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'only 15 spots available'. Kiến thức đọc hiểu: Số lượng từ email."
    },
    {
      id: 38,
      question: "What is the main purpose of this email?",
      options: ["(A) To report past trips", "(B) To promote and register for the Iceland trip", "(C) To cancel reservations", "(D) To share photos"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Group Trip to Iceland... Spots Filling Fast!'. Kiến thức đọc hiểu: Mục đích từ tiêu đề và lời kêu gọi đăng ký."
    },
    {
      id: 39,
      question: "Who is the sender?",
      options: ["(A) A travel agent", "(B) Lisa, Club Coordinator", "(C) Dr. Smith", "(D) Mike"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Lisa, Club Coordinator'. Kiến thức đọc hiểu: Người gửi từ 'From' và chữ ký."
    },
    {
      id: 40,
      question: "What is the deposit amount?",
      options: ["(A) $200", "(B) $300", "(C) $500", "(D) $700"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'deposit of $500'. Kiến thức đọc hiểu: Khoản đặt cọc từ phần thanh toán."
    }
  ]
},
part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo về tour du lịch và email đặt chỗ, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**Wanderlust Tours Advertisement**
Discover Hidden Gems: Customizable Adventure Packages Worldwide
Wanderlust Tours crafts personalized itineraries for thrill-seekers. From Amazon rainforests to Sahara dunes, our expert guides ensure safe, immersive experiences.
**Package Highlights:**
1. **Tailored Itineraries** – Design your route with our online planner at wanderlusttours.com.
2. **Expert Guides** – Local specialists sharing cultural insights.
3. **Eco-Adventures** – Sustainable options like zero-waste camps.
4. **Group Discounts** – Save 15% for parties of 4+.
Email bookings@wanderlusttours.com for a free quote. We respond in 24 hours to launch your journey.
---
**Email Message**
**To:** bookings@wanderlusttours.com
**From:** john.doe@familyadventures.net
**Date:** July 22
**Subject:** Inquiry for Amazon Rainforest Group Tour
Hi Wanderlust Team,
Spotted your ad on the travel blog and we're a family of five interested in a 5-day Amazon rainforest adventure for August 10-14. We'd like a customizable itinerary focusing on wildlife spotting and eco-camping, with kid-friendly activities. Any group discounts available?
Please quote including internal flights from Lima and provide details on guide expertise. My wife and I are available for a call Tuesday-Thursday, 9:00 A.M. to 12:00 P.M. PST.
Thanks,
John Doe
Family Adventures Coordinator
567 Trailblazer St., Denver, CO 80202
Phone: 303-555-7890`,
 
  questions: [
    {
      id: 41,
      question: "According to the advertisement, what tool helps design routes?",
      options: [
        "(A) Mobile app",
        "(B) Online planner",
        "(C) Phone consultation",
        "(D) Travel book"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Design your route with our online planner'. Kiến thức đọc hiểu: Công cụ từ quảng cáo."
    },
    {
      id: 42,
      question: "How did Mr. Doe find the tour?",
      options: [
        "(A) Friend's recommendation",
        "(B) Travel blog ad",
        "(C) Social media",
        "(D) TV commercial"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'your ad on the travel blog'. Kiến thức suy luận: Nguồn từ email."
    },
    {
      id: 43,
      question: "How many people are in Mr. Doe's group?",
      options: [
        "(A) Three",
        "(B) Four",
        "(C) Five",
        "(D) Six"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'family of five'. Kiến thức đọc hiểu: Số lượng từ email."
    },
    {
      id: 44,
      question: "Which highlight does Mr. Doe reference indirectly?",
      options: [
        "(A) Group discounts",
        "(B) Tailored itineraries",
        "(C) Expert guides",
        "(D) All of the above"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'customizable itinerary'. Kiến thức đọc hiểu: Quan tâm từ email khớp tailored."
    },
    {
      id: 45,
      question: "What will Mr. Doe most likely receive in 24 hours?",
      options: [
        "(A) Full booking confirmation",
        "(B) A free quote response",
        "(C) Itinerary draft",
        "(D) Guide profiles"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'We respond in 24 hours'. Kiến thức suy luận: Phản hồi từ quảng cáo."
    },
    {
      id: 46,
      question: "What is the proposed trip duration?",
      options: [
        "(A) 3 days",
        "(B) 5 days",
        "(C) 7 days",
        "(D) 10 days"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì '5-day Amazon rainforest adventure'. Kiến thức đọc hiểu: Thời gian từ email."
    },
    {
      id: 47,
      question: "What starting point is mentioned for flights?",
      options: [
        "(A) New York",
        "(B) Lima",
        "(C) Denver",
        "(D) London"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'internal flights from Lima'. Kiến thức đọc hiểu: Điểm bay từ email."
    },
    {
      id: 48,
      question: "What focus does the family want?",
      options: [
        "(A) Shopping and nightlife",
        "(B) Wildlife spotting and eco-camping",
        "(C) Beach relaxation",
        "(D) Historical sites"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'focusing on wildlife spotting and eco-camping'. Kiến thức đọc hiểu: Sở thích từ email."
    },
    {
      id: 49,
      question: "When is Mr. Doe available for a call?",
      options: [
        "(A) Weekends",
        "(B) Tuesday-Thursday, 9:00 A.M. to 12:00 P.M. PST",
        "(C) Evenings",
        "(D) After 1:00 P.M."
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Tuesday-Thursday, 9:00 A.M. to 12:00 P.M. PST'. Kiến thức đọc hiểu: Khung giờ từ email."
    },
    {
      id: 50,
      question: "What discount is offered for groups?",
      options: [
        "(A) 5%",
        "(B) 10%",
        "(C) 15%",
        "(D) 20%"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Save 15% for parties of 4+'. Kiến thức đọc hiểu: Giảm giá từ quảng cáo."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn về chia sẻ kinh nghiệm du lịch, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Anna (18:30): Just back from Japan—best trip ever! Sakura in Kyoto were magical. Tips?\nTom (18:32): Jealous! Stayed in ryokans? Food highlights?\nAnna (18:35): Yes, traditional inns—super cozy. Must-try: ramen in Tokyo, kaiseki in Kyoto. Budget $1,200 for 10 days.\nTom (18:40): Noted. Any jet lag hacks? Flying there next spring.\nAnna (18:45): Melatonin and light exercise. Book shinkansen passes early—saves 30%. Safe travels!\nTom (18:50): Thanks! Packing list incoming.`,
  questions: [
    {
      id: 51,
      question: "What is Anna sharing?",
      options: ["(A) Work updates", "(B) Japan trip experiences", "(C) Recipe ideas", "(D) Book recommendations"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Just back from Japan—best trip ever!'. Kiến thức đọc hiểu: Chủ đề từ tin nhắn đầu."
    },
    {
      id: 52,
      question: "What made the trip magical for Anna?",
      options: ["(A) Food only", "(B) Sakura in Kyoto", "(C) Ryokans", "(D) Shinkansen rides"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Sakura in Kyoto were magical'. Kiến thức suy luận: Yếu tố nổi bật từ Anna."
    },
    {
      id: 53,
      question: "What accommodation did Anna stay in?",
      options: ["(A) Hotels", "(B) Ryokans", "(C) Hostels", "(D) Campsites"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Stayed in ryokans? Yes, traditional inns'. Kiến thức đọc hiểu: Lưu trú từ trao đổi."
    },
    {
      id: 54,
      question: "What is Anna's budget for 10 days?",
      options: ["(A) $800", "(B) $1,000", "(C) $1,200", "(D) $1,500"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Budget $1,200 for 10 days'. Kiến thức đọc hiểu: Ngân sách từ Anna."
    },
    {
      id: 55,
      question: "What food does Anna recommend?",
      options: ["(A) Sushi in Tokyo", "(B) Ramen in Tokyo, kaiseki in Kyoto", "(C) Tempura in Kyoto", "(D) Sashimi only"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'ramen in Tokyo, kaiseki in Kyoto'. Kiến thức đọc hiểu: Ẩm thực từ Anna."
    },
    {
      id: 56,
      question: "When is Tom planning to go?",
      options: ["(A) This winter", "(B) Next spring", "(C) Summer", "(D) Fall"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Flying there next spring'. Kiến thức suy luận: Kế hoạch từ Tom."
    },
    {
      id: 57,
      question: "What hack does Anna suggest for jet lag?",
      options: ["(A) Coffee all day", "(B) Melatonin and light exercise", "(C) Sleep on plane", "(D) No water"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Melatonin and light exercise'. Kiến thức suy luận: Mẹo từ Anna."
    },
    {
      id: 58,
      question: "What does Anna recommend booking early?",
      options: ["(A) Hotels", "(B) Shinkansen passes", "(C) Food tours", "(D) Flights only"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Book shinkansen passes early'. Kiến thức đọc hiểu: Đặt trước từ Anna."
    },
    {
      id: 59,
      question: "How much can early booking save?",
      options: ["(A) 10%", "(B) 20%", "(C) 30%", "(D) 40%"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'saves 30%'. Kiến thức suy luận: Tiết kiệm từ Anna."
    },
    {
      id: 60,
      question: "What does Tom plan to send?",
      options: ["(A) Trip photos", "(B) Packing list", "(C) Budget breakdown", "(D) Itinerary"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Packing list incoming'. Kiến thức suy luận: Chia sẻ từ Tom."
    }
  ]
}
  }
};