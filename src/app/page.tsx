import LoginForm from "@/components/login-form";

export default function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
