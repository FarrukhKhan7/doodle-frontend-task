import { buttonVariants } from './ui/styles';
import { COPY } from '../constants/copy';

type Props = {
  error: string | null;
  onRetry: () => void;
};

export function StatusBar({ error, onRetry }: Props) {
  if (!error) return null;

  return (
    <div className="mt-2 self-center rounded-lg bg-amber-50/95 px-3 py-2 text-sm" role="alert">
      <span className="text-red-900">
        {error}{' '}
        <button type="button" className={buttonVariants({ intent: 'link' })} onClick={onRetry}>
          {COPY.status.retryAction}
        </button>
      </span>
    </div>
  );
}
