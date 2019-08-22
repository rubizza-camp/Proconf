import React from "react";

import {
  YoutubeOutline,
  InstagramOutline,
  AppleOutline,
} from "@ant-design/icons";
import AntdIcon from "@ant-design/icons-react";
import { TelegramIcon } from "./TelegramIcon";
import { SoundCloudIcon } from "./SoundCloudIcon";

AntdIcon.add(YoutubeOutline, InstagramOutline, AppleOutline);

const Social = () => {
  return (
    <div className='navbar navbar--social'>
      <a
        target='__blank'
        href='https://www.youtube.com/channel/UCvasfOIImo7D9lQkb1Wc1tw'
        className='navbar__item'
      >
        <AntdIcon type={YoutubeOutline} />
        <span className='navbar__item-note'>Youtube</span>
      </a>
      <a
        target='__blank'
        href='https://t.me/proConf'
        className='navbar__item'
      >
        <TelegramIcon />
        <span className='navbar__item-note'>Telegram</span>
      </a>
      <a
        target='__blank'
        href='https://soundcloud.com/proconf'
        className='navbar__item'
      >
        <SoundCloudIcon />
        <span className='navbar__item-note'>SoundCloud</span>
      </a>
      <a
        target='__blank'
        href='https://itunes.apple.com/by/podcast/podcast-proconf/id1455023466?mt=2'
        className='navbar__item'
      >
        <AntdIcon type={AppleOutline} />
        <span className='navbar__item-note'>iTunes</span>
      </a>
      <a
        target='__blank'
        href='https://www.instagram.com/proconf.show/'
        className='navbar__item'
      >
        <AntdIcon type={InstagramOutline} />
        <span className='navbar__item-note'>Instagram</span>
      </a>
    </div>
  );
};

export {
  Social as default,
}
