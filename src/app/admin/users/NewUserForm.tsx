'use client';

import { useActionState, useEffect, useRef } from 'react';
import { format } from '@/i18n/format';
import { createUser, type CreateUserState } from './actions';

type Labels = {
  newUserTitle: string;
  emailLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  passwordLabel: string;
  passwordHint: string;
  roleLabel: string;
  roleStudent: string;
  roleAdmin: string;
  submit: string;
  successMessageTemplate: string;
  errors: {
    invalid_email: string;
    password_too_short: string;
    email_taken: string;
    invalid_role: string;
    unknown: string;
  };
};

export function NewUserForm({ labels }: { labels: Labels }) {
  const [state, formAction, isPending] = useActionState<
    CreateUserState,
    FormData
  >(createUser, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {labels.newUserTitle}
      </h3>

      <form
        ref={formRef}
        action={formAction}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="new-user-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labels.emailLabel}
          </label>
          <input
            id="new-user-email"
            name="email"
            type="email"
            required
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="new-user-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labels.nameLabel}
          </label>
          <input
            id="new-user-name"
            name="name"
            type="text"
            placeholder={labels.namePlaceholder}
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="new-user-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labels.passwordLabel}
          </label>
          <input
            id="new-user-password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {labels.passwordHint}
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="new-user-role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labels.roleLabel}
          </label>
          <select
            id="new-user-role"
            name="role"
            defaultValue="STUDENT"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="STUDENT">{labels.roleStudent}</option>
            <option value="ADMIN">{labels.roleAdmin}</option>
          </select>
        </div>

        <div className="md:col-span-2">
          {state?.error && (
            <div
              role="alert"
              className="mb-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
            >
              {labels.errors[state.error]}
            </div>
          )}
          {state?.success && state.createdEmail && (
            <div
              role="status"
              className="mb-3 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
            >
              {format(labels.successMessageTemplate, {
                email: state.createdEmail,
              })}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {labels.submit}
          </button>
        </div>
      </form>
    </section>
  );
}
