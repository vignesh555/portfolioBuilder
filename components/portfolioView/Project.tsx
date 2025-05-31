'use client';
import * as motion from "motion/react-client";
import Header from './Header'
import LayoutWrapper from './LayoutWrapper';

function Project({ projectsData }) {
  return (
    <LayoutWrapper id="projects">
      <Header title='Projects' />
      <motion.div 
        className='pb-20'
        initial={{
            opacity: 0,
            x: 200
        }}
        whileInView={{
            opacity: 1,
            x: 0
        }}
        transition={{ duration: 0.4, ease: ["easeIn", "easeOut"] }}
        viewport={{ once: true }}
        >
            {projectsData.map((oProjectData, index) => (<div key={`project-${index}`}>
                <div className='border p-4 rounded-xl border-gray-400 bg-zinc-100 mb-8'>
                    <h2 className='text-xl font-bold'>{oProjectData.title}</h2>
                    <h3 className='text-base font-semibold'>{oProjectData.objective}</h3>
                    <p dangerouslySetInnerHTML={{ __html: oProjectData.techinicalDescription}} className='text-base font-light' />
                    <p className='text-base font-light mt-5'>{oProjectData.skillsUsed}</p>
                </div>
            </div>))
            }
      </motion.div>
    </LayoutWrapper>
  )
}

export default Project
