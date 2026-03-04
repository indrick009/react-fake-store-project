
import { useAppSelector } from "../../../../../config/hooks";
import { ProfileSelectors } from "../../../slice/ProfileSelector";

export const useProfile = () => {
  const currentUser = useAppSelector(ProfileSelectors.currentUser);
  const loading = useAppSelector(ProfileSelectors.loading);
  const error = useAppSelector(ProfileSelectors.error);
  return {
    currentUser,
    loading,
    error,
  };
};
