import { ReactNode } from 'react';

const CardStyleStacked = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative text-center py-3 max-w-full lg:max-w-xl lg:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-700 shadow-lg transform -skew-y-3 lg:skew-y-0 lg:-rotate-3 lg:rounded-3xl"></div>
      <div className="relative p-20 bg-white shadow-lg lg:rounded-3xl">
        <div className="max-w-md mx-auto lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};
export default CardStyleStacked;
