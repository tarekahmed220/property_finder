import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [loginStatus, setloginstatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setloginstatus(true);
      } else {
        setloginstatus(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { loginStatus, isLoading };
}
