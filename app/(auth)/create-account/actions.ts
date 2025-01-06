'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import db from '@/app/lib/db';
import getSession from '@/app/lib/sesstion';
import bcrypt from 'bcrypt';
import { formSchema } from './schema';

export async function createAccount(
  prevState: z.inferFlattenedErrors<typeof formSchema> | undefined,
  formData: FormData,
) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/profile');
  }
}
