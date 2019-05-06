import React, {Component} from 'react'
import styles from './style.scss'

import FlexModal from '../UI/FlexModal'

const samplePhotos = [{
  "id": "5817",
  "objectId": "301",
  "photoPath": "\/galleries\/301\/301_1523223069_0.jpg",
  "width": "3072",
  "height": "2048",
  "ratio": "1.5",
  "isCover": "0",
  "title": "",
  "description": "",
  "alt": "",
  "geo": "0,0",
  "exifCameraMake": "Canon",
  "exifCameraModel": "Canon EOS 600D",
  "exifIso": "100",
  "exifShutter": "1\/320",
  "exifAperture": "56\/10",
  "exifFocalLength": "113\/1"
}, {
  "id": "5803",
  "objectId": "301",
  "photoPath": "\/galleries\/301\/301_1523222923_9.jpg",
  "width": "3072",
  "height": "2048",
  "ratio": "1.5",
  "isCover": "0",
  "title": "",
  "description": "",
  "alt": "",
  "geo": "0,0",
  "exifCameraMake": "Canon",
  "exifCameraModel": "Canon EOS 600D",
  "exifIso": "100",
  "exifShutter": "1\/125",
  "exifAperture": "56\/10",
  "exifFocalLength": "135\/1"
}, {
  "id": "5807",
  "objectId": "301",
  "photoPath": "\/galleries\/301\/301_1523222966_7.jpg",
  "width": "3072",
  "height": "2048",
  "ratio": "1.5",
  "isCover": "0",
  "title": "",
  "description": "",
  "alt": "",
  "geo": "0,0",
  "exifCameraMake": "Canon",
  "exifCameraModel": "Canon EOS 600D",
  "exifIso": "100",
  "exifShutter": "1\/320",
  "exifAperture": "56\/10",
  "exifFocalLength": "106\/1"
}]


class App extends Component {
  state = {
    activePhoto: null,
    activeIndex: -1
  }

  handleModalOpen(index) {
    //const {post, galleries} = this.props

    this.setState({
      activePhoto: samplePhotos[index],
      activeIndex: index
    })
  }

  handleModalClose(event) {
    event.preventDefault()
    event.stopPropagation()

    this.setState({activePhoto: null, activeIndex: -1})
  }

  handleModalNavigation(action, event) {
    event.preventDefault()
    event.stopPropagation()

    // const {galleries} = this.props
    // const {id} = this.props.post
    // const photos = galleries[id] || samplePhotos
    const photos = samplePhotos

    const {activeIndex} = this.state

    switch (action) {
      case "prev":
        if (photos[activeIndex - 1]) {
          this.setState({
            activePhoto: photos[activeIndex - 1],
            activeIndex: activeIndex - 1
          })
        } else {
          this.setState({
            activePhoto: photos[photos.length - 1],
            activeIndex: photos.length - 1
          })
        }
        break
      case "next":
        if (photos[activeIndex + 1]) {
          this.setState({
            activePhoto: photos[activeIndex + 1],
            activeIndex: activeIndex + 1
          })
        } else {
          this.setState({
            activePhoto: photos[0],
            activeIndex: 0
          })
        }
        break
      default:
        break
    }
  }

  render() {
    const {activePhoto, activeIndex} = this.state

    return (
      <div className={styles.App}>
        <h2>FlexModal</h2>
        <p>Flex modal window is built purely for image viewing. Example below.</p>
        <a onClick={this.handleModalOpen.bind(this, 0)}>Open modal</a>
        <FlexModal photo={activePhoto}
                   onClose={this.handleModalClose.bind(this)}
                   onNavigation={this.handleModalNavigation.bind(this)}/>
      </div>
    )
  }
}

export default App