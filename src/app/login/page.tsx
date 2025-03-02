import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[50%] bg-[#2563eb] h-full">
        <div className="w-[50%] mx-auto text-left flex h-full flex-col justify-center">
          <h1 className="text-4xl text-white font-bold">
            Welcome To <br /> Bindaas
          </h1>
          <p className="text-white text-lg mt-4">
            Your ultimate search engine to learn the truth.
          </p>
          <Image
            src={"/login.png"}
            width={500}
            height={500}
            alt="login-page"
            className="mt-8 rounded-3xl"
          />
        </div>
      </div>
      <div className="w-[50%]">
        <div className=" pl-40 mx-auto text-left flex h-full flex-col justify-center">
          <h1 className="text-7xl font-bold">Welcome back 👋</h1>
          <p className="text-lg mt-4">
            Suit your needs by switching between different search modes.
            <br /> Don’t forget to checkout the leaderboard :)
          </p>
          <form
            className="mt-8"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button className="w-[300px] h-14 text-lg" type="submit">
              Signin with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
