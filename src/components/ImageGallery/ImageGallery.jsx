import { Component } from 'react';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { nanoid } from 'nanoid';

class ImageGallery extends Component {
  render() {
    const { images, onSelect } = this.props;

    return (
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem key={nanoid()} {...image} onClick={onSelect} />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;

