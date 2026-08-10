import Reveal from "../../components/Reveal/Reveal";
import StaggerText from "../../components/StaggerText/StaggerText";
import TOP_TEN from "../../data/spotifyTopTen.json";
import "./Personal.css";

export default function Personal() {
  return (
    <section id="personal" className="section personal">
      <div className="container personal-grid">
        <div>
          <Reveal as="p" className="eyebrow">
            [Personal]
          </Reveal>
          <StaggerText as="h2" className="section-heading" text="Beyond work" />
          <Reveal as="p" className="personal-bio">
            I'm a Computer Science graduate from the University of Georgia (B.S.
            2025), based in Charlotte, NC. [Add a couple lines here about your
            hobbies and interests outside of work.]
          </Reveal>
        </div>

        <Reveal as="div" className="personal-top-ten" delay={120}>
          <h3>My Spotify Top 10</h3>
          <ol>
            {TOP_TEN.map((item) => (
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
      </div>
    </section>
  );
}
