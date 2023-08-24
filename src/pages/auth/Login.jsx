import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "./supabaseClient";
import Cookies from "js-cookie";
import { Navigate, Link } from "react-router-dom";
// import { el } from "@fullcalendar/core/internal-common";

const Login = () => {
  //SearchParam :
  // this function checks if the user is logged in or not
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     if (event == "SIGNED_IN") {
  //       console.log("signed in");
  //       Cookies.set("sb-access-token", session.access_token);
  //       Cookies.set("sb-refresh-token", session.refresh_token);
  //       window.location.href = "/dashboard";
  //     }
  //   });
  // }, []);

  //This function handles the signin with google and its errors
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Using supabase to sign in with email and password
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: "http://localhost:5173/dashboard",
        },
      });
      // supabase.auth.onAuthStateChange((event, session) => {
      //   if (event == "SIGNED_IN") {
      //     console.log("signed in");
      //     Navigate("/dashboard");
      //     window.location.href = "/dashboard";
      //   } else {
      //     console.log("not signed in");
      //   }
      // });

      // Cookies.set('name', 'fhff')
      // Alerting the user's role
      // alert(data.user.role);
    } catch (error) {
      console.log(error);
      alert("Wrong Email or Password!");
    }
  };

  return (
    <>
      <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 overflow-y-hidden">
        <h1 class="text-4xl font-medium">Login</h1>
        <p class="text-slate-500">Hi, Welcome back 👋</p>

        <div class="my-5">
          <button
            onClick={handleSignIn}
            class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              class="w-6 h-6"
              alt=""
            />{" "}
            <span>Login with Google</span>
          </button>
        </div>
        <form action="" class="my-10">
          <div class="flex flex-col space-y-5">
            <label for="email">
              <p class="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>
            <label for="password">
              <p class="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
              />
            </label>
            <div class="flex flex-row justify-between">
              <div>
                <label for="remember" class="">
                  <input
                    type="checkbox"
                    id="remember"
                    class="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                  />
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" class="font-medium text-indigo-600">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>
            <p class="text-center">
              Not registered yet?{" "}
              <a
                href="#"
                class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <Link to={`/signup`}>
                  <span>Register now </span>
                </Link>

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
