// grammarData.js - Complete Grammar Learning Data for HUFLIT (with English and Vietnamese translations)
export const GRAMMAR_DATA = {
  // ===== BEGINNER LEVEL =====
  beginner: {
    level: 'Beginner',
    description: 'Foundation grammar topics for beginners (Nền tảng ngữ pháp cho người mới bắt đầu)',
    topics: {
      // Topic 1: Present Simple
      presentSimple: {
        id: 'present_simple',
        title: 'Present Simple Tense (Thì Hiện Tại Đơn)',
        difficulty: 'Beginner',
        icon: '⏰',
        description: 'Learn how to form and use the simple present tense (Học cách hình thành và sử dụng thì hiện tại đơn)',
        lessons: [
          {
            lessonId: 'ps_001',
            title: 'Introduction to Present Simple (Giới thiệu Thì Hiện Tại Đơn)',
            duration: '8 mins',
            content: `
**English:**
The Present Simple tense is used to:
- Describe habits and routines
- State facts and truths
- Express regular actions

Affirmative form: Subject + Base verb (+ s/es)
Example: I play football. She plays football.

Negative form: Subject + do/does + not + Base verb
Example: I don't play football. She doesn't play football.

Question form: Do/Does + Subject + Base verb?
Example: Do you play football? Does she play football?

**Vietnamese Translation (Dịch Tiếng Việt):**
Thì Hiện Tại Đơn được sử dụng để:
- Mô tả thói quen và hoạt động hàng ngày
- Nêu sự thật và chân lý
- Bày tỏ hành động thường xuyên

Cấu trúc khẳng định: Chủ ngữ + Động từ nguyên thể (+ s/es)
Ví dụ: I play football (Tôi chơi bóng đá). She plays football (Cô ấy chơi bóng đá).

Cấu trúc phủ định: Chủ ngữ + do/does + not + Động từ nguyên thể
Ví dụ: I don't play football (Tôi không chơi bóng đá). She doesn't play football (Cô ấy không chơi bóng đá).

Cấu trúc câu hỏi: Do/Does + Chủ ngữ + Động từ nguyên thể?
Ví dụ: Do you play football? (Bạn có chơi bóng đá không?) Does she play football? (Cô ấy có chơi bóng đá không?)
            `,
            examples: [
              { 
                example: 'I wake up at 7 AM every day.', 
                explanation: 'Regular daily habit (Thói quen hàng ngày đều đặn)',
                vietnamese: {
                  example: 'Tôi thức dậy lúc 7 giờ sáng mỗi ngày.',
                  explanation: 'Thói quen hàng ngày đều đặn'
                }
              },
              { 
                example: 'She works in a bank.', 
                explanation: 'Current occupation (Nghề nghiệp hiện tại)',
                vietnamese: {
                  example: 'Cô ấy làm việc trong ngân hàng.',
                  explanation: 'Nghề nghiệp hiện tại'
                }
              },
              { 
                example: 'Water boils at 100°C.', 
                explanation: 'Scientific fact (Sự thật khoa học)',
                vietnamese: {
                  example: 'Nước sôi ở 100°C.',
                  explanation: 'Sự thật khoa học'
                }
              },
              { 
                example: 'They go to school on weekdays.', 
                explanation: 'Routine activity (Hoạt động thường xuyên)',
                vietnamese: {
                  example: 'Họ đi học vào các ngày trong tuần.',
                  explanation: 'Hoạt động thường xuyên'
                }
              },
            ],
          },
          {
            lessonId: 'ps_002',
            title: 'Present Simple - Affirmative & Negative (Thì Hiện Tại Đơn - Khẳng Định & Phủ Định)',
            duration: '10 mins',
            content: `
**English:**
Rules for adding -s or -es:

1. Regular verbs: Add -s
   play → plays, work → works

2. Verbs ending in -ch, -sh, -x, -z, -o: Add -es
   watch → watches, push → pushes, go → goes

3. Verbs ending in consonant + y: Change y to i, add -es
   study → studies, cry → cries

Common irregular verbs:
be → is/am/are
have → has
do → does
go → goes

**Vietnamese Translation (Dịch Tiếng Việt):**
Quy tắc thêm -s hoặc -es:

1. Động từ thông thường: Thêm -s
   play → plays, work → works

2. Động từ kết thúc bằng -ch, -sh, -x, -z, -o: Thêm -es
   watch → watches, push → pushes, go → goes

3. Động từ kết thúc bằng phụ âm + y: Đổi y thành i, thêm -es
   study → studies, cry → cries

Các động từ bất quy tắc phổ biến:
be → is/am/are
have → has
do → does
go → goes
            `,
            examples: [
              { 
                example: 'She studies French.', 
                explanation: 'consonant + y → ies (phụ âm + y → ies)',
                vietnamese: {
                  example: 'Cô ấy học tiếng Pháp.',
                  explanation: 'phụ âm + y → ies'
                }
              },
              { 
                example: 'He watches TV.', 
                explanation: 'ends in -ch → add -es (kết thúc bằng -ch → thêm -es)',
                vietnamese: {
                  example: 'Anh ấy xem TV.',
                  explanation: 'kết thúc bằng -ch → thêm -es'
                }
              },
              { 
                example: 'I don\'t like spicy food.', 
                explanation: 'Negative: don\'t + base verb (Phủ định: don\'t + động từ nguyên thể)',
                vietnamese: {
                  example: 'Tôi không thích thức ăn cay.',
                  explanation: 'Phủ định: don\'t + động từ nguyên thể'
                }
              },
              { 
                example: 'They don\'t work on Sundays.', 
                explanation: 'Plural negative (Phủ định số nhiều)',
                vietnamese: {
                  example: 'Họ không làm việc vào Chủ Nhật.',
                  explanation: 'Phủ định số nhiều'
                }
              },
            ],
          },
          {
            lessonId: 'ps_003',
            title: 'Present Simple - Questions (Thì Hiện Tại Đơn - Câu Hỏi)',
            duration: '9 mins',
            content: `
**English:**
Question Formation:

With do/does:
Do you like coffee? → Yes, I do. / No, I don't.
Does he like coffee? → Yes, he does. / No, he doesn't.

Question words:
What do you do? - What is your occupation?
Where do you live? - Where is your home?
Why does she study? - For what reason?
How often do they visit? - Frequency of visits
Who plays football? - Which person?

**Vietnamese Translation (Dịch Tiếng Việt):**
Hình thành câu hỏi:

Với do/does:
Do you like coffee? → Yes, I do. / No, I don't. (Bạn có thích cà phê không? → Có, tôi thích. / Không, tôi không thích.)
Does he like coffee? → Yes, he does. / No, he doesn't. (Anh ấy có thích cà phê không? → Có, anh ấy thích. / Không, anh ấy không thích.)

Từ hỏi:
What do you do? - What is your occupation? (Bạn làm nghề gì?)
Where do you live? - Where is your home? (Bạn sống ở đâu?)
Why does she study? - For what reason? (Tại sao cô ấy học? - Vì lý do gì?)
How often do they visit? - Frequency of visits (Họ thăm bao lâu một lần? - Tần suất thăm viếng)
Who plays football? - Which person? (Ai chơi bóng đá? - Người nào?)
            `,
            examples: [
              { 
                example: 'Do they play tennis?', 
                explanation: 'Yes/No question with do (Câu hỏi Yes/No với do)',
                vietnamese: {
                  example: 'Họ có chơi tennis không?',
                  explanation: 'Câu hỏi Yes/No với do'
                }
              },
              { 
                example: 'Does your mother cook?', 
                explanation: 'Yes/No question with does (Câu hỏi Yes/No với does)',
                vietnamese: {
                  example: 'Mẹ bạn có nấu ăn không?',
                  explanation: 'Câu hỏi Yes/No với does'
                }
              },
              { 
                example: 'What time do you wake up?', 
                explanation: 'Information question (Câu hỏi thông tin)',
                vietnamese: {
                  example: 'Bạn thức dậy lúc mấy giờ?',
                  explanation: 'Câu hỏi thông tin'
                }
              },
              { 
                example: 'How often does she exercise?', 
                explanation: 'Frequency question (Câu hỏi tần suất)',
                vietnamese: {
                  example: 'Cô ấy tập thể dục bao lâu một lần?',
                  explanation: 'Câu hỏi tần suất'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'ps_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'I _____ to school every day. (Tôi _____ đến trường mỗi ngày.)',
            options: [
              { text: 'go', isCorrect: true, explanation: 'Base verb form for first person (Dạng động từ nguyên thể cho ngôi thứ nhất)' },
              { text: 'goes', isCorrect: false, explanation: 'Used only with third person singular (he/she/it) (Chỉ dùng với ngôi thứ ba số ít (he/she/it))' },
              { text: 'going', isCorrect: false, explanation: 'This is present progressive, not present simple (Đây là thì hiện tại tiếp diễn, không phải hiện tại đơn)' },
              { text: 'am go', isCorrect: false, explanation: 'Incorrect grammar (Ngữ pháp sai)' },
            ],
          },
          {
            exerciseId: 'ps_ex_002',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'She _____ like vegetables. (Cô ấy _____ thích rau củ.)',
            options: [
              { text: 'does not', isCorrect: true, explanation: 'Correct negative form (Dạng phủ định đúng)' },
              { text: 'do not', isCorrect: false, explanation: 'Used with plural subjects (Dùng với chủ ngữ số nhiều)' },
              { text: 'not like', isCorrect: false, explanation: 'Incomplete negative (Phủ định không hoàn chỉnh)' },
              { text: 'is not', isCorrect: false, explanation: 'Wrong auxiliary verb (Trợ động từ sai)' },
            ],
          },
          {
            exerciseId: 'ps_ex_003',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'My brother _____ (work) in a hospital. (Anh trai tôi _____ (làm việc) trong bệnh viện.)',
            correctAnswer: 'works',
            hints: ['Think about third person singular (Nghĩ về ngôi thứ ba số ít)', 'Add -s to the verb (Thêm -s vào động từ)'],
            explanation: 'With third person singular subject (he/she/it), add -s to the base verb (Với chủ ngữ ngôi thứ ba số ít (he/she/it), thêm -s vào động từ nguyên thể)',
          },
          {
            exerciseId: 'ps_ex_004',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'What time _____ you finish work? (Bạn _____ tan sở lúc mấy giờ?)',
            options: [
              { text: 'do', isCorrect: true, explanation: 'Question form with do (Dạng câu hỏi với do)' },
              { text: 'does', isCorrect: false, explanation: 'Does is used with he/she/it (Does dùng với he/she/it)' },
              { text: 'are', isCorrect: false, explanation: 'Wrong auxiliary (Trợ động từ sai)' },
              { text: 'will', isCorrect: false, explanation: 'This is for future tense (Đây là cho thì tương lai)' },
            ],
          },
          {
            exerciseId: 'ps_ex_005',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'They _____ (not/watch) TV during dinner. (Họ _____ (không xem) TV trong bữa tối.)',
            correctAnswer: 'don\'t watch',
            hints: ['Use do/does for negative (Sử dụng do/does cho phủ định)', 'Remember plural subjects use do (Nhớ chủ ngữ số nhiều dùng do)'],
            explanation: 'Plural subjects use "don\'t" + base verb in negative form (Chủ ngữ số nhiều dùng "don\'t" + động từ nguyên thể trong dạng phủ định)',
          },
        ],
        vocabulary: [
          { 
            word: 'habit', 
            meaning: 'A regular or repeated behavior (Hành vi thường xuyên hoặc lặp lại)', 
            example: 'Reading is my daily habit. (Đọc sách là thói quen hàng ngày của tôi.)' 
          },
          { 
            word: 'routine', 
            meaning: 'A set of regular activities (Bộ các hoạt động thường xuyên)', 
            example: 'Morning routine includes breakfast. (Thói quen buổi sáng bao gồm ăn sáng.)' 
          },
          { 
            word: 'frequency', 
            meaning: 'How often something happens (Tần suất xảy ra điều gì đó)', 
            example: 'How is the frequency of your exercise? (Tần suất tập thể dục của bạn như thế nào?)' 
          },
          { 
            word: 'occur', 
            meaning: 'To happen (Xảy ra)', 
            example: 'This problem occurs frequently. (Vấn đề này xảy ra thường xuyên.)' 
          },
        ],
      },

      // Topic 2: Present Continuous
      presentContinuous: {
        id: 'present_continuous',
        title: 'Present Continuous Tense (Thì Hiện Tại Tiếp Diễn)',
        difficulty: 'Beginner',
        icon: '🔄',
        description: 'Learn actions happening right now (Học hành động đang xảy ra ngay bây giờ)',
        lessons: [
          {
            lessonId: 'pc_001',
            title: 'Introduction to Present Continuous (Giới thiệu Thì Hiện Tại Tiếp Diễn)',
            duration: '8 mins',
            content: `
**English:**
The Present Continuous (Present Progressive) is used for:
- Actions happening RIGHT NOW
- Temporary situations
- Actions in progress

Form: Subject + am/is/are + verb-ing

I am reading
You are reading
He/She/It is reading
We are reading
They are reading

Negative: Subject + am/is/are + NOT + verb-ing
Question: Am/Is/Are + Subject + verb-ing?

**Vietnamese Translation (Dịch Tiếng Việt):**
Thì Hiện Tại Tiếp Diễn (Hiện Tại Tiếp Diễn) được sử dụng để:
- Hành động đang xảy ra NGAY BÂY GIỜ
- Tình huống tạm thời
- Hành động đang diễn ra

Cấu trúc: Chủ ngữ + am/is/are + verb-ing

I am reading (Tôi đang đọc)
You are reading (Bạn đang đọc)
He/She/It is reading (Anh ấy/Cô ấy/Nó đang đọc)
We are reading (Chúng tôi đang đọc)
They are reading (Họ đang đọc)

Phủ định: Chủ ngữ + am/is/are + NOT + verb-ing
Câu hỏi: Am/Is/Are + Chủ ngữ + verb-ing?
            `,
            examples: [
              { 
                example: 'I am studying English right now.', 
                explanation: 'Action in progress now (Hành động đang diễn ra ngay bây giờ)',
                vietnamese: {
                  example: 'Tôi đang học tiếng Anh ngay bây giờ.',
                  explanation: 'Hành động đang diễn ra ngay bây giờ'
                }
              },
              { 
                example: 'She is playing tennis at the moment.', 
                explanation: 'Happening currently (Đang xảy ra hiện tại)',
                vietnamese: {
                  example: 'Cô ấy đang chơi tennis lúc này.',
                  explanation: 'Đang xảy ra hiện tại'
                }
              },
              { 
                example: 'They are not watching the movie.', 
                explanation: 'Negative form (Dạng phủ định)',
                vietnamese: {
                  example: 'Họ không đang xem phim.',
                  explanation: 'Dạng phủ định'
                }
              },
              { 
                example: 'Is he sleeping?', 
                explanation: 'Question form (Dạng câu hỏi)',
                vietnamese: {
                  example: 'Anh ấy có đang ngủ không?',
                  explanation: 'Dạng câu hỏi'
                }
              },
            ],
          },
          {
            lessonId: 'pc_002',
            title: 'Verb-ing Forms & Spelling Rules (Dạng Verb-ing & Quy Tắc Chính Tả)',
            duration: '10 mins',
            content: `
**English:**
Spelling rules for -ing:

1. Regular: Add -ing
   play → playing, read → reading

2. Verb ends in -e: Remove -e, add -ing
   dance → dancing, write → writing

3. Verb ends in consonant + vowel + consonant (CVC):
   Double the consonant, add -ing
   run → running, sit → sitting
   Exception: Single syllable only if stressed

4. Verb ends in -ie: Change to -ying
   lie → lying, die → dying

**Vietnamese Translation (Dịch Tiếng Việt):**
Quy tắc chính tả cho -ing:

1. Thông thường: Thêm -ing
   play → playing, read → reading

2. Kết thúc bằng -e: Bỏ -e, thêm -ing
   dance → dancing, write → writing

3. Kết thúc bằng phụ âm + nguyên âm + phụ âm (CVC):
   Nhân đôi phụ âm cuối, thêm -ing
   run → running, sit → sitting
   Ngoại lệ: Chỉ âm tiết đơn nếu nhấn mạnh

4. Kết thúc bằng -ie: Đổi thành -ying
   lie → lying, die → dying
            `,
            examples: [
              { 
                example: 'run → running', 
                explanation: 'Double consonant rule (CVC) (Quy tắc nhân đôi phụ âm (CVC))',
                vietnamese: {
                  example: 'run → running',
                  explanation: 'Quy tắc nhân đôi phụ âm (CVC)'
                }
              },
              { 
                example: 'make → making', 
                explanation: 'Remove silent e (Bỏ e câm)',
                vietnamese: {
                  example: 'make → making',
                  explanation: 'Bỏ e câm'
                }
              },
              { 
                example: 'work → working', 
                explanation: 'No doubling needed (Không cần nhân đôi)',
                vietnamese: {
                  example: 'work → working',
                  explanation: 'Không cần nhân đôi'
                }
              },
              { 
                example: 'swim → swimming', 
                explanation: 'Double m rule (Quy tắc nhân đôi m)',
                vietnamese: {
                  example: 'swim → swimming',
                  explanation: 'Quy tắc nhân đôi m'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pc_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'She _____ TV right now. (Cô ấy _____ TV ngay bây giờ.)',
            options: [
              { text: 'is watching', isCorrect: true, explanation: 'Correct present continuous form (Dạng thì hiện tại tiếp diễn đúng)' },
              { text: 'watches', isCorrect: false, explanation: 'This is simple present (Đây là thì hiện tại đơn)' },
              { text: 'is watch', isCorrect: false, explanation: 'Missing -ing (Thiếu -ing)' },
              { text: 'are watching', isCorrect: false, explanation: 'Wrong form of be (Dạng be sai)' },
            ],
          },
          {
            exerciseId: 'pc_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'They are _____ (swim) in the pool. (Họ đang _____ (bơi) trong hồ bơi.)',
            correctAnswer: 'swimming',
            hints: ['Remember the CVC rule (Nhớ quy tắc CVC)', 'Double the m (Nhân đôi m)'],
            explanation: 'swim → swimming (double the final consonant before adding -ing) (swim → swimming (nhân đôi phụ âm cuối trước khi thêm -ing))',
          },
        ],
        vocabulary: [
          { 
            word: 'temporary', 
            meaning: 'Lasting for a short time (Kéo dài trong thời gian ngắn)', 
            example: 'This is a temporary job. (Đây là công việc tạm thời.)' 
          },
          { 
            word: 'progress', 
            meaning: 'Movement towards completion (Sự tiến bộ hướng tới hoàn thành)', 
            example: 'Work in progress. (Công việc đang tiến hành.)' 
          },
        ],
      },

// Topic 3: Past Simple - Complete Definition
      pastSimple: {
        id: 'past_simple',
        title: 'Past Simple Tense (Thì Quá Khứ Đơn)',
        difficulty: 'Beginner',
        icon: '⏳',
        description: 'Talk about completed past actions (Nói về hành động quá khứ đã hoàn thành)',
        lessons: [
          {
            lessonId: 'ps_past_001',
            title: 'Introduction to Past Simple (Giới thiệu Thì Quá Khứ Đơn)',
            duration: '9 mins',
            content: `
**English:**
Used for:
- Completed actions in the past
- Series of past events
- Past facts and habits

Regular verbs: Base verb + -ed
I played, she worked, they studied

Irregular verbs: Must be memorized
go → went, eat → ate, see → saw, buy → bought

Form:
Affirmative: Subject + verb-ed (or irregular)
Negative: Subject + did + not + base verb
Question: Did + Subject + base verb?

**Vietnamese Translation (Dịch Tiếng Việt):**
Sử dụng cho:
- Hành động quá khứ đã hoàn thành
- Chuỗi sự kiện quá khứ
- Sự thật và thói quen quá khứ

Động từ thông thường: Động từ nguyên thể + -ed
I played (Tôi chơi), she worked (Cô ấy làm việc), they studied (Họ học)

Động từ bất quy tắc: Phải học thuộc
go → went, eat → ate, see → saw, buy → bought

Cấu trúc:
Khẳng định: Chủ ngữ + verb-ed (hoặc bất quy tắc)
Phủ định: Chủ ngữ + did + not + động từ nguyên thể
Câu hỏi: Did + Chủ ngữ + động từ nguyên thể?
            `,
            examples: [
              { 
                example: 'I played football yesterday.', 
                explanation: 'Regular past simple (Thì quá khứ đơn thông thường)',
                vietnamese: {
                  example: 'Tôi chơi bóng đá hôm qua.',
                  explanation: 'Thì quá khứ đơn thông thường'
                }
              },
              { 
                example: 'She went to Paris last month.', 
                explanation: 'Irregular verb (Động từ bất quy tắc)',
                vietnamese: {
                  example: 'Cô ấy đi Paris tháng trước.',
                  explanation: 'Động từ bất quy tắc'
                }
              },
              { 
                example: 'They did not come to the party.', 
                explanation: 'Negative past (Quá khứ phủ định)',
                vietnamese: {
                  example: 'Họ không đến bữa tiệc.',
                  explanation: 'Quá khứ phủ định'
                }
              },
              { 
                example: 'Did you see the movie?', 
                explanation: 'Question form (Dạng câu hỏi)',
                vietnamese: {
                  example: 'Bạn có xem bộ phim không?',
                  explanation: 'Dạng câu hỏi'
                }
              },
            ],
          },
          {
            lessonId: 'ps_past_002',
            title: 'Past Simple - Regular Verbs & Spelling (Thì Quá Khứ Đơn - Động Từ Thường & Chính Tả)',
            duration: '10 mins',
            content: `
**English:**
Spelling rules for -ed:

1. Regular: Add -ed
   play → played, work → worked

2. Verb ends in -e: Add -d
   live → lived, dance → danced

3. Verb ends in consonant + y: Change y to i, add -ed
   study → studied, cry → cried

4. CVC (short vowel): Double consonant + ed
   stop → stopped (but exceptions apply)

Pronunciation: /t/, /d/, /ɪd/

**Vietnamese Translation (Dịch Tiếng Việt):**
Quy tắc chính tả cho -ed:

1. Thông thường: Thêm -ed
   play → played, work → worked

2. Kết thúc bằng -e: Thêm -d
   live → lived, dance → danced

3. Kết thúc bằng phụ âm + y: Đổi y thành i, thêm -ed
   study → studied, cry → cried

4. CVC (nguyên âm ngắn): Nhân đôi phụ âm + ed
   stop → stopped (có ngoại lệ)

Phát âm: /t/, /d/, /ɪd/
            `,
            examples: [
              { 
                example: 'We visited the museum.', 
                explanation: 'Regular -ed ending (Kết thúc -ed thông thường)',
                vietnamese: {
                  example: 'Chúng tôi thăm bảo tàng.',
                  explanation: 'Kết thúc -ed thông thường'
                }
              },
              { 
                example: 'He stopped the car.', 
                explanation: 'Double consonant (Nhân đôi phụ âm)',
                vietnamese: {
                  example: 'Anh ấy dừng xe.',
                  explanation: 'Nhân đôi phụ âm'
                }
              },
              { 
                example: 'She tried the food.', 
                explanation: 'y to i rule (Quy tắc y thành i)',
                vietnamese: {
                  example: 'Cô ấy thử món ăn.',
                  explanation: 'Quy tắc y thành i'
                }
              },
              { 
                example: 'They lived in Hanoi.', 
                explanation: '-e to -d (Quy tắc -e thành -d)',
                vietnamese: {
                  example: 'Họ sống ở Hà Nội.',
                  explanation: '-e thành -d'
                }
              },
            ],
          },
          {
            lessonId: 'ps_past_003',
            title: 'Past Simple - Negative & Questions (Thì Quá Khứ Đơn - Phủ Định & Câu Hỏi)',
            duration: '9 mins',
            content: `
**English:**
Negative: didn't + base verb
I didn't go. She didn't eat.

Questions: Did + subject + base verb?
Did you play? Did he work?

Short answers:
Yes, I did. / No, I didn't.
Yes, she did. / No, she didn't.

Wh-questions: What did you do? Where did they go?

**Vietnamese Translation (Dịch Tiếng Việt):**
Phủ định: didn't + động từ nguyên thể
I didn't go (Tôi không đi). She didn't eat (Cô ấy không ăn).

Câu hỏi: Did + chủ ngữ + động từ nguyên thể?
Did you play? (Bạn có chơi không?) Did he work? (Anh ấy có làm việc không?)

Trả lời ngắn:
Yes, I did. / No, I didn't. (Có, tôi đã. / Không, tôi chưa.)
Yes, she did. / No, she didn't. (Có, cô ấy đã. / Không, cô ấy chưa.)

Câu hỏi Wh: What did you do? (Bạn đã làm gì?) Where did they go? (Họ đã đi đâu?)
            `,
            examples: [
              { 
                example: 'We didn\'t visit the zoo.', 
                explanation: 'Plural negative (Phủ định số nhiều)',
                vietnamese: {
                  example: 'Chúng tôi không thăm sở thú.',
                  explanation: 'Phủ định số nhiều'
                }
              },
              { 
                example: 'Did she call you?', 
                explanation: 'Yes/No question (Câu hỏi Yes/No)',
                vietnamese: {
                  example: 'Cô ấy có gọi bạn không?',
                  explanation: 'Câu hỏi Yes/No'
                }
              },
              { 
                example: 'What did you eat for lunch?', 
                explanation: 'Wh-question (Câu hỏi Wh)',
                vietnamese: {
                  example: 'Bạn đã ăn gì cho bữa trưa?',
                  explanation: 'Câu hỏi Wh'
                }
              },
              { 
                example: 'No, he didn\'t finish the book.', 
                explanation: 'Short negative answer (Trả lời phủ định ngắn)',
                vietnamese: {
                  example: 'Không, anh ấy không đọc xong cuốn sách.',
                  explanation: 'Trả lời phủ định ngắn'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'ps_past_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'Last weekend, I _____ to the beach. (Cuối tuần trước, tôi _____ đến bãi biển.)',
            options: [
              { text: 'went', isCorrect: true, explanation: 'Irregular past of go (Quá khứ bất quy tắc của go)' },
              { text: 'go', isCorrect: false, explanation: 'This is present tense (Đây là thì hiện tại)' },
              { text: 'going', isCorrect: false, explanation: 'This is present continuous (Đây là thì hiện tại tiếp diễn)' },
              { text: 'gone', isCorrect: false, explanation: 'This is past participle (Đây là phân từ quá khứ)' },
            ],
          },
          {
            exerciseId: 'ps_past_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'She _____ (study) English last year. (Cô ấy _____ (học) tiếng Anh năm ngoái.)',
            correctAnswer: 'studied',
            hints: ['Change y to i for consonant + y (Đổi y thành i cho phụ âm + y)', 'Add -ed (Thêm -ed)'],
            explanation: 'study → studied (consonant + y rule) (study → studied (quy tắc phụ âm + y))',
          },
          {
            exerciseId: 'ps_past_ex_003',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: '_____ you enjoy the party? (Bạn _____ thích bữa tiệc không?)',
            options: [
              { text: 'Did', isCorrect: true, explanation: 'Question form with did (Dạng câu hỏi với did)' },
              { text: 'Do', isCorrect: false, explanation: 'This is present tense (Đây là thì hiện tại)' },
              { text: 'Does', isCorrect: false, explanation: 'Used for third person present (Dùng cho ngôi thứ ba hiện tại)' },
              { text: 'Are', isCorrect: false, explanation: 'Wrong auxiliary (Trợ động từ sai)' },
            ],
          },
          {
            exerciseId: 'ps_past_ex_004',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'They _____ (not/visit) the museum yesterday. (Họ _____ (không thăm) bảo tàng hôm qua.)',
            correctAnswer: 'didn\'t visit',
            hints: ['Use didn\'t for negative (Sử dụng didn\'t cho phủ định)', 'Base verb after did (Động từ nguyên thể sau did)'],
            explanation: 'Negative form: didn\'t + base verb (Dạng phủ định: didn\'t + động từ nguyên thể)',
          },
          {
            exerciseId: 'ps_past_ex_005',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'He _____ the book before the class started. (Anh ấy _____ cuốn sách trước khi lớp học bắt đầu.)',
            options: [
              { text: 'read', isCorrect: true, explanation: 'Irregular past of read (Quá khứ bất quy tắc của read)' },
              { text: 'reads', isCorrect: false, explanation: 'Present tense (Thì hiện tại)' },
              { text: 'reading', isCorrect: false, explanation: 'Present continuous (Thì hiện tại tiếp diễn)' },
              { text: 'had read', isCorrect: false, explanation: 'Past perfect, more advanced (Quá khứ hoàn thành, nâng cao hơn)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'completed', 
            meaning: 'Finished (Hoàn thành)', 
            example: 'The project is completed. (Dự án đã hoàn thành.)' 
          },
          { 
            word: 'yesterday', 
            meaning: 'The day before today (Ngày hôm qua)', 
            example: 'I saw him yesterday. (Tôi thấy anh ấy hôm qua.)' 
          },
          { 
            word: 'event', 
            meaning: 'Something that happens (Sự kiện xảy ra)', 
            example: 'It was a happy event. (Đó là một sự kiện vui vẻ.)' 
          },
          { 
            word: 'habit', 
            meaning: 'Regular behavior in the past (Hành vi thường xuyên trong quá khứ)', 
            example: 'She had a reading habit as a child. (Cô ấy có thói quen đọc sách khi còn nhỏ.)' 
          },
        ],
      },

      // Topic 4: Articles (a/an/the)
      articles: {
        id: 'articles',
        title: 'Articles: A, An, The (Mạo Từ: A, An, The)',
        difficulty: 'Beginner',
        icon: '📝',
        description: 'Learn definite and indefinite articles (Học mạo từ xác định và không xác định)',
        lessons: [
          {
            lessonId: 'art_001',
            title: 'Indefinite Articles: A & An (Mạo Từ Không Xác Định: A & An)',
            duration: '8 mins',
            content: `
**English:**
Indefinite articles (a/an) are used for:
- First mention of a singular countable noun
- General, non-specific things
- Jobs: I am a teacher.

A before consonant sound: a book, a university
An before vowel sound: an apple, an hour

No article for plural or uncountable: I like apples. Water is important.

**Vietnamese Translation (Dịch Tiếng Việt):**
Mạo từ không xác định (a/an) dùng cho:
- Lần đề cập đầu tiên đến danh từ đếm được số ít
- Những thứ chung chung, không cụ thể
- Nghề nghiệp: I am a teacher. (Tôi là một giáo viên.)

A trước âm phụ âm: a book (một cuốn sách), a university (một trường đại học)
An trước âm nguyên âm: an apple (một quả táo), an hour (một giờ)

Không dùng mạo từ cho số nhiều hoặc không đếm được: I like apples. (Tôi thích táo.) Water is important. (Nước rất quan trọng.)
            `,
            examples: [
              { 
                example: 'I saw a cat in the garden.', 
                explanation: 'First mention (Đề cập lần đầu)',
                vietnamese: {
                  example: 'Tôi thấy một con mèo trong vườn.',
                  explanation: 'Đề cập lần đầu'
                }
              },
              { 
                example: 'She is an engineer.', 
                explanation: 'Job with vowel sound (Nghề nghiệp với âm nguyên âm)',
                vietnamese: {
                  example: 'Cô ấy là một kỹ sư.',
                  explanation: 'Nghề nghiệp với âm nguyên âm'
                }
              },
              { 
                example: 'He wants a car.', 
                explanation: 'Consonant sound (Âm phụ âm)',
                vietnamese: {
                  example: 'Anh ấy muốn một chiếc xe hơi.',
                  explanation: 'Âm phụ âm'
                }
              },
              { 
                example: 'I eat an orange every day.', 
                explanation: 'Vowel sound (Âm nguyên âm)',
                vietnamese: {
                  example: 'Tôi ăn một quả cam mỗi ngày.',
                  explanation: 'Âm nguyên âm'
                }
              },
            ],
          },
          {
            lessonId: 'art_002',
            title: 'Definite Article: The (Mạo Từ Xác Định: The)',
            duration: '9 mins',
            content: `
**English:**
Definite article (the) is used for:
- Specific things both speaker and listener know
- Second mention: I saw a cat. The cat was black.
- Unique things: the sun, the moon
- Superlatives: the best book
- Geographical names: the Pacific Ocean

No the for: general plurals, uncountables, proper names (usually)

**Vietnamese Translation (Dịch Tiếng Việt):**
Mạo từ xác định (the) dùng cho:
- Những thứ cụ thể mà người nói và nghe đều biết
- Đề cập lần thứ hai: I saw a cat. The cat was black. (Tôi thấy một con mèo. Con mèo đó màu đen.)
- Những thứ duy nhất: the sun (mặt trời), the moon (mặt trăng)
- Tính từ so sánh nhất: the best book (cuốn sách hay nhất)
- Tên địa lý: the Pacific Ocean (Thái Bình Dương)

Không dùng the cho: số nhiều chung chung, không đếm được, tên riêng (thường)
            `,
            examples: [
              { 
                example: 'The book on the table is mine.', 
                explanation: 'Specific book (Cuốn sách cụ thể)',
                vietnamese: {
                  example: 'Cuốn sách trên bàn là của tôi.',
                  explanation: 'Cuốn sách cụ thể'
                }
              },
              { 
                example: 'Pass me the pen.', 
                explanation: 'Known object (Vật đã biết)',
                vietnamese: {
                  example: 'Đưa tôi cây bút.',
                  explanation: 'Vật đã biết'
                }
              },
              { 
                example: 'The tallest building in the world.', 
                explanation: 'Superlative (So sánh nhất)',
                vietnamese: {
                  example: 'Tòa nhà cao nhất thế giới.',
                  explanation: 'So sánh nhất'
                }
              },
              { 
                example: 'We visited the museum yesterday.', 
                explanation: 'Specific place (Nơi cụ thể)',
                vietnamese: {
                  example: 'Chúng tôi thăm bảo tàng hôm qua.',
                  explanation: 'Nơi cụ thể'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'art_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'I need _____ apple. (Tôi cần _____ quả táo.)',
            options: [
              { text: 'an', isCorrect: true, explanation: 'Vowel sound (Âm nguyên âm)' },
              { text: 'a', isCorrect: false, explanation: 'Consonant sound only (Chỉ âm phụ âm)' },
              { text: 'the', isCorrect: false, explanation: 'Not specific (Không cụ thể)' },
              { text: '-', isCorrect: false, explanation: 'For plurals, not singular (Cho số nhiều, không phải số ít)' },
            ],
          },
          {
            exerciseId: 'art_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: '_____ sun is very hot today. (_____ mặt trời rất nóng hôm nay.)',
            correctAnswer: 'The',
            hints: ['Unique thing (Thứ duy nhất)', 'Definite article (Mạo từ xác định)'],
            explanation: 'The for unique items like the sun (The cho những thứ duy nhất như mặt trời)',
          },
          {
            exerciseId: 'art_ex_003',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'She is _____ doctor. (Cô ấy là _____ bác sĩ.)',
            options: [
              { text: 'a', isCorrect: true, explanation: 'Job with consonant sound (Nghề nghiệp với âm phụ âm)' },
              { text: 'an', isCorrect: false, explanation: 'Vowel sound required (Cần âm nguyên âm)' },
              { text: 'the', isCorrect: false, explanation: 'Not specific (Không cụ thể)' },
              { text: '-', isCorrect: false, explanation: 'Articles needed for jobs (Cần mạo từ cho nghề nghiệp)' },
            ],
          },
          {
            exerciseId: 'art_ex_004',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: '_____ dogs are loyal animals. (_____ chó là động vật trung thành.)',
            correctAnswer: '-',
            hints: ['General plural (Số nhiều chung chung)', 'No article (Không dùng mạo từ)'],
            explanation: 'No article for general plurals (Không dùng mạo từ cho số nhiều chung chung)',
          },
        ],
        vocabulary: [
          { 
            word: 'countable', 
            meaning: 'Can be counted (Có thể đếm được)', 
            example: 'Apples are countable. (Táo có thể đếm được.)' 
          },
          { 
            word: 'uncountable', 
            meaning: 'Cannot be counted (Không thể đếm được)', 
            example: 'Water is uncountable. (Nước không thể đếm được.)' 
          },
          { 
            word: 'specific', 
            meaning: 'Particular or definite (Cụ thể hoặc xác định)', 
            example: 'The specific book I want. (Cuốn sách cụ thể tôi muốn.)' 
          },
          { 
            word: 'general', 
            meaning: 'Not specific (Không cụ thể)', 
            example: 'In general, cats like milk. (Nói chung, mèo thích sữa.)' 
          },
        ],
      },
    },
  },
  intermediate: {
    level: 'Intermediate',
    description: 'Intermediate grammar topics for building confidence (Các chủ đề ngữ pháp trung cấp để xây dựng sự tự tin)',
    topics: {
      // Topic 1: Present Perfect
      presentPerfect: {
        id: 'present_perfect',
        title: 'Present Perfect Tense (Thì Hiện Tại Hoàn Thành)',
        difficulty: 'Intermediate',
        icon: '✅',
        description: 'Connect past actions to the present (Kết nối hành động quá khứ với hiện tại)',
        lessons: [
          {
            lessonId: 'pp_001',
            title: 'Introduction to Present Perfect (Giới thiệu Thì Hiện Tại Hoàn Thành)',
            duration: '10 mins',
            content: `
**English:**
The Present Perfect is used for:
- Experiences in life (ever/never)
- Actions completed at an unspecified time
- Actions with present results
- With "for" (duration) and "since" (starting point)

Form: Subject + have/has + past participle
I have eaten. She has gone.

Negative: haven't/hasn't + past participle
Question: Have/Has + Subject + past participle?

**Vietnamese Translation (Dịch Tiếng Việt):**
Thì Hiện Tại Hoàn Thành dùng cho:
- Kinh nghiệm trong đời (ever/never)
- Hành động hoàn thành ở thời điểm không xác định
- Hành động có kết quả hiện tại
- Với "for" (thời gian kéo dài) và "since" (điểm bắt đầu)

Cấu trúc: Chủ ngữ + have/has + past participle
I have eaten (Tôi đã ăn). She has gone (Cô ấy đã đi).

Phủ định: haven't/hasn't + past participle
Câu hỏi: Have/Has + Chủ ngữ + past participle?
            `,
            examples: [
              { 
                example: 'I have visited Paris three times.', 
                explanation: 'Life experience (Kinh nghiệm cuộc sống)',
                vietnamese: {
                  example: 'Tôi đã thăm Paris ba lần.',
                  explanation: 'Kinh nghiệm cuộc sống'
                }
              },
              { 
                example: 'She has lost her keys.', 
                explanation: 'Present result (Kết quả hiện tại)',
                vietnamese: {
                  example: 'Cô ấy đã mất chìa khóa.',
                  explanation: 'Kết quả hiện tại'
                }
              },
              { 
                example: 'We have lived here since 2010.', 
                explanation: 'With "since" (Với "since")',
                vietnamese: {
                  example: 'Chúng tôi đã sống ở đây từ năm 2010.',
                  explanation: 'Với "since"'
                }
              },
              { 
                example: 'They haven\'t finished the project yet.', 
                explanation: 'Negative with "yet" (Phủ định với "yet")',
                vietnamese: {
                  example: 'Họ chưa hoàn thành dự án.',
                  explanation: 'Phủ định với "yet"'
                }
              },
            ],
          },
          {
            lessonId: 'pp_002',
            title: 'Present Perfect vs. Past Simple (Hiện Tại Hoàn Thành so với Quá Khứ Đơn)',
            duration: '12 mins',
            content: `
**English:**
Present Perfect: Unspecified time, connection to now
I have seen that movie. (Sometime in life, relevant now)

Past Simple: Specific time in the past
I saw that movie yesterday. (Finished, no current link)

Time expressions:
Present Perfect: ever, never, just, already, yet, for, since
Past Simple: yesterday, last week, in 2020, ago

**Vietnamese Translation (Dịch Tiếng Việt):**
Hiện Tại Hoàn Thành: Thời điểm không xác định, kết nối với hiện tại
I have seen that movie. (Một lúc nào đó trong đời, liên quan đến bây giờ)

Quá Khứ Đơn: Thời điểm cụ thể trong quá khứ
I saw that movie yesterday. (Đã xong, không liên kết hiện tại)

Biểu thức thời gian:
Hiện Tại Hoàn Thành: ever, never, just, already, yet, for, since
Quá Khứ Đơn: yesterday, last week, in 2020, ago
            `,
            examples: [
              { 
                example: 'Have you ever been to Japan?', 
                explanation: 'Experience question (Câu hỏi kinh nghiệm)',
                vietnamese: {
                  example: 'Bạn đã từng đến Nhật Bản chưa?',
                  explanation: 'Câu hỏi kinh nghiệm'
                }
              },
              { 
                example: 'I just ate lunch.', 
                explanation: 'Recent action (Hành động gần đây)',
                vietnamese: {
                  example: 'Tôi vừa ăn trưa.',
                  explanation: 'Hành động gần đây'
                }
              },
              { 
                example: 'He went to the store an hour ago.', 
                explanation: 'Specific past time (Thời điểm quá khứ cụ thể)',
                vietnamese: {
                  example: 'Anh ấy đến cửa hàng một giờ trước.',
                  explanation: 'Thời điểm quá khứ cụ thể'
                }
              },
              { 
                example: 'She has worked here for five years.', 
                explanation: 'Duration to present (Thời gian kéo dài đến hiện tại)',
                vietnamese: {
                  example: 'Cô ấy đã làm việc ở đây năm năm.',
                  explanation: 'Thời gian kéo dài đến hiện tại'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pp_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'I _____ this book before. (Tôi _____ cuốn sách này trước đây.)',
            options: [
              { text: 'have read', isCorrect: true, explanation: 'Present perfect for unspecified time (Hiện tại hoàn thành cho thời điểm không xác định)' },
              { text: 'read', isCorrect: false, explanation: 'Past simple needs specific time (Quá khứ đơn cần thời điểm cụ thể)' },
              { text: 'am reading', isCorrect: false, explanation: 'Present continuous for now (Hiện tại tiếp diễn cho hiện tại)' },
              { text: 'will read', isCorrect: false, explanation: 'Future tense (Thì tương lai)' },
            ],
          },
          {
            exerciseId: 'pp_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'She _____ (not/see) the movie yet. (Cô ấy _____ (chưa xem) bộ phim.)',
            correctAnswer: 'hasn\'t seen',
            hints: ['Use has for third person (Dùng has cho ngôi thứ ba)', 'Past participle of see is seen (Phân từ quá khứ của see là seen)'],
            explanation: 'Negative present perfect: hasn\'t + past participle (Phủ định hiện tại hoàn thành: hasn\'t + phân từ quá khứ)',
          },
          {
            exerciseId: 'pp_ex_003',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'We _____ in this city since 2015. (Chúng tôi _____ ở thành phố này từ năm 2015.)',
            options: [
              { text: 'have lived', isCorrect: true, explanation: 'With "since" for duration to now (Với "since" cho thời gian kéo dài đến hiện tại)' },
              { text: 'lived', isCorrect: false, explanation: 'Past simple for completed period (Quá khứ đơn cho khoảng thời gian hoàn thành)' },
              { text: 'are living', isCorrect: false, explanation: 'Present continuous without duration (Hiện tại tiếp diễn không có thời gian kéo dài)' },
              { text: 'will live', isCorrect: false, explanation: 'Future intention (Ý định tương lai)' },
            ],
          },
          {
            exerciseId: 'pp_ex_004',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: '_____ you ever _____ (try) sushi? (Bạn _____ từng _____ (thử) sushi chưa?)',
            correctAnswer: 'Have ... tried',
            hints: ['Question form: Have + subject + past participle (Dạng câu hỏi: Have + chủ ngữ + phân từ quá khứ)', 'Try → tried (Try → tried)'],
            explanation: 'Present perfect question for experiences (Câu hỏi hiện tại hoàn thành cho kinh nghiệm)',
          },
        ],
        vocabulary: [
          { 
            word: 'experience', 
            meaning: 'Something that happens to you (Điều gì đó xảy ra với bạn)', 
            example: 'Traveling is a great experience. (Du lịch là một trải nghiệm tuyệt vời.)' 
          },
          { 
            word: 'duration', 
            meaning: 'Length of time (Độ dài thời gian)', 
            example: 'The duration of the flight is 10 hours. (Thời lượng chuyến bay là 10 giờ.)' 
          },
          { 
            word: 'unspecified', 
            meaning: 'Not clearly stated (Không được nêu rõ)', 
            example: 'The time is unspecified. (Thời gian không được chỉ định.)' 
          },
          { 
            word: 'participle', 
            meaning: 'Verb form used in tenses (Dạng động từ dùng trong thì)', 
            example: 'Past participle for perfect tenses. (Phân từ quá khứ cho thì hoàn thành.)' 
          },
        ],
      },

      // Topic 2: Past Continuous
      pastContinuous: {
        id: 'past_continuous',
        title: 'Past Continuous Tense (Thì Quá Khứ Tiếp Diễn)',
        difficulty: 'Intermediate',
        icon: '⏳🔄',
        description: 'Describe ongoing past actions (Mô tả hành động đang diễn ra trong quá khứ)',
        lessons: [
          {
            lessonId: 'pcont_001',
            title: 'Introduction to Past Continuous (Giới thiệu Thì Quá Khứ Tiếp Diễn)',
            duration: '10 mins',
            content: `
**English:**
Used for:
- Actions in progress at a specific past time
- Interrupted actions (with Past Simple)
- Parallel past actions
- Background in stories

Form: Subject + was/were + verb-ing
I was reading at 8 PM. They were playing.

Negative: wasn't/weren't + verb-ing
Question: Was/Were + Subject + verb-ing?

**Vietnamese Translation (Dịch Tiếng Việt):**
Dùng cho:
- Hành động đang diễn ra tại thời điểm quá khứ cụ thể
- Hành động bị gián đoạn (với Quá Khứ Đơn)
- Hành động song song trong quá khứ
- Nền tảng trong câu chuyện

Cấu trúc: Chủ ngữ + was/were + verb-ing
I was reading at 8 PM (Tôi đang đọc lúc 8 giờ tối). They were playing (Họ đang chơi).

Phủ định: wasn't/weren't + verb-ing
Câu hỏi: Was/Were + Chủ ngữ + verb-ing?
            `,
            examples: [
              { 
                example: 'I was watching TV when you called.', 
                explanation: 'Interrupted action (Hành động bị gián đoạn)',
                vietnamese: {
                  example: 'Tôi đang xem TV khi bạn gọi.',
                  explanation: 'Hành động bị gián đoạn'
                }
              },
              { 
                example: 'They were studying at midnight.', 
                explanation: 'Specific past time (Thời điểm quá khứ cụ thể)',
                vietnamese: {
                  example: 'Họ đang học lúc nửa đêm.',
                  explanation: 'Thời điểm quá khứ cụ thể'
                }
              },
              { 
                example: 'While she was cooking, he was reading.', 
                explanation: 'Parallel actions (Hành động song song)',
                vietnamese: {
                  example: 'Trong khi cô ấy đang nấu ăn, anh ấy đang đọc.',
                  explanation: 'Hành động song song'
                }
              },
              { 
                example: 'Was it raining yesterday?', 
                explanation: 'Question form (Dạng câu hỏi)',
                vietnamese: {
                  example: 'Trời có mưa hôm qua không?',
                  explanation: 'Dạng câu hỏi'
                }
              },
            ],
          },
          {
            lessonId: 'pcont_002',
            title: 'Past Continuous vs. Past Simple (Quá Khứ Tiếp Diễn so với Quá Khứ Đơn)',
            duration: '11 mins',
            content: `
**English:**
Past Continuous: Ongoing action
I was eating when the phone rang. (Background)

Past Simple: Completed/short action
I ate dinner at 7 PM. (Finished)

Interrupted: Past Continuous (longer) + Past Simple (shorter/interrupter)
She was walking home when it started to rain.

**Vietnamese Translation (Dịch Tiếng Việt):**
Quá Khứ Tiếp Diễn: Hành động đang diễn ra
I was eating when the phone rang. (Nền tảng)

Quá Khứ Đơn: Hành động hoàn thành/ngắn
I ate dinner at 7 PM. (Đã xong)

Bị gián đoạn: Quá Khứ Tiếp Diễn (dài hơn) + Quá Khứ Đơn (ngắn/gián đoạn)
She was walking home when it started to rain. (Cô ấy đang đi bộ về nhà khi trời bắt đầu mưa.)
            `,
            examples: [
              { 
                example: 'He was driving when the accident happened.', 
                explanation: 'Interrupted by Past Simple (Bị gián đoạn bởi Quá Khứ Đơn)',
                vietnamese: {
                  example: 'Anh ấy đang lái xe khi tai nạn xảy ra.',
                  explanation: 'Bị gián đoạn bởi Quá Khứ Đơn'
                }
              },
              { 
                example: 'We were having fun all evening.', 
                explanation: 'Ongoing past action (Hành động đang diễn ra trong quá khứ)',
                vietnamese: {
                  example: 'Chúng tôi đang vui vẻ suốt buổi tối.',
                  explanation: 'Hành động đang diễn ra trong quá khứ'
                }
              },
              { 
                example: 'The children were playing while the adults were talking.', 
                explanation: 'Parallel with "while" (Song song với "while")',
                vietnamese: {
                  example: 'Trẻ em đang chơi trong khi người lớn đang nói chuyện.',
                  explanation: 'Song song với "while"'
                }
              },
              { 
                example: 'I dropped my phone while I was running.', 
                explanation: 'Cause of interruption (Nguyên nhân gián đoạn)',
                vietnamese: {
                  example: 'Tôi làm rơi điện thoại trong khi đang chạy.',
                  explanation: 'Nguyên nhân gián đoạn'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pcont_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'At 5 PM yesterday, she _____ dinner. (Lúc 5 giờ chiều hôm qua, cô ấy _____ bữa tối.)',
            options: [
              { text: 'was cooking', isCorrect: true, explanation: 'Ongoing action at specific time (Hành động đang diễn ra tại thời điểm cụ thể)' },
              { text: 'cooked', isCorrect: false, explanation: 'Past simple for completed (Quá khứ đơn cho hoàn thành)' },
              { text: 'cooks', isCorrect: false, explanation: 'Present tense (Thì hiện tại)' },
              { text: 'has cooked', isCorrect: false, explanation: 'Present perfect (Hiện tại hoàn thành)' },
            ],
          },
          {
            exerciseId: 'pcont_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'They _____ (play) football when it started to rain. (Họ _____ (chơi) bóng đá khi trời bắt đầu mưa.)',
            correctAnswer: 'were playing',
            hints: ['Use were for plural (Dùng were cho số nhiều)', 'Verb-ing form (Dạng verb-ing)'],
            explanation: 'Past continuous for interrupted action (Quá khứ tiếp diễn cho hành động bị gián đoạn)',
          },
          {
            exerciseId: 'pcont_ex_003',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: '_____ you _____ (watch) TV last night? (Bạn _____ (xem) TV tối qua không?)',
            options: [
              { text: 'Were ... watching', isCorrect: true, explanation: 'Question form for ongoing past (Dạng câu hỏi cho hành động đang diễn ra quá khứ)' },
              { text: 'Did ... watch', isCorrect: false, explanation: 'Past simple for completed (Quá khứ đơn cho hoàn thành)' },
              { text: 'Have ... watched', isCorrect: false, explanation: 'Present perfect (Hiện tại hoàn thành)' },
              { text: 'Are ... watching', isCorrect: false, explanation: 'Present continuous (Hiện tại tiếp diễn)' },
            ],
          },
          {
            exerciseId: 'pcont_ex_004',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'While I _____ (work), my colleague _____ (call) me. (Trong khi tôi _____ (làm việc), đồng nghiệp _____ (gọi) tôi.)',
            correctAnswer: 'was working ... called',
            hints: ['Past continuous for longer action (Quá khứ tiếp diễn cho hành động dài)', 'Past simple for interruption (Quá khứ đơn cho gián đoạn)'],
            explanation: 'Combination: Past continuous + Past simple (Kết hợp: Quá khứ tiếp diễn + Quá khứ đơn)',
          },
        ],
        vocabulary: [
          { 
            word: 'ongoing', 
            meaning: 'Continuing without interruption (Tiếp tục không bị gián đoạn)', 
            example: 'An ongoing project. (Dự án đang diễn ra.)' 
          },
          { 
            word: 'interrupted', 
            meaning: 'Stopped suddenly (Bị dừng đột ngột)', 
            example: 'The meeting was interrupted. (Cuộc họp bị gián đoạn.)' 
          },
          { 
            word: 'parallel', 
            meaning: 'Happening at the same time (Xảy ra cùng lúc)', 
            example: 'Parallel lines never meet. (Đường thẳng song song không bao giờ gặp nhau.)' 
          },
          { 
            word: 'background', 
            meaning: 'Setting for an event (Bối cảnh cho sự kiện)', 
            example: 'Story background. (Bối cảnh câu chuyện.)' 
          },
        ],
      },

      // Topic 3: Future Forms (Will & Going To)
      futureForms: {
        id: 'future_forms',
        title: 'Future Forms: Will & Going To (Dạng Tương Lai: Will & Going To)',
        difficulty: 'Intermediate',
        icon: '🔮',
        description: 'Express future plans and predictions (Bày tỏ kế hoạch và dự đoán tương lai)',
        lessons: [
          {
            lessonId: 'ff_001',
            title: 'Introduction to Will (Giới thiệu Will)',
            duration: '9 mins',
            content: `
**English:**
Will is used for:
- Spontaneous decisions
- Predictions without evidence
- Offers, promises, threats
- Facts about the future

Form: Subject + will + base verb
I will call you. It will rain tomorrow.

Negative: won't + base verb
Question: Will + Subject + base verb?

Contractions: I'll, you'll, he'll, etc.

**Vietnamese Translation (Dịch Tiếng Việt):**
Will dùng cho:
- Quyết định tự phát
- Dự đoán không có bằng chứng
- Đề nghị, hứa hẹn, đe dọa
- Sự thật về tương lai

Cấu trúc: Chủ ngữ + will + động từ nguyên thể
I will call you (Tôi sẽ gọi bạn). It will rain tomorrow (Trời sẽ mưa ngày mai).

Phủ định: won't + động từ nguyên thể
Câu hỏi: Will + Chủ ngữ + động từ nguyên thể?

Rút gọn: I'll, you'll, he'll, v.v.
            `,
            examples: [
              { 
                example: 'I\'ll help you with that.', 
                explanation: 'Spontaneous offer (Đề nghị tự phát)',
                vietnamese: {
                  example: 'Tôi sẽ giúp bạn việc đó.',
                  explanation: 'Đề nghị tự phát'
                }
              },
              { 
                example: 'The meeting will start at 10 AM.', 
                explanation: 'Scheduled fact (Sự thật lịch trình)',
                vietnamese: {
                  example: 'Cuộc họp sẽ bắt đầu lúc 10 giờ sáng.',
                  explanation: 'Sự thật lịch trình'
                }
              },
              { 
                example: "She won't forget your birthday.", 
                explanation: 'Promise (Hứa hẹn)',
                vietnamese: {
                  example: 'Cô ấy sẽ không quên sinh nhật bạn.',
                  explanation: 'Hứa hẹn'
                }
              },
              { 
                example: 'Will you come to the party?', 
                explanation: 'Question (Câu hỏi)',
                vietnamese: {
                  example: 'Bạn sẽ đến bữa tiệc không?',
                  explanation: 'Câu hỏi'
                }
              },
            ],
          },
          {
            lessonId: 'ff_002',
            title: 'Going To for Plans & Predictions (Going To cho Kế Hoạch & Dự Đoán)',
            duration: '10 mins',
            content: `
**English:**
Going to is used for:
- Planned intentions (with evidence of preparation)
- Predictions based on present evidence
- Near future actions

Form: Subject + am/is/are + going to + base verb
I am going to study tonight. Look, it's going to rain!

Negative: am/is/are + not + going to + base verb
Question: Am/Is/Are + Subject + going to + base verb?

**Vietnamese Translation (Dịch Tiếng Việt):**
Going to dùng cho:
- Ý định đã lên kế hoạch (với bằng chứng chuẩn bị)
- Dự đoán dựa trên bằng chứng hiện tại
- Hành động tương lai gần

Cấu trúc: Chủ ngữ + am/is/are + going to + động từ nguyên thể
I am going to study tonight (Tôi sẽ học tối nay). Look, it's going to rain! (Nhìn kìa, trời sắp mưa!)

Phủ định: am/is/are + not + going to + động từ nguyên thể
Câu hỏi: Am/Is/Are + Chủ ngữ + going to + động từ nguyên thể?
            `,
            examples: [
              { 
                example: 'We are going to visit our grandparents this weekend.', 
                explanation: 'Planned intention (Ý định đã kế hoạch)',
                vietnamese: {
                  example: 'Chúng tôi sẽ thăm ông bà cuối tuần này.',
                  explanation: 'Ý định đã kế hoạch'
                }
              },
              { 
                example: 'He\'s going to fall if he doesn\'t slow down.', 
                explanation: 'Prediction with evidence (Dự đoán với bằng chứng)',
                vietnamese: {
                  example: 'Anh ấy sẽ ngã nếu không chậm lại.',
                  explanation: 'Dự đoán với bằng chứng'
                }
              },
              { 
                example: 'Are you going to buy a new car?', 
                explanation: 'Question about plans (Câu hỏi về kế hoạch)',
                vietnamese: {
                  example: 'Bạn có định mua xe mới không?',
                  explanation: 'Câu hỏi về kế hoạch'
                }
              },
              { 
                example: "She isn't going to attend the meeting.", 
                explanation: 'Negative plan (Kế hoạch phủ định)',
                vietnamese: {
                  example: 'Cô ấy sẽ không tham dự cuộc họp.',
                  explanation: 'Kế hoạch phủ định'
                }
              },
            ],
          },
          {
            lessonId: 'ff_003',
            title: 'Will vs. Going To (Will so với Going To)',
            duration: '11 mins',
            content: `
**English:**
Will: Spontaneous, general predictions
I'll make coffee. (Decision now)
It will snow this winter. (Opinion)

Going To: Planned, evidence-based
I'm going to make coffee. (Already decided)
Look at the clouds; it's going to snow. (Evidence)

Present Continuous for fixed plans: I'm meeting him at 5 PM.

**Vietnamese Translation (Dịch Tiếng Việt):**
Will: Tự phát, dự đoán chung
I'll make coffee. (Quyết định ngay bây giờ)
It will snow this winter. (Ý kiến)

Going To: Đã kế hoạch, dựa trên bằng chứng
I'm going to make coffee. (Đã quyết định trước)
Look at the clouds; it's going to snow. (Bằng chứng)

Hiện Tại Tiếp Diễn cho kế hoạch cố định: I'm meeting him at 5 PM. (Tôi gặp anh ấy lúc 5 giờ chiều.)
            `,
            examples: [
              { 
                example: "The phone is ringing. I'll get it.", 
                explanation: 'Spontaneous decision (Quyết định tự phát)',
                vietnamese: {
                  example: 'Điện thoại reo. Tôi sẽ nghe.',
                  explanation: 'Quyết định tự phát'
                }
              },
              { 
                example: "I think she'll win the race.", 
                explanation: 'General prediction (Dự đoán chung)',
                vietnamese: {
                  example: 'Tôi nghĩ cô ấy sẽ thắng cuộc đua.',
                  explanation: 'Dự đoán chung'
                }
              },
              { 
                example: "We're going to the cinema tonight.", 
                explanation: 'Fixed plan (Kế hoạch cố định)',
                vietnamese: {
                  example: 'Chúng tôi sẽ đi xem phim tối nay.',
                  explanation: 'Kế hoạch cố định'
                }
              },
              { 
                example: "Be careful; you're going to drop that.", 
                explanation: 'Evidence-based prediction (Dự đoán dựa trên bằng chứng)',
                vietnamese: {
                  example: 'Cẩn thận; bạn sắp làm rơi cái đó.',
                  explanation: 'Dự đoán dựa trên bằng chứng'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'ff_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'Look at those clouds! It _____ rain soon. (Nhìn đám mây kìa! Trời _____ mưa sớm thôi.)',
            options: [
              { text: 'is going to', isCorrect: true, explanation: 'Prediction with present evidence (Dự đoán với bằng chứng hiện tại)' },
              { text: 'will', isCorrect: false, explanation: 'General prediction, no evidence (Dự đoán chung, không bằng chứng)' },
              { text: 'going to', isCorrect: false, explanation: 'Needs form of be (Cần dạng của be)' },
              { text: 'rains', isCorrect: false, explanation: 'Present tense (Thì hiện tại)' },
            ],
          },
          {
            exerciseId: 'ff_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'I _____ (help) you with your homework. (Tôi _____ (giúp) bạn làm bài tập.)',
            correctAnswer: 'will help',
            hints: ['Spontaneous offer (Đề nghị tự phát)', 'Will + base verb (Will + động từ nguyên thể)'],
            explanation: 'Will for offers (Will cho đề nghị)',
          },
          {
            exerciseId: 'ff_ex_003',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'We _____ to Paris next summer. (Chúng tôi _____ đến Paris hè tới.)',
            options: [
              { text: 'are going', isCorrect: true, explanation: 'Planned future with present continuous (Tương lai kế hoạch với hiện tại tiếp diễn)' },
              { text: 'will go', isCorrect: false, explanation: 'Spontaneous, not planned (Tự phát, không kế hoạch)' },
              { text: 'go', isCorrect: false, explanation: 'Present tense (Thì hiện tại)' },
              { text: 'went', isCorrect: false, explanation: 'Past tense (Thì quá khứ)' },
            ],
          },
          {
            exerciseId: 'ff_ex_004',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: '_____ you _____ (finish) the report by tomorrow? (Bạn _____ (hoàn thành) báo cáo trước ngày mai không?)',
            correctAnswer: 'Will ... finish',
            hints: ['Question with will (Câu hỏi với will)', 'For predictions or promises (Cho dự đoán hoặc hứa hẹn)'],
            explanation: 'Will question form (Dạng câu hỏi will)',
          },
          {
            exerciseId: 'ff_ex_005',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'I promise I _____ (not/tell) anyone your secret. (Tôi hứa tôi _____ (không kể) bí mật của bạn với ai.)',
            options: [
              { text: 'won\'t tell', isCorrect: true, explanation: 'Promise with will negative (Hứa hẹn với will phủ định)' },
              { text: 'am not telling', isCorrect: false, explanation: 'Present continuous (Hiện tại tiếp diễn)' },
              { text: 'don\'t tell', isCorrect: false, explanation: 'Present simple (Hiện tại đơn)' },
              { text: 'won\'t telling', isCorrect: false, explanation: 'Wrong form (Dạng sai)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'prediction', 
            meaning: 'Statement about the future (Tuyên bố về tương lai)', 
            example: 'Weather prediction. (Dự báo thời tiết.)' 
          },
          { 
            word: 'intention', 
            meaning: 'Plan to do something (Kế hoạch làm gì đó)', 
            example: 'Good intentions. (Ý định tốt.)' 
          },
          { 
            word: 'spontaneous', 
            meaning: 'Done without planning (Làm mà không lập kế hoạch)', 
            example: 'Spontaneous trip. (Chuyến đi tự phát.)' 
          },
          { 
            word: 'evidence', 
            meaning: 'Proof or signs (Bằng chứng hoặc dấu hiệu)', 
            example: 'No evidence found. (Không tìm thấy bằng chứng.)' 
          },
        ],
      },

      // Topic 4: First Conditional
      firstConditional: {
        id: 'first_conditional',
        title: 'First Conditional (Câu Điều Kiện Loại 1)',
        difficulty: 'Intermediate',
        icon: '❄️',
        description: 'Real possibilities in the future (Khả năng thực tế trong tương lai)',
        lessons: [
          {
            lessonId: 'fc_001',
            title: 'Introduction to First Conditional (Giới thiệu Câu Điều Kiện Loại 1)',
            duration: '9 mins',
            content: `
**English:**
Used for real or likely situations in the future.
If + Present Simple, will + base verb
If it rains, we will stay home.

Can use other modals: may, might, can, etc.
If you study, you can pass the exam.

Order can be reversed: We will stay home if it rains.

**Vietnamese Translation (Dịch Tiếng Việt):**
Dùng cho tình huống thực tế hoặc có khả năng xảy ra trong tương lai.
If + Hiện Tại Đơn, will + động từ nguyên thể
If it rains, we will stay home. (Nếu trời mưa, chúng tôi sẽ ở nhà.)

Có thể dùng modal khác: may, might, can, v.v.
If you study, you can pass the exam. (Nếu bạn học, bạn có thể đỗ kỳ thi.)

Có thể đảo ngược: We will stay home if it rains. (Chúng tôi sẽ ở nhà nếu trời mưa.)
            `,
            examples: [
              { 
                example: 'If you heat water to 100°C, it boils.', 
                explanation: 'General truth (Sự thật chung)',
                vietnamese: {
                  example: 'Nếu bạn đun nước đến 100°C, nó sôi.',
                  explanation: 'Sự thật chung'
                }
              },
              { 
                example: 'If I see her, I will tell her.', 
                explanation: 'Future possibility (Khả năng tương lai)',
                vietnamese: {
                  example: 'Nếu tôi gặp cô ấy, tôi sẽ nói với cô ấy.',
                  explanation: 'Khả năng tương lai'
                }
              },
              { 
                example: 'We might go out if the weather improves.', 
                explanation: 'With modal "might" (Với modal "might")',
                vietnamese: {
                  example: 'Chúng tôi có thể ra ngoài nếu thời tiết tốt hơn.',
                  explanation: 'Với modal "might"'
                }
              },
              { 
                example: 'Call me if you need help.', 
                explanation: 'Reversed order (Đảo ngược thứ tự)',
                vietnamese: {
                  example: 'Gọi tôi nếu bạn cần giúp đỡ.',
                  explanation: 'Đảo ngược thứ tự'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'fc_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'If it _____ tomorrow, we will cancel the picnic. (Nếu trời _____ ngày mai, chúng tôi sẽ hủy picnic.)',
            options: [
              { text: 'rains', isCorrect: true, explanation: 'Present simple in if-clause (Hiện tại đơn trong mệnh đề if)' },
              { text: 'will rain', isCorrect: false, explanation: 'No will in if-clause for first conditional (Không dùng will trong mệnh đề if cho loại 1)' },
              { text: 'rained', isCorrect: false, explanation: 'Past tense for second conditional (Quá khứ cho loại 2)' },
              { text: 'is raining', isCorrect: false, explanation: 'Present continuous not standard here (Hiện tại tiếp diễn không chuẩn ở đây)' },
            ],
          },
          {
            exerciseId: 'fc_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'If you _____ (study) hard, you _____ (pass) the exam. (Nếu bạn _____ (học) chăm, bạn _____ (đỗ) kỳ thi.)',
            correctAnswer: 'study ... will pass',
            hints: ['Present simple in if (Hiện tại đơn trong if)', 'Will in main clause (Will trong mệnh đề chính)'],
            explanation: 'Standard first conditional structure (Cấu trúc câu điều kiện loại 1 chuẩn)',
          },
        ],
        vocabulary: [
          { 
            word: 'possibility', 
            meaning: 'Chance of happening (Khả năng xảy ra)', 
            example: 'High possibility of rain. (Khả năng mưa cao.)' 
          },
          { 
            word: 'likely', 
            meaning: 'Probably true (Có lẽ đúng)', 
            example: 'It\'s likely to happen. (Có lẽ sẽ xảy ra.)' 
          },
          { 
            word: 'clause', 
            meaning: 'Part of a sentence (Phần của câu)', 
            example: 'If-clause. (Mệnh đề if.)' 
          },
        ],
      },

      // Topic 5: Comparatives and Superlatives
      comparativesSuperlatives: {
        id: 'comparatives_superlatives',
        title: 'Comparatives and Superlatives (So Sánh Hơn và So Sánh Nhất)',
        difficulty: 'Intermediate',
        icon: '📊',
        description: 'Compare things and people (So sánh sự vật và con người)',
        lessons: [
          {
            lessonId: 'cs_001',
            title: 'Forming Comparatives (Hình Thành So Sánh Hơn)',
            duration: '10 mins',
            content: `
**English:**
Short adjectives (1 syllable): adj + -er + than
tall → taller than

Long adjectives (2+ syllables): more + adj + than
beautiful → more beautiful than

Irregular: good → better, bad → worse, far → farther/further

As...as for equality: as tall as

**Vietnamese Translation (Dịch Tiếng Việt):**
Tính từ ngắn (1 âm tiết): adj + -er + than
tall → taller than (cao hơn)

Tính từ dài (2+ âm tiết): more + adj + than
beautiful → more beautiful than (đẹp hơn)

Bất quy tắc: good → better (tốt hơn), bad → worse (tệ hơn), far → farther/further (xa hơn)

As...as cho bằng nhau: as tall as (cao bằng)
            `,
            examples: [
              { 
                example: 'This book is more interesting than that one.', 
                explanation: 'Long adjective (Tính từ dài)',
                vietnamese: {
                  example: 'Cuốn sách này thú vị hơn cuốn kia.',
                  explanation: 'Tính từ dài'
                }
              },
              { 
                example: 'She runs faster than me.', 
                explanation: 'Short adjective (Tính từ ngắn)',
                vietnamese: {
                  example: 'Cô ấy chạy nhanh hơn tôi.',
                  explanation: 'Tính từ ngắn'
                }
              },
              { 
                example: 'My phone is as good as yours.', 
                explanation: 'Equality (Bằng nhau)',
                vietnamese: {
                  example: 'Điện thoại của tôi tốt bằng của bạn.',
                  explanation: 'Bằng nhau'
                }
              },
              { 
                example: 'This test was worse than the last one.', 
                explanation: 'Irregular (Bất quy tắc)',
                vietnamese: {
                  example: 'Bài kiểm tra này tệ hơn lần trước.',
                  explanation: 'Bất quy tắc'
                }
              },
            ],
          },
          {
            lessonId: 'cs_002',
            title: 'Forming Superlatives (Hình Thành So Sánh Nhất)',
            duration: '10 mins',
            content: `
**English:**
Short adjectives: the + adj + -est
tall → the tallest

Long adjectives: the most + adj
beautiful → the most beautiful

Irregular: good → the best, bad → the worst, far → the farthest/furthest

In a group: the tallest in the class

**Vietnamese Translation (Dịch Tiếng Việt):**
Tính từ ngắn: the + adj + -est
tall → the tallest (cao nhất)

Tính từ dài: the most + adj
beautiful → the most beautiful (đẹp nhất)

Bất quy tắc: good → the best (tốt nhất), bad → the worst (tệ nhất), far → the farthest/furthest (xa nhất)

Trong nhóm: the tallest in the class (cao nhất lớp)
            `,
            examples: [
              { 
                example: 'Mount Everest is the highest mountain.', 
                explanation: 'Short adjective (Tính từ ngắn)',
                vietnamese: {
                  example: 'Núi Everest là ngọn núi cao nhất.',
                  explanation: 'Tính từ ngắn'
                }
              },
              { 
                example: 'This is the most expensive car in the showroom.', 
                explanation: 'Long adjective (Tính từ dài)',
                vietnamese: {
                  example: 'Đây là chiếc xe đắt nhất trong showroom.',
                  explanation: 'Tính từ dài'
                }
              },
              { 
                example: 'She is the best student in school.', 
                explanation: 'Irregular (Bất quy tắc)',
                vietnamese: {
                  example: 'Cô ấy là học sinh giỏi nhất trường.',
                  explanation: 'Bất quy tắc'
                }
              },
              { 
                example: "That was the worst movie I've ever seen.", 
                explanation: 'Irregular negative (Bất quy tắc phủ định)',
                vietnamese: {
                  example: 'Đó là bộ phim tệ nhất tôi từng xem.',
                  explanation: 'Bất quy tắc phủ định'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'cs_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'My house is _____ (big) than yours. (Nhà tôi _____ (lớn) hơn nhà bạn.)',
            options: [
              { text: 'bigger', isCorrect: true, explanation: 'Short adjective + -er (Tính từ ngắn + -er)' },
              { text: 'more big', isCorrect: false, explanation: 'For long adjectives only (Chỉ cho tính từ dài)' },
              { text: 'biggest', isCorrect: false, explanation: 'Superlative, not comparative (So sánh nhất, không phải hơn)' },
              { text: 'as big', isCorrect: false, explanation: 'For equality (Cho bằng nhau)' },
            ],
          },
          {
            exerciseId: 'cs_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'This is _____ (good) book in the library. (Đây là _____ (hay) sách nhất trong thư viện.)',
            correctAnswer: 'the best',
            hints: ['Irregular superlative (So sánh nhất bất quy tắc)', 'The + superlative (The + so sánh nhất)'],
            explanation: 'Good → the best (Good → tốt nhất)',
          },
          {
            exerciseId: 'cs_ex_003',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'She is not as _____ (tall) as her sister. (Cô ấy không _____ (cao) bằng chị gái.)',
            options: [
              { text: 'tall', isCorrect: true, explanation: 'As...as for equality (As...as cho bằng nhau)' },
              { text: 'taller', isCorrect: false, explanation: 'Comparative (So sánh hơn)' },
              { text: 'the tallest', isCorrect: false, explanation: 'Superlative (So sánh nhất)' },
              { text: 'more tall', isCorrect: false, explanation: 'Wrong form (Dạng sai)' },
            ],
          },
          {
            exerciseId: 'cs_ex_004',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'The weather today is _____ (bad) than yesterday. (Thời tiết hôm nay _____ (tệ) hơn hôm qua.)',
            correctAnswer: 'worse',
            hints: ['Irregular comparative (So sánh hơn bất quy tắc)', 'Bad → worse (Bad → tệ hơn)'],
            explanation: 'Irregular form for bad (Dạng bất quy tắc cho bad)',
          },
        ],
        vocabulary: [
          { 
            word: 'adjective', 
            meaning: 'Word describing a noun (Từ miêu tả danh từ)', 
            example: 'Beautiful adjective. (Tính từ đẹp.)' 
          },
          { 
            word: 'equality', 
            meaning: 'Being the same (Bằng nhau)', 
            example: 'Equality in height. (Bằng nhau về chiều cao.)' 
          },
          { 
            word: 'irregular', 
            meaning: 'Not following the usual rule (Không theo quy tắc thông thường)', 
            example: 'Irregular verb. (Động từ bất quy tắc.)' 
          },
          { 
            word: 'syllable', 
            meaning: 'Unit of pronunciation (Đơn vị phát âm)', 
            example: 'One-syllable word. (Từ một âm tiết.)' 
          },
        ],
      },
    },
  },
  advanced: {
    level: 'Advanced',
    description: 'Advanced grammar topics for fluency and nuance (Các chủ đề ngữ pháp nâng cao để đạt sự lưu loát và tinh tế)',
    topics: {
      // Topic 1: Past Perfect and Past Perfect Continuous
      pastPerfectContinuous: {
        id: 'past_perfect_continuous',
        title: 'Past Perfect and Past Perfect Continuous (Quá Khứ Hoàn Thành và Quá Khứ Hoàn Thành Tiếp Diễn)',
        difficulty: 'Advanced',
        icon: '⏳🔄',
        description: 'Express earlier past actions and ongoing past states (Bày tỏ hành động quá khứ trước đó và trạng thái quá khứ đang diễn ra)',
        lessons: [
          {
            lessonId: 'ppc_001',
            title: 'Past Perfect: Completed Actions Before Another Past Action (Quá Khứ Hoàn Thành: Hành Động Hoàn Thành Trước Hành Động Quá Khứ Khác)',
            duration: '12 mins',
            content: `
**English:**
Past Perfect: Actions completed before another past action
By the time we arrived, the movie had started.

Form: Subject + had + past participle
Negative: hadn't + past participle
Question: Had + Subject + past participle?

Used in reported speech for past tenses and third conditional.

**Vietnamese Translation (Dịch Tiếng Việt):**
Quá Khứ Hoàn Thành: Hành động hoàn thành trước hành động quá khứ khác
By the time we arrived, the movie had started. (Khi chúng tôi đến, bộ phim đã bắt đầu.)

Cấu trúc: Chủ ngữ + had + past participle
Phủ định: hadn't + past participle
Câu hỏi: Had + Chủ ngữ + past participle?

Dùng trong lời nói gián tiếp cho thì quá khứ và điều kiện loại 3.
            `,
            examples: [
              { 
                example: 'She had finished her homework before dinner.', 
                explanation: 'Completed before another past event (Hoàn thành trước sự kiện quá khứ khác)',
                vietnamese: {
                  example: 'Cô ấy đã làm xong bài tập trước bữa tối.',
                  explanation: 'Hoàn thành trước sự kiện quá khứ khác'
                }
              },
              { 
                example: 'They hadn\'t eaten when the guests arrived.',                explanation: 'Negative form (Dạng phủ định)',
                vietnamese: {
                  example: 'Họ chưa ăn khi khách đến.',
                  explanation: 'Dạng phủ định'
                }
              },
              { 
                example: 'Had you seen the news before the meeting?', 
                explanation: 'Question form (Dạng câu hỏi)',
                vietnamese: {
                  example: 'Bạn đã xem tin tức trước cuộc họp chưa?',
                  explanation: 'Dạng câu hỏi'
                }
              },
              { 
                example: 'If I had known, I would have helped.', 
                explanation: 'In third conditional (Trong điều kiện loại 3)',
                vietnamese: {
                  example: 'Nếu tôi biết, tôi đã giúp.',
                  explanation: 'Trong điều kiện loại 3'
                }
              },
            ],
          },
          {
            lessonId: 'ppc_002',
            title: 'Past Perfect Continuous: Ongoing Actions Before Another Past Action (Quá Khứ Hoàn Thành Tiếp Diễn: Hành Động Đang Diễn Ra Trước Hành Động Quá Khứ Khác)',
            duration: '13 mins',
            content: `
**English:**
Past Perfect Continuous: Ongoing actions before another past point, emphasizing duration or cause
She was tired because she had been working all day.

Form: Subject + had been + verb-ing
Negative: hadn't been + verb-ing
Question: Had + Subject + been + verb-ing?

Often with for/since; explains effects like "wet from rain."

**Vietnamese Translation (Dịch Tiếng Việt):**
Quá Khứ Hoàn Thành Tiếp Diễn: Hành động đang diễn ra trước điểm quá khứ khác, nhấn mạnh thời lượng hoặc nguyên nhân
She was tired because she had been working all day. (Cô ấy mệt vì đã làm việc cả ngày.)

Cấu trúc: Chủ ngữ + had been + verb-ing
Phủ định: hadn't been + verb-ing
Câu hỏi: Had + Chủ ngữ + been + verb-ing?

Thường với for/since; giải thích hiệu ứng như "wet from rain" (ướt vì mưa).
            `,
            examples: [
              { 
                example: 'They had been waiting for hours when the train finally arrived.', 
                explanation: 'Duration before past event (Thời lượng trước sự kiện quá khứ)',
                vietnamese: {
                  example: 'Họ đã chờ hàng giờ khi tàu cuối cùng đến.',
                  explanation: 'Thời lượng trước sự kiện quá khứ'
                }
              },
              { 
                example: 'He hadn\'t been sleeping well, so he was exhausted.', 
                explanation: 'Cause of past state (Nguyên nhân của trạng thái quá khứ)',
                vietnamese: {
                  example: 'Anh ấy chưa ngủ ngon, nên mệt mỏi.',
                  explanation: 'Nguyên nhân của trạng thái quá khứ'
                }
              },
              { 
                example: 'How long had you been studying English before moving abroad?', 
                explanation: 'Question with duration (Câu hỏi với thời lượng)',
                vietnamese: {
                  example: 'Bạn đã học tiếng Anh bao lâu trước khi chuyển ra nước ngoài?',
                  explanation: 'Câu hỏi với thời lượng'
                }
              },
              { 
                example: 'The ground was wet because it had been raining.', 
                explanation: 'Explaining effect (Giải thích hiệu ứng)',
                vietnamese: {
                  example: 'Mặt đất ướt vì đã mưa.',
                  explanation: 'Giải thích hiệu ứng'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'ppc_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'By the time the police arrived, the thief _____ away. (Khi cảnh sát đến, tên trộm _____ mất.)',
            options: [
              { text: 'had run', isCorrect: true, explanation: 'Past perfect for completion before past event (Quá khứ hoàn thành cho hoàn thành trước sự kiện quá khứ)' },
              { text: 'ran', isCorrect: false, explanation: 'Past simple for simultaneous actions (Quá khứ đơn cho hành động đồng thời)' },
              { text: 'was running', isCorrect: false, explanation: 'Past continuous for ongoing (Quá khứ tiếp diễn cho đang diễn ra)' },
              { text: 'has run', isCorrect: false, explanation: 'Present perfect not for past sequence (Hiện tại hoàn thành không cho chuỗi quá khứ)' },
            ],
          },
          {
            exerciseId: 'ppc_ex_002',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'She was crying because she _____ (cry) for hours. (Cô ấy khóc vì đã _____ (khóc) hàng giờ.)',
            correctAnswer: 'had been crying',
            hints: ['Past perfect continuous for duration causing effect (Quá khứ hoàn thành tiếp diễn cho thời lượng gây hiệu ứng)', 'Had been + verb-ing (Had been + verb-ing)'],
            explanation: 'Emphasizes ongoing action leading to past result (Nhấn mạnh hành động đang diễn ra dẫn đến kết quả quá khứ)',
          },
          {
            exerciseId: 'ppc_ex_003',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'If we _____ (know) about the storm, we would have stayed home. (Nếu chúng tôi _____ (biết) về cơn bão, chúng tôi đã ở nhà.)',
            options: [
              { text: 'had known', isCorrect: true, explanation: 'Past perfect in third conditional (Quá khứ hoàn thành trong điều kiện loại 3)' },
              { text: 'knew', isCorrect: false, explanation: 'Past simple for second conditional (Quá khứ đơn cho loại 2)' },
              { text: 'have known', isCorrect: false, explanation: 'Present perfect for real condition (Hiện tại hoàn thành cho điều kiện thực tế)' },
              { text: 'had been knowing', isCorrect: false, explanation: 'Stative verbs not continuous (Động từ trạng thái không dùng tiếp diễn)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'sequence', 
            meaning: 'Order of events (Trình tự sự kiện)', 
            example: 'Past events in sequence. (Sự kiện quá khứ theo trình tự.)' 
          },
          { 
            word: 'duration', 
            meaning: 'Length of time something continues (Độ dài thời gian điều gì đó tiếp tục)', 
            example: 'Duration of the meeting. (Thời lượng cuộc họp.)' 
          },
          { 
            word: 'emphasize', 
            meaning: 'To highlight or stress (Nhấn mạnh)', 
            example: 'Emphasize the importance. (Nhấn mạnh tầm quan trọng.)' 
          },
          { 
            word: 'effect', 
            meaning: 'Result of an action (Kết quả của hành động)', 
            example: 'Side effect of medicine. (Tác dụng phụ của thuốc.)' 
          },
        ],
      },

      // Topic 2: Second and Third Conditionals
      secondThirdConditionals: {
        id: 'second_third_conditionals',
        title: 'Second and Third Conditionals (Câu Điều Kiện Loại 2 và Loại 3)',
        difficulty: 'Advanced',
        icon: '❄️⛄',
        description: 'Hypothetical and unreal situations (Tình huống giả định và không thực tế)',
        lessons: [
          {
            lessonId: 'stc_001',
            title: 'Second Conditional: Unreal Present/Future (Điều Kiện Loại 2: Hiện Tại/Tương Lai Không Thực)',
            duration: '11 mins',
            content: `
**English:**
Second Conditional: Unreal or unlikely situations in present/future
If + Past Simple, would + base verb
If I won the lottery, I would travel the world.

For advice/imagination: If I were you, I would apologize.

Mixed: Past affecting present: If I had studied harder, I would be successful now.

**Vietnamese Translation (Dịch Tiếng Việt):**
Điều Kiện Loại 2: Tình huống không thực hoặc khó xảy ra ở hiện tại/tương lai
If + Quá Khứ Đơn, would + động từ nguyên thể
If I won the lottery, I would travel the world. (Nếu tôi trúng số, tôi sẽ du lịch thế giới.)

Cho lời khuyên/tưởng tượng: If I were you, I would apologize. (Nếu là bạn, tôi sẽ xin lỗi.)

Kết hợp: Quá khứ ảnh hưởng hiện tại: If I had studied harder, I would be successful now. (Nếu tôi học chăm hơn, giờ tôi đã thành công.)
            `,
            examples: [
              { 
                example: 'If it rained, we would cancel the game.', 
                explanation: 'Unlikely future (Tương lai khó xảy ra)',
                vietnamese: {
                  example: 'Nếu trời mưa, chúng tôi sẽ hủy trận đấu.',
                  explanation: 'Tương lai khó xảy ra'
                }
              },
              { 
                example: 'If I were rich, I would buy a yacht.', 
                explanation: 'Unreal present with "were" (Hiện tại không thực với "were")',
                vietnamese: {
                  example: 'Nếu tôi giàu, tôi sẽ mua du thuyền.',
                  explanation: 'Hiện tại không thực với "were"'
                }
              },
              { 
                example: 'She would help if she had time.', 
                explanation: 'Reversed order (Đảo ngược thứ tự)',
                vietnamese: {
                  example: 'Cô ấy sẽ giúp nếu có thời gian.',
                  explanation: 'Đảo ngược thứ tự'
                }
              },
              { 
                example: 'If I had won the race, I would feel proud now.', 
                explanation: 'Mixed conditional (Điều kiện kết hợp)',
                vietnamese: {
                  example: 'Nếu tôi thắng cuộc đua, giờ tôi đã tự hào.',
                  explanation: 'Điều kiện kết hợp'
                }
              },
            ],
          },
          {
            lessonId: 'stc_002',
            title: 'Third Conditional: Unreal Past (Điều Kiện Loại 3: Quá Khứ Không Thực)',
            duration: '12 mins',
            content: `
**English:**
Third Conditional: Hypothetical past situations and regrets
If + Past Perfect, would have + past participle
If I had studied, I would have passed the exam.

For criticism/regret: If you had listened, this wouldn't have happened.

Could have/Might have for possibilities: If we had left earlier, we could have caught the train.

**Vietnamese Translation (Dịch Tiếng Việt):**
Điều Kiện Loại 3: Tình huống giả định quá khứ và hối tiếc
If + Quá Khứ Hoàn Thành, would have + past participle
If I had studied, I would have passed the exam. (Nếu tôi học, tôi đã đỗ kỳ thi.)

Cho phê phán/hối tiếc: If you had listened, this wouldn't have happened. (Nếu bạn nghe, chuyện này đã không xảy ra.)

Could have/Might have cho khả năng: If we had left earlier, we could have caught the train. (Nếu chúng tôi đi sớm, chúng tôi đã bắt kịp tàu.)
            `,
            examples: [
              { 
                example: 'If she had called, I would have answered.', 
                explanation: 'Unreal past action (Hành động quá khứ không thực)',
                vietnamese: {
                  example: 'Nếu cô ấy gọi, tôi đã trả lời.',
                  explanation: 'Hành động quá khứ không thực'
                }
              },
              { 
                example: 'We wouldn\'t have gotten lost if we had used the map.', 
                explanation: 'Negative result (Kết quả phủ định)',
                vietnamese: {
                  example: 'Chúng tôi đã không lạc nếu dùng bản đồ.',
                  explanation: 'Kết quả phủ định'
                }
              },
              { 
                example: 'If he had been careful, he might have avoided the accident.', 
                explanation: 'With "might have" for possibility (Với "might have" cho khả năng)',
                vietnamese: {
                  example: 'Nếu anh ấy cẩn thận, anh ấy đã tránh được tai nạn.',
                  explanation: 'Với "might have" cho khả năng'
                }
              },
              { 
                example: 'I wish I had learned Spanish earlier.', 
                explanation: 'Regret with third conditional implication (Hối tiếc ngụ ý điều kiện loại 3)',
                vietnamese: {
                  example: 'Ước gì tôi học tiếng Tây Ban Nha sớm hơn.',
                  explanation: 'Hối tiếc ngụ ý điều kiện loại 3'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'stc_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'If I _____ you, I _____ the job offer. (Nếu là bạn, tôi _____ lời đề nghị công việc.)',
            options: [
              { text: 'were ... would accept', isCorrect: true, explanation: 'Second conditional for advice (Loại 2 cho lời khuyên)' },
              { text: 'am ... accept', isCorrect: false, explanation: 'Present tenses for real situations (Hiện tại cho tình huống thực tế)' },
              { text: 'had been ... had accepted', isCorrect: false, explanation: 'Third conditional for past (Loại 3 cho quá khứ)' },
              { text: 'will be ... will accept', isCorrect: false, explanation: 'First conditional for likely future (Loại 1 cho tương lai có thể)' },
            ],
          },
          {
            exerciseId: 'stc_ex_002',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'If we _____ (not/miss) the bus, we _____ (arrive) on time. (Nếu chúng tôi _____ (không trễ) xe buýt, chúng tôi _____ (đến) đúng giờ.)',
            correctAnswer: 'hadn\'t missed ... would have arrived',
            hints: ['Past perfect in if-clause (Quá khứ hoàn thành trong mệnh đề if)', 'Would have + past participle in main clause (Would have + past participle trong mệnh đề chính)'],
            explanation: 'Third conditional for unreal past (Loại 3 cho quá khứ không thực)',
          },
          {
            exerciseId: 'stc_ex_003',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'If she _____ harder last year, she _____ a promotion now. (Nếu cô ấy _____ chăm chỉ năm ngoái, giờ cô ấy _____ thăng chức.)',
            options: [
              { text: 'had worked ... would have', isCorrect: true, explanation: 'Mixed third-second conditional (Kết hợp loại 3-2)' },
              { text: 'worked ... would have', isCorrect: false, explanation: 'Inconsistent tenses (Thì không nhất quán)' },
              { text: 'works ... will have', isCorrect: false, explanation: 'First conditional structure (Cấu trúc loại 1)' },
              { text: 'had worked ... would work', isCorrect: false, explanation: 'Close, but main clause should be present for mixed (Mệnh đề chính nên là hiện tại cho kết hợp)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'hypothetical', 
            meaning: 'Based on an imagined situation (Dựa trên tình huống tưởng tượng)', 
            example: 'Hypothetical scenario. (Tình huống giả định.)' 
          },
          { 
            word: 'regret', 
            meaning: 'Feeling sorry about the past (Cảm giác tiếc nuối về quá khứ)', 
            example: 'No regrets in life. (Không hối tiếc trong đời.)' 
          },
          { 
            word: 'implication', 
            meaning: 'Something suggested but not directly stated (Điều gì đó gợi ý nhưng không nói trực tiếp)', 
            example: 'Hidden implication. (Ý ngầm.)' 
          },
          { 
            word: 'criticism', 
            meaning: 'Expression of disapproval (Bày tỏ sự không tán thành)', 
            example: 'Constructive criticism. (Phê bình mang tính xây dựng.)' 
          },
        ],
      },

      // Topic 3: Reported Speech
      reportedSpeech: {
        id: 'reported_speech',
        title: 'Reported Speech (Lời Nói Gián Tiếp)',
        difficulty: 'Advanced',
        icon: '💬',
        description: 'Convert direct speech to indirect forms (Chuyển lời nói trực tiếp sang gián tiếp)',
        lessons: [
          {
            lessonId: 'rs_001',
            title: 'Statements and Questions in Reported Speech (Câu Trần Thuật và Câu Hỏi trong Lời Nói Gián Tiếp)',
            duration: '12 mins',
            content: `
**English:**
Reported Speech: Backshift tenses for past reporting
Direct: "I am tired," he said. → Reported: He said he was tired.

Tense changes: Present Simple → Past Simple; Will → Would; Present Continuous → Past Continuous.

Questions: Say/Ask + if/whether (Yes/No); Wh-questions keep Wh-word.
Direct: "Where are you?" → He asked where I was.

No backshift if reporting verb is present or truth/universal.

**Vietnamese Translation (Dịch Tiếng Việt):**
Lời Nói Gián Tiếp: Lùi thì cho báo cáo quá khứ
Direct: "I am tired," he said. → Reported: He said he was tired. (Anh ấy nói anh ấy mệt.)

Thay đổi thì: Hiện Tại Đơn → Quá Khứ Đơn; Will → Would; Hiện Tại Tiếp Diễn → Quá Khứ Tiếp Diễn.

Câu hỏi: Say/Ask + if/whether (Yes/No); Câu hỏi Wh giữ Wh-word.
Direct: "Where are you?" → He asked where I was. (Anh ấy hỏi tôi ở đâu.)

Không lùi thì nếu động từ báo cáo ở hiện tại hoặc sự thật/vô thời.
            `,
            examples: [
              { 
                example: '"I will go tomorrow," she said. → She said she would go the next day.', 
                explanation: 'Future to conditional + time shift (Tương lai thành điều kiện + dịch thời gian)',
                vietnamese: {
                  example: 'Cô ấy nói cô ấy sẽ đi ngày hôm sau.',
                  explanation: 'Tương lai thành điều kiện + dịch thời gian'
                }
              },
              { 
                example: '"Do you like coffee?" he asked. → He asked if I liked coffee.', 
                explanation: 'Yes/No question (Câu hỏi Yes/No)',
                vietnamese: {
                  example: 'Anh ấy hỏi tôi có thích cà phê không.',
                  explanation: 'Câu hỏi Yes/No'
                }
              },
              { 
                example: '"What time is it?" → She asked what time it was.', 
                explanation: 'Wh-question (Câu hỏi Wh)',
                vietnamese: {
                  example: 'Cô ấy hỏi giờ là mấy giờ.',
                  explanation: 'Câu hỏi Wh'
                }
              },
              { 
                example: 'He says, "The Earth is round." → He says the Earth is round.', 
                explanation: 'No backshift for universal truth (Không lùi thì cho sự thật phổ quát)',
                vietnamese: {
                  example: 'Anh ấy nói Trái Đất tròn.',
                  explanation: 'Không lùi thì cho sự thật phổ quát'
                }
              },
            ],
          },
          {
            lessonId: 'rs_002',
            title: 'Commands, Requests, and Suggestions in Reported Speech (Lệnh, Yêu Cầu, và Gợi Ý trong Lời Nói Gián Tiếp)',
            duration: '11 mins',
            content: `
**English:**
Commands/Requests: Tell/Ask + object + infinitive
Direct: "Close the door!" → He told me to close the door.
Negative: "Don't touch it!" → She told him not to touch it.

Suggestions: Suggest + gerund or that-clause
Direct: "Let's go!" → He suggested going. / He suggested that we go.

Reporting verbs: Advise, warn, recommend, etc., with specific patterns.

Time/place words: Here → there; Now → then; This → that.

**Vietnamese Translation (Dịch Tiếng Việt):**
Lệnh/Yêu Cầu: Tell/Ask + tân ngữ + to infinitive
Direct: "Close the door!" → He told me to close the door. (Anh ấy bảo tôi đóng cửa.)
Phủ định: "Don't touch it!" → She told him not to touch it. (Cô ấy bảo anh ấy đừng chạm.)

Gợi Ý: Suggest + gerund hoặc that-clause
Direct: "Let's go!" → He suggested going. / He suggested that we go. (Anh ấy gợi ý chúng ta đi.)

Động từ báo cáo: Advise, warn, recommend, v.v., với mẫu cụ thể.

Từ thời gian/nơi chốn: Here → there; Now → then; This → that.
            `,
            examples: [
              { 
                example: '"Please sit down," the teacher said. → The teacher asked us to sit down.', 
                explanation: 'Polite request (Yêu cầu lịch sự)',
                vietnamese: {
                  example: 'Thầy cô yêu cầu chúng tôi ngồi xuống.',
                  explanation: 'Yêu cầu lịch sự'
                }
              },
              { 
                example: '"You should see a doctor," she said. → She advised me to see a doctor.', 
                explanation: 'Advice with "advise" (Lời khuyên với "advise")',
                vietnamese: {
                  example: 'Cô ấy khuyên tôi gặp bác sĩ.',
                  explanation: 'Lời khuyên với "advise"'
                }
              },
              { 
                example: '"Why don\'t we eat out?" → He suggested eating out.', 
                explanation: 'Suggestion with gerund (Gợi ý với gerund)',
                vietnamese: {
                  example: 'Anh ấy gợi ý ăn ngoài.',
                  explanation: 'Gợi ý với gerund'
                }
              },
              { 
                example: '"Be careful!" → She warned me to be careful.', 
                explanation: 'Warning (Cảnh báo)',
                vietnamese: {
                  example: 'Cô ấy cảnh báo tôi cẩn thận.',
                  explanation: 'Cảnh báo'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'rs_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'Direct: "I\'m leaving now." → Reported: She said she _____ now.',
            options: [
              { text: 'was leaving then', isCorrect: true, explanation: 'Backshift + time word change (Lùi thì + đổi từ thời gian)' },
              { text: 'is leaving now', isCorrect: false, explanation: 'No backshift needed only for present reporting (Không lùi thì chỉ cho báo cáo hiện tại)' },
              { text: 'leaves now', isCorrect: false, explanation: 'Incorrect tense shift (Lùi thì sai)' },
              { text: 'will leave then', isCorrect: false, explanation: 'Wrong future form (Dạng tương lai sai)' },
            ],
          },
          {
            exerciseId: 'rs_ex_002',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'Direct: "Don\'t forget your keys!" → He told me _____ my keys. (Direct: "Đừng quên chìa khóa!")',
            correctAnswer: 'not to forget',
            hints: ['Tell + object + not to infinitive (Tell + tân ngữ + not to infinitive)', 'Negative command (Lệnh phủ định)'],
            explanation: 'Reported command structure (Cấu trúc lệnh gián tiếp)',
          },
          {
            exerciseId: 'rs_ex_003',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'Direct: "Shall we start?" → He suggested _____.',
            options: [
              { text: 'starting', isCorrect: true, explanation: 'Suggest + gerund (Suggest + gerund)' },
              { text: 'to start', isCorrect: false, explanation: 'Infinitive for other verbs like advise (To infinitive cho động từ khác như advise)' },
              { text: 'that we start', isCorrect: false, explanation: 'Alternative that-clause, but gerund is direct (That-clause thay thế, nhưng gerund trực tiếp hơn)' },
              { text: 'we starting', isCorrect: false, explanation: 'Incorrect structure (Cấu trúc sai)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'backshift', 
            meaning: 'Changing tenses in reported speech (Thay đổi thì trong lời nói gián tiếp)', 
            example: 'Tense backshift rules. (Quy tắc lùi thì.)' 
          },
          { 
            word: 'infinitive', 
            meaning: 'Base form of verb (Dạng nguyên thể của động từ)', 
            example: 'To infinitive after tell. (To infinitive sau tell.)' 
          },
          { 
            word: 'gerund', 
            meaning: 'Verb-ing as noun (Verb-ing như danh từ)', 
            example: 'Suggest + gerund. (Suggest + gerund.)' 
          },
          { 
            word: 'universal', 
            meaning: 'True for all time (Đúng cho mọi thời gian)', 
            example: 'Universal truth. (Sự thật phổ quát.)' 
          },
        ],
      },

      // Topic 4: Passive Voice
      passiveVoice: {
        id: 'passive_voice',
        title: 'Passive Voice (Thể Bị Động)',
        difficulty: 'Advanced',
        icon: '🔄',
        description: 'Focus on the action or receiver rather than the doer (Tập trung vào hành động hoặc người nhận hơn là người thực hiện)',
        lessons: [
          {
            lessonId: 'pv_001',
            title: 'Forming Passives Across Tenses (Hình Thành Thể Bị Động Qua Các Thì)',
            duration: '12 mins',
            content: `
**English:**
Passive: Object becomes subject + be + past participle (+ by agent)
Present Simple: The book is read by students.
Past Simple: The window was broken.
Present Perfect: The report has been finished.

Future: Will be done; Modals: Must be completed.

No agent if unknown/irrelevant; Get-passive for informal: The car got stolen.

**Vietnamese Translation (Dịch Tiếng Việt):**
Thể Bị Động: Tân ngữ thành chủ ngữ + be + past participle (+ by agent)
Hiện Tại Đơn: The book is read by students. (Cuốn sách được đọc bởi học sinh.)
Quá Khứ Đơn: The window was broken. (Cửa sổ bị vỡ.)
Hiện Tại Hoàn Thành: The report has been finished. (Báo cáo đã được hoàn thành.)

Tương Lai: Will be done; Modal: Must be completed. (Phải được hoàn thành.)

Không dùng agent nếu không biết/không quan trọng; Get-passive cho thân mật: The car got stolen. (Xe bị đánh cắp.)
            `,
            examples: [
              { 
                example: 'The cake was eaten by the children.', 
                explanation: 'Past simple passive (Quá khứ đơn bị động)',
                vietnamese: {
                  example: 'Chiếc bánh bị trẻ em ăn.',
                  explanation: 'Quá khứ đơn bị động'
                }
              },
              { 
                example: 'English is spoken in many countries.', 
                explanation: 'Present simple passive (Hiện tại đơn bị động)',
                vietnamese: {
                  example: 'Tiếng Anh được nói ở nhiều quốc gia.',
                  explanation: 'Hiện tại đơn bị động'
                }
              },
              { 
                example: 'The letter will be sent tomorrow.', 
                explanation: 'Future passive (Tương lai bị động)',
                vietnamese: {
                  example: 'Lá thư sẽ được gửi ngày mai.',
                  explanation: 'Tương lai bị động'
                }
              },
              { 
                example: 'This problem must be solved immediately.', 
                explanation: 'Modal passive (Modal bị động)',
                vietnamese: {
                  example: 'Vấn đề này phải được giải quyết ngay.',
                  explanation: 'Modal bị động'
                }
              },
            ],
          },
          {
            lessonId: 'pv_002',
            title: 'Advanced Uses: Causative and Impersonal Passives (Sử Dụng Nâng Cao: Thể Gây Ra và Thể Bị Động Phi Cá Nhân)',
            duration: '13 mins',
            content: `
**English:**
Causative: Have/Get something done (arrange for others to do)
I had my car repaired. (Someone repaired it for me.)

Impersonal: It is said that...; People think... → It is thought that...
Used in formal writing; He is believed to be innocent.

Passives with reporting verbs: It was reported that the economy improved.

Double object: Give someone something → Something was given to someone.

**Vietnamese Translation (Dịch Tiếng Việt):**
Thể Gây Ra: Have/Get something done (sắp xếp cho người khác làm)
I had my car repaired. (Tôi nhờ sửa xe.) (Ai đó sửa giúp tôi.)

Phi Cá Nhân: It is said that...; People think... → It is thought that... (Được cho là...)
Dùng trong viết trang trọng; He is believed to be innocent. (Anh ấy được cho là vô tội.)

Bị động với động từ báo cáo: It was reported that the economy improved. (Được báo cáo rằng kinh tế cải thiện.)

Đối tượng kép: Give someone something → Something was given to someone. (Thứ gì đó được đưa cho ai đó.)
            `,
            examples: [
              { 
                example: 'She got her hair cut yesterday.', 
                explanation: 'Informal causative (Thể gây ra thân mật)',
                vietnamese: {
                  example: 'Cô ấy nhờ cắt tóc hôm qua.',
                  explanation: 'Thể gây ra thân mật'
                }
              },
              { 
                example: 'It is believed that climate change is accelerating.', 
                explanation: 'Impersonal passive (Bị động phi cá nhân)',
                vietnamese: {
                  example: 'Được cho rằng biến đổi khí hậu đang tăng tốc.',
                  explanation: 'Bị động phi cá nhân'
                }
              },
              { 
                example: 'The news was announced to the public.', 
                explanation: 'Passive with reporting verb (Bị động với động từ báo cáo)',
                vietnamese: {
                  example: 'Tin tức được thông báo cho công chúng.',
                  explanation: 'Bị động với động từ báo cáo'
                }
              },
              { 
                example: 'A gift was given to her by the committee.', 
                explanation: 'Double object passive (Bị động đối tượng kép)',
                vietnamese: {
                  example: 'Món quà được ủy ban tặng cô ấy.',
                  explanation: 'Bị động đối tượng kép'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pv_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'The book _____ by the author last year. (Cuốn sách _____ bởi tác giả năm ngoái.)',
            options: [
              { text: 'was written', isCorrect: true, explanation: 'Past simple passive (Quá khứ đơn bị động)' },
              { text: 'wrote', isCorrect: false, explanation: 'Active voice (Thể chủ động)' },
              { text: 'is written', isCorrect: false, explanation: 'Present passive (Hiện tại bị động)' },
              { text: 'has written', isCorrect: false, explanation: 'Present perfect active (Hiện tại hoàn thành chủ động)' },
            ],
          },
          {
            exerciseId: 'pv_ex_002',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'I need to _____ my computer _____; it\'s broken. (Tôi cần _____ máy tính _____; nó hỏng.)',
            correctAnswer: 'have ... repaired',
            hints: ['Causative have + object + past participle (Thể gây ra have + tân ngữ + past participle)'],
            explanation: 'Causative structure for arranging service (Cấu trúc gây ra cho sắp xếp dịch vụ)',
          },
          {
            exerciseId: 'pv_ex_003',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'It _____ that the meeting has been postponed. (Được _____ rằng cuộc họp bị hoãn.)',
            options: [
              { text: 'is reported', isCorrect: true, explanation: 'Impersonal passive with reporting verb (Bị động phi cá nhân với động từ báo cáo)' },
              { text: 'reports', isCorrect: false, explanation: 'Active form (Thể chủ động)' },
              { text: 'reported', isCorrect: false, explanation: 'Missing "is" for present (Thiếu "is" cho hiện tại)' },
              { text: 'will report', isCorrect: false, explanation: 'Future active (Tương lai chủ động)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'agent', 
            meaning: 'The doer in passive (Người thực hiện trong bị động)', 
            example: 'By the agent. (Bởi người thực hiện.)' 
          },
          { 
            word: 'participle', 
            meaning: 'Past form in passive (Dạng quá khứ trong bị động)', 
            example: 'Past participle required. (Cần phân từ quá khứ.)' 
          },
          { 
            word: 'causative', 
            meaning: 'Structure for causing an action (Cấu trúc cho gây ra hành động)', 
            example: 'Causative have. (Thể gây ra have.)' 
          },
          { 
            word: 'impersonal', 
            meaning: 'General or formal without specific subject (Chung chung hoặc trang trọng không có chủ ngữ cụ thể)', 
            example: 'Impersonal construction. (Cấu trúc phi cá nhân.)' 
          },
        ],
      },

      // Topic 5: Relative Clauses
      relativeClauses: {
        id: 'relative_clauses',
        title: 'Relative Clauses (Mệnh Đề Quan Hệ)',
        difficulty: 'Advanced',
        icon: '🔗',
        description: 'Define or add information with who, which, that, etc. (Xác định hoặc thêm thông tin với who, which, that, v.v.)',
        lessons: [
          {
            lessonId: 'rc_001',
            title: 'Defining and Non-Defining Relative Clauses (Mệnh Đề Quan Hệ Xác Định và Không Xác Định)',
            duration: '12 mins',
            content: `
**English:**
Defining: Essential info, no commas (restricts meaning)
The man who lives next door is friendly. (Specifies which man)

Non-Defining: Extra info, commas (adds detail)
My brother, who lives in London, is visiting. (Assumes one brother)

Relative pronouns: Who (people), Which (things), That (both, defining only), Whose (possession).

Omission: In defining, omit if object: The book (which) I read was great.

**Vietnamese Translation (Dịch Tiếng Việt):**
Xác Định: Thông tin thiết yếu, không dấu phẩy (hạn chế ý nghĩa)
The man who lives next door is friendly. (Người đàn ông sống cạnh nhà thân thiện.) (Chỉ rõ người nào)

Không Xác Định: Thông tin thêm, có dấu phẩy (thêm chi tiết)
My brother, who lives in London, is visiting. (Anh trai tôi, sống ở London, đang thăm.) (Giả định một anh trai)

Đại từ quan hệ: Who (người), Which (vật), That (cả hai, chỉ xác định), Whose (sở hữu).

Bỏ: Trong xác định, bỏ nếu tân ngữ: The book (which) I read was great. (Cuốn sách tôi đọc hay.)
            `,
            examples: [
              { 
                example: 'The car that broke down was mine.', 
                explanation: 'Defining clause (Mệnh đề xác định)',
                vietnamese: {
                  example: 'Chiếc xe hỏng là của tôi.',
                  explanation: 'Mệnh đề xác định'
                }
              },
              { 
                example: 'Paris, which is the capital of France, is beautiful.', 
                explanation: 'Non-defining clause (Mệnh đề không xác định)',
                vietnamese: {
                  example: 'Paris, thủ đô Pháp, rất đẹp.',
                  explanation: 'Mệnh đề không xác định'
                }
              },
              { 
                example: 'The woman whose dog bit me apologized.', 
                explanation: 'Possessive "whose" (Sở hữu "whose")',
                vietnamese: {
                  example: 'Người phụ nữ có con chó cắn tôi đã xin lỗi.',
                  explanation: 'Sở hữu "whose"'
                }
              },
              { 
                example: 'This is the house we bought last year.', 
                explanation: 'Omitted relative pronoun (Bỏ đại từ quan hệ)',
                vietnamese: {
                  example: 'Đây là ngôi nhà chúng tôi mua năm ngoái.',
                  explanation: 'Bỏ đại từ quan hệ'
                }
              },
            ],
          },
          {
            lessonId: 'rc_002',
            title: 'Reduced Relative Clauses and Prepositions (Mệnh Đề Quan Hệ Rút Gọn và Giới Từ)',
            duration: '13 mins',
            content: `
**English:**
Reduced: Participles replace clauses
The man living next door → The man who lives next door.
Past: The book written by him (which was written).

Prepositions: At end (informal) or front (formal)
The house (which) we live in. / The house in which we live.

Whose with things: The company whose shares fell.

Contact clauses: Informal defining without pronoun/preposition.

**Vietnamese Translation (Dịch Tiếng Việt):**
Rút Gọn: Phân từ thay thế mệnh đề
The man living next door → The man who lives next door. (Người đàn ông sống cạnh nhà.)
Quá khứ: The book written by him (Cuốn sách được viết bởi anh ấy.)

Giới từ: Cuối (thân mật) hoặc đầu (trang trọng)
The house (which) we live in. / The house in which we live. (Ngôi nhà chúng tôi sống trong.)

Whose với vật: The company whose shares fell. (Công ty có cổ phiếu giảm.)

Contact clauses: Xác định thân mật không đại từ/giới từ.
            `,
            examples: [
              { 
                example: 'The students studying abroad miss home.', 
                explanation: 'Present participle reduced (Phân từ hiện tại rút gọn)',
                vietnamese: {
                  example: 'Học sinh học nước ngoài nhớ nhà.',
                  explanation: 'Phân từ hiện tại rút gọn'
                }
              },
              { 
                example: 'The painting stolen from the museum was recovered.', 
                explanation: 'Past participle reduced (Phân từ quá khứ rút gọn)',
                vietnamese: {
                  example: 'Bức tranh bị đánh cắp từ bảo tàng đã được lấy lại.',
                  explanation: 'Phân từ quá khứ rút gọn'
                }
              },
              { 
                example: 'The city in which I grew up is changing.', 
                explanation: 'Preposition at front (Giới từ ở đầu)',
                vietnamese: {
                  example: 'Thành phố tôi lớn lên đang thay đổi.',
                  explanation: 'Giới từ ở đầu'
                }
              },
              { 
                example: 'The software whose bugs were fixed works better.', 
                explanation: 'Whose with thing (Whose với vật)',
                vietnamese: {
                  example: 'Phần mềm sửa lỗi chạy tốt hơn.',
                  explanation: 'Whose với vật'
                }
              },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'rc_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'The restaurant, _____ serves Italian food, is always crowded. (Nhà hàng, _____ phục vụ món Ý, luôn đông.)',
            options: [
              { text: 'which', isCorrect: true, explanation: 'Non-defining relative pronoun (Đại từ quan hệ không xác định)' },
              { text: 'that', isCorrect: false, explanation: 'That only for defining (That chỉ cho xác định)' },
              { text: 'who', isCorrect: false, explanation: 'Who for people (Who cho người)' },
              { text: 'whose', isCorrect: false, explanation: 'Whose for possession (Whose cho sở hữu)' },
            ],
          },
          {
            exerciseId: 'rc_ex_002',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'The girl _____ I met yesterday is my cousin. (Cô gái _____ tôi gặp hôm qua là em họ tôi.)',
            correctAnswer: 'who/that',
            hints: ['Defining clause for people (Mệnh đề xác định cho người)', 'Who or that (Who hoặc that)'],
            explanation: 'Defining relative clause (Mệnh đề quan hệ xác định)',
          },
          {
            exerciseId: 'rc_ex_003',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'The keys _____ on the table belong to John. (Chùm chìa khóa _____ trên bàn thuộc về John.)',
            options: [
              { text: 'found', isCorrect: true, explanation: 'Reduced past participle (Rút gọn phân từ quá khứ)' },
              { text: 'finding', isCorrect: false, explanation: 'Present participle for active (Phân từ hiện tại cho chủ động)' },
              { text: 'which found', isCorrect: false, explanation: 'Full clause needed if not reduced (Cần mệnh đề đầy đủ nếu không rút gọn)' },
              { text: 'who found', isCorrect: false, explanation: 'Who for people (Who cho người)' },
            ],
          },
        ],
        vocabulary: [
          { 
            word: 'restrictive', 
            meaning: 'Defining or limiting (Xác định hoặc hạn chế)', 
            example: 'Restrictive clause. (Mệnh đề hạn chế.)' 
          },
          { 
            word: 'non-restrictive', 
            meaning: 'Additional, non-essential (Thêm vào, không thiết yếu)', 
            example: 'Non-restrictive info. (Thông tin không hạn chế.)' 
          },
          { 
            word: 'omission', 
            meaning: 'Leaving out (Bỏ qua)', 
            example: 'Pronoun omission. (Bỏ đại từ.)' 
          },
          { 
            word: 'preposition', 
            meaning: 'Word showing relation (Từ chỉ mối quan hệ)', 
            example: 'Preposition in clause. (Giới từ trong mệnh đề.)' 
          },
        ],
      },
    },
  },
};

// Export helper function to get grammar data by level
export const getGrammarByLevel = (level) => {
  const levelLower = level.toLowerCase();
  if (levelLower === 'beginner') return GRAMMAR_DATA.beginner;
  if (levelLower === 'intermediate') return GRAMMAR_DATA.intermediate;
  if (levelLower === 'advanced') return GRAMMAR_DATA.advanced;
  return null;
};

// Get all lesson IDs for a level (for progress per level)
export const getLessonIdsByLevel = (level) => {
  const data = getGrammarByLevel(level);
  if (!data?.topics) return [];
  const ids = [];
  Object.values(data.topics).forEach(topic => {
    (topic.lessons || []).forEach(lesson => ids.push(lesson.lessonId));
  });
  return ids;
};

// Get all lesson IDs for given topic ids across all levels (for quiz readiness)
export const getLessonIdsForTopicIds = (topicIds) => {
  const ids = new Set();
  Object.values(GRAMMAR_DATA).forEach(level => {
    if (!level.topics) return;
    Object.values(level.topics).forEach(topic => {
      if (topicIds.includes(topic.id) && topic.lessons) {
        topic.lessons.forEach(lesson => ids.add(lesson.lessonId));
      }
    });
  });
  return Array.from(ids);
};

// Export helper function to get all topics
export const getAllTopics = () => {
  const topics = [];
  Object.values(GRAMMAR_DATA).forEach(level => {
    Object.values(level.topics).forEach(topic => {
      topics.push(topic);
    });
  });
  return topics;
};

// Export helper function to search lessons
export const searchLessons = (keyword) => {
  const results = [];
  Object.values(GRAMMAR_DATA).forEach(level => {
    Object.values(level.topics).forEach(topic => {
      if (topic.title.toLowerCase().includes(keyword.toLowerCase()) ||
          topic.description.toLowerCase().includes(keyword.toLowerCase())) {
        results.push(topic);
      }
      topic.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({ ...topic, lesson });
        }
      });
    });
  });
  return results;
};

// Export helper to get exercises by difficulty
export const getExercisesByDifficulty = (topic, difficulty) => {
  return topic.exercises.filter(ex => ex.difficulty === difficulty);
};

// Quiz data structure for testing multiple topics
export const GRAMMAR_QUIZZES = [
  {
    quizId: 'quiz_beginner_1',
    title: 'Beginner Grammar Quiz - Present Tenses (Bài Kiểm Tra Ngữ Pháp Người Mới - Các Thì Hiện Tại)',
    difficulty: 'Beginner',
    duration: 20,
    passingScore: 70,
    topics: ['present_simple', 'present_continuous'],
    questions: [
      {
        id: 'q1',
        question: 'She _____ in a hospital. (Cô ấy _____ trong bệnh viện.)',
        type: 'multiple_choice',
        options: [
          { text: 'work', isCorrect: false },
          { text: 'works', isCorrect: true },
          { text: 'is working', isCorrect: false },
          { text: 'worked', isCorrect: false },
        ],
        explanation: 'Third person singular present simple needs -s: works (Ngôi thứ ba số ít thì hiện tại đơn cần -s: works)',
      },
      {
        id: 'q2',
        question: 'What are they doing right now? (Họ đang làm gì ngay bây giờ?)',
        type: 'multiple_choice',
        options: [
          { text: 'study', isCorrect: false },
          { text: 'studies', isCorrect: false },
          { text: 'studying', isCorrect: true },
          { text: 'studied', isCorrect: false },
        ],
        explanation: 'Present continuous for current action: are + studying (Hiện tại tiếp diễn cho hành động hiện tại: are + studying)',
      },
    ],
  },
  {
    quizId: 'quiz_intermediate_1',
    title: 'Intermediate Quiz - Perfect Tenses & Modals (Bài Kiểm Tra Trung Cấp - Các Thì Hoàn Thành & Modal)',
    difficulty: 'Intermediate',
    duration: 30,
    passingScore: 75,
    topics: ['present_perfect', 'modals'],
    questions: [
      {
        id: 'q1',
        question: 'I _____ to Paris three times in my life. (Tôi _____ đến Paris ba lần trong đời.)',
        type: 'multiple_choice',
        options: [
          { text: 'have been', isCorrect: true },
          { text: 'went', isCorrect: false },
          { text: 'am going', isCorrect: false },
          { text: 'was', isCorrect: false },
        ],
        explanation: 'Present perfect for life experiences: have + been (Hiện tại hoàn thành cho kinh nghiệm cuộc sống: have + been)',
      },
      {
        id: 'q2',
        question: 'You _____ eat in the library. It\'s against the rules. (Bạn _____ ăn trong thư viện. Điều này vi phạm quy định.)',
        type: 'multiple_choice',
        options: [
          { text: 'can', isCorrect: false },
          { text: 'could', isCorrect: false },
          { text: 'mustn\'t', isCorrect: true },
          { text: 'don\'t have to', isCorrect: false },
        ],
        explanation: 'Prohibition/rules: mustn\'t (Cấm đoán/quy tắc: mustn\'t)',
      },
    ],
  },
  {
    quizId: 'quiz_advanced_1',
    title: 'Advanced Quiz - Passive Voice & Reported Speech (Bài Kiểm Tra Nâng Cấp - Câu Thụ Động & Câu Gián Tiếp)',
    difficulty: 'Advanced',
    duration: 40,
    passingScore: 80,
    topics: ['passive_voice', 'reported_speech'],
    questions: [
      {
        id: 'q1',
        question: 'The project _____ by the team leader last week. (Dự án _____ bởi trưởng nhóm tuần trước.)',
        type: 'multiple_choice',
        options: [
          { text: 'was completed', isCorrect: true },
          { text: 'has been completed', isCorrect: false },
          { text: 'was being completed', isCorrect: false },
          { text: 'completed', isCorrect: false },
        ],
        explanation: 'Past simple passive: was + past participle (Quá khứ đơn thụ động: was + phân từ quá khứ)',
      },
      {
        id: 'q2',
        question: 'She said she _____ the movie yesterday. (Cô ấy nói cô ấy _____ bộ phim hôm qua.)',
        type: 'multiple_choice',
        options: [
          { text: 'has watched', isCorrect: false },
          { text: 'had watched', isCorrect: true },
          { text: 'watched', isCorrect: false },
          { text: 'watch', isCorrect: false },
        ],
        explanation: 'Reported speech: past simple becomes past perfect (Câu gián tiếp: quá khứ đơn trở thành quá khứ hoàn thành)',
      },
    ],
  },
];

// Progress tracking data structure
export const GRAMMAR_PROGRESS_TEMPLATE = {
  userId: '',
  completedLessons: [],
  completedExercises: [],
  quizScores: [],
  topicProgress: {}, // topicId: { completed: bool, progress: 0-100 }
  totalPoints: 0,
  level: 'Beginner',
  streak: 0,
  lastAccessDate: null,
};

// Difficulty levels and their characteristics
export const DIFFICULTY_LEVELS = {
  Easy: {
    color: '#10b981', // green
    icon: '⭐',
    description: 'Perfect for beginners (Hoàn hảo cho người mới)',
  },
  Medium: {
    color: '#f59e0b', // amber
    icon: '⭐⭐',
    description: 'Intermediate level (Cấp trung cấp)',
  },
  Hard: {
    color: '#ef4444', // red
    icon: '⭐⭐⭐',
    description: 'Advanced challenges (Thử thách nâng cao)',
  },
};

// Common mistakes and explanations
export const COMMON_MISTAKES = [
  {
    id: 'mistake_1',
    mistake: 'I am go to school.',
    correct: 'I go to school.',
    explanation: 'Don\'t use am/is/are + base verb. Use am/is/are + -ing for present continuous or just base verb for present simple. (Đừng dùng am/is/are + động từ nguyên thể. Dùng am/is/are + -ing cho hiện tại tiếp diễn hoặc chỉ động từ nguyên thể cho hiện tại đơn.)',
    topic: 'present_simple',
  },
  {
    id: 'mistake_2',
    mistake: 'She have completed the work.',
    correct: 'She has completed the work.',
    explanation: 'With third person singular (she, he, it), use "has" not "have". (Với ngôi thứ ba số ít (she, he, it), dùng "has" không phải "have".)',
    topic: 'present_perfect',
  },
  {
    id: 'mistake_3',
    mistake: 'If I would know, I would tell you.',
    correct: 'If I knew, I would tell you.',
    explanation: 'In second conditional (if clause), use past simple, not would + verb. (Trong câu điều kiện loại 2 (mệnh đề if), dùng quá khứ đơn, không phải would + động từ.)',
    topic: 'conditionals',
  },
  {
    id: 'mistake_4',
    mistake: 'I told him to not come.',
    correct: 'I told him not to come.',
    explanation: 'Negative infinitive: not + to + verb (Động từ nguyên thể phủ định: not + to + động từ)',
    topic: 'modals',
  },
  {
    id: 'mistake_5',
    mistake: 'The car was stolen by someone unknown.',
    correct: 'The car was stolen.',
    explanation: 'When agent is unknown or unimportant, omit the "by" phrase. (Khi người làm không rõ hoặc không quan trọng, bỏ cụm "by".)',
    topic: 'passive_voice',
  },
];

// Study tips and strategies
export const STUDY_TIPS = [
  {
    id: 'tip_1',
    title: 'Use Context Clues (Sử dụng Gợi Ý Ngữ Cảnh)',
    description: 'Always look for time expressions (yesterday, now, tomorrow) to determine the correct tense. (Luôn tìm biểu thức thời gian (hôm qua, bây giờ, ngày mai) để xác định thì đúng.)',
    relatedTopics: ['present_simple', 'past_simple', 'future_simple'],
  },
  {
    id: 'tip_2',
    title: 'Practice Conjugation (Luyện Chia Động Từ)',
    description: 'Regular conjugation practice helps internalize verb forms. Create flashcards for irregular verbs. (Luyện chia động từ thường xuyên giúp ghi nhớ dạng động từ. Tạo flashcard cho động từ bất quy tắc.)',
    relatedTopics: ['present_simple', 'past_simple', 'present_perfect'],
  },
  {
    id: 'tip_3',
    title: 'Active to Passive Conversion (Chuyển Từ Chủ Động Sang Thụ Động)',
    description: 'Practice converting sentences from active to passive voice to understand structure better. (Luyện chuyển câu từ chủ động sang thụ động để hiểu cấu trúc tốt hơn.)',
    relatedTopics: ['passive_voice'],
  },
  {
    id: 'tip_4',
    title: 'Dialogue Practice (Luyện Đối Thoại)',
    description: 'Practice reported speech by writing dialogues, then converting them to reported speech. (Luyện câu gián tiếp bằng cách viết đối thoại, sau đó chuyển sang gián tiếp.)',
    relatedTopics: ['reported_speech'],
  },
  {
    id: 'tip_5',
    description: 'Conditional Mind Mapping (Lập Bản Đồ Tư Duy Điều Kiện)',
    description: 'Create a mind map showing when to use each conditional type based on likelihood and time. (Tạo bản đồ tư duy cho thấy khi nào dùng từng loại điều kiện dựa trên khả năng và thời gian.)',
    relatedTopics: ['conditionals'],
  },
];

// Real-world examples for context
export const REAL_WORLD_EXAMPLES = [
  {
    id: 'example_1',
    context: 'Job Interview (Phỏng Vấn Việc Làm)',
    original: 'I work in software development.',
    explanation: 'Present simple for current job/role (Hiện tại đơn cho công việc/hiện tại)',
    topic: 'present_simple',
  },
  {
    id: 'example_2',
    context: 'News Report (Báo Cáo Tin Tức)',
    original: 'The bridge has been damaged by recent floods.',
    explanation: 'Passive voice for factual reporting (Thụ động cho báo cáo sự thật)',
    topic: 'passive_voice',
  },
  {
    id: 'example_3',
    context: 'Chat with Friend (Trò Chuyện Với Bạn)',
    original: 'I\'m writing an email right now.',
    explanation: 'Present continuous for current activity (Hiện tại tiếp diễn cho hoạt động hiện tại)',
    topic: 'present_continuous',
  },
  {
    id: 'example_4',
    context: 'Business Meeting (Cuộc Họp Kinh Doanh)',
    original: 'If we don\'t receive payment by Friday, we\'ll cancel the contract.',
    explanation: 'First conditional for realistic future scenario (Loại 1 cho tình huống tương lai thực tế)',
    topic: 'conditionals',
  },
  {
    id: 'example_5',
    context: 'Academic Writing (Viết Học Thuật)',
    original: 'The rapid development of artificial intelligence has revolutionized industries.',
    explanation: 'Present perfect + nominalization for formal writing (Hiện tại hoàn thành + danh từ hóa cho viết trang trọng)',
    topic: 'present_perfect',
  },
];

export default GRAMMAR_DATA;