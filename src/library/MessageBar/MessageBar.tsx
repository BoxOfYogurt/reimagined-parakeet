import cx from 'classix';

/**
 * Message variants for different types of messages.
 *
 * Currently, only 'error' is implemented, but the structure allows for easy expansion to include 'info', 'warning', and 'success' in the future.
 */
export type MessageBarVariant = 'error'; // 'info' | 'warning' | 'success';

type MessageBarProps = {
  title: string;
  children: React.ReactNode;
  variant: MessageBarVariant;
};

export const MessageBar = ({ title, variant, children }: MessageBarProps) => {
  const variantClasses: Record<MessageBarVariant, string> = {
    error: 'bg-bg-danger-soft border-border-danger-moderate text-text-on-danger',
  };

  return (
    <div className={cx(variantClasses[variant], 'rounded-lg min-h-12 border-2 p-3')}>
      <p className="typography-short-lg-bold text-inherit mb-2">{title}</p>
      {children}
    </div>
  );
};
