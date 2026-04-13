import Image from 'next/image';
import SectionHeading from '../SectionHeading/SectionHeading';
import { featuredProjects, projectArchive } from '../../../content/projects';
import styles from './Projects.module.css';

function ProjectLinks({ githubUrl, liveUrl }) {
  return (
    <div className={styles.projectActions}>
      {githubUrl ? (
        <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.inlineLink}>
          GitHub
        </a>
      ) : (
        <span className={styles.inlineNote}>GitHub link pending</span>
      )}
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noreferrer" className={styles.inlineLink}>
          Live preview
        </a>
      ) : (
        <span className={styles.inlineNote}>Demo optional</span>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <SectionHeading title="Projects" />

      <div className={styles.featuredProjectList}>
        {featuredProjects.map((project, index) => {
          const hasVisualImage = Boolean(project.visualImage);
          const hasThemeSwapImage = Boolean(project.visualImage && project.visualImageDark);
          const showVisualOverlay = !(hasVisualImage && project.hideVisualOverlay);
          const visualFrameStyle = project.visualPosition
            ? { '--project-visual-position': project.visualPosition }
            : undefined;

          return (
            <article key={project.title} className={styles.featuredProject}>
              <div className={styles.projectVisual}>
                <div className={styles.visualFrame} style={visualFrameStyle}>
                  <div
                    className={`${styles.visualMediaLayer}${hasVisualImage ? ` ${styles.visualMediaLayerFilled}` : ''}${hasThemeSwapImage ? ` ${styles.themeSwapMediaLayer}` : ''}`}
                  >
                    {hasVisualImage ? (
                      hasThemeSwapImage ? (
                        <>
                          <Image
                            src={project.visualImage}
                            alt={project.visualAlt ?? `${project.title} preview`}
                            fill
                            sizes="(max-width: 1024px) calc(100vw - 44px), 40vw"
                            className={`${styles.visualMedia} ${styles.visualMediaLight}`}
                          />
                          <Image
                            src={project.visualImageDark}
                            alt={project.visualAltDark ?? project.visualAlt ?? `${project.title} preview`}
                            fill
                            sizes="(max-width: 1024px) calc(100vw - 44px), 40vw"
                            className={`${styles.visualMedia} ${styles.visualMediaDark}`}
                          />
                        </>
                      ) : (
                        <Image
                          src={project.visualImage}
                          alt={project.visualAlt ?? `${project.title} preview`}
                          fill
                          sizes="(max-width: 1024px) calc(100vw - 44px), 40vw"
                          className={styles.visualMedia}
                        />
                      )
                    ) : (
                      <div className={styles.visualPlaceholderBackdrop} aria-hidden="true" />
                    )}
                  </div>

                  {showVisualOverlay ? (
                    <div className={styles.visualOverlay}>
                      <span className={styles.visualNumber}>0{index + 1}</span>
                      <p className={styles.visualLabel}>{project.visualLabel}</p>
                      <small className={styles.branchLine}>branch: {project.branch}</small>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={styles.projectCopy}>
                <span className={styles.projectTypeChip}>{project.projectType}</span>
                <h3>{project.title}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>
                <p className={styles.projectDetail}>{project.detail}</p>
                <div className={styles.tagList}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.archiveGrid}>
        {projectArchive.map((project) => (
          <article key={project.title} className={styles.archiveCard}>
            <span className={styles.archiveType}>{project.projectType}</span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className={styles.tagList}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
          </article>
        ))}
      </div>
    </section>
  );
}
