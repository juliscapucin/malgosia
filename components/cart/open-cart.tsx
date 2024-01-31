import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="border-faded relative flex h-11 w-11 items-center justify-center border transition-colors">
      <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)}
      />

      {quantity ? (
        <div className="text-primary bg-secondary absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-full text-[10px] font-bold">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
