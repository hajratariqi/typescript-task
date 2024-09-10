document.addEventListener("DOMContentLoaded", () => {
  const resumeData: {
    name?: string;
    email?: string;
    phone?: string;
    education?: string;
    experience?: string;
    skills?: string[];
    address?: string;
  } = JSON.parse(localStorage.getItem("resumeData") || "{}");

  const { name, email, phone, education, experience, skills, address } = resumeData;

  // Add proper types for function parameters
  function makeEditable(field: HTMLElement, dataKey: string, isSkill: boolean = false): void {
    const currentValue = field.textContent?.trim() || "";
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentValue;
    input.style.width = "100%";
    input.style.marginTop = "20px";
    input.style.display = "inline-block";

    input.addEventListener("blur", () => saveChanges(field, input, dataKey, isSkill));
    input.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        saveChanges(field, input, dataKey, isSkill);
      }
    });

    // Only replace the text, not the icon or structure
    field.textContent = "";
    field.appendChild(input);
    input.focus();
  }

  // Add proper types for function parameters
  function saveChanges(span: HTMLElement, input: HTMLInputElement, dataKey: string, isSkill: boolean = false): void {
    const newValue = input.value.trim();
    span.textContent = newValue;

    if (isSkill) {
      const index = dataKey.split('-')[1]; 
      if (resumeData.skills) {
        resumeData.skills[parseInt(index)] = newValue;
      }
    } else {
      resumeData[dataKey] = newValue;
    }
    // Save updated data to localStorage
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }

  const resumeContent = `
    <div id='resume-container' class='container'>
      <h1>RESUME</h1>
      <div class='top-section'>
        <div class='resume-content'>
          <div class='editable-row'>
            <h1 id="name-field" style='margin:0; font-weight: 500; font-size: 45px; text-transform: capitalize;'>${name}</h1>
            <span class="edit-btn" data-key="name"><i class="fa-solid fa-pen-to-square"></i></span>
          </div>
          
          <p style='margin:0'><strong><i class="fa-solid fa-location-dot"></i> Address:</strong> <span id="address-field">${address}</span>
            <span class="edit-btn" data-key="address"><i class="fa-solid fa-pen-to-square"></i></span>
          </p>
          <p style='margin:0'><strong><i class="fa-solid fa-phone"></i> Phone:</strong> <span id="phone-field">${phone}</span>
            <span class="edit-btn" data-key="phone"><i class="fa-solid fa-pen-to-square"></i></span>
          </p>
          <p style='margin:0'><strong><i class="fa-solid fa-envelope"></i> Email:</strong> <span id="email-field">${email}</span>
            <span class="edit-btn" data-key="email"><i class="fa-solid fa-pen-to-square"></i></span>
          </p>
        </div>
        <div>
          <img width='150px' src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png"/>
        </div>
      </div>

      <div class='edu-exp'>
        <div class='edu-section'>
          <div class='editable-row'>
            <h2>Education</h2>
            <span class="edit-btn" data-key="education"><i class="fa-solid fa-pen-to-square"></i></span>
          </div>
          <p id="education-field">${education}</p>
        </div>
        <div class='exp-section'>
          <div class='editable-row'>
            <h2>Work Experience</h2>
            <span class="edit-btn" data-key="experience"><i class="fa-solid fa-pen-to-square"></i></span>
          </div>
          <p id="experience-field">${experience}</p>
        </div>
      </div>
      <h2>Skills</h2>
      <ul class='skills'>
    ${
      skills
        ? skills.map((skill: string, index: number) => 
          `<li class='skills-item'>
              <span id="skill-${index}-text">${skill}</span>
              <span class="edit-btn" data-key="skills" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i></span>
           </li>`
          ).join("")
        : ""
    }
  </ul>

      <button class='download-btn' id='download-btn'>Download Resume</button>
    </div>
  `;

  const resumeContentDiv = document.getElementById("resumeContent");
  if (resumeContentDiv) {
    resumeContentDiv.innerHTML = resumeContent;
  } else {
    console.error('Element with id "resumeContent" not found');
  }

  // Add click event to make fields editable
  document.querySelectorAll(".edit-btn").forEach((btn: Element) => {
    btn.addEventListener("click", (event: Event) => {
      const target = event.currentTarget as HTMLElement | null;
      if (!target) return;

      const dataKey = target.getAttribute("data-key");
      const index = target.getAttribute("data-index");

      if (dataKey === "skills" && index !== null) {
        const skillField = document.getElementById(`skill-${index}-text`);
        if (skillField) {
          makeEditable(skillField, `skills-${index}`, true);
        }
      } else if (dataKey) {
        const field = document.getElementById(`${dataKey}-field`);
        if (field) {
          makeEditable(field, dataKey);
        }
      }
    });
  });

  // Download resume as PDF
  const downloadBtn = document.getElementById("download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const resumeContainer = document.getElementById("resume-container");
      if (resumeContainer) {
        // Add @types/html2pdf or declare html2pdf to avoid this error
        (window as any).html2pdf().from(resumeContainer).save('resume.pdf');
      } else {
        console.error('Resume container not found');
      }
    });
  }
});
