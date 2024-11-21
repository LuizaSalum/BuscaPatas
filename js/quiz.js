document.addEventListener("DOMContentLoaded", function () {
    const speciesSelection = document.getElementById("speciesSelection");
    const quizSection = document.getElementById("quizSection");
    const quizQuestionsContainer = document.getElementById("quizQuestions");
    const backToSelection = document.getElementById("backToSelection");

    // Questions for dogs and cats
    const questions = {
        dog: [
            {
                question: "What size are you looking for?",
                options: [
                    { value: "mini", label: "Mini (up to 5 kg)" },
                    { value: "small", label: "Small (5-10 kg)" },
                    { value: "medium", label: "Medium (10-20 kg)" },
                    { value: "large", label: "Large (20-35 kg)" },
                    { value: "giant", label: "Giant (over 35 kg)" },
                ],
                allowNoPreference: true,
                group: "size",
            },
            {
                question: "What energy level are you comfortable with?",
                options: [
                    { value: "low", label: "Low (relaxed, minimal exercise)" },
                    { value: "medium", label: "Medium (balanced activity and rest)" },
                    { value: "high", label: "High (very active, needs lots of exercise)" },
                ],
                allowNoPreference: true,
                group: "energy",
            },
        ],
        cat: [
            {
                question: "What size are you looking for?",
                options: [
                    { value: "small", label: "Small (under 3 kg)" },
                    { value: "medium", label: "Medium (3-5 kg)" },
                    { value: "large", label: "Large (5-7 kg)" },
                    { value: "extraLarge", label: "Extra-large (over 7 kg)" },
                ],
                allowNoPreference: true,
                group: "size",
            },
            {
                question: "Are you okay with grooming your cat?",
                options: [
                    { value: "no", label: "No, prefer low-maintenance" },
                    { value: "yes", label: "Yes, willing to groom regularly" },
                ],
                allowNoPreference: false,
                group: "grooming",
            },
        ],
    };

    // Function to dynamically load questions
    function loadQuestions(species) {
        quizQuestionsContainer.innerHTML = ""; // Clear existing questions

        questions[species].forEach((questionData, index) => {
            const { question, options, allowNoPreference, group } = questionData;

            // Create question container
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question", "mb-4");

            // Add question text
            const questionTitle = document.createElement("h5");
            questionTitle.textContent = `${index + 1}. ${question}`;
            questionDiv.appendChild(questionTitle);

            // Add options container
            const optionsContainer = document.createElement("div");
            optionsContainer.classList.add(`${group}-options`);

            // Add options
            options.forEach((option) => {
                const label = document.createElement("label");
                label.classList.add(`${group}-option`, "d-block");

                const input = document.createElement("input");
                input.type = "checkbox"; // Default to checkbox
                input.name = group;
                input.value = option.value;

                label.appendChild(input);
                label.appendChild(document.createTextNode(option.label));
                optionsContainer.appendChild(label);
            });

            // Add "No Preference" radio button if applicable
            if (allowNoPreference) {
                const noPreferenceLabel = document.createElement("label");
                noPreferenceLabel.classList.add("form-check-label", "mt-2");

                const noPreferenceInput = document.createElement("input");
                noPreferenceInput.type = "radio"; // Use radio button for "No Preference"
                noPreferenceInput.name = `${group}Preference`;
                noPreferenceInput.id = `noPreference${group}`;
                noPreferenceInput.value = "no-preference";

                noPreferenceLabel.appendChild(noPreferenceInput);
                noPreferenceLabel.appendChild(document.createTextNode("No preference"));

                optionsContainer.appendChild(noPreferenceLabel);

                // Apply "No Preference" logic dynamically
                setTimeout(() => applyNoPreferenceLogic(`.${group}-option input`, `#noPreference${group}`), 0);
            }

            questionDiv.appendChild(optionsContainer);
            quizQuestionsContainer.appendChild(questionDiv);
        });

        // Show quiz section and back arrow, hide species selection
        speciesSelection.classList.add("d-none");
        quizSection.classList.remove("d-none");
        backToSelection.classList.remove("d-none");
    }

    /**
     * Handles the "No Preference" logic for a group of checkboxes.
     * @param {string} groupSelector - Selector for the checkbox group.
     * @param {string} noPreferenceSelector - Selector for the "No Preference" button.
     */
    function applyNoPreferenceLogic(groupSelector, noPreferenceSelector) {
        const groupOptions = document.querySelectorAll(groupSelector);
        const noPreferenceOption = document.querySelector(noPreferenceSelector);

        let noPreferenceSelected = false;

        noPreferenceOption.addEventListener("click", function () {
            if (noPreferenceSelected) {
                // Uncheck "No Preference" and clear all checkboxes
                noPreferenceOption.checked = false;
                noPreferenceSelected = false;
                groupOptions.forEach((option) => (option.checked = false));
            } else {
                // Select "No Preference" and check all checkboxes
                groupOptions.forEach((option) => (option.checked = true));
                noPreferenceSelected = true;
            }
        });

        groupOptions.forEach((option) => {
            option.addEventListener("change", function () {
                if (!this.checked) {
                    noPreferenceOption.checked = false;
                    noPreferenceSelected = false;
                }

                // If all checkboxes are manually checked, select "No Preference"
                const allChecked = Array.from(groupOptions).every((opt) => opt.checked);
                if (allChecked) {
                    noPreferenceOption.checked = true;
                    noPreferenceSelected = true;
                }
            });
        });
    }

    // Handle back arrow click
    backToSelection.addEventListener("click", function () {
        // Hide quiz section and back arrow, show species selection
        quizSection.classList.add("d-none");
        backToSelection.classList.add("d-none");
        speciesSelection.classList.remove("d-none");
    });

    // Event listeners for species selection
    document.getElementById("selectDog").addEventListener("click", function () {
        loadQuestions("dog");
    });

    document.getElementById("selectCat").addEventListener("click", function () {
        loadQuestions("cat");
    });
});
