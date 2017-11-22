import 'babel-polyfill';
//import Vue from 'Vue';

// import __$ from './utility/selector';


/**
 * canvasのdata-src属性の画像のピクセルデータからモザイクを描画する
 * @param mosaicSize {number}
 */
const mosaicImage = (target, mosaicSize = 20) => {

  let canvas = document.getElementById(target),
      _canvas = document.createElement('canvas');

  if (!canvas || !canvas.getContext) {

    return false;

  }

  /**
   * 画像情報からモザイクを描画する
   */
  const createMosaic = (context, width, height, size, data) => {

    for (let y = 0; y < height; y += size) {

      for (let x = 0; x < width; x += size) {

        /**
         * r,g,b,a の順で格納されている値を取り出す
         */
        let cR = data.data[(y * width + x) * 4],
            cG = data.data[(y * width + x) * 4 + 1],
            cB = data.data[(y * width + x) * 4 + 2];

        context.fillStyle = `rgb(${cR},${cG},${cB})`;
        context.fillRect(x, y, x + size, y + size);

      }

    }

  };

  /**
   * カンバスに描画
   */
  const draw = (_context, imageData, context) => {

    createMosaic(_context, _canvas.width, _canvas.height, mosaicSize, imageData);
    context.drawImage(_canvas, 0, 0);

  };


  const init = () => {

    let context = canvas.getContext('2d');

    /**
     * 画像をセット
     */
    let img = new Image();
    img.src = canvas.getAttribute('data-src');

    /**
     * 画像のロードを待って
     */
    img.onload = () => {

      let _context = _canvas.getContext('2d'),
          imageData;

      /**
       * 画像とカンバスのサイズを合わせる
       */
      _canvas.width = img.width;
      _canvas.height = img.height;

      _context.drawImage(img, 0, 0);

      /**
       * canvasのピクセルデータのオブジェクト
       * 左から右に、 r, g, b, a の順で色情報が格納されている
       */
      imageData = _context.getImageData(0, 0, _canvas.width, _canvas.height);

      draw(_context, imageData, context);

    };

  };
  init();

};

/**
 * 対象のカンバス, モザイクのサイズ
 */
mosaicImage('canvas', 20);

