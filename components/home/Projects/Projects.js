import Image from 'next/image';
import SectionHeading from '../SectionHeading/SectionHeading';
import { projects } from '../../../content/projects';
import styles from './Projects.module.css';

function ProjectActions({ githubUrl, liveUrl }) {
  if (!githubUrl && !liveUrl) {
    return null;
  }

  return (
    <div className={styles.projectActions}>
      {githubUrl ? (
        <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
          <span>View GitHub</span>
        </a>
      ) : null}
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noreferrer" className={styles.secondaryAction}>
          Live preview
        </a>
      ) : null}
    </div>
  );
}

function ProjectMedia({ project }) {
  const hasVisualImage = Boolean(project.visualImage);
  const hasThemeSwapImage = Boolean(project.visualImage && project.visualImageDark);
  const mediaStyle = project.visualPosition
    ? { '--project-visual-position': project.visualPosition }
    : undefined;

  if (hasVisualImage) {
    return (
      <div className={styles.projectMedia} style={mediaStyle}>
        {hasThemeSwapImage ? (
          <>
            <Image
              src={project.visualImage}
              alt={project.visualAlt ?? `${project.title} preview`}
              fill
              sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1200px) 44vw, 36vw"
              className={`${styles.projectImage} ${styles.projectImageLight}`}
            />
            <Image
              src={project.visualImageDark}
              alt={project.visualAltDark ?? project.visualAlt ?? `${project.title} preview`}
              fill
              sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1200px) 44vw, 36vw"
              className={`${styles.projectImage} ${styles.projectImageDark}`}
            />
          </>
        ) : (
          <Image
            src={project.visualImage}
            alt={project.visualAlt ?? `${project.title} preview`}
            fill
            sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1200px) 44vw, 36vw"
            className={styles.projectImage}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.projectMedia} ${styles.projectMediaPlaceholder}`}>
      <div className={`${styles.placeholderCanvas} ${styles[`placeholderCanvas${project.slug}`]}`} aria-hidden="true">
        <span className={styles.placeholderPanel} />
        <span className={styles.placeholderPanel} />
        <span className={styles.placeholderPanel} />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <SectionHeading title="Projects" />

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isReversed = index % 2 === 1;

          return (
            <article
              key={project.title}
              className={`${styles.projectRow}${isReversed ? ` ${styles.projectRowReversed}` : ''}`}
            >
              <div className={styles.mediaColumn}>
                <ProjectMedia project={project} />
              </div>

              <div className={styles.copyColumn}>
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  <div className={styles.tagList}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.projectBody}>
                  <p className={styles.projectSummary}>{project.summary}</p>
                  {project.detail ? <p className={styles.projectDetail}>{project.detail}</p> : null}
                </div>

                <ProjectActions githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
