"use strict";
document.getElementById('addSkill')?.addEventListener('click', () => {
    const skillsContainer = document.getElementById('skillsContainer');
    const skillInputCount = skillsContainer.getElementsByClassName('skill-input').length + 1;
    const newSkillInput = document.createElement('div');
    newSkillInput.className = 'skill-input';
    newSkillInput.innerHTML = `<input type="text" name="skills[]" placeholder="Skill ${skillInputCount}">`;
    skillsContainer.appendChild(newSkillInput);
});
document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const education = formData.get('education');
    const experience = formData.get('experience');
    const skills = formData.getAll('skills[]');
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
