import React from "react";
import "./Podcast.css";
import { Podcast as PodcastType, KeyNote, Topic } from "../../data";
import { Link } from "react-router-dom";
import { pad, scrollTop } from "../../utils";
import moment from "moment";

const KeyNoteItem = ({ item }: { item: KeyNote }) => {
  return (
    <div className='key-note'>
      <a href={item.url} className='key-note__link' target='__blank'>
        <span className='key-note__time'>{item.time}</span>
        <span className='key-note__name'>{item.name}</span>
      </a>
    </div>
  );
};

const TopicItem = ({ item, index }: { index: number; item: Topic }) => {
  return (
    <div className='key-note'>
      <a href={item.url} className='key-note__link' target='__blank'>
        <span className='key-note__time key-note__time--small'>
          {index + 1}.
        </span>
        <span className='key-note__name'>{item.name}</span>
      </a>
    </div>
  );
};

const getPageTab = (path: string) => {
  return {
    isNotes: path.endsWith("/notes") || !path.includes("list"),
    isTopics: path.endsWith("/topics")
  };
};

function uniq<T extends { id: number }>(a: T[]) {
  var seen = {} as { [key: number]: boolean };
  return a.filter(function(item) {
    return seen.hasOwnProperty(item.id) ? false : (seen[item.id] = true);
  });
}

const PodcastSmallTitle = ({
  isFull,
  item
}: {
  isFull?: boolean;
  item: PodcastType;
}) => {
  return (
    <div className='podcast-small__item'>
      {!isFull ? (
        <>
          <Link
            to={`/episodes/${item.id}`}
            onClick={scrollTop}
            className='podcast-small__title'
          >
            <div className='podcast-small__number'>
              #{pad(item.id, 2)}
              <div className='podcast-date'>
                {moment(item.date).format("DD MMMM YYYY")}
              </div>
            </div>
            <div className='podcast-small__text'>{item.title}</div>
          </Link>
          <Link
            to={`/episodes/${item.id}`}
            onClick={scrollTop}
            className='podcast-small__img-bg'
          >
            <div
              className='podcast-small__img'
              style={{ backgroundImage: `url(${item.img})` }}
            />
          </Link>
        </>
      ) : (
        <>
          <div className='podcast-small__title'>
            <div className='podcast-small__number'>
              #{pad(item.id, 2)}
              <div className='podcast-date'>
                {moment(item.date).format("DD MMMM YYYY")}
              </div>
            </div>
            <div className='podcast-small__text'>{item.title}</div>
          </div>
          <div className='podcast-small__img-bg'>
            <div
              className='podcast-small__img'
              style={{ backgroundImage: `url(${item.img})` }}
            />
          </div>
        </>
      )}
      <div className='podcast-small__sponsor'>
        <span>Спонсор этого выпуска</span>
        <span>{item.sponsor}</span>
      </div>
      <div className='podcast-small__sponsor'>
        <a href={item.conference.link} target='__blank'>
          Ссылка на конференцию
        </a>
      </div>
    </div>
  );
};
const PodcastSmall = ({
  isFull,
  item
}: {
  isFull?: boolean;
  item: PodcastType;
}) => {
  const path = window.location.pathname;
  const pageParams = getPageTab(path);
  const guests = item.guests;
  const speakers = item.authors;
  return (
    <div className={`podcast-small podcast-small--is-full_${isFull}`}>
      <PodcastSmallTitle isFull={isFull} item={item} />
      <div className='podcast-small__content'>
        {isFull ? (
          <div className='podcast-full__tabs'>
            <Link
              to={`/episodes/${item.id}/list/notes`}
              className={`navbar__item ${pageParams.isNotes &&
                "navbar__item--active"}`}
            >
              Таймкоды
            </Link>
          </div>
        ) : null}
        {pageParams.isNotes && (
          <div className='podcast-small__keynotes'>
            {item.keynotes.map(e => {
              return <KeyNoteItem key={e.id} item={e} />;
            })}
          </div>
        )}
        {isFull ? (
          <div className='podcast-full__speakers-wr'>
            <div className='podcast-full__speakers'>
              <h4>Ведущие</h4>
              <div className='podcast-full__speakers-list'>
                {speakers.map(e => {
                  return (
                    <div
                      key={e.id}
                      title={e.name}
                      className='podcast-full__speaker-avatar'
                      style={{ backgroundImage: `url(${e.img})` }}
                    />
                  );
                })}
              </div>
            </div>
            <div className='podcast-full__speakers'>
              <h4>Гости</h4>
              <div className='podcast-full__speakers-list'>
                {guests.map(e => {
                  return (
                    <div
                      key={e.id}
                      title={e.name}
                      className='podcast-full__speaker-avatar'
                      style={{ backgroundImage: `url(${e.img})` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className='podcast-small__item' />
    </div>
  );
};

const Comments = () => {
  return (
    <div className='podcast__comments-wr'>
      <iframe
        className='podcast__comments'
        scrolling='no'
        title='Remark42'
        src='https://demo.remark42.com/web/iframe.html?site_id=remark&url=https%3A%2F%2Fremark42.com%2Fdemo%2F'
      />
    </div>
  );
};

const Podcast = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className='podcast'>{children}</div>;
};

Podcast.Small = PodcastSmall;
Podcast.KeyNote = KeyNoteItem;
Podcast.Topic = TopicItem;
Podcast.Comments = Comments;
Podcast.Title = PodcastSmallTitle;

export { Podcast as default };
