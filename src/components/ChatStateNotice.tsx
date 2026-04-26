type Props = {
  message: string;
  role?: 'status';
};

export function ChatStateNotice({ message, role }: Props) {
  return (
    <div className="m-auto max-w-[760px] rounded-xl bg-white/85 px-3.5 py-3 text-center text-sm text-slate-600" role={role}>
      {message}
    </div>
  );
}
