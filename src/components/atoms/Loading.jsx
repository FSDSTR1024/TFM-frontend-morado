/*********************************************** External Node modules ************************************************/
import { useEffect, useState } from "react";

/***************************************************** Constants ******************************************************/
const refreshInterval = 1000; // 1 second
const colors = ["primary", "secondary", "accent", "info", "success", "warning", "error"];

/************************************************ Component Definition ************************************************/
const Loading = () => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const changeLoadingColor = () => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    // Initial set of loading color
    changeLoadingColor();

    // Set an interval to change the loading color every 1 second
    const interval = setInterval(changeLoadingColor, refreshInterval);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-base-200">
      <p className="text-2xl text-gray-600 mb-4">Loading, please wait...</p>
      <span className={`loading loading-infinity loading-lg text-${colors[colorIndex]}`}></span>
    </div>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { Loading };
