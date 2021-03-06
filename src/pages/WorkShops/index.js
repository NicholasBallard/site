import React from 'react'
import Default from '../../layouts/Default'
import { Link } from 'react-router'
import Section from './Section'
import styles from './WorkShops.css'

const imgBase = `${process.env.S3_BUCKET}images/workshops/`

export default class WorkShops extends React.Component {
  static hasLoadingState = true
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <Default
        className={styles.enterprise}
        {...this.props}
        fullWidth
        prefetches={[
          `${imgBase}san-francisco.jpg`,
          `${imgBase}seattle.jpg`,
          `${imgBase}new-york.jpg`,
          `${imgBase}atlanta.jpg`,
          `${imgBase}london.jpg`,
        ]}
      >
        <div className={styles.hero}>
          <div className={styles.boundMedium}>
            <h1 className={styles.heroTitle}>Upcoming Serverless Workshops</h1>
            <p className={`${styles.heroDescription}`}>
              Serverless Developer Workshops are a full day focused on training for serverless development. Learn about testing, security and operations. These workshops will empower developers and technology leaders to operationalize serverless across their organization.
            </p>

            <p className={`${styles.heroDescription} ${styles.center}`}>
              Join the waitlist for your city below.
            </p>

            <p className={`${styles.heroDescription} ${styles.center}`}>
              Priced at $1095 per person. For private workshops, please email workshops@serverless.com
            </p>
          </div>
        </div>
        <div>
          <div className={styles.cityLinks}>
            <Link to='/workshops/san-francisco'>
              San Francisco
            </Link>
            <Link to='/workshops/seattle'>
              Seattle
            </Link>
            <Link to='/workshops/new-york'>
              New York City
            </Link>
            <Link to='/workshops/atlanta'>
              Atlanta
            </Link>
            <Link to='/workshops/london'>
              London
            </Link>
          </div>
          <Section link='/workshops/san-francisco' img={`${imgBase}san-francisco-text.png`} />
          <Section link='/workshops/seattle' img={`${imgBase}seattle-text.png`} />
          <Section link='/workshops/new-york' img={`${imgBase}new-york-text.png`} />
          <Section link='/workshops/atlanta' img={`${imgBase}atlanta-text.png`} />
          <Section link='/workshops/london' img={`${imgBase}london-text.png`} />
        </div>
      </Default>
    )
  }
}
