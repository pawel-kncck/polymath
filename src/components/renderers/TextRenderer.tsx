import type { TextContent } from '@/types/content';

interface TextRendererProps {
  content: unknown;
}

export function TextRenderer({ content }: TextRendererProps) {
  // Validate and parse content
  if (!content || typeof content !== 'object') {
    return (
      <div className="text-center text-red-600">
        <p>Invalid content format</p>
      </div>
    );
  }

  const textContent = content as TextContent;

  if (!textContent.prompt) {
    return (
      <div className="text-center text-red-600">
        <p>Missing prompt</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Main prompt - large and centered */}
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
          {textContent.prompt}
        </p>
      </div>

      {/* Optional hint */}
      {textContent.hint && (
        <div className="rounded-lg bg-blue-50 px-4 py-2 dark:bg-blue-950">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Hint: {textContent.hint}
          </p>
        </div>
      )}
    </div>
  );
}
