const languages = {
    "en-GB": "English",
    "es-ES": "Spanish",
    "fr-FR": "French",
    "de-DE": "German",
    "hi-IN": "Hindi",
    "te-IN": "Telugu",
    "ta-LK": "Tamil",
    "zh-CN": "Chinese",
    "ar-SA": "Arabic",
    "ru-RU": "Russian",
  };
  
  const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchangeIcon = document.querySelector(".exchange"),
    selectTag = document.querySelectorAll("select"),
    translateBtn = document.querySelector(".translate-btn"),
    icons = document.querySelectorAll(".icons ion-icon");
  
  selectTag.forEach((tag, id) => {
    for (let lang_code in languages) {
      let selected = id == 0 ? (lang_code == "en-GB" ? "selected" : "") : (lang_code == "es-ES" ? "selected" : "");
      let option = `<option value="${lang_code}" ${selected}>${languages[lang_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });
  
  fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
      toText.value = "";
    }
  });
  
  translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
  
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
  
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
      })
      .catch(() => {
        toText.value = "Error fetching translation.";
      });
  });
  
  exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
  });
  