import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Link href="/login" className="hover:cursor-pointer hover:text-green-400 font-bold">
        Go to Login Page
      </Link>
    </div>
  );
}
