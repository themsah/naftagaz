document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll('[data-plugin="illustration3d"]');
  containers.forEach(container => {
    const canvas = container.querySelector("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const radius = parseFloat(container.dataset.illustration3dCameraRadius) || 20;
    const cameraY = parseFloat(container.dataset.illustration3dCameraY) || 0;
    camera.position.set(radius, cameraY, radius);
    camera.lookAt(0, 0, 0);

    const loader = new THREE.FBXLoader();
    loader.load(container.dataset.illustration3dSrc, (object) => {
      object.scale.set(0.01, 0.01, 0.01);
      scene.add(object);

      const animate = () => {
        requestAnimationFrame(animate);
        object.rotation.y += 0.003;
        renderer.render(scene, camera);
      };
      animate();
    }, undefined, (error) => {
      console.error("خطا در بارگذاری FBX:", error);
    });

    window.addEventListener("resize", () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  });
});
