import { useState } from "react";
import { api } from "../lib/api";

function LoginModal({ onClose, onLoginSuccess }) {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        setLoading(true);

        try {
            const result = await api.login(
                username,
                password
            );

            onLoginSuccess(result.admin);
        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                p-4 modal-backdrop
                "
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                        onClose();
                    }
                }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-title"
                className="
                    modal-content 
                    bg-white
                    rounded-xl
                    shadow-2xl
                    w-full
                    max-w-md
                    p-8
                    relative
                    "
            >
                <button 
                    type="button"
                    onClick={onclose}
                    aria-label="Close login modal"
                    className="
                        absolute right-4 top-4 
                        text-gray-500
                        hover:text-red-900
                        text-2xl
                        "
                >
                    &times;
                </button>

                <div className="text-center mb-6">

                    <h2
                        id="login-title"
                        className="text-2xl font-bold text-red-900"
                    >
                        Admin Login
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        Sign in to manage restaurant testimonials.
                    </p>
                </div>  

                <form 
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label
                            htmlFor="username"
                            className="block font-semibold mb-2"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(event) => 
                                setUsername(event.target.value)
                            }
                            required 
                            maxLength={100}
                            className="
                                w-full px-4 py-3
                                border border-orange-300
                                rounded-md
                                focus:outline-none
                                focus:ring-2
                                focus:ring-red-900
                            "
                            placeholder="Enter admin username"
                        />
                        </div>
                        <div>
                            <label 
                                htmlFor="password"
                                className="block font-semibold mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                typed="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                                maxLength={200}
                                className="
                                    w-full px-4 py-3
                                    border border-orange-300
                                    rounded-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-red-900
                                    "
                                    placeholder="Enter admin password"
                                />
                        </div>

                        {error && (
                            <p 
                                role="alert"
                                className="
                                    bg-red-50
                                    text-red-700
                                    p-3
                                    rounded-md
                                    text-sm
                                    "
                            >
                                {error}
                            </p>

                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    bg-red-900
                                    hover:bg-red-800
                                    text-white
                                    font-semifold
                                    py-3
                                    rounded-md
                                    transition-colors
                                    "
                            >
                                {loading ? "Signing in..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>     

        );
}

export default LoginModal;