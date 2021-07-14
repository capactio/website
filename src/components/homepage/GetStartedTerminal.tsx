import React, { FunctionComponent } from "react";
import 'react-animated-term/dist/react-animated-term.css';
import "./GetStartedTerminal.overrides.css";
import Terminal from 'react-animated-term';


const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const cmdStep = (title:string) => ({
  text: title,
  cmd: true,
  delay: 10
})

const spinningStep = (title:string, repeatCount = 0, frameDelay = 10) => ({
  text: `✔ ${title}`,
  cmd: false,
  repeat: repeatCount > 0,
  repeatCount: repeatCount,
  frames: spinner.map((spinnerItem) => ({
    text: `${spinnerItem} ${title}...`,
    delay: frameDelay
  }))
})

const termLines = [
  cmdStep("capact env create kind"),
  spinningStep("Creating cluster `kind-dev-capact`"),
  cmdStep("capact install"),
  spinningStep("Installing Capact on cluster"),
  cmdStep("capact login https://gateway.capact.local -u user -p pass"),
  {
    text: '✔ Login succeeded',
    delay: 10
  },
  cmdStep("# You're all set! Enjoy using Capact!"),
]

export const GetStartedTerminal: FunctionComponent = () => {
  console.log(termLines);
  return (
    <Terminal
      lines={termLines}
      interval={80}
    />
  )
}
