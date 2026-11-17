// React থেকে useState এবং useEffect হুক ইমপোর্ট করা হচ্ছে
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // পেজটি লোড হওয়ার সাথে সাথেই এই useEffect কাজ করবে
  useEffect(() => {
    // localStorage থেকে চেক করা হচ্ছে ইউজার আগে থেকেই লগইন করা আছে কিনা
    const isAuth = localStorage.getItem('isAuthenticated');

    // যদি 'isAuthenticated' এর মান 'true' থাকে, তবে Login পেজে না রেখে সরাসরি ড্যাশবোর্ডে পাঠিয়ে দেবে
    if (isAuth === 'true') {
      navigate('/dashboard', { replace: true }); // replace: true দিলে ব্রাউজারের Back বাটন চাপলেও আর লগইন পেজে ফিরবে না
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // ইউজারের ইনপুট দেওয়া ইমেইল থেকে বাড়তি স্পেস কেটে ছোট হাতের (lowercase) করা হচ্ছে
    const cleanEmail = email.trim().toLowerCase();

    // ১. খালি ফিল্ড এবং ভ্যালিড ইমেইল ফরম্যাট চেক
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return setError('Please enter a valid email address!');
    }

    // ২. মিনিমাম পাসওয়ার্ড লেন্থ চেক
    if (password.length < 6) {
      return setError('Password must be at least 6 characters!');
    }

    // localStorage থেকে সেভ করা ইউজার আনা
    const savedUser = JSON.parse(localStorage.getItem('registerUser'));

    if (!savedUser) {
      return setError('No account found! Please Sign Up first.');
    }

    // ৩. ছোট হাতের ইমেইল (cleanEmail) এবং পাসওয়ার্ড ম্যাচিং চেক
    if (savedUser.email === cleanEmail && savedUser.password === password) {
      localStorage.setItem('isAuthenticated', 'true'); // লগইন স্ট্যাটাস সেভ
      navigate('/dashboard', { replace: true }); // ড্যাশবোর্ডে নিয়ে যাবে
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    // বড় স্ক্রিনে বাম পাশে ব্র্যান্ড প্যানেল + ডান পাশে ফর্ম, মোবাইলে শুধু ফর্ম
    <div className="min-h-screen bg-indigo-50 md:grid md:grid-cols-2">

      {/* ১. ব্র্যান্ড প্যানেল (শুধু বড় স্ক্রিনে দেখাবে) */}
      <div className="hidden md:flex flex-col justify-between bg-indigo-950 p-12 text-indigo-100">
        <span className="text-lg font-semibold tracking-tight text-white">MyDashboard</span>

        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white">
            Your account,
            <br />
            all in one place.
          </h2>
          <p className="mt-4 max-w-sm text-indigo-300">
            Sign in to see your profile and manage your account.
          </p>
        </div>

        <span className="h-1.5 w-16 rounded-full bg-amber-300" />
      </div>

      {/* ২. লগইন ফর্ম */}
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">

          {/* মোবাইলে ব্র্যান্ডের নাম */}
          <span className="mb-8 block text-lg font-semibold tracking-tight text-indigo-950 md:hidden">
            MyDashboard
          </span>

          <h1 className="text-3xl font-semibold tracking-tight text-indigo-950">Sign in</h1>
          <p className="mt-2 text-sm text-indigo-900/70">
            Enter your email and password to continue.
          </p>

          {/* এরর মেসেজ */}
          {error && (
            <p
              role="alert"
              className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-indigo-950">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm text-indigo-950 placeholder-indigo-300 ring-1 ring-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-indigo-950">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm text-indigo-950 placeholder-indigo-300 ring-1 ring-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 cursor-pointer"
            >
              Log in
            </button>
          </form>

          {/* Sign Up পেজে যাওয়ার লিংক */}
          <p className="mt-6 text-sm text-indigo-900/70">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-950">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;