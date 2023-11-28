// Use fetch to load the sidebar content dynamically
fetch('sidebar.html')
.then(response => response.text())
.then(data => {
  document.getElementById('sidebarContainer').innerHTML = data;
})
.catch(error => {
  console.error('Error loading sidebar content:', error);
});