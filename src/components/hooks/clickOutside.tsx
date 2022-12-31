import { useState, useEffect, useRef } from "react";
interface ClickOutsiteProps {}
interface StyleProps {}
const ClickOutsiteOrClose = () => {
  const [visible, setVisible] = useState(false);

  const myRef = useRef<null | HTMLImageElement>(null);
  const handleClickOutside = (e: any) => {
    if (!myRef.current?.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    !visible && document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return [visible, setVisible, myRef] as const;
};
export default ClickOutsiteOrClose;
