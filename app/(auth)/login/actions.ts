'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import db from '@/app/lib/db';
import getSession from '@/app/lib/sesstion';
import { formSchema } from './schema';

export async function logIn(
  prevState: z.inferFlattenedErrors<typeof formSchema> | undefined,
  formData: FormData,
): Promise<z.inferFlattenedErrors<typeof formSchema> | undefined> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);
  
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx',
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/profile');
    } else {
      return {
        formErrors: ['Wrong password.'],
        fieldErrors: {
          password: [],
          email: [],
        },
      };
    }
  }
}
