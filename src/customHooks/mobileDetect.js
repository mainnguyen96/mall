import { useEffect, useState } from "react";

function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
      setIsMobile(true);
    }
    if (/android/i.test(userAgent)) {
      setIsMobile(true);
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobile(true);
    }
  }, []);
  return isMobile;
}

export default useMobileDetect;
