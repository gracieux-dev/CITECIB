document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form and modals
  const registrationForm = document.getElementById('registrationForm');
  const popupModal = document.getElementById('popupModal');
  const successModal = document.getElementById('successModal');
  const submitFormBtn = document.getElementById('submitFormBtn');
  const agreeRulesCheckbox = document.getElementById('agreeRules');

  // Maximum file size limit in bytes (2.5 MB)
  const maxSize = 2.5 * 1024 * 1024;

  // Handle form submit
  registrationForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      // Show the rules modal
      popupModal.style.display = "block";
  });

  // Handle rules modal close
  document.querySelector(".close").onclick = function () {
      popupModal.style.display = "none";
  };

  // Enable or disable the submit button in the modal based on checkbox
  agreeRulesCheckbox.addEventListener('change', function () {
      submitFormBtn.disabled = !this.checked;
  });

  // Handle form submission after accepting the rules
  submitFormBtn.addEventListener('click', function () {
      if (agreeRulesCheckbox.checked) {
          // Get the CV and references files from the form
          const cvFile = document.getElementById('cv').files[0];
          const referencesFile = document.getElementById('references').files[0];

          // Check the size of the CV file
          if (cvFile && cvFile.size > maxSize) {
              alert('Le fichier CV est trop grand. Veuillez télécharger un fichier de moins de 2,5 MB.');
              return;
          }

          // Check the size of the References file
          if (referencesFile && referencesFile.size > maxSize) {
              alert('Le fichier des références est trop grand. Veuillez télécharger un fichier de moins de 2,5 MB.');
              return;
          }

          // Prepare form data
          const formData = {
              name: document.getElementById('name').value,
              surname: document.getElementById('surname').value,
              email: document.getElementById('email').value,
              phone: document.getElementById('phone').value,
              age: document.getElementById('age').value,
              gender: document.getElementById('gender').value,
              city: document.getElementById('city').value,
              country: document.getElementById('country').value,
              availability: document.getElementById('availability').value,
              experience: document.getElementById('experience').value,
              experienceDetails: document.getElementById('experienceDetails').value,
              studies: document.getElementById('studies').value,
              studyDetails: document.getElementById('studyDetails').value,
              filmProject: document.getElementById('filmProject').value,
              filmDetails: document.getElementById('filmDetails').value,
              interest: document.getElementById('interest').value,
              courseType: document.getElementById('courseType').value,
              masterclassCourses: document.getElementById('masterclassCourses').value,
              formationCourses: document.getElementById('formationCourses').value,
              specialNeeds: document.getElementById('specialNeeds').value,
              specialNeedsDetails: document.getElementById('specialNeedsDetails').value
          };

          const reader = new FileReader();

          // Handle the CV file
          if (cvFile) {
              reader.readAsDataURL(cvFile);
              reader.onload = function () {
                  formData.cvBase64 = reader.result;
                  sendFormData(formData);
              };
          }

          // Handle the References file
          if (referencesFile) {
              reader.readAsDataURL(referencesFile);
              reader.onload = function () {
                  formData.referencesBase64 = reader.result;
                  sendFormData(formData);
              };
          }

          // If no files are attached, send form data directly
          if (!cvFile && !referencesFile) {
              sendFormData(formData);
          }
      }
  });

  // Function to send form data via EmailJS
  function sendFormData(formData) {
      emailjs.send('service_h53g0j5', 'template_6vr3nud', formData)
          .then(function () {
              popupModal.style.display = "none"; // Hide the rules modal
              successModal.style.display = "block"; // Show the success modal
              registrationForm.reset(); // Reset the form after successful submission
          }, function (error) {
              alert('Une erreur est survenue lors de l\'envoi du formulaire: ' + JSON.stringify(error));
          });
  }

  // Handle success modal close
  document.querySelector(".close-success").onclick = function () {
      successModal.style.display = "none";
  };

  // Show/hide fields based on selections
  document.getElementById('experience').addEventListener('change', function () {
      toggleFieldVisibility('experience', 'experienceDetailsGroup');
  });

  document.getElementById('studies').addEventListener('change', function () {
      toggleFieldVisibility('studies', 'studyDetailsGroup');
  });

  document.getElementById('filmProject').addEventListener('change', function () {
      toggleFieldVisibility('filmProject', 'filmDetailsGroup');
  });

  document.getElementById('specialNeeds').addEventListener('change', function () {
      toggleFieldVisibility('specialNeeds', 'specialNeedsDetailsGroup');
  });

  document.getElementById('courseType').addEventListener('change', function () {
      toggleCourseTypeFields();
  });

  // Utility function to show/hide fields based on selected value
  function toggleFieldVisibility(selectId, groupId) {
      const selectValue = document.getElementById(selectId).value;
      const fieldGroup = document.getElementById(groupId);
      if (selectValue === 'Yes') {
          fieldGroup.style.display = 'block';
      } else {
          fieldGroup.style.display = 'none';
      }
  }

  // Show/hide course type fields
  function toggleCourseTypeFields() {
      const courseType = document.getElementById('courseType').value;
      const masterclassGroup = document.getElementById('masterclassCoursesGroup');
      const formationGroup = document.getElementById('formationCoursesGroup');

      if (courseType === 'masterclass') {
          masterclassGroup.style.display = 'block';
          formationGroup.style.display = 'none';
      } else if (courseType === 'formation') {
          masterclassGroup.style.display = 'none';
          formationGroup.style.display = 'block';
      } else {
          masterclassGroup.style.display = 'none';
          formationGroup.style.display = 'none';
      }
  }
});
