import { speakers } from "./speakers";
import { secondsToTime } from "../utils";

export type Podcast = ReturnType<typeof getPodcast>;
export type KeyNote = ReturnType<typeof getKeynote>;
export type Topic = ReturnType<typeof getTopic>;

const topics = [
  "Приветствие",
  "Может ли нейросеть продлить жизнь владельцу мобильного телефона",
  "Ржавые грабли и серебряные пули: как мы разрабатывали Wanna Kicks",
  "Слишком много шума. Как понять, что происходит в мире технологий сегодня",
  "Не напрягаться и получать удовольствие. Как остаться инженером и выжить в IT-бизнесе",
  "Геймификация. Управление мотивацией пользователя в приложении",
  "Быстрый ML inference на мобильных устройствах",
  "Машинное обучение + космические снимки + агротех = профит",
  "Карты для роботов",
  "Как стартапу получить корпоративные инвестиции и чем они могут быть полезны?",
  "Три подхода к генерации последовательностей нейросетями",
  "Квази-гиперболические методы оптимизации для глубинного обучения",
  "K-factor  больше 1 это новый LTV круче CPA и причем тут AR",
  "TBA",
  "Завершение"
];

const getKeynote = (x: number, n: number) => {
  const time = secondsToTime((n + 1) * 3600);
  return {
    id: n + 1,
    time: `${time.h}:${time.m}:${time.s}`,
    url: "https://youtu.be/gIBH1MUUJPc?t=1004",
    name: topics[Math.floor(Math.random() * topics.length)],
    speaker: speakers[Math.floor(Math.random() * speakers.length)]
  };
};

const getTopic = () => {
  return {
    url: "https://youtu.be/gIBH1MUUJPc?t=1004",
    name: topics[Math.floor(Math.random() * speakers.length)]
  };
};

const images = [
  "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.fodors.com%2Fwp-content%2Fuploads%2F2017%2F10%2FHERO_UltimateLondon_Hero_shutterstock412054315.jpg&f=1",
  "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fool.sg%2Fwp-content%2Fuploads%2F2015%2F06%2Fsingapore-815721_1280.jpg&f=1",
  "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs.inyourpocket.com%2Fgallery%2F107415.jpg&f=1",
  "https://instagram.fmsq2-1.fna.fbcdn.net/vp/b0b830c1a4bdbaf727e179e36082b77c/5DD10120/t51.2885-15/e35/56595624_2084883081809724_7664941229958475827_n.jpg?_nc_ht=instagram.fmsq2-1.fna.fbcdn.net",
  "https://instagram.fmsq2-1.fna.fbcdn.net/vp/7857a12504f9f480a6c82710a176daec/5DD792D1/t51.2885-15/e35/56189727_2302693276419880_1095838550719263562_n.jpg?_nc_ht=instagram.fmsq2-1.fna.fbcdn.net",
  "https://instagram.fmsq2-1.fna.fbcdn.net/vp/4f5e171930a10ea9b5934bd0b045353e/5DD0A098/t51.2885-15/e35/53391360_177090599937812_3423114200376475228_n.jpg?_nc_ht=instagram.fmsq2-1.fna.fbcdn.net",
  "https://instagram.fmsq2-1.fna.fbcdn.net/vp/896d359638af2a0dfb420b241d5a46d8/5DD7EF36/t51.2885-15/e35/58883302_2444643188903592_1302453315906066733_n.jpg?_nc_ht=instagram.fmsq2-1.fna.fbcdn.net",
  "https://instagram.fmsq2-1.fna.fbcdn.net/vp/903add228c06c5e768f3e488fa295452/5E125C42/t51.2885-15/e35/52840545_826425051053504_267880511773934079_n.jpg?_nc_ht=instagram.fmsq2-1.fna.fbcdn.net"
];

const descriptions = [
  "The Developer Conference is a technical conference for developers, hardware engineers and architects working on IoT solutions. Learn from the world’s leading companies and open source projects who will present the information needed to lead successful IoT developments.",
  "Share insights and best practices with 1200 talent acquisition leaders. Attend Success Circles and our Smart Lab to work with peers on your top issues.",
  "In theory, performance, accessibility, and inclusive design all have similar goals: Provide the best, most consistent experience to all people using the minimal amount of resources.",
  "Join industry colleagues and hear 40+ API experts across two tracks sharing critical insights on building success in the API ecosystem. Over 2.5 days we’ll explore the many faculties of developing and sustaining a thriving API-first organization.",
  "A lot of the discussions around serverless has been about the benefits it brings to the table with regards to DevOps - more infrastructure automation, scalability and resilience out-of-the-box. Developers love it because they can offload even more undifferentiated heavy-lifting to their cloud vendors, and they can focus their energy on building the things their users want. Businesses benefit hugely too because they have happier developers who can deliver value faster!",
  "Intentionally intimate, advanced-level topics, interactive speaker sessions, facilitated networking discussions, featuring top speakers from around the world."
];

const titles = [
  "IoT World ( 2018-2019 )",
  "Hiring Success 2019",
  "#PerfMatters",
  "AUSTIN API SUMMIT 2019",
  "ServerlessDays Cardiff 2019",
  "DockerCon 2019",
  "TF Blockchain"
];

const sponsors = ["Valentine Zavadski", "IKEA", "Малыш и Карлсон", "Wargaming"];

const getPodcast = (x: number, n: number) => {
  return {
    id: n + 1,
    date: Date.now(),
    title: titles[Math.floor(Math.random() * titles.length)],
    sponsor: sponsors[Math.floor(Math.random() * sponsors.length)],
    keynotes: new Array(10).fill(0).map(getKeynote),
    descr: descriptions[Math.floor(Math.random()*descriptions.length)],
    img: images[Math.floor(Math.random() * images.length)],
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
  };
};

export const podcasts = new Array(20).fill(0).map(getPodcast);
