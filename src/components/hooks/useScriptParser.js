import { useMemo } from 'react';

export const useScriptParser = (script) => {
  // ✅ Parse script và tính toán speakers + counts trong 1 lần duyệt
  const { parsedScript, speakers, speakerCounts } = useMemo(() => {
    // Early return cho các trường hợp không hợp lệ
    if (!script || typeof script !== 'string') {
      return { parsedScript: [], speakers: [], speakerCounts: {} };
    }

    // ✅ Tối ưu: Sử dụng regex compiled một lần
    const SPEAKER_PATTERN = /^([A-Za-z\s\d\-]+(?:\s*\([A-Z0-9]\))?)\s*:\s*(.+)$/;
    const SPEAKER_LABEL_PATTERN = /\s*\([A-Z0-9]\)\s*$/;
    
    // Preprocessing: Split và filter trong 1 bước
    const lines = script
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    // Nếu không có lines hợp lệ
    if (lines.length === 0) {
      return { parsedScript: [], speakers: [], speakerCounts: {} };
    }

    // ✅ Parse conversations
    const conversations = [];
    const speakerSet = new Set();
    const counts = {};
    
    let currentSpeaker = null;
    let currentText = '';

    // Helper function để push conversation
    const pushConversation = () => {
      if (currentSpeaker && currentText) {
        const trimmedText = currentText.trim();
        if (trimmedText) {
          conversations.push({ 
            speaker: currentSpeaker, 
            text: trimmedText 
          });
          
          // ✅ Tính toán speakers và counts ngay trong quá trình parse
          speakerSet.add(currentSpeaker);
          counts[currentSpeaker] = (counts[currentSpeaker] || 0) + 1;
        }
      }
    };

    // Main parsing loop
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(SPEAKER_PATTERN);

      if (match) {
        // Tìm thấy dòng mới với speaker
        pushConversation();
        
        // Clean speaker name (remove label như (A), (B))
        currentSpeaker = match[1].replace(SPEAKER_LABEL_PATTERN, '').trim();
        currentText = match[2].trim();
      } else if (currentSpeaker) {
        // Continuation của text hiện tại
        currentText += ' ' + line;
      } else {
        // Dòng không có speaker → gán cho Narrator
        if (currentText) currentText += ' ';
        currentText += line;
        currentSpeaker = 'Narrator';
      }
    }

    // Push conversation cuối cùng
    pushConversation();

    // ✅ Tạo sorted speakers list (loại bỏ Narrator)
    const sortedSpeakers = Array.from(speakerSet)
      .filter(speaker => speaker !== 'Narrator')
      .sort();

    return {
      parsedScript: conversations,
      speakers: sortedSpeakers,
      speakerCounts: counts
    };
  }, [script]);

  return { parsedScript, speakers, speakerCounts };
};