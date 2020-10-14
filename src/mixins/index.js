export default {
  methods: {
    $lightenOrDarken (col, amt) {

      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00FF) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000FF) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

    },
    $hexToRgba (str) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = str.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
      } else {
        return sColor;
      }
    },
    $hexToRgbaArray (str) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = str.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
      } else {
        return sColor.replace(/ /g, '').replace('rgba(', '').replace('rgb(', '').replace(')', '').split(',').slice(0, 3);
      }
    },
    $rgbToHex (r, g, b) {
      return ((r << 16) | (g << 8) | b).toString(16);
    },
    $isLightOrDark (hexcolor) {
      var colorrgb = hexcolor.indexOf('#') > -1 ? this.$hexToRgbaArray(hexcolor) : hexcolor;
      var red = colorrgb[0];
      var green = colorrgb[1];
      var blue = colorrgb[2];
      var brightness;
      brightness = (red * 299) + (green * 587) + (blue * 114);
      brightness = brightness / 255000;
      if (brightness >= 0.5) {
        return "light";
      } else {
        return "dark";
      }
    },
    $fakeClick (obj) {
      let ev = document.createEvent('MouseEvents')
      ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      obj.dispatchEvent(ev)
    },
    $exportRaw (data, filename) {
      var urlObject = window.URL || window.webkitURL || window
      var exportBlob = new Blob([data])
      var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      saveLink.href = urlObject.createObjectURL(exportBlob)
      saveLink.download = filename
      this.$fakeClick(saveLink)
    },
    $saveImage (data, filename) {
      var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      saveLink.href = data
      saveLink.download = filename
      this.$fakeClick(saveLink)
    },
    $img2base64 (url) {
      return new Promise((resolve, reject) => {
        const img = new Image()

        img.onload = () => {
          const c = document.createElement('canvas')

          c.width = img.naturalWidth
          c.height = img.naturalHeight

          const cxt = c.getContext('2d')

          cxt.drawImage(img, 0, 0)
          // 得到图片的base64编码数据
          resolve(c.toDataURL('image/png'))
        }

        img.onerror = (e) => {
          reject(new Error('图片下载失败，请稍后再试'))
        }

        img.setAttribute('crossOrigin', 'anonymous')
        img.src = url
      })
    },
    $getFileURL (file) {
      let getUrl = null;
      if (window.createObjectURL !== undefined) { // basic
        getUrl = window.createObjectURL(file);
      } else if (window.URL !== undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
      }
      return getUrl;
    },
    $durationFormat (duration) {
      let d = parseInt(Number(duration))
      let h = String(parseInt(d / (60 * 60)))
      let m = String(parseInt((d % (60 * 60)) / 60)).padStart(2, '0')
      let s = String(parseInt(d % 60)).padStart(2, '0')
      return (h > 0 ? h.padStart(2, '0') + ':' : '') + m + ':' + s
    },
    $sizeFormat (size) {
      let out = ''
      if (size > 1 * 1000 * 1000 * 1000) {
        out = parseFloat(size / 1000 / 1000 / 1000).toFixed(1) + ' GB'
      } else if (size > 1000 * 1000) {
        out = parseFloat(size / 1000 / 1000).toFixed(1) + ' MB'
      } else if (size > 1000) {
        out = parseFloat(size / 1000).toFixed(1) + ' KB'
      } else {
        out = parseInt(size) + ' B'
      }
      return out
    },
    $downloadImage (url, filename) {
      var x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = 'blob';
      let fn = filename || url.split('/').pop() || 'inig.png'
      x.onload = function (e) {
        var url = window.URL.createObjectURL(x.response)
        var a = document.createElement('a');
        a.href = url
        a.download = fn
        a.click()
      }
      x.send();
    },
    $numberFormat (number) {
      let s = String(number)
      return s.padStart(s.length + (s.length % 3 != 0 ? (3 - s.length % 3) : 0), '0').replace(/(\d{3})/g, '$1,').replace(/,$/, '').replace(/^0{1,2}/g, '')
    }
  }
}