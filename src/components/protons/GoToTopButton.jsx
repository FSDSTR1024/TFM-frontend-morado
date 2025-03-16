/*********************************************** External Node modules ************************************************/
import { useState, useEffect } from "react";

/************************************************ Component Definition ************************************************/
const GoToTopButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY === 0);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`bottom-5 right-5 fixed p-0 px-3 pb-1 rounded z-50 ${isAtTop ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white cursor-pointer"}`}
      disabled={isAtTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span role="img" aria-label="up arrow" className="text-2xl">
        ↑
      </span>
    </button>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { GoToTopButton };
