(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  function clearHash() {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }
  function forceTopPixel() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  clearHash();
  forceTopPixel();
  window.addEventListener('load', function () {
    clearHash();
    forceTopPixel();
    requestAnimationFrame(function () {
      forceTopPixel();
    });
    setTimeout(forceTopPixel, 60);
    setTimeout(forceTopPixel, 220);
  });
  window.addEventListener('pageshow', function () {
    clearHash();
    forceTopPixel();
  });

  var landing = document.getElementById('landing');
  var canvas = document.getElementById('blob-canvas');
  var viewerPanel = document.getElementById('viewer-panel');
  var status = document.getElementById('model-status');
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.story-copy'));

  if (!landing || !canvas || !viewerPanel || !status || blocks.length !== 3) return;
  if (!window.THREE) return;

  var THREE = window.THREE;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function setStatus(message) {
    status.textContent = 'Model: ' + message;
    console.log('[model]', message);
  }

  function formatError(error) {
    if (!error) return 'unknown';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    try {
      return JSON.stringify(error);
    } catch (_) {
      return String(error);
    }
  }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (_) {
    setStatus('WebGL init failed');
    return;
  }

  renderer.setClearColor(0x05050b, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;

  function applyTheme(theme) {
    var nextTheme = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeIcon) {
      themeIcon.textContent = nextTheme === 'dark' ? '☀' : '☾';
    }
    renderer.setClearColor(nextTheme === 'dark' ? 0x05050b : 0xececec, 1);
  }

  var storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem('site-theme');
  } catch (_) { }
  applyTheme(storedTheme === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        window.localStorage.setItem('site-theme', next);
      } catch (_) { }
    });
  }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.01, 500);
  camera.position.set(0.25, 0.06, 5.5);

  var ambient = new THREE.AmbientLight(0xffffff, 1.28);
  scene.add(ambient);

  var key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3.8, 2.6, 5.4);
  scene.add(key);

  var rim = new THREE.DirectionalLight(0xffffff, 1.0);
  rim.position.set(-2.6, 0.6, 2.1);
  scene.add(rim);

  var fill = new THREE.DirectionalLight(0xe2e8f0, 0.75);
  fill.position.set(0, -3, -2.2);
  scene.add(fill);

  var modelGlowLight = new THREE.PointLight(0x6d28d9, 1.2, 20, 2);
  modelGlowLight.position.set(0, 0, 1);
  scene.add(modelGlowLight);

  var glowCanvas = document.createElement('canvas');
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  var gctx = glowCanvas.getContext('2d');
  var grd = gctx.createRadialGradient(128, 128, 12, 128, 128, 118);
  grd.addColorStop(0, 'rgba(109,40,217,0.75)');
  grd.addColorStop(0.5, 'rgba(109,40,217,0.28)');
  grd.addColorStop(1, 'rgba(109,40,217,0)');
  gctx.fillStyle = grd;
  gctx.fillRect(0, 0, 256, 256);
  var glowTexture = new THREE.CanvasTexture(glowCanvas);
  var modelGlowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0.42,
    blending: THREE.AdditiveBlending
  }));
  modelGlowSprite.scale.set(8, 8, 1);
  modelGlowSprite.position.set(0, 0, -0.7);
  scene.add(modelGlowSprite);

  var targetKeyColor = new THREE.Color();
  var targetRimColor = new THREE.Color();
  var targetFillColor = new THREE.Color();

  var state = {
    width: 1,
    height: 1,
    pointerX: 0,
    pointerY: 0,
    targetPointerX: 0,
    targetPointerY: 0,
    scroll: 0,
    smoothScroll: 0,
    model: null,
    fallback: null,
    baseCameraZ: 5.5,
    modelBaseX: 0,
    modelBaseY: -0.04,
    userYaw: 0,
    targetUserYaw: 0,
    userPitch: 0,
    targetUserPitch: 0,
    zoomFactor: 1,
    targetZoomFactor: 1,
    isDragging: false,
    activePointerId: null,
    lastPointerX: 0,
    lastPointerY: 0,
    touchPrevDistance: 0,
    touchPrevX: 0,
    touchPrevY: 0,
    glowTargetX: 0,
    glowTargetY: 0,
    glowTargetZ: 1,
    glowChangeAt: 0,
    glowInterval: 2.4,
    mouseLightInfluence: 1
  };

  var fallback = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35, 4),
    new THREE.MeshStandardMaterial({ color: 0x4c1d95, emissive: 0x2e1065, emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.12 })
  );
  scene.add(fallback);
  state.fallback = fallback;

  function prepareMaterials(root) {
    var meshCount = 0;
    var lineCount = 0;

    root.traverse(function (obj) {
      obj.frustumCulled = false;

      if (obj.isMesh) {
        meshCount += 1;

        if (obj.geometry && !obj.geometry.attributes.normal) {
          obj.geometry.computeVertexNormals();
        }

        obj.material = new THREE.MeshStandardMaterial({
          color: 0x4c1d95,
          emissive: 0x2e1065,
          emissiveIntensity: 0.44,
          roughness: 0.25,
          metalness: 0.16,
          side: THREE.DoubleSide,
          transparent: false,
          opacity: 1
        });

        if (obj.geometry) {
          var edges = new THREE.EdgesGeometry(obj.geometry, 28);
          var outline = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.34 })
          );
          outline.raycast = function () { };
          obj.add(outline);
        }

        obj.visible = true;
      }

      if (obj.isLine || obj.isLineSegments) {
        lineCount += 1;
        obj.material = new THREE.LineBasicMaterial({ color: 0x1f2937, transparent: false, opacity: 1 });
        obj.visible = true;
      }
    });

    return { meshCount: meshCount, lineCount: lineCount };
  }

  function frameModel(root) {
    var box = new THREE.Box3().setFromObject(root);
    var size = new THREE.Vector3();
    var center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    root.position.sub(center);

    var largest = Math.max(size.x, size.y, size.z, 0.001);
    root.scale.setScalar(6.10 / largest);

    box = new THREE.Box3().setFromObject(root);
    var sphere = box.getBoundingSphere(new THREE.Sphere());
    var fovRad = THREE.MathUtils.degToRad(camera.fov);

    state.baseCameraZ = (sphere.radius / Math.sin(fovRad / 2)) * 1.18;
    camera.near = Math.max(0.01, state.baseCameraZ / 500);
    camera.far = state.baseCameraZ * 160;
    camera.updateProjectionMatrix();

    state.modelBaseX = 0;
    state.modelBaseY = window.innerWidth > 980 ? -0.04 : -0.1;

    setStatus('framed size=' + largest.toFixed(2));
  }

  function setModel(root, label) {
    var counts = prepareMaterials(root);

    if (counts.meshCount === 0 && counts.lineCount === 0) {
      root.add(new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.8, 1.8),
        new THREE.MeshNormalMaterial({ wireframe: true })
      ));
    }

    frameModel(root);
    scene.add(root);
    state.model = root;
    setStatus(label + ' (m=' + counts.meshCount + ', l=' + counts.lineCount + ')');

    if (state.fallback) {
      scene.remove(state.fallback);
      state.fallback.geometry.dispose();
      state.fallback.material.dispose();
      state.fallback = null;
    }
  }

  function pickNextGlowTarget(nowSec) {
    state.glowInterval = 1.9 + Math.random() * 1.8;
    state.glowChangeAt = nowSec + state.glowInterval;

    // Randomized floating target around model center.
    state.glowTargetX = (Math.random() * 2 - 1) * 1.7;
    state.glowTargetY = -0.6 + Math.random() * 1.8;
    state.glowTargetZ = 0.2 + Math.random() * 2.2;
  }

  function loadOBJ(onLoad, onError) {
    if (!THREE.OBJLoader) return onError(new Error('OBJLoader missing'));

    var objLoader = new THREE.OBJLoader();

    if (!THREE.MTLLoader) {
      setStatus('loading OBJ');
      return objLoader.load('model.obj', onLoad, undefined, onError);
    }

    setStatus('loading MTL');
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(
      'model.mtl',
      function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        setStatus('loading OBJ');
        objLoader.load('model.obj', onLoad, undefined, function (err) {
          objLoader.setMaterials(null);
          objLoader.load('model.obj', onLoad, undefined, function (err2) {
            onError(err2 || err);
          });
        });
      },
      undefined,
      function () {
        setStatus('MTL missing, raw OBJ');
        objLoader.load('model.obj', onLoad, undefined, onError);
      }
    );
  }

  function loadFBX(onLoad, onError) {
    if (!THREE.FBXLoader) return onError(new Error('FBXLoader missing'));
    setStatus('loading FBX');
    var fbxLoader = new THREE.FBXLoader();
    fbxLoader.load('model.fbx', onLoad, undefined, onError);
  }

  function loadModel() {
    // Prefer FBX first because many OBJ exports from CAD tools are partial surfaces only.
    loadFBX(
      function (fbx) {
        setModel(fbx, 'FBX loaded');
      },
      function (fbxErr) {
        setStatus('FBX failed: ' + formatError(fbxErr) + ' | trying OBJ');
        loadOBJ(
          function (obj) {
            setModel(obj, 'OBJ loaded');
          },
          function (objErr) {
            setStatus('failed: ' + formatError(objErr));
          }
        );
      }
    );
  }

  function updateSize() {
    var rect = viewerPanel.getBoundingClientRect();
    state.width = Math.max(1, rect.width);
    state.height = Math.max(1, rect.height);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(state.width, state.height, false);

    camera.aspect = state.width / state.height;
    camera.updateProjectionMatrix();

    if (state.model) frameModel(state.model);
  }

  function getScrollProgress() {
    var total = Math.max(1, landing.scrollHeight - window.innerHeight);
    return clamp(window.scrollY / total, 0, 1);
  }

  function updateText(progress) {
    var spread = blocks.length - 1;
    var position = progress * spread;

    blocks.forEach(function (block, i) {
      var delta = i - position;
      var d = Math.abs(delta);
      var opacity = clamp(1 - d * 1.15, 0, 1);
      var eased = easeOutCubic(opacity);
      var y = delta * 27;
      var scale = lerp(0.92, 1, eased);

      block.style.opacity = String(opacity);
      block.style.transform = 'translate3d(0, ' + y.toFixed(2) + 'vh, 0) scale(' + scale.toFixed(4) + ')';
      block.style.pointerEvents = d < 0.42 ? 'auto' : 'none';
    });
  }

  function getSectionPose(progress) {
    var spread = blocks.length - 1;
    var raw = clamp(progress * spread, 0, spread);
    var fromIndex = Math.floor(raw);
    var toIndex = Math.min(fromIndex + 1, spread);
    var t = easeOutCubic(raw - fromIndex);

    var poses = [
      // Section 1: close-up
      { camX: 0.04, camY: 0.1, camZMul: 0.62, lookX: 0, lookY: 0, rotY: -0.22, rotX: 0.12, rotZ: 0, modelY: -0.02 },
      // Section 2: side shot + extra close-up
      { camX: 0.16, camY: 0.22, camZMul: 0.24, lookX: 0, lookY: 0.0, rotY: 0.08, rotX: 5.42, rotZ: 0.96, modelY: -0.01 },
      // Section 3: worm's eye view
      { camX: 0.2, camY: -0.64, camZMul: 0.3, lookX: 0, lookY: 0.16, rotY: -0.78, rotX: -0.28, rotZ: 0, modelY: -0.12 }
    ];

    var a = poses[fromIndex];
    var b = poses[toIndex];

    return {
      camX: lerp(a.camX, b.camX, t),
      camY: lerp(a.camY, b.camY, t),
      camZMul: lerp(a.camZMul, b.camZMul, t),
      lookX: lerp(a.lookX, b.lookX, t),
      lookY: lerp(a.lookY, b.lookY, t),
      rotY: lerp(a.rotY, b.rotY, t),
      rotX: lerp(a.rotX, b.rotX, t),
      rotZ: lerp(a.rotZ, b.rotZ, t),
      modelY: lerp(a.modelY, b.modelY, t)
    };
  }

  function getSectionLighting(progress) {
    var spread = blocks.length - 1;
    var raw = clamp(progress * spread, 0, spread);
    var fromIndex = Math.floor(raw);
    var toIndex = Math.min(fromIndex + 1, spread);
    var t = easeOutCubic(raw - fromIndex);

    var looks = [
      // Section 1: crisp close-up
      {
        ambI: 1.35,
        keyI: 1.6,
        rimI: 0.9,
        fillI: 0.55,
        keyX: 4.2, keyY: 2.8, keyZ: 5.4,
        rimX: 1.2, rimY: 0.4, rimZ: 2.6,
        fillX: 0.2, fillY: -3.2, fillZ: -2.6,
        keyColor: 0xffffff,
        rimColor: 0xdbeafe,
        fillColor: 0xcbd5e1
      },
      // Section 2: side dramatic
      {
        ambI: 0.72,
        keyI: 1.36,
        rimI: 1.52,
        fillI: 0.3,
        keyX: 1.6, keyY: 2.4, keyZ: 1.0,
        rimX: -3.9, rimY: 0.9, rimZ: 1.4,
        fillX: 2.0, fillY: -3.0, fillZ: -2.7,
        keyColor: 0x67e8f9,
        rimColor: 0xe879f9,
        fillColor: 0x1e293b
      },
      // Section 3: worm's-eye contrast
      {
        ambI: 0.82,
        keyI: 1.05,
        rimI: 1.38,
        fillI: 0.72,
        keyX: 1.6, keyY: 3.6, keyZ: 2.1,
        rimX: -4.1, rimY: 2.4, rimZ: 0.8,
        fillX: 0.3, fillY: -3.5, fillZ: -1.6,
        keyColor: 0xe2e8f0,
        rimColor: 0x60a5fa,
        fillColor: 0xcbd5e1
      }
    ];

    var a = looks[fromIndex];
    var b = looks[toIndex];

    return {
      ambI: lerp(a.ambI, b.ambI, t),
      keyI: lerp(a.keyI, b.keyI, t),
      rimI: lerp(a.rimI, b.rimI, t),
      fillI: lerp(a.fillI, b.fillI, t),
      keyX: lerp(a.keyX, b.keyX, t),
      keyY: lerp(a.keyY, b.keyY, t),
      keyZ: lerp(a.keyZ, b.keyZ, t),
      rimX: lerp(a.rimX, b.rimX, t),
      rimY: lerp(a.rimY, b.rimY, t),
      rimZ: lerp(a.rimZ, b.rimZ, t),
      fillX: lerp(a.fillX, b.fillX, t),
      fillY: lerp(a.fillY, b.fillY, t),
      fillZ: lerp(a.fillZ, b.fillZ, t),
      keyColor: t < 0.5 ? a.keyColor : b.keyColor,
      rimColor: t < 0.5 ? a.rimColor : b.rimColor,
      fillColor: t < 0.5 ? a.fillColor : b.fillColor
    };
  }

  function animate() {
    requestAnimationFrame(animate);

    state.scroll = getScrollProgress();
    state.smoothScroll += (state.scroll - state.smoothScroll) * 0.08;
    state.pointerX += (state.targetPointerX - state.pointerX) * 0.06;
    state.pointerY += (state.targetPointerY - state.pointerY) * 0.06;
    state.userYaw += (state.targetUserYaw - state.userYaw) * 0.18;
    state.userPitch += (state.targetUserPitch - state.userPitch) * 0.18;
    state.zoomFactor += (state.targetZoomFactor - state.zoomFactor) * 0.2;

    updateText(state.smoothScroll);

    var target = state.model || state.fallback;
    var phase = state.smoothScroll * Math.PI * 2;
    var t = performance.now() * 0.001;
    var pose = getSectionPose(state.smoothScroll);
    var lighting = getSectionLighting(state.smoothScroll);

    if (t >= state.glowChangeAt) {
      pickNextGlowTarget(t);
    }

    ambient.intensity += (lighting.ambI - ambient.intensity) * 0.08;
    key.intensity += (lighting.keyI - key.intensity) * 0.08;
    rim.intensity += (lighting.rimI - rim.intensity) * 0.08;
    fill.intensity += (lighting.fillI - fill.intensity) * 0.08;

    key.position.x += (lighting.keyX - key.position.x) * 0.08;
    key.position.y += (lighting.keyY - key.position.y) * 0.08;
    key.position.z += (lighting.keyZ - key.position.z) * 0.08;
    rim.position.x += (lighting.rimX - rim.position.x) * 0.08;
    rim.position.y += (lighting.rimY - rim.position.y) * 0.08;
    rim.position.z += (lighting.rimZ - rim.position.z) * 0.08;
    fill.position.x += (lighting.fillX - fill.position.x) * 0.08;
    fill.position.y += (lighting.fillY - fill.position.y) * 0.08;
    fill.position.z += (lighting.fillZ - fill.position.z) * 0.08;

    targetKeyColor.setHex(lighting.keyColor);
    targetRimColor.setHex(lighting.rimColor);
    targetFillColor.setHex(lighting.fillColor);
    key.color.lerp(targetKeyColor, 0.08);
    rim.color.lerp(targetRimColor, 0.08);
    fill.color.lerp(targetFillColor, 0.08);

    if (target) {
      target.rotation.y += ((pose.rotY + Math.sin(phase * 0.35) * 0.08 + state.pointerX * 0.12 + state.userYaw) - target.rotation.y) * 0.08;
      target.rotation.x += ((pose.rotX + state.pointerY * 0.06 + state.userPitch) - target.rotation.x) * 0.08;
      target.rotation.z += ((pose.rotZ + Math.sin(phase * 0.55) * 0.03) - target.rotation.z) * 0.06;

      target.position.x += ((state.modelBaseX + Math.sin(phase) * 0.03) - target.position.x) * 0.07;
      target.position.y += ((state.modelBaseY + pose.modelY + Math.sin(t * 0.8) * 0.014) - target.position.y) * 0.06;

      var bobX = Math.sin(t * 0.8 + phase * 0.5) * 0.2;
      var bobY = Math.cos(t * 1.1 + phase * 0.3) * 0.16;
      var bobZ = Math.sin(t * 0.7 + phase * 0.2) * 0.14;
      // Blend floating/random glow path with user pointer steering.
      var pointerOffsetX = state.pointerX * 1.35 * state.mouseLightInfluence;
      var pointerOffsetY = state.pointerY * 0.95 * state.mouseLightInfluence;
      var pointerOffsetZ = (0.45 + Math.abs(state.pointerX) * 0.42 + Math.max(0, -state.pointerY) * 0.35) * state.mouseLightInfluence;

      var gx = target.position.x + state.glowTargetX + bobX + pointerOffsetX;
      var gy = target.position.y + state.glowTargetY + bobY + pointerOffsetY;
      var gz = target.position.z + state.glowTargetZ + bobZ + pointerOffsetZ;

      modelGlowLight.position.x += (gx - modelGlowLight.position.x) * 0.08;
      modelGlowLight.position.y += (gy - modelGlowLight.position.y) * 0.08;
      modelGlowLight.position.z += (gz - modelGlowLight.position.z) * 0.08;
      modelGlowLight.intensity = 1.05 + Math.sin(t * 1.9 + phase) * 0.28;

      modelGlowSprite.position.x += ((gx - 0.1) - modelGlowSprite.position.x) * 0.1;
      modelGlowSprite.position.y += ((gy - 0.12) - modelGlowSprite.position.y) * 0.1;
      modelGlowSprite.position.z += ((gz - 1.1) - modelGlowSprite.position.z) * 0.1;
      var glowScale = 6.8 + Math.sin(t * 1.5 + phase) * 0.8;
      modelGlowSprite.scale.set(glowScale, glowScale, 1);
      modelGlowSprite.material.opacity = 0.34 + Math.sin(t * 1.4 + phase) * 0.08;
    }

    camera.position.x += ((pose.camX + Math.sin(phase) * 0.02 + state.pointerX * 0.03) - camera.position.x) * 0.06;
    camera.position.y += ((pose.camY + state.pointerY * 0.03) - camera.position.y) * 0.06;
    camera.position.z += ((state.baseCameraZ * pose.camZMul * state.zoomFactor) - camera.position.z) * 0.1;
    camera.lookAt(pose.lookX, pose.lookY, 0);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', updateSize, { passive: true });

  viewerPanel.addEventListener('pointerdown', function (event) {
    state.isDragging = true;
    state.activePointerId = event.pointerId;
    state.lastPointerX = event.clientX;
    state.lastPointerY = event.clientY;
    if (viewerPanel.setPointerCapture) viewerPanel.setPointerCapture(event.pointerId);
  });

  viewerPanel.addEventListener('pointerup', function (event) {
    if (state.activePointerId !== event.pointerId) return;
    state.isDragging = false;
    state.activePointerId = null;
    if (viewerPanel.releasePointerCapture) viewerPanel.releasePointerCapture(event.pointerId);
  });

  viewerPanel.addEventListener('pointercancel', function () {
    state.isDragging = false;
    state.activePointerId = null;
  });

  viewerPanel.addEventListener('pointermove', function (event) {
    var rect = viewerPanel.getBoundingClientRect();
    var nx = (event.clientX - rect.left) / Math.max(1, rect.width);
    var ny = (event.clientY - rect.top) / Math.max(1, rect.height);
    state.targetPointerX = nx * 2 - 1;
    state.targetPointerY = -(ny * 2 - 1);

    if (state.isDragging && state.activePointerId === event.pointerId) {
      var dx = event.clientX - state.lastPointerX;
      var dy = event.clientY - state.lastPointerY;
      state.lastPointerX = event.clientX;
      state.lastPointerY = event.clientY;
      state.targetUserYaw += dx * 0.0065;
      state.targetUserPitch = clamp(state.targetUserPitch + dy * 0.0055, -0.7, 0.7);
    }
  }, { passive: true });

  viewerPanel.addEventListener('wheel', function (event) {
    var next = state.targetZoomFactor + event.deltaY * 0.0012;
    state.targetZoomFactor = clamp(next, 0.68, 1.95);
  }, { passive: true });

  viewerPanel.addEventListener('touchstart', function (event) {
    if (!event.touches || !event.touches.length) return;
    if (event.touches.length === 1) {
      state.touchPrevX = event.touches[0].clientX;
      state.touchPrevY = event.touches[0].clientY;
      state.touchPrevDistance = 0;
      return;
    }

    if (event.touches.length >= 2) {
      var a = event.touches[0];
      var b = event.touches[1];
      var dx = a.clientX - b.clientX;
      var dy = a.clientY - b.clientY;
      state.touchPrevDistance = Math.sqrt(dx * dx + dy * dy);
    }
  }, { passive: true });

  viewerPanel.addEventListener('touchmove', function (event) {
    if (!event.touches || !event.touches.length) return;

    if (event.touches.length === 1) {
      var touch = event.touches[0];
      var rect = viewerPanel.getBoundingClientRect();
      var nx = (touch.clientX - rect.left) / Math.max(1, rect.width);
      var ny = (touch.clientY - rect.top) / Math.max(1, rect.height);
      state.targetPointerX = nx * 2 - 1;
      state.targetPointerY = -(ny * 2 - 1);

      var dx = touch.clientX - state.touchPrevX;
      var dy = touch.clientY - state.touchPrevY;
      state.touchPrevX = touch.clientX;
      state.touchPrevY = touch.clientY;
      state.targetUserYaw += dx * 0.0055;
      state.targetUserPitch = clamp(state.targetUserPitch + dy * 0.0045, -0.7, 0.7);
      state.touchPrevDistance = 0;
      return;
    }

    var a = event.touches[0];
    var b = event.touches[1];
    var pdx = a.clientX - b.clientX;
    var pdy = a.clientY - b.clientY;
    var dist = Math.sqrt(pdx * pdx + pdy * pdy);
    if (state.touchPrevDistance > 0) {
      var delta = state.touchPrevDistance - dist;
      state.targetZoomFactor = clamp(state.targetZoomFactor + delta * 0.0032, 0.68, 1.95);
    }
    state.touchPrevDistance = dist;
  }, { passive: true });

  window.addEventListener('error', function (event) {
    setStatus('script error: ' + (event.message || 'unknown'));
  });

  updateSize();
  pickNextGlowTarget(0);
  setStatus('initializing');
  loadModel();
  animate();
})();
