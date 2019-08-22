import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import "./EpisodeDetails.css";
import { Page, Podcast } from "../../../components";
import { Podcast as PodcastType, podcasts } from "../../../data";
import ReactPlayer from "react-player";

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
  const item = podcasts.find(e => e.id === num);
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
