import React from 'react';
import { AdminLoginForm } from '@/components/admin-login';

function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center w-full max-w-[300px]">
        <AdminLoginForm />
      </div>
    </div>
  );
}

export default Page;
