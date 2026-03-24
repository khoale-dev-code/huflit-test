-- -- scripts/create_writing_submissions_table.sql
-- -- Chạy script này trong Supabase Dashboard > SQL Editor

-- -- 1. Tạo bảng writing_submissions
-- CREATE TABLE IF NOT EXISTS writing_submissions (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   user_id TEXT NOT NULL,
--   writing_type TEXT NOT NULL,
--   level TEXT NOT NULL,
--   prompt TEXT,
--   user_text TEXT NOT NULL,
--   word_count INTEGER,
--   overall_score DECIMAL(3, 1),
--   evaluation JSONB,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- 2. Tạo index cho user_id để query nhanh hơn
-- CREATE INDEX IF NOT EXISTS idx_writing_submissions_user_id ON writing_submissions(user_id);
-- CREATE INDEX IF NOT EXISTS idx_writing_submissions_created_at ON writing_submissions(created_at DESC);

-- -- 3. Enable Row Level Security (RLS)
-- ALTER TABLE writing_submissions ENABLE ROW LEVEL SECURITY;

-- -- 4. Tạo policy: Cho phép đọc với điều kiện user_id không null
-- CREATE POLICY "Allow read for all users"
--   ON writing_submissions
--   FOR SELECT
--   USING (user_id IS NOT NULL);

-- -- 5. Tạo policy: Cho phép insert
-- CREATE POLICY "Allow insert for all users"
--   ON writing_submissions
--   FOR INSERT
--   WITH CHECK (user_id IS NOT NULL);

-- -- 6. Tạo policy: Cho phép update
-- CREATE POLICY "Allow update for all users"
--   ON writing_submissions
--   FOR UPDATE
--   USING (user_id IS NOT NULL);

-- -- 7. Tạo policy: Cho phép delete
-- CREATE POLICY "Allow delete for all users"
--   ON writing_submissions
--   FOR DELETE
--   USING (user_id IS NOT NULL);

-- -- 8. Bật realtime (nếu muốn theo dõi thay đổi)
-- ALTER PUBLICATION supabase_realtime ADD TABLE writing_submissions;

-- -- 9. Comment mô tả bảng
-- COMMENT ON TABLE writing_submissions IS 'Lưu trữ bài writing của người dùng được chấm điểm bởi AI';
-- COMMENT ON COLUMN writing_submissions.evaluation IS 'JSON chứa chi tiết đánh giá: overall_score, task_achievement, coherence, lexical, grammar, strengths, weaknesses, suggestions, sample_improved';

-- -- 10. Verify bảng đã được tạo
-- SELECT table_name, column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'writing_submissions'
-- ORDER BY ordinal_position;
