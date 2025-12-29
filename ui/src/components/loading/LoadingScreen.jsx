import React from "react";
import { useEffect, useState } from "react";
import gif from "../../assets/loading.gif";
const Loading = () => {
  const [visible, setVisible] = useState(true);
  const isDev = !window.invokeNative;

  useEffect(() => {
    if (isDev) {
      setTimeout(() => setVisible(false), 1000);
      return;
    }

    const handlemessage = (event) => {
      switch (event.data.action) {
        case "loadingscreen":
          setVisible(event.data.data);
          break;
      }
    };

    window.addEventListener("message", handlemessage);
    return () => window.removeEventListener("message", handlemessage);
  }, [isDev]);

  return (

    <>
      <div
        style={{ opacity: visible ? 1.0 : 0.0 }}
        className="flex items-center justify-center h-screen bg-black transition-opacity duration-300"
      >
        <img
          className="absolute bottom-10 right-10 w-[150px]"
          src={gif}
          alt=""
        />
      </div>
    </>
  );
};

export default Loading;
