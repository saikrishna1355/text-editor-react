export const execCommand = (command: string) => {
  document.execCommand(command, false);
};

export const insertHeading = () => {
  document.execCommand("formatBlock", false, "h1");
};
