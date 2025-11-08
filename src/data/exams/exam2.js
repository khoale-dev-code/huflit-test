export const EXAM2_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 2 (Chủ Đề Du Lịch & Công Việc)",
  description: "Bộ đề thi mở rộng với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Tập trung vào ngữ cảnh thực tế để nâng cao kỹ năng nghe-đọc.",
  parts: {
    // Listening Parts (cập nhật script với định dạng nhãn người nói và \n để hỗ trợ giao tiếp tự nhiên)
    part1: {
      title: "PART 1: Short Conversations",
      description: "5 câu hỏi - Mỗi đoạn hội thoại ngắn giữa hai người. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      questions: [
        {
          id: 1,
          script: "Tourist: How was the flight to Paris?\nGuide: Smooth, but the delay meant we arrived late.\nTourist: At least the views from the plane were stunning.",
          question: "Why did the group arrive late in Paris?",
          options: [
            "(A) Bad weather caused turbulence.",
            "(B) The flight was delayed.",
            "(C) They missed their connecting train.",
            "(D) The airport was overcrowded."
          ],
          correct: 1
        },
        {
          id: 2,
          script: "Colleague 1: Did you finish the report?\nColleague 2: Almost, but I need more time for the charts.\nColleague 1: Submit by noon tomorrow.",
          question: "What does the second colleague need?",
          options: [
            "(A) More data from the team.",
            "(B) Additional time.",
            "(C) A new computer.",
            "(D) Help with writing."
          ],
          correct: 1
        },
        {
          id: 3,
          script: "Student: What's the hotel like in Tokyo?\nAdvisor: Comfortable, but book early as it's peak season.\nStudent: Noted, thanks.",
          question: "Why should the student book early?",
          options: [
            "(A) Prices are rising.",
            "(B) It's high season.",
            "(C) Rooms are limited.",
            "(D) The location is remote."
          ],
          correct: 1
        },
        {
          id: 4,
          script: "Manager: How's the project going?\nEmployee: On track, but the budget is tight.\nManager: We'll review it next week.",
          question: "What is the status of the project?",
          options: [
            "(A) Behind schedule.",
            "(B) Proceeding as planned.",
            "(C) Over budget.",
            "(D) Cancelled."
          ],
          correct: 1
        },
        {
          id: 5,
          script: "Friend 1: Enjoyed the conference?\nFriend 2: Yes, networked with experts.\nFriend 1: Great networking opportunity.",
          question: "What did the second friend do at the conference?",
          options: [
            "(A) Presented a paper.",
            "(B) Met professionals.",
            "(C) Attended workshops.",
            "(D) Traveled alone."
          ],
          correct: 1
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa nhiều người. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Travel Agent: Welcome! Planning a trip to Europe?\nClient 1: Yes, for four of us. Two adults, two kids.\nClient 2: We'd like three nights in Rome and two in Paris.\nTravel Agent: Excellent. Flights from New York?\nClient 1: Direct to Rome, then train to Paris.\nClient 2: Budget around $5,000 total.\nTravel Agent: That covers economy flights and mid-range hotels. Any special requests?\nClient 1: Vegetarian meals for the kids.\nClient 2: And early check-in if possible.",
      questions: [
        { id: 6, question: "How many people are traveling?", options: ["(A) Two", "(B) Three", "(C) Four", "(D) Five"], correct: 2 },
        { id: 7, question: "What is the total budget?", options: ["(A) $3,000", "(B) $4,000", "(C) $5,000", "(D) $6,000"], correct: 2 },
        { id: 8, question: "Where will they stay first?", options: ["(A) Paris", "(B) New York", "(C) Rome", "(D) London"], correct: 2 },
        { id: 9, question: "What special request do the kids have?", options: ["(A) Extra luggage", "(B) Vegetarian meals", "(C) Late checkout", "(D) Window seats"], correct: 1 },
        { id: 10, question: "How will they travel between cities?", options: ["(A) By car", "(B) By plane", "(C) By train", "(D) By bus"], correct: 2 }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Manager: Hello, colleagues. This quarterly review is straightforward. We've met our sales targets since last quarter, thanks to the new marketing push. If you miss the deadline for reports next Friday, expect a formal warning – no extensions. Remember, teamwork like Sarah's project last month sets the standard; she coordinated flawlessly. Finally, the office cafeteria now offers sustainable options: organic salads, vegan stir-fries, and gluten-free desserts – all highly recommended for lunch breaks.",
      questions: [
        { id: 11, question: "The review is described as __________.", options: ["(A) complex", "(B) straightforward", "(C) lengthy", "(D) optional"], correct: 1 },
        { id: 12, question: "Sales targets have been met __________.", options: ["(A) barely", "(B) since last quarter", "(C) next month", "(D) annually"], correct: 1 },
        { id: 13, question: "What happens if a report deadline is missed?", options: ["(A) Automatic extension", "(B) Formal warning", "(C) Bonus points", "(D) No penalty"], correct: 1 },
        { id: 14, question: "Sarah's project is praised for __________.", options: ["(A) innovation", "(B) coordination", "(C) budget savings", "(D) speed"], correct: 1 },
        { id: 15, question: "The cafeteria now offers __________ options.", options: ["(A) expensive", "(B) sustainable", "(C) limited", "(D) all of the above"], correct: 1 }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "HR Rep: Welcome to the interview. Tell us about your experience.\nCandidate: I have five years in sales, mostly remote. Last role was with a tech firm in Berlin.\nInterviewer 1: Why relocate to Hanoi?\nCandidate: For career growth and family ties.\nInterviewer 2: Salary expectations?\nCandidate: Around 1,200 USD monthly, plus benefits.\nHR Rep: We offer relocation support but need two references.\nCandidate: Happy to provide.\nInterviewer 1: Start date?\nCandidate: Available next month.",
      questions: [
        { id: 16, question: "The candidate's experience is in __________.", options: ["(A) marketing", "(B) sales", "(C) HR", "(D) tech support"], correct: 1 },
        { id: 17, question: "Why is the candidate relocating?", options: ["(A) Better weather", "(B) Career and family", "(C) Lower costs", "(D) Education"], correct: 1 },
        { id: 18, question: "What salary does the candidate expect?", options: ["(A) 800 USD", "(B) 1,200 USD", "(C) 1,500 USD", "(D) 2,000 USD"], correct: 1 },
        { id: 19, question: "What does the company offer for relocation?", options: ["(A) Full funding", "(B) Support package", "(C) Nothing", "(D) Housing"], correct: 1 },
        { id: 20, question: "When can the candidate start?", options: ["(A) Immediately", "(B) Next week", "(C) Next month", "(D) In three months"], correct: 2 }
      ]
    },
    // Reading Parts giữ nguyên (không cần cập nhật vì không audio)
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
      type: "reading",
      questions: [
        { id: 21, question: "The conference agenda includes sessions on sustainable tourism, which is increasingly __________ in the industry.", options: ["(A) irrelevant", "(B) prominent", "(C) outdated", "(D) temporary"], correct: 1 },
        { id: 22, question: "Employees who excel in teamwork are __________ for leadership roles.", options: ["(A) ineligible", "(B) considered", "(C) overlooked", "(D) dismissed"], correct: 1 },
        { id: 23, question: "The team has been working overtime __________ the project deadline.", options: ["(A) despite", "(B) to meet", "(C) after", "(D) without"], correct: 1 },
        { id: 24, question: "All participants must register online to __________ access to the virtual event.", options: ["(A) gain", "(B) lose", "(C) delay", "(D) ignore"], correct: 0 },
        { id: 25, question: "The report highlights the need for __________ training programs.", options: ["(A) infrequent", "(B) ongoing", "(C) single", "(D) optional"], correct: 1 },
        { id: 26, question: "Travel delays can __________ productivity during business trips.", options: ["(A) enhance", "(B) affect", "(C) ignore", "(D) celebrate"], correct: 1 },
        { id: 27, question: "The policy requires approval __________ any expense over $500.", options: ["(A) for", "(B) against", "(C) without", "(D) beyond"], correct: 0 },
        { id: 28, question: "She works __________ to balance her career and family life.", options: ["(A) tirelessly", "(B) lazily", "(C) randomly", "(D) secretly"], correct: 0 },
        { id: 29, question: "The merger was __________ due to regulatory issues.", options: ["(A) approved", "(B) delayed", "(C) accelerated", "(D) ignored"], correct: 1 },
        { id: 30, question: "Effective communication is essential for __________ remote teams.", options: ["(A) uniting", "(B) dividing", "(C) confusing", "(D) avoiding"], correct: 0 }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Business Memo)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản memo. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Staff
From: Director of Operations
Subject: Remote Work Policy Update
Dear Team,
Effective immediately, our remote work policy has been revised to (31) greater flexibility while maintaining productivity. Employees may now work from home up to three days per week, provided they (32) daily check-ins with their supervisors.
This change aims to (33) work-life balance and reduce commuting costs. However, core hours from 9 a.m. to 3 p.m. must be observed for collaboration. Training sessions on secure remote access will be (34) next month.
For international travel, prior approval is required to (35) compliance with visa regulations. Questions should be directed to HR.
Thank you for your adaptability.
Best,
Director of Operations`,
      questions: [
        { id: 31, question: "(31)", options: ["(A) limit", "(B) provide", "(C) eliminate", "(D) complicate"], correct: 1 },
        { id: 32, question: "(32)", options: ["(A) skip", "(B) complete", "(C) delay", "(D) avoid"], correct: 1 },
        { id: 33, question: "(33)", options: ["(A) hinder", "(B) support", "(C) ignore", "(D) measure"], correct: 1 },
        { id: 34, question: "(34)", options: ["(A) cancelled", "(B) scheduled", "(C) postponed", "(D) optional"], correct: 1 },
        { id: 35, question: "(35)", options: ["(A) ensure", "(B) bypass", "(C) forget", "(D) extend"], correct: 0 },
        { id: 36, question: "(36)", options: ["(A) Remote days", "(B) Core hours", "(C) Travel approvals", "(D) Training sessions"], correct: 1 },
        { id: 37, question: "What is the main goal of the update?", options: ["(A) Increase office attendance", "(B) Improve work-life balance", "(C) Reduce salaries", "(D) Eliminate training"], correct: 1 },
        { id: 38, question: "Who should questions be directed to?", options: ["(A) Supervisors", "(B) Director", "(C) HR", "(D) Clients"], correct: 2 },
        { id: 39, question: "When will training sessions occur?", options: ["(A) This week", "(B) Next month", "(C) Immediately", "(D) Annually"], correct: 1 },
        { id: 40, question: "What must be observed during remote work?", options: ["(A) Full 8-hour days", "(B) Core hours", "(C) Weekends off", "(D) No check-ins"], correct: 1 }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Ad + Letter)",
      description: "10 câu hỏi - Đọc quảng cáo và thư, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Global Travel Ad: Discover Asia with our eco-tours. Book now for 20% off flights to Bangkok. Includes guided hikes and cultural workshops. Limited spots – reserve online.
Letter from Traveler: Dear Global Travel, I recently joined your Vietnam tour. The guides were excellent, but the hotel in Hanoi was noisy. Please refund 10% for that night. Contact me at traveler@email.com.`,
      questions: [
        { id: 41, question: "What discount is offered in the ad?", options: ["(A) 10%", "(B) 20%", "(C) 30%", "(D) 50%"], correct: 1 },
        { id: 42, question: "What is included in the eco-tours?", options: ["(A) Luxury spas", "(B) Guided hikes", "(C) Beach resorts", "(D) Shopping vouchers"], correct: 1 },
        { id: 43, question: "Who wrote the letter?", options: ["(A) A guide", "(B) A traveler", "(C) An agent", "(D) A hotel manager"], correct: 1 },
        { id: 44, question: "What complaint is in the letter?", options: ["(A) Poor food", "(B) Noisy hotel", "(C) Late flights", "(D) Bad weather"], correct: 1 },
        { id: 45, question: "What does the traveler request?", options: ["(A) Free upgrade", "(B) 10% refund", "(C) New itinerary", "(D) Extension"], correct: 1 },
        { id: 46, question: "Where does the ad promote travel to?", options: ["(A) Europe", "(B) Asia", "(C) Africa", "(D) Americas"], correct: 1 },
        { id: 47, question: "How can spots be reserved?", options: ["(A) By phone", "(B) Online", "(C) In person", "(D) Via email"], correct: 1 },
        { id: 48, question: "What was positive in the letter?", options: ["(A) The hotel", "(B) The guides", "(C) The transport", "(D) The cost"], correct: 1 },
        { id: 49, question: "What is the email for?", options: ["(A) Complaints", "(B) Contact", "(C) Bookings", "(D) Reviews"], correct: 1 },
        { id: 50, question: "What type of tours are advertised?", options: ["(A) Adventure", "(B) Eco-tours", "(C) Luxury", "(D) Budget"], correct: 1 }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Alex (9:00): Team, meeting at 10 AM sharp. Agenda attached.
Jordan (9:05): Got it. Bringing notes on Q3 sales.
Sam (9:10): Running late – traffic jam. Can I join via video?
Alex (9:15): Yes, link sent. Don't miss the strategy vote.
Jordan (9:20): Sales up 15% – good news!
Sam (10:00): Joined. What's the vote on?`,
      questions: [
        { id: 51, question: "What time is the meeting?", options: ["(A) 9 AM", "(B) 10 AM", "(C) 11 AM", "(D) Noon"], correct: 1 },  // B
        { id: 52, question: "Who is bringing sales notes?", options: ["(A) Alex", "(B) Jordan", "(C) Sam", "(D) The team"], correct: 1 },  // B
        { id: 53, question: "Why is Sam late?", options: ["(A) Illness", "(B) Traffic", "(C) Forgot", "(D) Meeting elsewhere"], correct: 1 },  // B
        { id: 54, question: "How can Sam join?", options: ["(A) In person", "(B) Via video", "(C) By phone", "(D) Later"], correct: 1 },  // B
        { id: 55, question: "What is the good news?", options: ["(A) New hires", "(B) Sales increase", "(C) Promotion", "(D) Vacation"], correct: 1 },  // B
        { id: 56, question: "Who sent the agenda?", options: ["(A) Jordan", "(B) Alex", "(C) Sam", "(D) HR"], correct: 1 },  // B
        { id: 57, question: "What must not be missed?", options: ["(A) Coffee break", "(B) Strategy vote", "(C) Lunch", "(D) Email"], correct: 1 },  // B
        { id: 58, question: "Sales increased by __________.", options: ["(A) 5%", "(B) 15%", "(C) 20%", "(D) 25%"], correct: 1 },  // B
        { id: 59, question: "Sam joins at __________.", options: ["(A) 9:10", "(B) 9:20", "(C) 10:00", "(D) 10:15"], correct: 2 },  // C
        { id: 60, question: "What does Sam ask about?", options: ["(A) The agenda", "(B) The vote", "(C) Sales", "(D) Traffic"], correct: 1 }  // B
      ]
    }
  }
};