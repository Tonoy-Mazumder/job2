import { useNavigate, Navigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // ইউজার লগইন করা আছে কিনা চেক করা হচ্ছে
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const savedUser = JSON.parse(localStorage.getItem('registerUser'));

  // লগইন করা না থাকলে সরাসরি Sign In পেজে পাঠিয়ে দেবে (Protected Route)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // লগআউট ফাংশন
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // লগইন স্ট্যাটাস মুছে ফেলা হলো
    navigate('/login', { replace: true }); // লগইন পেজে পাঠিয়ে দেওয়া হলো
  };

  return (
    // মোবাইলে উপর-নিচ, বড় স্ক্রিনে বাম পাশে সাইডবার + ডান পাশে মেইন কন্টেন্ট
    <div className="min-h-screen bg-indigo-50 md:flex">

      {/* ১. সাইডবার (মোবাইলে উপরের বার হিসেবে দেখাবে) */}
      <aside className="bg-indigo-950 text-indigo-100 flex items-center justify-between px-5 py-4 md:w-64 md:min-h-screen md:flex-col md:items-stretch md:justify-between md:px-6 md:py-8">

        <div className="md:space-y-8">
          <h1 className="text-lg font-semibold tracking-tight text-white">MyDashboard</h1>

          {/* শুধু বড় স্ক্রিনে: ইউজারের ছোট প্রোফাইল */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-amber-300 text-indigo-950 font-semibold flex items-center justify-center">
              {savedUser?.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{savedUser?.name}</p>
              <p className="truncate text-xs text-indigo-300">{savedUser?.email}</p>
            </div>
          </div>
        </div>

        {/* লগআউট বাটন */}
        <button
          onClick={handleLogout}
          className="rounded-lg border border-indigo-700 px-4 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
        >
          Log out
        </button>
      </aside>

      {/* ২. মেইন কন্টেন্ট */}
      <main className="flex-1 px-5 py-8 md:px-12 md:py-14">
        <div className="max-w-2xl">

          {/* স্বাগতম লেখা */}
          <h2 className="text-3xl font-semibold tracking-tight text-indigo-950 md:text-4xl">
            Welcome back, {savedUser?.name}
          </h2>
          <p className="mt-2 text-indigo-900/70">
            You're signed in. Here are your account details.
          </p>

          {/* ৩. প্রোফাইল ইনফরমেশন */}
          <section className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-indigo-100">

            {/* উপরের অংশ: বড় অ্যাভাটার + নাম */}
            <div className="flex items-center gap-4 bg-indigo-100/60 px-6 py-6">
              <div className="h-14 w-14 shrink-0 rounded-full bg-indigo-950 text-amber-300 text-xl font-semibold flex items-center justify-center">
                {savedUser?.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-indigo-950">{savedUser?.name}</h3>
                <p className="truncate text-sm text-indigo-900/70">{savedUser?.email}</p>
              </div>
            </div>

            {/* তথ্যের তালিকা: মোবাইলে উপর-নিচ, বড় স্ক্রিনে বাম-ডান */}
            <dl className="divide-y divide-indigo-100">
              <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm text-indigo-900/60">Full name</dt>
                <dd className="mt-1 text-sm font-medium text-indigo-950 sm:col-span-2 sm:mt-0">
                  {savedUser?.name}
                </dd>
              </div>

              <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm text-indigo-900/60">Email address</dt>
                <dd className="mt-1 text-sm font-medium text-indigo-950 sm:col-span-2 sm:mt-0">
                  {savedUser?.email}
                </dd>
              </div>

              <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm text-indigo-900/60">Account status</dt>
                <dd className="mt-1 sm:col-span-2 sm:mt-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </dd>
              </div>
            </dl>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;