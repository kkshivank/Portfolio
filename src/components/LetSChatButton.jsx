import React, { useState } from "react";
import chatNow from "../assets/Buttons/chat-round-svgrepo-com.svg";

export const LetsChatButton = () => {
    const [hover, setHover] = useState(false);

    return (
        <button
            type="button"
            onClick={() => window.open(" https://wa.me/917976066296", "_blank")}
            className={`w-[234px] h-[62px] rounded-full flex items-center justify-center gap-7 transition-all duration-200
                ${hover
                    ? "bg-accent drop-shadow-[0_2px_5px_rgba(107,112,218,0.6)] scale-101"
                    : "bg-accent shadow-none"
                }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ outline: "none" }}
        >
            <span className="text-background text-heading">
                Let's Chat
            </span>
            <img
                src={chatNow}
                alt="chaNow"
                className="w-7 h-8"
                draggable={false}
            />
        </button>
    );
};