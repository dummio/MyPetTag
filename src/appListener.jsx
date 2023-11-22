import { useEffect } from 'react';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { useNavigate } from 'react-router-dom';

const AppListener = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Device.getInfo().then((deviceInfo) => {
      if (deviceInfo.platform === 'android') {
        App.addListener('appUrlOpen', (event) => {
          const slug = event.url.split('mypettag-5970e.web.app').pop();
          if (slug) {
            navigate(slug);
          }
        });

        App.addListener('backButton', (event) => {
          navigate(-1);
        });
      }
    });
  }, []);

  return null;
};

export default AppListener;
