function updateDebugPanel() {
  const viewport = window.innerWidth;
  document.getElementById("viewport-size").textContent = viewport + "px";

  let breakpoint = "Desktop";
  if (viewport <= 480) breakpoint = "Mobile Small";
  else if (viewport <= 768) breakpoint = "Mobile/Tablet";
  else if (viewport <= 1024) breakpoint = "Tablet/Laptop";

  document.getElementById("current-breakpoint").textContent = breakpoint;

  const isTouchDevice = "ontouchstart" in window;
  document.getElementById("device-type").textContent = isTouchDevice
    ? "Touch Device"
    : "Desktop";

  const orientation =
    window.innerHeight > window.innerWidth ? "Portrait" : "Landscape";
  document.getElementById("orientation").textContent = orientation;
}

window.addEventListener("resize", updateDebugPanel);
window.addEventListener("orientationchange", updateDebugPanel);

updateDebugPanel();

window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log(`🚀 ResponsiveShowcase cargado en ${loadTime.toFixed(2)}ms`);
});

document.querySelectorAll(".example-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    console.log(`🔗 Link clicked: ${link.textContent} -> ${link.href}`);
  });
});
