import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center p-1 text-sm text-black">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{title}</h3>
        <Price
          className="flex-none p-2 text-black"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
