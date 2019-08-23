import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import "./EpisodeDetails.css";
import { Page, Podcast } from "../../../components";
import ReactPlayer from "react-player";
import { getKeynote, getTopic } from "../../../data";

import axios from "axios";

export type PodcastType = ReturnType<typeof parseEpisode>;

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

const getEpisode = (id: number) => {
  var episodes = new Array();
  axios
    .get('/episodes/${id}.json')
    .then(function(response){
      episodes = response['data'].map(parseEpisode)
    })
    .catch(function (error) {
      console.log(error);
    })
  console.log(episodes);
  return episodes;
};

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
  const item = getEpisode(num);
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
