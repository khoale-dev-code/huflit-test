export const EXAM6_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 6 (Chủ Đề Giáo Dục)",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Hỗ trợ ôn luyện toàn diện theo cấu trúc HUFLIT. Part 1 mở rộng: 5 câu hỏi từ 1 hội thoại dài để luyện nghe chi tiết về phương pháp học tập hiện đại.",
  parts: {
    // Listening Parts - Part 1 cập nhật: 1 hội thoại chung cho 5 câu hỏi
   part1: {
  title: "PART 1: Short Conversations (Mở Rộng - 1 Hội Thoại Chung Cho 5 Câu)",
  description: "5 câu hỏi - 1 đoạn hội thoại dài giữa Emma và Mark về chuyển đổi sang học trực tuyến. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D) dựa trên chi tiết. (Hỗ trợ luyện nghe hội thoại thực tế HUFLIT).",
  type: "listening",
  script: "Emma: Mark, how are you adjusting to the hybrid learning model at university? It's a big shift from traditional classes.\nMark: It's challenging but rewarding, Emma. Last semester, we had three days online and two in-person. The flexibility helps with my part-time job, but I miss the face-to-face discussions.\nEmma: I get that. My online platform uses interactive quizzes that provide instant feedback—it's improved my retention by 20%.\nMark: Nice. Our professor assigns group projects via Zoom, which builds collaboration skills, though time zones can be tricky for international students.\nEmma: True. Overall, do you think it's preparing us better for the workforce?",
  questions: [
    {
      id: 1,
      question: "What is the hybrid learning model like for Mark?",
      options: [
        "(A) All classes online.",
        "(B) Three days online and two in-person.",
        "(C) Fully in-person with optional online.",
        "(D) One day online per week."
      ],
      correct: 1,
      explanation: "Mark: 'Last semester, we had three days online and two in-person.' (Mark: 'Học kỳ trước, chúng tôi có ba ngày trực tuyến và hai ngày trực tiếp.') - Luyện nghe cấu trúc mô hình học tập lai."
    },
    {
      id: 2,
      question: "How does the hybrid model help Mark?",
      options: [
        "(A) It eliminates his part-time job.",
        "(B) It provides more flexibility for his job.",
        "(C) It reduces discussion time.",
        "(D) It increases in-person attendance."
      ],
      correct: 1,
      explanation: "Mark: 'The flexibility helps with my part-time job.' (Mark: 'Sự linh hoạt giúp đỡ công việc bán thời gian của tôi.') - Luyện nghe lợi ích cân bằng học tập và làm việc."
    },
    {
      id: 3,
      question: "What feature does Emma's online platform have?",
      options: [
        "(A) Delayed feedback quizzes.",
        "(B) Interactive quizzes with instant feedback.",
        "(C) No quizzes at all.",
        "(D) Group discussion forums only."
      ],
      correct: 1,
      explanation: "Emma: 'My online platform uses interactive quizzes that provide instant feedback.' (Emma: 'Nền tảng trực tuyến của tôi sử dụng bài kiểm tra tương tác cung cấp phản hồi ngay lập tức.') - Luyện nghe công cụ hỗ trợ học tập trực tuyến."
    },
    {
      id: 4,
      question: "What improvement did Emma notice?",
      options: [
        "(A) Decreased retention by 20%.",
        "(B) Improved retention by 20%.",
        "(C) No change in study time.",
        "(D) Reduced group work."
      ],
      correct: 1,
      explanation: "Emma: 'It's improved my retention by 20%.' (Emma: 'Nó cải thiện khả năng ghi nhớ của tôi 20%.' ) - Luyện nghe tác động tích cực đến hiệu quả học tập."
    },
    {
      id: 5,
      question: "What challenge does Mark mention for group projects?",
      options: [
        "(A) Lack of collaboration tools.",
        "(B) Time zones for international students.",
        "(C) No Zoom access.",
        "(D) Too many in-person meetings."
      ],
      correct: 1,
      explanation: "Mark: 'Though time zones can be tricky for international students.' (Mark: 'Mặc dù múi giờ có thể khó khăn cho sinh viên quốc tế.') - Luyện nghe thách thức toàn cầu hóa giáo dục."
    }
  ]
},
part2: {
  title: "PART 2: Longer Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại dài giữa ba người: Sarah, Professor và John. Nghe toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Narrator: In a university advising session.\nSarah: Professor, John and I are discussing our thesis topics. We're interested in inclusive education strategies.\nProfessor: Excellent choice. Inclusive classrooms benefit all students by fostering empathy and diverse perspectives.\nJohn: Right. We've read about universal design for learning—adapting materials for different needs without segregating students.\nSarah: And policy-wise, how can schools implement anti-bullying programs effectively?\nProfessor: Start with teacher training and student-led initiatives. Last year, our program reduced incidents by 40%.\nJohn: Inspiring. For our research, we'll survey local teachers on barriers to inclusion.",
  questions: [
    {
      id: 6,
      question: "What is the focus of Sarah and John's thesis?",
      options: ["(A) Online learning tools", "(B) Inclusive education strategies", "(C) Exam preparation methods", "(D) Campus facilities"],
      correct: 1,
      explanation: "Sarah: 'We're interested in inclusive education strategies.' (Sarah: 'Chúng tôi quan tâm đến chiến lược giáo dục hòa nhập.') - Luyện nghe chủ đề nghiên cứu sinh viên."
    },
    {
      id: 7,
      question: "According to the professor, what do inclusive classrooms foster?",
      options: ["(A) Competition among students", "(B) Empathy and diverse perspectives", "(C) Strict discipline only", "(D) Segregated learning"],
      correct: 1,
      explanation: "Professor: 'Inclusive classrooms benefit all students by fostering empathy and diverse perspectives.' (Giáo sư: 'Lớp học hòa nhập mang lợi ích cho tất cả bằng cách nuôi dưỡng sự đồng cảm và góc nhìn đa dạng.') - Luyện nghe lợi ích giáo dục hòa nhập."
    },
    {
      id: 8,
      question: "What concept have Sarah and John read about?",
      options: ["(A) Traditional lecturing", "(B) Universal design for learning", "(C) Standardized testing", "(D) Extracurricular activities"],
      correct: 1,
      explanation: "John: 'Universal design for learning—adapting materials for different needs.' (John: 'Thiết kế phổ quát cho học tập—thích ứng tài liệu cho nhu cầu khác nhau.') - Luyện nghe phương pháp giảng dạy hiện đại."
    },
    {
      id: 9,
      question: "What reduced incidents by 40% last year?",
      options: ["(A) New textbooks", "(B) Anti-bullying program", "(C) Online surveys", "(D) Teacher evaluations"],
      correct: 1,
      explanation: "Professor: 'Our program reduced incidents by 40%.' (Giáo sư: 'Chương trình của chúng tôi giảm 40% sự cố.') - Luyện nghe thành tựu chương trình chống bắt nạt."
    },
    {
      id: 10,
      question: "What will Sarah and John do for their research?",
      options: ["(A) Interview administrators", "(B) Survey local teachers on barriers", "(C) Design new curricula", "(D) Organize workshops"],
      correct: 1,
      explanation: "John: 'We'll survey local teachers on barriers to inclusion.' (John: 'Chúng tôi sẽ khảo sát giáo viên địa phương về rào cản hòa nhập.') - Luyện nghe phương pháp nghiên cứu giáo dục."
    }
  ]
},
part3: {
  title: "PART 3: Monologue",
  description: "5 câu hỏi - Một đoạn độc thoại (bài nói ngắn) của Dr. Smith về vai trò công nghệ trong giáo dục. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Dr. Smith: Hello, everyone. In this talk, I'll explore technology's role in modern education. Digital tools like learning management systems have democratized access, allowing remote students to engage equally. However, the digital divide persists—rural areas often lack reliable internet. Our study found that blended learning increases engagement by 25%. Teachers must receive ongoing training to integrate tech effectively. Ultimately, technology enhances, but doesn't replace, human interaction in learning.",
  questions: [
    {
      id: 11,
      question: "The talk is about __________.",
      options: ["(A) Traditional teaching methods", "(B) Technology's role in education", "(C) School funding issues", "(D) Student sports programs"],
      correct: 1,
      explanation: "Dr. Smith: 'I'll explore technology's role in modern education.' (Bác sĩ Smith: 'Tôi sẽ khám phá vai trò công nghệ trong giáo dục hiện đại.') - Luyện nghe chủ đề bài nói giáo dục."
    },
    {
      id: 12,
      question: "What have digital tools democratized?",
      options: ["(A) Access to education", "(B) Physical classrooms", "(C) Textbook publishing", "(D) Exam grading only"],
      correct: 0,
      explanation: "Dr. Smith: 'Digital tools... have democratized access.' (Bác sĩ Smith: 'Công cụ kỹ thuật số... đã dân chủ hóa tiếp cận.') - Luyện nghe lợi ích tiếp cận giáo dục."
    },
    {
      id: 13,
      question: "What persists as a challenge?",
      options: ["(A) Overuse of technology", "(B) The digital divide", "(C) Too many teachers", "(D) Free internet everywhere"],
      correct: 1,
      explanation: "Dr. Smith: 'The digital divide persists—rural areas often lack reliable internet.' (Bác sĩ Smith: 'Khoảng cách kỹ thuật số vẫn tồn tại—khu vực nông thôn thường thiếu internet đáng tin cậy.') - Luyện nghe thách thức bất bình đẳng công nghệ."
    },
    {
      id: 14,
      question: "By what percentage does blended learning increase engagement?",
      options: ["(A) 15%", "(B) 20%", "(C) 25%", "(D) 30%"],
      correct: 2,
      explanation: "Dr. Smith: 'Blended learning increases engagement by 25%.' (Bác sĩ Smith: 'Học tập kết hợp tăng tương tác 25%.') - Luyện nghe dữ liệu nghiên cứu giáo dục."
    },
    {
      id: 15,
      question: "What must teachers receive?",
      options: ["(A) More vacation time", "(B) Ongoing training to integrate tech", "(C) New computers only", "(D) Reduced class sizes"],
      correct: 1,
      explanation: "Dr. Smith: 'Teachers must receive ongoing training to integrate tech effectively.' (Bác sĩ Smith: 'Giáo viên phải nhận đào tạo liên tục để tích hợp công nghệ hiệu quả.') - Luyện nghe nhu cầu phát triển chuyên môn."
    }
  ]
},
part4: {
  title: "PART 4: Extended Conversation",
  description: "5 câu hỏi - Một đoạn hội thoại mở rộng giữa Parent và Counselor về lựa chọn trường học. Nghe và chọn đáp án tốt nhất (A, B, C, D).",
  type: "listening",
  script: "Parent: Counselor, I'm helping my daughter choose between public and private high schools. What factors should we consider?\nCounselor: Great question. Public schools offer diverse environments and extracurriculars at no tuition, but class sizes can be larger—around 30 students.\nParent: Understood. Private schools have smaller classes, say 15-20, with specialized programs like AP courses.\nCounselor: Exactly. They often provide more individualized attention, though costs average $20,000 annually. Scholarships can help.\nParent: Valuable info. How about college prep support?\nCounselor: Both excel, but privates may have dedicated advisors for applications.",
  questions: [
    {
      id: 16,
      question: "What is the parent seeking advice on?",
      options: ["(A) College majors", "(B) Choosing high schools", "(C) Summer camps", "(D) Online courses"],
      correct: 1,
      explanation: "Parent: 'Choosing between public and private high schools.' (Phụ huynh: 'Chọn giữa trường công và tư trung học.') - Luyện nghe tư vấn chọn trường."
    },
    {
      id: 17,
      question: "What advantage do public schools have?",
      options: ["(A) Smaller class sizes", "(B) No tuition and diverse environments", "(C) More AP courses", "(D) Dedicated advisors"],
      correct: 1,
      explanation: "Counselor: 'Public schools... at no tuition... diverse environments.' (Tư vấn viên: 'Trường công... không học phí... môi trường đa dạng.') - Luyện nghe ưu điểm trường công lập."
    },
    {
      id: 18,
      question: "What is the typical class size in public schools?",
      options: ["(A) 15-20 students", "(B) 20-25 students", "(C) Around 30 students", "(D) 35-40 students"],
      correct: 2,
      explanation: "Counselor: 'Class sizes can be larger—around 30 students.' (Tư vấn viên: 'Kích thước lớp lớn hơn—khoảng 30 học sinh.') - Luyện nghe quy mô lớp học."
    },
    {
      id: 19,
      question: "What is the average annual cost for private schools?",
      options: ["(A) $10,000", "(B) $15,000", "(C) $20,000", "(D) $25,000"],
      correct: 2,
      explanation: "Counselor: 'Costs average $20,000 annually.' (Tư vấn viên: 'Chi phí trung bình $20,000 hàng năm.') - Luyện nghe chi phí giáo dục tư thục."
    },
    {
      id: 20,
      question: "What can help with private school costs?",
      options: ["(A) Larger classes", "(B) Scholarships", "(C) Free extracurriculars", "(D) Reduced AP courses"],
      correct: 1,
      explanation: "Counselor: 'Though costs average $20,000 annually. Scholarships can help.' (Tư vấn viên: 'Mặc dù chi phí trung bình $20,000. Học bổng có thể giúp.') - Luyện nghe hỗ trợ tài chính."
    }
  ]
},
    // Reading Parts - Thêm 5 câu hỏi mở rộng cho Part 5 để cân bằng, chủ đề giáo dục
part5: {
  title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
  description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
  type: "reading",
  questions: [
    {
      id: 21,
      question: "Online learning platforms have made education more accessible, allowing students to study at their own _______ .",
      options: ["(A) Pace", "(B) Paces", "(C) Pacing", "(D) Paced"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Pace' vì danh từ chỉ 'tốc độ' học tập cá nhân hóa. Kiến thức ngữ pháp: 'At their own pace' là cụm từ cố định; 'paces' số nhiều, 'pacing' V-ing, 'paced' quá khứ."
    },
    {
      id: 22,
      question: "Teachers are increasingly incorporating multimedia resources to engage _______ in diverse learning styles.",
      options: ["(A) Student", "(B) Students", "(C) Studied", "(D) Studying"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Students' vì danh từ số nhiều chỉ 'học sinh'. Kiến thức ngữ pháp: Tân ngữ số nhiều sau 'engage'; 'student' số ít, 'studied' quá khứ, 'studying' V-ing."
    },
    {
      id: 23,
      question: "The curriculum was revised to include more emphasis on critical thinking _______ rote memorization.",
      options: ["(A) Than", "(B) Over", "(C) From", "(D) With"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Over' vì chỉ ưu tiên (over rote memorization). Kiến thức ngữ pháp: 'Emphasis on... over...' so sánh ưu tiên; 'than' so sánh bằng, 'from/with' không phù hợp."
    },
    {
      id: 24,
      question: "Parental involvement plays a crucial role in enhancing children's academic _______ .",
      options: ["(A) Achieve", "(B) Achieves", "(C) Achievement", "(D) Achieving"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Achievement' vì danh từ chỉ 'thành tích học tập'. Kiến thức từ vựng: 'Academic achievement'; 'achieve' động từ, 'achieves' ngôi thứ ba, 'achieving' V-ing."
    },
    {
      id: 25,
      question: "Scholarships are awarded based on merit and financial need to promote equal _______ to higher education.",
      options: ["(A) Access", "(B) Accessed", "(C) Accessing", "(D) Accesses"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Access' vì danh từ chỉ 'tiếp cận'. Kiến thức ngữ pháp: 'Equal access to...'; 'accessed' quá khứ, 'accessing' V-ing, 'accesses' ngôi thứ ba."
    },
    {
      id: 26,
      question: "The workshop focuses on developing soft skills, such as communication and teamwork, essential for future _______ .",
      options: ["(A) Career", "(B) Careers", "(C) Careered", "(D) Careering"],
      correct: 1,
      explanation: "Đáp án đúng là (B) 'Careers' vì danh từ số nhiều chỉ 'sự nghiệp'. Kiến thức từ vựng: 'Future careers'; 'career' số ít, 'careered' quá khứ, 'careering' V-ing."
    },
    {
      id: 27,
      question: "Assessment methods should be varied to fairly evaluate students' progress _______ a single exam.",
      options: ["(A) Beyond", "(B) Besides", "(C) Between", "(D) During"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'Beyond' vì chỉ vượt qua (beyond a single exam). Kiến thức ngữ pháp: 'Beyond...' chỉ phạm vi rộng hơn; 'besides' thêm vào, 'between/during' thời gian."
    },
    {
      id: 28,
      question: "Lifelong learning encourages individuals to pursue education throughout their lives for personal and professional _______ .",
      options: ["(A) Grow", "(B) Grows", "(C) Growth", "(D) Growing"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Growth' vì danh từ chỉ 'phát triển'. Kiến thức từ vựng: 'Personal and professional growth'; 'grow' động từ, 'grows' ngôi thứ ba, 'growing' V-ing."
    },
    {
      id: 29,
      question: "The library's digital collection provides resources that support research and independent _______ .",
      options: ["(A) Learn", "(B) Learns", "(C) Learned", "(D) Learning"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Learning' vì danh từ/V-ing chỉ 'học tập độc lập'. Kiến thức ngữ pháp: 'Independent learning'; 'learn' nguyên thể, 'learns' ngôi thứ ba, 'learned' quá khứ."
    },
    {
      id: 30,
      question: "Educational policies must adapt to technological advancements to prepare students for a rapidly changing _______ .",
      options: ["(A) World", "(B) Worlds", "(C) Worldly", "(D) Worlded"],
      correct: 0,
      explanation: "Đáp án đúng là (A) 'World' vì danh từ chỉ 'thế giới'. Kiến thức từ vựng: 'Changing world'; 'worlds' số nhiều, 'worldly' tính từ, 'worlded' không tồn tại."
    }
  ]
},
part6: {
  title: "PART 6: Cloze Text (Email/Announcement)",
  description: "10 câu hỏi - Điền từ/cụm vào văn bản email về hội thảo giáo dục. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `To: Faculty and Staff
From: Dr. Chen, Dean of Education
Subject: Upcoming Workshop on Innovative Teaching Methods - RSVP Required
Dear Colleagues,
We are pleased to invite you to the annual Education Innovation Workshop, designed to equip educators with cutting-edge strategies for engaging students in the 21st century. The event will take place on October 10 from 9:00 A.M. to 4:00 P.M. in the Main Auditorium, featuring sessions on flipped classrooms and project-based learning.
Our keynote speaker, Dr. Lisa Grant, will discuss how technology can personalize learning experiences to meet individual student needs. Breakout groups will allow participants to collaborate and share best practices, fostering a community of continuous professional development.
To accommodate all interests, we have allocated spots for up to 50 attendees. Please RSVP by September 30 using the registration link below to secure your place. Light refreshments will be provided, and a certificate of completion will be issued for professional portfolio enhancement.
This workshop aligns with our institutional goal of promoting inclusive and adaptive teaching to better serve diverse learners. We look forward to your active participation.
For questions, contact the Office of Professional Development at ext. 234.
Sincerely,
Dr. Chen
Dean of Education`,
  questions: [
    {
      id: 31,
      question: "(31)",
      options: ["(A) Equip", "(B) Equips", "(C) Equipped", "(D) Equipping"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Equipping' vì V-ing chỉ mục đích (designed to equipping). Kiến thức ngữ pháp: 'Designed to + V-ing'; 'equip' nguyên thể, 'equips' ngôi thứ ba, 'equipped' quá khứ."
    },
    {
      id: 32,
      question: "(32)",
      options: ["(A) Feature", "(B) Features", "(C) Featured", "(D) Featuring"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Featuring' vì V-ing mô tả sự kiện (featuring sessions). Kiến thức ngữ pháp: Phân từ hiện tại bổ nghĩa; 'feature' nguyên thể, 'features' ngôi thứ ba, 'featured' quá khứ."
    },
    {
      id: 33,
      question: "(33)",
      options: ["(A) Personalize", "(B) Personalizes", "(C) Personalized", "(D) Personalizing"],
      correct: 2,
      explanation: "Đáp án đúng là (C) 'Personalized' vì tính từ chỉ 'cá nhân hóa' (personalized experiences). Kiến thức ngữ pháp: Tính từ trước danh từ; 'personalize' động từ, 'personalizes' ngôi thứ ba, 'personalizing' V-ing."
    },
    {
      id: 34,
      question: "(34)",
      options: ["(A) Collaborate", "(B) Collaborates", "(C) Collaboration", "(D) Collaborating"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Collaborating' vì V-ing chỉ hành động nhóm. Kiến thức ngữ pháp: 'Allow... to + V-ing'; 'collaborate' nguyên thể, 'collaborates' ngôi thứ ba, 'collaboration' danh từ."
    },
    {
      id: 35,
      question: "(35)",
      options: ["(A) Promote", "(B) Promotes", "(C) Promoted", "(D) Promoting"],
      correct: 3,
      explanation: "Đáp án đúng là (D) 'Promoting' vì V-ing chỉ mục tiêu (promoting inclusive teaching). Kiến thức ngữ pháp: 'Goal of + V-ing'; 'promote' nguyên thể, 'promotes' ngôi thứ ba, 'promoted' quá khứ."
    },
    {
      id: 36,
      question: "The workshop is scheduled for (37).",
      options: ["(A) September 30", "(B) October 10", "(C) October 15", "(D) November 1"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'on October 10'. Kiến thức đọc hiểu: Ngày sự kiện từ phần giới thiệu."
    },
    {
      id: 37,
      question: "How many attendees can the workshop accommodate?",
      options: ["(A) 30", "(B) 40", "(C) 50", "(D) 60"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'up to 50 attendees'. Kiến thức đọc hiểu: Sức chứa từ email."
    },
    {
      id: 38,
      question: "What is the primary purpose of this email?",
      options: ["(A) To report workshop results", "(B) To invite and require RSVP for the workshop", "(C) To cancel the event", "(D) To assign homework"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Invite you... RSVP Required'. Kiến thức đọc hiểu: Mục đích từ tiêu đề và lời kêu gọi đăng ký."
    },
    {
      id: 39,
      question: "Who is the keynote speaker?",
      options: ["(A) Dr. Chen", "(B) Dr. Lisa Grant", "(C) The Dean", "(D) Office Staff"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Dr. Lisa Grant'. Kiến thức đọc hiểu: Người nói chính từ phần chương trình."
    },
    {
      id: 40,
      question: "What will be provided for professional development?",
      options: ["(A) Full meals", "(B) A certificate of completion", "(C) Travel reimbursement", "(D) New textbooks"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'certificate of completion'. Kiến thức đọc hiểu: Chứng chỉ từ phần logistics."
    }
  ]
},
part7: {
  title: "PART 7: Multiple Texts (Advertisement + Email)",
  description: "10 câu hỏi - Đọc quảng cáo về khóa học giáo dục và email đăng ký, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `**EduTech Academy Advertisement**
Advance Your Teaching Career with Our Certified Online Pedagogy Course
EduTech Academy offers a flexible, 12-week online program in modern teaching methodologies. Earn a certification recognized by major school districts upon completion.
**Course Highlights:**
1. **Interactive Modules** – Video lessons and peer discussions on classroom management and assessment techniques. Enroll now at edutechacademy.org for instant access.
2. **Live Webinars** – Weekly sessions with expert educators sharing real-world applications.
3. **Assessment Portfolio** – Build a digital portfolio to showcase your skills to employers.
4. **Affordable Pricing** – $499 for the full course, with payment plans available.
Submit inquiries to enroll@edutechacademy.org. Our advisors respond within 48 hours to guide your enrollment.
---
**Email Message**
**To:** enroll@edutechacademy.org
**From:** anna.lee@riverviewschools.edu
**Date:** August 5
**Subject:** Enrollment Inquiry for Pedagogy Course
Dear EduTech Team,
I saw your ad on the education forum and am eager to enroll in the Certified Online Pedagogy Course to enhance my skills as a high school teacher. With 10 years of experience, I'm particularly interested in the modules on classroom management for diverse learners. Could you confirm the start date for the next cohort and details on the payment plan?
My school district may reimburse part of the cost, so I'd appreciate information on certification recognition. Please call me at 555-2345 between 3:00 P.M. and 6:00 P.M. PDT or reply to this email.
Thank you,
Anna Lee
High School Teacher
Riverview Schools
123 Education Lane, Seattle, WA 98101`,
 
  questions: [
    {
      id: 41,
      question: "According to the advertisement, what can participants access immediately upon enrollment?",
      options: [
        "(A) A digital portfolio",
        "(B) Instant access to interactive modules",
        "(C) Live webinars",
        "(D) Payment plans"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Enroll now... for instant access'. Kiến thức đọc hiểu: Truy cập ngay từ quảng cáo."
    },
    {
      id: 42,
      question: "How did Ms. Lee learn about the course?",
      options: [
        "(A) Through a colleague",
        "(B) On the education forum",
        "(C) Via email newsletter",
        "(D) At a conference"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'on the education forum'. Kiến thức suy luận: Nguồn từ email."
    },
    {
      id: 43,
      question: "What is Ms. Lee's profession?",
      options: [
        "(A) School administrator",
        "(B) High school teacher",
        "(C) University professor",
        "(D) Course developer"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'as a high school teacher'. Kiến thức đọc hiểu: Nghề nghiệp từ email."
    },
    {
      id: 44,
      question: "Which course highlight does Ms. Lee mention specifically?",
      options: [
        "(A) Live webinars",
        "(B) Modules on classroom management",
        "(C) Assessment portfolio",
        "(D) Affordable pricing"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'modules on classroom management'. Kiến thức đọc hiểu: Quan tâm cụ thể từ email."
    },
    {
      id: 45,
      question: "What will Ms. Lee most likely receive within 48 hours?",
      options: [
        "(A) Course certification",
        "(B) A response from advisors",
        "(C) Payment confirmation",
        "(D) Webinar schedule"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'advisors respond within 48 hours'. Kiến thức suy luận: Phản hồi từ quảng cáo."
    },
    {
      id: 46,
      question: "How long is the pedagogy course?",
      options: [
        "(A) 6 weeks",
        "(B) 8 weeks",
        "(C) 12 weeks",
        "(D) 16 weeks"
      ],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì '12-week online program'. Kiến thức đọc hiểu: Thời lượng từ quảng cáo."
    },
    {
      id: 47,
      question: "How many years of experience does Ms. Lee have?",
      options: [
        "(A) 5 years",
        "(B) 10 years",
        "(C) 15 years",
        "(D) 20 years"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì '10 years of experience'. Kiến thức đọc hiểu: Kinh nghiệm từ email."
    },
    {
      id: 48,
      question: "What does Ms. Lee request confirmation on?",
      options: [
        "(A) Certification cost",
        "(B) Start date for the next cohort",
        "(C) School reimbursement",
        "(D) Forum access"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'confirm the start date for the next cohort'. Kiến thức đọc hiểu: Yêu cầu cụ thể từ email."
    },
    {
      id: 49,
      question: "When is Ms. Lee available for a call?",
      options: [
        "(A) Between 9:00 A.M. and 12:00 P.M.",
        "(B) Between 3:00 P.M. and 6:00 P.M. PDT",
        "(C) Evenings after 7:00 P.M.",
        "(D) Weekends"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'between 3:00 P.M. and 6:00 P.M. PDT'. Kiến thức đọc hiểu: Khung giờ từ email."
    },
    {
      id: 50,
      question: "What is the full course price?",
      options: [
        "(A) $399",
        "(B) $499",
        "(C) $599",
        "(D) $699"
      ],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì '$499 for the full course'. Kiến thức đọc hiểu: Giá từ quảng cáo."
    }
  ]
},
part8: {
  title: "PART 8: Text Message Chain",
  description: "10 câu hỏi - Đọc chuỗi tin nhắn về lập kế hoạch nhóm học, chọn đáp án tốt nhất (A, B, C, D).",
  type: "reading",
  text: `Ben (16:15): Group, study session for finals tomorrow at library 2 PM? Materials ready?\nAnna (16:17): Yes! I'll bring notes on chapter 5. Focus on key concepts.\nBen (16:20): Good. Tom, your slides on stats problems?\nTom (16:22): Almost done. Sharing via Google Drive now. Expect 15% better scores with practice.\nAnna (16:30): Thanks. Quiet corner or group room? Library's busy midterms.\nBen (16:35): Group room—reserved it. Bring laptops for collaborative editing.\nTom (16:40): On my way early to set up projector. Let's ace this!`,
  questions: [
    {
      id: 51,
      question: "What is the purpose of the session?",
      options: ["(A) Social meetup", "(B) Study session for finals", "(C) Project presentation", "(D) Exam proctoring"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'study session for finals'. Kiến thức đọc hiểu: Mục đích từ tin nhắn đầu."
    },
    {
      id: 52,
      question: "What does Anna mean by 'Focus on key concepts'?",
      options: ["(A) Ignore details", "(B) Prioritize main ideas in notes", "(C) Skip chapter 5", "(D) Review all pages"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'bring notes on chapter 5. Focus on key concepts'. Kiến thức suy luận: Ưu tiên nội dung chính."
    },
    {
      id: 53,
      question: "Who is preparing slides on stats problems?",
      options: ["(A) Ben", "(B) Anna", "(C) Tom", "(D) The group leader"],
      correct: 2,
      explanation: "Đáp án đúng là (C) vì 'Tom, your slides on stats problems?'. Kiến thức đọc hiểu: Phân công từ Ben."
    },
    {
      id: 54,
      question: "When is the study session?",
      options: ["(A) Today at 2 PM", "(B) Tomorrow at 2 PM", "(C) Next week", "(D) Evening hours"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'tomorrow at library 2 PM'. Kiến thức đọc hiểu: Thời gian từ Ben."
    },
    {
      id: 55,
      question: "What is Tom sharing?",
      options: ["(A) Notes on chapter 5", "(B) Slides via Google Drive", "(C) Library reservation", "(D) Practice exams"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Sharing via Google Drive now'. Kiến thức đọc hiểu: Tài liệu từ Tom."
    },
    {
      id: 56,
      question: "What improvement does Tom expect?",
      options: ["(A) 10% better scores", "(B) 15% better scores", "(C) 20% better scores", "(D) No change"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì '15% better scores with practice'. Kiến thức suy luận: Dự báo từ Tom."
    },
    {
      id: 57,
      question: "Why does Anna ask about the library space?",
      options: ["(A) To avoid midterms", "(B) Library is busy during midterms", "(C) For food options", "(D) To change location"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Library's busy midterms'. Kiến thức suy luận: Lý do chọn không gian."
    },
    {
      id: 58,
      question: "What has Ben reserved?",
      options: ["(A) Quiet corner", "(B) Group room", "(C) Projector only", "(D) Laptops"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Group room—reserved it'. Kiến thức đọc hiểu: Đặt chỗ từ Ben."
    },
    {
      id: 59,
      question: "What does Tom plan to do early?",
      options: ["(A) Bring notes", "(B) Set up projector", "(C) Edit slides", "(D) Reserve room"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'On my way early to set up projector'. Kiến thức đọc hiểu: Chuẩn bị từ Tom."
    },
    {
      id: 60,
      question: "What does Tom express in his final message?",
      options: ["(A) Worry about scores", "(B) Encouragement to succeed", "(C) Request for more time", "(D) Complaint about library"],
      correct: 1,
      explanation: "Đáp án đúng là (B) vì 'Let's ace this!'. Kiến thức suy luận: Lời khích lệ từ Tom."
    }
  ]
}
  }
};  