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
          question: "Global warming poses significant threats to coastal communities, __________ rising sea levels and extreme weather events.",
          options: ["such as", "despite", "unless", "although"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'such as' vì chỉ ví dụ (e.g.). Kiến thức ngữ pháp: Cụm 'such as + danh từ' liệt kê ví dụ; 'despite/unless/although' chỉ nhượng bộ/điều kiện, không phù hợp ngữ cảnh môi trường."
        },
        {
          id: 22,
          question: "The nonprofit organization __________ volunteers to clean up polluted beaches every weekend.",
          options: ["rely on", "relies on", "relied on", "relying on"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'relies on' vì chủ ngữ số ít 'organization' yêu cầu ngôi thứ ba. Kiến thức ngữ pháp: Thì hiện tại đơn 'relies' cho thói quen xã hội; phrasal verb 'rely on + danh từ' chỉ phụ thuộc."
        },
        {
          id: 23,
          question: "Since implementing recycling programs, the city __________ reduced its waste by 25%.",
          options: ["have", "has", "had", "having"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'has' vì chủ ngữ số ít 'city'. Kiến thức ngữ pháp: Hiện tại hoàn thành 'has + V3' với 'since + mốc' chỉ thay đổi từ quá khứ đến nay; 'have' (số nhiều), 'had' (quá khứ), 'having' (V-ing) không khớp."
        },
        {
          id: 24,
          question: "Social media campaigns have raised awareness about environmental issues __________ engaging young audiences.",
          options: ["by", "with", "on", "at"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'by' vì chỉ phương tiện. Kiến thức ngữ pháp: 'By + V-ing' chỉ cách thức; 'with/on/at' không phù hợp với 'engaging' làm gerund."
        },
        {
          id: 25,
          question: "The report highlights the need for immediate action to __________ biodiversity loss.",
          options: ["prevent", "prevents", "prevented", "preventing"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'prevent' vì nguyên thể sau 'to'. Kiến thức ngữ pháp: 'To + V nguyên thể' chỉ mục đích sau 'need for'; thì tương lai ngầm."
        },
        {
          id: 26,
          question: "Community gardens not only provide fresh produce but also foster social __________ among neighbors.",
          options: ["interact", "interaction", "interactive", "interacting"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'interaction' vì danh từ. Kiến thức ngữ pháp: Danh từ 'interaction' sau 'social'; 'not only... but also' nối hai mệnh đề song song."
        },
        {
          id: 27,
          question: "Unless governments enforce stricter regulations, deforestation will continue __________ an alarming rate.",
          options: ["at", "in", "on", "with"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'at' vì 'at + danh từ tốc độ'. Kiến thức ngữ pháp: 'Unless + clause' chỉ điều kiện; 'at an alarming rate' là cụm chuẩn."
        },
        {
          id: 28,
          question: "Activists are __________ petitions to urge policymakers to address climate inequality.",
          options: ["circulate", "circulates", "circulated", "circulating"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'circulating' vì tiếp diễn. Kiến thức ngữ pháp: Hiện tại tiếp diễn 'are + V-ing' chỉ hành động đang diễn ra xã hội."
        },
        {
          id: 29,
          question: "The sustainable development goals aim __________ eradicating poverty while protecting the environment.",
          options: ["at", "for", "in", "on"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'at' vì 'aim at + V-ing'. Kiến thức ngữ pháp: 'Aim at + gerund' chỉ mục tiêu; 'while + clause' chỉ đồng thời."
        },
        {
          id: 30,
          question: "Renewable energy sources, __________ solar and wind power, are key to mitigating climate change.",
          options: ["such as", "despite", "unless", "although"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'such as' vì ví dụ. Kiến thức ngữ pháp: 'Such as + danh từ' liệt kê; mệnh đề chính sau dấu phẩy."
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
  questions: [
    {
      id: 31,
      type: "fill",
      question: "(31) - Điền từ thích hợp",
      context: "This community-driven project (31) planting trees...",
      options: ["involves", "avoids", "delays", "ignores"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'involves' vì nghĩa 'bao gồm'. Kiến thức ngữ pháp: Động từ 'involves + V-ing' chỉ thành phần; thì hiện tại đơn cho mô tả dự án."
    },
    {
      id: 32,
      type: "fill",
      question: "(32) - Điền từ thích hợp",
      context: "By participating, you'll help (32) air quality...",
      options: ["worsen", "improve", "maintain", "ignore"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'improve' vì nghĩa 'cải thiện'. Kiến thức ngữ pháp: 'Help + V nguyên thể' chỉ hỗ trợ; 'by + V-ing' chỉ phương tiện xã hội-môi trường."
    },
    {
      id: 33,
      type: "fill",
      question: "(33) - Điền từ thích hợp",
      context: "These sessions aim to (33) residents with knowledge...",
      options: ["deprive", "burden", "equip", "confuse"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'equip' vì nghĩa 'trang bị'. Kiến thức ngữ pháp: 'Equip + tân ngữ + with + danh từ' chỉ cung cấp; thì hiện tại đơn cho mục tiêu."
    },
    {
      id: 34,
      type: "fill",
      question: "(34) - Điền từ thích hợp",
      context: "The kickoff event is on April 10 at Central Park, starting at 10 a.m. (34) volunteers will receive tools...",
      options: ["however", "besides", "therefore", "and"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'and' vì nối thông tin. Kiến thức ngữ pháp: Liên từ 'and' nối mệnh đề thời gian; phù hợp mô tả sự kiện."
    },
    {
      id: 35,
      type: "fill",
      question: "(35) - Điền từ thích hợp",
      context: "Future activities include workshops (35) sustainable gardening...",
      options: ["at", "with", "on", "for"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'on' vì chủ đề. Kiến thức ngữ pháp: 'On + danh từ' chỉ nội dung hội thảo; 'include + danh từ' liệt kê."
    },
    {
      id: 36,
      type: "comprehension",
      question: "(36) - The initiative focuses on __________.",
      options: ["Planting trees and green spaces", "Building factories", "Reducing volunteers", "No focus"],
      correct: 0,
      explanation: "Đáp án đúng là (A) vì 'planting trees and creating green spaces' (trồng cây và tạo không gian xanh). Kiến thức đọc hiểu: Mục tiêu từ phần mở đầu."
    },
    {
      id: 37,
      type: "comprehension",
      question: "(37) - When is the kickoff event?",
      options: ["March 10", "April 10", "May 10", "Not specified"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'on April 10' (ngày 10/4). Kiến thức đọc hiểu: Ngày từ lịch sự kiện."
    },
    {
      id: 38,
      type: "comprehension",
      question: "(38) - What is required for volunteers?",
      options: ["Experience", "Tools and guidance", "Payment", "Nothing"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'receive tools and guidance; no experience necessary' (nhận công cụ và hướng dẫn; không cần kinh nghiệm). Kiến thức đọc hiểu: Hỗ trợ từ mô tả."
    },
    {
      id: 39,
      type: "comprehension",
      question: "(39) - What is the workshop on April 17?",
      options: ["Eco-justice", "Sustainable gardening", "Air quality", "Tree planting"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'workshops on sustainable gardening on April 17' (hội thảo về làm vườn bền vững ngày 17/4). Kiến thức đọc hiểu: Lịch hoạt động."
    },
    {
      id: 40,
      type: "comprehension",
      question: "(40) - How to sign up?",
      options: ["In person only", "Visit website or reply email", "No signup", "By phone"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'visit our website or reply to this email' (truy cập website hoặc trả lời email). Kiến thức đọc hiểu: Phương thức từ kết thúc."
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
      questions: [
        {
          id: 41,
          question: "What does the advertisement focus on?",
          options: ["Economic growth", "Environmental racism and inequality", "Travel advocacy", "No focus"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'tackle environmental racism and inequality' (xử lý phân biệt chủng tộc môi trường và bất bình đẳng). Kiến thức đọc hiểu: Mục tiêu từ tiêu đề."
        },
        {
          id: 42,
          question: "How did Mr. Miller learn about EcoJustice?",
          options: ["From a friend", "From Green Living magazine", "From TV", "From email"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I read your ad in the Green Living magazine' (Tôi đọc quảng cáo trên tạp chí Green Living). Kiến thức suy luận: Nguồn từ email."
        },
        {
          id: 43,
          question: "What is Mr. Miller's job?",
          options: ["Lawyer", "Social worker", "Teacher", "Doctor"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'a social worker' (nhân viên xã hội). Kiến thức đọc hiểu: Nghề từ chữ ký."
        },
        {
          id: 44,
          question: "What does Mr. Miller want to volunteer for?",
          options: ["Donations only", "Community training workshops", "Policy lobbying", "Youth protests"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'volunteer for your community training workshops' (tình nguyện cho hội thảo đào tạo cộng đồng). Kiến thức đọc hiểu: Yêu cầu cụ thể."
        },
        {
          id: 45,
          question: "What is Mr. Miller's neighborhood affected by?",
          options: ["Clean air", "Industrial pollution", "Green spaces", "No issues"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'low-income neighborhood hit hard by industrial pollution' (khu thu nhập thấp bị ảnh hưởng nặng bởi ô nhiễm công nghiệp). Kiến thức đọc hiểu: Ngữ cảnh cá nhân."
        },
        {
          id: 46,
          question: "How many hours can Mr. Miller commit monthly?",
          options: ["5 hours", "10 hours", "20 hours", "Full-time"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'commit 10 hours monthly' (cam kết 10 giờ hàng tháng). Kiến thức đọc hiểu: Thời gian từ cam kết."
        },
        {
          id: 47,
          question: "When is Mr. Miller available?",
          options: ["Weekdays", "Weekends", "Evenings only", "Not available"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'available weekends' (có sẵn cuối tuần). Kiến thức đọc hiểu: Lịch từ email."
        },
        {
          id: 48,
          question: "What else interests Mr. Miller?",
          options: ["Donating money", "Youth programs", "Legal training only", "No other"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'interested in youth programs for my after-school group' (quan tâm chương trình thanh niên cho nhóm sau giờ học). Kiến thức đọc hiểu: Lợi ích bổ sung."
        },
        {
          id: 49,
          question: "What has EcoJustice achieved?",
          options: ["No wins", "Policy wins in 5 cities", "Closed factories", "Reduced donations"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Successfully lobbied for clean air standards in 5 cities' (vận động thành công tiêu chuẩn không khí sạch ở 5 thành phố). Kiến thức đọc hiểu: Tác động từ quảng cáo."
        },
        {
          id: 50,
          question: "How to get involved per the ad?",
          options: ["Email only", "Donate or volunteer at ecojustice.org", "In person", "No way"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Donate or volunteer at ecojustice.org' (quyên góp hoặc tình nguyện tại ecojustice.org). Kiến thức đọc hiểu: Lời kêu gọi hành động."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn về tổ chức sự kiện môi trường xã hội, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Tom (10:05): Hey Dr. Chen, ready for the eco-forum setup? Need more banners?
  Dr. Chen (10:10): Yes, Tom. Focus on diversity themes—equity in sustainability.
  Tom (10:15): Got it. Also, youth group wants a slot for their anti-plastic talk.
  Dr. Chen (10:20): Approve. Schedule after lunch. Promote on community board.
  Tom (15:30): Setup done. Attendance looks high—over 100 RSVPs!
  Dr. Chen (15:35): Excellent. Let's ensure inclusive discussions for all voices.`,
      questions: [
        {
          id: 51,
          question: "What is the event?",
          options: ["Party", "Eco-forum", "Wedding", "No event"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'eco-forum setup' (thiết lập diễn đàn sinh thái). Kiến thức suy luận: Chủ đề từ tin nhắn đầu."
        },
        {
          id: 52,
          question: "What themes to focus on?",
          options: ["Profit", "Diversity—equity in sustainability", "Sports", "Food"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Focus on diversity themes—equity in sustainability' (Tập trung chủ đề đa dạng—công bằng trong bền vững). Kiến thức đọc hiểu: Hướng dẫn thiết kế."
        },
        {
          id: 53,
          question: "What does the youth group want?",
          options: ["Banners", "A slot for anti-plastic talk", "Lunch", "No slot"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'youth group wants a slot for their anti-plastic talk' (nhóm thanh niên muốn khe thời gian cho bài nói chống nhựa). Kiến thức đọc hiểu: Yêu cầu bổ sung."
        },
        {
          id: 54,
          question: "When to schedule the talk?",
          options: ["Morning", "After lunch", "Evening", "No schedule"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Schedule after lunch' (Lập lịch sau bữa trưa). Kiến thức đọc hiểu: Thời gian từ phê duyệt."
        },
        {
          id: 55,
          question: "Where to promote?",
          options: ["TV", "Community board", "Radio", "No promotion"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Promote on community board' (Quảng bá trên bảng cộng đồng). Kiến thức đọc hiểu: Phương tiện xã hội."
        },
        {
          id: 56,
          question: "What is done by 15:30?",
          options: ["Nothing", "Setup done", "Talk started", "Banners removed"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Setup done' (Thiết lập hoàn tất). Kiến thức suy luận: Cập nhật tiến độ."
        },
        {
          id: 57,
          question: "How many RSVPs?",
          options: ["Under 50", "Over 100", "Exactly 100", "None"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Attendance looks high—over 100 RSVPs' (Sự tham dự cao—hơn 100 đăng ký). Kiến thức đọc hiểu: Số lượng từ báo cáo."
        },
        {
          id: 58,
          question: "What to ensure in discussions?",
          options: ["Exclusion", "Inclusive for all voices", "Short talks", "No discussions"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'ensure inclusive discussions for all voices' (đảm bảo thảo luận bao quát cho mọi tiếng nói). Kiến thức đọc hiểu: Mục tiêu cuối."
        },
        {
          id: 59,
          question: "What is the response to setup?",
          options: ["Poor", "Excellent", "Delayed", "Canceled"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Excellent' (Tuyệt vời). Kiến thức suy luận: Phản hồi tích cực."
        },
        {
          id: 60,
          question: "What does the youth talk address?",
          options: ["Pro-plastic", "Anti-plastic", "Banners", "Lunch"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'anti-plastic talk' (bài nói chống nhựa). Kiến thức đọc hiểu: Chủ đề từ yêu cầu."
        }
      ]
    }
  }
};