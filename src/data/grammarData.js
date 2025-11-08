// grammarData.js - Complete Grammar Learning Data for HUFLIT

export const GRAMMAR_DATA = {
  // ===== BEGINNER LEVEL =====
  beginner: {
    level: 'Beginner',
    description: 'Foundation grammar topics for beginners',
    topics: {
      // Topic 1: Present Simple
      presentSimple: {
        id: 'present_simple',
        title: 'Present Simple Tense',
        difficulty: 'Beginner',
        icon: '⏰',
        description: 'Learn how to form and use the simple present tense',
        lessons: [
          {
            lessonId: 'ps_001',
            title: 'Introduction to Present Simple',
            duration: '8 mins',
            content: `
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
            `,
            examples: [
              { example: 'I wake up at 7 AM every day.', explanation: 'Regular daily habit' },
              { example: 'She works in a bank.', explanation: 'Current occupation' },
              { example: 'Water boils at 100°C.', explanation: 'Scientific fact' },
              { example: 'They go to school on weekdays.', explanation: 'Routine activity' },
            ],
          },
          {
            lessonId: 'ps_002',
            title: 'Present Simple - Affirmative & Negative',
            duration: '10 mins',
            content: `
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
            `,
            examples: [
              { example: 'She studies French.', explanation: 'consonant + y → ies' },
              { example: 'He watches TV.', explanation: 'ends in -ch → add -es' },
              { example: 'I don\'t like spicy food.', explanation: 'Negative: don\'t + base verb' },
              { example: 'They don\'t work on Sundays.', explanation: 'Plural negative' },
            ],
          },
          {
            lessonId: 'ps_003',
            title: 'Present Simple - Questions',
            duration: '9 mins',
            content: `
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
            `,
            examples: [
              { example: 'Do they play tennis?', explanation: 'Yes/No question with do' },
              { example: 'Does your mother cook?', explanation: 'Yes/No question with does' },
              { example: 'What time do you wake up?', explanation: 'Information question' },
              { example: 'How often does she exercise?', explanation: 'Frequency question' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'ps_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'I _____ to school every day.',
            options: [
              { text: 'go', isCorrect: true, explanation: 'Base verb form for first person' },
              { text: 'goes', isCorrect: false, explanation: 'Used only with third person singular (he/she/it)' },
              { text: 'going', isCorrect: false, explanation: 'This is present progressive, not present simple' },
              { text: 'am go', isCorrect: false, explanation: 'Incorrect grammar' },
            ],
          },
          {
            exerciseId: 'ps_ex_002',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'She _____ like vegetables.',
            options: [
              { text: 'does not', isCorrect: true, explanation: 'Correct negative form' },
              { text: 'do not', isCorrect: false, explanation: 'Used with plural subjects' },
              { text: 'not like', isCorrect: false, explanation: 'Incomplete negative' },
              { text: 'is not', isCorrect: false, explanation: 'Wrong auxiliary verb' },
            ],
          },
          {
            exerciseId: 'ps_ex_003',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'My brother _____ (work) in a hospital.',
            correctAnswer: 'works',
            hints: ['Think about third person singular', 'Add -s to the verb'],
            explanation: 'With third person singular subject (he/she/it), add -s to the base verb',
          },
          {
            exerciseId: 'ps_ex_004',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'What time _____ you finish work?',
            options: [
              { text: 'do', isCorrect: true, explanation: 'Question form with do' },
              { text: 'does', isCorrect: false, explanation: 'Does is used with he/she/it' },
              { text: 'are', isCorrect: false, explanation: 'Wrong auxiliary' },
              { text: 'will', isCorrect: false, explanation: 'This is for future tense' },
            ],
          },
          {
            exerciseId: 'ps_ex_005',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'They _____ (not/watch) TV during dinner.',
            correctAnswer: 'don\'t watch',
            hints: ['Use do/does for negative', 'Remember plural subjects use do'],
            explanation: 'Plural subjects use "don\'t" + base verb in negative form',
          },
        ],
        vocabulary: [
          { word: 'habit', meaning: 'A regular or repeated behavior', example: 'Reading is my daily habit.' },
          { word: 'routine', meaning: 'A set of regular activities', example: 'Morning routine includes breakfast.' },
          { word: 'frequency', meaning: 'How often something happens', example: 'How is the frequency of your exercise?' },
          { word: 'occur', meaning: 'To happen', example: 'This problem occurs frequently.' },
        ],
      },

      // Topic 2: Present Continuous
      presentContinuous: {
        id: 'present_continuous',
        title: 'Present Continuous Tense',
        difficulty: 'Beginner',
        icon: '🔄',
        description: 'Learn actions happening right now',
        lessons: [
          {
            lessonId: 'pc_001',
            title: 'Introduction to Present Continuous',
            duration: '8 mins',
            content: `
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
              Positive: Am/Is/Are + Subject + verb-ing?
            `,
            examples: [
              { example: 'I am studying English right now.', explanation: 'Action in progress now' },
              { example: 'She is playing tennis at the moment.', explanation: 'Happening currently' },
              { example: 'They are not watching the movie.', explanation: 'Negative form' },
              { example: 'Is he sleeping?', explanation: 'Question form' },
            ],
          },
          {
            lessonId: 'pc_002',
            title: 'Verb-ing Forms & Spelling Rules',
            duration: '10 mins',
            content: `
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
            `,
            examples: [
              { example: 'run → running', explanation: 'Double consonant rule (CVC)' },
              { example: 'make → making', explanation: 'Remove silent e' },
              { example: 'work → working', explanation: 'No doubling needed' },
              { example: 'swim → swimming', explanation: 'Double m rule' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pc_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'She _____ TV right now.',
            options: [
              { text: 'is watching', isCorrect: true, explanation: 'Correct present continuous form' },
              { text: 'watches', isCorrect: false, explanation: 'This is simple present' },
              { text: 'is watch', isCorrect: false, explanation: 'Missing -ing' },
              { text: 'are watching', isCorrect: false, explanation: 'Wrong form of be' },
            ],
          },
          {
            exerciseId: 'pc_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'They are _____ (swim) in the pool.',
            correctAnswer: 'swimming',
            hints: ['Remember the CVC rule', 'Double the m'],
            explanation: 'swim → swimming (double the final consonant before adding -ing)',
          },
        ],
        vocabulary: [
          { word: 'temporary', meaning: 'Lasting for a short time', example: 'This is a temporary job.' },
          { word: 'progress', meaning: 'Movement towards completion', example: 'Work in progress.' },
        ],
      },

      // Topic 3: Past Simple
      pastSimple: {
        id: 'past_simple',
        title: 'Past Simple Tense',
        difficulty: 'Beginner',
        icon: '⏳',
        description: 'Talk about completed past actions',
        lessons: [
          {
            lessonId: 'ps_past_001',
            title: 'Introduction to Past Simple',
            duration: '9 mins',
            content: `
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
            `,
            examples: [
              { example: 'I played football yesterday.', explanation: 'Regular past simple' },
              { example: 'She went to Paris last month.', explanation: 'Irregular verb' },
              { example: 'They did not come to the party.', explanation: 'Negative past' },
              { example: 'Did you see the movie?', explanation: 'Question form' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'ps_past_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'Last weekend, I _____ to the beach.',
            options: [
              { text: 'went', isCorrect: true, explanation: 'Irregular past of go' },
              { text: 'go', isCorrect: false, explanation: 'This is present tense' },
              { text: 'going', isCorrect: false, explanation: 'This is present continuous' },
              { text: 'gone', isCorrect: false, explanation: 'This is past participle' },
            ],
          },
        ],
        vocabulary: [
          { word: 'completed', meaning: 'Finished', example: 'The project is completed.' },
          { word: 'yesterday', meaning: 'The day before today', example: 'I saw him yesterday.' },
        ],
      },

      // Topic 4: Future Simple (will)
      futureSimple: {
        id: 'future_simple',
        title: 'Future Simple - Will',
        difficulty: 'Beginner',
        icon: '🔮',
        description: 'Talk about future actions and predictions',
        lessons: [
          {
            lessonId: 'fs_001',
            title: 'Introduction to Future Simple',
            duration: '8 mins',
            content: `
              Will is used for:
              - Predictions about the future
              - Decisions made at the moment
              - Promises and offers
              - General truths about the future
              
              Form: Subject + will + base verb
              I will go, she will study, they will help
              
              Negative: Subject + will + not + base verb
              I will not go (I won't go)
              
              Question: Will + Subject + base verb?
              Will you help me?
            `,
            examples: [
              { example: 'It will rain tomorrow.', explanation: 'Prediction' },
              { example: 'I will call you later.', explanation: 'Decision' },
              { example: 'She won\'t forget you.', explanation: 'Promise/negative' },
              { example: 'Will they arrive on time?', explanation: 'Question' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'fs_ex_001',
            type: 'multiple_choice',
            difficulty: 'Easy',
            question: 'I _____ you tomorrow.',
            options: [
              { text: 'will see', isCorrect: true, explanation: 'Future simple with will' },
              { text: 'see', isCorrect: false, explanation: 'This is present simple' },
              { text: 'saw', isCorrect: false, explanation: 'This is past simple' },
              { text: 'am seeing', isCorrect: false, explanation: 'This is present continuous' },
            ],
          },
        ],
      },
    },
  },

  // ===== INTERMEDIATE LEVEL =====
  intermediate: {
    level: 'Intermediate',
    description: 'Intermediate grammar topics for building fluency',
    topics: {
      // Topic 1: Present Perfect
      presentPerfect: {
        id: 'present_perfect',
        title: 'Present Perfect Tense',
        difficulty: 'Intermediate',
        icon: '✨',
        description: 'Connect past actions with the present',
        lessons: [
          {
            lessonId: 'pf_001',
            title: 'Introduction to Present Perfect',
            duration: '10 mins',
            content: `
              Present Perfect connects past and present:
              
              Used for:
              - Recent past actions with present relevance
              - Life experiences (have you ever...?)
              - Changes over time
              - Actions that started in past, continue now
              
              Form: have/has + past participle
              I have seen, he has gone, they have studied
              
              Regular verbs: -ed form (played, worked)
              Irregular verbs: Special form (go→gone, eat→eaten, see→seen)
              
              Negative: have/has + not + past participle
              He has not finished (hasn't finished)
              
              Question: Have/Has + Subject + past participle?
              Have you finished? Has she arrived?
            `,
            examples: [
              { example: 'I have lived here for 5 years.', explanation: 'Action started in past, continues' },
              { example: 'She has never been to Japan.', explanation: 'Life experience' },
              { example: 'They have already eaten lunch.', explanation: 'Recent past action' },
              { example: 'Have you finished your homework?', explanation: 'Question form' },
            ],
          },
          {
            lessonId: 'pf_002',
            title: 'Present Perfect vs Simple Past',
            duration: '11 mins',
            content: `
              Key Differences:
              
              Present Perfect (have + past participle):
              - Used for recent past or life experiences
              - No specific time is mentioned (or recently)
              - Impact on present is important
              
              Simple Past (regular -ed):
              - Used for completed past actions
              - Specific time is mentioned (yesterday, last year, ago)
              - Focus on when it happened
              
              Examples:
              Present Perfect: I have lost my keys. (Looking for them now)
              Simple Past: I lost my keys yesterday. (Specific time given)
              
              Present Perfect: She has visited Paris. (Life experience)
              Simple Past: She visited Paris in 2019. (When = important)
              
              Time expressions:
              Present Perfect: just, recently, already, yet, for, since, ever, never
              Simple Past: yesterday, last week, 10 years ago, in 2020, at 3 PM
            `,
            examples: [
              { example: 'I have seen that movie. (General - no time)', explanation: 'Life experience' },
              { example: 'I saw that movie last week. (Specific time)', explanation: 'When is important' },
              { example: 'She has just arrived. (Recent)', explanation: 'Just = recently' },
              { example: 'They have worked here since 2015. (Duration)', explanation: 'For/since: duration' },
            ],
          },
          {
            lessonId: 'pf_003',
            title: 'Irregular Past Participles',
            duration: '12 mins',
            content: `
              Common Irregular Verbs:
              
              go → gone
              come → come
              eat → eaten
              see → seen
              drink → drunk
              write → written
              give → given
              take → taken
              make → made
              break → broken
              choose → chosen
              do → done
              have → had
              know → known
              meet → met
              pay → paid
              read → read
              run → run
              say → said
              send → sent
              speak → spoken
              spend → spent
              steal → stolen
              swim → swum
              teach → taught
              think → thought
              understand → understood
              wear → worn
              win → won
            `,
            examples: [
              { example: 'I have written a letter.', explanation: 'write → written' },
              { example: 'She has broken her arm.', explanation: 'break → broken' },
              { example: 'They have taken the exam.', explanation: 'take → taken' },
              { example: 'He has never been to Australia.', explanation: 'be → been' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pf_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'I _____ to three countries so far.',
            options: [
              { text: 'have been', isCorrect: true, explanation: 'Present perfect for life experience' },
              { text: 'went', isCorrect: false, explanation: 'Simple past - would need specific dates' },
              { text: 'am going', isCorrect: false, explanation: 'This is future/present continuous' },
              { text: 'will go', isCorrect: false, explanation: 'This is future' },
            ],
          },
          {
            exerciseId: 'pf_ex_002',
            type: 'fill_blank',
            difficulty: 'Medium',
            question: 'She _____ (finish) her project yet?',
            correctAnswer: 'has finished',
            hints: ['Use present perfect for recent past', 'With "yet" use have/has'],
            explanation: 'Present perfect: has + past participle. "Yet" indicates incomplete until now.',
          },
        ],
      },

      // Topic 2: Past Perfect
      pastPerfect: {
        id: 'past_perfect',
        title: 'Past Perfect Tense',
        difficulty: 'Intermediate',
        icon: '⏲️',
        description: 'Show which past action happened first',
        lessons: [
          {
            lessonId: 'pp_001',
            title: 'Introduction to Past Perfect',
            duration: '10 mins',
            content: `
              Past Perfect shows sequence of two past events:
              Which happened FIRST?
              
              Form: had + past participle
              I had eaten, she had gone, they had studied
              
              Used for:
              - Action completed before another past action
              - Reported speech (said that he had...)
              - Result of a past action
              
              Timeline:
              Event 1 (earlier) → had + past participle
              Event 2 (later) → simple past
              
              Example:
              When I arrived, she had already left.
              (She left first → had left)
              (I arrived second → arrived)
            `,
            examples: [
              { example: 'By the time he arrived, I had finished the work.', explanation: 'I finished first' },
              { example: 'She said she had never seen him before.', explanation: 'Reported speech' },
              { example: 'After they had eaten, they went for a walk.', explanation: 'Eat first, walk second' },
              { example: 'The train had left before we got to the station.', explanation: 'Train left first' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pp_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'By the time I called, they _____ the movie.',
            options: [
              { text: 'had finished', isCorrect: true, explanation: 'First action in past perfect' },
              { text: 'finished', isCorrect: false, explanation: 'Simple past doesn\'t show sequence' },
              { text: 'have finished', isCorrect: false, explanation: 'Present perfect is for recent past' },
              { text: 'are finishing', isCorrect: false, explanation: 'Present continuous' },
            ],
          },
        ],
      },

      // Topic 3: Modals (Can, Could, May, Might, Must, Should, Would)
      modals: {
        id: 'modals',
        title: 'Modal Verbs',
        difficulty: 'Intermediate',
        icon: '🔑',
        description: 'Express ability, permission, obligation, and possibility',
        lessons: [
          {
            lessonId: 'mod_001',
            title: 'Introduction to Modal Verbs',
            duration: '12 mins',
            content: `
              Modal verbs show:
              1. ABILITY: can, could
              2. PERMISSION: can, could, may
              3. POSSIBILITY: may, might, could
              4. OBLIGATION/NECESSITY: must, have to, should
              5. ADVICE: should, ought to
              6. PREFERENCE: would, would rather
              
              Form: Modal + base verb (NO -ing, -ed, or -s)
              I can speak, she could run, they must go
              
              ABILITY (Present/Past):
              - can: I can swim. (Present ability)
              - could: I could swim when I was young. (Past ability)
              
              PERMISSION:
              - can: Can I use your phone?
              - could: Could I borrow your pen?
              - may: May I ask a question? (Formal)
              
              POSSIBILITY:
              - may: It may rain tomorrow.
              - might: She might come to the party.
              - could: You could be right.
              
              OBLIGATION/NECESSITY:
              - must: You must wear a seatbelt. (Strong obligation)
              - have to: I have to go to work. (External obligation)
              - should: You should eat healthily. (Advice/recommendation)
              
              PREFERENCE:
              - would: I would like tea.
              - would rather: I would rather stay home.
            `,
            examples: [
              { example: 'Can you swim?', explanation: 'Ability question' },
              { example: 'May I come in?', explanation: 'Polite permission request' },
              { example: 'You should study harder.', explanation: 'Advice' },
              { example: 'It might rain tomorrow.', explanation: 'Possibility' },
              { example: 'She must be at work.', explanation: 'Deduction/certainty' },
              { example: 'I have to finish this by 5 PM.', explanation: 'External obligation' },
            ],
          },
          {
            lessonId: 'mod_002',
            title: 'Modal Verbs - Negative & Questions',
            duration: '10 mins',
            content: `
              NEGATIVES:
              can't, couldn't, mustn't, shouldn't, wouldn't
              
              Examples:
              - I can't swim. (No ability)
              - You shouldn't smoke. (Advice against)
              - You mustn't enter. (Prohibition - strong)
              - She wouldn't say that. (Unwilling)
              
              QUESTIONS:
              Can you...? Could you...? May I...? Would you...?
              
              Example responses:
              Q: Can you help me?
              A: Yes, I can. / No, I can't.
              
              Q: Would you like coffee?
              A: Yes, I would. / No, I wouldn't.
              
              MUST vs HAVE TO vs SHOULD:
              
              MUST (internal obligation):
              I must quit smoking. (Personal decision)
              You mustn't be late. (Rules)
              
              HAVE TO (external obligation):
              I have to work tomorrow. (External requirement)
              He has to attend the meeting. (Boss says so)
              
              SHOULD (advice/recommendation):
              You should see a doctor. (I recommend)
              She should study more. (Not strict, just advice)
            `,
            examples: [
              { example: 'Can\'t you help me?', explanation: 'Negative question' },
              { example: 'You mustn\'t tell anyone.', explanation: 'Prohibition' },
              { example: 'I have to leave now.', explanation: 'External obligation' },
              { example: 'Would you prefer tea or coffee?', explanation: 'Polite question' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'mod_ex_001',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'You _____ eat in the library. It\'s against the rules.',
            options: [
              { text: 'mustn\'t', isCorrect: true, explanation: 'Prohibition - rules' },
              { text: 'don\'t have to', isCorrect: false, explanation: 'No obligation, but mustn\'t is prohibition' },
              { text: 'shouldn\'t', isCorrect: false, explanation: 'Advice, but mustn\'t shows rules' },
              { text: 'won\'t', isCorrect: false, explanation: 'Future, doesn\'t show prohibition' },
            ],
          },
          {
            exerciseId: 'mod_ex_002',
            type: 'multiple_choice',
            difficulty: 'Medium',
            question: 'I _____ go to the dentist next week.',
            options: [
              { text: 'have to', isCorrect: true, explanation: 'External obligation - appointment' },
              { text: 'should', isCorrect: false, explanation: 'Advice, not firm obligation' },
              { text: 'might', isCorrect: false, explanation: 'Possibility, not obligation' },
              { text: 'could', isCorrect: false, explanation: 'Ability, not obligation' },
            ],
          },
        ],
        vocabulary: [
          { word: 'prohibition', meaning: 'Not allowed', example: 'Parking prohibition in this area.' },
          { word: 'obligation', meaning: 'Something you must do', example: 'It\'s an obligation to pay taxes.' },
          { word: 'permission', meaning: 'Allowed to do something', example: 'You have permission to leave.' },
          { word: 'deduction', meaning: 'Conclusion based on evidence', example: 'He must be tired (deduction).' },
        ],
      },

      // Topic 4: Conditionals (If/Unless)
      conditionals: {
        id: 'conditionals',
        title: 'Conditional Sentences',
        difficulty: 'Intermediate',
        icon: '🔀',
        description: 'Express hypothetical situations and consequences',
        lessons: [
          {
            lessonId: 'cond_001',
            title: 'Zero, First, and Second Conditionals',
            duration: '13 mins',
            content: `
              CONDITIONAL TYPES:
              
              ZERO CONDITIONAL (General truths):
              If/When + present simple, present simple
              If you heat water to 100°C, it boils.
              When you press this button, the light turns on.
              (Always true)
              
              FIRST CONDITIONAL (Possible future):
              If + present simple, will + base verb
              If it rains tomorrow, I will stay home.
              If you study hard, you will pass the exam.
              (Likely to happen)
              
              SECOND CONDITIONAL (Hypothetical/Unlikely):
              If + past simple, would + base verb
              If I won the lottery, I would travel the world.
              If she studied harder, she would pass.
              (Unlikely or impossible now, imagination)
              
              Note: With "be" in if clause, use "were"
              If I were you, I would accept the job.
              If she were here, she would help.
              
              UNLESS (= if not):
              Unless + affirmative, affirmative
              I will go unless it rains.
              (= I will go if it doesn't rain)
              
              Unless you study, you won't pass.
              (= If you don't study, you won't pass)
            `,
            examples: [
              { example: 'If you mix red and blue, you get purple.', explanation: 'Zero conditional - fact' },
              { example: 'If you see Tom, tell him to call me.', explanation: 'First conditional - likely' },
              { example: 'If I were a bird, I would fly to Paris.', explanation: 'Second conditional - imagination' },
              { example: 'Unless you apologize, he won\'t forgive you.', explanation: 'Unless = if not' },
            ],
          },
          {
            lessonId: 'cond_002',
            title: 'Third Conditional & Mixed Conditionals',
            duration: '12 mins',
            content: `
              THIRD CONDITIONAL (Past - impossible):
              If + had + past participle, would have + past participle
              If I had studied, I would have passed the exam.
              If she had known, she would have called.
              (Impossible - talking about past)
              
              Uses:
              - Regret: If only I had known!
              - Criticism: If you had listened, this wouldn't have happened.
              - Speculation: If they had arrived earlier, they would have seen the show.
              
              MIXED CONDITIONALS (Mix tenses):
              
              Type A: Present result of past condition
              If + had + past participle, would + base verb (now)
              If I had studied medicine, I would be a doctor now.
              (I didn't study, so I'm not a doctor)
              
              If she had married him, she would live in London now.
              (She didn't marry, so she doesn't live there)
              
              Type B: Past result of present condition
              If + past simple, would have + past participle (past)
              If you were more careful, you wouldn't have broken the vase.
              (You're careless - that's why you broke it)
              
              If she worked harder, she would have passed yesterday.
              (She's lazy, so didn't pass)
              
              SUMMARY TABLE:
              
              Zero:    If + present, present (facts)
              First:   If + present, will (likely future)
              Second:  If + past, would (unlikely/imagination)
              Third:   If + had + past participle, would have (impossible past)
              Mixed:   Combinations of above
            `,
            examples: [
              { example: 'If I had known the truth, I wouldn\'t be angry now.', explanation: 'Mixed - past condition, present result' },
              { example: 'If you had arrived on time, we would have watched the movie.', explanation: 'Third conditional - impossible past' },
              { example: 'I would help you if I had the money.', explanation: 'Mixed - present condition, would help' },
              { example: 'If only they had listened!', explanation: 'Third conditional - regret' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'cond_ex_001',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'If I _____ you were coming, I would have prepared dinner.',
            options: [
              { text: 'had known', isCorrect: true, explanation: 'Third conditional - if + had + past participle' },
              { text: 'knew', isCorrect: false, explanation: 'Second conditional - not for past regret' },
              { text: 'would know', isCorrect: false, explanation: 'Wrong structure' },
              { text: 'have known', isCorrect: false, explanation: 'Present perfect, not past condition' },
            ],
          },
          {
            exerciseId: 'cond_ex_002',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'If you _____ (not/be) late, we would have caught the train.',
            correctAnswer: 'hadn\'t been',
            hints: ['Third conditional for past', 'Negative: had + not + been'],
            explanation: 'Third conditional negative: If + had not + past participle',
          },
        ],
      },
    },
  },

  // ===== ADVANCED LEVEL =====
  advanced: {
    level: 'Advanced',
    description: 'Advanced grammar topics for mastery',
    topics: {
      // Topic 1: Reported Speech
      reportedSpeech: {
        id: 'reported_speech',
        title: 'Reported Speech (Indirect Speech)',
        difficulty: 'Advanced',
        icon: '💬',
        description: 'Report what someone said without using direct quotes',
        lessons: [
          {
            lessonId: 'rs_001',
            title: 'Introduction to Reported Speech',
            duration: '14 mins',
            content: `
              DIRECT SPEECH vs REPORTED SPEECH:
              
              Direct: "I am hungry," she said.
              Reported: She said she was hungry.
              
              TENSE SHIFTS (Backshift):
              When the reporting verb is past tense:
              
              Direct Present Simple → Reported Past Simple
              "I work here." → He said he worked there.
              
              Direct Present Continuous → Reported Past Continuous
              "I am studying." → She said she was studying.
              
              Direct Present Perfect → Reported Past Perfect
              "I have finished." → They said they had finished.
              
              Direct Past Simple → Reported Past Perfect
              "I went yesterday." → He said he had gone.
              
              Direct Future (will) → Reported Conditional (would)
              "I will come." → She said she would come.
              
              Direct Past Perfect → No change
              "I had eaten." → He said he had eaten.
              
              TIME/PLACE SHIFTS:
              Direct → Reported
              now → then
              today → that day
              yesterday → the day before
              tomorrow → the next day/the following day
              here → there
              this → that
              
              Examples:
              Direct: "I was here yesterday," she said.
              Reported: She said she had been there the day before.
              
              Direct: "I will see you tomorrow," he said.
              Reported: He said he would see me the next day.
            `,
            examples: [
              { example: '"I love this place." → He said he loved that place.', explanation: 'Present simple → Past simple, this → that' },
              { example: '"She is working now." → He said she was working then.', explanation: 'Present continuous → Past continuous' },
              { example: '"They will arrive today." → He said they would arrive that day.', explanation: 'will → would, today → that day' },
              { example: '"I have completed it." → She said she had completed it.', explanation: 'Present perfect → Past perfect' },
            ],
          },
          {
            lessonId: 'rs_002',
            title: 'Reported Questions & Commands',
            duration: '12 mins',
            content: `
              REPORTED QUESTIONS:
              
              Form: say/tell + question word + if/whether + statement word order
              (NOT question word order)
              
              Yes/No Questions:
              Direct: "Do you speak English?" he asked.
              Reported: He asked if/whether I spoke English.
              
              Direct: "Will you help me?" she asked.
              Reported: She asked if/whether I would help her.
              
              Question Word Questions:
              Direct: "What time is it?" he asked.
              Reported: He asked what time it was.
              
              Direct: "Where do you live?" she asked.
              Reported: She asked where I lived.
              
              Direct: "How many books have you read?" he asked.
              Reported: He asked how many books I had read.
              
              Important: Use statement word order, not question word order!
              ✓ He asked where I lived. (lived after where)
              ✗ He asked where did I live.
              
              REPORTED COMMANDS:
              
              Use: tell/ask + (not) + to + infinitive
              
              Direct: "Come here!" he said.
              Reported: He told me to come there.
              
              Direct: "Don't be late!" she said.
              Reported: She told him not to be late.
              
              Direct: "Open the window!" they said.
              Reported: They asked me to open the window.
              
              Positive command: Subject + tell/ask + object + to + verb
              Negative command: Subject + tell/ask + object + not + to + verb
            `,
            examples: [
              { example: '"Are you ready?" → He asked if I was ready.', explanation: 'Yes/No question with if' },
              { example: '"Why didn\'t you call?" → She asked why I hadn\'t called.', explanation: 'Question word with statement order' },
              { example: '"Sit down!" → He told me to sit down.', explanation: 'Command with to infinitive' },
              { example: '"Don\'t go!" → She asked him not to go.', explanation: 'Negative command' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'rs_ex_001',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: '"I am working on a new project," she said. → She said she _____ on a new project.',
            correctAnswer: 'was working',
            hints: ['Present continuous → past continuous', 'am working → was working'],
            explanation: 'In reported speech, present continuous shifts to past continuous when the reporting verb is past.',
          },
          {
            exerciseId: 'rs_ex_002',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: '"Where did you go yesterday?" he asked. → He asked _____ yesterday.',
            options: [
              { text: 'where I had gone', isCorrect: true, explanation: 'Question word + statement word order + past perfect' },
              { text: 'where did I go', isCorrect: false, explanation: 'Wrong - don\'t use question word order in reported speech' },
              { text: 'if I went', isCorrect: false, explanation: 'Use question word (where), not if' },
              { text: 'what I went', isCorrect: false, explanation: 'Wrong question word' },
            ],
          },
        ],
      },

      // Topic 2: Relative Clauses
      relativeClauses: {
        id: 'relative_clauses',
        title: 'Relative Clauses',
        difficulty: 'Advanced',
        icon: '🔗',
        description: 'Combine sentences using who, which, that, where',
        lessons: [
          {
            lessonId: 'rel_001',
            title: 'Defining Relative Clauses',
            duration: '13 mins',
            content: `
              RELATIVE CLAUSES:
              A clause that gives more information about a noun.
              
              RELATIVE PRONOUNS:
              
              WHO - for people
              "The man who called me was my uncle."
              "Students who study hard pass exams."
              
              WHICH - for things/animals
              "The book which I read was interesting."
              "Cars which use electric batteries are eco-friendly."
              
              WHOSE - possessive for people and things
              "The student whose project won was very happy."
              "The house whose owner is rich has a big garden."
              
              THAT - for people, things, animals (informal)
              "The person that helped me was kind."
              "The car that I bought is reliable."
              
              WHERE - for places
              "The restaurant where we ate was expensive."
              "The city where I was born is beautiful."
              
              WHEN - for time
              "The day when I arrived was sunny."
              "The time when I left was 8 PM."
              
              DEFINING vs NON-DEFINING:
              
              DEFINING (Essential information - NO COMMAS):
              "The student who scored highest won a prize."
              (Which student? The one who scored highest)
              
              "I like the shirt that my sister gave me."
              (Which shirt? The one my sister gave)
              
              NON-DEFINING (Extra information - WITH COMMAS):
              "My friend John, who is a doctor, loves traveling."
              (We already know who John is - extra info)
              
              "The Eiffel Tower, which is in Paris, was built in 1889."
              (We know what it is - extra historical info)
              
              Note: In non-defining clauses:
              - CANNOT use "that"
              - CANNOT omit the relative pronoun
              - Use commas (which, who, whose, where, when)
              
              OMITTING RELATIVE PRONOUNS (Defining clauses only):
              
              Can omit when it's the OBJECT:
              "The book (that) I read was good." ✓ (can omit)
              "The girl (who) I met was nice." ✓ (can omit)
              
              CANNOT omit when it's the SUBJECT:
              "The book that is on the table is mine." ✗ (cannot omit)
              "The man who lives here is my neighbor." ✗ (cannot omit)
            `,
            examples: [
              { example: 'The woman who teaches English is very kind.', explanation: 'WHO - subject of clause' },
              { example: 'The movie which I watched yesterday was great.', explanation: 'WHICH - object (can omit "which")' },
              { example: 'The house where I grew up is still there.', explanation: 'WHERE - for locations' },
              { example: 'The student whose exam was excellent received praise.', explanation: 'WHOSE - possessive' },
              { example: 'My brother, who lives in Tokyo, visits us every summer.', explanation: 'NON-DEFINING - extra info with commas' },
            ],
          },
          {
            lessonId: 'rel_002',
            title: 'Complex Relative Clause Patterns',
            duration: '11 mins',
            content: `
              PREPOSITIONS + RELATIVE PRONOUNS:
              
              Formal (with preposition at beginning):
              "The person to whom I spoke was helpful."
              "The book in which he wrote notes is lost."
              "The reason for which she left is unknown."
              
              Informal (with preposition at end):
              "The person I spoke to was helpful."
              "The book he wrote notes in is lost."
              "The reason she left for is unknown."
              
              WHOSE vs OF WHICH:
              
              People: whose
              "The teacher whose class is interesting..."
              
              Things: whose OR of which
              "The building whose windows are broken..." = 
              "The building, the windows of which are broken..."
              
              RELATIVE CLAUSES WITH "WHAT":
              
              "What" is NOT a relative pronoun in the traditional sense.
              Used for something indefinite:
              
              "I don't understand what he meant." (= the thing that)
              "What you said is not true." (= the thing that)
              "I'll do whatever you ask." (= anything that)
              
              REDUCED RELATIVE CLAUSES:
              
              Option 1: Omit relative pronoun + auxiliary
              "The book (that) is on the table" → "The book on the table"
              "The girl (who) is wearing a red dress" → "The girl wearing a red dress"
              
              Option 2: Use -ed form (passive)
              "The man (who) was injured in the accident" → "The man injured in the accident"
              "The package (which) was delivered yesterday" → "The package delivered yesterday"
            `,
            examples: [
              { example: 'The friend to whom I told the secret betrayed me.', explanation: 'Formal - preposition at beginning' },
              { example: 'The friend (that) I told the secret to betrayed me.', explanation: 'Informal - preposition at end' },
              { example: 'The students wearing uniforms are from our school.', explanation: 'Reduced relative clause' },
              { example: 'Do you understand what I mean?', explanation: '"What" for indefinite things' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'rel_ex_001',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'The scientist _____ discovered the cure was awarded a Nobel Prize.',
            options: [
              { text: 'who', isCorrect: true, explanation: 'WHO for person + subject of clause' },
              { text: 'which', isCorrect: false, explanation: 'WHICH is for things, not people' },
              { text: 'that discovered', isCorrect: false, explanation: 'Wrong structure' },
              { text: 'whom', isCorrect: false, explanation: 'WHOM is for object, but here WHO is subject' },
            ],
          },
        ],
      },

      // Topic 3: Passive Voice
      passiveVoice: {
        id: 'passive_voice',
        title: 'Passive Voice',
        difficulty: 'Advanced',
        icon: '🔄',
        description: 'Focus on the action rather than who does it',
        lessons: [
          {
            lessonId: 'pv_001',
            title: 'Formation & Use of Passive Voice',
            duration: '13 mins',
            content: `
              ACTIVE vs PASSIVE:
              
              Active: Subject performs the action
              "The chef prepared the meal."
              
              Passive: Subject receives the action
              "The meal was prepared by the chef."
              
              FORM: be (conjugated) + past participle
              
              TENSE CONVERSIONS:
              
              Present Simple Active: cook
              Present Simple Passive: is/am/are + cooked
              "They cook dinner." → "Dinner is cooked (by them)."
              
              Present Continuous Active: is cooking
              Present Continuous Passive: is/am/are + being + cooked
              "She is cooking rice." → "Rice is being cooked (by her)."
              
              Past Simple Active: cooked
              Past Simple Passive: was/were + cooked
              "They cooked it yesterday." → "It was cooked yesterday."
              
              Past Continuous Active: was cooking
              Past Continuous Passive: was/were + being + cooked
              "I was preparing dinner." → "Dinner was being prepared."
              
              Present Perfect Active: have cooked
              Present Perfect Passive: have/has + been + cooked
              "She has finished the project." → "The project has been finished."
              
              Past Perfect Active: had cooked
              Past Perfect Passive: had + been + cooked
              "They had completed the work." → "The work had been completed."
              
              Future Simple Active: will cook
              Future Simple Passive: will + be + cooked
              "I will fix it." → "It will be fixed."
              
              Modals Active: can cook, must cook
              Modals Passive: can be cooked, must be cooked
              "We must finish this." → "This must be finished."
              
              WHEN TO USE PASSIVE:
              1. Focus on the action, not who does it
              2. The doer is unknown or obvious
              3. More formal/impersonal tone
              4. Scientific or technical writing
              
              Examples:
              "Thousands of people visit this museum each year."
              (Focus on museum, not on specific visitors)
              
              "Several mistakes were found in the report."
              (Who found? Not important)
              
              "The medicine is taken twice daily."
              (How it's used matters, not who uses it)
              
              BY-PHRASE:
              "The book was written by J.K. Rowling." (Include agent)
              "The package was delivered." (Omit obvious agent)
              
              Omit "by" when:
              - Agent is obvious: "The school was closed." (by the principal/authority)
              - Agent is unimportant: "The bridge was destroyed." (by an earthquake/forces)
              - Agent is unknown: "The car was stolen." (we don't know who)
            `,
            examples: [
              { example: 'The letter was written in 1945. (Active: Someone wrote the letter in 1945.)', explanation: 'Focus on action/letter, not writer' },
              { example: 'The windows are being cleaned right now. (Active: Someone is cleaning...)', explanation: 'Present continuous passive' },
              { example: 'By 2030, 50% of cars will be electric-powered. (Active: will power)', explanation: 'Future passive' },
              { example: 'The suspect is believed to be dangerous. (Active: People believe...)', explanation: 'Modal passive' },
            ],
          },
          {
            lessonId: 'pv_002',
            title: 'Passive Voice with Get & Causative',
            duration: '11 mins',
            content: `
              PASSIVE WITH "GET":
              
              "Get" + past participle (less formal than "be"):
              
              "She got injured in the accident." 
              (= She was injured - often suggests: something happened to her)
              
              "The car got damaged during transport."
              (= The car was damaged - suggests: unfortunate)
              
              GET + past participle usually implies:
              - Something happened to the person
              - Often negative or unexpected
              - More casual tone
              
              Compare:
              "The window was broken." (factual)
              "The window got broken." (something happened - more dramatic)
              
              CAUSATIVE STRUCTURES:
              "Have something done" = pay someone to do it
              
              "I had my car repaired." (I paid someone to repair it)
              "She got her hair cut." (She paid a stylist)
              "They had the house painted." (They hired painters)
              
              Form: have/get + object + past participle
              
              ACTIVE: A painter paints my house.
              PASSIVE: I have my house painted (by a painter).
              
              Uses:
              - Services: "I had my teeth cleaned."
              - Repairs: "He got his watch fixed."
              - Professional services: "She had her nails done."
              
              Negative: "I won't have my room cleaned." (= I won't allow it)
              
              CAUSATIVE with "LET/MAKE":
              
              "Let" + object + base verb (allow)
              "His mother let him stay up late."
              
              "Make" + object + base verb (force)
              "The teacher made us do homework."
              
              Passive form:
              "He was allowed to stay up late."
              "We were made to do homework."
            `,
            examples: [
              { example: 'I got stuck in traffic for 2 hours.', explanation: 'GET passive - something happened' },
              { example: 'She had her dress tailored for the wedding.', explanation: 'Causative - paid someone' },
              { example: 'The dog was made to sit.', explanation: 'Passive causative with make' },
              { example: 'Children are let to play in the park.', explanation: 'Passive causative with let' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'pv_ex_001',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'The project _____ (complete) by next month.',
            correctAnswer: 'will be completed',
            hints: ['Future passive', 'will + be + past participle'],
            explanation: 'Future passive: will + be + past participle of complete (completed)',
          },
          {
            exerciseId: 'pv_ex_002',
            type: 'multiple_choice',
            difficulty: 'Hard',
            question: 'The report _____ three times before it was approved.',
            options: [
              { text: 'had been revised', isCorrect: true, explanation: 'Past perfect passive - multiple times before approval' },
              { text: 'was revised', isCorrect: false, explanation: 'Simple past - but "three times" suggests repetition' },
              { text: 'is being revised', isCorrect: false, explanation: 'Present continuous - wrong tense' },
              { text: 'has been revised', isCorrect: false, explanation: 'Present perfect - but action completed before past event' },
            ],
          },
        ],
      },

      // Topic 4: Noun Phrases & Nominalization
      nounPhrases: {
        id: 'noun_phrases',
        title: 'Noun Phrases & Nominalization',
        difficulty: 'Advanced',
        icon: '📝',
        description: 'Create complex noun structures and turn verbs into nouns',
        lessons: [
          {
            lessonId: 'np_001',
            title: 'Complex Noun Phrases',
            duration: '12 mins',
            content: `
              NOUN PHRASE STRUCTURE:
              
              (Determiner) + (Pre-modifiers) + HEAD NOUN + (Post-modifiers)
              
              Examples:
              "The beautiful old house" 
              det + pre-mod + head noun
              
              "The old house with red shutters"
              det + pre-mod + head noun + post-mod
              
              "All the brilliant young students studying in our school"
              det + pre-mod + head noun + post-mod
              
              PRE-MODIFIERS (Before the noun):
              
              1. Determiners: the, a, this, my, some, all, etc.
              2. Adjectives: big, beautiful, old, interesting, etc.
              3. Numbers: one, two, first, second, etc.
              4. Participles: smoking, broken, sleeping, etc.
              5. Nouns: coffee table, kitchen sink, gold medal, etc.
              
              Examples:
              "A smoking hot cup of coffee" (participle + adjective + noun)
              "The sleeping children" (participle + noun)
              "A beautiful Italian leather wallet" (adjectives + noun)
              "The first international football match" (number + adjective + noun)
              
              POST-MODIFIERS (After the noun):
              
              1. Prepositional phrases: "in the house", "with red roof"
              2. Relative clauses: "who lived there", "that I bought"
              3. Participle clauses: "standing in the corner", "made of wood"
              4. Infinitive clauses: "to visit", "to remember"
              
              Examples:
              "The man in the corner" (prepositional phrase)
              "The books that I recommended" (relative clause)
              "The children playing in the park" (participle clause)
              "The desire to succeed" (infinitive clause)
              
              WORD ORDER OF ADJECTIVES:
              Opinion → Size → Age → Shape → Color → Origin → Material → Noun
              
              "A beautiful old round red Italian leather bag"
              
              But natural English rarely uses more than 3 adjectives.
              "A beautiful old red leather bag" (more natural)
            `,
            examples: [
              { example: 'The tall man with glasses standing near the door', explanation: 'det + adj + noun + prep phrase + participle' },
              { example: 'Several interesting historical documents from that period', explanation: 'det + adj + noun + prep phrase' },
              { example: 'The first successful international peace treaty', explanation: 'det + number + adj + noun' },
              { example: 'A cold glass of delicious fresh orange juice', explanation: 'adj + noun + prep phrase + adjectives' },
            ],
          },
          {
            lessonId: 'np_002',
            title: 'Nominalization - Turning Verbs into Nouns',
            duration: '11 mins',
            content: `
              NOMINALIZATION:
              Converting verbs/adjectives into nouns to make writing more formal/abstract.
              
              COMMON PATTERNS:
              
              1. -tion/-sion (from verbs ending in -e, -te):
              educate → education
              celebrate → celebration
              permit → permission
              decide → decision
              
              2. -ment:
              develop → development
              achieve → achievement
              govern → government
              manage → management
              
              3. -ness (from adjectives):
              happy → happiness
              aware → awareness
              kind → kindness
              clever → cleverness
              
              4. -ance/-ence:
              perform → performance
              appear → appearance
              exist → existence
              prefer → preference
              
              5. -ing:
              walk → walking
              learn → learning
              teach → teaching
              manage → managing
              
              6. -ity:
              able → ability
              possible → possibility
              public → publicity
              popular → popularity
              
              7. Irregular:
              begin → beginning
              grow → growth
              choose → choice
              move → movement
              
              USING NOMINALIZATION:
              
              Verb form (active, dynamic):
              "Students study English to improve their skills."
              
              Nominalized form (formal, abstract):
              "The study of English improves students' skills."
              "English study leads to skill improvement."
              
              Original: "People consume too much plastic."
              Nominalized: "Excessive plastic consumption is harmful."
              
              Original: "Companies pollute the environment."
              Nominalized: "Environmental pollution by companies..."
              
              BENEFITS:
              - More formal tone (academic writing)
              - Shorter, more concise
              - Focus on the action itself, not the person
              - Better for technical/scientific writing
              
              NOUN + NOMINALIZATION combinations:
              "The development of new technology" (technology development)
              "The reduction of carbon emissions" (carbon emission reduction)
              "The improvement of education quality" (education quality improvement)
            `,
            examples: [
              { example: 'The elimination of poverty requires international cooperation.', explanation: 'eliminate → elimination; cooperate → cooperation' },
              { example: 'Her achievement in the field was remarkable.', explanation: 'achieve → achievement' },
              { example: 'The management of the project was challenging.', explanation: 'manage → management' },
              { example: 'His happiness comes from helping others.', explanation: 'happy → happiness' },
            ],
          },
        ],
        exercises: [
          {
            exerciseId: 'np_ex_001',
            type: 'fill_blank',
            difficulty: 'Hard',
            question: 'Choose the best nominalization: "The country must _____ its infrastructure." → "The country needs _____ of its infrastructure."',
            correctAnswer: 'modernize / modernization',
            hints: ['Verb modernize', '-tion ending for noun form'],
            explanation: 'modernize → modernization (verb → noun with -tion suffix)',
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
    title: 'Beginner Grammar Quiz - Present Tenses',
    difficulty: 'Beginner',
    duration: 20,
    passingScore: 70,
    topics: ['present_simple', 'present_continuous'],
    questions: [
      {
        id: 'q1',
        question: 'She _____ in a hospital.',
        type: 'multiple_choice',
        options: [
          { text: 'work', isCorrect: false },
          { text: 'works', isCorrect: true },
          { text: 'is working', isCorrect: false },
          { text: 'worked', isCorrect: false },
        ],
        explanation: 'Third person singular present simple needs -s: works',
      },
      {
        id: 'q2',
        question: 'What are they doing right now?',
        type: 'multiple_choice',
        options: [
          { text: 'study', isCorrect: false },
          { text: 'studies', isCorrect: false },
          { text: 'studying', isCorrect: true },
          { text: 'studied', isCorrect: false },
        ],
        explanation: 'Present continuous for current action: are + studying',
      },
    ],
  },
  {
    quizId: 'quiz_intermediate_1',
    title: 'Intermediate Quiz - Perfect Tenses & Modals',
    difficulty: 'Intermediate',
    duration: 30,
    passingScore: 75,
    topics: ['present_perfect', 'modals'],
    questions: [
      {
        id: 'q1',
        question: 'I _____ to Paris three times in my life.',
        type: 'multiple_choice',
        options: [
          { text: 'have been', isCorrect: true },
          { text: 'went', isCorrect: false },
          { text: 'am going', isCorrect: false },
          { text: 'was', isCorrect: false },
        ],
        explanation: 'Present perfect for life experiences: have + been',
      },
      {
        id: 'q2',
        question: 'You _____ eat in the library. It\'s against the rules.',
        type: 'multiple_choice',
        options: [
          { text: 'can', isCorrect: false },
          { text: 'could', isCorrect: false },
          { text: 'mustn\'t', isCorrect: true },
          { text: 'don\'t have to', isCorrect: false },
        ],
        explanation: 'Prohibition/rules: mustn\'t',
      },
    ],
  },
  {
    quizId: 'quiz_advanced_1',
    title: 'Advanced Quiz - Passive Voice & Reported Speech',
    difficulty: 'Advanced',
    duration: 40,
    passingScore: 80,
    topics: ['passive_voice', 'reported_speech'],
    questions: [
      {
        id: 'q1',
        question: 'The project _____ by the team leader last week.',
        type: 'multiple_choice',
        options: [
          { text: 'was completed', isCorrect: true },
          { text: 'has been completed', isCorrect: false },
          { text: 'was being completed', isCorrect: false },
          { text: 'completed', isCorrect: false },
        ],
        explanation: 'Past simple passive: was + past participle',
      },
      {
        id: 'q2',
        question: 'She said she _____ the movie yesterday.',
        type: 'multiple_choice',
        options: [
          { text: 'has watched', isCorrect: false },
          { text: 'had watched', isCorrect: true },
          { text: 'watched', isCorrect: false },
          { text: 'watch', isCorrect: false },
        ],
        explanation: 'Reported speech: past simple becomes past perfect',
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
    description: 'Perfect for beginners',
  },
  Medium: {
    color: '#f59e0b', // amber
    icon: '⭐⭐',
    description: 'Intermediate level',
  },
  Hard: {
    color: '#ef4444', // red
    icon: '⭐⭐⭐',
    description: 'Advanced challenges',
  },
};

// Common mistakes and explanations
export const COMMON_MISTAKES = [
  {
    id: 'mistake_1',
    mistake: 'I am go to school.',
    correct: 'I go to school.',
    explanation: 'Don\'t use am/is/are + base verb. Use am/is/are + -ing for present continuous or just base verb for present simple.',
    topic: 'present_simple',
  },
  {
    id: 'mistake_2',
    mistake: 'She have completed the work.',
    correct: 'She has completed the work.',
    explanation: 'With third person singular (she, he, it), use "has" not "have".',
    topic: 'present_perfect',
  },
  {
    id: 'mistake_3',
    mistake: 'If I would know, I would tell you.',
    correct: 'If I knew, I would tell you.',
    explanation: 'In second conditional (if clause), use past simple, not would + verb.',
    topic: 'conditionals',
  },
  {
    id: 'mistake_4',
    mistake: 'I told him to not come.',
    correct: 'I told him not to come.',
    explanation: 'Negative infinitive: not + to + verb',
    topic: 'modals',
  },
  {
    id: 'mistake_5',
    mistake: 'The car was stolen by someone unknown.',
    correct: 'The car was stolen.',
    explanation: 'When agent is unknown or unimportant, omit the "by" phrase.',
    topic: 'passive_voice',
  },
];

// Study tips and strategies
export const STUDY_TIPS = [
  {
    id: 'tip_1',
    title: 'Use Context Clues',
    description: 'Always look for time expressions (yesterday, now, tomorrow) to determine the correct tense.',
    relatedTopics: ['present_simple', 'past_simple', 'future_simple'],
  },
  {
    id: 'tip_2',
    title: 'Practice Conjugation',
    description: 'Regular conjugation practice helps internalize verb forms. Create flashcards for irregular verbs.',
    relatedTopics: ['present_simple', 'past_simple', 'present_perfect'],
  },
  {
    id: 'tip_3',
    title: 'Active to Passive Conversion',
    description: 'Practice converting sentences from active to passive voice to understand structure better.',
    relatedTopics: ['passive_voice'],
  },
  {
    id: 'tip_4',
    title: 'Dialogue Practice',
    description: 'Practice reported speech by writing dialogues, then converting them to reported speech.',
    relatedTopics: ['reported_speech'],
  },
  {
    id: 'tip_5',
    title: 'Conditional Mind Mapping',
    description: 'Create a mind map showing when to use each conditional type based on likelihood and time.',
    relatedTopics: ['conditionals'],
  },
];

// Real-world examples for context
export const REAL_WORLD_EXAMPLES = [
  {
    id: 'example_1',
    context: 'Job Interview',
    original: 'I work in software development.',
    explanation: 'Present simple for current job/role',
    topic: 'present_simple',
  },
  {
    id: 'example_2',
    context: 'News Report',
    original: 'The bridge has been damaged by recent floods.',
    explanation: 'Passive voice for factual reporting',
    topic: 'passive_voice',
  },
  {
    id: 'example_3',
    context: 'Chat with Friend',
    original: 'I\'m writing an email right now.',
    explanation: 'Present continuous for current activity',
    topic: 'present_continuous',
  },
  {
    id: 'example_4',
    context: 'Business Meeting',
    original: 'If we don\'t receive payment by Friday, we\'ll cancel the contract.',
    explanation: 'First conditional for realistic future scenario',
    topic: 'conditionals',
  },
  {
    id: 'example_5',
    context: 'Academic Writing',
    original: 'The rapid development of artificial intelligence has revolutionized industries.',
    explanation: 'Present perfect + nominalization for formal writing',
    topic: 'present_perfect',
  },
];

export default GRAMMAR_DATA;