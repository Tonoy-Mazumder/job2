// React থেকে useState হুক ইমপোর্ট করা হচ্ছে (ইনপুট ফিল্ডের ডেটা ধরে রাখার জন্য)
import { useState } from "react";

// সুন্দর নোটিফিকেশন বা পপ-আপ মেসেজ দেখানোর জন্য toast ইমপোর্ট করা হচ্ছে
import toast from "react-hot-toast";

// এক পেজ থেকে অন্য পেজে যাওয়ার জন্য Link এবং useNavigate ইমপোর্ট করা হচ্ছে
import { Link, useNavigate } from "react-router-dom";

// Signup নামে একটি ফাংশনাল কম্পোনেন্ট তৈরি করা হলো
function Signup() {
    // ইউজারের ইনপুটগুলো জমা রাখার জন্য আলাদা আলাদা state তৈরি করা হলো (শুরুতে সব খালি '' থাকবে)
    const [name, setName] = useState(''); // নাম রাখার জন্য
    const [email, setEmail] = useState(''); // ইমেইল রাখার জন্য
    const [password, setPassword] = useState(''); // পাসওয়ার্ড রাখার জন্য
    const [confirmPassword, setConfirmPassword] = useState(''); // কনফার্ম পাসওয়ার্ড রাখার জন্য
    const [error, setError] = useState(''); // কোনো ভুল (error) হলে সেই মেসেজ দেখানোর জন্য

    // ফর্ম সাবমিট সফল হলে অন্য পেজে পাঠানোর জন্য navigate ফাংশনটি নেওয়া হলো
    const navigate = useNavigate();

    // ফর্ম সাবমিট (Register বাটনে ক্লিক) করলে এই ফাংশনটি কাজ করবে
    const handleSignup = (e) => {
        // ফর্ম সাবমিট হলে ব্রাউজার যেন রিলোড না হয়, তা বন্ধ করার জন্য
        e.preventDefault();

        // ইউজারের নাম ও ইমেইল থেকে বাড়তি স্পেস কাটা হচ্ছে এবং ইমেইলকে ছোট হাতের (lowercase) করা হচ্ছে
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase(); // ক্যাপিটাল লেটার লিখলেও অটোমেটিক ছোট হাতের হয়ে যাবে

        // ১. চেক করা হচ্ছে নামের ঘর খালি কিনা
        if (cleanName === "") {
            alert("name is required"); // ব্রাউজারে অ্যালার্ট দেখাবে
            return setError("name is required"); // error স্টেটে মেসেজ সেট করে এখানেই ফাংশন থামিয়ে দেবে
        }

        // ২. চেক করা হচ্ছে ইমেইলের ঘর খালি কিনা
        if (cleanEmail === "") {
            alert("email is required");
            return setError("email is required");
        }

        // ৩. ইমেইল সঠিক ফরম্যাটে (@ এবং . আছে কিনা) তা চেক করা হচ্ছে
        if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
            alert("use valid email");
            return setError("use valid email");
        }

        // ৪. চেক করা হচ্ছে পাসওয়ার্ড ৬ অক্ষরের কম কিনা
        if (password.length < 6) {
            alert("password must be 6 letter");
            return setError("password must be 6 letter");
        }

        // ৫. পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই কিনা তা চেক করা হচ্ছে
        if (password !== confirmPassword) {
            return setError("password not match"); // না মিললে এরর দেখাবে
        }

        // সব ভ্যালিডেশন ঠিক থাকলে এরর মেসেজ খালি করে দেওয়া হলো
        setError("");

        // ইউজারের পরিষ্কার নাম, ছোট হাতের ইমেইল ও পাসওয়ার্ড দিয়ে একটি অবজেক্ট তৈরি করা হলো
        const userData = {
            name: cleanName,
            email: cleanEmail, // সবসময় ছোট হাতের ইমেইল সেভ হবে
            password
        };

        // ব্রাউজারের localStorage-এ ইউজারের ডেটা সেভ করা হচ্ছে (অবজেক্টকে স্ট্রিং বানিয়ে সেভ করতে হয়)
        localStorage.setItem("registerUser", JSON.stringify(userData));

        // রেজিস্ট্রেশন সফল হয়েছে এমন একটি সবুজ টোস্ট (নোটিফিকেশন) দেখাবে
        toast.success("registration successful");

        // সবশেষে ইউজারকে লগইন (login) পেজে নিয়ে যাবে
        navigate("/login");
    }

    // এখান থেকে স্ক্রিনে যা দেখা যাবে (UI / JSX) তা রিটার্ন করা হচ্ছে
    return (
        // বড় স্ক্রিনে বাম পাশে ব্র্যান্ড প্যানেল + ডান পাশে ফর্ম, মোবাইলে শুধু ফর্ম
        <div className="min-h-screen bg-indigo-50 md:grid md:grid-cols-2">

            {/* ১. ব্র্যান্ড প্যানেল (শুধু বড় স্ক্রিনে দেখাবে) */}
            <div className="hidden md:flex flex-col justify-between bg-indigo-950 p-12 text-indigo-100">
                <span className="text-lg font-semibold tracking-tight text-white">MyDashboard</span>

                <div>
                    <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white">
                        Create your account
                        <br />
                        in under a minute.
                    </h2>
                    <p className="mt-4 max-w-sm text-indigo-300">
                        Add your name, email and a password. You can sign in right after.
                    </p>
                </div>

                <span className="h-1.5 w-16 rounded-full bg-amber-300" />
            </div>

            {/* ২. সাইন আপ ফর্ম */}
            <div className="flex items-center justify-center px-5 py-12">
                <div className="w-full max-w-sm">

                    {/* মোবাইলে ব্র্যান্ডের নাম */}
                    <span className="mb-8 block text-lg font-semibold tracking-tight text-indigo-950 md:hidden">
                        MyDashboard
                    </span>

                    <h1 className="text-3xl font-semibold tracking-tight text-indigo-950">Sign up</h1>
                    <p className="mt-2 text-sm text-indigo-900/70">
                        Fill in your details to create an account.
                    </p>

                    {/* যদি error স্টেটে কোনো মেসেজ থাকে, তবে তা লাল বক্সে দেখাবে, আর না থাকলে কিছু দেখাবে না */}
                    {error ? (
                        <p
                            role="alert"
                            className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
                        >
                            {error}
                        </p>
                    ) : ""}

                    {/* ফর্ম শুরু: সাবমিট করলে handleSignup ফাংশনটি কল হবে */}
                    <form onSubmit={handleSignup} className="mt-6 space-y-5">

                        {/* ফুল নেম (Full Name) ইনপুট ফিল্ড */}
                        <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-indigo-950">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name} // ইনপুটের মান name স্টেট থেকে আসবে
                                onChange={(e) => setName(e.target.value)} // ইউজার কিছু টাইপ করলে তা name স্টেটে আপডেট হবে
                                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm text-indigo-950 placeholder-indigo-300 ring-1 ring-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>

                        {/* ইমেইল (Email) ইনপুট ফিল্ড */}
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-indigo-950">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter your email"
                                value={email} // ইনপুটের মান email স্টেট থেকে আসবে
                                onChange={(e) => setEmail(e.target.value)} // টাইপ করার সাথে সাথে email স্টেট আপডেট হবে
                                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm text-indigo-950 placeholder-indigo-300 ring-1 ring-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>

                        {/* পাসওয়ার্ড (Password) ইনপুট ফিল্ড */}
                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-indigo-950">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password" // type="password" দেওয়ার কারণে লেখাগুলো ডট (•••) আকারে দেখাবে
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm text-indigo-950 placeholder-indigo-300 ring-1 ring-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>

                        {/* কনফার্ম পাসওয়ার্ড (Confirm Password) ইনপুট ফিল্ড */}
                        <div>
                            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-indigo-950">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-type your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm text-indigo-950 placeholder-indigo-300 ring-1 ring-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>

                        {/* ফর্ম সাবমিট করার বাটন */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 cursor-pointer"
                        >
                            Register
                        </button>
                    </form>

                    {/* যাদের আগে থেকেই অ্যাকাউন্ট আছে, তাদের লগইন পেজে যাওয়ার লিংক */}
                    <p className="mt-6 text-sm text-indigo-900/70">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-950">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

// অন্য ফাইলে এই Signup কম্পোনেন্টটি ব্যবহার করার জন্য এক্সপোর্ট করা হলো
export default Signup;
