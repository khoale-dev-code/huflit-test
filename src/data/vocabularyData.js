// vocabularyData.js - HUFLIT Extended (210+ words) với thêm categories phù hợp ôn luyện đầu ra HUFLIT
// Tập trung từ vựng thực dụng cho TOEIC/IELTS-style, hỗ trợ người Việt học CNTT + ngoại ngữ

export const VOCABULARY_DATA = {
  beginner: {
    level: 'Beginner (Người Mới)',
    categories: {
      travel: {
        id: 'travel',
        title: '✈️ Travel & Places (Du Lịch & Nơi Chốn)',
        description: 'Vocabulary related to travel and locations from HUFLIT exam (Từ vựng liên quan du lịch và vị trí từ kỳ thi HUFLIT)',
        words: [
          { id: 'v1', word: 'destination', pronunciation: '/ˌdes.tɪˈneɪ.ʃən/', definition: 'A place where someone is going', example: 'Tokyo is a popular destination for tourists.', vietnamese: 'điểm đến', alternatives: ['place', 'location', 'spot'] },
          { id: 'v2', word: 'convenient', pronunciation: '/kənˈven.jənt/', definition: 'Easy to access or use', example: 'The airport is convenient for travelers.', vietnamese: 'tiện lợi', alternatives: ['easy', 'handy', 'accessible'] },
          { id: 'v3', word: 'purchase', pronunciation: '/ˈpɜː.tʃəs/', definition: 'To buy something', example: 'I purchased a ticket online.', vietnamese: 'mua', alternatives: ['buy', 'acquire', 'obtain'] },
          { id: 'v4', word: 'receipt', pronunciation: '/rɪˈsiːt/', definition: 'Written proof of payment', example: 'Keep your receipt for refund.', vietnamese: 'hóa đơn', alternatives: ['proof', 'invoice', 'ticket'] },
          { id: 'v5', word: 'refund', pronunciation: '/ˈriː.fʌnd/', definition: 'Money returned for unsatisfactory product', example: 'I requested a refund.', vietnamese: 'hoàn tiền', alternatives: ['reimbursement', 'repayment', 'return'] },
          { id: 'v6', word: 'souvenir', pronunciation: '/ˈsuː.və.nɪər/', definition: 'Object kept as reminder of place', example: 'I bought many souvenirs.', vietnamese: 'quà lưu niệm', alternatives: ['memento', 'keepsake', 'token'] },
          { id: 'v7', word: 'journey', pronunciation: '/ˈdʒɜː.ni/', definition: 'Trip from one place to another', example: 'My journey was wonderful.', vietnamese: 'chuyến đi', alternatives: ['trip', 'voyage', 'expedition'] },
          { id: 'v8', word: 'accommodation', pronunciation: '/əˌkɒm.əˈdeɪ.ʃən/', definition: 'Place to live or stay', example: 'Excellent accommodation provided.', vietnamese: 'chỗ ở', alternatives: ['lodging', 'housing', 'quarters'] },
          { id: 'v9', word: 'customs', pronunciation: '/ˈkʌs.təmz/', definition: 'Government border agency', example: 'Pass through customs at airport.', vietnamese: 'hải quan', alternatives: ['border control', 'immigration', 'checkpoint'] },
          { id: 'v10', word: 'delay', pronunciation: '/dɪˈleɪ/', definition: 'To make late', example: 'Flight delayed by weather.', vietnamese: 'trễ nãi', alternatives: ['postpone', 'hold up', 'lag'] },
          { id: 'v11', word: 'arrival', pronunciation: '/əˈraɪ.vəl/', definition: 'Act of arriving at place', example: 'Expected arrival time is 8pm.', vietnamese: 'sự đến', alternatives: ['coming', 'entrance', 'appearance'] },
          { id: 'v12', word: 'departure', pronunciation: '/dɪˈpɑː.tʃər/', definition: 'Act of leaving a place', example: 'Flight departure is at 10am.', vietnamese: 'sự khởi hành', alternatives: ['leaving', 'exit', 'takeoff'] },
          { id: 'v13', word: 'ticket', pronunciation: '/ˈtɪk.ɪt/', definition: 'Document allowing entry or travel', example: 'Book your flight ticket online.', vietnamese: 'vé', alternatives: ['pass', 'permit', 'voucher'] },
          { id: 'v14', word: 'luggage', pronunciation: '/ˈlʌɡ.ɪdʒ/', definition: 'Bags for carrying belongings while traveling', example: 'Check your luggage at counter.', vietnamese: 'hành lý', alternatives: ['baggage', 'bags', 'suitcase'] },
          { id: 'v15', word: 'weather', pronunciation: '/ˈweð.ər/', definition: 'Atmospheric conditions', example: 'Bad weather caused delays.', vietnamese: 'thời tiết', alternatives: ['climate', 'conditions', 'forecast'] },
        ],
      },
      business: {
        id: 'business',
        title: '💼 Business & Work (Kinh Doanh & Công Việc)',
        description: 'Professional and work vocabulary for HUFLIT exam (Từ vựng chuyên nghiệp và công việc cho kỳ thi HUFLIT)',
        words: [
          { id: 'v16', word: 'deadline', pronunciation: '/ˈded.laɪn/', definition: 'Final date for completion', example: 'Deadline is Friday, March 22.', vietnamese: 'hạn chót', alternatives: ['limit', 'cutoff', 'due date'] },
          { id: 'v17', word: 'collaborate', pronunciation: '/kəˈlæb.ə.reɪt/', definition: 'Work together with others', example: 'Collaborate with sales team.', vietnamese: 'cộng tác', alternatives: ['cooperate', 'work together', 'team up'] },
          { id: 'v18', word: 'coordinator', pronunciation: '/koʊˈɔːr.də.neɪ.tər/', definition: 'Person organizing elements', example: 'Project coordinator manages tasks.', vietnamese: 'điều phối viên', alternatives: ['organizer', 'manager', 'supervisor'] },
          { id: 'v19', word: 'orientation', pronunciation: '/ɔːr.i.enˈteɪ.ʃən/', definition: 'Training for new employees', example: 'Orientation covers policies.', vietnamese: 'hướng dẫn', alternatives: ['training', 'induction', 'briefing'] },
          { id: 'v20', word: 'implement', pronunciation: '/ˈɪm.plə.ment/', definition: 'Put plan into effect', example: 'Implement suggestions for improvement.', vietnamese: 'thực hiện', alternatives: ['execute', 'carry out', 'apply'] },
          { id: 'v21', word: 'strategy', pronunciation: '/ˈstræt.ə.dʒi/', definition: 'Plan to achieve goal', example: 'Finalize promotional strategy.', vietnamese: 'chiến lược', alternatives: ['plan', 'approach', 'tactic'] },
          { id: 'v22', word: 'feedback', pronunciation: '/ˈfiːd.bæk/', definition: 'Comments about performance', example: 'Collect feedback from clients.', vietnamese: 'phản hồi', alternatives: ['response', 'input', 'comment'] },
          { id: 'v23', word: 'presentation', pronunciation: '/ˌprez.ənˈteɪ.ʃən/', definition: 'Event showing information to audience', example: 'Professional presentation required.', vietnamese: 'thuyết trình', alternatives: ['speech', 'display', 'show'] },
          { id: 'v24', word: 'department', pronunciation: '/dɪˈpɑːrt.mənt/', definition: 'Section of organization', example: 'Marketing department plans campaign.', vietnamese: 'bộ phận', alternatives: ['division', 'section', 'unit'] },
          { id: 'v25', word: 'responsibility', pronunciation: '/rɪˌspɑːn.səˈbɪl.ə.ti/', definition: 'Duty or task expected', example: 'Specific responsibilities assigned.', vietnamese: 'trách nhiệm', alternatives: ['duty', 'obligation', 'task'] },
          { id: 'v26', word: 'objective', pronunciation: '/əbˈdʒek.tɪv/', definition: 'Goal to achieve', example: 'Primary objective is brand awareness.', vietnamese: 'mục tiêu', alternatives: ['goal', 'aim', 'target'] },
          { id: 'v27', word: 'adjustment', pronunciation: '/əˈdʒʌst.mənt/', definition: 'Small change to something', example: 'Make adjustments before release.', vietnamese: 'điều chỉnh', alternatives: ['modification', 'alteration', 'change'] },
          { id: 'v28', word: 'employee', pronunciation: '/ɪmˈplɔɪ.iː/', definition: 'Person working for company', example: 'New employee orientation required.', vietnamese: 'nhân viên', alternatives: ['worker', 'staff', 'personnel'] },
          { id: 'v29', word: 'manager', pronunciation: '/ˈmæn.ɪ.dʒər/', definition: 'Person supervising others', example: 'Manager approved the proposal.', vietnamese: 'quản lý', alternatives: ['supervisor', 'director', 'executive'] },
          { id: 'v30', word: 'meeting', pronunciation: '/ˈmiː.tɪŋ/', definition: 'Gathering of people to discuss', example: 'Meeting scheduled for tomorrow.', vietnamese: 'cuộc họp', alternatives: ['conference', 'session', 'gathering'] },
        ],
      },
      dailyLife: {
        id: 'dailyLife',
        title: '🏠 Daily Life & Family (Cuộc Sống Hàng Ngày & Gia Đình)',
        description: 'Vocabulary for everyday conversations and family life (Từ vựng cho giao tiếp hàng ngày và gia đình)',
        words: [
          { id: 'v31', word: 'family', pronunciation: '/ˈfæm.ə.li/', definition: 'Group of related people', example: 'My family is important to me.', vietnamese: 'gia đình', alternatives: ['relatives', 'household', 'kin'] },
          { id: 'v32', word: 'home', pronunciation: '/hoʊm/', definition: 'Place where one lives', example: 'I love my home.', vietnamese: 'nhà', alternatives: ['house', 'residence', 'dwelling'] },
          { id: 'v33', word: 'breakfast', pronunciation: '/ˈbrek.fəst/', definition: 'First meal of the day', example: 'Eat breakfast every morning.', vietnamese: 'bữa sáng', alternatives: ['morning meal', 'first meal', 'brunch'] },
          { id: 'v34', word: 'routine', pronunciation: '/ruːˈtiːn/', definition: 'Regular sequence of actions', example: 'My morning routine is simple.', vietnamese: 'thói quen', alternatives: ['schedule', 'habit', 'pattern'] },
          { id: 'v35', word: 'grocery', pronunciation: '/ˈɡroʊ.sər.i/', definition: 'Food and household items', example: 'Go grocery shopping.', vietnamese: 'thực phẩm', alternatives: ['food', 'supplies', 'essentials'] },
          { id: 'v36', word: 'laundry', pronunciation: '/ˈlɑːn.dri/', definition: 'Washing clothes', example: 'Do the laundry weekly.', vietnamese: 'giặt giũ', alternatives: ['washing', 'cleaning', 'housework'] },
          { id: 'v37', word: 'cooking', pronunciation: '/ˈkʊk.ɪŋ/', definition: 'Preparing food', example: 'I enjoy cooking dinner.', vietnamese: 'nấu ăn', alternatives: ['preparing', 'baking', 'meal making'] },
          { id: 'v38', word: 'exercise', pronunciation: '/ˈek.sɚ.saɪz/', definition: 'Physical activity for health', example: 'Daily exercise is good.', vietnamese: 'tập thể dục', alternatives: ['workout', 'training', 'fitness'] },
          { id: 'v39', word: 'relax', pronunciation: '/rɪˈlæks/', definition: 'Rest and unwind', example: 'Relax after work.', vietnamese: 'thư giãn', alternatives: ['rest', 'unwind', 'chill'] },
          { id: 'v40', word: 'hobby', pronunciation: '/ˈhɑː.bi/', definition: 'Activity done for pleasure', example: 'Reading is my hobby.', vietnamese: 'sở thích', alternatives: ['pastime', 'interest', 'leisure'] },
          { id: 'v41', word: 'neighbor', pronunciation: '/ˈneɪ.bɚ/', definition: 'Person living nearby', example: 'My neighbor is friendly.', vietnamese: 'hàng xóm', alternatives: ['resident', 'local', 'dweller'] },
          { id: 'v42', word: 'appointment', pronunciation: '/əˈpɔɪn.t̬mənt/', definition: 'Scheduled meeting', example: 'Doctor appointment at 3 PM.', vietnamese: 'cuộc hẹn', alternatives: ['meeting', 'schedule', 'engagement'] },
          { id: 'v43', word: 'bill', pronunciation: '/bɪl/', definition: 'Money owed for services', example: 'Pay the electricity bill.', vietnamese: 'hóa đơn', alternatives: ['invoice', 'charge', 'payment'] },
          { id: 'v44', word: 'commute', pronunciation: '/kəˈmjuːt/', definition: 'Travel to work', example: 'Long commute tires me.', vietnamese: 'đi làm', alternatives: ['travel', 'journey', 'ride'] },
          { id: 'v45', word: 'pet', pronunciation: '/pet/', definition: 'Domestic animal', example: 'My pet dog is cute.', vietnamese: 'thú cưng', alternatives: ['animal', 'companion', 'pet'] },
          { id: 'v46', word: 'gardening', pronunciation: '/ˈɡɑːr.dən.ɪŋ/', definition: 'Growing plants', example: 'Gardening relaxes me.', vietnamese: 'làm vườn', alternatives: ['planting', 'horticulture', 'cultivation'] },
          { id: 'v47', word: 'cleaning', pronunciation: '/ˈkliː.nɪŋ/', definition: 'Removing dirt', example: 'Weekly house cleaning.', vietnamese: 'dọn dẹp', alternatives: ['housework', 'tidying', 'sanitizing'] },
          { id: 'v48', word: 'shopping', pronunciation: '/ˈʃɑː.pɪŋ/', definition: 'Buying goods', example: 'Weekend shopping trip.', vietnamese: 'mua sắm', alternatives: ['purchasing', 'retail', 'buying'] },
          { id: 'v49', word: 'reading', pronunciation: '/ˈriː.dɪŋ/', definition: 'Looking at books', example: 'Evening reading time.', vietnamese: 'đọc sách', alternatives: ['literature', 'study', 'perusal'] },
          { id: 'v50', word: 'sleeping', pronunciation: '/ˈsliː.pɪŋ/', definition: 'Resting at night', example: 'Get 8 hours of sleeping.', vietnamese: 'ngủ', alternatives: ['rest', 'nap', 'dormancy'] },
        ],
      },
    },
  },
  intermediate: {
    level: 'Intermediate (Trung Cấp)',
    categories: {
      technology: {
        id: 'technology',
        title: '💻 Technology & Innovation (Công Nghệ & Đổi Mới)',
        description: 'Vocabulary for digital and tech topics in HUFLIT (Từ vựng công nghệ và kỹ thuật số cho HUFLIT)',
        words: [
          { id: 'v51', word: 'software', pronunciation: '/ˈsɒf.tweə r/', definition: 'Computer programs and systems', example: 'Update your software regularly.', vietnamese: 'phần mềm', alternatives: ['program', 'application', 'system'] },
          { id: 'v52', word: 'hardware', pronunciation: '/ˈhɑː.dweə r/', definition: 'Physical computer parts', example: 'Purchase new hardware.', vietnamese: 'phần cứng', alternatives: ['equipment', 'device', 'machine'] },
          { id: 'v53', word: 'digital', pronunciation: '/ˈdɪdʒ.ɪ.təl/', definition: 'Using computer technology', example: 'Digital transformation is essential.', vietnamese: 'kỹ thuật số', alternatives: ['electronic', 'computerized', 'virtual'] },
          { id: 'v54', word: 'interface', pronunciation: '/ˈɪn.tə.feɪs/', definition: 'Way to interact with device', example: 'User-friendly interface design.', vietnamese: 'giao diện', alternatives: ['display', 'screen', 'control'] },
          { id: 'v55', word: 'browser', pronunciation: '/ˈbraʊ.zər/', definition: 'Software to view web pages', example: 'Open your web browser.', vietnamese: 'trình duyệt', alternatives: ['application', 'program', 'viewer'] },
          { id: 'v56', word: 'download', pronunciation: '/ˈdaʊn.ləʊd/', definition: 'Transfer from internet to device', example: 'Download the file here.', vietnamese: 'tải xuống', alternatives: ['save', 'transfer', 'retrieve'] },
          { id: 'v57', word: 'upload', pronunciation: '/ʌpˈləʊd/', definition: 'Transfer from device to internet', example: 'Upload your resume online.', vietnamese: 'tải lên', alternatives: ['send', 'transfer', 'submit'] },
          { id: 'v58', word: 'email', pronunciation: '/ˈiː.meɪl/', definition: 'Electronic message system', example: 'Check your email daily.', vietnamese: 'thư điện tử', alternatives: ['message', 'correspondence', 'mail'] },
          { id: 'v59', word: 'password', pronunciation: '/ˈpɑːs.wɜːd/', definition: 'Secret code to access account', example: 'Create a strong password.', vietnamese: 'mật khẩu', alternatives: ['code', 'pin', 'key'] },
          { id: 'v60', word: 'cyber', pronunciation: '/ˈsaɪ.bər/', definition: 'Related to computers/internet', example: 'Cyber security is critical.', vietnamese: 'mạng', alternatives: ['digital', 'internet', 'online'] },
          { id: 'v61', word: 'artificial intelligence', pronunciation: '/ɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/', definition: 'Computer systems mimicking human intelligence', example: 'AI improves customer service.', vietnamese: 'trí tuệ nhân tạo', alternatives: ['AI', 'machine learning', 'automation'] },
          { id: 'v62', word: 'innovation', pronunciation: '/ˌɪn.əˈveɪ.ʃən/', definition: 'New idea or invention', example: 'Technology innovation drives growth.', vietnamese: 'đổi mới', alternatives: ['invention', 'improvement', 'breakthrough'] },
          { id: 'v63', word: 'virtual', pronunciation: '/ˈvɜː.tʃu.əl/', definition: 'Existing in computer simulation', example: 'Virtual meetings are common now.', vietnamese: 'ảo', alternatives: ['online', 'digital', 'simulated'] },
          { id: 'v64', word: 'connectivity', pronunciation: '/kəˌnekˈtɪv.ə.ti/', definition: 'Ability to connect devices', example: 'Global connectivity is essential.', vietnamese: 'kết nối', alternatives: ['connection', 'link', 'network'] },
          { id: 'v65', word: 'backup', pronunciation: '/ˈbæk.ʌp/', definition: 'Copy of important data', example: 'Always make backups.', vietnamese: 'sao lưu', alternatives: ['copy', 'reserve', 'duplicate'] },
          { id: 'v66', word: 'cloud', pronunciation: '/klaʊd/', definition: 'Internet data storage', example: 'Store files in the cloud.', vietnamese: 'đám mây', alternatives: ['server', 'storage', 'internet'] },
          { id: 'v67', word: 'update', pronunciation: '/ʌpˈdeɪt/', definition: 'Make current with latest info', example: 'Update your information.', vietnamese: 'cập nhật', alternatives: ['refresh', 'upgrade', 'renew'] },
          { id: 'v68', word: 'data', pronunciation: '/ˈdeɪ.tə/', definition: 'Information in digital form', example: 'Analyze the data carefully.', vietnamese: 'dữ liệu', alternatives: ['information', 'statistics', 'facts'] },
          { id: 'v69', word: 'platform', pronunciation: '/ˈplæt.fɔːrm/', definition: 'System for running applications', example: 'Choose the right platform.', vietnamese: 'nền tảng', alternatives: ['base', 'system', 'foundation'] },
          { id: 'v70', word: 'bandwidth', pronunciation: '/ˈbænd.wɪdθ/', definition: 'Capacity of data transmission', example: 'Increase bandwidth for speed.', vietnamese: 'băng thông', alternatives: ['capacity', 'speed', 'throughput'] },
        ],
      },
      environment: {
        id: 'environment',
        title: '🌍 Environment & Sustainability (Môi Trường & Bền Vững)',
        description: 'Environmental and sustainability vocabulary for awareness (Từ vựng môi trường và bền vững để nâng cao nhận thức)',
        words: [
          { id: 'v71', word: 'climate', pronunciation: '/ˈklaɪ.mət/', definition: 'Long-term weather patterns', example: 'Climate change affects everyone.', vietnamese: 'khí hậu', alternatives: ['weather', 'conditions', 'atmosphere'] },
          { id: 'v72', word: 'pollution', pronunciation: '/pəˈluː.ʃən/', definition: 'Contamination of environment', example: 'Reduce air pollution.', vietnamese: 'ô nhiễm', alternatives: ['contamination', 'waste', 'hazard'] },
          { id: 'v73', word: 'renewable', pronunciation: '/rɪˈnjuː.ə.bəl/', definition: 'Can be replaced or replenished', example: 'Renewable energy is important.', vietnamese: 'tái tạo được', alternatives: ['sustainable', 'replenishable', 'inexhaustible'] },
          { id: 'v74', word: 'conservation', pronunciation: '/ˌkɒn.səˈveɪ.ʃən/', definition: 'Preservation of resources', example: 'Water conservation saves lives.', vietnamese: 'bảo tồn', alternatives: ['preservation', 'protection', 'safeguard'] },
          { id: 'v75', word: 'ecosystem', pronunciation: '/ˈiː.kəʊˌsɪs.təm/', definition: 'Community of organisms in area', example: 'Protect natural ecosystems.', vietnamese: 'hệ sinh thái', alternatives: ['environment', 'habitat', 'biome'] },
          { id: 'v76', word: 'sustainable', pronunciation: '/səˈsteɪ.nə.bəl/', definition: 'Can be maintained long-term', example: 'Sustainable practices benefit all.', vietnamese: 'bền vững', alternatives: ['eco-friendly', 'green', 'responsible'] },
          { id: 'v77', word: 'carbon', pronunciation: '/ˈkɑː.bən/', definition: 'Element in atmosphere', example: 'Reduce carbon emissions.', vietnamese: 'carbon', alternatives: ['greenhouse gas', 'pollution', 'emissions'] },
          { id: 'v78', word: 'emission', pronunciation: '/ɪˈmɪʃ.ən/', definition: 'Release into atmosphere', example: 'Lower vehicle emissions.', vietnamese: 'phát thải', alternatives: ['discharge', 'release', 'exhaust'] },
          { id: 'v79', word: 'recycle', pronunciation: '/riːˈsaɪ.kəl/', definition: 'Use again in new form', example: 'Always recycle paper.', vietnamese: 'tái chế', alternatives: ['reuse', 'repurpose', 'recover'] },
          { id: 'v80', word: 'biodiversity', pronunciation: '/ˌbaɪ.oʊ.daɪˈvɜːr.sə.ti/', definition: 'Variety of species in area', example: 'Protect biodiversity.', vietnamese: 'đa dạng sinh học', alternatives: ['variety', 'diversity', 'species range'] },
          { id: 'v81', word: 'fossil fuel', pronunciation: '/ˈfɑː.səl ˈfjuː.əl/', definition: 'Fuel from ancient organisms', example: 'Move away from fossil fuels.', vietnamese: 'nhiên liệu hoá thạch', alternatives: ['coal', 'oil', 'gas'] },
          { id: 'v82', word: 'habitat', pronunciation: '/ˈhæb.ɪ.tæt/', definition: 'Natural home of organisms', example: 'Protect animal habitats.', vietnamese: 'môi trường sống', alternatives: ['environment', 'home', 'ecosystem'] },
          { id: 'v83', word: 'greenhouse', pronunciation: '/ˈɡriːn.haʊs/', definition: 'Structure for plants or effect', example: 'Greenhouse effect warms planet.', vietnamese: 'nhà kính', alternatives: ['warming', 'effect', 'climate'] },
          { id: 'v84', word: 'organic', pronunciation: '/ɔːrˈɡæn.ɪk/', definition: 'From nature, not synthetic', example: 'Buy organic produce.', vietnamese: 'hữu cơ', alternatives: ['natural', 'ecological', 'biological'] },
          { id: 'v85', word: 'deforestation', pronunciation: '/diːˌfɒr.ɪˈsteɪ.ʃən/', definition: 'Removal of trees', example: 'Stop deforestation now.', vietnamese: 'phá rừng', alternatives: ['logging', 'clearing', 'timber removal'] },
          { id: 'v86', word: 'pesticide', pronunciation: '/ˈpes.tɪ.saɪd/', definition: 'Chemical to kill pests', example: 'Use pesticides carefully.', vietnamese: 'thuốc trừ sâu', alternatives: ['chemical', 'insecticide', 'herbicide'] },
          { id: 'v87', word: 'erosion', pronunciation: '/ɪˈrəʊ.ʒən/', definition: 'Wearing away of earth', example: 'Soil erosion is serious.', vietnamese: 'xói mòn', alternatives: ['wearing', 'degradation', 'loss'] },
          { id: 'v88', word: 'aquatic', pronunciation: '/əˈkwæt.ɪk/', definition: 'Relating to water', example: 'Aquatic life needs protection.', vietnamese: 'thuỷ sinh', alternatives: ['water-based', 'marine', 'underwater'] },
          { id: 'v89', word: 'landfill', pronunciation: '/ˈlænd.fɪl/', definition: 'Place for waste disposal', example: 'Reduce landfill waste.', vietnamese: 'bãi rác', alternatives: ['dump', 'waste site', 'disposal area'] },
          { id: 'v90', word: 'sustainable development', pronunciation: '/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/', definition: 'Growth without harming environment', example: 'Sustainable development is our goal.', vietnamese: 'phát triển bền vững', alternatives: ['green growth', 'eco-development', 'responsible growth'] },
        ],
      },
      education: {
        id: 'education',
        title: '📚 Education & Learning (Giáo Dục & Học Tập)',
        description: 'Educational vocabulary for academic success at HUFLIT (Từ vựng giáo dục cho thành công học thuật tại HUFLIT)',
        words: [
          { id: 'v91', word: 'curriculum', pronunciation: '/kəˈrɪk.jə.ləm/', definition: 'Subjects taught in school', example: 'Update the curriculum.', vietnamese: 'chương trình học', alternatives: ['program', 'course', 'syllabus'] },
          { id: 'v92', word: 'assess', pronunciation: '/əˈses/', definition: 'Evaluate or judge', example: 'Assess student performance.', vietnamese: 'đánh giá', alternatives: ['evaluate', 'test', 'measure'] },
          { id: 'v93', word: 'graduate', pronunciation: '/ˈɡrædʒ.u.eɪt/', definition: 'Finish school program', example: 'Graduate with honors.', vietnamese: 'tốt nghiệp', alternatives: ['complete', 'finish', 'pass'] },
          { id: 'v94', word: 'scholarship', pronunciation: '/ˈskɑː.lər.ʃɪp/', definition: 'Financial aid for students', example: 'Apply for scholarship.', vietnamese: 'học bổng', alternatives: ['grant', 'aid', 'funding'] },
          { id: 'v95', word: 'tuition', pronunciation: '/tuːˈɪʃ.ən/', definition: 'Fee for education', example: 'Tuition fees increased.', vietnamese: 'học phí', alternatives: ['fee', 'cost', 'payment'] },
          { id: 'v96', word: 'mentor', pronunciation: '/ˈmen.tɔːr/', definition: 'Experienced guide or advisor', example: 'Find a good mentor.', vietnamese: 'người hướng dẫn', alternatives: ['advisor', 'guide', 'tutor'] },
          { id: 'v97', word: 'lecture', pronunciation: '/ˈlek.tʃɚ/', definition: 'Class taught by professor', example: 'Attend the lecture.', vietnamese: 'bài giảng', alternatives: ['class', 'talk', 'presentation'] },
          { id: 'v98', word: 'dissertation', pronunciation: '/ˌdɪs.ɚˈteɪ.ʃən/', definition: 'Long research paper', example: 'Write a dissertation.', vietnamese: 'luận án', alternatives: ['thesis', 'paper', 'research'] },
          { id: 'v99', word: 'laboratory', pronunciation: '/ˈlæb.rə.tɔːr.i/', definition: 'Place for experiments', example: 'Work in the laboratory.', vietnamese: 'phòng thí nghiệm', alternatives: ['lab', 'experiment room', 'research area'] },
          { id: 'v100', word: 'exam', pronunciation: '/ɪɡˈzæm/', definition: 'Test of knowledge', example: 'Pass your exams.', vietnamese: 'kỳ thi', alternatives: ['test', 'quiz', 'assessment'] },
          { id: 'v101', word: 'major', pronunciation: '/ˈmeɪ.dʒɚ/', definition: 'Principal subject of study', example: 'My major is English.', vietnamese: 'chuyên ngành', alternatives: ['subject', 'discipline', 'field'] },
          { id: 'v102', word: 'semester', pronunciation: '/səˈmes.tɚ/', definition: 'Half-year academic term', example: 'Last semester was busy.', vietnamese: 'học kỳ', alternatives: ['term', 'period', 'session'] },
          { id: 'v103', word: 'academic', pronunciation: '/ˌæk.əˈdem.ɪk/', definition: 'Related to education', example: 'Academic excellence required.', vietnamese: 'học thuật', alternatives: ['educational', 'scholarly', 'intellectual'] },
          { id: 'v104', word: 'faculty', pronunciation: '/ˈfæk.əl.ti/', definition: 'Teachers in school', example: 'Faculty meeting today.', vietnamese: 'khoa', alternatives: ['department', 'staff', 'teachers'] },
          { id: 'v105', word: 'enroll', pronunciation: '/ɪnˈroʊl/', definition: 'Register for course', example: 'Enroll in the course.', vietnamese: 'nhập học', alternatives: ['register', 'sign up', 'enter'] },
          { id: 'v106', word: 'degree', pronunciation: '/dɪˈɡriː/', definition: 'Certificate of education', example: 'Earn a degree.', vietnamese: 'bằng cấp', alternatives: ['qualification', 'certificate', 'diploma'] },
          { id: 'v107', word: 'research', pronunciation: '/rɪˈsɜːrtʃ/', definition: 'Detailed investigation', example: 'Conduct research.', vietnamese: 'nghiên cứu', alternatives: ['study', 'investigation', 'analysis'] },
          { id: 'v108', word: 'assignment', pronunciation: '/əˈsaɪn.mənt/', definition: 'Task given by teacher', example: 'Complete the assignment.', vietnamese: 'bài tập', alternatives: ['homework', 'task', 'project'] },
          { id: 'v109', word: 'lecture', pronunciation: '/ˈlek.tʃɚ/', definition: 'Talk by expert', example: 'Attend the lecture on AI.', vietnamese: 'bài giảng', alternatives: ['seminar', 'talk', 'class'] },
          { id: 'v110', word: 'tutor', pronunciation: '/ˈtuː.t̬ɚ/', definition: 'Private teacher', example: 'Hire a math tutor.', vietnamese: 'gia sư', alternatives: ['teacher', 'mentor', 'coach'] },
          { id: 'v111', word: 'deadline', pronunciation: '/ˈded.laɪn/', definition: 'Due date for work', example: 'Meet the deadline.', vietnamese: 'hạn chót', alternatives: ['due date', 'limit', 'cutoff'] },
          { id: 'v112', word: 'syllabus', pronunciation: '/ˈsɪl.ə.bəs/', definition: 'Course outline', example: 'Review the syllabus.', vietnamese: 'chương trình học', alternatives: ['curriculum', 'outline', 'plan'] },
          { id: 'v113', word: 'plagiarism', pronunciation: '/ˈpleɪ.dʒər.ɪ.zəm/', definition: 'Copying others\' work', example: 'Avoid plagiarism.', vietnamese: 'đạo văn', alternatives: ['copying', 'theft', 'cheating'] },
          { id: 'v114', word: 'peer', pronunciation: '/pɪr/', definition: 'Person of same age/status', example: 'Peer review process.', vietnamese: 'đồng nghiệp', alternatives: ['colleague', 'equal', 'fellow'] },
          { id: 'v115', word: 'seminar', pronunciation: '/ˈsem.ə.nɑːr/', definition: 'Group discussion class', example: 'Join the seminar.', vietnamese: 'hội thảo', alternatives: ['workshop', 'discussion', 'class'] },
          { id: 'v116', word: 'thesis', pronunciation: '/ˈθiː.sɪs/', definition: 'Long academic paper', example: 'Write your thesis.', vietnamese: 'luận văn', alternatives: ['dissertation', 'paper', 'essay'] },
          { id: 'v117', word: 'enrollment', pronunciation: '/ɪnˈroʊl.mənt/', definition: 'Act of signing up', example: 'Enrollment period open.', vietnamese: 'sự đăng ký', alternatives: ['registration', 'admission', 'sign-up'] },
          { id: 'v118', word: 'lecture hall', pronunciation: '/ˈlek.tʃɚ hɔːl/', definition: 'Room for large classes', example: 'Meet in lecture hall.', vietnamese: 'phòng học lớn', alternatives: ['auditorium', 'classroom', 'theater'] },
          { id: 'v119', word: 'midterm', pronunciation: '/ˌmɪdˈtɜːrm/', definition: 'Test in middle of semester', example: 'Prepare for midterm.', vietnamese: 'thi giữa kỳ', alternatives: ['interim test', 'half-term', 'mid-semester'] },
          { id: 'v120', word: 'transcript', pronunciation: '/ˈtræn.skript/', definition: 'Record of grades', example: 'Request transcript.', vietnamese: 'bảng điểm', alternatives: ['record', 'gradesheet', 'report'] },
        ],
      },
      health: {
        id: 'health',
        title: '🏥 Health & Wellness (Sức Khỏe)',
        description: 'Vocabulary for health discussions and wellness (Từ vựng thảo luận sức khỏe và sức khỏe)',
        words: [
          { id: 'v121', word: 'nutrition', pronunciation: '/nuːˈtrɪʃ.ən/', definition: 'Food needed for health', example: 'Balanced nutrition is key.', vietnamese: 'dinh dưỡng', alternatives: ['diet', 'food', 'nourishment'] },
          { id: 'v122', word: 'exercise', pronunciation: '/ˈek.sɚ.saɪz/', definition: 'Physical activity for health', example: 'Daily exercise is good.', vietnamese: 'tập thể dục', alternatives: ['workout', 'training', 'fitness'] },
          { id: 'v123', word: 'symptom', pronunciation: '/ˈsɪmp.təm/', definition: 'Sign of illness', example: 'Fever is a symptom.', vietnamese: 'triệu chứng', alternatives: ['sign', 'indicator', 'signal'] },
          { id: 'v124', word: 'diagnosis', pronunciation: '/ˌdaɪ.əɡˈnoʊ.sɪs/', definition: 'Identifying disease', example: 'Doctor\'s diagnosis.', vietnamese: 'chẩn đoán', alternatives: ['identification', 'assessment', 'judgment'] },
          { id: 'v125', word: 'treatment', pronunciation: '/ˈtriːt.mənt/', definition: 'Medical care', example: 'Start treatment immediately.', vietnamese: 'điều trị', alternatives: ['therapy', 'care', 'remedy'] },
          { id: 'v126', word: 'vaccine', pronunciation: '/vækˈsiːn/', definition: 'Injection to prevent disease', example: 'Get the flu vaccine.', vietnamese: 'vắc-xin', alternatives: ['shot', 'injection', 'immunization'] },
          { id: 'v127', word: 'hygiene', pronunciation: '/ˈhaɪ.dʒiːn/', definition: 'Cleanliness practices', example: 'Practice good hygiene.', vietnamese: 'vệ sinh', alternatives: ['cleanliness', 'sanitation', 'health'] },
          { id: 'v128', word: 'mental health', pronunciation: '/ˈmen.təl helθ/', definition: 'Emotional well-being', example: 'Mental health awareness.', vietnamese: 'sức khỏe tinh thần', alternatives: ['emotional health', 'psychological', 'well-being'] },
          { id: 'v129', word: 'diet', pronunciation: '/ˈdaɪ.ət/', definition: 'Planned food intake', example: 'Follow a healthy diet.', vietnamese: 'chế độ ăn', alternatives: ['nutrition plan', 'regimen', 'food plan'] },
          { id: 'v130', word: 'stress', pronunciation: '/stres/', definition: 'Mental/emotional strain', example: 'Manage work stress.', vietnamese: 'căng thẳng', alternatives: ['pressure', 'anxiety', 'tension'] },
          { id: 'v131', word: 'therapy', pronunciation: '/ˈθer.ə.pi/', definition: 'Treatment for health', example: 'Physical therapy session.', vietnamese: 'liệu pháp', alternatives: ['treatment', 'remedy', 'healing'] },
          { id: 'v132', word: 'prevention', pronunciation: '/prɪˈven.ʃən/', definition: 'Stopping before happening', example: 'Disease prevention.', vietnamese: 'phòng ngừa', alternatives: ['avoidance', 'prophylaxis', 'deterrence'] },
          { id: 'v133', word: 'recovery', pronunciation: '/rɪˈkʌv.ə.ri/', definition: 'Return to health', example: 'Full recovery expected.', vietnamese: 'phục hồi', alternatives: ['healing', 'restoration', 'convalescence'] },
          { id: 'v134', word: 'immune', pronunciation: '/ɪˈmjuːn/', definition: 'Resistant to disease', example: 'Boost immune system.', vietnamese: 'miễn dịch', alternatives: ['resistant', 'protected', 'defensive'] },
          { id: 'v135', word: 'wellness', pronunciation: '/ˈwel.nəs/', definition: 'State of good health', example: 'Focus on wellness.', vietnamese: 'sức khỏe', alternatives: ['health', 'fitness', 'vitality'] },
          { id: 'v136', word: 'consultation', pronunciation: '/ˌkɑːn.səlˈteɪ.ʃən/', definition: 'Meeting with expert', example: 'Doctor consultation.', vietnamese: 'tư vấn', alternatives: ['appointment', 'meeting', 'advice'] },
          { id: 'v137', word: 'prescription', pronunciation: '/prɪˈskrɪp.ʃən/', definition: 'Doctor\'s order for medicine', example: 'Get prescription filled.', vietnamese: 'đơn thuốc', alternatives: ['script', 'order', 'recommendation'] },
          { id: 'v138', word: 'surgery', pronunciation: '/ˈsɝː.dʒə.ri/', definition: 'Medical operation', example: 'Undergo surgery.', vietnamese: 'phẫu thuật', alternatives: ['operation', 'procedure', 'intervention'] },
          { id: 'v139', word: 'rehabilitation', pronunciation: '/ˌriː.əˌbɪl.əˈteɪ.ʃən/', definition: 'Recovery process', example: 'Physical rehabilitation.', vietnamese: 'phục hồi chức năng', alternatives: ['therapy', 'recovery', 'restoration'] },
          { id: 'v140', word: 'outbreak', pronunciation: '/ˈaʊt.breɪk/', definition: 'Sudden disease spread', example: 'COVID outbreak.', vietnamese: 'dịch bệnh', alternatives: ['epidemic', 'pandemic', 'spread'] },
        ],
      },
      media: {
        id: 'media',
        title: '📺 Media & Communication (Truyền Thông)',
        description: 'Vocabulary for news, media, and communication skills (Từ vựng tin tức, truyền thông và kỹ năng giao tiếp)',
        words: [
          { id: 'v141', word: 'media', pronunciation: '/ˈmiː.di.ə/', definition: 'Means of communication', example: 'Social media is popular.', vietnamese: 'truyền thông', alternatives: ['press', 'broadcast', 'outlet'] },
          { id: 'v142', word: 'broadcast', pronunciation: '/ˈbrɔːd.kɑːst/', definition: 'Send via TV/radio', example: 'Broadcast the news.', vietnamese: 'phát sóng', alternatives: ['air', 'transmit', 'publish'] },
          { id: 'v143', word: 'journalist', pronunciation: '/ˈdʒɜːr.nə.lɪst/', definition: 'News reporter', example: 'Interview with journalist.', vietnamese: 'phóng viên', alternatives: ['reporter', 'correspondent', 'writer'] },
          { id: 'v144', word: 'advertisement', pronunciation: '/ədˈvɝː.t̬əs.mənt/', definition: 'Public promotion', example: 'Watch the advertisement.', vietnamese: 'quảng cáo', alternatives: ['ad', 'promo', 'commercial'] },
          { id: 'v145', word: 'headline', pronunciation: '/ˈhed.laɪn/', definition: 'Main news title', example: 'Read the headline.', vietnamese: 'tiêu đề', alternatives: ['title', 'heading', 'banner'] },
          { id: 'v146', word: 'interview', pronunciation: '/ˈɪn.t̬ɚ.vjuː/', definition: 'Questioning a person', example: 'Conduct an interview.', vietnamese: 'phỏng vấn', alternatives: ['questioning', 'talk', 'discussion'] },
          { id: 'v147', word: 'publicity', pronunciation: '/pʌbˈlɪs.ə.t̬i/', definition: 'Public attention', example: 'Good publicity helps brands.', vietnamese: 'quảng bá', alternatives: ['promotion', 'exposure', 'attention'] },
          { id: 'v148', word: 'newsletter', pronunciation: '/ˈnuːz.let.ɚ/', definition: 'Regular email update', example: 'Subscribe to newsletter.', vietnamese: 'bản tin', alternatives: ['bulletin', 'update', 'circular'] },
          { id: 'v149', word: 'podcast', pronunciation: '/ˈpɑːd.kæst/', definition: 'Audio program', example: 'Listen to podcast.', vietnamese: 'podcast', alternatives: ['audio show', 'recording', 'episode'] },
          { id: 'v150', word: 'social network', pronunciation: '/ˈsoʊ.ʃəl ˈnet.wɝːk/', definition: 'Online community', example: 'Join social network.', vietnamese: 'mạng xã hội', alternatives: ['platform', 'community', 'site'] },
          { id: 'v151', word: 'viral', pronunciation: '/ˈvaɪ.rəl/', definition: 'Spread quickly online', example: 'Viral video.', vietnamese: 'lan truyền', alternatives: ['trending', 'popular', 'contagious'] },
          { id: 'v152', word: 'fake news', pronunciation: '/feɪk nuːz/', definition: 'False information', example: 'Avoid fake news.', vietnamese: 'tin giả', alternatives: ['misinformation', 'hoax', 'disinformation'] },
          { id: 'v153', word: 'streaming', pronunciation: '/ˈstriː.mɪŋ/', definition: 'Continuous media playback', example: 'Streaming music.', vietnamese: 'truyền phát', alternatives: ['broadcasting', 'live', 'online play'] },
          { id: 'v154', word: 'influencer', pronunciation: '/ˈɪn.flu.ən.sɚ/', definition: 'Social media promoter', example: 'Follow influencer.', vietnamese: 'người ảnh hưởng', alternatives: ['celebrity', 'promoter', 'content creator'] },
          { id: 'v155', word: 'content', pronunciation: '/ˈkɑːn.tent/', definition: 'Information in media', example: 'Create content.', vietnamese: 'nội dung', alternatives: ['material', 'text', 'data'] },
          { id: 'v156', word: 'hashtag', pronunciation: '/ˈhæʃ.tæɡ/', definition: 'Social media tag', example: 'Use hashtag #HUFLIT.', vietnamese: 'hashtag', alternatives: ['tag', 'label', 'keyword'] },
          { id: 'v157', word: 'live stream', pronunciation: '/laɪv striːm/', definition: 'Real-time broadcast', example: 'Watch live stream.', vietnamese: 'phát trực tiếp', alternatives: ['live video', 'broadcast', 'webcast'] },
          { id: 'v158', word: 'algorithm', pronunciation: '/ˈæl.ɡə.rɪ.ðəm/', definition: 'Step-by-step procedure', example: 'Algorithm optimizes process.', vietnamese: 'thuật toán', alternatives: ['formula', 'method', 'logic'] },
          { id: 'v159', word: 'viral marketing', pronunciation: '/vaɪ.rəl ˈmɑːr.kə.tɪŋ/', definition: 'Spread via social sharing', example: 'Use viral marketing.', vietnamese: 'tiếp thị lan truyền', alternatives: ['buzz marketing', 'guerrilla marketing', 'word-of-mouth'] },
          { id: 'v160', word: 'digital media', pronunciation: '/ˈdɪdʒ.ɪ.təl ˈmiː.di.ə/', definition: 'Online content platforms', example: 'Digital media consumption.', vietnamese: 'truyền thông kỹ thuật số', alternatives: ['online media', 'web content', 'e-media'] },
        ],
      },
    },
  },
  advanced: {
    level: 'Advanced (Nâng Cao)',
    categories: {
      professional: {
        id: 'professional',
        title: '🎯 Professional Development (Phát Triển Chuyên Môn)',
        description: 'Advanced vocabulary for career growth and HUFLIT alumni (Từ vựng nâng cao cho sự nghiệp và cựu sinh viên HUFLIT)',
        words: [
          { id: 'v161', word: 'networking', pronunciation: '/ˈnet.wɝː.kɪŋ/', definition: 'Building professional relationships', example: 'Networking at conferences.', vietnamese: 'xây dựng mạng lưới', alternatives: ['connecting', 'socializing', 'relationship building'] },
          { id: 'v162', word: 'leadership', pronunciation: '/ˈliː.dɚ.ʃɪp/', definition: 'Ability to guide others', example: 'Develop leadership skills.', vietnamese: 'lãnh đạo', alternatives: ['management', 'guidance', 'direction'] },
          { id: 'v163', word: 'negotiation', pronunciation: '/nɪˌɡoʊ.ʃiˈeɪ.ʃən/', definition: 'Discussion to reach agreement', example: 'Negotiation skills are key.', vietnamese: 'đàm phán', alternatives: ['bargaining', 'discussion', 'deal-making'] },
          { id: 'v164', word: 'portfolio', pronunciation: '/pɔːrtˈfoʊ.li.oʊ/', definition: 'Collection of work samples', example: 'Build your portfolio.', vietnamese: 'danh mục công việc', alternatives: ['resume', 'showcase', 'collection'] },
          { id: 'v165', word: 'mentorship', pronunciation: '/ˈmen.tɔːr.ʃɪp/', definition: 'Guidance from experienced person', example: 'Seek mentorship.', vietnamese: 'hướng dẫn', alternatives: ['coaching', 'guidance', 'support'] },
          { id: 'v166', word: 'entrepreneur', pronunciation: '/ˌɑːn.trə.prəˈnɝː/', definition: 'Person starting business', example: 'Entrepreneur spirit.', vietnamese: 'doanh nhân', alternatives: ['business owner', 'startup founder', 'innovator'] },
          { id: 'v167', word: 'corporate', pronunciation: '/ˈkɔːr.pɚ.ət/', definition: 'Related to large company', example: 'Corporate culture.', vietnamese: 'công ty', alternatives: ['business', 'company', 'firm'] },
          { id: 'v168', word: 'executive', pronunciation: '/ɪɡˈzek.jə.tɪv/', definition: 'Senior manager', example: 'Executive decision.', vietnamese: 'giám đốc', alternatives: ['manager', 'director', 'leader'] },
          { id: 'v169', word: 'merger', pronunciation: '/ˈmɝː.dʒɚ/', definition: 'Combining companies', example: 'Company merger.', vietnamese: 'sáp nhập', alternatives: ['acquisition', 'fusion', 'union'] },
          { id: 'v170', word: 'stakeholder', pronunciation: '/ˈsteɪk.hoʊl.dɚ/', definition: 'Person affected by decision', example: 'Consult stakeholders.', vietnamese: 'người liên quan', alternatives: ['shareholder', 'participant', 'interested party'] },
          { id: 'v171', word: 'benchmark', pronunciation: '/ˈbenʧ.mɑːrk/', definition: 'Standard for comparison', example: 'Industry benchmark.', vietnamese: 'tiêu chuẩn', alternatives: ['standard', 'reference', 'measure'] },
          { id: 'v172', word: 'revenue', pronunciation: '/ˈrev.ə.nuː/', definition: 'Income from business', example: 'Increase revenue.', vietnamese: 'doanh thu', alternatives: ['income', 'sales', 'earnings'] },
          { id: 'v173', word: 'profit', pronunciation: '/ˈprɑː.fɪt/', definition: 'Financial gain', example: 'Maximize profit.', vietnamese: 'lợi nhuận', alternatives: ['gain', 'earnings', 'return'] },
          { id: 'v174', word: 'investment', pronunciation: '/ɪnˈvest.mənt/', definition: 'Money put into business', example: 'Smart investment.', vietnamese: 'đầu tư', alternatives: ['funding', 'capital', 'stake'] },
          { id: 'v175', word: 'diversity', pronunciation: '/daɪˈvɝː.sə.t̬i/', definition: 'Variety in workforce', example: 'Promote diversity.', vietnamese: 'đa dạng', alternatives: ['variety', 'inclusion', 'difference'] },
          { id: 'v176', word: 'inclusion', pronunciation: '/ɪnˈkluː.ʒən/', definition: 'Involving everyone', example: 'Workplace inclusion.', vietnamese: 'bao gồm', alternatives: ['participation', 'integration', 'equity'] },
          { id: 'v177', word: 'resilience', pronunciation: '/rɪˈzɪl.jəns/', definition: 'Ability to recover', example: 'Build resilience.', vietnamese: 'khả năng phục hồi', alternatives: ['toughness', 'adaptability', 'strength'] },
          { id: 'v178', word: 'sustainability', pronunciation: '/səˈsteɪ.nə.bɪl.ə.ti/', definition: 'Long-term viability', example: 'Business sustainability.', vietnamese: 'bền vững', alternatives: ['endurance', 'durability', 'longevity'] },
          { id: 'v179', word: 'empowerment', pronunciation: '/ɪmˈpaʊ.ɚ.mənt/', definition: 'Giving power/authority', example: 'Employee empowerment.', vietnamese: 'trao quyền', alternatives: ['enablement', 'authorization', 'strengthening'] },
          { id: 'v180', word: 'collaboration', pronunciation: '/kəˌlæb.əˈreɪ.ʃən/', definition: 'Working together', example: 'Team collaboration.', vietnamese: 'hợp tác', alternatives: ['cooperation', 'partnership', 'joint effort'] },
        ],
      },
      globalIssues: {
        id: 'globalIssues',
        title: '🌐 Global Issues & Society (Vấn Đề Toàn Cầu)',
        description: 'Vocabulary for social and global discussions (Từ vựng thảo luận xã hội và toàn cầu)',
        words: [
          { id: 'v181', word: 'globalization', pronunciation: '/ˌɡloʊ.bəl.əˈzeɪ.ʃən/', definition: 'Worldwide integration', example: 'Globalization connects cultures.', vietnamese: 'toàn cầu hóa', alternatives: ['internationalization', 'worldwide', 'integration'] },
          { id: 'v182', word: 'inequality', pronunciation: '/ˌɪn.ɪˈkwɑː.lə.t̬i/', definition: 'Unequal distribution', example: 'Address income inequality.', vietnamese: 'bất bình đẳng', alternatives: ['disparity', 'inequity', 'unfairness'] },
          { id: 'v183', word: 'poverty', pronunciation: '/ˈpɑː.vɚ.ti/', definition: 'Lack of resources', example: 'Fight poverty worldwide.', vietnamese: 'nghèo đói', alternatives: ['hardship', 'want', 'deprivation'] },
          { id: 'v184', word: 'democracy', pronunciation: '/dɪˈmɑː.krə.si/', definition: 'Government by people', example: 'Support democracy.', vietnamese: 'dân chủ', alternatives: ['republic', 'freedom', 'voting'] },
          { id: 'v185', word: 'human rights', pronunciation: '/ˈhjuː.mən raɪts/', definition: 'Basic freedoms', example: 'Protect human rights.', vietnamese: 'quyền con người', alternatives: ['civil rights', 'freedoms', 'entitlements'] },
          { id: 'v186', word: 'corruption', pronunciation: '/kəˈrʌp.ʃən/', definition: 'Dishonest behavior in power', example: 'Combat corruption.', vietnamese: 'tham nhũng', alternatives: ['bribery', 'fraud', 'dishonesty'] },
          { id: 'v187', word: 'migration', pronunciation: '/maɪˈɡreɪ.ʃən/', definition: 'Movement to new place', example: 'Economic migration.', vietnamese: 'di cư', alternatives: ['immigration', 'relocation', 'movement'] },
          { id: 'v188', word: 'refugee', pronunciation: '/ˌref.jəˈdʒiː/', definition: 'Person fleeing danger', example: 'Help refugees.', vietnamese: 'người tị nạn', alternatives: ['asylum seeker', 'displaced person', 'migrant'] },
          { id: 'v189', word: 'sustainable', pronunciation: '/səˈsteɪ.nə.bəl/', definition: 'Long-term viable', example: 'Sustainable agriculture.', vietnamese: 'bền vững', alternatives: ['enduring', 'viable', 'lasting'] },
          { id: 'v190', word: 'urbanization', pronunciation: '/ˌɜːr.bə.nəˈzeɪ.ʃən/', definition: 'Growth of cities', example: 'Urbanization challenges.', vietnamese: 'đô thị hóa', alternatives: ['city growth', 'urban development', 'metropolization'] },
          { id: 'v191', word: 'overpopulation', pronunciation: '/oʊ.vɚˌpɑː.pjəˈleɪ.ʃən/', definition: 'Too many people in area', example: 'Overpopulation in cities.', vietnamese: 'quá tải dân số', alternatives: ['crowding', 'population boom', 'density'] },
          { id: 'v192', word: 'gender equality', pronunciation: '/ˈdʒen.dɚ iːˈkwɑːl.ə.t̬i/', definition: 'Equal rights for genders', example: 'Promote gender equality.', vietnamese: 'bình đẳng giới', alternatives: ['equity', 'fairness', 'parity'] },
          { id: 'v193', word: 'activism', pronunciation: '/ˈæk.tɪ.vɪ.zəm/', definition: 'Campaign for change', example: 'Environmental activism.', vietnamese: 'hoạt động xã hội', alternatives: ['advocacy', 'campaigning', 'movement'] },
          { id: 'v194', word: 'volunteer', pronunciation: '/ˌvɑː.lənˈtɪr/', definition: 'Work without pay', example: 'Volunteer at charity.', vietnamese: 'tình nguyện', alternatives: ['unpaid work', 'charity', 'service'] },
          { id: 'v195', word: 'philanthropy', pronunciation: '/fɪˈlæn.θrə.pi/', definition: 'Charity giving', example: 'Corporate philanthropy.', vietnamese: 'từ thiện', alternatives: ['charity', 'giving', 'donation'] },
          { id: 'v196', word: 'global warming', pronunciation: '/ˈɡloʊ.bəl ˈwɔːr.mɪŋ/', definition: 'Earth\'s temperature rise', example: 'Combat global warming.', vietnamese: 'nóng lên toàn cầu', alternatives: ['climate change', 'heating', 'greenhouse effect'] },
          { id: 'v197', word: 'equality', pronunciation: '/ɪˈkwɑːl.ə.t̬i/', definition: 'Equal treatment', example: 'Fight for equality.', vietnamese: 'bình đẳng', alternatives: ['fairness', 'parity', 'justice'] },
          { id: 'v198', word: 'advocacy', pronunciation: '/ˈæd.və.kə.si/', definition: 'Public support for cause', example: 'Human rights advocacy.', vietnamese: 'ủng hộ', alternatives: ['support', 'promotion', 'campaign'] },
          { id: 'v199', word: 'society', pronunciation: '/səˈsaɪ.ə.t̬i/', definition: 'Group of people', example: 'Modern society changes fast.', vietnamese: 'xã hội', alternatives: ['community', 'culture', 'civilization'] },
          { id: 'v200', word: 'culture', pronunciation: '/ˈkʌl.tʃɚ/', definition: 'Customs and beliefs', example: 'Respect different cultures.', vietnamese: 'văn hóa', alternatives: ['tradition', 'heritage', 'customs'] },
          { id: 'v201', word: 'tradition', pronunciation: '/trəˈdɪʃ.ən/', definition: 'Passed-down customs', example: 'Family tradition.', vietnamese: 'truyền thống', alternatives: ['custom', 'practice', 'ritual'] },
          { id: 'v202', word: 'diversity', pronunciation: '/dɪˈvɝː.sə.t̬i/', definition: 'Variety of differences', example: 'Celebrate diversity.', vietnamese: 'đa dạng', alternatives: ['variety', 'difference', 'pluralism'] },
          { id: 'v203', word: 'inclusion', pronunciation: '/ɪnˈkluː.ʒən/', definition: 'Involving everyone', example: 'Promote inclusion.', vietnamese: 'bao gồm', alternatives: ['participation', 'integration', 'equity'] },
          { id: 'v204', word: 'tolerance', pronunciation: '/ˈtɑː.lər.əns/', definition: 'Accepting differences', example: 'Practice tolerance.', vietnamese: 'sự khoan dung', alternatives: ['acceptance', 'patience', 'openness'] },
          { id: 'v205', word: 'discrimination', pronunciation: '/dɪˌskrɪm.əˈneɪ.ʃən/', definition: 'Unfair treatment', example: 'End discrimination.', vietnamese: 'phân biệt đối xử', alternatives: ['prejudice', 'bias', 'inequality'] },
          { id: 'v206', word: 'empowerment', pronunciation: '/ɪmˈpaʊ.ɚ.mənt/', definition: 'Giving power to', example: 'Women\'s empowerment.', vietnamese: 'trao quyền', alternatives: ['enablement', 'strengthening', 'authorization'] },
          { id: 'v207', word: 'solidarity', pronunciation: '/ˌsɑː.lɪˈder.ə.t̬i/', definition: 'Unity in support', example: 'Show solidarity.', vietnamese: 'đồng lòng', alternatives: ['unity', 'support', 'alliance'] },
          { id: 'v208', word: 'global citizen', pronunciation: '/ˈɡloʊ.bəl ˈsɪt̬.ə.zən/', definition: 'Aware of world issues', example: 'Be a global citizen.', vietnamese: 'công dân toàn cầu', alternatives: ['world citizen', 'cosmopolitan', 'internationalist'] },
          { id: 'v209', word: 'sustainable', pronunciation: '/səˈsteɪ.nə.bəl/', definition: 'Long-term viable', example: 'Sustainable living.', vietnamese: 'bền vững', alternatives: ['enduring', 'viable', 'lasting'] },
          { id: 'v210', word: 'advocacy', pronunciation: '/ˈæd.və.kə.si/', definition: 'Public support for cause', example: 'Rights advocacy.', vietnamese: 'ủng hộ', alternatives: ['campaign', 'promotion', 'lobbying'] },
        ],
      },
    },
  },
};

// Helper functions (giữ nguyên, hỗ trợ ôn luyện)
export const getVocabularyByLevel = (level) => {
  if (!level) return VOCABULARY_DATA.beginner; // Fallback if level is undefined
  const levelLower = level.toLowerCase(); // Fixed typo: toLowerCase()
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
    totalWords,
    examTopics: ['Travel', 'Business', 'Daily Life', 'Technology', 'Environment', 'Education', 'Health', 'Media', 'Professional', 'Global Issues'],
    levelCounts: {
      beginner: Object.keys(VOCABULARY_DATA.beginner.categories).reduce((sum, key) => sum + VOCABULARY_DATA.beginner.categories[key].words.length, 0),
      intermediate: Object.keys(VOCABULARY_DATA.intermediate.categories).reduce((sum, key) => sum + VOCABULARY_DATA.intermediate.categories[key].words.length, 0),
      advanced: Object.keys(VOCABULARY_DATA.advanced.categories).reduce((sum, key) => sum + VOCABULARY_DATA.advanced.categories[key].words.length, 0),
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
    level,
    totalWords: words.length,
    words,
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