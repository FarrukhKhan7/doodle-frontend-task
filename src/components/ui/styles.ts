import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 disabled:cursor-not-allowed disabled:opacity-65',
  {
    variants: {
      intent: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        accent: 'bg-accent-400 text-white hover:bg-accent-500',
        link: 'rounded-none bg-transparent p-0 font-normal text-primary-600 underline hover:text-primary-500',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
      },
    },
    compoundVariants: [{ intent: 'link', size: 'sm', class: 'h-auto px-0' }],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      width: 'auto',
    },
  },
);

export const inputVariants = cva(
  'w-full rounded border bg-white px-3 text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
  {
    variants: {
      intent: {
        default: 'border-slate-300',
        chat: 'border-2 border-slate-400 font-mono text-sm',
      },
      size: {
        md: 'h-10',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  },
);
