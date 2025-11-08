export const EXAM3_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 3 (Chủ Đề Giáo Dục & Sức Khỏe)",
  description: "Bộ đề thi mở rộng với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Nhấn mạnh vào ngữ cảnh học thuật và y tế để nâng cao kỹ năng thực tiễn.",
  parts: {
    // Listening Parts (cập nhật script với định dạng nhãn người nói và \n để hỗ trợ giao tiếp tự nhiên)
    part1: {
      title: "PART 1: Short Conversations",
      description: "5 câu hỏi - Mỗi đoạn hội thoại ngắn giữa hai người. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      questions: [
        {
          id: 1,
          script: "Teacher: How's your essay coming along?\nStudent: Struggling with the conclusion.\nTeacher: Focus on key points from the lecture.",
          question: "What is the student struggling with?",
          options: [
            "(A) The introduction.",
            "(B) The conclusion.",
            "(C) The references.",
            "(D) The title."
          ],
          correct: 1
        },
        {
          id: 2,
          script: "Doctor: Any allergies?\nPatient: None, but I exercise daily.\nDoctor: Good, that supports recovery.",
          question: "What does the patient do daily?",
          options: [
            "(A) Eat fast food.",
            "(B) Exercise.",
            "(C) Smoke.",
            "(D) Drink alcohol."
          ],
          correct: 1
        },
        {
          id: 3,
          script: "Librarian: Need help finding research articles?\nResearcher: Yes, on mental health.\nLibrarian: Check the psychology section.",
          question: "What topic is the researcher seeking?",
          options: [
            "(A) Physical fitness.",
            "(B) Mental health.",
            "(C) Nutrition.",
            "(D) Travel."
          ],
          correct: 1
        },
        {
          id: 4,
          script: "Coach: Ready for the exam?\nAthlete: Nervous, but I've studied.\nCoach: Review stress management techniques.",
          question: "What advice does the coach give?",
          options: [
            "(A) Skip studying.",
            "(B) Review stress techniques.",
            "(C) Rest more.",
            "(D) Eat less."
          ],
          correct: 1
        },
        {
          id: 5,
          script: "Nurse: Follow the diet plan?\nPatient: Yes, feeling better already.\nNurse: Continue for full benefits.",
          question: "How does the patient feel?",
          options: [
            "(A) Worse.",
            "(B) The same.",
            "(C) Better.",
            "(D) Tired."
          ],
          correct: 2
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa nhiều người. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Class, today's topic is wellness programs.\nStudent 1: How many sessions per week?\nProfessor: Two, focusing on yoga and nutrition.\nStudent 2: Any cost?\nProfessor: Free for enrolled students.\nStudent 1: Great, sign me up.\nStudent 2: Me too, but I prefer evening slots.",
      questions: [
        { id: 6, question: "How many sessions per week?", options: ["(A) One", "(B) Two", "(C) Three", "(D) Four"], correct: 1 },
        { id: 7, question: "What is the cost for students?", options: ["(A) $50", "(B) Free", "(C) $20", "(D) Variable"], correct: 1 },
        { id: 8, question: "What topics are covered?", options: ["(A) Math and science", "(B) Yoga and nutrition", "(C) History and art", "(D) Sports only"], correct: 1 },
        { id: 9, question: "What does Student 2 prefer?", options: ["(A) Morning slots", "(B) Evening slots", "(C) Weekends", "(D) Online only"], correct: 1 },
        { id: 10, question: "Who is leading the discussion?", options: ["(A) Student 1", "(B) Professor", "(C) Student 2", "(D) Nurse"], correct: 1 }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Good morning, students. This health seminar is essential for your curriculum. We've incorporated mindfulness practices since the fall term to combat academic stress. If you miss the submission deadline for your wellness journal, it will impact your grade – aim for weekly entries. Last cohort, Jamie was a standout student in group exercises; her consistency paid off. Moreover, the campus gym provides balanced options: cardio machines, weight training, and yoga mats – all available free of charge.",
      questions: [
        { id: 11, question: "The seminar is described as __________.", options: ["(A) optional", "(B) essential", "(C) advanced", "(D) brief"], correct: 1 },
        { id: 12, question: "Mindfulness was added __________.", options: ["(A) last year", "(B) since the fall term", "(C) next semester", "(D) temporarily"], correct: 1 },
        { id: 13, question: "What happens if the journal deadline is missed?", options: ["(A) No effect", "(B) Grade impact", "(C) Extra credit", "(D) Warning only"], correct: 1 },
        { id: 14, question: "Jamie excelled in __________.", options: ["(A) lectures", "(B) group exercises", "(C) exams", "(D) reading"], correct: 1 },
        { id: 15, question: "The gym offers __________ options.", options: ["(A) paid only", "(B) balanced and free", "(C) limited", "(D) outdoor only"], correct: 1 }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Counselor: Let's discuss your study habits.\nStudent: I procrastinate often.\nCounselor: Start with time-blocking techniques.\nParent: How about apps for reminders?\nCounselor: Yes, like Focus Booster.\nStudent: I'll try it.\nParent: And regular breaks for mental health.\nCounselor: Exactly, to prevent burnout.",
      questions: [
        { id: 16, question: "What is the student's issue?", options: ["(A) Overstudying", "(B) Procrastination", "(C) Poor grades", "(D) Lack of sleep"], correct: 1 },
        { id: 17, question: "What technique is suggested first?", options: ["(A) Apps", "(B) Time-blocking", "(C) Group study", "(D) Rewards"], correct: 1 },
        { id: 18, question: "What app is recommended?", options: ["(A) Todoist", "(B) Focus Booster", "(C) Calendar", "(D) Notes"], correct: 1 },
        { id: 19, question: "What does the parent emphasize?", options: ["(A) Strict schedules", "(B) Regular breaks", "(C) Extra classes", "(D) Less reading"], correct: 1 },
        { id: 20, question: "The goal is to prevent __________.", options: ["(A) Success", "(B) Burnout", "(C) Relaxation", "(D) Motivation"], correct: 1 }
      ]
    },
    // Reading Parts giữ nguyên (không cần cập nhật script/audio)
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
      type: "reading",
      questions: [
        { id: 21, question: "Regular exercise contributes to overall well-being by __________ endorphins.", options: ["(A) releasing", "(B) ignoring", "(C) delaying", "(D) reducing"], correct: 0 },
        { id: 22, question: "The curriculum emphasizes critical thinking __________ rote memorization.", options: ["(A) over", "(B) under", "(C) with", "(D) against"], correct: 0 },
        { id: 23, question: "Students must submit assignments __________ the specified due date.", options: ["(A) before", "(B) after", "(C) during", "(D) without"], correct: 0 },
        { id: 24, question: "Mental health awareness campaigns aim to __________ stigma.", options: ["(A) increase", "(B) reduce", "(C) maintain", "(D) create"], correct: 1 },
        { id: 25, question: "The lecture will __________ the importance of balanced nutrition.", options: ["(A) highlight", "(B) hide", "(C) shorten", "(D) complicate"], correct: 0 },
        { id: 26, question: "Peer support groups provide a safe space for __________ concerns.", options: ["(A) sharing", "(B) avoiding", "(C) judging", "(D) ignoring"], correct: 0 },
        { id: 27, question: "Academic success often depends on __________ study habits.", options: ["(A) consistent", "(B) irregular", "(C) minimal", "(D) casual"], correct: 0 },
        { id: 28, question: "Healthcare professionals recommend annual check-ups to __________ early detection.", options: ["(A) facilitate", "(B) hinder", "(C) delay", "(D) skip"], correct: 0 },
        { id: 29, question: "The workshop focuses on __________ skills for stress management.", options: ["(A) practical", "(B) theoretical", "(C) advanced", "(D) optional"], correct: 0 },
        { id: 30, question: "Education reforms seek to __________ equity in access to resources.", options: ["(A) promote", "(B) limit", "(C) question", "(D) overlook"], correct: 0 }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (School Newsletter)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản newsletter. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `University Health Center Newsletter
Dear Students,
The fall semester brings exciting opportunities for wellness. Our new initiative includes free yoga classes to (31) physical and mental health. Sessions are held twice weekly in the gym.
To participate, register online by October 15 to (32) your spot. Late registrations may not be accommodated.
This program is part of our broader effort to (33) a supportive campus environment. Feedback from last year's participants showed improved focus and reduced anxiety.
Counseling services remain available for those needing personalized advice. Appointments can be (34) via the student portal.
Stay healthy and balanced!
Health Center Staff`,
      questions: [
        { id: 31, question: "(31)", options: ["(A) harm", "(B) promote", "(C) ignore", "(D) delay"], correct: 1 },
        { id: 32, question: "(32)", options: ["(A) lose", "(B) secure", "(C) forget", "(D) share"], correct: 1 },
        { id: 33, question: "(33)", options: ["(A) destroy", "(B) foster", "(C) limit", "(D) complicate"], correct: 1 },
        { id: 34, question: "(34)", options: ["(A) cancelled", "(B) booked", "(C) postponed", "(D) avoided"], correct: 1 },
        { id: 35, question: "(35)", options: ["(A) Yoga only", "(B) Counseling services", "(C) Gym access", "(D) Registration"], correct: 1 },
        { id: 36, question: "(36)", options: ["(A) October 15", "(B) Fall semester start", "(C) Last year", "(D) Twice weekly"], correct: 0 },
        { id: 37, question: "What is the main benefit reported?", options: ["(A) More sleep", "(B) Improved focus", "(C) Higher fees", "(D) Less exercise"], correct: 1 },
        { id: 38, question: "How often are classes held?", options: ["(A) Once a month", "(B) Twice weekly", "(C) Daily", "(D) Annually"], correct: 1 },
        { id: 39, question: "Where are sessions located?", options: ["(A) Online", "(B) In the gym", "(C) At home", "(D) Off-campus"], correct: 1 },
        { id: 40, question: "What showed positive results?", options: ["(A) New fees", "(B) Feedback", "(C) Registrations", "(D) Staff"], correct: 1 }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Brochure + Review)",
      description: "10 câu hỏi - Đọc brochure và review, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Campus Wellness Brochure: Join our free meditation program. Weekly sessions improve concentration and reduce stress. No experience needed – all welcome.
Student Review: The meditation class was transformative. Instructor was patient, but the room was too small for larger groups. Highly recommend for busy schedules.`,
      questions: [
        { id: 41, question: "What is the cost of the program?", options: ["(A) $10 per session", "(B) Free", "(C) $50 monthly", "(D) Donation-based"], correct: 1 },
        { id: 42, question: "What benefit does the brochure mention?", options: ["(A) Weight loss", "(B) Reduced stress", "(C) Better grades", "(D) More friends"], correct: 1 },
        { id: 43, question: "Who wrote the review?", options: ["(A) An instructor", "(B) A student", "(C) A parent", "(D) A doctor"], correct: 1 },
        { id: 44, question: "What was positive in the review?", options: ["(A) Room size", "(B) Instructor's patience", "(C) Schedule", "(D) Cost"], correct: 1 },
        { id: 45, question: "What criticism is in the review?", options: ["(A) Poor teaching", "(B) Small room", "(C) Long sessions", "(D) No benefits"], correct: 1 },
        { id: 46, question: "How often are sessions?", options: ["(A) Daily", "(B) Weekly", "(C) Monthly", "(D) Annually"], correct: 1 },
        { id: 47, question: "Is experience required?", options: ["(A) Yes, advanced", "(B) No", "(C) Basic only", "(D) Professional"], correct: 1 },
        { id: 48, question: "Who is the program for?", options: ["(A) Experts only", "(B) All welcome", "(C) Children", "(D) Staff only"], correct: 1 },
        { id: 49, question: "What does the review recommend for?", options: ["(A) Free time", "(B) Busy schedules", "(C) Vacations", "(D) Sports"], correct: 1 },
        { id: 50, question: "What does the brochure promote?", options: ["(A) Gym membership", "(B) Meditation program", "(C) Diet plans", "(D) Tutoring"], correct: 1 }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Emma (8:00): Reminder: Health seminar at 2 PM in Lecture Hall A.
Liam (8:05): Thanks. Topic on sleep hygiene?
Emma (8:10): Yes. Bring questions. Dr. Lee will answer.
Liam (8:15): Got a headache – should I skip?
Emma (8:20): No, it covers pain management too. See you there.
Liam (14:00): Running 5 min late – traffic.`,
      questions: [
        { id: 51, question: "What time is the seminar?", options: ["(A) 8 AM", "(B) 2 PM", "(C) 8 PM", "(D) Noon"], correct: 1 },
        { id: 52, question: "What is the topic?", options: ["(A) Nutrition", "(B) Sleep hygiene", "(C) Exercise", "(D) Diet"], correct: 1 },
        { id: 53, question: "Who will answer questions?", options: ["(A) Emma", "(B) Dr. Lee", "(C) Liam", "(D) Students"], correct: 1 },
        { id: 54, question: "Why might Liam skip?", options: ["(A) Boredom", "(B) Headache", "(C) Work", "(D) Rain"], correct: 1 },
        { id: 55, question: "What else does the seminar cover?", options: ["(A) Yoga", "(B) Pain management", "(C) Tests", "(D) Fees"], correct: 1 },
        { id: 56, question: "Where is the seminar?", options: ["(A) Online", "(B) Lecture Hall A", "(C) Gym", "(D) Cafe"], correct: 1 },
        { id: 57, question: "What does Emma send?", options: ["(A) Agenda", "(B) Reminder", "(C) Quiz", "(D) Food"], correct: 1 },
        { id: 58, question: "Liam is late due to __________.", options: ["(A) Sleep", "(B) Traffic", "(C) Illness", "(D) Forgetting"], correct: 1 },
        { id: 59, question: "How late is Liam?", options: ["(A) 5 minutes", "(B) 10 minutes", "(C) 30 minutes", "(D) An hour"], correct: 0 },
        { id: 60, question: "Emma advises Liam to __________.", options: ["(A) Skip", "(B) Attend anyway", "(C) Reschedule", "(D) Rest"], correct: 1 }
      ]
    }
  }
};