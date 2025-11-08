export const EXAM1_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 1 (Dựa trên Đề Thi Thử)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT.",
  parts: {
    // Listening Parts (cập nhật script với định dạng nhãn người nói và \n để hỗ trợ giao tiếp tự nhiên)
    part1: {
      title: "PART 1: Short Conversations",
      description: "5 câu hỏi - Mỗi đoạn hội thoại ngắn giữa hai người. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      questions: [
        {
          id: 1,
          script: "Woman: Did you enjoy shopping in Seoul?\nMan: Not really. I went to several stores, but the prices were much higher than I expected. Everything was so expensive that I decided not to buy anything.\nWoman: That's too bad. I heard Seoul has great shopping.",
          question: "What did the man do in Seoul?",
          options: [
            "(A) She didn’t buy anything because it wasn’t beautiful.",
            "(B) She didn’t buy anything because she found prices too high.",
            "(C) She bought a lot of things because they’re really cheap.",
            "(D) She bought nothing because she did not have time."
          ],
          correct: 1
        },
        {
          id: 2,
          script: "Woman: How long were you in Thailand?\nMan: I stayed for approximately two weeks. It was a wonderful vacation. I spent the first week in Bangkok and then traveled to the islands for the second week.\nWoman: That sounds amazing!",
          question: "How long did the man stay in Thailand?",
          options: [
            "(A) He spent one month there.",
            "(B) He spent seven months there.",
            "(C) He spent one week there.",
            "(D) He spent several times there."
          ],
          correct: 0
        },
        {
          id: 3,
          script: "Man: Did you purchase any souvenirs in Paris?\nWoman: Yes, absolutely! I bought several gifts for my family, some perfume for my mother, a scarf for my sister, and some chocolates for everyone at work.\nMan: Paris is perfect for souvenir shopping.",
          question: "What did the woman buy in Paris?",
          options: [
            "(A) She didn’t buy anything in Taipei.",
            "(B) She bought many things in Taipei.",
            "(C) She bought a few things in Taipei.",
            "(D) She bought a souvenir in Taipei."
          ],
          correct: 1
        },
        {
          id: 4,
          script: "Woman: When's the best time to visit Australia?\nMan: Well, most people I've talked to recommend going in spring or autumn. The weather is pleasant, and it's not too crowded. Summer can be extremely hot, and winter can be quite cold in some regions.\nWoman: Thanks for the advice!",
          question: "When do people recommend visiting Australia?",
          options: [
            "(A) People told him to visit in the summer.",
            "(B) People didn’t tell him to visit in the spring.",
            "(C) People told him to visit in the spring.",
            "(D) People told him to visit in the autumn."
          ],
          correct: 2
        },
        {
          id: 5,
          script: "Man: Was Tokyo difficult to navigate?\nWoman: No, not at all! Actually, the subway system made it very convenient to get around. The signs are in both Japanese and English, and the trains run on time. I found it much easier than I expected.\nMan: That's good to know.",
          question: "How did the woman find Tokyo?",
          options: [
            "(A) He found that Tokyo was very easy to get around.",
            "(B) He found that Tokyo was not easy to get around.",
            "(C) He found that Tokyo was a little bit easy to get around.",
            "(D) He found that Tokyo was too busy to get around."
          ],
          correct: 0
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại dài giữa nhiều người. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Waiter: Good afternoon! Are you ready to order drinks?\nMike: Yes, I'll have an orange juice.\nSarah: Me too, please.\nJohn: And one for me as well.\nWaiter: That's three orange juices. And for you, ma'am?\nOlder Woman: Just water, thank you.\nMike: Sarah, why aren't you ordering food?\nSarah: I'm not hungry right now; I had a late lunch and I'm trying to eat lighter these days.\nJohn: By the way, I heard Uncle Robertson quit his restaurant job. What’s he doing now?\nMike: He owns his own business still, but now he works with young players coaching soccer in Orlando.\nSarah: That's exciting! Speaking of family, Mom and Aunt Lisa – your sister-in-law – are coming over for lunch tomorrow.\nOlder Woman: Yes, my sister and your aunt will join us.\nMike: For Emily's birthday, what gift?\nJohn: Money is practical.\nOlder Woman: Or clothes.\nSarah: A hat might be fun.\nMike: We can't decide yet; let's think more.",
      questions: [
        { id: 6, question: "How many people want orange juice?", options: ["(A) Two", "(B) Three", "(C) Four", "(D) Five"], correct: 1 },
        { id: 7, question: "Why doesn’t the woman want anything to eat?", options: ["(A) Because she’s not hungry.", "(B) Because she doesn’t feel well.", "(C) Because she’s on a diet.", "(D) Because the food is not good enough."], correct: 0 },
        { id: 8, question: "What does Robertson do now?", options: ["(A) He owns a restaurant.", "(B) He works in Orlando.", "(C) He works with young players.", "(D) He works in a restaurant."], correct: 2 },
        { id: 9, question: "Who’s coming to lunch?", options: ["(A) The man’s mother-in-law and his sister.", "(B) The man’s mother and his sister-in-law.", "(C) The man’s mother-in-law and her sister.", "(D) The man’s sister-in-law and his sister."], correct: 2 },
        { id: 10, question: "What are they going to give their granddaughter for her birthday?", options: ["(A) Money", "(B) Clothes", "(C) A hat", "(D) They can’t decide."], correct: 3 }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Professor: Good afternoon, everyone. Welcome to this English class. It's acceptable for intermediate learners, though we aim higher. I have just received the results of your diagnostic test – most of you got around 6.5, which is a good start. Remember, if you miss a deadline your tutor has set for homework, you will be given a zero; no excuses without documentation. Angela was an intelligent kid in class last term; she excelled but learned the hard way about deadlines. On another note, the restaurant in the main street has a good menu, nice food, and lots of options for vegetarians – all correct choices if you're dining out after class.",
      questions: [
        { id: 11, question: "The class is __________.", options: ["(A) good enough", "(B) acceptable", "(C) awful", "(D) success"], correct: 1 },
        { id: 12, question: "I have just _________.", options: ["(A) done a master’s", "(B) got the result of my English test", "(C) got 6.5", "(D) get"], correct: 1 },
        { id: 13, question: "If miss a deadline your tutor has set, you __________.", options: ["(A) will be given a zero", "(B) will get 50% of your marks", "(C) will be fined", "(D) will get all marks"], correct: 0 },
        { id: 14, question: "Angela was __________.", options: ["(A) an intelligent kid in class", "(B) a bit bored at her school", "(C) an AI", "(D) already"], correct: 0 },
        { id: 15, question: "The restaurant in the main street __________.", options: ["(A) has a good menu", "(B) has nice food", "(C) has a lots of option for vegetarians", "(D) all correct"], correct: 3 }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 câu hỏi - Một đoạn hội thoại mở rộng (dài hơn). Nghe và chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: "Customer: Hi, I'd like to return this tie, please. It was a birthday present from my girlfriend.\nSales Associate: Sure, when was it bought?\nCustomer: A few weeks ago.\nSales Associate: Any problem with it?\nCustomer: No, just not my style. I didn't bring the receipt – she must have tossed it. But the store tag is still on.\nSales Associate: I see, but without the receipt, I can't process a full refund. Our policy requires proof that it was shopped in this store.\nCustomer: Come on, the tag proves it!\nSales Associate: To calm the man down, I can give store credit instead. Or check your credit card for the transaction details.",
      questions: [
        { id: 16, question: "The tie __________.", options: ["(A) was a birthday present", "(B) was a Christmas present", "(C) was a gift of a boyfriend", "(D) all correct"], correct: 0 },
        { id: 17, question: "The tie was purchased ___________.", options: ["(A) last week", "(B) a few weeks ago", "(C) two weeks ago", "(D) two years ago"], correct: 1 },
        { id: 18, question: "When asking for refunding, the man __________.", options: ["(A) had a receipt", "(B) left his receipt at home", "(C) didn’t have receipt", "(D) don’t receipt"], correct: 2 },
        { id: 19, question: "She (the shop assistant) didn’t agree to pay back money because __________.", options: ["(A) she didn’t believe in the man", "(B) the man couldn’t prove that the tie was shopped in her store", "(C) she has no right to do so", "(D) she hadn’t believed"], correct: 1 },
        { id: 20, question: "The shop assistant tries to __________.", options: ["(A) make the man angry", "(B) calm the man down", "(C) bother the man", "(D) make the man happy"], correct: 1 }
      ]
    },
    // Phần Reading giữ nguyên (không cần cập nhật script/audio)
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
      type: "reading",
      questions: [
        { id: 21, question: "Customer reviews indicate that many modern mobile devices are often unnecessarily _______.", options: ["(A) Complication", "(B) Complicates", "(C) Complicate", "(D) Complicated"], correct: 3 },
        { id: 22, question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.", options: ["(A) who", "(B) whose", "(C) they", "(D) those"], correct: 3 },
        { id: 23, question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.", options: ["(A) despite", "(B) except", "(C) since", "(D) during"], correct: 2 },
        { id: 24, question: "All clothing sold in Develyn’s Boutique is made from natural materials and contains no __________ dyes.", options: ["(A) immediate", "(B) synthetic", "(C) reasonable", "(D) assumed"], correct: 1 },
        { id: 25, question: "Gyeon Corporation’s continuing education policy states that _______ learning new skills enhances creativity and focus.", options: ["(A) regular", "(B) regularity", "(C) regulate", "(D) regularly"], correct: 3 },
        { id: 26, question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.", options: ["(A) include", "(B) includes", "(C) included", "(D) including"], correct: 0 },
        { id: 27, question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.", options: ["(A) before", "(B) during", "(C) between", "(D) unless"], correct: 0 },
        { id: 28, question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.", options: ["(A) independence", "(B) independently", "(C) independent", "(D) dependently"], correct: 1 },
        { id: 29, question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.", options: ["(A) postponed", "(B) postponing", "(C) postpone", "(D) postpones"], correct: 0 },
        { id: 30, question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.", options: ["(A) environment", "(B) equipment", "(C) advertisement", "(D) appointment"], correct: 0 }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Marketing Department Staff
From: Clara Lee, Marketing Director
Subject: Upcoming Product Launch Preparation
Dear Team,
As you all know, we are preparing for the official launch of our new product line, the EcoSmart Home Series, scheduled for early next quarter. In order to ensure a successful debut, we will begin a series of meetings next week to finalize the promotional strategy. Each team member will be assigned specific responsibilities to (31) smooth coordination between departments.
Our primary objective is to increase brand awareness and attract potential customers through both online and offline marketing channels. The social media team will focus on digital advertising, while the design team will create visual materials to (32) our brand image.
Additionally, we will collaborate closely with our sales representatives to collect feedback from clients. This will help us make any necessary adjustments before the official release. Please note that all suggestions should be submitted to my office no later than Friday, March 22, so that we have enough time to review and (33) them.
The official press conference will take place at our headquarters on April 5. We expect several major media outlets to attend, so everyone must be prepared to present our product in the most professional manner possible. A rehearsal session will be held two days before the event to (34) that all participants are comfortable with their roles.
For those who are new to the team, we will organize a short orientation program to explain our marketing policies and internal communication procedures. Attendance is highly encouraged, as this session will provide essential information on how to (35) with other departments effectively.
We truly appreciate everyone’s dedication and teamwork during this busy time. Your hard work and creativity will certainly make this product launch a success. If you have any questions or concerns, please don’t hesitate to (36) me directly.
Thank you once again for your continued commitment to excellence. I am confident that, together, we will achieve outstanding results.
Best regards,
Clara Lee
Marketing Director`,
      questions: [
        { id: 31, question: "(31)", options: ["(A) ensure", "(B) suggest", "(C) describe", "(D) remind"], correct: 0 },
        { id: 32, question: "(32)", options: ["(A) attend", "(B) improve", "(C) reinforce", "(D) prevent"], correct: 2 },
        { id: 33, question: "(33)", options: ["(A) reject", "(B) implement", "(C) transfer", "(D) decline"], correct: 1 },
        { id: 34, question: "(34)", options: ["(A) warn", "(B) announce", "(C) require", "(D) ensure"], correct: 3 },
        { id: 35, question: "(35)", options: ["(A) compete", "(B) cooperate", "(C) complain", "(D) compare"], correct: 1 },
        { id: 36, question: "(36)", options: ["(A) reach", "(B) push", "(C) delay", "(D) ignore"], correct: 0 },
        { id: 37, question: "The EcoSmart Home Series will most likely be released (37).", options: ["(A) next week", "(B) early next quarter", "(C) by the end of the year", "(D) after the press conference"], correct: 1 },
        { id: 38, question: "What is the main purpose of this message?", options: ["(A) To introduce a new marketing policy", "(B) To inform staff of product launch preparations", "(C) To announce the cancellation of a campaign", "(D) To request client feedback after the event"], correct: 1 },
        { id: 39, question: "Who is the sender of this message?", options: ["(A) A sales representative", "(B) A design manager", "(C) The marketing director", "(D) The chief financial officer"], correct: 2 },
        { id: 40, question: "When will the rehearsal for the press conference take place?", options: ["(A) March 22", "(B) April 3", "(C) April 5", "(D) The following week"], correct: 1 }
      ]
    },
    part7: {
      title: "PART 7: Multiple Texts (Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Business Audio Pro Advertisement: Visit our website to hear voice samples, add phone numbers, and submit payments. We specialize in professional recordings, recently expanded to multilingual services. Response within 24 hours.
Ms. Annesly's Email: Dear Business Audio Pro, I need professional voice talent for on-hold messages and customized scripts in English and Spanish. No music samples needed. Please call me during business hours. Best, Ms. Annesly (Business Owner).`,
      questions: [
        { id: 41, question: "According to the advertisement, why should customers visit the Business Audio Pro Web site?", options: ["(A) To hear voice samples", "(B) To add a new phone number", "(C) To submit a credit card payment", "(D) To request recording equipment"], correct: 0 },
        { id: 42, question: "What is suggested about Business Audio Pro?", options: ["(A) It fills orders once a week.", "(B) It advertises in the newspaper.", "(C) It specializes in data-processing services.", "(D) It has recently expanded its business."], correct: 3 },
        { id: 43, question: "Who most likely is Ms. Annesly?", options: ["(A) An actor", "(B) A script writer", "(C) A sales associate", "(D) A business owner"], correct: 3 },
        { id: 44, question: "What service does Ms. Annesly NOT request from Business Audio Pro?", options: ["(A) Professional voice talent", "(B) On-hold messages", "(C) Customized script writing", "(D) Multilingual voice production"], correct: 3 },
        { id: 45, question: "What will Ms. Annesly most likely do within 24 hours?", options: ["(A) Meet with an actor", "(B) Visit a recording studio", "(C) Write a script", "(D) Speak with a representative"], correct: 3 },
        { id: 46, question: "According to the advertisement, Business Audio Pro will respond to customer inquiries within", options: ["(A) 12 hours", "(B) 24 hours", "(C) 48 hours", "(D) three business days"], correct: 1 },
        { id: 47, question: "What can be inferred about Business Audio Pro’s services?", options: ["(A) They are limited to English-speaking clients.", "(B) They are available only on weekends.", "(C) They can accommodate different languages.", "(D) They require customers to visit the office in person."], correct: 2 },
        { id: 48, question: "What does Ms. Annesly specifically request in her message?", options: ["(A) A sample of recorded music", "(B) A bilingual voicemail recording", "(C) A newspaper advertisement", "(D) A refund for a previous order"], correct: 1 },
        { id: 49, question: "What detail does Ms. Annesly include to make communication easier?", options: ["(A) Her office address", "(B) Her preferred calling hours", "(C) Her company’s website link", "(D) Her client list"], correct: 1 },
        { id: 50, question: "What is the likely next step for Business Audio Pro?", options: ["(A) Sending Ms. Annesly a contract to sign", "(B) Visiting Ms. Annesly’s office for recording", "(C) Calling Ms. Annesly to discuss her project and pricing", "(D) Posting a new advertisement in the newspaper"], correct: 2 }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `Mr. Bach (11:59): Flight delayed in Beijing – arriving Kansai at 12:06 instead of 12:00. Sorry!
Mr. Otani (12:00): No problem. I'll confirm the arrival time and pick you up at customs door.
Mr. Bach (12:03): Thanks, still in time for our client meeting. Bad weather caused the delay.
Mr. Otani (12:15): Sure thing. Parking might be tight, but I'll wait.
Mr. Bach (20:15): Landed safely. See you soon!`,
      questions: [
        { id: 51, question: "What is suggested about Mr. Bach?", options: ["(A) He has been to Kansai more than once.", "(B) He currently works in Beijing.", "(C) He is on a business trip.", "(D) He works for Fly Right Airlines."], correct: 2 },
        { id: 52, question: "At 12:15, what does Mr. Otani mean when he writes, “Sure thing”?", options: ["(A) He has confirmed the arrival time of a flight.", "(B) He is certain he will be able to find a parking place.", "(C) He agrees to wait at the door near the customs area.", "(D) He knows Mr. Bach must pass through customs."], correct: 2 },
        { id: 53, question: "Why was Mr. Bach’s flight delayed?", options: ["(A) There was bad weather in Kansai.", "(B) He missed his connection in Beijing.", "(C) The airline changed the departure time.", "(D) He forgot to check in early."], correct: 0 },
        { id: 54, question: "What time is Mr. Bach’s new flight expected to arrive?", options: ["(A) 11:59", "(B) 12:06", "(C) 18:00", "(D) 20:15"], correct: 1 },
        { id: 55, question: "What does Mr. Otani offer to do for Mr. Bach?", options: ["(A) Drive him to the hotel", "(B) Pick him up at the airport", "(C) Change his flight booking", "(D) Help carry his luggage"], correct: 1 },
        { id: 56, question: "What can be inferred about the two men?", options: ["(A) They are colleagues attending the same meeting.", "(B) They are family members traveling together.", "(C) They both work for Fly Right Airlines.", "(D) They have never met before."], correct: 0 },
        { id: 57, question: "At 12:06, why does Mr. Bach mention “still in time for our client meeting”?", options: ["(A) To apologize for missing the meeting", "(B) To confirm he will not be late", "(C) To ask about the meeting location", "(D) To cancel his attendance"], correct: 1 },
        { id: 58, question: "What does Mr. Otani mean when he writes, “I’ll confirm the arrival time”?", options: ["(A) He plans to check the airline’s schedule.", "(B) He will change the meeting time.", "(C) He needs to contact the travel agent.", "(D) He will book another ticket for Mr. Bach."], correct: 0 },
        { id: 59, question: "What is implied about Mr. Otani’s travel to the airport?", options: ["(A) He expects heavy traffic or limited parking.", "(B) He plans to take public transportation.", "(C) He works at the airport.", "(D) He has never been to Kansai Airport before."], correct: 0 },
        { id: 60, question: "What does Mr. Bach express in his final message?", options: ["(A) Thanks for the help", "(B) Regret about missing the meeting", "(C) Frustration with the airline", "(D) Request for flight confirmation"], correct: 0 }
      ]
    }
  }
};