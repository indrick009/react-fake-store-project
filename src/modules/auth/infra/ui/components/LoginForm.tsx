import { motion } from "framer-motion";
import { useLoginForm } from "../hooks/useLoginForm";
import PrimaryButton from "../../../../../shared/components/PrimaryButton";
import AppInput from "../../../../../shared/components/AppInput";

const LoginForm = () => {
  const { form, isSubmitting, error,onSubmit } = useLoginForm();

  const {register,formState:{errors}} = form

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md"
    >
      <div className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</div>

      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <AppInput
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username est requis",
            minLength: {
              value: 3,
              message: "Username doit contenir au moins 3 caracteres",
            },
          })}
        />
        {errors.username && (
          <p className="text-sm text-red-500 -mt-3">
            {errors.username.message}
          </p>
        )}

        <AppInput
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password est requis",
            minLength: {
              value: 4,
              message: "Password doit contenir au moins 4 caracteres",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500 -mt-3">
            {errors.password.message}
          </p>
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
