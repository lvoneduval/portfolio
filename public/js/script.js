function formatRGBAtoS(red, green, blue, alpha)
{
    return `rgb(${red}, ${green}, ${blue} , ${alpha})`
}

function updateLanguage(langValue) {
    console.log(langValue);
    const contentElements = document.querySelectorAll('[data-key]');
    fetch(`lang/${langValue}.json`)
      .then(response => response.json())
      .then(data => {
        contentElements.forEach(element => {
          const key = element.getAttribute('data-key');
          element.textContent = data[key];
        });
      })
      .catch(error => console.error('Error loading language:', error));
    localStorage.setItem("langValue", langValue);
}

function updateColor() {

    function inputValueToRGB(input)
    {
        const colorValue = rangeInput.value;
		const value = colorValue * 5;
        const red = 0 +
        ((value < 125) ? 125 : 
        (value < 250) ? 250 - value : 
        (value < 500) ? 0 : 
        (value < 625) ? value - 500 : 
        125);   
    
        const green = 0 +
        ((value < 125) ? value :
        (value < 375) ? 125 :
        (value < 500) ? 500 - value : 0);
      
        const blue = 0 + 
        ((value < 250) ? 0 :
        (value < 375) ? value - 250 :
        (value < 625) ? 125 : 750 - value);

        return ({red, green, blue});
    }

    function addValueToColor(base, red, green, blue)
    {
        red = red + base;
        green = green + base;
        blue = blue + base;
        return (formatRGBAtoS(red, green, blue, 1)); 
    }

    const rangeInput = document.getElementById('range-color');
    const colorValue = rangeInput.value;
    localStorage.setItem("colorValue", rangeInput.value);
    let {red, green, blue} = inputValueToRGB(colorValue);
    const rgbaColorPrimary = addValueToColor(75, red, green, blue);
    const rgbaColorSecondary = addValueToColor(120, red, green, blue);

    const radialColor1 = addValueToColor(25 ,red ,green, blue);
    const radialColor2 = addValueToColor(105 ,red ,green, blue);
    const radialColor3 = addValueToColor(90 ,red ,green, blue);
    const radialColor4 = addValueToColor(0 ,red ,green, blue);
    const radialGradien = `radial-gradient(circle 759px at -6.7% 50%, ${radialColor1}, ${radialColor2}, ${radialColor3}, ${radialColor4})`;
    
    const linearColor1 = addValueToColor(77 ,red ,green, blue);
    const linearGradienFadeout = `linear-gradient(to right, ${linearColor1}, var(--color-primary-bg))`;
    document.documentElement.style.setProperty('--color-highlight-bg', rgbaColorPrimary);
    document.documentElement.style.setProperty('--color-highlight-text', rgbaColorPrimary);
    document.documentElement.style.setProperty('--color-highlight-svg', rgbaColorPrimary);
    document.documentElement.style.setProperty('--color-highlight-secondary-bg', rgbaColorSecondary );
    document.documentElement.style.setProperty('--radial-gradient-highlight', radialGradien);
    document.documentElement.style.setProperty('--linear-gradient-fadeout', linearGradienFadeout);
}

function updateMode(){
    const modeInput = document.getElementById('header-right-dark-mode-checkbox');
    const modeValue = modeInput.checked;
    localStorage.setItem("modeValue", modeInput.checked);

    let colorBody = ''; 
    let colorPrimaryBg = '';
    let colorSecondaryBg = '';
    let colorPrimaryText = '';
    let colorSecondaryText = '';
    let colorTertiaryText = '';
    let colorPrimarySvg = '';
    let colorSecondarySvg = '';
    let colorTertiarySvg = '';
    if(modeValue){
        colorBody = formatRGBAtoS(242,245,249, 1); 
        colorPrimaryBg = formatRGBAtoS(255, 255, 255, 1);
        colorSecondaryBg = formatRGBAtoS(225, 232, 239, 1);
        colorPrimaryText = formatRGBAtoS(0, 0, 0, 1);
        colorSecondaryText = formatRGBAtoS(51, 51, 51, 1);
        colorTertiaryText = formatRGBAtoS(225, 232, 239, 1);
        colorPrimarySvg = formatRGBAtoS(0, 0, 0, 1);
        colorSecondarySvg = formatRGBAtoS(51, 51, 51, 1);
        colorTertiarySvg = formatRGBAtoS(225, 232, 239, 1);
    }
    else{
        colorBody = formatRGBAtoS(18,18, 18, 1); 
        colorPrimaryBg = formatRGBAtoS(29, 29, 29, 1);
        colorSecondaryBg = formatRGBAtoS(51, 51, 51, 1);
        colorPrimaryText = formatRGBAtoS(255, 255, 255, 1);
        colorSecondaryText = formatRGBAtoS(225, 232, 239, 1);
        colorTertiaryText = formatRGBAtoS(51,51,51, 1);
        colorPrimarySvg = formatRGBAtoS(255, 255, 255, 1);
        colorSecondarySvg = formatRGBAtoS(225, 232, 239, 1);
        colorTertiarySvg = formatRGBAtoS(51,51,51, 1);
    }

    document.documentElement.style.setProperty('--color-body', colorBody);
    document.documentElement.style.setProperty('--color-primary-bg', colorPrimaryBg);
    document.documentElement.style.setProperty('--color-secondary-bg', colorSecondaryBg);

    document.documentElement.style.setProperty('--color-primary-text', colorPrimaryText);
    document.documentElement.style.setProperty('--color-secondary-text', colorSecondaryText);
    document.documentElement.style.setProperty('--color-tertiary-text',  colorTertiaryText);
    
    document.documentElement.style.setProperty('--color-primary-svg', colorPrimarySvg);
    document.documentElement.style.setProperty('--color-secondary-svg', colorSecondarySvg);
    document.documentElement.style.setProperty('--color-tertiary-svg', colorTertiarySvg);
}

function setCurrentPageColor(pageName)
{
    let elementSvgId = "main-menu-list-element-" + pageName + '-svg';
    currentPageButtonSvg = document.getElementById(elementSvgId);
    
    let elementPId = "main-menu-list-element-" + pageName + '-p';
    currentPageButtonP = document.getElementById(elementPId);
    currentPageButtonSvg.classList.remove("svg-color-secondary");
    currentPageButtonSvg.classList.add('svg-color-highlight');
    currentPageButtonP.classList.remove("text-color-secondary");
    currentPageButtonP.classList.add('text-color-highlight');
}

document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.getElementById('range-color');
    const modeInput = document.getElementById('header-right-dark-mode-checkbox');
    const buttons = document.querySelectorAll('#language-selector button');
    

    let colorValue = localStorage.getItem('colorValue');
    let modeValue = localStorage.getItem('modeValue');
    let langValue = localStorage.getItem('langValue');

    rangeInput.value = colorValue;
    modeInput.checked = modeValue;

    if (modeValue !== null) {
        modeInput.checked = (modeValue === 'true'); 
    }
    if (langValue === null)
    {
        localStorage.setItem("langValue", "fr");
    }

    rangeInput.addEventListener('input', updateColor);
    modeInput.addEventListener('change', updateMode);
    buttons.forEach(button => {
        button.addEventListener('click', function() {
          const selectedLanguage = this.getAttribute('data-lang');
            updateLanguage(selectedLanguage);
        });}
    )

    setCurrentPageColor(window.location.pathname.slice(1).split('/')[0]);
    updateLanguage(langValue);
    updateColor();
    updateMode();
});