import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <section className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Enterprise Software Solutions
        </h1>
        <p className={styles.heroSubtitle}>
          We partner with forward-thinking companies to build scalable, high-performance applications using modern technologies like React, Node.js, and cloud infrastructure.
        </p>
        <div className={styles.heroButtons}>
          <a
            className="button button--outline button--lg"
            href="https://www.onexgroup.co"
            target='_blank'
          >
            View Our Work
          </a>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}

function Homepage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title='Docs'
      description={`${siteConfig.title} Product Guide`}
    >
      <Homepage />
    </Layout>
  );
}
