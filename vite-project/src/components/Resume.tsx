import { useEffect, useRef } from "react";
import type FormInfo from "../types";
import { format } from "date-fns";
import "../css/Resume.css";
type callback = (param: number) => void;

/**
 * Icons
 */
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
  </svg>
);

function parseDate(str: string): Date{
  const arr = str.split("-").map((num) => parseInt(num));
  const [year, month, day] = arr;
  const date = new Date(year, day, month);
  return date;
}
// Date Range and Responsibiliy formatters
function formatDateRange(start?: string, end?: string) {
  const fstart = (start) ? format(parseDate(start), "MMM y") : "???";
  const fend = (end) ?  format(parseDate(end), "MMM y") : "Present";
  if(!start && !end) return null; // Not allowing undefined timelines
  return `${fstart} – ${fend}`;
}

function BulletList({num, lines}: {num:number, lines:string[]}){
  const arr: Array<string> = new Array(num).fill("•");
  return <div className="bullets">
    {arr.map((bullet, index) => (<span key={index}>{bullet}    {lines[index]}</span>))}
  </div>
}
/**
 * Parses textarea input from new lines and creates bulletlist
 * @param param0 
 * @returns 
 */
function ResponsibilitiesBlock({ text }: {text?: string}) {
  if (!text) return null;
  // Extracting the lines form the text area and filtering empty strings
  const lines: string[] = text.split(/\n+/).filter(Boolean);
  const len: number = lines.length;
  return (<BulletList num={len} lines={lines}/>);

}

// Event handler for edit button
const goEdit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, setStep: callback) => {
    if(!evt.target) return;
    setStep(1);
}


// Main Component
export default function Resume({ formInfo, setStep} : {formInfo: FormInfo, setStep: callback}) {

  const {
    name, email, phone,
    school, degree, degree_start, degree_end,
    company, position, responsibilities, work_start, work_end,
  }: FormInfo = formInfo;

  // References used for animations later on
  const resumeRef = useRef(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Animation that renders sections in quick succession
  useEffect(() => {
    const t = setTimeout(() => {
        if(!resumeRef.current) return;
        (resumeRef.current as HTMLElement).classList.add("visible");
        sectionRefs.current.forEach((el, i) => {
            if (!el) return;
            setTimeout(() => (el as HTMLElement).classList.add("visible"), 180 * i);
            });
        }, 60);
    return () => clearTimeout(t);
    }, []);

  const eduDate = formatDateRange(degree_start, degree_end);
  const workDate = formatDateRange(work_start, work_end);

  const hasContact = email || phone;
  const hasEducation = school || degree || eduDate;
  const hasExperience = company || position || responsibilities || workDate;
  console.log(hasContact, hasEducation, hasExperience);

  return (
    <>
      <div className="resume-wrapper">
        <article className="resume" ref={resumeRef} aria-label="Resume">

          {/* Header*/}
          <header className="resume-header">
            <div className="header-corner" aria-hidden="true" />
            <h1 className="resume-name">
              {name
                ? name
                : <span className="name-placeholder">Your Name</span>
              }
            </h1>
            {hasContact && (
              <div className="resume-contact">
                {email && (
                  <span className="resume-contact-item">
                    <IconMail />{email}
                  </span>
                )}
                {phone && (
                  <span className="resume-contact-item">
                    <IconPhone />{phone}
                  </span>
                )}
              </div>
            )}
          </header>

          {/* Body*/}
          <div className="resume-body">

            {/* Education */}
            {hasEducation && (
              <section
                className="resume-section"
                ref={el => {
                    sectionRefs.current[0] = el;
                    }}
              >
                <div className="section-heading">
                  <span className="section-heading-text">Education</span>
                  <div className="section-rule" />
                </div>
                <div className="entry">
                  {eduDate && <span className="entry-date">{eduDate}</span>}
                  {school && <h2 className="entry-title">{school}</h2>}
                  {degree && <p className="entry-subtitle">{degree}</p>}
                </div>
              </section>
            )}

            {/* Experience */}
            {hasExperience && (
              <section
                className="resume-section"
                ref= {el => {
                    sectionRefs.current[1] = el}}
              >
                <div className="section-heading">
                  <span className="section-heading-text">Experience</span>
                  <div className="section-rule" />
                </div>
                <div className="entry">
                  {workDate && <span className="entry-date">{workDate}</span>}
                  {company && <h2 className="entry-title">{company}</h2>}
                  {position && <p className="entry-subtitle">{position}</p>}
                  <ResponsibilitiesBlock text={responsibilities} />
                </div>
              </section>
            )}

            <section
                className = "resume-section"
                ref= {el => {
                    sectionRefs.current[2] = el
                }}>
                <div className="section-heading">
                    <div className="section-rule"></div>
                </div>
                <div className="entry">

                    <button onClick={(evt) => {goEdit(evt, setStep)}} className="edit-btn">Edit</button>

                </div>
            </section>

          </div>
        </article>
      </div>
    </>
  );
}


 