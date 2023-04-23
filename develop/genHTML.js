function generateHTML(teamMembers) {
    const cards = teamMembers.map((member) => {
      const specialInfo = (() => {
        if (member.getRole() === "Manager")
          return `Office Number: ${member.getOfficeNumber()}`;
        if (member.getRole() === "Engineer")
          return `GitHub: <a href="https://github.com/${member.getGithub()}" target="_blank">${member.getGithub()}</a>`;
        if (member.getRole() === "Intern")
          return `School: ${member.getSchool()}`;
      })();
  
      return `
        <div class="card">
          <div class="card-header">
            <h2>${member.name}</h2>
            <h3>${member.getRole()}</h3>
          </div>
          <div class="card-body">
            <p>ID: ${member.id}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>${specialInfo}</p>
          </div>
        </div>
      `;
    });
  
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dev Team Members</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="./public/assets/style.css">
        </head>
        <body>
          <header>
            <h1>Developer Team Members</h1>
          </header>
          <main>
            ${cards.join("")}
          </main>
        </body>
      </html>
    `;
  }
  
  module.exports = generateHTML;
  