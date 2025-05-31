'use client';
import Image from "next/image";
import * as motion from "motion/react-client";
import { Badge } from "@/components/ui/badge"
import MailLineIcon from "remixicon-react/MailLineIcon";
import WhatsappFillIcon from "remixicon-react/WhatsappFillIcon";
import PhoneFillIcon from "remixicon-react/PhoneFillIcon";

import LayoutWrapper from "./LayoutWrapper";

interface HeroData {
    profileName: string;
    heroImage: string;
    profileTitle: string;
    primarySkills: string;
    emailId: string;
    whatsAppno: string;
    phoneNo: string;
}

interface HeroProps {
    heroData: HeroData;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  return (
    <LayoutWrapper id="home">
        <div>
            <div className="flex flex-col gap-2 justify-center items-center capitalize">
                <h1 className="mt-5 text-3xl font-semibold">Hi, My Name is</h1>
                <h1 className="mb-5 text-3xl font-semibold">{heroData.profileName}</h1>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileInView={{
                        rotateY: 360,
                        transition: { type: 'anticipate', duration: 5 },
                    }}
                >
                    <Image 
                        src={heroData.heroImage}
                        alt="Vignesh Srinivasan Profile"
                        width={400}
                        height={400}
                        priority={true}
                        className="h-auto w-[300px] rounded-full"
                    />
                </motion.div>
                <h1 className="mt-5 text-3xl">{heroData.profileTitle}</h1>
            </div>
            <div className="my-5 flex flex-wrap gap-5 text-yellow-400 items-center justify-center">
                {heroData.primarySkills.split(',').map((oPrimarySkills, index) => (
                    <Badge key={`primarySkills-${index}`}>{oPrimarySkills}</Badge>
                ))}
            </div>
            <div className="my-5 flex gap-x-10 text-yellow-400 items-center justify-center">
                <a 
                    className="hover:bg-red-500 hover:text-white rounded-lg transition-colors" 
                    href={`mailto:${heroData.emailId}`} target="_blank" rel="noopener noreferrer"
                    title={heroData.emailId}
                >
                    <MailLineIcon />
                </a>
                <a 
                    className="hover:bg-red-500 hover:text-white rounded-lg transition-colors" 
                    href={`https://wa.me/${heroData.whatsAppno}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={heroData.whatsAppno}
                >
                    <WhatsappFillIcon />
                </a>
                <a 
                    className="hover:bg-red-500 hover:text-white rounded-lg transition-colors" 
                    href={`tel:${heroData.phoneNo}`}
                    title={heroData.phoneNo}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <PhoneFillIcon />
                </a>
            </div>
        </div>
    </LayoutWrapper>
  )
}

export default Hero