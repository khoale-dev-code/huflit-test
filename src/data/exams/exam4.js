export const EXAM4_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 4 (Chủ Đề Môi Trường & Xã Hội)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết về nhận thức môi trường trong du lịch.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Sarah và Mark về du lịch bền vững và tác động môi trường. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại thực tế HUFLIT).",
  type: "listening",
  script: "Sarah: Hey Mark, how was your eco-tour in Costa Rica? Did it live up to the hype about sustainable travel?\nMark: It was eye-opening, Sarah. We spent two weeks hiking through rainforests, but I was surprised by how much plastic waste we saw along the trails. The guides pushed us to use reusable water bottles to cut down on single-use plastics.\nSarah: That's smart. I went on a similar trip to Bali last summer and learned that over-tourism is harming coral reefs. They limit visitor numbers now to protect the ecosystem.\nMark: Exactly. In Costa Rica, they also taught us about carbon offsetting for flights—planting trees to balance emissions. I felt guilty about flying there, but it helped ease my mind.\nSarah: True, but I wonder if it's enough. Local communities there rely on tourism, yet rising sea levels from climate change are flooding their villages. It's a tough balance.",
  questions: [
    {
      id: 1,
      question: "What surprised Mark during his trip?",
      options: [
        "(A) The lack of wildlife in the rainforests.",
        "(B) The amount of plastic waste along the trails.",
        "(C) The high cost of reusable water bottles.",
        "(D) The guides' lack of knowledge about sustainability."
      ],
      correct: 1,
      explanation: "Mark: 'I was surprised by how much plastic waste we saw along the trails.' (Mark: 'Tôi bất ngờ vì lượng rác nhựa dọc theo đường mòn.') - Luyện nghe chi tiết về vấn đề ô nhiễm trong du lịch sinh thái."
    },
    {
      id: 2,
      question: "How long did Mark spend on his trip?",
      options: [
        "(A) One week.",
        "(B) Two weeks.",
        "(C) One month.",
        "(D) Three weeks."
      ],
      correct: 1,
      explanation: "Mark: 'We spent two weeks hiking through rainforests.' (Mark: 'Chúng tôi dành hai tuần đi bộ qua rừng mưa.') - Luyện nghe thời gian và hoạt động du lịch bền vững."
    },
    {
      id: 3,
      question: "What did the guides encourage tourists to do?",
      options: [
        "(A) Buy souvenirs from local markets.",
        "(B) Use reusable water bottles.",
        "(C) Take more photos of wildlife.",
        "(D) Stay longer in the rainforests."
      ],
      correct: 1,
      explanation: "Mark: 'The guides pushed us to use reusable water bottles to cut down on single-use plastics.' (Mark: 'Các hướng dẫn viên thúc đẩy chúng tôi sử dụng chai nước tái sử dụng để giảm nhựa dùng một lần.') - Luyện nghe khuyến nghị bảo vệ môi trường."
    },
    {
      id: 4,
      question: "What environmental issue is affecting Bali according to Sarah?",
      options: [
        "(A) Deforestation from hiking trails.",
        "(B) Over-tourism harming coral reefs.",
        "(C) Air pollution from flights.",
        "(D) Plastic waste in villages."
      ],
      correct: 1,
      explanation: "Sarah: 'Over-tourism is harming coral reefs. They limit visitor numbers now to protect the ecosystem.' (Sarah: 'Du lịch quá mức đang hại rạn san hô. Họ giới hạn số lượng du khách để bảo vệ hệ sinh thái.') - Luyện nghe tác động của du lịch đến hệ sinh thái biển."
    },
    {
      id: 5,
      question: "What did Mark learn about flights during the trip?",
      options: [
        "(A) They are completely eco-friendly.",
        "(B) Carbon offsetting involves planting trees.",
        "(C) They should be avoided entirely.",
        "(D) Local trains are a better alternative."
      ],
      correct: 1,
      explanation: "Mark: 'They also taught us about carbon offsetting for flights—planting trees to balance emissions.' (Mark: 'Họ còn dạy về bù đắp carbon cho chuyến bay—trồng cây để cân bằng phát thải.') - Luyện nghe giải pháp giảm thiểu tác động của du lịch hàng không."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người: Sarah, Mike và John. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: At a community meeting about urban green spaces.\nSarah: Thanks for coming, everyone. With city air pollution rising, we need more parks. Mike, what do you think?\nMike: Absolutely, Sarah. Studies show green spaces reduce stress and improve mental health in crowded areas.\nJohn: I agree, but funding is the issue. Local businesses could sponsor tree-planting drives—it's good for their image too.\nSarah: Great idea, John. We've already partnered with schools for volunteer clean-ups. Last month, we removed 200 pounds of litter from the riverbank.\nMike: Impressive. And for social equity, let's prioritize low-income neighborhoods—they suffer most from heat islands.\nJohn: Yes, and community gardens could provide fresh produce, tackling food insecurity.\nSarah: Perfect. Let's vote on the proposal next week.",
  questions: [
    {
      id: 6,
      question: "What is the main topic of the meeting?",
      options: ["(A) Reducing traffic in the city", "(B) Creating more urban green spaces", "(C) Improving public transportation", "(D) Expanding school programs"],
      correct: 1,
      explanation: "Sarah: 'With city air pollution rising, we need more parks.' (Sarah: 'Với ô nhiễm không khí thành phố tăng, chúng ta cần thêm công viên.') - Luyện nghe chủ đề chính về không gian xanh đô thị."
    },
    {
      id: 7,
      question: "According to Mike, what benefit do green spaces provide?",
      options: ["(A) They increase property values only.", "(B) They reduce stress and improve mental health.", "(C) They eliminate all pollution immediately.", "(D) They attract more tourists."],
      correct: 1,
      explanation: "Mike: 'Studies show green spaces reduce stress and improve mental health in crowded areas.' (Mike: 'Nghiên cứu cho thấy không gian xanh giảm stress và cải thiện sức khỏe tinh thần ở khu vực đông đúc.') - Luyện nghe lợi ích xã hội của không gian xanh."
    },
    {
      id: 8,
      question: "What funding solution does John suggest?",
      options: ["(A) Government grants alone.", "(B) Sponsorship from local businesses.", "(C) Donations from residents only.", "(D) Selling park tickets."],
      correct: 1,
      explanation: "John: 'Local businesses could sponsor tree-planting drives—it's good for their image too.' (John: 'Các doanh nghiệp địa phương có thể tài trợ trồng cây—tốt cho hình ảnh của họ.') - Luyện nghe ý tưởng tài trợ cộng đồng."
    },
    {
      id: 9,
      question: "What recent activity did the group organize with schools?",
      options: ["(A) A tree-planting event.", "(B) Volunteer clean-ups.", "(C) A mental health workshop.", "(D) A food drive."],
      correct: 1,
      explanation: "Sarah: 'We've already partnered with schools for volunteer clean-ups. Last month, we removed 200 pounds of litter from the riverbank.' (Sarah: 'Chúng tôi đã hợp tác với trường học cho các buổi dọn dẹp tình nguyện. Tháng trước, chúng tôi loại bỏ 200 pound rác khỏi bờ sông.') - Luyện nghe hoạt động bảo vệ môi trường gần đây."
    },
    {
      id: 10,
      question: "What does Mike emphasize for social equity?",
      options: ["(A) Prioritizing wealthy neighborhoods.", "(B) Focusing on low-income areas for heat islands.", "(C) Ignoring urban heat effects.", "(D) Building more roads in parks."],
      correct: 1,
      explanation: "Mike: 'For social equity, let's prioritize low-income neighborhoods—they suffer most from heat islands.' (Mike: 'Vì công bằng xã hội, hãy ưu tiên khu vực thu nhập thấp—họ chịu ảnh hưởng nặng nề nhất từ đảo nhiệt đô thị.') - Luyện nghe khía cạnh công bằng xã hội trong quy hoạch xanh."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của Professor về biến đổi khí hậu và trách nhiệm xã hội. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Professor: Good morning, class. Today, we're discussing climate change and its social impacts. It's undeniable that global temperatures are rising due to greenhouse gases from human activities. Governments must enforce stricter emissions standards, but individuals play a key role too—simple actions like recycling can make a difference. Last year, our campus initiative reduced waste by 30 percent through community education. Remember, inequality exacerbates vulnerability; low-income communities face disproportionate flooding risks. Let's commit to advocacy for equitable policies.",
  questions: [
    {
      id: 11,
      question: "The topic of the lecture is __________.",
      options: ["(A) Economic growth strategies", "(B) Climate change and social impacts", "(C) Campus sports programs", "(D) Historical events"],
      correct: 1,
      explanation: "Professor: 'Today, we're discussing climate change and its social impacts.' (Giáo sư: 'Hôm nay, chúng ta thảo luận về biến đổi khí hậu và tác động xã hội.') - Luyện nghe chủ đề bài giảng môi trường."
    },
    {
      id: 12,
      question: "Global temperatures are rising due to __________.",
      options: ["(A) Natural solar cycles only", "(B) Greenhouse gases from human activities", "(C) Decreased industrial output", "(D) Improved recycling efforts"],
      correct: 1,
      explanation: "Professor: 'Global temperatures are rising due to greenhouse gases from human activities.' (Giáo sư: 'Nhiệt độ toàn cầu tăng do khí nhà kính từ hoạt động con người.') - Luyện nghe nguyên nhân biến đổi khí hậu."
    },
    {
      id: 13,
      question: "What must governments enforce according to the professor?",
      options: ["(A) More recycling bins everywhere", "(B) Stricter emissions standards", "(C) Free public transport only", "(D) Annual vacations for all"],
      correct: 1,
      explanation: "Professor: 'Governments must enforce stricter emissions standards.' (Giáo sư: 'Chính phủ phải thực thi tiêu chuẩn phát thải nghiêm ngặt hơn.') - Luyện nghe trách nhiệm chính sách môi trường."
    },
    {
      id: 14,
      question: "What was the result of last year's campus initiative?",
      options: ["(A) Increased waste by 30 percent", "(B) Reduced waste by 30 percent", "(C) No change in emissions", "(D) Higher energy use"],
      correct: 1,
      explanation: "Professor: 'Last year, our campus initiative reduced waste by 30 percent through community education.' (Giáo sư: 'Năm ngoái, sáng kiến khuôn viên giảm 30% chất thải qua giáo dục cộng đồng.') - Luyện nghe thành tựu địa phương."
    },
    {
      id: 15,
      question: "Who faces disproportionate risks from climate change?",
      options: ["(A) High-income communities only", "(B) Low-income communities from flooding", "(C) All equally", "(D) Rural farmers alone"],
      correct: 1,
      explanation: "Professor: 'Inequality exacerbates vulnerability; low-income communities face disproportionate flooding risks.' (Giáo sư: 'Bất bình đẳng làm tăng tính dễ bị tổn thương; cộng đồng thu nhập thấp đối mặt rủi ro lũ lụt không cân xứng.') - Luyện nghe khía cạnh xã hội của biến đổi khí hậu."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng giữa Customer và Sales Associate về sản phẩm thân thiện với môi trường. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Customer: Excuse me, I'm looking for eco-friendly cleaning supplies. Do you have any that are biodegradable?\nSales Associate: Absolutely, sir. Our new line uses plant-based ingredients and zero harsh chemicals. It's certified by the Green Seal organization.\nCustomer: Great. How about packaging? I try to avoid plastic.\nSales Associate: All bottles are made from recycled glass, and the labels are compostable. We've reduced our carbon footprint by 40 percent this year.\nCustomer: Impressive. Is there a refill station to cut down on waste even more?\nSales Associate: Yes, in-store refills are free for loyalty members. It helps build community awareness about sustainability.\nCustomer: Perfect, I'll take two.",
  questions: [
    {
      id: 16,
      question: "What is the customer seeking?",
      options: ["(A) Conventional cleaning supplies", "(B) Eco-friendly cleaning supplies", "(C) Luxury household items", "(D) All of the above"],
      correct: 1,
      explanation: "Customer: 'I'm looking for eco-friendly cleaning supplies. Do you have any that are biodegradable?' (Khách hàng: 'Tôi đang tìm sản phẩm làm sạch thân thiện với môi trường. Bạn có loại phân hủy sinh học không?') - Luyện nghe nhu cầu sản phẩm xanh."
    },
    {
      id: 17,
      question: "What certification does the new line have?",
      options: ["(A) Energy Star", "(B) Green Seal", "(C) Organic Food Label", "(D) Fair Trade"],
      correct: 1,
      explanation: "Sales Associate: 'It's certified by the Green Seal organization.' (Nhân viên: 'Nó được chứng nhận bởi tổ chức Green Seal.') - Luyện nghe chứng nhận môi trường."
    },
    {
      id: 18,
      question: "What material are the bottles made from?",
      options: ["(A) Virgin plastic", "(B) Recycled glass", "(C) Aluminum cans", "(D) Cardboard"],
      correct: 1,
      explanation: "Sales Associate: 'All bottles are made from recycled glass.' (Nhân viên: 'Tất cả chai làm từ kính tái chế.') - Luyện nghe chi tiết bao bì bền vững."
    },
    {
      id: 19,
      question: "By what percentage has the store reduced its carbon footprint?",
      options: ["(A) 20 percent", "(B) 30 percent", "(C) 40 percent", "(D) 50 percent"],
      correct: 2,
      explanation: "Sales Associate: 'We've reduced our carbon footprint by 40 percent this year.' (Nhân viên: 'Chúng tôi giảm 40% dấu chân carbon năm nay.') - Luyện nghe tiến bộ môi trường của doanh nghiệp."
    },
    {
      id: 20,
      question: "What additional service does the store offer?",
      options: ["(A) Free delivery", "(B) In-store refills for loyalty members", "(C) Discounts on non-eco products", "(D) Home composting kits"],
      correct: 1,
      explanation: "Sales Associate: 'In-store refills are free for loyalty members. It helps build community awareness about sustainability.' (Nhân viên: 'Nạp lại tại cửa hàng miễn phí cho thành viên trung thành. Nó giúp nâng cao nhận thức cộng đồng về bền vững.') - Luyện nghe dịch vụ hỗ trợ giảm chất thải."
    }
  ]
},
    // Reading Parts - Thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng, chủ đề môi trường & xã hội
part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question: "Environmental activists argue that governments should impose stricter regulations on industries to reduce carbon _______.",
      options: ["(A) Emission", "(B) Emissions", "(C) Emitting", "(D) Emitted"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Emissions' vì đây là danh từ số nhiều chỉ 'phát thải' (carbon emissions), phù hợp với ngữ cảnh quy định môi trường. Kiến thức ngữ pháp: Danh từ số nhiều sau 'reduce' trong cấu trúc mục tiêu; (A) số ít không phù hợp, (C) V-ing, (D) quá khứ phân từ."
    },
    {
      id: 22,
      question: "The community center provides free workshops on sustainable living, which have helped _______ residents adopt eco-friendly habits.",
      options: ["(A) much", "(B) many", "(C) more", "(D) most"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'most' vì đây là tính từ siêu cấp chỉ 'hầu hết' (most residents), phù hợp với đại từ số nhiều 'residents'. Kiến thức ngữ pháp: 'Most + danh từ số nhiều' để chỉ phần lớn; 'much' cho không đếm được, 'many' cho số nhiều nhưng không siêu cấp, 'more' so sánh."
    },
    {
      id: 23,
      question: "Since the recycling program began, the city has diverted thousands of tons of waste _______ landfills.",
      options: ["(A) from", "(B) to", "(C) into", "(D) through"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'from' vì nó chỉ nguồn gốc (divert from landfills = chuyển hướng khỏi bãi rác). Kiến thức ngữ pháp: Giới từ 'from' trong cấu trúc chuyển hướng; 'to/into' chỉ đích đến, 'through' chỉ quá trình."
    },
    {
      id: 24,
      question: "Social inequality often exacerbates the effects of natural disasters, leaving vulnerable populations at greater _______.",
      options: ["(A) Risk", "(B) Risky", "(C) Risks", "(D) Risked"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Risk' vì đây là danh từ chỉ 'rủi ro', phù hợp sau 'at greater'. Kiến thức từ vựng: Danh từ 'risk' trong ngữ cảnh xã hội; 'risky' tính từ, 'risks' số nhiều không phù hợp, 'risked' quá khứ."
    },
    {
      id: 25,
      question: "Volunteers are encouraged to participate _______ the annual beach clean-up event to protect marine life.",
      options: ["(A) At", "(B) In", "(C) On", "(D) For"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'in' vì chỉ sự tham gia (participate in an event). Kiến thức ngữ pháp: Giới từ 'in' với 'participate' + sự kiện; 'at/on' chỉ địa điểm/thời gian, 'for' chỉ mục đích."
    },
    {
      id: 26,
      question: "The nonprofit organization focuses on empowering women in rural areas by providing access to education and _______ resources.",
      options: ["(A) Sustain", "(B) Sustainable", "(C) Sustainability", "(D) Sustained"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Sustainable' vì đây là tính từ chỉ 'bền vững' (sustainable resources). Kiến thức ngữ pháp: Tính từ trước danh từ 'resources'; 'sustain' động từ, 'sustainability' danh từ, 'sustained' quá khứ."
    },
    {
      id: 27,
      question: "Climate scientists predict that sea levels will rise _______ the next century if emissions continue unchecked.",
      options: ["(A) During", "(B) Over", "(C) In", "(D) At"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'over' vì chỉ khoảng thời gian kéo dài (over the next century). Kiến thức ngữ pháp: Giới từ 'over' với khoảng thời gian dài; 'during' cho sự kiện cụ thể, 'in/at' cho mốc thời gian."
    },
    {
      id: 28,
      question: "The campaign aims to raise awareness about plastic pollution, urging citizens to reduce their reliance on single-use _______.",
      options: ["(A) Product", "(B) Products", "(C) Productive", "(D) Produced"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Products' vì danh từ số nhiều chỉ 'sản phẩm dùng một lần'. Kiến thức từ vựng: 'Single-use products' trong ngữ cảnh ô nhiễm nhựa; 'product' số ít, 'productive' tính từ, 'produced' quá khứ."
    },
    {
      id: 29,
      question: "Many urban areas are implementing green infrastructure to mitigate the effects of extreme weather _______.",
      options: ["(A) Event", "(B) Events", "(C) Eventual", "(D) Eventually"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Events' vì danh từ số nhiều chỉ 'sự kiện thời tiết cực đoan'. Kiến thức ngữ pháp: Số nhiều sau 'of' trong cụm danh từ; 'event' số ít, 'eventual' tính từ, 'eventually' trạng từ."
    },
    {
      id: 30,
      question: "Corporate social responsibility programs often include initiatives to support local communities and promote environmental _______.",
      options: ["(A) Protect", "(B) Protection", "(C) Protective", "(D) Protecting"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Protection' vì danh từ chỉ 'bảo vệ môi trường'. Kiến thức từ vựng: 'Environmental protection' trong ngữ cảnh trách nhiệm xã hội; 'protect' động từ, 'protective' tính từ, 'protecting' V-ing."
    }
  ]
},
part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email về chiến dịch bảo vệ môi trường. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: All Staff Members
From: Anna Rivera, CSR Coordinator
Subject: Join Our Earth Day Community Clean-Up Initiative
Dear Colleagues,
As Earth Day approaches, our company is committed to fostering environmental stewardship and social responsibility. This year, we are launching a volunteer-driven clean-up event along the local riverbanks to combat plastic pollution and restore natural habitats. Participation is voluntary, but we encourage everyone to join us on Saturday, April 20, to make a tangible impact.
The event will include hands-on activities such as litter collection and tree planting, guided by local environmental experts. We will provide all necessary supplies, including gloves, bags, and reusable water stations to minimize our own waste. This initiative not only benefits the ecosystem but also strengthens community ties by partnering with nearby schools and nonprofits.
To ensure smooth logistics, please register by Wednesday, April 17, via the internal portal. Transportation will be arranged from the office parking lot, with carpools encouraged to reduce emissions. For those unable to attend in person, we offer a virtual option to track progress and share tips on sustainable living.
Your involvement will help us achieve our goal of removing at least 500 pounds of debris while raising awareness about ocean-bound plastics. Together, we can demonstrate that corporate action leads to positive societal change.
If you have questions, feel free to contact me at extension 456.
Thank you for your dedication to a greener future.
Best,
Anna Rivera
CSR Coordinator`,
  questions: [
    {
      id: 31,
      question: "(31)",
      options: ["(A) Fostering", "(B) Foster", "(C) Fostered", "(D) Fosters"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Fostering' vì đây là V-ing sau 'committed to' (cam kết thúc đẩy). Kiến thức ngữ pháp: Cấu trúc 'committed to + V-ing'; 'foster' nguyên thể, 'fostered' quá khứ, 'fosters' ngôi thứ ba."
    },
    {
      id: 32,
      question: "(32)",
      options: ["(A) Combat", "(B) Ignore", "(C) Increase", "(D) Delay"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Combat' vì nghĩa 'chống lại' (combat plastic pollution). Kiến thức từ vựng: Động từ phù hợp ngữ cảnh bảo vệ môi trường; 'ignore' bỏ qua, 'increase' tăng, 'delay' trì hoãn không liên quan."
    },
    {
      id: 33,
      question: "(33)",
      options: ["(A) Benefits", "(B) Benefiting", "(C) Benefit", "(D) Benefited"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Benefits' vì danh từ số nhiều chỉ lợi ích kép (ecosystem and community). Kiến thức ngữ pháp: 'Not only... but also' song song danh từ; 'benefiting' V-ing, 'benefit' nguyên thể, 'benefited' quá khứ."
    },
    {
      id: 34,
      question: "(34)",
      options: ["(A) Register", "(B) Cancel", "(C) Postpone", "(D) Avoid"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Register' vì chỉ hành động đăng ký (register by Wednesday). Kiến thức từ vựng: Động từ phù hợp quy trình sự kiện; 'cancel' hủy, 'postpone' hoãn, 'avoid' tránh không phù hợp."
    },
    {
      id: 35,
      question: "(35)",
      options: ["(A) Encouraged", "(B) Discouraged", "(C) Required", "(D) Banned"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Encouraged' vì nghĩa 'khuyến khích' (carpools encouraged). Kiến thức từ vựng: Tính từ bị động phù hợp giảm phát thải; 'discouraged' ngăn cản, 'required' bắt buộc, 'banned' cấm không khớp."
    },
    {
      id: 36,
      question: "The clean-up event is scheduled for (37).",
      options: ["(A) Wednesday, April 17", "(B) Saturday, April 20", "(C) Monday, April 22", "(D) Friday, April 19"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'join us on Saturday, April 20'. Kiến thức đọc hiểu: Trích dẫn trực tiếp ngày sự kiện chính."
    },
    {
      id: 37,
      question: "What is the goal of the initiative regarding debris removal?",
      options: ["(A) At least 300 pounds", "(B) At least 500 pounds", "(C) Exactly 1,000 pounds", "(D) No specific target"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'removing at least 500 pounds of debris'. Kiến thức đọc hiểu: Xác định mục tiêu từ phần kết thúc."
    },
    {
      id: 38,
      question: "What is the primary purpose of this email?",
      options: ["(A) To report past achievements", "(B) To invite staff to a volunteer event", "(C) To announce a policy change", "(D) To solicit donations"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì tập trung vào 'launching a volunteer-driven clean-up event' và 'encourage everyone to join'. Kiến thức đọc hiểu: Mục đích từ tiêu đề và lời kêu gọi (Join Our Earth Day...)."
    },
    {
      id: 39,
      question: "Who is the sender of the email?",
      options: ["(A) A local expert", "(B) The CEO", "(C) The CSR Coordinator", "(D) A school principal"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Anna Rivera, CSR Coordinator'. Kiến thức đọc hiểu: Xác định từ phần 'From' và chữ ký."
    },
    {
      id: 40,
      question: "What alternative is offered for non-attendees?",
      options: ["(A) A paid excursion", "(B) A virtual tracking option", "(C) Extra vacation days", "(D) Financial compensation"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'virtual option to track progress and share tips'. Kiến thức đọc hiểu: Lựa chọn thay thế từ phần logistics."
    }
  ]
},
part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo về dịch vụ tư vấn môi trường và email yêu cầu dịch vụ, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**GreenPath Consulting Advertisement**
Sustainable Solutions for Businesses: Expert Guidance on ESG Compliance
At GreenPath Consulting, we specialize in helping companies integrate Environmental, Social, and Governance (ESG) principles into their operations. Our certified advisors conduct audits, develop action plans, and provide training to ensure regulatory compliance and enhance corporate reputation.
**Key Services:**
1. **ESG Audits** – Comprehensive assessments of your environmental impact, social responsibility, and governance practices. Schedule a free initial consultation at greenpathconsulting.org.
2. **Custom Sustainability Reports** – Tailored reports that meet international standards like GRI and SASB.
3. **Employee Training Workshops** – Interactive sessions on topics such as diversity, equity, and carbon reduction strategies.
4. **Policy Development Support** – Assistance in creating policies for ethical sourcing and community engagement.
Contact us at info@greenpathconsulting.org for a personalized quote. Our team responds within 48 hours to support your journey toward sustainability.
---
**Email Message**
**To:** info@greenpathconsulting.org
**From:** emma.johnson@techinnovate.com
**Date:** September 10
**Subject:** Inquiry for ESG Audit Services
Dear GreenPath Team,
I came across your ad in the industry journal and am interested in your ESG audit services for our mid-sized tech firm. We are expanding our operations and need guidance on assessing our carbon footprint and improving diversity initiatives. Could you provide details on the audit process, timeline, and costs? Our team of 150 employees would benefit from a workshop on social responsibility as well.
Please reply to this email or call me at 555-0123 between 8:00 A.M. and 4:00 P.M. EST. We aim to start implementation by year-end.
Regards,
Emma Johnson
Sustainability Lead
TechInnovate Inc.
789 Innovation Drive, Austin, TX 73301`,
 
  questions: [
    {
      id: 41,
      question: "According to the advertisement, what can clients do on the GreenPath Web site?",
      options: [
        "(A) Schedule a free initial consultation",
        "(B) Purchase training materials",
        "(C) Apply for ESG certification",
        "(D) Download policy templates"
      ],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'Schedule a free initial consultation at greenpathconsulting.org'. Kiến thức đọc hiểu: Mục đích trang web từ phần dịch vụ chính."
    },
    {
      id: 42,
      question: "What suggests that GreenPath advertises in professional publications?",
      options: [
        "(A) The email mentions finding the ad in an industry journal.",
        "(B) The ad lists prices for audits.",
        "(C) The Web site offers free audits.",
        "(D) The services include legal advice."
      ],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'I came across your ad in the industry journal'. Kiến thức suy luận: Kết nối nguồn quảng cáo từ email."
    },
    {
      id: 43,
      question: "Who is most likely Ms. Johnson?",
      options: [
        "(A) A certified advisor",
        "(B) A nonprofit director",
        "(C) A sustainability lead",
        "(D) An ESG auditor"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Emma Johnson, Sustainability Lead'. Kiến thức đọc hiểu: Vai trò từ chữ ký email."
    },
    {
      id: 44,
      question: "Which service does Ms. Johnson NOT mention in her email?",
      options: [
        "(A) ESG audits",
        "(B) Employee training workshops",
        "(C) Custom sustainability reports",
        "(D) Policy development support"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì email chỉ đề cập audits và workshops, không reports. Kiến thức đọc hiểu: So sánh yêu cầu email với danh sách dịch vụ."
    },
    {
      id: 45,
      question: "What will Ms. Johnson most likely receive within 48 hours?",
      options: [
        "(A) A completed audit report",
        "(B) A response from the GreenPath team",
        "(C) Workshop training materials",
        "(D) A policy template"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Our team responds within 48 hours'. Kiến thức suy luận: Quy trình phản hồi từ quảng cáo."
    },
    {
      id: 46,
      question: "According to the advertisement, what standards do the sustainability reports meet?",
      options: [
        "(A) ISO 9001 and OSHA",
        "(B) GRI and SASB",
        "(C) FDA and EPA",
        "(D) GAAP and IFRS"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'international standards like GRI and SASB'. Kiến thức đọc hiểu: Trích dẫn tiêu chuẩn từ phần dịch vụ."
    },
    {
      id: 47,
      question: "What type of company does Ms. Johnson represent?",
      options: [
        "(A) A consulting firm",
        "(B) A mid-sized tech firm",
        "(C) A nonprofit organization",
        "(D) A manufacturing plant"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'our mid-sized tech firm'. Kiến thức đọc hiểu: Loại hình từ email."
    },
    {
      id: 48,
      question: "What specific areas does Ms. Johnson want to assess?",
      options: [
        "(A) Financial governance and sales",
        "(B) Carbon footprint and diversity initiatives",
        "(C) Employee salaries and benefits",
        "(D) Product pricing and marketing"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'assessing our carbon footprint and improving diversity initiatives'. Kiến thức đọc hiểu: Yêu cầu cụ thể từ email."
    },
    {
      id: 49,
      question: "When does Ms. Johnson prefer to be contacted by phone?",
      options: [
        "(A) Between 8:00 A.M. and 4:00 P.M. EST",
        "(B) After 5:00 P.M. PST",
        "(C) On weekends",
        "(D) Via text only"
      ],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'call me at 555-0123 between 8:00 A.M. and 4:00 P.M. EST'. Kiến thức đọc hiểu: Khung giờ từ email."
    },
    {
      id: 50,
      question: "What is the size of Ms. Johnson's team?",
      options: [
        "(A) 50 employees",
        "(B) 100 employees",
        "(C) 150 employees",
        "(D) 200 employees"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Our team of 150 employees'. Kiến thức đọc hiểu: Quy mô từ email."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn về lập kế hoạch sự kiện xã hội chống biến đổi khí hậu, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Lisa (9:45): Hey Ben, rally against climate inaction starts at noon in the park. You still in?\nBen (9:47): Yes! Bringing posters on renewable energy. Weather looks clear, no rain delay.\nLisa (9:50): Awesome. Tom is handling sound system—mic for speakers. We'll need volunteers for sign-up sheets.\nBen (10:02): Got it. I'll recruit at the entrance. Hope turnout is big; last one had 200 people.\nLisa (11:30): Quick update: City approved our permit, but parking is limited. Suggest public transit.\nBen (11:35): Noted. Sharing the transit tip now. See you soon—let's make noise for change!\nTom (12:05): On site. Sound check good. Crowd building.`,
  questions: [
    {
      id: 51,
      question: "What is the purpose of the gathering?",
      options: ["(A) A music festival", "(B) A rally against climate inaction", "(C) A job fair", "(D) A food drive"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'rally against climate inaction'. Kiến thức đọc hiểu: Chủ đề từ tin nhắn đầu."
    },
    {
      id: 52,
      question: "What does Ben mean by 'no rain delay'?",
      options: ["(A) The event will proceed as scheduled despite weather.", "(B) The rally is indoors only.", "(C) Posters are waterproof.", "(D) He dislikes rainy weather."],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'Weather looks clear, no rain delay' ngụ ý sự kiện ngoài trời không bị hoãn. Kiến thức suy luận: 'No delay' chỉ tiến hành đúng giờ."
    },
    {
      id: 53,
      question: "Who is responsible for the sound system?",
      options: ["(A) Lisa", "(B) Ben", "(C) Tom", "(D) A volunteer"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Tom is handling sound system'. Kiến thức đọc hiểu: Phân công nhiệm vụ từ Lisa."
    },
    {
      id: 54,
      question: "What time does the rally start?",
      options: ["(A) 9:45 A.M.", "(B) 10:00 A.M.", "(C) Noon", "(D) 12:05 P.M."],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'starts at noon'. Kiến thức đọc hiểu: Thời gian từ tin nhắn đầu."
    },
    {
      id: 55,
      question: "What is Ben planning to bring?",
      options: ["(A) Food and drinks", "(B) Posters on renewable energy", "(C) Sign-up sheets", "(D) A microphone"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Bringing posters on renewable energy'. Kiến thức đọc hiểu: Đóng góp của Ben."
    },
    {
      id: 56,
      question: "What can be inferred about the previous event?",
      options: ["(A) It had poor attendance.", "(B) It attracted 200 people.", "(C) It was canceled due to rain.", "(D) It focused on transit issues."],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'last one had 200 people'. Kiến thức suy luận: Số lượng từ so sánh sự kiện trước."
    },
    {
      id: 57,
      question: "Why does Lisa mention the city permit?",
      options: ["(A) To complain about bureaucracy", "(B) To confirm the event is official", "(C) To request more volunteers", "(D) To change the location"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'City approved our permit' là cập nhật tích cực. Kiến thức suy luận: Mục đích trấn an về tính hợp pháp."
    },
    {
      id: 58,
      question: "What transportation suggestion does Lisa make?",
      options: ["(A) Drive separately", "(B) Use public transit", "(C) Walk from the office", "(D) Rent bikes"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Suggest public transit' do parking limited. Kiến thức đọc hiểu: Gợi ý từ cập nhật logistics."
    },
    {
      id: 59,
      question: "What does Tom report in his message?",
      options: ["(A) Low crowd turnout", "(B) Sound check is good and crowd building", "(C) Permit issues", "(D) Rain starting"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Sound check good. Crowd building'. Kiến thức đọc hiểu: Cập nhật hiện trường từ Tom."
    },
    {
      id: 60,
      question: "What does Ben express in his 11:35 message?",
      options: ["(A) Worry about parking", "(B) Enthusiasm for the cause", "(C) Request for more posters", "(D) Complaint about transit"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'See you soon—let's make noise for change!' thể hiện nhiệt huyết. Kiến thức suy luận: Cụm từ khích lệ cho mục tiêu xã hội."
    }
  ]
}
  }
};