import React from "react";
import { useState } from "react";
import { nuicallback } from "../../utils/nuicallback";
import { useEffect } from "react";
import { useConfig } from "../../providers/configprovider";
import { useDispatch } from "react-redux";
import { updatescreen } from "../../store/screen/screen";
import ESCButton from "../registeration/inputFields/ESCButton";

const DeleteConfirm = (data) => {
  const [confirmvalue, setConfirmvalue] = useState(0);

  const dispatch = useDispatch();
  const { config } = useConfig();

  useEffect(() => {
    const handlekey = (e) => {
      if (e.keyCode === 27) {
        dispatch(updatescreen("characterselection"));
        nuicallback("click");
      } else if (e.keyCode === 13) {
        setConfirmvalue(confirmvalue + 2);
        if (confirmvalue > 99) {
          dispatch(updatescreen(""));
          nuicallback("DeleteCharacter", data.id);
        }
      }
    };

    window.addEventListener("keydown", handlekey);
    return () => window.removeEventListener("keydown", handlekey);
  });

  useEffect(() => {
    const handlekey = (e) => {
      setConfirmvalue(0);
    };

    window.addEventListener("keyup", handlekey);
    return () => window.removeEventListener("keyup", handlekey);
  });

  return (
    <>
    </>
  );
};

export default DeleteConfirm;
