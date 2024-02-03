import Navbar from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
const DashBoardLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div
        className="hidden h-full md:flex md:flex-col
       bg-gray-900 md:w-72
       md:fixed md:inset-y-0 z-[80]
       "
      >
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayOut;
