import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import { getKeynote, getTopic } from "../../../data";
import { pad, secondsToTime, scrollTop } from "../../../utils";
import moment from "moment";
import { RouteComponentProps } from "react-router";
import { Page, Podcast } from "../../../components";

import { ArrowRightOutline } from "@ant-design/icons";
import AntdIcon from "@ant-design/icons-react";

import axios from "axios";

AntdIcon.add(ArrowRightOutline);

export type Podcast = ReturnType<typeof parseEpisode>;

const parseEpisode = (item: any) => {
  return ({
    id: item.id,
    date: Date.now(),
    title: item.title,
    sponsor: "Valentine Zavadsky",
    keynotes: new Array(10).fill(0).map(getKeynote),
    descr: item.description,
    img: item.image != null ? item.image : "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs.inyourpocket.com%2Fgallery%2F107415.jpg&f=1",
    conference: {
      link: "https://tmt.knect365.com/iot-world/developer-conference",
      topics: new Array(10).fill(0).map(getTopic)
    },
    links: [
      {
        source: "Youtube",
        url: "https://www.youtube.com/watch?v=Ne9chW6nFNQ"
      },
      {
        source: "SoundCloud",
        url: "https://soundcloud.com/proconf/24-hiring-success-2019"
      }
    ]
  })
}

const getEpisodes = () => {
  var episodes = new Array();
  axios
    .get('/episodes.json')
    .then(function(response){
      episodes = response['data'].map(parseEpisode)
    })
    .catch(function (error) {
      console.log(error);
    })
  console.log(episodes);
  return episodes;
};

const EpisodePreview = ({ item }: { item: Podcast }) => {
  return (
    <div className='episode-preview'>
      <div className='episode-preview__bg' />
      <div
        className='episode-preview__image'
        style={{ backgroundImage: `url(${item.img})` }}
      />
      <div className='episode-preview__content'>
        <div className='episode-preview__number'>Выпуск #{pad(item.id, 2)}</div>
        <Link to={`/episodes/${item.id}`} onClick={scrollTop} className='episode-preview__title'>{item.title}</Link>
        <div className='episode-preview__sub'>
          {moment(item.date).format("DD MMMM YYYY")}
        </div>
        <div className='episode-preview__sub'>
          Cпонсор этого выпуска <b>{item.sponsor}</b>
        </div>
        <div className='episode-preview__actions'>
          <div className='navbar navbar--small navbar--white'>
            <a
              href={item.links[0].url}
              target='__blank'
              className='navbar__item'
            >
              Открыть на Youtube
            </a>
            <Link to={`/episodes/${item.id}`} onClick={scrollTop} className='navbar__item'>
              Подробно
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const EpisodeItem = ({
  isActive,
  item,
  isComming
}: {
  isComming: boolean;
  isActive: boolean;
  item: Podcast;
}) => {
  return (
    <Link
      to={`/episodes/${item.id}`}
      onClick={scrollTop}
      className={`episode-item episode-item--active_${isActive} episode-item--is-coming_${isComming}`}
    >
      <div
        className='episode-item__image'
        style={{ backgroundImage: `url(${item.img})` }}
      />
      <div className='episode-item__content'>
        <div className='episode-item__number'>
          {isComming ? "New" : `#${pad(item.id, 2)}`}
          <div className='podcast-date'>
            {moment(item.date).format("DD MMMM YYYY")}
          </div>
        </div>
        <div className='episode-item__title'>{item.title}</div>
        <div className='episode-item__descr'>{item.descr}</div>
      </div>
    </Link>
  );
};

const EpisodeList = ({ item }: { item: Podcast }) => {
  const items = getEpisodes().slice(0, 3);

  return (
    <div className='episode-list'>
      <div className='episode-list__uptitle'>Новые</div>
      <div className='episode-list__title'>Новые выпуски</div>
      {items.map((e, index) => {
        return (
          <EpisodeItem
            key={e.id}
            isComming={index === 0}
            isActive={item.id === e.id}
            item={e}
          />
        );
      })}
      <div>
        <Link
          className='episode-list__others'
          to='/page/1'
          onClick={scrollTop}
        >
          Прочие выпуски <AntdIcon type={ArrowRightOutline} />
        </Link>
      </div>
    </div>
  );
};

let interval: any;
const PodcastTimetable = () => {
  const [seconds, setSeconds] = useState(secondsToTime(0));

  useEffect(() => {
    const time = new Date();
    clearInterval(interval);
    interval = setInterval(() => {
      const target =
        time.getHours() < 19 && new Date().getHours() < 19
          ? new Date(
              `${time.getUTCFullYear()}-${time.getMonth() +
                1}-${time.getDate()} 19:00:00`
            )
          : new Date(
              `${time.getUTCFullYear()}-${time.getMonth() +
                1}-${time.getDate() + 1} 19:00:00`
            );
      setSeconds(secondsToTime((target.valueOf() - Date.now()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [setSeconds]);
  return (
    <div className='podcast-timetable__outline'>
      <div className='podcast-timetable'>
        <Page.Content>
          <div className='podcast-timetable__content'>
            <div className='podcast-timetable__title'>Online-вещание</div>
            <div className='podcast-timetable__descr'>
              Запись подкаста производится по четвергам, в 19:00 по Минскому
              времени. В это время вы можете слушать нас в прямом эфире по
              ссылке.
            </div>
          </div>
          <div className='podcast-timetable__content'>
            <div className='podcast-timetable__timeleft'>
              {seconds.h}:{seconds.m}:{seconds.s}
            </div>
            <div className='podcast-timetable__descr'>
              <a
                target='__blank'
                href='https://www.youtube.com/channel/UCvasfOIImo7D9lQkb1Wc1tw'
                className='podcast-timetable__link'
              >
                Смотреть на Youtube
              </a>
            </div>
          </div>
        </Page.Content>
      </div>
    </div>
  );
};

const Podcasts = ({ page }: { page?: string }) => {
  const items = getEpisodes().slice(3, 13);
  return (
    <div className='podcast-small__list'>
      <div className='episode-list__title'>
        {page ? `Выпуски` : "Прочие выпуски"}
      </div>
      {items.map(e => (
        <Podcast.Small key={e.id} item={e} />
      ))}
    </div>
  );
};

const HomeContent = () => {
  const [currentPodcast] = useState(getEpisodes()[0]);

  return (
    <div className='home-page'>
      <EpisodePreview item={currentPodcast} />
      <EpisodeList item={currentPodcast} />
    </div>
  );
};

export const Home = ({ match }: RouteComponentProps<{ page?: string }>) => {
  const { page } = match.params;
  return (
    <>
      {!page && (
        <>
          <Page.Content>
            <HomeContent />
          </Page.Content>
          <PodcastTimetable />
        </>
      )}
      <Page.Content>
        <Podcasts page={page} />
        <Page.Paginator />
      </Page.Content>
    </>
  );
};
