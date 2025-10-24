'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { t } = useTranslation("common");

    const validate = () => {
        if (!email) return t("errorRequiredEmail");
        if (!/^\S+@\S+\.\S+$/.test(email)) return t("errorInvalidEmail");
        if (!password) return t("errorRequiredPassword");
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const err = validate();
        if (err) {
            setError(err);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.message || "Login failed");
            }

            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8">
            <img
                src="/assets/logo.png"
                alt="Logo"
                className="mx-auto mb-6"
            />
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-1 py-3">{t("signInTitle")}</h1>

            {error && (
                <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                        {t("email")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        placeholder={t("emailPlaceholder")}
                        required
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t("password")}
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="text-xs text-indigo-600 hover:underline focus:outline-none"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <a href="/forgot-password" className="text-indigo-600 hover:underline">
                        {t("forgotPassword")}
                    </a>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#143852] disabled:opacity-60 text-white font-medium px-4 py-2 rounded-md hover:bg-[#0f2f45]"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                {t("signingIn")}
                            </>
                        ) : (
                            t("signIn")
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}