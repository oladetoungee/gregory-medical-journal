export default function AuthLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col opacity-80 items-center justify-center min-h-screen bg-primary dark:bg-primary">
        {children}
      </div>
    );
  }