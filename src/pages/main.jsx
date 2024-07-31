import React from "react";
import { AudioSection } from "../components/audioSection";
import { RecordSection } from "../components/recordSection";

export const Main = () => {
    return (
        <main className="main flex flex-col justify-center items-center pb-10 px-10">
            <img
                src="/logoWhite.png"
                alt="Maleika moments"
                className="w-[300px] my-10 mx-auto"
            />
            <div className="flex flex-col justify-evenly items-center gap-10 lg:flex-row">
                <div>
                    <AudioSection />
                    <RecordSection />
                </div>
                <img src="/image.jpeg" alt="" className="w-[70%] rounded-full image lg:w-[25%]"/>
            </div>
        </main>
    );
};
