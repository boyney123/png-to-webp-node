png-to-webp-node
================

## What is WebP?

*"WebP is a new image format that provides lossless and lossy compression for images on the web. WebP lossless images are 26% smaller in size compared to PNGs. WebP lossy images are 25-34% smaller in size compared to JPEG images at equivalent SSIM index. WebP supports lossless transparency (also known as alpha channel) with just 22% additional bytes. Transparency is also supported with lossy compression and typically provides 3x smaller file sizes compared to PNG when lossy compression is acceptable for the red/green/blue color channels."* 

*"WebP is supported by a variety of tools. In addition, it is now natively supported in Google Chrome, the Google Chrome Frame plug-in for Internet Explorer, Opera 11.10 and Android Ice Cream Sandwich.*" [[more info]](https://developers.google.com/speed/webp/)

## Png-to-WebP

This project is a simple node application that will convert .png images into WebP format and display the difference in kb. 

![alt tag](http://oi39.tinypic.com/2ni7fpz)


## Setup
Clone the project and install the node dependencies.

```
npm install
```

## Changing the images
Add your .png files to ./app/assets folder and start the node application. Navigate to localhost:3000 to see your images as WebP.

## Known issues
If your having problems viewing your images. Try refreshing the page a few times as the conversion to WebP may take a second or two.

#### Notes

This project is a proof of concept to see the difference in filesize between .png files and WebP formats.
The same can be done with the Grunt but node was used as an experiment.

