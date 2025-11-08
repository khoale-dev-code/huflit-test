// vocabularyData.js - HUFLIT Extended (150+ words) with additional categories

export const VOCABULARY_DATA = {
  beginner: {
    level: 'Beginner',
    categories: {
      travel: {
        id: 'travel',
        title: '✈️ Travel & Places',
        description: 'Travel and location vocabulary from exam',
        words: [
          { id: 'v1', word: 'destination', pronunciation: '/ˌdes.tɪˈneɪ.ʃən/', definition: 'A place where someone is going', example: 'Tokyo is a popular destination.', vietnamese: 'điểm đến', alternatives: ['place', 'location', 'spot'] },
          { id: 'v2', word: 'convenient', pronunciation: '/kənˈven.jənt/', definition: 'Easy to access or use', example: 'The airport is convenient for travelers.', vietnamese: 'tiện lợi', alternatives: ['easy', 'handy', 'accessible'] },
          { id: 'v3', word: 'purchase', pronunciation: '/ˈpɜr.tʃəs/', definition: 'To buy something', example: 'I purchased a souvenir.', vietnamese: 'mua', alternatives: ['buy', 'acquire', 'obtain'] },
          { id: 'v4', word: 'receipt', pronunciation: '/rɪˈsiːt/', definition: 'Written proof of payment', example: 'Keep your receipt for refund.', vietnamese: 'hóa đơn', alternatives: ['proof', 'invoice', 'ticket'] },
          { id: 'v5', word: 'refund', pronunciation: '/ˈriː.fʌnd/', definition: 'Money returned for unsatisfactory product', example: 'I requested a refund.', vietnamese: 'hoàn tiền', alternatives: ['reimbursement', 'repayment', 'return'] },
          { id: 'v6', word: 'souvenir', pronunciation: '/ˌsuː.vəˈnɪr/', definition: 'Object kept as reminder of place', example: 'I bought many souvenirs.', vietnamese: 'quà lưu niệm', alternatives: ['memento', 'keepsake', 'token'] },
          { id: 'v7', word: 'journey', pronunciation: '/ˈdʒɝ.ni/', definition: 'Trip from one place to another', example: 'My journey was wonderful.', vietnamese: 'chuyến đi', alternatives: ['trip', 'voyage', 'expedition'] },
          { id: 'v8', word: 'accommodation', pronunciation: '/əˌkɑm.əˈdeɪ.ʃən/', definition: 'Place to live or stay', example: 'Excellent accommodation provided.', vietnamese: 'chỗ ở', alternatives: ['lodging', 'housing', 'quarters'] },
          { id: 'v9', word: 'customs', pronunciation: '/ˈkʌs.təmz/', definition: 'Government border agency', example: 'Pass through customs at airport.', vietnamese: 'hải quan', alternatives: ['border control', 'immigration', 'checkpoint'] },
          { id: 'v10', word: 'delay', pronunciation: '/dɪˈleɪ/', definition: 'To make late', example: 'Flight delayed by weather.', vietnamese: 'trễ', alternatives: ['postpone', 'hold up', 'lag'] },
          { id: 'v11', word: 'arrival', pronunciation: '/əˈraɪ.vəl/', definition: 'Act of arriving at place', example: 'Expected arrival time is 8pm.', vietnamese: 'sự đến', alternatives: ['coming', 'entrance', 'appearance'] },
          { id: 'v12', word: 'departure', pronunciation: '/dɪˈpɑr.tʃɚ/', definition: 'Act of leaving a place', example: 'Flight departure is at 10am.', vietnamese: 'sự khởi hành', alternatives: ['leaving', 'exit', 'takeoff'] },
          { id: 'v13', word: 'ticket', pronunciation: '/ˈtɪk.ɪt/', definition: 'Document allowing entry or travel', example: 'Book your flight ticket online.', vietnamese: 'vé', alternatives: ['pass', 'permit', 'voucher'] },
          { id: 'v14', word: 'luggage', pronunciation: '/ˈlʌɡ.ɪdʒ/', definition: 'Bags for carrying belongings while traveling', example: 'Check your luggage at counter.', vietnamese: 'hành lý', alternatives: ['baggage', 'bags', 'suitcase'] },
          { id: 'v15', word: 'weather', pronunciation: '/ˈweð.ɚ/', definition: 'Atmospheric conditions', example: 'Bad weather caused delays.', vietnamese: 'thời tiết', alternatives: ['climate', 'conditions', 'forecast'] },
          { id: 'v15b', word: 'resort', pronunciation: '/rɪˈzɔrt/', definition: 'Holiday destination with facilities', example: 'We stayed at a beachside resort.', vietnamese: 'khu nghỉ dưỡng', alternatives: ['hotel', 'spa', 'retreat'] },
          { id: 'v15c', word: 'itinerary', pronunciation: '/aɪˈtɪn.ə.rer.i/', definition: 'Planned route for a journey', example: 'Our itinerary includes museums and parks.', vietnamese: 'lộ trình', alternatives: ['schedule', 'route', 'plan'] },
          { id: 'v15d', word: 'visa', pronunciation: '/ˈviː.zə/', definition: 'Official document for travel', example: 'You need a visa to enter this country.', vietnamese: 'thị thực', alternatives: ['permit', 'authorization', 'document'] },
          { id: 'v15e', word: 'passport', pronunciation: '/ˈpæs.pɔrt/', definition: 'Travel document issued by government', example: 'Your passport must be valid for 6 months.', vietnamese: 'hộ chiếu', alternatives: ['document', 'ID', 'credentials'] },
          { id: 'v15f', word: 'booking', pronunciation: '/ˈbʊk.ɪŋ/', definition: 'Reservation for travel or accommodation', example: 'Confirm your hotel booking online.', vietnamese: 'đặt chỗ', alternatives: ['reservation', 'appointment', 'registration'] },
        ],
      },
      business: {
        id: 'business',
        title: '💼 Business & Work',
        description: 'Professional and work vocabulary',
        words: [
          { id: 'v16', word: 'deadline', pronunciation: '/ˈded.laɪn/', definition: 'Final date for completion', example: 'Deadline is Friday, March 22.', vietnamese: 'hạn chót', alternatives: ['limit', 'cutoff', 'due date'] },
          { id: 'v17', word: 'collaborate', pronunciation: '/kəˈlæb.ə.reɪt/', definition: 'Work together with others', example: 'Collaborate with sales team.', vietnamese: 'cộng tác', alternatives: ['cooperate', 'work together', 'team up'] },
          { id: 'v18', word: 'coordinator', pronunciation: '/koʊˈɔr.də.neɪ.tɚ/', definition: 'Person organizing elements', example: 'Project coordinator manages tasks.', vietnamese: 'điều phối viên', alternatives: ['organizer', 'manager', 'supervisor'] },
          { id: 'v19', word: 'orientation', pronunciation: '/ˌɔr.i.enˈteɪ.ʃən/', definition: 'Training for new employees', example: 'Orientation covers policies.', vietnamese: 'hướng dẫn', alternatives: ['training', 'induction', 'briefing'] },
          { id: 'v20', word: 'implement', pronunciation: '/ˈɪm.plə.ment/', definition: 'Put plan into effect', example: 'Implement suggestions for improvement.', vietnamese: 'thực hiện', alternatives: ['execute', 'carry out', 'apply'] },
          { id: 'v21', word: 'strategy', pronunciation: '/ˈstræt.ə.dʒi/', definition: 'Plan to achieve goal', example: 'Finalize promotional strategy.', vietnamese: 'chiến lược', alternatives: ['plan', 'approach', 'tactic'] },
          { id: 'v22', word: 'feedback', pronunciation: '/ˈfiːd.bæk/', definition: 'Comments about performance', example: 'Collect feedback from clients.', vietnamese: 'phản hồi', alternatives: ['response', 'input', 'comment'] },
          { id: 'v23', word: 'presentation', pronunciation: '/ˌprez.ənˈteɪ.ʃən/', definition: 'Event showing information to audience', example: 'Professional presentation required.', vietnamese: 'thuyết trình', alternatives: ['speech', 'display', 'show'] },
          { id: 'v24', word: 'department', pronunciation: '/dɪˈpɑrt.mənt/', definition: 'Section of organization', example: 'Marketing department plans campaign.', vietnamese: 'bộ phận', alternatives: ['division', 'section', 'unit'] },
          { id: 'v25', word: 'responsibility', pronunciation: '/rɪˌspɑn.səˈbɪl.ə.t̬i/', definition: 'Duty or task expected', example: 'Specific responsibilities assigned.', vietnamese: 'trách nhiệm', alternatives: ['duty', 'obligation', 'task'] },
          { id: 'v26', word: 'objective', pronunciation: '/əbˈdʒek.tɪv/', definition: 'Goal to achieve', example: 'Primary objective is brand awareness.', vietnamese: 'mục tiêu', alternatives: ['goal', 'aim', 'target'] },
          { id: 'v27', word: 'adjustment', pronunciation: '/əˈdʒʌst.mənt/', definition: 'Small change to something', example: 'Make adjustments before release.', vietnamese: 'điều chỉnh', alternatives: ['modification', 'alteration', 'change'] },
          { id: 'v28', word: 'employee', pronunciation: '/ɪmˈplɔɪ.iː/', definition: 'Person working for company', example: 'New employee orientation required.', vietnamese: 'nhân viên', alternatives: ['worker', 'staff', 'personnel'] },
          { id: 'v29', word: 'manager', pronunciation: '/ˈmæn.ɪ.dʒɚ/', definition: 'Person supervising others', example: 'Manager approved the proposal.', vietnamese: 'quản lý', alternatives: ['supervisor', 'director', 'executive'] },
          { id: 'v30', word: 'meeting', pronunciation: '/ˈmiː.tɪŋ/', definition: 'Gathering of people to discuss', example: 'Meeting scheduled for tomorrow.', vietnamese: 'cuộc họp', alternatives: ['conference', 'session', 'gathering'] },
          { id: 'v30b', word: 'invoice', pronunciation: '/ˈɪn.vɔɪs/', definition: 'Bill for goods or services', example: 'Send the invoice by email.', vietnamese: 'hóa đơn', alternatives: ['bill', 'statement', 'receipt'] },
          { id: 'v30c', word: 'contract', pronunciation: '/ˈkɑn.trækt/', definition: 'Legal agreement between parties', example: 'Sign the employment contract.', vietnamese: 'hợp đồng', alternatives: ['agreement', 'deal', 'terms'] },
          { id: 'v30d', word: 'client', pronunciation: '/ˈklaɪ.ənt/', definition: 'Customer or person receiving service', example: 'Satisfy all client needs.', vietnamese: 'khách hàng', alternatives: ['customer', 'patron', 'buyer'] },
          { id: 'v30e', word: 'revenue', pronunciation: '/ˈrev.ə.nuː/', definition: 'Income from business', example: 'Revenue increased this quarter.', vietnamese: 'doanh thu', alternatives: ['income', 'earnings', 'profit'] },
          { id: 'v30f', word: 'proposal', pronunciation: '/prəˈpoʊ.zəl/', definition: 'Plan or suggestion offered', example: 'Review the project proposal.', vietnamese: 'đề xuất', alternatives: ['suggestion', 'plan', 'bid'] },
          { id: 'v30g', word: 'payroll', pronunciation: '/ˈpeɪ.roʊl/', definition: 'List of employees and their wages', example: 'Process the monthly payroll.', vietnamese: 'bảng lương', alternatives: ['salary', 'wages', 'compensation'] },
          { id: 'v30h', word: 'audit', pronunciation: '/ˈɔ.dɪt/', definition: 'Formal inspection of accounts', example: 'Annual audit scheduled next month.', vietnamese: 'kiểm toán', alternatives: ['inspection', 'review', 'examination'] },
        ],
      },
      descriptions: {
        id: 'descriptions',
        title: '📝 Descriptions & Adjectives',
        description: 'Descriptive words from exam',
        words: [
          { id: 'v31', word: 'synthetic', pronunciation: '/sɪnˈθet.ɪk/', definition: 'Made artificially', example: 'No synthetic dyes used.', vietnamese: 'tổng hợp', alternatives: ['artificial', 'man-made', 'chemical'] },
          { id: 'v32', word: 'punctuality', pronunciation: '/pʌŋkˌtʃu.ˈæl.ə.t̬i/', definition: 'Being on time', example: 'Punctuality is important.', vietnamese: 'đúng giờ', alternatives: ['timeliness', 'promptness', 'reliability'] },
          { id: 'v33', word: 'postpone', pronunciation: '/poʊstˈpoʊn/', definition: 'Delay to later time', example: 'Event postponed until next week.', vietnamese: 'hoãn lại', alternatives: ['delay', 'defer', 'reschedule'] },
          { id: 'v34', word: 'professional', pronunciation: '/prəˈfesh.ən.əl/', definition: 'Meeting high work standards', example: 'Present professionally.', vietnamese: 'chuyên nghiệp', alternatives: ['skilled', 'expert', 'competent'] },
          { id: 'v35', word: 'multilingual', pronunciation: '/ˌmʌl.tiˈlɪŋ.ɡwəl/', definition: 'Speaking multiple languages', example: 'Multilingual voice production offered.', vietnamese: 'đa ngôn ngữ', alternatives: ['bilingual', 'polyglot', 'language-capable'] },
          { id: 'v36', word: 'complicated', pronunciation: '/ˈkɑm.plɪ.keɪ.t̬ɪd/', definition: 'Difficult to understand', example: 'Devices unnecessarily complicated.', vietnamese: 'phức tạp', alternatives: ['complex', 'intricate', 'difficult'] },
          { id: 'v37', word: 'natural', pronunciation: '/ˈnætʃ.ɚ.əl/', definition: 'From nature, not artificial', example: 'Made from natural materials.', vietnamese: 'tự nhiên', alternatives: ['organic', 'pure', 'unprocessed'] },
          { id: 'v38', word: 'positive', pronunciation: '/ˈpɑz.ə.tɪv/', definition: 'Optimistic; favorable', example: 'Maintain positive environment.', vietnamese: 'tích cực', alternatives: ['optimistic', 'favorable', 'constructive'] },
          { id: 'v39', word: 'tight', pronunciation: '/taɪt/', definition: 'Little space or time', example: 'Meet tight deadlines.', vietnamese: 'chặt chẽ', alternatives: ['strict', 'urgent', 'demanding'] },
          { id: 'v40', word: 'excellent', pronunciation: '/ˈek.sə.lənt/', definition: 'Extremely good', example: 'Strive for excellent service.', vietnamese: 'tuyệt vời', alternatives: ['outstanding', 'superior', 'fantastic'] },
          { id: 'v41', word: 'successful', pronunciation: '/səkˈses.fəl/', definition: 'Achieving desired result', example: 'Successful product launch.', vietnamese: 'thành công', alternatives: ['triumphant', 'victorious', 'prosperous'] },
          { id: 'v42', word: 'important', pronunciation: '/ɪmˈpɔr.tənt/', definition: 'Having great significance', example: 'Important for company culture.', vietnamese: 'quan trọng', alternatives: ['significant', 'crucial', 'essential'] },
          { id: 'v43', word: 'reliable', pronunciation: '/rɪˈlaɪ.ə.bəl/', definition: 'Can be trusted', example: 'Reliable team member.', vietnamese: 'đáng tin', alternatives: ['dependable', 'trustworthy', 'consistent'] },
          { id: 'v44', word: 'efficient', pronunciation: '/ɪˈfɪʃ.ənt/', definition: 'Accomplished with minimal waste', example: 'Efficient work process.', vietnamese: 'hiệu quả', alternatives: ['effective', 'productive', 'capable'] },
          { id: 'v45', word: 'creative', pronunciation: '/kriːˈeɪ.tɪv/', definition: 'Having original ideas', example: 'Creative marketing approach.', vietnamese: 'sáng tạo', alternatives: ['imaginative', 'innovative', 'original'] },
          { id: 'v45b', word: 'rigorous', pronunciation: '/ˈrɪɡ.ər.əs/', definition: 'Extremely careful and thorough', example: 'Rigorous quality control measures.', vietnamese: 'chặt chẽ', alternatives: ['strict', 'thorough', 'precise'] },
          { id: 'v45c', word: 'obsolete', pronunciation: '/ˈɑb.sə.liːt/', definition: 'No longer used or useful', example: 'The old system is now obsolete.', vietnamese: 'lỗi thời', alternatives: ['outdated', 'ancient', 'redundant'] },
          { id: 'v45d', word: 'versatile', pronunciation: '/ˈvɝ.sə.t̬əl/', definition: 'Able to do many different things', example: 'A versatile marketing professional.', vietnamese: 'đa năng', alternatives: ['flexible', 'adaptable', 'multi-purpose'] },
          { id: 'v45e', word: 'innovative', pronunciation: '/ɪˈnɑː.və.tɪv/', definition: 'Featuring new methods', example: 'Innovative solutions proposed.', vietnamese: 'sáng tạo', alternatives: ['creative', 'original', 'inventive'] },
          { id: 'v45f', word: 'concise', pronunciation: '/kənˈsaɪs/', definition: 'Brief and clear', example: 'Write concise emails.', vietnamese: 'ngắn gọn', alternatives: ['brief', 'succinct', 'compact'] },
        ],
      },
      questions: {
        id: 'questions',
        title: '❓ Common Question Vocabulary',
        description: 'Vocabulary in exam questions',
        words: [
          { id: 'v46', word: 'indicate', pronunciation: '/ˈɪn.dɪ.keɪt/', definition: 'Show or be sign of', example: 'Reviews indicate complexity.', vietnamese: 'chỉ ra', alternatives: ['show', 'suggest', 'demonstrate'] },
          { id: 'v47', word: 'enhance', pronunciation: '/ɪnˈhæns/', definition: 'Improve or make better', example: 'Learning enhances creativity.', vietnamese: 'cải thiện', alternatives: ['improve', 'boost', 'strengthen'] },
          { id: 'v48', word: 'infer', pronunciation: '/ɪnˈfɝ/', definition: 'Reach conclusion from evidence', example: 'Infer from advertisement.', vietnamese: 'suy luận', alternatives: ['conclude', 'deduce', 'gather'] },
          { id: 'v49', word: 'accommodate', pronunciation: '/əˈkɑm.ə.deɪt/', definition: 'Provide suitable arrangements', example: 'Accommodate different languages.', vietnamese: 'cung cấp', alternatives: ['adapt', 'adjust', 'provide'] },
          { id: 'v50', word: 'hesitate', pronunciation: '/ˈhez.ə.teɪt/', definition: 'Pause before acting', example: 'Don\'t hesitate to contact.', vietnamese: 'do dự', alternatives: ['pause', 'waver', 'delay'] },
          { id: 'v51', word: 'suggest', pronunciation: '/səɡˈdʒest/', definition: 'Propose idea', example: 'What is suggested?', vietnamese: 'gợi ý', alternatives: ['propose', 'recommend', 'imply'] },
          { id: 'v52', word: 'determine', pronunciation: '/dɪˈtɝ.mɪn/', definition: 'Find out or decide', example: 'Determine project success.', vietnamese: 'xác định', alternatives: ['decide', 'establish', 'figure out'] },
          { id: 'v53', word: 'respond', pronunciation: '/rɪˈspɑnd/', definition: 'Reply or answer', example: 'Respond within 24 hours.', vietnamese: 'trả lời', alternatives: ['reply', 'answer', 'react'] },
          { id: 'v54', word: 'require', pronunciation: '/rɪˈkwaɪr/', definition: 'Need as necessary', example: 'Job requires skills.', vietnamese: 'yêu cầu', alternatives: ['need', 'demand', 'necessitate'] },
          { id: 'v55', word: 'expect', pronunciation: '/ɪkˈspekt/', definition: 'Believe something will happen', example: 'Expect media attendance.', vietnamese: 'mong đợi', alternatives: ['anticipate', 'predict', 'suppose'] },
          { id: 'v56', word: 'provide', pronunciation: '/prəˈvaɪd/', definition: 'Supply or give', example: 'Provide necessary information.', vietnamese: 'cung cấp', alternatives: ['supply', 'give', 'furnish'] },
          { id: 'v57', word: 'consider', pronunciation: '/kənˈsɪd.ɚ/', definition: 'Think carefully about', example: 'Consider all options.', vietnamese: 'xem xét', alternatives: ['think about', 'contemplate', 'ponder'] },
          { id: 'v58', word: 'include', pronunciation: '/ɪnˈkluːd/', definition: 'Have as part', example: 'Include all suggestions.', vietnamese: 'bao gồm', alternatives: ['contain', 'comprise', 'consist of'] },
          { id: 'v59', word: 'mention', pronunciation: '/ˈmen.ʃən/', definition: 'Refer to something', example: 'Mention the arrival time.', vietnamese: 'đề cập', alternatives: ['refer to', 'state', 'note'] },
          { id: 'v60', word: 'explain', pronunciation: '/ɪkˈspleɪn/', definition: 'Make clear', example: 'Explain the process.', vietnamese: 'giải thích', alternatives: ['clarify', 'describe', 'account for'] },
          { id: 'v60b', word: 'verify', pronunciation: '/ˈver.ə.faɪ/', definition: 'Confirm the truth of something', example: 'Verify the information with sources.', vietnamese: 'xác minh', alternatives: ['confirm', 'check', 'validate'] },
          { id: 'v60c', word: 'derive', pronunciation: '/dɪˈraɪv/', definition: 'Obtain or receive from', example: 'Derive benefits from training.', vietnamese: 'lấy được', alternatives: ['obtain', 'get', 'extract'] },
          { id: 'v60d', word: 'attribute', pronunciation: '/əˈtrɪb.juːt/', definition: 'Give credit to something', example: 'Attribute success to teamwork.', vietnamese: 'quy cho', alternatives: ['assign', 'credit', 'ascribe'] },
          { id: 'v60e', word: 'critique', pronunciation: '/krɪˈtiːk/', definition: 'Detailed analysis and judgment', example: 'Provide constructive critique.', vietnamese: 'phê bình', alternatives: ['review', 'criticism', 'analysis'] },
          { id: 'v60f', word: 'synthesize', pronunciation: '/ˈsɪn.θə.saɪz/', definition: 'Combine elements to form whole', example: 'Synthesize information from sources.', vietnamese: 'tổng hợp', alternatives: ['combine', 'integrate', 'unite'] },
        ],
      },
      marketing: {
        id: 'marketing',
        title: '📢 Marketing & Advertising',
        description: 'Marketing vocabulary',
        words: [
          { id: 'v61', word: 'campaign', pronunciation: '/kæmˈpeɪn/', definition: 'Series of activities to achieve goal', example: 'Marketing campaign launches next month.', vietnamese: 'chiến dịch', alternatives: ['drive', 'initiative', 'program'] },
          { id: 'v62', word: 'brand', pronunciation: '/brænd/', definition: 'Company identity', example: 'Increase brand awareness.', vietnamese: 'thương hiệu', alternatives: ['trademark', 'label', 'name'] },
          { id: 'v63', word: 'awareness', pronunciation: '/əˈwer.nəs/', definition: 'Knowledge of something', example: 'Increase brand awareness.', vietnamese: 'nhận thức', alternatives: ['knowledge', 'consciousness', 'understanding'] },
          { id: 'v64', word: 'advertisement', pronunciation: '/ˈæd.vɚ.taɪz.mənt/', definition: 'Public notice', example: 'Advertisement promotes product.', vietnamese: 'quảng cáo', alternatives: ['ad', 'commercial', 'notice'] },
          { id: 'v65', word: 'customer', pronunciation: '/ˈkʌs.tə.mɚ/', definition: 'Person buying goods', example: 'Customer satisfaction priority.', vietnamese: 'khách hàng', alternatives: ['client', 'buyer', 'consumer'] },
          { id: 'v66', word: 'attract', pronunciation: '/əˈtrækt/', definition: 'Draw attention', example: 'Attract potential customers.', vietnamese: 'anh dẫn', alternatives: ['draw', 'appeal', 'entice'] },
          { id: 'v67', word: 'channel', pronunciation: '/ˈtʃæn.əl/', definition: 'Way for communication', example: 'Online and offline channels.', vietnamese: 'kênh', alternatives: ['route', 'medium', 'platform'] },
          { id: 'v68', word: 'visual', pronunciation: '/ˈvɪʒ.u.əl/', definition: 'Relating to sight', example: 'Create visual materials.', vietnamese: 'hình ảnh', alternatives: ['graphic', 'pictorial', 'sight-related'] },
          { id: 'v69', word: 'target', pronunciation: '/ˈtɑr.ɡɪt/', definition: 'Intended audience', example: 'Target audience analysis needed.', vietnamese: 'đối tượng', alternatives: ['aim', 'objective', 'goal'] },
          { id: 'v70', word: 'promote', pronunciation: '/prəˈmoʊt/', definition: 'Publicize or advance', example: 'Promote new product line.', vietnamese: 'quảng bá', alternatives: ['advertise', 'market', 'publicize'] },
          { id: 'v70b', word: 'incentive', pronunciation: '/ɪnˈsen.tɪv/', definition: 'Motivation or encouragement', example: 'Offer incentives for early purchase.', vietnamese: 'ưu đãi', alternatives: ['reward', 'motivation', 'bonus'] },
          { id: 'v70c', word: 'demographic', pronunciation: '/ˌdem.əˈɡræf.ɪk/', definition: 'Statistics about population', example: 'Target demographic is young professionals.', vietnamese: 'nhân khẩu học', alternatives: ['population', 'group', 'segment'] },
          { id: 'v70d', word: 'testimonial', pronunciation: '/ˌtes.təˈmoʊ.ni.əl/', definition: 'Written or spoken statement of support', example: 'Customer testimonials boost credibility.', vietnamese: 'bằng chứng', alternatives: ['endorsement', 'review', 'statement'] },
          { id: 'v70e', word: 'engagement', pronunciation: '/ɪnˈɡeɪdʒ.mənt/', definition: 'Involvement and interaction', example: 'High customer engagement rate.', vietnamese: 'tương tác', alternatives: ['participation', 'involvement', 'interaction'] },
          { id: 'v70f', word: 'conversion', pronunciation: '/kənˈvɝ.ʒən/', definition: 'Change from prospect to customer', example: 'Improve conversion rates.', vietnamese: 'chuyển đổi', alternatives: ['transformation', 'change', 'shift'] },
        ],
      },
    },
  },

  intermediate: {
    level: 'Intermediate',
    categories: {
      analytics: {
        id: 'analytics',
        title: '📊 Analysis & Evaluation',
        description: 'Analytical vocabulary',
        words: [
          { id: 'v72', word: 'assessment', pronunciation: '/əˈses.mənt/', definition: 'Evaluation of something', example: 'Performance assessment important.', vietnamese: 'đánh giá', alternatives: ['evaluation', 'appraisal', 'review'] },
          { id: 'v73', word: 'criterion', pronunciation: '/kraɪˈtɪr.i.ən/', definition: 'Standard for judgment', example: 'Teamwork is key criterion.', vietnamese: 'tiêu chí', alternatives: ['standard', 'measure', 'benchmark'] },
          { id: 'v74', word: 'validate', pronunciation: '/ˈvæl.ə.deɪt/', definition: 'Confirm something true', example: 'Validate customer feedback.', vietnamese: 'xác nhận', alternatives: ['confirm', 'verify', 'authenticate'] },
          { id: 'v75', word: 'discrepancy', pronunciation: '/dɪˈskrep.ən.si/', definition: 'Inconsistency between things', example: 'Discrepancy in figures.', vietnamese: 'sự khác biệt', alternatives: ['difference', 'inconsistency', 'gap'] },
          { id: 'v76', word: 'optimize', pronunciation: '/ˈɑp.tə.maɪz/', definition: 'Make as good as possible', example: 'Optimize marketing strategy.', vietnamese: 'tối ưu hóa', alternatives: ['improve', 'perfect', 'maximize'] },
          { id: 'v77', word: 'analyze', pronunciation: '/ˈæn.ə.laɪz/', definition: 'Examine carefully', example: 'Analyze customer feedback.', vietnamese: 'phân tích', alternatives: ['examine', 'study', 'investigate'] },
          { id: 'v78', word: 'monitor', pronunciation: '/ˈmɑn.ə.tɚ/', definition: 'Watch regularly', example: 'Monitor project progress.', vietnamese: 'giám sát', alternatives: ['watch', 'track', 'supervise'] },
          { id: 'v79', word: 'review', pronunciation: '/rɪˈvjuː/', definition: 'Examine or assess', example: 'Review all suggestions.', vietnamese: 'xem xét', alternatives: ['examine', 'assess', 'evaluate'] },
          { id: 'v80', word: 'statistic', pronunciation: '/stəˈtɪs.tɪk/', definition: 'Numerical fact or data', example: 'Statistics show growth.', vietnamese: 'thống kê', alternatives: ['data', 'figure', 'number'] },
          { id: 'v80b', word: 'benchmark', pronunciation: '/ˈbentʃ.mɑrk/', definition: 'Standard of comparison', example: 'Industry benchmark for quality.', vietnamese: 'tiêu chuẩn so sánh', alternatives: ['standard', 'reference', 'criterion'] },
          { id: 'v80c', word: 'correlation', pronunciation: '/ˌkɔr.əˈleɪ.ʃən/', definition: 'Mutual relationship between things', example: 'Strong correlation between variables.', vietnamese: 'tương quan', alternatives: ['relationship', 'connection', 'link'] },
          { id: 'v80d', word: 'variable', pronunciation: '/ˈver.i.ə.bəl/', definition: 'Element that can change', example: 'Control variables in experiment.', vietnamese: 'biến số', alternatives: ['factor', 'element', 'component'] },
        ],
      },
      advanced_communication: {
        id: 'advanced_communication',
        title: '🗣️ Advanced Communication',
        description: 'Complex communication vocabulary',
        words: [
          { id: 'v81', word: 'coordinate', pronunciation: '/koʊˈɔr.də.neɪt/', definition: 'Organize to work together', example: 'Coordinate department efforts.', vietnamese: 'điều phối', alternatives: ['organize', 'manage', 'synchronize'] },
          { id: 'v82', word: 'negotiate', pronunciation: '/nɪˈɡoʊ.ʃi.eɪt/', definition: 'Discuss to reach agreement', example: 'Negotiate with vendors.', vietnamese: 'đàm phán', alternatives: ['bargain', 'discuss', 'haggle'] },
          { id: 'v83', word: 'delegate', pronunciation: '/ˈdel.ɪ.ɡeɪt/', definition: 'Give task to someone', example: 'Delegate tasks to team.', vietnamese: 'phân công', alternatives: ['assign', 'entrust', 'empower'] },
          { id: 'v84', word: 'clarify', pronunciation: '/ˈkler.ə.faɪ/', definition: 'Make clearer', example: 'Clarify project goals.', vietnamese: 'làm rõ', alternatives: ['explain', 'illuminate', 'elucidate'] },
          { id: 'v85', word: 'persuade', pronunciation: '/pɚˈsweɪd/', definition: 'Convince someone', example: 'Persuade client to agree.', vietnamese: 'thuyết phục', alternatives: ['convince', 'sway', 'influence'] },
          { id: 'v86', word: 'summarize', pronunciation: '/ˈsʌm.ə.raɪz/', definition: 'Give brief statement', example: 'Summarize main points.', vietnamese: 'tóm tắt', alternatives: ['condense', 'outline', 'recap'] },
          { id: 'v87', word: 'emphasize', pronunciation: '/ˈem.fə.saɪz/', definition: 'Give special importance to', example: 'Emphasize key features.', vietnamese: 'nhấn mạnh', alternatives: ['stress', 'highlight', 'underline'] },
          { id: 'v88', word: 'inform', pronunciation: '/ɪnˈfɔrm/', definition: 'Give information to', example: 'Inform staff of changes.', vietnamese: 'thông báo', alternatives: ['notify', 'tell', 'advise'] },
          { id: 'v88b', word: 'articulate', pronunciation: '/ɑrˈtɪk.jə.leɪt/', definition: 'Express clearly and distinctly', example: 'Articulate your vision.', vietnamese: 'bộc lộ rõ ràng', alternatives: ['express', 'state', 'voice'] },
          { id: 'v88c', word: 'advocate', pronunciation: '/ˈæd.və.keɪt/', definition: 'Publicly support or recommend', example: 'Advocate for sustainable practices.', vietnamese: 'ủng hộ', alternatives: ['support', 'promote', 'champion'] },
        ],
      },
      professional: {
        id: 'professional',
        title: '🎯 Professional Development',
        description: 'Professional growth vocabulary',
        words: [
          { id: 'v89', word: 'competent', pronunciation: '/ˈkɑm.pə.tənt/', definition: 'Having necessary skills', example: 'Competent graphic designer.', vietnamese: 'có năng lực', alternatives: ['capable', 'skilled', 'qualified'] },
          { id: 'v90', word: 'creativity', pronunciation: '/kriːeɪˈtɪv.ə.t̬i/', definition: 'Ability to produce ideas', example: 'Your creativity valued.', vietnamese: 'sáng tạo', alternatives: ['originality', 'innovation', 'imagination'] },
          { id: 'v91', word: 'dedication', pronunciation: '/ˌded.ɪˈkeɪ.ʃən/', definition: 'Strong commitment', example: 'Appreciate dedication.', vietnamese: 'tận tâm', alternatives: ['commitment', 'devotion', 'loyalty'] },
          { id: 'v92', word: 'excellence', pronunciation: '/ˈek.sə.ləns/', definition: 'Quality of being great', example: 'Committed to excellence.', vietnamese: 'xuất sắc', alternatives: ['superiority', 'greatness', 'perfection'] },
          { id: 'v93', word: 'efficiency', pronunciation: '/ɪˈfɪʃ.ən.si/', definition: 'Accomplish with minimal waste', example: 'Work with efficiency.', vietnamese: 'hiệu quả', alternatives: ['effectiveness', 'productivity', 'competence'] },
          { id: 'v94', word: 'confidence', pronunciation: '/ˈkɑn.fə.dəns/', definition: 'Feeling of certainty', example: 'Present with confidence.', vietnamese: 'tự tin', alternatives: ['assurance', 'certainty', 'conviction'] },
          { id: 'v95', word: 'leadership', pronunciation: '/ˈliːd.ɚ.ʃɪp/', definition: 'Ability to lead', example: 'Strong leadership demonstrated.', vietnamese: 'lãnh đạo', alternatives: ['management', 'direction', 'guidance'] },
          { id: 'v96', word: 'initiative', pronunciation: '/ɪˈnɪʃ.ə.tɪv/', definition: 'Enterprise or readiness', example: 'Show initiative in work.', vietnamese: 'sáng kiến', alternatives: ['enterprise', 'drive', 'action'] },
          { id: 'v96b', word: 'mentorship', pronunciation: '/ˈmen.tɚ.ʃɪp/', definition: 'Guidance from experienced person', example: 'Seek mentorship from leaders.', vietnamese: 'hướng dẫn', alternatives: ['coaching', 'guidance', 'support'] },
          { id: 'v96c', word: 'accountability', pronunciation: '/əˌkaʊn.təˈbɪl.ə.t̬i/', definition: 'Responsible for actions', example: 'Take accountability for results.', vietnamese: 'trách nhiệm', alternatives: ['responsibility', 'liability', 'obligation'] },
        ],
      },
    },
  },

  advanced: {
    level: 'Advanced',
    categories: {
      professional_advanced: {
        id: 'professional_advanced',
        title: '🎯 Advanced Professional Vocabulary',
        description: 'Complex professional terms',
        words: [
          { id: 'v97', word: 'endeavor', pronunciation: '/ɪnˈdev.ɚ/', definition: 'Try hard to achieve', example: 'Endeavor for excellence.', vietnamese: 'cố gắng', alternatives: ['attempt', 'strive', 'effort'] },
          { id: 'v98', word: 'synergy', pronunciation: '/ˈsɪn.ɚ.dʒi/', definition: 'Interaction working effectively', example: 'Departmental synergy improves productivity.', vietnamese: 'sức mạnh tổng hợp', alternatives: ['cooperation', 'collaboration', 'teamwork'] },
          { id: 'v99', word: 'paradigm', pronunciation: '/ˈper.ə.daɪm/', definition: 'Typical model or pattern', example: 'New business paradigm.', vietnamese: 'mô hình', alternatives: ['model', 'example', 'framework'] },
          { id: 'v100', word: 'substantiate', pronunciation: '/səbˈstæn.ʃi.eɪt/', definition: 'Provide evidence to support', example: 'Substantiate proposal with data.', vietnamese: 'chứng minh', alternatives: ['prove', 'confirm', 'verify'] },
          { id: 'v101', word: 'circumvent', pronunciation: '/ˌsɝ.kəmˈvent/', definition: 'Avoid difficulty or rule', example: 'Don\'t circumvent policies.', vietnamese: 'vượt qua', alternatives: ['bypass', 'avoid', 'evade'] },
          { id: 'v102', word: 'facilitate', pronunciation: '/fəˈsɪl.ə.teɪt/', definition: 'Make easier to happen', example: 'Facilitate smooth coordination.', vietnamese: 'tạo điều kiện', alternatives: ['enable', 'help', 'promote'] },
          { id: 'v103', word: 'leverage', pronunciation: '/ˈlev.ɚ.ɪdʒ/', definition: 'Use to maximum advantage', example: 'Leverage market opportunities.', vietnamese: 'tận dụng', alternatives: ['utilize', 'exploit', 'use'] },
          { id: 'v104', word: 'reconcile', pronunciation: '/ˈrek.ən.saɪl/', definition: 'Make consistent', example: 'Reconcile differences.', vietnamese: 'hòa hợp', alternatives: ['resolve', 'settle', 'harmonize'] },
          { id: 'v105', word: 'consolidate', pronunciation: '/kənˈsɑl.ə.deɪt/', definition: 'Combine into one', example: 'Consolidate efforts.', vietnamese: 'gộp lại', alternatives: ['combine', 'merge', 'unite'] },
          { id: 'v106', word: 'articulate', pronunciation: '/ɑrˈtɪk.jə.leɪt/', definition: 'Express clearly', example: 'Articulate vision clearly.', vietnamese: 'bộc lộ', alternatives: ['express', 'state', 'voice'] },
          { id: 'v106b', word: 'juxtapose', pronunciation: '/ˈdʒʌks.tə.poʊz/', definition: 'Place side by side for comparison', example: 'Juxtapose old and new approaches.', vietnamese: 'so sánh', alternatives: ['compare', 'contrast', 'place beside'] },
          { id: 'v106c', word: 'augment', pronunciation: '/ɔɡˈment/', definition: 'Make greater in size or amount', example: 'Augment team resources.', vietnamese: 'tăng cường', alternatives: ['increase', 'enhance', 'expand'] },
          { id: 'v106d', word: 'mitigate', pronunciation: '/ˈmɪt.ɪ.ɡeɪt/', definition: 'Make less severe', example: 'Mitigate project risks.', vietnamese: 'giảm nhẹ', alternatives: ['reduce', 'lessen', 'minimize'] },
          { id: 'v106e', word: 'proliferate', pronunciation: '/prəˈlɪf.ə.reɪt/', definition: 'Increase rapidly in number', example: 'Innovation proliferates in tech.', vietnamese: 'phát triển nhanh', alternatives: ['multiply', 'spread', 'expand'] },
          { id: 'v106f', word: 'obfuscate', pronunciation: '/ˈɑb.fə.skeɪt/', definition: 'Make unclear or confusing', example: 'Don\'t obfuscate the issue.', vietnamese: 'làm tối tăm', alternatives: ['obscure', 'confuse', 'cloud'] },
        ],
      },
      technical: {
        id: 'technical',
        title: '⚙️ Technical & Specialized',
        description: 'Technical and specialized vocabulary',
        words: [
          { id: 'v107', word: 'algorithm', pronunciation: '/ˈæl.ɡə.rɪð.əm/', definition: 'Step-by-step procedure', example: 'Algorithm optimizes process.', vietnamese: 'thuật toán', alternatives: ['procedure', 'process', 'method'] },
          { id: 'v108', word: 'infrastructure', pronunciation: '/ˈɪn.frə.strʌk.tʃɚ/', definition: 'Basic systems and facilities', example: 'Improve IT infrastructure.', vietnamese: 'cơ sở hạ tầng', alternatives: ['foundation', 'base', 'framework'] },
          { id: 'v109', word: 'protocol', pronunciation: '/ˈproʊ.tə.kɑːl/', definition: 'Official procedure', example: 'Follow company protocol.', vietnamese: 'quy trình', alternatives: ['procedure', 'rules', 'guidelines'] },
          { id: 'v110', word: 'database', pronunciation: '/ˈdeɪ.tə.beɪs/', definition: 'Organized collection of data', example: 'Update customer database.', vietnamese: 'cơ sở dữ liệu', alternatives: ['databank', 'repository', 'archive'] },
          { id: 'v111', word: 'integrate', pronunciation: '/ˈɪn.tɪ.ɡreɪt/', definition: 'Combine parts into whole', example: 'Integrate systems.', vietnamese: 'tích hợp', alternatives: ['combine', 'merge', 'unify'] },
          { id: 'v112', word: 'module', pronunciation: '/ˈmɑː.djuːl/', definition: 'Self-contained unit', example: 'Training module available.', vietnamese: 'mô-đun', alternatives: ['unit', 'component', 'section'] },
          { id: 'v113', word: 'parameter', pronunciation: '/pəˈræm.ə.tɚ/', definition: 'Limit or boundary', example: 'Set project parameters.', vietnamese: 'tham số', alternatives: ['limit', 'boundary', 'specification'] },
          { id: 'v114', word: 'metric', pronunciation: '/ˈmet.rɪk/', definition: 'System of measurement', example: 'Track key metrics.', vietnamese: 'chỉ số', alternatives: ['measure', 'standard', 'benchmark'] },
          { id: 'v114b', word: 'scalability', pronunciation: '/ˌskeɪ.lə.ˈbɪl.ə.t̬i/', definition: 'Ability to grow and handle more', example: 'System scalability is crucial.', vietnamese: 'khả năng mở rộng', alternatives: ['expandability', 'growth', 'flexibility'] },
          { id: 'v114c', word: 'deprecate', pronunciation: '/ˈdep.rə.keɪt/', definition: 'Discourage use of old method', example: 'Deprecate legacy code.', vietnamese: 'không dùng nữa', alternatives: ['discontinue', 'replace', 'update'] },
          { id: 'v114d', word: 'redundancy', pronunciation: '/rɪˈdʌn.dən.si/', definition: 'Duplication for safety backup', example: 'System redundancy prevents failures.', vietnamese: 'dự phòng', alternatives: ['backup', 'duplication', 'failsafe'] },
          { id: 'v114e', word: 'latency', pronunciation: '/ˈleɪ.tən.si/', definition: 'Delay in response time', example: 'Reduce network latency.', vietnamese: 'độ trễ', alternatives: ['delay', 'lag', 'pause'] },
        ],
      },
      specialized: {
        id: 'specialized',
        title: '🔬 Specialized & Industry Terms',
        description: 'Industry-specific vocabulary',
        words: [
          { id: 'v115', word: 'compliance', pronunciation: '/kəmˈplaɪ.əns/', definition: 'Acting in accordance with rules', example: 'Ensure regulatory compliance.', vietnamese: 'tuân thủ', alternatives: ['adherence', 'conformity', 'obedience'] },
          { id: 'v116', word: 'sustainability', pronunciation: '/səˌsteɪ.nəˈbɪl.ə.t̬i/', definition: 'Ability to maintain long-term', example: 'Business sustainability important.', vietnamese: 'tính bền vững', alternatives: ['durability', 'viability', 'longevity'] },
          { id: 'v117', word: 'stakeholder', pronunciation: '/ˈsteɪk.hoʊl.dɚ/', definition: 'Person affected by decision', example: 'Consult all stakeholders.', vietnamese: 'người có quyền lợi', alternatives: ['shareholder', 'participant', 'interested party'] },
          { id: 'v118', word: 'liability', pronunciation: '/ˌlaɪ.əˈbɪl.ə.t̬i/', definition: 'Legal responsibility', example: 'Minimize company liability.', vietnamese: 'trách nhiệm pháp lý', alternatives: ['responsibility', 'obligation', 'debt'] },
          { id: 'v119', word: 'asset', pronunciation: '/ˈæs.et/', definition: 'Valuable resource or property', example: 'Valuable company assets.', vietnamese: 'tài sản', alternatives: ['property', 'resource', 'investment'] },
          { id: 'v120', word: 'equity', pronunciation: '/ˈek.wə.t̬i/', definition: 'Ownership stake in company', example: 'Equity compensation offered.', vietnamese: 'vốn chủ sở hữu', alternatives: ['ownership', 'stake', 'stock'] },
        ],
      },
    },
  },
};

// Helper functions (same as original)
export const getVocabularyByLevel = (level) => {
  const levelLower = level.toLowerCase();
  return VOCABULARY_DATA[levelLower] || VOCABULARY_DATA.beginner;
};

export const searchVocabulary = (query) => {
  const results = [];
  Object.values(VOCABULARY_DATA).forEach(levelData => {
    Object.values(levelData.categories).forEach(category => {
      const filtered = category.words.filter(word => 
        word.word.toLowerCase().includes(query.toLowerCase()) ||
        word.definition.toLowerCase().includes(query.toLowerCase()) ||
        word.vietnamese.toLowerCase().includes(query.toLowerCase()) ||
        word.alternatives.some(alt => alt.toLowerCase().includes(query.toLowerCase()))
      );
      results.push(...filtered);
    });
  });
  return results;
};

export const createFlashcards = (level) => {
  const levelData = getVocabularyByLevel(level);
  const flashcards = [];
  
  Object.values(levelData.categories).forEach(category => {
    category.words.forEach(word => {
      flashcards.push({
        id: word.id,
        front: word.word,
        back: word.definition,
        pronunciation: word.pronunciation,
        example: word.example,
        vietnamese: word.vietnamese,
        category: category.title,
        level: level,
      });
    });
  });

  return flashcards;
};

export const createQuiz = (level, count = 10) => {
  const allWords = [];
  const levelData = getVocabularyByLevel(level);
  
  Object.values(levelData.categories).forEach(category => {
    allWords.push(...category.words);
  });

  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, allWords.length));

  return selected.map(word => ({
    id: word.id,
    word: word.word,
    options: [
      word.definition,
      word.alternatives[0],
      word.alternatives[1],
      word.alternatives[2],
    ].sort(() => Math.random() - 0.5),
    correct: word.definition,
    pronunciation: word.pronunciation,
    vietnamese: word.vietnamese,
    example: word.example,
  }));
};

export const getExamVocabulary = () => {
  let totalWords = 0;
  Object.values(VOCABULARY_DATA).forEach(levelData => {
    Object.values(levelData.categories).forEach(category => {
      totalWords += category.words.length;
    });
  });

  return {
    totalWords: totalWords,
    examTopics: ['Travel', 'Business', 'Communication', 'Analysis', 'Marketing', 'Professional', 'Technical'],
    levelCounts: {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    },
  };
};

export const getWordsByDifficulty = (level) => {
  const words = [];
  const levelData = getVocabularyByLevel(level);
  
  Object.values(levelData.categories).forEach(category => {
    words.push(...category.words);
  });

  return {
    level: level,
    totalWords: words.length,
    words: words,
  };
};

export const getCategoryStats = (level = 'beginner') => {
  const levelData = getVocabularyByLevel(level);
  const stats = {};
  
  Object.entries(levelData.categories).forEach(([key, category]) => {
    stats[key] = {
      name: category.title,
      count: category.words.length,
      description: category.description,
    };
  });

  return stats;
};

export const getRandomWord = (level = 'beginner') => {
  const levelData = getVocabularyByLevel(level);
  const allWords = [];
  Object.values(levelData.categories).forEach(category => {
    allWords.push(...category.words);
  });
  return allWords[Math.floor(Math.random() * allWords.length)];
};

export const getAllWords = () => {
  const allWords = [];
  Object.values(VOCABULARY_DATA).forEach(levelData => {
    Object.values(levelData.categories).forEach(category => {
      allWords.push(...category.words);
    });
  });
  return allWords;
};

export const getVocabularyByCategory = (category, level = 'beginner') => {
  const levelData = getVocabularyByLevel(level);
  return levelData.categories[category]?.words || [];
};

export default VOCABULARY_DATA;