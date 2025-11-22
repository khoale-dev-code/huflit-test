export const EXAM16_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 16 (Advanced Level)",
  description: "Bộ đề nâng cao với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu). Tập trung vào nghe suy luận, ngữ pháp nâng cao và đọc hiểu đa văn bản.",
  parts: {
    // ============================================
    // LISTENING PARTS (20 questions)
    // ============================================
    
    part1: {
      title: "PART 1: Extended Conversation - Travel Planning",
      description: "Nghe đoạn hội thoại giữa Jennifer và Travel Agent về kế hoạch du lịch. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      script: `Travel Agent: Good morning! Welcome to Global Travel Services. How can I help you today?
Jennifer: Hi, thanks. I'm planning a two-week trip to Southeast Asia next month, specifically Vietnam and Thailand. I've been researching online but I'm overwhelmed by all the options.
Travel Agent: I completely understand. Southeast Asia offers incredible diversity. When exactly are you planning to travel?
Jennifer: I'm flexible with dates, but I'd prefer to avoid the rainy season. I was thinking early November, but I heard that might not be ideal for all regions.
Travel Agent: Actually, early November is transitional. In Vietnam, the weather varies significantly by region - the north experiences cooler temperatures while the south remains warm and humid. Thailand is entering its cool, dry season, which is perfect for tourism. However, some coastal areas might still see occasional rainfall.
Jennifer: That's helpful to know. I'm particularly interested in cultural experiences rather than just beach resorts. I want to visit historical sites, try authentic local cuisine, and maybe take some cooking classes.
Travel Agent: Excellent choices. For cultural immersion, I'd strongly recommend Hanoi's Old Quarter in Vietnam - the architecture, street food scene, and museums are exceptional. In Thailand, Chiang Mai offers incredible temples and renowned cooking schools. Have you considered your accommodation preferences?
Jennifer: I'm looking for mid-range hotels - nothing too luxurious, but clean and well-located. I'd rather spend my budget on experiences than accommodation.
Travel Agent: Smart thinking. That budget will give you excellent options in both countries. One important thing - have you checked visa requirements? Vietnam requires advance e-visa application for most nationalities, while Thailand offers visa exemption for many countries for stays under 30 days.
Jennifer: Oh, I hadn't thought about visas yet! I'll need to look into that immediately. Also, what about transportation between cities?
Travel Agent: Domestic flights are surprisingly affordable and save considerable time. However, if you're not in a rush, overnight trains in Vietnam offer a unique experience and you'll save on one night's accommodation. In Thailand, the bus network is extensive and very reliable.`,
      questions: [
        {
          id: 1,
          question: "Why is Jennifer visiting the travel agency?",
          options: [
            "She wants to cancel a previous booking",
            "She needs help planning a Southeast Asia trip",
            "She is applying for a travel agent position",
            "She wants to complain about a recent trip"
          ],
          correct: 1,
          explanation: "Jennifer nói rõ: 'I'm planning a two-week trip to Southeast Asia next month... I've been researching online but I'm overwhelmed by all the options.' Cô ấy đến để được tư vấn kế hoạch du lịch vì cảm thấy quá nhiều lựa chọn và cần sự hỗ trợ chuyên nghiệp."
        },
        {
          id: 2,
          question: "What can be inferred about Jennifer's travel style?",
          options: [
            "She prefers luxury beach resorts",
            "She values cultural experiences over luxury accommodation",
            "She only wants to visit famous tourist attractions",
            "She prefers traveling during peak season"
          ],
          correct: 1,
          explanation: "Jennifer phát biểu: 'I'm particularly interested in cultural experiences rather than just beach resorts' và 'I'd rather spend my budget on experiences than accommodation.' Điều này cho thấy cô ưu tiên trải nghiệm văn hóa hơn là chỗ ở sang trọng."
        },
        {
          id: 3,
          question: "According to the travel agent, what is TRUE about weather in early November?",
          options: [
            "It's rainy season throughout Southeast Asia",
            "Vietnam has uniform weather across all regions",
            "Thailand is entering its cool, dry season",
            "All coastal areas have perfect weather"
          ],
          correct: 2,
          explanation: "Travel Agent nói rõ: 'Thailand is entering its cool, dry season, which is perfect for tourism.' Đây là thông tin chính xác về thời tiết Thái Lan vào đầu tháng 11. Các đáp án khác sai vì thời tiết không đồng nhất ở tất cả khu vực."
        },
        {
          id: 4,
          question: "What does the travel agent recommend for cultural immersion?",
          options: [
            "Beach resorts in southern Thailand",
            "Hanoi's Old Quarter and Chiang Mai",
            "Only luxury hotels in major cities",
            "Avoiding street food completely"
          ],
          correct: 1,
          explanation: "Travel Agent khuyến nghị: 'I'd strongly recommend Hanoi's Old Quarter in Vietnam... In Thailand, Chiang Mai offers incredible temples and renowned cooking schools.' Đây là hai địa điểm chính được đề xuất cho trải nghiệm văn hóa."
        },
        {
          id: 5,
          question: "What important requirement does Jennifer need to address immediately?",
          options: [
            "Booking accommodation",
            "Purchasing travel insurance",
            "Checking visa requirements",
            "Learning local languages"
          ],
          correct: 2,
          explanation: "Khi Travel Agent nói về visa requirements, Jennifer phản ứng: 'Oh, I hadn't thought about visas yet! I'll need to look into that immediately.' Đây là việc cấp bách cô cần xử lý ngay."
        }
      ]
    },

    part2: {
      title: "PART 2: Business Meeting Discussion",
      description: "5 câu hỏi - Nghe cuộc họp giữa Manager, HR Rep và Jennifer về chiến lược nhân sự. Chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: `Manager: Thanks everyone for joining this quarterly review meeting. Let's start with our hiring progress. HR, could you update us on the recruitment campaign we launched last month?
HR Rep: Certainly. We received over 200 applications for the five open positions - significantly higher than our previous campaign. However, the quality varied considerably. After initial screening, we shortlisted 25 candidates for first-round interviews.
Manager: That's impressive volume. Jennifer, as team lead, what's your assessment of the candidates you've interviewed so far?
Jennifer: I've completed interviews with eight candidates for the senior analyst position. Honestly, I'm concerned. While they have strong technical qualifications on paper, most lack the problem-solving skills and adaptability we desperately need. Only two candidates demonstrated the critical thinking ability required for our fast-paced environment.
Manager: That's disappointing but valuable feedback. What specific gaps are you observing?
Jennifer: Many candidates can recite theoretical knowledge perfectly, but when presented with real-world scenarios, they struggle to apply that knowledge creatively. For instance, I asked about handling conflicting project deadlines - a common situation here - and most gave generic, textbook responses rather than demonstrating practical judgment.
HR Rep: This aligns with feedback from other departments too. Perhaps we need to revise our job descriptions to emphasize practical experience more explicitly, and modify our interview process to include more scenario-based questions.
Manager: Agreed. Jennifer, I'd like you to collaborate with HR to redesign the interview framework. Let's incorporate case studies and situational exercises. Also, we should consider extending the probation period from three to six months for senior positions to better evaluate real performance.
Jennifer: That makes sense. I'd also suggest implementing a brief paid trial project before making final offers - perhaps a one-week consulting arrangement. It would give both parties a realistic preview.
HR Rep: Interesting idea, though we'd need to ensure it complies with labor regulations. I'll research the legal implications and cost considerations. One concern - this might extend our hiring timeline by several weeks.
Manager: True, but hiring the wrong person costs us far more in the long run. Quality over speed should be our priority. Let's target completion of the redesigned process by the end of next month.`,
      questions: [
        {
          id: 6,
          question: "What problem does Jennifer identify with the candidates?",
          options: [
            "They lack theoretical knowledge",
            "They have insufficient work experience",
            "They cannot apply knowledge to real situations",
            "They demand unreasonably high salaries"
          ],
          correct: 2,
          explanation: "Jennifer giải thích rõ: 'Many candidates can recite theoretical knowledge perfectly, but when presented with real-world scenarios, they struggle to apply that knowledge creatively.' Vấn đề chính là khả năng áp dụng kiến thức vào thực tế, không phải thiếu lý thuyết."
        },
        {
          id: 7,
          question: "What does the Manager ask Jennifer to do?",
          options: [
            "Hire more candidates immediately",
            "Reduce the number of interview rounds",
            "Collaborate with HR to redesign the interview process",
            "Lower the qualification requirements"
          ],
          correct: 2,
          explanation: "Manager chỉ định rõ ràng: 'Jennifer, I'd like you to collaborate with HR to redesign the interview framework. Let's incorporate case studies and situational exercises.' Đây là nhiệm vụ cụ thể được giao cho Jennifer."
        },
        {
          id: 8,
          question: "What innovative suggestion does Jennifer propose?",
          options: [
            "Increasing starting salaries",
            "Implementing a paid trial project before hiring",
            "Eliminating the interview process entirely",
            "Hiring only internal candidates"
          ],
          correct: 1,
          explanation: "Jennifer đề xuất: 'I'd also suggest implementing a brief paid trial project before making final offers - perhaps a one-week consulting arrangement.' Đây là ý tưởng sáng tạo để đánh giá ứng viên thực tế trước khi quyết định tuyển dụng."
        },
        {
          id: 9,
          question: "What concern does the HR Rep raise about Jennifer's suggestion?",
          options: [
            "It would be too expensive",
            "Candidates would refuse to participate",
            "It might extend the hiring timeline",
            "It's impossible to implement"
          ],
          correct: 2,
          explanation: "HR Rep nêu lo ngại: 'One concern - this might extend our hiring timeline by several weeks.' Mối quan tâm chính là việc kéo dài thời gian tuyển dụng, mặc dù ý tưởng tốt nhưng cần cân nhắc về thời gian."
        },
        {
          id: 10,
          question: "What is the Manager's overall priority for the hiring process?",
          options: [
            "Completing recruitment as quickly as possible",
            "Hiring the maximum number of candidates",
            "Prioritizing quality over speed",
            "Reducing recruitment costs"
          ],
          correct: 2,
          explanation: "Manager khẳng định rõ ràng: 'True, but hiring the wrong person costs us far more in the long run. Quality over speed should be our priority.' Chất lượng ứng viên quan trọng hơn tốc độ tuyển dụng."
        }
      ]
    },

    part3: {
      title: "PART 3: Academic Lecture - Environmental Policy",
      description: "5 câu hỏi - Nghe bài giảng của Professor Mitchell về chính sách môi trường. Chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: `Professor Mitchell: Good afternoon, everyone. Today we're examining the evolution of environmental policy in developed nations over the past three decades. This topic is particularly relevant as we witness increasing global climate challenges.
Let me begin by addressing a common misconception. Many students assume environmental regulations automatically harm economic growth. However, comprehensive studies from the OECD demonstrate that well-designed environmental policies can actually stimulate innovation and create new industries. The renewable energy sector, for instance, now employs more people globally than traditional fossil fuel industries - a trend that has accelerated dramatically since 2010.
Now, let's consider a specific case study: the European Union's Emissions Trading System, established in 2005. Initially, this market-based approach faced significant criticism. Industries complained about compliance costs, and environmental groups argued the system was too lenient. However, twenty years of data reveal a nuanced picture. Carbon emissions from participating sectors decreased by approximately 35%, while economic output in these same sectors actually increased. This suggests that the initial adjustment period, though challenging, ultimately drove technological improvements and operational efficiency.
What made this policy relatively successful? Three key factors emerge from the research. First, the gradual implementation timeline gave businesses adequate time to adapt their operations rather than facing abrupt, disruptive changes. Second, the policy included provisions to prevent "carbon leakage" - where companies simply relocate to countries with weaker environmental standards. Third, revenue generated from carbon permit auctions was partially reinvested into research and development of clean technologies.
However, we must acknowledge the limitations. The system primarily addresses large industrial emitters while transportation and agriculture - significant contributors to emissions - remain largely outside its scope. Additionally, the policy's effectiveness depends heavily on setting appropriate emission caps, which has proven politically contentious.
Looking ahead, the next generation of environmental policy faces a critical challenge: balancing immediate economic concerns with long-term sustainability. Recent political backlash against environmental regulations in several countries demonstrates that public support cannot be taken for granted. Policymakers must ensure that transition costs don't disproportionately burden working-class communities, or risk undermining the political coalition necessary for sustained action.
Your assignment for next week is to analyze a different environmental policy framework from a country of your choice and prepare a critical evaluation applying the analytical framework we've discussed today. Please submit your analysis to the course portal by Friday at 5 PM. Late submissions, as stated in the syllabus, will receive a 10% deduction per day.`,
      questions: [
        {
          id: 11,
          question: "What common misconception does Professor Mitchell address?",
          options: [
            "Environmental policies always boost economic growth",
            "Environmental regulations necessarily harm economic growth",
            "Renewable energy cannot create jobs",
            "Climate change is not a serious issue"
          ],
          correct: 1,
          explanation: "Professor Mitchell nói rõ: 'Many students assume environmental regulations automatically harm economic growth. However, comprehensive studies... demonstrate that well-designed environmental policies can actually stimulate innovation.' Ông đang bác bỏ quan niệm sai lầm rằng quy định môi trường luôn gây hại cho tăng trưởng kinh tế."
        },
        {
          id: 12,
          question: "What does the professor say about the renewable energy sector?",
          options: [
            "It employs fewer people than fossil fuel industries",
            "It has declined since 2010",
            "It now employs more people globally than traditional fossil fuel industries",
            "It only exists in European countries"
          ],
          correct: 2,
          explanation: "Giáo sư phát biểu: 'The renewable energy sector... now employs more people globally than traditional fossil fuel industries - a trend that has accelerated dramatically since 2010.' Đây là minh chứng cho thấy chính sách môi trường có thể tạo việc làm."
        },
        {
          id: 13,
          question: "According to the lecture, what happened to emissions under the EU's Emissions Trading System?",
          options: [
            "They increased by 35%",
            "They remained unchanged",
            "They decreased by approximately 35%",
            "They were completely eliminated"
          ],
          correct: 2,
          explanation: "Professor Mitchell nêu kết quả: 'Carbon emissions from participating sectors decreased by approximately 35%, while economic output in these same sectors actually increased.' Con số 35% giảm phát thải là thành tựu quan trọng."
        },
        {
          id: 14,
          question: "What is mentioned as a limitation of the EU system?",
          options: [
            "It covers all emission sources comprehensively",
            "Transportation and agriculture remain largely outside its scope",
            "It has eliminated all carbon emissions",
            "It costs nothing to implement"
          ],
          correct: 1,
          explanation: "Giáo sư chỉ ra hạn chế: 'The system primarily addresses large industrial emitters while transportation and agriculture - significant contributors to emissions - remain largely outside its scope.' Đây là điểm yếu quan trọng của chính sách."
        },
        {
          id: 15,
          question: "What penalty applies to late assignment submissions?",
          options: [
            "5% deduction per day",
            "10% deduction per day",
            "Complete rejection",
            "No penalty"
          ],
          correct: 1,
          explanation: "Professor Mitchell nhắc nhở: 'Late submissions, as stated in the syllabus, will receive a 10% deduction per day.' Đây là quy định rõ ràng về hình phạt nộp bài trễ."
        }
      ]
    },

    part4: {
      title: "PART 4: Customer Service Call - Product Return",
      description: "5 câu hỏi - Nghe cuộc gọi giữa Customer (Anna) và Sales Associate về hoàn trả sản phẩm. Chọn đáp án tốt nhất (A, B, C, D).",
      type: "listening",
      script: `Sales Associate: Thank you for calling TechMart Customer Service. This is Alex speaking. How may I assist you today?
Anna: Hi Alex. I'm calling about a laptop I purchased from your store three weeks ago. I'm experiencing some serious issues and I'd like to discuss my options for returning or exchanging it.
Sales Associate: I'm sorry to hear you're having problems. I'd be happy to help. Could you provide your order number so I can pull up your account?
Anna: Yes, it's TM-2024-8756. I bought the ProBook 15 model.
Sales Associate: Thank you, I have your order here. I see you purchased it on October 28th. Can you describe the specific issues you're experiencing?
Anna: The laptop randomly shuts down during use, usually after about 30 minutes of operation. Initially I thought it might be overheating, so I made sure it had proper ventilation and wasn't running too many programs simultaneously. But the problem persists even when I'm just browsing the internet with minimal applications open. Additionally, the battery drains extremely quickly - I'm getting maybe two hours of use on a full charge, though the specifications promised up to eight hours.
Sales Associate: That definitely doesn't sound normal. Those issues suggest either a hardware defect or possibly a software configuration problem. Have you installed any third-party software or made system modifications since purchase?
Anna: No, I've only installed Microsoft Office and a few standard applications. Nothing unusual. I actually work in IT, so I'm quite familiar with troubleshooting these types of issues. I've already tried factory resetting the device, updating all drivers, and running diagnostic tests. The hardware diagnostics indicate the battery health is at only 65%, which is terrible for a brand-new laptop.
Sales Associate: Given your technical background and the troubleshooting you've already completed, it does sound like a manufacturing defect rather than a user error. Under our return policy, you have 30 days from purchase date for a full refund, which means you're still within that window - you have one week remaining. Alternatively, we can process an exchange for an identical model or a different laptop of equal or lesser value.
Anna: Honestly, after this experience, I've lost confidence in this particular model. I'd prefer a refund so I can purchase a different brand entirely. I've done more research and found several concerning reviews about this model having similar battery and overheating issues.
Sales Associate: That's completely understandable. I can certainly process a refund for you. To complete this, you'll need to return the laptop to any TechMart location along with all original accessories, packaging, and your receipt. Once we verify the condition of the device, the refund will be credited back to your original payment method within 5-7 business days.
Anna: What condition does it need to be in? I mean, I've been using it for three weeks, so there might be minor cosmetic wear.
Sales Associate: As long as there's no significant physical damage - like cracks, dents, or liquid damage - minor wear from normal use is acceptable. The return would only be rejected if the device shows signs of abuse or damage beyond normal operation.
Anna: That's fine. One more question - will I need to wait in line at the store, or can I schedule an appointment for the return?
Sales Associate: You can absolutely schedule an appointment through our website, which I'd recommend during weekends when stores tend to be busier. Weekday mornings are typically less crowded if you have flexibility.`,
      questions: [
        {
          id: 16,
          question: "What is Anna's primary complaint about the laptop?",
          options: [
            "The screen is cracked",
            "It randomly shuts down and has poor battery life",
            "The keyboard doesn't work",
            "It's too heavy to carry"
          ],
          correct: 1,
          explanation: "Anna mô tả hai vấn đề chính: 'The laptop randomly shuts down during use... Additionally, the battery drains extremely quickly.' Đây là hai lỗi nghiêm trọng ảnh hưởng đến việc sử dụng."
        },
        {
          id: 17,
          question: "What can be inferred about Anna's technical knowledge?",
          options: [
            "She knows nothing about computers",
            "She has professional IT experience",
            "She is a student learning about technology",
            "She refuses to troubleshoot problems"
          ],
          correct: 1,
          explanation: "Anna tiết lộ: 'I actually work in IT, so I'm quite familiar with troubleshooting these types of issues. I've already tried factory resetting the device, updating all drivers...' Cô có chuyên môn IT và đã tự khắc phục sự cố chuyên nghiệp."
        },
        {
          id: 18,
          question: "How much time does Anna have remaining to return the laptop for a full refund?",
          options: [
            "30 days",
            "Two weeks",
            "One week",
            "One day"
          ],
          correct: 2,
          explanation: "Sales Associate xác nhận: 'Under our return policy, you have 30 days from purchase date for a full refund, which means you're still within that window - you have one week remaining.' Anna mua ngày 28/10, đã qua 3 tuần, còn 1 tuần."
        },
        {
          id: 19,
          question: "Why does Anna prefer a refund over an exchange?",
          options: [
            "She doesn't need a laptop anymore",
            "She wants to buy a cheaper model",
            "She has lost confidence in this model after finding concerning reviews",
            "She plans to buy from a competitor immediately"
          ],
          correct: 2,
          explanation: "Anna giải thích: 'I've lost confidence in this particular model. I've done more research and found several concerning reviews about this model having similar battery and overheating issues.' Cô muốn đổi thương hiệu khác vì mất niềm tin."
        },
        {
          id: 20,
          question: "What advice does the Sales Associate give about avoiding wait times?",
          options: [
            "Come during weekend afternoons",
            "Schedule an appointment or visit on weekday mornings",
            "Call ahead every time",
            "Only visit on public holidays"
          ],
          correct: 1,
          explanation: "Sales Associate khuyên: 'You can schedule an appointment through our website... Weekday mornings are typically less crowded if you have flexibility.' Đây là hai cách tránh xếp hàng đông người."
        }
      ]
    },

    // ============================================
    // READING PARTS (40 questions)
    // ============================================

    part5: {
      title: "PART 5: Fill in the Blank (Grammar/Vocabulary)",
      description: "10 câu hỏi - Chọn từ/cụm từ phù hợp để hoàn thành câu. Không có audio.",
      type: "reading",
      questions: [
        {
          id: 21,
          question: "The company's new training program has proven to be highly _______ in improving employee productivity.",
          options: ["effect", "effective", "effectively", "effectiveness"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'effective'. Cấu trúc: 'to be + tính từ'. Câu cần một tính từ để mô tả chương trình đào tạo. 'Effective' (hiệu quả) là tính từ phù hợp. (A) 'effect' là danh từ, (C) 'effectively' là trạng từ, (D) 'effectiveness' là danh từ."
        },
        {
          id: 22,
          question: "_______ the unexpected delays in shipment, the project was completed on schedule.",
          options: ["Although", "Despite", "Because", "Since"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Despite'. Cấu trúc: 'Despite + noun phrase' = mặc dù. Câu nói rằng mặc dù có trễ hàng, dự án vẫn hoàn thành đúng hạn. (A) 'Although' cần mệnh đề (+ subject + verb), (C) 'Because' và (D) 'Since' diễn tả nguyên nhân - sai logic."
        },
        {
          id: 23,
          question: "The marketing department is seeking candidates who can work _______ under pressure and meet tight deadlines.",
          options: ["independent", "independently", "independence", "depend"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'independently'. Sau động từ 'work' cần trạng từ để mô tả cách thức làm việc. 'Independently' (một cách độc lập) là trạng từ chính xác. (A) là tính từ, (C) là danh từ, (D) là động từ khác nghĩa."
        },
        {
          id: 24,
          question: "All employees must submit their annual performance reviews _______ Friday, December 15.",
          options: ["until", "by", "during", "since"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'by'. 'By + deadline' = trước hạn chót, không muộn hơn. Nghĩa: nhân viên phải nộp báo cáo trước hoặc vào ngày 15/12. (A) 'until' = cho đến khi (hành động kéo dài), (C) 'during' = trong suốt, (D) 'since' dùng với thì hoàn thành."
        },
        {
          id: 25,
          question: "The conference organizers have arranged for simultaneous translation services to _______ smooth communication between international participants.",
          options: ["ensure", "insure", "assure", "confirm"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'ensure'. 'Ensure' = đảm bảo rằng điều gì đó xảy ra. Đây là collocation chuẩn trong ngữ cảnh tổ chức sự kiện. (B) 'insure' = bảo hiểm, (C) 'assure' + person (đảm bảo với ai đó), (D) 'confirm' = xác nhận - nghĩa khác."
        },
        {
          id: 26,
          question: "The new software update includes several features that will significantly _______ our data analysis capabilities.",
          options: ["enhance", "enhances", "enhancing", "enhanced"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'enhance'. Cấu trúc: 'will + V nguyên thể'. Câu sử dụng thì tương lai đơn. (B) 'enhances' là V chia ngôi thứ ba - sai, (C) 'enhancing' là V-ing - không dùng sau 'will', (D) 'enhanced' là V3 - không dùng trong tương lai đơn."
        },
        {
          id: 27,
          question: "_______ increasing competition in the market, our company has maintained its leading position through continuous innovation.",
          options: ["Because", "Although", "Despite", "Unless"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'Despite'. 'Despite + noun phrase' (mặc dù) diễn tả sự tương phản: cạnh tranh tăng NHƯNG công ty vẫn giữ vị trí dẫn đầu. (A) 'Because' = vì (nguyên nhân) - sai logic, (B) 'Although' cần mệnh đề, (D) 'Unless' = trừ khi - sai nghĩa."
        },
        {
          id: 28,
          question: "The board of directors has requested a _______ analysis of the proposed merger before making a final decision.",
          options: ["comprehend", "comprehensive", "comprehension", "comprehensively"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'comprehensive'. Cần tính từ đứng trước danh từ 'analysis' để mô tả loại phân tích. 'Comprehensive' (toàn diện, đầy đủ) là tính từ phù hợp. (A) là động từ, (C) là danh từ, (D) là trạng từ."
        },
        {
          id: 29,
          question: "Employees are encouraged to _______ with colleagues from different departments to foster innovation and knowledge sharing.",
          options: ["compete", "cooperate", "compare", "complain"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'cooperate'. 'Cooperate with' = hợp tác với. Ngữ cảnh khuyến khích nhân viên hợp tác để thúc đẩy đổi mới. (A) 'compete' = cạnh tranh - sai logic, (C) 'compare' = so sánh - không phù hợp, (D) 'complain' = phàn nàn - sai nghĩa hoàn toàn."
        },
        {
          id: 30,
          question: "The company's revenue has increased _______ over the past three years due to successful market expansion strategies.",
          options: ["steady", "steadily", "steadiness", "steadied"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'steadily'. Cần trạng từ để bổ nghĩa cho động từ 'has increased'. 'Steadily' (một cách đều đặn, liên tục) mô tả cách thức tăng trưởng. (A) 'steady' là tính từ, (C) 'steadiness' là danh từ, (D) 'steadied' là động từ quá khứ - không phù hợp với hiện tại hoàn thành."
        }
      ]
    },

    part6: {
      title: "PART 6: Cloze Text (Company Announcement)",
      description: "10 câu hỏi - Điền từ/cụm vào văn bản thông báo công ty. Đọc toàn bộ và chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `To: All Staff
From: Michael Chen, Operations Director
Subject: New Remote Work Policy Implementation
Date: November 20, 2025

Dear Colleagues,

Following extensive consultation with department heads and employee representatives, I am pleased to announce the implementation of our new flexible remote work policy, effective January 1, 2026.

Under this policy, eligible employees will be permitted to work remotely up to three days per week, subject to manager approval and operational requirements. This initiative aims to (31) work-life balance while maintaining our commitment to collaborative teamwork and productivity.

To ensure smooth implementation, we have established clear guidelines. Employees must (32) a remote work agreement with their direct supervisor outlining specific work days, communication protocols, and performance expectations. All remote workers are required to remain accessible during core business hours (9 AM - 3 PM) and attend mandatory in-person meetings as scheduled.

Our IT department has worked diligently to (33) the necessary technological infrastructure. All approved remote workers will receive a company laptop, secure VPN access, and technical support. Please note that employees are responsible for maintaining a professional home workspace with reliable internet connectivity.

Department managers will evaluate remote work requests based on several criteria: job responsibilities, performance history, and team coordination needs. Positions requiring physical presence - such as facilities management and reception - will naturally have (34) flexibility than roles that are primarily computer-based.

This policy represents a significant shift in our organizational culture. We recognize that (35) to new work arrangements may present challenges initially. Therefore, we will conduct a comprehensive review after six months to assess the policy's effectiveness and gather feedback for potential adjustments.

Training sessions on remote work best practices, time management, and digital collaboration tools will be offered throughout December. Attendance is highly encouraged, (36) for employees who have limited experience with remote work arrangements.

We believe this policy will enhance employee satisfaction and help us attract top talent in an increasingly competitive job market. However, success depends on everyone's commitment to maintaining professionalism, communication, and accountability (37) of work location.

Please review the complete policy document attached to this email carefully. If you have questions or concerns, you may (38) our HR department at hr@company.com or attend one of the information sessions scheduled for next week.

Department managers will begin accepting remote work applications starting December 1. We encourage you to (39) with your supervisor to determine whether remote work is suitable for your role and to develop a plan that serves both your needs and the team's objectives.

Thank you for your continued dedication to our organization. We are confident that this policy will contribute to a more (40) and productive work environment for all.

Best regards,
Michael Chen
Operations Director`,
      questions: [
        {
          id: 31,
          type: "fill",
          question: "(31) - Điền từ thích hợp",
          context: "This initiative aims to (31) work-life balance...",
          options: ["reduce", "improve", "ignore", "complicate"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'improve'. 'Improve work-life balance' (cải thiện sự cân bằng giữa công việc và cuộc sống) là collocation phổ biến và hợp lý với chính sách làm việc từ xa. (A) 'reduce' = giảm - sai nghĩa, (C) 'ignore' = bỏ qua - sai logic, (D) 'complicate' = làm phức tạp - tiêu cực."
        },
        {
          id: 32,
          type: "fill",
          question: "(32) - Điền từ thích hợp",
          context: "Employees must (32) a remote work agreement with their direct supervisor...",
          options: ["cancel", "complete", "avoid", "forget"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'complete'. 'Complete an agreement' (hoàn thành/ký kết thỏa thuận) là cách diễn đạt chuẩn trong văn bản công việc. Nhân viên phải hoàn thành thỏa thuận trước khi làm việc từ xa. (A) 'cancel' = hủy - sai logic, (C) 'avoid' = tránh - sai nghĩa, (D) 'forget' = quên - không hợp lý."
        },
        {
          id: 33,
          type: "fill",
          question: "(33) - Điền từ thích hợp",
          context: "Our IT department has worked diligently to (33) the necessary technological infrastructure.",
          options: ["destroy", "establish", "remove", "prevent"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'establish'. 'Establish infrastructure' (thiết lập cơ sở hạ tầng) là collocation chuẩn. IT đã làm việc để xây dựng hệ thống công nghệ cần thiết. (A) 'destroy' = phá hủy - sai nghĩa hoàn toàn, (C) 'remove' = loại bỏ - sai logic, (D) 'prevent' = ngăn chặn - không phù hợp."
        },
        {
          id: 34,
          type: "fill",
          question: "(34) - Điền từ thích hợp",
          context: "...will naturally have (34) flexibility than roles that are primarily computer-based.",
          options: ["more", "less", "equal", "similar"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'less'. Logic: công việc yêu cầu có mặt trực tiếp (facilities management, reception) sẽ có ÍT linh hoạt HƠN ('less flexibility than') so với công việc trên máy tính. (A) 'more' - sai logic ngược, (C) 'equal' và (D) 'similar' - không hợp với cấu trúc so sánh 'than'."
        },
        {
          id: 35,
          type: "fill",
          question: "(35) - Điền từ thích hợp",
          context: "We recognize that (35) to new work arrangements may present challenges initially.",
          options: ["adapting", "returning", "objecting", "refusing"],
          correct: 0,
          explanation: "Đáp án đúng là (A) 'adapting'. 'Adapting to' (thích nghi với) là collocation chuẩn. Công ty nhận ra rằng việc thích nghi với cách làm việc mới có thể gặp khó khăn ban đầu. (B) 'returning' = quay lại - không phù hợp, (C) 'objecting' = phản đối - tiêu cực, (D) 'refusing' = từ chối - sai nghĩa."
        },
        {
          id: 36,
          type: "fill",
          question: "(36) - Điền từ thích hợp",
          context: "Attendance is highly encouraged, (36) for employees who have limited experience...",
          options: ["except", "never", "especially", "rarely"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'especially'. 'Especially for' (đặc biệt là cho) nhấn mạnh nhóm đối tượng cần tham gia training nhiều nhất: nhân viên ít kinh nghiệm làm việc từ xa. (A) 'except' = ngoại trừ - sai logic ngược, (B) 'never' và (D) 'rarely' - sai nghĩa hoàn toàn."
        },
        {
          id: 37,
          type: "fill",
          question: "(37) - Điền từ thích hợp",
          context: "...maintaining professionalism, communication, and accountability (37) of work location.",
          options: ["because", "regardless", "instead", "in case"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'regardless'. 'Regardless of' = bất kể, không phụ thuộc vào. Nghĩa: duy trì tính chuyên nghiệp BẤT KỂ làm việc ở đâu (văn phòng hay nhà). (A) 'because of' = vì - sai nghĩa, (C) 'instead of' = thay vì - sai logic, (D) 'in case of' = trong trường hợp - không phù hợp."
        },
        {
          id: 38,
          type: "fill",
          question: "(38) - Điền từ thích hợp",
          context: "...you may (38) our HR department at hr@company.com...",
          options: ["ignore", "contact", "avoid", "delete"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'contact'. 'Contact someone at [email/phone]' (liên hệ ai đó qua...) là cách diễn đạt chuẩn khi cung cấp thông tin liên lạc. (A) 'ignore' = bỏ qua - sai nghĩa, (C) 'avoid' = tránh - sai logic, (D) 'delete' = xóa - không hợp lý."
        },
        {
          id: 39,
          type: "fill",
          question: "(39) - Điền từ thích hợp",
          context: "We encourage you to (39) with your supervisor to determine...",
          options: ["argue", "disagree", "discuss", "fight"],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'discuss'. 'Discuss with someone' (thảo luận với ai đó) là cách diễn đạt chuyên nghiệp và phù hợp trong môi trường công việc. Nhân viên nên thảo luận với quản lý về khả năng làm việc từ xa. (A) 'argue' = tranh cãi, (B) 'disagree' = không đồng ý, (D) 'fight' = đánh nhau - đều tiêu cực và không phù hợp."
        },
        {
          id: 40,
          type: "fill",
          question: "(40) - Điền từ thích hợp",
          context: "...will contribute to a more (40) and productive work environment...",
          options: ["negative", "flexible", "rigid", "stressful"],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'flexible'. 'Flexible and productive environment' (môi trường linh hoạt và hiệu quả) phù hợp với chính sách làm việc từ xa, kết hợp tích cực với 'productive'. (A) 'negative' = tiêu cực - sai nghĩa, (C) 'rigid' = cứng nhắc - trái ngược với mục tiêu chính sách, (D) 'stressful' = căng thẳng - tiêu cực."
        }
      ]
    },

    part7: {
      title: "PART 7: Multiple Texts (Job Advertisement + Email)",
      description: "10 câu hỏi - Đọc quảng cáo tuyển dụng và email, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `**SENIOR MARKETING ANALYST POSITION**

InnovateTech Solutions - A Leading Digital Marketing Agency

**About Us:**
InnovateTech Solutions has been at the forefront of digital marketing innovation for over 15 years, serving Fortune 500 clients across multiple industries. Our collaborative team of 200+ professionals operates from offices in New York, London, and Singapore.

**Position Overview:**
We are seeking an experienced Senior Marketing Analyst to join our Strategic Insights team. This role will be instrumental in analyzing campaign performance, identifying market trends, and developing data-driven recommendations for our premium clients.

**Key Responsibilities:**
• Conduct comprehensive analysis of multi-channel marketing campaigns
• Develop predictive models to forecast campaign outcomes and ROI
• Collaborate with creative and strategy teams to optimize client deliverables
• Present findings and strategic recommendations to senior leadership and clients
• Mentor junior analysts and contribute to team knowledge development

**Required Qualifications:**
• Bachelor's degree in Marketing, Statistics, Business Analytics, or related field
• Minimum 5 years of experience in marketing analytics or data science
• Advanced proficiency in SQL, Python, and data visualization tools (Tableau, Power BI)
• Demonstrated ability to translate complex data into actionable business insights
• Excellent presentation and communication skills
• Experience with A/B testing methodologies and statistical analysis

**Preferred Qualifications:**
• Master's degree in relevant field
• Experience with machine learning applications in marketing
• Background in e-commerce or technology sectors
• Professional certifications in analytics or digital marketing

**What We Offer:**
• Competitive salary range: $95,000 - $125,000 annually (based on experience)
• Comprehensive health, dental, and vision insurance
• 401(k) with 5% company match
• Flexible hybrid work arrangement (3 days in office, 2 days remote)
• Professional development budget of $3,000 annually
• Four weeks paid vacation plus national holidays

**Application Process:**
Interested candidates should submit a resume, cover letter, and portfolio of previous analytical work (case studies or project examples) to careers@innovatetech.com by December 31, 2025. Please include "Senior Marketing Analyst Application - [Your Name]" in the email subject line.

First-round interviews will be conducted via video conference in early January, with final interviews at our New York office. We aim to make hiring decisions by mid-February.

InnovateTech Solutions is an equal opportunity employer committed to diversity and inclusion.

---

**EMAIL MESSAGE**

**To:** careers@innovatetech.com
**From:** david.torres@emailpro.com
**Date:** December 10, 2025
**Subject:** Senior Marketing Analyst Application - David Torres

Dear Hiring Manager,

I am writing to express my strong interest in the Senior Marketing Analyst position advertised on your company website. With seven years of progressive experience in marketing analytics and a proven track record of driving measurable business results, I believe I would be an excellent addition to your Strategic Insights team.

Currently, I serve as Marketing Analytics Manager at DataDrive Corporation, where I lead a team of four analysts supporting our e-commerce division. In this role, I have successfully implemented predictive modeling frameworks that improved campaign ROI by an average of 23% across our client portfolio. I am particularly proud of developing an attribution model that helped one major retail client reallocate their $15 million annual marketing budget more efficiently, resulting in a 31% increase in online conversions.

My technical skills align closely with your requirements. I work extensively with SQL for data extraction and Python for statistical analysis and modeling. I have also created numerous interactive dashboards using Tableau that have become essential tools for our executive team's decision-making. Additionally, I completed my Master's degree in Business Analytics from Columbia University last year while working full-time, which has deepened my expertise in advanced statistical methods and machine learning applications.

What attracts me most to InnovateTech Solutions is your reputation for innovative approaches to digital marketing challenges. I have followed several of your published case studies, particularly your work with Global Retail Inc., which demonstrated sophisticated use of customer segmentation and predictive analytics. The opportunity to work with Fortune 500 clients across diverse industries would provide exactly the kind of challenging environment where I thrive.

I am particularly interested in your hybrid work arrangement, as I believe this model optimally balances collaborative teamwork with the focused concentration time that complex analytical work requires. Having successfully managed remote team members during the pandemic, I have developed strong practices for virtual collaboration and communication.

Regarding the application materials, I have attached my resume and a portfolio containing three detailed case studies from recent projects. These examples demonstrate my approach to problem-solving, technical execution, and translating insights into strategic recommendations. I have redacted client-specific confidential information while preserving the analytical methodologies and outcomes.

I would welcome the opportunity to discuss how my experience and skills would contribute to your team's continued success. I am available for a video interview at your convenience and would be happy to travel to New York for final-round interviews. Given my current employment, I would require approximately three weeks' notice period should you extend an offer.

Thank you for considering my application. I look forward to speaking with you about this exciting opportunity.

Best regards,

David Torres
(555) 342-7891
david.torres@emailpro.com
LinkedIn: linkedin.com/in/davidtorresanalytics`,
      questions: [
        {
          id: 41,
          question: "What is the primary focus of the Senior Marketing Analyst role?",
          options: [
            "Creating advertising designs",
            "Analyzing campaigns and developing data-driven recommendations",
            "Managing social media accounts",
            "Hiring new team members"
          ],
          correct: 1,
          explanation: "Quảng cáo nêu rõ: 'This role will be instrumental in analyzing campaign performance, identifying market trends, and developing data-driven recommendations for our premium clients.' Đây là trách nhiệm chính của vị trí."
        },
        {
          id: 42,
          question: "What is the minimum experience requirement for this position?",
          options: [
            "3 years",
            "5 years",
            "7 years",
            "10 years"
          ],
          correct: 1,
          explanation: "Trong phần Required Qualifications, yêu cầu rõ ràng: 'Minimum 5 years of experience in marketing analytics or data science.' 5 năm là yêu cầu tối thiểu."
        },
        {
          id: 43,
          question: "What can be inferred about David Torres's qualifications?",
          options: [
            "He does not meet the minimum requirements",
            "He exceeds the minimum experience requirement",
            "He has no technical skills",
            "He has never worked in marketing"
          ],
          correct: 1,
          explanation: "David nói: 'With seven years of progressive experience in marketing analytics...' Anh có 7 năm kinh nghiệm, vượt qua yêu cầu tối thiểu 5 năm. Anh cũng có Master's degree - thuộc preferred qualifications."
        },
        {
          id: 44,
          question: "What specific achievement does David highlight from his current role?",
          options: [
            "Hiring 10 new employees",
            "Improving campaign ROI by 23% on average",
            "Creating a new company logo",
            "Reducing operational costs by half"
          ],
          correct: 1,
          explanation: "David nêu rõ thành tựu: 'I have successfully implemented predictive modeling frameworks that improved campaign ROI by an average of 23% across our client portfolio.' Đây là kết quả đo lường được."
        },
        {
          id: 45,
          question: "Why is David particularly interested in InnovateTech Solutions?",
          options: [
            "The company offers the highest salary in the industry",
            "His friend works there",
            "The company's reputation for innovative approaches and Fortune 500 clients",
            "The office is close to his home"
          ],
          correct: 2,
          explanation: "David giải thích: 'What attracts me most to InnovateTech Solutions is your reputation for innovative approaches to digital marketing challenges... The opportunity to work with Fortune 500 clients across diverse industries would provide exactly the kind of challenging environment where I thrive.'"
        },
        {
          id: 46,
          question: "What educational qualification does David possess that is listed as 'preferred' in the job ad?",
          options: [
            "Bachelor's degree in Marketing",
            "Master's degree in Business Analytics",
            "PhD in Statistics",
            "High school diploma only"
          ],
          correct: 1,
          explanation: "Trong Preferred Qualifications: 'Master's degree in relevant field.' David nói: 'I completed my Master's degree in Business Analytics from Columbia University last year.' Anh đáp ứng yêu cầu ưu tiên này."
        },
        {
          id: 47,
          question: "How many case studies did David include in his application portfolio?",
          options: [
            "One",
            "Two",
            "Three",
            "Five"
          ],
          correct: 2,
          explanation: "David viết: 'I have attached my resume and a portfolio containing three detailed case studies from recent projects.' Ba case studies được đính kèm để thể hiện năng lực phân tích."
        },
        {
          id: 48,
          question: "What is David's notice period requirement if offered the position?",
          options: [
            "Immediately available",
            "One week",
            "Three weeks",
            "Three months"
          ],
          correct: 2,
          explanation: "David nêu rõ: 'Given my current employment, I would require approximately three weeks' notice period should you extend an offer.' Ba tuần là thời gian báo trước cần thiết."
        },
        {
          id: 49,
          question: "Which technical tool does David specifically mention using for interactive dashboards?",
          options: [
            "Excel",
            "SQL",
            "Tableau",
            "Python"
          ],
          correct: 2,
          explanation: "David viết: 'I have also created numerous interactive dashboards using Tableau that have become essential tools for our executive team's decision-making.' Tableau là công cụ tạo dashboard."
        },
        {
          id: 50,
          question: "When does InnovateTech aim to make final hiring decisions?",
          options: [
            "December 31, 2025",
            "Early January",
            "Mid-February",
            "March 2026"
          ],
          correct: 2,
          explanation: "Quảng cáo nêu timeline: 'First-round interviews will be conducted via video conference in early January, with final interviews at our New York office. We aim to make hiring decisions by mid-February.' Mid-February là thời điểm quyết định cuối cùng."
        }
      ]
    },

    part8: {
      title: "PART 8: Text Message Chain - Office Coordination",
      description: "10 câu hỏi - Đọc chuỗi tin nhắn giữa đồng nghiệp, chọn đáp án tốt nhất (A, B, C, D).",
      type: "reading",
      text: `LISA CHEN (09:15): Morning Alex! Quick question - did you receive the updated presentation slides from the design team?

ALEX MORGAN (09:18): Hi Lisa. Yes, I got them late yesterday evening. I reviewed them briefly but noticed several data visualizations don't match our latest quarterly figures.

LISA CHEN (09:20): Oh no, that's problematic. Our client meeting is at 2 PM today. Do we have time to get corrections made?

ALEX MORGAN (09:22): It's tight, but possible. The main issues are on slides 7, 12, and 15. I can provide the correct numbers to the design team within the next 30 minutes if they can turn around revisions quickly.

LISA CHEN (09:24): Perfect. I'll call Jennifer in design right now and ask her to prioritize this. Can you send me those corrections via email so I have a backup?

ALEX MORGAN (09:26): Absolutely. Sending now. Also, I noticed the executive summary slide is missing our new positioning statement that was approved last week. Should we include that?

LISA CHEN (09:28): Definitely - that's actually central to today's pitch. Can you draft that slide? You were in the strategy session, so you know the exact wording.

ALEX MORGAN (09:30): On it. I'll have that to you by 10:30. One more thing - are we still planning to demo the beta software during the meeting?

LISA CHEN (09:32): That was the original plan, but Tom from IT messaged me this morning saying they found a bug affecting the reporting module. He recommends waiting until it's patched.

ALEX MORGAN (09:35): Hmm, that's unfortunate timing. The demo was supposed to be our strongest selling point. What's our backup plan?

LISA CHEN (09:37): I'm thinking we show recorded video demonstrations instead of live demo. We have that comprehensive walkthrough video from the product launch last month. It showcases all the key features without risk of technical issues.

ALEX MORGAN (09:40): Smart solution. That video is actually more polished than a live demo would be anyway. Should we prepare any printed materials as leave-behinds?

LISA CHEN (09:42): Good thinking. Can you arrange for 8 copies of our company brochure and the one-page product summary to be printed? The client team has 6 people, plus 2 extras just in case.

ALEX MORGAN (09:44): Will do. I'll run down to the print center now. Should be back by 10:15. Do you need anything else prepared?

LISA CHEN (09:46): Actually, yes - can you also bring bottles of water and coffee to the conference room around 1:45? I want everything set up before they arrive at 2.

ALEX MORGAN (09:48): Absolutely. I'll coordinate with facilities. By the way, did we ever hear back from the client about dietary restrictions for the lunch we're ordering?

LISA CHEN (09:50): Yes! I forgot to mention - Sarah from their team is vegetarian, and Michael has a gluten allergy. I already adjusted the catering order yesterday to accommodate.

ALEX MORGAN (09:52): Excellent. Sounds like we're on track despite the morning hiccups. I'll focus on those corrections and the new slide now.

LISA CHEN (09:54): Thanks Alex. Your flexibility is a lifesaver. Let's sync up again at 11:30 to do a final run-through before lunch.

ALEX MORGAN (09:56): Perfect. Talk then!`,
      questions: [
        {
          id: 51,
          question: "What is the main problem Lisa and Alex discover with the presentation?",
          options: [
            "The slides are in the wrong format",
            "Data visualizations don't match the latest figures",
            "The presentation is too long",
            "There are spelling errors throughout"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Data visualizations don't match the latest figures' (Hình ảnh trực quan hóa dữ liệu không khớp với số liệu mới nhất). Alex phát hiện vấn đề lúc 09:18: 'I reviewed them briefly but noticed several **data visualizations don't match our latest quarterly figures**' (Tôi đã xem qua sơ bộ nhưng nhận thấy một số hình ảnh dữ liệu không khớp với số liệu quý mới nhất của chúng ta). Từ khóa: '**don't match**' (không khớp) và '**latest quarterly figures**' (số liệu quý mới nhất). Đây là vấn đề nghiêm trọng vì dữ liệu sai trong bài thuyết trình khách hàng có thể làm mất uy tín. Phân tích các lựa chọn sai: (A) không đề cập đến format/định dạng sai, (C) không có ai nói presentation quá dài, (D) không ai nhắc đến lỗi chính tả. Vấn đề tập trung hoàn toàn vào độ chính xác của dữ liệu."
        },
        {
          id: 52,
          question: "What time is the client meeting scheduled?",
          options: [
            "9:15 AM",
            "11:30 AM",
            "2:00 PM",
            "5:00 PM"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) '2:00 PM' (2 giờ chiều). Lisa nêu rõ thời gian lúc 09:20: 'Oh no, that's problematic. **Our client meeting is at 2 PM today.**' (Ôi không, vấn đề đó nghiêm trọng đấy. Cuộc họp khách hàng của chúng ta là lúc 2 giờ chiều hôm nay). Từ khóa: '**at 2 PM today**' (lúc 2 giờ chiều hôm nay). Thông tin này quan trọng vì tạo ra áp lực thời gian - họ chỉ còn khoảng 5 tiếng để sửa presentation, in tài liệu, và chuẩn bị mọi thứ. Phân tích các lựa chọn sai: (A) 9:15 AM là thời gian Lisa bắt đầu nhắn tin (LISA CHEN 09:15), không phải thời gian họp khách hàng. (B) 11:30 AM là thời gian Lisa và Alex dự định 'sync up' để final run-through (09:54: 'Let's sync up again at 11:30'), không phải họp khách. (D) 5:00 PM không được đề cập trong toàn bộ đoạn hội thoại."
        },
        {
          id: 53,
          question: "Which slides contain incorrect data?",
          options: [
            "Slides 1, 2, and 3",
            "Slides 5, 10, and 20",
            "Slides 7, 12, and 15",
            "All slides"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'Slides 7, 12, and 15' (Các slide số 7, 12 và 15). Alex xác định chính xác lúc 09:22: 'It's tight, but possible. **The main issues are on slides 7, 12, and 15.** I can provide the correct numbers to the design team within the next 30 minutes if they can turn around revisions quickly.' (Thời gian gấp nhưng có thể làm được. Các vấn đề chính ở slides 7, 12 và 15. Tôi có thể cung cấp số liệu chính xác cho team thiết kế trong vòng 30 phút tới nếu họ có thể sửa nhanh). Từ khóa: '**The main issues are on slides**' (Các vấn đề chính ở các slide). Alex đã xác định CỤ THỂ ba slides có lỗi, chứng tỏ anh đã kiểm tra kỹ lưỡng. Điều này cũng cho thấy vấn đề không lan tỏa khắp presentation - chỉ tập trung ở 3 slides cụ thể. Phân tích các lựa chọn sai: (A), (B) không được đề cập, (D) 'All slides' sai hoàn toàn - nếu tất cả slides đều sai thì không thể sửa kịp trong vài giờ."
        },
        {
          id: 54,
          question: "Why can't they do a live software demo during the meeting?",
          options: [
            "They don't have the necessary equipment",
            "IT found a bug in the reporting module",
            "The client doesn't want to see it",
            "The software is not ready at all"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'IT found a bug in the reporting module' (Bộ phận IT phát hiện lỗi trong module báo cáo). Lisa giải thích lúc 09:32 khi Alex hỏi về demo: 'That was the original plan, but **Tom from IT messaged me this morning saying they found a bug affecting the reporting module.** He recommends waiting until it's patched.' (Đó là kế hoạch ban đầu, nhưng Tom từ bộ phận IT nhắn tin cho tôi sáng nay nói rằng họ phát hiện một lỗi ảnh hưởng đến module báo cáo. Anh ấy khuyên nên đợi đến khi nó được vá lỗi). Từ khóa: '**found a bug**' (phát hiện lỗi), '**affecting the reporting module**' (ảnh hưởng module báo cáo), '**recommends waiting until it's patched**' (khuyên đợi đến khi được vá). Đây là vấn đề kỹ thuật nghiêm trọng vì reporting module (chức năng báo cáo) thường là tính năng quan trọng trong phần mềm doanh nghiệp. Demo trực tiếp với lỗi sẽ tạo ấn tượng xấu với khách hàng. Phân tích các lựa chọn sai: (A) không đề cập thiếu thiết bị, (C) không có thông tin khách hàng không muốn xem, (D) phần mềm vẫn sẵn sàng - chỉ có một module bị lỗi, không phải toàn bộ."
        },
        {
          id: 55,
          question: "What solution does Lisa propose instead of a live demo?",
          options: [
            "Canceling the demo entirely",
            "Using recorded video demonstrations",
            "Scheduling a separate demo session",
            "Having IT fix the bug during the meeting"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Using recorded video demonstrations' (Sử dụng video demo đã ghi sẵn). Lisa đề xuất giải pháp thay thế lúc 09:37: 'I'm thinking we **show recorded video demonstrations instead of live demo.** We have that **comprehensive walkthrough video from the product launch last month.** It showcases all the key features without risk of technical issues.' (Tôi đang nghĩ chúng ta nên chiếu video demo đã ghi sẵn thay vì demo trực tiếp. Chúng ta có video hướng dẫn toàn diện từ buổi ra mắt sản phẩm tháng trước. Nó thể hiện tất cả các tính năng chính mà không có rủi ro về vấn đề kỹ thuật). Từ khóa: '**recorded video demonstrations**' (video demo đã ghi), '**instead of live demo**' (thay vì demo trực tiếp), '**without risk of technical issues**' (không có rủi ro lỗi kỹ thuật). Đây là giải pháp thông minh vì: (1) tận dụng tài liệu có sẵn từ product launch, (2) loại bỏ rủi ro lỗi phần mềm, (3) video đã được polish/chỉnh sửa chuyên nghiệp. Alex cũng đồng ý lúc 09:40: 'That video is actually more polished than a live demo would be anyway.' Phân tích các lựa chọn sai: (A) họ không hủy demo - vẫn muốn show sản phẩm, (C) không đề cập schedule riêng, (D) không thực tế vì IT không thể fix bug ngay trong meeting."
        },
        {
          id: 56,
          question: "How many people are on the client team?",
          options: [
            "4 people",
            "6 people",
            "8 people",
            "10 people"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) '6 people' (6 người). Lisa chỉ định rõ ràng lúc 09:42 khi yêu cầu Alex in tài liệu: 'Can you arrange for **8 copies of our company brochure and the one-page product summary** to be printed? **The client team has 6 people, plus 2 extras just in case.**' (Bạn có thể sắp xếp in 8 bản brochure công ty và bản tóm tắt sản phẩm một trang không? Đội khách hàng có 6 người, cộng thêm 2 bản dự phòng đề phòng trường hợp cần). Từ khóa: '**The client team has 6 people**' (Đội khách hàng có 6 người). Lý do in 8 bản: 6 người trong team + 2 bản extra (dự phòng) = 8 bản tổng cộng. Đây là practice tốt trong business meeting - luôn chuẩn bị thêm tài liệu phòng trường hợp có người tham gia phút chót hoặc tài liệu bị hỏng. Phân tích các lựa chọn sai: (A) 4 người - quá ít, không đúng, (C) 8 người - đây là TỔNG SỐ BẢN IN (6 khách + 2 extra), không phải số người, (D) 10 người - không được đề cập."
        },
        {
          id: 57,
          question: "What dietary accommodations need to be made for the lunch?",
          options: [
            "One person is vegan",
            "Sarah is vegetarian and Michael has a gluten allergy",
            "Everyone is lactose intolerant",
            "No dietary restrictions"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'Sarah is vegetarian and Michael has a gluten allergy' (Sarah ăn chay và Michael dị ứng gluten). Lisa xác nhận lúc 09:50 khi Alex hỏi về dietary restrictions: 'Yes! I forgot to mention - **Sarah from their team is vegetarian, and Michael has a gluten allergy.** I already adjusted the catering order yesterday to accommodate.' (Đúng rồi! Tôi quên nhắc - Sarah từ đội của họ ăn chay, và Michael bị dị ứng gluten. Tôi đã điều chỉnh đơn đặt catering hôm qua để đáp ứng rồi). Từ khóa: '**vegetarian**' (người ăn chay - không ăn thịt nhưng có thể ăn dairy), '**gluten allergy**' (dị ứng gluten - protein trong lúa mì, không thể ăn bánh mì thường, pasta thông thường). Điều này thể hiện sự chuyên nghiệp: Lisa đã chủ động hỏi trước và adjust catering order từ hôm qua, không phải gấp rút vào phút chót. Business etiquette quan trọng: luôn hỏi dietary restrictions trước khi order lunch/dinner cho khách. Phân tích các lựa chọn sai: (A) không có ai vegan (stricter - không ăn bất cứ sản phẩm động vật nào), (C) không đề cập lactose intolerant, (D) sai - có 2 yêu cầu đặc biệt rõ ràng."
        },
        {
          id: 58,
          question: "When do Lisa and Alex plan to do a final run-through?",
          options: [
            "At 9:30 AM",
            "At 10:30 AM",
            "At 11:30 AM",
            "At 1:45 PM"
          ],
          correct: 2,
          explanation: "Đáp án đúng là (C) 'At 11:30 AM' (Lúc 11 giờ 30 sáng). Lisa đề xuất lúc 09:54: 'Thanks Alex. Your flexibility is a lifesaver. **Let's sync up again at 11:30 to do a final run-through before lunch.**' (Cảm ơn Alex. Sự linh hoạt của bạn là cứu cánh. Hãy gặp nhau lại lúc 11:30 để chạy thử lần cuối trước bữa trưa). Từ khóa: '**sync up at 11:30**' (gặp lại lúc 11:30), '**final run-through**' (chạy thử/kiểm tra lần cuối), '**before lunch**' (trước bữa trưa). Timeline logic của ngày làm việc: 09:15-09:56 - phát hiện vấn đề và lên kế hoạch sửa, 10:30 - Alex hoàn thành slide mới (09:30: 'I'll have that to you by 10:30'), 11:30 - họp kiểm tra cuối cùng, sau đó lunch, 13:45 (1:45 PM) - setup phòng họp, 14:00 (2:00 PM) - khách hàng đến. Phân tích các lựa chọn sai: (A) 9:30 AM là deadline Alex nộp slide mới ('I'll have that to you by 10:30' - anh nói lúc 09:30 sẽ có bản draft trong 1 giờ), (B) 10:30 AM là khi Alex hứa sẽ hoàn thành slide positioning statement, (D) 1:45 PM là thời gian Alex setup nước uống/cà phê vào phòng họp, không phải run-through."
        },
        {
          id: 59,
          question: "What can be inferred about Alex's role in the meeting preparation?",
          options: [
            "He is only responsible for printing materials",
            "He is actively involved in multiple aspects of preparation",
            "He is not contributing anything significant",
            "He is only attending as an observer"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'He is actively involved in multiple aspects of preparation' (Anh ấy tham gia tích cực vào nhiều khía cạnh của việc chuẩn bị). Bằng chứng từ toàn bộ đoạn hội thoại cho thấy Alex đóng vai trò then chốt: **1. Quality Control** (Kiểm soát chất lượng): Anh phát hiện lỗi dữ liệu trong slides (09:18: 'noticed several data visualizations don't match our latest quarterly figures'). **2. Data Analysis** (Phân tích dữ liệu): Anh cung cấp số liệu chính xác để sửa (09:22: 'I can provide the correct numbers to the design team within the next 30 minutes'). **3. Content Creation** (Tạo nội dung): Anh soạn slide positioning statement mới (09:30: 'I'll have that to you by 10:30'). **4. Logistics** (Hậu cần): In tài liệu 8 bản (09:44), setup nước uống/cà phê (09:48). **5. Problem Solving** (Giải quyết vấn đề): Anh đưa ra ý tưởng về leave-behind materials (09:40), hỏi về dietary restrictions (09:48). **6. Strategic Input** (Đóng góp chiến lược): Anh tham gia strategy session nên hiểu rõ positioning (09:28: 'You were in the strategy session, so you know the exact wording'). Lisa cũng khen anh: 'Your flexibility is a lifesaver' (09:54) - thừa nhận vai trò quan trọng. Phân tích các lựa chọn sai: (A) anh không CHỈ in tài liệu - đó chỉ là 1 trong nhiều task, (C) hoàn toàn sai - contribution rất lớn, (D) anh không phải observer - là người chủ động giải quyết vấn đề."
        },
        {
          id: 60,
          question: "What does Lisa mean when she says 'Your flexibility is a lifesaver' at 09:54?",
          options: [
            "She is criticizing Alex for being too flexible",
            "She appreciates Alex's ability to adapt to changing circumstances",
            "She thinks Alex should be more rigid",
            "She is being sarcastic about Alex's work"
          ],
          correct: 1,
          explanation: "Đáp án đúng là (B) 'She appreciates Alex's ability to adapt to changing circumstances' (Cô ấy đánh giá cao khả năng thích nghi với hoàn cảnh thay đổi của Alex). Lisa phát biểu lúc 09:54: 'Thanks Alex. **Your flexibility is a lifesaver.** Let's sync up again at 11:30...' (Cảm ơn Alex. Sự linh hoạt của bạn là cứu cánh. Hãy gặp lại lúc 11:30...). Phân tích ngữ cảnh và tone: **1. 'Lifesaver' (cứu cánh/người cứu nguy)**: Đây là từ cực kỳ tích cực trong tiếng Anh, thể hiện sự biết ơn sâu sắc khi ai đó giúp bạn thoát khỏi tình huống khó khăn. **2. Bối cảnh 'flexibility' (sự linh hoạt)**: Buổi sáng đầy biến động - slides sai số liệu, thiếu positioning statement, không thể demo trực tiếp do bug. Alex đã nhanh chóng adapt: chấp nhận sửa slides gấp, soạn nội dung mới, chuyển sang video demo, lo logistics. **3. 'Thanks Alex'**: Lời cảm ơn chân thành mở đầu câu củng cố tone tích cực. **4. Ngữ điệu tổng thể**: Sau 'lifesaver', Lisa tiếp tục collaboration bình thường ('Let's sync up'), không có dấu hiệu tension hay mỉa mai. Trong văn hóa workplace Anglo, đây là cách khen ngợi colleague chân thành và professional. Phân tích các lựa chọn sai: (A) 'criticizing' (chỉ trích) - hoàn toàn ngược nghĩa, 'lifesaver' không bao giờ dùng để chỉ trích, (C) 'should be more rigid' (nên cứng nhắc hơn) - vô lý vì Lisa đang khen flexibility, (D) 'sarcastic' (mỉa mai) - không có bất cứ context nào cho thấy sarcasm, toàn bộ conversation mang tính hợp tác và supportive."
        }
      ]
    }
  }
};