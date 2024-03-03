import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed z-30 w-screen h-screen flex flex-col items-center bg-white">
      <div className="flex flex-col items-start m-10 rounded-md gap-3">
        <p className="text-4xl font-bold">Ooops...</p>
        <h2 className="text-5xl font-light">404</h2>
        <p>Sprubój jeszcze raz.</p>
        <Link
          href="/"
          className="border-2 border-black hover:bg-neutral-300 rounded-md px-3 py-2 text-back"
        >
          Strona Główna
        </Link>
      </div>
    </div>
  );
}
