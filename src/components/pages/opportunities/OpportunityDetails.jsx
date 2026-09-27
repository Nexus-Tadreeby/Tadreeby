import { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowUpRight, Award, BadgeCheck, Bookmark, BookOpen, Building2, Check, CheckCircle2, ChevronRight, ClipboardList, Clock3, Code2, GraduationCap, Layers3, MapPin, Sparkles, Users } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useOpportunityDetails } from "../../../hooks/useOpportunityDetails";
import { opportunitiesAPI } from "../../../services/api";
import "./opportunityDetails.css";

const date = value => !value || Number.isNaN(new Date(value).getTime()) ? "To be announced" : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
const list = value => Array.isArray(value) ? value : [];
const initials = (value = "") => value.split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
const types = { HYBRID: "Hybrid", REMOTE: "Remote", ONSITE: "On-site", ON_SITE: "On-site" };

function Fact({ label, children, tone = "" }) {
    return <div className={`od-fact ${tone ? `od-fact-${tone}` : ""}`}><dt>{label}</dt><dd>{children ?? "Not specified"}</dd></div>;
}
function OpportunityContent({ data, user }) {
    const [loadedAt] = useState(() => Date.now());
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [error, setError] = useState("");
    const submitting = useRef(false);
    const bookmarkKey = `tadreeby:opportunity:${user?.id ?? "student"}:${data.id}:saved`;
    const [saved, setSaved] = useState(() => {
        try { return localStorage.getItem(bookmarkKey) === "true"; } catch { return false; }
    });
    function toggleBookmark() {
        try {
            localStorage.setItem(bookmarkKey, String(!saved));
            setSaved(!saved);
        } catch { setError("Unable to save this opportunity in this browser."); }
    }
    // Preserve support for the older internship detail response.
    const header = data.header ?? { title: data.title || data.internship || data.field, trainingType: data.type, coverImage: data.image, location: data.location, company: typeof data.company === "object" ? data.company : { name: data.company } };
    const company = header.company ?? {};
    const mentor = header.mentor;
    const stats = data.stats ?? {};
    const about = data.about ?? { description: data.description, techStack: Array.isArray(data.requiredSkills) ? data.requiredSkills : data.requiredSkills?.split(",").map(s => s.trim()).filter(Boolean) };
    const overview = data.overview ?? {};
    const venue = overview.trainingVenue ?? {};
    const duration = overview.totalDuration ?? stats.duration ?? {};
    const seats = stats.seats ?? { total: data.totalSeats ?? data.seats, available: data.seats };
    const application = data.application ?? { alreadyApplied: data.applied };
    const attendance = data.logistics?.attendanceModel ?? {};
    const schedule = data.logistics?.workingSchedule ?? {};
    const certificate = data.certificateInfo;
    const trainingType = types[header.trainingType] || header.trainingType || "Not specified";
    const durationLabel = duration.durationLabel || (stats.duration?.months ? `${stats.duration.months} Months` : data.duration || "To be announced");
    const hours = duration.hours ?? stats.duration?.hours;
    const durationText = `${durationLabel}${hours != null ? ` (${hours}h)` : ""}`;
    const alreadyApplied = applied || application.alreadyApplied;
    const deadlinePassed = stats.applicationDeadline && new Date(stats.applicationDeadline).getTime() < loadedAt;
    const closed = data.status === "CLOSED" || data.isActive === false || deadlinePassed;
    const noSeats = seats.available != null && Number(seats.available) <= 0;
    const disabled = alreadyApplied || closed || noSeats || application.isEligible === false || applying;
    const applyLabel = alreadyApplied ? "Applied" : closed ? "Applications closed" : noSeats ? "No seats available" : application.isEligible === false ? "Not eligible" : applying ? "Submitting…" : "Apply";
    const score = application.profileMatch == null ? null : Math.min(100, Math.max(0, Number(application.profileMatch) || 0));
    const curriculum = list(data.curriculum);
    const curriculumWeeks = Math.max(0, ...curriculum.flatMap(phase => String(phase.weeks ?? "").match(/\d+/g)?.map(Number) ?? []));
    const mapQuery = venue.latitude != null && venue.longitude != null ? `${venue.latitude},${venue.longitude}` : [venue.name, venue.address || header.location].filter(Boolean).join(", ");
    async function handleApply() {
        if (disabled || submitting.current) return;
        if (stats.applicationDeadline && new Date(stats.applicationDeadline).getTime() < Date.now()) {
            setError("The application deadline has passed.");
            return;
        }
        submitting.current = true;
        setApplying(true);
        setError("");
        try {
            const response = await opportunitiesAPI.applyForOpportunity(data.id);
            if (response?.success === false) throw new Error(response.message || "Unable to submit your application.");
            setApplied(true);
        } catch (err) {
            setError(err.message || "Unable to submit your application. Please try again.");
        } finally {
            submitting.current = false;
            setApplying(false);
        }
    }
    return <>
        <nav className="od-breadcrumb" aria-label="Breadcrumb"><Link to="/student/opportunities">Browse Opportunities</Link><ChevronRight size={13} /><span aria-current="page">{header.title || "Opportunity Details"}</span></nav>
        <section className="od-hero"><div className="od-banner">
            {header.coverImage && <img className="od-cover" src={header.coverImage} alt="" onError={event => { event.currentTarget.style.display = "none"; }} />}
            <div className="od-overlay" /><div className="od-banner-badges"><span className="od-type"><i />{trainingType === "Hybrid" ? "ON-SITE LAB + REMOTE SYNC" : trainingType}</span>{header.cohort && <span>{header.cohort}</span>}</div>
            <div className="od-headline">{company.verifiedByTadreeby && <span className="od-verified">VERIFIED BY TADREEBY <BadgeCheck size={14} /></span>}<h1>{header.title || "Training Opportunity"}</h1><p>{about.description}</p></div>
        </div><div className="od-metrics">
            <div><span className="od-icon blue"><Building2 size={20} /></span><div><small>HOST COMPANY</small><strong>{company.name || "Training Provider"}</strong>{company.verifiedByTadreeby && <em><BadgeCheck size={12} />Verified partner</em>}</div></div>
            <div><span className="od-icon green"><MapPin size={20} /></span><div><small>LOCATION</small><strong>{header.location || venue.name || "Not specified"}</strong><span>{trainingType}</span></div></div>
            <div><span className="od-icon purple"><Clock3 size={20} /></span><div><small>PROGRAM DURATION</small><strong>{durationText}</strong><span>{duration.hoursPerWeek ?? stats.duration?.hoursPerWeek ?? "—"} hours / week</span></div></div>
            <div><span className="od-icon orange"><Users size={20} /></span><div><small>COHORT SEATS</small><strong>{seats.total ?? "—"} Total Seats</strong>{seats.available != null && <span className="od-seats">{seats.available} Left</span>}</div></div>
        </div></section>
        <div className="od-columns"><div className="od-details">
            {(score !== null || application.isEligible != null) && (
                <section className="od-match" aria-labelledby="opportunity-match-title">
                    <div className="od-match-content">
                        <div className="od-match-copy">
                            <span className="od-match-label"><Sparkles size={14} aria-hidden="true" />Your opportunity match</span>
                            <h2 id="opportunity-match-title">
                                {user?.firstName ? `${user.firstName}, ` : ""}
                                {application.isEligible === true ? "your academic prerequisites qualify!" : application.isEligible === false ? "review the enrollment requirements" : "explore your profile match"}
                            </h2>
                            <p>{application.isEligible === true ? "Your student profile meets the primary enrollment requirements for this training opportunity." : "Check the qualifications below to understand the academic and technical prerequisites."}</p>
                        </div>
                        {score !== null && (
                            <div className="od-score-panel">
                                <div className="od-score" role="img" aria-label={`Profile match: ${score}%`}>
                                    <svg viewBox="0 0 80 80" aria-hidden="true">
                                        <circle className="od-score-track" cx="40" cy="40" r="33.333" />
                                        <circle className="od-score-progress" cx="40" cy="40" r="33.333" pathLength="100" strokeDasharray={`${score} 100`} />
                                    </svg>
                                    <div className="od-score-value"><strong>{score}%</strong><span>MATCH</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
            <section className="od-card od-about" aria-labelledby="opportunity-about-title">
                <div className="od-about-heading">
                    <span className="od-about-icon"><BookOpen size={20} aria-hidden="true" /></span>
                    <div>
                        <h2 id="opportunity-about-title">About the Training & Opportunity Overview</h2>
                        <p>Program overview and learning outcomes.</p>
                    </div>
                </div>
                <div className="od-about-description">
                    {(about.description || "No description provided yet.").split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
                {(list(about.learningObjectives).length > 0 || certificate) && (
                    <div className="od-about-benefits">
                        {list(about.learningObjectives).length > 0 && <>
                            <h3>KEY BENEFITS FOR ACCEPTED STUDENTS</h3>
                            <ul className="od-benefit-list">
                                {about.learningObjectives.map((objective, index) => (
                                    <li key={`${objective.title}-${index}`}>
                                        <span className="od-benefit-check"><Check size={14} aria-hidden="true" /></span>
                                        <div><h4>{objective.title}</h4><p>{objective.description}</p></div>
                                    </li>
                                ))}
                            </ul>
                        </>}
                        {certificate && (
                            <div className="od-certificate">
                                <span className="od-certificate-icon"><Award size={20} aria-hidden="true" /></span>
                                <div>
                                    <h4>{certificate.name}</h4>
                                    <p>Signed by {certificate.signedBy || company.name}.{certificate.verifiable && ` Verifiable${list(certificate.verifiableOn).length ? ` on ${certificate.verifiableOn.join(" and ")}` : " digital credential"}.`}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
            <section className="od-card od-tech-card" aria-labelledby="opportunity-tech-title">
                <div className="od-tech-heading">
                    <div className="od-tech-heading-main">
                        <span className="od-tech-icon"><Code2 size={20} aria-hidden="true" /></span>
                        <div>
                            <h2 id="opportunity-tech-title">Target Tech Stack & Tooling</h2>
                            <p>Technologies and tools used throughout the training.</p>
                        </div>
                    </div>
                    <span className="od-tech-count">{list(about.techStack).length} {list(about.techStack).length === 1 ? "technology" : "technologies"}</span>
                </div>
                {list(about.techStack).length > 0 ? (
                    <ul className="od-tech">
                        {about.techStack.map((tech, index) => <li key={`${tech}-${index}`}><span className="od-tech-dot" aria-hidden="true" /><span>{tech}</span></li>)}
                    </ul>
                ) : <p>No specific tools listed.</p>}
            </section>
            <section className="od-card od-roadmap" aria-labelledby="opportunity-roadmap-title">
                <div className="od-roadmap-heading">
                    <div className="od-roadmap-heading-main">
                        <span className="od-roadmap-icon"><Layers3 size={20} aria-hidden="true" /></span>
                        <div>
                            <h2 id="opportunity-roadmap-title">Weekly Training Curriculum & Roadmap</h2>
                            <p>Your training journey, from foundations to practical delivery.</p>
                        </div>
                    </div>
                    {curriculumWeeks > 0 && <span className="od-roadmap-duration">{curriculumWeeks} {curriculumWeeks === 1 ? "Week" : "Weeks"} Total</span>}
                </div>
                {curriculum.length > 0 ? (
                    <ol className="od-timeline">
                        {curriculum.map((phase, index) => (
                            <li key={`${phase.phase}-${index}`}>
                                <span className="od-phase-dot" aria-hidden="true" />
                                <article className="od-phase-card">
                                    <div className="od-phase-meta">
                                        <span className="od-phase-label">{[phase.weeks, phase.phase || `PHASE ${String(index + 1).padStart(2, "0")}`].filter(Boolean).join(" • ")}</span>
                                        {phase.track && <span className="od-phase-track">{phase.track}</span>}
                                    </div>
                                    <h3>{phase.title}</h3>
                                    <p>{phase.description}</p>
                                    {list(phase.tags).length > 0 && <ul className="od-tags">{phase.tags.map((tag, tagIndex) => <li key={`${tag}-${tagIndex}`}>{tag}</li>)}</ul>}
                                </article>
                            </li>
                        ))}
                    </ol>
                ) : <p>The training roadmap will be announced soon.</p>}
            </section>
            <section className="od-card od-responsibilities-card" aria-labelledby="opportunity-responsibilities-title">
                <div className="od-responsibilities-heading">
                    <span className="od-responsibilities-icon"><ClipboardList size={20} aria-hidden="true" /></span>
                    <div>
                        <h2 id="opportunity-responsibilities-title">Training Responsibilities & Day-to-Day Tasks</h2>
                        <p>Your daily tasks and contributions during the training.</p>
                    </div>
                </div>
                {list(data.responsibilities).length > 0 ? (
                    <ol className="od-responsibilities">
                        {list(data.responsibilities).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((item, index) => (
                            <li key={`${item.title}-${index}`}>
                                <span className="od-responsibility-number" aria-hidden="true">{item.order ?? index + 1}</span>
                                <p>{item.title && <strong>{item.title}{item.description ? ": " : ""}</strong>}{item.description}</p>
                            </li>
                        ))}
                    </ol>
                ) : <p>Responsibilities will be shared by the training provider.</p>}
            </section>
            <section className="od-card od-eligibility" aria-labelledby="opportunity-eligibility-title">
                <div className="od-eligibility-heading">
                    <span className="od-eligibility-icon"><GraduationCap size={20} aria-hidden="true" /></span>
                    <div>
                        <h2 id="opportunity-eligibility-title">Required Qualifications & Eligibility</h2>
                        <p>Academic requirements and technical foundations.</p>
                    </div>
                </div>
                <div className="od-qualifications-grid">
                    {[
                        ["academic", "ACADEMIC & LEVEL STANDING", data.qualifications?.academic],
                        ["technical", "TECHNICAL FOUNDATIONS", data.qualifications?.technical],
                    ].map(([type, label, items]) => (
                        <div className={`od-qualifications od-qualifications-${type}`} key={type}>
                            <h3>{label}</h3>
                            {list(items).length > 0 ? (
                                <ul>{items.map((item, index) => <li key={`${item}-${index}`}><span className="od-qualification-check" aria-hidden="true"><Check size={11} strokeWidth={3} /></span><span>{item}</span></li>)}</ul>
                            ) : <p>Not specified.</p>}
                        </div>
                    ))}
                </div>
            </section>
            <section className="od-card od-facility" aria-labelledby="facility-title">
                <div className="od-facility-heading"><span className="od-facility-icon"><MapPin size={20} /></span><div><h2 id="facility-title">Training Logistics & Physical Execution Facility</h2><p>Attendance, working schedule, and your training environment.</p></div></div>
                <div className="od-logistics">
                    <div><span className="od-logistics-label">Attendance Model</span><h3>{attendance.type || "To be announced"}</h3><p>{attendance.checkInStart && `Daily check-in ${[attendance.checkInStart, attendance.checkInEnd].filter(Boolean).join(" – ")}. `}{attendance.minPercent != null && `${attendance.minPercent}% attendance minimum required.`}</p></div>
                    <div><span className="od-logistics-label">Working Schedule</span><h3>{schedule.days || "To be announced"}{schedule.dailyHours != null && ` (${schedule.dailyHours}h / day)`}</h3><p>{[schedule.startTime, schedule.endTime].filter(Boolean).join(" – ")}{schedule.notes && ` · ${schedule.notes}`}</p></div>
                    <div><span className="od-logistics-label">Training Facility</span><h3>{venue.name || header.location || "To be announced"}</h3><p>{[venue.address, venue.equipment].filter(Boolean).join(". ")}</p></div>
                    {venue.remoteTools && <div><span className="od-logistics-label">Remote Collaboration</span><h3>Tools & Platforms</h3><p>{venue.remoteTools}</p></div>}
                </div>
                {mapQuery && <a className="od-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer" aria-label="Open training location in Google Maps"><div className="od-map-grid" aria-hidden="true" /><span className="od-map-marker" aria-hidden="true"><MapPin size={14} /></span><span className="od-map-caption"><span className="od-map-location"><i /><strong>{venue.name || venue.address || header.location || "Training location"}</strong></span><span className="od-map-action">Open in Google Maps <ArrowUpRight size={14} /></span></span></a>}
            </section>
        </div><aside className="od-sidebar">
            <section className="od-card od-application"><h2>Opportunity Overview</h2><dl>
                <Fact tone="seats" label="Available Seats">{seats.available ?? "—"}/{seats.total ?? "—"} seats</Fact>
                <Fact label="Training Type"><span className="od-training-pill">{trainingType}</span></Fact>
                <Fact label="Training Period">{date(overview.trainingPeriod?.startDate || data.startDate)} – {date(overview.trainingPeriod?.endDate || data.endDate)}</Fact>
                <Fact tone="duration" label="Total Duration">{durationText}</Fact>
                <Fact label="Engineering Field">{overview.engineeringField || data.field}</Fact>
                <Fact label="Training Venue">{venue.name || header.location}</Fact>
                <Fact label="Application Deadline"><span className="od-deadline">{date(stats.applicationDeadline)}{stats.daysUntilDeadline > 0 && ` (${stats.daysUntilDeadline}d left)`}</span></Fact>
                <Fact label="Work Days">{duration.workingDays || schedule.days}</Fact>
                <Fact tone="stipend" label="Stipend">{stats.stipend != null ? `${stats.stipend}$` : "Not specified"}</Fact>
            </dl><div className="od-application-actions"><button className="od-apply" disabled={disabled} onClick={handleApply}>{alreadyApplied && <CheckCircle2 size={18} />}{applyLabel}{!disabled && <ArrowUpRight size={18} />}</button><button type="button" className="od-bookmark" onClick={toggleBookmark} aria-pressed={saved} aria-label={saved ? "Remove bookmark from this browser" : "Save opportunity in this browser"} title={saved ? "Saved in this browser" : "Save in this browser"}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /></button></div><div aria-live="polite">{alreadyApplied && <p className="od-success">Your application has been submitted{application.status ? ` · ${application.status}` : "."}</p>}{error && <p className="od-error" role="alert">{error}</p>}</div><div className="od-apply-note"><span><BadgeCheck size={15} />Quick Application</span><p>Apply using your Tadreeby student profile.</p></div></section>
                <section className="od-card od-mentor" aria-labelledby="opportunity-mentors-title">
                    <h2 id="opportunity-mentors-title">Mentors</h2>
                    {mentor ? <div className="od-mentor-panel">
                        {mentor.profileImage ? <img className="od-mentor-avatar" src={mentor.profileImage} alt="" /> : <span className="od-mentor-avatar">{initials(`${mentor.firstName || ""} ${mentor.lastName || ""}`) || "M"}</span>}
                        <div className="od-mentor-copy">
                            <h3>{`${mentor.firstName || ""} ${mentor.lastName || ""}`.trim() || "Training mentor"}</h3>
                            {mentor.position && <p className="od-mentor-position">{mentor.position}</p>}
                            {(mentor.bio || mentor.yearsExperience != null) && <p className="od-mentor-bio">{mentor.bio || `${mentor.yearsExperience}+ years of experience`}</p>}
                        </div>
                    </div> : <p className="od-mentor-empty">Mentor details haven’t been provided yet.</p>}
                </section>
            <section className="od-card od-company"><div className="od-person">{company.logo ? <img src={company.logo} alt="" /> : <span className="od-avatar">{initials(company.name)}</span>}<div><h3>{company.name || "Training Provider"}</h3><p>{company.verifiedByTadreeby ? "Verified training partner" : "Host organization"}</p></div></div>{data.companyStats && <div className="od-company-stats"><div><strong>{data.companyStats.internsTrained ?? "—"}</strong><small>Interns Trained</small></div><div><strong>{data.companyStats.completionRate ?? "—"}%</strong><small>Completion Rate</small></div></div>}</section>
        </aside></div>
    </>;
}
export default function OpportunityDetails() {
    const { id } = useParams();
    const location = useLocation();
    const { user } = useAuth();
    const isInternshipRoute = /\/student\/internships?\//.test(location.pathname);
    const { data, loading, error } = useOpportunityDetails(id, isInternshipRoute);
    return <main className="od-page"><div className="od-container">{loading ? <div className="od-state" role="status"><span className="od-spinner" />Loading opportunity details…</div> : error || !data ? <div className="od-state" role="alert"><h1>Unable to load this opportunity</h1><p>{error || "Opportunity not found."}</p><Link to="/student/opportunities">Back to opportunities</Link></div> : <OpportunityContent key={`${location.pathname}-${data.id}`} data={{ ...data, id: data.id ?? id }} user={user} />}</div></main>;
}
