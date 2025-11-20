export const EXAM11_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 11 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài. Tích hợp 100 collocations phổ biến TOEIC (như 'make a decision', 'take advantage of', ...) và các điểm ngữ pháp: Present Perfect, Present Perfect Passive, Future Simple, Past Simple vs Present Perfect, Word Forms (Noun/Adjective/Adverb/Verb), Tính từ + Danh từ, Trạng từ + Động từ, Be + Adjective, Passive Voice với Past Participle, Relative Pronouns, Inverted Structure, Time/Contrast Conjunctions, Passive Voice, Gerund vs Infinitive (Preposition + V-ing, Verb + to V/V-ing), Conditional Sentences, Từ vựng theo ngữ cảnh, Subject-Verb Agreement, Articles (a/an/the).",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe đoạn hội thoại giữa Mark và Sarah về kế hoạch kinh doanh. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: "Mark: Sarah, we need to make a decision on the new project. Have you analyzed the data yet?\nSarah: Yes, I have conducted research and built relationships with potential partners who can help us expand markets. The market has been penetrated by competitors, but we can take advantage of our strengths.\nMark: Good. We will launch the product next month if we meet the deadline. Last year, we overcame obstacles and achieved success, but this time, it's different.\nSarah: Exactly. We must allocate budget wisely and foster teamwork. The team has been empowered to generate ideas, which is why we will succeed.\nMark: I agree. Let's hold a discussion tomorrow to set goals and prioritize tasks.",
      questions: [
        {
          id: 1,
          options: [
            "They have not conducted research.",
            "They built relationships last year.",
            "They will penetrate the market.",
            "They have analyzed the data."
          ],
          correct: 3,
          explanation: "Sarah nói: 'I have conducted research and built relationships...' (Tôi đã tiến hành nghiên cứu và xây dựng mối quan hệ...). Đáp án đúng là (D) vì sử dụng Present Perfect (have + V3: have analyzed) để diễn tả hành động hoàn thành gần đây với kết quả hiện tại. Ngữ pháp: Present Perfect nhấn mạn kết quả hiện tại; Subject-Verb Agreement (They have analyzed). Collocation: 'conduct research', 'analyze data'."
        },
        {
          id: 2,
          options: [
            "They have met the deadline.",
            "They overcame obstacles last year.",
            "They will achieve success next year.",
            "They launched the product."
          ],
          correct: 1,
          explanation: "Mark nói: 'Last year, we overcame obstacles and achieved success...' (Năm ngoái, chúng tôi đã vượt qua trở ngại và đạt được thành công...). Đáp án đúng là (B) vì sử dụng Past Simple (overcame, achieved) cho hành động hoàn tất trong quá khứ cụ thể với mốc thời gian 'last year'. Ngữ pháp: Past Simple dùng cho hành động kết thúc, khác Present Perfect. Collocation: 'overcome obstacles', 'achieve success'. Time Reference: 'Last year'."
        },
        {
          id: 3,
          options: [
            "The team is empowered.",
            "The team will empower others.",
            "The team has been empowered to generate ideas.",
            "The team generated ideas."
          ],
          correct: 2,
          explanation: "Sarah nói: 'The team has been empowered to generate ideas...' (Nhóm đã được trao quyền để tạo ý tưởng...). Đáp án đúng là (C) vì sử dụng Present Perfect Passive (has been + V3: has been empowered) nhấn mạnh hành động bị động hoàn thành với kết quả hiện tại. Ngữ pháp: Present Perfect Passive = have/has been + V3; Verb + to V (empowered to generate) diễn tả mục đích. Collocation: 'generate ideas', 'empower team'."
        },
        {
          id: 4,
          options: [
            "They have held discussions.",
            "They are holding now.",
            "They held a discussion yesterday.",
            "They will hold a discussion tomorrow."
          ],
          correct: 3,
          explanation: "Mark nói: 'Let's hold a discussion tomorrow...' (Hãy tổ chức thảo luận ngày mai...). Đáp án đúng là (D) vì sử dụng Future Simple (will + V: will hold) để diễn tả kế hoạch tương lai với mốc thời gian 'tomorrow'. Ngữ pháp: Future Simple = will + V nguyên thể. Collocation: 'hold discussions', 'set goals'. Time Reference: 'tomorrow'."
        },
        {
          id: 5,
          options: [
            "The budget is allocated.",
            "Budget allocation is wise.",
            "They allocated budget last month.",
            "We must allocate budget wisely."
          ],
          correct: 3,
          explanation: "Sarah nói: 'We must allocate budget wisely...' (Chúng ta phải phân bổ ngân sách một cách khôn ngoan...). Đáp án đúng là (D) vì sử dụng Trạng từ + Động từ (wisely allocate) trong cấu trúc modal (must + V). Ngữ pháp: Adverb (wisely) bổ nghĩa động từ (allocate), đứng sau động từ; Subject-Verb Agreement (We must allocate). Collocation: 'allocate budget'."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người ở văn phòng. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Narrator: At the office.\nJohn: Mike, Emma, we need to boost productivity despite facing challenges.\nEmma: Yes, we have implemented strategies that the manager, who oversees projects, approved.\nMike: Although we reduced expenses, we still need to train staff after assessing risks.\nJohn: If we comply with regulations, we will secure funding. The report has been scrutinized by experts.\nEmma: Let's collaborate closely to resolve conflicts and nurture relationships.",
      questions: [
        {
          id: 6,
          question: "How many people are in the conversation?",
          options: [
            "Two",
            "Three",
            "Four",
            "Five"
          ],
          correct: 1,
          explanation: "Có ba người: John, Emma, và Mike. Đáp án đúng là (B). Ngữ pháp: Subject-Verb Agreement (we need). Collocation: 'boost productivity', 'face challenges'."
        },
        {
          id: 7,
          question: "Why do they need to implement strategies?",
          options: [
            "Because they have been approved.",
            "Because they reduced expenses.",
            "Because of regulations.",
            "Because they will secure funding."
          ],
          correct: 0,
          explanation: "Emma nói: 'we have implemented strategies that the manager... approved.' (chúng tôi đã triển khai chiến lược mà quản lý phê duyệt). Đáp án đúng là (A) vì sử dụng Relative Pronoun (that) để chỉ định strategies đã được phê duyệt. Ngữ pháp: Relative Pronouns (that) nối mệnh đề phụ; Present Perfect (have implemented). Collocation: 'implement strategies'."
        },
        {
          id: 8,
          question: "What has been scrutinized?",
          options: [
            "The funding.",
            "The risks.",
            "The report.",
            "The staff."
          ],
          correct: 2,
          explanation: "John nói: 'The report has been scrutinized by experts.' (Báo cáo đã được kiểm tra kỹ bởi chuyên gia). Đáp án đúng là (C) vì sử dụng Present Perfect Passive (has been + V3). Ngữ pháp: Present Perfect Passive = have/has been + V3; Tác nhân được chỉ định với 'by experts'. Collocation: 'scrutinize reports'."
        },
        {
          id: 9,
          question: "What will happen if they comply with regulations?",
          options: [
            "They train staff.",
            "They will secure funding.",
            "They resolve conflicts.",
            "They reduced expenses."
          ],
          correct: 1,
          explanation: "John nói: 'If we comply with regulations, we will secure funding.' (Nếu chúng ta tuân thủ quy định, chúng ta sẽ đảm bảo tài trợ). Đáp án đúng là (B) vì sử dụng Conditional Sentences Type 1 (If + Present Simple, will + V). Ngữ pháp: Type 1 diễn tả tình huống thực tế tương lai. Collocation: 'comply with regulations', 'secure funding'."
        },
        {
          id: 10,
          question: "What do they plan to do to resolve conflicts?",
          options: [
            "Collaborate closely.",
            "Assess risks.",
            "Train staff.",
            "Reduce expenses."
          ],
          correct: 0,
          explanation: "Emma nói: 'Let's collaborate closely to resolve conflicts...' (Hãy hợp tác chặt chẽ để giải quyết xung đột...). Đáp án đúng là (A) vì sử dụng Pattern 2: Verb + to V (collaborate to resolve). Ngữ pháp: Infinitive (to + V) sau động từ diễn tả mục đích; Adverb (closely) bổ nghĩa động từ. Collocation: 'collaborate closely', 'resolve conflicts'."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Welcome to the seminar on business innovation. We will deliver a speech on how to promote innovation, which is essential for sustaining growth. Although challenges arise, we can overcome them by harnessing potential. The project has been undertaken successfully in the past, but now we must adapt to changes. In no way should we ignore opportunities that we identify. After evaluating options, we will execute plans efficiently.",
      questions: [
        {
          id: 11,
          question: "The seminar is __________.",
          options: ["(A) essential", "(B) successful", "(C) innovative", "(D) challenging"],
          correct: 2,
          explanation: "Professor đề cập seminar về 'business innovation'. Đáp án đúng là (C) vì sử dụng Adjective (innovative) từ ngữ cảnh. Ngữ pháp: Be + Adjective (is innovative) mô tả tính chất. Collocation: 'promote innovation'."
        },
        {
          id: 12,
          question: "We have just _________.",
          options: ["(A) adapted to changes", "(B) executed plans", "(C) evaluated options", "(D) undertaken a project"],
          correct: 3,
          explanation: "Professor: 'The project has been undertaken successfully...' (Dự án đã được thực hiện thành công...). Đáp án đúng là (D) vì sử dụng Present Perfect Passive (has been undertaken). Ngữ pháp: Present Perfect Passive = have/has been + V3. Collocation: 'undertake projects'."
        },
        {
          id: 13,
          question: "If we ignore opportunities, we __________.",
          options: ["(A) will succeed", "(B) should not", "(C) must adapt", "(D) can overcome"],
          correct: 1,
          explanation: "Professor: 'In no way should we ignore opportunities...' (Không nên bỏ qua cơ hội...). Đáp án đúng là (B) vì sử dụng Inverted Structure (In no way should we). Ngữ pháp: Inverted Structure đảo chủ ngữ-động từ sau cụm phủ định. Collocation: 'identify opportunities'."
        },
        {
          id: 14,
          question: "The project was __________.",
          options: [
            "(A) adapted later",
            "(B) executed now",
            "(C) undertaken in the past",
            "(D) evaluated always"
          ],
          correct: 2,
          explanation: "Professor: 'The project has been undertaken successfully in the past...' (Dự án đã được thực hiện thành công trong quá khứ...). Đáp án đúng là (C) vì sử dụng Time Reference (in the past). Ngữ pháp: Present Perfect với 'in the past' chỉ thời gian. Collocation: 'execute plans'."
        },
        {
          id: 15,
          question: "We will execute plans __________.",
          options: ["(A) efficiency", "(B) successful", "(C) all correct", "(D) efficiently"],
          correct: 3,
          explanation: "Professor: '...we will execute plans efficiently.' (chúng ta sẽ thực hiện kế hoạch một cách hiệu quả). Đáp án đúng là (D) vì sử dụng Adverb (efficiently) + Verb (execute). Ngữ pháp: Word Forms - Adverb (efficiently) từ adjective (efficient), bổ nghĩa động từ. Collocation: 'execute plans'."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Customer: Hello, I need to handle a complaint about the product that was delivered late.\nSales Associate: I'm sorry. We have verified details and will resolve the issue. The delay was caused by bad weather, but we will compensate.\nCustomer: If you had informed me earlier, I would have adjusted my schedule. Anyway, let's reach an agreement.\nSales Associate: Certainly. We prefer negotiating terms after providing feedback. Your order has been updated.",
      questions: [
        {
          id: 16,
          question: "The product __________.",
          options: ["(A) is on time", "(B) all correct", "(C) was early", "(D) was delivered late"],
          correct: 3,
          explanation: "Customer: '...the product that was delivered late.' (sản phẩm được giao muộn). Đáp án đúng là (D) vì sử dụng Passive Voice (was delivered) với Past Participle. Ngữ pháp: Passive Voice = be + V3 (was delivered); Relative Pronouns (that was). Collocation: 'handle complaints'."
        },
        {
          id: 17,
          question: "The delay was caused ___________.",
          options: ["(A) by the customer", "(B) by bad weather", "(C) two years ago", "(D) by the associate"],
          correct: 1,
          explanation: "Sales Associate: 'The delay was caused by bad weather...' (Sự chậm trễ do thời tiết xấu). Đáp án đúng là (B) vì sử dụng Passive Voice (was caused by). Ngữ pháp: Passive Voice với 'by' chỉ tác nhân; Contrast Conjunctions (but). Collocation: 'verify details'."
        },
        {
          id: 18,
          question: "If informed earlier, the customer __________.",
          options: ["(A) would adjust", "(B) would have adjusted", "(C) adjusted", "(D) adjusts"],
          correct: 1,
          explanation: "Customer: 'If you had informed me earlier, I would have adjusted...' (Nếu bạn thông báo sớm hơn, tôi đã điều chỉnh). Đáp án đúng là (B) vì sử dụng Conditional Sentences Type 3 (If + Past Perfect, would have + V3). Ngữ pháp: Type 3 cho tình huống giả định quá khứ không thực. Collocation: 'reach an agreement'."
        },
        {
          id: 19,
          question: "They prefer __________.",
          options: [
            "(A) updating orders",
            "(B) compensating now",
            "(C) negotiating after feedback",
            "(D) providing before"
          ],
          correct: 2,
          explanation: "Sales Associate: 'We prefer negotiating terms after providing feedback.' (Chúng tôi thích đàm phán điều khoản sau khi cung cấp phản hồi). Đáp án đúng là (C) vì sử dụng Pattern 1: Preposition + V-ing (after providing). Ngữ pháp: Gerund (V-ing) sau giới từ (after). Collocation: 'negotiate terms', 'provide feedback'."
        },
        {
          id: 20,
          question: "The order has been __________.",
          options: ["(A) delayed", "(B) updated", "(C) ignored", "(D) canceled"],
          correct: 1,
          explanation: "Sales Associate: 'Your order has been updated.' (Đơn hàng của bạn đã được cập nhật). Đáp án đúng là (B) vì sử dụng Present Perfect Passive (has been updated). Ngữ pháp: Present Perfect Passive = has been + V3; Subject-Verb Agreement (order has been). Collocation: 'update systems'."
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
          question: "The company has __________ a new strategy to boost productivity, which is a key factor in achieving success.",
          options: ["implement", "implementation", "implemented", "implements"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'implemented' vì sử dụng Present Perfect (has + V3) để diễn tả hành động hoàn thành gần đây. Ngữ pháp: Present Perfect = have/has + V3 (implemented); Verb + to V (to boost); Relative Pronouns (which is). Collocation: 'boost productivity', 'achieve success'."
        },
        {
          id: 22,
          question: "Among __________ evaluated were the options that we will choose for the project.",
          options: ["who", "those", "they","whose"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'those' vì sử dụng Đại từ chỉ định (those) trong Inverted Structure (Among those evaluated). Ngữ pháp: Inverted Structure đảo chủ ngữ; Passive Voice (were evaluated). Collocation: 'evaluate options'."
        },
        {
          id: 23,
          question: "We have reduced expenses __________ we started the cost-cutting program last year.",
          options: ["since", "during", "despite", "except"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'since' vì sử dụng Time Conjunctions (since) với Present Perfect (have reduced). Ngữ pháp: Since + Past Simple (started) cho mốc bắt đầu hành động kéo dài. Collocation: 'reduce expenses'."
        },
        {
          id: 24,
          question: "The team is __________ efficient in managing resources, leading to sustained growth.",
          options: ["high", "highly", "heights", "height"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'highly' vì sử dụng Trạng từ (highly) + Adjective (efficient). Ngữ pháp: Adverb bổ nghĩa tính từ; Word Forms: adverb từ adjective + -ly. Collocation: 'manage resources', 'sustain growth'."
        },
        {
          id: 25,
          question: "If the market expands, we __________ our products to new audiences.",
          options: ["will target", "targeted", "targets", "targeting"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'will target' vì sử dụng Future Simple (will + V) trong Conditional Sentences Type 1. Ngữ pháp: Type 1: If + Present Simple (expands), will + V (target). Collocation: 'target audiences'."
        },
        {
          id: 26,
          question: "The report __________ by the experts before being submitted.",
          options: ["has scrutinized", "has been scrutinized", "scrutinizing", "scrutinizes"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'has been scrutinized' vì sử dụng Present Perfect Passive (has been + V3). Ngữ pháp: Passive Voice; Time Conjunctions (before + V-ing). Collocation: 'scrutinize reports'."
        },
        {
          id: 27,
          question: "We look forward to __________ with you on this project despite the challenges.",
          options: ["collaborate", "collaborating", "collaboration", "collaborated"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'collaborating' vì sử dụng Pattern 1: Preposition + V-ing (look forward to + V-ing). Ngữ pháp: Gerund (V-ing) sau giới từ (to); Contrast Conjunctions (despite). Collocation: 'collaborate closely'."
        },
        {
          id: 28,
          question: "The manager, __________ oversees the team, has decided to delegate responsibilities.",
          options: ["which", "that", "whose", "who"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'who' vì sử dụng Relative Pronoun (who) cho người (manager). Ngữ pháp: Who cho chủ ngữ người; Present Perfect (has decided). Collocation: 'delegate responsibilities'."
        },
        {
          id: 29,
          question: "Under no circumstances __________ we ignore the risks that have been assessed.",
          options: ["should", "will", "did", "have"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'should' vì sử dụng Inverted Structure (Under no circumstances should we). Ngữ pháp: Đảo ngữ với modal (should + S + V) sau cụm phủ định. Collocation: 'assess risks'."
        },
        {
          id: 30,
          question: "__________ efficient use of resources is crucial for the company's success.",
          options: ["An", "No article", "A", "The"],
          correct: 3,
          explanation: "Đáp án đúng là (D) 'The' vì sử dụng Articles (The) cho danh từ cụ thể (efficient use). Ngữ pháp: The + Adjective + Noun (The efficient use). Collocation: 'utilize resources'."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D). Câu 31-36: Điền từ thích hợp. Câu 37-40: Đọc hiểu.",
      type: "reading",
      text: `To: All Staff
From: HR Rep, InnovateCorp
Subject: New Training Program Announcement
Dear Colleagues,
We are excited to announce a new training program designed to develop skills and enhance efficiency across all departments. This initiative, which has been planned for months, will begin next quarter. Participation is mandatory for those who wish to take advantage of career advancement opportunities.
To ensure smooth implementation, we will organize events where staff can share information and generate ideas. The program has been developed in collaboration with external experts (31) our internal resources optimally.
Although there may be initial challenges, we believe that by fostering teamwork and providing feedback, we can overcome them. The sessions will focus on practical skills, such as how to handle complaints and negotiate terms effectively.
If you register early, you (32) priority access to the workshops. Please note that attendance will be tracked, and certificates will be issued upon completion.
We encourage everyone to participate actively, as this will help us build relationships and achieve success together. For more details, contact the HR department (33) any questions you may have.
The program will include modules on leadership, where participants learn to demonstrate leadership and empower employees. After completing the training, staff (34) better equipped to face challenges in their roles.
In addition, we will conduct research to evaluate the program's impact, ensuring that it meets deadlines and delivers results. Your input is valuable, so please provide feedback (35) the sessions.
Finally, we appreciate your commitment to professional growth. Together, we can promote innovation and sustain growth for the company. If there are any concerns, do not hesitate to reach out (36) us directly.
Best regards,
HR Rep
InnovateCorp`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "The program has been developed in collaboration with external experts (31) our internal resources optimally.",
          options: ["utilize", "utilizing", "to utilize", "utilized"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'to utilize' vì sử dụng Pattern 2: Verb + to V (developed to utilize) để diễn tả mục đích. Ngữ pháp: Infinitive (to + V) sau động từ; Adverb (optimally) bổ nghĩa. Collocation: 'utilize resources'."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "If you register early, you (32) priority access to the workshops.",
          options: ["had", "has", "will have", "have had"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'will have' vì sử dụng Future Simple (will have) trong Conditional Sentences Type 1. Ngữ pháp: Type 1: If + Present (register), will + V (have). Collocation: 'take advantage of'."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "For more details, contact the HR department (33) any questions you may have.",
          options: ["for", "about", "on", "with"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'about' vì sử dụng Preposition (about) trong 'questions about'. Ngữ pháp: Giới từ sau danh từ chỉ chủ đề. Collocation: 'provide feedback'."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "After completing the training, staff (34) better equipped to face challenges in their roles.",
          options: ["has been", "will be", "is", "was"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'will be' vì sử dụng Future Simple Passive (will be + V3) sau Time Conjunctions (After). Ngữ pháp: Passive Voice; After + V-ing. Collocation: 'face challenges'."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "Your input is valuable, so please provide feedback (35) the sessions.",
          options: ["during", "although", "unless", "despite"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'during' vì sử dụng Time Conjunctions (during) chỉ thời gian. Ngữ pháp: During + danh từ (the sessions). Collocation: 'provide feedback'."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "If there are any concerns, do not hesitate to reach out (36) us directly.",
          options: ["to", "for", "about", "with"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'to' vì sử dụng 'reach out to' là cụm động từ. Ngữ pháp: Infinitive (to reach) sau hesitate; Giới từ (to us). Collocation: 'reach an agreement'."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - When will the training program begin?",
          options: ["Last quarter", "Next quarter", "Next year", "This month"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Next quarter' vì email đề cập 'will begin next quarter'. Ngữ pháp: Future Simple (will begin). Kỹ năng đọc hiểu: Xác định thời gian."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is the main purpose of this message?",
          options: ["To request feedback only", "To announce a new training program", "To cancel a program", "To discuss challenges"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì tiêu đề và nội dung tập trung vào 'announce a new training program'. Kỹ năng đọc hiểu: Mục đích từ Subject."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - Who is the sender of this message?",
          options: ["A manager", "HR Rep", "A staff member", "An external expert"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'HR Rep' vì từ 'From: HR Rep'. Kỹ năng đọc hiểu: Xác định người gửi."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - What will participants receive upon completion?",
          options: ["Feedback", "Certificates", "Challenges", "Priority access"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Certificates' vì 'certificates will be issued'. Ngữ pháp: Passive Voice (will be issued). Kỹ năng đọc hiểu: Trích dẫn thông tin."
        }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**TechSolutions Advertisement**
Professional IT Services to Streamline Operations and Optimize Processes
At TechSolutions, we help businesses integrate technologies and mitigate risks. Our services have been utilized by over 500 companies to accelerate growth and benchmark performance.
Services Include:
1. System Updates – We update systems efficiently to ensure security.
2. Risk Assessment – Identify and assess risks that could impact your business.
3. Technology Integration – Seamlessly integrate new technologies.
4. Training Sessions – Train staff to utilize resources effectively.
Contact us at info@techsolutions.com for a free consultation. We will respond within 48 hours to discuss how we can leverage expertise for your needs.
---
**Email Message**
To: info@techsolutions.com
From: a.smith@globalenterprises.com
Date: November 15, 2025
Subject: Inquiry for Services
I saw your advertisement online and am interested in your IT services for my company. We have faced challenges with outdated systems and need to update them urgently. Could you provide a consultation to assess risks and integrate technologies? We also want to train our staff after the updates.
Please contact me at 555-1234 between 9 AM and 5 PM. I look forward to hearing from you soon.
Regards,
Anna Smith
Global Enterprises
123 Business Ave, New York, NY`,
      questions: [
        {
          id: 41,
          question: "According to the advertisement, what does TechSolutions help with?",
          options: ["Design logos", "Integrate technologies", "Hire staff", "Sell products"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì quảng cáo nêu 'integrate technologies'. Ngữ pháp: Verb (integrate) theo ngữ cảnh IT. Collocation: 'integrate technologies'. Kỹ năng đọc hiểu: Xác định dịch vụ chính."
        },
        {
          id: 42,
          question: "What is suggested about TechSolutions?",
          options: ["It advertises online.", "It specializes in marketing.", "It has 500 employees.", "It is new."],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì email 'I saw your advertisement online'. Ngữ pháp: Present Perfect Passive (have been utilized). Collocation: 'streamline operations'. Kỹ năng đọc hiểu: Suy luận."
        },
        {
          id: 43,
          question: "Who most likely is Anna Smith?",
          options: ["An IT expert", "A business owner", "A trainer", "A voice actor"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì email từ công ty và yêu cầu dịch vụ. Ngữ pháp: Articles (my company). Collocation: 'face challenges'. Kỹ năng đọc hiểu: Suy luận vai trò."
        },
        {
          id: 44,
          question: "What service does Anna NOT request?",
          options: ["Staff hiring", "System updates", "Technology integration", "Risk assessment"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì không đề cập hiring. Email chỉ yêu cầu: system updates, risk assessment, technology integration, training. Collocation: 'assess risks'. Kỹ năng đọc hiểu: Xác định thông tin bị thiếu."
        },
        {
          id: 45,
          question: "What will Anna most likely receive within 48 hours?",
          options: ["A training session", "A response", "A risk report", "A system update"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'We will respond within 48 hours'. Ngữ pháp: Future Simple (will respond). Kỹ năng đọc hiểu: Suy luận từ thông tin quảng cáo."
        },
        {
          id: 46,
          question: "How many companies have utilized TechSolutions?",
          options: ["Over 500", "Unknown", "Under 500", "Exactly 500"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'over 500 companies'. Ngữ pháp: Present Perfect Passive (have been utilized). Kỹ năng đọc hiểu: Trích dẫn số liệu."
        },
        {
          id: 47,
          question: "What type of business does Anna operate?",
          options: ["Advertising", "Global Enterprises", "Training", "IT services"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì chữ ký 'Global Enterprises'. Kỹ năng đọc hiểu: Xác định tên công ty."
        },
        {
          id: 48,
          question: "What does Anna specifically request after updates?",
          options: ["Technology integration", "Train staff", "Free consultation", "Risk assessment"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'train our staff after the updates'. Ngữ pháp: Time Conjunctions (after). Kỹ năng đọc hiểu: Trình tự hành động."
        },
        {
          id: 49,
          question: "When does Anna prefer to be contacted?",
          options: ["Between 9 AM and 5 PM", "On weekends", "Anytime", "After 5 PM"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'between 9 AM and 5 PM'. Kỹ năng đọc hiểu: Xác định thời gian liên hệ."
        },
        {
          id: 50,
          question: "Why does Anna need services?",
          options: ["Outdated systems", "Hiring", "Marketing", "New products"],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'faced challenges with outdated systems'. Kỹ năng đọc hiểu: Xác định lý do chính."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Tom (09:00): Flight to Tokyo delayed due to weather – arriving at 14:00 instead of 13:00. Sorry!
Lisa (09:05): Okay, I'll check the schedule. We can still make the meeting if we leave immediately after.
Tom (09:10): Yes, we have navigated challenges before. The client, who we met last year, expects us.
Lisa (09:20): Despite the delay, we'll arrive on time. Parking at the airport might be limited.
Tom (14:05): Landed. See you soon!`,
      questions: [
        {
          id: 51,
          question: "What is suggested about Tom?",
          options: ["He is on vacation.", "He is on a business trip.", "He is a pilot.", "He works in Tokyo."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'make the meeting' và 'client'. Collocation: 'navigate challenges'. Kỹ năng đọc hiểu: Suy luận tình huống."
        },
        {
          id: 52,
          question: "At 09:05, what does Lisa mean by 'Okay'?",
          options: ["She cancels the meeting.", "She accepts the delay.", "She changes flights.", "She is angry."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì đáp lại delay một cách tích cực. Ngữ pháp: Conditional Sentences (if we leave). Kỹ năng đọc hiểu: Suy luận ý định."
        },
        {
          id: 53,
          question: "Why was the flight delayed?",
          options: ["Due to weather.", "Client request.", "Schedule change.", "Missed connection."],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'due to weather'. Kỹ năng đọc hiểu: Xác định lý do."
        },
        {
          id: 54,
          question: "What time is the new arrival?",
          options: ["09:00", "14:00", "14:05", "13:00"],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'arriving at 14:00'. Kỹ năng đọc hiểu: Xác định thời gian."
        },
        {
          id: 55,
          question: "What does Lisa offer?",
          options: ["Cancel trip.", "Check schedule.", "Book hotel.", "Change meeting."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'I'll check the schedule'. Kỹ năng đọc hiểu: Xác định hành động."
        },
        {
          id: 56,
          question: "What can be inferred about Tom and Lisa?",
          options: ["They are colleagues.", "They are strangers.", "They are competitors.", "They are family."],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'we can still make the meeting'. Ngữ pháp: Relative Pronouns (who we met). Kỹ năng đọc hiểu: Suy luận mối quan hệ."
        },
        {
          id: 57,
          question: "Why does Tom mention 'navigated challenges before'?",
          options: ["To cancel.", "To reassure.", "To apologize again.", "To complain."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì nhấn mạnh kinh nghiệm và khả năng xử lý. Ngữ pháp: Present Perfect (have navigated). Kỹ năng đọc hiểu: Suy luận mục đích."
        },
        {
          id: 58,
          question: "What does Lisa mean by 'Despite the delay'?",
          options: ["They won't arrive.", "They will arrive on time.", "They cancel.", "They will be late."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'we'll arrive on time'. Ngữ pháp: Contrast Conjunctions (Despite). Kỹ năng đọc hiểu: Suy luận ý nghĩa."
        },
        {
          id: 59,
          question: "What is implied about the airport?",
          options: ["Limited parking.", "Easy access.", "Closed.", "No parking."],
          correct: 0,
          explanation: "Đáp án đúng là (A) vì 'Parking... might be limited'. Kỹ năng đọc hiểu: Xác định thông tin ngụ ý."
        },
        {
          id: 60,
          question: "What does Tom express in the final message?",
          options: ["Cancellation.", "Arrival confirmation.", "Delay again.", "Frustration."],
          correct: 1,
          explanation: "Đáp án đúng là (B) vì 'Landed. See you soon!' thể hiện xác nhận hạ cánh. Kỹ năng đọc hiểu: Xác định cảm xúc/ý định."
        }
      ]
    }
  }
};