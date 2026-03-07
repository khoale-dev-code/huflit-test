export const EXAM6_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 6",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu)",
  metadata: {
    exam: "exam6",
    hasAudio: true,
  },

  parts: {
    // ==========================================
    // LISTENING PART 1
    // ==========================================
    part1: {
      title: "PART 1: Superhero Powers Discussion",
      description: "Nghe đoạn hội thoại về những siêu năng lực mong muốn. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam6/listening/part1.mp3",
      script: `Gyri: What are some superhero skills that you would like to have?

Viyasan: There's lots of different types of skills out there that have my attention but I think the most important skill or the most useful skill for me would be to clone myself. There's an anime, Naruto, and coincidentally we're in Japan as well. In Naruto, you're able to clone yourself and when you clone yourself you're able to still retain all the knowledge that your clone is doing. For example, I could be here doing an interview and my clone could be outside swimming and practicing swimming, and then when my clone disappears, I'll still retain all the knowledge I have from swimming even though I was performing an interview here. I think that would be very useful in learning a lot of different types of things. For example, languages, practicing sports, cooking food, and it would be very efficient with my time and I'd be able to complete everything on my schedule.

Gyri: Multi-tasking.

Viyasan: Exactly. Multi-tasking at its finest. That's definitely a superhero power that I would love to have.

Gyri: Mm-hmm.

Viyasan: What about yourself? What would you like to do?

Gyri: Oh, I'm not sure. When I was little I always wanted to be able to fly or breathe underwater because I really wanted to be a mermaid when I was little, but I think now maybe just teleportation would be really nice. I wouldn't have to walk everywhere. I'm a little lazy. I wouldn't have to sit on the plane for like ten hours when I visit my family in the states. I hate flying, it's just really boring.

Viyasan: Yeah.

Gyri: So yeah, definitely teleportation, I think.

Viyasan: Okay, that's a very interesting superhero ability to have.

Gyri: Yeah.

Viyasan: Definitely makes life a lot quicker. You won't have to sit in rush hour either when you're driving home from work.

Gyri: Yeah, and I could just teleport to all the different places and countries that I wanted to go to.

Viyasan: Exactly.

Gyri: Yeah.

Viyasan: That'd be amazing as well, yeah. What else? What other types of superhero powers would you have besides teleportation?

Gyri: Maybe superhuman strength.

Viyasan: Mm-hmm.

Gyri: That would be cool, I think. Just walking around lifting people up and stuff.

Viyasan: Yeah.

Gyri: Or lifting up buildings, like Superman.

Viyasan: Yeah, like Superman.

Gyri: Stopping asteroids and yeah. But people would definitely notice that I had super powers and maybe that's not a good idea.

Viyasan: You might want to compete in some strong man or power building competitions.

Gyri: Yeah, yeah.

Viyasan: Super lifting, yeah.

Gyri: I would become famous.

Viyasan: Exactly, yeah. That would be a good career move, eh?

Gyri: Yeah, but it would be purely talent and not hard work.

Viyasan: Exactly, exactly. But I guess you'd have to practice your superhero strength.

Gyri: I guess.

Viyasan: By picking up different things.

Gyri: Yeah, and practicing not using too much strength and crushing things.

Viyasan: That's true. That's true, yeah. That's very cool.

Gyri: Are there any other powers that you would like to have?

Viyasan: The one superhero that's my favorite is Spider-Man and so I saw all of his movies as a little kid and so I think having webs coming out of your wrist, being able to fly between skyscrapers, being able to stick people onto walls, fighting crime. That would be really cool, but just mainly for the amusement aspect of flying around, sling shooting different things with your webs. That would be very cool and a very unique skill to have.

Gyri: Yeah.

Viyasan: That super power would be amazing to have, yeah.

Gyri: Mm-hmm. He's your favorite superhero?

Viyasan: Yeah, I would say that he's the superhero that I relate to the most. Just recently Spider-Man High School came out and so it depicted Peter Parker, Spider-Man, in high school and so it was a very fun movie and definitely relates a lot to high school and it was very fun to watch and I really enjoyed that. Definitely Spider-Man is my favorite superhero and I really enjoyed his movie and definitely would love to have his web shooting abilities.

Gyri: Mm-hmm.

Viyasan: Yeah.`,

      questions: [
        {
          id: 1,
          question: "What superhero power does Viyasan want the most?",
          options: [
            "A. Flying",
            "B. Teleportation",
            "C. Cloning himself",
            "D. Super strength"
          ],
          correct: 2,
          explanation: "Viyasan nói rõ: 'the most useful skill for me would be to clone myself.' → Anh muốn nhân bản chính mình nhất. Bẫy: A (Gyri muốn), B (Gyri muốn), D (Gyri muốn)."
        },
        {
          id: 2,
          question: "Why does Viyasan think cloning would be useful?",
          options: [
            "A. Because he can travel faster.",
            "B. Because he can learn many things at the same time.",
            "C. Because he can become famous.",
            "D. Because he can fight crime."
          ],
          correct: 1,
          explanation: "Viyasan giải thích: 'my clone could be outside swimming... when my clone disappears, I'll still retain all the knowledge.' → Nhân bản giúp học nhiều thứ cùng lúc. Bẫy: A, C, D không được đề cập."
        },
        {
          id: 3,
          question: "Why does Gyri prefer teleportation?",
          options: [
            "A. She wants to compete in sports competitions.",
            "B. She dislikes long flights and traveling time.",
            "C. She wants to become a superhero.",
            "D. She enjoys visiting skyscrapers."
          ],
          correct: 1,
          explanation: "Gyri nói: 'I wouldn't have to sit on the plane for like ten hours... I hate flying, it's just really boring.' → Cô ghét bay lâu. Bẫy: A, C, D không có căn cứ."
        },
        {
          id: 4,
          question: "What concern does Gyri mention about having superhuman strength?",
          options: [
            "A. People might notice her powers.",
            "B. She might lose control and hurt people accidentally.",
            "C. She might become too famous.",
            "D. She might not be able to travel anymore."
          ],
          correct: 0,
          explanation: "Gyri nói: 'people would definitely notice that I had super powers and maybe that's not a good idea.' → Người ta sẽ nhận ra. Bẫy: B, C, D không được đề cập."
        },
        {
          id: 5,
          question: "Why does Viyasan feel connected to Spider-Man?",
          options: [
            "A. Because Spider-Man has the strongest powers.",
            "B. Because Spider-Man's story relates to high school life.",
            "C. Because Spider-Man can teleport and fly.",
            "D. Because Spider-Man is the most famous superhero."
          ],
          correct: 1,
          explanation: "Viyasan nói: 'Spider-Man High School... it relates a lot to high school... he's the superhero that I relate to the most.' → Câu chuyện liên quan đến cuộc sống trường học. Bẫy: A, C, D không chính xác."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 2
    // ==========================================
    part2: {
      title: "PART 2: The Amazing World of Gumball Scene",
      description: "Nghe đoạn phim hoạt hình về sự xin lỗi của Gumball. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam6/listening/part2.mp3",
      script: `Gumball: Whoa, wait, whoa, whoa. At least let me spot you, buddy. Safety first.

Darwin: All right, I guess.

Gumball: One! 

Darwin: Three quarters! 

Gumball: Okay, I got it! Darwin: Okay, I got it!

Gumball: I'm sorry, dude. I never meant to say your head was fat. Your face looks great. A little scrunched up, though. You look so much better with a smile. Come on. Come on. Come on...

Darwin: All right.

Gumball: Huh?

Darwin: Ah, see? That's my...

Gumball: What?

Darwin: Nothing. Nothing.

Gumball: Come on. Let's just talk it out.

Darwin: Okay.

Gumball: Oh, your face! Oh, I think I'm gonna be sick.

Darwin: Could you be any more insulting? Gumball Watterson, I'm turning my back on you.

Gumball: Dude, let me explain. There's... There's something weird going on here.

Gumball (reading letter): Dear Darwin. Dearest Buddy. To my best companion... Dear Darwin, you are not only my brother, but my best friend. You are not ugly. Your face is fine. I feel utterly horrible about what happened today. I hope we don't stop being friends over this. I hate to see you upset. Because when you cry, I cry. May we never let this happen again. Your best buddy, Gumball.

Darwin: Yeah, not sure. What's that?

Gumball: Oh, um... Well, it's... It's a letter. A letter I wrote for you.

Darwin: You wanna read it then?

Gumball: Okay. (Letter is changed)

Dear Darwin, you are butt ugly. Your face is horrible. I hope we stop being friends over this. See you never, Gumball.

Darwin: I've done enough storming out for one day. I think it's your turn to leave.

Gumball: Look, can I just... I'll, uh, take that as a no.

Gumball (speaking to himself): I'm sorry, old pal. We had so many good times, but I can't bear to see you like this. Then it'd be cruel to go on any longer. Goodbye.

Gumball: What's wrong, Dad?

Richard: I just turned the TV off.

Gumball: Uh, right. Can I speak to you?

Richard: Sure.

Gumball: Have you noticed anything weird lately? Like, you know, strange things happening?

Richard: Esconzuela necesita un doctor. Son sus riñones.

Gumball: What?

Richard: On your new speedboat!

Gumball: Are you trying to be funny? Okay...

Darwin: Gumball, I just realized there's no point in me being angry upstairs by myself.

Gumball: Oh, well, great. So you're, uh, not mad anymore?

Darwin: No, I am. I'm just going to do it somewhere you can see it.

Gumball: Look, I think I know why you're so mad at me. Something weird is going on, okay? So just give me a chance to explain. I th... I th...

Darwin: Now come on!

Gumball: All right, just take your time and say what you need to say.

Darwin: What I wanted to say was I th...

Gumball: See? Look, something's not right. Dad's gone weird, too.

Richard: No, I haven't. That was a diversion to make you two stop fighting. Worked.

Richard: Okay, I've got an idea. If you guys make up, I'll take you to buy me an ice cream. I mean you an ice cream. Us an ice cream. Yeah, I'll take you to buy us an ice cream.

Gumball: Good, let's go then.

Richard: I guess you can have my ice cream, seeing as I should be dieting.

Darwin: No, thanks, dude.`,

      questions: [
        {
          id: 6,
          question: "What did Gumball say about Darwin's face at the beginning?",
          options: [
            "A. It looks great",
            "B. It looks strange",
            "C. It looks scary",
            "D. It looks very funny"
          ],
          correct: 0,
          explanation: "Gumball nói: 'Your face looks great.' → Lúc đầu cậu nói mặt Darwin trông tốt. Bẫy: B, C, D không được đề cập."
        },
        {
          id: 7,
          question: "Why did Darwin get angry with Gumball?",
          options: [
            "A. Gumball laughed at him",
            "B. Gumball said his face looked bad",
            "C. Gumball broke his toy",
            "D. Gumball ignored him"
          ],
          correct: 1,
          explanation: "Darwin nói tức giận vì Gumball xúc phạm anh. Trước đó Gumball nói: 'I never meant to say your head was fat.' → Nói xấu mặt/đầu Darwin. Bẫy: A, C, D không liên quan."
        },
        {
          id: 8,
          question: "What happened when Gumball tried to read the letter to Darwin?",
          options: [
            "A. He forgot the words",
            "B. The letter changed its meaning",
            "C. Darwin refused to listen",
            "D. Gumball lost the letter"
          ],
          correct: 1,
          explanation: "Gumball viết thư xin lỗi nhưng khi đọc, nội dung thay đổi thành lời xúc phạm. → Thư bị biến đổi nội dung. Bẫy: A, C, D không chính xác."
        },
        {
          id: 9,
          question: "What strange thing happened to Richard?",
          options: [
            "A. He started singing",
            "B. He spoke another language",
            "C. He fell asleep",
            "D. He forgot Gumball's name"
          ],
          correct: 1,
          explanation: "Richard đột nhiên nói tiếng Tây Ban Nha: 'Esconzuela necesita un doctor. Son sus riñones.' → Nói ngôn ngữ khác lạ. Bẫy: A, C, D không xảy ra."
        },
        {
          id: 10,
          question: "Why did Richard act strangely?",
          options: [
            "A. He was confused",
            "B. He wanted to trick Gumball",
            "C. He wanted Gumball and Darwin to stop fighting",
            "D. He was practicing a new language"
          ],
          correct: 2,
          explanation: "Richard nói: 'That was a diversion to make you two stop fighting. Worked.' → Cha muốn khiến hai con bối rối để họ dừng cãi nhau. Bẫy: A, B, D không đúng mục đích."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 3
    // ==========================================
    part3: {
      title: "PART 3: London Blue Plaques Walking Tour",
      description: "Nghe bài thuyết trình về các bảng kỷ niệm xanh ở London. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam6/listening/part3.mp3",
      script: `Dr. Shini Somara: I love the London blue plaques scheme, because blue plaques for me represent extraordinary stories of people that have made a significant impact in society.

Today we're going to be going on a blue plaques walking tour, and I'm going to be discovering amazing women who have made a significant impact in the area of science, technology and innovation. Let's go!

I've arrived at number 53 Wimpole Street to see the blue plaque to Diana Beck. She was one of the world's first female neurosurgeons. She is an incredible woman for so many different reasons. There are so many firsts in her career, which was around the 1940s.

She was the first to run a department, she was the first female consultant in neurosurgery, at a time when women were not even admitted into the schools that taught neurosurgery.

But for me, what's really inspiring about Diana Beck is the fact that she was actually living with a neurological condition herself, which made her really tired; it gave her muscle weakness. Yet with all of those challenges, she became an expert on brain bleeds. And it's lovely to see her blue plaque here in the heart of Marylebone.`,

      questions: [
        {
          id: 11,
          question: "What does the London blue plaques scheme represent?",
          options: [
            "A. Famous buildings in London",
            "B. Extraordinary stories of important people",
            "C. Tourist attractions in London",
            "D. Old houses from the past"
          ],
          correct: 1,
          explanation: "Dr. Shini nói: 'blue plaques represent extraordinary stories of people that have made a significant impact.' → Đại diện câu chuyện của những người có ảnh hưởng. Bẫy: A, C, D sai."
        },
        {
          id: 12,
          question: "What is the purpose of the blue plaques walking tour?",
          options: [
            "A. To explore London's architecture",
            "B. To learn about famous scientists",
            "C. To discover women who impacted science and technology",
            "D. To study London history"
          ],
          correct: 2,
          explanation: "Bà nói: 'discovering amazing women who have made a significant impact in science, technology and innovation.' → Tìm hiểu phụ nữ đóng góp cho khoa học. Bẫy: A, B, D không chính xác."
        },
        {
          id: 13,
          question: "Why is Diana Beck considered a remarkable person?",
          options: [
            "A. She discovered a new disease",
            "B. She was one of the first female neurosurgeons",
            "C. She invented brain surgery",
            "D. She opened a new hospital"
          ],
          correct: 1,
          explanation: "Transcript: 'She was one of the world's first female neurosurgeons.' → Một trong những bác sĩ phẫu thuật thần kinh nữ đầu tiên. Bẫy: A, C, D không xảy ra."
        },
        {
          id: 14,
          question: "What challenge did Diana Beck face during her life?",
          options: [
            "A. She did not have enough education",
            "B. She suffered from a neurological condition",
            "C. She had financial problems",
            "D. She was not allowed to work in hospitals"
          ],
          correct: 1,
          explanation: "Bà nói: 'she was living with a neurological condition herself, which made her really tired; it gave her muscle weakness.' → Mắc chứng rối loạn thần kinh. Bẫy: A, C, D không đề cập."
        },
        {
          id: 15,
          question: "Why does Dr. Shini Somara find Diana Beck especially inspiring?",
          options: [
            "A. She became famous worldwide",
            "B. She helped build a new university",
            "C. She succeeded despite her health difficulties",
            "D. She discovered a cure for brain disease"
          ],
          correct: 2,
          explanation: "Dù mắc bệnh thần kinh nhưng Diana vẫn trở thành chuyên gia não. → Thành công bất chấp khó khăn sức khỏe. Bẫy: A, B, D không chính xác."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 4
    // ==========================================
    part4: {
      title: "PART 4: Dubai Influencers Coordinated Posts",
      description: "Nghe bài báo BBC về các bài đăng giống nhau từ influencer Dubai. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam6/listening/part4.mp3",
      script: `BBC News: What's REALLY behind identical posts from Dubai influencers?

Presenter: Many influencers in the UAE are posting identical messages across social media. At first glance, it looks like people are hopping on a social trend. But we've been investigating and uncovered some signs that there is more to it.

Watch the news and you'll have seen that parts of the United Arab Emirates were recently targeted by Iranian missiles. Most of them successfully intercepted by the UAE and allied defense systems. The entire region has been pulled into the growing confrontation following the US-Israel strikes on Iran. One explosion happened near the Fairmont Hotel on the Palm Jumeirah, one of the most exclusive and protected parts of Dubai.

When we analyzed posts from influencers based in Dubai during the first days of the conflict, we found a number of interesting things. Between the 28th of February and the 4th of March, we collected 129 Instagram posts from 21 accounts.

Our first finding: the wording across many of them was strikingly similar. Messages about not being afraid, trusting the leadership, and the country's strong air defense systems. The most frequently repeated phrase was "air defense," appearing 18 times. That was followed by "stay safe," appearing 17 times; "strong leadership," appearing 15 times. Other phrases like "defense systems," "advanced defense," and "defense unshaken" appeared almost as often. Taken together, the posts reinforce three main themes: safety, stability, and strong leadership.

Secondly, we found that in several cases, posts were uploaded within seconds or minutes of each other. For example, on the 1st of March, one account posted a message emphasizing leadership and national strength. Just 31 seconds later, another posted about air defense systems and safety. And this happened more than once in the accounts we analyzed.

Thirdly, our analysis found that similar posts spanning across many Arab countries performed unusually well. Several of them attracted far more views, likes, and shares than the influencers' typical posts. There are a few possible explanations for that. Content about conflicts often performs well on social media. But unusually high engagement can also happen when posts are artificially boosted through advertising or bot networks designed to make messaging appear organic—a tactic sometimes called "astroturfing."

So, does repetitive wording, simultaneous posting, and heightened engagement signal something else is behind these posts? These indications usually point to a coordinated effort, but we do not know for sure that this is the case here.

Some comment sections picked up on the repetition, too. This creator responded to those allegations, joking that she's paid in "safety and lifestyle," adding that she made the video to show people in the region that they're not alone. Another influencer posted, "The reason we're all saying it is 'cause we believe in it."

We know influencers are a major part of the country's economy and global branding strategy. In fact, the government offers a special "golden visa" for content creators, which promises long-term residency, zero income tax, and support, such as studio access and mentorship. Residents can also get an influencing permit to advertise on social media, but the UAE has strict laws about what you can post. It's illegal to spread what authorities consider to be false information or rumors. Breaking those laws can lead to large fines or prison sentences. And since the conflict broke out, the UAE government has specifically warned residents against posting any content that contradicts official announcements.

But in a country where almost 90% of residents come from abroad, some supporters feel it's within the government's right to have such policies.`,

      questions: [
        {
          id: 16,
          question: "What did many influencers in the UAE post online?",
          options: [
            "A. Different personal stories",
            "B. Identical messages",
            "C. Travel photos",
            "D. Food reviews"
          ],
          correct: 1,
          explanation: "BBC nói: 'Many influencers in the UAE are posting identical messages across social media.' → Đăng những thông điệp giống nhau. Bẫy: A, C, D không chính xác."
        },
        {
          id: 17,
          question: "What phrase appeared the most in the posts?",
          options: [
            "A. Stay strong",
            "B. Air defense",
            "C. National pride",
            "D. Peace and unity"
          ],
          correct: 1,
          explanation: "Báo cáo: 'The most frequently repeated phrase was \"air defense,\" appearing 18 times.' → Cụm từ \"air defense\" xuất hiện 18 lần. Bẫy: A, C, D xuất hiện ít hơn."
        },
        {
          id: 18,
          question: "What unusual pattern did researchers notice about the posts?",
          options: [
            "A. They were posted at the same time or within seconds",
            "B. They used different languages",
            "C. They were deleted quickly",
            "D. They were written by the same person"
          ],
          correct: 0,
          explanation: "BBC nói: 'Just 31 seconds later, another posted about air defense.' → Các bài đăng cách nhau chỉ vài giây. Bẫy: B, C, D không xảy ra."
        },
        {
          id: 19,
          question: "Why might some posts receive unusually high engagement?",
          options: [
            "A. They are always funny",
            "B. They are promoted or boosted artificially",
            "C. Influencers have more followers now",
            "D. They contain advertisements"
          ],
          correct: 1,
          explanation: "BBC giải thích: 'posts are artificially boosted through advertising or bot networks.' → Được tăng tương tác bằng bot. Bẫy: A, C, D không chính xác."
        },
        {
          id: 20,
          question: "Why might influencers avoid posting information that contradicts official announcements?",
          options: [
            "A. They might lose followers",
            "B. It is against social media rules",
            "C. It can lead to fines or prison sentences",
            "D. It may reduce advertising revenue"
          ],
          correct: 2,
          explanation: "BBC: 'Breaking those laws can lead to large fines or prison sentences.' → Vi phạm có thể bị phạt tiền hoặc tù. Bẫy: A, B, D không chính xác."
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
          question: "The company plans to ________ a new marketing strategy next month.",
          options: [
            "A. implement",
            "B. implementation",
            "C. implementing",
            "D. implemented"
          ],
          correct: 0,
          explanation: "Cấu trúc: plan to + V (động từ nguyên mẫu). 'plan to implement a strategy' → implement là động từ nguyên mẫu. Bẫy: B là danh từ; C là V-ing; D là quá khứ."
        },
        {
          id: 22,
          question: "All employees are required ________ their identification badges while inside the building.",
          options: [
            "A. wear",
            "B. to wear",
            "C. wearing",
            "D. worn"
          ],
          correct: 1,
          explanation: "Cấu trúc: be required to + V. 'are required to wear badges' → to wear. Bẫy: A (không có to); C (V-ing); D (quá khứ phân từ)."
        },
        {
          id: 23,
          question: "The meeting was postponed ________ the manager was unable to attend.",
          options: [
            "A. although",
            "B. because",
            "C. despite",
            "D. however"
          ],
          correct: 1,
          explanation: "Sau cần từ nối chỉ nguyên nhân + mệnh đề: 'because + clause'. 'because the manager was unable' → because. Bẫy: despite + noun/V-ing; although dùng nhưng nghĩa khác."
        },
        {
          id: 24,
          question: "Customers who wish to return a product must present the receipt ________ the time of purchase.",
          options: [
            "A. by",
            "B. at",
            "C. from",
            "D. during"
          ],
          correct: 1,
          explanation: "Cụm cố định: 'at the time of purchase' = tại thời điểm mua. Bẫy: by (đến lúc), from (từ), during (trong suốt) sai nghĩa."
        },
        {
          id: 25,
          question: "The new software system will allow employees ________ tasks more efficiently.",
          options: [
            "A. complete",
            "B. completing",
            "C. to complete",
            "D. completed"
          ],
          correct: 2,
          explanation: "Cấu trúc: allow + someone + to + V. 'allow employees to complete' → to complete. Bẫy: A (không to); B (V-ing); D (quá khứ)."
        },
        {
          id: 26,
          question: "The project manager insisted that the report ________ submitted before Friday.",
          options: [
            "A. be",
            "B. is",
            "C. was",
            "D. being"
          ],
          correct: 0,
          explanation: "Subjunctive: Sau insist/suggest/recommend → 'that + S + be + V3'. 'insisted that report be submitted' → be. Bẫy: B, C là thì thường; D là V-ing."
        },
        {
          id: 27,
          question: "Not only ________ the deadline extended, but the company also provided additional resources.",
          options: [
            "A. was",
            "B. were",
            "C. has",
            "D. had"
          ],
          correct: 0,
          explanation: "Đảo ngữ: 'Not only + aux + S + V'. Deadline (số ít) → 'was the deadline'. Bẫy: were (số nhiều sai); has/had (thì sai)."
        },
        {
          id: 28,
          question: "The proposal, ________ was approved by the board, will be implemented next quarter.",
          options: [
            "A. who",
            "B. which",
            "C. where",
            "D. what"
          ],
          correct: 1,
          explanation: "Mệnh đề quan hệ thay thế cho vật (proposal) → which. 'proposal which was approved' → which. Bẫy: who (người); where (nơi); what (không dùng)."
        },
        {
          id: 29,
          question: "Had the company conducted more research, the product launch ________ more successful.",
          options: [
            "A. will be",
            "B. would be",
            "C. would have been",
            "D. had been"
          ],
          correct: 2,
          explanation: "Conditional 3 đảo: 'Had + S + V3 → S + would have + V3'. 'Had company conducted... launch would have been' → would have been. Bẫy: A, B sai thì."
        },
        {
          id: 30,
          question: "The director requested that all confidential documents ________ securely stored.",
          options: [
            "A. are",
            "B. were",
            "C. be",
            "D. being"
          ],
          correct: 2,
          explanation: "Subjunctive: Sau request that → 'that + S + be + V3'. 'requested that documents be stored' → be. Bẫy: A, B thì thường; D là V-ing."
        }
      ]
    },

    // ==========================================
    // READING PART 6 - CLOZE TEXT
    // ==========================================
    part6: {
      title: "PART 6: Cloze Text (Homelessness & Solutions)",
      description: "10 câu hỏi - Đọc bài về vấn đề vô gia cư và cách giải quyết, chọn đáp án tốt nhất để hoàn thiện văn bản.",
      type: "reading",
      text: `Homelessness is a serious problem in many large cities around the world. It occurs when a part of the population does not have any (31) ________ place to call home. Millions of people experience homelessness for different reasons such as unemployment, poverty, family problems, or natural disasters.

Governments and local authorities are working hard to (32) ________ this issue. They provide temporary shelters, financial support, and job training programs for people who are struggling. However, solving homelessness completely remains a difficult challenge.

Fortunately, there are (33) ________ ways that ordinary people can help the homeless in their communities. One of the most effective ways is to volunteer your time. If you have enough free time, you could travel to places where help is needed and assist organizations that (34) ________ houses for people who have lost their homes.

Even if you cannot travel far, you can still make a difference in your own city. For example, you can volunteer at a (35) ________ soup kitchen where meals are prepared and served to people in need. These kitchens rely heavily on volunteers and donations.

Another way to help is by donating clothes, food, or money to charities that support homeless people. Small actions from many individuals can create meaningful change. By working together, communities can provide support, hope, and opportunities for those who need them most.`,

      questions: [
        {
          id: 31,
          question: "Choose the best option to fill in blank (31).",
          options: [
            "A. common",
            "B. regular",
            "C. unusual",
            "D. fixed"
          ],
          correct: 3,
          explanation: "'a fixed place to call home' = nơi ở cố định. Người vô gia cư không có nơi ở ổn định. Bẫy: common (phổ biến), regular (thường xuyên), unusual (bất thường) sai nghĩa."
        },
        {
          id: 32,
          question: "Choose the best option to fill in blank (32).",
          options: [
            "A. deal with",
            "B. get over",
            "C. look through",
            "D. find out"
          ],
          correct: 0,
          explanation: "'deal with + problem' = giải quyết vấn đề. Bẫy: get over (vượt qua cảm xúc); look through (xem lướt); find out (tìm ra) sai."
        },
        {
          id: 33,
          question: "Choose the best option to fill in blank (33).",
          options: [
            "A. little",
            "B. less",
            "C. more",
            "D. several"
          ],
          correct: 3,
          explanation: "'several ways' = nhiều cách. Ngữ cảnh nói có nhiều cách để giúp. Bẫy: little (ít); less (ít hơn); more (so sánh) sai."
        },
        {
          id: 34,
          question: "Choose the best option to fill in blank (34).",
          options: [
            "A. care for",
            "B. show around",
            "C. set up",
            "D. pull down"
          ],
          correct: 2,
          explanation: "'set up + houses' = xây dựng nhà. Các tổ chức xây nhà cho người vô gia cư. Bẫy: care for (chăm sóc); show around (dẫn); pull down (phá bỏ) sai."
        },
        {
          id: 35,
          question: "Choose the best option to fill in blank (35).",
          options: [
            "A. urban",
            "B. central",
            "C. capital",
            "D. local"
          ],
          correct: 3,
          explanation: "'local soup kitchen' = bếp ăn từ thiện địa phương. Bẫy: urban (đô thị); central (trung tâm); capital (thủ đô) không thích hợp."
        },
        {
          id: 36,
          question: "What is the main topic of the passage?",
          options: [
            "A. Tourism in big cities",
            "B. The problem of homelessness and ways to help",
            "C. Job training programs",
            "D. Housing prices in cities"
          ],
          correct: 1,
          explanation: "Bài nói về vấn đề vô gia cư và các cách giúp đỡ. → Chủ đề chính là B."
        },
        {
          id: 37,
          question: "According to the passage, which of the following is a cause of homelessness?",
          options: [
            "A. Population growth",
            "B. Unemployment",
            "C. Tourism",
            "D. Technology"
          ],
          correct: 1,
          explanation: "Bài nói: 'homelessness happens because of unemployment, poverty, family problems, disasters.' → B đúng."
        },
        {
          id: 38,
          question: "What do governments often provide to help homeless people?",
          options: [
            "A. Free cars",
            "B. Luxury apartments",
            "C. Temporary shelters and job training",
            "D. Free vacations"
          ],
          correct: 2,
          explanation: "Bài: 'governments provide temporary shelters, financial support, and job training.' → C đúng."
        },
        {
          id: 39,
          question: "What can volunteers do to help homeless people?",
          options: [
            "A. Build houses and serve food",
            "B. Start businesses",
            "C. Open schools",
            "D. Organize concerts"
          ],
          correct: 0,
          explanation: "Bài: 'assist organizations that set up houses... volunteer at soup kitchen.' → A đúng."
        },
        {
          id: 40,
          question: "What is the main message of the last paragraph?",
          options: [
            "A. Only governments can solve homelessness",
            "B. Homelessness cannot be solved",
            "C. Small actions from many people can help solve the problem",
            "D. Donations are unnecessary"
          ],
          correct: 2,
          explanation: "Đoạn cuối: 'Small actions from many individuals can create meaningful change.' → C đúng."
        }
      ]
    },

    // ==========================================
    // READING PART 7 - ARTICLE
    // ==========================================
    part7: {
      title: "PART 7: Single Long Text (Australia Article)",
      description: "10 câu hỏi - Đọc bài về Australia: địa lý, lịch sử, dân số và chính trị.",
      type: "reading",
      text: `Australia: Land, People, and History

Australia is a country that includes the mainland of the Australian continent, the island of Tasmania, and many smaller islands. It is the sixth-largest country in the world by total area. The capital city of Australia is Canberra, while Sydney is the largest and most well-known city. Other major cities include Melbourne, Brisbane, and Perth.

For around 50,000 years before the arrival of Europeans, Australia was inhabited by Indigenous Australians. These native people had rich cultures and traditions and spoke languages that can be classified into about 250 different groups. They lived in different regions of the continent and developed unique ways of surviving in Australia's diverse environments. The Aboriginal and Torres Strait Islander peoples represent a continuous cultural tradition spanning tens of thousands of years, making them among the oldest continuous cultures in the world.

In 1606, Dutch explorers were the first Europeans to discover the Australian continent. Later, in 1770, the eastern part of Australia was claimed by Great Britain. The British established their first colony in 1788 in New South Wales. At first, many of the settlers were prisoners sent from Britain, a process known as penal transportation. This practice continued for many decades and played a significant role in shaping the early European settlement of Australia.

During the 19th century, the population of Australia grew steadily. More areas of the continent were explored, and several colonies were established. On January 1st, 1901, the six colonies joined together to form the Commonwealth of Australia. Since then, Australia has developed into a stable democratic country with a strong political system. The federation marked a significant turning point in Australian history, as the separate colonies unified under a common government.

Today, Australia has a population of about 24 million people. Most Australians live in cities, especially along the eastern coast, where the climate is more temperate and the infrastructure is well-developed. The country has one of the world's largest economies and ranks highly in areas such as quality of life, education, health care, and economic freedom. Australia's natural resources, including vast mineral deposits and agricultural lands, have contributed significantly to its economic prosperity and global influence.`,

      questions: [
        {
          id: 41,
          question: "What does Australia include?",
          options: [
            "A. Only the mainland continent",
            "B. The mainland, Tasmania, and many smaller islands",
            "C. Only Tasmania and nearby islands",
            "D. Only large cities"
          ],
          correct: 1,
          explanation: "Bài: 'Australia includes the mainland, the island of Tasmania, and many smaller islands.' → B đúng."
        },
        {
          id: 42,
          question: "What is the capital city of Australia?",
          options: [
            "A. Sydney",
            "B. Melbourne",
            "C. Canberra",
            "D. Brisbane"
          ],
          correct: 2,
          explanation: "Bài nói rõ: 'The capital city of Australia is Canberra.' → C đúng (không phải Sydney)."
        },
        {
          id: 43,
          question: "How long had Indigenous Australians lived in Australia before Europeans arrived?",
          options: [
            "A. About 10,000 years",
            "B. About 30,000 years",
            "C. About 50,000 years",
            "D. About 70,000 years"
          ],
          correct: 2,
          explanation: "Bài: 'For around 50,000 years before the arrival of Europeans.' → C đúng."
        },
        {
          id: 44,
          question: "Approximately how many language groups did Indigenous Australians have?",
          options: [
            "A. 150",
            "B. 200",
            "C. 250",
            "D. 300"
          ],
          correct: 2,
          explanation: "Bài: 'languages that can be classified into about 250 different groups.' → C đúng."
        },
        {
          id: 45,
          question: "Which Europeans first discovered Australia?",
          options: [
            "A. British explorers",
            "B. Dutch explorers",
            "C. French explorers",
            "D. Spanish explorers"
          ],
          correct: 1,
          explanation: "Bài: 'In 1606, Dutch explorers were the first Europeans to discover the Australian continent.' → B đúng."
        },
        {
          id: 46,
          question: "Why were many early British settlers sent to Australia?",
          options: [
            "A. They were farmers",
            "B. They were soldiers",
            "C. They were prisoners",
            "D. They were explorers"
          ],
          correct: 2,
          explanation: "Bài: 'many of the settlers were prisoners sent from Britain... penal transportation.' → C đúng."
        },
        {
          id: 47,
          question: "When was the Commonwealth of Australia officially formed?",
          options: [
            "A. 1788",
            "B. 1850",
            "C. 1901",
            "D. 1950"
          ],
          correct: 2,
          explanation: "Bài: 'On January 1st, 1901, the six colonies joined together to form the Commonwealth.' → C đúng."
        },
        {
          id: 48,
          question: "Where do most Australians live today?",
          options: [
            "A. In rural areas",
            "B. In desert regions",
            "C. Along the eastern coast",
            "D. On small islands"
          ],
          correct: 2,
          explanation: "Bài: 'Most Australians live in cities, especially along the eastern coast.' → C đúng."
        },
        {
          id: 49,
          question: "Which of the following is TRUE about Australia today?",
          options: [
            "A. It has a weak economy",
            "B. It has a stable democratic political system",
            "C. Most people live in villages",
            "D. It has a very small population"
          ],
          correct: 1,
          explanation: "Bài: 'Australia has developed into a stable democratic country.' → B đúng. (A, C, D sai)"
        },
        {
          id: 50,
          question: "What is the main purpose of the passage?",
          options: [
            "A. To describe Australia's geography only",
            "B. To explain Australia's economic system",
            "C. To provide general information about Australia",
            "D. To describe Australian tourism"
          ],
          correct: 2,
          explanation: "Bài nói về địa lý, lịch sử, dân số, kinh tế → mục đích là cung cấp thông tin tổng quan. → C đúng."
        }
      ]
    },

    // ==========================================
    // READING PART 8 - BIOGRAPHY
    // ==========================================
    part8: {
      title: "PART 8: Single Long Text (Voynich Manuscript)",
      description: "10 câu hỏi - Đọc bài về bản thảo Voynich bí ẩn.",
      type: "reading",
      text: `The Voynich Manuscript: History's Greatest Unsolved Mystery

The starkly modern Beinecke Library at Yale University is home to some of the most valuable books in the world: first folios of Shakespeare, Gutenberg Bibles, and manuscripts from the early Middle Ages. Yet the library's most controversial possession is an unprepossessing vellum manuscript about the size of a hardback book, containing 240-odd pages of drawings and text of unknown age and authorship. Catalogued as MS408, the manuscript would attract little attention were it not for the fact that the drawings hint at esoteric knowledge, while the text seems to be some sort of code—one that no one has been able to break. It is known to scholars as the Voynich manuscript, after the American book dealer Wilfrid Voynich, who bought the manuscript from a Jesuit college in Italy in 1912.

Over the years, the manuscript has attracted the attention of everyone, from amateur dabblers to professional codebreakers, all determined to succeed where countless others have failed. Academic research papers, books, and websites are devoted to making sense of the contents of the manuscript, which are freely available to all. "Most other mysteries involve secondhand reports," says Dr. Gordon Rugg of Keele University, a leading Voynich expert. "But this is one that you can see for yourself." It is certainly strange: page after page of drawings of wild plants, astrological symbolism, and human figures, accompanied by a script that looks like some form of shorthand.

What does it say, and what are the drawings about? Voynich himself believed that the manuscript was the work of the 13th-century English monk Roger Bacon, famed for his knowledge of alchemy, philosophy, and science. In 1921, Voynich's view that Bacon was the writer appeared to win support from the work of William Newbold, a professor of philosophy at the University of Pennsylvania, who claimed to have found the key to the cipher system used by Bacon. According to Newbold, the manuscript proved that Bacon had access to a microscope centuries before they were supposedly first invented. The claim that this medieval monk had observed living cells created a sensation. It soon became clear, however, that Newbold had fallen victim to wishful thinking. Other scholars showed that his "decoding" methods produced a host of possible interpretations.

The Voynich manuscript has continued to defy the efforts of world-class experts. In 1944, a team was assembled to tackle the mystery, led by William Friedman, the renowned American codebreaker. They began with the most basic codebreaking task: analyzing the relative frequencies of the characters making up the text, looking for signs of an underlying structure. Yet Friedman's team soon found themselves in deep water. The precise size of the 'alphabet' of the Voynich manuscript was unclear: it is possible to make out more than 70 distinct symbols among the 170,000-character text. Furthermore, Friedman discovered that some words and phrases appeared more often than expected in a standard language, casting doubt on claims that the manuscript concealed a real language, as encryption typically reduces word frequencies.

Friedman concluded that the most plausible resolution of this paradox was that 'Voynichese' is some sort of specially created artificial language, whose words are devised from concepts rather than linguistics. So, could the Voynich manuscript be the earliest known example of an artificial language? Friedman's hypothesis commands respect because of his lifetime of cryptanalytical expertise, but it still leaves a host of questions unanswered—such as the identity of the author and the meaning of the bizarre drawings. "It does little to advance our understanding of the manuscript as a whole," says Rob Churchill, co-author of The Voynich Manuscript.

Even though Friedman was working more than 60 years ago, he suspected that major insights would come from using the device that had already transformed codebreaking: the computer. In this, he was right—it is now the key tool for uncovering clues about the manuscript's language. The insights so far have been perplexing. For example, in 2001, another leading Voynich scholar, Dr. Gabriel Landini of Birmingham University, published the results of his study of the manuscript using a pattern-detecting method called spectral analysis. This revealed evidence that the manuscript contains genuine words, rather than random nonsense—consistent with the existence of some underlying natural language. Yet the following year, Voynich expert Ren Zandbergen showed that the entropy of the text was consistent with Friedman's suspicions that an artificial language had been used.

Many are convinced that the Voynich manuscript isn't a hoax. For how could a medieval hoaxer create so many telltale signs of a message from random nonsense? Yet even this has been challenged in new research by Rugg. Using a system first published by the Italian mathematician Girolamo Cardano in 1150, in which a specially constructed grille is used to pick out symbols from a table, Rugg found he could rapidly generate text with many of the basic traits of the Voynich manuscript. Publishing his results in 2004, Rugg stresses that he hadn't set out to prove the manuscript a hoax. "I simply demonstrated that it's feasible to hoax something this complex in a few months," he says.

Inevitably, others beg to differ. Some scholars, such as Zandbergen, still suspect the text has genuine meaning, though they believe it may never be decipherable. Others, such as Churchill, have suggested that the sheer weirdness of the illustrations and text hint at an author who had lost touch with reality. What is clear is that the book-sized manuscript, kept under lock and key at Yale University, has lost none of its fascination. "Many derive great intellectual pleasure from solving puzzles," says Rugg. The Voynich manuscript is as challenging a puzzle as anyone could ask for.`,

      questions: [
        {
          id: 51,
          question: "Where is the Voynich Manuscript currently kept?",
          options: [
            "A. Oxford University Library",
            "B. The British Museum",
            "C. Yale University's Beinecke Library",
            "D. The Vatican Library"
          ],
          correct: 2,
          explanation: "Bài đầu tiên: 'The Beinecke Library at Yale University is home to... the Voynich manuscript.' → C đúng."
        },
        {
          id: 52,
          question: "Why does the Voynich Manuscript attract so much attention?",
          options: [
            "A. It is the oldest book in the world",
            "B. Its text appears to be written in an undeciphered code",
            "C. It contains rare historical photographs",
            "D. It was written by Shakespeare"
          ],
          correct: 1,
          explanation: "Bài: 'the text seems to be some sort of code—one that no one has been able to break.' → B đúng."
        },
        {
          id: 53,
          question: "Who purchased the manuscript in 1912?",
          options: [
            "A. Roger Bacon",
            "B. William Friedman",
            "C. Wilfrid Voynich",
            "D. Gordon Rugg"
          ],
          correct: 2,
          explanation: "Bài: 'Wilfrid Voynich, who bought the manuscript... in 1912.' → C đúng."
        },
        {
          id: 54,
          question: "What did William Newbold claim about the manuscript?",
          options: [
            "A. It was written by a medieval king",
            "B. It proved Roger Bacon had access to a microscope",
            "C. It contained instructions for building machines",
            "D. It was written in Greek"
          ],
          correct: 1,
          explanation: "Bài: 'the manuscript proved that Bacon had access to a microscope centuries before they were supposed first invented.' → B đúng."
        },
        {
          id: 55,
          question: "Why were Newbold's conclusions later rejected?",
          options: [
            "A. His decoding produced many different interpretations",
            "B. The manuscript was proven fake",
            "C. His research was incomplete",
            "D. The manuscript was lost"
          ],
          correct: 0,
          explanation: "Bài: 'his decoding methods produced a host of possible interpretations.' → A đúng."
        },
        {
          id: 56,
          question: "What was William Friedman's main discovery?",
          options: [
            "A. The manuscript contains Greek symbols",
            "B. The text may represent an artificial language",
            "C. The manuscript was written in Latin",
            "D. The text was completely random"
          ],
          correct: 1,
          explanation: "Bài: 'Friedman concluded that... Voynichese is some sort of specially created artificial language.' → B đúng."
        },
        {
          id: 57,
          question: "What role do computers play in studying the manuscript today?",
          options: [
            "A. They help preserve the manuscript physically",
            "B. They are used to translate ancient languages",
            "C. They help analyze patterns and structure in the text",
            "D. They create digital copies for museums"
          ],
          correct: 2,
          explanation: "Bài: 'the computer is now the key tool for uncovering clues about the manuscript's language.' → C đúng."
        },
        {
          id: 58,
          question: "What did Gabriel Landini's research suggest?",
          options: [
            "A. The manuscript text is completely meaningless",
            "B. The manuscript contains genuine words",
            "C. The manuscript was written by monks",
            "D. The manuscript was created in the 20th century"
          ],
          correct: 1,
          explanation: "Bài: 'the manuscript contains genuine words, rather than random nonsense.' → B đúng."
        },
        {
          id: 59,
          question: "What did Gordon Rugg demonstrate in his research?",
          options: [
            "A. The manuscript could have been created as a hoax",
            "B. The manuscript was written by Roger Bacon",
            "C. The manuscript contains hidden maps",
            "D. The manuscript was written in Latin"
          ],
          correct: 0,
          explanation: "Bài: 'I simply demonstrated that it's feasible to hoax something this complex in a few months.' → A đúng."
        },
        {
          id: 60,
          question: "What is the main reason the Voynich Manuscript continues to fascinate researchers?",
          options: [
            "A. It contains secret government information",
            "B. Its mystery has never been fully solved",
            "C. It is the largest manuscript ever written",
            "D. It describes medieval wars"
          ],
          correct: 1,
          explanation: "Cuối bài: 'The Voynich manuscript is as challenging a puzzle as anyone could ask for.' → B đúng."
        }
      ]
    }
  }
};

export default EXAM6_DATA;