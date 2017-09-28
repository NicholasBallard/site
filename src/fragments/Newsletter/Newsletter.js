import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import { getItemSync, setItemSync } from '../../utils/storage'
import track from '../../utils/analytics/track'
import Button from '../../components/Button/Button'
import styles from './Newsletter.css'
import classnames from 'classnames'
const newsletterSubscribeAPI = process.env.API.NEWSLETTER

function validateEmail(value) {
  return /^([\w_\.\-\+])+@([\w\-]+\.)+([\w]{2,10})+$/.test(value)
}

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  buttonText: PropTypes.string,
  black: PropTypes.bool,
}
const defaultProps = {
  buttonText: 'Sign Up'
}
export default class Newsletter extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isSubscribed: getItemSync('newsletterSubscribed') === true,
      isFetching: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const user = getItemSync('profile')
    if (user) {
      this.refs.email.value = user.email
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const emailNode = this.refs.email
    const email = emailNode.value
    if (!validateEmail(email)) {
      alert('Woops! invalid email address') // eslint-disable-line
      return false
    }
    this.setState({
      isFetching: true,
      error: false
    })
    const that = this
    axios({
      method: 'post',
      url: newsletterSubscribeAPI,
      data: {
        email: email,
        name: ''
      },
    }).then((response) => {
      if (response && response.data && response.data.created) {
        console.log('creation succeed') // eslint-disable-line
        // Customer.io
        // https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/
        track('site:newsletter_subscribed', {
          label: 'Newsletter Subscription',
          value: window.location.href
        })
        that.setState({
          isSubscribed: true,
          isFetching: false
        }, () => {
          // trigger callback
          emailNode.value = ''
          if (onSubmit) {
            onSubmit()
          }
        })
        setItemSync('newsletterSubscribed', true)
        that.container.innerHTML = <p>Thank you for subscribing!</p>
      } else {
        console.log('failed creation') // eslint-disable-line
        that.setState({
          error: 'alreadyEntered'
        })
      }
    }).catch((error) => {
      console.log(error) // eslint-disable-line
      that.setState({
        error: 'serviceDown'
      })
    })
  }
  render() {
    const { buttonText, className, black } = this.props
    const { isFetching, error } = this.state
    let text = (isFetching) ? 'Success!' : buttonText
    const isBlack = (black === true) ? styles.black : ''
    const classes = classnames(className, styles.emailForm, isBlack)

    if (error) {
      text = 'Try Again'
    }

    return (
      <div ref={container => this.container = container} className={classes}>
        <input
            ref='email'
            type='email'
            className={styles.formControl}
            name='EMAIL'
            placeholder='Enter your email'
          />
        </div>
        <Button onClick={this.handleSubmit} kind='whiteBordered'>{text}</Button>
      </div>
    )
  }
}
Newsletter.defaultProps = defaultProps
Newsletter.propTypes = propTypes
