

import Link from "next/link";

export default function Header() {
    return (
        <header className="py-5 flex justify-between z-10 sticky top-0 bg-slate-800 text-white">
            <div>
                <Link href={"/"} className="px-5">CapyNext</Link>
                <Link href={"/"} className="px-5">Home</Link>
            </div>
            <div>
                <Link href={"/posts"} className="px-5">Posts</Link>
            </div>
            <div>
                <Link href={"/users/login"} className="px-5">Login</Link>
                <Link href={"/users/signup"} className="px-5">Sign up</Link>
            </div>
        </header>
    )
}