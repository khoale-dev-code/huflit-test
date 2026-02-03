export const EXAM1_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 1",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu)",
  
  metadata: {
    exam: "exam1",
    hasAudio: true,
    listeningAudioUrl: "/public/data/audio/exam1/listening/full.mp3",
  },

  parts: {
    // ==========================================
    // LISTENING PART 1
    // ==========================================
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe 5 đoạn hội thoại ngắn. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam1/listening/part1.mp3",
      script: `Câu 01: Shopping Experience
Michael: Hi Sarah! I just got back from the shopping mall.

Sarah: Oh wonderful! Did you find anything nice?

Michael: Well, I went looking for a new jacket and some shoes, but honestly, I'm quite disappointed. The problem is the prices. Everything was just ridiculously expensive! I didn't buy anything in the end because the prices were way too high.

Sarah: Oh no, that's too bad.

---

Câu 02: Gap Year in Thailand
David: Jennifer, welcome back! How long were you in Thailand exactly?

Jennifer: Hi David! It was amazing. I spent seven months there altogether.

David: Seven months! That's quite a long time. What did you do all that time?

Jennifer: I taught English for five months, and then I traveled for the remaining two months.

---

Câu 03: Business Trip to Taipei
Robert: Hi Victoria! Did you do any shopping in Taipei?

Victoria: Yes, I did, but I didn't go crazy with it. I bought a few things - some local tea, a small jade bracelet, and a couple of books about Taiwan's history.

Robert: A few things, that's nice.

---

Câu 04: Planning a Trip to Japan
Andrew: Lisa, do you have any recommendations about when I should go to Japan?

Lisa: Oh, you should definitely go in spring!

Andrew: Why spring specifically?

Lisa: Well, all of my friends who've been to Japan told me that spring is the best time to visit. The cherry blossoms are beautiful.

---

Câu 05: Navigating Tokyo
Amanda: Christopher, how was Tokyo? Easy to navigate?

Christopher: Well, to be honest, no. It was pretty difficult to get around, actually.

Amanda: Really? I thought the public transportation was good.

Christopher: It is, but there are so many lines and stations. Everything is so confusing.`,

      questions: [
        {
          id: 1,
          question: "Why didn't Michael buy anything?",
          options: [
            "A. He didn't find anything beautiful.",
            "B. He found the prices too high.",
            "C. He bought a lot of things because they're really cheap.",
            "D. He didn't have enough time."
          ],
          correct: 1,
          explanation: "Michael nói: 'I didn't buy anything in the end because the prices were way too high.' → Anh không mua gì vì giá quá cao."
        },
        {
          id: 2,
          question: "How long did Jennifer spend in Thailand?",
          options: [
            "A. She spent one month there.",
            "B. She spent seven months there.",
            "C. She spent one week there.",
            "D. She spent several times there."
          ],
          correct: 1,
          explanation: "Jennifer nói: 'I spent seven months there altogether.' → Cô ấy ở Thái Lan 7 tháng."
        },
        {
          id: 3,
          question: "What did Victoria buy in Taipei?",
          options: [
            "A. She didn't buy anything in Taipei.",
            "B. She bought many things in Taipei.",
            "C. She bought a few things in Taipei.",
            "D. She bought a souvenir in Taipei."
          ],
          correct: 2,
          explanation: "Victoria nói: 'I bought a few things - some local tea, a small jade bracelet, and a couple of books' → Cô mua một vài món đồ."
        },
        {
          id: 4,
          question: "When should Andrew visit Japan according to Lisa?",
          options: [
            "A. People told him to visit in the summer.",
            "B. People didn't tell him to visit in the spring.",
            "C. People told him to visit in the spring.",
            "D. People told him to visit in the autumn."
          ],
          correct: 2,
          explanation: "Lisa nói: 'you should definitely go in spring! The cherry blossoms are beautiful.' → Nên đi vào mùa xuân."
        },
        {
          id: 5,
          question: "How does Christopher feel about navigating Tokyo?",
          options: [
            "A. He found that Tokyo was very easy to get around.",
            "B. He found that Tokyo was not easy to get around.",
            "C. He found that Tokyo was a little bit easy to get around.",
            "D. He found that Tokyo was too busy to get around."
          ],
          correct: 1,
          explanation: "Christopher nói: 'It was pretty difficult to get around' → Khó tìm đường."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 2
    // ==========================================
    part2: {
      title: "PART 2: Conversation",
      description: "Nghe một đoạn hội thoại giữa 3 người tại quán cà phê. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam1/listening/part2.mp3",
      script: `MARK: Alright everyone, before we order, let's just check—who wants orange juice? I know I do.

LINDA: Same here. I really need something fresh today.

ROBERTSON: Me too. I'll have orange juice as well.

MARK: Okay, that's three so far. What about you, Linda?

LINDA: I already said yes, Mark. That makes three of us.

MARK: Right, sorry. So three orange juices. Got it. Are you sure you don't want anything to eat, Linda? The sandwiches here are pretty good.

LINDA: No, thanks. I'm really not hungry right now. I had a big breakfast this morning.

MARK: Fair enough.

ROBERTSON: This place reminds me of my old job, actually.

MARK: Oh really? I thought you owned a restaurant before.

ROBERTSON: I used to, years ago. But now I spend most of my time working with young players. I coach at a local sports academy.

MARK: That sounds rewarding.

By the way, my mother-in-law is coming to lunch tomorrow... and she's bringing her sister along.

MARK: Speaking of family, have you decided what to give your granddaughter for her birthday yet?

ROBERTSON: Honestly, we're still talking about it. My wife thinks clothes, I think money... we haven't made a final decision yet.`,

      questions: [
        {
          id: 6,
          question: "How many people want orange juice?",
          options: [
            "A. Two",
            "B. Three",
            "C. Four",
            "D. Five"
          ],
          correct: 1,
          explanation: "Mark, Linda, và Robertson đều muốn nước cam. Mark xác nhận: 'So three orange juices.'"
        },
        {
          id: 7,
          question: "Why doesn't the woman (Linda) want anything to eat?",
          options: [
            "A. Because she's not hungry.",
            "B. Because she doesn't feel well.",
            "C. Because she's on a diet.",
            "D. Because the food is not good enough."
          ],
          correct: 0,
          explanation: "Linda nói: 'I'm really not hungry right now. I had a big breakfast this morning.'"
        },
        {
          id: 8,
          question: "What does Robertson do now?",
          options: [
            "A. He owns a restaurant.",
            "B. He works in Orlando.",
            "C. He works with young players.",
            "D. He works in a restaurant."
          ],
          correct: 2,
          explanation: "Robertson nói: 'now I spend most of my time working with young players. I coach at a local sports academy.'"
        },
        {
          id: 9,
          question: "Who's coming to lunch?",
          options: [
            "A. The man's mother-in-law and his sister.",
            "B. The man's mother and his sister-in-law.",
            "C. The man's mother-in-law and her sister.",
            "D. The man's sister-in-law and his sister."
          ],
          correct: 2,
          explanation: "Mark nói: 'my mother-in-law is coming to lunch tomorrow... and she's bringing her sister along.'"
        },
        {
          id: 10,
          question: "What are they going to give their granddaughter for her birthday?",
          options: [
            "A. Money",
            "B. Clothes",
            "C. A hat",
            "D. They can't decide."
          ],
          correct: 3,
          explanation: "Robertson nói: 'we're still talking about it... we haven't made a final decision yet.'"
        }
      ]
    },

    // ==========================================
    // LISTENING PART 3
    // ==========================================
    part3: {
      title: "PART 3: Monologue",
      description: "Nghe một bài nói độc thoại. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam1/listening/part3.mp3",
      script: `Hello everyone, and a very warm welcome back to the podcast! I'm your host, Angela Carter. I hope you're all having a fantastic week. Today, I've been doing a bit of soul-searching, and I wanted to share a quick reflection on my recent learning journey, along with a few personal stories that I think many of you might relate to.

First off, let's talk about that English course I finally wrapped up last week. You know how sometimes you sign up for a class and it's just... okay? Well, this wasn't that. I can honestly tell you, looking back, the class was a real success. It wasn't just 'acceptable' or 'good enough'—and thank goodness it was far from 'awful'! The energy in the room was electric, and the tutor really knew how to break down those complex grammar walls. By the final session, I walked out of there feeling like a different person.

And speaking of results, I have some major personal news to share with you all. It's been a week of nervous waiting, but I've just got the result of my English test! When I saw that email notification, my heart actually skipped a beat. After all those late nights and endless practice exercises, seeing the score was just so rewarding. It's a great reminder that the grind really does pay off.

However, it wasn't all sunshine and rainbows. Our tutor was legendary for being strict about one thing: accountability. She made it crystal clear from day one that if you miss a deadline she has set, you will only get fifty percent of your marks for that task. No excuses! While that 50% penalty felt a bit harsh at first, it actually forced me to stop procrastinating and finally master my calendar.

Reflecting on this made me think about my younger self. To be honest, I was a bit bored at my school back then. It wasn't that I was a poor student or lacked intelligence—far from it—but the traditional classroom just didn't spark anything in me. I often found the lessons repetitive and, frankly, struggled to see the point of it all. Funny how much things change when you're an adult and you actually choose what you want to learn, right?

Anyway, before I let you go, I have to give a shout-out to a little gem I found. Last weekend, I finally checked out that restaurant on Main Street a friend kept raving about. And wow—it has a great menu, the food is absolutely delicious, and what impressed me most was that it has lots of options for vegetarians. Usually, you only get one of those things, but this place had it all. It's definitely my new favorite spot.

Thanks so much for tuning in today. It's been a pleasure sharing these moments with you. Until next time, keep learning and keep exploring!`,

      questions: [
        {
          id: 11,
          question: "Angela describes the English class as __________.",
          options: [
            "A. good enough",
            "B. acceptable",
            "C. awful",
            "D. a real success"
          ],
          correct: 3,
          explanation: "Angela nói: 'the class was a real success. It wasn't just acceptable or good enough—and thank goodness it was far from awful!'"
        },
        {
          id: 12,
          question: "Angela has just __________.",
          options: [
            "A. done a master's",
            "B. got the result of my English test",
            "C. got 6.5",
            "D. get"
          ],
          correct: 1,
          explanation: "Angela nói: 'I've just got the result of my English test!'"
        },
        {
          id: 13,
          question: "If you miss a deadline your tutor has set, you __________.",
          options: [
            "A. will be given a zero",
            "B. will get 50% of your marks",
            "C. will be fined",
            "D. will get all marks"
          ],
          correct: 1,
          explanation: "Angela nói: 'if you miss a deadline she has set, you will only get fifty percent of your marks for that task.'"
        },
        {
          id: 14,
          question: "Angela was __________.",
          options: [
            "A. an intelligent kid in class",
            "B. a bit bored at her school",
            "C. an AI",
            "D. already"
          ],
          correct: 1,
          explanation: "Angela nói: 'I was a bit bored at my school back then' và giải thích 'the traditional classroom just didn't spark anything in me.'"
        },
        {
          id: 15,
          question: "The restaurant in the main street __________.",
          options: [
            "A. has a good menu",
            "B. has nice food",
            "C. has lots of options for vegetarians",
            "D. all correct"
          ],
          correct: 3,
          explanation: "Angela nói: 'it has a great menu, the food is absolutely delicious, and what impressed me most was that it has lots of options for vegetarians.'"
        }
      ]
    },

    // ==========================================
    // LISTENING PART 4
    // ==========================================
    part4: {
      title: "PART 4: Extended Conversation",
      description: "Nghe một đoạn hội thoại dài. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam1/listening/part4.mp3",
      script: `NARRATOR: A customer named Michael is at a men's clothing store asking to return a tie he bought.

MICHAEL: Hi, I need to return a tie. This tie was given to me as a birthday present from my wife. But then I also got the same tie as a Christmas present from my company. And my daughter just gave me the same tie as a gift too!

JESSICA: Oh wow! So the tie was a birthday present, a Christmas present, and a gift from your daughter?

MICHAEL: Exactly! I have three of the same tie now. I'd like to return one.

JESSICA: When did you receive the first tie?

MICHAEL: My wife gave me the first one about two weeks ago on my birthday. That's when she bought it from your store.

JESSICA: So the tie was purchased two weeks ago?

MICHAEL: Yes, two weeks ago. That's the one I want to return.

JESSICA: Do you have the receipt?

MICHAEL: No, I don't have the receipt. My wife bought it as a gift and didn't give me the receipt. I'm sorry, but the tie is definitely from your store. I remember the packaging.

JESSICA: Without a receipt, I need proof of purchase. Do you have it at home?

MICHAEL: I'm not sure if my wife kept it. It's been two weeks. I don't have the receipt.

MICHAEL: But why won't you help? I have the tie and it's from your store!

JESSICA: Without a receipt, I have no way to verify that this tie was purchased from our store. It could be from anywhere—another store, online, anywhere. Company policy requires proof of purchase. Without the receipt, the man couldn't prove that the tie was purchased from our store. I simply don't have the authority to process a refund without proof.

MICHAEL: So you don't believe me?

JESSICA: It's not about believing you. It's about having documentation. I cannot authorize a refund without proof. That's the policy.

MICHAEL: I'm frustrated. This doesn't seem fair.

JESSICA: I understand your frustration and I really want to help. Go home and look for the receipt. Check your email for a receipt confirmation. Check your wife's credit card statement. If you find any proof of purchase, bring it back and I'll process your return immediately.

MICHAEL: That's actually helpful. Thank you.

JESSICA: You're welcome. Let's stay positive. You've got this! Come back when you find the proof, and we'll take care of you.

NARRATOR: Michael left the store to search for the receipt. Jessica tried to help him by suggesting solutions, even though she couldn't process the return without proof of purchase.`,

      questions: [
        {
          id: 16,
          question: "The tie __________.",
          options: [
            "A. was a birthday present",
            "B. was a Christmas present",
            "C. was a gift of a boyfriend",
            "D. all correct"
          ],
          correct: 0,
          explanation: "Michael nói: 'This tie was given to me as a birthday present from my wife.'"
        },
        {
          id: 17,
          question: "The tie was purchased __________.",
          options: [
            "A. last week",
            "B. a few weeks ago",
            "C. two weeks ago",
            "D. two years ago"
          ],
          correct: 2,
          explanation: "Michael nói: 'My wife gave me the first one about two weeks ago on my birthday.'"
        },
        {
          id: 18,
          question: "When asking for refunding, the man __________.",
          options: [
            "A. had a receipt",
            "B. left his receipt at home",
            "C. didn't have receipt",
            "D. don't receipt"
          ],
          correct: 2,
          explanation: "Michael nói: 'No, I don't have the receipt. My wife bought it as a gift and didn't give me the receipt.'"
        },
        {
          id: 19,
          question: "She (the shop assistant) didn't agree to pay back money because __________.",
          options: [
            "A. she didn't believe in the man",
            "B. the man couldn't prove that the tie was purchased from her store",
            "C. she has no right to do so",
            "D. she hadn't believed"
          ],
          correct: 1,
          explanation: "Jessica nói: 'Without a receipt, I have no way to verify that this tie was purchased from our store. Company policy requires proof of purchase.'"
        },
        {
          id: 20,
          question: "The shop assistant tries to __________.",
          options: [
            "A. make the man angry",
            "B. calm the man down",
            "C. bother the man",
            "D. make the man happy"
          ],
          correct: 1,
          explanation: "Jessica nói: 'I understand your frustration and I really want to help... Let's stay positive. You've got this!'"
        }
      ]
    },

    // ==========================================
    // READING PART 5 - GRAMMAR/VOCABULARY
    // ==========================================
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu.",
      type: "reading",
      questions: [
        {
          id: 21,
          question: "Customer reviews indicate that many modern mobile devices are often unnecessarily _______.",
          options: [
            "A. Complication",
            "B. Complicates",
            "C. Complicate",
            "D. Complicated"
          ],
          correct: 3,
          explanation: "Cấu trúc: 'devices are _______' yêu cầu tính từ. 'Complicated' là đáp án đúng (có nghĩa là phức tạp)."
        },
        {
          id: 22,
          question: "Among ________ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.",
          options: [
            "A. who",
            "B. whose",
            "C. they",
            "D. those"
          ],
          correct: 3,
          explanation: "'Among those recognized... were [subject]' sử dụng 'those' làm đại từ. 'Those' = những người được công nhận."
        },
        {
          id: 23,
          question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.",
          options: [
            "A. despite",
            "B. except",
            "C. since",
            "D. during"
          ],
          correct: 2,
          explanation: "'has received... since' là cấu trúc thì hiện tại hoàn thành đúng. 'Since' = từ khi nào đó."
        },
        {
          id: 24,
          question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no __________ dyes.",
          options: [
            "A. immediate",
            "B. synthetic",
            "C. reasonable",
            "D. assumed"
          ],
          correct: 1,
          explanation: "'Synthetic dyes' (thuốc nhuộm nhân tạo) trái ngược với 'natural materials'. 'Synthetic' = nhân tạo."
        },
        {
          id: 25,
          question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.",
          options: [
            "A. regular",
            "B. regularity",
            "C. regulate",
            "D. regularly"
          ],
          correct: 0,
          explanation: "'regular learning' cần tính từ để mô tả danh từ 'learning'. 'Regular' = thường xuyên, đều đặn."
        },
        {
          id: 26,
          question: "The new employee orientation will begin at 9 a.m. and will _______ an overview of company policies.",
          options: [
            "A. include",
            "B. includes",
            "C. included",
            "D. including"
          ],
          correct: 0,
          explanation: "'will + V nguyên thể' là cấu trúc thì tương lai đơn. 'Include' = bao gồm."
        },
        {
          id: 27,
          question: "To ensure product quality, all items must be thoroughly tested _______ being shipped to customers.",
          options: [
            "A. before",
            "B. during",
            "C. between",
            "D. unless"
          ],
          correct: 0,
          explanation: "'before + V-ing' chỉ hành động xảy ra trước một hành động khác. 'Before' = trước khi."
        },
        {
          id: 28,
          question: "The marketing department is seeking a graphic designer who can work _______ and meet tight deadlines.",
          options: [
            "A. independence",
            "B. independently",
            "C. independent",
            "D. dependently"
          ],
          correct: 1,
          explanation: "Sau động từ 'work' cần trạng từ. 'Independently' = độc lập. (work independently = làm việc độc lập)"
        },
        {
          id: 29,
          question: "Because of the heavy rain, the outdoor event has been _______ until next weekend.",
          options: [
            "A. postponed",
            "B. postponing",
            "C. postpone",
            "D. postpones"
          ],
          correct: 0,
          explanation: "'has been + V3' là cấu trúc thì hiện tại hoàn thành bị động. 'Postponed' = được hoãn lại."
        },
        {
          id: 30,
          question: "The manager reminded the staff that punctuality and teamwork are key factors in maintaining a positive _______.",
          options: [
            "A. environment",
            "B. equipment",
            "C. advertisement",
            "D. appointment"
          ],
          correct: 0,
          explanation: "'positive environment' (môi trường tích cực) là collocation phù hợp. 'Environment' = môi trường."
        }
      ]
    },

    // ==========================================
    // READING PART 6 - CLOZE TEXT
    // ==========================================
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản email.",
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

We truly appreciate everyone's dedication and teamwork during this busy time. Your hard work and creativity will certainly make this product launch a success. If you have any questions or concerns, please don't hesitate to (36) me directly.

Thank you once again for your continued commitment to excellence. I am confident that, together, we will achieve outstanding results.

Best regards,
Clara Lee
Marketing Director
InnovateTech Solutions`,

      questions: [
        {
          id: 31,
          question: "(31) - Điền từ thích hợp",
          options: [
            "A. ensure",
            "B. suggest",
            "C. describe",
            "D. remind"
          ],
          correct: 0,
          explanation: "'ensure + noun' = 'đảm bảo rằng'. Cấu trúc: 'assigned specific responsibilities to ensure smooth coordination.'"
        },
        {
          id: 32,
          question: "(32) - Điền từ thích hợp",
          options: [
            "A. attend",
            "B. improve",
            "C. reinforce",
            "D. prevent"
          ],
          correct: 2,
          explanation: "'reinforce brand image' = 'tăng cường/củng cố hình ảnh thương hiệu'. Reinforce = làm cho mạnh mẽ hơn."
        },
        {
          id: 33,
          question: "(33) - Điền từ thích hợp",
          options: [
            "A. reject",
            "B. implement",
            "C. transfer",
            "D. decline"
          ],
          correct: 1,
          explanation: "'review and implement' = 'xem xét và triển khai'. Implement = đưa vào thực hiện, triển khai."
        },
        {
          id: 34,
          question: "(34) - Điền từ thích hợp",
          options: [
            "A. warn",
            "B. announce",
            "C. require",
            "D. ensure"
          ],
          correct: 3,
          explanation: "'ensure + that + clause' = 'đảm bảo rằng'. Cấu trúc: 'held to ensure that all participants are comfortable.'"
        },
        {
          id: 35,
          question: "(35) - Điền từ thích hợp",
          options: [
            "A. compete",
            "B. cooperate",
            "C. complain",
            "D. compare"
          ],
          correct: 1,
          explanation: "'cooperate with other departments' = 'hợp tác với các phòng ban khác'. Cooperate = làm việc cùng nhau."
        },
        {
          id: 36,
          question: "(36) - Điền từ thích hợp",
          options: [
            "A. reach",
            "B. push",
            "C. delay",
            "D. ignore"
          ],
          correct: 0,
          explanation: "'reach me directly' = 'liên hệ với tôi trực tiếp'. Reach = tiếp cận, liên hệ."
        },
        {
          id: 37,
          question: "The EcoSmart Home Series will most likely be released __________.",
          options: [
            "A. next week",
            "B. early next quarter",
            "C. by the end of the year",
            "D. after the press conference"
          ],
          correct: 1,
          explanation: "Email nói rõ: 'scheduled for early next quarter' → Sản phẩm sẽ được ra mắt vào đầu quý tới."
        },
        {
          id: 38,
          question: "What is the main purpose of this message?",
          options: [
            "A. To introduce a new marketing policy",
            "B. To inform staff of product launch preparations",
            "C. To announce the cancellation of a campaign",
            "D. To request client feedback after the event"
          ],
          correct: 1,
          explanation: "Email nói: 'we are preparing for the official launch' và thảo luận về các bước chuẩn bị → Mục đích là thông báo chuẩn bị ra mắt sản phẩm."
        },
        {
          id: 39,
          question: "Who is the sender of this message?",
          options: [
            "A. A sales representative",
            "B. A design manager",
            "C. The marketing director",
            "D. The chief financial officer"
          ],
          correct: 2,
          explanation: "Email kí tên: 'Clara Lee, Marketing Director' → Người gửi là giám đốc marketing."
        },
        {
          id: 40,
          question: "When will the rehearsal for the press conference take place?",
          options: [
            "A. March 22",
            "B. April 3",
            "C. April 5",
            "D. The following week"
          ],
          correct: 1,
          explanation: "Email nói: 'press conference will take place... on April 5' và 'rehearsal session will be held two days before the event' → April 5 - 2 ngày = April 3."
        }
      ]
    },

    // ==========================================
    // READING PART 7 - MULTIPLE TEXTS
    // ==========================================
    part7: {
      title: "PART 7: Multiple Texts (Advertisement & Email)",
      description: "10 câu hỏi - Đọc quảng cáo dịch vụ và email khách hàng, chọn đáp án tốt nhất.",
      type: "reading",
      text: `BUSINESS AUDIO PRO
Enhance Your Company's Image with a Professionally Recorded Telephone Greeting

A professional, personalized voicemail message creates an excellent first impression. Business Audio Pro meets your specifications to record a customized telephone greeting within three business days!

SERVICES WE OFFER:

1. Professional Voice Talent for Voicemail Messages – We have numerous male and female voice actors with a wide range of tones, accents, and dialects. Visit businessaudiopro.com to hear examples of what each actor sounds like and choose the one that best suits your needs.

2. On-Hold Messages – We also create professional on-hold messages with pleasant music to enhance your customers' experience.

3. Customized Script Writing – Our experienced script writers can help you craft a personalized message that represents you and your business.

4. Multilingual Voice Production – For those with a multilingual customer base, we offer services in a wide range of languages.

Send us an e-mail (inquiry@businessaudiopro.com) with your contact information and your specific needs. A representative will call you within 24 hours to discuss your project and provide a price estimate.

---

To: inquiry@businessaudiopro.com
From: j.annesly@anneslydata.com
Date: June 25
Subject: Request

I found your notice in the newspaper and wish to use your services for my data-processing and transcription business. I am looking specifically for a professionally recorded voicemail greeting intended for my clients, and I wonder if you would be available to write and record this for me, and how soon. Since I work with English- and Spanish-speaking clients, I would like the message to be recorded in both languages. Please reach out to me at my mobile phone between the hours of 10:00 A.M. and 5:00 P.M. I hope to hear from you soon.

Thank you,
Jody Annesly
Annesly Data
512-555-6879 (mobile)
342 Maymill Road, Fort Worth, TX 70609`,

      questions: [
        {
          id: 41,
          question: "According to the advertisement, why should customers visit the Business Audio Pro Web site?",
          options: [
            "A. To hear voice samples",
            "B. To add a new phone number",
            "C. To submit a credit card payment",
            "D. To request recording equipment"
          ],
          correct: 0,
          explanation: "Quảng cáo nói: 'Visit businessaudiopro.com to hear examples of what each actor sounds like.' → Để nghe các mẫu giọng nói."
        },
        {
          id: 42,
          question: "What is suggested about Business Audio Pro?",
          options: [
            "A. It fills orders once a week.",
            "B. It advertises in the newspaper.",
            "C. It specializes in data-processing services.",
            "D. It has recently expanded its business."
          ],
          correct: 1,
          explanation: "Email từ Annesly: 'I found your notice in the newspaper' → Business Audio Pro quảng cáo trên báo."
        },
        {
          id: 43,
          question: "Who most likely is Ms. Annesly?",
          options: [
            "A. An actor",
            "B. A script writer",
            "C. A sales associate",
            "D. A business owner"
          ],
          correct: 3,
          explanation: "Email: 'my data-processing and transcription business' + chữ ký 'Annesly Data' → Cô là chủ sở hữu doanh nghiệp."
        },
        {
          id: 44,
          question: "What service does Ms. Annesly NOT request from Business Audio Pro?",
          options: [
            "A. Professional voice talent",
            "B. On-hold messages",
            "C. Customized script writing",
            "D. Multilingual voice production"
          ],
          correct: 1,
          explanation: "Annesly yêu cầu: 'voicemail greeting', 'write and record', và 'both languages'. Cô KHÔNG đề cập 'on-hold messages' (thông điệp chờ trên đường)."
        },
        {
          id: 45,
          question: "What will Ms. Annesly most likely do within 24 hours?",
          options: [
            "A. Meet with an actor",
            "B. Visit a recording studio",
            "C. Write a script",
            "D. Speak with a representative"
          ],
          correct: 3,
          explanation: "Quảng cáo: 'A representative will call you within 24 hours to discuss your project' → Cô sẽ nói chuyện với đại diện công ty."
        },
        {
          id: 46,
          question: "According to the advertisement, Business Audio Pro will respond to customer inquiries within",
          options: [
            "A. 12 hours",
            "B. 24 hours",
            "C. 48 hours",
            "D. three business days"
          ],
          correct: 1,
          explanation: "Quảng cáo nói: 'A representative will call you within 24 hours' → Business Audio Pro sẽ trả lời trong vòng 24 giờ."
        },
        {
          id: 47,
          question: "What can be inferred about Business Audio Pro's services?",
          options: [
            "A. They are limited to English-speaking clients.",
            "B. They are available only on weekends.",
            "C. They can accommodate different languages.",
            "D. They require customers to visit the office in person."
          ],
          correct: 2,
          explanation: "Quảng cáo nói: 'Multilingual Voice Production – For those with a multilingual customer base, we offer services in a wide range of languages.' → Họ có thể cung cấp dịch vụ nhiều ngôn ngữ."
        },
        {
          id: 48,
          question: "What does Ms. Annesly specifically request in her message?",
          options: [
            "A. A sample of recorded music",
            "B. A bilingual voicemail recording",
            "C. A newspaper advertisement",
            "D. A refund for a previous order"
          ],
          correct: 1,
          explanation: "Email nói: 'I would like the message to be recorded in both languages' → Cô yêu cầu ghi âm lời chào hàng nhân viên bằng cả tiếng Anh và tiếng Tây Ban Nha."
        },
        {
          id: 49,
          question: "What detail does Ms. Annesly include to make communication easier?",
          options: [
            "A. Her office address",
            "B. Her preferred calling hours",
            "C. Her company's website link",
            "D. Her client list"
          ],
          correct: 1,
          explanation: "Email: 'Please reach out to me at my mobile phone between the hours of 10:00 A.M. and 5:00 P.M.' → Cô cung cấp thời gian gọi điện ưu tiên."
        },
        {
          id: 50,
          question: "What is the likely next step for Business Audio Pro?",
          options: [
            "A. Sending Ms. Annesly a contract to sign",
            "B. Visiting Ms. Annesly's office for recording",
            "C. Calling Ms. Annesly to discuss her project and pricing",
            "D. Posting a new advertisement in the newspaper"
          ],
          correct: 2,
          explanation: "Quảng cáo nói: 'A representative will call you within 24 hours to discuss your project and provide a price estimate.' → Bước tiếp theo là gọi để thảo luận dự án và giá."
        }
      ]
    },

    // ==========================================
    // READING PART 8 - TEXT MESSAGE CHAIN
    // ==========================================
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn, chọn đáp án tốt nhất.",
      type: "reading",
      text: `SAM BACH (11:59): My first flight was delayed, so I missed my connection in Beijing.
SAM BACH (12:00): So now, I'm going to be on a flight arriving in Kansai at 18:00.

AKIRA OTANI (12:05): OK. Same airline?

SAM BACH (12:06): It's still Fly Right Airlines. It will be later in the day but still in time for our client meeting.

AKIRA OTANI (12:06): I'll confirm the arrival time. Do you have any checked bags?

SAM BACH (12:10): I do. Would you mind meeting me at the door after I go through customs?

AKIRA OTANI (12:15): Sure thing. Parking spots can be hard to find, but now I'll have extra time to drive around and look.

SAM BACH (12:16): Yes, sorry about that. See you then!`,

      questions: [
        {
          id: 51,
          question: "What is suggested about Mr. Bach?",
          options: [
            "A. He has been to Kansai more than once.",
            "B. He currently works in Beijing.",
            "C. He is on a business trip.",
            "D. He works for Fly Right Airlines."
          ],
          correct: 2,
          explanation: "Mr. Bach đề cập đến 'our client meeting' (cuộc họp khách hàng của chúng ta), điều này ngụ ý ông đang thực hiện một chuyến công tác."
        },
        {
          id: 52,
          question: "At 12:15, what does Mr. Otani mean when he writes, 'Sure thing'?",
          options: [
            "A. He has confirmed the arrival time of a flight.",
            "B. He is certain he will be able to find a parking place.",
            "C. He agrees to wait at the door near the customs area.",
            "D. He knows Mr. Bach must pass through customs."
          ],
          correct: 2,
          explanation: "'Sure thing' là câu trả lời đồng ý cho yêu cầu trước đó: 'Would you mind meeting me at the door after I go through customs?'"
        },
        {
          id: 53,
          question: "Why was Mr. Bach's flight delayed?",
          options: [
            "A. There was bad weather in Kansai.",
            "B. He missed his connection in Beijing.",
            "C. The airline changed the departure time.",
            "D. He forgot to check in early."
          ],
          correct: 1,
          explanation: "Không có thông tin trực tiếp về lý do delay. Tuy nhiên, Mr. Bach nói 'My first flight was delayed, so I missed my connection in Beijing' → Chuyến bay đầu tiên bị trễ khiến anh lỡ kết nối."
        },
        {
          id: 54,
          question: "What time is Mr. Bach's new flight expected to arrive?",
          options: [
            "A. 11:59",
            "B. 12:06",
            "C. 18:00",
            "D. 20:15"
          ],
          correct: 2,
          explanation: "Mr. Bach thông báo ở tin nhắn lúc 12:00: 'I'm going to be on a flight arriving in Kansai at 18:00' → Đến lúc 18 giờ (6 chiều)."
        },
        {
          id: 55,
          question: "What does Mr. Otani offer to do for Mr. Bach?",
          options: [
            "A. Drive him to the hotel",
            "B. Pick him up at the airport",
            "C. Change his flight booking",
            "D. Help carry his luggage"
          ],
          correct: 1,
          explanation: "Bằng việc đồng ý 'meeting me at the door after I go through customs', Mr. Otani đang đề nghị đón Mr. Bach tại sân bay."
        },
        {
          id: 56,
          question: "What can be inferred about the two men?",
          options: [
            "A. They are colleagues attending the same meeting.",
            "B. They are family members traveling together.",
            "C. They both work for Fly Right Airlines.",
            "D. They have never met before."
          ],
          correct: 0,
          explanation: "Việc sử dụng cụm từ 'our client meeting' (cuộc họp khách hàng của chúng ta) cho thấy họ là đồng nghiệp và cùng tham gia vào một sự kiện công việc chung."
        },
        {
          id: 57,
          question: "At 12:06, why does Mr. Bach mention 'still in time for our client meeting'?",
          options: [
            "A. To apologize for missing the meeting",
            "B. To confirm he will not be late",
            "C. To ask about the meeting location",
            "D. To cancel his attendance"
          ],
          correct: 1,
          explanation: "Mr. Bach muốn trấn an Mr. Otani rằng mặc dù chuyến bay bị trễ nhưng ông vẫn sẽ đến kịp giờ cho cuộc họp với khách hàng."
        },
        {
          id: 58,
          question: "What does Mr. Otani mean when he writes, 'I'll confirm the arrival time'?",
          options: [
            "A. He plans to check the airline's schedule.",
            "B. He will change the meeting time.",
            "C. He needs to contact the travel agent.",
            "D. He will book another ticket for Mr. Bach."
          ],
          correct: 0,
          explanation: "Mr. Otani sẽ kiểm tra lại lịch trình thực tế của hãng hàng không để chắc chắn thời gian hạ cánh chính xác trước khi đi đón."
        },
        {
          id: 59,
          question: "What is implied about Mr. Otani's travel to the airport?",
          options: [
            "A. He expects heavy traffic or limited parking.",
            "B. He plans to take public transportation.",
            "C. He works at the airport.",
            "D. He has never been to Kansai Airport before."
          ],
          correct: 0,
          explanation: "Mr. Otani nói 'Parking spots can be hard to find, but now I'll have extra time to drive around and look.' → Ông dự đoán sẽ có khó khăn về bãi đỗ xe."
        },
        {
          id: 60,
          question: "What does Mr. Bach express in his final message?",
          options: [
            "A. Thanks for the help",
            "B. Regret about missing the meeting",
            "C. Frustration with the airline",
            "D. Request for flight confirmation"
          ],
          correct: 0,
          explanation: "Dòng cuối 'Yes, sorry about that. See you then!' mang hàm ý cảm ơn vì sự giúp đỡ và kiên nhẫn của Mr. Otani."
        }
      ]
    }
  }
};

export default EXAM1_DATA;