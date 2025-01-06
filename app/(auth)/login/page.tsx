'use client';

import { logIn } from './actions';
import Input from '@/app/components/input';
import { PASSWORD_MIN_LENGTH } from '@/app/lib/constants';
import Button from '@/app/components/button';
import SocialLogin from '@/app/components/social-login';
import { useActionState } from 'react';

export default function LogIn() {
  const [state, dispatch] = useActionState(logIn, undefined);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">로그인</h1>
        <h2 className="text-xl">회원 정보를 입력해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
