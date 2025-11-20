export const EXAM4_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 4 (Chủ Đề: Môi Trường & Xã Hội)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết, tập trung vào các vấn đề môi trường và xã hội.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Mark và Sarah về chiến dịch bảo vệ môi trường. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Mark: Sarah, have you joined the community clean-up drive this weekend?\nSarah: Not yet, Mark. I'm organizing the recycling workshop instead—it's about reducing plastic waste in our neighborhood. We expect over 50 volunteers.\nMark: That's vital. Last year's event collected tons of litter from the riverbank. What's the focus this time?\nSarah: Educating on sustainable habits, like composting. I hope it raises awareness about climate change impacts locally.\nMark: Excellent. I'll promote it on social media; community engagement is key to social change.",
      questions: [
        {
          id: 1,
          options: [
            "She joined the clean-up drive.",
            "She is organizing the recycling workshop.",
            "She is avoiding events.",
            "She expects no volunteers."
          ],
          correct: 1,
          explanation: "Sarah nói: 'I'm organizing the recycling workshop instead.' (Tôi đang tổ chức hội thảo tái chế thay vì.) Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'am organizing' chỉ hành động đang diễn ra và kế hoạch tương lai; 'instead' là trạng từ chỉ sự thay thế, nối với mệnh đề trước bằng ngầm hiểu."
        },
        {
          id: 2,
          options: [
            "Reducing paper waste.",
            "Reducing plastic waste.",
            "Increasing litter.",
            "Ignoring neighborhood."
          ],
          correct: 1,
          explanation: "Sarah nói: 'It's about reducing plastic waste in our neighborhood.' (Nó về việc giảm chất thải nhựa ở khu phố chúng ta.) Kiến thức ngữ pháp: Cấu trúc 'be about + V-ing' chỉ mục đích hoặc nội dung; thì hiện tại đơn 'is' mô tả sự thật chung, với giới từ 'in + danh từ' chỉ vị trí xã hội."
        },
        {
          id: 3,
          options: [
            "Under 20 volunteers.",
            "Over 50 volunteers.",
            "No volunteers expected.",
            "Only 10 volunteers."
          ],
          correct: 1,
          explanation: "Sarah nói: 'We expect over 50 volunteers.' (Chúng tôi mong đợi hơn 50 tình nguyện viên.) Kiến thức ngữ pháp: Động từ 'expect + tân ngữ' ở thì hiện tại đơn chỉ kỳ vọng tương lai; 'over + số' chỉ vượt quá, với chủ ngữ số nhiều 'we' phù hợp động từ số nhiều ngầm."
        },
        {
          id: 4,
          options: [
            "Collected from parks.",
            "Collected tons of litter from the riverbank.",
            "Collected no litter.",
            "Collected paper only."
          ],
          correct: 1,
          explanation: "Mark nói: 'Last year's event collected tons of litter from the riverbank.' (Sự kiện năm ngoái thu gom hàng tấn rác từ bờ sông.) Kiến thức ngữ pháp: Thì quá khứ đơn 'collected' cho hành động hoàn tất; cụm 'tons of + danh từ không đếm được' chỉ lượng lớn, với 'from + nơi' chỉ nguồn gốc."
        },
        {
          id: 5,
          options: [
            "Educating on sustainable habits.",
            "Ignoring climate change.",
            "Focusing on travel.",
            "Reducing volunteers."
          ],
          correct: 0,
          explanation: "Sarah nói: 'Educating on sustainable habits, like composting.' (Giáo dục về thói quen bền vững, như ủ phân.) Kiến thức ngữ pháp: Gerund 'educating + on + danh từ' làm tân ngữ; ví dụ 'like + danh từ' chỉ minh họa, với thì hiện tại phân từ 'like' song song."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người tại hội nghị xã hội về bảo vệ môi trường. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At the environmental forum.\nClient 1: Good afternoon, Ben and Anna. Are you attending the panel on social equity in climate action?\nBen: We are, Client 1. It's crucial—marginalized communities suffer most from pollution.\nAnna: True. Last panel discussed renewable energy subsidies, but equity was overlooked. John, pass the agenda.\nClient 1: Here. Today's focus: community-led conservation. Volunteers from local NGOs will share success stories.\nBen: Inspiring. After this, we're joining the protest against deforestation.\nAnna: Yes, to amplify voices for indigenous rights.",
      questions: [
        {
          id: 6,
          question: "What is the panel about?",
          options: [
            "Economic growth",
            "Social equity in climate action",
            "Travel subsidies",
            "No panel"
          ],
          correct: 1,
          explanation: "Client 1 nói: 'The panel on social equity in climate action.' (Bảng điều khiển về công bằng xã hội trong hành động khí hậu.) Kiến thức ngữ pháp: Giới từ 'on + danh từ' chỉ chủ đề; thì hiện tại đơn 'is' cho lịch trình cố định, với cụm 'social equity in + lĩnh vực' chỉ phạm vi xã hội-môi trường."
        },
        {
          id: 7,
          question: "Who suffers most from pollution?",
          options: [
            "Wealthy areas",
            "Marginalized communities",
            "Tourists",
            "No one"
          ],
          correct: 1,
          explanation: "Ben nói: 'Marginalized communities suffer most from pollution.' (Cộng đồng bị thiệt thòi chịu ảnh hưởng nặng nề nhất từ ô nhiễm.) Kiến thức ngữ pháp: Thì hiện tại đơn 'suffer' cho sự thật chung; 'most from + danh từ' chỉ mức độ cao nhất, với tính từ 'marginalized' mô tả nhóm xã hội."
        },
        {
          id: 8,
          question: "What was overlooked in the last panel?",
          options: [
            "Renewable energy",
            "Equity",
            "Success stories",
            "Protests"
          ],
          correct: 1,
          explanation: "Anna nói: 'Equity was overlooked.' (Công bằng bị bỏ qua.) Kiến thức ngữ pháp: Thì quá khứ đơn bị động 'was overlooked' chỉ hành động bị bỏ sót; danh từ 'equity' làm chủ ngữ, nhấn mạnh vấn đề xã hội trong ngữ cảnh môi trường."
        },
        {
          id: 9,
          question: "Today's focus is on __________.",
          options: [
            "Economic subsidies",
            "Community-led conservation",
            "Deforestation promotion",
            "No focus"
          ],
          correct: 1,
          explanation: "Client 1 nói: 'Today's focus: community-led conservation.' (Trọng tâm hôm nay: bảo tồn do cộng đồng dẫn dắt.) Kiến thức ngữ pháp: Cấu trúc danh từ 'today's focus' với dấu hai chấm giới thiệu giải thích; tính từ ghép 'community-led' mô tả phương pháp xã hội."
        },
        {
          id: 10,
          question: "What are they joining after the panel?",
          options: [
            "A party",
            "The protest against deforestation",
            "A subsidy meeting",
            "Nothing"
          ],
          correct: 1,
          explanation: "Ben nói: 'We're joining the protest against deforestation.' (Chúng tôi tham gia biểu tình chống phá rừng.) Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'are joining' chỉ kế hoạch tương lai; giới từ 'against + danh từ' chỉ mục tiêu phản đối, với đại từ 'we're' rút gọn."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của diễn giả về trách nhiệm xã hội môi trường. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: Now, a talk on environmental justice. Society must address how pollution disproportionately affects low-income areas—data shows 70% higher exposure there. Corporate accountability is essential; fines for violations encourage compliance. If we ignore this, inequality worsens. Emma, our activist, led a campaign that planted 500 trees in urban spaces last year. Join us in advocating for policy changes to build resilient communities.",
      questions: [
        { 
          id: 11, 
          question: "Pollution affects __________ areas disproportionately.", 
          options: ["(A) high-income", "(B) low-income", "(C) rural", "(D) no areas"], 
          correct: 1,
          explanation: "Narrator: 'Pollution disproportionately affects low-income areas.' (Ô nhiễm ảnh hưởng không cân xứng đến khu vực thu nhập thấp.) - Kiến thức ngữ pháp: Trạng từ 'disproportionately' bổ nghĩa động từ 'affects'; thì hiện tại đơn 'affects' cho sự thật xã hội, với tính từ 'low-income' làm cụm danh từ."
        },
        { 
          id: 12, 
          question: "Data shows __________ higher exposure.", 
          options: ["(A) 30%", "(B) 70%", "(C) 90%", "(D) 10%"], 
          correct: 1,
          explanation: "Narrator: 'Data shows 70% higher exposure there.' (Dữ liệu cho thấy tiếp xúc cao hơn 70% ở đó.) - Kiến thức ngữ pháp: Cấu trúc 'show + số % + so sánh hơn + danh từ' chỉ mức độ; thì hiện tại đơn 'shows' cho dữ liệu chung, với 'higher' so sánh với ngầm hiểu."
        },
        { 
          id: 13, 
          question: "Corporate __________ is essential.", 
          options: ["(A) avoidance", "(B) accountability", "(C) expansion", "(D) fines"], 
          correct: 1,
          explanation: "Narrator: 'Corporate accountability is essential.' (Trách nhiệm doanh nghiệp là thiết yếu.) - Kiến thức ngữ pháp: Danh từ 'accountability' làm chủ ngữ; thì hiện tại đơn 'is' với tính từ 'essential' mô tả tính cần thiết xã hội-môi trường."
        },
        { 
          id: 14, 
          question: "Emma led a campaign that planted __________ trees.", 
          options: ["(A) 100", "(B) 500", "(C) 1000", "(D) none"], 
          correct: 1,
          explanation: "Narrator: 'Emma... led a campaign that planted 500 trees.' (Emma dẫn dắt chiến dịch trồng 500 cây.) - Kiến thức ngữ pháp: Mệnh đề quan hệ 'that + V quá khứ' chỉ hành động của campaign; thì quá khứ đơn 'planted' cho sự kiện hoàn tất."
        },
        { 
          id: 15, 
          question: "Join us in __________ for policy changes.", 
          options: ["(A) ignoring", "(B) advocating", "(C) worsening", "(D) building"], 
          correct: 1,
          explanation: "Narrator: 'Join us in advocating for policy changes.' (Tham gia chúng tôi vận động cho thay đổi chính sách.) - Kiến thức ngữ pháp: Giới từ 'in + V-ing' chỉ hoạt động; 'for + danh từ' chỉ mục tiêu, với thì hiện tại phân từ 'advocating' làm tân ngữ của 'join'."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn) giữa thành viên cộng đồng về vấn đề xã hội môi trường. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Older Woman: Hello, Lisa. Concerned about the new factory's emissions affecting our air quality?\nLisa: Very much, Older Woman. It's impacting vulnerable residents—asthma cases are rising. We need to petition local council.\nOlder Woman: Agreed. Last month, similar issue in the next town led to regulations. Gather signatures online.\nLisa: I'll start a social media drive. Equity demands we protect all, especially the elderly and children.\nOlder Woman: Wise. If ignored, social divides deepen. Let's meet tomorrow to draft the letter.",
      questions: [
        { 
          id: 16, 
          question: "The factory's emissions affect __________.", 
          options: ["(A) air quality", "(B) water only", "(C) soil", "(D) no quality"], 
          correct: 0,
          explanation: "Older Woman: 'The new factory's emissions affecting our air quality.' (Khí thải nhà máy mới ảnh hưởng chất lượng không khí.) - Kiến thức ngữ pháp: Phân từ hiện tại 'affecting' làm bổ ngữ; sở hữu 'factory's' chỉ nguồn, với thì hiện tại tiếp diễn ngầm chỉ tác động đang diễn ra."
        },
        { 
          id: 17, 
          question: "Asthma cases are __________.", 
          options: ["(A) decreasing", "(B) rising", "(C) stable", "(D) none"], 
          correct: 1,
          explanation: "Lisa: 'Asthma cases are rising.' (Các ca hen suyễn đang tăng.) - Kiến thức ngữ pháp: Thì hiện tại tiếp diễn 'are rising' chỉ xu hướng đang xảy ra; chủ ngữ số nhiều 'cases' phù hợp động từ số nhiều."
        },
        { 
          id: 18, 
          question: "What to do about the issue?",
          options: ["(A) Ignore it", "(B) Petition local council", "(C) Build factory", "(D) No action"],
          correct: 1,
          explanation: "Lisa: 'We need to petition local council.' (Chúng ta cần kiến nghị hội đồng địa phương.) - Kiến thức ngữ pháp: Cấu trúc 'need to + V nguyên thể' chỉ nhu cầu; thì hiện tại đơn 'need' cho hành động cần thiết xã hội."
        },
        { 
          id: 19, 
          question: "What happened last month in the next town?",
          options: ["(A) No regulations", "(B) Led to regulations", "(C) Increased emissions", "(D) Closed factory"],
          correct: 1,
          explanation: "Older Woman: 'Similar issue... led to regulations.' (Vấn đề tương tự dẫn đến quy định.) - Kiến thức ngữ pháp: Thì quá khứ đơn 'led' chỉ nguyên nhân-kết quả; mệnh đề quan hệ rút gọn bổ nghĩa 'issue'."
        },
        { 
          id: 20, 
          question: "Social media drive to __________.",
          options: ["(A) Gather signatures", "(B) Deepen divides", "(C) Protect elderly only", "(D) No drive"],
          correct: 0,
          explanation: "Lisa: 'Gather signatures online.' (Thu thập chữ ký trực tuyến.) - Kiến thức ngữ pháp: Động từ nguyên thể 'gather' sau 'I'll start a ... drive' chỉ mục đích; trạng từ 'online' chỉ phương tiện xã hội."
        }
      ]
    },
    // Reading Parts
  part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question:
        "Global warming poses significant threats to coastal communities, __________ rising sea levels and extreme weather events.",
      options: ["such as", "despite", "unless", "although"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'such as'. Cụm 'such as + danh từ' dùng để đưa ra ví dụ minh họa. Câu đang liệt kê các mối đe dọa (rising sea levels, extreme weather events). Các từ còn lại đều mang nghĩa đối lập hoặc điều kiện, không phù hợp."
    },
    {
      id: 22,
      question:
        "The nonprofit organization __________ volunteers to clean up polluted beaches every weekend.",
      options: ["rely on", "relies on", "relied on", "relying on"],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) 'relies on' vì chủ ngữ 'organization' là danh từ số ít → động từ phải chia ngôi thứ ba số ít. Thì hiện tại đơn dùng để mô tả hoạt động thường xuyên. 'Rely on' là cụm động từ chỉ sự phụ thuộc."
    },
    {
      id: 23,
      question:
        "Since implementing recycling programs, the city __________ reduced its waste by 25%.",
      options: ["have", "has", "had", "having"],
      correct: 1,
      explanation:
        "Đáp án đúng là (B) 'has'. Chủ ngữ 'city' là số ít nên dùng 'has'. Câu có 'since + V-ing' hàm ý hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại → dùng thì hiện tại hoàn thành 'has + V3'."
    },
    {
      id: 24,
      question:
        "Social media campaigns have raised awareness about environmental issues __________ engaging young audiences.",
      options: ["by", "with", "on", "at"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'by'. Cấu trúc 'by + V-ing' diễn tả cách thức thực hiện hành động. Ý câu: các chiến dịch mạng xã hội nâng cao nhận thức *bằng cách* thu hút giới trẻ. Các giới từ còn lại không mang nghĩa chỉ phương tiện."
    },
    {
      id: 25,
      question:
        "The report highlights the need for immediate action to __________ biodiversity loss.",
      options: ["prevent", "prevents", "prevented", "preventing"],
      correct: 0,
      explanation:
        "Đáp án là (A) 'prevent'. Sau 'to' là động từ nguyên thể không chia. Câu mang nghĩa: cần hành động để ngăn chặn sự suy giảm đa dạng sinh học."
    },
    {
      id: 26,
      question:
        "Community gardens not only provide fresh produce but also foster social __________ among neighbors.",
      options: ["interact", "interaction", "interactive", "interacting"],
      correct: 1,
      explanation:
        "Đáp án là (B) 'interaction'. Sau tính từ 'social' cần một danh từ. Cụm 'social interaction' (sự tương tác xã hội) là một collocation chuẩn. Các từ còn lại không đúng dạng từ."
    },
    {
      id: 27,
      question:
        "Unless governments enforce stricter regulations, deforestation will continue __________ an alarming rate.",
      options: ["at", "in", "on", "with"],
      correct: 0,
      explanation:
        "Đáp án đúng là (A) 'at'. Cụm cố định 'at + rate' (ở mức độ/tốc độ). 'At an alarming rate' là một collocation rất phổ biến trong môi trường – dễ gây nhầm nếu không quen. 'Unless' mang nghĩa 'trừ khi', mở đầu mệnh đề điều kiện."
    },
    {
      id: 28,
      question:
        "Activists are __________ petitions to urge policymakers to address climate inequality.",
      options: ["circulate", "circulates", "circulated", "circulating"],
      correct: 3,
      explanation:
        "Đáp án đúng là (D) 'circulating'. Dạng tiếp diễn 'are + V-ing' diễn tả hành động đang diễn ra trong hiện tại. Các nhà hoạt động đang thu thập/chia sẻ đơn kiến nghị."
    },
    {
      id: 29,
      question:
        "The sustainable development goals aim __________ eradicating poverty while protecting the environment.",
      options: ["at", "for", "in", "on"],
      correct: 0,
      explanation:
        "Đáp án là (A) 'at'. Cấu trúc 'aim at + V-ing' diễn tả mục tiêu của một hành động/chính sách. 'Eradicating poverty' là danh động từ V-ing đóng vai trò tân ngữ."
    },
    {
      id: 30,
      question:
        "Renewable energy sources, __________ solar and wind power, are key to mitigating climate change.",
      options: ["such as", "despite", "unless", "although"],
      correct: 0,
      explanation:
        "Đáp án là (A) 'such as'. Câu dùng để *liệt kê ví dụ* cho 'renewable energy sources'. Dấu phẩy trước 'such as' giúp tách phần ví dụ (solar, wind power) khỏi mệnh đề chính."
    }
  ]
},
        part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email về chiến dịch môi trường xã hội. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: Community Members
    From: Emma Rodriguez, Environmental Advocate  
    Subject: Join Our Urban Greening Initiative


    Dear Neighbors,

    We are launching the Urban Greening Initiative to combat climate change effects in our city. This community-driven project (31) planting trees and creating green spaces in underserved areas, promoting both environmental health and social cohesion.

    The kickoff event is on April 10 at Central Park, starting at 10 a.m. (34) volunteers will receive tools and guidance; no experience necessary. By participating, you'll help (32) air quality and provide shade for vulnerable populations.

    Future activities include workshops (35) sustainable gardening on April 17 and a neighborhood forum on eco-justice on April 24. These sessions aim to (33) residents with knowledge for long-term impact.

    To sign up, visit our website or reply to this email. Together, we can build a greener, more equitable society.

    Best regards,

    Emma Rodriguez
    Environmental Advocate
    GreenCity Network`,
      "questions": [
    {
      "id": 31,
      "type": "fill",
      "question": "(31) - Điền từ thích hợp",
      "context": "This community-driven project (31) planting trees...",
      "options": [
        "involves",
        "avoids",
        "delays",
        "ignores"
      ],
      "correct": 0,
      "explanation": "Đáp án đúng là **(A) 'involves'** (bao gồm). Ngữ pháp yêu cầu một động từ ở thì Hiện tại Đơn (vì chủ ngữ là 'project' số ít) và phải đi với Gerund ('planting'). 'Involves' có nghĩa là 'bao gồm, có liên quan', rất phù hợp để mô tả các hoạt động của một dự án. Các từ khác ('avoids' - tránh, 'delays' - trì hoãn, 'ignores' - phớt lờ) mang nghĩa tiêu cực và không hợp ngữ cảnh."
    },
    {
      "id": 32,
      "type": "fill",
      "question": "(32) - Điền từ thích hợp",
      "context": "By participating, you'll help (32) air quality...",
      "options": [
        "worsen",
        "improve",
        "maintain",
        "ignore"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) 'improve'** (cải thiện). Mục tiêu của việc trồng cây và tạo không gian xanh là **cải thiện** chất lượng không khí ('air quality'). Cấu trúc 'help + V nguyên mẫu' (giúp làm gì) được sử dụng. Các từ khác ('worsen' - làm tồi tệ hơn, 'ignore' - phớt lờ) trái nghĩa, còn 'maintain' (duy trì) không thể hiện tác động tích cực của việc trồng cây."
    },
    {
      "id": 33,
      "type": "fill",
      "question": "(33) - Điền từ thích hợp",
      "context": "These sessions aim to (33) residents with knowledge...",
      "options": [
        "deprive",
        "burden",
        "equip",
        "confuse"
      ],
      "correct": 2,
      "explanation": "Đáp án đúng là **(C) 'equip'** (trang bị). Cấu trúc **'equip somebody with something'** (trang bị cho ai cái gì) là một collocation (kết hợp từ) cố định. Ở đây, mục tiêu là trang bị cho cư dân ('residents') **kiến thức** ('knowledge') để tạo ra tác động lâu dài. Các từ còn lại ('deprive' - tước đoạt, 'burden' - gây gánh nặng, 'confuse' - gây bối rối) đều mang nghĩa tiêu cực và sai cấu trúc."
    },
    {
      "id": 34,
      "type": "fill",
      "question": "(34) - Điền từ thích hợp",
      "context": "The kickoff event is on April 10 at Central Park, starting at 10 a.m. (34) volunteers will receive tools...",
      "options": [
        "however",
        "besides",
        "therefore",
        "and"
      ],
      "correct": 3,
      "explanation": "Đáp án đúng là **(D) 'and'** (và). Trong ngữ cảnh này, dấu chấm câu (period) trước khoảng trống đã được sử dụng như một phép nối đơn giản để giới thiệu mệnh đề tiếp theo, cung cấp thêm thông tin về sự kiện. Liên từ **'And'** là lựa chọn tự nhiên và trung lập nhất để thêm thông tin rằng 'tình nguyện viên sẽ nhận dụng cụ'. Các từ nối khác ('however' - tuy nhiên, 'therefore' - do đó) chỉ mối quan hệ tương phản hoặc nguyên nhân-kết quả và không phù hợp."
    },
    {
      "id": 35,
      "type": "fill",
      "question": "(35) - Điền từ thích hợp",
      "context": "Future activities include workshops (35) sustainable gardening...",
      "options": [
        "at",
        "with",
        "on",
        "for"
      ],
      "correct": 2,
      "explanation": "Đáp án đúng là **(C) 'on'** (về, về chủ đề). Giới từ **'on'** thường được dùng để chỉ **chủ đề** của một buổi hội thảo, bài giảng, hoặc cuộc thảo luận. 'Workshops **on** sustainable gardening' có nghĩa là 'các buổi hội thảo về chủ đề làm vườn bền vững'."
    },
    {
      "id": 36,
      "type": "comprehension",
      "question": "(36) - The initiative focuses on __________.",
      "options": [
        "Planting trees and green spaces",
        "Building factories",
        "Reducing volunteers",
        "No focus"
      ],
      "correct": 0,
      "explanation": "Đáp án đúng là **(A) Planting trees and green spaces**. Câu đầu tiên của đoạn 2 nêu rõ: 'This community-driven project involves **planting trees and creating green spaces** in underserved areas...'"
    },
    {
      "id": 37,
      "type": "comprehension",
      "question": "(37) - When is the kickoff event?",
      "options": [
        "March 10",
        "April 10",
        "May 10",
        "Not specified"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) April 10**. Câu đầu tiên của đoạn 3 thông báo: 'The kickoff event is **on April 10** at Central Park...'"
    },
    {
      "id": 38,
      "type": "comprehension",
      "question": "(38) - What is required for volunteers?",
      "options": [
        "Experience",
        "Tools and guidance",
        "Payment",
        "Nothing"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Tools and guidance**. Đoạn 3 nói: 'volunteers will **receive tools and guidance; no experience necessary**.' Điều này ngụ ý rằng họ cần nhận công cụ và hướng dẫn (chứ không phải tự mang theo) và không cần kinh nghiệm."
    },
    {
      "id": 39,
      "type": "comprehension",
      "question": "(39) - What is the workshop on April 17?",
      "options": [
        "Eco-justice",
        "Sustainable gardening",
        "Air quality",
        "Tree planting"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Sustainable gardening**. Đoạn 4 liệt kê: 'Future activities include workshops **on sustainable gardening on April 17**...'"
    },
    {
      "id": 40,
      "type": "comprehension",
      "question": "(40) - How to sign up?",
      "options": [
        "In person only",
        "Visit website or reply email",
        "No signup",
        "By phone"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Visit website or reply email**. Câu cuối cùng của đoạn 4 hướng dẫn: 'To sign up, **visit our website or reply to this email**.'"
    }
  ]
},
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo chiến dịch xã hội và email tham gia, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**EcoJustice Network Advertisement**

  Fight for a Fairer Planet: Join Our Advocacy Campaign

  EcoJustice Network empowers communities to tackle environmental racism and inequality. Through petitions, protests, and policy advocacy, we ensure voices from affected areas are heard.

  **Our Impact:**
  1. **Policy Wins** – Successfully lobbied for clean air standards in 5 cities.

  2. **Community Training** – Free workshops on legal rights and organizing.

  3. **Youth Engagement** – Programs for students to lead local initiatives.

  Donate or volunteer at ecojustice.org. Your support drives systemic change!

  ---

  **Email Message**

  **To:** info@ecojustice.org
  **From:** john.miller@communityaid.org
  **Date:** May 5
  **Subject:** Interest in Volunteering

  Dear EcoJustice Team,

  I read your ad in the Green Living magazine and work as a social worker in a low-income neighborhood hit hard by industrial pollution. I'd like to volunteer for your community training workshops to empower residents. Do you have openings for facilitators? I'm available weekends and can commit 10 hours monthly. Also, interested in youth programs for my after-school group.

  Please advise on next steps. Looking forward to contributing.

  Sincerely,
  John Miller
  Social Worker, Community Aid
  713-555-2345
  456 Equity St, Houston, TX 77002`,
     "questions": [
    {
      "id": 41,
      "question": "What does the advertisement focus on?",
      "options": [
        "Economic growth",
        "Environmental racism and inequality",
        "Travel advocacy",
        "No focus"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Environmental racism and inequality**. Câu đầu tiên trong nội dung quảng cáo nêu rõ mục tiêu: 'EcoJustice Network empowers communities to tackle **environmental racism and inequality**.' (Mạng lưới EcoJustice trao quyền cho cộng đồng để giải quyết vấn nạn phân biệt chủng tộc và bất bình đẳng môi trường)."
    },
    {
      "id": 42,
      "question": "How did Mr. Miller learn about EcoJustice?",
      "options": [
        "From a friend",
        "From Green Living magazine",
        "From TV",
        "From email"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) From Green Living magazine**. Trong email, John Miller nói: 'I read your ad in the **Green Living magazine**'. Đây là thông tin quan trọng nối giữa hai văn bản (ad và email)."
    },
    {
      "id": 43,
      "question": "What is Mr. Miller's job?",
      "options": [
        "Lawyer",
        "Social worker",
        "Teacher",
        "Doctor"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Social worker**. Thông tin được tìm thấy trong phần mở đầu thư ('work as a **social worker**') và phần chữ ký ('Social Worker, Community Aid')."
    },
    {
      "id": 44,
      "question": "What does Mr. Miller want to volunteer for?",
      "options": [
        "Donations only",
        "Community training workshops",
        "Policy lobbying",
        "Youth protests"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Community training workshops**. John Miller viết: 'I'd like to volunteer for your **community training workshops** to empower residents.' (Tôi muốn tình nguyện tham gia hội thảo đào tạo cộng đồng của các bạn...). Mặc dù EcoJustice làm nhiều việc, đây là yêu cầu tình nguyện cụ thể của anh ấy."
    },
    {
      "id": 45,
      "question": "What is Mr. Miller's neighborhood affected by?",
      "options": [
        "Clean air",
        "Industrial pollution",
        "Green spaces",
        "No issues"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Industrial pollution**. John Miller mô tả khu vực mình làm việc là: 'a low-income neighborhood **hit hard by industrial pollution**.' (một khu thu nhập thấp bị ảnh hưởng nặng nề bởi ô nhiễm công nghiệp)."
    },
    {
      "id": 46,
      "question": "How many hours can Mr. Miller commit monthly?",
      "options": [
        "5 hours",
        "10 hours",
        "20 hours",
        "Full-time"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) 10 hours**. John Miller cam kết thời gian: 'I can **commit 10 hours monthly**.'"
    },
    {
      "id": 47,
      "question": "When is Mr. Miller available?",
      "options": [
        "Weekdays",
        "Weekends",
        "Evenings only",
        "Not available"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Weekends**. Anh ấy nói: 'I'm **available weekends**'."
    },
    {
      "id": 48,
      "question": "What else interests Mr. Miller?",
      "options": [
        "Donating money",
        "Youth programs",
        "Legal training only",
        "No other"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Youth programs**. Sau khi đề cập đến hội thảo, anh ấy nói thêm: 'Also, interested in **youth programs** for my after-school group.'."
    },
    {
      "id": 49,
      "question": "What has EcoJustice achieved?",
      "options": [
        "No wins",
        "Policy wins in 5 cities",
        "Closed factories",
        "Reduced donations"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Policy wins in 5 cities**. Phần 'Our Impact' trong quảng cáo liệt kê thành tích số 1 là: 'Successfully lobbied for clean air standards in **5 cities**' (Vận động thành công tiêu chuẩn không khí sạch ở 5 thành phố)."
    },
    {
      "id": 50,
      "question": "How to get involved per the ad?",
      "options": [
        "Email only",
        "Donate or volunteer at ecojustice.org",
        "In person",
        "No way"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Donate or volunteer at ecojustice.org**. Phần cuối của quảng cáo là lời kêu gọi hành động: 'Donate or **volunteer at ecojustice.org**.' (Quyên góp hoặc tình nguyện tại ecojustice.org)."
    }
  ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn về tổ chức sự kiện môi trường xã hội, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Tom (10:05): Hey Doctor Chen, ready for the eco-forum setup? Need more banners?
  Doctor Chen (10:10): Yes, Tom. Focus on diversity themes—equity in sustainability.
  Tom (10:15): Got it. Also, youth group wants a slot for their anti-plastic talk.
  Doctor Chen (10:20): Approve. Schedule after lunch. Promote on community board.
  Tom (15:30): Setup done. Attendance looks high—over 100 RSVPs!
  Doctor Chen (15:35): Excellent. Let's ensure inclusive discussions for all voices.`,
      "questions": [
    {
      "id": 51,
      "question": "What is the event?",
      "options": [
        "Party",
        "Eco-forum",
        "Wedding",
        "No event"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Eco-forum**. Tom hỏi: 'ready for the **eco-forum setup**?' (sẵn sàng cho việc thiết lập diễn đàn sinh thái chưa?). Đây là từ khóa xác định loại sự kiện."
    },
    {
      "id": 52,
      "question": "What themes to focus on?",
      "options": [
        "Profit",
        "Diversity—equity in sustainability",
        "Sports",
        "Food"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Diversity—equity in sustainability**. Doctor Chen hướng dẫn: 'Focus on **diversity themes—equity in sustainability**.' (Tập trung vào chủ đề đa dạng—công bằng trong bền vững). Đây là chỉ đạo về nội dung."
    },
    {
      "id": 53,
      "question": "What does the youth group want?",
      "options": [
        "Banners",
        "A slot for anti-plastic talk",
        "Lunch",
        "No slot"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) A slot for anti-plastic talk**. Tom thông báo: 'youth group wants a **slot for their anti-plastic talk**.' ('slot' ở đây là 'khe thời gian')."
    },
    {
      "id": 54,
      "question": "When to schedule the talk?",
      "options": [
        "Morning",
        "After lunch",
        "Evening",
        "No schedule"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) After lunch**. Doctor Chen trả lời yêu cầu của Tom: 'Schedule **after lunch**.' (Lập lịch sau bữa trưa)."
    },
    {
      "id": 55,
      "question": "Where to promote?",
      "options": [
        "TV",
        "Community board",
        "Radio",
        "No promotion"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Community board**. Doctor Chen chỉ thị: 'Promote on **community board**.' (Quảng bá trên bảng cộng đồng)."
    },
    {
      "id": 56,
      "question": "What is done by 15:30?",
      "options": [
        "Nothing",
        "Setup done",
        "Talk started",
        "Banners removed"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Setup done**. Tom gửi cập nhật vào 15:30: '**Setup done**.' (Thiết lập đã hoàn tất)."
    },
    {
      "id": 57,
      "question": "How many RSVPs?",
      "options": [
        "Under 50",
        "Over 100",
        "Exactly 100",
        "None"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Over 100**. Tom báo cáo: 'Attendance looks high—**over 100 RSVPs**!' (Hơn 100 người đã đăng ký xác nhận tham dự)."
    },
    {
      "id": 58,
      "question": "What to ensure in discussions?",
      "options": [
        "Exclusion",
        "Inclusive for all voices",
        "Short talks",
        "No discussions"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Inclusive for all voices**. Doctor Chen dặn dò: 'Let's ensure **inclusive discussions for all voices**.' (Hãy đảm bảo các cuộc thảo luận bao quát cho mọi tiếng nói). Đây là mục tiêu quan trọng về mặt công bằng xã hội."
    },
    {
      "id": 59,
      "question": "What is the response to setup?",
      "options": [
        "Poor",
        "Excellent",
        "Delayed",
        "Canceled"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Excellent**. Khi Tom báo cáo setup đã xong và có nhiều RSVP, Doctor Chen phản hồi: '**Excellent**.' (Tuyệt vời), thể hiện sự hài lòng với tiến độ."
    },
    {
      "id": 60,
      "question": "What does the youth talk address?",
      "options": [
        "Pro-plastic",
        "Anti-plastic",
        "Banners",
        "Lunch"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là **(B) Anti-plastic**. Tom đề cập đến: 'slot for their **anti-plastic talk**.' (khe thời gian cho bài nói chống nhựa)."
    }
  ]
    }
  }
};