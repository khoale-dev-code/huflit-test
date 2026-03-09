import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from 'firebase/auth';
import { Mail, Lock, User, LogIn, Chrome, ArrowRight, Loader2, Sparkles } from 'lucide-react';

// Đảm bảo bạn import đúng đường dẫn file config của Firebase và Supabase
import { auth, googleProvider } from '../../config/firebase'; 
import { supabase } from '../../config/supabaseClient';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ─── HÀM ĐỒNG BỘ DỮ LIỆU SANG SUPABASE ───
  const syncToSupabase = async (user, providedName = '') => {
    try {
      // 1. Kiểm tra xem user này đã có trong bảng profiles chưa
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.uid)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 là lỗi không tìm thấy dòng nào (bình thường đối với user mới)
        throw checkError;
      }

      const currentIsoTime = new Date().toISOString();

      if (!existingUser) {
        // 2. NẾU LÀ USER MỚI: Thêm vào database với role mặc định là 'student'
        const { error: insertError } = await supabase.from('profiles').insert([{
          id: user.uid,
          email: user.email,
          full_name: providedName || user.displayName || 'Học viên',
          avatar_url: user.photoURL || '',
          role: 'student',
          created_at: currentIsoTime,
          last_login: currentIsoTime,
        }]);
        if (insertError) throw insertError;
      } else {
        // 3. NẾU USER ĐÃ TỒN TẠI: Chỉ cập nhật thời gian đăng nhập lần cuối 
        // (Tuyệt đối KHÔNG cập nhật lại role để tránh làm mất quyền Admin)
        const updateData = { last_login: currentIsoTime };
        
        // Cập nhật thêm tên/avatar từ Google nếu DB đang bị trống
        if (!existingUser.full_name && (providedName || user.displayName)) {
          updateData.full_name = providedName || user.displayName;
        }
        if (!existingUser.avatar_url && user.photoURL) {
          updateData.avatar_url = user.photoURL;
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', user.uid);
        if (updateError) throw updateError;
      }
    } catch (err) {
      console.error("Lỗi đồng bộ Supabase:", err.message);
      // Không ném lỗi ra ngoài để luồng đăng nhập Firebase vẫn thành công
    }
  };

  // ─── XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ BẰNG EMAIL ───
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      if (isLogin) {
        // Luồng Đăng nhập
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Luồng Đăng ký
        if (!fullName.trim()) throw new Error("Vui lòng nhập họ và tên");
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      
      // Đồng bộ thông tin qua Supabase
      await syncToSupabase(userCredential.user, fullName);
      
      // Thành công -> Chuyển hướng vào trang chủ hoặc trang làm bài
      navigate('/'); 
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError('Email này đã được sử dụng.');
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') setError('Email hoặc mật khẩu không chính xác.');
      else if (err.code === 'auth/weak-password') setError('Mật khẩu quá yếu (tối thiểu 6 ký tự).');
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── XỬ LÝ ĐĂNG NHẬP BẰNG GOOGLE ───
  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Đồng bộ thông tin qua Supabase
      await syncToSupabase(result.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Đăng nhập Google thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── GIAO DIỆN ───
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Nửa bên trái: Banner trang trí (Ẩn trên Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/50 to-blue-900/80"></div>
        
        <div className="relative z-10 p-12 text-white max-w-xl">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
            <Sparkles className="w-8 h-8 text-blue-100" />
          </div>
          <h1 className="text-4xl font-black mb-6 leading-tight">
            Nền tảng luyện thi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Thông minh & Hiện đại
            </span>
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Tham gia cùng hàng ngàn học viên khác để nâng cao kỹ năng và chinh phục điểm số mục tiêu của bạn.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-200 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <span>Hơn 24,000+ học viên đã tham gia</span>
          </div>
        </div>
      </div>

      {/* Nửa bên phải: Form đăng nhập/đăng ký */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {isLogin ? 'Chào mừng trở lại! 👋' : 'Tạo tài khoản mới 🚀'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isLogin ? 'Vui lòng đăng nhập để tiếp tục học tập.' : 'Điền thông tin bên dưới để bắt đầu.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {/* Trường Họ Tên (Chỉ hiện khi Đăng ký) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Họ và tên</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors outline-none"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors outline-none"
                  placeholder="bạn@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1 pr-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mật khẩu</label>
                {isLogin && <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Quên mật khẩu?</a>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 mt-6 bg-[#00358E] hover:bg-blue-800 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? <LogIn className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />)}
              {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Hoặc tiếp tục với</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border-2 border-slate-100 hover:border-blue-100 hover:bg-slate-50 text-slate-700 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-70"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            Đăng nhập bằng Google
          </button>

          <p className="mt-8 text-center text-sm font-medium text-slate-600">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AuthPage;