document.getElementById('addSkill')?.addEventListener('click', () => {
    const skillsContainer = document.getElementById('skillsContainer')!;
    const skillInputCount = skillsContainer.getElementsByClassName('skill-input').length + 1;
    const newSkillInput = document.createElement('div');
    newSkillInput.className = 'skill-input';
    newSkillInput.innerHTML = `<input type="text" name="skills[]" placeholder="Skill ${skillInputCount}">`;
    skillsContainer.appendChild(newSkillInput);
});

document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(this as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const education = formData.get('education') as string;
    const experience = formData.get('experience') as string;
    const skills = formData.getAll('skills[]') as string[];

    // Store data in localStorage
    localStorage.setItem('resumeData', JSON.stringify({
        name,
        email,
        phone,
        education,
        experience,
        skills
    }));

    // Redirect to resume.html
    window.open('resume.html', '_blank');
});
