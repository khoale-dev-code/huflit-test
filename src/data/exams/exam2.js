export const EXAM2_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 2",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu)",
  
  metadata: {
    exam: "exam2",
    hasAudio: true,
    listeningAudioUrl: "/public/data/audio/exam2/listening/full.mp3",
  },

  parts: {
    // ==========================================
    // LISTENING PART 1
    // ==========================================
    part1: {
      title: "PART 1: Task Prioritization",
      description: "Nghe đoạn hội thoại giữa Susanne và Mario về các nhiệm vụ. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam2/listening/part1.mp3",
      script: `Susanne: Hi, Mario. Can you help me prepare some things for the next month?
Mario: OK, sure. What can I help you with?
Susanne: I need to visit the customer in Germany. It's important.
Mario: What can I do to help?
Susanne: Can you send an email to the customer? Ask them when I can visit them next week. Please do this first. It's a priority and very urgent.
Mario: Right. I'll do it today.
Susanne: Thanks. This next task is also important. Can you invite everyone to the next team meeting?
Mario: Yes, I will.
Susanne: But first you need to book a meeting room. After that, please send everyone an email about it.
Mario: Yes, of course.
Susanne: And finally, can you write a short report about our new project? I have to give a presentation to our managers next month. Please do it when you have time – sometime in the next two or three weeks. It's not too urgent.
Mario: Sure, no problem. I can do it this week.
Susanne: There's no hurry. Take your time.`,

      questions: [
        {
          id: 1,
          question: "What is Mario's most immediate priority?",
          options: [
            "A. Booking a room for the team meeting",
            "B. Writing a project report for the managers",
            "C. Contacting a client in Germany via email",
            "D. Organizing a presentation for next month"
          ],
          correct: 2,
          explanation: "Susanne nói: 'Please do this first. It's a priority and very urgent' (gửi email cho khách hàng Đức). → Ưu tiên cao nhất là liên hệ khách hàng."
        },
        {
          id: 2,
          question: "What is the correct order of actions for the team meeting?",
          options: [
            "A. Send the email, then book the room",
            "B. Book the room, then invite the team",
            "C. Invite the team, then find a room",
            "D. Conduct the meeting, then send a report"
          ],
          correct: 1,
          explanation: "Susanne nói rõ: 'But first you need to book a meeting room. After that, please send everyone an email about it.' → Phải đặt phòng trước, rồi gửi email mời mọi người."
        },
        {
          id: 3,
          question: "When does the project report need to be completed?",
          options: [
            "A. By the end of today",
            "B. Within the next seven days",
            "C. In approximately two to three weeks",
            "D. After the presentation next month"
          ],
          correct: 2,
          explanation: "Susanne đề cập: 'sometime in the next two or three weeks. It's not too urgent.' → Thời hạn là 2-3 tuần tới."
        },
        {
          id: 4,
          question: "How does Susanne feel about the project report task?",
          options: [
            "A. She believes it is the most important task",
            "B. She is worried it won't be finished on time",
            "C. She wants Mario to prioritize it over the client email",
            "D. She considers it a low-pressure task with a flexible deadline"
          ],
          correct: 3,
          explanation: "Susanne nói: 'There's no hurry. Take your time.' và 'It's not too urgent.' → Cô cảm thấy không gấp gáp, có thời gian linh hoạt."
        },
        {
          id: 5,
          question: "Why did Susanne ask Mario to contact the customer first?",
          options: [
            "A. Because Mario works in the Germany office",
            "B. Because it is the most urgent task",
            "C. Because the customer requested to be contacted today",
            "D. Because the email address needs to be verified first"
          ],
          correct: 1,
          explanation: "Susanne nhấn mạnh: 'Please do this first. It's a priority and very urgent.' → Vì đây là việc gấp nhất và ưu tiên cao nhất."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 2
    // ==========================================
    part2: {
      title: "PART 2: Four Different Stories",
      description: "Nghe bốn đoạn hội thoại ngắn (A-D) về các chủ đề khác nhau. Chọn đáp án tốt nhất cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam2/listening/part2.mp3",
      script: `STORY A - Job Interview
Man: How did it go?
Woman: Umm, I think it went quite well. I did a lot of research and prepared a lot. I was in there for ... I don't know ... half an hour?
Man: And? What did they say?
Woman: Nothing much. At the end I asked them, 'What happens now?', and the woman said, 'We'll call you back with news in three or four days.'
Man: Really?
Woman: Yeah, I think I've got the job. There weren't a lot of other people there. I was the only interview that day, you know?
Man: Well, good luck with it.

---

STORY B - Museum Visit
Man: Anyway, you were saying ...
Woman: Oh, yeah, um ... let's see. Yes, so I was in the museum and there were, I don't know, a hundred people waiting to get into the room. Finally, I got in, and I tried to see the Mona Lisa but I couldn't look at it.
Man: Why not?
Woman: Because the room was filled with people taking photographs of it!
Man: Oh, right.
Woman: Yes! And selfies.
Man: Wait a minute. You can take photos while you're in there?
Woman: Yes, but you can't use flash. I don't know ... Why do we take photos of everything we see when we travel?
Man: I know. And we never look at the photos after.
Woman: Exactly! I'm tired of always taking photos. I don't feel I'm enjoying things.

---

STORY C - Old Photograph
Man: Who took this?
Woman: I can't remember. Hmmm ...
Man: What am I doing?
Woman: You're sitting on the sofa, watching TV and eating chocolates. Nothing changes!
Man: Ha! Very funny. You look very young, though.
Woman: I know. Look at my hair – it was so long!
Man: Mine too, look at me! Hey … I think I know who took this photo.
Woman: Umm … who? Was it Dad?
Man: No, it wasn't Dad or Mum. Do you remember Barry?
Woman: No.
Man: Yes, YES! You do remember. Barry, your boyfriend at high school. You were seventeen and he was sixteen and he was so very polite: 'Hello, I'm Barry. It's very nice to meet you ...'
Woman: Stop it! He was nice.
Man: Yeah, well, he took the photo.

---

STORY D - Group Project
Woman: Let's see. OK. I'm glad we could talk about this. It's not easy to say.
Man: What?
Woman: Well, you're not in our group – for the class project.
Man: What do you mean? You know I'm always in a group with you.
Woman: I know. It's just that this time … this time we made the group differently and because you were late ...
Man: I see. You don't want me in the group?
Woman: No, no. It isn't that. It's that we've already made the group, see? There's four of us already.
Man: So? We can't be a group of five?
Woman: Well, the teacher said four people per group.
Man: Oh.
Woman: It's not about you or your work or anything like that. It's ... errrr ... well, we already have the group.
Man: So I have to find another group.
Woman: I'm sorry.`,

      questions: [
        {
          id: 6,
          question: "What is the woman in Story A talking about?",
          options: [
            "A. A meeting with her friends",
            "B. A job interview she has just had",
            "C. A training course she wants to join",
            "D. A phone call from a company"
          ],
          correct: 1,
          explanation: "Cô nói: 'I did a lot of research and prepared a lot', 'I think I've got the job' → Đây là một buổi phỏng vấn xin việc."
        },
        {
          id: 7,
          question: "In Story B, why couldn't the woman really look at the Mona Lisa?",
          options: [
            "A. Because photography was not allowed",
            "B. Because the painting was too small",
            "C. Because the room was too crowded with people taking photos",
            "D. Because she was tired after waiting"
          ],
          correct: 2,
          explanation: "Cô nói: 'the room was filled with people taking photographs of it' → Phòng đông nghẹt người chụp ảnh nên cô không thể ngắm tranh."
        },
        {
          id: 8,
          question: "In Story C, who took the photo they are talking about?",
          options: [
            "A. The woman's father",
            "B. The woman's mother",
            "C. A friend named Barry",
            "D. A photographer"
          ],
          correct: 2,
          explanation: "Người đàn ông nói: 'he took the photo' (referring to Barry). Barry là bạn trai thời trung học của cô ấy."
        },
        {
          id: 9,
          question: "In Story D, why is the man not included in the group?",
          options: [
            "A. Because his work is not good enough",
            "B. Because the woman doesn't like him",
            "C. Because he was late and the group is already full",
            "D. Because the teacher changed the project"
          ],
          correct: 2,
          explanation: "Cô nói: 'because you were late' và 'the teacher said four people per group' → Anh đến muộn nên nhóm đã đủ 4 người."
        },
        {
          id: 10,
          question: "What is the main difference between Story A and Story D?",
          options: [
            "A. They both involve the same two people",
            "B. Story A is positive and Story D is negative",
            "C. They both take place at the same location",
            "D. They are both about work-related events"
          ],
          correct: 1,
          explanation: "Story A nói về phỏng vấn thành công với tin tốt, Story D nói về tin xấu không được vào nhóm → Một tích cực, một tiêu cực."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 3
    // ==========================================
    part3: {
      title: "PART 3: Comparison of Mars and Earth",
      description: "Nghe hai sinh viên thảo luận về những điểm giống và khác giữa Sao Hỏa và Trái Đất. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam2/listening/part3.mp3",
      script: `Teacher: So you've got a few minutes to discuss with your partner.
Student 1: So, as far as I know, the main similarity between Mars and Earth is that they can both support human life.
Student 2: Yeah, but do we know that's actually true? I mean, Mars is much colder than Earth, isn't it? It says here it's about minus 55 degrees most of the time, whereas on Earth only places like Antarctica get that cold.
Student 1: True. Well then, I suppose you could say both planets are a similar distance from the Sun?
Student 2: No way! Mars is much further away! It says here it's about 228 million kilometres, while Earth is about 150 million.
Student 1: Yes, but in space that's not that far. Jupiter is, like, almost 780 million kilometres. That's why we use astronomical units when we talk about distances in space. Earth is 1 astronomical unit from the Sun and Mars is 1.3. The difference doesn't sound so big when you look at it that way.
Student 2: I see what you mean. Jupiter is 5.2 astronomical units so I guess you're right. What other similarities are there between the two planets?
Student 1: Let's see … not the colour, obviously!
Student 2: Yeah! Earth is called the blue planet and Mars is called the red planet for pretty obvious reasons!
Student 1: Their sizes are pretty different. Mars is about half the size of Earth.
Student 2: What about this? It looks like the days on both planets are almost the same length. Earth's day is 24 hours but Mars's is about half an hour longer.
Student 1: You're right. OK, any other things they both share?
Student 2: I suppose you could say they have water in common.
Student 1: Could you? How?
Student 2: Well, Earth is 70 per cent water and Mars probably had huge oceans in the past. It's just that most of the water there now is probably frozen.
Student 1: Ah, I see. I don't think we can say the air is the same, though. Most of Earth's air is nitrogen and oxygen, but Mars …?
Student 2: Mars doesn't really have air, not compared with Earth. It's got about one per cent as much air as Earth.
Student 1: Right, and it's mostly carbon dioxide.
Student 2: Gravity is another difference. I didn't know this, but Mars has higher gravity than the Moon. But it's much less than on Earth, of course.
Student 1: Oh, yes. It says Mars has about 38 per cent of Earth's gravity.
Teacher: OK, let's see what you've found …`,

      questions: [
        {
          id: 11,
          question: "What is the main point the students make about the distance of Mars from the Sun?",
          options: [
            "A. Mars is almost as close to the Sun as Earth",
            "B. Mars is much further from the Sun than Earth and the difference is very large",
            "C. The distance seems smaller when measured in astronomical units",
            "D. Jupiter is closer to the Sun than Mars"
          ],
          correct: 2,
          explanation: "Student 1 nói: 'The difference doesn't sound so big when you look at it that way' (khi dùng astronomical units, từ 1 AU lên 1.3 AU không quá lớn)."
        },
        {
          id: 12,
          question: "Why does Student 2 doubt that Mars can support human life?",
          options: [
            "A. Because Mars has no gravity",
            "B. Because Mars is much colder than Earth",
            "C. Because Mars is smaller than Earth",
            "D. Because Mars has no water"
          ],
          correct: 1,
          explanation: "Student 2 nói: 'Mars is much colder than Earth ... about minus 55 degrees most of the time.' → Độ lạnh quá cao khiến con người không thể sống."
        },
        {
          id: 13,
          question: "What similarity between Earth and Mars do the students finally agree on?",
          options: [
            "A. They are the same colour",
            "B. They have the same atmosphere",
            "C. Their days are almost the same length",
            "D. They have the same amount of water"
          ],
          correct: 2,
          explanation: "Student 2 nói: 'the days on both planets are almost the same length. Earth's day is 24 hours but Mars's is about half an hour longer.' → Độ dài ngày gần giống nhau."
        },
        {
          id: 14,
          question: "What is true about Mars's atmosphere compared to Earth's?",
          options: [
            "A. It has more oxygen than Earth",
            "B. It is mostly nitrogen",
            "C. It has much less air and is mainly carbon dioxide",
            "D. It is almost the same as Earth's atmosphere"
          ],
          correct: 2,
          explanation: "Students nói: Mars chỉ có khoảng 1% lượng không khí của Trái Đất và thành phần chính là carbon dioxide."
        },
        {
          id: 15,
          question: "According to the discussion, what percentage of Earth's gravity does Mars have?",
          options: [
            "A. About 25 percent",
            "B. About 38 percent",
            "C. About 50 percent",
            "D. About 70 percent"
          ],
          correct: 1,
          explanation: "Student 1 nói: 'It says Mars has about 38 per cent of Earth's gravity.' → Mars có 38% trọng lực của Trái Đất."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 4
    // ==========================================
    part4: {
      title: "PART 4: Positive Psychology",
      description: "Nghe bài giảng về tâm lý học tích cực và lý thuyết flow. Chọn đáp án tốt nhất cho 5 câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam2/listening/part4.mp3",
      script: `Good afternoon, everyone. Welcome to the first lecture of our new course in Positive Psychology. While some people may associate psychology with looking at what's wrong with us, and at what problems we have, there is much more to psychology than that. Positive psychology, for example, looks at how to help people become happier.
This lecture begins with a question: what makes a happy life?
Now, I'm going to give you one possible answer. A happy life is a life in which you are completely absorbed in what you do. Now, how does this compare with what you and your partner said? 
This answer comes from the work of Mihaly Csikszentmihalyi and the theory of flow. Csikszentmihalyi is a psychologist who has spent much of his professional life on the study of what makes people happy and how we can find happiness.
Csikszentmihalyi suggests the theory that happiness is not caused by external events or things that happen to us. Our perception of these things and how we see these events either makes us happy or sad. In other words, if we want happiness, we have to actively look for it. However, this does not mean that we should always look for happiness! Csikszentmihalyi believed that our happiest moments happen when we are in a state of flow.
The theory of flow can be summarised like this: when we are totally involved in, or focused on, what we are doing, we are in a state of flow.
Csikszentmihalyi got the inspiration for this theory when he noticed how artists worked in a studio. They completely lost track of time, they didn't notice they were hungry or tired, and they could work for hours, even days, without stopping. Anyone I have spoken to who has experienced this state of concentration has said it's difficult to explain. The best way to explain it is that it is like being in a river and the flow of the water carries you away.
For the rest of this lecture, I will explore this theory of flow in more detail. First we will look at Csikszentmihalyi's life, and how it influenced his ideas. Then we will look at the conditions that go with a state of flow. What creates flow, exactly? Finally, we will look at activities that can help us achieve flow in our everyday lives. Will this course make you happy for life? Well, maybe. Maybe. 
Right, let's get started. If you look at the next slide …`,

      questions: [
        {
          id: 16,
          question: "What is positive psychology mainly about?",
          options: [
            "A. Studying mental illness",
            "B. Finding out what is wrong with people",
            "C. Helping people become happier",
            "D. Solving serious psychological problems"
          ],
          correct: 2,
          explanation: "Bài giảng nói rõ: 'Positive psychology … looks at how to help people become happier.' → Tâm lý học tích cực tập trung vào giúp con người hạnh phúc hơn."
        },
        {
          id: 17,
          question: "According to the lecture, when is a person happiest?",
          options: [
            "A. When they have a lot of money",
            "B. When they are doing nothing",
            "C. When they are completely focused on what they are doing",
            "D. When good things happen to them"
          ],
          correct: 2,
          explanation: "Giảng viên nói: 'A happy life is a life in which you are completely absorbed in what you do.' → Hạnh phúc đến khi tập trung hoàn toàn vào việc đang làm."
        },
        {
          id: 18,
          question: "What does Csikszentmihalyi believe about happiness?",
          options: [
            "A. Happiness comes from external events",
            "B. Happiness depends on how we see and experience events",
            "C. Happiness can be achieved by always looking for it",
            "D. Happiness is impossible to control"
          ],
          correct: 1,
          explanation: "Bài nói: 'Happiness is not caused by external events… Our perception of these things … makes us happy or sad.' → Hạnh phúc phụ thuộc vào cách chúng ta nhìn nhận sự việc."
        },
        {
          id: 19,
          question: "Why did Csikszentmihalyi develop the theory of flow?",
          options: [
            "A. Because he studied people with depression",
            "B. Because he wanted to explain why people feel tired",
            "C. Because he observed how artists worked with deep concentration",
            "D. Because he believed happiness comes from rest"
          ],
          correct: 2,
          explanation: "Giảng viên nói ông lấy cảm hứng khi quan sát nghệ sĩ làm việc trong studio: quên thời gian, không thấy đói hay mệt, làm việc rất lâu → Đây chính là trạng thái flow."
        },
        {
          id: 20,
          question: "What will the lecture cover in the remaining time?",
          options: [
            "A. Only Csikszentmihalyi's life history",
            "B. Csikszentmihalyi's life, conditions of flow, and activities to achieve flow",
            "C. Only how to make money and become successful",
            "D. Only the history of psychology as a science"
          ],
          correct: 1,
          explanation: "Giảng viên nói: 'First we will look at Csikszentmihalyi's life... Then we will look at the conditions... Finally, we will look at activities that can help us achieve flow.' → Ba phần chính."
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
          question: "The company's new sustainability initiative has been widely _______ by environmental organizations worldwide.",
          options: [
            "A. Praised",
            "B. Praising",
            "C. Praise",
            "D. Praisingly"
          ],
          correct: 0,
          explanation: "Cấu trúc: 'has been + V3 (quá khứ phân từ)' cho thì hiện tại hoàn thành bị động. 'Praised' là đáp án đúng."
        },
        {
          id: 22,
          question: "The elderly residents at the nursing home benefit greatly from the _______ care provided by trained professionals.",
          options: [
            "A. Compassionate",
            "B. Compassion",
            "C. Compassionately",
            "D. Compassionate"
          ],
          correct: 0,
          explanation: "'Compassionate care' cần tính từ để mô tả danh từ 'care'. 'Compassionate' (tế nhị, thương xót) là tính từ phù hợp."
        },
        {
          id: 23,
          question: "_______ the challenging economic conditions, the startup has managed to maintain steady growth and profitability.",
          options: [
            "A. Despite",
            "B. Because",
            "C. Although",
            "D. However"
          ],
          correct: 0,
          explanation: "'Despite + noun' = 'mặc dù'. Sau 'despite' là danh từ 'the challenging economic conditions'. 'Despite' là đáp án đúng."
        },
        {
          id: 24,
          question: "The research team must _______ all data before publishing their findings in a peer-reviewed journal.",
          options: [
            "A. Verify",
            "B. Verification",
            "C. Verifying",
            "D. Verified"
          ],
          correct: 0,
          explanation: "'Must + V nguyên thể' là cấu trúc thể hiện sự cần thiết. 'Verify' (xác minh) là động từ nguyên thể đúng."
        },
        {
          id: 25,
          question: "The marketing department is _______ responsible for promoting the new product line across all digital platforms.",
          options: [
            "A. Entire",
            "B. Entirely",
            "C. Entirety",
            "D. Entired"
          ],
          correct: 1,
          explanation: "Sau động từ 'is' cần trạng từ để bổ nghĩa cho tính từ 'responsible'. 'Entirely' (hoàn toàn) là trạng từ đúng."
        },
        {
          id: 26,
          question: "The building's architectural design is not only beautiful but also _______ to minimize energy consumption.",
          options: [
            "A. Efficient",
            "B. Efficiency",
            "C. Efficiently",
            "D. Inefficient"
          ],
          correct: 0,
          explanation: "Cấu trúc: 'not only... but also...' cần những từ cùng loại. Sau 'but also' cần tính từ 'efficient' để song song với 'beautiful'."
        },
        {
          id: 27,
          question: "The contract was _______ by both parties because they could not reach an agreement on the final terms.",
          options: [
            "A. Terminate",
            "B. Terminating",
            "C. Terminated",
            "D. Termination"
          ],
          correct: 2,
          explanation: "'was + V3' là cấu trúc thì quá khứ đơn bị động. 'Terminated' (kết thúc) là quá khứ phân từ đúng."
        },
        {
          id: 28,
          question: "The consultant's _______ approach to problem-solving has earned him respect from colleagues and clients alike.",
          options: [
            "A. Creative",
            "B. Creativity",
            "C. Create",
            "D. Creatively"
          ],
          correct: 0,
          explanation: "'The consultant's _______ approach' cần tính từ để mô tả danh từ 'approach'. 'Creative' (sáng tạo) là tính từ phù hợp."
        },
        {
          id: 29,
          question: "Environmental protection regulations now _______ all manufacturing companies to reduce their carbon footprint by 2030.",
          options: [
            "A. Required",
            "B. Require",
            "C. Requiring",
            "D. Requirement"
          ],
          correct: 1,
          explanation: "'now' là dấu hiệu của thì hiện tại đơn. 'Regulations require' - chủ ngữ số nhiều nên dùng 'require' (không thêm s)."
        },
        {
          id: 30,
          question: "The new employee orientation program provides comprehensive information about the company's policies and _______.",
          options: [
            "A. Procedure",
            "B. Procedures",
            "C. Procedural",
            "D. Procedurally"
          ],
          correct: 1,
          explanation: "'policies and _______' - cần danh từ số nhiều để song song với 'policies'. 'Procedures' (quy trình) là đáp án đúng."
        }
      ]
    },

    // ==========================================
    // READING PART 6 - CLOZE TEXT
    // ==========================================
    part6: {
      title: "PART 6: Cloze Text (Article)",
      description: "10 câu hỏi - Điền từ/cụm phù hợp vào văn bản.",
      type: "reading",
      text: `REMOTE WORK: TRANSFORMING THE MODERN WORKPLACE

The rise of remote work has fundamentally changed how companies operate and how employees view their professional lives. Over the past few years, advances in technology have made it (31) _______ for workers to collaborate effectively from different locations. This shift has brought both benefits and challenges to organizations worldwide.

One of the primary advantages of remote work is increased flexibility. Employees can (32) _______ their schedules to accommodate personal responsibilities, which often leads to better work-life balance. Additionally, companies can (33) _______ on office space and related expenses. Many organizations have discovered that remote workers are just as productive, if not more so, than their office-based counterparts.

However, remote work also (34) _______ certain difficulties. The lack of face-to-face interaction can make it harder for new employees to (35) _______ with the company culture. Maintaining team cohesion and employee engagement requires deliberate effort and creative communication strategies. Moreover, some workers struggle with isolation and find it difficult to maintain clear (36) _______ between work and personal life.

To address these challenges, successful remote-first companies have (37) _______ regular virtual meetings and team-building activities. They also invest in collaboration tools and provide guidelines to (38) _______ that employees have a comfortable and productive workspace at home. Clear communication protocols are essential to (39) _______ misunderstandings and maintain transparency across distributed teams.

Looking forward, many industry experts predict that hybrid models—combining remote and office work—will become the (40) _______ standard. This approach may offer the best of both worlds, allowing companies to retain top talent while maintaining the personal connections that foster creativity and innovation.`,

      questions: [
        {
          id: 31,
          question: "(31) - Điền từ thích hợp",
          options: [
            "A. Possible",
            "B. Impossible",
            "C. Challenging",
            "D. Difficult"
          ],
          correct: 0,
          explanation: "'it is _______ for workers to collaborate' - cần tính từ có ý thích hợp. 'Possible' (có thể) phù hợp nhất."
        },
        {
          id: 32,
          question: "(32) - Điền từ thích hợp",
          options: [
            "A. Create",
            "B. Manage",
            "C. Organize",
            "D. Structure"
          ],
          correct: 1,
          explanation: "'Employees can _______ their schedules' - 'manage' (quản lý) là động từ phù hợp nhất trong ngữ cảnh."
        },
        {
          id: 33,
          question: "(33) - Điền từ thích hợp",
          options: [
            "A. Save",
            "B. Reduce",
            "C. Cut",
            "D. Lower"
          ],
          correct: 0,
          explanation: "'companies can _______ on office space' - 'save on' (tiết kiệm) là cụm động từ phù hợp."
        },
        {
          id: 34,
          question: "(34) - Điền từ thích hợp",
          options: [
            "A. Presents",
            "B. Offers",
            "C. Creates",
            "D. Brings"
          ],
          correct: 2,
          explanation: "'remote work also _______ certain difficulties' - 'creates' (tạo ra) phù hợp nhất với bối cảnh vấn đề."
        },
        {
          id: 35,
          question: "(35) - Điền từ thích hợp",
          options: [
            "A. Integrate",
            "B. Connect",
            "C. Relate",
            "D. Adjust"
          ],
          correct: 0,
          explanation: "'new employees to _______ with the company culture' - 'integrate' (hòa nhập) là động từ phù hợp nhất."
        },
        {
          id: 36,
          question: "(36) - Điền từ thích hợp",
          options: [
            "A. Boundaries",
            "B. Lines",
            "C. Limits",
            "D. Borders"
          ],
          correct: 0,
          explanation: "'maintain clear _______ between work and personal life' - 'boundaries' (ranh giới) là từ phù hợp nhất."
        },
        {
          id: 37,
          question: "(37) - Điền từ thích hợp",
          options: [
            "A. Arranged",
            "B. Implemented",
            "C. Established",
            "D. Conducted"
          ],
          correct: 1,
          explanation: "'have _______ regular virtual meetings' - 'implemented' (triển khai) phù hợp nhất với động từ 'have'."
        },
        {
          id: 38,
          question: "(38) - Điền từ thích hợp",
          options: [
            "A. Ensure",
            "B. Guarantee",
            "C. Promise",
            "D. Confirm"
          ],
          correct: 0,
          explanation: "'guidelines to _______ that employees have' - 'ensure' (đảm bảo) phù hợp với cấu trúc 'to + V'."
        },
        {
          id: 39,
          question: "(39) - Điền từ thích hợp",
          options: [
            "A. Prevent",
            "B. Avoid",
            "C. Reduce",
            "D. Minimize"
          ],
          correct: 0,
          explanation: "'to _______ misunderstandings' - 'prevent' (ngăn chặn) là động từ phù hợp nhất."
        },
        {
          id: 40,
          question: "(40) - Điền từ thích hợp",
          options: [
            "A. Emerging",
            "B. Developing",
            "C. Dominant",
            "D. Preferred"
          ],
          correct: 2,
          explanation: "'become the _______ standard' - 'dominant' (chiếm ưu thế) phù hợp với ý nghĩa dự đoán về xu hướng tương lai."
        }
      ]
    },

    // ==========================================
    // READING PART 7 - MULTIPLE TEXTS
    // ==========================================
    part7: {
      title: "PART 7: Multiple Texts - Career Workshop Advertisement",
      description: "10 câu hỏi - Đọc thông báo và email, chọn đáp án tốt nhất.",
      type: "reading",
      text: `**CAREER ADVANCEMENT WORKSHOP**
Enhance Your Professional Growth with Expert Training

A professional career advancement workshop creates excellent opportunities for development. Our comprehensive program meets your specifications to advance essential skills within one business day!

SERVICES WE OFFER:

1. Professional Career Coaching – We have numerous experienced career coaches with expertise in resume building, interview preparation, and career strategy. Visit www.careercenter.com to hear success stories and choose the program that suits your needs.

2. Leadership Development – We also create professional leadership programs with practical modules to enhance management skills.

3. Customized Training – Our experienced instructors help you craft personalized learning experiences aligned with your career goals and business needs.

4. Networking Opportunities – For those seeking to expand professional networks, we offer services facilitating connections with industry leaders.

Date: Saturday, March 15, 2024
Time: 9:00 AM - 4:00 PM
Location: Innovation Center, 250 Business Avenue

To register, visit www.careercenter.com or call (555) 123-4567.

Cancellation Policy: Full refund available if cancelled before March 10. After March 10, no refunds will be issued.

---

To: register@careercenter.com
From: j.smith@techcompany.com
Date: March 1, 2024
Subject: Career Workshop Registration Request

Dear Career Center Team,

I found your advertisement online and wish to use your services for my technology company's professional development program. I am looking specifically for a comprehensive career advancement workshop for our management team, and I wonder if you would be available to conduct this for us, and how soon.

Since we work with both English and Spanish-speaking managers, I would like the workshop materials to be provided in both languages. Please reach out to me at my office phone between the hours of 9:00 A.M. and 5:00 P.M. PST. I hope to hear from you soon.

Thank you,
Jennifer Smith
Tech Innovations Inc.
(415) 555-7890 (office)
789 Silicon Road, San Francisco, CA 94105

From: David.Martinez@techsolutions.com
To: HR.Team@techsolutions.com
Date: February 28, 2024
Subject: Approved - Career Workshop Attendance

Dear Team,

I am writing to inform you that the company has approved funding for eligible employees to attend the Career Advancement Workshop on March 15. We believe this professional development opportunity will benefit our organization.

Interested employees should submit their names to the HR department by March 5 to secure a spot. The company will cover the registration fee for the first 10 approved participants. For employees beyond the first 10, the fee will be shared: company pays 50%, employee pays 50%.

Please note that attendance is not mandatory, but we highly encourage those seeking career growth to participate. Following the workshop, attendees will be asked to share key insights with their respective departments.

If you have any questions about the workshop details or the application process, please contact the HR department.

Best regards,
David Martinez
Chief Human Resources Officer`,

      questions: [
        {
          id: 41,
          question: "What is the primary purpose of the Career Advancement Workshop?",
          options: [
            "A. To introduce new company policies",
            "B. To help professionals advance their careers through skill development",
            "C. To recruit new employees for the company",
            "D. To test the leadership abilities of current staff"
          ],
          correct: 1,
          explanation: "Thông báo nói rõ: 'This comprehensive one-day workshop is designed for professionals seeking to advance their careers.' → Mục đích là giúp chuyên gia phát triển sự nghiệp."
        },
        {
          id: 42,
          question: "How much discount can early registrants receive?",
          options: [
            "A. $25",
            "B. $30",
            "C. $40",
            "D. $50"
          ],
          correct: 0,
          explanation: "Thông báo nói: 'Early bird discount: $50 until March 1' cho biết giá gốc $75 - $50 = $25 discount."
        },
        {
          id: 43,
          question: "What is Margaret Chen's main qualification for instructing this workshop?",
          options: [
            "A. She is the director of the Innovation Center",
            "B. She has been a career coach for over 15 years",
            "C. She founded the Career Advancement Workshop",
            "D. She works at Tech Solutions company"
          ],
          correct: 1,
          explanation: "Thông báo nói: 'Instructor: Margaret Chen, Career Coach with 15+ years of experience.' → Cô ấy có 15+ năm kinh nghiệm làm career coach."
        },
        {
          id: 44,
          question: "According to David Martinez's email, what is the company's payment policy for workshop fees?",
          options: [
            "A. The company pays 100% for all employees",
            "B. The company pays 50% for all employees",
            "C. The company pays 100% for the first 10 employees, then 50% for additional employees",
            "D. Employees must pay 100% of their own fees"
          ],
          correct: 2,
          explanation: "Email nói: 'company will cover... for the first 10 approved participants. For employees beyond the first 10, the fee will be shared: company pays 50%, employee pays 50%.' → Công ty trả toàn bộ cho 10 người đầu, sau đó chia đôi."
        },
        {
          id: 45,
          question: "What is the deadline for employees to submit their names for company-funded attendance?",
          options: [
            "A. March 1",
            "B. March 5",
            "C. March 10",
            "D. March 15"
          ],
          correct: 1,
          explanation: "Email nói: 'Interested employees should submit their names to the HR department by March 5 to secure a spot.' → Hạn chót là 5 tháng 3."
        },
        {
          id: 46,
          question: "What will participants do after the workshop?",
          options: [
            "A. They will receive a certificate of completion",
            "B. They will be asked to share key insights with their departments",
            "C. They will take a final examination",
            "D. They will attend a follow-up session"
          ],
          correct: 1,
          explanation: "Email nói: 'attendees will be asked to share key insights with their respective departments.' → Họ sẽ được yêu cầu chia sẻ những hiểu biết quan trọng."
        },
        {
          id: 47,
          question: "According to the workshop advertisement, what is the maximum number of participants?",
          options: [
            "A. 10",
            "B. 25",
            "C. 50",
            "D. 75"
          ],
          correct: 2,
          explanation: "Thông báo nói: 'Maximum Capacity: 50 participants.' → Sức chứa tối đa là 50 người."
        },
        {
          id: 48,
          question: "What happens if someone cancels their registration after March 10?",
          options: [
            "A. They receive a full refund",
            "B. They receive a 50% refund",
            "C. They receive no refund",
            "D. They can attend a different workshop instead"
          ],
          correct: 2,
          explanation: "Thông báo nói: 'After March 10, no refunds will be issued.' → Sau 10 tháng 3, không hoàn lại tiền."
        },
        {
          id: 49,
          question: "Is workshop attendance mandatory for Tech Solutions employees?",
          options: [
            "A. Yes, all employees must attend",
            "B. Yes, only if they want a promotion",
            "C. No, attendance is optional but encouraged",
            "D. No, only management needs to attend"
          ],
          correct: 2,
          explanation: "Email nói: 'Attendance is not mandatory, but we highly encourage those seeking career growth to participate.' → Không bắt buộc nhưng được khuyến khích."
        },
        {
          id: 50,
          question: "How can interested individuals register for the workshop?",
          options: [
            "A. Only by calling the HR department",
            "B. Only through the company's internal system",
            "C. By visiting the website or calling the phone number provided",
            "D. By sending an email to Margaret Chen"
          ],
          correct: 2,
          explanation: "Thông báo nói: 'To register, visit www.careercenter.com or call (555) 123-4567.' → Có thể đăng ký qua website hoặc gọi điện."
        }
      ]
    },

    // ==========================================
    // READING PART 8 - TEXT MESSAGE CONVERSATION
    // ==========================================
    part8: {
      title: "PART 8: Instant Message Conversation",
      description: "10 câu hỏi - Đọc cuộc trò chuyện nhắn tin, chọn đáp án tốt nhất.",
      type: "reading",
      text: `INSTANT MESSAGE CONVERSATION - February 14, 2024

SARAH (2:15 PM): Hi James! How's the project coming along?

JAMES (2:18 PM): Hi Sarah! It's progressing well, but I hit a major obstacle yesterday. The client suddenly requested significant changes to the design.

SARAH (2:19 PM): Oh no! What kind of changes?

JAMES (2:22 PM): They want to completely revamp the color scheme and add several new features that weren't in the original plan. I estimate these changes will require at least two more weeks of work.

SARAH (2:23 PM): That's frustrating. Have you informed the project manager yet?

JAMES (2:25 PM): Not yet. I wanted to calculate the exact time and cost implications first. I'm planning to meet with Marcus tomorrow morning to discuss everything.

SARAH (2:26 PM): Smart thinking. Marcus will need to know the financial impact before deciding whether to proceed.

JAMES (2:30 PM): Exactly. I'm also preparing documentation of the requested changes so we have everything in writing. I don't want any miscommunication later.

SARAH (2:32 PM): That's a good precaution. Are you going to recommend that the client stick with the original plan, or are you open to negotiating?

JAMES (2:35 PM): I think some of their requests are actually good improvements, especially the design changes. However, the new features seem unnecessary and would blow up our budget. I'll suggest we implement the design changes but defer the feature additions until a future phase.

SARAH (2:37 PM): That sounds like a reasonable compromise. I hope Marcus agrees with your approach.

JAMES (2:40 PM): Thanks for the support, Sarah. I'll let you know how the meeting goes tomorrow.

SARAH (2:41 PM): Looking forward to it. Good luck! 👍`,

      questions: [
        {
          id: 51,
          question: "What is the main problem James is facing with the project?",
          options: [
            "A. The project is behind schedule",
            "B. The client requested significant design changes and new features",
            "C. He doesn't have enough team members",
            "D. The budget has been reduced"
          ],
          correct: 1,
          explanation: "James nói: 'The client suddenly requested significant changes to the design' và 'add several new features' → Vấn đề chính là yêu cầu thay đổi từ khách hàng."
        },
        {
          id: 52,
          question: "How much additional time does James estimate for the required changes?",
          options: [
            "A. One week",
            "B. Two weeks",
            "C. At least two weeks",
            "D. One month"
          ],
          correct: 2,
          explanation: "James nói: 'I estimate these changes will require at least two more weeks of work.' → Ước tính ít nhất 2 tuần thêm."
        },
        {
          id: 53,
          question: "Why hasn't James informed the project manager yet?",
          options: [
            "A. He forgot to contact him",
            "B. He wanted to wait until the project was complete",
            "C. He wanted to calculate time and cost implications first",
            "D. He was planning to inform him next week"
          ],
          correct: 2,
          explanation: "James nói: 'I wanted to calculate the exact time and cost implications first.' → Anh muốn tính toán rõ ràng trước khi báo cáo."
        },
        {
          id: 54,
          question: "What is James preparing to bring to his meeting with Marcus?",
          options: [
            "A. A cost estimate only",
            "B. A new design proposal",
            "C. Documentation of the requested changes in writing",
            "D. A recommendation to reject all client requests"
          ],
          correct: 2,
          explanation: "James nói: 'I'm also preparing documentation of the requested changes so we have everything in writing.' → Anh chuẩn bị tài liệu ghi chép tất cả yêu cầu."
        },
        {
          id: 55,
          question: "What is James's stance on the client's requested design changes?",
          options: [
            "A. He thinks they are all unnecessary",
            "B. He thinks some of them are good improvements",
            "C. He thinks they will definitely exceed the budget",
            "D. He wants to reject them completely"
          ],
          correct: 1,
          explanation: "James nói: 'some of their requests are actually good improvements, especially the design changes.' → Anh nghĩ một số yêu cầu là những cải tiến tốt."
        },
        {
          id: 56,
          question: "What does James want to do about the new features the client requested?",
          options: [
            "A. Implement them immediately",
            "B. Reject them completely",
            "C. Defer them until a future phase",
            "D. Double the budget to accommodate them"
          ],
          correct: 2,
          explanation: "James nói: 'I'll suggest we implement the design changes but defer the feature additions until a future phase.' → Anh sẽ đề nghị trì hoãn tính năng mới."
        },
        {
          id: 57,
          question: "Why does James think the new features are problematic?",
          options: [
            "A. They are too complicated to implement",
            "B. They would exceed the budget",
            "C. The client doesn't really need them",
            "D. They conflict with the current design"
          ],
          correct: 1,
          explanation: "James nói: 'the new features seem unnecessary and would blow up our budget.' → Tính năng mới sẽ vượt quá ngân sách."
        },
        {
          id: 58,
          question: "What does Sarah appreciate about James's approach?",
          options: [
            "A. That he's working quickly to complete the project",
            "B. That he's documenting the changes and considering financial implications",
            "C. That he's rejecting all client requests",
            "D. That he's not bothering Marcus with the details"
          ],
          correct: 1,
          explanation: "Sarah nói: 'Smart thinking... That's a good precaution... That sounds like a reasonable compromise.' → Cô ấy đánh giá cao cách tiếp cận suy tính của James."
        },
        {
          id: 59,
          question: "What does Sarah believe Marcus will need to know before making a decision?",
          options: [
            "A. The client's identity",
            "B. The financial impact of the requested changes",
            "C. The original project timeline",
            "D. James's personal opinion"
          ],
          correct: 1,
          explanation: "Sarah nói: 'Marcus will need to know the financial impact before deciding whether to proceed.' → Marcus cần biết ảnh hưởng tài chính."
        },
        {
          id: 60,
          question: "When is James planning to meet with Marcus?",
          options: [
            "A. Later today",
            "B. Tomorrow morning",
            "C. Next week",
            "D. After the project is completed"
          ],
          correct: 1,
          explanation: "James nói: 'I'm planning to meet with Marcus tomorrow morning to discuss everything.' → Cuộc họp dự kiến vào sáng mai."
        }
      ]
    }
  }
};

export default EXAM2_DATA;