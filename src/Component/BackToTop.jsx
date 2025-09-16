import { useEffect, useState } from 'react';
import { GoArrowUp } from "react-icons/go";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400); 
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
         className='BackTop'

      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
    <GoArrowUp />
    </button>
  );
}
