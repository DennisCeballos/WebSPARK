import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(window.location.hash)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, window.location.hash]);

  return null;
}