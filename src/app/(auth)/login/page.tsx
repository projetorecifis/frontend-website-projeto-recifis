import { LoginForm } from "./(components)/form";

export default function LoginPage() {
    return (
      <div className="w-full flex min-h-svh flex-col items-center justify-center bg-muted">
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    )
  }
  