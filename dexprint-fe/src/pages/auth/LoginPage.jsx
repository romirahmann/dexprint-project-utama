/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAlert } from "../../store/AlertContext";
import api from "../../services/axios.service";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../store/slices/authSlice";
import { useRouter } from "@tanstack/react-router";

export function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert();
  const dispatch = useDispatch();
  const route = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      showAlert("error", "username & password required!");
      return;
    }

    dispatch(loginStart());
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      const data = res.data.data;
      console.log(data);
      dispatch(
        loginSuccess({
          user: data,
          token: data.access_token,
        })
      );

      showAlert("success", "Login Successfully!");
      route.navigate({ to: "/admin" });
    } catch (error) {
      dispatch(loginFailure(error.message));
      showAlert("error", "Login Failed, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-100 via-white to-orange-50 transition-colors duration-300">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40 transition-all ">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <img src="/images/brand.png" className="w-40" alt="" />
          <p className="text-sm text-gray-500 mt-3">Welcome back 👋</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white border-gray-200 focus-within:border-orange-400 transition-all">
              <FiMail className="text-gray-400" size={18} />
              <input
                type="username"
                name="username"
                required
                placeholder="username..."
                className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white border-gray-200 focus-within:border-orange-400 transition-all">
              <FiLock className="text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold text-white transition-all 
              ${
                loading
                  ? "bg-orange-400 cursor-not-allowed opacity-70"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98]"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2025 Dexprint. All rights reserved.
        </p>
      </div>
    </div>
  );
}
