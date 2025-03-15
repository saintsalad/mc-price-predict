import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation with hardcoded credentials
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        if (typeof window !== "undefined") {
          localStorage.setItem("adminAuthenticated", "true");
        }
        onLogin();
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg border border-blue-100'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-blue-900'>Admin Access</h2>
          <p className='mt-2 text-sm text-blue-600'>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <Input
            id='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className='bg-blue-50/50'
          />

          <Input
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-blue-50/50'
          />

          <Button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 transition-colors'
            disabled={isLoading}>
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2' />
                Verifying...
              </span>
            ) : (
              <span className='flex items-center justify-center'>
                <LogIn className='h-4 w-4 mr-2' />
                Sign In
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
