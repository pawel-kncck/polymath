import Link from 'next/link';
import { auth, signIn, signOut } from '@/lib/auth';
import { getModules } from '@/actions/modules';

export default async function HomePage() {
  const session = await auth();
  const modules = await getModules();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Polymath
          </h1>

          {session?.user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {session.user.name || session.user.email}
              </span>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Choose a Quiz
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a module to start practicing
          </p>
        </div>

        {/* Modules grid */}
        {modules.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={`/quiz/${module.id}`}
                className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {module.subject}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {module.title}
                </h3>

                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {module.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>{module._count.items} questions</span>
                  <span className="text-blue-600 group-hover:underline dark:text-blue-400">
                    Start Quiz →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              No modules available yet. Please seed the database with{' '}
              <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                npm run db:seed
              </code>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
