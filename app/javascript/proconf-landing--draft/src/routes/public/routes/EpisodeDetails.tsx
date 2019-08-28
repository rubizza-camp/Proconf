import React, { useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import "./EpisodeDetails.css";
import { Page, Podcast } from "../../../components";
import { Podcast as PodcastType, podcasts } from "../../../data";
import { getKeynote, getTopic } from "../../../data";
import ReactPlayer from "react-player";
import { speakers } from "../../../data/speakers";
import { pad, secondsToTime, scrollTop } from "../../../utils";

import axios from 'axios';

const EpisodePlayer = ({ item }: { item: PodcastType }) => {
  const path = window.location.pathname;
  const arr = path.split(`/episodes/${item.id}/player/`);
  const source = arr.length === 1 ? item.links[0] : item.links.find(e => e.source === arr[1]) || item.links[0];
  return <div className="episode__player">
    <div className='podcast-full__tabs navbar'>
      {item.links.map(e => {
        return <Link
          to={`/episodes/${item.id}/player/${e.source}`}
          className={`navbar__item ${e.source === source.source ? 'navbar__item--active' : false }`}
        >
          {e.source}
        </Link>
      })}
    </div>
    <ReactPlayer url={source.url} />
  </div>
}
const Episode = ({ item }: { item: PodcastType } & RouteComponentProps<{ id: string }>) => {
  return <Podcast>
    <div className="podcast-title">
      <Podcast.Title isFull={true} item={item} />
    </div>
    <EpisodePlayer item={item} />
    <Podcast.Small isFull={true}  item={item} />
    <Podcast.Comments />
  </Podcast>;
};

export const EpisodeDetails = (props: RouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  const num = parseInt(id);

  const [item, setItem] = useState();

  useEffect(() => {
    axios.get(`/episodes/${num}.json`)
    .then((response) => {
      const item = response.data;
      const episode =
        {
          id: item.id,
          date: new Date(item.date).getTime(),
          title: item.title,
          sponsor: item.sponsors[0].name,
          keynotes: item.timecodes.map((timecode: any) => {
            const timecode_time = (new Date(timecode.time).getTime() - new Date(item.broadcast_begin).getTime()) / 1000;
            const time = secondsToTime(timecode_time);
            return {
              id: timecode.id,
              name: timecode.title,
              time: `${time.h}:${time.m}:${time.s}`,
              url: `https://youtu.be/${item.video}?t=${timecode_time}`
            }
          }),
          guests: item.guests.map((guest) => {
            return {
              id: guest.id,
              name: `${guest.name} ${guest.surname}`,
              img: guest.photo
            }
          }),
          authors: item.authors.map((author) => {
            return {
              id: author.id,
              name: `${author.name} ${author.surname}`,
              img: author.photo
            }
          }),
          descr: item.description,
          img: item.image ? item.image : `//img.youtube.com/vi/${item.video}/maxresdefault.jpg`,
          conference: {
            link: item.conference_link,
            topics: new Array(10).fill(0).map(getTopic)
          },
          links: [
            {
              source: "Youtube",
              url: `https://www.youtube.com/watch?v=${item.video}`
            },
            {
              source: "SoundCloud",
              url: "https://soundcloud.com/proconf"
            }
          ]
        };
      setItem(episode);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <Page.Content>
        {item ? (
          <Episode item={item} {...props} />
        ) : (
          <div className='episode-details__not-found'>Выпуск не найден</div>
        )}
      </Page.Content>
    </>
  );
};
