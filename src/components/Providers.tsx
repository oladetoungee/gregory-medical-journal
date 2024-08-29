'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#373a7ad9"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default Providers;