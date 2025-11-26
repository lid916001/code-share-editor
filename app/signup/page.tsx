'use client'

import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, undefined)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-6 text-2xl font-bold">Sign Up</h1>
      <form action={action} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
          />
          {state?.errors?.username && (
            <p className="text-sm text-red-500">{state.errors.username}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}


