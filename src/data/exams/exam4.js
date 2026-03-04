export const EXAM4_DATA = {
  title: "HUFLIT Listening & Reading Practice - Exam 4",
  description: "Bộ đề thi đầy đủ với Listening (4 parts, 20 câu) và Reading (4 parts, 40 câu)",

  metadata: {
    exam: "exam4",
    hasAudio: true,
   },

  parts: {
    // ==========================================
    // LISTENING PART 1
    // ==========================================
    part1: {
      title: "PART 1: Short Conversations",
      description: "Nghe 5 đoạn hội thoại ngắn. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam4/listening/part1.mp3",
      script: `Hi, everyone. I know you're all busy so I'll keep this briefing quick. I have some important information about a change in the management team. As you already know, our head of department, James Watson, is leaving his position at the end of this week. His replacement is starting at the end of the next month. In the meantime, we'll continue with our projects as usual.
I have two more quick points. Firstly, there will be some improvements made to the staff car park next month for a few weeks. It will be closed during that time.
Don't worry, we've found a solution. We can use the local church car park until our own one is ready. If you arrive before 8.30 a.m., please use our small car park on Brown Street, and if you arrive after that, you should go directly to the church car park. It's only a five-minute walk away. But they need it in the evenings, so you have to leave before 6 p.m. Sorry about that – I know how much you all love working late!
The other thing I wanted to tell you about is that the canteen has now introduced a cashless payment system. So, you can't use cash for payments any more. You can pay directly with your smartphone or you can pay using your company ID card. The total amount put on your company ID card comes off your salary at the end of each month.
OK. That's it! Are there any questions?`,

      questions: [
        {
          id: 1,
          question: "When will the new head of department begin his role?",
          options: [
            "A. At the end of this week.",
            "B. At the end of next month.",
            "C. In two weeks' time.",
            "D. Immediately."
          ],
          correct: 1,
          explanation: "Bài nghe có câu: 'His replacement is starting at the end of the next month.' → Đáp án B. Bẫy: 'At the end of this week' (A) là thời điểm James Watson rời vị trí, không phải thời điểm người thay thế bắt đầu."
        },
        {
          id: 2,
          question: "What is the main reason for the temporary closure of the staff car park?",
          options: [
            "A. It is being permanently moved to a new location.",
            "B. It is being shared with a local church.",
            "C. It is undergoing renovation and upgrades.",
            "D. It has become too small for the number of employees."
          ],
          correct: 2,
          explanation: "Bài nghe: 'there will be some improvements made to the staff car park next month for a few weeks. It will be closed during that time.' → 'improvements' = nâng cấp, cải tạo, tương đương 'renovation and upgrades' trong đáp án C. Bẫy: B sai vì nhà thờ chỉ là giải pháp thay thế."
        },
        {
          id: 3,
          question: "If an employee arrives at work at 9:00 a.m., where should they park?",
          options: [
            "A. In the main staff car park.",
            "B. On Brown Street.",
            "C. In the company's small car park.",
            "D. At the local church."
          ],
          correct: 3,
          explanation: "Bài nghe: 'If you arrive before 8.30 a.m., please use our small car park on Brown Street, and if you arrive after that, you should go directly to the church car park.' → 9:00 a.m. > 8:30 a.m. nên phải đỗ ở church car park. Bẫy: B và C đều nói về Brown Street nhưng chỉ dành cho người đến trước 8:30."
        },
        {
          id: 4,
          question: "What is a requirement for those using the church car park?",
          options: [
            "A. They must pay a small fee to the church.",
            "B. They must vacate the area by 6:00 p.m.",
            "C. They need to show their company ID to the warden.",
            "D. They must walk for more than five minutes to reach the office."
          ],
          correct: 1,
          explanation: "Bài nghe: 'But they need it in the evenings, so you have to leave before 6 p.m.' → 'leave before 6 p.m.' = phải rời đi trước 6 giờ chiều. Bẫy: D sai vì bài nói chỉ mất 'five-minute walk', không phải hơn 5 phút."
        },
        {
          id: 5,
          question: "How does the new canteen payment system work?",
          options: [
            "A. Staff can pay using physical cash at the end of the month.",
            "B. Payments are automatically deducted from wages if the ID card is used.",
            "C. Only smartphones are accepted for all transactions.",
            "D. The company ID card provides a discount on the total salary."
          ],
          correct: 1,
          explanation: "Bài nghe: 'The total amount put on your company ID card comes off your salary at the end of each month.' → 'comes off your salary' = bị trừ vào lương. Bẫy: A sai vì 'you can't use cash anymore'; C sai vì còn dùng được company ID card."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 2
    // ==========================================
    part2: {
      title: "PART 2: Interview",
      description: "Nghe một cuộc phỏng vấn nhập học sau đại học. Chọn đáp án tốt nhất (A, B, C) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam4/listening/part2.mp3",
      script: `Dr Hilsden:
Right Julia, so from your CV and portfolio, and what you've already told me, you seem to be very much the sort of person we're looking for on the postgraduate course. So tell me, you finished your Fashion Design course in London four years ago – did you think of carrying straight on and doing a higher degree at the time?
Julia:
Yes but there were financial pressures. So I ended up working in the retail industry, as you can see from my CV. And actually it was a very useful experience.
Dr Hilsden:
Mmm. In what way?
Julia:
Well, I was lucky to get the job with FashionNow – they're a big store, and one of my priorities was to get as much experience as possible in different areas, so that was good because I had the chance to work in lots of different departments.
Julia:
And having direct contact with the customers meant I was able to see how they reacted to innovation – to new fashion ideas, because with FashionNow, a designer might show something in New York or Milan and there'll be something similar in the shop within weeks. So, that was probably the most useful thing for me.
Dr Hilsden:
Right. And so what's made you decide to do a postgraduate course now?
Julia:
Erm. Well, while I enjoyed working at FashionNow and I learned a lot there, I felt... well, the way forward would have been to develop my managerial skills rather than my skills in fashion design, and I'm not sure that's what I want to do.
Dr Hilsden:
Mmm, yes.
Julia:
When I was doing my degree in London I'd been interested in women's wear. But I know that there's been a lot of work done in areas like new fabric construction – and though I'm not intending to go too deeply into the technology I'd be very interested in looking at how new fabrics could be used in children's wear, so I'd like the chance to pursue that line.
Dr Hilsden:
Yes. Good. And are you at all concerned about what's going to be like coming back into an academic context after being away from it for several years?
Julia:
No, I'm looking forward to it. But I'm basically more interested in the application than the theory or at least that's what I've found so far, and I'm hoping the course will give me the contacts and skills I need eventually to set up my own enterprise. I'm particularly interested by the overseas links that the department has.
Dr Hilsden:
Yes, many of our students look overseas or to international companies for sponsorship of their projects.
Julia:
And the facilities here look excellent. I just went to look at the library – it's really impressive. There's so much room compared with the one at my old university.
Dr Hilsden:
Yes, most students find it's a good place to study. And there are linkups to other universities, of course, and all the usual electronic sources. The staff run an Information Skills Programme which we recommend all postgraduates do in the first week or two. Design students find the Special Collections particularly useful.
Julia:
Yes.
Dr Hilsden:
Then we have a separate Computer Centre, which has its own academic coordinator, Tim Spender – he's got a background in art design, and the ethos of the centre is that it's a studio for innovation and creativity, rather than a computer laboratory.
Julia:
Oh right, I liked the study spaces where students can sit and discuss work together – very useful for joint projects. We always had to do that sort of thing in the cafeteria when I was an undergraduate. And I read in the brochure that there's a separate resource for photography.
Dr Hilsden:
Yes, it's called Photomedia. It's not just for photography, but things like digital imaging and new media. It's a resource for all our students, not just fashion design, and we encourage students to work there producing work that crosses disciplinary boundaries.
Dr Hilsden:
It's well used – in fact, it's doubled in size since it was set up three years ago. And we also have an offshoot from that which is called Time Based Media – this is for students who want to develop their ideas in the area of the moving image or sound. That's in a new building that was specially built for it just last year, but there are plans to expand it as the present facilities are overstretched already.
Julia:
Right.
Dr Hilsden:
Now, is there anything you'd like to ask about the course itself?
Julia:
Erm... I know it's a combination of taught modules and a specialist project, but how does assessment fit in?
Dr Hilsden:
Well, as you'd expect on a course of this nature, it's an ongoing process. The degree course has four stages, and there are what we call progress reviews at the end of each of the first three. Then the final assessment is based on your project. You have to produce a report which is a critical reflection on your work.
Julia:
And is there some sort of fashion show?
Dr Hilsden:
There's an exhibition. The projects aren't all focused on clothes as such, some are more experimental, so that seems more appropriate. We ask representatives of fashion companies along, and it's usually well attended.
Julia:
Right. And another thing I wanted to ask...`,

      questions: [
        {
          id: 6,
          question: "Julia believes her experience at 'FashionNow' was most useful because she",
          options: [
            "A. worked in many different departments.",
            "B. saw how customers responded to new designs.",
            "C. traveled to major fashion cities like New York and Milan.",
            "D. developed her managerial skills in the retail industry."
          ],
          correct: 1,
          explanation: "Julia nói: 'having direct contact with the customers meant I was able to see how they reacted to innovation… So, that was probably the most useful thing for me.' → Cụm 'the most useful thing for me' xác nhận đáp án B. Bẫy: A đúng nhưng không phải 'most useful'; C sai hoàn toàn – Julia không đi đến New York hay Milan; D ngược ý – Julia không muốn phát triển kỹ năng quản lý."
        },
        {
          id: 7,
          question: "For her postgraduate project, Julia is particularly interested in",
          options: [
            "A. the technology used in fabric construction.",
            "B. designing a new range of clothing for women.",
            "C. the use of innovative fabrics in children's clothes.",
            "D. exploring overseas markets for fashion brands."
          ],
          correct: 2,
          explanation: "Julia nói: 'I'd be very interested in looking at how new fabrics could be used in children's wear.' → 'new fabrics' = innovative fabrics; 'children's wear' = children's clothes. Bẫy: A sai vì Julia nói không muốn đi quá sâu vào công nghệ; B sai vì women's wear là sở thích trước đây; D không được đề cập là định hướng dự án."
        },
        {
          id: 8,
          question: "What does Julia say about the university library?",
          options: [
            "A. It has more space than the one at her previous university.",
            "B. It provides a special program in the first week for all students.",
            "C. It is the only place where students can access electronic sources.",
            "D. It has a unique Special Collections section for all disciplines."
          ],
          correct: 0,
          explanation: "Julia nói: 'There's so much room compared with the one at my old university.' → 'so much room' = nhiều không gian hơn. Bẫy: B là về Information Skills Programme, không liên quan trực tiếp đến thư viện; C sai vì không có thông tin 'only place'; D sai vì Special Collections được đề cập dành cho Design students, không phải all disciplines."
        },
        {
          id: 9,
          question: "What is unique about the Computer Centre?",
          options: [
            "A. It is led by a coordinator with a background in science.",
            "B. It is viewed as a creative studio rather than a laboratory.",
            "C. It is the only area where students can work on joint projects.",
            "D. It was recently built to replace the old photography resource."
          ],
          correct: 1,
          explanation: "Dr Hilsden nói: 'the ethos of the centre is that it's a studio for innovation and creativity, rather than a computer laboratory.' → Paraphrase trực tiếp của đáp án B. Bẫy: A sai vì coordinator có background in art design, không phải science; C sai vì study spaces mới là nơi làm việc nhóm; D sai hoàn toàn – không có thông tin này."
        },
        {
          id: 10,
          question: "How is the postgraduate course assessed?",
          options: [
            "A. Through a series of taught modules and exams.",
            "B. By a progress review at the end of every stage.",
            "C. Based on a final project and a written reflective report.",
            "D. Through an end-of-year fashion show judged by industry experts."
          ],
          correct: 2,
          explanation: "Dr Hilsden nói: 'The final assessment is based on your project. You have to produce a report which is a critical reflection on your work.' → 'critical reflection' = reflective report; 'based on your project' = final project. Bẫy: A sai vì không nhắc đến exams; B sai vì progress reviews chỉ ở 3 giai đoạn đầu, không phải cuối cùng; D sai vì có exhibition chứ không phải fashion show, và không phải hình thức đánh giá chính thức."
        }
      ]
    },

    // ==========================================
    // LISTENING PART 3
    // ==========================================
    part3: {
      title: "PART 3: Conversation",
      description: "Nghe một đoạn hội thoại giữa hai sinh viên. Chọn đáp án tốt nhất (A, B, C, D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam4/listening/part3.mp3",
      script: `Clara: Hi, how are you? I haven't seen you in class for a while.
Ben: Good, thanks. You?
Clara: Great, as long as I don't think too hard about all the essays I have to write this term!
Ben: Yeah…
Clara: Hey, are you OK?
Ben: I have to admit, I'm struggling a bit. Maybe even a lot. I've not been sleeping well at all and then I can't concentrate. And all these things are just going around and around in my head.
Clara: Mmm… that doesn't sound good. So, you're sleeping badly and you can't concentrate. Is that all it is, do you think?
Ben: Well, if I'm honest, it's more than that. I'm starting to dread going outside. I find myself worrying about stupid things like what if I forget the way home. Or, what if I go to class thinking it's Monday but actually it's Friday and I'm in the wrong place at the wrong time. It sounds even more stupid when I say it out loud. It took me two hours to leave the house today.
Clara: It doesn't sound stupid at all. It actually sounds a lot like me last year.
Ben: Really? But you're so together!
Clara: I've learned to be, but even I still have bad days. I used to have panic attacks and everything. When you were trying to leave the house today, how did you feel?
Ben: Like I couldn't breathe. And my heart was going way too fast.
Clara: Hmm… that sounds like a panic attack to me.
Ben: I thought I was going to die.
Clara: You'd be surprised how common they are. Loads of people have them, they just don't talk about it.
Ben: How did you get over them?
Clara: I actually talked to a doctor about it, and you should too. But I learned some practical things as well. Though they're easier said than done, and they're going to sound weird, so hear me out, OK?
Ben: OK…
Clara: So, one thing I did was to try to reduce the power of the anxiety and the panic attacks when they came. So – and this may sound strange – at a time when you're feeling safe and OK, you literally do things that make your heart start racing faster and your breathing speed up. Like spinning around on a chair until you're dizzy or hyperventilating so you're short of breath.
Ben: That sounds awful!
Clara: It is, but it means you get used to the symptoms, so they feel less scary.
Ben: Right.
Clara: Then you have to deliberately do the things that usually make you feel panic. So, if it's going to class on Monday and being scared you've got the wrong day, on Monday you go to class. If you let the anxiety control you by making you stay at home, it just makes it worse the next time you really do have to go out.
Ben: And what did you do if a panic attack came anyway?
Clara: I had a distraction plan. So, I walked everywhere instead of taking the bus because the exercise helped, but also I did things like count trees or red cars or something. Whatever it was didn't matter, as long as I had something else to focus on.
Ben: I can't tell you how much I appreciate this. I thought…`,

      questions: [
        {
          id: 11,
          question: "What does Ben first say is affecting him?",
          options: [
            "A. He is not sleeping well and cannot focus.",
            "B. He is worried about writing essays.",
            "C. He feels unwell physically.",
            "D. He is having problems with his classmates."
          ],
          correct: 0,
          explanation: "Ben nói: 'I've not been sleeping well at all and then I can't concentrate.' → 'can't concentrate' = cannot focus. Từ 'first' rất quan trọng – đây là những gì Ben đề cập đầu tiên. Bẫy: B là vấn đề của Clara, không phải Ben; C xuất hiện sau trong đoạn hội thoại."
        },
        {
          id: 12,
          question: "Why does Ben find it hard to leave the house?",
          options: [
            "A. He feels too tired in the mornings.",
            "B. He is afraid of meeting people he knows.",
            "C. He worries about unlikely situations happening.",
            "D. He is unsure about his class timetable."
          ],
          correct: 2,
          explanation: "Ben nói: 'worrying about stupid things like what if I forget the way home…' → 'stupid things' = irrational / unlikely situations. Đây là paraphrase điển hình. Bẫy: D chỉ là một ví dụ về nỗi lo lắng, không phải nguyên nhân chính."
        },
        {
          id: 13,
          question: "What does Clara say she did when she experienced similar problems?",
          options: [
            "A. She talked to a doctor.",
            "B. She avoided going out for a while.",
            "C. She immediately started medication.",
            "D. She reduced her course workload."
          ],
          correct: 0,
          explanation: "Clara nói rõ: 'I actually talked to a doctor about it, and you should too.' → Rất trực tiếp. Khi người nói thêm 'you should too', đó thường là giải pháp chính được đề xuất."
        },
        {
          id: 14,
          question: "Why does Clara suggest deliberately increasing her heart rate?",
          options: [
            "A. To improve physical fitness.",
            "B. To prevent future panic attacks completely.",
            "C. To become familiar with the physical symptoms of panic.",
            "D. To test whether the problem is serious."
          ],
          correct: 2,
          explanation: "Clara giải thích: 'you literally do things that make your heart start racing… so they feel less scary.' → Mục đích là quen với triệu chứng để giảm sợ hãi. Từ 'so' phía sau thường chỉ ra mục đích thực sự."
        },
        {
          id: 15,
          question: "What distraction technique did Clara use during panic attacks?",
          options: [
            "A. Counting objects around her.",
            "B. Listening to calming music.",
            "C. Calling a friend for reassurance.",
            "D. Reading something on her phone."
          ],
          correct: 0,
          explanation: "Clara nói: 'I did things like count trees or red cars or something.' → 'counting trees / red cars' = counting objects around her. Cụm 'like…' sau thường dẫn đến đáp án cụ thể."
        }
      ]
    },

   // ==========================================
    // LISTENING PART 4 - UPDATED (4 OPTIONS)
    // ==========================================
    part4: {
      title: "PART 4: News Report",
      description: "Nghe một bản tin tức. Chọn đáp án tốt nhất (A, B, C hoặc D) cho mỗi câu hỏi.",
      type: "listening",
      audioUrl: "/public/data/audio/exam4/listening/part4.mp3",
      script: `The first item in the news today is the recent elections that took place across the country. This was a crucial vote, which may see a dramatic change in how the country develops over the coming years. Overall, a 54.5 per cent voter turnout was registered. This represents an increase of 11 per cent over the previous election and six per cent above the average for the past 50 years. There has also been a slight change in demographics, with an increase in youth turnout in the 18- to 24- and 24- to 29-year-old brackets. Despite this increase, young people are still less likely to vote than older people; 84 per cent of voters in the 70 plus age group came to the polling stations.
Moving on, the global digital powerhouse ONK today posted quarterly results which were above forecast. Back in March, Tim Bolling, CEO, issued a profit warning over fears that there would be losses following the recall of their leading product, the 40d device. In fact, the company posted quarterly revenue of US$14.8 billion which represents an increase of 11 per cent from the same quarter a year ago. They also announced that they had sold 21 million 40d devices over the quarter. The company has provided the information that with this level of revenue, there will be a gross margin of 34 to 35 per cent, ultimately leading to a US$1.20 per share cash dividend awarded to shareholders.
And in our final news item we ask, will we soon be saying goodbye to coins and notes forever? The nationwide trend of using cashless payment options is increasing. There are a number of reasons for this development. A key reason for this is a growing interest in reducing the number of items people need to leave their homes with. As almost everyone carries a smartphone with them, and many people also have smartwatches, the ability to pay for things using one of these two technologies is particularly appealing. More and more retailers are accepting cashless payments and in some cases they've stopped accepting cash altogether.`,

      questions: [
        {
          id: 16,
          question: "What was the voter turnout in the most recent election?",
          options: [
            "A. 11 per cent.",
            "B. 54.5 per cent.",
            "C. 50 per cent.",
            "D. 84 per cent."
          ],
          correct: 1, // Đáp án B
          explanation: "Bản tin nêu rõ: 'Overall, a 54.5 per cent voter turnout was registered.' Đáp án A là mức tăng, C là số năm trung bình, D là tỷ lệ của nhóm trên 70 tuổi."
        },
        {
          id: 17,
          question: "According to the news, which group was most likely to vote?",
          options: [
            "A. People aged 18 to 24.",
            "B. People aged 24 to 29.",
            "C. People aged 50 to 60.",
            "D. People aged 70 and over."
          ],
          correct: 3, // Đáp án D
          explanation: "Bản tin xác nhận: '84 per cent of voters in the 70 plus age group came to the polling stations.' Đây là nhóm có tỷ lệ cao nhất."
        },
        {
          id: 18,
          question: "What was the actual performance of ONK in the last quarter?",
          options: [
            "A. Its results were higher than expected.",
            "B. It suffered losses due to a product recall.",
            "C. Its revenue decreased by 11 per cent.",
            "D. It failed to meet its profit targets."
          ],
          correct: 0, // Đáp án A
          explanation: "Bản tin: 'quarterly results which were above forecast' (vượt dự báo). Đáp án B chỉ là nỗi lo trước đó, C sai vì doanh thu thực tế tăng."
        },
        {
          id: 19,
          question: "What will the shareholders of ONK receive?",
          options: [
            "A. A gross margin of 35 per cent.",
            "B. Free 40d devices.",
            "C. A cash payment of US$1.20 per share.",
            "D. A bonus based on the 11 per cent revenue increase."
          ],
          correct: 2, // Đáp án C
          explanation: "Bản tin: 'a US$1.20 per share cash dividend awarded to shareholders.' (Cổ tức bằng tiền mặt)."
        },
        {
          id: 20,
          question: "What is a primary reason for the shift towards cashless payments?",
          options: [
            "A. Retailers are legally required to stop taking cash.",
            "B. People want to carry fewer physical items.",
            "C. Smartwatches have completely replaced smartphones.",
            "D. Cash is no longer accepted anywhere in the country."
          ],
          correct: 1, // Đáp án B
          explanation: "Bản tin: 'growing interest in reducing the number of items people need to leave their homes with.' (Muốn mang ít đồ hơn khi ra ngoài)."
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
          question: "The marketing team worked late to ensure the campaign was completed ______ schedule.",
          options: [
            "A. in",
            "B. on",
            "C. at",
            "D. by"
          ],
          correct: 1,
          explanation: "Cụm cố định: 'on schedule' = đúng tiến độ. Các cụm thời gian cần thuộc lòng: on time (đúng giờ), on schedule (đúng tiến độ). in schedule / at schedule / by schedule đều sai giới từ."
        },
        {
          id: 22,
          question: "Ms. Peterson is responsible for reviewing all financial reports before they are ______ to the director.",
          options: [
            "A. submitting",
            "B. submission",
            "C. submitted",
            "D. submit"
          ],
          correct: 2,
          explanation: "Cấu trúc bị động: 'reports are ______ to the director' → cần 'are + V3/ed' → 'are submitted'. submitting (V-ing), submission (danh từ), submit (nguyên mẫu) đều sai cấu trúc."
        },
        {
          id: 23,
          question: "The new software update will significantly improve the system's overall ______.",
          options: [
            "A. efficient",
            "B. efficiently",
            "C. efficiency",
            "D. efficiencies"
          ],
          correct: 2,
          explanation: "Sau tính từ sở hữu 'system's overall ______' cần danh từ. 'efficiency' = hiệu suất. efficient (tính từ), efficiently (trạng từ) sai từ loại; efficiencies (số nhiều) ít dùng trong ngữ cảnh chung."
        },
        {
          id: 24,
          question: "Employees must submit their travel receipts ______ Friday to receive reimbursement.",
          options: [
            "A. until",
            "B. by",
            "C. during",
            "D. while"
          ],
          correct: 1,
          explanation: "'by + thời điểm' = trước hoặc vào thời điểm đó (deadline). until: kéo dài liên tục đến; during: trong suốt; while: trong khi. TOEIC hay bẫy 'by vs until'."
        },
        {
          id: 25,
          question: "Neither the manager nor the employees ______ aware of the policy changes.",
          options: [
            "A. was",
            "B. were",
            "C. is",
            "D. be"
          ],
          correct: 1,
          explanation: "Cấu trúc: 'Neither A nor B + V chia theo chủ ngữ gần nhất'. Chủ ngữ gần nhất: 'employees' (số nhiều) → dùng 'were'."
        },
        {
          id: 26,
          question: "The conference room is too small to ______ all the participants.",
          options: [
            "A. accommodate",
            "B. accommodation",
            "C. accommodating",
            "D. accommodates"
          ],
          correct: 0,
          explanation: "Sau 'to' là động từ nguyên mẫu. 'to accommodate' = để chứa. accommodation (danh từ), accommodating (V-ing), accommodates (chia động từ) đều sai cấu trúc."
        },
        {
          id: 27,
          question: "Customers are advised to keep their receipts in case they need to request a ______.",
          options: [
            "A. refund",
            "B. reduce",
            "C. return",
            "D. repair"
          ],
          correct: 0,
          explanation: "'refund' = hoàn tiền – phù hợp ngữ cảnh giữ hóa đơn để yêu cầu hoàn tiền. reduce (giảm), return (trả lại đồ, không phải tiền), repair (sửa chữa) đều sai nghĩa."
        },
        {
          id: 28,
          question: "The CEO postponed the meeting ______ an unexpected emergency.",
          options: [
            "A. because",
            "B. because of",
            "C. despite",
            "D. although"
          ],
          correct: 1,
          explanation: "'because of + danh từ/cụm danh từ'. 'an unexpected emergency' là cụm danh từ → dùng 'because of'. because (cần mệnh đề đầy đủ), despite/although (nghĩa đối lập) đều sai."
        },
        {
          id: 29,
          question: "The company is looking for a candidate who is capable ______ working independently.",
          options: [
            "A. at",
            "B. in",
            "C. of",
            "D. with"
          ],
          correct: 2,
          explanation: "Cụm cố định: 'capable of + V-ing'. at / in / with đều sai giới từ."
        },
        {
          id: 30,
          question: "After reviewing the proposal, the board decided to approve it without any further ______.",
          options: [
            "A. discuss",
            "B. discussed",
            "C. discussion",
            "D. discussing"
          ],
          correct: 2,
          explanation: "Sau tính từ 'further ______' cần danh từ. 'discussion' = sự thảo luận. discuss (động từ), discussed (V3/ed), discussing (V-ing) đều sai từ loại."
        }
      ]
    },

    // ==========================================
    // READING PART 6 - CLOZE TEXT
    // ==========================================
    part6: {
      title: "PART 6: Cloze Text (Renewable Energy)",
      description: "10 câu hỏi - Đọc bài về năng lượng tái tạo và chọn đáp án tốt nhất để hoàn thiện văn bản cũng như trả lời câu hỏi đọc hiểu.",
      type: "reading",
      text: `Advancements in Renewable Energy

Renewable energy sources, once considered alternative, are now becoming mainstream. Solar power, for instance, (31) __________. A few years later, the technology was showcased at a major energy conference in Europe, and has since been adopted by numerous countries worldwide. At one such event, solar power received significant recognition in June 2022 and was even featured in several international environmental summits that year. During a presentation in Japan in 2023, solar power was highlighted at the World Renewable Energy Congress.

Solar power is the latest innovation from a global consortium (32) __________. Undoubtedly, solar power, along with other renewable energy sources, represents the rapid progress in the field of sustainable technology and environmental conservation.

(33) __________. The design of solar panels is inspired by both modern engineering principles and environmental considerations. (34) __________. But what sets solar power apart from other energy sources is its ability to harness sunlight efficiently, providing clean and sustainable energy.

Solar power impresses the world with its ability to generate electricity without harmful emissions. The solar energy system, which is a combination of photovoltaic cells and advanced energy storage solutions, and other sophisticated technologies enable solar power to provide reliable energy.

Equipped with innovative algorithms, (35) __________.`,

      questions: [
        {
          id: 31,
          question: "Choose the best option to fill in blank (31).",
          options: [
            "A. which had its first major deployment in urban areas in 2018, demonstrating its potential",
            "B. was first introduced to the public in urban areas in 2018, showcasing its benefits",
            "C. that had its initial deployment in urban areas in 2018, highlighting its advantages",
            "D. having been initially deployed in urban areas in 2018, revealing its capabilities"
          ],
          correct: 1,
          explanation: "Chủ ngữ chính là 'Solar power', cần một động từ chính hoàn chỉnh. B có cấu trúc 'S + was + V3' hoàn chỉnh. A dùng 'which' tạo mệnh đề quan hệ không có main verb; C dùng 'that' tương tự; D dùng phân từ không có động từ chính."
        },
        {
          id: 32,
          question: "Choose the best option to fill in blank (32).",
          options: [
            "A. whose combined efforts in research, engineering, and environmental science have led to the development of efficient solar panels",
            "B. succeeded in creating advanced solar panels by integrating research in engineering and environmental science",
            "C. brought innovative solar panels to life thanks to its achievements in research, engineering, and environmental science",
            "D. of which the collaborative efforts in research, engineering, and environmental science have resulted in groundbreaking solar technology"
          ],
          correct: 0,
          explanation: "'whose' dùng đúng để chỉ sở hữu cho danh từ 'consortium' → 'whose combined efforts'. Trong academic writing, 'whose' tự nhiên hơn 'of which' khi nói về tổ chức. B và C thiếu đại từ quan hệ."
        },
        {
          id: 33,
          question: "Choose the best option to fill in blank (33).",
          options: [
            "A. It has been designed to assist humans in reducing carbon footprints and promoting sustainability",
            "B. People in the fields of environmental science and engineering contributed to the development of solar power",
            "C. Intending to revolutionize energy production and promote sustainability, wind power was developed",
            "D. The advancements in environmental science and engineering led to the creation of solar power"
          ],
          correct: 0,
          explanation: "Câu tiếp theo nói về 'design of solar panels' → câu điền vào cần nêu mục đích thiết kế. A logic: nêu mục tiêu (giảm carbon) → rồi chuyển sang thiết kế. C đổi chủ đề sang wind power (sai coherence); B và D lặp ý đã có."
        },
        {
          id: 34,
          question: "Choose the best option to fill in blank (34).",
          options: [
            "A. Without its array of photovoltaic cells and energy storage systems functioning efficiently, it could not harness sunlight effectively",
            "B. Its photovoltaic cells and energy storage systems does not work together, making it unable to harness sunlight efficiently",
            "C. It has photovoltaic cells for energy capture and storage systems for energy retention, enabling it to harness sunlight effectively",
            "D. Using photovoltaic cells and energy storage systems, they allow it to harness sunlight as efficiently as possible"
          ],
          correct: 2,
          explanation: "C có cấu trúc song song rõ ràng: 'cells for capture + systems for retention → enabling'. A dùng câu điều kiện phủ định không phù hợp; B sai subject-verb agreement (cells + systems → do not, không phải does not); D có lỗi dangling reference ('they' không rõ antecedent)."
        },
        {
          id: 35,
          question: "Choose the best option to fill in blank (35).",
          options: [
            "A. the system can generate electricity and provide reliable energy without harmful emissions",
            "B. generating electricity and providing reliable energy are becoming easier for solar power",
            "C. the technology can help solar power generate electricity and provide sustainable energy",
            "D. interaction in energy generation between solar power and other sources takes place seamlessly"
          ],
          correct: 0,
          explanation: "Cụm phân từ 'Equipped with innovative algorithms' phải bổ nghĩa cho chủ ngữ ngay sau. A: 'the system' hợp logic (system được trang bị algorithms). B không phải mệnh đề hoàn chỉnh; D không liên quan trực tiếp đến 'equipped'."
        },
        {
          id: 36,
          question: "What is the main purpose of the passage?",
          options: [
            "A. To criticize the limitations of solar power technology",
            "B. To describe the development and global recognition of solar power",
            "C. To compare solar power with fossil fuels",
            "D. To explain how to install solar panels at home"
          ],
          correct: 1,
          explanation: "Toàn bài đề cập: lịch sử phát triển, sự công nhận quốc tế, tiến bộ công nghệ của năng lượng mặt trời. Không có nội dung so sánh với fossil fuels, hướng dẫn lắp đặt, hay chỉ trích."
        },
        {
          id: 37,
          question: "According to the passage, solar power gained significant recognition in June 2022 at ______.",
          options: [
            "A. a renewable energy exhibition in Japan",
            "B. a major energy conference in Europe",
            "C. several international environmental summits",
            "D. the World Renewable Energy Congress"
          ],
          correct: 2,
          explanation: "Bài đọc: 'solar power received significant recognition in June 2022 and was even featured in several international environmental summits that year.' → 'that year' = 2022 → đáp án C. Hội nghị ở Europe là trước đó; Japan là năm 2023."
        },
        {
          id: 38,
          question: "The word 'consortium' in paragraph 2 is closest in meaning to:",
          options: [
            "A. individual company",
            "B. government agency",
            "C. group of organizations",
            "D. research laboratory"
          ],
          correct: 2,
          explanation: "'Consortium' = liên minh các tổ chức hợp tác với nhau. Không phải công ty đơn lẻ (A), cơ quan chính phủ (B), hay phòng thí nghiệm riêng lẻ (D)."
        },
        {
          id: 39,
          question: "What is mentioned as a key feature that distinguishes solar power from other energy sources?",
          options: [
            "A. Its low installation cost",
            "B. Its ability to function without advanced technology",
            "C. Its capacity to efficiently harness sunlight",
            "D. Its dependence on fossil fuels"
          ],
          correct: 2,
          explanation: "Bài đọc nhấn mạnh: 'what sets solar power apart from other energy sources is its ability to harness sunlight efficiently' → đây là đặc điểm nổi bật nhất."
        },
        {
          id: 40,
          question: "What can be inferred about the future of solar power?",
          options: [
            "A. It will likely continue to expand due to technological advancements",
            "B. It will replace all other forms of renewable energy",
            "C. It is only suitable for use in Europe and Japan",
            "D. It has not yet proven its effectiveness"
          ],
          correct: 0,
          explanation: "Toàn bài mang giọng điệu tích cực, nhấn mạnh tiến bộ và mở rộng toàn cầu → suy ra sẽ tiếp tục phát triển. B cực đoan; C trái nội dung (đã được nhiều quốc gia áp dụng); D sai vì bài đã chứng minh hiệu quả."
        }
      ]
    },

    // ==========================================
    // READING PART 7 - ARTICLE
    // ==========================================
    part7: {
      title: "PART 7: Single Long Text (Article)",
      description: "10 câu hỏi - Đọc bài báo về trí tuệ nhân tạo và chọn đáp án tốt nhất.",
      type: "reading",
      text: `Living with artificial intelligence

Powerful artificial intelligence (AI) needs to be reliably aligned with human values, but does this mean AI will eventually have to police those values?

This has been the decade of AI, with one astonishing feat after another. A chess-playing AI that can defeat not only all human chess players, but also all previous human-programmed chess machines, after learning the game in just four hours? That's yesterday's news, what's next? True, these prodigious accomplishments are all in so-called narrow AI, where machines perform highly specialised tasks. But many experts believe this restriction is very temporary. By mid-century, we may have artificial general intelligence (AGI) — machines that can achieve human-level performance on the full range of tasks that we ourselves can tackle.

If so, there's little reason to think it will stop there. Machines will be free of many of the physical constraints on human intelligence. Our brains run at slow biochemical processing speeds on the power of a light bulb, and their size is restricted by the dimensions of the human birth canal. It is remarkable what they accomplish, given these handicaps. But they may be as far from the physical limits of thought as our eyes are from the incredibly powerful Webb Space Telescope.

Once machines are better than us at designing even smarter machines, progress towards these limits could accelerate. What would this mean for us? Could we ensure a safe and worthwhile coexistence with such machines? On the plus side, AI is already useful and profitable for many things, and super AI might be expected to be super useful, and super profitable. But the more powerful AI becomes, the more important it will be to specify its goals with great care. Folklore is full of tales of people who ask for the wrong thing, with disastrous consequences — King Midas, for example, might have wished that everything he touched turned to gold, but didn't really intend this to apply to his breakfast.

So we need to create powerful AI machines that are 'human-friendly' — that have goals reliably aligned with our own values. One thing that makes this task difficult is that we are far from reliably human-friendly ourselves. We do many terrible things to each other and to many other creatures with whom we share the planet. If super intelligent machines don't do a lot better than us, we'll be in deep trouble. We'll have powerful new intelligence amplifying the dark sides of our own fallible natures.

For safety's sake, then, we want the machines to be ethically as well as cognitively superhuman. We want them to aim for the moral high ground, not for the troughs in which many of us spend some of our time. Luckily they'll be smart enough for the job. If there are routes to the moral high ground, they'll be better than us at finding them, and steering us in the right direction.

However, there are two big problems with this utopian vision. One is how we get the machines started on the journey, the other is what it would mean to reach this destination. The 'getting started' problem is that we need to tell the machines what they're looking for with sufficient clarity that we can be confident they will find it — whatever 'it' actually turns out to be. This won't be easy, given that we are tribal creatures and conflicted about the ideals ourselves. We often ignore the suffering of strangers, and even contribute to it, at least indirectly. How then, do we point machines in the direction of something better?

As for the 'destination' problem, we might, by putting ourselves in the hands of these moral guides and gatekeepers, be sacrificing our own autonomy — an important part of what makes us human. Machines who are better than us at sticking to the moral high ground may be expected to discourage some of the lapses we presently take for granted. We might lose our freedom to discriminate in favour of our own communities, for example.

Loss of freedom to behave badly isn't always a bad thing, of course: denying ourselves the freedom to put children to work in factories, or to smoke in restaurants are signs of progress. But are we ready for ethical silicon police limiting our options? They might be so good at doing it that we won't notice them; but few of us are likely to welcome such a future.

These issues might seem far-fetched, but they are to some extent already here. AI already has some input into how resources are used in our National Health Service (NHS) here in the UK, for example. If it was given a greater role, it might do so much more efficiently than humans can manage, and act in the interests of taxpayers and those who use the health system. However, we'd be depriving some humans (e.g. senior doctors) of the control they presently enjoy. Since we'd want to ensure that people are treated equally and that policies are fair, the goals of AI would need to be specified correctly.

We have a new powerful technology to deal with — itself, literally, a new way of thinking. For our own safety, we need to point these new thinkers in the right direction, and get them to act well for us. It is not yet clear whether this is possible, but if it is, it will require a cooperative spirit, and a willingness to set aside self-interest.

Both general intelligence and moral reasoning are often thought to be uniquely human capacities. But safety seems to require that we think of them as a package: if we are to give general intelligence to machines, we'll need to give them moral authority, too. And where exactly would that leave human beings? All the more reason to think about the destination now, and to be careful about what we wish for.`,

      questions: [
        {
          id: 41,
          question: "What is the main topic of the passage?",
          options: [
            "A. The history of artificial intelligence development",
            "B. The benefits of AI in the healthcare system",
            "C. The challenges of aligning powerful AI with human values",
            "D. The comparison between human intelligence and telescopes"
          ],
          correct: 2,
          explanation: "Ngay mở bài: 'Powerful AI needs to be reliably aligned with human values…' Toàn bài xoay quanh thách thức đạo đức và căn chỉnh mục tiêu AI. B chỉ là ví dụ nhỏ (NHS); D là phép so sánh minh họa."
        },
        {
          id: 42,
          question: "According to the passage, current AI achievements are mainly in",
          options: [
            "A. artificial general intelligence",
            "B. narrow artificial intelligence",
            "C. moral reasoning systems",
            "D. human-level robotics"
          ],
          correct: 1,
          explanation: "Bài đọc ghi rõ: 'these accomplishments are all in so-called narrow AI, where machines perform highly specialised tasks.' AGI là tương lai chưa đạt được; moral reasoning và robotics không được đề cập là thành tựu hiện tại."
        },
        {
          id: 43,
          question: "Why does the author mention the human birth canal?",
          options: [
            "A. To explain why machines cannot think like humans",
            "B. To show that human intelligence has physical limitations",
            "C. To compare biological evolution with technology",
            "D. To criticise human biology"
          ],
          correct: 1,
          explanation: "Bài đọc: 'their size is restricted by the dimensions of the human birth canal.' → Mục đích là nhấn mạnh trí tuệ con người bị giới hạn vật lý, trong khi máy móc thì không."
        },
        {
          id: 44,
          question: "The word 'aligned' in paragraph 1 is closest in meaning to:",
          options: [
            "A. opposed",
            "B. adjusted",
            "C. matched",
            "D. limited"
          ],
          correct: 2,
          explanation: "'Aligned with human values' = phù hợp / tương thích với giá trị con người. 'matched' = khớp với. opposed (trái nghĩa), adjusted (điều chỉnh – không đúng nghĩa ở đây), limited (giới hạn) đều sai."
        },
        {
          id: 45,
          question: "What example is used to illustrate the danger of poorly defined goals?",
          options: [
            "A. The development of AGI",
            "B. The National Health Service",
            "C. The story of King Midas",
            "D. The invention of the telescope"
          ],
          correct: 2,
          explanation: "Bài đọc dùng ví dụ: 'King Midas… wished that everything he touched turned to gold, but didn't really intend this to apply to his breakfast.' → Minh họa cho việc yêu cầu sai mục tiêu dẫn đến hậu quả thảm họa."
        },
        {
          id: 46,
          question: "According to the author, why is creating 'human-friendly' AI difficult?",
          options: [
            "A. Because machines lack intelligence",
            "B. Because humans themselves are morally inconsistent",
            "C. Because AI is too expensive to develop",
            "D. Because governments refuse to regulate it"
          ],
          correct: 1,
          explanation: "Bài đọc: 'we are far from reliably human-friendly ourselves. We do many terrible things to each other…' → Con người còn mâu thuẫn đạo đức nên khó dạy máy chuẩn đạo đức. Không đề cập đến chi phí hay chính phủ."
        },
        {
          id: 47,
          question: "What is one possible consequence of giving AI moral authority?",
          options: [
            "A. Humans may lose some personal freedom",
            "B. AI may refuse to follow human instructions",
            "C. Machines may stop improving",
            "D. Healthcare systems may collapse"
          ],
          correct: 0,
          explanation: "Bài đọc nêu 'destination problem': 'sacrificing our own autonomy — an important part of what makes us human.' → 'autonomy' = quyền tự chủ = personal freedom. Không có ý AI nổi loạn hay máy ngừng cải tiến."
        },
        {
          id: 48,
          question: "In the paragraph about the NHS, the author suggests that AI",
          options: [
            "A. has already replaced senior doctors",
            "B. is currently ineffective in managing resources",
            "C. could manage resources more efficiently than humans",
            "D. should not be involved in healthcare decisions"
          ],
          correct: 2,
          explanation: "Bài đọc: 'it might do so much more efficiently than humans can manage.' → Từ khóa 'more efficiently'. A sai (chưa thay thế); B ngược nghĩa; D không phản ánh quan điểm tác giả."
        },
        {
          id: 49,
          question: "What does the author imply about the future of AI?",
          options: [
            "A. It will certainly benefit humanity without risks",
            "B. It will completely replace human intelligence",
            "C. It may require humans to cooperate and reduce self-interest",
            "D. It is impossible to control"
          ],
          correct: 2,
          explanation: "Cuối bài: 'it will require a cooperative spirit, and a willingness to set aside self-interest.' → Suy luận: cần hợp tác và bớt ích kỷ. A sai (tác giả nhấn mạnh rủi ro); B và D cực đoan."
        },
        {
          id: 50,
          question: "What is the author's overall attitude toward advanced AI?",
          options: [
            "A. Completely optimistic",
            "B. Strongly negative",
            "C. Balanced and cautious",
            "D. Indifferent"
          ],
          correct: 2,
          explanation: "Tác giả đưa ra cả lợi ích ('super useful, super profitable') lẫn nguy cơ ('sacrificing autonomy', 'dark sides') → Giọng điệu cân bằng và thận trọng, không cực kỳ lạc quan cũng không bi quan."
        }
      ]
    },

    // ==========================================
    // READING PART 8 - BIOGRAPHY
    // ==========================================
    part8: {
      title: "PART 8: Single Long Text (Biography)",
      description: "10 câu hỏi - Đọc tiểu sử về Kilian Jornet và chọn đáp án tốt nhất.",
      type: "reading",
      text: `A biography of Kilian Jornet

When you picture mountain climbers scaling Mount Everest, what probably comes to mind are teams of climbers with Sherpa guides leading them to the summit, equipped with oxygen masks, supplies and tents. And in most cases you'd be right, as 97 per cent of climbers use oxygen to ascend to Everest's summit at 8,850 metres above sea level. The thin air at high altitudes makes most people breathless at 3,500 metres, and the vast majority of climbers use oxygen past 7,000 metres. A typical climbing group will have 8–15 people in it, with an almost equal number of guides, and they'll spend weeks to get to the top after reaching Base Camp.

But ultra-distance and mountain runner Kilian Jornet Burgada ascended the mountain in May 2017 alone, without an oxygen mask or fixed ropes for climbing.

Oh, and he did it in 26 hours.

With food poisoning.

And then, five days later, he did it again, this time in only 17 hours.

Born in 1987, Kilian has been training for Everest his whole life. And that really does mean his whole life, as he grew up 2,000 metres above sea level in the Pyrenees in the ski resort of Lles de Cerdanya in Catalonia, north-eastern Spain. While other children his age were learning to walk, Kilian was on skis. At one and a half years old he did a five-hour hike with his mother, entirely under his own steam. He left his peers even further behind when he climbed his first mountain and competed in his first cross-country ski race at age three. By age seven, he had scaled a 4,000er and, at ten, he did a 42-day crossing of the Pyrenees.

He was 13 when he says he started to take it 'seriously' and trained with the Ski Mountaineering Technical Centre (CTEMC) in Catalonia, entering competitions and working with a coach. At 18, he took over his own ski-mountaineering and trail-running training, with a schedule that only allows a couple of weeks of rest a year. He does as many as 1,140 hours of endurance training a year, plus strength training and technical workouts as well as specific training in the week before a race. For his record-breaking ascent and descent of the Matterhorn, he prepared by climbing the mountain ten times until he knew every detail of it, even including where the sun would be shining at every part of the day.

Sleeping only seven hours a night, Kilian Jornet seems almost superhuman. His resting heartbeat is extremely low at 33 beats per minute, compared with the average man's 60 per minute or an athlete's 40 per minute. He breathes more efficiently than average people too, taking in more oxygen per breath, and he has a much faster recovery time after exercise as his body quickly breaks down lactic acid – the acid in muscles that causes pain after exercise.

All this is thanks to his childhood in the mountains and to genetics, but it is his mental strength that sets him apart. He often sets himself challenges to see how long he can endure difficult conditions in order to truly understand what his body and mind can cope with. For example, he almost gave himself kidney failure after only drinking 3.5 litres of water on a 100km run in temperatures of around 40°C.

It would take a book to list all the races and awards he's won and the mountains he's climbed. And even here, Kilian's achievements exceed the average person as, somehow, he finds time to record his career on his blog and has written three books, Run or Die, The Invisible Border and Summits of My Life.`,

      questions: [
        {
          id: 51,
          question: "According to the passage, most climbers who attempt Mount Everest",
          options: [
            "A. climb without oxygen masks",
            "B. climb alone without guides",
            "C. use oxygen to reach the summit",
            "D. reach the summit within 24 hours"
          ],
          correct: 2,
          explanation: "Bài đọc: '97 per cent of climbers use oxygen to ascend.' → 97% = 'most climbers'. A ngược nghĩa; B sai vì có guides; D sai vì mất nhiều tuần."
        },
        {
          id: 52,
          question: "How was Kilian Jornet's ascent of Everest different from that of most climbers?",
          options: [
            "A. He used more advanced climbing equipment",
            "B. He climbed without oxygen and fixed ropes",
            "C. He was accompanied by a large team",
            "D. He spent several weeks at Base Camp"
          ],
          correct: 1,
          explanation: "Bài đọc: 'alone, without an oxygen mask or fixed ropes for climbing.' → Paraphrase trực tiếp của đáp án B."
        },
        {
          id: 53,
          question: "What unusual condition did Kilian experience during his first Everest ascent in 2017?",
          options: [
            "A. A broken leg",
            "B. Severe frostbite",
            "C. Food poisoning",
            "D. Lack of training"
          ],
          correct: 2,
          explanation: "Bài đọc nêu rõ: 'With food poisoning.' → Chi tiết rất trực tiếp, không cần suy luận."
        },
        {
          id: 54,
          question: "Which of the following is TRUE about Kilian's childhood?",
          options: [
            "A. He grew up at sea level in Spain",
            "B. He began skiing as a teenager",
            "C. He completed a long mountain crossing at age ten",
            "D. He avoided competitive sports when young"
          ],
          correct: 2,
          explanation: "Bài đọc: 'at ten, he did a 42-day crossing of the Pyrenees.' → Đáp án C. A sai (lớn lên ở 2,000m); B sai (bắt đầu từ rất nhỏ); D sai (thi đấu từ 3 tuổi)."
        },
        {
          id: 55,
          question: "The word 'scaled' in paragraph 4 is closest in meaning to:",
          options: [
            "A. measured",
            "B. climbed",
            "C. observed",
            "D. designed"
          ],
          correct: 1,
          explanation: "'Scaled a 4,000er' = leo lên một đỉnh núi 4,000 mét. 'Scaled' trong ngữ cảnh leo núi = 'climbed'."
        },
        {
          id: 56,
          question: "How did Kilian prepare for his ascent and descent of the Matterhorn?",
          options: [
            "A. By studying maps carefully",
            "B. By climbing it multiple times beforehand",
            "C. By training at sea level",
            "D. By using professional guides"
          ],
          correct: 1,
          explanation: "Bài đọc: 'he prepared by climbing the mountain ten times until he knew every detail of it.' → B là paraphrase trực tiếp."
        },
        {
          id: 57,
          question: "Which physical characteristic of Kilian is mentioned in the passage?",
          options: [
            "A. He has an unusually high resting heart rate",
            "B. He requires more sleep than average people",
            "C. His body removes lactic acid quickly",
            "D. He breathes less efficiently than others"
          ],
          correct: 2,
          explanation: "Bài đọc: 'his body quickly breaks down lactic acid.' → 'breaks down quickly' = 'removes quickly'. A sai (nhịp tim thấp 33 bpm, không cao); B sai (ngủ chỉ 7 tiếng); D ngược nghĩa."
        },
        {
          id: 58,
          question: "According to the passage, what mainly distinguishes Kilian from others?",
          options: [
            "A. His expensive equipment",
            "B. His mental strength",
            "C. His popularity online",
            "D. His formal education"
          ],
          correct: 1,
          explanation: "Bài đọc dùng cấu trúc nhấn mạnh: 'it is his mental strength that sets him apart.' → Đây là đặc điểm nổi bật nhất phân biệt Kilian với người khác."
        },
        {
          id: 59,
          question: "What example is given to demonstrate Kilian's mental toughness?",
          options: [
            "A. Climbing mountains in winter",
            "B. Writing books about endurance",
            "C. Running 100 km in extreme heat with little water",
            "D. Training only two weeks per year"
          ],
          correct: 2,
          explanation: "Bài đọc: 'he almost gave himself kidney failure after only drinking 3.5 litres of water on a 100km run in temperatures of around 40°C.' → Ví dụ minh họa cho sức chịu đựng tinh thần và thể chất."
        },
        {
          id: 60,
          question: "What can be inferred about Kilian Jornet from the passage?",
          options: [
            "A. He balances athletic success with other activities",
            "B. He plans to stop climbing soon",
            "C. He relies mainly on team support",
            "D. He avoids setting extreme challenges"
          ],
          correct: 0,
          explanation: "Cuối bài: 'he finds time to record his career on his blog and has written three books.' → Ngoài thể thao, Kilian còn viết sách và blog → cân bằng thành công thể thao với các hoạt động khác. B, C, D đều trái với nội dung bài."
        }
      ]
    }
  }
};

export default EXAM4_DATA;