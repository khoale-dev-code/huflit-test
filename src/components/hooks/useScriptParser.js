import { useMemo } from 'react';

export const useScriptParser = (script) => {
  const parsedScript = useMemo(() => {
    if (!script || typeof script !== 'string') return [];
    
    const lines = script.split('\n').map(line => line.trim()).filter(Boolean);
    const conversations = [];
    let currentSpeaker = null;
    let currentText = '';

    lines.forEach(line => {
      const match = line.match(/^([A-Za-z\s\d\-]+(?:\s*\([A-Z0-9]\))?)\s*:\s*(.+)$/);
      if (match) {
        if (currentSpeaker && currentText) {
          conversations.push({ speaker: currentSpeaker, text: currentText.trim() });
        }
        currentSpeaker = match[1].replace(/\s*\([A-Z0-9]\)\s*$/, '').trim();
        currentText = match[2].trim();
      } else if (line && currentSpeaker) {
        currentText += ' ' + line.trim();
      } else if (line) {
        if (currentText) currentText += ' ';
        currentText += line;
        currentSpeaker = currentSpeaker || 'Narrator';
      }
    });

    if (currentSpeaker && currentText) {
      conversations.push({ speaker: currentSpeaker, text: currentText.trim() });
    }
    return conversations;
  }, [script]);

  const speakers = useMemo(() => {
    return [...new Set(parsedScript.map(c => c.speaker))].filter(s => s !== 'Narrator').sort();
  }, [parsedScript]);

  const speakerCounts = useMemo(() => {
    const counts = {};
    parsedScript.forEach(conv => {
      counts[conv.speaker] = (counts[conv.speaker] || 0) + 1;
    });
    return counts;
  }, [parsedScript]);

  return { parsedScript, speakers, speakerCounts };
};