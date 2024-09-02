document.addEventListener("DOMContentLoaded", function() {
  // Obtenez la référence du formulaire et des éléments associés
  const form = document.getElementById('registrationForm');
  const modal = document.getElementById("popupModal");
  const closeModal = document.getElementsByClassName("close")[0];
  const agreeRulesCheckbox = document.getElementById("agreeRules");
  const submitFormBtn = document.getElementById("submitFormBtn");

  // Afficher le popup lors du clic sur le bouton d'envoi
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher l'envoi immédiat du formulaire
    modal.style.display = "block"; // Afficher le modal
  });

  // Fermer le modal lorsque l'utilisateur clique sur le bouton de fermeture
  closeModal.onclick = function() {
    modal.style.display = "none";
  };

  // Fermer le modal de succès
  closeSuccessModal.onclick = function() {
    successModal.style.display = "none";
  };

  // Activer le bouton de soumission si les règles sont acceptées
  agreeRulesCheckbox.addEventListener('change', function() {
    submitFormBtn.disabled = !agreeRulesCheckbox.checked;
  });

  // Soumettre le formulaire lorsque l'utilisateur accepte les règles
  submitFormBtn.addEventListener('click', function() {
    // Assurez-vous que la case à cocher est bien cochée avant de soumettre
    if (agreeRulesCheckbox.checked) {
      modal.style.display = "none"; // Fermer le modal

      var templateParams = {
        name: 'Candidature',
        notes: 'Check this out!',
      };
      emailjs.send('service_h53g0j5', 'template_38suldr', templateParams).then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },);
    }
  });

  // Gérer les champs conditionnels en fonction du type de cours choisi
  const courseType = document.getElementById('courseType');
  const masterclassCoursesGroup = document.getElementById('masterclassCoursesGroup');
  const formationCoursesGroup = document.getElementById('formationCoursesGroup');

  courseType.addEventListener('change', function() {
    if (courseType.value === 'masterclass') {
      masterclassCoursesGroup.style.display = 'block';
      formationCoursesGroup.style.display = 'none';
    } else if (courseType.value === 'formation') {
      masterclassCoursesGroup.style.display = 'none';
      formationCoursesGroup.style.display = 'block';
    } else {
      masterclassCoursesGroup.style.display = 'none';
      formationCoursesGroup.style.display = 'none';
    }
  });
});

  