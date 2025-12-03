export const EXAM19_DATA = {
    title: "HUFLIT Listening & Reading Practice - Exam 19 (Dựa trên Listening & Notetaking Skills)",
    description: "Bộ đề thi mô phỏng môi trường học thuật, tập trung vào kỹ năng nghe hiểu bài giảng và ghi chú hiệu quả. Cấu trúc: Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Phù hợp cho sinh viên chuẩn bị du học hoặc thi chứng chỉ tiếng Anh học thuật.",
    parts: {
        // ========== LISTENING SECTIONS ==========
        part1: {
            title: "PART 1: Short Academic Conversation",
            description: "Nghe đoạn hội thoại giữa hai sinh viên về một bài giảng môn Tâm lý học Xã hội. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
            type: "listening",
            script: `Alex: Hey Mark, did you manage to take good notes in Professor Miller’s Social Psychology lecture today? I was struggling to keep up with all the theories she mentioned.

Mark: Yeah, I think I got the main points. The key takeaway for me was the 'Bystander Effect'. She said it’s not just about the number of people present, but more about how individuals interpret the situation and assume someone else will take responsibility.

Alex: Right. And she emphasized that diffusion of responsibility is strongest in ambiguous situations. I found her example about the crowded subway really clear. People weren’t sure if the man was really sick or just tired, so everyone hesitated.

Mark: Exactly. I also wrote down the three factors she listed that increase the likelihood of helping: clarity of the need, similarity to the victim, and having the skills to help. She said the most critical one is clarity. If the emergency is obvious, like someone shouting 'Fire!', people react faster.

Alex: Good point. I missed that third one about having the skills. So, a nurse is more likely to help in a medical emergency than a painter, all else being equal. Makes sense. By the way, what did she say about the due date for the case study analysis?

Mark: She said the deadline is firm: next Friday by 5 PM, to be submitted online. No hard copies. And she mentioned that late submissions, for any reason, will be penalized by 10% per day. So we really shouldn’t delay.

Alex: Noted. I’ll start on mine tonight. Thanks for clarifying!`,
            questions: [
                {
                    id: 1,
                    question: "What is the main topic of the lecture they discussed?",
                    options: [
                        "Cognitive Development in Children",
                        "The Bystander Effect in Social Psychology",
                        "Economic Theories of Behavior",
                        "The History of Psychological Research"
                    ],
                    correct: 1, // Bystander Effect
                    explanation: "Đáp án đúng là (B) 'The Bystander Effect in Social Psychology'. Cả hai sinh viên đều nhắc đến 'Bystander Effect' ngay từ đầu cuộc trò chuyện. Alex nói: 'The key takeaway for me was the **Bystander Effect**.' Mark cũng đồng ý và giải thích thêm về hiệu ứng này. Các chủ đề khác như 'Cognitive Development' hay 'Economic Theories' không hề được đề cập trong bài."
                },
                {
                    id: 2,
                    question: "According to the professor, what is the MOST critical factor that increases the likelihood of helping?",
                    options: [
                        "The number of people present",
                        "Having specialized skills",
                        "Clarity of the need for help",
                        "Similarity to the victim"
                    ],
                    correct: 2, // Clarity
                    explanation: "Đáp án đúng là (C) 'Clarity of the need for help'. Mark trích dẫn lời giáo sư: 'She said the most critical one is **clarity**. If the emergency is obvious... people react faster.' Đây là yếu tố được nhấn mạnh là quan trọng nhất. Mặc dù 'having skills' và 'similarity' cũng được liệt kê, nhưng chúng không phải là yếu tố 'most critical'. 'Number of people present' thực ra là một phần của vấn đề (càng đông càng ít giúp đỡ), không phải là yếu tố tích cực làm tăng khả năng giúp đỡ."
                },
                {
                    id: 3,
                    question: "What example did the professor use to illustrate an ambiguous situation?",
                    options: [
                        "A car crash on an empty highway",
                        "A person shouting 'Fire!' in a theater",
                        "A crowded subway where a man might be sick",
                        "A nurse helping in a hospital"
                    ],
                    correct: 2, // Crowded subway
                    explanation: "Đáp án đúng là (C) 'A crowded subway where a man might be sick'. Alex nói: 'I found her example about the **crowded subway** really clear. People weren't sure if the man was really sick or just tired, so everyone hesitated.' Đây chính là ví dụ về một tình huống mơ hồ (ambiguous), nơi sự khuếch tán trách nhiệm (diffusion of responsibility) xảy ra mạnh mẽ. Ví dụ về 'shouting Fire!' (B) thực ra là minh họa cho tình huống rõ ràng (clarity), không phải mơ hồ."
                },
                {
                    id: 4,
                    question: "What is the penalty for late submission of the case study?",
                    options: [
                        "It will not be accepted.",
                        "It loses 10% of the total marks per day.",
                        "The grade is reduced by one letter grade.",
                        "No penalty if you have a valid excuse."
                    ],
                    correct: 1, // 10% per day
                    explanation: "Đáp án đúng là (B) 'It loses 10% of the total marks per day.' Mark truyền đạt chính sách của giáo sư: '...late submissions, for any reason, will be penalized by **10% per day**.' Đây là một quy tắc cụ thể và nghiêm khắc. Không có thông tin về việc không chấp nhận bài (A), giảm một mức điểm chữ (C), hay miễn phạt nếu có lý do (D). Thực tế, cụm 'for any reason' cho thấy ít có ngoại lệ."
                },
                {
                    id: 5,
                    question: "How should the case study be submitted?",
                    options: [
                        "As a hard copy in class",
                        "Online only",
                        "Either online or in person",
                        "Via email to the professor"
                    ],
                    correct: 1, // Online only
                    explanation: "Đáp án đúng là (B) 'Online only'. Mark nói rõ: '...to be submitted **online**. No hard copies.' Vì vậy, sinh viên không được nộp bản in cứng (A). Các phương án (C) và (D) không chính xác vì chỉ có một kênh duy nhất được chỉ định là hệ thống nộp bài trực tuyến của trường."
                }
            ]
        },

        part2: {
            title: "PART 2: Academic Discussion (Group Work)",
            description: "Nghe đoạn thảo luận nhóm giữa ba sinh viên về một dự án môn Kinh tế Môi trường. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "listening",
            script: `Narrator: Three students – Linda, David, and Emma – are meeting in the library to plan their group project for Environmental Economics.

Linda: Okay, so our task is to analyze a policy tool for reducing plastic waste. I think we should focus on a 'Pigouvian tax' – that’s a tax on producers equal to the external cost of pollution. It’s a classic solution.

David: I agree it’s classic, but our professor said she wants us to explore less conventional approaches. Remember last week’s lecture? She mentioned 'Extended Producer Responsibility' or EPR. That’s where manufacturers are responsible for the entire lifecycle of their products, including waste collection and recycling. I think that’s more innovative for our paper.

Emma: Good point, David. Also, EPR shifts the cost burden from taxpayers and local governments to the actual producers, which creates a direct financial incentive for them to design products that are easier to recycle or use less packaging. That’s a market-based mechanism too, but different from a tax.

Linda: Hmm, you’re right. The professor did emphasize innovation. So, EPR it is. How should we structure our analysis? I suggest we start with a definition, then present a case study. I read about the EPR system for packaging in Germany. It’s been quite successful.

Emma: Perfect. I can take the lead on the Germany case study. David, you’re great with data and graphs. Could you handle the section on cost-benefit analysis, comparing the social costs before and after EPR implementation?

David: Sure, I can do that. Linda, maybe you can write the introduction and the conclusion, since you proposed the initial Pigouvian tax idea – you can contrast it with EPR to show why EPR might be superior in certain contexts.

Linda: Sounds like a plan. Let’s aim to have a first draft of our assigned sections by next Wednesday so we can integrate everything. We should meet again next Thursday afternoon to compile and edit.

Emma: Agreed. I’ll book this study room again for Thursday at 2 PM.`,
            questions: [
                {
                    id: 6,
                    question: "What is the main topic of their group project?",
                    options: [
                        "The history of economic thought",
                        "Analyzing policy tools for reducing plastic waste",
                        "A comparison of global recycling rates",
                        "The impact of taxes on consumer behavior"
                    ],
                    correct: 1, // Policy tools for plastic waste
                    explanation: "Đáp án đúng là (B) 'Analyzing policy tools for reducing plastic waste.' Linda mở đầu cuộc thảo luận bằng câu: '...our task is to **analyze a policy tool for reducing plastic waste**.' Đây là mục tiêu rõ ràng của dự án. Các lựa chọn khác như 'history of economic thought' (A) hay 'global recycling rates' (C) có thể là một phần thông tin nhỏ, nhưng không phải là chủ đề trung tâm. 'Impact of taxes' (D) chỉ là một ý kiến ban đầu của Linda, nhưng nhóm đã chuyển sang hướng khác."
                },
                {
                    id: 7,
                    question: "Why does David suggest focusing on 'Extended Producer Responsibility' (EPR) instead of a tax?",
                    options: [
                        "Because it is a simpler concept to explain.",
                        "Because the professor wants them to explore less conventional approaches.",
                        "Because there is more data available on taxes.",
                        "Because EPR is cheaper to implement."
                    ],
                    correct: 1, // Professor wants innovation
                    explanation: "Đáp án đúng là (B) 'Because the professor wants them to explore less conventional approaches.' David phản bác đề xuất của Linda bằng lý do: '...our professor said she wants us to **explore less conventional approaches**.' Sau đó, anh ấy nhắc lại bài giảng tuần trước, nơi giáo sư đề cập đến EPR như một lựa chọn 'more innovative'. Đây chính là động lực chính cho sự thay đổi chủ đề. Không có thông tin nào cho thấy EPR đơn giản hơn (A), có nhiều dữ liệu hơn (C), hay rẻ hơn (D)."
                },
                {
                    id: 8,
                    question: "According to Emma, what is a key advantage of EPR?",
                    options: [
                        "It increases government tax revenue.",
                        "It shifts the waste management cost burden to producers.",
                        "It is supported by all environmental groups.",
                        "It eliminates the need for consumer recycling."
                    ],
                    correct: 1, // Shifts cost to producers
                    explanation: "Đáp án đúng là (B) 'It shifts the waste management cost burden to producers.' Emma giải thích: 'EPR shifts the **cost burden from taxpayers and local governments to the actual producers**...' Đây là đặc điểm cốt lõi và là lợi ích chính của mô hình EPR. Cô không đề cập đến việc tăng thuế (A), sự ủng hộ của tất cả các nhóm (C), hay việc loại bỏ nhu cầu tái chế của người tiêu dùng (D). Trên thực tế, EPR vẫn cần sự tham gia của người tiêu dùng trong việc phân loại rác."
                },
                {
                    id: 9,
                    question: "Which country's case study will Emma primarily research?",
                    options: ["Japan", "Germany", "Canada", "Sweden"],
                    correct: 1, // Germany
                    explanation: "Đáp án đúng là (B) 'Germany.' Linda đề xuất: 'I read about the EPR system for packaging in **Germany**.' Emma ngay lập tức nhận nhiệm vụ: 'I can take the lead on the **Germany** case study.' Vì vậy, Đức là quốc gia được chỉ định rõ ràng cho phần nghiên cứu tình huống của Emma. Các quốc gia khác không được đề cập trong cuộc thảo luận."
                },
                {
                    id: 10,
                    question: "When is the group's next meeting scheduled?",
                    options: [
                        "Next Monday morning",
                        "Next Wednesday at 2 PM",
                        "Next Thursday afternoon at 2 PM",
                        "Friday of next week"
                    ],
                    correct: 2, // Thursday 2 PM
                    explanation: "Đáp án đúng là (C) 'Next Thursday afternoon at 2 PM.' Khi kết thúc cuộc thảo luận, Emma nói: 'I’ll book this study room again for **Thursday at 2 PM**.' Điều này xác nhận thời gian cho cuộc họp tiếp theo. Họ đề cập đến thời hạn 'next Wednesday' cho bản thảo đầu tiên, nhưng cuộc họp nhóm để tổng hợp là vào thứ Năm. Các mốc thời gian khác không chính xác."
                }
            ]
        },

        part3: {
            title: "PART 3: Academic Lecture (Excerpt)",
            description: "Nghe một trích đoạn bài giảng về Lịch sử Nghệ thuật. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "listening",
            script: `Professor: Good morning. Today, we continue our series on Renaissance art by examining a pivotal shift: the transition from symbolic representation to a more naturalistic, human-centered worldview. This is often termed 'humanism'.

If you look at the artwork of the early Renaissance, say, Giotto's frescoes in the Scrovegni Chapel, you’ll notice a dramatic departure from the flat, hierarchical figures of the Byzantine tradition. Instead, Giotto introduced a sense of three-dimensionality and emotional depth. His figures seem to have weight; they occupy space. This wasn't just a technical advancement in perspective – it was a philosophical statement. It placed human experience and emotion at the center of the narrative.

Now, contrast this with a High Renaissance master like Leonardo da Vinci. His 'Vitruvian Man' is the ultimate symbol of this humanist ideal. The drawing doesn't just depict a well-proportioned male figure; it represents the belief that man is the measure of all things. The circle and square surrounding the figure symbolize the connection between the microcosm – man – and the macrocosm – the universe. This reflects a renewed interest in classical Greek and Roman thought, which valued rational inquiry and the potential of the individual.

A common misconception is that this humanism was secular and anti-religious. That's not accurate. In fact, much Renaissance humanism was deeply Christian. Artists and thinkers sought to reconcile classical philosophy with Christian theology. The goal was to understand God's creation – including humanity – through observation and reason, not just through faith alone. So, the next time you see a Renaissance painting of a biblical scene with remarkably realistic landscapes and human figures, remember: that realism is an expression of piety, an attempt to bring the divine into the tangible, human world.`,
            questions: [
                {
                    id: 11,
                    question: "What is the main focus of this lecture excerpt?",
                    options: [
                        "The technical use of oil paints in the Renaissance",
                        "The role of the Catholic Church as a patron of the arts",
                        "The shift towards humanism in Renaissance art",
                        "A biography of Leonardo da Vinci"
                    ],
                    correct: 2, // Humanism
                    explanation: "Đáp án đúng là (C) 'The shift towards humanism in Renaissance art.' Ngay từ đầu, giáo sư giới thiệu chủ đề: '...examining a pivotal shift: the transition... to a more naturalistic, **human-centered worldview**. This is often termed **humanism**.' Toàn bộ bài giảng xoay quanh khái niệm này, với các ví dụ từ Giotto đến Leonardo da Vinci. Các lựa chọn khác như 'technical use of oil paints' (A) không được nhắc đến; 'role of the Church' (B) chỉ được đề cập gián tiếp; và 'biography of da Vinci' (D) chỉ là một phần ví dụ nhỏ."
                },
                {
                    id: 12,
                    question: "According to the professor, what was significant about Giotto's frescoes?",
                    options: [
                        "They used expensive gold leaf extensively.",
                        "They introduced three-dimensionality and emotional depth.",
                        "They were the first to depict biblical scenes.",
                        "They were commissioned by the Medici family."
                    ],
                    correct: 1, // 3D & emotion
                    explanation: "Đáp án đúng là (B) 'They introduced three-dimensionality and emotional depth.' Giáo sư nói: 'Giotto introduced a sense of **three-dimensionality and emotional depth**. His figures seem to have weight...' Đây được mô tả là một bước đột phá so với phong cách Byzantine 'phẳng'. Không có thông tin về việc sử dụng vàng lá (A) – đây là đặc điểm của nghệ thuật Byzantine trước đó. Việc miêu tả các cảnh trong Kinh Thánh (C) đã có từ lâu trước Giotto. Gia đình Medici (D) là những nhà bảo trợ ở Florence thời kỳ sau."
                },
                {
                    id: 13,
                    question: "What does the 'Vitruvian Man' by Leonardo da Vinci symbolize?",
                    options: [
                        "The conflict between science and religion",
                        "The belief that man is the measure of all things",
                        "The perfection of geometric shapes without human form",
                        "A medical study of human anatomy"
                    ],
                    correct: 1, // Man is the measure
                    explanation: "Đáp án đúng là (B) 'The belief that man is the measure of all things.' Giáo sư giải thích rõ ràng: 'His 'Vitruvian Man' is the ultimate symbol of this humanist ideal... it represents the belief that **man is the measure of all things**.' Các vòng tròn và hình vuông xung quanh tượng trưng cho mối liên hệ giữa con người và vũ trụ. Mặc dù bức vẽ có tính chất giải phẫu, nhưng ý nghĩa chính của nó trong ngữ cảnh này là triết lý, không chỉ đơn thuần là y học (D). Không có đề cập đến xung đột (A), và hình học được sử dụng để bao quanh hình người, không phải thay thế nó (C)."
                },
                {
                    id: 14,
                    question: "What common misconception about Renaissance humanism does the professor address?",
                    options: [
                        "That it was only popular in Italy",
                        "That it was secular and anti-religious",
                        "That it rejected all classical ideas",
                        "That it was led by merchants, not artists"
                    ],
                    correct: 1, // Secular & anti-religious
                    explanation: "Đáp án đúng là (B) 'That it was secular and anti-religious.' Giáo sư trực tiếp nêu lên quan niệm sai lầm: 'A common **misconception** is that this humanism was **secular and anti-religious**. That's not accurate.' Sau đó, giáo sư giải thích rằng nhiều nhà nhân văn thời Phục hưng thực chất là những người theo đạo Thiên chúa sùng đạo, cố gắng hòa giải triết học cổ điển với thần học. Các quan niệm sai lầm khác không được đề cập trong đoạn trích này."
                },
                {
                    id: 15,
                    question: "According to the professor, why did Renaissance artists paint religious scenes with realistic human figures?",
                    options: [
                        "To sell more paintings to the wealthy middle class",
                        "As an expression of piety and to bring the divine into the human world",
                        "Because they lacked the skill to paint in a symbolic style",
                        "To criticize the corruption of the Church"
                    ],
                    correct: 1, // Piety & bringing divine to human
                    explanation: "Đáp án đúng là (B) 'As an expression of piety and to bring the divine into the human world.' Ở phần kết luận, giáo sư giải thích động cơ đằng sau chủ nghĩa hiện thực: '...that realism is an **expression of piety**, an attempt to **bring the divine into the tangible, human world**.' Điều này khẳng định lại mối liên hệ chặt chẽ giữa chủ nghĩa nhân văn và đức tin. Không có bằng chứng về động cơ thương mại (A), thiếu kỹ năng (C), hay chỉ trích (D) trong bài giảng này."
                }
            ]
        },

        part4: {
            title: "PART 4: Campus-Based Conversation",
            description: "Nghe cuộc trò chuyện giữa một sinh viên và một nhân viên thư viện. Chọn đáp án tốt nhất (A, B, C, D).",
            type: "listening",
            script: `Student: Excuse me, I’m looking for some primary sources for my history paper on labor movements in the early 20th century. I’ve searched the online catalog but I’m a bit overwhelmed.

Lisa: Of course, you’ve come to the right place. For primary sources, you’ll want to visit our Special Collections on the 4th floor. They house original documents like union pamphlets, personal letters from organizers, and photographs from strikes.

Student: That sounds perfect. Do I need any special permission to access them?

Lisa: Yes, you’ll need to register for a Special Collections access card at the desk on the 4th floor. It just takes a few minutes – you show your student ID and fill out a form. Also, you should know that materials there cannot be checked out; you have to read them in the reading room. No pens are allowed – only pencils and laptops for notes to protect the documents.

Student: I understand. What about digital archives? I have a tight deadline.

Lisa: Good thinking. We do have a subscription to 'Historical Archives Online'. If you go to the library website, under 'Databases', you’ll find it. You can search by keyword, date, or document type. Many of the pamphlets and some letters have been digitized. You can access those from anywhere with your student login.

Student: That’s a huge help. Can I download the digital copies for my notes?

Lisa: For most items, yes, you can save them as PDFs. However, for some rare items, you might only be allowed to view them online or print a limited number of pages. The database will usually indicate the restrictions. My advice is to start with the digital archives to identify specific documents you need, and then visit Special Collections only for the items that aren’t available online.

Student: That’s a great strategy. Thank you so much for your help!`,
            questions: [
                {
                    id: 16,
                    question: "Where are the primary sources the student needs located?",
                    options: [
                        "In the main lending section on the 2nd floor",
                        "In the Reference section near the entrance",
                        "In Special Collections on the 4th floor",
                        "In the graduate student lounge"
                    ],
                    correct: 2, // Special Collections, 4th floor
                    explanation: "Đáp án đúng là (C) 'In Special Collections on the 4th floor.' Ngay từ đầu, nhân viên thư viện chỉ dẫn: '...you’ll want to visit our **Special Collections on the 4th floor**.' Đây là thông tin cụ thể và trực tiếp trả lời câu hỏi về vị trí của các nguồn chính. Các khu vực khác không được đề cập là nơi lưu trữ tài liệu chính."
                },
                {
                    id: 17,
                    question: "What must the student do to access the Special Collections materials?",
                    options: [
                        "Get a letter from his professor",
                        "Register for an access card on the 4th floor",
                        "Make an appointment one week in advance",
                        "Pay a small usage fee"
                    ],
                    correct: 1, // Register for access card
                    explanation: "Đáp án đúng là (B) 'Register for an access card on the 4th floor.' Nhân viên thư viện nói rõ: 'Yes, you’ll need to **register for a Special Collections access card at the desk on the 4th floor**.' Quy trình này chỉ yêu cầu thẻ sinh viên và điền vào mẫu đơn. Không có đề cập đến việc cần thư từ giáo sư (A), đặt hẹn trước một tuần (C), hay phí sử dụng (D)."
                },
                {
                    id: 18,
                    question: "What is NOT allowed in the Special Collections reading room?",
                    options: [
                        "Laptops",
                        "Pencils",
                        "Pens",
                        "Student ID cards"
                    ],
                    correct: 2, // Pens
                    explanation: "Đáp án đúng là (C) 'Pens.' Nhân viên thư viện đưa ra quy tắc bảo quản tài liệu: '**No pens are allowed** – only pencils and laptops for notes...' Mực từ bút có thể gây hư hại vĩnh viễn cho tài liệu cổ. Do đó, bút chì và máy tính xách tay được cho phép. Thẻ sinh viên là cần thiết để đăng ký, vì vậy nó chắc chắn được phép mang vào."
                },
                {
                    id: 19,
                    question: "What is the main advantage of the 'Historical Archives Online' database that the librarian mentions?",
                    options: [
                        "It contains more sources than Special Collections.",
                        "It can be accessed remotely with a student login.",
                        "It allows unlimited downloads of all documents.",
                        "It is easier to search than the library catalog."
                    ],
                    correct: 1, // Accessed remotely
                    explanation: "Đáp án đúng là (B) 'It can be accessed remotely with a student login.' Nhân viên thư viện nói: 'You can access those from **anywhere with your student login**.' Đây là một lợi thế lớn về mặt tiện lợi và thời gian cho sinh viên có thời hạn gấp. Cô ấy không so sánh số lượng nguồn (A). Cô ấy cũng đề cập đến một số hạn chế về tải xuống (C), vì vậy 'unlimited' là sai. Việc tìm kiếm có thể dễ dàng hơn, nhưng lợi thế chính được nhấn mạnh là truy cập từ xa."
                },
                {
                    id: 20,
                    question: "What strategy does the librarian recommend?",
                    options: [
                        "Start with Special Collections to understand the physical documents.",
                        "Use only digital archives to save time.",
                        "Start with digital archives to identify needed documents, then visit Special Collections for the rest.",
                        "Focus only on secondary sources for a broader overview first."
                    ],
                    correct: 2, // Start digital, then physical for gaps
                    explanation: "Đáp án đúng là (C) 'Start with digital archives to identify needed documents, then visit Special Collections for the rest.' Lời khuyên chiến lược của nhân viên thư viện rất rõ ràng: 'My advice is to **start with the digital archives to identify specific documents you need, and then visit Special Collections only for the items that aren’t available online**.' Đây là một phương pháp nghiên cứu hiệu quả, tiết kiệm thời gian. Các chiến lược khác không phù hợp với lời khuyên cụ thể này."
                }
            ]
        },

        // ========== READING SECTIONS ==========
        part5: {
            title: "PART 5: Grammar and Vocabulary in Context",
            description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
            type: "reading",
            questions: [
                {
                    id: 21,
                    question: "The university's new sustainability initiative aims to _______ its carbon emissions by 50% within the next decade.",
                    options: ["reduce", "reduces", "reducing", "reduction"],
                    correct: 0, // reduce
                    explanation: "Đáp án đúng là (A) 'reduce'. Sau động từ khiếm khuyết 'aims to', chúng ta cần một **động từ nguyên thể (to + V)**. 'Aims to reduce' là cấu trúc chính xác. (B) 'reduces' là động từ chia ở ngôi thứ ba số ít, không dùng sau 'to'. (C) 'reducing' là danh động từ, thường dùng sau giới từ, không phải sau 'to' trong trường hợp này (trừ khi 'to' là giới từ). (D) 'reduction' là danh từ, không thể đứng sau 'to' với vai trò động từ."
                },
                {
                    id: 22,
                    question: "_______ the complexity of the research data, the team decided to use advanced statistical software for analysis.",
                    options: ["Because", "Despite", "Given", "Unless"],
                    correct: 2, // Given
                    explanation: "Đáp án đúng là (C) 'Given'. 'Given' ở đây có nghĩa là 'Xét thấy' hoặc 'Do có', dùng để giới thiệu một lý do hoặc tình huống đã biết. Cấu trúc: 'Given + noun phrase, + main clause' rất phổ biến trong văn học thuật. 'Because' (A) cũng chỉ lý do nhưng cần theo sau bởi một mệnh đề ('Because of the complexity...'). 'Despite' (B) chỉ sự tương phản ('Mặc dù'). 'Unless' (D) chỉ điều kiện ('Trừ khi'). 'Given' là phù hợp nhất về ngữ nghĩa và cú pháp."
                },
                {
                    id: 23,
                    question: "Professor Martin's latest publication has been _______ cited in the field of cognitive neuroscience.",
                    options: ["wide", "widely", "width", "widen"],
                    correct: 1, // widely
                    explanation: "Đáp án đúng là (B) 'widely'. Vị trí này cần một **trạng từ (adverb)** để bổ nghĩa cho động từ ở dạng bị động 'has been cited'. 'Widely' (một cách rộng rãi) là trạng từ. (A) 'wide' là tính từ. (C) 'width' là danh từ. (D) 'widen' là động từ. Chỉ có trạng từ mới có thể mô tả mức độ hoặc cách thức của hành động 'được trích dẫn'."
                },
                {
                    id: 24,
                    question: "The laboratory requires that all safety protocols _______ followed without exception.",
                    options: ["are", "be", "will be", "were"],
                    correct: 1, // be (subjunctive)
                    explanation: "Đáp án đúng là (B) 'be'. Đây là cấu trúc **giả định thức (subjunctive mood)** thường dùng sau các động từ như 'require', 'demand', 'insist'. Cấu trúc: 'require that + S + [V nguyên thể]'. Do đó, 'be followed' là chính xác, bất kể chủ ngữ là số ít hay số nhiều. Các lựa chọn 'are', 'will be', 'were' đều là các thì chỉ định (indicative mood) và không đúng với cấu trúc trang trọng này trong văn bản quy định."
                },
                {
                    id: 25,
                    question: "An _______ to the conference schedule has been posted online, noting the change in the keynote speaker's time slot.",
                    options: ["announce", "announcement", "announced", "announcer"],
                    correct: 1, // announcement
                    explanation: "Đáp án đúng là (B) 'announcement'. Vị trí sau mạo từ 'An' và trước giới từ 'to' cần một **danh từ (noun)**. 'Announcement' (thông báo) là danh từ phù hợp. 'Addition' cũng có thể dùng được, nhưng không có trong lựa chọn. (A) 'announce' là động từ. (C) 'announced' là tính từ hoặc phân từ quá khứ. (D) 'announcer' là danh từ chỉ người (người thông báo), không phù hợp với nghĩa của câu (một bản thông báo/bổ sung)."
                },
                {
                    id: 26,
                    question: "The research findings were not _______ significant to warrant a change in the current medical guidelines.",
                    options: ["statistic", "statistically", "statistics", "statistician"],
                    correct: 1, // statistically
                    explanation: "Đáp án đúng là (B) 'statistically'. Vị trí này cần một **trạng từ (adverb)** để bổ nghĩa cho tính từ 'significant'. 'Statistically significant' là một **collocation học thuật rất phổ biến** trong nghiên cứu, có nghĩa là 'có ý nghĩa thống kê'. (A) 'statistic' là tính từ hoặc danh từ, không phải trạng từ. (C) 'statistics' là danh từ. (D) 'statistician' là danh từ chỉ người (nhà thống kê)."
                },
                {
                    id: 27,
                    question: "Students are encouraged to _______ with their advisors regularly to ensure they are on track for graduation.",
                    options: ["meet", "meeting", "met", "will meet"],
                    correct: 0, // meet
                    explanation: "Đáp án đúng là (A) 'meet'. Sau cụm 'are encouraged to', chúng ta cần một **động từ nguyên thể (to + V)**. 'Are encouraged to meet' là cấu trúc chính xác. Các lựa chọn khác đều là các dạng động từ không phù hợp sau 'to': (B) V-ing, (C) V2/V3, (D) modal verb + V."
                },
                {
                    id: 28,
                    question: "The scholarship committee places a high _______ on academic achievement, leadership qualities, and community service.",
                    options: ["valuable", "value", "valuing", "valued"],
                    correct: 1, // value
                    explanation: "Đáp án đúng là (B) 'value'. Cụm từ cố định là 'place a high value on something' (coi trọng, đánh giá cao điều gì). Ở đây, 'value' là một **danh từ**. (A) 'valuable' là tính từ. (C) 'valuing' là danh động từ. (D) 'valued' là tính từ (được đánh giá cao). Chỉ có danh từ 'value' mới đúng với cấu trúc 'place a + [adj] + [noun] + on'."
                },
                {
                    id: 29,
                    question: "_______ the initial hypothesis was incorrect, the experiment yielded unexpected data that opened up a new line of inquiry.",
                    options: ["Although", "Moreover", "Therefore", "Because"],
                    correct: 0, // Although
                    explanation: "Đáp án đúng là (A) 'Although'. Câu này thể hiện sự **tương phản** giữa hai mệnh đề: Giả thuyết ban đầu sai NHƯNG thí nghiệm vẫn tạo ra dữ liệu có giá trị. 'Although' (Mặc dù) là liên từ chỉ sự nhượng bộ, phù hợp nhất. 'Moreover' (B) thêm thông tin. 'Therefore' (C) chỉ kết quả. 'Because' (D) chỉ nguyên nhân. Cả ba từ sau đều không thể hiện được mối quan hệ tương phản cần thiết trong câu."
                },
                {
                    id: 30,
                    question: "The university's career center offers workshops on resume writing, interview skills, and professional _______.",
                    options: ["develop", "developed", "development", "developer"],
                    correct: 2, // development
                    explanation: "Đáp án đúng là (C) 'development'. Cấu trúc song song (parallel structure) yêu cầu tất cả các thành phần trong danh sách phải cùng từ loại. Ở đây, 'resume writing' (danh danh từ), 'interview skills' (danh từ), vì vậy vị trí trống cũng cần một **danh từ**. 'Professional development' (phát triển chuyên môn) là một danh từ ghép phổ biến. (A) 'develop' là động từ. (B) 'developed' là tính từ. (D) 'developer' là danh từ chỉ người, không phù hợp với nghĩa chung của danh sách (các kỹ năng/dịch vụ)."
                }
            ]
        },

        part6: {
            title: "PART 6: Cloze Text (Academic Announcement)",
            description: "10 câu hỏi - Điền từ/cụm từ vào văn bản thông báo. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
            type: "reading",
            text: `To: All Faculty and Research Staff
From: Office of Research and Innovation
Subject: Call for Proposals – Interdisciplinary Research Grants

The Office of Research and Innovation is pleased to announce the launch of the 2024 Interdisciplinary Research Grant (IRG) program. This initiative is designed to (31) collaborative research projects that transcend traditional academic boundaries and address complex societal challenges.

Grant Details:
- **Funding Amount:** Up to $50,000 per project for a duration of 18 months.
- **Eligibility:** Teams must consist of at least three faculty members from (32) two different schools or departments within the university.
- **Focus Areas:** Priority will be given to proposals related to climate change adaptation, public health equity, and ethical artificial intelligence.

Application Process:
Proposals must be submitted (33) the university's online grant management portal by **November 15, 2024, at 5:00 PM**. Late submissions will not be considered. The application package should include a project narrative, detailed budget, CVs of key personnel, and a letter of support from the relevant department chairs.

A series of informational workshops will be held throughout October to assist applicants in (34) strong proposals. We strongly encourage potential applicants to attend one of these sessions. The schedule is available on our website.

Review and Selection:
Proposals will undergo a rigorous peer-review process (35) by a panel of internal and external experts. The primary evaluation criteria are intellectual merit, interdisciplinary nature, feasibility, and potential for broader impact. Successful applicants will be notified by January 31, 2025.

We believe that fostering interdisciplinary collaboration is key to (36) innovative solutions and advancing knowledge. We look forward to receiving your groundbreaking proposals.

For further information, please visit our website or contact grants@university.edu.`,
            questions: [
                {
                    id: 31,
                    type: "fill",
                    question: "(31) - Điền từ thích hợp",
                    context: "This initiative is designed to (31) collaborative research projects...",
                    options: ["promote", "promoting", "promotes", "promoted"],
                    correct: 0, // promote
                    explanation: "Đáp án đúng là (A) 'promote'. Sau cụm 'is designed to', chúng ta cần một **động từ nguyên thể (to + V)**. 'Is designed to promote' là cấu trúc chính xác để diễn tả mục đích của sáng kiến. Các dạng 'promoting', 'promotes', 'promoted' đều không đúng cấu trúc sau 'to' khi 'to' là một phần của động từ nguyên thể."
                },
                {
                    id: 32,
                    type: "fill",
                    question: "(32) - Điền từ thích hợp",
                    context: "...at least three faculty members from (32) two different schools...",
                    options: ["minimally", "minimum", "at least", "a minimum of"],
                    correct: 3, // a minimum of
                    explanation: "Đáp án đúng là (D) 'a minimum of'. Cụm từ này được dùng như một tính từ bổ nghĩa cho số lượng, có nghĩa là 'tối thiểu là'. Cấu trúc 'from a minimum of two different schools' là chuẩn xác và trang trọng. (A) 'minimally' là trạng từ (một cách tối thiểu), không bổ nghĩa cho số được. (B) 'minimum' là danh từ, cần có 'a' và 'of'. (C) 'at least' cũng có nghĩa 'ít nhất', nhưng nó thường đứng trước một con số mà không cần 'of' (e.g., from at least two schools). Tuy nhiên, trong ngữ cảnh văn bản trang trọng này, 'a minimum of' thường được ưa chuộng hơn."
                },
                {
                    id: 33,
                    type: "fill",
                    question: "(33) - Điền từ thích hợp",
                    context: "Proposals must be submitted (33) the university's online grant management portal...",
                    options: ["by", "through", "on", "via"],
                    correct: 1, // through (or via)
                    explanation: "Đáp án đúng là (B) 'through' hoặc (D) 'via' cũng đúng, nhưng dựa trên các lựa chọn, ta cần xem xét. Trong văn cảnh công nghệ và hệ thống, 'submitted through a portal' (nộp thông qua một cổng thông tin) là cách diễn đạt tự nhiên. 'Via' cũng có nghĩa tương tự. 'By' thường chỉ thời hạn (by November 15) hoặc tác nhân (submitted by the PI). 'On' thường chỉ nền tảng (on the website). Ở đây, đề bài chỉ có 4 lựa chọn và không có 'via', nên 'through' là đáp án tốt nhất. (Lưu ý: Nếu có cả 'via' và 'through', cả hai đều có thể chấp nhận. Trong đề này, 'through' là lựa chọn được cung cấp và phù hợp)."
                },
                {
                    id: 34,
                    type: "fill",
                    question: "(34) - Điền từ thích hợp",
                    context: "...to assist applicants in (34) strong proposals.",
                    options: ["develop", "developing", "development", "developed"],
                    correct: 1, // developing
                    explanation: "Đáp án đúng là (B) 'developing'. Sau giới từ 'in', chúng ta cần một **danh động từ (V-ing)**. 'In developing strong proposals' là chính xác. (A) 'develop' là động từ nguyên thể. (C) 'development' là danh từ, nhưng sau 'in' với nghĩa này, V-ing thường tự nhiên hơn để chỉ hành động. (D) 'developed' là phân từ quá khứ."
                },
                {
                    id: 35,
                    type: "fill",
                    question: "(35) - Điền từ thích hợp",
                    context: "...will undergo a rigorous peer-review process (35) by a panel of experts.",
                    options: ["conducted", "conducting", "conduct", "which conduct"],
                    correct: 0, // conducted
                    explanation: "Đáp án đúng là (A) 'conducted'. Đây là cấu trúc **rút gọn mệnh đề quan hệ bị động**. Đầy đủ là: 'a process (that is) conducted by a panel...'. Phân từ quá khứ 'conducted' được dùng để bổ nghĩa cho danh từ 'process' và thể hiện nghĩa bị động (quy trình được tiến hành bởi hội đồng). (B) 'conducting' mang nghĩa chủ động (quy trình tự tiến hành việc gì đó - vô lý). (C) 'conduct' là động từ nguyên thể, không phù hợp. (D) 'which conduct' là mệnh đề quan hệ chủ động, cũng sai vì 'process' không thể tự 'conduct'."
                },
                {
                    id: 36,
                    type: "fill",
                    question: "(36) - Điền từ thích hợp",
                    context: "...is key to (36) innovative solutions and advancing knowledge.",
                    options: ["generate", "generating", "generation", "generates"],
                    correct: 1, // generating
                    explanation: "Đáp án đúng là (B) 'generating'. Cụm 'key to' ở đây có 'to' là **giới từ**, do đó theo sau nó phải là một **danh từ hoặc danh động từ (V-ing)**. Hơn nữa, cấu trúc song song yêu cầu 'generating' (V-ing) để phù hợp với 'advancing' (V-ing) đứng ngay sau 'and'. (A) 'generate' là động từ nguyên thể, sai sau giới từ. (C) 'generation' là danh từ, có thể dùng được nhưng không tạo được sự song song hoàn hảo với 'advancing' (danh động từ). (D) 'generates' là động từ chia thì."
                },
                {
                    id: 37,
                    type: "comprehension",
                    question: "(37) - What is the primary goal of the Interdisciplinary Research Grant (IRG) program?",
                    options: [
                        "To fund individual faculty research",
                        "To support collaborative projects across disciplines",
                        "To provide scholarships for graduate students",
                        "To upgrade laboratory equipment"
                    ],
                    correct: 1, // Collaborative projects across disciplines
                    explanation: "Đáp án đúng là (B) 'To support collaborative projects across disciplines.' Câu đầu tiên của thông báo nêu rõ mục đích: 'This initiative is designed to promote **collaborative research projects that transcend traditional academic boundaries**...' Cụm 'interdisciplinary' (liên ngành) và 'transcend traditional boundaries' (vượt qua ranh giới truyền thống) đều chỉ dự án hợp tác giữa các lĩnh vực khác nhau. Các mục tiêu khác không được đề cập."
                },
                {
                    id: 38,
                    type: "comprehension",
                    question: "(38) - What is the final deadline for proposal submission?",
                    options: [
                        "October 31, 2024",
                        "November 15, 2024, at 5:00 PM",
                        "January 31, 2025",
                        "December 1, 2024"
                    ],
                    correct: 1, // Nov 15, 5 PM
                    explanation: "Đáp án đúng là (B) 'November 15, 2024, at 5:00 PM.' Thông báo ghi rõ: 'Proposals must be submitted... by **November 15, 2024, at 5:00 PM**.' Đây là thời hạn cuối cùng và thông báo nhấn mạnh 'Late submissions will not be considered.' Ngày 31/1/2025 (C) là ngày thông báo kết quả, không phải hạn nộp."
                },
                {
                    id: 39,
                    type: "comprehension",
                    question: "(39) - Which of the following is NOT listed as a priority focus area for the grant?",
                    options: [
                        "Climate change adaptation",
                        "Public health equity",
                        "Renewable energy technology",
                        "Ethical artificial intelligence"
                    ],
                    correct: 2, // Renewable energy
                    explanation: "Đáp án đúng là (C) 'Renewable energy technology.' Văn bản liệt kê ba lĩnh vực trọng tâm: '**climate change adaptation, public health equity, and ethical artificial intelligence**.' 'Renewable energy technology' không xuất hiện trong danh sách này, mặc dù nó có thể liên quan đến biến đổi khí hậu."
                },
                {
                    id: 40,
                    type: "comprehension",
                    question: "(40) - Who will review the proposals?",
                    options: [
                        "Department chairs only",
                        "The Office of Research and Innovation staff",
                        "A panel of internal and external experts",
                        "A student committee"
                    ],
                    correct: 2, // Panel of experts
                    explanation: "Đáp án đúng là (C) 'A panel of internal and external experts.' Thông báo nêu rõ: 'Proposals will undergo a rigorous peer-review process conducted by **a panel of internal and external experts**.' Điều này đảm bảo tính khách quan và chuyên môn cao. Các nhóm khác không được giao nhiệm vụ đánh giá chính."
                }
            ]
        },

        part7: {
            title: "PART 7: Multiple Texts (Course Syllabus & Student Email)",
            description: "10 câu hỏi - Đọc trích đoạn chương trình học (syllabus) và email của sinh viên, chọn đáp án tốt nhất (A, B, C, D).",
            type: "reading",
            text: `**Text 1: Excerpt from Course Syllabus – BIO 310: Ecology and Conservation**

**Course Instructor:** Dr. Alisha Chen
**Email:** achen@university.edu (Please allow 24-48 hours for a response)
**Office Hours:** Tuesdays & Thursdays, 10:00 AM – 12:00 PM, Science Hall 405 (or by appointment)

**Course Description:**
This upper-level course examines the principles of ecology at the population, community, and ecosystem levels, with a special emphasis on applied conservation biology. Topics include population dynamics, species interactions, biodiversity assessment, and the design of protected areas.

**Assessment:**
- Midterm Exam: 25%
- Final Exam: 35%
- Group Research Project: 30% (Proposal due Week 6; Final report due Week 14)
- Class Participation & Weekly Quizzes: 10%

**Key Policies:**
- **Attendance:** Regular attendance is expected. More than three unexcused absences may result in a lowering of your final grade.
- **Late Assignments:** Assignments submitted after the deadline will be penalized 10% per day, up to a maximum of three days. After three days, the assignment will not be accepted unless a formal extension has been granted (e.g., for medical reasons with documentation).
- **Academic Integrity:** All work must be your own. Plagiarism will result in a failing grade for the assignment and possible further disciplinary action.

---
**Text 2: Email from a Student**

To: Dr. Alisha Chen (achen@university.edu)
From: michael.robinson@student.university.edu
Date: October 12
Subject: Question about BIO 310 Group Project & Extension Request

Dear Dr. Chen,

I am writing regarding the Group Research Project for BIO 310. My group has chosen to study the impact of urban noise pollution on local bird populations. We are excited about the project but have encountered a minor setback.

One of our key team members, Sarah, has had a family emergency and will be out of town for the next two weeks. This will significantly delay our data collection phase, which we had planned for next week. We are worried that this will prevent us from submitting a complete project proposal by the deadline (Week 6).

Would it be possible to request a one-week extension for the project proposal submission? We have attached a draft of our research question and methodology to show our progress so far. If an extension is not possible, could you advise us on how to proceed? We are all committed to producing high-quality work.

Thank you for your understanding and guidance.

Sincerely,
Michael Robinson
(on behalf of Group 4)`,
            questions: [
                {
                    id: 41,
                    question: "What is the main subject of the BIO 310 course?",
                    options: [
                        "Cell biology and genetics",
                        "Human anatomy and physiology",
                        "Ecology and conservation biology",
                        "Organic chemistry reactions"
                    ],
                    correct: 2, // Ecology and conservation
                    explanation: "Đáp án đúng là (C) 'Ecology and conservation biology.' Tiêu đề khóa học và phần mô tả đều chỉ rõ: 'BIO 310: **Ecology and Conservation**' và '...principles of ecology... with a special emphasis on applied **conservation biology**.' Các chủ đề khác không được đề cập trong trích đoạn giáo trình."
                },
                {
                    id: 42,
                    question: "According to the syllabus, what percentage of the final grade is the Group Research Project worth?",
                    options: ["10%", "25%", "30%", "35%"],
                    correct: 2, // 30%
                    explanation: "Đáp án đúng là (C) '30%.' Trong phần 'Assessment' của giáo trình, nó được liệt kê rõ ràng: '**Group Research Project: 30%**'. Bài kiểm tra giữa kỳ là 25%, bài kiểm tra cuối kỳ là 35%, và phần tham gia lớp học là 10%."
                },
                {
                    id: 43,
                    question: "What is the penalty for late assignments, as stated in the syllabus?",
                    options: [
                        "5% per day with no maximum",
                        "10% per day, up to a maximum of three days",
                        "Immediate failure if late",
                        "No penalty if an excuse is provided"
                    ],
                    correct: 1, // 10% per day, max 3 days
                    explanation: "Đáp án đúng là (B) '10% per day, up to a maximum of three days.' Chính sách trong giáo trình viết: '...penalized **10% per day, up to a maximum of three days**. After three days, the assignment will not be accepted...' Đây là quy tắc rất cụ thể. Lựa chọn (D) sai vì việc miễn phạt chỉ xảy ra nếu có lý do chính đáng và được cấp phép gia hạn chính thức."
                },
                {
                    id: 44,
                    question: "Why is Michael Robinson writing to Dr. Chen?",
                    options: [
                        "To submit the final project report early",
                        "To request a one-week extension for the project proposal",
                        "To report a case of plagiarism in his group",
                        "To ask for clarification on the midterm exam content"
                    ],
                    correct: 1, // Request extension
                    explanation: "Đáp án đúng là (B) 'To request a one-week extension for the project proposal.' Trong email, Michael nêu lý do (thành viên gặp khẩn cấp gia đình) và sau đó hỏi rõ ràng: '**Would it be possible to request a one-week extension for the project proposal submission?**' Đây là mục đích chính của email. Các hành động khác không được đề cập."
                },
                {
                    id: 45,
                    question: "What topic has Michael's group chosen for their research project?",
                    options: [
                        "The effect of fertilizers on plant growth",
                        "The impact of urban noise pollution on local bird populations",
                        "The biodiversity of coral reefs",
                        "Population dynamics of wolves in Yellowstone"
                    ],
                    correct: 1, // Noise pollution on birds
                    explanation: "Đáp án đúng là (B) 'The impact of urban noise pollution on local bird populations.' Michael viết trong email: 'My group has chosen to study **the impact of urban noise pollution on local bird populations**.' Đây là chủ đề cụ thể của họ. Các chủ đề khác không được đề cập."
                },
                {
                    id: 46,
                    question: "According to the syllabus, what could happen if a student has more than three unexcused absences?",
                    options: [
                        "They will automatically fail the course.",
                        "Their final grade may be lowered.",
                        "They must complete extra assignments.",
                        "They will be reported to the dean."
                    ],
                    correct: 1, // Final grade may be lowered
                    explanation: "Đáp án đúng là (B) 'Their final grade may be lowered.' Giáo trình quy định: 'More than three unexcused absences **may result in a lowering of your final grade**.' Đây là một hậu quả có thể xảy ra, không phải tự động (A). Các biện pháp khác không được đề cập."
                },
                {
                    id: 47,
                    question: "What has Michael attached to his email to Dr. Chen?",
                    options: [
                        "A medical note for his teammate",
                        "The completed project proposal",
                        "A draft of their research question and methodology",
                        "The syllabus for another course"
                    ],
                    correct: 2, // Draft of research question & method
                    explanation: "Đáp án đúng là (C) 'A draft of their research question and methodology.' Michael viết: 'We have attached **a draft of our research question and methodology** to show our progress so far.' Đây là bằng chứng cho thấy nhóm đã làm việc và không chỉ đơn thuần xin gia hạn."
                },
                {
                    id: 48,
                    question: "What is the largest component of the course grade?",
                    options: [
                        "Midterm Exam",
                        "Final Exam",
                        "Group Research Project",
                        "Class Participation"
                    ],
                    correct: 1, // Final Exam (35%)
                    explanation: "Đáp án đúng là (B) 'Final Exam.' Dựa trên tỷ trọng trong giáo trình: Final Exam là 35%, đây là phần lớn nhất. Group Project là 30%, Midterm là 25%, và Participation là 10%."
                },
                {
                    id: 49,
                    question: "When are Dr. Chen's regular office hours?",
                    options: [
                        "Mondays and Wednesdays, 1-3 PM",
                        "Tuesdays and Thursdays, 10 AM-12 PM",
                        "Fridays, 9-11 AM",
                        "By appointment only"
                    ],
                    correct: 1, // Tues & Thurs 10-12
                    explanation: "Đáp án đúng là (B) 'Tuesdays and Thursdays, 10 AM-12 PM.' Giáo trình ghi rõ: '**Office Hours:** Tuesdays & Thursdays, 10:00 AM – 12:00 PM...' Lựa chọn 'by appointment only' (D) là sai vì đây là một lựa chọn bổ sung ('or by appointment')."
                },
                {
                    id: 50,
                    question: "What potential consequence does the syllabus mention for plagiarism?",
                    options: [
                        "A warning for the first offense",
                        "A failing grade for the assignment and possible further action",
                        "Automatic failure of the entire course",
                        "Required attendance at an ethics workshop"
                    ],
                    correct: 1, // Failing grade for assignment & possible further action
                    explanation: "Đáp án đúng là (B) 'A failing grade for the assignment and possible further action.' Giáo trình nêu rõ: 'Plagiarism will result in a **failing grade for the assignment and possible further disciplinary action**.' Đây là một chính sách nghiêm khắc và rõ ràng. Nó không nói 'automatic failure of the course' (C), mặc dù đó có thể là một phần của 'further disciplinary action' trong trường hợp nghiêm trọng."
                }
            ]
        },

       part8: {
  title: "PART 8: Text Message Chain (Student Group Planning)",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn của một nhóm sinh viên đang lên kế hoạch làm bài thuyết trình. Chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Priya (9:14): Hi team! We need to finalize our presentation topic for the persuasive speaking assignment. Any ideas? The theme is "Sustainability in Daily Life."

Jake (9:30): How about focusing on reducing single-use plastics? It's a huge issue and we can propose practical alternatives like reusable bottles and bags.

Leo (9:45): That's good, but maybe it's been done a lot. What about "The hidden water footprint of our digital lives"? I read that streaming videos and data centers use massive amounts of water for cooling. It's less obvious but really persuasive.

Priya (10:02): @Leo That's a fascinating and unique angle! It fits the theme perfectly and would definitely stand out. I'm leaning towards that.

Jake (10:15): Okay, I'm convinced. The digital footprint idea is stronger. Let's go with that. We need to divide the work. I can research the data on water usage by tech companies.

Leo (10:20): I'll handle the section on practical steps individuals can take to reduce their digital water footprint (e.g., lowering streaming quality, deleting old emails/files).

Priya (10:25): Great. I'll create the slides and visuals, and draft the introduction and conclusion. Can everyone share their research notes with me by Wednesday night so I can start integrating?

Jake (10:30): Will do. What about the rehearsal schedule? The presentation is next Monday.

Leo (10:35): We should do a full run-through at least twice. How about we meet Friday at 4 PM in the library study room? I can book it.

Priya (10:40): Friday at 4 works for me. Jake?
Jake (10:42): Confirmed. See you both then. Let's aim to have our individual parts 90% done by Friday so the rehearsal is productive.`,
  
  questions: [
    {
      id: 51,
      question: "What is the general theme of the presentation assignment?",
      options: [
        "The Future of Technology",
        "Business Communication Strategies",
        "Sustainability in Daily Life",
        "Public Health Awareness"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Sustainability in Daily Life.' Ngay trong tin nhắn đầu tiên, Priya nêu rõ chủ đề: 'The theme is **\"Sustainability in Daily Life.\"**' Toàn bộ cuộc thảo luận sau đó xoay quanh việc chọn một chủ đề phù hợp với chủ đề này."
    },
    {
      id: 52,
      question: "What was Jake's initial topic suggestion?",
      options: [
        "The water footprint of digital life",
        "Reducing food waste",
        "Promoting public transportation",
        "Reducing single-use plastics"
      ],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Reducing single-use plastics.' Jake đề xuất: 'How about focusing on **reducing single-use plastics**?' Đây là ý tưởng ban đầu của anh ấy. Chủ đề về 'water footprint of digital life' (A) là đề xuất của Leo sau đó."
    },
    {
      id: 53,
      question: "Why does Leo think his suggested topic is better?",
      options: [
        "It is easier to research.",
        "It has been done a lot by other students.",
        "It is less obvious and would stand out.",
        "It requires fewer slides."
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'It is less obvious and would stand out.' Leo phản bác ý tưởng của Jake bằng cách nói: 'That's good, but maybe **it's been done a lot**. What about... It's **less obvious but really persuasive**.' Ưu điểm chính Leo đưa ra là tính độc đáo và sức thuyết phục của chủ đề ít được biết đến hơn."
    },
    {
      id: 54,
      question: "What is Jake's assigned research area?",
      options: [
        "Practical steps for individuals",
        "Creating slides and visuals",
        "Data on water usage by tech companies",
        "Drafting the introduction"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Data on water usage by tech companies.' Sau khi quyết định chủ đề, Jake tình nguyện: 'I can research the **data on water usage by tech companies**.' Đây là nhiệm vụ cụ thể của anh ấy. 'Practical steps' (A) là của Leo. 'Slides and visuals' (B) và 'introduction' (một phần của D) là của Priya."
    },
    {
      id: 55,
      question: "What is Priya's main responsibility?",
      options: [
        "Researching water usage data",
        "Booking the study room",
        "Creating slides and drafting the intro/conclusion",
        "Researching practical steps"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Creating slides and drafting the intro/conclusion.' Priya nói: 'I'll **create the slides and visuals, and draft the introduction and conclusion**.' Cô ấy cũng là người điều phối, yêu cầu mọi người gửi ghi chú cho cô ấy để tổng hợp."
    },
    {
      id: 56,
      question: "By when should team members share their research notes with Priya?",
      options: [
        "Monday night",
        "Wednesday night",
        "Friday morning",
        "Sunday afternoon"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Wednesday night.' Priya yêu cầu: 'Can everyone share their research notes with me by **Wednesday night** so I can start integrating?' Đây là một mốc thời gian quan trọng để cô ấy bắt đầu làm slide."
    },
    {
      id: 57,
      question: "When is the final presentation due?",
      options: [
        "This Wednesday",
        "Next Monday",
        "Friday of this week",
        "Two weeks from now"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Next Monday.' Jake nhắc nhở: 'The presentation is **next Monday**.' Điều này thúc đẩy họ lên lịch tập duyệt vào thứ Sáu."
    },
    {
      id: 58,
      question: "When and where is the rehearsal scheduled?",
      options: [
        "Thursday at 2 PM in the student lounge",
        "Friday at 4 PM in the library study room",
        "Saturday morning online",
        "Monday before class in the classroom"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Friday at 4 PM in the library study room.' Leo đề xuất: 'How about we meet **Friday at 4 PM in the library study room**?' Priya và Jake sau đó xác nhận lịch này."
    },
    {
      id: 59,
      question: "What does Jake suggest about the individual work before the Friday rehearsal?",
      options: [
        "It should be completely finished.",
        "It should be about 90% done.",
        "They can finish it together at the rehearsal.",
        "Only an outline is needed."
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'It should be about 90% done.' Trong tin nhắn cuối cùng, Jake viết: 'Let's aim to have our **individual parts 90% done by Friday** so the rehearsal is productive.' Điều này cho thấy anh ấy muốn buổi tập duyệt diễn ra suôn sẻ và hiệu quả, không phải để hoàn thành công việc cá nhân."
    },
    {
      id: 60,
      question: "Which of the following best describes the group's decision-making process?",
      options: [
        "One person made the final decision without discussion.",
        "They argued and could not agree on a topic.",
        "They discussed options and agreed on the most unique idea.",
        "They decided to combine both suggested topics."
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'They discussed options and agreed on the most unique idea.' Quá trình được thể hiện rõ: Jake đề xuất một ý tưởng, Leo đưa ra một ý tưởng khác với lý do thuyết phục (độc đáo hơn), Priya ủng hộ ý tưởng của Leo, và sau đó Jake đồng ý. Đây là một quá trình thảo luận hợp tác và đi đến đồng thuận dựa trên chất lượng của ý tưởng. Không có dấu hiệu của việc độc đoán (A), bất đồng (B), hay kết hợp cả hai (D)."
    }
  ]
},
    }
};