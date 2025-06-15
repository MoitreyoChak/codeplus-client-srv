"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../../../actions/register.js";
// import { register } from "./register.js";
// import { register } from "@/actions/register.js";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("calling register");
    const r = await register({
      email,
      password,
      name,
    });
    console.log("Response from register:", r);

    if (r?.error) {
      console.log("user already exists");
      return;
    } else {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        console.log(`Login successful for user: ${name}`);
        router.push("/profile");
        // window.location.href = "/";
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-3/5 flex-col">
        <p className="mb-2 text-sm text-gray-400/70">
          Please <span className="text-xl text-white">Signup</span>
        </p>

        <div className="rounded-sm border-2 border-gray-500/70 px-4 py-3">
          {/* Username */}
          <label className="pl-[2px] text-gray-300/80">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="mt-1 mb-3 w-full rounded border-[1px] border-transparent bg-gray-500/10 p-2 text-white shadow-inner shadow-gray-500/40 outline-none focus:border-gray-500"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          {/* Email */}
          <label className="pl-[2px] text-gray-300/80">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="mt-1 mb-3 w-full rounded border-[1px] border-transparent bg-gray-500/10 p-2 text-sm text-white shadow-inner shadow-gray-500/40 outline-none focus:border-gray-500"
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

          {/* Signup Button */}
          <div className="mt-2 flex h-12 w-full items-end justify-center">
            <button
              className="w-1/2 rounded bg-secondary/90 px-3 py-[6px] transition-all duration-100 hover:border-b-[1px] hover:bg-secondary active:border-0 border-white h-fit"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </div>

          {/* Link to Signin */}
          <p className="mt-2 text-xs text-gray-400">
            Already have an account?
            <Link href="/signin" className="ml-[3px] text-secondary">
              Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
