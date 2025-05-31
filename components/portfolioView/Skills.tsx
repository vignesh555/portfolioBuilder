'use client'
import * as motion from "motion/react-client";
import Image from "next/image"
import Header from "./Header"
import LayoutWrapper from "./LayoutWrapper"

function Skills({ skillsData }) {
    return (
      <LayoutWrapper id="skills">
        <Header title='Skills' />
        <motion.div 
          className='pb-20 flex flex-wrap gap-6'
          initial={{
              opacity: 0,
              x: 200
          }}
          whileInView={{
              opacity: 1,
              x: 0
          }}
          transition={{ type: 'spring', bounce: 1  }}
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