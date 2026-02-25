export const EXAM3_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 3",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu)",

  metadata: {
    exam: "exam3",
    hasAudio: true,
    listeningAudioUrl: "/public/data/audio/exam3/listening/full.mp3",
  },

  parts: {
    // ==========================================
    // LISTENING PART 1
    // ==========================================
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe 5 đoạn hội thoại ngắn. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam3/listening/part1.mp3",
      script: `Jani: Welcome to the department, Yuki. Let me show you around and tell you about your new colleagues. I'll introduce you to them all later.
Yuki: Great. Thanks. So, who are those people over there?
Jani: That's the order management team. Luciana deals with the new orders. She's the one with short, dark hair.
Yuki: In the purple dress?
Jani: Yeah, that's right. You'll probably work closely with her while you are learning about our ordering process.
Yuki: Got it, thanks. And who's that over there? The guy who's on the phone?
Jani: Oh, you mean the one by the window? In the green shirt? Ah, that's Ian. He's the marketing director. And that's Maria beside him. She's responsible for the internal IT systems.
Yuki: OK, I'll try to remember all of this. I should probably be taking notes!
Jani: Don't worry about it. For now it's just good to put some faces to names.
Yuki: OK, great – and who do I talk to about setting up my mobile phone with email access? Is that also Maria?
Jani: No, you need to talk to Sebastian who works in communications. He can help you. That's him over there, next to the printer.
Yuki: Thanks. I'll introduce myself to him later.`,

      questions: [
        {
          id: 1,
          question: "Who is Yuki?",
          options: [
            "A. The marketing director.",
            "B. The new employee.",
            "C. The order management team leader.",
            "D. The IT systems manager."
          ],
          correct: 1,
          explanation: "Jani nói 'Welcome to the department, Yuki' và đề nghị 'show you around... tell you about your new colleagues'. Điều này xác nhận Yuki là nhân viên mới (new employee)."
        },
        {
          id: 2,
          question: "What does Luciana look like?",
          options: [
            "A. Long, blonde hair and a purple dress.",
            "B. Short, dark hair and a purple dress.",
            "C. Short, dark hair and a green shirt.",
            "D. Long, dark hair and a purple dress."
          ],
          correct: 1,
          explanation: "Jani mô tả: 'She's the one with short, dark hair.' Yuki xác nhận lại: 'In the purple dress?' và Jani đồng ý."
        },
        {
          id: 3,
          question: "Where is Ian?",
          options: [
            "A. In the marketing department.",
            "B. Next to the printer.",
            "C. By the window.",
            "D. At the reception desk."
          ],
          correct: 2,
          explanation: "Yuki hỏi về người đàn ông đang nghe điện thoại, Jani trả lời: 'Oh, you mean the one by the window? In the green shirt? Ah, that's Ian.'"
        },
        {
          id: 4,
          question: "Who is responsible for the internal IT systems?",
          options: [
            "A. Luciana.",
            "B. Ian.",
            "C. Maria.",
            "D. Sebastian."
          ],
          correct: 2,
          explanation: "Jani giới thiệu về Maria: 'And that's Maria beside him. She's responsible for the internal IT systems.'"
        },
        {
          id: 5,
          question: "What will Yuki most likely do next?",
          options: [
            "A. Talk to Sebastian about the IT systems.",
            "B. Take notes of everyone's names immediately.",
            "C. Meet Sebastian to set up email on her mobile.",
            "D. Start working with Ian on marketing."
          ],
          correct: 2,
          explanation: "Yuki hỏi về việc cài đặt email trên điện thoại. Jani chỉ định Sebastian. Yuki kết thúc bằng câu: 'I'll introduce myself to him later' để giải quyết việc cài email."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 2
    // ==========================================
    part2: {
      title: "PART 2: Conversation",
      description: "Nghe một đoạn hội thoại. Mỗi câu có bốn từ/cụm từ được gạch chân. Chọn từ/cụm từ SAI so với những gì bạn nghe được.",
      type: "listening",
      audioUrl: "/public/data/audio/exam3/listening/part2.mp3",
      script: `Junko: Hello, Junko Mori speaking. How can I help you?
Andrea: Hi, Junko, it's Andrea here from Red Band. I'm calling about our latest order.
Junko: Everything arrived OK, right? We got the delivery confirmation at our end.
Andrea: Yes, everything's fine with the order. I'm calling about the invoice and the payment terms. I need a favour.
Junko: A favour? What do you need?
Andrea: This is a little, er ... difficult, but I need an extension on the payment terms. I know they're usually 30 days, but we're having some cash flow problems. You'd really be helping us out if you could extend it to 60 days.
Junko: I'm not sure if I can do that, Andrea. We've got regulations at our end, and also have to manage our own cash flow.
Andrea: I promise this won't become the norm, Junko. Actually, I also want to place another new order. The same size order as last time. It's for an important customer and they pay on delivery.
Junko: I see. So your cash flow problem will be solved after this new order is delivered.
Andrea: Exactly.
Junko: That sounds good. Hold on, Andrea. Let me see what I can do. Yes, I think we can make an exception this time.
Andrea: That's great, Junko. I appreciate your help.
Junko: And we appreciate your business, Andrea. It works both ways.
Andrea: Thanks again, Junko. Can you send me a quick email confirmation of the payment terms extension?
Junko: Sure, no problem. We're happy to help you.
Andrea: Great. And I'll email you the new order.
Junko: Thanks. I'll keep an eye out for it. Talk to you soon.
Andrea: You too. Goodbye.`,

      questions: [
        {
          id: 6,
          question: "Andrea calls Junko because (A) the delivery had a problem, and she wants to discuss (B) the invoice, (C) the payment terms, and (D) a possible extension.",
          options: [
            "A. the delivery had a problem",
            "B. the invoice",
            "C. the payment terms",
            "D. a possible extension"
          ],
          correct: 0,
          explanation: "Bài nghe nói: 'Everything's fine with the order.' → Không có vấn đề về delivery. A sai."
        },
        {
          id: 7,
          question: "Andrea explains that (A) the normal payment terms are 30 days, (B) she wants to shorten the payment period, (C) her company has cash flow problems, and (D) she is asking for a favour.",
          options: [
            "A. the normal payment terms are 30 days",
            "B. she wants to shorten the payment period",
            "C. her company has cash flow problems",
            "D. she is asking for a favour"
          ],
          correct: 1,
          explanation: "Andrea xin gia hạn (extend) lên 60 days, không phải shorten (rút ngắn). B sai."
        },
        {
          id: 8,
          question: "Junko is unsure about Andrea's request because (A) there are company regulations, (B) her company must manage its own cash flow, (C) the request breaks the usual rule, and (D) Andrea has not paid previous invoices.",
          options: [
            "A. there are company regulations",
            "B. her company must manage its own cash flow",
            "C. the request breaks the usual rule",
            "D. Andrea has not paid previous invoices"
          ],
          correct: 3,
          explanation: "Không có thông tin nào nói Andrea từng chậm hoặc không trả tiền. D sai."
        },
        {
          id: 9,
          question: "Andrea tries to convince Junko by saying (A) this situation will not become normal, (B) she will place another order, (C) the new order is the same size as before, and (D) the customer will pay after 60 days.",
          options: [
            "A. this situation will not become normal",
            "B. she will place another order",
            "C. the new order is the same size as before",
            "D. the customer will pay after 60 days"
          ],
          correct: 3,
          explanation: "Andrea nói rõ: 'they pay on delivery' (thanh toán khi giao hàng), không phải after 60 days. D sai."
        },
        {
          id: 10,
          question: "At the end of the conversation, (A) Junko agrees to make an exception, (B) Junko refuses to help again, (C) Andrea asks for email confirmation, and (D) Andrea plans to send a new order by email.",
          options: [
            "A. Junko agrees to make an exception",
            "B. Junko refuses to help again",
            "C. Andrea asks for email confirmation",
            "D. Andrea plans to send a new order by email"
          ],
          correct: 1,
          explanation: "Junko nói: 'We're happy to help you.' → Không hề từ chối. B sai."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 3
    // ==========================================
    part3: {
      title: "PART 3: Monologue",
      description: "Nghe một đoạn hội thoại giữa người dẫn chương trình và chuyên gia. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam3/listening/part3.mp3",
      script: `Presenter: So, today's expert teacher is Gabriella, a university English teacher from Leeds. Gabriella, hi and thanks for joining us today.
Gabriella: Thanks for having me!
Presenter: So, I have to confess today's topic is something I am really bad at: listening. Most people say speaking is the most stressful part of learning a new language but, for me, with B1 German, speaking isn't so bad. At least I'm in control of it. But listening … woah … people speak so fast and it's like my brain just shuts down. Am I just really strange and bad at listening? Tell me, honestly, I can take it.
Gabriella: No, you're not strange. In fact, it's really common. You know, in exams most people do pretty well in speaking compared with listening. Of course, exams are a different situation from real life because in an exam you can't ask for something to be repeated or explained. You usually have just one or maybe two opportunities to listen to the dialogue and then it's gone.
Presenter: Right, but in real life I feel stupid always saying, 'Sorry, can you repeat that, please?', especially if I still don't understand even when they repeat it. And people out there listening, I hope you don't do this – quite often the person just repeats what they said equally as fast and I'm still lost!
Gabriella: They do, don't they? In real life, you've got two strategies. One is to pretend to understand and get out of the conversation as fast as you can.
Presenter: Yep, sounds familiar!
Gabriella: But, obviously that's not going to help if it's a conversation with high stakes. It might have important consequences. I mean, if you're just chatting with a stranger at the bus stop, it doesn't matter. But imagine you're at a government office or a bank, trying to find out what paperwork you need to get your ID or open a bank account. What can you do then?
Presenter: I hope you've got the answer, Gabriella, because I'm coming out in a cold sweat just thinking about either of those situations!
Gabriella: The other strategy is to summarise what they said.
Presenter: But how can you do that if you didn't understand what they said?
Gabriella: Ah, well, you only start the summary, so you might say, in German in your case, 'OK, so the first thing I have to do is …?' and make it a question. Or, for example, 'And which office is that again?' Break it down into smaller questions and the other person will naturally start answering them. That way you're controlling the conversation a bit more.
Presenter: I get you ...`,

      questions: [
        {
          id: 11,
          question: "What is the presenter mainly worried about?",
          options: [
            "A. Speaking German incorrectly.",
            "B. Understanding fast spoken language.",
            "C. Making grammar mistakes.",
            "D. Forgetting vocabulary in exams."
          ],
          correct: 1,
          explanation: "Presenter nói rõ: 'people speak so fast and it's like my brain just shuts down' → vấn đề là listening, không phải grammar hay vocabulary."
        },
        {
          id: 12,
          question: "According to Gabriella, why is listening harder in exams than in real life?",
          options: [
            "A. The topics are unfamiliar.",
            "B. The speakers talk faster.",
            "C. You cannot ask for repetition.",
            "D. There are too many questions."
          ],
          correct: 2,
          explanation: "Gabriella nói: 'in an exam you can't ask for something to be repeated or explained'."
        },
        {
          id: 13,
          question: "In which situation does Gabriella say listening problems matter less?",
          options: [
            "A. At a bank.",
            "B. At a government office.",
            "C. In an exam.",
            "D. Talking to a stranger at a bus stop."
          ],
          correct: 3,
          explanation: "Gabriella: 'if you're just chatting with a stranger at the bus stop, it doesn't matter'."
        },
        {
          id: 14,
          question: "Why does Gabriella consider pretending to understand a weak strategy?",
          options: [
            "A. It is rude in most cultures.",
            "B. It prevents real communication in important situations.",
            "C. It makes conversations longer.",
            "D. It causes more listening stress."
          ],
          correct: 1,
          explanation: "Gabriella nói rõ chiến lược này không hiệu quả khi 'high stakes', vì có hậu quả quan trọng."
        },
        {
          id: 15,
          question: "What is the main advantage of Gabriella's second strategy?",
          options: [
            "A. It forces the speaker to repeat everything.",
            "B. It helps listeners avoid misunderstandings completely.",
            "C. It allows listeners to control the flow of conversation.",
            "D. It reduces the need for listening carefully."
          ],
          correct: 2,
          explanation: "Gabriella nói trực tiếp: 'That way you're controlling the conversation a bit more.'"
        }
      ]
    },

    // ==========================================
    // LISTENING PART 4
    // ==========================================
    part4: {
      title: "PART 4: Extended Conversation",
      description: "Nghe một bài đánh giá hai bộ phim. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam3/listening/part4.mp3",
      script: `Obviously, this is the sequel to Fun in the City, which is a film I didn't like so it's fair to say my expectations were low. So, you could say I wasn't disappointed, as it met my expectations. It was awful! It was so awful, I'd rather not spend any more time on it by talking about it. But, that wouldn't be a film review and I think I owe you all a review to save you wasting your money going to see it.
So, it starts off with this big wedding scene. And, I won't go into why, but the whole scene is just there so they can make this one joke. It's not even a funny joke ... it's just, ah, it's just terrible. It's got nothing to do with the rest of the film. Anyway, it starts there. Then, instead of the characters and the plot staying in New York where the original film was set, one of them wins a ticket to India and decides to take all her friends. It's what directors do when they've run out of ideas … let's take our characters on tour!
Anyway, they gossip, cry and shop, and they repeat this until the end. No real people would ever act like this. I didn't have any sympathy for their problems or even care what happened to them. Don't go and see it, you'll only encourage them to make another sequel. The world doesn't need three of these films. Please save your money and go and see the other big film this week: Twilight Mirror.
So, if you're a fan of the book it's based on, you're probably as excited as I was about this. For everyone else, this is a film fans have been waiting ten years to see. I have to confess, I was a bit nervous. I'd seen the posters and they didn't look right. I didn't love them at all. And I wasn't sure about the actors they cast either. So I went in not sure what to expect. But … I loved it.
One thing I really liked about it was the pace. They went backwards and forwards between the real world and the computer world and it worked really well. The special effects brought the computer world to life and I totally believed in it. But, more than that, I felt emotionally connected to the story and the characters. The whole film worked on so many levels. It reminded me of going to the cinema as a child – how much fun that was. I can't recommend it enough.`,

      questions: [
        {
          id: 16,
          question: "How does the speaker feel about the sequel to Fun in the City?",
          options: [
            "A. Surprised by how good it was.",
            "B. Disappointed because it was worse than expected.",
            "C. Not surprised because it was as bad as expected.",
            "D. Confused by the story."
          ],
          correct: 2,
          explanation: "'my expectations were low … it met my expectations. It was awful!' → Người nói không bất ngờ, vì phim tệ đúng như dự đoán."
        },
        {
          id: 17,
          question: "Why does the speaker think the wedding scene is included?",
          options: [
            "A. To explain the story clearly.",
            "B. To introduce new characters.",
            "C. To make one joke.",
            "D. To connect the sequel to the original film."
          ],
          correct: 2,
          explanation: "'the whole scene is just there so they can make this one joke' → Cảnh đám cưới chỉ để tạo một trò đùa."
        },
        {
          id: 18,
          question: "Why does the speaker say the characters travel to India?",
          options: [
            "A. Because the story requires it.",
            "B. Because it is popular with audiences.",
            "C. Because the original film was set there.",
            "D. Because the filmmakers ran out of ideas."
          ],
          correct: 3,
          explanation: "'It's what directors do when they've run out of ideas' → Đi du lịch sang Ấn Độ vì hết ý tưởng."
        },
        {
          id: 19,
          question: "How does the speaker feel about the characters in the first film?",
          options: [
            "A. He understands their problems.",
            "B. He feels sorry for them.",
            "C. He does not care what happens to them.",
            "D. He thinks they behave realistically."
          ],
          correct: 2,
          explanation: "'I didn't have any sympathy for their problems or even care what happened to them' → Người nói không quan tâm số phận nhân vật."
        },
        {
          id: 20,
          question: "What is the speaker's final opinion of the second film (Twilight Mirror)?",
          options: [
            "A. It was disappointing because of the actors.",
            "B. It was confusing and slow.",
            "C. It was enjoyable and emotionally engaging.",
            "D. It was only good because of the special effects."
          ],
          correct: 2,
          explanation: "'I loved it' và 'I felt emotionally connected to the story and the characters' → Phim thứ hai hay, có cảm xúc, không chỉ vì kỹ xảo."
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
          question: "She didn't understand the instructions, so she asked the teacher to explain them ______.",
          options: [
            "A. again",
            "B. already",
            "C. yet",
            "D. still"
          ],
          correct: 0,
          explanation: "'explain again' = giải thích lại (rất tự nhiên). already: đã rồi → không hợp nghĩa. yet: dùng trong câu phủ định/câu hỏi. still: vẫn → không dùng sau explain."
        },
        {
          id: 22,
          question: "I was very tired, ______ I decided to finish the work before going home.",
          options: [
            "A. because",
            "B. but",
            "C. so",
            "D. although"
          ],
          correct: 1,
          explanation: "Hai ý trái ngược: rất mệt nhưng vẫn quyết định làm xong. 'but' = nhưng → nối ý đối lập. because: chỉ nguyên nhân. so: chỉ kết quả (sai logic)."
        },
        {
          id: 23,
          question: "The meeting was cancelled ______ the manager was ill.",
          options: [
            "A. although",
            "B. because",
            "C. however",
            "D. unless"
          ],
          correct: 1,
          explanation: "'because + mệnh đề (S + V)'. 'the manager was ill' là mệnh đề đầy đủ. because of → phải theo sau bằng danh từ. however → trạng từ nối. unless = trừ khi → sai nghĩa."
        },
        {
          id: 24,
          question: "He speaks English quite well, ______ he sometimes makes small grammar mistakes.",
          options: [
            "A. because",
            "B. therefore",
            "C. however",
            "D. so"
          ],
          correct: 2,
          explanation: "Ý nghĩa: nói tốt nhưng vẫn có lỗi. 'however' = tuy nhiên → dùng để diễn đạt sự đối lập nhẹ. because/so: quan hệ nhân–quả (sai). therefore: vì thế → không đúng logic."
        },
        {
          id: 25,
          question: "The train arrived ______ than we expected.",
          options: [
            "A. more early",
            "B. earliest",
            "C. early",
            "D. earlier"
          ],
          correct: 3,
          explanation: "Có 'than' → bắt buộc dùng so sánh hơn. early → earlier. early: không phải so sánh. earliest: so sánh nhất. more early: sai cấu trúc."
        },
        {
          id: 26,
          question: "If you want to improve your listening skills, you should practise ______ English every day.",
          options: [
            "A. to listen",
            "B. listening to",
            "C. listen",
            "D. listened"
          ],
          correct: 1,
          explanation: "'practise + V-ing' và 'listen to + language'. Công thức: practise + V-ing. to listen / listen / listened: sai cấu trúc."
        },
        {
          id: 27,
          question: "She refused to accept the job offer, ______ surprised everyone.",
          options: [
            "A. who",
            "B. which",
            "C. what",
            "D. that"
          ],
          correct: 1,
          explanation: "'which' dùng để chỉ cả mệnh đề phía trước. Cấu trúc: ..., which + verb. that: không dùng sau dấu phẩy. who: chỉ người. what: không dùng như vậy."
        },
        {
          id: 28,
          question: "By the time we arrived at the cinema, the film ______.",
          options: [
            "A. starts",
            "B. has started",
            "C. had started",
            "D. was starting"
          ],
          correct: 2,
          explanation: "'By the time + quá khứ đơn → quá khứ hoàn thành'. Hành động phim bắt đầu trước khi chúng ta đến. starts / has started / was starting: sai thì."
        },
        {
          id: 29,
          question: "He spoke so quietly that I could ______ hear what he was saying.",
          options: [
            "A. hardly",
            "B. nearly",
            "C. strongly",
            "D. clearly"
          ],
          correct: 0,
          explanation: "'hardly' = gần như không. 'so quietly that…' → kết quả là khó nghe. nearly: gần như (không hợp). clearly: rõ ràng (ngược nghĩa). strongly: không liên quan."
        },
        {
          id: 30,
          question: "The company decided to delay the project ______ the lack of funding.",
          options: [
            "A. because",
            "B. because of",
            "C. although",
            "D. despite"
          ],
          correct: 1,
          explanation: "'because of + danh từ'. 'the lack of funding' = cụm danh từ. because: cần mệnh đề. although / despite: không đúng cấu trúc hoặc nghĩa."
        }
      ]
    },

    // ==========================================
    // READING PART 6 - CLOZE TEXT
    // ==========================================
    part6: {
      title: "PART 6: Cloze Text (Venue Comparison)",
      description: "10 câu hỏi - Đọc thông tin về hai địa điểm tổ chức sự kiện và chọn đáp án tốt nhất.",
      type: "reading",
      text: `The International Centre
Whether you are looking for a conference venue or a place to have your meetings and your training days, the International Centre is the perfect modern space for your event. Offering free Wi-Fi, secure parking and all-day refreshments, the International Centre has 120 meeting rooms and a theatre for up to 1,000 people. Conveniently located in the city centre, the International Centre is close to the shops and only a ten-minute walk to the train station.

The Grand West
The Grand West is a country house surrounded by rolling hills and beautiful scenery, only a 30-minute drive from the airport. With 76 hotel rooms, 12 meeting rooms and a conference room that takes up to 200 people, the Grand West offers free Wi-Fi and a whiteboard in every room. You can also make use of the gardens of the Grand West for team-building events and outdoor activities. Our indoor swimming pool, gym and 18-hole golf course will ensure that your event is relaxing and enjoyable for everyone.`,

      questions: [
        {
          id: 31,
          question: "What is the main purpose of the International Centre?",
          options: [
            "A. To provide accommodation for tourists.",
            "B. To host business events and meetings.",
            "C. To offer outdoor activities.",
            "D. To organise private parties."
          ],
          correct: 1,
          explanation: "Đoạn mở đầu nói rõ: 'Whether you are looking for a conference venue or a place to have your meetings and your training days…' → địa điểm cho sự kiện kinh doanh."
        },
        {
          id: 32,
          question: "How many meeting rooms does the International Centre have?",
          options: [
            "A. 76",
            "B. 100",
            "C. 120",
            "D. 200"
          ],
          correct: 2,
          explanation: "Bài đọc nêu trực tiếp: 'the International Centre has 120 meeting rooms'."
        },
        {
          id: 33,
          question: "What is one advantage of the International Centre's location?",
          options: [
            "A. It is close to the airport.",
            "B. It is surrounded by countryside.",
            "C. It is near shops and the train station.",
            "D. It is far from the city centre."
          ],
          correct: 2,
          explanation: "'Conveniently located in the city centre… close to the shops and only a ten-minute walk to the train station.' → thuận tiện di chuyển và mua sắm."
        },
        {
          id: 34,
          question: "Which facility can accommodate the largest number of people?",
          options: [
            "A. A meeting room at the Grand West.",
            "B. The conference room at the Grand West.",
            "C. The theatre at the International Centre.",
            "D. The gardens at the Grand West."
          ],
          correct: 2,
          explanation: "Theatre (International Centre): 1,000 người. Conference room (Grand West): 200 người. 1,000 > 200 → lớn nhất là theatre."
        },
        {
          id: 35,
          question: "Which feature is available at both venues?",
          options: [
            "A. Indoor swimming pool.",
            "B. Secure parking.",
            "C. Free Wi-Fi.",
            "D. Golf course."
          ],
          correct: 2,
          explanation: "International Centre: 'Offering free Wi-Fi'. Grand West: 'offers free Wi-Fi'. Swimming pool chỉ có Grand West. Secure parking chỉ có International Centre. Golf course chỉ có Grand West."
        },
        {
          id: 36,
          question: "The Grand West is best described as a place that is ______.",
          options: [
            "A. modern and central.",
            "B. quiet and surrounded by nature.",
            "C. small and basic.",
            "D. close to shopping areas."
          ],
          correct: 1,
          explanation: "'a country house surrounded by rolling hills and beautiful scenery' → yên tĩnh, gần thiên nhiên. Modern & central là International Centre."
        },
        {
          id: 37,
          question: "How far is the Grand West from the airport?",
          options: [
            "A. Ten minutes on foot.",
            "B. Twenty minutes by train.",
            "C. Thirty minutes by car.",
            "D. One hour by bus."
          ],
          correct: 2,
          explanation: "Bài đọc nêu trực tiếp: 'only a 30-minute drive from the airport'. Chú ý từ 'drive' = bằng xe."
        },
        {
          id: 38,
          question: "What extra activities can guests enjoy at the Grand West?",
          options: [
            "A. Shopping and theatres.",
            "B. Outdoor and leisure facilities.",
            "C. Free refreshments all day.",
            "D. Large city events."
          ],
          correct: 1,
          explanation: "'gardens for team-building events… indoor swimming pool, gym and 18-hole golf course' → có cả hoạt động ngoài trời và thư giãn."
        },
        {
          id: 39,
          question: "Which venue would be more suitable for a conference of 800 people?",
          options: [
            "A. The Grand West.",
            "B. The International Centre.",
            "C. Both venues.",
            "D. Neither venue."
          ],
          correct: 1,
          explanation: "International Centre: 1,000 người. Grand West: 200 người. 800 người → chỉ International Centre phù hợp."
        },
        {
          id: 40,
          question: "Which statement is TRUE according to the information?",
          options: [
            "A. The International Centre offers hotel rooms.",
            "B. The Grand West is located in the city centre.",
            "C. The Grand West has fewer meeting rooms than the International Centre.",
            "D. The International Centre has a golf course."
          ],
          correct: 2,
          explanation: "International Centre: 120 phòng họp. Grand West: 12 phòng họp. 12 < 120 → Grand West có ít phòng họp hơn. Hotel rooms chỉ Grand West. City centre là International Centre. Golf course chỉ Grand West."
        }
      ]
    },

    // ==========================================
    // READING PART 7 - TRAVEL GUIDE
    // ==========================================
    part7: {
      title: "PART 7: Single Text (Travel Guide)",
      description: "10 câu hỏi - Đọc bài hướng dẫn du lịch về Bangkok, Thái Lan và chọn đáp án tốt nhất.",
      type: "reading",
      text: `A travel guide
Whether you're travelling to the islands or the mountains of Thailand, you're likely to spend at least one night in its capital city on the way. Bangkok might be noisy and polluted but it's also an exciting city with plenty of things to see and do. Why not make it a longer stay?

Where to stay
The Khao San Road was a famous traveller spot even before Leonardo di Caprio's character in the film The Beach stayed there. But it's noisy, not very pretty and not very Thai. For something more authentic, Phra Kanong offers an alternative place to stay, with its fantastic street markets where everyday Bangkok people eat, work and live. It's not as convenient for the main tourist sites, but it has a Skytrain station so you can be at the Grand Palace in 20 minutes.

How to get around
Bangkok's traffic can be a nightmare. Sure, you can easily take a taxi – if you want to spend hours stuck in traffic jams – but there are two much better ways to get around the city. To explore the temples and historical sites, catch an express boat river taxi or a longtail boat along the Chao Phraya river and the canals. For the modern part of the city, the Skytrain is a fast, cheap way to travel from the river to the shopping malls and nightlife of Sukhumvit, and the famous Chatuchak street market.

Where to eat
The simple answer is: everywhere! Thai street food is among the best in the world, and for around $5 you can eat a filling and delicious meal. Some food stands have little plastic seats where you can sit and eat and they cook the same dish over and over, like fried chicken on rice or Pad Thai noodles. Head for Chinatown – Yaowarat Street – and choose whatever looks most interesting from the many excellent Chinese and Thai restaurants and food stands.

What to do
After you've seen the main sites like the Giant Buddha at the temple of Wat Pho and the spectacular Grand Palace, and shopped at Chatuchak market, check out the snake farm and watch the live snake show. You can even touch a snake yourself if you want to!`,

      questions: [
        {
          id: 41,
          question: "What is the writer's overall opinion of Bangkok?",
          options: [
            "A. It is unpleasant and should be avoided.",
            "B. It is only suitable for short visits.",
            "C. It is noisy but worth spending more time in.",
            "D. It is relaxing and pollution-free."
          ],
          correct: 2,
          explanation: "'Bangkok might be noisy and polluted but it's also an exciting city… Why not make it a longer stay?' → Từ BUT đảo chiều: ý chính là thành phố đáng ở lâu hơn dù có nhược điểm."
        },
        {
          id: 42,
          question: "Why is Bangkok mentioned as a stop for many travellers?",
          options: [
            "A. It has the best beaches in Thailand.",
            "B. It is located between the islands and the mountains.",
            "C. It is the cheapest city to stay in.",
            "D. It has the largest airport in the country."
          ],
          correct: 1,
          explanation: "'travelling to the islands or the mountains… spend at least one night in its capital city on the way' → Bangkok là điểm dừng vì nằm trên đường đến đảo hoặc núi."
        },
        {
          id: 43,
          question: "Why does the writer NOT recommend staying on Khao San Road?",
          options: [
            "A. It is too expensive.",
            "B. It is far from tourist attractions.",
            "C. It is noisy and not very authentic.",
            "D. It has no transport connections."
          ],
          correct: 2,
          explanation: "'it's noisy, not very pretty and not very Thai' → 'not very Thai' được paraphrase thành 'not authentic' trong đáp án C."
        },
        {
          id: 44,
          question: "What makes Phra Kanong a good alternative place to stay?",
          options: [
            "A. It is close to all major tourist sites.",
            "B. It offers a more local experience.",
            "C. It is quieter and more luxurious.",
            "D. It is cheaper than other areas."
          ],
          correct: 1,
          explanation: "'everyday Bangkok people eat, work and live' → Đời sống thật, không du lịch hóa. Bài cũng nói không tiện cho các điểm du lịch chính."
        },
        {
          id: 45,
          question: "How can travellers reach the Grand Palace from Phra Kanong?",
          options: [
            "A. By taxi only.",
            "B. By river boat.",
            "C. By Skytrain.",
            "D. On foot."
          ],
          correct: 2,
          explanation: "'it has a Skytrain station so you can be at the Grand Palace in 20 minutes' → Đi bằng Skytrain."
        },
        {
          id: 46,
          question: "Why does the writer discourage using taxis in Bangkok?",
          options: [
            "A. They are unsafe.",
            "B. They are difficult to find.",
            "C. They are very expensive.",
            "D. They are often stuck in traffic."
          ],
          correct: 3,
          explanation: "'spend hours stuck in traffic jams' → Lý do không nên đi taxi là thường bị kẹt xe."
        },
        {
          id: 47,
          question: "Which transport is suggested for visiting temples and historical sites?",
          options: [
            "A. Taxi.",
            "B. Skytrain.",
            "C. River boats.",
            "D. Buses."
          ],
          correct: 2,
          explanation: "'To explore the temples and historical sites, catch an express boat river taxi or a longtail boat' → Đi thuyền trên sông."
        },
        {
          id: 48,
          question: "What is said about Thai street food?",
          options: [
            "A. It is expensive but high quality.",
            "B. It is limited to certain areas.",
            "C. It is cheap and very tasty.",
            "D. It is mainly Chinese food."
          ],
          correct: 2,
          explanation: "'for around $5… filling and delicious' → $5 = cheap, delicious = tasty."
        },
        {
          id: 49,
          question: "Where should visitors go to enjoy Chinese and Thai food?",
          options: [
            "A. Phra Kanong.",
            "B. Sukhumvit.",
            "C. Chatuchak Market.",
            "D. Yaowarat Street."
          ],
          correct: 3,
          explanation: "'Head for Chinatown – Yaowarat Street' → Dấu '—' giải thích Chinatown chính là Yaowarat Street."
        },
        {
          id: 50,
          question: "Which activity is suggested after visiting the main tourist sites?",
          options: [
            "A. Taking a cooking class.",
            "B. Watching a snake show.",
            "C. Going to the beach.",
            "D. Visiting a theme park."
          ],
          correct: 1,
          explanation: "'After you've seen the main sites… check out the snake farm and watch the live snake show.' → Từ khóa AFTER chỉ rõ trình tự."
        }
      ]
    },

    // ==========================================
    // READING PART 8 - TEXT MESSAGE CHAIN
    // ==========================================
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn về lên kế hoạch tổ chức sự kiện, chọn đáp án tốt nhất.",
      type: "reading",
      text: `MIKE (14:41): All right, so I've divided up the tasks among the three of us planning this event like this — Jen: make guest list, schedule social media announcements, arrange room set-up, organise musicians. Ed: book catering, send out invitations, design posters, book speakers. Me: reserve rooms, design invitations, write and publish blog post, get emcee. But please don't feel like we need to stick to this. If you prefer to do something else, feel free to say so.

JEN (14:50): Yeah, I was thinking, as you are project leader, Mike, maybe it's best you make the guest list? I've got experience in graphic design so I'm happy to design the invitations.

ED (14:55): Jen, do you mind designing the posters too? I'm not very good at designing.

JEN (14:56): Sure, it'll be fun. If I take the poster design off you, Ed, do you think you can organise the musicians?

ED (14:58): Absolutely. I know some really good musicians that do events like this one. And I also know a really good emcee. Do you want me to take over getting the emcee too?

MIKE (15:01): Ed, I actually already have an emcee in mind, so I think I'll handle that. I'd appreciate it if you could write and publish the blog post about the event though.

ED (15:01): That's not a problem. I quite enjoy online marketing tasks.

JEN (15:03): If that's the case, Ed, do you want to schedule the social media announcements too?

ED (15:04): I can do that… if someone books the speakers.

MIKE (15:08): I'll book the speakers. And since I'm making the guest list, I should send out the invitations too. Jen, are you still OK with arranging the room set-up?

JEN (15:09): Yes, let me do the room reservations as well.

MIKE (15:10): Good idea. That would work nicely.`,

      questions: [
        {
          id: 51,
          question: "What is the main purpose of Mike's first message?",
          options: [
            "A. To ask for help with organising an event.",
            "B. To explain why the event is important.",
            "C. To divide tasks among the team.",
            "D. To complain about the amount of work."
          ],
          correct: 2,
          explanation: "Mike nói rõ 'I've divided up the tasks…' → mục đích chính là phân công công việc, không phải xin giúp đỡ hay phàn nàn."
        },
        {
          id: 52,
          question: "Why does Jen suggest that Mike should make the guest list?",
          options: [
            "A. Because Mike enjoys organising events.",
            "B. Because Mike is the project leader.",
            "C. Because Jen is too busy.",
            "D. Because Ed asked her to."
          ],
          correct: 1,
          explanation: "Jen nói 'as you are project leader @Mike, maybe it's best you make the guest list' → lý do trực tiếp: vai trò project leader."
        },
        {
          id: 53,
          question: "What task does Jen agree to take on instead of making the guest list?",
          options: [
            "A. Organising musicians.",
            "B. Writing blog posts.",
            "C. Designing the invitations.",
            "D. Booking speakers."
          ],
          correct: 2,
          explanation: "Jen nói: 'I've got experience in graphic design so I'm happy to design the invitations'."
        },
        {
          id: 54,
          question: "Why does Ed ask Jen to design the posters as well?",
          options: [
            "A. Because posters are easy to design.",
            "B. Because Jen offered first.",
            "C. Because Ed is not confident at designing.",
            "D. Because Mike asked him to."
          ],
          correct: 2,
          explanation: "Ed nói 'I'm not very good at designing' → lý do rõ ràng, trực tiếp."
        },
        {
          id: 55,
          question: "What does Jen ask Ed to do in return for designing the posters?",
          options: [
            "A. Organise catering.",
            "B. Organise the musicians.",
            "C. Book the speakers.",
            "D. Write the blog post."
          ],
          correct: 1,
          explanation: "Jen hỏi: 'do you think you can organise the musicians?' → điều kiện đổi việc thiết kế poster."
        },
        {
          id: 56,
          question: "What additional task does Ed offer to help with?",
          options: [
            "A. Sending invitations.",
            "B. Managing the event budget.",
            "C. Getting the emcee.",
            "D. Designing posters."
          ],
          correct: 2,
          explanation: "Ed nói 'I also know a really good emcee. Do you want me to take over getting the emcee too?' → đề nghị bổ sung."
        },
        {
          id: 57,
          question: "Why does Mike say Ed does NOT need to get the emcee?",
          options: [
            "A. Because Jen will do it.",
            "B. Because the emcee is not necessary.",
            "C. Because Mike already has someone in mind.",
            "D. Because Ed is too busy."
          ],
          correct: 2,
          explanation: "Mike: 'I actually already have an emcee in mind' → đã chuẩn bị sẵn rồi, không phải từ chối."
        },
        {
          id: 58,
          question: "Which task does Ed finally agree to do?",
          options: [
            "A. Schedule social media announcements.",
            "B. Book the speakers.",
            "C. Arrange room set-up.",
            "D. Make the guest list."
          ],
          correct: 0,
          explanation: "Ed nói 'I can do that… if someone books the speakers' → đồng ý lên lịch thông báo mạng xã hội với điều kiện ai đó đặt diễn giả."
        },
        {
          id: 59,
          question: "Who is responsible for booking the speakers?",
          options: [
            "A. Ed.",
            "B. Jen.",
            "C. Mike.",
            "D. No one yet."
          ],
          correct: 2,
          explanation: "Mike nói: 'I'll book the speakers' → thông tin rõ ràng, không cần suy luận."
        },
        {
          id: 60,
          question: "What additional task does Jen agree to do at the end?",
          options: [
            "A. Writing invitations.",
            "B. Room reservations.",
            "C. Catering.",
            "D. Publishing the blog."
          ],
          correct: 1,
          explanation: "Jen nói: 'Yes, let me do the room reservations as well.' → nhận thêm việc đặt phòng ngoài sắp xếp phòng."
        }
      ]
    }
  }
};

export default EXAM3_DATA;