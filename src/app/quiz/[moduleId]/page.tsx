import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth-utils';
import { getModuleWithRandomItems } from '@/actions/modules';
import { QuizClient } from './QuizClient';

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  // Ensure user is authenticated
  await requireAuth();

  const { moduleId } = await params;

  // Load module with items
  const module = await getModuleWithRandomItems(moduleId);

  if (!module || module.items.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Module header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {module.title}
          </h1>
          {module.description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {module.description}
            </p>
          )}
        </div>

        {/* Quiz client component */}
        <QuizClient moduleId={module.id} items={module.items} />
      </div>
    </div>
  );
}
