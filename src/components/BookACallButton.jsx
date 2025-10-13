import React, { useState } from "react";
import callMale from "../assets/Buttons/call-phone-ui-3-svgrepo-com.svg";

export const BookACallButton = ({ onClick }) => {
    const [hover, setHover] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-[284px] h-[62px] rounded-full flex items-center justify-center gap-6 transition-all duration-200
                ${hover
                    ? "bg-accent drop-shadow-[0_2px_5px_rgba(107,112,218,0.6)] scale-101"
                    : "bg-accent shadow-none"
                }
                `}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ outline: "none" }}
        >
            <span className=" text-background text-heading">
                Call Me Now
            </span>
            <img
                src={callMale}
                alt="Call"
                className="w-8 h-8"
                draggable={false}
            />
        </button>
    );
};