import clsx from "clsx";
import React, { FunctionComponent } from "react";
import styles from "./GetStartedTerminal.module.css";


const terminalData = [
  {
    text: "# Create local kind cluster",
    dimmed: true,
  },
  {
    text: "capact env create kind",
  },
  {
    text: "# Install Capact",
    dimmed: true,
  },
  {
    text: "capact install",
  },
  {
    text: "# Log in interactively to the Capact Gateway",
    dimmed: true,
  },
  {
    text: "capact login https://gateway.capact.local"
  },
  {
    text: "# You're all set! Enjoy using Capact!",
    dimmed: true
  }
]

export const GetStartedTerminal: FunctionComponent = () => {
  return (
    <div className={styles.terminal} id="termynal" data-termynal>
      {terminalData.map(({ text, dimmed }, idx) => (
        <span key={idx} data-ty="input" className={clsx({ [styles.lineDimmed]: dimmed })}>{text}</span>
      ))}
    </div>
  )
}
