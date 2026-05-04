'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { projects } from '../../../content/projects';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './Projects.module.css';

function ProjectActions({ githubUrl, liveUrl, statusText }) {
  if (!githubUrl && !liveUrl && !statusText) {
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
      {!githubUrl && !liveUrl && statusText ? (
        <span className={styles.staticAction}>{statusText}</span>
      ) : null}
    </div>
  );
}

function LocalVideoProjectFrame({ project, isPlaybackActive }) {
  const videoRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [project.videoSrc]);

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
        playPromise.catch(() => {
          setIsVideoPlaying(false);
        });
      }
      return undefined;
    }

    video.pause();
    setIsVideoPlaying(false);
    return undefined;
  }, [hasMounted, isPlaybackActive]);

  const posterClassName = `${styles.mediaPoster}${isVideoPlaying ? ` ${styles.mediaPosterHidden}` : ''}`;

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
            poster={project.posterSrc}
            aria-hidden="true"
            onPlaying={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
            onError={() => setIsVideoPlaying(false)}
          />
        ) : null}
        {project.posterSrc ? (
          <img className={posterClassName} src={project.posterSrc} alt="" aria-hidden="true" />
        ) : !hasMounted ? (
          <div className={styles.mediaVideoMountPlaceholder} aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
}

function SkillScanConceptArtwork() {
  return (
    <div className={styles.conceptScene}>
      <div className={styles.skillscanCanvas} aria-hidden="true">
        <span className={styles.skillscanTileRear} />
        <span className={styles.skillscanTileSide} />
        <span className={styles.skillscanTilePrimary} />
      </div>
    </div>
  );
}

function PneumoraConceptArtwork() {
  return <SkillScanConceptArtwork />;
}

function PlaceholderProjectFrame({ project, index }) {
  const frameClassName = styles[`placeholderStage${project.slug}`] ?? '';
  const isSkillScan = project.slug === 'skillscan';
  const isPneumora = project.slug === 'pneumora';

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} role="img" aria-label={`${project.title} placeholder preview`}>
        <div className={`${styles.placeholderStage} ${frameClassName}`}>
          {isSkillScan ? <SkillScanConceptArtwork /> : null}
          {isPneumora ? <PneumoraConceptArtwork /> : null}
          {!isSkillScan && !isPneumora ? (
            <>
              <div className={styles.placeholderGrid} />
              <span className={styles.placeholderCrosshairHorizontal} />
              <span className={styles.placeholderCrosshairVertical} />

              <div className={styles.placeholderLayout}>
                <div className={styles.placeholderHero}>
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
            </>
          ) : null}
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
  const [focusedProjectSlug, setFocusedProjectSlug] = useState(null);
  const [usesViewportPlayback, setUsesViewportPlayback] = useState(false);
  const projectRowRefs = useRef(new Map());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updatePlaybackMode = () => {
      const shouldUseViewportPlayback = mediaQuery.matches;
      setUsesViewportPlayback(shouldUseViewportPlayback);

      if (!shouldUseViewportPlayback) {
        setFocusedProjectSlug(null);
      }
    };

    updatePlaybackMode();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePlaybackMode);
      return () => {
        mediaQuery.removeEventListener('change', updatePlaybackMode);
      };
    }

    mediaQuery.addListener(updatePlaybackMode);

    return () => {
      mediaQuery.removeListener(updatePlaybackMode);
    };
  }, []);

  useEffect(() => {
    if (!usesViewportPlayback) {
      return undefined;
    }

    let animationFrameId = 0;

    const updateFocusedProject = () => {
      animationFrameId = 0;
      const viewportCenter = window.innerHeight / 2;
      let nextFocusedProjectSlug = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      projects.forEach((project) => {
        if (!project.videoSrc) {
          return;
        }

        const row = projectRowRefs.current.get(project.slug);
        if (!row) {
          return;
        }

        const rect = row.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const minimumVisibleHeight = Math.min(rect.height * 0.3, 180);

        if (visibleHeight < minimumVisibleHeight) {
          return;
        }

        const rowCenter = rect.top + rect.height / 2;
        const distanceFromViewportCenter = Math.abs(rowCenter - viewportCenter);

        if (distanceFromViewportCenter < bestDistance) {
          bestDistance = distanceFromViewportCenter;
          nextFocusedProjectSlug = project.slug;
        }
      });

      setFocusedProjectSlug((currentSlug) =>
        currentSlug === nextFocusedProjectSlug ? currentSlug : nextFocusedProjectSlug
      );
    };

    const scheduleFocusedProjectUpdate = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateFocusedProject);
    };

    updateFocusedProject();
    window.addEventListener('scroll', scheduleFocusedProjectUpdate, { passive: true });
    window.addEventListener('resize', scheduleFocusedProjectUpdate);
    window.addEventListener('orientationchange', scheduleFocusedProjectUpdate);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('scroll', scheduleFocusedProjectUpdate);
      window.removeEventListener('resize', scheduleFocusedProjectUpdate);
      window.removeEventListener('orientationchange', scheduleFocusedProjectUpdate);
    };
  }, [usesViewportPlayback]);

  return (
    <section className={styles.section} id="projects">
      <ScrollReveal as="div" variant="soft" distance={18}>
        <SectionHeading title="Projects" />
      </ScrollReveal>
      <ScrollReveal as="div" className={styles.sectionMeta} variant="rise" delay={50} distance={16}>
        <span className={styles.fileLabel}>portfolio.json</span>
      </ScrollReveal>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isMediaRight = index % 2 === 0;
          const rowClassName = `${styles.projectRow}${isMediaRight ? ` ${styles.projectRowReversed}` : ''}`;
          const mediaVariant = isMediaRight ? 'pop' : 'tilt';
          const copyVariant = isMediaRight ? 'driftLeft' : 'driftRight';
          const revealDelay = index * 70;

          return (
            <article
              key={project.slug}
              ref={(node) => {
                if (node) {
                  projectRowRefs.current.set(project.slug, node);
                  return;
                }

                projectRowRefs.current.delete(project.slug);
              }}
              className={rowClassName}
              onMouseEnter={
                project.videoSrc && !usesViewportPlayback
                  ? () => setActiveProjectSlug(project.slug)
                  : undefined
              }
              onMouseLeave={
                project.videoSrc && !usesViewportPlayback ? () => setActiveProjectSlug(null) : undefined
              }
            >
              <ScrollReveal
                as="div"
                className={styles.mediaColumn}
                variant={mediaVariant}
                delay={revealDelay}
                distance={18}
              >
                <ProjectFrame
                  project={project}
                  index={index}
                  isPlaybackActive={
                    usesViewportPlayback
                      ? focusedProjectSlug === project.slug
                      : activeProjectSlug === project.slug
                  }
                />
              </ScrollReveal>

              <ScrollReveal
                as="div"
                className={styles.copyColumn}
                variant={copyVariant}
                delay={revealDelay + 90}
                distance={22}
              >
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

                <ProjectActions
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  statusText={project.statusText}
                />
              </ScrollReveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
