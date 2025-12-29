import React from 'react';

const ButtonSVG = ({ className = '', style = {}, width = "280", height = "71", text = "", subtitle = "" }) => {
    return (
        <div class="flex flex-col items-center gap-1">
            <div className="relative cursor-pointer">
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 336 71"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`group ${className}`}
                    style={style}
                >
                    <path
                        d="M25.25 0.5L0.75 37.2509C140.825 96.4693 285.731 61.9252 334.75 37.2509L310.583 0.5L25.25 0.5Z"
                        fill="#101010"
                        stroke="#3F3F46"
                        className="transition-colors duration-200 group-hover:fill-[#1f1f1f]"
                    />
                </svg>
                {text && (
                    <p className="absolute top-[28px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 tracking-tight text-[#8C8C8C] text-[16px] font-medium uppercase whitespace-nowrap z-10 pointer-events-none">
                        {text}
                    </p>
                )}
            </div>
            {subtitle && (
                <p className="text-[#7e7e7e] text-[16px]">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default ButtonSVG;

