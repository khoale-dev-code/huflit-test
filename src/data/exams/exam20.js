export const EXAM20_DATA = {
    title: "HUFLIT Listening & Reading Practice - Exam 20 (Dựa trên Listening & Notetaking Skills - Advanced)",
    description: "Bộ đề thi nâng cao với nội dung học thuật chuyên sâu, tập trung vào kỹ năng nghe hiểu bài giảng dài, ghi chú hiệu quả và đọc hiểu văn bản phức tạp. Cấu trúc: Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu).",
    parts: {
        // ========== LISTENING SECTIONS ==========
        part1: {
            title: "PART 1: Academic Conversation (Science)",
            description: "Nghe đoạn hội thoại giữa hai sinh viên về một bài giảng môn Vật lý Lượng tử. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
            type: "listening",
            script: `Doctor Chen: ...and that concludes our discussion on the double-slit experiment. Any questions before we move to quantum entanglement?

Student 1: Professor, could you clarify something about the observer effect? You mentioned that the act of measurement changes the outcome, but I'm not clear on why.

Doctor Chen: Excellent question. In classical physics, we assume we can observe something without disturbing it. But at the quantum level, the systems are so sensitive that the measurement apparatus interacts with the system in a fundamental way. It's not just about 'looking' - it's about the physical interaction required to obtain information. For instance, to measure the position of an electron, you need to bounce photons off it, which transfers momentum and changes its state.

Student 2: So it's like trying to measure the temperature of a drop of water with a giant thermometer that absorbs all the heat?

Doctor Chen: That's a good analogy, yes. The measuring device is too 'large' relative to the system being measured. Now, regarding quantum entanglement - this is when two particles become linked so that the state of one instantly influences the state of the other, regardless of distance. Einstein called this 'spooky action at a distance'. It challenges our classical understanding of locality.

Student 1: And this has been experimentally verified?

Doctor Chen: Absolutely. Numerous experiments since the 1980s, particularly with photons, have confirmed entanglement beyond any reasonable doubt. It's not just theory - it's the basis for emerging technologies like quantum computing and quantum cryptography. For your reading this week, I want you to focus on the Alain Aspect experiments from 1982. They're groundbreaking.

Student 2: Will the midterm exam cover entanglement?

Doctor Chen: Yes, everything up to and including today's lecture will be on the midterm. But more importantly, I want you to understand the conceptual shift from classical to quantum thinking. It's not about memorizing equations - it's about embracing counterintuitive reality.`,
            questions: [
                {
                    id: 1,
                    question: "What is the main topic of the lecture segment?",
                    options: [
                        "Classical Newtonian physics",
                        "The double-slit experiment and quantum entanglement",
                        "Thermodynamics and heat transfer",
                        "The history of physics"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'The double-slit experiment and quantum entanglement.' Giáo sư kết thúc phần double-slit experiment và chuyển sang quantum entanglement: '...concludes our discussion on the double-slit experiment. Any questions before we move to quantum entanglement?' Cả hai chủ đề này đều được thảo luận trong đoạn."
                },
                {
                    id: 2,
                    question: "According to Doctor Chen, why does measurement change quantum systems?",
                    options: [
                        "Because scientists are not careful enough",
                        "Because the measurement device physically interacts with the system",
                        "Because quantum particles are intentionally deceptive",
                        "Because of errors in mathematical calculations"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Because the measurement device physically interacts with the system.' Doctor Chen giải thích: 'the measurement apparatus interacts with the system in a fundamental way... to measure the position of an electron, you need to bounce photons off it, which transfers momentum and changes its state.' Đây là lý do cốt lõi của hiệu ứng quan sát trong cơ học lượng tử."
                },
                {
                    id: 3,
                    question: "What analogy does Student 2 use to understand the observer effect?",
                    options: [
                        "Measuring ocean temperature with a small thermometer",
                        "Trying to measure a drop of water with a giant thermometer",
                        "Weighing a feather with heavy scales",
                        "Timing a race with a slow watch"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Trying to measure a drop of water with a giant thermometer.' Student 2 nói: 'So it's like trying to measure the temperature of a drop of water with a giant thermometer that absorbs all the heat?' Doctor Chen xác nhận đây là một phép loại suy tốt."
                },
                {
                    id: 4,
                    question: "What did Einstein call quantum entanglement?",
                    options: [
                        "A mathematical error",
                        "Spooky action at a distance",
                        "Impossible physics",
                        "The future of technology"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Spooky action at a distance.' Doctor Chen nói: 'Einstein called this 'spooky action at a distance'.' Đây là cụm từ nổi tiếng mà Einstein dùng để chỉ sự không cục bộ trong vướng víu lượng tử."
                },
                {
                    id: 5,
                    question: "What does Doctor Chen emphasize as most important for students to understand?",
                    options: [
                        "Memorizing all quantum equations",
                        "The conceptual shift from classical to quantum thinking",
                        "The biography of famous physicists",
                        "How to build quantum computers"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'The conceptual shift from classical to quantum thinking.' Ở cuối bài giảng, Doctor Chen nói: 'I want you to understand the conceptual shift from classical to quantum thinking. It's not about memorizing equations - it's about embracing counterintuitive reality.' Đây là trọng tâm giáo dục của ông."
                }
            ]
        },

        part2: {
            title: "PART 2: Academic Discussion (Research Ethics)",
            description: "Nghe đoạn thảo luận giữa ba sinh viên cao học về đạo đức nghiên cứu. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "listening",
            script: `Professor: Welcome to our graduate seminar on research ethics. Today we're discussing the infamous Tuskegee Syphilis Study. Linda, could you start by summarizing the basic facts?

Linda: Sure. From 1932 to 1972, the U.S. Public Health Service conducted a study on untreated syphilis in African American men in Alabama. The participants were told they were receiving free healthcare, but they were actually being observed without treatment, even after penicillin became the standard cure in 1947.

Trang: What's particularly disturbing is the deception involved. Researchers actively prevented participants from accessing treatment elsewhere. They even arranged with the military to draft-dodge participants so they couldn't leave the study.

Professor: Exactly. And this wasn't an isolated case. It reflected systemic issues in research ethics at the time. Alex, what were the major ethical violations according to contemporary standards?

Alex: Well, first, lack of informed consent - participants didn't know the true nature of the study. Second, harm and exploitation - researchers knowingly withheld effective treatment. Third, justice - targeting a vulnerable population. And fourth, respect for persons - treating them as means to an end rather than as autonomous individuals.

Linda: The aftermath led to major changes though, right? The Belmont Report in 1979 established three core principles: respect for persons, beneficence, and justice.

Professor: Correct. And those principles form the basis of modern Institutional Review Boards. But here's a critical thinking question: Could a study like Tuskegee happen today? Trang?

Trang: Not in the same blatant form, but ethical challenges persist. Consider pharmaceutical trials in developing countries where participants might not fully understand consent forms, or where standard of care differs dramatically from Western countries.

Alex: Or big data research where 'informed consent' becomes a checkbox on a terms-of-service agreement that no one reads. The scale and opacity create new ethical dilemmas.

Professor: Excellent points. For next week, I want you to read about the Henrietta Lacks case - another landmark in research ethics. Consider how issues of consent and compensation have evolved.`,
            questions: [
                {
                    id: 6,
                    question: "What was the Tuskegee Study about?",
                    options: [
                        "Testing new syphilis treatments",
                        "Observing untreated syphilis in African American men",
                        "Vaccine development for syphilis",
                        "Genetic factors in disease resistance"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Observing untreated syphilis in African American men.' Linda tóm tắt: 'the U.S. Public Health Service conducted a study on untreated syphilis in African American men.' Điểm then chốt là 'untreated' - họ quan sát bệnh tiến triển mà không điều trị."
                },
                {
                    id: 7,
                    question: "According to Trang, how did researchers prevent participants from leaving the study?",
                    options: [
                        "By paying them large sums of money",
                        "By arranging with the military to draft-dodge them",
                        "By threatening legal action",
                        "By providing false medical certificates"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'By arranging with the military to draft-dodge them.' Trang nói: 'They even arranged with the military to draft-dodge participants so they couldn't leave the study.' Đây là một trong những hành vi lừa dối và kiểm soát tàn nhẫn nhất của nghiên cứu."
                },
                {
                    id: 8,
                    question: "Which of the following is NOT listed as an ethical violation in the Tuskegee Study?",
                    options: [
                        "Lack of informed consent",
                        "Withholding effective treatment",
                        "Targeting vulnerable populations",
                        "Destroying medical records"
                    ],
                    correct: 3,
                    explanation: "Đáp án đúng là (D) 'Destroying medical records.' Alex liệt kê bốn vi phạm đạo đức: 1) lack of informed consent, 2) harm and exploitation (withholding treatment), 3) justice (targeting vulnerable population), 4) respect for persons. Việc hủy hồ sơ y tế không được đề cập trong danh sách này."
                },
                {
                    id: 9,
                    question: "What document established the three core principles of research ethics in 1979?",
                    options: [
                        "The Nuremberg Code",
                        "The Declaration of Helsinki",
                        "The Belmont Report",
                        "The Tuskegee Apology"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'The Belmont Report.' Linda nói: 'The Belmont Report in 1979 established three core principles: respect for persons, beneficence, and justice.' Đây là tài liệu nền tảng cho đạo đức nghiên cứu hiện đại ở Mỹ."
                },
                {
                    id: 10,
                    question: "What case will the class discuss next week?",
                    options: [
                        "The Stanford Prison Experiment",
                        "The Milgram Obedience Study",
                        "The Henrietta Lacks case",
                        "The Pfizer vaccine trials"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'The Henrietta Lacks case.' Professor nói: 'For next week, I want you to read about the Henrietta Lacks case - another landmark in research ethics.' Đây là một trường hợp nổi tiếng về vấn đề đồng ý và bồi thường trong nghiên cứu y sinh."
                }
            ]
        },

        part3: {
            title: "PART 3: Academic Lecture Excerpt (Economics)",
            description: "Nghe trích đoạn bài giảng về Kinh tế học Hành vi. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "listening",
            script: `Professor: Traditional economic theory assumes humans are rational actors who maximize utility. But behavioral economics, pioneered by psychologists like Daniel Kahneman and Amos Tversky, challenges this. They introduced prospect theory, which shows how people actually make decisions under risk.The key insight is loss aversion: losses loom larger than gains. Psychologically, losing $100 feels about twice as bad as winning $100 feels good. This asymmetry explains many real-world behaviors that traditional economics can't.For example, why do people hold onto losing stocks too long? Because realizing the loss is painful. Why are people more likely to buy insurance when it's framed as 'avoiding a loss' rather than 'gaining security'? Loss aversion.Another concept is the endowment effect: people value things more highly simply because they own them. In experiments, participants demanded much more money to give up a mug they'd just received than they were willing to pay to acquire the same mug.Now, here's where it gets really interesting for public policy. Richard Thaler's nudge theory suggests we can design choices - choice architecture - to help people make better decisions without restricting freedom. For instance, making retirement savings opt-out rather than opt-in dramatically increases participation rates.But this raises ethical questions. Who decides what's 'better'? Is nudging paternalistic? These are debates we'll explore next week. For now, remember: humans aren't perfectly rational calculators. We're predictably irrational, and understanding these patterns is crucial for everything from marketing to policymaking.`,
            questions: [
                {
                    id: 11,
                    question: "What does traditional economic theory assume about humans?",
                    options: [
                        "They are emotional and unpredictable",
                        "They are rational actors who maximize utility",
                        "They are easily influenced by others",
                        "They avoid all risks"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'They are rational actors who maximize utility.' Giáo sư mở đầu: 'Traditional economic theory assumes humans are rational actors who maximize utility.' Đây là giả định cơ bản của kinh tế học truyền thống mà kinh tế học hành vi phản bác."
                },
                {
                    id: 12,
                    question: "According to prospect theory, how do losses compare to gains psychologically?",
                    options: [
                        "Gains feel much worse than losses",
                        "Losses and gains feel exactly the same",
                        "Losses loom larger than gains",
                        "People don't notice small losses"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'Losses loom larger than gains.' Giáo sư giải thích: 'The key insight is loss aversion: losses loom larger than gains. Psychologically, losing $100 feels about twice as bad as winning $100 feels good.' Đây là nguyên lý cốt lõi của prospect theory."
                },
                {
                    id: 13,
                    question: "What behavioral concept explains why people hold onto losing stocks too long?",
                    options: [
                        "The endowment effect",
                        "Loss aversion",
                        "Nudge theory",
                        "Rational calculation"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Loss aversion.' Giáo sư đưa ra ví dụ: 'For example, why do people hold onto losing stocks too long? Because realizing the loss is painful.' Đây chính là biểu hiện của loss aversion - né tránh tổn thất."
                },
                {
                    id: 14,
                    question: "What is the endowment effect?",
                    options: [
                        "Valuing things more because you own them",
                        "Preferring new things over old ones",
                        "Underestimating the value of your possessions",
                        "Sharing resources equally"
                    ],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'Valuing things more because you own them.' Giáo sư định nghĩa: 'Another concept is the endowment effect: people value things more highly simply because they own them.'"
                },
                {
                    id: 15,
                    question: "What ethical question does nudge theory raise?",
                    options: [
                        "Whether it's too expensive to implement",
                        "Whether it's mathematically sound",
                        "Whether it's paternalistic",
                        "Whether it violates international law"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'Whether it's paternalistic.' Giáo sư nêu lên vấn đề đạo đức: 'But this raises ethical questions. Who decides what's 'better'? Is nudging paternalistic?' Đây là tranh luận chính về đạo đức của nudge theory."
                }
            ]
        },

        part4: {
            title: "PART 4: Extended Academic Conversation",
            description: "Nghe cuộc trò chuyện mở rộng giữa sinh viên và giáo sư hướng dẫn. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "listening",
            script: `Student: Professor Rivera, thank you for meeting with me about my thesis proposal. I'm having trouble narrowing my research question on climate change communication.

Professor: Of course, Emma. Let's look at your draft. "Public perception of climate change" is certainly broad. What specific angle interests you?

Emma: Well, I'm fascinated by how framing affects perception. Like, does calling it "global warming" versus "climate change" or "climate crisis" change how people respond?

Professor: Excellent focus. That's a manageable research question with clear variables. You could design an experiment with different framings and measure attitudes, behavioral intentions, even neural responses if you have fMRI access.

Emma: I was thinking of a survey experiment first, maybe through Amazon Mechanical Turk. But I worry about sample representativeness.

Professor: Valid concern. MTurk samples skew young, educated, and liberal. For climate change research, that could bias results. You might want to supplement with a nationally representative sample or at least acknowledge the limitation upfront.

Emma: That makes sense. What about methodology? Should I use a between-subjects or within-subjects design?

Professor: For framing effects, between-subjects is usually better to avoid demand characteristics. If the same person sees all framings, they might guess what you're studying. Randomly assign participants to see one framing only.

Emma: And for measurement - I was thinking of using the Six Americas Super Short Survey. It categorizes people into six audiences from alarmed to dismissive.

Professor: Perfect. That's a validated instrument. Now, think about your hypothesis. What do you actually expect to find?

Emma: I hypothesize that "climate crisis" framing will increase perceived urgency but might also increase resistance among skeptical audiences. "Global warming" might be more polarizing than "climate change."

Professor: Nuanced. I like it. For your literature review, make sure to cite the Yale Program on Climate Change Communication and Anthony Leiserowitz's work. Also, look at recent studies on "doomism" versus "efficacy" framing.

Emma: This is incredibly helpful. Can I send you a revised proposal by next Friday?

Professor: Absolutely. And let's schedule another meeting once you have preliminary data. Remember, good research is as much about the journey as the destination.`,
            questions: [
                {
                    id: 16,
                    question: "What is Emma's thesis topic generally about?",
                    options: [
                        "Economic impacts of climate change",
                        "Public perception of climate change",
                        "Technical solutions to climate change",
                        "Historical climate patterns"
                    ],
                    correct: 1,
                    explanation: `Đáp án đúng là (B) 'Public perception of climate change.' Emma nói: 'I'm having trouble narrowing my research question on climate change communication' và giáo sư nhắc lại: "Public perception of climate change" is certainly broad. Đây là chủ đề tổng quát của cô.`
                },
                {
                    id: 17,
                    question: "What specific aspect is Emma fascinated by?",
                    options: [
                        "Government policies on climate",
                        "How framing affects perception",
                        "International climate agreements",
                        "Corporate carbon emissions"
                    ],
                    correct: 1,
                    explanation: `Đáp án đúng là (B) 'How framing affects perception.' Emma nói: 'I'm fascinated by how framing affects perception. Like, does calling it "global warming" versus "climate change" or "climate crisis" change how people respond?' Đây là góc nghiên cứu cụ thể của cô.`
                },
                {
                    id: 18,
                    question: "What concern does Professor Rivera raise about Amazon Mechanical Turk samples?",
                    options: [
                        "They are too expensive",
                        "They skew young, educated, and liberal",
                        "They are mostly international respondents",
                        "They don't complete surveys properly"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'They skew young, educated, and liberal.' Giáo sư cảnh báo: 'MTurk samples skew young, educated, and liberal. For climate change research, that could bias results.' Đây là hạn chế phương pháp luận quan trọng."
                },
                {
                    id: 19,
                    question: "Why does Professor Rivera recommend a between-subjects design?",
                    options: [
                        "It's cheaper to administer",
                        "It avoids demand characteristics",
                        "It requires fewer participants",
                        "It's easier to analyze statistically"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'It avoids demand characteristics.' Giáo sư giải thích: 'between-subjects is usually better to avoid demand characteristics. If the same person sees all framings, they might guess what you're studying.' Đây là lý do phương pháp luận quan trọng."
                },
                {
                    id: 20,
                    question: 'What does Emma hypothesize about the "climate crisis" framing?',
                    options: [
                        "It will decrease all engagement",
                        "It will increase perceived urgency but might increase resistance",
                        "It will be universally effective",
                        "It will only work with young audiences"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'It will increase perceived urgency but might increase resistance.' Emma trình bày giả thuyết: 'I hypothesize that \"climate crisis\" framing will increase perceived urgency but might also increase resistance among skeptical audiences.' Đây là một giả thuyết phức tạp, tinh tế."
                }
            ]
        },

        // ========== READING SECTIONS ==========
        part5: {
            title: "PART 5: Grammar and Vocabulary in Academic Context",
            description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
            type: "reading",
            questions: [
                {
                    id: 21,
                    question: "The research team's findings _________ previously established theories about cognitive development in early childhood.",
                    options: ["challenge", "challenges", "challenging", "challenged"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'challenge'. Chủ ngữ 'findings' là số nhiều, nên động từ phải ở dạng nguyên thể không chia (present tense plural). Cấu trúc: 'findings challenge theories'. Các lựa chọn khác: (B) 'challenges' cho chủ ngữ số ít, (C) 'challenging' là tính từ/danh động từ, (D) 'challenged' là thì quá khứ - không phù hợp với ngữ cảnh hiện tại."
                },
                {
                    id: 22,
                    question: "_________ the complexity of quantum mechanics, the professor used analogies to make the concepts more accessible.",
                    options: ["Given", "Although", "Unless", "Despite"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'Given'. 'Given' có nghĩa 'xét thấy' hoặc 'bởi vì', dùng để giới thiệu lý do. Cấu trúc: 'Given + noun phrase, + main clause' rất phổ biến trong văn học thuật. Các lựa chọn khác: (B) 'Although' chỉ sự tương phản, (C) 'Unless' chỉ điều kiện, (D) 'Despite' cũng chỉ sự tương phản nhưng cần cấu trúc 'Despite + noun/V-ing'."
                },
                {
                    id: 23,
                    question: "The laboratory's new protocol requires that all samples _________ at -80°C within thirty minutes of collection.",
                    options: ["are stored", "be stored", "will be stored", "were stored"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'be stored'. Đây là cấu trúc giả định thức (subjunctive mood) sau động từ 'require'. Cấu trúc: 'require that + S + [V nguyên thể]'. 'Be stored' là dạng bị động của động từ nguyên thể. Các lựa chọn khác không đúng với cấu trúc giả định thức trang trọng này."
                },
                {
                    id: 24,
                    question: "The interdisciplinary nature of the project _________ insights from sociology, economics, and environmental science.",
                    options: ["incorporates", "incorporate", "incorporating", "incorporated"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'incorporates'. Chủ ngữ 'nature' là số ít, nên động từ phải chia ngôi thứ ba số ít hiện tại: 'nature incorporates'. Các lựa chọn khác: (B) 'incorporate' là nguyên thể/số nhiều, (C) 'incorporating' là danh động từ, (D) 'incorporated' là quá khứ - không phù hợp với thì hiện tại của câu."
                },
                {
                    id: 25,
                    question: "_________ analyzing the data, researchers discovered an unexpected correlation between sleep patterns and academic performance.",
                    options: ["When", "While", "During", "Upon"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'While'. 'While + V-ing' có nghĩa 'trong khi làm gì đó'. Cấu trúc này rất phổ biến trong văn học thuật để mô tả hành động đồng thời. Các lựa chọn khác: (A) 'When' thường theo sau bởi mệnh đề, (C) 'During' theo sau bởi danh từ, (D) 'Upon' có nghĩa 'ngay khi' - không phù hợp về nghĩa."
                },
                {
                    id: 26,
                    question: "The study's methodology has been _________ criticized for its small sample size and lack of control group.",
                    options: ["wide", "widely", "width", "widen"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'widely'. Vị trí này cần một trạng từ (adverb) để bổ nghĩa cho động từ 'has been criticized'. 'Widely criticized' nghĩa là 'bị chỉ trích rộng rãi'. Các lựa chọn khác: (A) 'wide' là tính từ, (C) 'width' là danh từ, (D) 'widen' là động từ."
                },
                {
                    id: 27,
                    question: "The research grant will enable the team to _________ their investigation into renewable energy storage solutions.",
                    options: ["expand", "expands", "expanding", "expanded"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'expand'. Sau 'enable to' cần động từ nguyên thể: 'enable to expand'. Các lựa chọn khác: (B) 'expands' là ngôi thứ ba số ít, (C) 'expanding' là danh động từ, (D) 'expanded' là quá khứ - đều không đúng sau 'to' trong cấu trúc này."
                },
                {
                    id: 28,
                    question: "The conference proceedings will be published _________ by Cambridge University Press next year.",
                    options: ["shortly", "short", "shortness", "shorten"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'shortly'. 'Shortly' là trạng từ có nghĩa 'sớm, trong thời gian ngắn'. Cấu trúc: 'will be published shortly'. Các lựa chọn khác: (B) 'short' là tính từ, (C) 'shortness' là danh từ, (D) 'shorten' là động từ - đều không thể bổ nghĩa cho động từ 'published'."
                },
                {
                    id: 29,
                    question: "_________ the initial hypothesis was not supported, the experiment yielded valuable data for future research.",
                    options: ["Although", "Moreover", "Therefore", "Because"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'Although'. Câu thể hiện sự tương phản: giả thuyết không được ủng hộ NHƯNG thí nghiệm vẫn tạo ra dữ liệu giá trị. 'Although' (mặc dù) là liên từ chỉ sự nhượng bộ phù hợp nhất. Các lựa chọn khác: (B) 'Moreover' thêm thông tin, (C) 'Therefore' chỉ kết quả, (D) 'Because' chỉ nguyên nhân."
                },
                {
                    id: 30,
                    question: "The research assistant was responsible for _________ the participants and administering the surveys.",
                    options: ["recruit", "recruits", "recruiting", "recruited"],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'recruiting'. Sau giới từ 'for' cần danh động từ (V-ing): 'responsible for recruiting'. Các lựa chọn khác: (A) 'recruit' là động từ nguyên thể, (B) 'recruits' là ngôi thứ ba số ít, (D) 'recruited' là quá khứ phân từ - đều không đứng sau giới từ 'for'."
                }
            ]
        },

        part6: {
            title: "PART 6: Cloze Text (Research Proposal)",
            description: "10 câu hỏi - Điền từ/cụm từ vào văn bản đề xuất nghiên cứu. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
            type: "reading",
            text: `**Research Proposal: The Impact of Digital Detox Interventions on Mental Well-being**

**1. Introduction**
The pervasive use of digital technology, particularly smartphones, has raised concerns about its potential negative effects on mental health. This study aims to (31) the effectiveness of structured digital detox interventions in reducing symptoms of anxiety and improving overall well-being among university students.

**2. Literature Review**
Previous research has (32) correlations between excessive screen time and increased anxiety, depression, and sleep disturbances. However, most studies have been observational, making causal inferences difficult. Intervention studies are (33) needed to establish whether reducing screen time directly improves mental health outcomes.

**3. Methodology**
**Participants:** 200 undergraduate students will be randomly (34) to either an intervention group (digital detox program) or a control group (no intervention).
**Intervention:** The experimental group will participate in a 4-week program (35) daily screen time limits, mindfulness exercises, and in-person social activities.
**Measures:** Pre- and post-intervention assessments will include standardized anxiety scales, sleep quality indices, and self-reported well-being measures. All data will be collected (36) to ensure participant confidentiality.

**4. Expected Outcomes**
We hypothesize that participants in the intervention group will show (37) reductions in anxiety symptoms and improvements in sleep quality compared to the control group. Additionally, we expect to observe a positive correlation between the degree of screen time reduction and improvement in well-being scores.

**5. Significance**
This research will contribute to the growing literature on digital well-being and provide evidence-based recommendations for universities seeking to address student mental health challenges. If effective, the intervention could be (38) to other educational settings.

**6. Timeline and Budget**
The study will be conducted over one academic semester. Funding is requested for participant compensation, research assistant salaries, and statistical software licenses. The detailed budget is (39) in Appendix A.

**7. Ethical Considerations**
The study protocol has been approved by the Institutional Review Board (IRB #2024-087). Informed consent will be obtained from all participants, who may withdraw at any time without penalty. Data will be stored securely and (40) only for research purposes.`,
            questions: [
                {
                    id: 31,
                    type: "fill",
                    question: "(31) - Điền từ thích hợp",
                    context: "This study aims to (31) the effectiveness of structured digital detox interventions...",
                    options: ["investigate", "investigates", "investigating", "investigated"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'investigate'. Sau 'aims to' cần động từ nguyên thể: 'aims to investigate'. Các dạng khác của động từ không đúng sau 'to' trong cấu trúc này."
                },
                {
                    id: 32,
                    type: "fill",
                    question: "(32) - Điền từ thích hợp",
                    context: "Previous research has (32) correlations between excessive screen time and increased anxiety...",
                    options: ["establish", "established", "establishing", "establishes"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'established'. Cấu trúc thì hiện tại hoàn thành: 'has + past participle'. 'Has established' là chính xác. Các lựa chọn khác: (A) 'establish' là nguyên thể, (C) 'establishing' là danh động từ, (D) 'establishes' là hiện tại đơn - đều không đúng với 'has'."
                },
                {
                    id: 33,
                    type: "fill",
                    question: "(33) - Điền từ thích hợp",
                    context: "Intervention studies are (33) needed to establish whether reducing screen time directly improves...",
                    options: ["urgency", "urgent", "urgently", "urge"],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'urgently'. Vị trí này cần một trạng từ (adverb) để bổ nghĩa cho tính từ 'needed'. 'Urgently needed' nghĩa là 'cần thiết một cách khẩn cấp'. Các lựa chọn khác: (A) 'urgency' là danh từ, (B) 'urgent' là tính từ, (D) 'urge' là động từ."
                },
                {
                    id: 34,
                    type: "fill",
                    question: "(34) - Điền từ thích hợp",
                    context: "200 undergraduate students will be randomly (34) to either an intervention group or a control group.",
                    options: ["assign", "assigned", "assigning", "assignment"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'assigned'. Đây là cấu trúc bị động thì tương lai: 'will be + past participle'. 'Will be randomly assigned' nghĩa là 'sẽ được phân ngẫu nhiên'. Các lựa chọn khác không phải là phân từ quá khứ."
                },
                {
                    id: 35,
                    type: "fill",
                    question: "(35) - Điền từ thích hợp",
                    context: "The experimental group will participate in a 4-week program (35) daily screen time limits, mindfulness exercises...",
                    options: ["include", "includes", "including", "included"],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'including'. 'Including' ở đây là giới từ, có nghĩa 'bao gồm'. Cấu trúc: 'program including X, Y, and Z'. Các lựa chọn khác: (A) 'include' là động từ, (B) 'includes' là động từ chia, (D) 'included' là quá khứ phân từ - không đúng về mặt ngữ pháp trong vị trí này."
                },
                {
                    id: 36,
                    type: "fill",
                    question: "(36) - Điền từ thích hợp",
                    context: "All data will be collected (36) to ensure participant confidentiality.",
                    options: ["anonymous", "anonymously", "anonymity", "anonymize"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'anonymously'. Vị trí này cần một trạng từ (adverb) để bổ nghĩa cho động từ 'collected'. 'Collected anonymously' nghĩa là 'được thu thập một cách ẩn danh'. Các lựa chọn khác: (A) 'anonymous' là tính từ, (C) 'anonymity' là danh từ, (D) 'anonymize' là động từ."
                },
                {
                    id: 37,
                    type: "fill",
                    question: "(37) - Điền từ thích hợp",
                    context: "We hypothesize that participants in the intervention group will show (37) reductions in anxiety symptoms...",
                    options: ["significant", "significantly", "significance", "signify"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'significant'. Vị trí này cần một tính từ (adjective) để bổ nghĩa cho danh từ 'reductions'. 'Significant reductions' nghĩa là 'sự giảm đáng kể'. Các lựa chọn khác: (B) 'significantly' là trạng từ, (C) 'significance' là danh từ, (D) 'signify' là động từ."
                },
                {
                    id: 38,
                    type: "fill",
                    question: "(38) - Điền từ thích hợp",
                    context: "If effective, the intervention could be (38) to other educational settings.",
                    options: ["adapt", "adapted", "adapting", "adaptable"],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'adapted'. Đây là cấu trúc bị động với modal verb: 'could be + past participle'. 'Could be adapted' nghĩa là 'có thể được điều chỉnh/áp dụng'. Các lựa chọn khác không phải là phân từ quá khứ."
                },
                {
                    id: 39,
                    type: "fill",
                    question: "(39) - Điền từ thích hợp",
                    context: "The detailed budget is (39) in Appendix A.",
                    options: ["present", "presents", "presented", "presenting"],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'presented'. Đây là cấu trúc bị động thì hiện tại: 'is + past participle'. 'Is presented' nghĩa là 'được trình bày'. Các lựa chọn khác: (A) 'present' là nguyên thể/tính từ, (B) 'presents' là động từ chia, (D) 'presenting' là danh động từ."
                },
                {
                    id: 40,
                    type: "fill",
                    question: "(40) - Điền từ thích hợp",
                    context: "Data will be stored securely and (40) only for research purposes.",
                    options: ["use", "uses", "used", "using"],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'used'. Cấu trúc song song (parallel structure) với động từ bị động: 'will be stored... and used'. Cả 'stored' và 'used' đều là past participles trong cấu trúc bị động. Các lựa chọn khác phá vỡ cấu trúc song song."
                }
            ]
        },

        part7: {
            title: "PART 7: Multiple Texts (Conference Announcement & Follow-up Email)",
            description: "10 câu hỏi - Đọc thông báo hội nghị và email tiếp theo, chọn đáp án tốt nhất (A, B, C, D).",
            type: "reading",
            text: `**Text 1: Conference Announcement**

**International Conference on Sustainable Urban Development**
**Date:** November 15-17, 2024
**Location:** Singapore Management University
**Submission Deadline:** August 31, 2024
**Website:** www.icsud2024.sg

**Call for Papers**
The International Conference on Sustainable Urban Development (ICSUD 2024) invites researchers, practitioners, and policymakers to submit abstracts on innovative approaches to creating sustainable, resilient, and inclusive cities. The conference will feature keynote speeches, parallel sessions, workshops, and networking opportunities.

**Thematic Tracks:**
1. Smart Cities and Digital Transformation
2. Urban Resilience and Climate Adaptation
3. Social Equity and Inclusive Urban Design
4. Circular Economy and Resource Management

**Submission Guidelines:**
- Abstracts should be 250-300 words, clearly stating objectives, methodology, and expected contributions.
- All submissions will undergo double-blind peer review.
- Notification of acceptance will be sent by October 1, 2024.
- Full papers of accepted abstracts are due by November 1, 2024.

**Registration Fees:**
- Early Bird (by Sept 30): $450
- Regular (Oct 1-Nov 10): $550
- Student Rate: $300 (valid student ID required)

**Accommodation:**
A block of rooms has been reserved at the conference hotel at a discounted rate of $180/night. Reservations must be made by October 15.

---
**Text 2: Email Correspondence**

To: conference@icsud2024.sg
From: maria.fernandez@research.edu
Date: September 5, 2024
Subject: Query about ICSUD 2024 Submission

Dear Conference Organizers,

I am writing to inquire about the submission process for ICSUD 2024. My colleague, Dr. James Chen, and I would like to submit a joint paper on "Green Infrastructure as a Tool for Urban Heat Island Mitigation" under Track 2: Urban Resilience and Climate Adaptation.

We have two specific questions:

1. Since this is a joint submission, should both authors' names and affiliations be included in the abstract, or should we follow the double-blind review guidelines and omit identifying information?

2. If our abstract is accepted, would it be possible to present our work as a poster rather than an oral presentation? One of us has a scheduling conflict and may not be able to attend all three days of the conference.

Thank you for your assistance. We look forward to participating in what promises to be an excellent conference.

Sincerely,
Dr. Maria Fernandez
Associate Professor of Urban Planning
University of Research Excellence`,
            questions: [
                {
                    id: 41,
                    question: "What is the deadline for abstract submission to ICSUD 2024?",
                    options: [
                        "August 31, 2024",
                        "September 30, 2024",
                        "October 1, 2024",
                        "November 1, 2024"
                    ],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'August 31, 2024.' Thông báo hội nghị ghi rõ: 'Submission Deadline: August 31, 2024.' Các ngày khác: (B) là hạn chót đăng ký sớm, (C) là ngày thông báo chấp nhận, (D) là hạn nộp bài báo đầy đủ."
                },
                {
                    id: 42,
                    question: "Which conference track would be most appropriate for a paper on urban heat islands?",
                    options: [
                        "Track 1: Smart Cities and Digital Transformation",
                        "Track 2: Urban Resilience and Climate Adaptation",
                        "Track 3: Social Equity and Inclusive Urban Design",
                        "Track 4: Circular Economy and Resource Management"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Track 2: Urban Resilience and Climate Adaptation.' Trong email, Maria Fernandez nói rõ họ muốn nộp bài về 'Green Infrastructure as a Tool for Urban Heat Island Mitigation' và xác định 'under Track 2: Urban Resilience and Climate Adaptation.' Đảo nhiệt đô thị là một vấn đề thích ứng khí hậu."
                },
                {
                    id: 43,
                    question: "What is the student registration fee for the conference?",
                    options: ["$300", "$450", "$550", "$180"],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) '$300.' Thông báo ghi: 'Student Rate: $300 (valid student ID required).' Các số khác: $450 là phí đăng ký sớm, $550 là phí thông thường, $180 là giá phòng khách sạn/đêm."
                },
                {
                    id: 44,
                    question: "By what date must hotel reservations be made to get the conference rate?",
                    options: [
                        "August 31, 2024",
                        "September 30, 2024",
                        "October 15, 2024",
                        "November 1, 2024"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'October 15, 2024.' Thông báo ghi: 'Reservations must be made by October 15.' Đây là hạn chót để đặt phòng với giá ưu đãi của hội nghị."
                },
                {
                    id: 45,
                    question: "What is Maria Fernandez's first question about?",
                    options: [
                        "The conference registration fee",
                        "How to handle author names for double-blind review",
                        "The location of the conference",
                        "The deadline for full papers"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'How to handle author names for double-blind review.' Maria hỏi: 'Since this is a joint submission, should both authors' names and affiliations be included in the abstract, or should we follow the double-blind review guidelines and omit identifying information?' Đây là câu hỏi về quy trình nộp bài cho bình duyệt mù."
                },
                {
                    id: 46,
                    question: "Why does Maria ask about presenting as a poster?",
                    options: [
                        "Their research is better suited for visual presentation",
                        "One author may not be able to attend all conference days",
                        "Poster presentations have a higher acceptance rate",
                        "They missed the deadline for oral presentations"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'One author may not be able to attend all conference days.' Maria giải thích: 'One of us has a scheduling conflict and may not be able to attend all three days of the conference.' Đây là lý do cô ấy hỏi về khả năng trình bày poster thay vì trình bày miệng."
                },
                {
                    id: 47,
                    question: "When will authors be notified about abstract acceptance?",
                    options: [
                        "August 31, 2024",
                        "September 5, 2024",
                        "October 1, 2024",
                        "November 1, 2024"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'October 1, 2024.' Thông báo ghi: 'Notification of acceptance will be sent by October 1, 2024.'"
                },
                {
                    id: 48,
                    question: "What is the word limit for abstracts?",
                    options: [
                        "150-200 words",
                        "250-300 words",
                        "350-400 words",
                        "No word limit specified"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) '250-300 words.' Thông báo ghi: 'Abstracts should be 250-300 words...'"
                },
                {
                    id: 49,
                    question: "What type of review process does the conference use?",
                    options: [
                        "Single-blind review",
                        "Double-blind review",
                        "Open review",
                        "Editorial review only"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Double-blind review.' Thông báo ghi: 'All submissions will undergo double-blind peer review.' Maria cũng nhắc đến 'double-blind review guidelines' trong email của cô."
                },
                {
                    id: 50,
                    question: "What is Maria Fernandez's academic position?",
                    options: [
                        "Research Assistant",
                        "Assistant Professor",
                        "Associate Professor",
                        "Department Chair"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'Associate Professor.' Email ký tên: 'Dr. Maria Fernandez, Associate Professor of Urban Planning, University of Research Excellence.'"
                }
            ]
        },

        part8: {
            title: "PART 8: Text Message Chain (Research Collaboration)",
            description: "10 câu hỏi - Đọc chuỗi tin nhắn giữa các nhà nghiên cứu đang hợp tác viết bài báo. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "reading",
            text: `Alex (9:15): Team, I've completed the statistical analysis for section 3. The results are stronger than we anticipated - p < 0.001 for both primary hypotheses.

Sofia (9:22): Excellent news! Can you share the output files? I'll incorporate them into the results section draft I'm working on.

Ben (9:30): That's great, Alex. While you two handle results, I'll continue with the literature review for the introduction. I found three new relevant studies published just last month that we should cite.

Alex (9:35): Files sent. Sofia, note that Figure 2 needs to be revised - the confidence intervals are too wide in the current version. I've created a better visualization.

Sofia (9:40): Got it. I'll update Figure 2. Ben, can you check if any of those new studies contradict our theoretical framework? We may need to address that in the discussion.

Ben (9:45): Good point. One paper does present a conflicting finding. I'll draft a paragraph acknowledging this limitation and explaining why our approach differs.

Alex (9:50): Perfect. About the journal submission - I think Journal of Applied Psychology is our best bet. Impact factor 4.8, and they publish similar methodology.

Sofia (9:55): Agreed. But their submission guidelines require abstracts under 200 words. Ours is currently 245. I can trim it.

Ben (10:00): Let me help with that. I'm good at concise writing. Also, we need to decide on author order. I think Alex should be first author since he led the study design and analysis.

Alex (10:05): Thanks, Ben. I'm fine with that. Sofia second, Ben third? And we should include Professor Lee as corresponding author since the grant came from her lab.

Sofia (10:10): Works for me. Deadline for the next issue is October 15. Can we aim to submit by October 1 to allow time for revisions if needed?

Ben (10:15): Ambitious but doable if we all commit. I'll set up a shared timeline with milestones.

Alex (10:20): Let's do it. I'll circulate a draft of the complete methods section by end of day tomorrow.`,
            questions: [
                {
                    id: 51,
                    question: "What has Alex just completed?",
                    options: [
                        "The literature review",
                        "The statistical analysis",
                        "The abstract",
                        "The submission to the journal"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'The statistical analysis.' Alex mở đầu: 'I've completed the statistical analysis for section 3.'"
                },
                {
                    id: 52,
                    question: "What problem does Alex identify with Figure 2?",
                    options: [
                        "It has incorrect data",
                        "The colors are misleading",
                        "The confidence intervals are too wide",
                        "It's missing labels"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'The confidence intervals are too wide.' Alex nói: 'note that Figure 2 needs to be revised - the confidence intervals are too wide in the current version.'"
                },
                {
                    id: 53,
                    question: "What concern does Sofia raise about the new studies Ben found?",
                    options: [
                        "They are behind a paywall",
                        "They might contradict their theoretical framework",
                        "They are from unreliable sources",
                        "They are too old to be relevant"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'They might contradict their theoretical framework.' Sofia hỏi: 'can you check if any of those new studies contradict our theoretical framework?'"
                },
                {
                    id: 54,
                    question: "Which journal does Alex recommend for submission?",
                    options: [
                        "Journal of Experimental Psychology",
                        "Journal of Applied Psychology",
                        "Psychological Science",
                        "American Psychologist"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Journal of Applied Psychology.' Alex nói: 'I think Journal of Applied Psychology is our best bet.'"
                },
                {
                    id: 55,
                    question: "What issue does Sofia identify with the journal's submission guidelines?",
                    options: [
                        "They require abstracts under 200 words",
                        "They don't accept collaborative papers",
                        "They charge high publication fees",
                        "They have a long review process"
                    ],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'They require abstracts under 200 words.' Sofia nói: 'their submission guidelines require abstracts under 200 words. Ours is currently 245.'"
                },
                {
                    id: 56,
                    question: "Why does Ben suggest Alex should be first author?",
                    options: [
                        "Alex is the most senior researcher",
                        "Alex led the study design and analysis",
                        "Alex wrote the most words",
                        "Alex contacted the journal first"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'Alex led the study design and analysis.' Ben nói: 'I think Alex should be first author since he led the study design and analysis.'"
                },
                {
                    id: 57,
                    question: "Why should Professor Lee be included as corresponding author?",
                    options: [
                        "She wrote the first draft",
                        "She provided statistical advice",
                        "The grant came from her lab",
                        "She is the department chair"
                    ],
                    correct: 2,
                    explanation: "Đáp án đúng là (C) 'The grant came from her lab.' Alex nói: 'we should include Professor Lee as corresponding author since the grant came from her lab.'"
                },
                {
                    id: 58,
                    question: "What is the journal submission deadline for the next issue?",
                    options: [
                        "October 1",
                        "October 15",
                        "November 1",
                        "September 30"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'October 15.' Sofia nói: 'Deadline for the next issue is October 15.'"
                },
                {
                    id: 59,
                    question: "When does Alex promise to circulate the methods section draft?",
                    options: [
                        "By end of day today",
                        "By end of day tomorrow",
                        "By the end of the week",
                        "By October 1"
                    ],
                    correct: 1,
                    explanation: "Đáp án đúng là (B) 'By end of day tomorrow.' Alex nói: 'I'll circulate a draft of the complete methods section by end of day tomorrow.'"
                },
                {
                    id: 60,
                    question: "What will Ben create to help the team meet their deadline?",
                    options: [
                        "A shared timeline with milestones",
                        "A new statistical analysis",
                        "A revised abstract",
                        "A list of alternative journals"
                    ],
                    correct: 0,
                    explanation: "Đáp án đúng là (A) 'A shared timeline with milestones.' Ben nói: 'I'll set up a shared timeline with milestones.'"
                }
            ]
        },
    }
};