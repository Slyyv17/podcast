'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import DotsLoader from '@/components/ui/loader'; // Adjust path if needed
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/add-user`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error('Signup failed');

      const data = await response.json();
      console.log('Signup successful:', data);

      alert('Signup successful!');
      setFormData({ fullname: '', email: '', password: '' });
      router.push('/auth/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#131313] h-screen w-full flex items-center justify-center pry-ff">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-none shadow-lg bg-[#171818] p-6 rounded-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-[var(--txt-clr)] mb-4 text-center">Sign Up</h1>

        <div className="flex items-center shadow-lg rounded-md bg-[var(--bg-clr)]">
          <input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border-none outline-none text-[var(--txt-clr)] placeholder:text-[var(--sec-clr)]"
            type="text"
            placeholder="Fullname"
            required
          />
        </div>

        <div className="flex items-center rounded-md shadow-lg bg-[var(--bg-clr)]">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border-none outline-none text-[var(--txt-clr)] placeholder:text-[var(--sec-clr)]"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex items-center rounded-md shadow-lg bg-[var(--bg-clr)]">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border-none outline-none text-[var(--txt-clr)] placeholder:text-[var(--sec-clr)]"
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            required
          />
          <button
            type="button"
            className="p-2 text-[var(--sec-clr)] bg-transparent"
            onClick={handlePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className='w-full flex justify-between items-center p-2'>
          <p className="text-[var(--txt-clr)] text-sm text-center">
            Already have an account?{' '}
          </p>
          <Link href="/auth/login" className="text-red-700 hover:underline cursor-pointer transition-all duration-200">
            Login
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full pry-ff py-2 bg-[var(--acc-clr)] text-[var(--txt-clr)] rounded-md hover:bg-red-900 transition-colors cursor-pointer flex justify-center items-center h-[40px]"
        >
          {isLoading ? <DotsLoader /> : 'Sign Up'}
        </button>
      </form>
    </section>
  );
}