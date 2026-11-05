import { useCallback, useEffect, useRef, useState } from 'react';

export type ConfirmOptions = {
  title: string;
  message?: string;
  description?: string;
  details?: Array<{ label: string; value: string }>;
  confirmLabel?: string;
  confirmTone?: 'danger' | 'primary';
  busy?: boolean;
  open?: boolean;
};

export function ConfirmDialog({
  title,
  message,
  description,
  details,
  confirmLabel = 'Confirmar',
  confirmTone = 'primary',
  busy = false,
  open = true,
  onCancel,
  onConfirm,
}: ConfirmOptions & { onCancel: () => void; onConfirm: () => void }) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !busy) {
        event.preventDefault();
        onCancel();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [busy, onCancel, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-campus-deep/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onCancel();
      }}
    >
      <div className="surface w-full max-w-md rounded-2xl border border-campus-line bg-white p-5 shadow-xl">
        <p className="eyebrow">Confirmação</p>
        <h2
          id="confirm-dialog-title"
          className="mt-1 font-display text-lg font-semibold text-campus-ink"
        >
          {title}
        </h2>
        {message ?? description ? <p className="mt-2 text-sm text-campus-deep/75">{message ?? description}</p> : null}
        {details && details.length > 0 ? (
          <dl className="mt-3 space-y-1.5 rounded-xl bg-campus-mist/70 p-3 text-sm">
            {details.map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="text-xs uppercase tracking-wide text-campus-deep/55">{item.label}</dt>
                <dd className="font-medium text-campus-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn-secondary !px-3 !py-1.5" disabled={busy} onClick={onCancel}>
            Cancelar
          </button>
          <button
            ref={confirmRef}
            type="button"
            className={
              confirmTone === 'danger'
                ? 'rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.97] disabled:opacity-60'
                : 'btn-primary !px-3 !py-1.5'
            }
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? 'A eliminar...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useConfirm() {
  const resolverRef = useRef<((confirmed: boolean) => void) | null>(null);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = useCallback(
    (next: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        resolverRef.current = resolve;
        setOptions(next);
      }),
    [],
  );

  const settle = useCallback((confirmed: boolean) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    setOptions(null);
    resolve?.(confirmed);
  }, []);

  const dialog = options ? (
    <ConfirmDialog
      {...options}
      open={true}
      onCancel={() => settle(false)}
      onConfirm={() => settle(true)}
    />
  ) : null;

  return { confirm, dialog };
}
