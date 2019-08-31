import React from "react";
import "./Donate.css";
import { Page } from "../../../components";

const DonateContent = () => {
  return <div className="donate">
    <div className='donate__title'>
      Занести ProConf(у)
    </div>
    <a href="https://www.patreon.com/zavtracast" target="__blank" className="donate__patreon" style={{backgroundImage: `url(https://zavtracast.ru/wp-content/uploads/2016/06/patreon2.jpg)`}} title="patreon"/>
    <div className='donate__descr'>
      Картинка кликабельная. Если картинка не работает, то жми <a href="https://www.patreon.com/zavtracast" target="__blank">сюда</a>.
    </div>
    <div className='donate__title'>
      Куда мы спустим деньги?
    </div>
    <div className='donate__descr'>
      Мы пытаемся соответствовать высокому качеству звука, а так же ищим возможности записать музыку на фон и отбивки. Мы все еще сомневаемся, что нам нужна хорошая камера, а хорошая камера для стримов стоит хороших денег... Но хочется.
    </div>
    <div className='donate__title'>
      Почему ProConf классный и надо ему занести
    </div>
    <div className='donate__descr'>
      <p>Уважаемые слушатели и смотрители! Уже долгое время ProConf радует вас обзорами и разборами докладов, мы учимся шутить шутки. Но мы же ИТ-иншники, а за уроки стендап комедии приходиться платить. По методичкам 90-х, а также статьям из интернета хороший выпуск не сделать. Ну и бухлишко, куда же без него. Видели сколько Валентин колы пьет за выпуск?</p>
      <p>Много выпусков с качественным звуком, и пока без музыки, кучей факапов и ДУШОЙ было сделано за этот срок. Проект, который изначально должен был просуществовать три месяца и умереть, собрал вокруг себя дружелюбную аудиторию, масштабом которой мы все еще поражаемся. Невиданный успех!</p>
      <p>
        В общем, к чему все это. Несмотря на то, что мы получаем десятки, а иногда и сотни сообщений “где подкаст?”, когда выпуск задерживается на день. А запись, монтаж, публикация и продвижение ProConf(a) занимают все больше и больше времени. Мы все равно вкладываем не только душу, но и много-много человеко-часов в каждый выпуск. Сотни писем и отзывов в исключительно позитивном ключе мы получаем каждый месяц, и именно поэтому мы не хотим останавливаться.
      </p>
      <p>
        Спасибо ваш <b>ProConf</b>
      </p>
    </div>
  </div>;
};

export const Donate = () => {
  return (
    <>
      <Page.Content>
        <DonateContent />
      </Page.Content>
    </>
  );
};
