import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import PrimaryButton from "../../../../shared/components/PrimaryButton";
import { useProfile } from "./hooks/useProfile";

export default function Profile({
  onCartClick: onProfileClick,
}: {
  onCartClick: () => void;
}) {
  const { currentUser, loading, error,logout } = useProfile();
  const fullName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
    : "";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 h-screen"
        onClick={onProfileClick}
      />

      <aside className="fixed right-0 top-0 h-screen w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col border-l border-stone-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900">
            Mon Profil
          </h2>
          <button
            onClick={onProfileClick}
            className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {loading === LoadingState.pending && (
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-stone-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-stone-200 rounded w-2/3" />
                  <div className="h-3 bg-stone-200 rounded w-1/2" />
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-2">
                <div className="h-3 bg-stone-200 rounded w-1/3" />
                <div className="h-4 bg-stone-200 rounded w-3/4" />
              </div>
            </div>
          )}

          {loading !== LoadingState.pending && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="font-body text-sm text-red-600">{error}</p>
            </div>
          )}

          {loading !== LoadingState.pending && !error && !currentUser && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-stone-400">
              <svg
                className="w-16 h-16 text-stone-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 14c3.314 0 6 2.239 6 5H6c0-2.761 2.686-5 6-5zm0-2a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              <p className="font-body text-sm">Aucun profil disponible</p>
            </div>
          )}

          {loading !== LoadingState.pending && !error && currentUser && (
            <>
              <div className="flex gap-3 p-3 bg-stone-50 rounded-xl">
                <img
                  src={currentUser.image}
                  alt={fullName || currentUser.username}
                  className="w-14 h-14 rounded-full object-cover bg-white border border-stone-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-base font-bold text-stone-900 truncate">
                    {fullName || currentUser.username}
                  </p>
                  <p className="font-body text-sm text-stone-500 truncate">
                    @{currentUser.username}
                  </p>
                  <p className="font-body text-xs text-stone-400 capitalize mt-1">
                    {currentUser.gender}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <p className="font-body text-xs uppercase tracking-wide text-stone-400 mb-1">
                    Email
                  </p>
                  <p className="font-body text-sm text-stone-700 break-all">
                    {currentUser.email}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl">
                  <p className="font-body text-xs uppercase tracking-wide text-stone-400 mb-1">
                    Phone Number
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {currentUser.phone}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-5 border-t border-stone-100 space-y-3">
          {currentUser && (
            <div className="flex justify-between items-center gap-3">
              <span className="font-body text-stone-500">
                Connecte en tant que
              </span>
              <span className="font-body text-sm font-semibold text-stone-900 truncate">
                {currentUser.username}
              </span>
            </div>
          )}
          <PrimaryButton onClick={logout} fullWidth>
            Logout
          </PrimaryButton>
        </div>
      </aside>
    </>
  );
}
