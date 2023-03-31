document.addEventListener('DOMContentLoaded',(e) => {
    e.preventDefault();
    githubSearch()
});

function githubSearch(){

    const inputForm = document.querySelector('form')
  
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.querySelector('input#search').value
        const originalName = input.split('').join('')
  
        fetch(`https://api.github.com/users/${originalName}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response=> response.json())
        .then(user => {
            const result = document.getElementById("user-list");
  
            result.innerHTML = `
                <li>
                    <p>${user.name}</p>
                    <img src="${user.avatar_url}" />
                    <a href="https://www.github.com/${originalName}" target="_blank">Profile</a>
                </li>
            `
  
            // Add click event listeners to each user in the list
            const userList = document.querySelectorAll('#user-list li');
            userList.forEach(user => {
                const username = user.querySelector('a').getAttribute('href').replace('https://www.github.com/', '');
                user.addEventListener('click', () => {
                    fetch(`https://api.github.com/users/${username}/repos`,{
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/vnd.github.v3+json"
                        }
                    })
                    .then(response => response.json())
                    .then(repos => {
                        const reposList = document.getElementById("repos-list");
                        reposList.innerHTML = '';
                        repos.forEach(repo => {
                            const repoLi = document.createElement('li');
                            repoLi.innerHTML = `
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            `
                            reposList.appendChild(repoLi);
                        })
                    })
                })
            })
        });
    });
}
