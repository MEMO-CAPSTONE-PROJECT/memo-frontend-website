"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// แปลง Base64URL → Base64 แล้วใช้ atob
const base64UrlDecode = (str: string) => {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
  return atob(padded);
};

const checkAuth = () => {
  if (typeof window === "undefined") return false; // สำหรับ SSR
  let token = localStorage.getItem("userToken");
  if (!token) return false;

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const payload = JSON.parse(base64UrlDecode(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    console.error("Token parsing error:", e);
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
      setChecked(true);
    }
  }, [checked, router]);

  return <>{children}</>;
};

export default AuthGuard;
