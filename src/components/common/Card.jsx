import { cn } from '../../utils/helpers';

const Card = ({
  children,
  className,
  header,
  title,
  subtitle,
  footer,
  actions,
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-shadow',
        hoverable && 'hover:shadow-lg',
        className
      )}
      {...props}
    >
      {(header || title) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {header || (
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex gap-2">{actions}</div>}
            </div>
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
