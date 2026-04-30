'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { format } from '@/i18n/format';
import {
  deleteUser,
  resetUserPassword,
  setUserModuleAccess,
  type DeleteUserState,
  type ResetPasswordState,
  type SetModuleAccessState,
} from './actions';

type Labels = {
  deleteUser: string;
  deleteConfirmTemplate: string;
  deleteSelfBlocked: string;
  deleteFailed: string;
  resetPassword: string;
  resetPasswordTitleTemplate: string;
  resetPasswordNew: string;
  passwordHint: string;
  resetPasswordSubmit: string;
  resetPasswordCancel: string;
  resetPasswordSuccessTemplate: string;
  errorPasswordTooShort: string;
  errorUnknown: string;
  manageAccess: string;
  manageAccessTitleTemplate: string;
  selectAll: string;
  selectNone: string;
  saveAccess: string;
  cancelAccess: string;
  noModules: string;
  accessSavedTemplate: string;
};

export interface AccessModule {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
}

export function UserActions({
  userId,
  email,
  isSelf,
  role,
  accessibleModuleIds,
  modulesForAccess,
  labels,
}: {
  userId: string;
  email: string;
  isSelf: boolean;
  role: string;
  accessibleModuleIds: string[];
  modulesForAccess: AccessModule[];
  labels: Labels;
}) {
  const [deleteState, deleteAction, isDeleting] = useActionState<
    DeleteUserState,
    FormData
  >(deleteUser, null);
  const [resetState, resetAction, isResetting] = useActionState<
    ResetPasswordState,
    FormData
  >(resetUserPassword, null);
  const [accessState, accessAction, isSavingAccess] = useActionState<
    SetModuleAccessState,
    FormData
  >(setUserModuleAccess, null);

  const [resetOpen, setResetOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const resetFormRef = useRef<HTMLFormElement>(null);

  // Local checkbox state — initialized from the server prop, then mutated by
  // the user. Saved as a hidden moduleId[] when they hit Save.
  const [checked, setChecked] = useState<Set<string>>(
    () => new Set(accessibleModuleIds)
  );

  useEffect(() => {
    if (resetState?.success) {
      setResetOpen(false);
      resetFormRef.current?.reset();
    }
  }, [resetState]);

  useEffect(() => {
    if (accessState?.success) setAccessOpen(false);
  }, [accessState]);

  const deleteErrorMessage =
    deleteState?.error === 'delete_self'
      ? labels.deleteSelfBlocked
      : deleteState?.error
        ? labels.deleteFailed
        : null;

  const resetErrorMessage =
    resetState?.error === 'password_too_short'
      ? labels.errorPasswordTooShort
      : resetState?.error
        ? labels.errorUnknown
        : null;

  // Group modules by category for the checkbox grid.
  const groupedAccess = modulesForAccess.reduce<
    Map<string, { categoryLabel: string; modules: AccessModule[] }>
  >((acc, m) => {
    const entry = acc.get(m.category) ?? {
      categoryLabel: m.categoryLabel,
      modules: [],
    };
    entry.modules.push(m);
    acc.set(m.category, entry);
    return acc;
  }, new Map());

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setResetOpen((v) => !v)}
          className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {labels.resetPassword}
        </button>

        {role !== 'ADMIN' && (
          <button
            type="button"
            onClick={() => setAccessOpen((v) => !v)}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {labels.manageAccess}
          </button>
        )}

        <form
          action={deleteAction}
          onSubmit={(e) => {
            if (!confirm(format(labels.deleteConfirmTemplate, { email })))
              e.preventDefault();
          }}
        >
          <input type="hidden" name="userId" value={userId} />
          <button
            type="submit"
            disabled={isSelf || isDeleting}
            className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            {labels.deleteUser}
          </button>
        </form>
      </div>

      {deleteErrorMessage && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {deleteErrorMessage}
        </p>
      )}

      {resetOpen && (
        <form
          ref={resetFormRef}
          action={resetAction}
          className="rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900"
        >
          <input type="hidden" name="userId" value={userId} />
          <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            {format(labels.resetPasswordTitleTemplate, { email })}
          </p>
          <label className="sr-only" htmlFor={`new-pw-${userId}`}>
            {labels.resetPasswordNew}
          </label>
          <input
            id={`new-pw-${userId}`}
            name="password"
            type="password"
            required
            minLength={8}
            placeholder={labels.resetPasswordNew}
            className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <p className="mb-2 text-[11px] text-gray-500 dark:text-gray-400">
            {labels.passwordHint}
          </p>
          {resetErrorMessage && (
            <p role="alert" className="mb-2 text-xs text-red-600 dark:text-red-400">
              {resetErrorMessage}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isResetting}
              className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {labels.resetPasswordSubmit}
            </button>
            <button
              type="button"
              onClick={() => setResetOpen(false)}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {labels.resetPasswordCancel}
            </button>
          </div>
        </form>
      )}

      {accessOpen && (
        <form
          action={accessAction}
          className="rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900"
        >
          <input type="hidden" name="userId" value={userId} />
          <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            {format(labels.manageAccessTitleTemplate, { email })}
          </p>

          {modulesForAccess.length === 0 ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {labels.noModules}
            </p>
          ) : (
            <>
              <div className="mb-2 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setChecked(new Set(modulesForAccess.map((m) => m.id)))
                  }
                  className="rounded-md border border-gray-300 px-2 py-0.5 text-[11px] text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {labels.selectAll}
                </button>
                <button
                  type="button"
                  onClick={() => setChecked(new Set())}
                  className="rounded-md border border-gray-300 px-2 py-0.5 text-[11px] text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {labels.selectNone}
                </button>
              </div>

              <div className="mb-3 max-h-80 space-y-3 overflow-y-auto pr-1">
                {Array.from(groupedAccess.entries()).map(
                  ([category, { categoryLabel, modules }]) => (
                    <fieldset key={category}>
                      <legend className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {categoryLabel}
                      </legend>
                      <div className="space-y-1">
                        {modules.map((m) => (
                          <label
                            key={m.id}
                            className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300"
                          >
                            <input
                              type="checkbox"
                              name="moduleId"
                              value={m.id}
                              checked={checked.has(m.id)}
                              onChange={(e) => {
                                setChecked((prev) => {
                                  const next = new Set(prev);
                                  if (e.target.checked) next.add(m.id);
                                  else next.delete(m.id);
                                  return next;
                                });
                              }}
                              className="h-3 w-3"
                            />
                            <span>{m.title}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )
                )}
              </div>
            </>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSavingAccess}
              className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {labels.saveAccess}
            </button>
            <button
              type="button"
              onClick={() => {
                setAccessOpen(false);
                setChecked(new Set(accessibleModuleIds));
              }}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {labels.cancelAccess}
            </button>
          </div>
          {accessState?.error && (
            <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
              {labels.errorUnknown}
            </p>
          )}
        </form>
      )}

      {resetState?.success && resetState.targetEmail && (
        <p role="status" className="text-xs text-green-600 dark:text-green-400">
          {format(labels.resetPasswordSuccessTemplate, {
            email: resetState.targetEmail,
          })}
        </p>
      )}
      {accessState?.success && accessState.targetEmail && (
        <p role="status" className="text-xs text-green-600 dark:text-green-400">
          {format(labels.accessSavedTemplate, {
            email: accessState.targetEmail,
          })}
        </p>
      )}
    </div>
  );
}
