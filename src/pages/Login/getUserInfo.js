import { detect } from 'detect-browser';
import axios from 'axios';

const browser = detect();

export const getUserInfo = async () => {
  const { data: ip } = await axios.get('https://api64.ipify.org?format=json');
  const isMobile = /Mobile|Android|iP(hone|od|ad)/.test(navigator.userAgent);

  return {
    browser: browser ? browser.name : 'unknown',
    os: browser ? browser.os : 'unknown',
    ip: ip.ip,
    isMobile: isMobile,
  };
};
