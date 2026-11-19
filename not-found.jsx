import Link from 'next/link';
export const metadata = { title: 'Page not found' };
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="gradient-text animate-shine text-8xl font-extrabold">404</p>
        <h1 className="mt-4 text-2xl font-bold">This shipment took a wrong turn.</h1>
        <p className="mt-2 text-white/60">The page you are looking for does not exist.</p>
        <Link href="/" className="btn btn-accent mt-8">Back to home</Link>
      </div>
    </div>
  );
}
