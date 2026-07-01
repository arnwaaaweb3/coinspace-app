import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export const useGoogleAuth = (onSuccess: (name: string) => void) => {
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const data = await res.json();
        onSuccess(data.name || 'User');
      } catch (err) {
        console.error('There is something wrong with the login session', err);
        alert('Hmm, something  went wrong. Please try again!');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      alert('Sorry, we can\'t log you in via Google. Please try something else.');
      setLoading(false);
    },
  });

  return { loading, triggerGoogleLogin: googleLogin };
};