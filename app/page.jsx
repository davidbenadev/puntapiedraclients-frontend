import Login from '@/components/Login/index.jsx';
import Navbar from '@/components/Navbar/index.jsx';

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--color-text-primary)]">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-8 px-4">
        <Login />
      </main>
    </div>
  );
}