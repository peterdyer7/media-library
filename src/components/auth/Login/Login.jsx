import React, { useEffect } from 'react';
// import React from 'react';

export default function Login() {
  useEffect(() => {
    import('../../user/Properties/Properties');
  }, []);
  return <div>Login</div>;
}
