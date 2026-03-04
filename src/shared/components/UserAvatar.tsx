import { useProfile } from "../../modules/profile/infra/ui/hooks/useProfile";
import { LoadingState } from "../domain/enums/LoadingState";

export default function UserAvatar() {
  const { currentUser, loading } = useProfile();

  if (loading == LoadingState.pending) {
    return (
      <div className="w-9 h-9 rounded-full bg-stone-200 animate-pulse" />
    );
  }

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={currentUser.image}
        alt={currentUser.username}
        className="w-9 h-9 rounded-full object-cover border-2 border-stone-200"
      />
      <span className="text-sm font-medium text-stone-800">
        {currentUser.firstName} {currentUser.lastName}
      </span>
    </div>
  );
}