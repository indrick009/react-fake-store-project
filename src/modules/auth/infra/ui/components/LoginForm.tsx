import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { LoadingState } from "../../../../../shared/domain/enums/LoadingState";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isSubmitting = loading === LoadingState.pending;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ username, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </motion.div>
  );
};

export default LoginForm;
