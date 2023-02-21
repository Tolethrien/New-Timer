import { useEffect, useRef } from "react";

interface useClickOutsideProps {
  state: boolean;
  onClickOutside: () => void;
  outsideRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const useClickOutside = ({
  onClickOutside,
  state,
  outsideRef,
}: useClickOutsideProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!outsideRef) {
      !divRef.current?.contains(target as Node) && onClickOutside();
    } else {
      !divRef.current?.contains(target as Node) &&
        !outsideRef.current?.contains(target as Node) &&
        onClickOutside();
    }
  };
  useEffect(() => {
    state && document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [state]);

  return divRef;
};
