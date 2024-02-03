const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full hg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full">{children}</div>
    </main>
  );
};

export default LandingLayout;