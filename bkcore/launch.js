// Generated by CoffeeScript 2.7.0
(function () {
  var $, a, defaultControls, getWebGL, hasWebGL, i, init, len, s, u;

  $ = function (_) {
    return document.getElementById(_);
  };

  init = function (controlType, quality, hud, godmode) {
    var hexGL, progressbar;
    hexGL = new bkcore.hexgl.HexGL({
      document: document,
      width: window.innerWidth,
      height: window.innerHeight,
      container: $("main"),
      overlay: $("overlay"),
      gameover: $("step-5"),
      quality: quality,
      difficulty: 0,
      hud: hud === 1,
      controlType: controlType,
      godmode: godmode,
      track: "Cityscape",
    });
    window.hexGL = hexGL;
    progressbar = $("progressbar");
    return hexGL.load({
      onLoad: function () {
        console.log("LOADED.");
        hexGL.init();
        $("step-3").style.display = "none";
        $("step-4").style.display = "block";
        return hexGL.start();
      },
      onError: function (s) {
        return console.error(`Error loading ${s}.`);
      },
      onProgress: function (p, t, n) {
        console.log(
          "LOADED " + t + " : " + n + " ( " + p.loaded + " / " + p.total + " )."
        );
        return (progressbar.style.width = `${(p.loaded / p.total) * 100}%`);
      },
    });
  };

  u = bkcore.Utils.getURLParameter;

  defaultControls = bkcore.Utils.isTouchDevice() ? 1 : 0;

  s = [
    [
      "controlType",
      ["KEYBOARD", "TOUCH", "LEAP MOTION CONTROLLER", "GAMEPAD"],
      defaultControls,
      defaultControls,
      "CONTROLES: ",
    ],
    ["quality", ["LOW", "MID", "HIGH", "VERY HIGH"], 3, 3, "Quality: "],
    ["hud", ["OFF", "ON"], 1, 1, "HUD: "],
    ["godmode", ["OFF", "ON"], 0, 1, "Godmode: "],
  ];

  for (i = 0, len = s.length; i < len; i++) {
    a = s[i];
    (function (a) {
      var e, f, ref;
      a[3] = (ref = u(a[0])) != null ? ref : a[2];
      e = $(`s-${a[0]}`);
      (f = function () {
        return (e.innerHTML = a[4] + a[1][a[3]]);
      })();
      return (e.onclick = function () {
        return f((a[3] = (a[3] + 1) % a[1].length));
      });
    })(a);
  }

  $("step-2").onclick = function () {
    $("step-2").style.display = "none";
    $("step-3").style.display = "block";
    return init(s[0][3], s[1][3], s[2][3], s[3][3]);
  };

  $("step-5").onclick = function () {
    return window.location.reload();
  };

  $("s-credits").onclick = function () {
    $("step-1").style.display = "none";
    return ($("credits").style.display = "block");
  };

  $("credits").onclick = function () {
    $("step-1").style.display = "block";
    return ($("credits").style.display = "none");
  };

  hasWebGL = function () {
    var canvas, gl;
    gl = null;
    canvas = document.createElement("canvas");
    try {
      gl = canvas.getContext("webgl");
    } catch (error) {}
    if (gl == null) {
      try {
        gl = canvas.getContext("experimental-webgl");
      } catch (error) {}
    }
    return gl != null;
  };

  if (!hasWebGL()) {
    getWebGL = $("start");
    getWebGL.innerHTML = "WebGL is not supported!";
    getWebGL.onclick = function () {
      return (window.location.href = "http://get.webgl.org/");
    };
  } else {
    $("start").onclick = function () {
      $("step-1").style.display = "none";
      $("step-2").style.display = "block";
      return ($(
        "step-2"
      ).style.backgroundImage = `url(css/help-${s[0][3]}.png)`);
    };
  }
}).call(this);
