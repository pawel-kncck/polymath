import Link from 'next/link';
import { requireAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/db';
import { getLocale, getMessages } from '@/i18n/server';
import { NewUserForm } from './NewUserForm';
import { UserActions } from './UserActions';

export default async function AdminUsersPage() {
  const session = await requireAdmin();
  const t = await getMessages();
  const locale = await getLocale();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      _count: { select: { results: true } },
    },
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  });

  const newUserLabels = {
    newUserTitle: t.admin.newUserTitle,
    emailLabel: t.admin.columnEmail,
    nameLabel: t.admin.columnName,
    namePlaceholder: t.admin.namePlaceholder,
    passwordLabel: t.signin.passwordLabel,
    passwordHint: t.admin.passwordHint,
    roleLabel: t.admin.columnRole,
    roleStudent: t.admin.roleStudent,
    roleAdmin: t.admin.roleAdmin,
    submit: t.admin.createUser,
    successMessageTemplate: t.admin.createUserSuccess,
    errors: {
      invalid_email: t.admin.errorInvalidEmail,
      password_too_short: t.admin.errorPasswordTooShort,
      email_taken: t.admin.errorEmailTaken,
      invalid_role: t.admin.errorInvalidRole,
      unknown: t.admin.errorUnknown,
    },
  };

  const rowActionLabels = {
    deleteUser: t.admin.deleteUser,
    deleteConfirmTemplate: t.admin.deleteConfirm,
    deleteSelfBlocked: t.admin.deleteSelfBlocked,
    deleteFailed: t.admin.deleteFailed,
    resetPassword: t.admin.resetPassword,
    resetPasswordTitleTemplate: t.admin.resetPasswordTitle,
    resetPasswordNew: t.admin.resetPasswordNew,
    passwordHint: t.admin.passwordHint,
    resetPasswordSubmit: t.admin.resetPasswordSubmit,
    resetPasswordCancel: t.admin.resetPasswordCancel,
    resetPasswordSuccessTemplate: t.admin.resetPasswordSuccess,
    errorPasswordTooShort: t.admin.errorPasswordTooShort,
    errorUnknown: t.admin.errorUnknown,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.common.appName}
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:underline dark:text-gray-400"
          >
            {t.admin.backToHome}
          </Link>
        </div>
      </header>

      <main className="container mx-auto space-y-8 px-4 py-8">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t.admin.usersTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.admin.usersSubtitle}
          </p>
        </div>

        <NewUserForm labels={newUserLabels} />

        {users.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">{t.admin.noUsers}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">{t.admin.columnEmail}</th>
                  <th scope="col" className="px-4 py-3">{t.admin.columnName}</th>
                  <th scope="col" className="px-4 py-3">{t.admin.columnRole}</th>
                  <th scope="col" className="px-4 py-3">{t.admin.columnResults}</th>
                  <th scope="col" className="px-4 py-3">{t.admin.columnCreated}</th>
                  <th scope="col" className="px-4 py-3">{t.admin.columnActions}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isMe = user.id === session.user.id;
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 last:border-0 dark:border-gray-700"
                    >
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {user.email}
                        {isMe && (
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {t.admin.you}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {user.name ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            user.role === 'ADMIN'
                              ? 'inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {user._count.results}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {dateFormatter.format(user.createdAt)}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <UserActions
                          userId={user.id}
                          email={user.email}
                          isSelf={isMe}
                          labels={rowActionLabels}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
