import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { resetAppStore } from "../../../../../reducers/reducer";
import { ProfileSelectors } from "../../../slice/ProfileSelector";
import { closeProfile, toggleProfile } from "../../../slice/ProfileSlice";

export const useProfile = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(ProfileSelectors.currentUser);
  const loading = useAppSelector(ProfileSelectors.loading);
  const error = useAppSelector(ProfileSelectors.error);

  const isProfileOpen = useAppSelector(ProfileSelectors.isOpen);
  function onProfileClick() {
    dispatch(toggleProfile());
  }

  function onCloseProfile() {
    dispatch(closeProfile());
  }

  async function logout() {
    dispatch(resetAppStore());
  }

  return {
    currentUser,
    loading,
    error,
    isProfileOpen,
    onProfileClick,
    onCloseProfile,
    logout
  };
};
