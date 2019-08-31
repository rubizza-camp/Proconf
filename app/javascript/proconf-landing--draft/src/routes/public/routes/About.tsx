import React from "react";
import "./About.css";
import { Page } from "../../../components";
import { Speaker, speakers } from "../../../data";
import { Link } from "react-router-dom";

const SpeakerItem = ({ item }: { item: Speaker }) => {
  return (
    <div className='speaker'>
      <div
        className='speaker__avatar'
        style={{ backgroundImage: `url(${item.img})` }}
      />
      <div className='speaker__content'>
        <div className='speaker__name'>{item.name}</div>
      </div>
    </div>
  );
};
const AboutContent = () => {
  return (
    <div className='about'>
      <div className='about__item'>
        <div className='about__bg-cover'>
          <div
            className='about__bg'
            style={{
              backgroundImage:
                "url(https://instagram.fmsq2-1.fna.fbcdn.net/vp/b32d8cc49d5f10d74a1f680eb7e49d57/5DDE5129/t51.2885-15/e35/52612092_1012286485643844_9006242126901235917_n.jpg?_nc_ht=instagram.fmsq2-1.fna.fbcdn.net)"
            }}
          />
          <div className='about__bg-content'>
            <div className='about__bg-fun'>Всегда актуально</div>
            <div className='about__bg-text'>ProConf Show</div>
            <div className='about__bg-sub'>Работаем с начала 2019 года.</div>
            <div className='about__bg-sub'>
              Загадки, <b>конференеции</b>, обзоры...
            </div>
            <div className='about__bg-actions'>
              <div className='navbar navbar--small navbar--white'>
                <Link to={`/donate`} className='navbar__item'>
                  Поддержать ребят
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='about__content about__item'>
        <div className='about__uptitle'>Кто мы</div>
        <div className='about__title'>Кто же мы?</div>
        <div className='about__descr'>
          <p>
            <a href='https://www.youtube.com/c/proconf' target='__blank'>
              ProConf
            </a>{" "}
            - еженедельный шоу ( видеокаст ) с обзором технологических
            конференций.{" "}
          </p>
          <p>
            Каждую неделю во время прямых трансляций мы делимся каким-то
            историями людей и обсуждаем современные технологии. Шоу также
            доступно в записи после самой трансляции.{" "}
          </p>
          <p>
            В основном составе у нас 5 ведущих, но часто к нам приходят гости и
            разных областей для помощи в обзоре.
          </p>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const guests = speakers.filter(e => e.role === "guest");
  const owners = speakers.filter(e => e.role === "speaker");
  return (
    <>
      <Page.Content>
        <AboutContent />
      </Page.Content>
      <div className='about__contact'>
        <Page.Content>
          <div className='about__contact-text'>
            У нас есть{" "}
            <a href='https://t.me/proConf' target='__blank'>
              Телеграм
            </a>
            , для обсуждения идей, формат и общения. <a href='https://t.me/proConf' target='__blank'><b>Присоединяйтесь!</b></a>
          </div>
        </Page.Content>
      </div>
      <Page.Content>
        <div className='speakers'>
          <div className='speakers__group'>
            <div className='speakers__group-item'>
              <div className='about__title'>Постоянные ведущие</div>
              <div className='about__descr'>
                Мы много работаем, что бы выпуски выходили регулярно. Это не так
                просто как кажется.
              </div>
            </div>
            <div className='speakers__group-content'>
              {owners.map(e => (
                <SpeakerItem key={e.id} item={e} />
              ))}
            </div>
            <div className='speakers__group-item' />
          </div>
          <div className='speakers__group'>
            <div className='speakers__group-item'>
              <div className='about__title'>Приглашенные гости</div>
              <div className='about__descr'>
                <p>
                  Невероятно, но факт. Что бы стать приглашенным гостем,
                  зачастую достаточно связаться с организаторами.
                </p>
                <p>
                  Например через наш{" "}
                  <a href='https://t.me/proConf' target='__blank'>
                    Телеграм
                  </a>{" "}
                  канал.
                </p>
              </div>
            </div>
            <div className='speakers__group-content'>
              {guests.map(e => (
                <SpeakerItem key={e.id} item={e} />
              ))}
            </div>
            <div className='speakers__group-item' />
          </div>
        </div>
      </Page.Content>
    </>
  );
};
