import { LoginForm } from "./(components)/form";

export default function LoginPage() {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 bg-gray-100">
        <div className="w-full max-w-md md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    )
  }
  