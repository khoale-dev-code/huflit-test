export const advanced = {
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
};