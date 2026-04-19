'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '../SectionHeading/SectionHeading';
import { projects } from '../../../content/projects';
import styles from './Projects.module.css';

const coverClassNames = {
  resource: styles.projectMediaResource,
  tweetcheck: styles.projectMediaTweetcheck,
};

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

function TweetCheckCover() {
  return (
    <div className={styles.tweetCover} aria-hidden="true">
      <div className={styles.tweetStatRow}>
        <div className={styles.tweetStatCard}>
          <span>Processed</span>
          <strong>40</strong>
        </div>
        <div className={styles.tweetStatCard}>
          <span>Positive</span>
          <strong>55%</strong>
        </div>
        <div className={styles.tweetStatCard}>
          <span>Negative</span>
          <strong>45%</strong>
        </div>
      </div>

      <div className={styles.tweetGrid}>
        <div className={styles.tweetStreamCard}>
          <div className={styles.tweetCardHeader}>
            <span className={styles.tweetSectionTitle}>Tweet Stream</span>
            <span className={styles.tweetConfidence}>Model confidence 99.6%</span>
          </div>

          <div className={styles.tweetHero}>
            <span className={`${styles.sentimentPill} ${styles.sentimentNegative}`}>Negative</span>
            <p className={styles.tweetHeadline}>Not feeling well...</p>
          </div>

          <div className={styles.tweetRecent}>
            <span className={styles.tweetRecentLabel}>Recent activity</span>
            <div className={styles.tweetRecentGrid}>
              <div className={styles.tweetMiniTile}>
                <span className={`${styles.sentimentPill} ${styles.sentimentPositive}`}>Positive</span>
                <p>"camp in confirming that he will be in San Diego this fall..."</p>
              </div>
              <div className={styles.tweetMiniTile}>
                <span className={`${styles.sentimentPill} ${styles.sentimentNegative}`}>Negative</span>
                <p>"Ugh. I look like a mental patient. Now my grandma..."</p>
              </div>
              <div className={styles.tweetMiniTile}>
                <span className={`${styles.sentimentPill} ${styles.sentimentPositive}`}>Positive</span>
                <p>"@birsfelder it was lovely. tom got me a new pink rucksack..."</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tweetSidebar}>
          <div className={styles.tweetControlCard}>
            <span className={styles.tweetSectionEyebrow}>Control</span>
            <span className={styles.tweetControlMeta}>Stream parameters</span>
            <div className={styles.tweetSliderTrack}>
              <span className={styles.tweetSliderFill} />
            </div>
            <div className={styles.tweetSpeedRow}>
              <span>Slow</span>
              <span>Medium</span>
              <span>Fast</span>
            </div>
            <div className={styles.tweetAction}>Start Stream</div>
          </div>

          <div className={styles.tweetTestCard}>
            <span className={styles.tweetSectionEyebrow}>SentimentCheck</span>
            <div className={styles.tweetInputMock}>Type a sentence here...</div>
            <div className={styles.tweetSecondaryAction}>Check sentiment</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCover() {
  return (
    <div className={styles.resourceCover} aria-hidden="true">
      <div className={styles.resourceScope}>Document scope</div>

      <div className={styles.resourceChipRow}>
        <span className={styles.resourceChip}>regulatory_framework.pdf</span>
        <span className={styles.resourceChip}>internal_audit_v1.pdf</span>
      </div>

      <div className={styles.resourceQuestion}>
        <span className={styles.resourceAvatar}>?</span>
        <p>What are the critical risks and compliance implications highlighted within these documents?</p>
      </div>

      <div className={styles.resourceSummaryCard}>
        <div className={styles.resourceSummaryHeader}>
          <strong>EXECUTIVE COMPLIANCE SUMMARY</strong>
          <span>Review portal output</span>
        </div>

        <div className={styles.resourceRiskList}>
          <div className={`${styles.resourceRiskItem} ${styles.resourceRiskHigh}`}>
            <div className={styles.resourceRiskLabel}>
              <span>I. Data sovereignty violation</span>
              <em>High risk</em>
            </div>
            <p>Identified unauthorized cross-border data transfers in internal audit notes.</p>
          </div>

          <div className={`${styles.resourceRiskItem} ${styles.resourceRiskMedium}`}>
            <div className={styles.resourceRiskLabel}>
              <span>II. Authentication redundancy</span>
              <em>Medium risk</em>
            </div>
            <p>Legacy OAuth flows remain active alongside modern implementations.</p>
          </div>

          <div className={`${styles.resourceRiskItem} ${styles.resourceRiskCompliant}`}>
            <div className={styles.resourceRiskLabel}>
              <span>III. Policy alignment</span>
              <em>Compliant</em>
            </div>
            <p>Encryption standards meet or exceed the current regulatory baseline.</p>
          </div>
        </div>
      </div>

      <div className={styles.resourceComposer}>
        <span>Ask about the active PDFs...</span>
        <span className={styles.resourceSendButton}>&gt;</span>
      </div>
    </div>
  );
}

function ProjectMediaCover({ project }) {
  if (project.visualVariant === 'tweetcheck') {
    return <TweetCheckCover />;
  }

  if (project.visualVariant === 'resource') {
    return <ResourceCover />;
  }

  return null;
}

function ProjectVideoMedia({ project, mediaStyle }) {
  const videoRef = useRef(null);
  const [hasFirstFrame, setHasFirstFrame] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    let cancelled = false;

    const markReady = () => {
      if (!cancelled) {
        setHasFirstFrame(true);
      }
    };

    const warmVideo = async () => {
      try {
        const playPromise = video.play();

        if (playPromise?.then) {
          await playPromise;
        }

        requestAnimationFrame(() => {
          video.pause();
          video.currentTime = 0;
          markReady();
        });
      } catch {
        markReady();
      }
    };

    if (video.readyState >= 2) {
      warmVideo();
      return () => {
        cancelled = true;
      };
    }

    const handleLoadedData = () => {
      warmVideo();
    };

    video.addEventListener('loadeddata', handleLoadedData, { once: true });

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [project.visualVideo]);

  const handleMediaMouseEnter = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  const handleMediaMouseLeave = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();
  };

  return (
    <div
      className={`${styles.projectMedia} ${styles.projectMediaVideoFrame}`}
      style={mediaStyle}
      role="img"
      aria-label={project.visualAlt ?? `${project.title} demo`}
      onMouseEnter={handleMediaMouseEnter}
      onMouseLeave={handleMediaMouseLeave}
    >
      <video
        ref={videoRef}
        className={`${styles.projectVideo}${hasFirstFrame ? ` ${styles.projectVideoReady}` : ''}`}
        poster={hasFirstFrame ? undefined : project.visualPoster}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src={project.visualVideo} type="video/mp4" />
      </video>
    </div>
  );
}

function ProjectMedia({ project }) {

  if (project.visualVariant) {
    return (
      <div
        className={`${styles.projectMedia} ${styles.projectMediaIllustrated} ${coverClassNames[project.visualVariant] ?? ''}`}
        role="img"
        aria-label={project.visualAlt ?? `${project.title} preview`}
      >
        <ProjectMediaCover project={project} />
      </div>
    );
  }

  const hasVisualImage = Boolean(project.visualImage);
  const hasVisualVideo = Boolean(project.visualVideo);
  const hasThemeSwapImage = Boolean(project.visualImage && project.visualImageDark);
  const mediaStyle =
    project.visualPosition || project.visualScale || project.visualTranslateX
      ? {
          ...(project.visualPosition ? { '--project-visual-position': project.visualPosition } : {}),
          ...(project.visualScale ? { '--project-visual-scale': project.visualScale } : {}),
          ...(project.visualTranslateX ? { '--project-visual-translate-x': project.visualTranslateX } : {}),
        }
      : undefined;

  if (hasVisualVideo) {
    return <ProjectVideoMedia project={project} mediaStyle={mediaStyle} />;
  }

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
  const handleProjectRowMouseEnter = (event) => {
    const video = event.currentTarget.querySelector('video');

    if (!video) {
      return;
    }

    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  const handleProjectRowMouseLeave = (event) => {
    const video = event.currentTarget.querySelector('video');

    if (!video) {
      return;
    }

    video.pause();
  };

  return (
    <section className={styles.section} id="projects">
      <SectionHeading title="Projects" />
      <div className={styles.sectionMeta}>
        <span className={styles.fileLabel}>builds.json</span>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isReversed = index % 2 === 1;
          const rowClassName = `${styles.projectRow}${isReversed ? ` ${styles.projectRowReversed}` : ''}${
            project.visualEmphasis === 'feature' ? ` ${styles.projectRowFeature}` : ''
          }`;

          return (
            <article
              key={project.title}
              className={rowClassName}
              onMouseEnter={project.visualVideo ? handleProjectRowMouseEnter : undefined}
              onMouseLeave={project.visualVideo ? handleProjectRowMouseLeave : undefined}
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
