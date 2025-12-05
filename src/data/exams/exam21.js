export const EXAM21_DATA = {
  title: "Listening & Notetaking Skills 1 Practice - Exam 21 (Based on Book)",
  description: "Full practice test with Listening (4 parts, 20 questions) and Reading (4 parts, 40 questions). Designed to review chronology, process, classification, comparison, cause and effect from the book. Options are shuffled to prevent guessing.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Listen to the conversation about historical and scientific topics. Choose the best answer (A, B, C, D) for each question.",
      type: "listening",
      script: "Woman: Who was Napoleon?\nMan: He was born in 1769 on the island of Corsica. When he was only 10 years old, his father sent him to military school in France.\n\nWoman: What happened to Pompeii?\nMan: It was destroyed by the eruption of Mount Vesuvius in 79 CE, forgotten for centuries, and found later.\n\nMan: Tell me about Steve Jobs.\nWoman: He grew up in California, became friends with Stephen Wozniak, and founded Apple when he was 20.\n\nMan: How do roller coasters work?\nWoman: The cars go up slowly using a chain, then come down fast because of gravity.\n\nWoman: How do children acquire language?\nMan: They start with babbling sounds around 4 months, then say simple words.",
      questions: [
        {
          id: 1,
          options: [
            "He was born in Austria and joined the army early.",
            "He was born in Russia and excelled in math.",
            "He was born on an island and sent to military school.",
            "He was born in France and became a good student."
          ],
          correct: 2,
          explanation: "Man nói: 'He was born in 1769 on the island of Corsica. When he was only 10 years old, his father sent him to military school in France.' Từ khóa: 'born on the island of Corsica' (đảo Corsica) và 'sent to military school' (gửi đến trường quân sự). Các lựa chọn khác sai vì sai nơi sinh hoặc hoạt động chính (không phải sinh ở Pháp, Nga hay Áo, và không nhấn mạnh là học sinh giỏi chung chung)."
        },
        {
          id: 2,
          options: [
            "It was uncovered right after the eruption and rebuilt.",
            "It was a modern city buried under water.",
            "It was built by Romans and visited by tourists immediately.",
            "It was destroyed by a volcano and forgotten for centuries."
          ],
          correct: 3,
          explanation: "Man nói: 'It was destroyed by the eruption of Mount Vesuvius in 79 CE, forgotten for centuries, and found later.' Từ khóa: 'destroyed by the eruption' (phá hủy bởi núi lửa phun trào) và 'forgotten for centuries' (bị lãng quên hàng thế kỷ). Các lựa chọn khác sai vì không phải được khai quật ngay sau phun trào, không phải chôn dưới nước, và không phải được xây bởi La Mã và du lịch ngay."
        },
        {
          id: 3,
          options: [
            "He founded a company and became a millionaire young.",
            "He grew up in California and liked electronics.",
            "He designed computers and left school early.",
            "He invented the iPhone and started Pixar."
          ],
          correct: 1,
          explanation: "Woman nói: 'He grew up in California, became friends with Stephen Wozniak, and founded Apple when he was 20.' Từ khóa: 'grew up in California' (lớn lên ở California) và ngụ ý thích electronics qua дружба với Wozniak (người thiết kế thiết bị điện tử). Các lựa chọn khác sai vì không chính xác thứ tự hoặc chi tiết: anh ấy sáng lập Apple trước khi trở thành millionaire, thiết kế iPhone sau, và rời trường nhưng chi tiết không đầy đủ."
        },
        {
          id: 4,
          options: [
            "The cars only go uphill and stop at the top.",
            "The cars go up slowly and come down fast due to gravity.",
            "The cars stay at the same speed throughout the ride.",
            "The cars are pushed by motors all the way."
          ],
          correct: 1,
          explanation: "Woman nói: 'The cars go up slowly using a chain, then come down fast because of gravity.' Từ khóa: 'go up slowly' (lên chậm) và 'come down fast because of gravity' (xuống nhanh do lực hấp dẫn). Các lựa chọn khác sai vì không phải motor đẩy suốt, không chỉ lên đồi dừng lại, và không giữ tốc độ ổn định."
        },
        {
          id: 5,
          options: [
            "They learn grammar before vocabulary.",
            "They speak full sentences from birth.",
            "They start babbling and then say simple words.",
            "They acquire language from books only."
          ],
          correct: 2,
          explanation: "Man nói: 'They start with babbling sounds around 4 months, then say simple words.' Từ khóa: 'start with babbling' (bắt đầu bằng âm thanh bập bẹ) và 'say simple words' (nói từ đơn giản). Các lựa chọn khác sai vì trẻ không nói câu đầy đủ từ sinh, học từ vựng trước ngữ pháp, và không chỉ từ sách."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 questions - A longer conversation about Steve Jobs. Listen and choose the best answer (A, B, C, D).",
      type: "listening",
      script: "Woman: Steve Jobs was born in 1955 and grew up in California. When he was 14 years old, he became friends with Steve Wozniak. Wozniak liked to design and build his own electronic equipment. In 1975, Wozniak started designing a personal computer. Jobs convinced Wozniak that they could build these personal computers in his garage and sell them. A year later, Jobs and Wozniak founded the Apple Computer company. By the age of 25, Steve Jobs was a millionaire. But he had problems at Apple and left in 1985. Soon after he left, he bought the company that became Pixar. In 1995, Pixar released the movie Toy Story. Over the next 10 years, Apple introduced new products. Three years later, Jobs released the iPad onto the market.",
      questions: [
        {
          id: 6,
          question: "How old was Steve Jobs when he co-founded Apple?",
          options: [
            "25",
            "35",
            "20",
            "30"
          ],
          correct: 2,
          explanation: "Woman nói: 'A year later, Jobs and Wozniak founded the Apple Computer company.' Với chi tiết anh ấy 20 tuổi khi sáng lập, vì 'By the age of 25, Steve Jobs was a millionaire' ngụ ý millionaire sau sáng lập. Các lựa chọn khác sai vì 25 là millionaire, không phải tuổi sáng lập."
        },
        {
          id: 7,
          question: "Why did Jobs leave Apple in 1985?",
          options: [
            "He started a new company.",
            "He had problems with the board.",
            "He retired early.",
            "He wanted to focus on movies."
          ],
          correct: 1,
          explanation: "Woman nói: 'But he had problems at Apple and left in 1985.' Từ khóa: 'had problems at Apple' (có vấn đề tại Apple). Các lựa chọn khác sai vì mua Pixar sau rời, không retire, start new after."
        },
        {
          id: 8,
          question: "What did Jobs do after leaving Apple?",
          options: [
            "He designed the iMac.",
            "He bought Pixar.",
            "He invented the iPod.",
            "He joined Microsoft."
          ],
          correct: 1,
          explanation: "Woman nói: 'Soon after he left, he bought the company that became Pixar.' Từ khóa: 'bought the company that became Pixar'. Các lựa chọn khác sai vì iPod/iMac sau trở lại Apple, không join Microsoft."
        },
        {
          id: 9,
          question: "Who was Steve Wozniak?",
          options: [
            "Jobs' business partner.",
            "Jobs' brother.",
            "Jobs' competitor.",
            "Jobs' college professor."
          ],
          correct: 0,
          explanation: "Woman nói: 'he became friends with Steve Wozniak... Jobs and Wozniak founded the Apple Computer company.' Từ khóa: 'founded... company' (sáng lập cùng), vậy business partner. Các lựa chọn khác sai."
        },
        {
          id: 10,
          question: "What product did Apple release in 2001 under Jobs?",
          options: [
            "iPhone",
            "iPod",
            "iMac",
            "iPad"
          ],
          correct: 1,
          explanation: "From book context, iPod in 2001 after Jobs returned. Script has 'Over the next 10 years, Apple introduced new products' including iPod. Các lựa chọn khác sai vì iPhone 2007, iPad 2010, iMac earlier."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 questions - A short talk about Napoleon. Listen and choose the best answer (A, B, C, D).",
      type: "listening",
      script: "Today, I am going to talk to you about one of the most important historical figures in European history—Napoleon Bonaparte. Napoleon excelled in mathematics and military science. In 1785, Napoleon began the military career that brought him fame, power, riches, and finally, defeat. After eight years in the army, Napoleon became a general. He was only 24. Napoleon had many victories on the battlefield, but he also became involved in French law and politics. And in 1804 at the age of 35, he became the first emperor of France. Napoleon was many things. He was, first of all, a brilliant military leader. His soldiers were ready to die for him. As a result, Napoleon won many military victories. At one time he controlled most of Europe, but some countries, including England, Russia, and Austria, fought fiercely against Napoleon. His defeat—his end—came when he decided to attack Russia. In this military campaign against Russia, he lost most of his army. The great French conqueror died alone, deserted by his family and his friends. The year was 1821, and Napoleon was only 51.",
      questions: [
        {
          id: 11,
          question: "The lecture is about __________.",
          options: [
            "an acceptable city",
            "success in business",
            "awful volcanoes",
            "a famous historical figure"
          ],
          correct: 3,
          explanation: "Lecture mở đầu: 'one of the most important historical figures in European history—Napoleon Bonaparte.' Từ khóa: 'historical figures'. Các lựa chọn khác sai."
        },
        {
          id: 12,
          question: "Napoleon became the first __________.",
          options: [
            "soldier in Austria",
            "general in Russia",
            "emperor of France",
            "king of Corsica"
          ],
          correct: 2,
          explanation: "Lecture nói: 'he became the first emperor of France.' Từ khóa: 'first emperor of France'. Các lựa chọn khác sai."
        },
        {
          id: 13,
          question: "If Napoleon attacked Russia, he __________.",
          options: [
            "was fined",
            "got 50% of Europe",
            "won many victories",
            "lost most of his army"
          ],
          correct: 3,
          explanation: "Lecture nói: 'he lost most of his army.' Từ khóa: 'lost most of his army'. Các lựa chọn khác sai."
        },
        {
          id: 14,
          question: "Pliny was __________.",
          options: [
            "already dead",
            "a young Roman boy",
            "a bit bored at Pompeii",
            "an archaeologist"
          ],
          correct: 1,
          explanation: "From book Pompeii chapter, Pliny is 'a young Roman boy' who witnessed the eruption. Các lựa chọn khác sai."
        },
        {
          id: 15,
          question: "The city of Pompeii __________.",
          options: [
            "has nice ruins today",
            "was forgotten for 1,700 years",
            "was destroyed by Vesuvius",
            "all correct"
          ],
          correct: 3,
          explanation: "All are true from book: destroyed by Vesuvius, forgotten 1,700 years, nice ruins today. Thus 'all correct'."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 questions - A rather long talk about roller coasters. Listen and choose the best answer (A, B, C, D).",
      type: "listening",
      script: "Let’s talk a little today about how roller coasters work and the physics involved in a ride on a roller coaster. I’m sure many of you have taken a ride on a roller coaster. Personally, I don’t ever want to ride on one again. When I was young, my sister took me on a roller coaster, and I never forgot that frightening experience. A simple roller coaster consists of a frame with a track on it. The track is very much like a train track. This track follows a path that ends at the same place it started. A train of cars travels around on this track, very fast. The cars have two sets of wheels. One set of wheels rolls on top of the track, and the other set of wheels rolls below the track. The wheels below the track are there to keep the fast-moving cars from coming off the track. Roller-coaster cars, as you probably know, don’t have any motors or engines. Instead, a chain pulls the cars up the first, tallest and steepest, hill. And this is how the ride begins. Then, at the top of the hill, the chain comes off the cars, and gravity takes over. Gravity pushes the cars down the other side of the hill. The taller and steeper the first hill is, the faster the ride will be. And the farther the cars will travel. As the cars roll downhill, they gain speed. The cars have enough speed and energy to send them up the next hill. As the cars near the top of the second hill, they begin to slow down. But then, the cars reach the top of that hill and start down the other side, and gravity again pushes them forward toward the ground. This process repeats on each hill. OK, so let’s go over this process again. First, the cars are pulled by a chain up the first, highest hill. Then there is enough energy to pull the cars up and over the next hill, there is enough energy to climb the next hill. The roller-coaster cars lose energy as the ride continues, so the hills have to be smaller toward the end of the track. Finally, we roll to a stop on ground level, right where we began. Tomorrow we will talk about the forces that press on our bodies and keep us in our seats when the cars of a roller coaster travel in a loop that puts us upside down.",
      questions: [
        {
          id: 16,
          question: "Roller coasters work because of __________.",
          options: [
            "all correct",
            "chains all the way",
            "gravity and energy",
            "motors only"
          ],
          correct: 2,
          explanation: "Speaker nói: 'gravity takes over... Gravity pushes the cars down' và 'gain speed and energy'. Từ khóa: 'gravity and energy'. Các lựa chọn khác sai."
        },
        {
          id: 17,
          question: "The cars are pulled up __________.",
          options: [
            "a few hills ago",
            "two hills ago",
            "the first hill",
            "two years ago"
          ],
          correct: 2,
          explanation: "Speaker nói: 'a chain pulls the cars up the first, tallest and steepest, hill.' Từ khóa: 'the first hill'. Các lựa chọn khác sai."
        },
        {
          id: 18,
          question: "When going downhill, the cars __________.",
          options: [
            "don't have wheels",
            "have a chain",
            "gain speed from gravity",
            "lose energy slowly"
          ],
          correct: 2,
          explanation: "Speaker nói: 'Gravity pushes the cars down... they gain speed.' Từ khóa: 'gain speed from gravity'. Các lựa chọn khác sai."
        },
        {
          id: 19,
          question: "The speaker didn't like roller coasters because __________.",
          options: [
            "she has no right to ride",
            "she didn't believe in gravity",
            "she was frightened as a child",
            "she couldn't prove the physics"
          ],
          correct: 2,
          explanation: "Speaker nói: 'I never forgot that frightening experience' as a child. Từ khóa: 'frightening experience'. Các lựa chọn khác sai."
        },
        {
          id: 20,
          question: "The speaker tries to __________.",
          options: [
            "bother the audience",
            "make the audience angry",
            "calm the audience down",
            "make the audience happy"
          ],
          correct: 2,
          explanation: "By explaining physics and repeating to clarify, calming fears. Các lựa chọn khác sai."
        }
      ]
    },
    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 questions - Choose the best word/phrase to complete each sentence. No audio.",
      type: "reading",
     questions: [
  {
    id: 21,
    question: "Historical reviews indicate that many ancient cities were often unnecessarily _______.",
    options: [
      "Destroys",
      "Destruction", 
      "Destroy",
      "Destroyed"
    ],
    correct: 3,
    explanation: "Đáp án đúng là **(D) 'Destroyed'**. Câu sử dụng cấu trúc **bị động (passive voice)** với động từ 'be' (were) + **quá khứ phân từ (past participle)**. 'Were destroyed' có nghĩa là 'đã bị phá hủy'. Tính từ 'unnecessarily' (một cách không cần thiết) bổ nghĩa cho hành động bị phá hủy. Phân tích lựa chọn sai: (A) 'Destroys' là động từ chia ngôi thứ ba số ít hiện tại, không dùng sau 'were'. (B) 'Destruction' là danh từ (sự phá hủy), không thể đứng sau động từ 'be' trong cấu trúc bị động. (C) 'Destroy' là động từ nguyên thể, cần 'be' + V3 trong bị động. Chỉ 'Destroyed' (V3 của destroy) là chính xác."
  },
  {
    id: 22,
    question: "Among ________ recognized at the history awards ceremony were emperor Napoleon Bonaparte and leader Steve Jobs.",
    options: [
      "whose",
      "they", 
      "who",
      "those"
    ],
    correct: 3,
    explanation: "Đáp án đúng là **(D) 'those'**. Đây là cấu trúc **đảo ngữ (inversion)** trang trọng với 'Among' đứng đầu câu. 'Those' là đại từ chỉ định (demonstrative pronoun) có nghĩa 'những người', thay thế cho 'the people' đã được nhắc đến ngầm. Cấu trúc đầy đủ: 'Among **those** (who were) recognized... were...' Phân tích lựa chọn sai: (A) 'whose' là đại từ quan hệ sở hữu (của ai), cần một danh từ theo sau. (B) 'they' là đại từ nhân xưng chủ ngữ, không thể đứng ngay sau giới từ 'Among' mà không có mệnh đề quan hệ. (C) 'who' là đại từ quan hệ cho chủ ngữ người, nhưng cần một tiền danh từ (antecedent) đứng trước nó. Trong cấu trúc này, 'those' vừa là tiền danh từ vừa là đại từ chỉ định hoàn chỉnh."
  },
  {
    id: 23,
    question: "Steve Jobs has received top innovation reviews _______ he founded the company decades ago.",
    options: [
      "during",
      "except", 
      "since",
      "despite"
    ],
    correct: 2,
    explanation: "Đáp án đúng là **(C) 'since'**. Câu sử dụng **thì hiện tại hoàn thành** ('has received') để diễn tả một hành động bắt đầu trong quá khứ và kéo dài đến hiện tại. 'Since' (kể từ khi) là từ nối chính xác để liên kết mốc thời gian trong quá khứ ('he founded the company') với thì hiện tại hoàn thành. Phân tích lựa chọn sai: (A) 'during' (trong suốt) đi với danh từ chỉ khoảng thời gian (during the decade), không đi với mệnh đề. (B) 'except' (ngoại trừ) chỉ sự loại trừ, không liên quan đến thời gian. (D) 'despite' (mặc dù) chỉ sự tương phản, thường đi với danh từ hoặc V-ing. Chỉ 'since' tạo nên mối quan hệ thời gian chính xác."
  },
  {
    id: 24,
    question: "All artifacts found in Pompeii are made from natural materials and contain no __________ dyes.",
    options: [
      "assumed",
      "immediate", 
      "reasonable",
      "synthetic"
    ],
    correct: 3,
    explanation: "Đáp án đúng là **(D) 'synthetic'**. Từ này có nghĩa 'nhân tạo', tạo thành sự **tương phản logic** với 'natural materials' (vật liệu tự nhiên) ở nửa đầu câu. 'No synthetic dyes' = không có thuốc nhuộm nhân tạo. Đây cũng là một **collocation** (kết hợp từ) phổ biến trong khảo cổ và bảo tồn di sản. Phân tích lựa chọn sai: (A) 'assumed' (được giả định) không có nghĩa đối lập với tự nhiên. (B) 'immediate' (ngay lập tức) không liên quan đến thành phần hóa học. (C) 'reasonable' (hợp lý) mô tả mức độ, không phải loại thuốc nhuộm. Chỉ 'synthetic' là chính xác về mặt ngữ nghĩa và logic."
  },
  {
    id: 25,
    question: "The new language acquisition policy states that _______ learning new skills enhances communication and focus.",
    options: [
      "regular",
      "regulate", 
      "regularly",
      "regularity"
    ],
    correct: 0,
    explanation: "Đáp án đúng là **(A) 'regular'**. Vị trí trống cần một **tính từ (adjective)** để bổ nghĩa cho cụm danh từ 'learning new skills' (việc học các kỹ năng mới). 'Regular learning' = việc học thường xuyên, đều đặn. Phân tích lựa chọn sai: (B) 'regulate' là động từ (điều chỉnh), không thể đứng trước danh động từ 'learning'. (C) 'regularly' là trạng từ (một cách thường xuyên), dùng để bổ nghĩa cho động từ, không đứng trước danh động từ. (D) 'regularity' là danh từ (tính đều đặn), không thể bổ nghĩa cho một danh từ khác mà không có giới từ. Chỉ tính từ 'regular' mới có thể mô tả trực tiếp cho danh động từ 'learning'."
  },
  {
    id: 26,
    question: "The new lecture on dinosaurs will begin at 9 a.m. and will _______ an overview of extinction causes.",
    options: [
      "including",
      "include", 
      "includes",
      "included"
    ],
    correct: 1,
    explanation: "Đáp án đúng là **(B) 'include'**. Câu sử dụng **thì tương lai đơn** với cấu trúc 'will + động từ nguyên thể không ** to **'. Hai mệnh đề nối bằng 'and' nên động từ 'will include' phải song song với 'will begin'. Phân tích lựa chọn sai: (A) 'including' là giới từ (bao gồm) hoặc dạng V-ing, không đứng sau modal verb 'will'. (C) 'includes' là động từ chia ngôi thứ ba số ít hiện tại, không dùng sau 'will'. (D) 'included' là quá khứ phân từ, cần trợ động để tạo thì quá khứ (was included) hoặc hoàn thành (has included), không dùng sau 'will'. Chỉ động từ nguyên thể 'include' là đúng với cấu trúc 'will + V'."
  },
  {
    id: 27,
    question: "To ensure understanding, all notes must be thoroughly reviewed _______ being used for summaries.",
    options: [
      "during",
      "between", 
      "unless",
      "before"
    ],
    correct: 3,
    explanation: "Đáp án đúng là **(D) 'before'**. Giới từ 'before' + V-ing ('being used') chỉ một hành động xảy ra **trước** một hành động khác. Ngữ cảnh logic: ghi chú phải được xem xét kỹ **trước khi** được sử dụng để viết tóm tắt. Phân tích lựa chọn sai: (A) 'during' (trong khi) chỉ thời gian đồng thời, không hợp lý vì không thể vừa xem xét vừa sử dụng cùng lúc cho mục đích tóm tắt. (B) 'between' (giữa) chỉ vị trí hoặc mối quan hệ giữa hai thứ, không phải trình tự thời gian. (C) 'unless' (trừ khi) chỉ điều kiện phủ định, làm câu vô nghĩa: '...must be reviewed unless being used...'. Chỉ 'before' thể hiện đúng trình tự công việc."
  },
  {
    id: 28,
    question: "The history department is seeking a researcher who can work _______ and meet tight deadlines.",
    options: [
      "independent",
      "dependently", 
      "independently",
      "independence"
    ],
    correct: 2,
    explanation: "Đáp án đúng là **(C) 'independently'**. Sau động từ 'work' cần một **trạng từ (adverb)** để mô tả **cách thức** làm việc. 'Work independently' = làm việc một cách độc lập. Phân tích lựa chọn sai: (A) 'independent' là tính từ, dùng để mô tả danh từ (an independent researcher), không bổ nghĩa cho động từ. (B) 'dependently' là trạng từ nhưng nghĩa trái ngược (một cách phụ thuộc), không phù hợp với yêu cầu công việc thường tìm kiếm sự tự chủ. (D) 'independence' là danh từ (sự độc lập), không thể đứng sau động từ để mô tả cách thức. Chỉ trạng từ 'independently' là chính xác cả về ngữ pháp lẫn ngữ nghĩa."
  },
  {
    id: 29,
    question: "Because of the volcanic eruption, the excavation event has been _______ until next season.",
    options: [
      "postponing",
      "postpones", 
      "postponed",
      "postpone"
    ],
    correct: 2,
    explanation: "Đáp án đúng là **(C) 'postponed'**. Câu sử dụng **thì hiện tại hoàn thành bị động**: 'has been + quá khứ phân từ (V3)'. Chủ ngữ 'the excavation event' là vật thể chịu tác động của hành động 'hoãn lại'. 'Has been postponed' = đã bị hoãn lại. Phân tích lựa chọn sai: (A) 'postponing' là danh động từ (V-ing), không dùng sau 'has been' trong cấu trúc bị động (trừ khi là thì tiếp diễn bị động: 'has been being postponed' - rất hiếm dùng). (B) 'postpones' là động từ hiện tại ngôi thứ ba số ít, hoàn toàn không phù hợp. (D) 'postpone' là động từ nguyên thể, không dùng trong cấu trúc 'has been'. Chỉ quá khứ phân từ 'postponed' mới tạo thành dạng bị động chính xác."
  },
  {
    id: 30,
    question: "The professor reminded the students that attentiveness and teamwork are key factors in maintaining a positive _______.",
    options: [
      "equipment",
      "environment", 
      "appointment",
      "advertisement"
    ],
    correct: 1,
    explanation: "Đáp án đúng là **(B) 'environment'**. 'Positive environment' (môi trường tích cực) là một **collocation rất phổ biến** trong giáo dục và tâm lý học, chỉ một bầu không khí học tập/thảo luận hỗ trợ và xây dựng. Tính từ 'positive' (tích cực) thường đi với 'environment'. Phân tích lựa chọn sai: (A) 'equipment' (thiết bị) không liên quan đến 'attentiveness and teamwork' (sự chú ý và làm việc nhóm). (C) 'appointment' (cuộc hẹn) không thể nào 'positive' trong ngữ cảnh này. (D) 'advertisement' (quảng cáo) hoàn toàn không liên quan đến nội dung câu về yếu tố học thuật. Chỉ 'environment' tạo nên ý nghĩa trọn vẹn: duy trì một môi trường tích cực là nhờ sự chú ý và tinh thần đồng đội."
  }
]    
},
   part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 questions - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: "To: All History Department Staff\nFrom: Dr. Elena Rossi, History Director\nSubject: Upcoming Lecture on Ancient Tragedies\n\nDear Team,\nAs you all know, we are preparing for the official lecture on ancient tragedies, such as the eruption of Pompeii, scheduled for early next quarter. In order to ensure a successful presentation, we will begin a series of meetings next week to finalize the discussion strategy. Each team member will be assigned specific responsibilities to (31) smooth coordination between sections.\n\nOur primary objective is to increase awareness of historical events and attract potential students through both online and offline channels. The media team will focus on digital promotion, while the research team will create visual materials to (32) our educational image.\n\nAdditionally, we will collaborate closely with our guest speakers to collect feedback from attendees. This will help us make any necessary adjustments before the official event. Please note that all suggestions should be submitted to my office no later than Friday, March 22, so that we have enough time to review and (33) them.\n\nThe official conference will take place at our campus on April 5. We expect several major experts to attend, so everyone must be prepared to present our topics in the most professional manner possible. A rehearsal session will be held two days before the event to (34) that all participants are comfortable with their roles.\n\nFor those who are new to the team, we will organize a short orientation program to explain our teaching policies and internal communication procedures. Attendance is highly encouraged, as this session will provide essential information on how to (35) with other departments effectively.\n\nWe truly appreciate everyone's dedication and teamwork during this busy time. Your hard work and creativity will certainly make this lecture a success. If you have any questions or concerns, please don't hesitate to (36) me directly.\n\nThank you once again for your continued commitment to excellence. I am confident that, together, we will achieve outstanding results.\nBest regards,\nDr. Elena Rossi\nHistory Director",
  questions: [
    {
      id: 31,
      type: "fill",
      question: "(31) - Điền từ thích hợp",
      context: "Each team member will be assigned specific responsibilities to (31) smooth coordination between sections.",
      options: [
        "suggest",
        "remind",
        "ensure",
        "describe"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'ensure'**. Động từ 'ensure' (đảm bảo) thường đi với danh từ như 'coordination' để diễn tả việc đảm bảo một điều gì đó xảy ra suôn sẻ. Trong ngữ cảnh quản lý dự án, 'ensure smooth coordination' là cụm từ phổ biến. Các lựa chọn khác: (A) 'suggest' (đề xuất) không phù hợp vì trách nhiệm là để thực hiện, không chỉ đề xuất. (B) 'remind' (nhắc nhở) không đủ mạnh để diễn tả mục đích của việc giao trách nhiệm. (D) 'describe' (mô tả) sai nghĩa hoàn toàn trong ngữ cảnh này."
    },
    {
      id: 32,
      type: "fill",
      question: "(32) - Điền từ thích hợp",
      context: "...while the research team will create visual materials to (32) our educational image.",
      options: [
        "improve",
        "attend",
        "prevent",
        "reinforce"
      ],
      correct: 3,
      explanation: "Đáp án đúng là **(D) 'reinforce'**. Trong ngữ cảnh xây dựng thương hiệu và hình ảnh, 'reinforce' (củng cố, tăng cường) là từ chính xác để nói về việc làm cho hình ảnh giáo dục trở nên mạnh mẽ hơn thông qua tài liệu trực quan. Các lựa chọn khác: (A) 'improve' (cải thiện) có thể chấp nhận nhưng không chính xác bằng 'reinforce' vì hình ảnh không phải là thứ 'cải thiện' mà là 'củng cố'. (B) 'attend' (tham dự) hoàn toàn không liên quan. (C) 'prevent' (ngăn chặn) sai nghĩa và logic."
    },
    {
      id: 33,
      type: "fill",
      question: "(33) - Điền từ thích hợp",
      context: "...so that we have enough time to review and (33) them.",
      options: [
        "decline",
        "reject",
        "implement",
        "transfer"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'implement'**. Trong quy trình xử lý đề xuất, sau khi 'review' (xem xét), bước tiếp theo thường là 'implement' (triển khai, thực hiện) các đề xuất hợp lý. Đây là cặp động từ phổ biến trong quản lý. Các lựa chọn khác: (A) 'decline' và (B) 'reject' đều có nghĩa từ chối, trái ngược với mục đích tích cực của việc thu thập đề xuất. (D) 'transfer' (chuyển giao) không phù hợp với ngữ cảnh."
    },
    {
      id: 34,
      type: "fill",
      question: "(34) - Điền từ thích hợp",
      context: "A rehearsal session will be held two days before the event to (34) that all participants are comfortable with their roles.",
      options: [
        "announce",
        "ensure",
        "warn",
        "require"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'ensure'**. Cấu trúc 'to ensure that + clause' có nghĩa là 'để đảm bảo rằng', diễn tả mục đích của buổi tập dượt. Đây là cách dùng phổ biến để nói về việc đảm bảo một kết quả cụ thể. Các lựa chọn khác: (A) 'announce' (thông báo) không phải mục đích chính của buổi tập. (C) 'warn' (cảnh báo) mang nghĩa tiêu cực. (D) 'require' (yêu cầu) không phù hợp vì buổi tập để giúp mọi người thoải mái, không phải để yêu cầu."
    },
    {
      id: 35,
      type: "fill",
      question: "(35) - Điền từ thích hợp",
      context: "...as this session will provide essential information on how to (35) with other departments effectively.",
      options: [
        "cooperate",
        "compete",
        "complain",
        "compare"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'cooperate'**. 'Cooperate with' (hợp tác với) là cụm động từ chuẩn khi nói về làm việc hiệu quả giữa các phòng ban. Trong bối cảnh tổ chức, hợp tác là kỹ năng quan trọng. Các lựa chọn khác: (B) 'compete' (cạnh tranh) thường không được khuyến khích trong nội bộ. (C) 'complain' (phàn nàn) mang nghĩa tiêu cực. (D) 'compare' (so sánh) không phù hợp với mục đích làm việc hiệu quả."
    },
    {
      id: 36,
      type: "fill",
      question: "(36) - Điền từ thích hợp",
      context: "...please don't hesitate to (36) me directly.",
      options: [
        "ignore",
        "reach",
        "push",
        "delay"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'reach'**. Trong văn viết email trang trọng, 'reach me directly' hoặc 'reach out to me' là cách diễn đạt phổ biến để mời liên hệ. Đây là một collocation tự nhiên. Các lựa chọn khác: (A) 'ignore' (phớt lờ) hoàn toàn trái nghĩa. (C) 'push' (thúc ép) và (D) 'delay' (trì hoãn) đều không phù hợp trong ngữ cảnh này."
    },
    {
      id: 37,
      type: "comprehension",
      question: "(37) - The lecture on Pompeii will most likely be held ___.",
      options: [
        "next week",
        "after the conference",
        "early next quarter",
        "by the end of the year"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'early next quarter'**. Trong phần mở đầu email, người viết nói: '...the official lecture on ancient tragedies, such as the eruption of Pompeii, **scheduled for early next quarter**.' Đây là thông tin trực tiếp và rõ ràng. Các lựa chọn khác: (A) 'next week' là thời gian bắt đầu các cuộc họp, không phải bài giảng. (B) 'after the conference' không được đề cập (bài giảng có thể là một phần của hội nghị). (D) 'by the end of the year' quá mơ hồ và không khớp với 'early next quarter'."
    },
    {
      id: 38,
      type: "comprehension",
      question: "(38) - What is the main purpose of this message?",
      options: [
        "To announce the cancellation of a session",
        "To introduce a new teaching policy",
        "To inform staff of lecture preparations",
        "To request attendee feedback after the event"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'To inform staff of lecture preparations'**. Toàn bộ email xoay quanh việc chuẩn bị cho bài giảng: lên kế hoạch họp, phân công nhiệm vụ, tạo tài liệu, tập dượt, v.v. Mục đích chính là thông báo và điều phối công việc chuẩn bị. Các lựa chọn khác: (A) không có thông tin về hủy bỏ. (B) chính sách giảng dạy chỉ được nhắc đến như một phần của buổi định hướng cho nhân viên mới, không phải mục đích chính. (D) phản hồi từ người tham dự được đề cập như một phần của quá trình chuẩn bị, không phải mục đích chính của email."
    },
    {
      id: 39,
      type: "comprehension",
      question: "(39) - Who is the sender of this message?",
      options: [
        "The history director",
        "The chief academic officer",
        "A guest speaker",
        "A research manager"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'The history director'**. Phần tiêu đề email ghi rõ: 'From: Dr. Elena Rossi, **History Director**'. Đây là thông tin trực tiếp về danh tính và chức vụ của người gửi. Các lựa chọn khác không có cơ sở trong văn bản."
    },
    {
      id: 40,
      type: "comprehension",
      question: "(40) - When will the rehearsal for the conference take place?",
      options: [
        "The following week",
        "March 22",
        "April 5",
        "April 3"
      ],
      correct: 3,
      explanation: "Đáp án đúng là **(D) 'April 3'**. Email nêu: 'The official conference will take place at our campus on **April 5**... A rehearsal session will be held **two days before the event**.' Do đó, ngày tập dượt là: 5 tháng 4 - 2 ngày = **3 tháng 4**. Các lựa chọn khác: (A) 'The following week' quá mơ hồ. (B) 'March 22' là hạn nộp đề xuất. (C) 'April 5' là ngày diễn ra hội nghị chính thức."
    }
  ]
    },
   part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 questions - Read the magazine advertisement and e-mail. Choose the best answer (A, B, C, D).",
  type: "reading",
  text: "http://www.historyaudiopro.com\n\n**History Audio Pro**\n\nEnhance Your Learning with Professionally Recorded Historical Lectures\n\nA professional, personalized audio lecture creates an excellent learning impression. History Audio Pro meets your specifications to record a customized historical greeting within three business days!\n\n**Services We Offer:**\n1. **Professional Voice Talent for Lecture Messages** – We have numerous voice actors. Visit historyaudiopro.com to hear examples.\n2. **On-Hold Messages** – Professional on-hold messages.\n3. **Customized Script Writing** – Craft personalized messages.\n4. **Multilingual Voice Production** – Services in multiple languages.\n\nSend e-mail to inquiry@historyaudiopro.com. A representative will call within 24 hours.\n\nTo: inquiry@historyaudiopro.com\nFrom: j.annesly@historydata.com\nDate: June 25\nSubject: Request\n\nI found your notice in the newspaper and wish to use your services for my history-processing business. I am looking for a professionally recorded lecture greeting, and wonder if you would write and record this, and how soon. Since I work with English- and Spanish-speaking clients, I would like the message in both languages. Please reach out at my mobile between 10:00 A.M. and 5:00 P.M.\n\nThank you,\nJody Annesly\nHistory Data\n512-555-6879\n342 Maymill Road, Fort Worth, TX 70609",
  questions: [
    {
      id: 41,
      question: "According to the advertisement, why should customers visit the History Audio Pro Web site?",
      options: [
        "To hear lecture samples",
        "To add a new subscription number",
        "To request recording equipment",
        "To submit a credit card payment"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'To hear lecture samples'**. Quảng cáo ghi rõ: '**Visit historyaudiopro.com to hear examples**.' Mục đích duy nhất được nêu cho việc truy cập website là để nghe các mẫu giọng đọc/diễn giả. Các lựa chọn khác: (B), (C), và (D) đều là các hành động không được đề cập đến trong quảng cáo. Không có thông tin về việc đăng ký số điện thoại mới, yêu cầu thiết bị ghi âm, hay thanh toán thẻ tín dụng trên website."
    },
    {
      id: 42,
      question: "What is suggested about History Audio Pro?",
      options: [
        "It advertises in the newspaper.",
        "It fills orders once a week.",
        "It specializes in historical lectures.",
        "It has recently expanded its business."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'It advertises in the newspaper.'** Điều này được **suy ra (inferred)** từ email của khách hàng, Ms. Annesly: 'I found **your notice in the newspaper**.' Việc cô ấy tìm thấy thông báo của công ty trên báo cho thấy History Audio Pro có quảng cáo trên phương tiện này. Các lựa chọn khác: (B) Không có thông tin về tần suất xử lý đơn hàng (hàng tuần hay không). (C) Mặc dù tên công ty là 'History Audio Pro' và dịch vụ liên quan đến bài giảng lịch sử, nhưng quảng cáo không nói rõ họ **chuyên** (specializes) về lĩnh vực này; họ có thể cung cấp nhiều loại ghi âm khác. (D) Không có bằng chứng nào về việc mở rộng kinh doanh gần đây."
    },
    {
      id: 43,
      question: "Who most likely is Ms. Annesly?",
      options: [
        "A sales associate",
        "A history teacher",
        "A script writer",
        "An actor"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'A history teacher'** (giáo viên lịch sử) hoặc một chuyên gia trong lĩnh vực lịch sử. Cô ấy viết email từ địa chỉ '@historydata.com' và nói về 'my **history-processing business**' (doanh nghiệp xử lý dữ liệu lịch sử). Cô ấy muốn một 'professionally recorded **lecture greeting**' (lời chào bài giảng) cho khách hàng nói tiếng Anh và Tây Ban Nha, điều này phù hợp với vai trò của một nhà giáo dục hoặc người cung cấp dịch vụ lịch sử. Các lựa chọn khác: (A) 'sales associate' (nhân viên bán hàng) không phù hợp vì cô ấy là người **tìm kiếm** dịch vụ, không phải người bán. (C) 'script writer' (người viết kịch bản) không đúng vì cô ấy muốn công ty viết kịch bản cho mình. (D) 'actor' (diễn viên) sai vì cô ấy cần thuê diễn viên lồng tiếng, không phải là một diễn viên."
    },
    {
      id: 44,
      question: "What service does Ms. Annesly NOT request from History Audio Pro?",
      options: [
        "On-hold messages",
        "Professional voice talent",
        "Customized script writing",
        "Multilingual audio production"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'On-hold messages'**. Quảng cáo liệt kê 4 dịch vụ, nhưng trong email, Ms. Annesly chỉ yêu cầu cụ thể: 1) 'professionally recorded lecture greeting' (dịch vụ voice talent), 2) hỏi 'if you would **write** and record this' (dịch vụ script writing), và 3) 'message in both languages' (dịch vụ multilingual production). Cô ấy **không hề đề cập** đến việc cần 'on-hold messages' (tin nhắn chờ điện thoại)."
    },
    {
      id: 45,
      question: "What will Ms. Annesly most likely do within 24 hours?",
      options: [
        "Write a script",
        "Speak with a representative",
        "Visit a recording studio",
        "Meet with an actor"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'Speak with a representative'** (Nói chuyện với đại diện). Quảng cáo hứa hẹn: 'A **representative will call you within 24 hours**.' Vì Ms. Annesly vừa gửi email, cô ấy có thể mong đợi một cuộc gọi từ đại diện công ty trong vòng 24 giờ tới. Các lựa chọn khác đều là hành động của cô ấy hoặc sẽ diễn ra sau cuộc gọi này, không phải trong vòng 24 giờ."
    },
    {
      id: 46,
      question: "According to the advertisement, History Audio Pro will respond to customer inquiries within",
      options: [
        "24 hours",
        "12 hours",
        "48 hours",
        "three business days"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) '24 hours'**. Quảng cáo nêu rõ: 'A representative will call you **within 24 hours**.' Đây là thời gian phản hồi cho **liên hệ ban đầu**. Lưu ý: 'Three business days' (3 ngày làm việc) là thời gian để **hoàn thành việc ghi âm** ('to record a customized historical greeting within three business days'), không phải thời gian phản hồi yêu cầu."
    },
    {
      id: 47,
      question: "What can be inferred about History Audio Pro’s services?",
      options: [
        "They can accommodate different languages.",
        "They are limited to English-speaking clients.",
        "They require customers to visit the office in person.",
        "They are available only on weekends."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'They can accommodate different languages.'** (Họ có thể đáp ứng nhiều ngôn ngữ khác nhau). Điều này được **suy ra** từ dịch vụ thứ 4 trong quảng cáo: '**Multilingual Voice Production** – Services in multiple languages.' Hơn nữa, yêu cầu của Ms. Annesly về bản ghi âm song ngữ (Anh-Tây Ban Nha) càng khẳng định điều này. Các lựa chọn khác: (B) Sai vì họ có dịch vụ đa ngôn ngữ. (C) Sai vì mọi liên hệ ban đầu đều qua email/điện thoại. (D) Sai vì không có thông tin về giờ làm việc chỉ cuối tuần."
    },
    {
      id: 48,
      question: "What does Ms. Annesly specifically request in her message?",
      options: [
        "A newspaper advertisement",
        "A refund for a previous order",
        "A bilingual lecture recording",
        "A sample of recorded music"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'A bilingual lecture recording'** (Một bản ghi âm bài giảng song ngữ). Ms. Annesly viết: 'Since I work with English- and Spanish-speaking clients, I would like the message **in both languages**.' 'Bilingual' có nghĩa là sử dụng hai ngôn ngữ. Các lựa chọn khác: (A) Cô ấy tìm thấy quảng cáo trên báo, nhưng không yêu cầu một cái mới. (B) Không có đề cập nào về đơn hàng trước hay yêu cầu hoàn tiền. (D) Cô ấy muốn một 'lecture greeting' (lời chào bài giảng), không phải nhạc."
    },
    {
      id: 49,
      question: "What detail does Ms. Annesly include to make communication easier?",
      options: [
        "Her preferred calling hours",
        "Her office address",
        "Her company’s website link",
        "Her client list"
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'Her preferred calling hours'** (Khung giờ gọi điện ưa thích của cô ấy). Trong email, cô ấy chỉ định: 'Please reach out at my mobile **between 10:00 A.M. and 5:00 P.M.**' Điều này giúp đại diện công ty biết khi nào thì thuận tiện để gọi cho cô. Các lựa chọn khác: (B) Địa chỉ văn phòng của cô ấy có trong chữ ký, nhưng đây là thông tin liên hệ chung, không phải chi tiết đặc biệt để **giao tiếp dễ dàng hơn**. (C) & (D) Không được cung cấp."
    },
    {
      id: 50,
      question: "What is the likely next step for History Audio Pro?",
      options: [
        "Posting a new advertisement in the newspaper",
        "Visiting Ms. Annesly’s office for recording",
        "Sending Ms. Annesly a contract to sign",
        "Calling Ms. Annesly to discuss her project and pricing"
      ],
      correct: 3,
      explanation: "Đáp án đúng là **(D) 'Calling Ms. Annesly to discuss her project and pricing'** (Gọi cho Ms. Annesly để thảo luận về dự án và báo giá). Dựa trên quy trình được nêu trong quảng cáo: 'A representative will call you within 24 hours to **discuss your project and provide a price estimate**.' Đây là bước tiếp theo logic sau khi nhận được email yêu cầu. Các lựa chọn khác có thể xảy ra sau cuộc gọi này, nhưng không phải là bước **tiếp theo ngay lập tức**."
    }
  ]
},
   part8: {
  title: "PART 8: Text Message Chain",
  description: "10 questions - Read the text message chain. Choose the best answer (A, B, C, D).",
  type: "reading",
  text: "SAM BACH (11:59): My first flight was delayed, so I missed my connection in Beijing.\nSAM BACH(12:00):So now, I'm going to be on a flight arriving in Naples at 18:00.\n\nAKIRA OTANI (12:05): OK. Same airline?\n\nSAM BACH (12:06): It's still Fly Right Airlines. It will be later in the day but still in time for our client meeting.\n\nAKIRA OTANI (12:06): I'll confirm the arrival time. Do you have any checked bags?\n\nSAM BACH (12:10): I do. Would you mind meeting me at the door after I go through customs?\n\nAKIRA OTANI (12:15): Sure thing. Parking spots can be hard to find, but now I'll have extra time to drive around and look.\n\nSAM BACH (12:16): Yes, sorry about that. See you then!",
  questions: [
    {
      id: 51,
      question: "What is suggested about Mr. Bach?",
      options: [
        "He is on a business trip.",
        "He has been to Pompeii more than once.",
        "He works for Fly Right Airlines.",
        "He currently works in Naples."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'He is on a business trip.'** (Anh ấy đang đi công tác). Bằng chứng rõ ràng từ tin nhắn của Mr. Bach: 'It will be later in the day but still in time for **our client meeting**.' Cụm 'client meeting' (cuộc họp với khách hàng) chỉ ra đây là chuyến đi công tác. Các lựa chọn khác: (B) Không có thông tin nào về việc anh ấy đã đến Pompeii bao nhiêu lần. (C) Anh ấy bay bằng hãng Fly Right Airlines, nhưng không có bằng chứng cho thấy anh ấy làm việc cho hãng này. (D) Anh ấy đang đến Naples cho một cuộc họp, không phải là nơi làm việc thường xuyên của anh ấy."
    },
    {
      id: 52,
      question: "At 12:15, what does Mr. Otani mean when he writes, 'Sure thing'?",
      options: [
        "He agrees to wait at the door near the customs area.",
        "He knows Mr. Bach must pass through customs.",
        "He has confirmed the arrival time of a flight.",
        "He is certain he will be able to find a parking place."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'He agrees to wait at the door near the customs area.'** (Anh ấy đồng ý chờ ở cửa gần khu vực hải quan). 'Sure thing' là một cách nói thân mật để đồng ý với một yêu cầu. Yêu cầu trực tiếp trước đó của Mr. Bach là: 'Would you mind **meeting me at the door after I go through customs?**' Do đó, 'Sure thing' là sự đồng ý đáp lại yêu cầu đó. Các lựa chọn khác: (B) Mặc dù đúng là Mr. Bach phải qua hải quan, nhưng đây không phải là ý chính của 'Sure thing'. (C) Anh ấy nói 'I'll confirm the arrival time' trước đó, nhưng 'Sure thing' không liên quan đến hành động xác nhận đó. (D) Anh ấy đề cập việc tìm chỗ đậu xe khó khăn, nhưng 'Sure thing' không phải là sự chắc chắn về việc tìm được chỗ."
    },
    {
      id: 53,
      question: "Why was Mr. Bach's flight delayed?",
      options: [
        "He missed his connection in Beijing.",
        "There was bad weather in Naples.",
        "The airline changed the departure time.",
        "He forgot to check in early."
      ],
      correct: 0,
      explanation: "Đáp án đúng là **(A) 'He missed his connection in Beijing.'** (Anh ấy bỏ lỡ chuyến bay kết nối ở Bắc Kinh). Nguyên nhân gốc được nêu trong tin nhắn đầu tiên: 'My **first flight was delayed**, so I **missed my connection in Beijing**.' Chuyến bay đầu bị trễ (delayed) dẫn đến hệ quả là bỏ lỡ chuyến kết nối (missed connection). Các lựa chọn khác: (B) Không có thông tin về thời tiết xấu ở Naples. (C) Không có thông tin về việc hãng bay thay đổi giờ khởi hành. (D) Không có thông tin về việc anh ấy quên check-in sớm."
    },
    {
      id: 54,
      question: "What time is Mr. Bach's new flight expected to arrive?",
      options: [
        "11:59",
        "20:15",
        "18:00",
        "12:06"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) '18:00'**. Thông tin được nêu rõ trong tin nhắn của Mr. Bach lúc 12:00: 'I'm going to be on a flight **arriving in Naples at 18:00**.' Các lựa chọn khác: (A) 11:59 là thời gian gửi tin nhắn đầu tiên. (B) 20:15 không được đề cập. (D) 12:06 là thời gian gửi một tin nhắn khác."
    },
    {
      id: 55,
      question: "What does Mr. Otani offer to do for Mr. Bach?",
      options: [
        "Change his flight booking",
        "Pick him up at the airport",
        "Help carry his luggage",
        "Drive him to the hotel"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'Pick him up at the airport.'** (Đón anh ấy tại sân bay). Khi Mr. Bach hỏi 'Would you mind meeting me at the door after I go through customs?' và Mr. Otani trả lời 'Sure thing', điều này ngụ ý rằng Mr. Otani sẽ đến sân bay để gặp (đón) Mr. Bach. Các lựa chọn khác: (A) Không có đề nghị thay đổi đặt chỗ. (C) Mr. Otani hỏi về hành lý ký gửi, nhưng không đề nghị mang vác. (D) Không có đề nghị đưa về khách sạn, chỉ gặp ở cửa sân bay."
    },
    {
      id: 56,
      question: "What can be inferred about the two men?",
      options: [
        "They both work for Fly Right Airlines.",
        "They are family members traveling together.",
        "They have never met before.",
        "They are colleagues attending the same meeting."
      ],
      correct: 3,
      explanation: "Đáp án đúng là **(D) 'They are colleagues attending the same meeting.'** (Họ là đồng nghiệp tham dự cùng một cuộc họp). Có hai bằng chứng: 1) Mr. Bach nói 'our client meeting' (cuộc họp khách hàng của **chúng ta**), cho thấy cả hai đều liên quan. 2) Mr. Otani sẵn sàng đi đón Mr. Bach, một hành động thường thấy giữa đồng nghiệp. Các lựa chọn khác: (A) Chỉ Mr. Bach bay với Fly Right Airlines, không có bằng chứng Mr. Otani làm việc cho hãng này. (B) Không có dấu hiệu cho thấy họ là người thân. (C) Họ dường như đã quen biết vì có cuộc họp chung và có trao đổi về việc đón tiếp."
    },
    {
      id: 57,
      question: "At 12:06, why does Mr. Bach mention 'still in time for our client meeting'?",
      options: [
        "To apologize for missing the meeting",
        "To confirm he will not be late",
        "To ask about the meeting location",
        "To cancel his attendance"
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'To confirm he will not be late.'** (Để xác nhận rằng anh ấy sẽ không bị muộn). Mặc dù chuyến bay mới đến lúc 18:00 (muộn hơn dự kiến ban đầu), Mr. Bach muốn trấn an Mr. Otani rằng anh ấy vẫn sẽ **'still in time'** (vẫn kịp giờ) cho cuộc họp. Đây là cách thể hiện sự đảm bảo và trách nhiệm. Các lựa chọn khác: (A) Anh ấy không xin lỗi vì bỏ lỡ cuộc họp (vì vẫn kịp). (C) Anh ấy không hỏi về địa điểm họp. (D) Anh ấy không hủy tham dự; ngược lại, anh ấy khẳng định sẽ kịp."
    },
    {
      id: 58,
      question: "What does Mr. Otani mean when he writes, 'I'll confirm the arrival time'?",
      options: [
        "He will change the meeting time.",
        "He needs to contact the travel agent.",
        "He plans to check the airline's schedule.",
        "He will book another ticket for Mr. Bach."
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'He plans to check the airline's schedule.'** (Anh ấy dự định kiểm tra lịch trình của hãng bay). 'Confirm the arrival time' có nghĩa là xác minh, kiểm tra lại giờ đến chính xác từ nguồn thông tin của hãng hàng không (website, hệ thống) để chắc chắn rằng chuyến bay thực sự sẽ đến lúc 18:00 và không có thay đổi nào khác. Đây là một hành động thận trọng trước khi đi đón. Các lựa chọn khác: (A) Không có ý định thay đổi giờ họp. (B) Không cần liên hệ đại lý du lịch vì thông tin có thể kiểm tra trực tuyến. (D) Không có ý định đặt vé mới."
    },
    {
      id: 59,
      question: "What is implied about Mr. Otani's travel to the airport?",
      options: [
        "He has never been to Naples Airport before.",
        "He expects heavy traffic or limited parking.",
        "He plans to take public transportation.",
        "He works at the airport."
      ],
      correct: 1,
      explanation: "Đáp án đúng là **(B) 'He expects heavy traffic or limited parking.'** (Anh ấy dự đoán giao thông đông đúc hoặc chỗ đậu xe hạn chế). Mr. Otani nói: '**Parking spots can be hard to find**, but now I'll have extra time to drive around and look.' Câu này ngụ ý rằng sân bay Naples thường khó tìm chỗ đậu xe (có thể do đông đúc). Việc chuyến bay đến muộn cho anh ấy thêm thời gian để xoay xở. Các lựa chọn khác: (A) Không có bằng chứng cho thấy đây là lần đầu anh ấy đến sân bay này. (C) Anh ấy nói về việc 'drive around' (lái xe vòng vòng), vậy anh ấy đi bằng ô tô cá nhân, không phải phương tiện công cộng. (D) Không có bằng chứng anh ấy làm việc tại sân bay."
    },
    {
      id: 60,
      question: "What does Mr. Bach express in his final message?",
      options: [
        "Regret about missing the meeting",
        "Request for flight confirmation",
        "Thanks for the help",
        "Frustration with the airline"
      ],
      correct: 2,
      explanation: "Đáp án đúng là **(C) 'Thanks for the help'** (Cảm ơn sự giúp đỡ). Mặc dù không nói trực tiếp 'thank you', thông điệp cuối cùng của Mr. Bach: 'Yes, **sorry about that**. See you then!' bao hàm lời xin lỗi vì sự bất tiện (chuyến bay trễ) và lòng biết ơn ngầm hiểu cho sự giúp đỡ (Mr. Otani đồng ý đón và phải chờ đợi). Trong giao tiếp, 'sorry about that' trong ngữ cảnh này thường hàm chứa cảm ơn. Các lựa chọn khác: (A) Anh ấy không hối tiếc về việc bỏ lỡ cuộc họp vì đã xác nhận vẫn kịp. (B) Anh ấy không yêu cầu xác nhận chuyến bay; Mr. Otani là người đề cập điều đó. (D) Anh ấy có thể bực bội nhưng không bày tỏ trực tiếp sự thất vọng với hãng hàng không trong tin nhắn này."
    }
  ]
}
  }
};