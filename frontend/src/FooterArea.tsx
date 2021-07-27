import React from 'react';
import footer_bg from './Image/index_footer_bg.png';
import './App.css';

export default function FooterArea(){
    return(
        <footer className="text-center footer default-font">
            <div className="paddingWithTop1pp">
                <b>Copyright © 2021 Taiwan Semiconductor Manufacturing Company. All rights reserved.</b>
            </div>
            <div className="paddingWithTop1pp">
                <b>Best view with 1366*768 or above</b>
            </div>
        </footer>
    )
  }