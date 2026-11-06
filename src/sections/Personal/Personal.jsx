import { FaInstagram } from "react-icons/fa";
import Reveal from "../../components/Reveal/Reveal";
import RippleTitle from "../../components/RippleTitle/RippleTitle";
import Footer from "../../components/Footer/Footer";
import TOP_TRACKS from "../../data/spotifyTop.json";
import CURRENTLY_READING from "../../data/goodreadsCurrentlyReading.json";
import "./Personal.css";

export default function Personal() {
  return (
    <section id="personal" className="section personal">
      <div className="container personal-grid">
        <div>
          <Reveal as="p" className="eyebrow">
            [Personal]
          </Reveal>
          <RippleTitle id="personal" as="h2" className="section-heading" text="About Me" />
          <Reveal as="p" className="personal-bio">
            I'm a Computer Science graduate from the University of Georgia (B.S.
            2025), based in Charlotte, NC. I'm currently at Capgemini as a Sofware Engineer, 
            where I work on various projects with clients within the financial industry.
            <br></br>
            <br></br>
            Outside of work, I enjoy playing music with my band, exploring new hiking trails, 
            and reading challenging books.
          </Reveal>

          <Reveal as="div" className="personal-band" delay={140}>
            <h3>Check out my band</h3>
            <a
              href="https://www.instagram.com/jibtheband/"
              target="_blank"
              rel="noreferrer"
              className="band-link"
            >
              <FaInstagram className="band-icon" aria-hidden="true" />
              <span>@jibtheband</span>
            </a>
          </Reveal>
        </div>

        <div className="personal-side">
          <Reveal as="div" className="personal-top-ten" delay={120}>
            <h3>My Spotify Top 5</h3>
            <ol>
              {TOP_TRACKS.map((item) => (
                <li key={item.rank}>
                  <span className="top-ten-rank">{String(item.rank).padStart(2, "0")}</span>
                  {item.url ? (
                    <a className="top-ten-track" href={item.url} target="_blank" rel="noreferrer">
                      {item.track}
                    </a>
                  ) : (
                    <span className="top-ten-track">{item.track}</span>
                  )}
                  <span className="top-ten-artist">{item.artist}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="div" className="personal-reading" delay={180}>
            <h3>Currently Reading</h3>
            <ul>
              {CURRENTLY_READING.map((book) => (
                <li key={book.link}>
                  <img className="reading-cover" src={book.image} alt="" />
                  <div className="reading-meta">
                    <a className="reading-title" href={book.link} target="_blank" rel="noreferrer">
                      {book.title}
                    </a>
                    <span className="reading-author">{book.author}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Footer />
    </section>
  );
}
