export const intermediate = {
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
           
            Zero: If + present, present (facts)
            First: If + present, will (likely future)
            Second: If + past, would (unlikely/imagination)
            Third: If + had + past participle, would have (impossible past)
            Mixed: Combinations of above
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
};