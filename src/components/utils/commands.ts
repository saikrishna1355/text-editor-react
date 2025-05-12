export const execCommand = (command: string) => {
  document.execCommand(command, false);
};

export const insertHeading = (ref: React.RefObject<HTMLDivElement>) => {
  document.execCommand("formatBlock", false, "h1");
};
