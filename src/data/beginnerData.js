export const beginner = {
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
};