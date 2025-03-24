"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const checkAuth = () => {
  if (typeof window === "undefined") return false; // ป้องกันการรันบน Server
  const token = localStorage.getItem("userToken");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    console.log(e);
    return false;
  }
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      if (!checkAuth()) {
        alert("Token หมดอายุ กรุณา Login ใหม่");
        localStorage.removeItem("userToken");
        router.push("/admin/login");
      }
      setChecked(true); // ป้องกันไม่ให้ `useEffect()` ทำงานซ้ำ
    }
  }, [checked, router]);

  return <>{children}</>;
};

export default AuthGuard;
