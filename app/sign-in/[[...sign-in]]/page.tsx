import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-violet-500/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 flex flex-col items-center">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Continue your learning journey with AI Teacher
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
