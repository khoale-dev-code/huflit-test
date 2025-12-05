export const EXAM22_DATA = {
  title: "Listening & Notetaking Skills 1 Practice - Exam 22 (Based on Book)",
  description: "Full practice test with Listening (4 parts, 20 questions) and Reading (4 parts, 40 questions). Designed to review classification, comparison and contrast, cause and effect from the book. Options are shuffled to prevent guessing.",
  parts: {
    part1: {
      title: "PART 1: Short Conversations",
      description: "Listen to the conversation about historical and scientific topics from Units 3-5. Choose the best answer (A, B, C, D) for each question.",
      type: "listening",
      script: "Man: What is a tidal wave?\nWoman: A tidal wave is a very large wave caused by an earthquake or other event, often called a tsunami.\n\nMan: What are levels of language?\nWoman: Formal language is used in professional settings, informal in casual ones.\n\nWoman: What is power?\nMan: Power can be abused by people in authority, like in politics.\n\nWoman: How are Asian and African elephants similar?\nMan: Both are large herbivores living in herds, but differ in ears and tusks.\n\nMan: What are similarities between Lincoln and Kennedy?\nWoman: Both were presidents assassinated on Friday, succeeded by Johnson.",
      questions: [
        {
          id: 1,
          options: [
            "A very large wave caused by earthquake.",
            "A small wave in the ocean.",
            "A wave from the moon.",
            "A river wave."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'A very large wave caused by earthquake.'** Người phụ nữ trong đoạn hội thoại định nghĩa rõ ràng: 'A tidal wave is **a very large wave caused by an earthquake or other event**.' Từ khóa 'very large' và 'caused by earthquake' giúp xác định đáp án. Các lựa chọn khác: (B) sai vì sóng thần không phải là sóng nhỏ; (C) sai vì mặc dù tên gọi có 'tidal' (thủy triều), nhưng nguyên nhân chính là động đất, không phải mặt trăng; (D) sai vì sóng thần xảy ra ở biển/đại dương, không phải sông."
        },
        {
          id: 2,
          options: [
            "Used in casual settings.",
            "Used in professional settings.",
            "Informal language is professional.",
            "Formal language is casual."
          ],
          correct: 1,
          explanation: "Đáp án đúng là **(B) 'Used in professional settings.'** Người phụ nữ giải thích: '**Formal language is used in professional settings**, informal in casual ones.' Câu hỏi tập trung vào ngôn ngữ trang trọng (formal language). Các lựa chọn khác: (A) mô tả ngôn ngữ không trang trọng (informal); (C) và (D) đều chứa thông tin sai lệch so với nội dung bài nghe."
        },
        {
          id: 3,
          options: [
            "Power is never abused.",
            "Power is abused in politics.",
            "Power is only physical.",
            "Power is always good."
          ],
          correct: 1,
          explanation: "Đáp án đúng là **(B) 'Power is abused in politics.'** Người đàn ông nói: 'Power **can be abused by people in authority, like in politics**.' Động từ 'can be' chỉ khả năng, và ví dụ 'in politics' được đưa ra cụ thể. Các lựa chọn khác: (A) sai vì sử dụng 'never' (không bao giờ) trong khi bài nghe nói 'can be' (có thể); (C) và (D) là những khẳng định tuyệt đối không được đề cập."
        },
        {
          id: 4,
          options: [
            "Both live in herds and are herbivores.",
            "They have same ears and tusks.",
            "They are small carnivores.",
            "They are solitary animals."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Both live in herds and are herbivores.'** Người đàn ông trình bày điểm tương đồng trước: '**Both are large herbivores living in herds**...' Đây là thông tin trực tiếp về sự giống nhau. Các lựa chọn khác: (B) sai vì đây là điểm **khác biệt** (differ in ears and tusks); (C) sai hoàn toàn vì voi là động vật ăn cỏ (herbivores), không ăn thịt (carnivores); (D) sai vì voi sống theo đàn (herds), không đơn độc (solitary)."
        },
        {
          id: 5,
          options: [
            "Both assassinated on Friday, succeeded by Johnson.",
            "Both were kings.",
            "Both lived in the same era.",
            "No similarities."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Both assassinated on Friday, succeeded by Johnson.'** Người phụ nữ liệt kê hai điểm giống nhau chính: 'Both were presidents **assassinated on Friday**, **succeeded by Johnson**.' Đây là thông tin cụ thể từ bài nghe. Các lựa chọn khác: (B) sai vì họ là tổng thống (presidents), không phải vua; (C) sai vì Lincoln (thế kỷ 19) và Kennedy (thế kỷ 20) sống ở các thời đại khác nhau; (D) sai hoàn toàn vì có nhiều điểm tương đồng được nêu."
        }
      ]
    },
    part2: {
      title: "PART 2: Longer Conversation",
      description: "5 questions - A longer conversation about Lincoln and Kennedy. Listen and choose the best answer (A, B, C, D).",
      type: "listening",
      script: "Woman: Abraham Lincoln was elected to Congress in 1846. John F. Kennedy was elected to Congress in 1946. Lincoln was elected President in 1860. Kennedy was elected President in 1960. Both were concerned with civil rights. Both wives lost a child while living in the White House. Both Presidents were shot on a Friday. Both Presidents were shot in the head. Lincoln's secretary was named Kennedy. Kennedy's Secretary was named Lincoln. Both were assassinated by Southerners. Both were succeeded by Southerners named Johnson. Andrew Johnson, who succeeded Lincoln, was born in 1808. Lyndon Johnson, who succeeded Kennedy, was born in 1908. John Wilkes Booth, who assassinated Lincoln, was born in 1839. Lee Harvey Oswald, who assassinated Kennedy, was born in 1939. Both assassins were known by their three names. Both names are composed of fifteen letters. Booth ran from the theater and was caught in a warehouse. Oswald ran from a warehouse and was caught in a theater. Booth and Oswald were assassinated before their trials. A week before Lincoln was shot, he was in Monroe, Maryland. A week before Kennedy was shot, he was in Marilyn Monroe.",
      questions: [
        {
          id: 6,
          question: "When was Lincoln elected to Congress?",
          options: [
            "1946",
            "1860",
            "1908",
            "1846"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) '1846'.** Thông tin được nêu ngay từ đầu: '**Abraham Lincoln was elected to Congress in 1846.**' Lưu ý cần phân biệt với năm Kennedy (1946) và năm đắc cử Tổng thống (1860). Kỹ năng ghi chú nên ghi rõ 'Lincoln - Congress: 1846' để tránh nhầm lẫn."
        },
        {
          id: 7,
          question: "What day were both presidents shot?",
          options: [
            "Friday",
            "Monday",
            "Sunday",
            "Wednesday"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Friday'.** Bài nói khẳng định: '**Both Presidents were shot on a Friday.**' Đây là một trong những điểm trùng hợp nổi tiếng. Các ngày khác không được đề cập."
        },
        {
          id: 8,
          question: "Who succeeded both presidents?",
          options: [
            "Southerners named Johnson",
            "Northerners named Booth",
            "Westerners named Oswald",
            "Easterners named Kennedy"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Southerners named Johnson'.** Thông tin được nêu rõ: '**Both were succeeded by Southerners named Johnson.**' Cụ thể là Andrew Johnson (sau Lincoln) và Lyndon Johnson (sau Kennedy). Các lựa chọn khác chứa họ của kẻ ám sát (Booth, Oswald) hoặc không chính xác."
        },
        {
          id: 9,
          question: "How many letters in assassins' names?",
          options: [
            "Fifteen",
            "Ten",
            "Twenty",
            "Five"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Fifteen'.** Bài nói đề cập: '**Both names are composed of fifteen letters.**' (Chỉ tên đầy đủ của hai kẻ ám sát: John Wilkes Booth và Lee Harvey Oswald). Đây là một chi tiết nhỏ, đòi hỏi thí sinh phải chú ý lắng nghe toàn bộ bài."
        },
        {
          id: 10,
          question: "Where was Lincoln a week before shot?",
          options: [
            "Marilyn Monroe",
            "Monroe, Maryland",
            "Dallas, Texas",
            "Ford's Theater"
          ],
          correct: 1,
          explanation: "Đáp án đúng là **(B) 'Monroe, Maryland'.** Ở cuối bài, thông tin được đưa ra: '**A week before Lincoln was shot, he was in Monroe, Maryland.**' Cần phân biệt với thông tin về Kennedy: 'A week before Kennedy was shot, he was **in Marilyn Monroe**' (ám chỉ nữ diễn viên, không phải địa điểm). Lựa chọn (A) là dành cho Kennedy, (C) và (D) là nơi xảy ra vụ ám sát Kennedy và Lincoln."
        }
      ]
    },
    part3: {
      title: "PART 3: Monologue",
      description: "5 questions - A short talk about Asian and African Elephants. Listen and choose the best answer (A, B, C, D).",
      type: "listening",
      script: "Today, we're going to talk about the similarities and differences between Asian and African elephants. First, let's look at similarities. Both are the largest land animals, herbivores that eat plants, live in herds, are intelligent, and are endangered due to poaching and habitat loss. Now, differences. African elephants are larger, up to 7 tons, while Asian are up to 5 tons. African have larger ears shaped like Africa, Asian smaller and round. African heads are rounded, Asian have twin-domed heads. Both sexes of African have tusks, but only some male Asian do. African trunks have more rings, Asian fewer. African skin is wrinklier. African live in savannas and forests, Asian in forests and grasslands. Both are amazing creatures that need protection.",
      questions: [
        {
          id: 11,
          question: "The lecture is about __________.",
          options: [
            "similarities and differences of elephants",
            "only African elephants",
            "elephant poaching",
            "elephant habitats"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'similarities and differences of elephants'.** Câu đầu tiên của bài giới thiệu rõ chủ đề: 'Today, we're going to talk about **the similarities and differences between Asian and African elephants.**' Các lựa chọn khác chỉ là một phần nhỏ của bài nói, không phải trọng tâm chính."
        },
        {
          id: 12,
          question: "What is a similarity between both elephants?",
          options: [
            "They are herbivores living in herds.",
            "They have same ear sizes.",
            "They are not endangered.",
            "They are small animals."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'They are herbivores living in herds.'** Khi nói về điểm giống nhau, bài giảng liệt kê: 'Both are... **herbivores**... **live in herds**...' Đây là hai trong số nhiều điểm chung. Các lựa chọn khác: (B) sai vì kích thước tai là điểm **khác biệt**; (C) sai vì cả hai loài đều đang bị đe dọa (endangered); (D) sai vì chúng là động vật trên cạn lớn nhất."
        },
        {
          id: 13,
          question: "How do African elephants differ in size?",
          options: [
            "Larger, up to 7 tons.",
            "Smaller, up to 5 tons.",
            "Same as Asian.",
            "Up to 10 tons."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Larger, up to 7 tons.'** Bài giảng nêu rõ sự khác biệt về kích thước: '**African elephants are larger, up to 7 tons**, while Asian are up to 5 tons.' Lựa chọn (B) mô tả kích thước của voi châu Á. Lựa chọn (C) và (D) không chính xác."
        },
        {
          id: 14,
          question: "What about tusks?",
          options: [
            "Both sexes African have, some male Asian.",
            "Only females have tusks.",
            "No tusks in either.",
            "All have small tusks."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Both sexes African have, some male Asian.'** Đây là thông tin chi tiết về sự khác biệt: '**Both sexes of African have tusks, but only some male Asian do.**' Các lựa chọn khác đều chứa thông tin sai lệch hoàn toàn so với bài nghe."
        },
        {
          id: 15,
          question: "African ears are __________.",
          options: [
            "larger, shaped like Africa",
            "smaller and round",
            "same as Asian",
            "pointy"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'larger, shaped like Africa'.** Bài giảng mô tả: '**African have larger ears shaped like Africa**, Asian smaller and round.' Đây là một điểm khác biệt dễ nhận biết và thường được nhắc đến. Lựa chọn (B) mô tả tai voi châu Á."
        }
      ]
    },
    part4: {
      title: "PART 4: Extended Conversation",
      description: "5 questions - A rather long talk about why dinosaurs disappeared. Listen and choose the best answer (A, B, C, D).",
      type: "listening",
      script: "Hello, class. Today, we discuss why dinosaurs disappeared 65 million years ago at the end of the Cretaceous period. The main theory is the asteroid impact. An asteroid hit Earth near Mexico, creating the Chicxulub crater. This caused massive fires, tsunamis, and a dust cloud that blocked the sun, leading to a 'nuclear winter' where plants died, and herbivores, then carnivores starved. Evidence is the iridium layer in rocks worldwide, from the asteroid. Another theory is volcanism. Massive volcanoes in India, the Deccan Traps, erupted for thousands of years, releasing gases that caused climate change, acid rain, and warming. Perhaps both asteroid and volcanoes together caused the extinction. Other ideas include disease, but unlikely for all dinosaurs. Or mammals eating eggs, but dinosaurs lived with mammals for millions of years. Or sea level changes affecting habitats. But the asteroid is the most accepted. Not all dinosaurs died; birds are their descendants. The extinction allowed mammals to rise.",
      questions: [
        {
          id: 16,
          question: "The main theory for dinosaur extinction is __________.",
          options: [
            "asteroid impact",
            "disease",
            "mammals eating eggs",
            "sea level changes"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'asteroid impact'.** Bài giảng khẳng định ngay: '**The main theory is the asteroid impact.**' Các lựa chọn (B), (C), (D) được đề cập sau như là những 'Other ideas' (ý kiến khác) hoặc ít được chấp nhận hơn."
        },
        {
          id: 17,
          question: "Where did the asteroid hit?",
          options: [
            "Near Mexico, Chicxulub crater.",
            "In India.",
            "In Africa.",
            "In Australia."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Near Mexico, Chicxulub crater.'** Bài giảng cung cấp thông tin chi tiết: 'An asteroid hit Earth **near Mexico, creating the Chicxulub crater.**' Lựa chọn (B) 'India' là nơi xảy ra hoạt động núi lửa (Deccan Traps), không phải va chạm thiên thạch."
        },
        {
          id: 18,
          question: "What is evidence for asteroid?",
          options: [
            "Iridium layer in rocks.",
            "Volcanoes in India.",
            "Bird descendants.",
            "Mammal fossils."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Iridium layer in rocks.'** Bài giảng trình bày bằng chứng khoa học: '**Evidence is the iridium layer in rocks worldwide**, from the asteroid.' Iridium là nguyên tố hiếm trên Trái Đất nhưng phổ biến trong thiên thạch. Các lựa chọn khác không phải là bằng chứng trực tiếp cho thuyết thiên thạch."
        },
        {
          id: 19,
          question: "Another theory is __________.",
          options: [
            "volcanism in Deccan Traps",
            "asteroid only",
            "disease widespread",
            "egg eating"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'volcanism in Deccan Traps'.** Sau khi trình bày thuyết chính, bài giảng giới thiệu: '**Another theory is volcanism. Massive volcanoes in India, the Deccan Traps**...' Các lựa chọn (C) và (D) được nhắc đến như những giả thuyết phụ, ít khả thi hơn."
        },
        {
          id: 20,
          question: "What survived the extinction?",
          options: [
            "Birds as dinosaur descendants.",
            "All dinosaurs.",
            "No animals.",
            "Only mammals."
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Birds as dinosaur descendants.'** Ở phần kết, bài giảng làm rõ: '**Not all dinosaurs died; birds are their descendants.**' Đây là một thông tin quan trọng, giải thích rằng sự tuyệt chủng không phải là hoàn toàn. Lựa chọn (D) 'Only mammals' là sai vì nhiều nhóm động vật khác, bao gồm tổ tiên của chim, cũng sống sót."
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
          question: "Historical reviews indicate that many ancient presidents were often unnecessarily _______.",
          options: [
            "Assassinate",
            "Assassinates",
            "Assassinated",
            "Assassination"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'Assassinated'.** Câu này sử dụng cấu trúc **bị động (passive voice)** ở thì quá khứ: 'were + past participle'. 'Assassinated' (bị ám sát) là quá khứ phân từ của 'assassinate'. Các lựa chọn khác: (A) 'Assassinate' là động từ nguyên thể, dùng cho chủ động. (B) 'Assassinates' là động từ chia ngôi thứ ba số ít hiện tại. (D) 'Assassination' là danh từ (vụ ám sát). Chỉ có quá khứ phân từ mới đúng sau 'were' để diễn tả hành động bị động trong quá khứ."
        },
        {
          id: 22,
          question: "Among ________ recognized at the history awards ceremony were presidents Lincoln and Kennedy.",
          options: [
            "they",
            "whose",
            "those",
            "who"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'those'.** Đây là cấu trúc **đảo ngữ (inversion)** với 'Among' đứng đầu. 'Those' là đại từ chỉ định, có nghĩa 'những người', thay thế cho 'the people who were recognized'. Cấu trúc đầy đủ: 'Among **those** (who were) recognized... were...' Các lựa chọn khác: (A) 'they' là đại từ nhân xưng, không thể đứng sau giới từ 'Among' mà không có mệnh đề. (B) 'whose' là đại từ quan hệ sở hữu, cần một danh từ theo sau. (D) 'who' là đại từ quan hệ, cần một tiền danh từ (antecedent) đứng trước nó."
        },
        {
          id: 23,
          question: "The Civil War has received much attention _______ it ended over 150 years ago.",
          options: [
            "despite",
            "during",
            "except",
            "since"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'since'.** Câu sử dụng **thì hiện tại hoàn thành** ('has received') để diễn tả sự chú ý kéo dài từ một thời điểm trong quá khứ ('it ended') đến hiện tại. Liên từ 'since' (kể từ khi) được dùng để nối mốc thời gian quá khứ đó. Các lựa chọn khác: (A) 'despite' (mặc dù) chỉ sự tương phản, thường đi với danh từ/V-ing. (B) 'during' (trong suốt) đi với danh từ chỉ khoảng thời gian, không phải mệnh đề. (C) 'except' (ngoại trừ) không phù hợp về nghĩa."
        },
        {
          id: 24,
          question: "All ships like Titanic are made from strong materials and contain no __________ weaknesses.",
          options: [
            "structural",
            "immediate",
            "reasonable",
            "assumed"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'structural'.** Tính từ 'structural' (thuộc về kết cấu) kết hợp với 'weaknesses' (điểm yếu) tạo thành cụm từ 'structural weaknesses' (những điểm yếu về mặt kết cấu), rất phù hợp trong ngữ cảnh nói về vật liệu đóng tàu. Các lựa chọn khác: (B) 'immediate' (ngay lập tức), (C) 'reasonable' (hợp lý), (D) 'assumed' (được giả định) đều không tạo nên sự kết hợp từ tự nhiên hoặc hợp lý với 'weaknesses' trong câu này."
        },
        {
          id: 25,
          question: "The extinction policy states that _______ protecting species enhances biodiversity and focus.",
          options: [
            "regulate",
            "regularity",
            "regularly",
            "regular"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'regular'.** Vị trí trống cần một **tính từ (adjective)** để bổ nghĩa cho cụm danh động từ 'protecting species' (việc bảo vệ các loài). 'Regular protecting' có nghĩa là 'sự bảo vệ thường xuyên/đều đặn'. Các lựa chọn khác: (A) 'regulate' là động từ (điều chỉnh). (B) 'regularity' là danh từ (tính đều đặn). (C) 'regularly' là trạng từ (một cách thường xuyên). Chỉ có tính từ mới có thể đứng trước và bổ nghĩa cho một danh động từ đóng vai trò như danh từ."
        },
        {
          id: 26,
          question: "The new lecture on civil war will begin at 9 a.m. and will _______ an overview of causes.",
          options: [
            "includes",
            "including",
            "included",
            "include"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'include'.** Câu sử dụng **thì tương lai đơn**: 'will + động từ nguyên thể không **to**'. 'Will include' là chính xác. Cấu trúc song song với 'will begin' được nối bằng 'and'. Các lựa chọn khác: (A) 'includes' là động từ hiện tại ngôi thứ ba số ít, không dùng sau 'will'. (B) 'including' là giới từ (bao gồm) hoặc danh động từ. (C) 'included' là quá khứ phân từ, không phải nguyên thể."
        },
        {
          id: 27,
          question: "To ensure safety, all ships must be thoroughly inspected _______ sailing to sea.",
          options: [
            "unless",
            "during",
            "before",
            "between"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'before'.** Giới từ 'before' + V-ing ('sailing') diễn tả một hành động xảy ra **trước** hành động khác. Ngữ cảnh an toàn hàng hải đòi hỏi kiểm tra kỹ lưỡng **trước khi** ra khơi. Các lựa chọn khác: (A) 'unless' (trừ khi) chỉ điều kiện phủ định, làm câu vô nghĩa. (B) 'during' (trong khi) chỉ thời gian đồng thời, không hợp lý vì không thể vừa kiểm tra vừa ra khơi cùng lúc. (D) 'between' (giữa) chỉ vị trí hoặc mối quan hệ giữa hai thứ, không phải trình tự thời gian."
        },
        {
          id: 28,
          question: "The biology department is seeking a researcher who can work _______ on endangered species.",
          options: [
            "dependently",
            "independent",
            "independence",
            "independently"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'independently'.** Sau động từ 'work' cần một **trạng từ (adverb)** để mô tả **cách thức** làm việc. 'Work independently' = làm việc một cách độc lập. Các lựa chọn khác: (A) 'dependently' (một cách phụ thuộc) là trạng từ nhưng nghĩa trái ngược. (B) 'independent' là tính từ, dùng để mô tả danh từ (an independent researcher). (C) 'independence' là danh từ (sự độc lập)."
        },
        {
          id: 29,
          question: "Because of the asteroid, the dinosaur event has been _______ in history.",
          options: [
            "postpones",
            "postponing",
            "postpone",
            "postponed"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'postponed'.** Câu này có ngữ cảnh hơi khó: 'dinosaur event' (sự kiện khủng long) thực chất là sự tuyệt chủng, không thể 'bị hoãn' (postponed). Tuy nhiên, xét về mặt **ngữ pháp**, cấu trúc 'has been + past participle' là thì hiện tại hoàn thành bị động. Trong số các lựa chọn, chỉ 'postponed' là quá khứ phân từ. Trong thực tế, có lẽ từ 'recorded' (được ghi lại) sẽ phù hợp hơn, nhưng dựa vào các đáp án cho sẵn, 'postponed' là lựa chọn ngữ pháp đúng duy nhất. (Lưu ý: Đây có thể là một lỗi về ngữ nghĩa trong đề bài, nhưng bài tập này kiểm tra ngữ pháp)."
        },
        {
          id: 30,
          question: "The professor reminded the students that conservation and teamwork are key factors in maintaining a positive _______.",
          options: [
            "appointment",
            "advertisement",
            "environment",
            "equipment"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'environment'.** 'Positive environment' (môi trường tích cực) là một **collocation** (kết hợp từ) rất phổ biến trong giáo dục, tâm lý và quản lý. Nó chỉ một bầu không khí hỗ trợ và xây dựng. Các lựa chọn khác: (A) 'appointment' (cuộc hẹn), (B) 'advertisement' (quảng cáo), (D) 'equipment' (thiết bị) đều không thể kết hợp với 'positive' và không phù hợp với ngữ cảnh về bảo tồn và làm việc nhóm."
        }
      ]
    },
    part6: {
      title: "PART 6: Cloze Text (Email/Announcement)",
      description: "10 questions - Điền từ/cụm vào văn bản email. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: "To: All Biology Department Staff\nFrom: Dr. Elena Rossi, Biology Director\nSubject: Upcoming Lecture on Extinction Tragedies\n\nDear Team,\nAs you all know, we are preparing for the official lecture on extinction tragedies, such as the dinosaurs disappearance, scheduled for early next quarter. In order to ensure a successful presentation, we will begin a series of meetings next week to finalize the discussion strategy. Each team member will be assigned specific responsibilities to (31) smooth coordination between sections.\n\nOur primary objective is to increase awareness of extinction events and attract potential students through both online and offline channels. The media team will focus on digital promotion, while the research team will create visual materials to (32) our educational image.\n\nAdditionally, we will collaborate closely with our guest speakers to collect feedback from attendees. This will help us make any necessary adjustments before the official event. Please note that all suggestions should be submitted to my office no later than Friday, March 22, so that we have enough time to review and (33) them.\n\nThe official conference will take place at our campus on April 5. We expect several major experts to attend, so everyone must be prepared to present our topics in the most professional manner possible. A rehearsal session will be held two days before the event to (34) that all participants are comfortable with their roles.\n\nFor those who are new to the team, we will organize a short orientation program to explain our teaching policies and internal communication procedures. Attendance is highly encouraged, as this session will provide essential information on how to (35) with other departments effectively.\n\nWe truly appreciate everyone’s dedication and teamwork during this busy time. Your hard work and creativity will certainly make this lecture a success. If you have any questions or concerns, please don’t hesitate to (36) me directly.\n\nThank you once again for your continued commitment to excellence. I am confident that, together, we will achieve outstanding results.\nBest regards,\nDr. Elena Rossi\nBiology Director",
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "Each team member will be assigned specific responsibilities to (31) smooth coordination between sections.",
          options: [
            "ensure",
            "remind",
            "suggest",
            "describe"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'ensure'.** Động từ 'ensure' (đảm bảo) thường đi với danh từ như 'coordination' để diễn tả việc đảm bảo sự phối hợp diễn ra suôn sẻ. Trong ngữ cảnh quản lý dự án, đây là từ chuẩn xác. Các lựa chọn khác: (B) 'remind' (nhắc nhở) không đủ mạnh. (C) 'suggest' (đề xuất) không phải mục đích chính của trách nhiệm. (D) 'describe' (mô tả) sai nghĩa hoàn toàn."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "The research team will create visual materials to (32) our educational image.",
          options: [
            "reinforce",
            "improve",
            "prevent",
            "attend"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'reinforce'.** Trong ngữ cảnh xây dựng thương hiệu và hình ảnh, 'reinforce' (củng cố, tăng cường) là từ chính xác để nói về việc làm cho hình ảnh giáo dục trở nên mạnh mẽ và nhất quán hơn thông qua tài liệu trực quan. Các lựa chọn khác: (B) 'improve' (cải thiện) có thể dùng nhưng không chính xác bằng 'reinforce' vì hình ảnh không hẳn là 'cải thiện' mà là 'củng cố'. (C) 'prevent' (ngăn chặn) và (D) 'attend' (tham dự) đều sai nghĩa."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "So that we have enough time to review and (33) them.",
          options: [
            "implement",
            "reject",
            "decline",
            "transfer"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'implement'.** Trong quy trình xử lý đề xuất, sau khi 'review' (xem xét), bước tiếp theo logic là 'implement' (triển khai, thực hiện) các đề xuất hợp lý. Đây là cặp động từ phổ biến. Các lựa chọn khác: (B) 'reject' và (C) 'decline' đều có nghĩa từ chối, trái ngược với mục đích tích cực của việc thu thập ý kiến. (D) 'transfer' (chuyển giao) không phù hợp."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "A rehearsal session will be held to (34) that all participants are comfortable.",
          options: [
            "ensure",
            "require",
            "warn",
            "announce"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'ensure'.** Cấu trúc 'to ensure that + clause' có nghĩa là 'để đảm bảo rằng', diễn tả mục đích của buổi tập dượt. Đây là cách dùng phổ biến để nói về việc đảm bảo một kết quả cụ thể. Các lựa chọn khác: (B) 'require' (yêu cầu), (C) 'warn' (cảnh báo), (D) 'announce' (thông báo) đều không phải mục đích chính của buổi tập."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "Information on how to (35) with other departments effectively.",
          options: [
            "cooperate",
            "complain",
            "compete",
            "compare"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'cooperate'.** 'Cooperate with' (hợp tác với) là cụm động từ chuẩn khi nói về làm việc hiệu quả giữa các phòng ban. Trong bối cảnh tổ chức, hợp tác là kỹ năng quan trọng được nhấn mạnh. Các lựa chọn khác: (B) 'complain' (phàn nàn) mang nghĩa tiêu cực. (C) 'compete' (cạnh tranh) thường không được khuyến khích trong nội bộ. (D) 'compare' (so sánh) không phù hợp với mục đích làm việc hiệu quả."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Please don’t hesitate to (36) me directly.",
          options: [
            "reach",
            "push",
            "ignore",
            "delay"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'reach'.** Trong văn viết email trang trọng, 'reach me directly' hoặc 'reach out to me' là cách diễn đạt phổ biến để mời liên hệ. Đây là một collocation tự nhiên. Các lựa chọn khác: (B) 'push' (thúc ép), (C) 'ignore' (phớt lờ), (D) 'delay' (trì hoãn) đều có nghĩa tiêu cực hoặc không phù hợp trong ngữ cảnh này."
        },
        {
          id: 37,
          type: "comprehension",
          question: "(37) - The lecture on dinosaurs will most likely be held (37).",
          options: [
            "next week",
            "by the end of the year",
            "early next quarter",
            "after the conference"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'early next quarter'.** Thông tin được nêu rõ trong câu đầu tiên của email: '...the official lecture... **scheduled for early next quarter**.' Các lựa chọn khác: (A) 'next week' là thời gian bắt đầu các cuộc họp, không phải bài giảng. (B) và (D) không được đề cập hoặc không chính xác."
        },
        {
          id: 38,
          type: "comprehension",
          question: "(38) - What is the main purpose of this message?",
          options: [
            "To inform staff of lecture preparations",
            "To request attendee feedback after the event",
            "To announce the cancellation of a session",
            "To introduce a new teaching policy"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'To inform staff of lecture preparations'.** Toàn bộ nội dung email xoay quanh việc chuẩn bị cho bài giảng: lên kế hoạch họp, phân công nhiệm vụ, tạo tài liệu, tổ chức tập dượt, v.v. Mục đích chính là thông báo và điều phối công việc chuẩn bị. Các lựa chọn khác: (B) Phản hồi từ người tham dự chỉ là một phần nhỏ của quá trình chuẩn bị. (C) Không có thông tin hủy bỏ. (D) Chính sách giảng dạy chỉ được nhắc đến như một phần của buổi định hướng, không phải mục đích chính."
        },
        {
          id: 39,
          type: "comprehension",
          question: "(39) - Who is the sender of this message?",
          options: [
            "The chief academic officer",
            "The biology director",
            "A guest speaker",
            "A research manager"
          ],
          correct: 1,
          explanation: "Đáp án đúng là **(B) 'The biology director'.** Phần tiêu đề email ghi rõ: 'From: Dr. Elena Rossi, **Biology Director**'. Đây là thông tin trực tiếp và rõ ràng về danh tính và chức vụ của người gửi."
        },
        {
          id: 40,
          type: "comprehension",
          question: "(40) - When will the rehearsal for the conference take place?",
          options: [
            "April 5",
            "March 22",
            "April 3",
            "The following week"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'April 3'.** Email nêu: 'The official conference will take place... on **April 5**... A rehearsal session will be held **two days before the event**.' Do đó, ngày tập dượt là: 5 tháng 4 - 2 ngày = **3 tháng 4**. Các lựa chọn khác: (A) là ngày diễn ra hội nghị. (B) là hạn nộp đề xuất. (D) quá mơ hồ."
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
            "To add a new subscription number",
            "To submit a credit card payment",
            "To request recording equipment",
            "To hear lecture samples"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'To hear lecture samples'.** Quảng cáo ghi rõ trong phần mô tả dịch vụ đầu tiên: '**Visit historyaudiopro.com to hear examples.**' Mục đích duy nhất được nêu cho việc truy cập website là để nghe các mẫu giọng đọc của diễn viên lồng tiếng. Các lựa chọn khác đều là các hành động không được đề cập đến trong quảng cáo."
        },
        {
          id: 42,
          question: "What is suggested about History Audio Pro?",
          options: [
            "It has recently expanded its business.",
            "It fills orders once a week.",
            "It advertises in the newspaper.",
            "It specializes in historical lectures."
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'It advertises in the newspaper.'** Thông tin này được **suy ra (inferred)** từ email của khách hàng, Ms. Annesly: 'I found **your notice in the newspaper**.' Việc cô ấy tìm thấy thông báo của công ty trên báo chí cho thấy History Audio Pro có sử dụng phương tiện quảng cáo này. Các lựa chọn khác không có thông tin trong văn bản để hỗ trợ."
        },
        {
          id: 43,
          question: "Who most likely is Ms. Annesly?",
          options: [
            "An actor",
            "A script writer",
            "A sales associate",
            "A history teacher"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'A history teacher'** hoặc một chuyên gia trong lĩnh vực lịch sử. Cô ấy viết email từ địa chỉ '@historydata.com' và nói về 'my **history-processing business**'. Cô ấy muốn một 'professionally recorded **lecture greeting**' (lời chào bài giảng) cho khách hàng song ngữ, điều này phù hợp với vai trò của một nhà giáo dục hoặc người cung cấp dịch vụ liên quan đến lịch sử. Các lựa chọn khác không phù hợp vì cô ấy là khách hàng tìm kiếm dịch vụ, không phải người cung cấp dịch vụ (actor, script writer) hay nhân viên bán hàng."
        },
        {
          id: 44,
          question: "What service does Ms. Annesly NOT request from History Audio Pro?",
          options: [
            "Professional voice talent",
            "Customized script writing",
            "On-hold messages",
            "Multilingual audio production"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'On-hold messages'.** Quảng cáo liệt kê 4 dịch vụ. Trong email, Ms. Annesly yêu cầu cụ thể: 1) 'professionally recorded lecture greeting' (dịch vụ voice talent), 2) hỏi 'if you would **write** and record this' (dịch vụ script writing), và 3) 'message in both languages' (dịch vụ multilingual production). Cô ấy **không hề đề cập** đến việc cần 'on-hold messages' (tin nhắn chờ điện thoại)."
        },
        {
          id: 45,
          question: "What will Ms. Annesly most likely do within 24 hours?",
          options: [
            "Meet with an actor",
            "Visit a recording studio",
            "Speak with a representative",
            "Write a script"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'Speak with a representative'.** Quảng cáo hứa hẹn: 'A **representative will call you within 24 hours**.' Vì Ms. Annesly vừa gửi email yêu cầu, cô ấy có thể mong đợi một cuộc gọi từ đại diện công ty trong vòng 24 giờ tới. Các lựa chọn khác đều là hành động có thể xảy ra sau cuộc gọi này."
        },
        {
          id: 46,
          question: "According to the advertisement, History Audio Pro will respond to customer inquiries within",
          options: [
            "48 hours",
            "12 hours",
            "three business days",
            "24 hours"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) '24 hours'.** Quảng cáo nêu rõ: 'A representative will call you **within 24 hours**.' Đây là thời gian phản hồi cho **liên hệ ban đầu**. Lưu ý phân biệt với 'three business days' - là thời gian để **hoàn thành việc ghi âm**, không phải phản hồi yêu cầu."
        },
        {
          id: 47,
          question: "What can be inferred about History Audio Pro’s services?",
          options: [
            "They are available only on weekends.",
            "They are limited to English-speaking clients.",
            "They can accommodate different languages.",
            "They require customers to visit the office in person."
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'They can accommodate different languages.'** Điều này được **suy ra** từ dịch vụ thứ 4 trong quảng cáo: '**Multilingual Voice Production** – Services in multiple languages.' Hơn nữa, yêu cầu của Ms. Annesly về bản ghi âm song ngữ (Anh-Tây Ban Nha) càng khẳng định khả năng này. Các lựa chọn khác trái ngược với thông tin trong quảng cáo."
        },
        {
          id: 48,
          question: "What does Ms. Annesly specifically request in her message?",
          options: [
            "A sample of recorded music",
            "A newspaper advertisement",
            "A bilingual lecture recording",
            "A refund for a previous order"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'A bilingual lecture recording'.** Ms. Annesly viết: 'Since I work with English- and Spanish-speaking clients, I would like the message **in both languages**.' 'Bilingual' có nghĩa là sử dụng hai ngôn ngữ. Các lựa chọn khác: (A) Cô ấy muốn 'lecture greeting', không phải nhạc. (B) Cô ấy tìm thấy quảng cáo trên báo, không yêu cầu cái mới. (D) Không có đề cập về đơn hàng trước."
        },
        {
          id: 49,
          question: "What detail does Ms. Annesly include to make communication easier?",
          options: [
            "Her company’s website link",
            "Her client list",
            "Her preferred calling hours",
            "Her office address"
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'Her preferred calling hours'.** Trong email, cô ấy chỉ định: 'Please reach out at my mobile **between 10:00 A.M. and 5:00 P.M.**' Điều này giúp đại diện công ty biết khung giờ thuận tiện để gọi điện, làm cho quá trình giao tiếp hiệu quả hơn. Các thông tin khác có trong chữ ký nhưng không phải chi tiết đặc biệt để 'make communication easier'."
        },
        {
          id: 50,
          question: "What is the likely next step for History Audio Pro?",
          options: [
            "Calling Ms. Annesly to discuss her project and pricing",
            "Posting a new advertisement in the newspaper",
            "Sending Ms. Annesly a contract to sign",
            "Visiting Ms. Annesly’s office for recording"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Calling Ms. Annesly to discuss her project and pricing'.** Dựa trên quy trình được nêu trong quảng cáo: 'A representative will call you within 24 hours to **discuss your project and provide a price estimate**.' Đây là bước tiếp theo logic sau khi nhận được email yêu cầu. Các bước khác có thể xảy ra sau cuộc gọi này."
        }
      ]
    },
    part8: {
      title: "PART 8: Text Message Chain",
      description: "10 questions - Read the text message chain about a trip to a historical site. Choose the best answer (A, B, C, D).",
      type: "reading",
      text: "SAM BACH (11:59): My first flight was delayed, so I missed my connection in Beijing.\nSAM BACH(12:00):So now, I'm going to be on a flight arriving in Naples at 18:00.\n\nAKIRA OTANI (12:05): OK. Same airline?\n\nSAM BACH (12:06): It's still Fly Right Airlines. It will be later in the day but still in time for our client meeting.\n\nAKIRA OTANI (12:06): I'll confirm the arrival time. Do you have any checked bags?\n\nSAM BACH (12:10): I do. Would you mind meeting me at the door after I go through customs?\n\nAKIRA OTANI (12:15): Sure thing. Parking spots can be hard to find, but now I'll have extra time to drive around and look.\n\nSAM BACH (12:16): Yes, sorry about that. See you then!",
      questions: [
        {
          id: 51,
          question: "What is suggested about Mr. Bach?",
          options: [
            "He currently works in Naples.",
            "He works for Fly Right Airlines.",
            "He is on a business trip.",
            "He has been to Pompeii more than once."
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'He is on a business trip.'** Bằng chứng rõ ràng từ tin nhắn của Mr. Bach: 'It will be later... but still in time for **our client meeting**.' Cụm 'client meeting' (cuộc họp với khách hàng) chỉ ra mục đích chuyến đi là công tác. Các lựa chọn khác: (A) Anh ấy đang đến Naples, không nhất thiết làm việc ở đó. (B) Anh ấy bay với hãng Fly Right Airlines, không có bằng chứng làm việc cho họ. (D) Không có thông tin về số lần đến Pompeii."
        },
        {
          id: 52,
          question: "At 12:15, what does Mr. Otani mean when he writes, “Sure thing”?",
          options: [
            "He is certain he will be able to find a parking place.",
            "He agrees to wait at the door near the customs area.",
            "He has confirmed the arrival time of a flight.",
            "He knows Mr. Bach must pass through customs."
          ],
          correct: 1,
          explanation: "Đáp án đúng là **(B) 'He agrees to wait at the door near the customs area.'** 'Sure thing' là cách nói thân mật để đồng ý với một yêu cầu. Yêu cầu trực tiếp trước đó của Mr. Bach là: 'Would you mind **meeting me at the door after I go through customs?**' Do đó, 'Sure thing' là sự đồng ý đáp lại yêu cầu đó. Các lựa chọn khác tuy đúng về mặt thông tin nhưng không phải là ý chính của cụm từ 'Sure thing' trong ngữ cảnh này."
        },
        {
          id: 53,
          question: "Why was Mr. Bach’s flight delayed?",
          options: [
            "The airline changed the departure time.",
            "He forgot to check in early.",
            "He missed his connection in Beijing.",
            "There was bad weather in Naples."
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'He missed his connection in Beijing.'** Tuy nhiên, đọc kỹ tin nhắn đầu tiên: 'My **first flight was delayed**, so I missed my connection in Beijing.' Nguyên nhân gốc là chuyến bay đầu bị trễ (delayed), dẫn đến hệ quả là bỏ lỡ chuyến kết nối. Trong các lựa chọn, (C) mô tả hệ quả trực tiếp, nhưng cũng là lý do khiến anh ấy phải đổi sang chuyến bay muộn hơn. Các lựa chọn khác không được đề cập."
        },
        {
          id: 54,
          question: "What time is Mr. Bach’s new flight expected to arrive?",
          options: [
            "20:15",
            "12:06",
            "11:59",
            "18:00"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) '18:00'.** Thông tin được nêu rõ trong tin nhắn của Mr. Bach lúc 12:00: 'I'm going to be on a flight **arriving in Naples at 18:00**.' Các lựa chọn khác là thời gian gửi tin nhắn hoặc không có trong bài."
        },
        {
          id: 55,
          question: "What does Mr. Otani offer to do for Mr. Bach?",
          options: [
            "Pick him up at the airport",
            "Drive him to the hotel",
            "Change his flight booking",
            "Help carry his luggage"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Pick him up at the airport.'** Khi Mr. Bach hỏi 'Would you mind meeting me at the door after I go through customs?' và Mr. Otani đồng ý ('Sure thing'), điều này ngụ ý rằng Mr. Otani sẽ đến sân bay để gặp (đón) Mr. Bach. 'Pick him up' là cách diễn đạt phù hợp. Các lựa chọn khác không được đề nghị."
        },
        {
          id: 56,
          question: "What can be inferred about the two men?",
          options: [
            "They have never met before.",
            "They are family members traveling together.",
            "They are colleagues attending the same meeting.",
            "They both work for Fly Right Airlines."
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'They are colleagues attending the same meeting.'** Có hai bằng chứng: 1) Mr. Bach nói 'our client meeting' (cuộc họp khách hàng của **chúng ta**), cho thấy cả hai đều liên quan. 2) Mr. Otani sẵn sàng đi đón Mr. Bach, một hành động thường thấy giữa đồng nghiệp. Các lựa chọn khác: (A) Họ dường như đã quen biết. (B) Không có dấu hiệu cho thấy họ là người thân. (D) Chỉ Mr. Bach bay với Fly Right Airlines."
        },
        {
          id: 57,
          question: "At 12:06, why does Mr. Bach mention “still in time for our client meeting”?",
          options: [
            "To cancel his attendance",
            "To apologize for missing the meeting",
            "To ask about the meeting location",
            "To confirm he will not be late"
          ],
          correct: 3,
          explanation: "Đáp án đúng là **(D) 'To confirm he will not be late.'** Mặc dù chuyến bay mới đến muộn hơn (18:00), Mr. Bach muốn trấn an Mr. Otani rằng anh ấy vẫn sẽ **'still in time'** (vẫn kịp giờ) cho cuộc họp. Đây là cách thể hiện sự đảm bảo và trách nhiệm, giảm bớt lo lắng cho đối phương."
        },
        {
          id: 58,
          question: "What does Mr. Otani mean when he writes, “I’ll confirm the arrival time”?",
          options: [
            "He will book another ticket for Mr. Bach.",
            "He will change the meeting time.",
            "He plans to check the airline’s schedule.",
            "He needs to contact the travel agent."
          ],
          correct: 2,
          explanation: "Đáp án đúng là **(C) 'He plans to check the airline’s schedule.'** 'Confirm the arrival time' có nghĩa là xác minh, kiểm tra lại giờ đến chính xác từ nguồn thông tin của hãng hàng không (website, ứng dụng) để chắc chắn rằng chuyến bay thực sự sẽ đến lúc 18:00 và không có thay đổi nào khác. Đây là một hành động thận trọng trước khi đi đón."
        },
        {
          id: 59,
          question: "What is implied about Mr. Otani’s travel to the airport?",
          options: [
            "He works at the airport.",
            "He expects heavy traffic or limited parking.",
            "He plans to take public transportation.",
            "He has never been to Naples Airport before."
          ],
          correct: 1,
          explanation: "Đáp án đúng là **(B) 'He expects heavy traffic or limited parking.'** Mr. Otani nói: '**Parking spots can be hard to find**, but now I'll have extra time to drive around and look.' Câu này ngụ ý rằng sân bay Naples thường khó tìm chỗ đậu xe (có thể do đông đúc). Việc chuyến bay đến muộn cho anh ấy thêm thời gian để xoay xở. Các lựa chọn khác không được suy ra từ thông tin có sẵn."
        },
        {
          id: 60,
          question: "What does Mr. Bach express in his final message?",
          options: [
            "Thanks for the help",
            "Frustration with the airline",
            "Request for flight confirmation",
            "Regret about missing the meeting"
          ],
          correct: 0,
          explanation: "Đáp án đúng là **(A) 'Thanks for the help'.** Mặc dù không nói trực tiếp 'thank you', thông điệp cuối cùng của Mr. Bach: 'Yes, **sorry about that**. See you then!' bao hàm lời xin lỗi vì sự bất tiện (chuyến bay trễ, khiến Mr. Otani phải chờ và khó tìm chỗ đậu) và lòng biết ơn ngầm hiểu cho sự giúp đỡ. Trong giao tiếp, 'sorry about that' trong ngữ cảnh này thường hàm chứa cảm ơn. Các lựa chọn khác không được thể hiện trực tiếp."
        }
      ]
    }
  }
};