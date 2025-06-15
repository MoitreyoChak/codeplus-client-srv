"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      //   window.location.href = "/";
      router.push("/profile");
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-3/5 flex-col">
        <p className="mb-2 text-sm text-gray-400/70">
          Please <span className="text-xl text-white">Signin</span>
        </p>

        <div className="rounded-sm border-2 border-gray-500/70 px-4 py-3">
          {/* Username */}
          <label className="pl-[2px] text-gray-300/80">Email</label>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="mt-1 mb-3 w-full rounded border-[1px] border-transparent bg-gray-500/10 p-2 text-white shadow-inner shadow-gray-500/40 outline-none focus:border-gray-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* Password */}
          <label className="pl-[2px] text-gray-300/80">Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="mt-1 w-full flex-grow rounded border-[1px] border-transparent bg-gray-500/10 p-2 text-sm text-white shadow-inner shadow-gray-500/40 outline-none focus:border-gray-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="ml-2 flex items-center text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Signin Button */}
          <div className="mt-2 flex h-12 w-full items-end justify-center">
            <button
              className="w-1/2 rounded bg-secondary/90 px-3 py-[6px] transition-all duration-100 hover:border-b-[1px] hover:bg-secondary active:border-0 border-white h-fit"
              onClick={handleSubmit}
            >
              Signin
            </button>
          </div>

          {/* Link to Signup */}
          <p className="mt-2 text-xs text-gray-400">
            Don't have an account?
            <Link href="/signup" className="ml-[3px] text-secondary">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
