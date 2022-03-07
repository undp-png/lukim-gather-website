import React from 'react';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import AppButton from '@components/AppButton';
import InfoCard from '@components/InfoCard';
import Card from '@components/Card';

import HeroImage from '@images/lukim-hero.png';
import BgArt from '@images/bg-art.png';
import circle from '@images/circle.svg';
import upload from '@images/upload.svg';
import flag from '@images/flag.svg';
import members from '@images/members.png';
import civilSociety from '@images/civil-society.png';
import membersAlt from '@images/members-alt.png';

const Home = () => (
  <main>
    <div className='bg-color-bg w-[100%]'>
      <div className='max-w-[1440px] mx-auto px-[5vw] pb-[320px] relative'>
        <Navbar />
        <div className='py-[120px] flex flex-row'>
          <div className='w-[50%]'>
            <h1 className='font-sans font-[700] leading-[68px] text-[64px] text-color-blue'>
              The Lukim Gather Mobile Data Application
            </h1>
            <p className='font-inter font-[400] text-[18px] text-color-text leading-[26px] my-[28px]'>
              How do we ensure that community data from Papua New Guinea’s
              protected areas is reported and heard?
            </p>
            <p className='font-inter font-[600] text-[18px] leading-[26px]'>
              Pilot phase in May 2022
            </p>
            <p className='font-inter font-[600] text-[18px] leading-[26px]'>
              Coming to app stores in August 2022
            </p>
            <div className='flex flex-row gap-[12px] mt-[28px]'>
              <AppButton />
              <AppButton android />
            </div>
          </div>
          <div className='flex align-center justify-center w-[50%]'>
            <img
              src={HeroImage}
              alt='lukim-mobile-app'
              className='max-h-[450px]'
            />
          </div>
        </div>
        <div>
          <h2 className='font-sans font-[700] text-[48px] text-color-blue text-center leading-[62.5px] mb-[56px]'>
            Background
          </h2>
          <div className='flex flex-row justify-around'>
            <div>
              <img
                src={BgArt}
                alt='lukim-mobile-app'
                className='max-h-[375px] max-w-[375px]'
              />
            </div>
            <div className='max-w-[604px]'>
              <p className='font-inter font-[400] text-[18px] text-color-text leading-[32px]'>
                As part of the UNDP
                <a
                  href='https://www.png-nrmhub.org'
                  target='_blank'
                  rel='noreferrer'
                >
                  <span className='text-color-green'>
                    {' '}
                    Papua New Guinea’s Natural Resource Hub
                  </span>
                </a>
                , the second phase of Lukim Gather is under development.
                Supporting the collection of conservation and biodiversity data,
                the Lukim Gather App improves biodiversity and management
                effectiveness monitoring in PNG protected areas. This innovative
                mobile technology is helping to overcome many of the
                geographical, infrastructural, and technological challenges that
                prevent the effective tracking and management of natural
                resources within the region.
              </p>
              <p className='font-inter font-[400] text-[18px] text-color-text leading-[32px] mt-[30px] mb-[25px]'>
                Because it is able to function offline and out of range of phone
                signal, the Lukim Gather app enables communities in remote
                protected areas to:
              </p>
              <div className='flex flex-col gap-[10px]'>
                <InfoCard
                  img={circle}
                  text='Collect and share social and environmental information, even without internet connections'
                />
                <InfoCard
                  img={upload}
                  text='Make automatic data uploads to reduce errors in data collection'
                />
                <InfoCard
                  img={flag}
                  text='Quickly and anonymously report on local environmental incidents, including illicit activities such as illegal logging.'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute -bottom-[136px] left-0 right-0 px-[5vw]'>
          <h2 className='font-sans font-[700] text-[32px] text-color-blue leading-[42px] mb-[64px]'>
            The app is designed to serve
          </h2>
          <div className='flex flex-row justify-center gap-[50px]'>
            <Card img={members} text='Local community members' />
            <Card
              img={membersAlt}
              text='Community members of protected areas'
            />
            <Card img={civilSociety} text='Civil society organizations ' />
          </div>
        </div>
      </div>
    </div>
    <div className='max-w-[1440px] mx-auto px-[5vw] pt-[200px]'>
      <Footer />
    </div>
  </main>
);

export default Home;
