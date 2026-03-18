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
      <SectionHeading
        eyebrow="Projects"
        title="Projects."
        description="Placeholder structure is ready. Final repos and project details can drop in later."
      />

      <div className={styles.featuredProjectList}>
        {featuredProjects.map((project, index) => (
          <article key={project.title} className={styles.featuredProject}>
            <div className={styles.projectVisual}>
              <div className={styles.visualFrame}>
                <span>0{index + 1}</span>
                <p>{project.visualLabel}</p>
                <small>{project.status}</small>
              </div>
            </div>
            <div className={styles.projectCopy}>
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
        ))}
      </div>

      <div className={styles.archiveGrid}>
        {projectArchive.map((project) => (
          <article key={project.title} className={styles.archiveCard}>
            <span className={styles.archiveStatus}>{project.status}</span>
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
