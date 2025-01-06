'use client';

import { useActionState } from 'react';
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import SocialLogin from '@/app/components/social-login';
import { createAccount } from './actions';

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, undefined);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">회원가입</h1>
        <h2 className="text-xl">회원정보를 입력해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="이름"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
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
          minLength={4}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          required
          minLength={4}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
