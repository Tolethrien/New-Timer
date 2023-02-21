export type AnimationKey = "invert" | "rotate" | "scale" | "inset" | "none";
export type ButtonsAnimations = { [key in AnimationKey]: string };
export const ButtonAnimsList: ButtonsAnimations = {
  invert: "filter: invert();",
  rotate: "transform:rotate(180deg);",
  scale: "width: 1.3rem; height:1.3rem;",
  inset: "box-shadow: inset 2px 2px 2px hsla(0,0%,0%,0.5);",
  none: "",
};
