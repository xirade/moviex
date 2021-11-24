const loader = () => {
  const div = document.createElement("div");
  div.className = "loader-overlay";
  div.innerHTML = `
    <div class="loader-container">
        <span class="loader-item"></span>
    </div>
  `
  return div;
};

export default loader;
