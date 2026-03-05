export const EXAM5_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 5",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu)",
  metadata: {
    exam: "exam5",
    hasAudio: true,
  },

  parts: {
    // ==========================================
    // LISTENING PART 1
    // ==========================================
    part1: {
      title: "PART 1: Product Presentation",
      description: "Nghe đoạn giới thiệu sản phẩm iPhone 17 Pro. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam5/listening/part1.mp3",
      script: `Introducing iPhone 17 Pro: to redefine pro, we had to start again with solid aluminium that's extruded, heated, forged, and precision machined in finer and finer passes, then anodized for colour and durability to create our first aluminium unibody. It is a light, thermally efficient, and rigid enclosure for the biggest battery with the longest battery life in any iPhone. The full-width camera plateau elegantly integrates the antenna and encases a groundbreaking new pro camera system built for Apple Intelligence; this is the most powerful chip ever made for any iPhone. But power generates heat, so we designed a new cooling system that cycles deionized water between liquid and gas within a vapor chamber, laser-welded to the chassis that rapidly dissipates heat throughout the unibody. Ceramic Shield now protects the back as well as the front, and the display is now three times more scratch resistant. iPhone 17 Pro is the most cinematic camera we've ever made. The advanced camera system records ProRes RAW, while a 56-percent larger Telephoto sensor captures sharper imagery in all light conditions with 8x optical-quality zoom to get even closer to the action. Our brightest display plays it all back in ProMotion up to 120Hz. For stills, all three lenses are now 48 megapixels, and the new Telephoto provides classic framing for portraiture and action photography. iPhone 17 Pro lets you create setups that would be impossible with conventional cameras, and this is the first phone to offer genlock, precisely synchronizing multiple cameras and creating Hollywood-level effects. The 18-megapixel front camera records you and everyone around you, while Center Stage expands to include the whole team. Our fastest chip, our longest battery life, and our most cinematic camera—the ultimate Pro, iPhone 17 Pro.`,

      questions: [
        {
          id: 1,
          question: "What is significant about the material used for the iPhone 17 Pro's body?",
          options: [
            "A. It is the first time Apple has utilized a solid aluminium unibody.",
            "B. It is made from a lightweight plastic and glass hybrid.",
            "C. The body is forged from recycled titanium for extra strength.",
            "D. The material is designed specifically to be heavier for better grip."
          ],
          correct: 0,
          explanation: "Bài nghe: 'to create our first aluminium unibody.' → Đây là lần đầu tiên Apple tạo ra thân máy unibody bằng nhôm nguyên khối. Bẫy: B sai vì không nhắc đến nhựa; C sai vì không có titanium; D ngược ý – bài nói 'light'."
        },
        {
          id: 2,
          question: "How does the 'vapor chamber' contribute to the phone's performance?",
          options: [
            "A. It provides extra moisture to keep the battery from drying out.",
            "B. It cycles deionized water to rapidly dissipate heat from the chip.",
            "C. It acts as a protective shield against water damage and dust.",
            "D. It uses gas to power the new pro camera system."
          ],
          correct: 1,
          explanation: "Bài nghe: 'cycles deionized water between liquid and gas within a vapor chamber… that rapidly dissipates heat.' → Nước khử ion tuần hoàn để tản nhiệt. Bẫy: A và C sai nghĩa hoàn toàn; D không liên quan."
        },
        {
          id: 3,
          question: "What improvement has been made to the display's durability?",
          options: [
            "A. It is now made of a flexible material that cannot break.",
            "B. The display is now protected by a 48-megapixel glass layer.",
            "C. It is now three times more resistant to scratches than before.",
            "D. The Ceramic Shield is now only located on the back of the phone."
          ],
          correct: 2,
          explanation: "Bài nghe: 'the display is now three times more scratch resistant.' → Ba lần chống xước hơn trước. Bẫy: D sai vì bài nói Ceramic Shield bảo vệ cả mặt trước lẫn mặt sau."
        },
        {
          id: 4,
          question: "What does the 'genlock' feature allow professional users to do?",
          options: [
            "A. Secure the phone using a new generation of facial locking.",
            "B. Automatically edit videos into Hollywood-level movies.",
            "C. Capture sharper images in extremely dark conditions.",
            "D. Precisely synchronize multiple cameras for advanced effects."
          ],
          correct: 3,
          explanation: "Bài nghe: 'first phone to offer genlock, precisely synchronizing multiple cameras and creating Hollywood-level effects.' → Đồng bộ chính xác nhiều camera. Bẫy: A nhầm 'genlock' với 'face lock'; B và C sai nghĩa."
        },
        {
          id: 5,
          question: "Regarding the camera system, which of the following is TRUE?",
          options: [
            "A. Only the Telephoto lens has been upgraded to 48 megapixels.",
            "B. The front camera now has the same resolution as the back cameras.",
            "C. All three rear lenses are now equipped with 48-megapixel sensors.",
            "D. The optical zoom has been reduced to focus on digital sharpness."
          ],
          correct: 2,
          explanation: "Bài nghe: 'all three lenses are now 48 megapixels.' → Cả ba ống kính sau đều 48MP. Bẫy: A sai vì cả ba lens; B sai vì front camera là 18MP; D ngược ý – zoom được tăng lên 8x."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 2
    // ==========================================
    part2: {
      title: "PART 2: Educational Talk",
      description: "Nghe đoạn hội thoại về cách dùng partitive expressions tại siêu thị. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam5/listening/part2.mp3",
      script: `ENGLISH TRANSCRIPT: PARTITIVE EXPRESSIONS AT THE SUPERMARKET
The Confusion
Speaker A: Hello. I'm looking for... um, a group of grapes.
Speaker B: I'm sorry.
Speaker A: I'm looking for... um, a bouquet of grapes.
Speaker B: Uh oh, you're looking for a bunch of grapes.
Speaker A: Oh, yeah. A... a bunch of grapes and a bunch of lettuce.
Speaker B: A head of lettuce.
Speaker A: A head of lettuce.
Introduction to Partitive Expressions
Giovana: Hi everyone, I'm Giovana and in this video, I will teach you some fixed expressions native speakers use at the supermarket. Expressions to describe a part or unit of something. They're common in daily life and learning them will make you sound more fluent. These expressions also have a fancy name: Partitative expressions or collective nouns.
"A Bunch"
Giovana: Remember this rule: We use "a bunch" for a group of things that are attached, tied, or gathered together. This is a bunch of grapes because grapes naturally grow together on one stem. That's why we also say: A bunch of bananas, a bunch of carrots, a bunch of flowers, and a bunch of parsley.
"A Head"
Speaker A: Oh, but what about a head of lettuce? Because it looks like my head?
Giovana: Exactly. Because lettuce and things like cabbage, cauliflower, and broccoli grow in a round compact ball. That ball looks like a head. If they look like a head, we say: A head of broccoli, a head of cabbage, or a head of lettuce.
Containers (Bags, Bushels, Crates)
Speaker A: I also need... um, a bunch of apples.
Giovana: Apples don't grow together and are hard to tie together. So, they're usually not sold as a bunch. Here in the US, apples usually come in a bag. So, we say a bag of apples. If you want a very large quantity of apples or another food—like if you own a grocery store or a restaurant—you can buy a bushel. For example, a bushel of apples.
Countable Items
Speaker A: So, I need a bag of apples and one papaya. No, a "head" of papaya.
Giovana: No, it doesn't look like a head. You were right. We say one papaya. Papayas don't look like a head and they don't grow together. So, they're counted normally: One papaya, one avocado, one pear, and so on.
Bread (Uncountable)
Speaker A: Perfect. So, I'll grab one papaya and one bread.
Giovana: You can't grab "one bread." The noun bread is uncountable. So, we always treat it as a singular word. What you can say is a loaf of bread. This is a loaf of bread. And then you can count the loaves: One loaf of bread, two loaves of bread, three loaves of bread, and so on. You can also say a bread roll or a bun.`,

      questions: [
        {
          id: 6,
          question: "According to the speaker, we use the expression 'a bunch of' for things that are __________.",
          options: [
            "A. shaped like a round, compact ball.",
            "B. usually sold in large wooden crates or trays.",
            "C. attached, tied, or gathered together naturally.",
            "D. considered uncountable nouns in English grammar."
          ],
          correct: 2,
          explanation: "Giovana nói rõ: 'We use a bunch for a group of things that are attached, tied, or gathered together.' → Đáp án C trùng chính xác. Bẫy: A là đặc điểm của 'a head of'; B liên quan đến crate, không phải bunch; D không liên quan."
        },
        {
          id: 7,
          question: "Which of the following statements is FALSE according to the transcript?",
          options: [
            "A. Lettuce, cabbage, and broccoli are all referred to as 'a head.'",
            "B. Apples are usually sold as 'a bunch' in the United States.",
            "C. A 'bushel' is a unit used for very large quantities of produce.",
            "D. Papayas and avocados are counted normally (one, two, three...)."
          ],
          correct: 1,
          explanation: "Giovana nói: 'Apples don't grow together… Here in the US apples usually come in a bag.' → Apples được bán theo bag, không phải bunch. Đáp án B sai. Bẫy: A, C, D đều đúng theo bài nghe."
        },
        {
          id: 8,
          question: "Which of these items CANNOT be described using the unit 'a head of'?",
          options: [
            "A. Cauliflower",
            "B. Cabbage",
            "C. Parsley",
            "D. Lettuce"
          ],
          correct: 2,
          explanation: "Bài nghe liệt kê: 'a head of broccoli, a head of cabbage, a head of lettuce.' Parsley được nhắc đến là 'a bunch of parsley', không dùng 'a head of'. Bẫy: A, B, D đều thuộc nhóm 'a head of'."
        },
        {
          id: 9,
          question: "If a customer wants to buy three units of bread, they should ask for:",
          options: [
            "A. Three breads",
            "B. Three loaves of bread",
            "C. Three loafs of bread",
            "D. Three bunch of breads"
          ],
          correct: 1,
          explanation: "Giovana giải thích: 'one loaf of bread, two loaves of bread, three loaves of bread.' → Số nhiều đúng của loaf là loaves. Bẫy: A sai vì bread uncountable; C sai chính tả (loafs không đúng); D sai hoàn toàn."
        },
        {
          id: 10,
          question: "Which of the following pairs is correctly matched?",
          options: [
            "A. Banana — A head of",
            "B. Carrot — A loaf of",
            "C. Kiwi — A bag of",
            "D. Bread — A bunch of"
          ],
          correct: 2,
          explanation: "Bài nghe: 'a bag of apples, a bag of oranges, and a bag of kiwis.' → Kiwi đi với 'a bag of'. Bẫy: A sai (banana → a bunch of); B sai (carrot → a bunch of); D sai (bread → a loaf of)."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 3
    // ==========================================
    part3: {
      title: "PART 3: Short Conversations",
      description: "Nghe 4 đoạn hội thoại ngắn về kỹ năng và sở thích. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam5/listening/part3.mp3",
      script: `Conversation 1
Woman: What sports can you play?
Man: I can play baseball a bit and I can play tennis pretty well.
Woman: Can you play football?
Man: No, I'm terrible at football. What about you?
Woman: Yeah. I can play football. I like it a lot, but I'm not great.
Man: I bet you are pretty good.
Woman: No, really. I'm not that good.

Conversation 2
Man: What languages can you speak?
Woman: I can speak Japanese and French.
Man: Wow! Can you write in Japanese?
Woman: I can write a little bit, but not that much.
Man: Yeah. I hear Kanji is really difficult.
Woman: Yeah. It's really difficult. What about you? What languages can you speak?
Man: I can speak some Spanish, but not great. I can also speak Thai.
Woman: Wow! Can you write in Thai?
Man: No, but I can read it. Writing is really difficult.
Woman: Still, that's pretty cool!

Conversation 3
Man: So, are you a good cook?
Woman: Not really. But I can cook basic stuff.
Man: Yeah? What can you cook?
Woman: I can make pasta dishes and some French cuisine. What about you?
Man: I can't cook anything. I can only make an omelet.
Woman: That's not too bad. Can you make pancakes?
Man: No, I can't even make that.

Conversation 4
Man: What are you doing tonight?
Woman: I am going to karaoke with friends. Do you want to come?
Man: No, thanks. I can't sing at all.
Woman: Oh, you should come. Singing is fun!
Man: Maybe for you. I hear you can sing really well.
Woman: I can sing a little bit, but I am not great.
Man: That's not what I heard.`,

      questions: [
        {
          id: 11,
          question: "(Conversation 1) Which of the following best describes the woman's attitude toward her own football skills?",
          options: [
            "A. She is overtly confident about her athletic prowess.",
            "B. She exhibits a sense of false modesty despite being a professional.",
            "C. She acknowledges her passion for the sport while maintaining a humble self-assessment.",
            "D. She expresses total incompetence and a lack of interest in the game."
          ],
          correct: 2,
          explanation: "Cô nói: 'I like it a lot, but I'm not great.' và 'No, really. I'm not that good.' → Thích nhưng khiêm tốn về kỹ năng. Bẫy: A sai vì không tự tin; B sai vì không có bằng chứng cô là professional; D sai vì cô vẫn chơi được."
        },
        {
          id: 12,
          question: "(Conversation 2) What can be inferred about the man's proficiency in the Thai language?",
          options: [
            "A. He has achieved full literacy, encompassing both reading and writing.",
            "B. He possesses receptive skills in reading but lacks productive skills in writing.",
            "C. He is a native speaker who finds the script unnecessarily complex.",
            "D. His linguistic ability is limited to basic oral communication in Spanish."
          ],
          correct: 1,
          explanation: "Người đàn ông nói: 'No, but I can read it. Writing is really difficult.' → Đọc được nhưng không viết được Thai. Bẫy: A sai vì không viết được; C sai vì không phải native speaker; D sai vì anh ta còn nói Thai."
        },
        {
          id: 13,
          question: "(Conversation 3) In terms of culinary expertise, how do the speakers compare?",
          options: [
            "A. The woman is specialized in gourmet pastry, while the man is entirely kitchen-illiterate.",
            "B. The woman has a foundational repertoire, whereas the man's skills are extremely rudimentary.",
            "C. Both speakers are equally proficient in preparing complex international cuisines.",
            "D. The man's inability to make pancakes suggests he has no interest in French cuisine."
          ],
          correct: 1,
          explanation: "Người phụ nữ: 'I can cook basic stuff' / 'pasta and French cuisine.' Người đàn ông: 'I can't cook anything. I can only make an omelet.' → Phụ nữ có kỹ năng cơ bản, đàn ông rất hạn chế. Bẫy: A sai (không đề cập pastry gourmet); C sai (không ai phức tạp); D không liên quan."
        },
        {
          id: 14,
          question: "(Conversation 4) Why does the man decline the invitation to go to karaoke?",
          options: [
            "A. He is occupied with other plans for the night.",
            "B. He perceives himself as having a complete lack of singing ability.",
            "C. He finds singing with friends to be an embarrassing activity.",
            "D. He believes the woman is too critical of his voice."
          ],
          correct: 1,
          explanation: "Người đàn ông nói rõ: 'No, thanks. I can't sing at all.' → Anh tự nhận không biết hát. Bẫy: A sai vì không nói đến kế hoạch khác; C và D đều không được đề cập."
        },
        {
          id: 15,
          question: "(Conversation 4) What is the underlying implication of the man's final remark, 'That's not what I heard'?",
          options: [
            "A. He is accusing the woman of being dishonest about her musical background.",
            "B. He is suggesting that her reputation as a singer contradicts her self-deprecating claim.",
            "C. He is expressing doubt because he has never personally seen her perform.",
            "D. He is indicating that the rumors about her singing are generally negative."
          ],
          correct: 1,
          explanation: "Người phụ nữ nói 'I can sing a little bit, but I am not great.' nhưng người đàn ông đã nghe người khác khen cô hát hay → danh tiếng trái với lời khiêm tốn của cô. Bẫy: A quá cực đoan; C không có căn cứ; D ngược nghĩa."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 4
    // ==========================================
    part4: {
      title: "PART 4: Monologue",
      description: "Nghe bài nói về lịch sử 7-Eleven. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam5/listening/part4.mp3",
      script: `7-Eleven is the world's largest chain of convenience stores. Even larger than McDonald's! Its stores are located in eighteen countries, with its largest markets being Japan, the United States, Taiwan, and Thailand. Globally, it operates franchises or licenses more than 35,200 stores. They serve approximately seven million customers everyday.

The company originated in 1927 in Dallas, Texas, USA, when an employee of Southland Ice Company, Joe C. Thompson, started selling milk, eggs and bread from an ice shop. Although there were already some small grocery stores in the area, Thompson discovered that selling basic items such as bread and milk reduced the need for people to travel longer distances to grocery stores. Thompson eventually bought the Southland Ice Company and turned it into the Southland Corporation which soon opened several locations in the Dallas area. Initially, these stores were open from 7a.m. to 11p.m. while most competing stores opened later and closed much earlier. The company began to use the 7-Eleven name in 1946, and by 1952, had opened its 100th store. In 1963, 7-Eleven experimented with a 24-hour schedule. Aggressive marketing strategies and careful attention to consumer trends propelled the company to unprecedented growth throughout the 70's and mid 80's.

Despite stiff competition from similar retailers, 7-Eleven remains at the top of the convenience store market. In 2008, after placing in the top 10 a respectable 16 times, the company was named the number one franchise by Entrepreneur Magazine's Franchise 500, beating out Subway who had held the number one spot for 15 years.`,

      questions: [
        {
          id: 16,
          question: "What was the original catalyst for Joe C. Thompson to start selling grocery items like milk and eggs?",
          options: [
            "A. He wanted to compete directly with large supermarket chains.",
            "B. He noticed that customers wanted to avoid traveling long distances for basic goods.",
            "C. The Southland Ice Company was failing and needed a new business model.",
            "D. He inherited an ice shop and decided to turn it into a high-end grocery store."
          ],
          correct: 1,
          explanation: "Bài nghe: 'selling basic items reduced the need for people to travel longer distances.' → Thompson nhận ra khách hàng muốn tránh đi xa để mua đồ thiết yếu. Bẫy: A, C, D đều không có căn cứ trong bài."
        },
        {
          id: 17,
          question: "The name '7-Eleven' was adopted in 1946 primarily to reflect:",
          options: [
            "A. The number of stores the company had opened by that year.",
            "B. The total number of employees working for the Southland Corporation.",
            "C. The innovative operating hours that distinguished the stores from competitors.",
            "D. The price of the most popular items sold at the ice shops."
          ],
          correct: 2,
          explanation: "Bài nghe: 'these stores were open from 7 a.m. to 11 p.m.' → Tên 7-Eleven phản ánh giờ mở cửa từ 7 giờ đến 11 giờ, khác biệt so với đối thủ. Bẫy: A, B, D đều không được đề cập."
        },
        {
          id: 18,
          question: "Which factor is credited with the company's 'unprecedented growth' during the 1970s and 1980s?",
          options: [
            "A. The transition from a franchise model to a strictly corporate-owned structure.",
            "B. A combination of bold promotional tactics and responsiveness to market shifts.",
            "C. The immediate success of the first 24-hour store experiment in 1963.",
            "D. The acquisition of Subway's market share in the convenience store sector."
          ],
          correct: 1,
          explanation: "Bài nghe: 'Aggressive marketing strategies and careful attention to consumer trends propelled the company to unprecedented growth.' → Chiến lược marketing + theo dõi xu hướng thị trường. Bẫy: A không được nhắc; C chỉ là thử nghiệm; D sai hoàn toàn."
        },
        {
          id: 19,
          question: "What does the passage imply about 7-Eleven's position in the global market as of 2008?",
          options: [
            "A. It had finally managed to surpass its long-term rival, Subway, in franchise rankings.",
            "B. It struggled to maintain its top 10 position due to 'stiff competition.'",
            "C. Its success was limited only to its primary markets like Japan and Thailand.",
            "D. It became the largest convenience store chain by reducing the number of franchises."
          ],
          correct: 0,
          explanation: "Bài nghe: 'named the number one franchise… beating out Subway who had held the number one spot for 15 years.' → Vượt qua Subway để đứng số 1 lần đầu. Bẫy: B ngược nghĩa; C sai vì công ty hoạt động toàn cầu; D không có thông tin."
        },
        {
          id: 20,
          question: "Which of the following best summarizes the evolution of 7-Eleven's business strategy?",
          options: [
            "A. A shift from a specialized utility provider to a customer-centric retail giant through operational innovation.",
            "B. A focus on maintaining traditional ice-shop values while ignoring modern retail trends.",
            "C. A reliance on aggressive expansion into eighteen countries without regard for local market trends.",
            "D. A move from a 24-hour service model back to the original 7 a.m. to 11 p.m. schedule to save costs."
          ],
          correct: 0,
          explanation: "7-Eleven ban đầu là cửa hàng đá → bán thực phẩm cơ bản → mở rộng giờ → marketing → thành tập đoàn bán lẻ lớn. → Chuyển dịch từ nhà cung cấp tiện ích đơn giản sang tập đoàn bán lẻ lấy khách hàng làm trung tâm. Bẫy: B, C, D đều trái nội dung."
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
          question: "If the weather ________ good tomorrow, we will go for a picnic in the park.",
          options: [
            "A. will be",
            "B. is",
            "C. was",
            "D. would be"
          ],
          correct: 1,
          explanation: "First Conditional: If + Present Simple, Future Simple. Mệnh đề 'if' dùng thì hiện tại đơn, không dùng 'will' hoặc 'would'. Bẫy: A dùng will trong mệnh đề if (sai); D là conditional type 2; C là quá khứ đơn."
        },
        {
          id: 22,
          question: "I'm not used to ________ up so early in the morning; I usually prefer to work late at night.",
          options: [
            "A. get",
            "B. got",
            "C. getting",
            "D. be getting"
          ],
          correct: 2,
          explanation: "Cấu trúc: 'be used to + V-ing'. Sau giới từ 'to' trong 'used to doing' phải là danh động từ (V-ing). Bẫy: A (nguyên mẫu), B (quá khứ), D (be + V-ing) đều sai cấu trúc."
        },
        {
          id: 23,
          question: "The book ________ I bought yesterday is missing several pages.",
          options: [
            "A. who",
            "B. whom",
            "C. whose",
            "D. which"
          ],
          correct: 3,
          explanation: "Đại từ quan hệ thay thế cho danh từ chỉ vật (book) → dùng 'which'. who/whom dùng cho người; whose dùng cho sở hữu. Bẫy: A và B dành cho người; C thêm nghĩa sở hữu không phù hợp ngữ cảnh."
        },
        {
          id: 24,
          question: "The manager ________ the employees that the meeting had been rescheduled to Friday.",
          options: [
            "A. said",
            "B. spoke",
            "C. told",
            "D. explained"
          ],
          correct: 2,
          explanation: "Cấu trúc: 'tell + object + that clause'. 'told the employees that...' = thông báo cho nhân viên rằng... Bẫy: 'said' cần 'said to someone'; 'spoke' không đi với 'that clause'; 'explained' cần 'explained something to someone'."
        },
        {
          id: 25,
          question: "By the time the rescue team arrived, the hikers ________ in the forest for over 48 hours.",
          options: [
            "A. have been lost",
            "B. had been lost",
            "C. were lost",
            "D. would be lost"
          ],
          correct: 1,
          explanation: "Past Perfect được dùng khi một hành động đã xảy ra và kéo dài trước một hành động khác trong quá khứ. 'By the time + past simple' → dùng Past Perfect. Bẫy: A là Present Perfect (sai thì); C là quá khứ đơn (không diễn đạt được tính liên tục); D là conditional."
        },
        {
          id: 26,
          question: "The committee decided to ________ the proposal until further research could be conducted.",
          options: [
            "A. shelve",
            "B. shrug",
            "C. shun",
            "D. shatter"
          ],
          correct: 0,
          explanation: "'Shelve a proposal' = gác lại / trì hoãn một đề xuất. Đây là cụm từ cố định trong tiếng Anh học thuật. Bẫy: shrug (nhún vai), shun (né tránh), shatter (đập vỡ) đều sai nghĩa trong ngữ cảnh này."
        },
        {
          id: 27,
          question: "Not until the end of the nineteenth century ________ a reliable method for preserving food.",
          options: [
            "A. did scientists develop",
            "B. scientists developed",
            "C. have scientists developed",
            "D. scientists did develop"
          ],
          correct: 0,
          explanation: "Inversion với trạng ngữ phủ định: 'Not until + time + auxiliary + subject + verb'. Câu đảo ngữ bắt buộc khi mệnh đề bắt đầu bằng 'Not until'. Bẫy: B và D không có đảo ngữ; C dùng Present Perfect không phù hợp với quá khứ."
        },
        {
          id: 28,
          question: "The diplomat's ________ remarks during the conference inadvertently sparked a major international controversy.",
          options: [
            "A. auspicious",
            "B. incisive",
            "C. injudicious",
            "D. meticulous"
          ],
          correct: 2,
          explanation: "'Injudicious' = thiếu thận trọng / kém khôn ngoan → phù hợp với 'gây ra tranh cãi quốc tế'. Bẫy: auspicious (thuận lợi) trái nghĩa; incisive (sắc bén) không hàm ý tiêu cực; meticulous (tỉ mỉ) không liên quan."
        },
        {
          id: 29,
          question: "It is ________ important that we adhere to the safety protocols to avoid any potential hazards.",
          options: [
            "A. severely",
            "B. drastically",
            "C. paramountly",
            "D. vitally"
          ],
          correct: 3,
          explanation: "Collocation cố định: 'vitally important' = cực kỳ quan trọng. Đây là cụm từ thông dụng trong văn viết trang trọng. Bẫy: 'paramountly' hầu như không dùng; 'severely/drastically' không kết hợp với 'important'."
        },
        {
          id: 30,
          question: "To the ________ of the local residents, the historic theater was demolished to make way for a luxury apartment complex.",
          options: [
            "A. chagrin",
            "B. bliss",
            "C. solace",
            "D. euphoria"
          ],
          correct: 0,
          explanation: "'To someone's chagrin' = khiến ai đó thất vọng / bực bội. Việc phá bỏ nhà hát lịch sử gây ra sự bất bình cho cư dân. Bẫy: bliss (hạnh phúc), solace (an ủi), euphoria (phấn khích) đều mang nghĩa tích cực, trái với ngữ cảnh."
        }
      ]
    },

    // ==========================================
    // READING PART 6 - CLOZE TEXT
    // ==========================================
    part6: {
      title: "PART 6: Cloze Text (Artificial Intelligence & Youth)",
      description: "10 câu hỏi - Đọc bài về trí tuệ nhân tạo và thế hệ trẻ, chọn đáp án tốt nhất để hoàn thiện văn bản và trả lời câu hỏi đọc hiểu.",
      type: "reading",
      text: `The Rise of AI Among the Youth

The rise of Artificial Intelligence (AI) has marked a turning point in human history, especially for the youth who are often dubbed "AI natives." Unlike previous generations who had to adapt to digital shifts, today's young people are growing up in an era where AI is seamlessly (31) ________ into their daily lives. From personalized learning platforms to AI-driven social media algorithms, the technology is no longer a futuristic concept but a present reality.

However, this rapid integration brings both opportunities and challenges. On one hand, AI serves as a powerful tool for creativity and productivity. Young entrepreneurs are leveraging AI to (32) ________ complex tasks, allowing them to focus on innovation. On the other hand, there are growing concerns regarding the (33) ________ of the job market. Many entry-level positions, traditionally held by recent graduates, are now at risk of being automated.

To thrive in this new landscape, educators emphasize that students should not merely learn how to use AI tools but also develop "soft skills" that AI cannot easily (34) ________. Skills such as critical thinking, emotional intelligence, and ethical judgment are becoming increasingly (35) ________. As we move forward, the goal for the youth is to foster a symbiotic relationship with technology, ensuring that AI acts as an assistant rather than a replacement.`,

      questions: [
        {
          id: 31,
          question: "Choose the best option to fill in blank (31).",
          options: [
            "A. disrupted",
            "B. integrated",
            "C. alienated",
            "D. detached"
          ],
          correct: 1,
          explanation: "'Seamlessly integrated into daily lives' = được tích hợp liền mạch vào cuộc sống hàng ngày. Ngữ cảnh nói AI trở thành một phần tự nhiên. Bẫy: disrupted (phá vỡ), alienated (làm xa lánh), detached (tách rời) đều mang nghĩa tiêu cực, trái với 'seamlessly'."
        },
        {
          id: 32,
          question: "Choose the best option to fill in blank (32).",
          options: [
            "A. automate",
            "B. activate",
            "C. accumulate",
            "D. agitate"
          ],
          correct: 0,
          explanation: "'Leverage AI to automate complex tasks' = dùng AI để tự động hóa các công việc phức tạp. Đây là cách AI hỗ trợ doanh nhân trẻ. Bẫy: activate (kích hoạt), accumulate (tích lũy), agitate (kích động) đều sai nghĩa trong ngữ cảnh này."
        },
        {
          id: 33,
          question: "Choose the best option to fill in blank (33).",
          options: [
            "A. sustainability",
            "B. volatility",
            "C. transparency",
            "D. rigidity"
          ],
          correct: 1,
          explanation: "'Volatility of the job market' = sự biến động của thị trường lao động. AI đang làm thay đổi mạnh mẽ cấu trúc việc làm. Bẫy: sustainability (bền vững) và transparency (minh bạch) không phù hợp; rigidity (cứng nhắc) trái nghĩa với biến động."
        },
        {
          id: 34,
          question: "Choose the best option to fill in blank (34).",
          options: [
            "A. replicate",
            "B. renovate",
            "C. reciprocate",
            "D. relocate"
          ],
          correct: 0,
          explanation: "'Soft skills that AI cannot easily replicate' = kỹ năng mềm mà AI khó bắt chước. Bẫy: renovate (cải tạo công trình), reciprocate (đáp lại), relocate (di chuyển địa điểm) đều sai ngữ cảnh."
        },
        {
          id: 35,
          question: "Choose the best option to fill in blank (35).",
          options: [
            "A. redundant",
            "B. obsolete",
            "C. paramount",
            "D. trivial"
          ],
          correct: 2,
          explanation: "'Becoming increasingly paramount' = ngày càng trở nên cực kỳ quan trọng. Bài nhấn mạnh tầm quan trọng của kỹ năng mềm. Bẫy: redundant (dư thừa), obsolete (lỗi thời), trivial (tầm thường) đều trái nghĩa với ý tác giả."
        },
        {
          id: 36,
          question: "What does the term 'AI natives' in the first paragraph imply?",
          options: [
            "A. Young people who are afraid of AI technology.",
            "B. People who have worked in the AI industry for a long time.",
            "C. A generation that has grown up with AI as a natural part of life.",
            "D. Individuals who refuse to use any technology other than AI."
          ],
          correct: 2,
          explanation: "Bài đọc: 'today's young people are growing up in an era where AI is seamlessly integrated into their daily lives.' → AI natives là thế hệ lớn lên cùng AI. Bẫy: A trái nghĩa; B và D không có căn cứ."
        },
        {
          id: 37,
          question: "According to the passage, how does AI benefit young entrepreneurs?",
          options: [
            "A. It replaces the need for any human staff in their companies.",
            "B. It provides them with fixed social media followers.",
            "C. It handles complex tasks, enabling them to concentrate on innovating.",
            "D. It guarantees that their businesses will never face financial risks."
          ],
          correct: 2,
          explanation: "Bài đọc: 'leveraging AI to automate complex tasks, allowing them to focus on innovation.' → AI xử lý công việc phức tạp để doanh nhân tập trung sáng tạo. Bẫy: A, B, D đều cực đoan và không có trong bài."
        },
        {
          id: 38,
          question: "What is a major concern mentioned regarding the impact of AI on the workforce?",
          options: [
            "A. The lack of social media algorithms for new employees.",
            "B. The automation of entry-level jobs usually filled by graduates.",
            "C. The fact that AI tools are too expensive for small businesses.",
            "D. The refusal of educators to teach AI-related subjects."
          ],
          correct: 1,
          explanation: "Bài đọc: 'Many entry-level positions… are now at risk of being automated.' → Vị trí việc làm đầu vào dành cho sinh viên mới tốt nghiệp có nguy cơ bị tự động hóa. Bẫy: A, C, D không được đề cập."
        },
        {
          id: 39,
          question: "Which of the following is NOT mentioned as a skill that students should focus on?",
          options: [
            "A. Ethical judgment",
            "B. Emotional intelligence",
            "C. Coding and hardware repair",
            "D. Critical thinking"
          ],
          correct: 2,
          explanation: "Bài đọc liệt kê: 'critical thinking, emotional intelligence, and ethical judgment.' → Coding and hardware repair không được đề cập. Bẫy: A, B, D đều có trong bài."
        },
        {
          id: 40,
          question: "What is the main message of the passage?",
          options: [
            "A. AI will eventually replace all human jobs, so youth should stop studying.",
            "B. The youth should aim to balance technological use with uniquely human skills.",
            "C. Soft skills are becoming less important than technical AI skills.",
            "D. Social media algorithms are the most dangerous part of the AI era."
          ],
          correct: 1,
          explanation: "Toàn bài: AI có lợi ích nhưng cũng có rủi ro → cần phát triển kỹ năng mềm để bổ trợ AI. Thông điệp chính là cân bằng. Bẫy: A cực đoan; C ngược nghĩa với bài; D chỉ là ví dụ nhỏ."
        }
      ]
    },

    // ==========================================
    // READING PART 7 - ARTICLE
    // ==========================================
    part7: {
      title: "PART 7: Single Long Text (Article)",
      description: "10 câu hỏi - Đọc bài báo về an ninh và quyền tiếp cận trong xã hội hiện đại, chọn đáp án tốt nhất.",
      type: "reading",
      text: `Locked Doors Open Access

The word, 'security', has both positive and negative connotations. Most of us would say that we crave security for all its positive virtues, both physical and psychological – its evocation of the safety of home, of undying love, or of freedom from need. More negatively, the word nowadays conjures up images of that huge industry which has developed to protect individuals and property from invasion by 'outsiders', ostensibly malicious and intent on theft or wilful damage.

Increasingly, because they are situated in urban areas of escalating crime, those buildings which used to allow free access to employees and other users (buildings such as offices, schools, colleges or hospitals) now do not. Entry areas which in another age were called 'Reception' are now manned by security staff. Receptionists, whose task it was to receive visitors and to make them welcome before passing them on to the person they had come to see, have been replaced by those whose task it is to bar entry to the unauthorized, the unwanted or the plain unappealing.

Inside, these buildings are divided into 'secure zones' which often have all the trappings of combination locks and burglar alarms. These devices bar entry to the uninitiated, hinder circulation, and create parameters of time and space for user access. Within the spaces created by these zones, individual rooms are themselves under lock and key, which is a particular problem when it means that working space becomes compartmentalized.

To combat the consequent difficulty of access to people at a physical level, we have now developed technological access. Computers sit on every desk and are linked to one another, and in many cases to an external universe of other computers, so that messages can be passed to and fro. Here too security plays a part, since we must not be allowed access to messages destined for others. And so the password was invented. Now correspondence between individuals goes from desk to desk and cannot be accessed by colleagues. Library catalogues can be searched from one's desk. Papers can be delivered to, and received from, other people at the press of a button.

And yet it seems that, just as work is isolating individuals more and more, organizations are recognizing the advantages of 'team-work'; perhaps in order to encourage employees to talk to one another again. Yet, how can groups work in teams if the possibilities for communication are reduced? How can they work together if e-mail provides a convenient electronic shield behind which the blurring of public and private can be exploited by the less scrupulous? If voice-mail walls up messages behind a password? If I can't leave a message on my colleague's desk because his office is locked?

Team-work conceals the fact that another kind of security, 'job security', is almost always not on offer. Just as organizations now recognize three kinds of physical resources: those they buy, those they lease long-term and those they rent short-term – so it is with their human resources. Some employees have permanent contracts, some have short-term contracts, and some are regarded simply as casual labour.

Telecommunication systems offer us the direct line, which means that individuals can be contacted without the caller having to talk to anyone else. Voice-mail and the answer-phone mean that individuals can communicate without ever actually talking to one another. If we are unfortunate enough to contact organizations with sophisticated touch-tone systems, we can buy things and pay for them without ever speaking to a human being.

To combat this closing in on ourselves we have the Internet, which opens out communication channels more widely than anyone could possibly want or need. An individual's electronic presence on the Internet is known as a 'Home Page' – suggesting the safety and security of an electronic hearth. An elaborate system of 3-dimensional graphics distinguishes this very 2-dimensional medium of 'web sites'. The nomenclature itself creates the illusion of a geographical entity, that the person sitting before the computer is travelling, when in fact the 'site' is coming to him. 'Addresses' of one kind or another move to the individual, rather than the individual moving between them, now that location is no longer geographical.

An example of this is the mobile phone. I am now not available either at home or at work, but wherever I take my mobile phone. Yet, even now, we cannot escape the security of wanting to 'locate' the person at the other end. It is no coincidence that almost everyone we see answering or initiating a mobile phone-call in public begins by saying where he or she is.`,

      questions: [
        {
          id: 41,
          question: "According to the first paragraph, what are the two sides of 'security'?",
          options: [
            "A. Theft and damage.",
            "B. Physical safety and psychological comfort.",
            "C. Positive virtues and negative associations like protection from invasion.",
            "D. Home safety and undying love."
          ],
          correct: 2,
          explanation: "Tác giả trình bày: connotations tích cực (safety, love, freedom from need) và tiêu cực (ngành công nghiệp bảo vệ chống kẻ xâm phạm). Bẫy: B chỉ nêu một phần của chiều tích cực; D là ví dụ, không phải tổng quan."
        },
        {
          id: 42,
          question: "How has the role of the 'Reception' area changed in modern urban buildings?",
          options: [
            "A. It has become a place where visitors feel more welcome than before.",
            "B. Its primary function has shifted from welcoming guests to preventing unauthorized entry.",
            "C. It has been completely removed to make more space for offices.",
            "D. Security staff now perform the same tasks as traditional receptionists."
          ],
          correct: 1,
          explanation: "Bài đọc: 'Receptionists… have been replaced by those whose task it is to bar entry.' → Chức năng chuyển từ chào đón sang ngăn chặn. Bẫy: A ngược nghĩa; C và D không có căn cứ trong bài."
        },
        {
          id: 43,
          question: "According to the text, what is a negative consequence of 'secure zones' inside buildings?",
          options: [
            "A. They make the buildings look more professional.",
            "B. They encourage people to move around more frequently.",
            "C. They divide working spaces and make movement more difficult.",
            "D. They prevent employees from using computers."
          ],
          correct: 2,
          explanation: "Bài đọc: 'These devices bar entry, hinder circulation… working space becomes compartmentalized.' → Ngăn cản lưu thông và chia cắt không gian làm việc. Bẫy: A và B trái nghĩa; D không được đề cập."
        },
        {
          id: 44,
          question: "The author suggests that technological access (computers, emails) was developed to:",
          options: [
            "A. Replace the need for physical team-work entirely.",
            "B. Overcome the physical barriers created by locked doors and secure zones.",
            "C. Make sure that no one could ever use a password again.",
            "D. Allow colleagues to read each other's private correspondence."
          ],
          correct: 1,
          explanation: "Bài đọc: 'To combat the consequent difficulty of access… we have now developed technological access.' → Công nghệ ra đời để vượt qua rào cản vật lý. Bẫy: A sai (không thay thế hoàn toàn); C và D ngược nghĩa."
        },
        {
          id: 45,
          question: "What irony does the author point out regarding 'team-work' in modern organizations?",
          options: [
            "A. Organizations promote team-work while physical and electronic barriers limit real communication.",
            "B. Employees prefer working alone even though the doors are all open.",
            "C. Team-work is only possible through the use of sophisticated voice-mail systems.",
            "D. The more people talk to each other, the less work they actually accomplish."
          ],
          correct: 0,
          explanation: "Bài đọc nhấn mạnh nghịch lý: tổ chức khuyến khích làm việc nhóm nhưng cửa khóa, email, voice-mail lại cô lập mọi người. Bẫy: B, C, D đều không phản ánh đúng nghịch lý tác giả nêu."
        },
        {
          id: 46,
          question: "What does the term 'casual labour' refer to in the context of the sixth paragraph?",
          options: [
            "A. Employees with permanent, long-term contracts.",
            "B. High-level managers who lease their office equipment.",
            "C. Workers who are hired on a short-term or temporary basis.",
            "D. Security guards who protect the physical resources of a company."
          ],
          correct: 2,
          explanation: "Bài đọc phân loại: 'permanent contracts, short-term contracts, and casual labour.' → Casual labour là lao động tạm thời, thuê ngắn hạn. Bẫy: A là permanent employees (trái nghĩa); B và D không liên quan."
        },
        {
          id: 47,
          question: "The author uses the word 'shield' (paragraph 5) to describe e-mail because:",
          options: [
            "A. It protects the computer from being damaged by viruses.",
            "B. It can be used by dishonest people to hide their true intentions or blur boundaries.",
            "C. It is a secure way to send encrypted messages to the government.",
            "D. It prevents the physical invasion of an office space."
          ],
          correct: 1,
          explanation: "Bài đọc: 'e-mail provides a convenient electronic shield behind which the blurring of public and private can be exploited by the less scrupulous.' → Email che giấu ý định của người thiếu trung thực. Bẫy: A, C, D không đúng với nghĩa hình ảnh trong bài."
        },
        {
          id: 48,
          question: "What is the author's observation about how people use mobile phones in public?",
          options: [
            "A. People use them to avoid talking to anyone around them.",
            "B. People feel a need to establish their physical location at the start of a call.",
            "C. Mobile phones have finally allowed people to escape the need for security.",
            "D. Most people prefer not to be 'located' when they are travelling."
          ],
          correct: 1,
          explanation: "Bài đọc: 'almost everyone… begins by saying where he or she is.' → Mọi người có nhu cầu xác định vị trí khi bắt đầu cuộc gọi. Bẫy: A và D ngược nghĩa; C không có căn cứ."
        },
        {
          id: 49,
          question: "Which of the following best describes the 'illusion' created by the Internet's nomenclature?",
          options: [
            "A. It makes the user feel like they are stationary while the world moves.",
            "B. It suggests a physical journey is occurring, though the user remains in one place.",
            "C. It provides a 3-dimensional reality that replaces the need for actual travel.",
            "D. It proves that location is still the most important factor in communication."
          ],
          correct: 1,
          explanation: "Bài đọc: 'The nomenclature itself creates the illusion… the person is travelling, when in fact the site is coming to him.' → Ảo giác về hành trình vật lý dù người dùng đứng yên. Bẫy: A phần đúng nhưng không đủ; C và D sai."
        },
        {
          id: 50,
          question: "What is the overall tone of the author throughout the passage?",
          options: [
            "A. Enthusiastic about the rapid advancement of security technology.",
            "B. Neutral and purely informative about office management.",
            "C. Critical and reflective regarding the trade-offs between security and openness.",
            "D. Fearful of the escalating crime rates in urban areas."
          ],
          correct: 2,
          explanation: "Tác giả liên tục đặt câu hỏi phê phán và phân tích sự đánh đổi giữa an ninh và giao tiếp cởi mở. Giọng điệu suy ngẫm, phê bình, không đơn thuần thông tin. Bẫy: A trái nghĩa; B và D không phản ánh đúng giọng văn."
        }
      ]
    },

    // ==========================================
    // READING PART 8 - BIOGRAPHY / INFORMATIONAL TEXT
    // ==========================================
    part8: {
      title: "PART 8: Single Long Text (Informational)",
      description: "10 câu hỏi - Đọc bài về trường Kormilda College và chọn đáp án tốt nhất.",
      type: "reading",
      text: `Kormilda College

Kormilda College is a unique school situated near Darwin in Australia's Northern Territory. For 20 years, to 1989, Kormilda College operated as a government-run, live-in school for high school Aboriginal students. In 1989 it was bought from the Government by two Christian church groups and since then it has expanded enormously, to include a day school as well as boarders (residential students) in Years 8-12. Although 320 pupils of the College's total number are Aboriginal students, drawn mainly from isolated communities across the Northern Territory, Kormilda also has a waiting list of non-Aboriginal students. With a current enrollment of 600, student numbers are expected to grow to 860 by 1999.

Central to the mission of the school is the encouragement of individual excellence, which has resulted in programs designed especially for the student population. Specialist support programs allow traditional Aboriginal students, who are often second language users, to understand and succeed in the mainstream curriculum. A Gifted and Talented Program, including a special Aboriginal and Torres Strait Islander Tertiary Aspirations program, has been introduced, as has an Adaptive Education Unit. Moreover, in Years 11 and 12, students may choose to follow the standard Northern Territory Courses, or those of the International Baccalaureate (I.B.).

To provide appropriate pastoral care, as well as a suitable academic structure, three distinct sub-schools have been established.

Pre-Secondary: For Aboriginal and Torres Strait Islander students in Years 8-10 who are of secondary school age but have difficulties reading and writing.

Supported Secondary: For Aboriginal and Torres Strait Islander students who are of secondary school age and operating at secondary school year levels 8-12 who need specific second language literacy and numeracy support.

Secondary: For multicultural Years 8-12 students.

Students remain in their sub-schools for classes in the main subject areas of English, Maths, Social Education and Science. This arrangement takes into account both diverse levels of literacy and the styles of learning and cultural understandings appropriate to traditional Aboriginal second-language users. In elective subjects chosen by the students – which include Indonesian, Music, Art, Drama, Science for Life, Commerce, Geography, Modern History, Woodwork, Metal Work, Economics and Legal Studies – students mix on the basis of subject interest.

To aid the development of the Aboriginal Education program, a specialist curriculum Support Unit has been set up. One of its functions is to re-package school courses so that they can be taught in ways that suit the students. The education program offered to Aboriginal students uses an approach which begins with the students' own experiences and gradually builds bi-cultural understanding. In one course, "Introducing Western European Culture Through Traditional Story-Telling", students are helped to build a common base for approaching the English literature curriculum. Drawing on the oral culture of traditional Aboriginal communities, they are introduced to traditional stories of other cultures, both oral and written. In a foundational Year 10 course, "Theory of Learning", concepts from Aboriginal culture are placed side by side with European concepts so that students can use their own knowledge base to help bridge the cultural divide.

Another project of the Support Unit has been the publication of several books, the most popular, Kormilda Capers. The idea for Kormilda Capers came about when it became obvious that there was a lack of engaging material for the school's teenage readers. One of the stories in the book, "The Bulman Mob hits the Big Smoke", recounts the adventures of Kormilda pupils on their first visit to Sydney, Canberra and the snow country. Focussing on experiences which have directly affected the lives of students at the College, and on ideas and issues which are of immediate interest to Aboriginal students, Kormilda Capers has earned enthusiastic support within and outside the school.`,

      questions: [
        {
          id: 51,
          question: "Where is Kormilda College located?",
          options: [
            "A. In the center of Sydney.",
            "B. Near Darwin, Australia.",
            "C. In a remote area of Canberra.",
            "D. Outside of Australia."
          ],
          correct: 1,
          explanation: "Bài đọc: 'Kormilda College is a unique school situated near Darwin in Australia's Northern Territory.' → Trường nằm gần Darwin. Bẫy: A sai (Sydney chỉ xuất hiện trong chuyến tham quan); C sai; D sai."
        },
        {
          id: 52,
          question: "Who owned Kormilda College before it was bought by Christian church groups in 1989?",
          options: [
            "A. The International Baccalaureate organization.",
            "B. Aboriginal and Torres Strait Islander communities.",
            "C. The Australian Government.",
            "D. Private non-Aboriginal investors."
          ],
          correct: 2,
          explanation: "Bài đọc: 'For 20 years, to 1989, Kormilda College operated as a government-run school.' → Trước 1989 là trường do chính phủ quản lý. Bẫy: A chỉ là chương trình học; B là học sinh; D không có căn cứ."
        },
        {
          id: 53,
          question: "According to the passage, what are 'boarders'?",
          options: [
            "A. Students who only attend school during the day.",
            "B. Teachers who live in the Northern Territory.",
            "C. Students who live at the school (residential students).",
            "D. Aboriginal students from the Darwin area."
          ],
          correct: 2,
          explanation: "Bài đọc chú thích rõ: 'boarders (residential students)' → học sinh ở nội trú. Bẫy: A là day students; B là giáo viên; D không liên quan đến định nghĩa boarders."
        },
        {
          id: 54,
          question: "By the year 1999, how many students was the school expected to have?",
          options: [
            "A. 320",
            "B. 600",
            "C. 860",
            "D. 1989"
          ],
          correct: 2,
          explanation: "Bài đọc: 'With a current enrollment of 600, student numbers are expected to grow to 860 by 1999.' → Dự đoán 860 học sinh vào năm 1999. Bẫy: 320 là số học sinh Aboriginal hiện tại; 600 là tổng hiện tại; 1989 là năm mua trường."
        },
        {
          id: 55,
          question: "What choice do students in Years 11 and 12 have regarding their academic courses?",
          options: [
            "A. They must follow only the Northern Territory Courses.",
            "B. They can choose between Northern Territory Courses or the International Baccalaureate.",
            "C. They can only study Indonesian, Music, and Art.",
            "D. They must join the Pre-Secondary sub-school."
          ],
          correct: 1,
          explanation: "Bài đọc: 'in Years 11 and 12, students may choose to follow the standard Northern Territory Courses, or those of the International Baccalaureate.' → Có hai lựa chọn chương trình học. Bẫy: A, C, D đều không phản ánh đúng."
        },
        {
          id: 56,
          question: "Which sub-school is specifically designed for multicultural students in Years 8-12?",
          options: [
            "A. Pre-Secondary",
            "B. Supported Secondary",
            "C. Secondary",
            "D. Adaptive Education Unit"
          ],
          correct: 2,
          explanation: "Bài đọc: 'Secondary: For multicultural Years 8-12 students.' → Trực tiếp và rõ ràng. Bẫy: Pre-Secondary dành cho học sinh Aboriginal yếu đọc viết; Supported Secondary dành cho học sinh cần hỗ trợ tiếng Anh."
        },
        {
          id: 57,
          question: "According to the passage, in which type of subjects do students from different sub-schools mix together?",
          options: [
            "A. Main subjects like English and Maths.",
            "B. Science and Social Education.",
            "C. All subjects from Years 8 to 10.",
            "D. Elective subjects based on their interests."
          ],
          correct: 3,
          explanation: "Bài đọc: 'In elective subjects… students mix on the basis of subject interest.' → Học sinh từ các sub-school khác nhau học chung ở môn tự chọn. Bẫy: A và B là môn chính, học riêng theo sub-school."
        },
        {
          id: 58,
          question: "What is the primary purpose of the course 'Theory of Learning' in Year 10?",
          options: [
            "A. To teach students how to write traditional stories for publication.",
            "B. To use Aboriginal cultural concepts to help students understand European concepts.",
            "C. To encourage students to move to Western Europe for university.",
            "D. To replace the English literature curriculum with oral storytelling."
          ],
          correct: 1,
          explanation: "Bài đọc: 'concepts from Aboriginal culture are placed side by side with European concepts so that students can use their own knowledge base to help bridge the cultural divide.' → Dùng kiến thức văn hóa bản địa để kết nối với văn hóa châu Âu. Bẫy: A, C, D đều không có căn cứ."
        },
        {
          id: 59,
          question: "Why was the book 'Kormilda Capers' published?",
          options: [
            "A. Because there was not enough interesting reading material for teenagers.",
            "B. To promote the school's sports programs to the public.",
            "C. To provide a textbook for the International Baccalaureate.",
            "D. To raise money to buy the school back from the church groups."
          ],
          correct: 0,
          explanation: "Bài đọc: 'there was a lack of engaging material for the school's teenage readers.' → Thiếu tài liệu đọc hấp dẫn cho học sinh tuổi teen. Bẫy: B, C, D đều không có căn cứ trong bài."
        },
        {
          id: 60,
          question: "The story 'The Bulman Mob hits the Big Smoke' is about:",
          options: [
            "A. A group of students visiting the Northern Territory's isolated communities.",
            "B. The history of the Christian church groups that own the school.",
            "C. The adventures of Kormilda students visiting big cities like Sydney and Canberra.",
            "D. A guide on how to survive in the snow country of Australia."
          ],
          correct: 2,
          explanation: "Bài đọc: 'recounts the adventures of Kormilda pupils on their first visit to Sydney, Canberra and the snow country.' → Kể về chuyến tham quan thành phố lớn lần đầu của học sinh. Bẫy: A ngược nghĩa (từ vùng hẻo lánh đến thành phố lớn); B và D sai hoàn toàn."
        }
      ]
    }
  }
};

export default EXAM5_DATA;