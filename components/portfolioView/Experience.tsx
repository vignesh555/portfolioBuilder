'use client';
import * as motion from "motion/react-client";

import Header from './Header'
import LayoutWrapper from './LayoutWrapper';

interface ExperienceData {
  position: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceProps {
  experienceData: ExperienceData[];
}

function Experience({ experienceData }: ExperienceProps) {
  return (
    <LayoutWrapper id="experience">
      <Header title='Experience' />
      <motion.div 
          className='pb-20'
          initial={{
              opacity: 0,
              y: 200
          }}
          whileInView={{
              opacity: 1,
              y: 0
          }}
          transition={{ duration: 0.4, ease: ["easeIn", "easeOut"] }}
          viewport={{ once: true }}
        >
            {experienceData.map((oExperienceData, index) => (<div key={`experience-${index}`}>
                <div className='border p-4 rounded-xl border-gray-400 bg-zinc-100'>
                    <h2 className='text-xl font-bold'>{oExperienceData.position}</h2>
                    <h3 className='text-base font-semibold'>{oExperienceData.companyName}</h3>
                    <p className='text-base font-light'>{oExperienceData.location}, {oExperienceData.startDate} - {oExperienceData.endDate}</p>
                    <p className='text-base font-light mt-5'>{oExperienceData.description}</p>
                </div>
                {index !== experienceData.length -1 && <div className="border-l-1 border-s-1 border-gray-400 h-8 relative m-auto w-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full absolute -left-1 -top-1"></div>
                </div>}
            </div>))
            }
      </motion.div>
    </LayoutWrapper>
  )
}

export default Experience
