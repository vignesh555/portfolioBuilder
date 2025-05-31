'use client';
import * as motion from "motion/react-client";
import Image from "next/image";
import Header from "./Header";
import { downloadIcon } from "@/app/assets";
import LayoutWrapper from "./LayoutWrapper";


const AboutMe = ({ aboutData }) => {
    return (
        <LayoutWrapper id="about">
            <Header title="About Me" />
            <div className="w-full flex justify-between items-center md:justify-center gap-2">
                <div className="hidden md:block">
                    <Image
                        src={aboutData.profilePhoto}
                        alt="About me"
                        width={200}
                        height={200}
                        className="w-[300px] rounded-full"
                    />
                </div>
                <motion.div 
                    className="max-w-[600px] rounded-xl bg-zinc-100 p-5 text-justify"
                    initial={{
                        opacity: 0,
                        y: 200
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{ type: 'spring', bounce: 0.5  }}
                    viewport={{ once: true }}
                    >
                    <p dangerouslySetInnerHTML={{ __html: aboutData.description }} />
                    {/* <a
                        href="#"
                        className="
                            w-max bg-red-400 
                            px-3 py-2 hover:bg-red-500 
                            rounded-full mt-6 flex gap-x-2 
                            text-white transition-colors"
                    >
                        <span>Download CV</span>
                        <span className="text-white text-xl">{downloadIcon}</span>
                    </a> */}
                </motion.div>
            </div>
        </LayoutWrapper>
    )
}

export default AboutMe