import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { LoadingState } from "../../../../../shared/domain/enums/LoadingState";
import PrimaryButton from "../../../../../shared/components/PrimaryButton";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const isSubmitting = loading === LoadingState.pending;

  const onSubmit = ({ username, password }: LoginFormValues) => {
    login({ username, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md"
    >
      <div className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username est requis",
            minLength: {
              value: 3,
              message: "Username doit contenir au moins 3 caracteres",
            },
          })}
          className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.username && (
          <p className="text-sm text-red-500 -mt-3">{errors.username.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password est requis",
            minLength: {
              value: 4,
              message: "Password doit contenir au moins 4 caracteres",
            },
          })}
          className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500 -mt-3">{errors.password.message}</p>
        )}

        <PrimaryButton
          type="submit"
          fullWidth
          loading={isSubmitting}
          className="rounded-full"
        >
          Login
        </PrimaryButton>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </motion.div>
  );
};

export default LoginForm;
