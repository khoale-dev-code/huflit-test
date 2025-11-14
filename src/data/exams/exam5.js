export const EXAM5_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 5 (Công Nghệ & Kinh Doanh)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Tập trung vào chủ đề Công Nghệ & Kinh Doanh. Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Anna và Ben về công ty công nghệ. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Anna: Ben, have you heard about the new AI project our company is launching next quarter?\nBen: Yes, I attended the presentation yesterday. The development team has been working on it for over six months. They're using machine learning algorithms to optimize our customer service operations.\nAnna: That's impressive! I heard we're investing nearly $2 million in this initiative. The CEO believes it will increase our efficiency by at least 40%.\nBen: Absolutely. But we'll need extensive training for all staff members. The HR department is already preparing a comprehensive program that will start next month.\nAnna: Speaking of training, I'm concerned about the cybersecurity aspects. With all this new technology, we need to ensure our data protection measures are robust.\nBen: Good point. The IT security team has assured management that they've implemented multiple layers of protection, including advanced encryption and regular security audits.",
      questions: [
        {
          id: 1,
          options: [
            "For three months",
            "For over six months", 
            "For one year",
            "For two years"
          ],
          correct: 1,
          explanation: "Ben nói: 'The development team has been working on it for over six months.' (Đội phát triển đã làm việc trên dự án hơn sáu tháng)."
        },
        {
          id: 2,
          options: [
            "$1 million",
            "$2 million",
            "$3 million", 
            "$4 million"
          ],
          correct: 1,
          explanation: "Anna nói: 'I heard we're investing nearly $2 million in this initiative.' (Tôi nghe chúng ta đang đầu tư gần 2 triệu đô la cho sáng kiến này)."
        },
        {
          id: 3,
          options: [
            "20% efficiency increase",
            "30% efficiency increase", 
            "40% efficiency increase",
            "50% efficiency increase"
          ],
          correct: 2,
          explanation: "Anna nói: 'The CEO believes it will increase our efficiency by at least 40%.' (CEO tin rằng nó sẽ tăng hiệu suất ít nhất 40%)."
        },
        {
          id: 4,
          options: [
            "Next week",
            "Next month", 
            "In three months",
            "Next year"
          ],
          correct: 1,
          explanation: "Ben nói: 'The HR department is already preparing a comprehensive program that will start next month.' (Phòng nhân sự đang chuẩn bị chương trình toàn diện sẽ bắt đầu tháng tới)."
        },
        {
          id: 5,
          options: [
            "Customer satisfaction",
            "Cybersecurity aspects", 
            "Budget constraints",
            "Staff recruitment"
          ],
          correct: 1,
          explanation: "Anna nói: 'I'm concerned about the cybersecurity aspects.' (Tôi lo ngại về các khía cạnh an ninh mạng)."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài trong cuộc họp kinh doanh. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening", 
      script: "Manager: Good morning team. Let's start with the quarterly financial report. Sarah, could you begin?\nSarah: Thank you, Tom. Our revenue increased by 15% this quarter, primarily due to successful product launches in the Asian market. However, operating costs rose by 8% because of higher raw material prices.\nTom: Interesting. Mike, what's the marketing team's analysis of these numbers?\nMike: We've seen excellent response to our digital campaigns. Social media engagement is up 60%, and website traffic has grown by 45%. The new influencer partnerships are performing particularly well.\nSarah: That's encouraging. On the operational side, we've reduced production time by 20% through automation. But we're facing challenges with supply chain delays from our European suppliers.\nTom: Understood. Lisa, any updates from the R&D department?\nLisa: Yes, we're making good progress on the new eco-friendly product line. We expect to complete testing by the end of next month and begin production in Q3.\nTom: Excellent work everyone. Let's focus on addressing the supply chain issues in our next meeting.",
      questions: [
        {
          id: 6,
          question: "What was the revenue increase this quarter?",
          options: [
            "8%",
            "15%", 
            "20%",
            "45%"
          ],
          correct: 1,
          explanation: "Sarah nói: 'Our revenue increased by 15% this quarter.' (Doanh thu của chúng tôi tăng 15% trong quý này)."
        },
        {
          id: 7,
          question: "Why did operating costs increase?",
          options: [
            "Higher marketing expenses",
            "Increased staff salaries", 
            "Higher raw material prices",
            "New equipment purchases"
          ],
          correct: 2,
          explanation: "Sarah nói: 'Operating costs rose by 8% because of higher raw material prices.' (Chi phí vận hành tăng 8% do giá nguyên vật liệu cao hơn)."
        },
        {
          id: 8,
          question: "How much has social media engagement increased?",
          options: [
            "45%",
            "60%", 
            "75%",
            "90%"
          ],
          correct: 1,
          explanation: "Mike nói: 'Social media engagement is up 60%.' (Tương tác mạng xã hội tăng 60%)."
        },
        {
          id: 9,
          question: "What operational improvement was mentioned?",
          options: [
            "Reduced staff turnover",
            "Increased customer satisfaction", 
            "Reduced production time by 20%",
            "Improved product quality"
          ],
          correct: 2,
          explanation: "Sarah nói: 'We've reduced production time by 20% through automation.' (Chúng tôi đã giảm thời gian sản xuất 20% thông qua tự động hóa)."
        },
        {
          id: 10,
          question: "When does R&D expect to begin production of the new product line?",
          options: [
            "Next month",
            "Q2", 
            "Q3",
            "Next year"
          ],
          correct: 2,
          explanation: "Lisa nói: 'We expect to begin production in Q3.' (Chúng tôi dự kiến bắt đầu sản xuất vào quý 3)."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một bài thuyết trình về công nghệ blockchain. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Good afternoon, students. Today we're discussing blockchain technology and its business applications. Blockchain is essentially a decentralized digital ledger that records transactions across multiple computers. This technology offers three key benefits: enhanced security through cryptography, increased transparency as all participants can view transactions, and reduced costs by eliminating intermediaries. Major corporations like IBM and Walmart are already using blockchain for supply chain management. For instance, Walmart reduced food traceability time from seven days to just 2.2 seconds using blockchain. However, challenges remain, including scalability issues and regulatory uncertainty. As future business leaders, understanding this technology will be crucial for your careers. The potential applications extend beyond cryptocurrency to areas like smart contracts, voting systems, and digital identity verification.",
      questions: [
        {
          id: 11,
          question: "What is blockchain described as?",
          options: [
            "A centralized database",
            "A type of cryptocurrency", 
            "A decentralized digital ledger",
            "A financial intermediary"
          ],
          correct: 2,
          explanation: "Professor: 'Blockchain is essentially a decentralized digital ledger.' (Blockchain về cơ bản là một sổ cái kỹ thuật số phi tập trung)."
        },
        {
          id: 12,
          question: "How many key benefits of blockchain are mentioned?",
          options: [
            "Two",
            "Three", 
            "Four",
            "Five"
          ],
          correct: 1,
          explanation: "Professor: 'This technology offers three key benefits.' (Công nghệ này mang lại ba lợi ích chính)."
        },
        {
          id: 13,
          question: "Which company was mentioned as using blockchain for supply chain?",
          options: [
            "Amazon",
            "Microsoft", 
            "IBM",
            "Google"
          ],
          correct: 2,
          explanation: "Professor: 'Major corporations like IBM and Walmart are already using blockchain for supply chain management.' (Các tập đoàn lớn như IBM và Walmart đang sử dụng blockchain cho quản lý chuỗi cung ứng)."
        },
        {
          id: 14,
          question: "How much did Walmart reduce food traceability time?",
          options: [
            "From 7 days to 2.2 seconds", 
            "From 5 days to 1 hour",
            "From 3 days to 10 minutes",
            "From 10 days to 5 seconds"
          ],
          correct: 0,
          explanation: "Professor: 'Walmart reduced food traceability time from seven days to just 2.2 seconds using blockchain.' (Walmart giảm thời gian truy xuất nguồn gốc thực phẩm từ bảy ngày xuống chỉ 2.2 giây bằng blockchain)."
        },
        {
          id: 15,
          question: "What challenge was NOT mentioned about blockchain?",
          options: [
            "Scalability issues",
            "Regulatory uncertainty", 
            "High energy consumption",
            "Technical complexity"
          ],
          correct: 3,
          explanation: "Professor chỉ đề cập 'scalability issues and regulatory uncertainty' (vấn đề khả năng mở rộng và sự không chắc chắn về quy định), không nói đến 'technical complexity' (độ phức tạp kỹ thuật)."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một cuộc phỏng vấn kinh doanh. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Interviewer 1: Welcome to our final round interview, Emma. We're impressed with your background in digital marketing.\nEmma: Thank you, I'm excited to be here and learn more about the Growth Marketing Manager position.\nInterviewer 2: Let's start with your experience. Could you tell us about a successful campaign you led?\nEmma: Certainly. At my previous company, I developed a comprehensive social media strategy that increased our online engagement by 150% over six months. We focused on creating valuable content and building authentic relationships with our audience.\nInterviewer 1: That's impressive. How do you stay updated with the latest marketing trends?\nEmma: I regularly attend industry conferences, participate in webinars, and I'm part of several professional marketing groups. I also believe in continuous learning through online courses.\nInterviewer 2: What would be your approach to developing our brand presence in new international markets?\nEmma: I would begin with thorough market research to understand cultural nuances, then develop localized content strategies while maintaining our core brand identity. Building partnerships with local influencers would also be key.\nInterviewer 1: Excellent. One final question - how do you measure campaign success beyond basic metrics?\nEmma: Beyond clicks and conversions, I look at customer lifetime value, brand sentiment analysis, and the quality of engagement. Sustainable growth requires understanding the long-term impact on brand perception.",
      questions: [
        {
          id: 16,
          question: "What position is Emma applying for?",
          options: [
            "Digital Marketing Specialist",
            "Social Media Manager", 
            "Growth Marketing Manager",
            "Marketing Director"
          ],
          correct: 2,
          explanation: "Emma nói: 'Learn more about the Growth Marketing Manager position.' (Tìm hiểu thêm về vị trí Quản lý Marketing Tăng trưởng)."
        },
        {
          id: 17,
          question: "How much did Emma increase online engagement in her previous campaign?",
          options: [
            "100%",
            "125%", 
            "150%",
            "175%"
          ],
          correct: 2,
          explanation: "Emma nói: 'Increased our online engagement by 150% over six months.' (Tăng tương tác trực tuyến 150% trong sáu tháng)."
        },
        {
          id: 18,
          question: "How does Emma stay updated with marketing trends?",
          options: [
            "Only through online courses",
            "By reading books", 
            "Through conferences, webinars, and professional groups",
            "By following competitors"
          ],
          correct: 2,
          explanation: "Emma nói: 'I regularly attend industry conferences, participate in webinars, and I'm part of several professional marketing groups.' (Tôi thường xuyên tham dự hội nghị ngành, tham gia hội thảo trực tuyến, và là thành viên của nhiều nhóm marketing chuyên nghiệp)."
        },
        {
          id: 19,
          question: "What would be Emma's first step in international market expansion?",
          options: [
            "Hiring local staff",
            "Developing advertising campaigns", 
            "Conducting thorough market research",
            "Setting up local offices"
          ],
          correct: 2,
          explanation: "Emma nói: 'I would begin with thorough market research to understand cultural nuances.' (Tôi sẽ bắt đầu với nghiên cứu thị trường kỹ lưỡng để hiểu các sắc thái văn hóa)."
        },
        {
          id: 20,
          question: "What advanced metric does Emma consider for campaign success?",
          options: [
            "Number of social media followers",
            "Website traffic volume", 
            "Customer lifetime value",
            "Email open rates"
          ],
          correct: 2,
          explanation: "Emma nói: 'Beyond clicks and conversions, I look at customer lifetime value.' (Ngoài số nhấp chuột và chuyển đổi, tôi xem xét giá trị trọn đời của khách hàng)."
        }
      ]
    },
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu về chủ đề công nghệ và kinh doanh.",
      type: "reading",
      questions: [
        {
          id: 21,
          question: "The new software update significantly ________ the company's data processing capabilities.",
          options: ["enhance", "enhances", "enhancing", "enhancement"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'enhances' vì chủ ngữ 'update' số ít cần động từ chia ngôi thứ ba số ít. Kiến thức ngữ pháp: Chủ ngữ số ít (software update) + động từ thêm 's'."
        },
        {
          id: 22,
          question: "Despite the economic challenges, the startup managed to ________ its quarterly targets.",
          options: ["exceed", "exceeding", "exceeded", "exceeds"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'exceed' vì đây là động từ nguyên thể sau 'managed to'. Kiến thức ngữ pháp: Cấu trúc 'manage to + V nguyên thể'."
        },
        {
          id: 23,
          question: "The marketing team is developing a new strategy to ________ younger demographics.",
          options: ["target", "targets", "targeting", "targeted"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'target' vì đây là động từ nguyên thể sau 'to'. Kiến thức ngữ pháp: 'to + V nguyên thể' để chỉ mục đích."
        },
        {
          id: 24,
          question: "Our company's ________ to digital transformation has been remarkably successful.",
          options: ["adapt", "adapts", "adaptation", "adaptive"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'adaptation' vì cần danh từ sau tính từ sở hữu 'company's'. Kiến thức từ vựng: 'adaptation' (sự thích ứng) là danh từ phù hợp ngữ cảnh."
        },
        {
          id: 25,
          question: "The CEO emphasized the ________ of innovation in maintaining competitive advantage.",
          options: ["important", "importance", "importantly", "importing"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'importance' vì cần danh từ sau mạo từ 'the'. Kiến thức ngữ pháp: 'the + danh từ + of'."
        },
        {
          id: 26,
          question: "All employees are required to ________ the new cybersecurity protocols immediately.",
          options: ["implement", "implements", "implementing", "implementation"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'implement' vì đây là động từ nguyên thể sau 'to'. Kiến thức ngữ pháp: 'are required to + V nguyên thể'."
        },
        {
          id: 27,
          question: "The research and development department ________ made significant progress this year.",
          options: ["have", "has", "having", "to have"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'has' vì 'department' là chủ ngữ số ít. Kiến thức ngữ pháp: Danh từ tập thể xem như số ít cần động từ số ít."
        },
        {
          id: 28,
          question: "We need to analyze the data more ________ before making final decisions.",
          options: ["careful", "carefully", "carefulness", "caring"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'carefully' vì cần trạng từ bổ nghĩa cho động từ 'analyze'. Kiến thức ngữ pháp: Trạng từ bổ nghĩa cho động từ."
        },
        {
          id: 29,
          question: "The company's expansion into Asian markets ________ completed ahead of schedule.",
          options: ["was", "were", "been", "being"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'was' vì chủ ngữ 'expansion' số ít trong câu bị động. Kiến thức ngữ pháp: Chủ ngữ số ít + was + V3."
        },
        {
          id: 30,
          question: "Effective communication is ________ for successful project management.",
          options: ["essence", "essential", "essentially", "essentialize"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'essential' vì cần tính từ sau 'is'. Kiến thức từ vựng: 'essential' (thiết yếu) là tính từ phù hợp ngữ cảnh."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Business Email)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email về chiến lược kinh doanh.",
      type: "reading",
      text: `To: All Department Heads
From: David Chen, CEO
Subject: Q4 Strategic Initiatives and Digital Transformation Update

Dear Team,

I am writing to provide an update on our strategic initiatives for the fourth quarter and outline our progress in digital transformation. As we approach the final quarter of the year, it is crucial that we maintain our momentum and (31) focused on our key objectives.

Our digital transformation efforts have yielded significant results. We have successfully (32) our customer relationship management system, which has improved our response times by 40%. The new AI-powered analytics platform is providing valuable insights that help us make data-driven decisions more (33).

However, we must remain vigilant about cybersecurity. The IT department will be conducting mandatory security training for all employees next month. Please ensure your team members (34) this training seriously, as it is essential for protecting our company's sensitive information.

Looking ahead to Q4, our primary goals include:
- Increasing market share in the Southeast Asian region by 15%
- Launching three new eco-friendly product lines
- Improving customer satisfaction scores by 20 points

To achieve these targets, we need full cooperation and innovative thinking from every department. I am confident that with our team's expertise and dedication, we will (35) these ambitious goals.

Please schedule a meeting with your teams to discuss how these objectives align with your departmental plans. I look forward to hearing your innovative ideas and strategies.

Best regards,

David Chen
CEO`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "It is crucial that we maintain our momentum and (31) focused on our key objectives.",
          options: ["remain", "remains", "remaining", "remained"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'remain' vì đây là động từ nguyên thể trong cấu trúc song song với 'maintain'. Kiến thức ngữ pháp: Cấu trúc song song 'maintain... and remain...'."
        },
        {
          id: 32,
          type: "fill", 
          question: "(32) - Điền từ thích hợp",
          context: "We have successfully (32) our customer relationship management system...",
          options: ["implement", "implements", "implemented", "implementing"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'implemented' vì cần quá khứ phân từ trong thì hiện tại hoàn thành. Kiến thức ngữ pháp: 'have + V3' trong thì hiện tại hoàn thành."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp", 
          context: "...which helps us make data-driven decisions more (33).",
          options: ["efficient", "efficiently", "efficiency", "efficiencies"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'efficiently' vì cần trạng từ bổ nghĩa cho cụm động từ 'make decisions'. Kiến thức ngữ pháp: Trạng từ bổ nghĩa cho động từ."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "Please ensure your team members (34) this training seriously...",
          options: ["take", "takes", "taking", "took"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'take' vì chủ ngữ 'members' số nhiều cần động từ nguyên thể trong câu mệnh lệnh gián tiếp. Kiến thức ngữ pháp: 'ensure + (that) + S + V' với S số nhiều."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "I am confident that... we will (35) these ambitious goals.",
          options: ["achieve", "achieves", "achieving", "achieved"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'achieve' vì đây là động từ nguyên thể sau 'will'. Kiến thức ngữ pháp: 'will + V nguyên thể'."
        },
        {
          id: 36,
          type: "comprehension",
          question: "(36) - What is the main purpose of this email?",
          options: ["To announce employee layoffs", "To provide updates on strategic initiatives", "To introduce new team members", "To complain about poor performance"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email bắt đầu với 'provide an update on our strategic initiatives'. Kiến thức đọc hiểu: Xác định mục đích chính từ câu mở đầu."
        },
        {
          id: 37,
          type: "comprehension", 
          question: "(37) - How much has response time improved with the new system?",
          options: ["20%", "30%", "40%", "50%"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì email nói 'improved our response times by 40%'. Kiến thức đọc hiểu: Tìm thông tin số liệu cụ thể trong văn bản."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What training will be conducted next month?",
          options: ["Customer service training", "Sales techniques training", "Security training", "Leadership development training"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì email nói 'The IT department will be conducting mandatory security training'. Kiến thức đọc hiểu: Xác định loại hình đào tạo từ ngữ cảnh."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - What is the target for market share increase in Southeast Asia?",
          options: ["10%", "15%", "20%", "25%"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email nói 'Increasing market share... by 15%'. Kiến thức đọc hiểu: Tìm thông tin số liệu trong mục tiêu."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - Who is the sender of this email?",
          options: ["HR Manager", "IT Director", "CEO", "Marketing Head"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì email từ 'David Chen, CEO'. Kiến thức đọc hiểu: Xác định người gửi từ phần thông tin."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Business Report + Chart Analysis)",
      description: "10 câu hỏi - Đọc báo cáo kinh doanh và phân tích biểu đồ, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading", 
      text: `**Quarterly Business Performance Report - TechSolutions Inc.**

**Executive Summary**
TechSolutions Inc. demonstrated strong performance in Q3 2024, with total revenue reaching $45 million, representing a 22% increase compared to the same period last year. The company's strategic focus on cloud computing services and AI solutions has driven this growth, accounting for 65% of total revenue.

**Key Performance Indicators**
- Revenue: $45 million (22% increase YoY)
- Net Profit: $8.5 million (18% increase YoY) 
- Customer Acquisition: 15,000 new clients
- Customer Retention Rate: 92%
- Employee Satisfaction: 88%

**Department Performance**
The Research & Development department successfully launched two new AI products, contributing significantly to revenue growth. The Marketing department expanded our presence in European markets, resulting in a 35% increase in international sales. Operations improved efficiency by implementing automation, reducing costs by 12%.

**Challenges and Opportunities**
While supply chain disruptions affected hardware delivery times, our software services continued to perform exceptionally well. The growing demand for cybersecurity solutions presents a significant opportunity for Q4.

---

**Revenue Distribution by Product Category - Q3 2024**

Cloud Services: $18 million (40%)
AI Solutions: $11.25 million (25%)
Cybersecurity: $9 million (20%)
Hardware: $4.5 million (10%)
Consulting: $2.25 million (5%)

Total: $45 million (100%)`,
      questions: [
        {
          id: 41,
          question: "What was TechSolutions Inc.'s total revenue in Q3 2024?",
          options: ["$35 million", "$40 million", "$45 million", "$50 million"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì báo cáo nêu 'total revenue reaching $45 million'. Kiến thức đọc hiểu: Tìm thông tin số liệu chính xác từ báo cáo."
        },
        {
          id: 42,
          question: "Which product category generated the highest revenue?",
          options: ["AI Solutions", "Cloud Services", "Cybersecurity", "Hardware"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì biểu đồ cho thấy Cloud Services chiếm 40% ($18 million). Kiến thức đọc hiểu: So sánh các phần trăm trong biểu đồ phân phối."
        },
        {
          id: 43,
          question: "What percentage of total revenue came from AI solutions and cloud services combined?",
          options: ["50%", "60%", "65%", "70%"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì Cloud Services (40%) + AI Solutions (25%) = 65%. Kiến thức tính toán: Cộng các phần trăm từ biểu đồ."
        },
        {
          id: 44,
          question: "What was the customer retention rate?",
          options: ["85%", "88%", "90%", "92%"],
          correct: 3,
          explanation: "Đáp án đúng là (D) vì báo cáo nêu 'Customer Retention Rate: 92%'. Kiến thức đọc hiểu: Tìm thông tin số liệu từ chỉ số hiệu suất."
        },
        {
          id: 45,
          question: "Which department was mentioned for expanding European market presence?",
          options: ["Sales", "Marketing", "Operations", "R&D"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì báo cáo nói 'The Marketing department expanded our presence in European markets'. Kiến thức đọc hiểu: Xác định bộ phận từ mô tả thành tích."
        },
        {
          id: 46,
          question: "How much did operations reduce costs through automation?",
          options: ["8%", "10%", "12%", "15%"],
          correct: 2,
          explanation: "Đáp án đúng là (C) vì báo cáo nói 'reducing costs by 12%'. Kiến thức đọc hiểu: Tìm thông tin số liệu cụ thể về cải tiến."
        },
        {
          id: 47,
          question: "What challenge did the company face regarding hardware?",
          options: ["High production costs", "Supply chain disruptions", "Poor quality", "Low demand"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì báo cáo nói 'supply chain disruptions affected hardware delivery times'. Kiến thức đọc hiểu: Xác định thách thức từ phần vấn đề."
        },
        {
          id: 48,
          question: "What opportunity is mentioned for Q4?",
          options: ["Expanding to Asian markets", "Growing demand for cybersecurity", "Developing mobile applications", "Acquiring competitors"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì báo cáo nói 'The growing demand for cybersecurity solutions presents a significant opportunity'. Kiến thức đọc hiểu: Xác định cơ hội từ phần kết luận."
        },
        {
          id: 49,
          question: "How many new clients were acquired in Q3?",
          options: ["12,000", "15,000", "18,000", "20,000"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì báo cáo nêu 'Customer Acquisition: 15,000 new clients'. Kiến thức đọc hiểu: Tìm thông tin số liệu từ chỉ số hiệu suất."
        },
        {
          id: 50,
          question: "What was the net profit increase compared to last year?",
          options: ["15%", "18%", "20%", "22%"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì báo cáo nêu 'Net Profit: $8.5 million (18% increase YoY)'. Kiến thức đọc hiểu: Tìm thông tin phần trăm tăng trưởng."
        }
      ]
    },
    part8: {
  "title": "PART 8: Text Message Chain",
  "description": "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
  "type": "reading",
  "text": "Mr. Smith (11:59): Our software development meeting has been rescheduled to 2 PM tomorrow due to the client's request.\nMr. Johnson (12:01): Understood. Should I inform the QA team about this change?\nMr. Smith (12:03): Yes, please. Also, remind them about the deadline for the beta testing report.\nMr. Johnson (12:05): Will do. By the way, the new project manager from the Berlin office will be joining us virtually.\nMr. Smith (12:07): Excellent. Make sure the video conferencing equipment is properly set up in Conference Room B.\nMr. Johnson (12:10): I've already checked it this morning. Everything is working perfectly.\nMr. Smith (12:12): Great. Don't forget to share the updated agenda with all team members by end of day.\nMr. Johnson (12:15): I'll send it out right after I finish reviewing the budget projections.",
  "questions": [
    {
      "id": 51,
      "question": "Why was the meeting rescheduled?",
      "options": [
        "Due to room unavailability",
        "Because of the client's request",
        "Due to technical issues",
        "Because team members were sick"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là (B) vì Mr. Smith nói: 'due to the client's request' (do yêu cầu của khách hàng). Kiến thức đọc hiểu: Xác định lý do từ thông tin trực tiếp trong tin nhắn."
    },
    {
      "id": 52,
      "question": "What does Mr. Smith ask Mr. Johnson to remind the QA team about?",
      "options": [
        "The new project manager",
        "The budget projections",
        "The deadline for the beta testing report",
        "The video conferencing setup"
      ],
      "correct": 2,
      "explanation": "Đáp án đúng là (C) vì Mr. Smith nói: 'remind them about the deadline for the beta testing report' (nhắc họ về hạn chót cho báo cáo kiểm thử beta). Kiến thức đọc hiểu: Tìm thông tin cụ thể về nhiệm vụ được giao."
    },
    {
      "id": 53,
      "question": "Where is the new project manager from?",
      "options": [
        "London office",
        "New York office",
        "Berlin office",
        "Tokyo office"
      ],
      "correct": 2,
      "explanation": "Đáp án đúng là (C) vì Mr. Johnson nói: 'the new project manager from the Berlin office' (quản lý dự án mới từ văn phòng Berlin). Kiến thức đọc hiểu: Xác định địa điểm từ thông tin chi tiết."
    },
    {
      "id": 54,
      "question": "Which conference room will be used for the meeting?",
      "options": [
        "Conference Room C",
        "Conference Room B",
        "Main Conference Hall",
        "Conference Room A"
      ],
      "correct": 1,
      "explanation": "Đáp án đúng là (B) vì Mr. Smith nói: 'video conferencing equipment is properly set up in Conference Room B' (thiết bị hội nghị truyền hình được thiết lập đúng ở Phòng họp B). Kiến thức đọc hiểu: Xác định địa điểm cụ thể từ chỉ dẫn."
    },
    {
      "id": 55,
      "question": "What did Mr. Johnson check this morning?",
      "options": [
        "The budget projections",
        "The meeting agenda",
        "The video conferencing equipment",
        "The beta testing report"
      ],
      "correct": 2,
      "explanation": "Đáp án đúng là (C) vì Mr. Johnson nói: 'I've already checked it this morning. Everything is working perfectly.' (Tôi đã kiểm tra nó sáng nay. Mọi thứ đang hoạt động hoàn hảo.) - ám chỉ thiết bị hội nghị truyền hình. Kiến thức suy luận: Hiểu ngữ cảnh từ các tin nhắn trước đó."
    },
    {
      "id": 56,
      "question": "When should the updated agenda be shared with team members?",
      "options": [
        "Tomorrow morning",
        "Immediately",
        "By end of day",
        "By lunch time"
      ],
      "correct": 2,
      "explanation": "Đáp án đúng là (C) vì Mr. Smith nói: 'share the updated agenda with all team members by end of day' (chia sẻ chương trình làm việc đã cập nhật với tất cả thành viên nhóm trước cuối ngày). Kiến thức đọc hiểu: Xác định thời hạn từ chỉ dẫn cụ thể."
    },
    {
      "id": 57,
      "question": "What is Mr. Johnson doing before sending out the agenda?",
      "options": [
        "Setting up the conference room",
        "Preparing the beta report",
        "Contacting the QA team",
        "Reviewing the budget projections"
      ],
      "correct": 3,
      "explanation": "Đáp án đúng là (D) vì Mr. Johnson nói: 'I'll send it out right after I finish reviewing the budget projections' (Tôi sẽ gửi nó ngay sau khi tôi hoàn thành việc xem xét các dự báo ngân sách). Kiến thức đọc hiểu: Xác định hành động hiện tại từ kế hoạch công việc."
    },
    {
      "id": 58,
      "question": "How will the new project manager join the meeting?",
      "options": [
        "Will not join",
        "In person",
        "By telephone",
        "Virtually"
      ],
      "correct": 3,
      "explanation": "Đáp án đúng là (D) vì Mr. Johnson nói: 'will be joining us virtually' (sẽ tham gia với chúng ta một cách ảo). Kiến thức đọc hiểu: Hiểu từ ngữ chỉ phương thức tham gia."
    },
    {
      "id": 59,
      "question": "What was the original time of the meeting?",
      "options": [
        "Not mentioned in the messages",
        "12:00 PM",
        "2:00 PM",
        "11:59 AM"
      ],
      "correct": 0,
      "explanation": "Đáp án đúng là (A) vì tin nhắn chỉ đề cập thời gian mới (2 PM tomorrow) mà không nói thời gian gốc. Kiến thức suy luận: Nhận biết thông tin không được cung cấp."
    },
    {
      "id": 60,
      "question": "What is the main topic of this text conversation?",
      "options": [
        "Meeting preparation",
        "Budget planning",
        "Client presentation",
        "Team building activities"
      ],
      "correct": 0,
      "explanation": "Đáp án đúng là (A) vì toàn bộ cuộc trò chuyện xoay quanh việc chuẩn bị cho cuộc họp (lịch trình, thiết bị, thông báo). Kiến thức tổng hợp: Xác định chủ đề chính từ nội dung tổng thể."
    }
  ]
}
  }
};