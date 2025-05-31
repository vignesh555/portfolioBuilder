'use client'
import * as motion from "motion/react-client";
import Image from "next/image"
import Header from "./Header"
import LayoutWrapper from "./LayoutWrapper"

type Skill = {
    icon: string;
    name: string;
};

type SkillsProps = {
    skillsData: Skill[];
};

function Skills({ skillsData }: SkillsProps) {
    return (
      <LayoutWrapper id="skills">
        <Header title='Skills' />
        <motion.div 
          className='pb-20 flex flex-wrap gap-6'
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
             {skillsData.map((oSkill, index) => (
                <div key={`skill-${index}`} className="border text-center items-center justify-center p-4 rounded-2xl bg-gray-200 border-gray-500">
                    <Image src={oSkill.icon} width={100} height={100} alt={oSkill.name} />
                    <span className="text-sm">{oSkill.name}</span>
                </div>
             ))}
        </motion.div>
      </LayoutWrapper>
    )
  }
  
  export default Skills