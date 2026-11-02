import { useEffect } from 'react';

/**
 * Modal de confirmação (substitui window.confirm). Fechar com Escape ou clicar
 * fora; o botão confirmado fica em estado de ocupado enquanto a acção corre.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Eliminar',
  confirmTone = 'danger',
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmTone?: 'danger' | 'primary';
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && !busy) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-campus-deep/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(ev) => {
        if (ev.target === ev.currentTarget && !busy) onCancel();
      }}
    >
      <div className="surface w-full max-w-sm rounded-2xl border border-campus-line bg-white p-5 shadow-xl">
        <h2 id="confirm-dialog-title" className="font-display text-base font-semibold text-campus-ink">
          {title}
        </h2>
        {description ? <p className="mt-1.5 text-sm text-campus-deep/70">{description}</p> : null}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="btn-secondary !px-3 !py-1.5"
            disabled={busy}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`${
              confirmTone === 'danger'
                ? 'rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.97] disabled:opacity-60'
                : 'btn-primary !px-3 !py-1.5'
            }`}
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
