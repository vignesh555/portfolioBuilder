'use client';
import * as motion from "motion/react-client";
import Header from './Header'
import LayoutWrapper from './LayoutWrapper';

const ProjectData = [
    {
        title: 'Hobby Project - Portfolio Builder',
        objective: 'Create a resume from the portfolio builder admin page and publish',
        techinicalDescription: `
            1. Use Next JS 15 + Tailwind + ShadCN/UI for development
                a. Use Server side rendering for admin page
                b. Use Client side rendering for animation
                c. Use Build time generation for portfolio
            2. Database - Superbase
            3. Deployment - Vercel
            4. Clerk - Authentication
        `,
        skillsUsed: ['Next JS', 'Framer Motion', 'React'],
        gitHubLink: '',
    },
    {
        title: 'IDB',
        objective: 'Corporate Banking - Conversion of Monolythic to SPA and Micro Front End',
        techinicalDescription: `
            1. Conversion of traditional web page to SPA application
            2. Conversion of modules to Micro front end using webpack 5
            3. Developing RWD screens and hybrid mobile application
            4. Supproting Production FX
            5. Converting Zeplin screens to UI
            6. Automation testing using playwright
            7. Unit testing using Jest and react testing library
        `,
        skillsUsed: ['React', 'Redux', 'Material UI', 'webpack 5', 'Playwright', 'Jest', 'React testing library'],
        gitHubLink: '',
    },
    {
        title: 'Investment Forecasting',
        objective: 'To get the investment past and current details',
        techinicalDescription: `
            1. Developing REST and GraphQL API's using NestJS
            2. Developing front end using React JS
            3. Antd as CSS framework
            4. Unit testing using Jest and react testing library
        `,
        skillsUsed: ['NestJS', 'MSSQL', 'Next JS', 'React', 'Redux'],
        gitHubLink: '',
    },
    {
        title: 'BankOnline',
        objective: 'Corporate Banking - Conversion of Monolythic to SPA',
        techinicalDescription: `
            1. Conversion of traditional web page to SPA application
            2. Developing RWD screens and hybrid mobile application
            3. Supproting Production FX
            4. Converting Zeplin screens to UI
            5. Unit testing using Jest and react testing library
        `,
        skillsUsed: ['React', 'Redux', 'Material UI', 'webpack 5', 'Playwright', 'Jest', 'React testing library'],
        gitHubLink: '',
    },
    {
        title: 'Pearson',
        objective: 'Search implementation',
        techinicalDescription: `
            1. React JS for search implentation
        `,
        skillsUsed: ['React', 'Redux', 'Material UI', 'webpack 5', 'Playwright', 'Jest', 'React testing library'],
        gitHubLink: '',
    },
]

function Project() {
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
            {ProjectData.map((oProjectData, index) => (<div key={`project-${index}`}>
                <div className='border p-4 rounded-xl border-gray-400 bg-zinc-100 mb-8'>
                    <h2 className='text-xl font-bold'>{oProjectData.title}</h2>
                    <h3 className='text-base font-semibold'>{oProjectData.objective}</h3>
                    <p dangerouslySetInnerHTML={{ __html: oProjectData.techinicalDescription}} className='text-base font-light' />
                    <p className='text-base font-light mt-5'>{oProjectData.skillsUsed.join(', ')}</p>
                </div>
            </div>))
            }
      </motion.div>
    </LayoutWrapper>
  )
}

export default Project
