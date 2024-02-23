// script.js
let isSearchByUsername = false;

function toggleSearchType() {
    isSearchByUsername = !isSearchByUsername;
    const searchInput = document.getElementById('search-input');
    searchInput.placeholder = isSearchByUsername ? 'Enter Username' : 'Enter Location';
}

async function searchProfiles() {
    const searchInput = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; 

    try {
        if (isSearchByUsername) {
            const userResponse = await fetch(`https://api.github.com/users/${searchInput}`);
            const user = await userResponse.json();

            const profileCard = document.createElement('div');
            profileCard.classList.add('profile-card');
            profileCard.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}">
                <div class="profile-details">
                    <div class="profile-username">${user.login}</div>
                    ${user.bio ? `<div class="profile-bio">${user.bio}</div>` : ''}
                    ${user.email ? `<div class="profile-email">${user.email}</div>` : ''}
                    ${user.company ? `<div class="profile-company">${user.company}</div>` : ''}
                    ${user.blog ? `<div class="profile-blog"><a href="${user.blog}" target="_blank">${user.blog}</a></div>` : ''}
                    ${user.education ? `<div class="profile-education">${user.education}</div>` : ''}
                    <a class="profile-link" href="${user.html_url}" target="_blank">View Profile</a>
                </div>
            `;
            resultsContainer.appendChild(profileCard);

        } else {
            const response = await fetch(`https://api.github.com/search/users?q=location:${searchInput}`);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                data.items.forEach(user => {
                    const profileCard = document.createElement('div');
                    profileCard.classList.add('profile-card');
                    profileCard.innerHTML = `
                        <img src="${user.avatar_url}" alt="${user.login}">
                        <div class="profile-details">
                            <div class="profile-username">${user.login}</div>
                            ${user.bio ? `<div class="profile-bio">${user.bio}</div>` : ''}
                            ${user.email ? `<div class="profile-email">${user.email}</div>` : ''}
                            ${user.company ? `<div class="profile-company">${user.company}</div>` : ''}
                            ${user.blog ? `<div class="profile-blog"><a href="${user.blog}" target="_blank">${user.blog}</a></div>` : ''}
                            ${user.education ? `<div class="profile-education">${user.education}</div>` : ''}
                            ${user.location ? `<div class="profile-location">${user.location}</div>` : ''}
                            <a class="profile-link" href="${user.html_url}" target="_blank">View Profile</a>
                        </div>
                    `;
                    resultsContainer.appendChild(profileCard);
                });
            } else {
                resultsContainer.innerHTML = 'No results found.';
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = 'An error occurred while fetching data.';
    }
}
