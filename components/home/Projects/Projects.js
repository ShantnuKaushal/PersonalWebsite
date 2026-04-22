'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { projects } from '../../../content/projects';
import styles from './Projects.module.css';

function formatProjectIndex(index) {
  return String(index + 1).padStart(2, '0');
}

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

function LocalVideoProjectFrame({ project, isPlaybackActive }) {
  const videoRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return undefined;
    }

    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    if (isPlaybackActive) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
      return undefined;
    }

    video.pause();
    return undefined;
  }, [hasMounted, isPlaybackActive]);

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} aria-label={`${project.title} demo reel`}>
        {hasMounted ? (
          <video
            ref={videoRef}
            className={styles.mediaVideo}
            src={project.videoSrc}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <div className={styles.mediaVideoMountPlaceholder} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function PlaceholderProjectFrame({ project, index }) {
  const indexLabel = formatProjectIndex(index);
  const frameClassName = styles[`placeholderStage${project.slug}`] ?? '';

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} role="img" aria-label={`${project.title} placeholder preview`}>
        <div className={`${styles.placeholderStage} ${frameClassName}`}>
          <div className={styles.placeholderGrid} />
          <span className={styles.placeholderCrosshairHorizontal} />
          <span className={styles.placeholderCrosshairVertical} />

          <div className={styles.placeholderHud}>
            <span>{`Fig. ${indexLabel} // Display`}</span>
            <span>Preview Mode</span>
          </div>

          <div className={styles.placeholderLayout}>
            <div className={styles.placeholderHero}>
              <span className={styles.placeholderSerial}>{`P${indexLabel}`}</span>
              <strong>{project.title}</strong>
              <div className={styles.placeholderBars} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className={styles.placeholderPanels} aria-hidden="true">
              {project.tags.slice(0, 3).map((tag) => (
                <div key={tag} className={styles.placeholderPanel}>
                  <span>{tag}</span>
                  <em />
                </div>
              ))}
            </div>
          </div>

          <span className={styles.playButton} aria-hidden="true">
            <span className={styles.playGlyph} />
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectFrame({ project, index, isPlaybackActive }) {
  if (project.videoSrc) {
    return <LocalVideoProjectFrame project={project} isPlaybackActive={isPlaybackActive} />;
  }

  return <PlaceholderProjectFrame project={project} index={index} />;
}

export default function Projects() {
  const [activeProjectSlug, setActiveProjectSlug] = useState(null);

  return (
    <section className={styles.section} id="projects">
      <SectionHeading title="Projects" />
      <div className={styles.sectionMeta}>
        <span className={styles.fileLabel}>portfolio.manifest</span>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isMediaRight = index % 2 === 0;
          const rowClassName = `${styles.projectRow}${isMediaRight ? ` ${styles.projectRowReversed}` : ''}`;

          return (
            <article
              key={project.slug}
              className={rowClassName}
              onMouseEnter={project.videoSrc ? () => setActiveProjectSlug(project.slug) : undefined}
              onMouseLeave={project.videoSrc ? () => setActiveProjectSlug(null) : undefined}
            >
              <div className={styles.mediaColumn}>
                <ProjectFrame
                  project={project}
                  index={index}
                  isPlaybackActive={activeProjectSlug === project.slug}
                />
              </div>

              <div className={styles.copyColumn}>
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  <div className={styles.tagList}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.projectBody}>
                  <p className={styles.projectSummary}>{project.summary}</p>
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
