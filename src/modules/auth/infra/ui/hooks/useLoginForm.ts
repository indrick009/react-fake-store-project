import {useForm} from "react-hook-form";
import {LoadingState} from "../../../../../shared/domain/enums/LoadingState";
import {useAuth} from "./useAuth";

export type LoginFormValues = {
  username: string;
  password: string;
};

export const useLoginForm = () => {
  const {login, loading, error} = useAuth();
  const isSubmitting = loading === LoadingState.pending;

  const form = useForm<LoginFormValues>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = ({username, password}: LoginFormValues) => {
    login({username, password});
  };

  return {
    isSubmitting,
    form,
    onSubmit,
    error
  };
};

export type UseLoginFormBehavior = ReturnType<typeof useLoginForm>;

