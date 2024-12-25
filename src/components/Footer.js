import React from 'react'
import Inst from '../img/inst.svg';
import Wht from '../img/wht.svg';

export default function Footer() {
  return (
    <footer>
        <div className='contact'>
            <h1>Contact</h1>
            <div className='conts'>
                <div className='phone'>
                    <p>Phone</p>
                    <h2>+7 (499) 350-66-04</h2>
                </div>
                <div className='socials'>   
                    <p className="socials-title">Socials</p>
                    <div className='imgsocial'>
                        <img src={Inst} alt="Inst" style={{ width: '38px', height: '38px' }} />
                        <img src={Wht} alt="Wht"  className='wht' style={{ width: '38px', height: '38px' }} />
                    </div>
                </div>
                <div className='address'>
                    <p>Address</p>
                    <h2>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</h2>
                </div>
                <div className='work'>
                    <p>Working Hours</p>
                    <h2>24 hours a day</h2>
                </div>
            </div>
            <div className="map-container">
          <iframe
            title="IThub College Location"
            className="map-iframe"
            src="https://www.google.com/maps?q=IThub+college+Dubininskaya+Ulitsa+96,+Moscow,+Russia,+115093&hl=en&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        </div>
    </footer>
  )
}
