import React, {Component} from 'react'
import Loader from '../Loader'
import styles from './style.scss'
import ArrowLeft from '../../assets/svg/ic_keyboard_arrow_left_black_48px.svg'
import ArrowRight from '../../assets/svg/ic_keyboard_arrow_right_black_48px.svg'
import CloseX from '../../assets/svg/ic_close_black_48px.svg'

const RESOURCE_HOST = 'https://www.impressionsflow.com'

class FlexModal extends Component {

  state = {
    imageStyle: {},
    imageLoaded: false
  }

  saveScrollY = 0
  flexModal = null
  flexImage = null

  setImageHeight() {
    const iW = this.flexImage.clientWidth
    const iH = this.flexImage.clientHeight

    const scrW = window.innerWidth
    const scrH = window.innerHeight

    const iRatio = iW / iH
    const scrRatio = scrW / scrH

    const imageStyles = {
      limitWidth: {
        maxWidth: scrW - 30,
        height: 'auto'
      },
      limitHeight: {
        maxHeight: scrH - 30,
        width: 'auto'
      }
    }

    this.setState({
      imageStyle: scrRatio > iRatio ? imageStyles.limitHeight : imageStyles.limitWidth,
      imageLoaded: true
    })
  }

  stopPropagation(event) {
    event.stopPropagation()
  }

  initModalControls() {
    this.saveScrollY = window.scrollY
    document.addEventListener('keydown', this.keyDownListener)
    document.body.style = 'overflow: hidden;'
    document.documentElement.style = 'overflow: hidden;'
    // what about on window resize
  }

  destructModalControls() {
    document.removeEventListener("keydown", this.keyDownListener)
    document.body.style = {}
    document.documentElement.style = {}
    window.scroll(0, this.saveScrollY)
  }

  componentDidMount() {
    const {photo} = this.props

    if (photo) {
      this.initModalControls()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {photo} = nextProps
    const prevPhoto = this.props.photo

    if (!prevPhoto && photo) {
      this.initModalControls()
    }
    if (prevPhoto && !photo) {
      this.destructModalControls()
    }
  }

  componentWillUnmount() {
    const {photo} = this.props

    if (photo) {
      this.destructModalControls()
    }
  }

  keyDownListener = (event) => {
    this.handleKeyDown(event)
  }

  handleNavButtonClick = (action, event) => {
    event.persist()

    if (!this.state.imageLoaded) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    this.setState({imageLoaded: false})
    this.props.onNavigation(action, event)
  }

  handleKeyDown(event) {
    const {onClose, onNavigation} = this.props
    event.preventDefault = () => {
    }
    event.stopPropagation = () => {
    }

    if (!this.state.imageLoaded) {
      return
    }

    switch (event.code) {
      case "ArrowRight":
        trackEvent('Photo Modal', 'Keyboard Right')
        this.setState({imageLoaded: false})
        onNavigation('next', event)
        break
      case "ArrowLeft":
        trackEvent('Photo Modal', 'Keyboard Left')
        this.setState({imageLoaded: false})
        onNavigation('prev', event)
        break
      case "Escape":
        trackEvent('Photo Modal', 'Keyboard Esc')
        onClose(event)
        break
      // delete with DEL and edit feature with F2
      default:
        break
    }
  }

  getSizePath (path, size) {
    return path.replace('galleries', `public-images/${size}`)
  }

  render() {
    const {onClose, photo, onNavigation} = this.props
    const {imageStyle, imageLoaded} = this.state

    if (!photo) {
      return null
    }

    const imgSrc = this.getSizePath(`${RESOURCE_HOST}${photo.photoPath}`,'large')

    return (
      <div className={styles.flexModal} ref={(ref) => {this.flexModal = ref}}>
        <div className={styles.flexModalOverlay} onClick={onClose.bind(this)}>

          {!imageLoaded && <div className={styles.flexModalImageLoader}>
            <Loader overlayMode={true} />
          </div>}

          <div className={styles.flexModalBox} onClick={this.stopPropagation.bind(this)}>
            <a className={styles.flexModalNavClose} onClick={onClose.bind(this)}><CloseX /></a>
            <a className={styles.flexModalNavArrowLeft}
               onClick={this.handleNavButtonClick.bind(this, 'prev')}>
              <span className={styles.flexModalArrowCircle}>
                <ArrowLeft />
              </span>
            </a>
            <a className={styles.flexModalNavArrowRight}
               onClick={this.handleNavButtonClick.bind(this, 'next')}>
              <span className={styles.flexModalArrowCircle}>
                <ArrowRight />
              </span>
            </a>
            <div className={styles.flexModalImageTitle}>{photo.title}</div>
            <img className={imageLoaded ? styles.flexImage : styles.flexImageLoading}
                 src={imgSrc}
                 style={imageStyle}
                 alt={photo.alt}
                 onLoad={this.setImageHeight.bind(this)}
                 ref={(ref) => {this.flexImage = ref}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FlexModal
