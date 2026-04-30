import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FractionExpandRenderer } from './FractionExpandRenderer';
import { TranslationsProvider } from '@/i18n/provider';
import { en } from '@/i18n/en';

function renderWithI18n(ui: React.ReactElement) {
  return render(
    <TranslationsProvider messages={en} locale="en">
      {ui}
    </TranslationsProvider>
  );
}

const sampleContent = {
  numerator: 2,
  denominator: 3,
  factor: 4,
  answer: '8/12',
  genericInstruction: 'Expand the fraction by a number',
  specificInstruction: 'Expand 2/3 by 4',
};

describe('FractionExpandRenderer', () => {
  it('renders the instruction and the source fraction (no × symbol)', () => {
    renderWithI18n(
      <FractionExpandRenderer
        itemId="fx-1"
        content={sampleContent}
        feedback={null}
        onSubmit={vi.fn()}
      />
    );
    expect(
      screen.getByText('Expand the fraction by a number')
    ).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    // Operation row: "2/3 by 4 =" — connector word + factor visible.
    expect(screen.getByText('by')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    // The × multiplication sign is intentionally absent — expanding multiplies
    // both parts of the fraction, not its value, and × reads as scalar
    // multiplication. We use the word "by" / "przez" instead.
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('disables submit until both inputs are filled', () => {
    renderWithI18n(
      <FractionExpandRenderer
        itemId="fx-1"
        content={sampleContent}
        feedback={null}
        onSubmit={vi.fn()}
      />
    );
    const submit = screen.getByRole('button', { name: /check/i });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByTestId('fraction-numerator'), {
      target: { value: '8' },
    });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByTestId('fraction-denominator'), {
      target: { value: '12' },
    });
    expect(submit).not.toBeDisabled();
  });

  it('submits the joined "n/d" string when the button is clicked', () => {
    const onSubmit = vi.fn();
    renderWithI18n(
      <FractionExpandRenderer
        itemId="fx-1"
        content={sampleContent}
        feedback={null}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByTestId('fraction-numerator'), {
      target: { value: '8' },
    });
    fireEvent.change(screen.getByTestId('fraction-denominator'), {
      target: { value: '12' },
    });
    fireEvent.click(screen.getByRole('button', { name: /check/i }));

    expect(onSubmit).toHaveBeenCalledExactlyOnceWith('8/12');
  });

  it('submits on Enter while typing in either field', () => {
    const onSubmit = vi.fn();
    renderWithI18n(
      <FractionExpandRenderer
        itemId="fx-1"
        content={sampleContent}
        feedback={null}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByTestId('fraction-numerator'), {
      target: { value: '8' },
    });
    const denomInput = screen.getByTestId('fraction-denominator');
    fireEvent.change(denomInput, { target: { value: '12' } });
    fireEvent.keyDown(denomInput, { key: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('8/12');
  });
});
