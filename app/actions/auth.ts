'use server'

import { z } from 'zod'
import { prisma as db } from '../../database'
import { createSession, deleteSession } from '../lib/session'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

const SignupSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  password: z.string().min(4, { message: 'Be at least 4 characters long' }).trim(),
})

export type FormState = {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { username },
  })

  if (existingUser) {
    return {
      errors: {
        username: ['Username already taken'],
      },
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  })

  await createSession(user.id.toString())
  redirect('/')
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data

  const user = await db.user.findUnique({
    where: { username },
  })

  if (!user) {
    return {
      message: 'Invalid username or password',
    }
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return {
      message: 'Invalid username or password',
    }
  }

  await createSession(user.id.toString())
  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}

