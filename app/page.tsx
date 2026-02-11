import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Link
          className=" flex items-center w-80 h-4 bg-blue-200 px-2 py-4 text-foreground"
          href="/dashboard"
        >
          Take me to the dashboard
        </Link>
      </div>
    </>
  );
}
