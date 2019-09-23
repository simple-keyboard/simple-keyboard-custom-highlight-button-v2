let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shiftleft} z x c v b n m , . / {shiftright}",
      ".com @ {space}"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shiftleft} Z X C V B N M < > ? {shiftright}",
      ".com @ {space}"
    ]
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
}

/**
 * Handle keyboard press
 */
document.addEventListener("keydown", event => {
  highlightButton(event);
});

document.addEventListener("keyup", event => {
  unhighlightButton(event);
});

function highlightButton(event) {
  let layoutKeyName = keyboard.physicalKeyboard.getSimpleKeyboardLayoutKey(
    event
  );

  /**
   * CUSTOM: Making key lowercase
   */
  layoutKeyName = layoutKeyName.toLowerCase();

  let buttonElement =
    keyboard.getButtonElement(layoutKeyName) ||
    keyboard.getButtonElement(`{${layoutKeyName}}`);

  if (!buttonElement) {
    console.log("Could not find button in layout", layoutKeyName);
    return false;
  }

  buttonElement.style.background = "#9ab4d0";
  buttonElement.style.color = "white";
}

function unhighlightButton(event) {
  let layoutKeyName = keyboard.physicalKeyboard.getSimpleKeyboardLayoutKey(
    event
  );

  /**
   * CUSTOM: Making key lowercase
   */
  layoutKeyName = layoutKeyName.toLowerCase();

  let buttonElement =
    keyboard.getButtonElement(layoutKeyName) ||
    keyboard.getButtonElement(`{${layoutKeyName}}`);

  if (!buttonElement) {
    console.log("Could not find button in layout", layoutKeyName);
    return false;
  }

  buttonElement.removeAttribute("style");
}
