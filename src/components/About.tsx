import { about, education, skills, timeline } from "@/lib/content";
import { GradDoodle, ToolDoodle } from "./illustrations/Doodles";
import SectionHead from "./SectionHead";
import { Cap, Clock, Wrench } from "./icons";

const TILTS = [-2.5, 2, -1.5, 2.5];

export default function About() {
  return (
    <section className="section" id="parcours" aria-labelledby="parcours-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <hr className="rule" style={{ marginBottom: "clamp(80px, 10vw, 130px)" }} />
        <SectionHead
          id="parcours-title"
          num="03"
          kicker="Parcours"
          title={
            <>
              Parcours &amp;
              <br />
              compétences
            </>
          }
          aside="Formation, expérience et stack technique."
        />

        <div className="about__top">
          <div className="about__text reveal">
            {about.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="about__facts">
              {skills[3].items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <ul className="about__bubbles reveal" style={{ "--d": "120ms" } as React.CSSProperties}>
            {about.facts.map((f, i) => (
              <li
                key={f}
                className={`bubble bubble--big ${i % 2 ? "bubble--right" : "bubble--left"}`}
                style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="about__grid">
          <div className="card about__card reveal">
            <h3 className="display">
              <Cap size={24} /> Formation
            </h3>
            {education.map((e) => (
              <div className="edu" key={e.institution}>
                <div className="edu__head">
                  <span className="edu__name">{e.institution}</span>
                  <span className="edu__years">{e.years}</span>
                </div>
                <p className="edu__degree">{e.degree}</p>
                <p className="edu__loc">{e.location}</p>
              </div>
            ))}
            <GradDoodle />
          </div>

          <div className="card about__card reveal" style={{ "--d": "90ms" } as React.CSSProperties}>
            <h3 className="display">
              <Clock size={24} /> En bref
            </h3>
            <ol className="tl">
              {timeline.map((t) => (
                <li key={t.year + t.text}>
                  <span className="tl__dot" aria-hidden="true" />
                  <span>
                    <span className="tl__year">{t.year}</span>
                    <span className="tl__text">{t.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card about__card reveal" style={{ "--d": "180ms" } as React.CSSProperties}>
            <h3 className="display">
              <Wrench size={24} /> Stack
            </h3>
            {skills.slice(0, 3).map((g) => (
              <div className="stack-group" key={g.label}>
                <span className="kicker">{g.label}</span>
                <div>
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <ToolDoodle />
          </div>
        </div>
      </div>
    </section>
  );
}
