import React from "react";
import { AudioSection } from "../components/audioSection";
import { RecordSection } from "../components/recordSection";

export const Main = () => {
    return (
        <main className="main flex flex-col justify-center items-center pb-10">
            <img
                src="/logoWhite.png"
                alt="Maleika moments"
                className="w-[300px] my-10 mx-auto"
            />
            <AudioSection />
            <RecordSection />
        </main>
    );
};
