
// Initialize the sidebar toggle button
var sidebarToggleEl = document.getElementById('#sidebarToggle');
sidebarToggleEl.addEventListener('click', function (event) {
  event.preventDefault();
  document.body.classList.toggle('sidebar-open');
});
