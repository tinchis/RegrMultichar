import React, { useEffect, useState } from "react";
import DeleteConfirm from "../confirmpage/deleteconfirm";
import { formatNumberToCurrency } from "../../utils/formatNumbersToCurrency";
import { nuicallback } from "../../utils/nuicallback";
import { players, debugPlayers } from "./data/players";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "./data/icons";
import righticon from "../../assets/arrow-right.png";
import lefticon from "../../assets/arrow-left.png";
import settingsicon from "../../assets/setting.png";
import playicon from "../../assets/arrow.png";
import { updatescreen } from "../../store/screen/screen";
import { useConfig } from "../../providers/configprovider";
import profilepicture from "../../assets/profile.png";
import profilefemale from "../../assets/profile-female.png";

import createicon from "../../assets/create.png"
import ButtonSVG from "./ButtonSVG"
const bgTexture = "/ui/dist/bgTexture.svg"

const CharDetails = () => {
  const isDev = !window.invokeNative;
  const [playersStore, SetPlayersStore] = useState(isDev ? debugPlayers : players);
  const [counter, setCounter] = useState(0);

  const { config } = useConfig();
  const dispatch = useDispatch();

  const scene = useSelector((state) => state.screen);

  useEffect(() => {
    if (isDev) {
      SetPlayersStore(debugPlayers);
      return;
    }
    nuicallback("GetCharacters").then((response) => {
      SetPlayersStore(response);
    });
  }, [scene]);

  const handleplay = () => {
    dispatch(updatescreen(""));
    nuicallback("playcharacter", playersStore[counter].id);
  };

  const handlecharacterswitch = (counter) => {
    setCounter(counter);

    let data = {
      emptyslot: playersStore[counter].emptyslot,
      counter: counter,
    };

    nuicallback("PreviewCharacter", data);
  };

  const handleQ = () => {
    if (counter !== 0) {
      nuicallback("click", false);
      handlecharacterswitch(counter - 1);
    }
  };
  const handleE = () => {
    if (counter < playersStore.length - 1) {
      nuicallback("click", true);

      handlecharacterswitch(counter + 1);
    }
  };

  useEffect(() => {
    const handlemessage = (event) => {
      switch (event.data.action) {
        case "characterselection":
          dispatch(updatescreen("characterselection"));
          SetPlayersStore(event.data.data);
          break;
      }
    };

    window.addEventListener("message", handlemessage);
    return () => window.removeEventListener("message", handlemessage);
  }, []);

  return (
    <>
      {scene == "deleteconfirm" ? (
        <DeleteConfirm id={counter + 1} />
      ) : (
        <div
          style={{
            display: scene == "characterselection" ? "flex" : "none",
            backgroundImage: `url(${bgTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          className="h-screen an"
        >
          <div className="absolute bottom-0 left-[100px] translate-y-[-50%] outline-0 border-0 flex gap-4 items-baseline ">
            {playersStore && !playersStore[counter].emptyslot &&

              <div
                className="min-w-[400px] flex flex-col gap-5 italic"
                key={playersStore[counter].id}
              >
                <div className="relative top-4">


                  <div className="flex items-center gap-3 text-[48px] font-bold uppercase  text-[#FFFFFF] ">
                    {playersStore[counter].firstname}
                    <div class="flex items-center gap-1">
                      <p>
                        #
                      </p>
                      {playersStore[counter].id}
                    </div>
                  </div>
                  <div className="relative left-1 text-[20px] tracking-[6px] uppercase text-[#ffffff86] ">
                    {playersStore[counter].lastname}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-[150px] h-[2px] bg-[#71717B] "></div>
                  <div className="w-[12px] h-[12px] bg-[#71717B]/30 rounded-full border border-[#71717B]/50 "></div>
                </div>

                <div className="flex items-center gap-2">
                  <span class="relative flex size-3.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16978B] opacity-75"></span>
                    <span class="relative inline-flex size-3.5 rounded-full bg-[#16978B]"></span>
                  </span>
                  <p className="uppercase text-[#71717B] text-md">
                    Online
                  </p>
                </div>

                <ul className="text-[20px] flex flex-row gap-2">
                  {Object.keys(playersStore[counter].additionalInfo).map((p, i) => (
                    <li
                      key={p}
                      onMouseEnter={() => nuicallback("hover")}
                      className="flex flex-col w-[43px] h-[43px] p-3 rounded-lg items-center justify-center bg-[rgba(0,0,0,0.7)] border-[1px] border-[#c9c9c98f] gap-2 inf"
                    >
                      <img src={icons[i].icon} alt="person" />
                      <span className="text-white absolute mt-[80px] uppercase text-[10px] font-bold">
                        {formatNumberToCurrency(playersStore[counter].additionalInfo[p])}
                      </span>
                    </li>
                  ))}

                  <li
                    onClick={() => {
                      dispatch(updatescreen("settings"));
                      nuicallback("click");
                    }}
                    onMouseEnter={() => nuicallback("hover")}
                    className="flex flex-col w-[43px] h-[43px] p-3 rounded-lg items-center justify-center bg-[rgba(0,0,0,0.7)] border-[1px] border-[#c9c9c98f] gap-2 inf"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.4" d="M10.5977 22.75C10.3181 22.7181 10.0241 22.6444 9.74975 22.4469C9.47551 22.2495 9.31274 21.9946 9.19424 21.7402C9.0878 21.5117 8.55153 19.9112 8.55153 19.9112C8.55153 19.9112 8.28957 19.4678 8.07443 19.3266C7.65193 19.0495 7.22563 18.9894 6.94789 19.0495C6.94789 19.0495 5.06643 19.5792 4.80071 19.6213C4.50519 19.6681 4.18191 19.674 3.84761 19.5385C3.51341 19.4031 3.28601 19.1739 3.10697 18.935L1.66844 16.4526C1.55583 16.1934 1.47276 15.9008 1.50833 15.5633C1.5439 15.2258 1.68619 14.9568 1.85044 14.7266C1.99791 14.5199 3.24083 13.1363 3.45588 12.898C3.45588 12.898 3.71591 12.4993 3.71591 11.9998C3.71591 11.4151 3.45586 11.1019 3.45586 11.1019C3.45586 11.1019 1.99791 9.47998 1.85043 9.2733C1.68619 9.04311 1.5439 8.7741 1.50833 8.4366C1.47276 8.09914 1.55583 7.80652 1.66843 7.54733C1.76957 7.31456 3.10699 5.06487 3.10699 5.06487C3.28602 4.82595 3.51342 4.59685 3.84759 4.46138C4.18189 4.32586 4.50518 4.33183 4.80069 4.3786C5.06641 4.42064 6.61796 4.85698 6.94794 4.95035C6.94794 4.95035 7.47727 5.06487 8.07438 4.67329C8.28956 4.53218 8.45627 4.32813 8.55157 4.08872C8.55157 4.08872 9.0878 2.48829 9.19424 2.25981C9.31274 2.00543 9.47551 1.75047 9.74975 1.55308C10.0241 1.3556 10.3181 1.28188 10.5977 1.25H13.4023C13.6819 1.28188 13.9759 1.3556 14.2503 1.55308C14.5245 1.75047 14.6873 2.00543 14.8058 2.25981C14.9122 2.48829 15.4484 4.08872 15.4484 4.08872C15.5437 4.32813 15.7104 4.53218 15.9256 4.67329C16.5227 5.06487 17.0521 4.95035 17.0521 4.95035C17.382 4.85698 18.9336 4.42064 19.1993 4.3786C19.4948 4.33183 19.8181 4.32586 20.1524 4.46138C20.4866 4.59685 20.714 4.82595 20.893 5.06487C20.893 5.06487 22.2304 7.31456 22.3316 7.54733C22.4442 7.80652 22.5272 8.09914 22.4917 8.4366C22.4561 8.7741 22.3138 9.04311 22.1496 9.2733C22.0021 9.47998 20.5441 11.1019 20.5441 11.1019C20.5441 11.1019 20.2841 11.4151 20.2841 11.9998C20.2841 12.4993 20.5441 12.898 20.5441 12.898C20.7592 13.1363 22.0021 14.5199 22.1496 14.7266C22.3138 14.9568 22.4561 15.2258 22.4917 15.5633C22.5272 15.9008 22.4442 16.1934 22.3316 16.4526L20.893 18.935C20.714 19.1739 20.4866 19.4031 20.1524 19.5385C19.8181 19.674 19.4948 19.6681 19.1993 19.6213C18.9336 19.5792 17.0521 19.0495 17.0521 19.0495C16.7744 18.9894 16.3481 19.0495 15.9256 19.3266C15.7104 19.4678 15.4485 19.9112 15.4485 19.9112C15.4485 19.9112 14.9122 21.5117 14.8058 21.7402C14.6873 21.9946 14.5245 22.2495 14.2503 22.4469C13.9759 22.6444 13.6819 22.7181 13.4023 22.75H10.5977Z" fill="#C9C9C9"></path>
                      <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z" fill="#C9C9C9"></path>
                    </svg>

                    <span className="text-white absolute mt-[80px] uppercase text-[10px] font-bold">
                      SETTINGS
                    </span>
                  </li>
                </ul>
              </div>
            }
          </div>

          <div className="absolute bottom-[16%]  left-[50%] translate-x-[-50%] flex flex-row items-center">
            <div
              className="p-2 opacity-80 hover:opacity-100 cursor-pointer bg-[#18181B] rounded-full w-10 h-10 flex items-center justify-center border border-[#3F3F46]/50"
              onMouseEnter={() => nuicallback("hover")}
              onClick={handleQ}
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                <path d="M0.832032 0.833008L5.83203 5.83301L0.832031 10.833" stroke="#9F9FA9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="overflow-hidden w-[435px] flex flex-row items-center">


              <div
                className="transition-[600ms] p-[10px] flex items-center justify-center"
                style={{ transform: `translate(${-145 * counter}px)` }}
              >
                <div
                  className="rounded-2xl bg-[#00000086] w-[125px] h-[150px] border-[1px] border-[#505050] flex flex-col justify-between transition deletebutton"
                  style={{
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>

              {playersStore && playersStore.map((player) => (
                <div
                  className="transition-[600ms] p-[10px] flex items-center justify-center"
                  style={{ transform: `translate(${-145 * counter}px)` }}
                >
                  <div
                    className="rounded-2xl bg-[#00000086] w-[125px] h-[150px] border-[1px] border-[#505050] flex flex-col justify-between transition deletebutton bg-[length:120px] relative"
                    style={{
                      transform:
                        counter + 1 == player.id ? "scale(1.1)" : "scale(1.0)",
                      backgroundImage: player.emptyslot ? `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)` : `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%), url(${player.img})`,
                      backgroundPosition: "center",
                    }}
                  >
                    {!player.emptyslot && (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{
                          backgroundImage: `url(${player.sex ? profilepicture : profilefemale})`,
                        }}
                      ></div>
                    )}
                    {player.emptyslot && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="plus-icon transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                          <path d="M12 4V20M20 12H4" stroke="#9F9FA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    )}
                    {/* <div className=" w-[125px] flex items-end justify-end p-2">
                      {counter + 1 == player.id && !player.emptyslot && (
                        <svg
                          onMouseEnter={() => nuicallback("hover")}
                          onClick={() => {
                            dispatch(updatescreen("deleteconfirm"));
                            nuicallback("click");
                          }}
                          className="fill-[#dd2020] hover:fill-[#af1616] w-[13px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      )}
                    </div> */}
                    <div className="flex flex-col gap-1 absolute bottom-0 text-[#c2c2c4] tracking-tight font-bold uppercase justify-center items-center w-[100%] p-2">
                      <div className="relative top-2 text-[13px] text-[#8f8f8f]">
                        {!player.emptyslot && player.lastname}
                      </div>
                      <div className="text-[16px]">
                        {player.emptyslot ? "CREAR" : player.firstname}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="transition-[600ms] p-[10px] flex items-center justify-center"
                style={{ transform: `translate(${-145 * counter}px)` }}
              >
                <div
                  className="rounded-2xl bg-[#00000086] w-[125px] h-[150px] border-[1px] border-[#505050] flex flex-col justify-between transition deletebutton"
                  style={{
                    background: `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)`,
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>


            </div>

            <div
              className="p-2 opacity-80 hover:opacity-100 cursor-pointer bg-[#18181B] rounded-full w-10 h-10 flex items-center justify-center border border-[#3F3F46]/50"
              onMouseEnter={() => nuicallback("hover")}
              onClick={handleE}
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.832032 0.833008L5.83203 5.83301L0.832031 10.833" stroke="#9F9FA9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* BUTTON SELECT CHARACTER HERE */}
          <div
            onClick={handleplay}
            onMouseEnter={() => nuicallback("hover")}
            className="absolute bottom-[5%] left-[50%] translate-x-[-50%] flex items-center justify-center"
          >
            <ButtonSVG className="block" style={{ display: 'block', opacity: 1 }} text="SELECCIONAR PERSONAJE" description="Confirma tu seleccion de personaje" subtitle="Confirma tu seleccion de personaje" />
          </div>
        </div>
      )}
    </>
  );
};

export default CharDetails;
